module SiteShell exposing (view)

import Content
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import FieldManual.Illustrations exposing (computerStack)
import Html exposing (Html, a, aside, button, div, footer, h1, header, main_, nav, p, section, span, text)
import Html.Attributes exposing (attribute, class, href, id, type_, classList, property, tabindex, title)
import Html.Events exposing (onClick)
import Json.Encode as Encode

view : Bool -> List ( String, String, String ) -> Html Msg -> Model -> Html Msg
view libraryPage chapters body model =
    div [ classList [ ( "night-manual", True ), ( "library-page", libraryPage ), ( "sidebar-open", model.sidebarOpen ) ], id "top", tabindex -1 ]
        [ a [ class "skip-link", href (if libraryPage then "#library" else "#engineering") ] [ text "Skip to the manual" ]
        , aside [ classList [ ( "sidebar", True ), ( "is-open", model.sidebarOpen ) ], id "manual-sidebar", property "inert" (Encode.bool (not model.sidebarOpen)), attribute "aria-label" "Manual contents" ]
            [ button [ class "sidebar-close icon-button", id "sidebar-close", onClick CloseSidebar, type_ "button", attribute "aria-label" "Close sidebar" ] [ text "×" ]
            , a [ class "wordmark", href "index.html" ] [ text "a3l" ]
            , div [ class "sidebar-body" ]
                [ p [ class "eyebrow" ] [ text "ANTONIO ANDARA" ]
                , p [ class "sidebar-title" ] [ text "A closer look." ]
                , p [ class "side-note" ] [ text "Open source engineering and a little sleight of hand." ]
                , nav [ attribute "aria-label" "Chapters" ] (List.map (\(number, target, title) -> a [ href ("#" ++ target), attribute "data-chapter" target, attribute "aria-current" (if model.activeChapter == Just target then "location" else "false") ] [ span [] [ text number ], text title ]) chapters)
                ]
            , div [ class "sidebar-foot" ]
                [ p [ class "eyebrow" ] [ text (if Reader.isLight model then "EDITION 02 / DAY" else "EDITION 01 / NIGHT") ]

                , a [ href Content.profile.github ] [ text "GitHub ↗" ]
                ]
            ]
        , div [ class "page-body" ]
            [ section [ class "cover personal-cover", attribute "aria-labelledby" "cover-title" ]
                [ div [ class "cover-meta eyebrow" ] [ span [] [ text "ANTONIO ANDARA — A PERSONAL FIELD MANUAL" ], span [ class "edition" ] [ text (if Reader.isLight model then "● DAY EDITION" else "● NIGHT EDITION") ] ]
                , div [ class "cover-grid" ]
                    [ div [ class "cover-copy" ]
                        [ p [ class "eyebrow blue" ] [ text "ENGINEERING / SOFTWARE / MAGIC" ]
                        , h1 [ id "cover-title" ] [ text (if libraryPage then "Drawing" else "Antonio"), Html.br [] [], text (if libraryPage then "library" else "Andara"), span [ class "title-dot" ] [ text "." ] ]
                        , p [ class "cover-deck" ] [ text (if libraryPage then "Small, reusable pieces of a visual language." else Content.profile.identity) ]
                        , p [ class "cover-description" ] [ text (if libraryPage then "A collection of schematics, patterns, and objects, drawn in Elm. Part of Antonio Andara’s personal field manual." else Content.profile.introduction) ]
                        , a [ class "read-link", href (if libraryPage then "#library" else "#engineering") ] [ text (if libraryPage then "Browse the drawings" else "Explore my work"), span [] [ text "↘" ] ]
                        ]
                    , div [ class "cover-plate" ]
                        [ div [ class "figure-meta" ] [ span [] [ text "PLATE 002" ], span [] [ text "COMPUTER / STACK" ] ]
                        , computerStack
                        , p [ class "eyebrow plate-note" ] [ text "COMPUTE. REMEMBER. PERSIST." ]
                        ]
                    ]
                , div [ class "cover-bottom eyebrow" ] [ span [] [ text "BUILD / SHARE / EXPERIMENT / WONDER" ], a [ href (if libraryPage then "#library" else "#engineering") ] [ text "SCROLL TO INSPECT ↓" ] ]
                ]
            , header [ class "reading-header", id "reading-header" ]
                [ div [ class "header-start" ]
                    [ button [ class "menu-toggle icon-button", id "menu-toggle", onClick ToggleSidebar, type_ "button", attribute "aria-label" (if model.sidebarOpen then "Close sidebar" else "Open sidebar"), attribute "aria-expanded" (Reader.boolString model.sidebarOpen), attribute "aria-controls" "manual-sidebar" ]
                        [ span [ class "hamburger", attribute "aria-hidden" "true" ] [ span [] [], span [] [], span [] [] ] ]
                    , a [ class "header-title", href "#top" ] [ span [ class "blue" ] [ text "[ AA / FM ]" ], text " Antonio Andara" ]
                    ]
                , nav [ attribute "aria-label" "Quick navigation" ]
                    [ a [ href (if libraryPage then "index.html#engineering" else "#engineering") ] [ text "Work" ], a [ href (if libraryPage then "index.html#journal" else "#journal") ] [ text "Journal" ], a [ href (if libraryPage then "index.html#connect" else "#connect") ] [ text "Connect" ] ]
                , button [ class "theme-toggle", onClick ToggleTheme, title (if Reader.isLight model then "Switch to dark mode" else "Switch to light mode"), type_ "button", attribute "role" "switch", attribute "aria-checked" (Reader.boolString (Reader.isLight model)), attribute "aria-label" "Light mode" ]
                    [ span [] [ text (Reader.themeName model) ], span [ class "switch-track", attribute "aria-hidden" "true" ] [ span [ class "switch-thumb" ] [] ] ]
                ]
            , main_ [ id "manual-content" ] [ body ]
            , footer [ class "manual-footer site-footer" ]
                [ span [] [ text "ANTONIO ANDARA / ENGINEERING & MAGIC" ]
                , a [ href "library.html" ] [ text "Drawing library ↗" ]
                , a [ href "#top" ] [ text "Back to the surface ↑" ]
                ]
            ]
        ]
