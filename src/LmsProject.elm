module LmsProject exposing (view)

import Html exposing (Html, a, article, div, h3, img, p, span, text)
import Html.Attributes exposing (alt, class, height, href, attribute, src, width)

view : Html msg
view =
    article [class "lms-feature"]
        [ div [class "lms-project-copy"]
            [ p [class "eyebrow blue"] [text "MARKDOWNBOOK / ELM LMS"]
            , h3 [] [text "Simple and to the point."]
            , p [class "large-copy"] [text "I like to teach and this is my attempt at building a good and easy to use learning management system."]
            , p [] [text "This is a Markdown-first learning management system in Elm. Lessons can include interactive tools, quizzes, and exercises."]
            , div [class "lms-project-tags"] [span [] [text "Interactive lessons"],span [] [text "Markdown authoring"],span [] [text "Elm"]]
            , div [class "text-links"]
                [ a [class "read-link",href "projects/lms/demo/index.html"] [text "Try a sample lesson ↗"]]
            ]
        , a [class "lms-project-preview",href "projects/lms/demo/index.html"]
            [div [class "lms-preview-bar"] [span [] [text "MARKDOWNBOOK"],span [] [text "WORKING PREVIEW"]]
            ,img [src "projects/lms/preview.png",alt "MarkdownBook reader showing a binary lesson, course navigation, and an interactive eight-bit calculator",width 1440,height 1000,attribute "loading" "lazy"] []
            ,p [] [text "A look inside the working app. Open the demo to toggle bits, answer a question or two."]]
        ]
