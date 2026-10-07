module MarkdownBook.View.Markdown exposing (viewMarkdown, withHeadingIds)

import Dict
import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Char
import Html
import Html.Attributes as HtmlAttr
import Markdown.Block as Block
import Markdown.Html
import Markdown.Parser
import Markdown.Renderer
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.State as InteractiveState
import MarkdownBook.Interactive.TruthTable as TruthTable
import MarkdownBook.Model exposing (Chapter, LearnerState)
import MarkdownBook.Primitive as Primitive
import MarkdownBook.View.Components exposing (bodyTextAttrs, card, codeBlockHtml, inlineCodeAttrs, linkAttrs, tableCell)
import MarkdownBook.View.MarkdownStyle as MarkdownStyle exposing (CodeStyle(..), HeadingStyle(..), ImageStyle(..), LinkStyle(..), ListStyle(..), QuoteStyle(..), TableStyle(..))
import MarkdownBook.View.Primitives as Primitives
import MarkdownBook.View.Theme exposing (Palette, ThemeInfo, Typography)
import Parser
import SyntaxHighlight


type alias Config msg r =
    { r
        | onSelectQuizOption : String -> String -> Bool -> msg
        , onUpdateQuizResponse : String -> String -> msg
        , onSubmitQuiz : String -> msg
        , onUpdateExercise : String -> String -> msg
        , onSubmitExercise : String -> msg
        , onBooleanAlgebra : String -> BooleanAlgebra.Msg -> msg
        , onBinaryCalculator : String -> BinaryCalculator.Msg -> msg
        , onTruthTable : String -> TruthTable.Msg -> msg
        , interactives : InteractiveState.State
        , themeInfo : ThemeInfo
    }


viewMarkdown : Palette -> Typography -> MarkdownStyle.Settings -> Config msg r -> LearnerState -> Chapter -> Element msg
viewMarkdown colors typography markdownStyle config learner chapter =
    case
        chapter.body
            |> Markdown.Parser.parse
            |> Result.mapError (List.map Markdown.Parser.deadEndToString >> String.join "\n")
            |> Result.map withHeadingIds
            |> Result.andThen (Markdown.Renderer.render (renderer colors typography markdownStyle config learner))
    of
        Ok rendered ->
            Element.column [ Element.spacing (round markdownStyle.contentGap), Element.width Element.fill ] rendered

        Err error ->
            card colors [ Border.color colors.danger, Background.color colors.dangerSoft ]
                [ Element.el [ Font.bold ] (Element.text "Markdown parse error")
                , Element.paragraph [] [ Element.text error ]
                ]


renderer : Palette -> Typography -> MarkdownStyle.Settings -> Config msg r -> LearnerState -> Markdown.Renderer.Renderer (Element msg)
renderer colors typography markdownStyle config learner =
    { heading = viewHeading colors typography markdownStyle
    , paragraph = \children -> Element.paragraph (paragraphAttrs colors typography markdownStyle) children
    , blockQuote = viewBlockQuote colors markdownStyle
    , html = htmlRenderer colors typography markdownStyle config learner
    , text = Element.text
    , codeSpan = \value -> Element.el (inlineCodeAttrs colors ++ [ Border.rounded (round (markdownStyle.codeRadius / 2)) ]) (Element.text value)
    , strong = \children -> Element.el [ Font.bold ] (Element.paragraph [] children)
    , emphasis = \children -> Element.el [ Font.italic ] (Element.paragraph [] children)
    , strikethrough = \children -> Element.el [ Font.strike ] (Element.paragraph [] children)
    , hardLineBreak = Element.html (Html.br [] [])
    , link = \link children -> Element.newTabLink (linkAttrs colors ++ markdownLinkAttrs colors markdownStyle) { url = link.destination, label = Element.paragraph [] children }
    , image = viewImage colors markdownStyle
    , unorderedList = viewUnorderedList colors markdownStyle
    , orderedList = viewOrderedList colors markdownStyle
    , codeBlock = viewCodeBlock colors markdownStyle config learner
    , thematicBreak = Element.el [ Element.width Element.fill, Element.height (Element.px (max 0 (round markdownStyle.dividerThickness))), Background.color colors.line ] Element.none
    , table =
        \children ->
            Element.el
                [ Element.width Element.fill
                , Element.scrollbarX
                , Element.htmlAttribute (HtmlAttr.style "max-width" "100%")
                , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                ]
                (Element.column (tableContainerAttrs colors markdownStyle) children)
    , tableHeader = \children -> Element.column [ Element.width Element.fill ] children
    , tableBody = \children -> Element.column [ Element.width Element.fill ] children
    , tableRow =
        \children ->
            Element.row
                [ Element.width Element.fill
                , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                ]
                children
    , tableCell = \_ children -> tableCell colors (tableCellAttrs colors markdownStyle False) children
    , tableHeaderCell = \_ children -> tableCell colors (tableCellAttrs colors markdownStyle True) children
    }


htmlRenderer : Palette -> Typography -> MarkdownStyle.Settings -> Config msg r -> LearnerState -> Markdown.Html.Renderer (List (Element msg) -> Element msg)
htmlRenderer colors typography markdownStyle config learner =
    Markdown.Html.oneOf
        [ Markdown.Html.tag "callout"
            (\maybeType children -> Primitives.viewCallout colors (Maybe.withDefault "note" maybeType) children)
            |> Markdown.Html.withOptionalAttribute "type"
        , Markdown.Html.tag "section-heading"
            (\id level children -> viewSectionHeading colors typography markdownStyle id level children)
            |> Markdown.Html.withAttribute "id"
            |> Markdown.Html.withAttribute "level"
        , Markdown.Html.tag "video"
            (\src maybeTitle _ -> Primitives.viewVideo colors src (Maybe.withDefault "Embedded video" maybeTitle))
            |> Markdown.Html.withAttribute "src"
            |> Markdown.Html.withOptionalAttribute "title"
        , Markdown.Html.tag "quiz"
            (\id _ -> Primitives.viewReferencedPrimitive colors "quiz" id)
            |> Markdown.Html.withAttribute "id"
        , Markdown.Html.tag "exercise"
            (\id _ -> Primitives.viewReferencedPrimitive colors "exercise" id)
            |> Markdown.Html.withAttribute "id"
        , Markdown.Html.tag "feedback"
            (\maybeFor maybeWhen children ->
                Primitives.viewFeedbackBlock colors
                    { for = Maybe.withDefault "unlinked" maybeFor
                    , when = Maybe.withDefault "submitted" maybeWhen
                    , children = children
                    }
            )
            |> Markdown.Html.withOptionalAttribute "for"
            |> Markdown.Html.withOptionalAttribute "when"
        , Markdown.Html.tag "circuit"
            (\id maybeHeight maybeTheme maybeClock _ ->
                Primitives.viewCircuitEmbed colors
                    id
                    (Maybe.withDefault "400" maybeHeight)
                    (Maybe.withDefault "" maybeTheme)
                    (Maybe.withDefault "true" maybeClock)
            )
            |> Markdown.Html.withAttribute "id"
            |> Markdown.Html.withOptionalAttribute "height"
            |> Markdown.Html.withOptionalAttribute "theme"
            |> Markdown.Html.withOptionalAttribute "clock"
        , Markdown.Html.tag "boolean-algebra"
            (\maybeId _ ->
                let
                    id =
                        Maybe.withDefault "boolean-algebra" maybeId
                in
                Primitives.viewBooleanAlgebra colors config id
            )
            |> Markdown.Html.withOptionalAttribute "id"
        , Markdown.Html.tag "binary-calculator"
            (\maybeId _ ->
                let
                    id =
                        Maybe.withDefault "binary-calculator" maybeId
                in
                Primitives.viewBinaryCalculator colors config id
            )
            |> Markdown.Html.withOptionalAttribute "id"
        , Markdown.Html.tag "truth-table"
            (\maybeId _ ->
                let
                    id =
                        Maybe.withDefault "truth-table" maybeId
                in
                Primitives.viewTruthTable colors config id
            )
            |> Markdown.Html.withOptionalAttribute "id"
        ]


viewCodeBlock : Palette -> MarkdownStyle.Settings -> Config msg r -> LearnerState -> { body : String, language : Maybe String } -> Element msg
viewCodeBlock colors markdownStyle config learner code =
    let
        ( name, maybeId ) =
            Primitive.parseInfo code.language
    in
    case name of
        "quiz" ->
            Primitive.parseQuiz maybeId code.body
                |> Primitives.viewQuiz colors config learner

        "exercise" ->
            Primitive.parseExercise maybeId code.body
                |> Primitives.viewExercise colors config learner

        "boolean-algebra" ->
            Primitives.viewBooleanAlgebra colors config (Maybe.withDefault "boolean-algebra" maybeId)

        "binary-calculator" ->
            Primitives.viewBinaryCalculator colors config (Maybe.withDefault "binary-calculator" maybeId)

        "truth-table" ->
            Primitives.viewTruthTable colors config (Maybe.withDefault "truth-table" maybeId)

        _ ->
            viewPlainCode colors markdownStyle code


viewHeading : Palette -> Typography -> MarkdownStyle.Settings -> { level : Block.HeadingLevel, rawText : String, children : List (Element msg) } -> Element msg
viewHeading colors typography markdownStyle { level, rawText, children } =
    let
        size =
            case level of
                Block.H1 ->
                    round markdownStyle.h1Size

                Block.H2 ->
                    round markdownStyle.h2Size

                Block.H3 ->
                    round markdownStyle.h3Size

                Block.H4 ->
                    typography.bodySize + 1

                Block.H5 ->
                    15

                Block.H6 ->
                    13
    in
    Element.paragraph
        ([ Font.size size
        , Font.bold
        , Font.family [ Font.typeface typography.displayFont, Font.sansSerif ]
        , Font.color (MarkdownStyle.headingColor colors markdownStyle)
        , Font.letterSpacing markdownStyle.headingTracking
        , Element.spacing 8
        , Element.htmlAttribute (HtmlAttr.style "scroll-margin-top" "24px")
        ] ++ headingTreatmentAttrs colors markdownStyle)
        children


viewSectionHeading : Palette -> Typography -> MarkdownStyle.Settings -> String -> String -> List (Element msg) -> Element msg
viewSectionHeading colors typography markdownStyle id level children =
    let
        levelInt =
            String.toInt level |> Maybe.withDefault 2

        size =
            case levelInt of
                1 ->
                    round markdownStyle.h1Size

                2 ->
                    round markdownStyle.h2Size

                3 ->
                    round markdownStyle.h3Size

                4 ->
                    typography.bodySize + 1

                5 ->
                    15

                _ ->
                    13
    in
    Element.column
        [ Element.width Element.fill
        , Element.spacing 4
        , Element.paddingEach { top = round markdownStyle.headingTopSpace, bottom = 0, left = 0, right = 0 }
        , Element.htmlAttribute (HtmlAttr.id id)
        , Element.htmlAttribute (HtmlAttr.style "scroll-margin-top" "24px")
        ]
        [ Element.el
            ([ Font.size size
            , Font.bold
            , Font.family [ Font.typeface typography.displayFont, Font.sansSerif ]
            , Font.letterSpacing markdownStyle.headingTracking
            , Font.color (MarkdownStyle.headingColor colors markdownStyle)
            , Element.width Element.fill
            ] ++ headingInnerTreatmentAttrs colors markdownStyle)
            (Element.column [ Element.spacing 0, Element.width Element.fill ] children)
        ]


viewUnorderedList : Palette -> MarkdownStyle.Settings -> List (Block.ListItem (Element msg)) -> Element msg
viewUnorderedList colors markdownStyle items =
    Element.column [ Element.spacing 8, Element.width Element.fill ]
        (items |> List.map (viewListItem colors (listMarker markdownStyle)))


viewOrderedList : Palette -> MarkdownStyle.Settings -> Int -> List (List (Element msg)) -> Element msg
viewOrderedList colors _ start items =
    Element.column [ Element.spacing 8, Element.width Element.fill ]
        (items
            |> List.indexedMap
                (\index children ->
                    Element.row
                        [ Element.spacing 12
                        , Element.alignTop
                        , Element.width Element.fill
                        , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                        ]
                        [ Element.el [ Element.width (Element.px 28), Font.alignRight, Font.color colors.muted ] (Element.text (String.fromInt (start + index) ++ "."))
                        , Element.column
                            [ Element.spacing 6
                            , Element.width Element.fill
                            , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                            ]
                            children
                        ]
                )
        )


viewListItem : Palette -> String -> Block.ListItem (Element msg) -> Element msg
viewListItem colors bullet item =
    case item of
        Block.ListItem task children ->
            let
                marker =
                    case task of
                        Block.NoTask ->
                            bullet

                        Block.IncompleteTask ->
                            "□"

                        Block.CompletedTask ->
                            "✓"
            in
            Element.row
                [ Element.spacing 12
                , Element.alignTop
                , Element.width Element.fill
                , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                ]
                [ Element.el [ Element.width (Element.px 24), Font.color colors.accent, Font.bold ] (Element.text marker)
                , Element.column
                    [ Element.spacing 6
                    , Element.width Element.fill
                    , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
                    ]
                    children
                ]


viewImage : Palette -> MarkdownStyle.Settings -> { alt : String, src : String, title : Maybe String } -> Element msg
viewImage colors markdownStyle image =
    Element.column [ Element.spacing 8, Element.width Element.fill ]
        [ Element.el
            [ Element.width Element.fill
            , Element.centerX
            ]
            (Element.html
                (Html.img
                    [ HtmlAttr.src image.src
                    , HtmlAttr.alt image.alt
                    , HtmlAttr.title (Maybe.withDefault "" image.title)
                    , HtmlAttr.style "display" "block"
                    , HtmlAttr.style "max-width" "100%"
                    , HtmlAttr.style "max-height" "360px"
                    , HtmlAttr.style "height" "auto"
                    , HtmlAttr.style "margin" "0 auto"
                    , HtmlAttr.style "border-radius" (String.fromInt (round markdownStyle.imageRadius) ++ "px")
                    , HtmlAttr.style "border" (imageBorderCss colors markdownStyle)
                    , HtmlAttr.style "box-shadow" (imageShadowCss markdownStyle)
                    ]
                    []
                )
            )
        , image.title
            |> Maybe.map (\title -> Element.el [ Element.centerX, Font.size 13, Font.color colors.muted ] (Element.text title))
            |> Maybe.withDefault Element.none
        ]


viewPlainCode : Palette -> MarkdownStyle.Settings -> { body : String, language : Maybe String } -> Element msg
viewPlainCode colors markdownStyle code =
    let
        language =
            code.language
                |> Maybe.withDefault "text"
                |> String.words
                |> List.head
                |> Maybe.withDefault "text"

        highlighted =
            highlight language code.body
    in
    Element.column
        ([ Element.width Element.fill
         , Element.spacing 0
         , Border.rounded (round markdownStyle.codeRadius)
         , Element.clip
         , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
         ]
            ++ codeBlockAttrs colors markdownStyle
        )
        [ Element.row
            [ Element.width Element.fill
            , Element.paddingEach { top = 7, bottom = 7, left = 12, right = 12 }
            , Background.color
                (if markdownStyle.codeStyle == SoftCode then
                    colors.codeInline

                 else
                    colors.code
                )
            , Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
            , Border.color colors.line
            ]
            [ Element.el [ Font.size 12, Font.bold, Font.color colors.codeText ]
                (Element.text (languageLabel language))
            ]
        , Element.el
            [ Element.width Element.fill
            , Element.htmlAttribute (HtmlAttr.style "overflow-x" "auto")
            , Element.htmlAttribute (HtmlAttr.style "max-width" "100%")
            , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
            , Element.htmlAttribute (HtmlAttr.style "font-size" "14px")
            ]
            (Element.html (codeBlockHtml colors code.body highlighted))
        ]


paragraphAttrs : Palette -> Typography -> MarkdownStyle.Settings -> List (Element.Attribute msg)
paragraphAttrs colors typography settings =
    bodyTextAttrs colors typography
        ++ [ Font.size (round settings.paragraphSize)
           , Font.color colors.ink
           , Element.htmlAttribute (HtmlAttr.style "line-height" (String.fromFloat settings.lineHeight))
           ]


headingTreatmentAttrs : Palette -> MarkdownStyle.Settings -> List (Element.Attribute msg)
headingTreatmentAttrs colors settings =
    case settings.headingStyle of
        PlainHeading ->
            [ Element.paddingEach { top = round settings.headingTopSpace, bottom = 0, left = 0, right = 0 } ]

        UnderlinedHeading ->
            [ Element.paddingEach { top = round settings.headingTopSpace, bottom = 8, left = 0, right = 0 }
            , Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
            , Border.color colors.line
            ]

        AccentBarHeading ->
            [ Element.paddingEach { top = round settings.headingTopSpace, bottom = 0, left = 12, right = 0 }
            , Border.widthEach { top = 0, bottom = 0, left = 4, right = 0 }
            , Border.color (MarkdownStyle.headingColor colors settings)
            ]


headingInnerTreatmentAttrs : Palette -> MarkdownStyle.Settings -> List (Element.Attribute msg)
headingInnerTreatmentAttrs colors settings =
    case settings.headingStyle of
        PlainHeading ->
            []

        UnderlinedHeading ->
            [ Element.paddingEach { top = 0, bottom = 8, left = 0, right = 0 }
            , Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
            , Border.color colors.line
            ]

        AccentBarHeading ->
            [ Element.paddingEach { top = 0, bottom = 0, left = 12, right = 0 }
            , Border.widthEach { top = 0, bottom = 0, left = 4, right = 0 }
            , Border.color (MarkdownStyle.headingColor colors settings)
            ]


markdownLinkAttrs : Palette -> MarkdownStyle.Settings -> List (Element.Attribute msg)
markdownLinkAttrs colors settings =
    let
        color =
            MarkdownStyle.linkColor colors settings
    in
    case settings.linkStyle of
        CleanLink ->
            [ Font.color color ]

        UnderlinedLink ->
            [ Font.color color, Font.underline ]

        HighlightedLink ->
            [ Font.color color
            , Background.color colors.accentSoft
            , Element.paddingEach { top = 1, bottom = 1, left = 4, right = 4 }
            , Border.rounded 4
            ]


viewBlockQuote : Palette -> MarkdownStyle.Settings -> List (Element msg) -> Element msg
viewBlockQuote colors settings children =
    let
        base =
            [ Element.width Element.fill, Element.spacing 8, Element.padding 16 ]

        treatment =
            case settings.quoteStyle of
                StripeQuote ->
                    [ Border.widthEach { top = 0, bottom = 0, left = 4, right = 0 }
                    , Border.color (MarkdownStyle.quoteColor colors settings)
                    , Background.color colors.accentSoft
                    ]

                PanelQuote ->
                    [ Border.width 1, Border.color colors.line, Border.rounded 10, Background.color colors.white ]

                MinimalQuote ->
                    [ Font.color colors.muted, Font.italic, Element.paddingEach { top = 6, bottom = 6, left = 18, right = 18 } ]
    in
    Element.column (base ++ treatment) children


listMarker : MarkdownStyle.Settings -> String
listMarker settings =
    case settings.listStyle of
        BulletList ->
            "•"

        DashList ->
            "—"

        ArrowList ->
            "→"


tableContainerAttrs : Palette -> MarkdownStyle.Settings -> List (Element.Attribute msg)
tableContainerAttrs colors settings =
    case settings.tableStyle of
        GridTable ->
            [ Element.width Element.fill, Element.spacing 0, Border.width 1, Border.color colors.line ]

        RowTable ->
            [ Element.width Element.fill, Element.spacing 0 ]

        SoftTable ->
            [ Element.width Element.fill, Element.spacing 0, Border.rounded 10, Element.clip, Background.color colors.paper ]


tableCellAttrs : Palette -> MarkdownStyle.Settings -> Bool -> List (Element.Attribute msg)
tableCellAttrs colors settings header =
    let
        borders =
            case settings.tableStyle of
                GridTable ->
                    Border.widthEach { top = 0, bottom = 1, left = 0, right = 1 }

                _ ->
                    Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
    in
    [ Element.padding (round settings.tablePadding)
    , borders
    , Border.color colors.line
    , Background.color
        (if header then
            colors.sidebar

         else
            colors.transparent
        )
    , if header then Font.bold else Font.regular
    ]


codeBlockAttrs : Palette -> MarkdownStyle.Settings -> List (Element.Attribute msg)
codeBlockAttrs colors settings =
    case settings.codeStyle of
        TerminalCode ->
            [ Border.width 1, Border.color colors.line, Background.color colors.code ]

        SoftCode ->
            [ Border.width 0, Background.color colors.codeInline ]

        MinimalCode ->
            [ Border.widthEach { top = 0, bottom = 0, left = 3, right = 0 }
            , Border.color colors.accent
            , Background.color colors.transparent
            ]


imageBorderCss : Palette -> MarkdownStyle.Settings -> String
imageBorderCss colors settings =
    case settings.imageStyle of
        CleanImage ->
            "none"

        FramedImage ->
            "8px solid " ++ colorCss colors.white

        EditorialImage ->
            "0"


imageShadowCss : MarkdownStyle.Settings -> String
imageShadowCss settings =
    case settings.imageStyle of
        FramedImage ->
            "0 10px 28px rgba(0,0,0,.16)"

        _ ->
            "none"


colorCss : Element.Color -> String
colorCss color =
    let
        rgb =
            Element.toRgb color
    in
    "rgba("
        ++ String.fromInt (round (rgb.red * 255))
        ++ ","
        ++ String.fromInt (round (rgb.green * 255))
        ++ ","
        ++ String.fromInt (round (rgb.blue * 255))
        ++ ","
        ++ String.fromFloat rgb.alpha
        ++ ")"


highlight : String -> String -> Result (List Parser.DeadEnd) SyntaxHighlight.HCode
highlight rawLanguage body =
    case normalizeLanguage rawLanguage of
        "elm" ->
            SyntaxHighlight.elm body

        "javascript" ->
            SyntaxHighlight.javascript body

        "css" ->
            SyntaxHighlight.css body

        "python" ->
            SyntaxHighlight.python body

        "sql" ->
            SyntaxHighlight.sql body

        "xml" ->
            SyntaxHighlight.xml body

        "json" ->
            SyntaxHighlight.json body

        "nix" ->
            SyntaxHighlight.nix body

        "kotlin" ->
            SyntaxHighlight.kotlin body

        "go" ->
            SyntaxHighlight.go body

        _ ->
            SyntaxHighlight.noLang body


normalizeLanguage : String -> String
normalizeLanguage rawLanguage =
    case String.toLower rawLanguage of
        "js" ->
            "javascript"

        "jsx" ->
            "javascript"

        "html" ->
            "xml"

        "svg" ->
            "xml"

        "py" ->
            "python"

        "kt" ->
            "kotlin"

        "golang" ->
            "go"

        "sh" ->
            "text"

        "bash" ->
            "text"

        language ->
            language


languageLabel : String -> String
languageLabel rawLanguage =
    case normalizeLanguage rawLanguage of
        "" ->
            "text"

        language ->
            language


withHeadingIds : List Block.Block -> List Block.Block
withHeadingIds blocks =
    blocks
        |> assignHeadingIds Dict.empty
        |> Tuple.second


assignHeadingIds : Dict.Dict String Int -> List Block.Block -> ( Dict.Dict String Int, List Block.Block )
assignHeadingIds counts blocks =
    case blocks of
        [] ->
            ( counts, [] )

        block :: rest ->
            let
                ( nextCounts, nextBlock ) =
                    assignHeadingId counts block

                ( finalCounts, nextRest ) =
                    assignHeadingIds nextCounts rest
            in
            ( finalCounts, nextBlock :: nextRest )


assignHeadingId : Dict.Dict String Int -> Block.Block -> ( Dict.Dict String Int, Block.Block )
assignHeadingId counts block =
    case block of
        Block.Heading level inlines ->
            let
                base =
                    Block.extractInlineText inlines
                        |> headingSlug

                count =
                    Dict.get base counts |> Maybe.withDefault 0

                id =
                    if count == 0 then
                        base

                    else
                        base ++ "-" ++ String.fromInt (count + 1)
            in
            ( Dict.insert base (count + 1) counts
            , Block.HtmlBlock
                (Block.HtmlElement "section-heading"
                    [ { name = "id", value = id }
                    , { name = "level", value = String.fromInt (Block.headingLevelToInt level) }
                    ]
                    [ Block.Heading level inlines ]
                )
            )

        _ ->
            ( counts, block )


headingSlug : String -> String
headingSlug rawText =
    rawText
        |> String.toLower
        |> String.map
            (\char ->
                if Char.isAlphaNum char then
                    char

                else
                    ' '
            )
        |> String.words
        |> String.join "-"
