module SiteShell exposing (view)

import Content
import Copy
import FieldManual.Illustrations exposing (computerStack)
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import Html exposing (Html, a, aside, button, div, footer, h1, header, main_, nav, p, section, span, text)
import Html.Attributes exposing (attribute, class, href, id, type_, classList, property, tabindex, title)
import Html.Events exposing (onClick)
import I18n
import Json.Encode as Encode


view : Bool -> List ( String, String, String ) -> Html Msg -> Model -> Html Msg
view libraryPage chapters body model =
    let
        copy =
            Copy.forLanguage model.language

        shell =
            copy.shell

        person =
            Content.profile model.language

        themeLabel =
            if Reader.isLight model then
                shell.themeLight

            else
                shell.themeDark
    in
    div [ classList [ ( "night-manual", True ), ( "library-page", libraryPage ), ( "sidebar-open", model.sidebarOpen ) ], id "top", tabindex -1 ]
        [ a [ class "skip-link", href (if libraryPage then "#library" else "#engineering") ] [ text shell.skip ]
        , aside [ classList [ ( "sidebar", True ), ( "is-open", model.sidebarOpen ) ], id "manual-sidebar", property "inert" (Encode.bool (not model.sidebarOpen)), attribute "aria-label" shell.contentsAria ]
            [ button [ class "sidebar-close icon-button", id "sidebar-close", onClick CloseSidebar, type_ "button", attribute "aria-label" shell.closeSidebar ] [ text "×" ]
            , a [ class "wordmark", href "index.html" ] [ text "a3l" ]
            , div [ class "sidebar-body" ]
                [ p [ class "eyebrow" ] [ text shell.profileEyebrow ]
                , p [ class "sidebar-title" ] [ text shell.sidebarTitle ]
                , p [ class "side-note" ] [ text shell.sideNote ]
                , nav [ attribute "aria-label" (if model.language == I18n.Spanish then "Capítulos" else "Chapters") ] (List.map (\(number, target, chapterTitle) -> a [ href ("#" ++ target), attribute "data-chapter" target, attribute "aria-current" (if model.activeChapter == Just target then "location" else "false") ] [ span [] [ text number ], text chapterTitle ]) chapters)
                ]
            , div [ class "sidebar-foot" ]
                [ p [ class "eyebrow" ] [ text (if Reader.isLight model then shell.editionDay else shell.editionNight) ]

                , a [ href person.github ] [ text shell.github ]
                ]
            ]
        , div [ class "page-body" ]
            [ section [ class "cover personal-cover", attribute "aria-labelledby" "cover-title" ]
                [ div [ class "cover-meta eyebrow" ] [ span [] [ text shell.coverMeta ], span [ class "edition" ] [ text (if Reader.isLight model then shell.dayEdition else shell.nightEdition) ] ]
                , div [ class "cover-grid" ]
                    [ div [ class "cover-copy" ]
                        [ p [ class "eyebrow blue" ] [ text shell.coverEyebrow ]
                        , h1 [ id "cover-title" ] [ text (if libraryPage then shell.libraryTitleTop else shell.homeTitleTop), Html.br [] [], text (if libraryPage then shell.libraryTitleBottom else shell.homeTitleBottom), span [ class "title-dot" ] [ text "." ] ]
                        , p [ class "cover-deck" ] [ text (if libraryPage then shell.libraryDeck else person.identity) ]
                        , p [ class "cover-description" ] [ text (if libraryPage then shell.libraryDescription else person.introduction) ]
                        , a [ class "read-link", href (if libraryPage then "#library" else "#engineering") ] [ text (if libraryPage then shell.libraryReadLink else shell.homeReadLink), span [] [ text "↘" ] ]
                        ]
                    , div [ class "cover-plate" ]
                        [ div [ class "figure-meta" ] [ span [] [ text shell.plateMeta ], span [] [ text "COMPUTER / STACK" ] ]
                        , computerStack
                        , p [ class "eyebrow plate-note" ] [ text shell.plateNote ]
                        ]
                    ]
                , div [ class "cover-bottom eyebrow" ] [ span [] [ text shell.coverBottom ], a [ href (if libraryPage then "#library" else "#engineering") ] [ text shell.scrollHint ] ]
                ]
            , header [ class "reading-header", id "reading-header" ]
                [ div [ class "header-start" ]
                    [ button [ class "menu-toggle icon-button", id "menu-toggle", onClick ToggleSidebar, type_ "button", attribute "aria-label" (if model.sidebarOpen then shell.closeSidebar else shell.openSidebar), attribute "aria-expanded" (Reader.boolString model.sidebarOpen), attribute "aria-controls" "manual-sidebar" ]
                        [ span [ class "hamburger", attribute "aria-hidden" "true" ] [ span [] [], span [] [], span [] [] ] ]
                    , a [ class "header-title", href "#top" ] [ span [ class "blue" ] [ text "[ A3L ]" ], text " Antonio Andara" ]
                    ]
                , nav [ attribute "aria-label" (if model.language == I18n.Spanish then "Navegación rápida" else "Quick navigation") ]
                    [ a [ href (if libraryPage then "index.html#engineering" else "#engineering") ] [ text shell.workNav ], a [ href (if libraryPage then "index.html#journal" else "#journal") ] [ text shell.journalNav ], a [ href (if libraryPage then "index.html#connect" else "#connect") ] [ text shell.connectNav ] ]
                , div [ class "header-actions" ]
                    [ button [ class "theme-toggle", onClick ToggleTheme, title (if Reader.isLight model then shell.themeToDark else shell.themeToLight), type_ "button", attribute "role" "switch", attribute "aria-checked" (Reader.boolString (Reader.isLight model)), attribute "aria-label" shell.themeLight ]
                        [ span [] [ text themeLabel ], span [ class "switch-track", attribute "aria-hidden" "true" ] [ span [ class "switch-thumb" ] [] ] ]
                    , button [ class "language-toggle", onClick ToggleLanguage, type_ "button", attribute "aria-label" (if model.language == I18n.Spanish then shell.languageToEn else shell.languageToEs), title (if model.language == I18n.Spanish then shell.languageToEn else shell.languageToEs) ]
                        [ span [ class "globe", attribute "aria-hidden" "true" ] [ text "🌐" ], span [ class "lang-code" ] [ text (String.toUpper (I18n.code model.language)) ] ]
                    ]
                ]
            , main_ [ id "manual-content" ] [ body ]
            , footer [ class "manual-footer site-footer" ]
                [ span [] [ text shell.footerNote ]
                , a [ href "library.html" ] [ text shell.footerLibrary ]
                , a [ href "#top" ] [ text shell.backToTop ]
                ]
            ]
        ]
