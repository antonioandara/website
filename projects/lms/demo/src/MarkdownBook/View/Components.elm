module MarkdownBook.View.Components exposing
    ( bodyTextAttrs
    , card
    , codeBlockHtml
    , feedbackPanel
    , inlineCodeAttrs
    , linkAttrs
    , primitiveKicker
    , tableCell
    )

import Element exposing (Attribute, Color, Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Html
import Html.Attributes as HtmlAttr
import MarkdownBook.View.Theme exposing (Palette, Typography)
import Parser
import SyntaxHighlight


card : Palette -> List (Attribute msg) -> List (Element msg) -> Element msg
card colors attrs children =
    Element.column
        ([ Element.width Element.fill
         , Element.spacing 16
         , Element.padding 20
         , Border.rounded 14
         , Border.width 1
         ]
            ++ attrs
        )
        children


primitiveKicker : Palette -> String -> String -> Element msg
primitiveKicker colors label detail =
    Element.row [ Element.spacing 8, Element.width Element.fill ]
        [ Element.el
            [ Font.size 11
            , Font.bold
            , Font.letterSpacing 0.8
            , Font.color colors.accent
            , Background.color colors.accentSoft
            , Border.rounded 20
            , Element.paddingEach { top = 5, bottom = 5, left = 9, right = 9 }
            ]
            (Element.text (String.toUpper label))
        , Element.el [ Font.size 12, Font.color colors.muted ] (Element.text detail)
        ]


feedbackPanel : Palette -> Bool -> String -> Element msg
feedbackPanel colors positive message =
    card colors
        [ Border.color
            (if positive then
                colors.success

             else
                colors.danger
            )
        , Background.color
            (if positive then
                colors.successSoft

             else
                colors.dangerSoft
            )
        ]
        [ Element.paragraph [ Element.spacing 6 ] [ Element.text message ] ]


tableCell : Palette -> List (Attribute msg) -> List (Element msg) -> Element msg
tableCell colors attrs children =
    Element.el
        ([ Element.width Element.fill
         , Element.padding 10
         , Border.widthEach { top = 0, bottom = 1, left = 0, right = 1 }
         , Border.color colors.line
         , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
         ]
            ++ attrs
        )
        (Element.paragraph
            [ Element.spacing 4
            , Element.htmlAttribute (HtmlAttr.style "overflow-wrap" "anywhere")
            , Element.htmlAttribute (HtmlAttr.style "word-break" "break-word")
            ]
            children
        )


bodyTextAttrs : Palette -> Typography -> List (Attribute msg)
bodyTextAttrs colors typography =
    [ Font.size typography.bodySize
    , Element.spacing 9
    , Font.color colors.ink
    , Element.htmlAttribute (HtmlAttr.style "line-height" (String.fromFloat typography.lineHeight))
    , Element.htmlAttribute (HtmlAttr.style "overflow-wrap" "anywhere")
    , Element.htmlAttribute (HtmlAttr.style "word-break" "break-word")
    , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
    ]


inlineCodeAttrs : Palette -> List (Attribute msg)
inlineCodeAttrs colors =
    [ Font.family [ Font.monospace ]
    , Font.size 14
    , Background.color colors.codeInline
    , Border.rounded 5
    , Element.paddingEach { top = 3, bottom = 3, left = 6, right = 6 }
    , Element.htmlAttribute (HtmlAttr.style "overflow-wrap" "anywhere")
    , Element.htmlAttribute (HtmlAttr.style "word-break" "break-word")
    ]


linkAttrs : Palette -> List (Attribute msg)
linkAttrs colors =
    [ Font.color colors.accent
    , Font.semiBold
    , Element.htmlAttribute (HtmlAttr.style "overflow-wrap" "anywhere")
    , Element.htmlAttribute (HtmlAttr.style "word-break" "break-word")
    ]


codeBlockHtml : Palette -> String -> Result (List Parser.DeadEnd) SyntaxHighlight.HCode -> Html.Html msg
codeBlockHtml colors body highlighted =
    Html.div
        [ HtmlAttr.class "markdownbook-code"
        , HtmlAttr.style "max-width" "100%"
        , HtmlAttr.style "min-width" "0"
        ]
        [ Html.node "style"
            []
            [ Html.text ".markdownbook-code pre,.markdownbook-code code{white-space:pre-wrap!important;overflow-wrap:anywhere;word-break:break-word;max-width:100%;}" ]
        , highlighted
            |> Result.map (SyntaxHighlight.toBlockHtml (Just 1))
            |> Result.withDefault (plainCodeHtml colors body)
        ]


plainCodeHtml : Palette -> String -> Html.Html msg
plainCodeHtml colors body =
    Html.pre
        [ HtmlAttr.style "margin" "0"
        , HtmlAttr.style "padding" "16px"
        , HtmlAttr.style "white-space" "pre-wrap"
        , HtmlAttr.style "overflow-wrap" "anywhere"
        , HtmlAttr.style "word-break" "break-word"
        , HtmlAttr.style "color" (cssRgb colors.codeText)
        ]
        [ Html.code [] [ Html.text body ] ]


cssRgb : Color -> String
cssRgb color =
    let
        rgb =
            Element.toRgb color
    in
    "rgba("
        ++ String.fromInt (round (rgb.red * 255))
        ++ ", "
        ++ String.fromInt (round (rgb.green * 255))
        ++ ", "
        ++ String.fromInt (round (rgb.blue * 255))
        ++ ", "
        ++ String.fromFloat rgb.alpha
        ++ ")"
