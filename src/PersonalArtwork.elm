module PersonalArtwork exposing (cards, video, mapStudy, formulaMosaic, formulaParser)

import FieldManual.Illustrations as Ink
import Html exposing (Html)
import Svg exposing (svg, g, rect, path, circle, text_, text)
import Svg.Attributes exposing (viewBox, class, x, y, width, height, rx, d, transform, cx, cy, r)
import Html.Attributes exposing (attribute)

cards : Html msg
cards =
    let
        card rotation =
            g [ transform ("rotate(" ++ rotation ++ " 180 182)") ]
                [ rect [ class "line fill-paper", x "120", y "38", width "120", height "164", rx "5" ] []
                , rect [ class "line soft", x "128", y "46", width "104", height "148", rx "2" ] []
                , path [ class "line fill-blue", d "M180 88 L205 120 L180 152 L155 120 Z" ] []
                , text_ [ class "svg-label", x "137", y "66" ] [ text "A" ]
                , path [ class "line", d "M140 75 L145 82 L140 89 L135 82 Z" ] []
                ]
    in
    svg [ class "diagram", viewBox "0 0 360 260", attribute "aria-hidden" "true" ]
        [ card "-22", card "0", card "22"
        , path [ class "line soft dash", d "M65 228 H295" ] []
        , circle [ class "line fill-blue", cx "70", cy "48", r "3" ] []
        , path [ class "line", d "M285 54 V70 M277 62 H293" ] []
        ]

video : Html msg
video =
    svg [ class "diagram", viewBox "0 0 360 260", attribute "aria-hidden" "true" ]
        [ rect [ class "line fill-faint", x "44", y "50", width "272", height "152", rx "4" ] []
        , path [ class "line soft", d "M44 76 H316 M44 176 H316 M64 50 V76 M94 50 V76 M124 50 V76 M154 50 V76 M184 50 V76 M214 50 V76 M244 50 V76 M274 50 V76 M304 50 V76 M64 176 V202 M94 176 V202 M124 176 V202 M154 176 V202 M184 176 V202 M214 176 V202 M244 176 V202 M274 176 V202 M304 176 V202" ] []
        , path [ class "line fill-blue", d "M164 100 L208 126 L164 152 Z" ] []
        , text_ [ class "svg-label", x "90", y "235" ] [ text "ANDARA LABS / VIDEO" ]
        ]


mapStudy : Html msg
mapStudy =
    svg [ class "diagram", viewBox "0 0 360 260", attribute "aria-hidden" "true" ]
        [ text_ [ class "svg-label", x "24", y "28" ] [ text "MAP STUDIES / SHARED BORDERS" ]
        , g [ transform "translate(30 45)" ]
            (List.map (\(style,shape) -> path [class ("line " ++ style),d shape] [])
                [ ("fill-blue","M0 0H100L110 50L60 78L0 55Z")
                , ("fill-faint","M100 0H210L187 65L110 50Z")
                , ("fill-blue","M210 0H300V80L240 96L187 65Z")
                , ("fill-paper","M0 55L60 78L83 135L0 170Z")
                , ("fill-blue","M60 78L110 50L187 65L200 125L145 155L83 135Z")
                , ("fill-faint","M187 65L240 96L300 80V170L200 125Z")
                , ("fill-faint","M0 170L83 135L145 155L125 185H0Z")
                , ("fill-paper","M145 155L200 125L300 170V185H125Z")
                ])
        ]


formulaMosaic : Html msg
formulaMosaic =
    svg [ class "diagram", viewBox "0 0 360 260", attribute "aria-hidden" "true" ]
        [ path [ class "line fill-faint", d "M32 58H134L156 109L100 166L32 141Z" ] []
        , path [ class "line fill-blue", d "M134 58H328V132L252 160L156 109Z" ] []
        , path [ class "line fill-paper", d "M32 141L100 166L156 109L252 160L233 213H32Z" ] []
        , path [ class "line fill-faint", d "M252 160L328 132V213H233Z" ] []
        , text_ [ class "svg-label", x "24", y "28" ] [ text "BOOLEAN VALUES / IRREGULAR MOSAIC" ]
        , text_ [ class "svg-label", x "66", y "114" ] [ text "a=0" ]
        , text_ [ class "svg-label", x "230", y "106" ] [ text "b=1" ]
        , text_ [ class "svg-label", x "140", y "182" ] [ text "OUT=1" ]
        , text_ [ class "svg-label", x "123", y "244" ] [ text "!(a & b)" ]
        ]


formulaParser : Html msg
formulaParser =
    Ink.formulaParser
