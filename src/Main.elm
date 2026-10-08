module Main exposing (main)

import LmsProject
import Content
import FieldManual.Components exposing (chapterHeading, figurePlate)
import FieldManual.Illustrations as Ink
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import Html exposing (Html, a, article, details, div, h3, p, section, span, summary, text)
import Html.Attributes exposing (class, href, id, tabindex)
import Html.Events exposing (on)
import Json.Decode as Decode
import PersonalArtwork
import SiteShell

main : Program Reader.Flags Model Msg
main =
    Reader.application "Antonio Andara — Engineer & magician" (List.map (\(_, target, _) -> target) chapters) (\model -> SiteShell.view False chapters body model)

chapters : List ( String, String, String )
chapters =
    [ ( "01", "engineering", "Engineering & work" )
    , ( "02", "open-source", "Open source" )
    , ( "03", "experiments", "Experiments" )
    , ( "04", "lms", "Experimental LMS" )
    , ( "05", "magic", "Brain Magic & wonder" )
    , ( "06", "journal", "Field notes" )
    , ( "07", "videos", "Andara Labs / Via Magus" )
    , ( "08", "connect", "Get in touch" )
    ]

body : Html Msg
body =
    div []
        [ chapter "engineering" "01" "Work you can look inside." "ENGINEERING & PRACTICE"
            [ div [ class "intro-grid" ]
                [ p [ class "large-copy" ] [ text "I’m an electronic engineer. I love to understand things deeply." ]
                , div [ class "prose" ]
                    [ p [] [ text "Some of my interests are electronics, microcontrollers (MCUs), mechatronics, programming languages and language design, distributed systems, decentralization, blockchain, and open source. I enjoy exploring the latest technology, helping people understand it, and staying up to date with the latest innovations." ]
                    , p [] [ text "This is a place for anyone who wants to learn and have a good time doing it. I hope you find something interesting here." ]
                    , links [ ( Content.profile.linkedin, "Professional background ↗" ), ( Content.profile.github, "My GitHub ↗" ) ] ] ]
            , article [ class "work-feature" ]
                [ figurePlate "IN PRACTICE / 01" "learning from first principles" Ink.processorStack "Bottom up design."
                , div [ class "prose" ]
                    [ p [ class "eyebrow blue" ] [ text "ELECTRONICS / SOFTWARE / MAGIC" ]
                    , h3 [] [ text "A personal field manual" ]
                    , p [] [ text "This site is a working example of my work and my explorations of web development and functional programming." ]
                    , details [ class "field-note", on "toggle" (Decode.succeed Measure) ]
                        [ summary [] [ text "Look at the implementation" ]
                        , div [ class "prose note-content" ]
                            [ p [] [ text "The main application is built in Elm using the Elm architecture of model, update, and view. This is the first site I have published." ]
                            ] ] ] ] ]
        , chapter "open-source" "02" "Build it. Share it. Let it grow." "OPEN SOURCE"
            [ div [ class "two-column" ]
                [ div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text "Sharing is the most fundamental act of friendship. Because it is a way you can give something without losing something. — Richard Stallman" ]
                    , p [] [ text "Open-source software is an important part of my work. This site connects the experiments and ideas with the places where the code and everything else lives." ]
                    , a [ class "read-link", href Content.profile.github ] [ text "Explore my GitHub ↗" ] ]
                , figurePlate "PRINCIPLE / 01" "find the connections" Ink.composable "Innovation thrives at the intersection of seemingly disjointed topics." ] ]
        , chapter "experiments" "03" "An open workbench." "SOME EXPERIMENTS & SMALL EXPLORATIONS"
            [ p [ class "section-intro" ] [ text "These are experiments on different interesting topics. There is no real structure behind them, more like a stream of consciousness." ]
            , div [ class "experiment-grid" ]
                [ experiment "01" "Three-color formula tiles" "Connected logic tiles. Toggle an input and watch shared-border constraints carry the change toward the output." "experiments/three-color-mosaic.html" PersonalArtwork.formulaMosaic
                , experiment "02" "Formula parser & AST explorer" "Step through a Boolean formula, watch its syntax tree grow, and explore how inputs change the result." "experiments/formula-parser.html" PersonalArtwork.formulaParser ]]
        , chapter "lms" "04" "Experimental." "MARKDOWNBOOK / LEARNING SOFTWARE"
            [ LmsProject.view ]
        , chapter "magic" "05" "Magic exists in the mind" "MAGIC & THE HUMAN SIDE"
            [ div [ class "two-column" ]
                [ figurePlate "ANOTHER KIND OF CRAFT" "attention / possibility / surprise" PersonalArtwork.cards "Engineering is about how things work. Magic is about what they feel like."
                , div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text "I do sleight of hand, too." ]
                    , p [] [ text "Magic belongs alongside engineering. Both are part of my work and my curiosity: the mechanics of making something happen, and the experience of using it." ]
                    , p [] [ text "This corner of the field manual is for performances, reflections, and experiments in wonder. I’ll build it out with my own material as the collection grows." ]
                    , links [ ( Content.profile.magicYoutube, "Watch Via Magus on YouTube ↗" ), ( Content.profile.x, "Find me on X ↗" ) ] ] ] ]
        , chapter "journal" "06" "Notes between projects." "MY PERSONAL JOURNAL"
            [ p [ class "section-intro" ] [ text "A place for the thinking around the work. Short notes on different topics." ]
            , if List.isEmpty Content.journal then
                p [ class "section-empty" ] [ text "No field notes yet. The first entries are still being written." ]

              else
                div [] (List.map journalEntry Content.journal)
            ]
        , chapter "videos" "07" "My YouTube channel." "ANDARA LABS / VIDEO"
            [ div [ class "two-column" ]
                [ div [ class "prose" ]
                    [ p [ class "large-copy" ] [ text "I don't make too many videos, but some things are better shown." ]
                    , p [] [ text "Andara Labs is my YouTube channel. It’s the place to follow the video side of my work; this section will grow into a collection of individual videos and the notes behind them." ]
                    , a [ class "read-link", href Content.profile.youtube ] [ text "Visit Andara Labs on YouTube ↗" ] ]
                , a [ class "video-link", href Content.profile.youtube ]
                    [ figurePlate "CHANNEL / @ANDARALABS" "watch on youtube ↗" PersonalArtwork.video "Open the channel to explore the videos." ] ] ]
        , chapter "connect" "08" "Let’s compare notes." "WORK / COLLABORATION / CONVERSATION"
            [ div [ class "intro-grid" ]
                [ p [ class "large-copy" ] [ text "Looking for engineering consultation or tutoring? Have a project, a magic idea, or a question about something I’ve written?" ]
                , div [ class "prose" ]
                    [ p [] [ text "For professional conversations, find me on LinkedIn. For code, visit GitHub. For videos and the conversations around the work, there’s Andara Labs and X." ]
                    , div [ class "profile-links" ]
                        [ profileLink "01" "LinkedIn" "Professional background & opportunities" Content.profile.linkedin
                        , profileLink "02" "GitHub" "Code & open-source work" Content.profile.github
                        , profileLink "03" "YouTube" "Andara Labs / @andaralabs" Content.profile.youtube
                        , profileLink "04" "X" "Ideas & conversation / @A3L" Content.profile.x ] ] ] ] ]

chapter : String -> String -> String -> String -> List (Html Msg) -> Html Msg
chapter target number heading subtitle children =
    section [ class "chapter", id target, tabindex -1 ] (chapterHeading number heading subtitle :: children)

links : List ( String, String ) -> Html msg
links items =
    div [ class "text-links" ] (List.map (\(url, label) -> a [ href url ] [ text label ]) items)

experiment : String -> String -> String -> String -> Html msg -> Html msg
experiment number heading description url drawing =
    a [ class "project-card", href url ] [ figurePlate ("EXPERIMENT / " ++ number) "OPEN ↗" drawing description, h3 [] [ text heading ] ]

journalEntry : Content.JournalEntry -> Html Msg
journalEntry entry =
    details [ class "field-note", on "toggle" (Decode.succeed Measure) ]
        [ summary [] [ span [ class "eyebrow blue" ] [ text (entry.number ++ " / " ++ entry.category) ], h3 [] [ text entry.title ], p [] [ text entry.summary ] ]
        , div [ class "prose note-content" ] (List.map (\paragraph -> p [] [ text paragraph ]) entry.paragraphs) ]

profileLink : String -> String -> String -> String -> Html msg
profileLink number label description url =
    a [ href url ] [ span [ class "eyebrow blue" ] [ text number ], div [] [ h3 [] [ text (label ++ " ↗") ], p [] [ text description ] ] ]
