module LmsProject exposing (view)

import Copy
import Html exposing (Html, a, article, div, h3, img, p, span, text)
import Html.Attributes exposing (alt, class, height, href, attribute, src, width)
import I18n exposing (Language)


view : Language -> Html msg
view language =
    let
        copy =
            (Copy.forLanguage language).lms
    in
    article [ class "lms-feature" ]
        [ div [ class "lms-project-copy" ]
            [ p [ class "eyebrow blue" ] [ text copy.eyebrow ]
            , h3 [] [ text copy.heading ]
            , p [ class "large-copy" ] [ text copy.lead ]
            , p [] [ text copy.body ]
            , div [ class "lms-project-tags" ] (List.map (\tag -> span [] [ text tag ]) copy.tags)
            , div [ class "text-links" ]
                [ a [ class "read-link", href "projects/lms/demo/index.html" ] [ text copy.demo ] ]
            ]
        , a [ class "lms-project-preview", href "projects/lms/demo/index.html" ]
            [ div [ class "lms-preview-bar" ] [ span [] [ text copy.previewLeft ], span [] [ text copy.previewRight ] ]
            , img [ src "projects/lms/preview.png", alt copy.previewAlt, width 1440, height 1000, attribute "loading" "lazy" ] []
            , p [] [ text copy.previewCaption ] ]
        ]
