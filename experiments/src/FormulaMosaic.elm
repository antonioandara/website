module FormulaMosaic exposing (Model, Msg(..), hasPending, init, main, update, view, viewComparison)

{-| Independent page: the same Boolean formula coloring as Formula Map,
drawn as connected logic-gadget tiles.
-}

import Browser
import Dict exposing (Dict)
import FormulaExamples
import FormulaParser exposing (Expr)
import Generated.DefaultTiling
import GenerativeTiling exposing (ColoredTiling, Tiling)
import GraphColoring
import Html exposing (Html, button, div, h1, h2, input, label, p, section, span, text)
import Html.Attributes as A
import Html.Events as E
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
                    Time.every 180 (\_ -> SignalStep)

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
        , animateSignals = True
        , mosaic = Nothing
        , organicTiling = Generated.DefaultTiling.tiling
        , organic = Nothing
        , pendingOrganicSignals = []
        }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SignalStep ->
            { model
                | mosaic = List.head model.pendingSignals |> Maybe.map Just |> Maybe.withDefault model.mosaic
                , pendingSignals = List.drop 1 model.pendingSignals
                , organic = List.head model.pendingOrganicSignals |> Maybe.map Just |> Maybe.withDefault model.organic
                , pendingOrganicSignals = List.drop 1 model.pendingOrganicSignals
            }

        AnimateSignals enabled ->
            { model | animateSignals = enabled }

        EditFormula source ->
            generate { model | formulaText = source, error = "" }

        Example source ->
            generate { model | formulaText = source }

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
                    variables = FormulaParser.collectVariables ast
                in
                if List.length variables > 6 then
                    { model | error = "For this lab, use at most six variables and 120 characters." }

                else
                    let
                        tiling =
                            if model.formulaText == "!(a & b)" && model.seed == 7 then
                                Generated.DefaultTiling.tiling

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
                        frames =
                            GenerativeTiling.propagate model.mosaic model.tiling r formula.variables formula.source

                        organicFrames =
                            frames
                    in
                    { model
                        | row = nextIndex
                        , mosaic = List.head frames
                        , pendingSignals = List.drop 1 frames
                        , organic = List.head organicFrames
                        , pendingOrganicSignals = List.drop 1 organicFrames
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
        [ Html.node "style" [] [ text css ]
        , section [ A.class "mosaic-hero" ]
            [ span [ A.class "eyebrow" ] [ text "FORMULA · MOSAIC · COLOR" ]
            , h1 []
                [ text
                    (if comparison then
                        "One formula, three views"

                     else
                        "Formula Mosaic"
                    )
                ]
            , p []
                [ text
                    (if comparison then
                        "Explore the original tiles, an expanded organic cell network, and the graph underneath. All three views share the same inputs."

                     else
                        "Send a signal through connected logic tiles. Toggle an input and watch shared-border constraints carry the change toward OUT."
                    )
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
                        , p [ A.class "hint" ] [ text "Input and output colors: red = false, green = true, blue = neutral. Pale tiles are unresolved while the signal travels. Click an input tile to toggle it." ]
                        , div [ A.class "mosaic-row wrap" ]
                            (List.map (\name -> button [ E.onClick (ToggleInput name) ] [ text ("Toggle " ++ name) ]) formula.variables)
                        , GenerativeTiling.propagationControls model.animateSignals (hasPending model) AnimateSignals SignalStep
                        , if comparison then
                            div [ A.class "tile-comparison" ]
                                [ div [ A.class "comparison-panel" ]
                                    [ h2 [] [ text "01 / Logic tiles" ]
                                    , p [ A.class "hint" ] [ text "Shared-border constraints compute OUT from the input pins." ]
                                    , model.mosaic |> Maybe.map (GenerativeTiling.paint ClickTile) |> Maybe.withDefault (text "")
                                    ]
                                , div [ A.class "comparison-panel" ]
                                    [ h2 [] [ text "02 / Organic cells" ]
                                    , p [ A.class "hint" ] [ text "Graph regions grow into tiles; every shared border keeps its constraint." ]
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
                            button [ E.onClick Reseed ] [ text "Reshape organic tiles" ]

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
                        , p [ A.class "hint" ] [ text "Select a row to send new inputs through the tiles." ]
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
        , p [ A.class "mosaic-foot" ] [ text "These tiles encode Boolean gates using three-color constraints. Opposite edges do not connect. Settled neighbors always have different colors; OUT follows from the input pins." ]
        ]


swatch : Int -> String -> Html Msg
swatch color name =
    span [ A.class "swatch-item" ]
        [ span [ A.class "swatch", A.style "background" (GraphColoring.getColor color) ] []
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


css : String
css =
    """
.mosaic-lab { color: #f4efe6; background: #161310; min-height: 100vh; padding: 28px max(16px, calc((100vw - 1100px) / 2)); font: 16px/1.5 system-ui, sans-serif; }
.mosaic-lab * { box-sizing: border-box; }
.mosaic-hero { padding: 10px 0 18px; }
.eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .18em; color: #c9a56a; }
.mosaic-hero h1 { font-size: clamp(34px, 6vw, 64px); line-height: 1.05; margin: 10px 0 12px; color: #fff8ec; }
.mosaic-hero p, .hint, .mosaic-foot { color: #cbbda8; }
.mosaic-hero p { max-width: 640px; }
.mosaic-lab h2 { font-size: 22px; margin: 0 0 10px; color: #fff8ec; }
.mosaic-bar, .mosaic-stage, .mosaic-table { background: #211c18; border: 1px solid #3a322b; border-radius: 16px; padding: 22px; margin: 16px 0; }
.mosaic-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
.mosaic-row.wrap { margin-bottom: 16px; }
.mosaic-lab button { cursor: pointer; padding: 9px 14px; border: 1px solid #5a4c3e; border-radius: 8px; background: #2b241e; color: #fff8ec; font: inherit; }
.mosaic-lab button:hover { background: #3a3128; }
.mosaic-lab input:not([type=range]) { min-width: 0; flex: 1; padding: 12px; border: 1px solid #5a4c3e; border-radius: 8px; font: 18px monospace; background: #161310; color: #fff8ec; }
.mosaic-lab label { font-weight: 700; }
.mosaic-lab button:focus-visible, .mosaic-lab input:focus-visible, .mosaic-lab g:focus-visible { outline: 3px solid #df9b27; outline-offset: 3px; }
.mosaic-error { padding: 12px; color: #ffd4cc; background: #4a1f1c; border-radius: 8px; }
.mosaic-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 8px; }
.mosaic-tools label { display: flex; align-items: center; gap: 10px; font-weight: 650; }
.mosaic-lab input[type=range] { width: 160px; }
.mosaic-surface { display: block; width: 100%; aspect-ratio: 8 / 5; border-radius: 12px; background: #120e0c; }
.mosaic-cell.is-input { cursor: pointer; }
.mosaic-cell.is-input:focus { outline: none; }

.swatches { display: flex; gap: 12px; margin-left: auto; }
.swatch-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #cbbda8; }
.swatch { display: inline-block; width: 14px; height: 14px; border-radius: 50%; }
.table-scroll { overflow: auto; max-height: 420px; }
.mosaic-lab table { border-collapse: collapse; width: 100%; text-align: center; }
.mosaic-lab td, .mosaic-lab th { padding: 8px; border-bottom: 1px solid #3a322b; }
.mosaic-lab th { background: #2b241e; }
.selected-row { background: #3a2e18; }
.mosaic-foot { font-size: 13px; }
body { margin: 0; }
@media (max-width: 760px) { .mosaic-bar, .mosaic-stage, .mosaic-table { padding: 16px; } .swatches { margin-left: 0; } }
"""
