module Main exposing (main)

import Generated.Content as Editorial
import EditorialMarkdown
import Content
import Copy
import FieldManual.Components exposing (chapterHeading, figurePlate)
import FieldManual.Illustrations as Ink
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import Html exposing (Html, a, article, details, div, h3, p, section, span, summary, text)
import Html.Attributes exposing (class, href, id, tabindex)
import Html.Events exposing (on)
import I18n exposing (Language(..))
import Json.Decode as Decode
import LmsProject
import PersonalArtwork
import SiteShell

main : Program Reader.Flags Model Msg
main =
    Reader.application
        (\model -> (Copy.forLanguage model.language).title)
        (List.map (\( _, target, _ ) -> target) (chapters English))
        (\model -> SiteShell.view False (chapters model.language) (body model.language) model)


chapterTargets : List ( String, String, String )
chapterTargets =
    [ ( "01", "engineering", "" )
    , ( "02", "open-source", "" )
    , ( "03", "experiments", "" )
    , ( "04", "lms", "" )
    , ( "05", "magic", "" )
    , ( "06", "journal", "" )
    , ( "07", "videos", "" )
    , ( "08", "connect", "" )
    ]


chapters : Language -> List ( String, String, String )
chapters language =
    List.map2 (\( number, target, _ ) chapterTitle -> ( number, target, chapterTitle )) chapterTargets (Copy.forLanguage language).chapters


body : Language -> Html Msg
body language =
    let
        copy =
            Copy.forLanguage language

        home =
            copy.home

        magic =
            Editorial.magic language

        person =
            Content.profile language
    in
    div []
        [ chapter "engineering" "01" home.engineering.heading home.engineering.subtitle
            [ div [ class "intro-grid" ]
                [ p [ class "large-copy" ] [ text home.engineering.lead ]
                , div [ class "prose" ]
                    [ p [] [ text home.engineering.p1 ]
                    , p [] [ text home.engineering.p2 ]
                    , links [ ( person.linkedin, home.engineering.linkedinLink ), ( person.github, home.engineering.githubLink ) ] ] ]
            , article [ class "work-feature" ]
                [ figurePlate home.engineering.plateMeta home.engineering.plateTitle Ink.processorStack home.engineering.plateCaption
                , div [ class "prose" ]
                    [ p [ class "eyebrow blue" ] [ text home.engineering.eyebrow ]
                    , h3 [] [ text home.engineering.projectTitle ]
                    , p [] [ text home.engineering.projectBody ]
                    , details [ class "field-note", on "toggle" (Decode.succeed Measure) ]
                        [ summary [] [ text home.engineering.noteSummary ]
                        , div [ class "prose note-content" ]
                            [ p [] [ text home.engineering.noteBody ]
                            ] ] ] ] ]
        , chapter "open-source" "02" home.openSource.heading home.openSource.subtitle
            [ div [ class "two-column" ]
                [ div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text home.openSource.quote ]
                    , p [] [ text home.openSource.body ]
                    , a [ class "read-link", href person.github ] [ text home.openSource.githubLink ] ]
                , figurePlate home.openSource.plateMeta home.openSource.plateTitle Ink.composable home.openSource.plateCaption ] ]
        , chapter "experiments" "03" home.experiments.heading home.experiments.subtitle
            [ p [ class "section-intro" ] [ text home.experiments.intro ]
            , div [ class "experiment-grid" ]
                (List.map3 (experimentCard home.experiments)
                    [ "01", "02" ]
                    home.experiments.items
                    [ ( "experiments/three-color-mosaic.html", PersonalArtwork.formulaMosaic )
                    , ( "experiments/formula-parser.html", PersonalArtwork.formulaParser )
                    ]
                ) ]
        , chapter "lms" "04" copy.lms.chapterHeading copy.lms.chapterSubtitle
            [ LmsProject.view language ]
        , chapter "magic" "05" magic.heading magic.subtitle
            [ div [ class "two-column" ]
                [ figurePlate magic.plateMeta magic.plateTitle PersonalArtwork.cards magic.plateCaption
                , div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text magic.lead ]
                    , EditorialMarkdown.view magic.body
                    , links [ ( person.magicYoutube, home.magic.magicLink ), ( person.x, home.magic.xLink ) ] ] ] ]
        , chapter "journal" "06" home.journal.heading home.journal.subtitle
            [ p [ class "section-intro" ] [ text home.journal.intro ]
            , if List.isEmpty (Content.journal language) then
                p [ class "section-empty" ] [ text home.journal.empty ]

              else
                div [] (List.map journalEntry (Content.journal language))
            ]
        , chapter "videos" "07" home.videos.heading home.videos.subtitle
            [ div [ class "two-column" ]
                [ div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text home.videos.lead ]
                    , p [] [ text home.videos.body ]
                    , a [ class "read-link", href person.youtube ] [ text home.videos.youtubeLink ] ]
                , a [ class "video-link", href person.youtube ]
                    [ figurePlate home.videos.plateMeta home.videos.plateTitle PersonalArtwork.video home.videos.plateCaption ] ] ]
        , chapter "connect" "08" home.connect.heading home.connect.subtitle
            [ div [ class "intro-grid" ]
                [ p [ class "large-copy" ] [ text home.connect.lead ]
                , div [ class "prose" ]
                    [ p [] [ text home.connect.body ]
                    , div [ class "profile-links" ]
                        (List.map2 (\row url -> profileLink row.number row.label row.description url)
                            home.connect.links
                            [ person.linkedin, person.github, person.youtube, person.x ]
                        ) ] ] ] ]


chapter : String -> String -> String -> String -> List (Html Msg) -> Html Msg
chapter target number heading subtitle children =
    section [ class "chapter", id target, tabindex -1 ] (chapterHeading number heading subtitle :: children)


links : List ( String, String ) -> Html msg
links items =
    div [ class "text-links" ] (List.map (\(url, label) -> a [ href url ] [ text label ]) items)


experimentCard : Copy.Experiments -> String -> Copy.ExperimentCopy -> ( String, Html msg ) -> Html msg
experimentCard copy number item ( url, drawing ) =
    a [ class "project-card", href url ]
        [ figurePlate (copy.metaPrefix ++ " / " ++ number) copy.openLabel drawing item.description
        , h3 [] [ text item.title ]
        ]


journalEntry : Content.JournalEntry -> Html Msg
journalEntry entry =
    details [ class "field-note", on "toggle" (Decode.succeed Measure) ]
        [ summary [] [ span [ class "eyebrow blue" ] [ text (entry.number ++ " / " ++ entry.category) ], h3 [] [ text entry.title ], p [] [ text entry.summary ] ]
        , div [ class "prose note-content" ] [ EditorialMarkdown.view entry.body ] ]


profileLink : String -> String -> String -> String -> Html msg
profileLink number label description url =
    a [ href url ] [ span [ class "eyebrow blue" ] [ text number ], div [] [ h3 [] [ text (label ++ " ↗") ], p [] [ text description ] ] ]
