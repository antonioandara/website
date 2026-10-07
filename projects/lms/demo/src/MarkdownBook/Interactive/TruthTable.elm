module MarkdownBook.Interactive.TruthTable exposing
    ( Msg(..)
    , State
    , defaultState
    , update
    , view
    )

import Element exposing (Color, Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html.Attributes as A
import Set exposing (Set)


type alias State =
    { expression : String
    }


type Msg
    = SetExpression String


type Token
    = Var Char
    | And
    | Or
    | Not
    | LParen
    | RParen


type alias Colors r =
    { r
        | paper : Color
        , white : Color
        , sidebar : Color
        , hover : Color
        , ink : Color
        , muted : Color
        , line : Color
        , accent : Color
        , accentSoft : Color
        , successSoft : Color
        , danger : Color
        , dangerSoft : Color
        , code : Color
        , codeText : Color
        , codeInline : Color
    }


defaultState : State
defaultState =
    { expression = "(AB)'C+D"
    }


update : Msg -> State -> State
update msg state =
    case msg of
        SetExpression expression ->
            { state | expression = expression }


view : Colors r -> (Msg -> msg) -> State -> Element msg
view colors toMsg state =
    let
        parsed =
            parse state.expression
    in
    Element.column
        [ Element.width Element.fill
        , Element.spacing 14
        , Element.padding 18
        , Border.rounded 8
        , Border.width 1
        , Border.color colors.line
        , Background.color colors.white
        ]
        [ Element.row [ Element.width Element.fill, Element.spacing 12 ]
            [ Element.el [ Font.size 12, Font.bold, Font.color colors.accent ] (Element.text "Truth Table Generator")
            , Element.el [ Element.alignRight, Font.size 12, Font.color colors.muted ]
                (Element.text "AND: AB   OR: A+B   NOT: A'")
            ]
        , Input.text
            [ Element.width Element.fill
            , Element.padding 10
            , Border.rounded 6
            , Border.width 1
            , Border.color colors.line
            , Background.color colors.paper
            , Font.family [ Font.monospace ]
            , Font.color colors.ink
            ]
            { onChange = SetExpression >> toMsg
            , text = state.expression
            , placeholder = Just (Input.placeholder [] (Element.text "Example: (AB)'C+D"))
            , label = Input.labelHidden "Boolean expression"
            }
        , case parsed of
            Ok table ->
                viewTable colors table

            Err message ->
                Element.paragraph
                    [ Element.width Element.fill
                    , Element.padding 12
                    , Border.rounded 6
                    , Background.color colors.dangerSoft
                    , Font.color colors.danger
                    ]
                    [ Element.text message ]
        ]


type alias Table =
    { variables : List Char
    , rows : List ( List Bool, Bool )
    }


parse : String -> Result String Table
parse expression =
    let
        tokens =
            tokenize expression |> insertImplicitAnd

        variables =
            tokens
                |> List.filterMap
                    (\token ->
                        case token of
                            Var name ->
                                Just name

                            _ ->
                                Nothing
                    )
                |> Set.fromList
                |> Set.toList
    in
    if String.trim expression == "" then
        Err "Enter an expression to generate a truth table."

    else if List.isEmpty variables then
        Err "Use variables A-Z in the expression."

    else if List.length variables > 6 then
        Err "This prototype keeps tables to six variables or fewer."

    else
        case toRpn tokens of
            Err message ->
                Err message

            Ok rpn ->
                Ok
                    { variables = variables
                    , rows =
                        assignments variables
                            |> List.map
                                (\values ->
                                    ( values
                                    , evalRpn variables values rpn |> Maybe.withDefault False
                                    )
                                )
                    }


tokenize : String -> List Token
tokenize expression =
    expression
        |> String.toList
        |> List.filterMap
            (\char ->
                if Char.isAlpha char then
                    Just (Var (Char.toUpper char))

                else
                    case char of
                        '+' ->
                            Just Or

                        '\'' ->
                            Just Not

                        '(' ->
                            Just LParen

                        ')' ->
                            Just RParen

                        ' ' ->
                            Nothing

                        _ ->
                            Nothing
            )


insertImplicitAnd : List Token -> List Token
insertImplicitAnd tokens =
    case tokens of
        first :: second :: rest ->
            if needsImplicitAnd first second then
                first :: And :: insertImplicitAnd (second :: rest)

            else
                first :: insertImplicitAnd (second :: rest)

        _ ->
            tokens


needsImplicitAnd : Token -> Token -> Bool
needsImplicitAnd left right =
    isValueEnd left && isValueStart right


isValueEnd : Token -> Bool
isValueEnd token =
    case token of
        Var _ ->
            True

        RParen ->
            True

        Not ->
            True

        _ ->
            False


isValueStart : Token -> Bool
isValueStart token =
    case token of
        Var _ ->
            True

        LParen ->
            True

        _ ->
            False


toRpn : List Token -> Result String (List Token)
toRpn tokens =
    shunt tokens [] []
        |> Result.map
            (\( output, operators ) ->
                List.reverse output ++ operators
            )
        |> Result.andThen
            (\rpn ->
                if List.any (\token -> token == LParen || token == RParen) rpn then
                    Err "Check the parentheses in the expression."

                else
                    Ok rpn
            )


shunt : List Token -> List Token -> List Token -> Result String ( List Token, List Token )
shunt tokens output operators =
    case tokens of
        [] ->
            Ok ( output, operators )

        token :: rest ->
            case token of
                Var _ ->
                    shunt rest (token :: output) operators

                LParen ->
                    shunt rest output (token :: operators)

                RParen ->
                    popUntilParen rest output operators

                _ ->
                    let
                        ( moved, remaining ) =
                            popWhileHigher token operators
                    in
                    shunt rest (moved ++ output) (token :: remaining)


popUntilParen : List Token -> List Token -> List Token -> Result String ( List Token, List Token )
popUntilParen rest output operators =
    case operators of
        [] ->
            Err "Check the parentheses in the expression."

        operator :: remaining ->
            if operator == LParen then
                shunt rest output remaining

            else
                popUntilParen rest (operator :: output) remaining


popWhileHigher : Token -> List Token -> ( List Token, List Token )
popWhileHigher token operators =
    case operators of
        operator :: rest ->
            if operator /= LParen && precedence operator >= precedence token then
                let
                    ( moved, remaining ) =
                        popWhileHigher token rest
                in
                ( operator :: moved, remaining )

            else
                ( [], operators )

        [] ->
            ( [], [] )


precedence : Token -> Int
precedence token =
    case token of
        Not ->
            3

        And ->
            2

        Or ->
            1

        _ ->
            0


assignments : List Char -> List (List Bool)
assignments variables =
    let
        count =
            List.length variables

        maxValue =
            2 ^ count - 1
    in
    List.range 0 maxValue
        |> List.map
            (\row ->
                (List.range 0 (count - 1) |> List.reverse)
                    |> List.map (\bit -> modBy 2 (row // (2 ^ bit)) == 1)
            )


evalRpn : List Char -> List Bool -> List Token -> Maybe Bool
evalRpn variables values rpn =
    let
        env =
            List.map2 Tuple.pair variables values
    in
    evalHelp env [] rpn
        |> Maybe.andThen
            (\stack ->
                case stack of
                    [ result ] ->
                        Just result

                    _ ->
                        Nothing
            )


evalHelp : List ( Char, Bool ) -> List Bool -> List Token -> Maybe (List Bool)
evalHelp env stack rpn =
    case rpn of
        [] ->
            Just stack

        token :: rest ->
            case token of
                Var name ->
                    lookup name env
                        |> Maybe.andThen (\value -> evalHelp env (value :: stack) rest)

                Not ->
                    case stack of
                        value :: remaining ->
                            evalHelp env (not value :: remaining) rest

                        _ ->
                            Nothing

                And ->
                    evalBinary (&&) env stack rest

                Or ->
                    evalBinary (||) env stack rest

                _ ->
                    Nothing


evalBinary : (Bool -> Bool -> Bool) -> List ( Char, Bool ) -> List Bool -> List Token -> Maybe (List Bool)
evalBinary operation env stack rest =
    case stack of
        right :: left :: remaining ->
            evalHelp env (operation left right :: remaining) rest

        _ ->
            Nothing


lookup : Char -> List ( Char, Bool ) -> Maybe Bool
lookup name env =
    env
        |> List.filterMap
            (\( candidate, value ) ->
                if candidate == name then
                    Just value

                else
                    Nothing
            )
        |> List.head


viewTable : Colors r -> Table -> Element msg
viewTable colors table =
    Element.column
        [ Element.htmlAttribute (A.attribute "role" "table")
        , Element.htmlAttribute (A.attribute "aria-label" "Generated truth table")
        , Element.width Element.fill
        , Element.spacing 0
        , Border.width 1
        , Border.color colors.line
        , Element.scrollbarX
        ]
        (tableHeader colors table.variables
            :: (table.rows |> List.map (tableRow colors table.variables))
        )


tableHeader : Colors r -> List Char -> Element msg
tableHeader colors variables =
    Element.row [ Element.htmlAttribute (A.attribute "role" "row"), Element.width Element.fill ]
        ((variables |> List.map (tableCell colors True << String.fromChar))
            ++ [ tableCell colors True "Y" ]
        )


tableRow : Colors r -> List Char -> ( List Bool, Bool ) -> Element msg
tableRow colors variables ( values, result ) =
    Element.row [ Element.htmlAttribute (A.attribute "role" "row"), Element.width Element.fill ]
        ((values |> List.map (bitText >> tableCell colors False))
            ++ [ tableCell colors False (bitText result) ]
        )


tableCell : Colors r -> Bool -> String -> Element msg
tableCell colors isHeader value =
    Element.el
        [ Element.htmlAttribute (A.attribute "role" (if isHeader then "columnheader" else "cell"))
        , Element.width (Element.px 58)
        , Element.padding 9
        , Border.widthEach { top = 0, bottom = 1, left = 0, right = 1 }
        , Border.color colors.line
        , Background.color
            (if isHeader then
                colors.code

             else if value == "1" then
                colors.successSoft

             else
                colors.paper
            )
        , Font.color
            (if isHeader then
                colors.codeText

             else
                colors.ink
            )
        , Font.family [ Font.monospace ]
        , Font.bold
        , Font.center
        ]
        (Element.text value)


bitText : Bool -> String
bitText value =
    if value then
        "1"

    else
        "0"
