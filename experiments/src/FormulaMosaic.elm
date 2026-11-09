module FormulaMosaic exposing (Model, Msg(..), hasPending, init, main, update, view, viewComparison)

{-| Independent page: the same Boolean formula coloring as Formula Map,
drawn as connected logic-gadget tiles.
-}

import Browser
import Dict exposing (Dict)
import FormulaExamples
import FormulaParser exposing (Expr)
import Generated.DefaultTiling
import Generated.ExampleTilings
import GenerativeTiling exposing (ColoredTiling, Tiling)
import Html exposing (Html, a, button, div, h1, h2, input, label, p, section, span, text)
import Html.Attributes as A
import Html.Events as E
import MosaicPalette
import Time


type alias Formula =
    { source : String
    , ast : Expr
    , variables : List String
    , table : List { assignment : Dict String Bool, result : Bool }
    }


type alias Model =
    { formulaText : String
    , formula : Maybe Formula
    , error : String
    , row : Int
    , seed : Int
    , density : Int
    , tiling : Tiling
    , pendingSignals : List ColoredTiling
    , signalDelay : Int
    , signalFrames : List ColoredTiling
    , signalIndex : Int
    , signalPhase : String
    , animateSignals : Bool
    , mosaic : Maybe ColoredTiling
    , organicTiling : Tiling
    , organic : Maybe ColoredTiling
    , pendingOrganicSignals : List ColoredTiling
    }


type Msg
    = EditFormula String
    | Example String
    | SelectRow Int
    | ToggleInput String
    | ClickOrganicTile Int
    | ClickTile Int
    | SignalTick
    | PreviousSignal
    | ReplaySignals
    | SetSignalDelay String
    | SignalStep
    | AnimateSignals Bool
    | Reseed
    | SetDensity String


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( init, Cmd.none )
        , update = \msg model -> ( update msg model, Cmd.none )
        , view = view
        , subscriptions =
            \model ->
                if model.animateSignals && hasPending model then
                    Time.every (toFloat model.signalDelay) (\_ -> SignalTick)

                else
                    Sub.none
        }


init : Model
init =
    generate
        { formulaText = "!(a & b)"
        , formula = Nothing
        , error = ""
        , row = 0
        , seed = 7
        , density = 44
        , tiling = Generated.DefaultTiling.tiling
        , pendingSignals = []
        , signalDelay = 600
        , signalFrames = []
        , signalIndex = 0
        , signalPhase = "Drawing"
        , animateSignals = True
        , mosaic = Nothing
        , organicTiling = Generated.DefaultTiling.tiling
        , organic = Nothing
        , pendingOrganicSignals = []
        }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SignalTick ->
            if model.animateSignals then
                seekSignal (model.signalIndex + 1) model

            else
                model

        SignalStep ->
            seekSignal (model.signalIndex + 1) { model | animateSignals = False }

        PreviousSignal ->
            seekSignal (model.signalIndex - 1) { model | animateSignals = False }

        ReplaySignals ->
            seekSignal 0 { model | animateSignals = True }

        SetSignalDelay raw ->
            case String.toInt raw of
                Just delay ->
                    { model | signalDelay = clamp 50 2500 delay }

                Nothing ->
                    model

        AnimateSignals enabled ->
            { model | animateSignals = enabled }

        EditFormula source ->
            generate { model | formulaText = source, error = "" }

        Example source ->
            generate { model | formulaText = source, mosaic = Nothing }

        SelectRow index ->
            paintRow index model

        ToggleInput variable ->
            toggle variable model

        ClickOrganicTile cell ->
            model.organic
                |> Maybe.andThen (\organic -> List.filter (\t -> t.tile.id == cell) organic.tiles |> List.head)
                |> Maybe.andThen .variable
                |> Maybe.map (\name -> toggle name model)
                |> Maybe.withDefault model

        ClickTile cell ->
            case model.mosaic of
                Nothing ->
                    model

                Just mosaic ->
                    mosaic.tiles
                        |> List.filter (\t -> t.tile.id == cell)
                        |> List.head
                        |> Maybe.andThen .variable
                        |> Maybe.map (\name -> toggle name model)
                        |> Maybe.withDefault model

        Reseed ->
            rebuildTiling (model.seed + 11) model.density model

        SetDensity raw ->
            case String.toInt raw of
                Just n ->
                    rebuildTiling model.seed (clamp 30 56 n) model

                Nothing ->
                    model


generate : Model -> Model
generate model =
    if String.length model.formulaText > 120 then
        { model | error = "For this lab, use at most six variables and 120 characters." }

    else
        case FormulaParser.parse model.formulaText of
            Err _ ->
                { model | error = "Use variable names, !, &, |, and parentheses. For example: !(a & b)." }

            Ok ast ->
                let
                    variables =
                        FormulaParser.collectVariables ast
                in
                if List.length variables > 6 then
                    { model | error = "For this lab, use at most six variables and 120 characters." }

                else
                    let
                        tiling =
                            if model.seed == 7 then
                                case Generated.ExampleTilings.get model.formulaText of
                                    Just cached ->
                                        cached

                                    Nothing ->
                                        GenerativeTiling.generateOrganic model.seed ast

                            else
                                GenerativeTiling.generateOrganic model.seed ast
                    in
                    paintRow 0
                        { model
                            | formula = Just { source = model.formulaText, ast = ast, variables = variables, table = FormulaParser.buildTruthTable ast }
                            , error = ""
                            , organicTiling = tiling
                            , tiling = tiling
                        }


rebuildTiling : Int -> Int -> Model -> Model
rebuildTiling seed density model =
    let
        tiling =
            GenerativeTiling.generateFor (model.formula |> Maybe.map .source |> Maybe.withDefault model.formulaText)
                { seed = seed
                , width = 960
                , height = 600
                , count = density
                }
    in
    paintRow model.row
        { model
            | seed = seed
            , density = density
            , tiling = tiling
            , organicTiling = tiling
        }


paintRow : Int -> Model -> Model
paintRow index model =
    case model.formula of
        Nothing ->
            model

        Just formula ->
            let
                nextIndex =
                    clamp 0 (List.length formula.table - 1) index

                row =
                    List.drop nextIndex formula.table |> List.head
            in
            case row of
                Nothing ->
                    model

                Just r ->
                    let
                        newMap =
                            model.mosaic |> Maybe.map (\prior -> prior.tiling /= model.tiling) |> Maybe.withDefault True

                        frames =
                            if newMap then
                                GenerativeTiling.recolor model.tiling r formula.variables formula.source |> drawingFrames

                            else
                                GenerativeTiling.propagate model.mosaic model.tiling r formula.variables formula.source
                    in
                    seekSignal 0
                        { model
                            | row = nextIndex
                            , signalFrames = frames
                            , signalPhase =
                                if newMap then
                                    "Drawing"

                                else
                                    "Recoloring"
                        }


{-| Show a new map filling one region at a time. The solver's final colors
remain visible as shaded hints while each region waits for its turn.
-}
drawingFrames : ColoredTiling -> List ColoredTiling
drawingFrames final =
    let
        count =
            List.length final.tiles

        frame step =
            if step == count then
                { final | changed = [] }

            else
                { final
                    | tiles =
                        List.indexedMap
                            (\index tile ->
                                if index < step then
                                    tile

                                else
                                    { tile | colorIndex = -1 }
                            )
                            final.tiles
                    , changed =
                        if step > 0 then
                            List.drop (step - 1) final.tiles |> List.head |> Maybe.map (\tile -> [ tile.tile.id ]) |> Maybe.withDefault []

                        else
                            []
                    , status = "Drawing — revealing the next region."
                }
    in
    List.range 0 count |> List.map frame


seekSignal : Int -> Model -> Model
seekSignal requested model =
    let
        index =
            clamp 0 (max 0 (List.length model.signalFrames - 1)) requested

        current =
            List.drop index model.signalFrames |> List.head

        pending =
            List.drop (index + 1) model.signalFrames
    in
    { model
        | signalIndex = index
        , mosaic = current |> Maybe.map Just |> Maybe.withDefault model.mosaic
        , organic = current |> Maybe.map Just |> Maybe.withDefault model.organic
        , pendingSignals = pending
        , pendingOrganicSignals = pending
    }


hasPending : Model -> Bool
hasPending model =
    not (List.isEmpty model.pendingSignals && List.isEmpty model.pendingOrganicSignals)


toggle : String -> Model -> Model
toggle variable model =
    case model.formula of
        Nothing ->
            model

        Just formula ->
            case List.drop model.row formula.table |> List.head of
                Nothing ->
                    model

                Just row ->
                    let
                        assignment =
                            Dict.update variable (Maybe.map not) row.assignment

                        index =
                            formula.table
                                |> List.indexedMap Tuple.pair
                                |> List.filter (\( _, r ) -> r.assignment == assignment)
                                |> List.head
                                |> Maybe.map Tuple.first
                                |> Maybe.withDefault 0
                    in
                    paintRow index model


view : Model -> Html Msg
view =
    viewPage False


viewComparison : Model -> Html Msg
viewComparison =
    viewPage True


viewPage : Bool -> Model -> Html Msg
viewPage comparison model =
    div [ A.class "mosaic-lab" ]
        [ section [ A.class "mosaic-hero" ]
            [ span [ A.class "eyebrow" ] [ text "3-SAT · LOGIC · COLOR" ]
            , h1 [] [ text "3-SAT" ]
            , p []
                [ text
                    (if comparison then
                        "Explore the original tiles."

                     else
                        "Explore Boolean satisfiability with connected logic regions."
                    )
                ]
            ]
        , section [ A.class "mosaic-bar mosaic-about" ]
            [ h2 [] [ text "What is 3-SAT?" ]
            , p []
                [ text "3-SAT is a special case of the Boolean satisfiability problem (SAT). It asks whether a Boolean formula, written in conjunctive normal form with at most three literals per clause, can be made true by assigning TRUE or FALSE to its variables. If such an assignment exists, the formula is satisfiable; otherwise it is unsatisfiable."
                ]
            , p []
                [ text "3-SAT is NP-complete: it is one of Karp's 21 NP-complete problems and a standard starting point for proving that other problems are NP-hard. This experiment turns Boolean constraints into neighboring regions that settle through local repairs. The formula field accepts general Boolean expressions, and the truth table below shows whether the current formula is satisfiable."
                ]
            , p [ A.class "mosaic-about-source" ]
                [ a
                    [ A.href "https://en.wikipedia.org/wiki/Boolean_satisfiability_problem"
                    , A.target "_blank"
                    , A.rel "noopener noreferrer"
                    ]
                    [ text "Read more on Wikipedia ↗" ]
                ]
            ]
        , div [ A.class "mosaic-bar" ]
            [ label [ A.for "mosaic-formula" ] [ text "Boolean formula" ]
            , div [ A.class "mosaic-row" ]
                [ input
                    [ A.id "mosaic-formula"
                    , A.maxlength 120
                    , A.value model.formulaText
                    , E.onInput EditFormula
                    , A.placeholder "!(a & b)"
                    , A.attribute "spellcheck" "false"
                    ]
                    []
                ]
            , p [ A.class "hint" ] [ text "Updates as you type. Operators: ! (NOT), & (AND), | (OR). Up to six variables." ]
            , div [ A.class "mosaic-row" ]
                (List.map (\example -> button [ A.type_ "button", E.onClick (Example example.source), A.title example.source ] [ text example.name ])
                    FormulaExamples.all
                )
            , if model.error == "" then
                text ""

              else
                div [ A.class "mosaic-error", A.attribute "role" "alert" ] [ text model.error ]
            ]
        , case model.formula of
            Nothing ->
                text ""

            Just formula ->
                div []
                    [ section [ A.class "mosaic-stage" ]
                        [ div [ A.class "mosaic-tools" ]
                            [ text
                                (if comparison then
                                    "Three views · one formula"

                                 else
                                    "Connected logic-gadget tiles"
                                )
                            , span []
                                [ text
                                    (if comparison then
                                        String.fromInt (List.length model.organicTiling.tiles) ++ " graph cells"

                                     else
                                        String.fromInt (List.length model.tiling.tiles) ++ " tiles"
                                    )
                                ]
                            , div [ A.class "swatches", A.attribute "aria-label" "Color meaning" ]
                                [ swatch 0 "false"
                                , swatch 1 "true"
                                , swatch 2 "neutral"
                                ]
                            ]
                        , p [ A.class "hint" ] [ text "Input and output colors: red = false, green = true, blue = neutral. Shaded tiles are waiting for the signal to settle. Click an input tile to toggle it." ]
                        , div [ A.class "mosaic-row wrap" ]
                            (List.map (\name -> button [ E.onClick (ToggleInput name) ] [ text ("Toggle " ++ name) ]) formula.variables)
                        , viewPlayback model
                        , if comparison then
                            div [ A.class "tile-comparison" ]
                                [ div [ A.class "comparison-panel" ]
                                    [ h2 [] [ text "01 / Logic tiles" ]
                                    , p [ A.class "hint" ] [ text "Shared-border constraints compute OUT from the inputs." ]
                                    , model.mosaic |> Maybe.map (GenerativeTiling.paint ClickTile) |> Maybe.withDefault (text "")
                                    ]
                                , div [ A.class "comparison-panel" ]
                                    [ h2 [] [ text "02 / Organic cells" ]
                                    , p [ A.class "hint" ] [ text "Graph regions maintain constraints." ]
                                    , model.organic |> Maybe.map (GenerativeTiling.paint ClickOrganicTile) |> Maybe.withDefault (text "")
                                    ]
                                , div [ A.class "comparison-panel graph-panel" ]
                                    [ h2 [] [ text "03 / Underlying graph" ]
                                    , p [ A.class "hint" ] [ text "The same regions and colors before they expand into cells." ]
                                    , model.organic |> Maybe.map (GenerativeTiling.paintSkeleton ClickOrganicTile) |> Maybe.withDefault (text "")
                                    ]
                                ]

                          else
                            model.mosaic |> Maybe.map (GenerativeTiling.paint ClickTile) |> Maybe.withDefault (text "")
                        , if comparison then
                            button [ E.onClick Reseed ] [ text "Reshape tiles" ]

                          else
                            text ""
                        , p [ A.class "hint mosaic-status", A.attribute "role" "status" ]
                            [ text
                                ((if comparison then
                                    model.organic

                                  else
                                    model.mosaic
                                 )
                                    |> Maybe.map .status
                                    |> Maybe.withDefault ""
                                )
                            ]
                        , p [ A.class "hint" ]
                            [ text
                                ("Generated formula: "
                                    ++ formula.source
                                    ++ " · seed "
                                    ++ String.fromInt model.seed
                                    ++ " · "
                                    ++ String.fromInt
                                        (List.length
                                            (if comparison then
                                                model.organicTiling.tiles

                                             else
                                                model.tiling.tiles
                                            )
                                        )
                                    ++ " regions. A changed input releases conflicting neighbors, then local constraints settle the affected tiles. OUT is derived, never supplied."
                                )
                            ]
                        ]
                    , section [ A.class "mosaic-table" ]
                        [ h2 [] [ text "Truth table" ]
                        , p [ A.class "hint" ] [ text "Select a row to send new inputs to the tiles." ]
                        , viewTruthTable model formula
                        , p [ A.class "hint" ]
                            [ text
                                (if List.any .result formula.table then
                                    "The formula is satisfiable: at least one row is true."

                                 else
                                    "The formula is unsatisfiable: every row is false."
                                )
                            ]
                        ]
                    ]
        , p [ A.class "mosaic-foot" ] [ text "These tiles encode Boolean gates using three-color constraints.Settled neighbors always have different colors; OUT follows from the input pins." ]
        ]


viewPlayback : Model -> Html Msg
viewPlayback model =
    let
        pending =
            hasPending model

        total =
            max 0 (List.length model.signalFrames - 1)

        state =
            if model.error /= "" then
                "Invalid formula"

            else if not pending then
                if model.mosaic |> Maybe.map (.status >> String.startsWith "Settled") |> Maybe.withDefault False then
                    "Finished"

                else
                    "Needs attention"

            else if model.animateSignals then
                model.signalPhase

            else if model.signalIndex == 0 then
                "Ready"

            else
                "Paused"
    in
    div [ A.class "mosaic-playback", A.attribute "aria-label" "Coloring playback" ]
        [ div [ A.class "mosaic-playback-heading" ]
            [ span [ A.class "mosaic-playback-state", A.attribute "role" "status", A.attribute "aria-live" "polite", A.attribute "data-state" state ] [ text state ]
            , span [ A.class "hint" ]
                [ text
                    (if total == 0 then
                        "No color changes"

                     else
                        (if state == model.signalPhase then
                            "Step "

                         else
                            model.signalPhase ++ " · step "
                        )
                            ++ String.fromInt model.signalIndex
                            ++ " of "
                            ++ String.fromInt total
                    )
                ]
            ]
        , Html.progress
            [ A.max (String.fromInt (max 1 total))
            , A.value
                (String.fromInt
                    (if not pending then
                        max 1 total

                     else
                        model.signalIndex
                    )
                )
            , A.attribute "aria-label" "Coloring progress"
            ]
            []
        , div [ A.class "mosaic-row wrap propagation-controls" ]
            [ label [] [ input [ A.type_ "checkbox", A.checked model.animateSignals, E.onCheck AnimateSignals ] [], text " Animate coloring" ]
            , button [ A.type_ "button", A.disabled (not pending), E.onClick (AnimateSignals (not model.animateSignals)) ]
                [ text
                    (if model.animateSignals then
                        "Pause coloring"

                     else
                        "Resume coloring"
                    )
                ]
            , button [ A.type_ "button", A.disabled (model.signalIndex == 0), E.onClick PreviousSignal ] [ text "Previous step" ]
            , button [ A.type_ "button", A.disabled (not pending), E.onClick SignalStep ] [ text "Next step" ]
            , button [ A.type_ "button", A.disabled (total == 0), E.onClick ReplaySignals ] [ text "Replay coloring" ]
            ]
        , div [ A.class "mosaic-speed" ]
            [ label [ A.for "mosaic-step-delay" ] [ text "Time per step" ]
            , input [ A.id "mosaic-step-delay", A.type_ "range", A.min "50", A.max "2500", A.step "50", A.value (String.fromInt model.signalDelay), A.attribute "aria-valuetext" (String.fromFloat (toFloat model.signalDelay / 1000) ++ " seconds per step"), E.onInput SetSignalDelay ] []
            , Html.output [ A.for "mosaic-step-delay" ] [ text (String.fromFloat (toFloat model.signalDelay / 1000) ++ " s / step") ]
            , span [ A.class "hint" ] [ text "Left = faster · right = slower. Stepping pauses playback." ]
            ]
        ]


swatch : Int -> String -> Html Msg
swatch color name =
    span [ A.class "swatch-item" ]
        [ span [ A.class "swatch", A.style "background" (MosaicPalette.getColor color) ] []
        , text name
        ]


viewTruthTable : Model -> Formula -> Html Msg
viewTruthTable model formula =
    div [ A.class "table-scroll" ]
        [ Html.table []
            [ Html.thead []
                [ Html.tr []
                    (List.map (\name -> Html.th [] [ text name ]) formula.variables
                        ++ [ Html.th [] [ text "OUT" ], Html.th [] [ text "View" ] ]
                    )
                ]
            , Html.tbody []
                (List.indexedMap
                    (\i row ->
                        Html.tr [ A.classList [ ( "selected-row", i == model.row ) ] ]
                            (List.map
                                (\name ->
                                    Html.td []
                                        [ text
                                            (if Dict.get name row.assignment == Just True then
                                                "1"

                                             else
                                                "0"
                                            )
                                        ]
                                )
                                formula.variables
                                ++ [ Html.td []
                                        [ text
                                            (if row.result then
                                                "1"

                                             else
                                                "0"
                                            )
                                        ]
                                   , Html.td []
                                        [ button [ E.onClick (SelectRow i) ]
                                            [ text
                                                (if i == model.row then
                                                    "Selected"

                                                 else
                                                    "View row " ++ String.fromInt (i + 1)
                                                )
                                            ]
                                        ]
                                   ]
                            )
                    )
                    formula.table
                )
            ]
        ]
