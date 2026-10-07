module MarkdownBook.View.Sidebar exposing (viewSidebar, viewSidebarToggle, viewTopBar)

import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html.Attributes as H
import MarkdownBook.Model exposing (Book, Chapter, LearnerState)
import MarkdownBook.View.Theme exposing (Palette, Theme(..), ThemeInfo)
import Set


type alias Config msg r =
    { r
        | onSelectChapter : String -> msg
        , onToggleSidebar : msg
        , onToggleTheme : msg
        , sidebarVisible : Bool
        , theme : Theme
        , themeInfo : ThemeInfo
    }


viewSidebar : Palette -> Config msg r -> Book -> LearnerState -> Chapter -> Element msg
viewSidebar colors config book learner active =
    if not config.sidebarVisible then
        Element.none

    else
        Element.column
            [ Element.htmlAttribute (H.class "course-sidebar")
            , Element.width (Element.px config.themeInfo.typography.sidebarWidth)
            , Element.height Element.fill
            , Element.paddingEach { top = 82, bottom = 28, left = 24, right = 24 }
            , Element.spacing 24
            , Background.color colors.sidebar
            , Border.widthEach { top = 0, bottom = 0, left = 0, right = 1 }
            , Border.color colors.line
            ]
            [ Element.column [ Element.spacing 10, Element.width Element.fill ]
                [ Element.el [ Font.size 11, Font.color colors.accent, Font.letterSpacing 1 ] (Element.text "MARKDOWNBOOK / PREVIEW")
                , Element.paragraph [ Font.family [ Font.typeface "Libre Baskerville", Font.serif ], Font.size 23 ] [ Element.text book.title ]
                , Element.paragraph [ Font.size 12, Font.color colors.muted ] [ Element.text "Two short lessons. Read, try, learn." ]
                ]
            , Element.column [ Element.spacing 8, Element.width Element.fill ]
                (List.map (chapterButton colors config learner active) book.chapters)
            , Element.el [ Font.size 11, Font.color colors.muted ]
                (Element.text (String.fromInt (Set.size learner.completedChapters) ++ " / " ++ String.fromInt (List.length book.chapters) ++ " complete"))
            , Element.paragraph [ Font.size 11, Font.color colors.muted ] [ Element.text "Answers and progress reset on reload." ]
            ]


chapterButton : Palette -> Config msg r -> LearnerState -> Chapter -> Chapter -> Element msg
chapterButton colors config learner active chapter =
    Input.button
        [ Element.width Element.fill
        , Element.padding 12
        , Border.widthEach { top = 0, bottom = 0, left = 2, right = 0 }
        , Border.color (if chapter.slug == active.slug then colors.accent else colors.transparent)
        , Background.color (if chapter.slug == active.slug then colors.white else colors.sidebar)
        , Element.mouseOver [ Background.color colors.hover ]
        , Font.size 13
        , Element.htmlAttribute (H.attribute "aria-current" (if chapter.slug == active.slug then "page" else "false"))
        ]
        { onPress = Just (config.onSelectChapter chapter.slug)
        , label = Element.paragraph [] [ Element.text (chapter.title ++ (if Set.member chapter.slug learner.completedChapters then " ✓" else "")) ]
        }


viewTopBar : Palette -> Config msg r -> Element msg
viewTopBar colors config =
    Element.row
        [ Element.htmlAttribute (H.class "reader-topbar")
        , Element.width Element.fill
        , Element.spacing 16
        , Element.paddingEach { top = 0, bottom = 0, left = if config.sidebarVisible then 0 else 48, right = 0 }
        ]
        [ Element.link [ Font.size 11, Font.color colors.accent, Element.width Element.fill ]
            { url = "../../../index.html#lms", label = Element.text "← Antonio Andara" }
        , Input.button
            [ Element.htmlAttribute (H.class "demo-theme-toggle")
            , Element.htmlAttribute (H.attribute "role" "switch")
            , Element.htmlAttribute (H.attribute "aria-label" "Light mode")
            , Element.htmlAttribute (H.attribute "aria-checked" (if config.theme == FieldnotesLight then "true" else "false"))
            , Element.paddingEach { top = 12, bottom = 12, left = 0, right = 0 }
            , Font.size 11
            ]
            { onPress = Just config.onToggleTheme
            , label = Element.row [ Element.spacing 10 ]
                [ Element.text config.themeInfo.label
                , Element.el
                    [ Element.width (Element.px 40), Element.height (Element.px 24), Border.rounded 20, Border.width 1, Border.color colors.muted, Element.padding 3
                    , Background.color (if config.theme == FieldnotesLight then colors.accent else colors.white)
                    ]
                    (Element.el
                        [ Element.width (Element.px 16), Element.height (Element.px 16), Border.rounded 16
                        , Background.color (if config.theme == FieldnotesLight then colors.paper else colors.muted)
                        , if config.theme == FieldnotesLight then Element.alignRight else Element.alignLeft
                        ] Element.none)
                ]
            }
        ]


viewSidebarToggle : Palette -> Config msg r -> Element msg
viewSidebarToggle colors config =
    Input.button
        [ Element.htmlAttribute (H.class "sidebar-toggle")
        , Element.alignLeft, Element.alignTop, Element.moveRight 16, Element.moveDown 28
        , Element.width (Element.px 42), Element.height (Element.px 42)
        , Border.width 1, Border.color colors.line, Background.color colors.sidebar
        , Element.htmlAttribute (H.attribute "aria-label" (if config.sidebarVisible then "Hide sidebar" else "Show sidebar"))
        , Element.htmlAttribute (H.attribute "aria-expanded" (if config.sidebarVisible then "true" else "false"))
        ]
        { onPress = Just config.onToggleSidebar
        , label = Element.el [ Element.centerX, Element.centerY, Font.size 20 ] (Element.text (if config.sidebarVisible then "×" else "☰"))
        }
