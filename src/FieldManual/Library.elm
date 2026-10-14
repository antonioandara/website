module FieldManual.Library exposing (view, drawing)

import Copy
import FieldManual.Components exposing (figurePlate)
import FieldManual.Illustrations as Ink
import Html exposing (Html, article, button, code, details, div, p, summary, text)
import Html.Attributes exposing (attribute, class, type_, hidden)
import Html.Events exposing (onClick, on)
import I18n exposing (Language)
import Json.Decode as Decode


drawing : String -> Html msg
drawing key =
    case key of
        "stack" ->
            Ink.computerStack

        "processor" ->
            Ink.processorStack

        "touch" ->
            Ink.touchDiagram

        "chip" ->
            Ink.chip

        "network" ->
            Ink.network

        "signal" ->
            Ink.signal { amplitude = 65, cycles = 2 }

        "kernel" ->
            Ink.kernelDiagram

        "bezier" ->
            Ink.bezierDiagram

        "orbit" ->
            Ink.orbit 3

        "cube" ->
            Ink.cube

        "contours" ->
            Ink.contours 9

        "automaton" ->
            Ink.cellularAutomaton 30

        "life" ->
            Ink.gameOfLife

        "functional" ->
            Ink.functional

        "composable" ->
            Ink.composable

        "fractal" ->
            Ink.fractal 4

        "formula-parser" ->
            Ink.formulaParser

        "turing" ->
            Ink.turingMachine

        _ ->
            Ink.rasterDiagram


view : Language -> String -> (String -> msg) -> msg -> Html msg
view language selected selectCategory changed =
    let
        libraryCopy =
            (Copy.forLanguage language).library

        specimens =
            Copy.specimens language

        labelFor key =
            libraryCopy.categories
                |> List.filter (\( candidate, _ ) -> candidate == key)
                |> List.head
                |> Maybe.map Tuple.second
                |> Maybe.withDefault key

        visibleCount =
            List.length (List.filter (\specimen -> selected == "All" || specimen.category == selected) specimens)
    in
    div []
        [ div [ class "library-toolbar", attribute "role" "group", attribute "aria-label" libraryCopy.filterAria ]
            (List.map (\( key, label ) -> button [ type_ "button", attribute "data-filter" key, onClick (selectCategory key), attribute "aria-pressed" (if key == selected then "true" else "false") ] [ text label ]) libraryCopy.categories)
        , p [ class "eyebrow library-count", attribute "role" "status" ] [ text (String.fromInt visibleCount ++ " " ++ libraryCopy.countSuffix ++ " " ++ labelFor selected) ]
        , div [ class "library-grid" ]
            (List.indexedMap
                (\index specimen -> article [ class "library-item", attribute "data-category" specimen.category, hidden (selected /= "All" && selected /= specimen.category) ]
                    [ figurePlate ("PLATE / " ++ String.padLeft 2 '0' (String.fromInt (index + 1))) specimen.title (drawing specimen.key) specimen.caption
                    , details [ class "drawing-recipe", on "toggle" (Decode.succeed changed) ]
                        [ summary [] [ text libraryCopy.recipe ]
                        , Html.pre [] [ code [] [ text ("import FieldManual.Illustrations as Ink\n\n" ++ specimen.example) ] ]
                        ]
                    ]
                )
                specimens
            )
        ]
