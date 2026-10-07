module MarkdownBook.View.Layout exposing (viewBook)

import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html.Attributes as HtmlAttr
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.State as InteractiveState
import MarkdownBook.Interactive.TruthTable as TruthTable
import MarkdownBook.Model exposing (Book, Chapter, LearnerState)
import MarkdownBook.View.Markdown as MarkdownView
import MarkdownBook.View.MarkdownStyle as MarkdownStyle
import MarkdownBook.View.Sidebar as Sidebar
import MarkdownBook.View.Theme as Theme exposing (Palette, Theme, ThemeInfo, Typography)
import Set
import SyntaxHighlight


type alias Config msg r =
    { r
        | onSelectChapter : String -> msg
        , onToggleChapterComplete : String -> msg
        , onToggleSidebar : msg
        , onToggleTheme : msg
        , onSelectQuizOption : String -> String -> Bool -> msg
        , onUpdateQuizResponse : String -> String -> msg
        , onSubmitQuiz : String -> msg
        , onUpdateExercise : String -> String -> msg
        , onSubmitExercise : String -> msg
            , onBooleanAlgebra : String -> BooleanAlgebra.Msg -> msg
        , onBinaryCalculator : String -> BinaryCalculator.Msg -> msg
        , onTruthTable : String -> TruthTable.Msg -> msg
        , sidebarVisible : Bool
            , theme : Theme
        , themeInfo : ThemeInfo
        , markdownStyle : MarkdownStyle.Settings
        , interactives : InteractiveState.State
    }


viewBook : Config msg r -> Book -> LearnerState -> Chapter -> Element msg
viewBook config book learner activeChapter =
    let
        themeInfo =
            config.themeInfo

        colors =
            themeInfo.palette

        typography =
            themeInfo.typography
    in
    Element.row
        [ Element.width Element.fill
        , Element.height Element.fill
        , Background.color colors.paper
        , Font.family [ Font.typeface typography.bodyFont, Font.sansSerif ]
        , Font.color colors.ink
        , Element.inFront (Sidebar.viewSidebarToggle colors config)
        ]
        [ Sidebar.viewSidebar colors config book learner activeChapter
        , Element.el [ Element.width (Element.px 0), Element.height (Element.px 0) ]
            (Element.html (SyntaxHighlight.useTheme (Theme.syntaxTheme config.theme)))
        , Element.row
            [ Element.width Element.fill
            , Element.height Element.fill
            , Element.scrollbarY
            , Element.alignTop
            , Element.clipX
            , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
            , Element.htmlAttribute (HtmlAttr.style "max-width" "100vw")
            ]
            [ viewReader colors typography config book learner activeChapter
            ]
        ]


viewReader : Palette -> Typography -> Config msg r -> Book -> LearnerState -> Chapter -> Element msg
viewReader colors typography config book learner chapter =
    let
        readerMaxWidth =
            if config.sidebarVisible then
                typography.readerWidth

            else
                typography.readerWidth + 120

        horizontalPadding =
            typography.pagePadding
    in
    Element.column
        [ Element.htmlAttribute (HtmlAttr.class "lesson-reader")
        , Element.width Element.fill
        , Element.alignTop
        , Element.clipX
        , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
        ]
        [ Element.column
            [ Element.width (Element.maximum readerMaxWidth Element.fill)
            , Element.htmlAttribute (HtmlAttr.style "max-width" (String.fromInt readerMaxWidth ++ "px"))
            , Element.htmlAttribute (HtmlAttr.style "min-width" "0")
            , Element.centerX
            , Element.paddingEach { top = 34, bottom = 72, left = horizontalPadding, right = horizontalPadding }
            , Element.spacing typography.sectionSpacing
            ]
            [ Sidebar.viewTopBar colors config
            , viewChapterHeader colors typography config book learner chapter
            , MarkdownView.viewMarkdown colors typography config.markdownStyle config learner chapter
            , viewChapterPager colors config book chapter
            ]
        ]


viewChapterHeader : Palette -> Typography -> Config msg r -> Book -> LearnerState -> Chapter -> Element msg
viewChapterHeader colors typography config book learner chapter =
    let
        completed =
            Set.member chapter.slug learner.completedChapters

        lessonNumber =
            book.chapters
                |> List.indexedMap Tuple.pair
                |> List.filter (\( _, candidate ) -> candidate.slug == chapter.slug)
                |> List.head
                |> Maybe.map (Tuple.first >> (+) 1)
                |> Maybe.withDefault 1

        lessonMeta =
            "LESSON "
                ++ String.fromInt lessonNumber
                ++ " OF "
                ++ String.fromInt (List.length book.chapters)
    in
    Element.column
        [ Element.spacing 18
        , Element.width Element.fill
        , Element.paddingEach { top = 18, bottom = 28, left = 0, right = 0 }
        , Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
        , Border.color colors.line
        ]
        [ Element.row [ Element.width Element.fill ]
            [ Element.el [ Font.size 11, Font.bold, Font.color colors.accent, Font.letterSpacing 1 ] (Element.text lessonMeta)
            , Element.el
                [ Element.alignRight
                , Font.size 12
                , Font.color colors.muted
                , Background.color colors.white
                , Border.rounded 20
                , Border.width 1
                , Border.color colors.line
                , Element.paddingEach { top = 6, bottom = 6, left = 10, right = 10 }
                ]
                (Element.text ("About " ++ String.fromInt (max 1 (ceiling (toFloat (List.length (String.words chapter.body)) / 200))) ++ " min"))
            ]
        , Element.paragraph
            [ Font.size typography.titleSize
            , Font.bold
            , Font.family [ Font.typeface typography.displayFont, Font.sansSerif ]
            , Font.color colors.ink
            , Font.letterSpacing typography.titleTracking
            , Element.spacing 9
            ]
            [ Element.text chapter.title ]
        , Element.paragraph
            [ Font.size (typography.bodySize + 1)
            , Font.color colors.muted
            , Element.spacing 8
            , Element.htmlAttribute (HtmlAttr.style "line-height" "1.55")
            ]
            [ Element.text chapter.summary ]
        , Input.button
            [ Element.alignLeft
            , Element.paddingEach { top = 10, bottom = 10, left = 15, right = 15 }
            , Border.rounded 9
            , Border.width 1
            , Border.color
                (if completed then
                    colors.success

                 else
                    colors.line
                )
            , Background.color
                (if completed then
                    colors.successSoft

                 else
                    colors.white
                )
            , Font.size 14
            , Font.bold
            , Font.color
                (if completed then
                    colors.success

                 else
                    colors.ink
                )
            , Element.mouseOver [ Background.color colors.hover ]
            ]
            { onPress = Just (config.onToggleChapterComplete chapter.slug)
            , label =
                Element.text
                    (if completed then
                        "✓  Lesson completed"

                     else
                        "Mark lesson complete"
                    )
            }
        ]


viewChapterPager : Palette -> Config msg r -> Book -> Chapter -> Element msg
viewChapterPager colors config book activeChapter =
    let
        chapters =
            book.chapters

        indexed =
            chapters |> List.indexedMap Tuple.pair

        activeIndex =
            indexed
                |> List.filter (\( _, chapter ) -> chapter.slug == activeChapter.slug)
                |> List.head
                |> Maybe.map Tuple.first
                |> Maybe.withDefault 0

        previous =
            chapters |> dropExactly (activeIndex - 1) |> List.head

        next =
            chapters |> dropExactly (activeIndex + 1) |> List.head
    in
    Element.row
        [ Element.width Element.fill
        , Element.spacing 16
        , Element.paddingEach { top = 18, bottom = 0, left = 0, right = 0 }
        , Border.widthEach { top = 1, bottom = 0, left = 0, right = 0 }
        , Border.color colors.line
        ]
        [ pagerButton colors config "Previous" previous
        , Element.el [ Element.width Element.fill ] Element.none
        , pagerButton colors config "Next" next
        ]


pagerButton : Palette -> Config msg r -> String -> Maybe Chapter -> Element msg
pagerButton colors config label maybeChapter =
    case maybeChapter of
        Just chapter ->
            Input.button
                [ Element.paddingEach { top = 12, bottom = 12, left = 16, right = 16 }
                , Border.rounded 10
                , Border.width 1
                , Border.color colors.line
                , Background.color colors.white
                , Element.mouseOver [ Background.color colors.hover ]
                ]
                { onPress = Just (config.onSelectChapter chapter.slug)
                , label = Element.text (label ++ ": " ++ chapter.title)
                }

        Nothing ->
            Element.none


dropExactly : Int -> List a -> List a
dropExactly amount list =
    if amount < 0 then
        []

    else
        List.drop amount list
