module Minimal exposing (Model, Msg, init, main, update, view)

import Browser
import Dict exposing (Dict)
import FormulaParser exposing (Expr(..))
import Html exposing (Html, button, code, div, h1, h2, h3, input, label, p, section, span, table, tbody, td, text, textarea, th, thead, tr)
import Html.Attributes exposing (attribute, checked, class, classList, disabled, placeholder, rows, style, type_, value)
import Html.Events exposing (onCheck, onClick, onInput)
import Parser
import ParsingTrace


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }


type alias Model =
    { formula : String
    , assignment : Dict String Bool
    , parseStep : Int
    }


init : Model
init =
    { formula = "!(a & b) | c"
    , parseStep = 0
    , assignment =
        Dict.fromList
            [ ( "a", False )
            , ( "b", True )
            , ( "c", False )
            ]
    }


type Msg
    = FormulaChanged String
    | UseExample String
    | ToggleVariable String Bool
    | SetParseStep Int


update : Msg -> Model -> Model
update msg model =
    case msg of
        FormulaChanged formula ->
            { model
                | formula = formula
                , parseStep = 0
                , assignment = syncAssignment formula model.assignment
            }

        UseExample formula ->
            { model
                | formula = formula
                , parseStep = 0
                , assignment = syncAssignment formula model.assignment
            }

        SetParseStep step ->
            { model | parseStep = max 0 (min (List.length (parsingSteps model.formula) - 1) step) }

        ToggleVariable name isChecked ->
            { model | assignment = Dict.insert name isChecked model.assignment }


syncAssignment : String -> Dict String Bool -> Dict String Bool
syncAssignment formula assignment =
    case FormulaParser.parse formula of
        Ok ast ->
            completeAssignment (FormulaParser.collectVariables ast) assignment

        Err _ ->
            assignment


completeAssignment : List String -> Dict String Bool -> Dict String Bool
completeAssignment variables assignment =
    List.foldl
        (\name acc ->
            Dict.insert name (Dict.get name assignment |> Maybe.withDefault False) acc
        )
        Dict.empty
        variables


view : Model -> Html Msg
view model =
    let
        parsed =
            FormulaParser.parse model.formula
    in
    div [ class "page-shell" ]
        [ viewHero model
        , div [ class "workspace" ]
            (case parsed of
                Ok ast ->
                    viewParsed model ast

                Err deadEnds ->
                    viewBrokenParse model deadEnds
            )
        ]


viewHero : Model -> Html Msg
viewHero model =
    section [ class "hero-band" ]
        [ div [ class "hero-inner" ]
            [ div [ class "hero-copy" ]
                [ p [ class "eyebrow" ] [ text "02 / LOGIC & STRUCTURE" ]
                , h1 [] [ text "Formula Parser", span [ class "title-dot" ] [ text "." ] ]
                , p []
                    [ text "I built this parser to explore the structure behind Boolean expressions." ]
                ]
            , div [ class "formula-console" ]
                [ label [ class "input-label" ]
                    [ span [] [ text "Formula" ]
                    , textarea
                        [ class "formula-input"
                        , rows 2
                        , placeholder "Try !(a & b) | c"
                        , value model.formula
                        , onInput FormulaChanged
                        , attribute "spellcheck" "false"
                        ]
                        []
                    ]
                , p [ class "operator-guide" ] [ text "! NOT   /   & AND   /   | OR   /   ( ) GROUP" ]
                , div [ class "example-row" ]
                    (List.map viewExampleButton examples)
                ]
            ]
        ]


viewExampleButton : ( String, String ) -> Html Msg
viewExampleButton ( title, formula ) =
    button [ class "example-button", onClick (UseExample formula) ]
        [ span [ class "example-title" ] [ text title ]
        , code [] [ text formula ]
        ]


examples : List ( String, String )
examples =
    [ ( "NAND", "!(a & b)" )
    , ( "Precedence", "a | b & c" )
    , ( "Grouping", "(a | b) & !c" )
    , ( "Chain", "a & b & c | !d" )
    , ( "Multiplexer", "(!s & a) | (s & b)" )
    , ( "Majority", "(a & b) | (a & c) | (b & c)" )
    ]


viewParsed : Model -> Expr -> List (Html Msg)
viewParsed model ast =
    let
        variables =
            FormulaParser.collectVariables ast

        assignment =
            completeAssignment variables model.assignment
    in
    [ section [ class "metrics-strip" ]
        [ viewMetric "Root node" (constructorName ast)
        , viewMetric "Variables" (String.fromInt (List.length variables))
        , viewMetric "AST nodes" (String.fromInt (nodeCount ast))
        , viewMetric "Tree depth" (String.fromInt (treeDepth ast))
        ]
    , div [ class "lesson-grid" ]
        [ viewParserPanel model ast
        , viewAstPanel model
        , viewSignalPanel variables assignment ast
        , viewTruthTablePanel variables assignment ast
        ]
    ]


viewBrokenParse : Model -> List Parser.DeadEnd -> List (Html Msg)
viewBrokenParse model deadEnds =
    [ div [ class "lesson-grid single" ]
        [ section [ class "panel" ]
            [ h2 [] [ text "Tokens" ]
            , viewTokens model.formula
            , div [ class "notice error" ]
                [ h3 [] [ text "Parser stopped" ]
                , p [] [ text (String.join "\n" (List.map (\error -> "Check the formula at row " ++ String.fromInt error.row ++ ", column " ++ String.fromInt error.col ++ ". Expected a variable, !, or a parenthesized expression; check operators and closing parentheses.") deadEnds)) ]
                ]
            ]
        ]
    ]


viewMetric : String -> String -> Html Msg
viewMetric title amount =
    div [ class "metric" ]
        [ span [ class "metric-title" ] [ text title ]
        , span [ class "metric-value" ] [ text amount ]
        ]


viewParserPanel : Model -> Expr -> Html Msg
viewParserPanel model _ =
    let
        steps =
            parsingSteps model.formula

        current =
            List.drop model.parseStep steps |> List.head
    in
    section [ class "panel parser-panel" ]
        [ h2 [] [ text "Parser Pipeline" ]
        , p [ class "panel-lede" ]
            [ text "Follow the recursive-descent grammar one step at a time. The blue outline marks the next unread token; dimmed tokens have already been consumed." ]
        , h3 [] [ text "Token stream" ]
        , viewParsingTokens (Maybe.map .cursor current |> Maybe.withDefault 0) model.formula
        , h3 [] [ text "Precedence ladder" ]
        , div [ class "ladder" ]
            (List.map (viewPrecedenceStep (Maybe.map .rule current |> Maybe.withDefault "exprParser")) precedenceLevels)
        , h3 [] [ text "Parsing walkthrough" ]
        , viewTrace model.parseStep steps
        ]


parsingSteps : String -> List ParsingTrace.Step
parsingSteps formula =
    scanTokens formula |> List.map tokenText |> ParsingTrace.walkthrough


tokenText : Token -> String
tokenText token =
    case token of
        VariableToken name ->
            name

        OperatorToken symbol ->
            symbol

        GroupToken symbol ->
            symbol

        UnknownToken symbol ->
            symbol


viewParsingTokens : Int -> String -> Html Msg
viewParsingTokens cursor formula =
    div [ class "token-row parsing-tokens" ]
        (List.indexedMap
            (\index token ->
                span
                    [ classList [ ( "parsing-token", True ), ( "consumed", index < cursor ), ( "next-token", index == cursor ) ]
                    , attribute "title" (if index < cursor then "Consumed" else if index == cursor then "Next unread token" else "Unread")
                    ]
                    [ viewToken token ]
            )
            (scanTokens formula)
            ++ [ span [ classList [ ( "end-token", True ), ( "next-token", cursor == List.length (scanTokens formula) ) ] ] [ text "END" ] ]
        )


viewTokens : String -> Html Msg
viewTokens formula =
    let
        tokens =
            scanTokens formula
    in
    if List.isEmpty tokens then
        div [ class "token-row empty" ] [ text "No tokens yet" ]

    else
        div [ class "token-row" ] (List.map viewToken tokens)


viewToken : Token -> Html Msg
viewToken token =
    let
        ( labelText, kind ) =
            case token of
                VariableToken name ->
                    ( name, "variable" )

                OperatorToken symbol ->
                    ( symbol, "operator" )

                GroupToken symbol ->
                    ( symbol, "group" )

                UnknownToken symbol ->
                    ( symbol, "unknown" )
    in
    span [ class ("token " ++ kind) ] [ text labelText ]


viewPrecedenceStep : String -> ( String, String, String ) -> Html Msg
viewPrecedenceStep activeLevel ( name, symbolText, detail ) =
    div
        [ classList
            [ ( "ladder-step", True )
            , ( "active", activeLevel == name )
            ]
        ]
        [ span [ class "ladder-name" ] [ text name ]
        , span [ class "ladder-symbol" ] [ text symbolText ]
        , span [ class "ladder-detail" ] [ text detail ]
        ]


precedenceLevels : List ( String, String, String )
precedenceLevels =
    [ ( "exprParser", "entry", "read the whole expression; check nothing is left" )
    , ( "orExpr", "|", "OR binds last; read AND expressions on each side" )
    , ( "andExpr", "&", "AND binds before OR; read NOT expressions first" )
    , ( "notExpr", "!", "NOT binds first; applies to the next unit" )
    , ( "atom", "var / ( )", "one unit: a variable or a parenthesized group" )
    ]


viewTrace : Int -> List ParsingTrace.Step -> Html Msg
viewTrace selected steps =
    let
        total =
            List.length steps

        controls =
            div [ class "parse-controls" ]
                [ button [ onClick (SetParseStep 0), disabled (selected == 0) ] [ text "Reset" ]
                , button [ onClick (SetParseStep (selected - 1)), disabled (selected == 0) ] [ text "← Back" ]
                , button [ class "parse-next", onClick (SetParseStep (selected + 1)), disabled (selected >= total - 1) ] [ text "Next →" ]
                , button [ onClick (SetParseStep (total - 1)), disabled (selected >= total - 1) ] [ text "Finish" ]
                ]
    in
    case List.drop selected steps |> List.head of
        Nothing ->
            text ""

        Just current ->
            div [ class "parse-walkthrough" ]
                [ controls
                , div [ class "parse-progress", attribute "role" "progressbar", attribute "aria-label" "Parsing progress", attribute "aria-valuemin" "1", attribute "aria-valuemax" (String.fromInt total), attribute "aria-valuenow" (String.fromInt (selected + 1)) ]
                    [ span [ style "width" (String.fromFloat (toFloat (selected + 1) / toFloat total * 100) ++ "%") ] [] ]
                , div [ class "parse-current", attribute "aria-live" "polite", attribute "aria-atomic" "true" ]
                    [ div [ class "parse-step-meta" ]
                        [ span [] [ text ("STEP " ++ String.fromInt (selected + 1) ++ " / " ++ String.fromInt total) ]
                        , code [] [ text current.rule ]
                        ]
                    , p [ class "parse-action" ] [ text current.action ]
                    , p [ class "parse-explanation" ] [ text current.explanation ]
                    , case current.built of
                        Just expr ->
                            div [ class "parse-result" ] [ span [] [ text "Result" ], code [] [ text (exprToInline expr) ] ]

                        Nothing ->
                            text ""
                    ]
                , h3 [] [ text "Recent steps" ]
                , div [ class "parse-history", attribute "aria-label" "Parsing history" ]
                    (List.indexedMap (\index step -> ( index, step )) steps
                        |> List.take (selected + 1)
                        |> List.reverse
                        |> List.take 8
                        |> List.map (\( index, step ) ->
                            button
                                [ classList [ ( "parse-log", True ), ( "current", index == selected ) ]
                                , onClick (SetParseStep index)
                                , attribute "aria-current" (if index == selected then "step" else "false")
                                ]
                                [ span [ class "parse-log-number" ] [ text (String.fromInt (index + 1)) ]
                                , div []
                                    [ div [ class "parse-log-heading" ] [ code [] [ text step.rule ], span [] [ text step.action ] ]
                                    , p [] [ text step.explanation ]
                                    ]
                                , span [ class "parse-log-depth" ] [ text ("depth " ++ String.fromInt step.depth) ]
                                ]
                        )
                    )
                ]


viewAstPanel : Model -> Html Msg
viewAstPanel model =
    let
        current =
            parsingSteps model.formula |> List.drop model.parseStep |> List.head

        forest =
            Maybe.map .forest current |> Maybe.withDefault []

        complete =
            Maybe.map .action current == Just "Complete"

        description =
            if List.isEmpty forest then
                "No AST nodes built yet"

            else
                "AST so far: " ++ String.join "; " (List.map exprToInline forest)
    in
    section [ class "panel ast-panel" ]
        [ h2 [] [ text "Abstract Syntax Tree" ]
        , p [ class "panel-lede" ]
            [ text "Leaves appear as variables are read. Operators join them into larger trees as you step through the parser." ]
        , div [ class "ast-map", attribute "role" "img", attribute "aria-label" description ]
            [ div [ class "ast-map-caption" ]
                [ span [] [ text (if complete then "TREE COMPLETE" else "BUILDING THE TREE") ]
                , span [] [ text (String.fromInt (List.sum (List.map nodeCount forest)) ++ " NODES BUILT") ]
                ]
            , if List.isEmpty forest then
                div [ class "ast-waiting" ]
                    [ span [ class "ast-waiting-symbol", attribute "aria-hidden" "true" ] [ text "○" ]
                    , p [] [ text "Waiting for the first variable." ]
                    , span [] [ text "Use Next in the parser to begin building." ]
                    ]

              else
                div [ class "ast-forest" ]
                    (List.indexedMap
                        (\index expr ->
                            div [ class "ast-fragment" ]
                                [ viewAstBranch (if complete then "root" else "subtree " ++ String.fromInt (index + 1)) expr ]
                        )
                        forest
                    )
            , div [ class "ast-legend" ] [ span [ class "ast-legend-operator" ] [ text "○ Operator" ], span [] [ text "□ Variable" ] ]
            ]
        , div [ class "source-shape" ]
            [ h3 [] [ text (if complete then "Elm value shape" else "Elm values so far") ]
            , if List.isEmpty forest then
                p [ class "ast-source-empty" ] [ text "No values built yet." ]

              else
                div [] (List.map (\expr -> code [] [ text (exprToInline expr) ]) forest)
            ]
        ]


viewAstBranch : String -> Expr -> Html Msg
viewAstBranch role expr =
    let
        ( symbol, kind, children ) =
            case expr of
                Var name ->
                    ( name, "variable", [] )

                Not inner ->
                    ( "¬", "operator", [ ( "operand", inner ) ] )

                And left right ->
                    ( "∧", "operator", [ ( "left", left ), ( "right", right ) ] )

                Or left right ->
                    ( "∨", "operator", [ ( "left", left ), ( "right", right ) ] )
    in
    div [ class ("ast-branch ast-" ++ kind ++ " " ++ operatorClass expr) ]
        [ div [ class "ast-entry" ]
            [ span [ class "ast-symbol" ] [ text symbol ]
            , div [ class "ast-entry-copy" ]
                [ span [ class "ast-constructor" ] [ text (constructorName expr) ]
                , span [ class "ast-role" ] [ text role ]
                ]
            ]
        , if List.isEmpty children then
            text ""

          else
            div [ class "ast-branches" ]
                (List.map (\( childRole, child ) -> viewAstBranch childRole child) children)
        ]


operatorClass : Expr -> String
operatorClass expr =
    case expr of
        Var _ ->
            "op-variable"

        Not _ ->
            "op-not"

        And _ _ ->
            "op-and"

        Or _ _ ->
            "op-or"


viewSignalPanel : List String -> Dict String Bool -> Expr -> Html Msg
viewSignalPanel variables assignment ast =
    section [ class "panel signal-panel" ]
        [ h2 [] [ text "Signal Propagation" ]
        , p [ class "panel-lede" ]
            [ text "Use the switches or click a variable block to change its value. Signals update from the inputs toward the root." ]
        , viewVariableToggles variables assignment
        , div [ class "tree-scroll" ]
            [ viewSignalNode assignment ast ]
        ]


viewVariableToggles : List String -> Dict String Bool -> Html Msg
viewVariableToggles variables assignment =
    if List.isEmpty variables then
        div [ class "toggle-row empty" ] [ text "No variables" ]

    else
        div [ class "toggle-row" ]
            (List.map (viewVariableToggle assignment) variables)


viewVariableToggle : Dict String Bool -> String -> Html Msg
viewVariableToggle assignment name =
    let
        isChecked =
            Dict.get name assignment |> Maybe.withDefault False
    in
    label
        [ classList
            [ ( "var-toggle", True )
            , ( "is-true", isChecked )
            ]
        ]
        [ input
            [ type_ "checkbox"
            , checked isChecked
            , attribute "role" "switch"
            , attribute "aria-label" ("Input " ++ name)
            , onCheck (ToggleVariable name)
            ]
            []
        , span [ class "switch-track" , attribute "aria-hidden" "true" ] [ span [ class "switch-thumb" ] [] ]
        , span [ class "var-name" ] [ text name ]
        , span [ class "var-value" ] [ text (truthText isChecked) ]
        ]


viewSignalNode : Dict String Bool -> Expr -> Html Msg
viewSignalNode assignment expr =
    let
        result =
            FormulaParser.evaluate expr assignment

        children =
            exprChildren expr
    in
    div
        [ classList
            [ ( "tree-node", True )
            , ( "leaf-node", List.isEmpty children )
            ]
        ]
        ([ viewSignalBlock assignment expr result
         ]
            ++ (if List.isEmpty children then
                    []

                else
                    [ div [ class "tree-children" ] (List.map (viewSignalNode assignment) children) ]
               )
        )


viewSignalBlock : Dict String Bool -> Expr -> Bool -> Html Msg
viewSignalBlock assignment expr result =
    let
        attributes =
            [ classList
                [ ( "node-box", True )
                , ( "signal-node-box", True )
                , ( operatorClass expr, True )
                , ( "is-true", result )
                , ( "is-false", not result )
                ]
            ]

        contents =
            [ span [ class "node-title" ] [ text (signalNodeTitle expr assignment) ]
            , span [ class "node-detail" ] [ text (truthText result) ]
            ]
    in
    case expr of
        Var name ->
            button
                (attributes
                    ++ [ type_ "button"
                       , onClick (ToggleVariable name (not result))
                       , attribute "aria-pressed" (if result then "true" else "false")
                       , attribute "aria-label" ("Toggle input " ++ name)
                       , attribute "title" ("Toggle " ++ name ++ " everywhere")
                       ]
                )
                contents

        _ ->
            div attributes contents


viewTruthTablePanel : List String -> Dict String Bool -> Expr -> Html Msg
viewTruthTablePanel variables assignment ast =
    let
        variableCount =
            List.length variables
    in
    section [ class "panel truth-panel" ]
        [ h2 [] [ text "Truth Table" ]
        , p [ class "panel-lede" ]
            [ text "The table enumerates every assignment. The highlighted row matches the live toggles above." ]
        , if variableCount > 6 then
            div [ class "notice" ]
                [ text ("This formula has " ++ String.fromInt variableCount ++ " variables, which would create " ++ String.fromInt (2 ^ variableCount) ++ " rows. Try six variables or fewer for the live table.") ]

          else
            viewTruthTable variables assignment ast
        ]


viewTruthTable : List String -> Dict String Bool -> Expr -> Html Msg
viewTruthTable variables assignment ast =
    let
        rowsForAst =
            FormulaParser.buildTruthTable ast
    in
    table [ class "truth-table" ]
        [ thead []
            [ tr []
                (List.map (\name -> th [] [ text name ]) variables
                    ++ [ th [] [ text "result" ] ]
                )
            ]
        , tbody []
            (List.indexedMap (viewTruthTableRow variables assignment) rowsForAst)
        ]


viewTruthTableRow : List String -> Dict String Bool -> Int -> { assignment : Dict String Bool, result : Bool } -> Html Msg
viewTruthTableRow variables currentAssignment _ row =
    tr
        [ classList
            [ ( "current-row", assignmentsMatch variables currentAssignment row.assignment )
            ]
        ]
        (List.map
            (\name ->
                viewBoolCell (Dict.get name row.assignment |> Maybe.withDefault False)
            )
            variables
            ++ [ viewBoolCell row.result ]
        )


viewBoolCell : Bool -> Html Msg
viewBoolCell bool =
    td []
        [ span
            [ classList
                [ ( "truth-chip", True )
                , ( "is-true", bool )
                , ( "is-false", not bool )
                ]
            ]
            [ text (truthText bool) ]
        ]


assignmentsMatch : List String -> Dict String Bool -> Dict String Bool -> Bool
assignmentsMatch variables left right =
    List.all
        (\name ->
            Dict.get name left == Dict.get name right
        )
        variables


type Token
    = VariableToken String
    | OperatorToken String
    | GroupToken String
    | UnknownToken String


scanTokens : String -> List Token
scanTokens source =
    case String.uncons source of
        Nothing ->
            []

        Just ( char, rest ) ->
            if isWhitespace char then
                scanTokens rest

            else if Char.isAlpha char then
                let
                    ( tail, remaining ) =
                        spanWhile Char.isAlpha rest
                in
                VariableToken (String.fromChar char ++ tail) :: scanTokens remaining

            else if char == '!' || char == '&' || char == '|' then
                OperatorToken (String.fromChar char) :: scanTokens rest

            else if char == '(' || char == ')' then
                GroupToken (String.fromChar char) :: scanTokens rest

            else
                UnknownToken (String.fromChar char) :: scanTokens rest


spanWhile : (Char -> Bool) -> String -> ( String, String )
spanWhile predicate source =
    case String.uncons source of
        Nothing ->
            ( "", "" )

        Just ( char, rest ) ->
            if predicate char then
                let
                    ( taken, remaining ) =
                        spanWhile predicate rest
                in
                ( String.fromChar char ++ taken, remaining )

            else
                ( "", source )


isWhitespace : Char -> Bool
isWhitespace char =
    char == ' ' || char == '\n' || char == '\t' || char == '\u{000D}'




constructorName : Expr -> String
constructorName expr =
    case expr of
        Var _ ->
            "Var"

        Not _ ->
            "Not"

        And _ _ ->
            "And"

        Or _ _ ->
            "Or"


astNodeDetail : Expr -> String
astNodeDetail expr =
    case expr of
        Var name ->
            "\"" ++ name ++ "\""

        Not _ ->
            "one child"

        And _ _ ->
            "left and right"

        Or _ _ ->
            "left or right"


signalNodeTitle : Expr -> Dict String Bool -> String
signalNodeTitle expr assignment =
    case expr of
        Var name ->
            name ++ " = " ++ truthText (Dict.get name assignment |> Maybe.withDefault False)

        Not _ ->
            "not"

        And _ _ ->
            "and"

        Or _ _ ->
            "or"


exprChildren : Expr -> List Expr
exprChildren expr =
    case expr of
        Var _ ->
            []

        Not inner ->
            [ inner ]

        And left right ->
            [ left, right ]

        Or left right ->
            [ left, right ]


exprToInline : Expr -> String
exprToInline expr =
    case expr of
        Var name ->
            "Var \"" ++ name ++ "\""

        Not inner ->
            "Not (" ++ exprToInline inner ++ ")"

        And left right ->
            "And (" ++ exprToInline left ++ ") (" ++ exprToInline right ++ ")"

        Or left right ->
            "Or (" ++ exprToInline left ++ ") (" ++ exprToInline right ++ ")"


nodeCount : Expr -> Int
nodeCount expr =
    1 + List.sum (List.map nodeCount (exprChildren expr))


treeDepth : Expr -> Int
treeDepth expr =
    case exprChildren expr of
        [] ->
            1

        children ->
            1 + (List.maximum (List.map treeDepth children) |> Maybe.withDefault 0)


truthText : Bool -> String
truthText bool =
    if bool then
        "True"

    else
        "False"

