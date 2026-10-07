module MarkdownBook.Interactive.BooleanAlgebra exposing
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
    | Not


type alias State =
    { left : Bool
    , right : Bool
    , operator : Operator
    }


type Msg
    = ToggleLeft
    | ToggleRight
    | SetOperator Operator


type alias Colors r =
    { r
        | white : Color
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
    { left = False
    , right = False
    , operator = And
    }


update : Msg -> State -> State
update msg state =
    case msg of
        ToggleLeft ->
            { state | left = not state.left }

        ToggleRight ->
            { state | right = not state.right }

        SetOperator operator ->
            { state | operator = operator }


view : Colors r -> (Msg -> msg) -> State -> Element msg
view colors toMsg state =
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
            [ labelBlock colors "Boolean Algebra"
            , Element.el [ Element.alignRight, Font.size 13, Font.color colors.muted ]
                (Element.text (expressionText state))
            ]
        , Element.wrappedRow
            [ Element.width Element.fill
            , Element.spacing 12
            ]
            [ bitSwitch colors (toMsg ToggleLeft) "A" state.left
            , operatorPicker colors toMsg state.operator
            , if state.operator == Not then
                Element.el [ Element.width (Element.px 96) ] Element.none

              else
                bitSwitch colors (toMsg ToggleRight) "B" state.right
            , Element.el
                [ Font.size 24
                , Font.bold
                , Font.color colors.muted
                , Element.centerY
                ]
                (Element.text "=")
            , resultLamp colors (evaluate state)
            ]
        ]


labelBlock : Colors r -> String -> Element msg
labelBlock colors label =
    Element.el
        [ Font.size 12
        , Font.bold
        , Font.color colors.accent
        ]
        (Element.text label)


bitSwitch : Colors r -> msg -> String -> Bool -> Element msg
bitSwitch colors onPress label active =
    Input.button
        [ Element.width (Element.px 96)
        , Element.height (Element.px 72)
        , Border.rounded 8
        , Border.width 1
        , Border.color
            (if active then
                colors.success

             else
                colors.line
            )
        , Background.color
            (if active then
                colors.successSoft

             else
                colors.sidebar
            )
        , Element.mouseOver [ Background.color colors.hover ]
        ]
        { onPress = Just onPress
        , label =
            Element.column [ Element.centerX, Element.centerY, Element.spacing 4 ]
                [ Element.el [ Font.size 13, Font.color colors.muted, Element.centerX ] (Element.text label)
                , Element.el [ Font.size 24, Font.bold, Font.color colors.ink, Element.centerX ]
                    (Element.text
                        (if active then
                            "1"

                         else
                            "0"
                        )
                    )
                ]
        }


operatorPicker : Colors r -> (Msg -> msg) -> Operator -> Element msg
operatorPicker colors toMsg selected =
    Element.column
        [ Element.width (Element.px 170)
        , Element.spacing 6
        ]
        [ Element.el [ Font.size 12, Font.bold, Font.color colors.muted ] (Element.text "Gate")
        , Input.radioRow
            [ Element.spacing 6
            , Element.width Element.fill
            ]
            { onChange = SetOperator >> toMsg
            , selected = Just selected
            , label = Input.labelHidden "Boolean operator"
            , options =
                [ operatorOption colors selected And
                , operatorOption colors selected Or
                , operatorOption colors selected Xor
                , operatorOption colors selected Not
                ]
            }
        ]


operatorOption : Colors r -> Operator -> Operator -> Input.Option Operator msg
operatorOption colors selected operator =
    Input.optionWith operator <|
        \_ ->
            Element.el
                [ Element.paddingEach { top = 8, bottom = 8, left = 10, right = 10 }
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
                , Font.size 12
                , Font.bold
                , Font.color colors.ink
                ]
                (Element.text (operatorLabel operator))


resultLamp : Colors r -> Bool -> Element msg
resultLamp colors active =
    Element.el
        [ Element.width (Element.px 86)
        , Element.height (Element.px 72)
        , Border.rounded 36
        , Border.width 2
        , Border.color
            (if active then
                colors.success

             else
                colors.line
            )
        , Background.color
            (if active then
                colors.success

             else
                colors.code
            )
        , Font.color
            (if active then
                colors.white

             else
                colors.codeText
            )
        , Font.bold
        ]
        (Element.el [ Element.centerX, Element.centerY, Font.size 22 ]
            (Element.text
                (if active then
                    "1"

                 else
                    "0"
                )
            )
        )


evaluate : State -> Bool
evaluate state =
    case state.operator of
        And ->
            state.left && state.right

        Or ->
            state.left || state.right

        Xor ->
            state.left /= state.right

        Not ->
            not state.left


expressionText : State -> String
expressionText state =
    case state.operator of
        Not ->
            "NOT A = " ++ bitText (evaluate state)

        _ ->
            "A " ++ operatorLabel state.operator ++ " B = " ++ bitText (evaluate state)


operatorLabel : Operator -> String
operatorLabel operator =
    case operator of
        And ->
            "AND"

        Or ->
            "OR"

        Xor ->
            "XOR"

        Not ->
            "NOT"


bitText : Bool -> String
bitText value =
    if value then
        "1"

    else
        "0"
