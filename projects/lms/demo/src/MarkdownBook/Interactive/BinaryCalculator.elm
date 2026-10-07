module MarkdownBook.Interactive.BinaryCalculator exposing
    ( Msg(..)
    , Operator(..)
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


type Operator
    = And
    | Or
    | Xor


type alias State =
    { a : Int
    , b : Int
    , operator : Operator
    }


type Msg
    = ToggleA Int
    | ToggleB Int
    | SetA String
    | SetB String
    | SetOperator Operator


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
        , success : Color
        , successSoft : Color
        , code : Color
        , codeText : Color
    }


defaultState : State
defaultState =
    { a = 0
    , b = 0
    , operator = Or
    }


update : Msg -> State -> State
update msg state =
    case msg of
        ToggleA bit ->
            { state | a = toggleBit bit state.a }

        ToggleB bit ->
            { state | b = toggleBit bit state.b }

        SetA value ->
            { state | a = parseByte value }

        SetB value ->
            { state | b = parseByte value }

        SetOperator operator ->
            { state | operator = operator }


view : Colors r -> (Msg -> msg) -> State -> Element msg
view colors toMsg state =
    let
        answer =
            calculate state
    in
    Element.column
        [ Element.width Element.fill
        , Element.spacing 0
        , Border.rounded 8
        , Border.width 1
        , Border.color colors.line
        , Background.color colors.white
        , Element.clip
        ]
        [ header colors "Binary Calculator"
        , Element.column [ Element.width Element.fill, Element.spacing 16, Element.padding 16 ]
            [ bitGrid colors toMsg state
            , operatorPicker colors toMsg state.operator
            , answerGrid colors state.operator answer
            ]
        ]


header : Colors r -> String -> Element msg
header colors title =
    Element.row
        [ Element.width Element.fill
        , Element.paddingEach { top = 9, bottom = 9, left = 12, right = 12 }
        , Background.color colors.code
        ]
        [ Element.el [ Font.size 12, Font.bold, Font.color colors.codeText ] (Element.text title) ]


bitGrid : Colors r -> (Msg -> msg) -> State -> Element msg
bitGrid colors toMsg state =
    Element.column [ Element.width Element.fill, Element.spacing 8 ]
        [ bitRow colors (ToggleA >> toMsg) "A" state.a
        , decimalInput colors (SetA >> toMsg) "A decimal" state.a
        , bitRow colors (ToggleB >> toMsg) "B" state.b
        , decimalInput colors (SetB >> toMsg) "B decimal" state.b
        ]


bitRow : Colors r -> (Int -> msg) -> String -> Int -> Element msg
bitRow colors toMsg label value =
    Element.row [ Element.width Element.fill, Element.spacing 0 ]
        (Element.el
            [ Element.width (Element.px 34)
            , Element.height (Element.px 64)
            , Background.color colors.code
            , Font.color colors.codeText
            , Font.bold
            ]
            (Element.el [ Element.centerX, Element.centerY ] (Element.text label))
            :: ((List.range 0 7 |> List.reverse)
                    |> List.map
                        (\bit ->
                            bitButton colors (toMsg bit) (bitValue bit value) (String.fromInt (2 ^ bit))
                        )
               )
        )


bitButton : Colors r -> msg -> Bool -> String -> Element msg
bitButton colors onPress active heading =
    Input.button
        [ Element.width Element.fill
        , Element.height (Element.px 64)
        , Border.widthEach { top = 0, bottom = 0, left = 0, right = 1 }
        , Border.color colors.line
        , Background.color
            (if active then
                colors.successSoft

             else
                colors.paper
            )
        , Element.mouseOver [ Background.color colors.hover ]
        ]
        { onPress = Just onPress
        , label =
            Element.column [ Element.centerX, Element.centerY, Element.spacing 4 ]
                [ Element.el [ Font.size 11, Font.color colors.muted, Element.centerX ] (Element.text heading)
                , Element.el [ Font.size 18, Font.bold, Font.color colors.ink, Element.centerX ]
                    (Element.text
                        (if active then
                            "1"

                         else
                            "0"
                        )
                    )
                ]
        }


decimalInput : Colors r -> (String -> msg) -> String -> Int -> Element msg
decimalInput colors toMsg label value =
    Input.text
        [ Element.width (Element.px 150)
        , Element.alignRight
        , Element.padding 8
        , Border.rounded 6
        , Border.width 1
        , Border.color colors.line
        , Background.color colors.sidebar
        , Font.color colors.ink
        ]
        { onChange = toMsg
        , text = String.fromInt value
        , placeholder = Nothing
        , label = Input.labelLeft [ Font.size 13, Font.color colors.muted ] (Element.text label)
        }


operatorPicker : Colors r -> (Msg -> msg) -> Operator -> Element msg
operatorPicker colors toMsg selected =
    Input.radioRow
        [ Element.spacing 8 ]
        { onChange = SetOperator >> toMsg
        , selected = Just selected
        , label = Input.labelLeft [ Font.size 13, Font.bold, Font.color colors.muted ] (Element.text "Operation")
        , options =
            [ operatorOption colors selected And
            , operatorOption colors selected Or
            , operatorOption colors selected Xor
            ]
        }


operatorOption : Colors r -> Operator -> Operator -> Input.Option Operator msg
operatorOption colors selected operator =
    Input.optionWith operator <|
        \_ ->
            Element.el
                [ Element.paddingEach { top = 8, bottom = 8, left = 12, right = 12 }
                , Border.rounded 6
                , Border.width 1
                , Border.color
                    (if selected == operator then
                        colors.accent

                     else
                        colors.line
                    )
                , Background.color
                    (if selected == operator then
                        colors.accentSoft

                     else
                        colors.white
                    )
                , Font.size 13
                , Font.bold
                , Font.color colors.ink
                ]
                (Element.text (operatorLabel operator))


answerGrid : Colors r -> Operator -> Int -> Element msg
answerGrid colors operator answer =
    Element.column [ Element.width Element.fill, Element.spacing 8 ]
        [ Element.row [ Element.spacing 8, Element.width Element.fill ]
            [ Element.el [ Font.size 13, Font.bold, Font.color colors.accent ] (Element.text ("Answer: " ++ operatorLabel operator))
            , Element.el [ Element.alignRight, Font.size 13, Font.color colors.muted ]
                (Element.text ("Decimal " ++ String.fromInt answer))
            ]
        , Element.row [ Element.width Element.fill, Element.spacing 0 ]
            ((List.range 0 7 |> List.reverse)
                |> List.map
                    (\bit ->
                        Element.el
                            [ Element.width Element.fill
                            , Element.height (Element.px 48)
                            , Border.widthEach { top = 1, bottom = 1, left = 0, right = 1 }
                            , Border.color colors.line
                            , Background.color colors.successSoft
                            ]
                            (Element.column [ Element.centerX, Element.centerY, Element.spacing 2 ]
                                [ Element.el [ Font.size 11, Font.color colors.muted, Element.centerX ] (Element.text (String.fromInt (2 ^ bit)))
                                , Element.el [ Font.size 18, Font.bold, Font.color colors.ink, Element.centerX ]
                                    (Element.text
                                        (if bitValue bit answer then
                                            "1"

                                         else
                                            "0"
                                        )
                                    )
                                ]
                            )
                    )
            )
        ]


calculate : State -> Int
calculate state =
    case state.operator of
        And ->
            bitwiseAnd state.a state.b

        Or ->
            bitwiseOr state.a state.b

        Xor ->
            bitwiseXor state.a state.b


toggleBit : Int -> Int -> Int
toggleBit bit value =
    if bitValue bit value then
        value - 2 ^ bit

    else
        clamp 0 255 (value + 2 ^ bit)


bitValue : Int -> Int -> Bool
bitValue bit value =
    modBy 2 (value // (2 ^ bit)) == 1


parseByte : String -> Int
parseByte value =
    value
        |> String.toInt
        |> Maybe.withDefault 0
        |> clamp 0 255


bitwiseAnd : Int -> Int -> Int
bitwiseAnd a b =
    bitsToInt (\bit -> bitValue bit a && bitValue bit b)


bitwiseOr : Int -> Int -> Int
bitwiseOr a b =
    bitsToInt (\bit -> bitValue bit a || bitValue bit b)


bitwiseXor : Int -> Int -> Int
bitwiseXor a b =
    bitsToInt (\bit -> bitValue bit a /= bitValue bit b)


bitsToInt : (Int -> Bool) -> Int
bitsToInt predicate =
    List.range 0 7
        |> List.filter predicate
        |> List.map (\bit -> 2 ^ bit)
        |> List.sum


operatorLabel : Operator -> String
operatorLabel operator =
    case operator of
        And ->
            "AND"

        Or ->
            "OR"

        Xor ->
            "XOR"
