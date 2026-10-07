module FieldManual.Components exposing (chapterHeading, figurePlate)

import Html exposing (Html, article, div, h2, p, span, text)
import Html.Attributes exposing (class)

chapterHeading : String -> String -> String -> Html msg
chapterHeading number title subtitle =
    div [ class "chapter-heading" ]
        [ p [ class "eyebrow blue" ] [ text (number ++ " / " ++ subtitle) ]
        , h2 [] [ text title ]
        ]

figurePlate : String -> String -> Html msg -> String -> Html msg
figurePlate number title diagram captionText =
    article [ class "figure-plate" ]
        [ div [ class "figure-meta" ]
            [ span [] [ text number ]
            , span [] [ text title ]
            ]
        , div [ class "plate-surface compact" ] [ diagram ]
        , p [ class "caption" ] [ text captionText ]
        ]


