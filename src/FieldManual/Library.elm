module FieldManual.Library exposing (view, drawing)

import FieldManual.Components exposing (figurePlate)
import FieldManual.Illustrations as Ink
import Html exposing (Html, article, button, code, details, div, p, span, summary, text)
import Html.Attributes exposing (attribute, class, type_, hidden)
import Html.Events exposing (onClick, on)
import Json.Decode as Decode


type alias Specimen =
    { key : String, title : String, category : String, caption : String, example : String }


specimens : List Specimen
specimens =
    [ { key = "stack", title = "Computer stack", category = "Systems", caption = "A processor board, paired memory sticks, and solid-state storage connected by a data path.", example = "Ink.computerStack" }
    , { key = "processor", title = "From gates to a CPU", category = "Systems", caption = "Logic gates build muxes and an ALU; connected into a datapath, they become a CPU core. Follow the arrows upward.", example = "Ink.processorStack" }
    , { key = "touch", title = "Capacitive surface", category = "Systems", caption = "A measured field becomes a coordinate.", example = "Ink.touchDiagram" }
    , { key = "chip", title = "Logic core", category = "Systems", caption = "A 24-pin package with a visible core.", example = "Ink.chip" }
    , { key = "network", title = "Connected nodes", category = "Systems", caption = "Solid paths, potential connections, shared state.", example = "Ink.network" }
    , { key = "signal", title = "Wave study", category = "Signals", caption = "A sampled wave with adjustable amplitude and frequency.", example = "Ink.signal { amplitude = 65, cycles = 2 }" }
    , { key = "kernel", title = "Kernel weight", category = "Signals", caption = "The shape of a weighted neighborhood.", example = "Ink.kernelDiagram" }
    , { key = "bezier", title = "Bézier handles", category = "Signals", caption = "A curve and the control points behind it.", example = "Ink.bezierDiagram" }
    , { key = "orbit", title = "Orbital planes", category = "Objects", caption = "Intersecting ellipses around a common center.", example = "Ink.orbit 3" }
    , { key = "cube", title = "Isometric solid", category = "Objects", caption = "Three faces, construction lines, a little depth.", example = "Ink.cube" }
    , { key = "contours", title = "Contour field", category = "Objects", caption = "A small landscape made from nested lines.", example = "Ink.contours 9" }
    , { key = "raster", title = "Raster letter", category = "Objects", caption = "Letterforms reveal their underlying grid.", example = "Ink.rasterDiagram" }
    , { key = "automaton", title = "Cellular automaton", category = "Patterns", caption = "Rule 30, grown from one live cell across 24 generations.", example = "Ink.cellularAutomaton 30" }
    , { key = "life", title = "Game of Life", category = "Patterns", caption = "A glider at generations 0, 4, and 8. Local rules create traveling structure.", example = "Ink.gameOfLife" }
    , { key = "functional", title = "Functional", category = "Concepts", caption = "A pure function: square the input, with no hidden state.", example = "Ink.functional" }
    , { key = "composable", title = "Composable", category = "Concepts", caption = "Follow A into f, B into g, and C out. The same pipeline becomes one reusable function.", example = "Ink.composable" }
    , { key = "fractal", title = "Fractal", category = "Patterns", caption = "A Sierpiński triangle repeats the same structure at smaller scales.", example = "Ink.fractal 4" }
    , { key = "turing", title = "Turing machine", category = "Concepts", caption = "A tape, a state, and a head. Read a symbol, write a symbol, then move.", example = "Ink.turingMachine" }
    ]


drawing : String -> Html msg
drawing key =
    case key of
        "stack" -> Ink.computerStack
        "processor" -> Ink.processorStack
        "touch" -> Ink.touchDiagram
        "chip" -> Ink.chip
        "network" -> Ink.network
        "signal" -> Ink.signal { amplitude = 65, cycles = 2 }
        "kernel" -> Ink.kernelDiagram
        "bezier" -> Ink.bezierDiagram
        "orbit" -> Ink.orbit 3
        "cube" -> Ink.cube
        "contours" -> Ink.contours 9
        "automaton" -> Ink.cellularAutomaton 30
        "life" -> Ink.gameOfLife
        "functional" -> Ink.functional
        "composable" -> Ink.composable
        "fractal" -> Ink.fractal 4
        "turing" -> Ink.turingMachine
        _ -> Ink.rasterDiagram


view : String -> (String -> msg) -> msg -> Html msg
view selected selectCategory changed =
    div []
        [ div [ class "library-toolbar", attribute "role" "group", attribute "aria-label" "Filter drawings" ]
            (List.map (\category -> button [ type_ "button", attribute "data-filter" category, onClick (selectCategory category), attribute "aria-pressed" (if category == selected then "true" else "false") ] [ text category ]) [ "All", "Systems", "Signals", "Objects", "Patterns", "Concepts" ])
        , p [ class "eyebrow library-count", attribute "role" "status" ] [ text (String.fromInt (List.length (List.filter (\specimen -> selected == "All" || specimen.category == selected) specimens)) ++ " drawings / " ++ selected) ]
        , div [ class "library-grid" ]
            (List.indexedMap
                (\index specimen -> article [ class "library-item", attribute "data-category" specimen.category, hidden (selected /= "All" && selected /= specimen.category) ]
                    [ figurePlate ("PLATE / " ++ String.padLeft 2 '0' (String.fromInt (index + 1))) specimen.title (drawing specimen.key) specimen.caption
                    , details [ class "drawing-recipe", on "toggle" (Decode.succeed changed) ]
                        [ summary [] [ text "Elm recipe" ]
                        , Html.pre [] [ code [] [ text ("import FieldManual.Illustrations as Ink\n\n" ++ specimen.example) ] ]
                        ]
                    ]
                )
                specimens
            )
        ]
