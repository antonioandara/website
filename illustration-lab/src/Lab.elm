port module Lab exposing (main)

import Browser
import Digital
import Browser.Events
import FieldManual.Illustrations as Ink
import Html exposing (Html, a, button, div, footer, h1, h2, h3, header, input, label, main_, nav, output, p, section, span, text)
import Html.Attributes as H
import Html.Events exposing (onClick, onInput)
import Svg as S
import Svg.Attributes as A

port dragPoint : ({ index : Int, x : Float, y : Float } -> msg) -> Sub msg

port exportSvg : () -> Cmd msg

type Demo = Bezier | Signal | Fractal | Automaton | DigitalDemo Digital.Kind

type alias Model =
    { demo : Demo, playing : Bool, phase : Float, amplitude : Float, cycles : Float, depth : Int, rule : Int, p1 : Point, p2 : Point, light : Bool, digital : Digital.Model }

type alias Point = { x : Float, y : Float }

type Msg = Select Demo | Toggle | Tick Float | Change String String | Drag { index : Int, x : Float, y : Float } | Reset | Theme | Export | DigitalMsg Digital.Msg

initial : Model
initial =
    { demo = Bezier, playing = False, phase = 0.5, amplitude = 65, cycles = 2, depth = 3, rule = 30, p1 = Point 100 45, p2 = Point 260 210, light = False, digital = Digital.initial }

main : Program () Model Msg
main =
    Browser.element { init = \_ -> (initial, Cmd.none), update = update, view = view, subscriptions = subscriptions }

subscriptions : Model -> Sub Msg
subscriptions m =
    Sub.batch [ dragPoint Drag, if m.playing then Browser.Events.onAnimationFrameDelta Tick else Sub.none ]

update : Msg -> Model -> (Model, Cmd Msg)
update msg m =
    case msg of
        DigitalMsg action -> ({ m | digital = Digital.update action m.digital }, Cmd.none)
        Select demo -> ({ m | demo = demo, playing = False }, Cmd.none)
        Toggle -> ({ m | playing = not m.playing }, Cmd.none)
        Tick dt ->
            let next = m.phase + min dt 50 / 6000 in
            (if m.playing then { m | phase = if next > 1 then next - 1 else next } else m, Cmd.none)
        Change key raw ->
            let n = String.toFloat raw |> Maybe.withDefault 0 in
            (case key of
                "t" -> { m | phase = clamp 0 1 n, playing = False }
                "amplitude" -> { m | amplitude = clamp 0 85 n }
                "cycles" -> { m | cycles = clamp 0.5 8 n }
                "depth" -> { m | depth = clamp 0 5 (round n) }
                "rule" -> { m | rule = clamp 0 255 (round n) }
                "p1x" -> { m | p1 = Point (clamp 20 340 n) m.p1.y }
                "p1y" -> { m | p1 = Point m.p1.x (clamp 20 240 n) }
                "p2x" -> { m | p2 = Point (clamp 20 340 n) m.p2.y }
                "p2y" -> { m | p2 = Point m.p2.x (clamp 20 240 n) }
                _ -> m
            , Cmd.none)
        Drag point ->
            let pos = Point (clamp 20 340 point.x) (clamp 20 240 point.y) in
            (if point.index == 1 then { m | p1 = pos } else { m | p2 = pos }, Cmd.none)
        Reset -> ({ initial | demo = m.demo, light = m.light }, Cmd.none)
        Theme -> ({ m | light = not m.light }, Cmd.none)
        Export -> (m, exportSvg ())

title : Demo -> String
title demo =
    case demo of
        DigitalDemo kind -> Digital.title kind
        Bezier -> "Bézier curves"
        Signal -> "Signal bench"
        Fractal -> "Recursive patterns"
        Automaton -> "Cellular rules"

view : Model -> Html Msg
view m =
    div [ H.class "lab", H.attribute "data-theme" (if m.light then "light" else "dark") ]
        [ header [ H.class "lab-header" ] [ span [] [ text "A3L / ILLUSTRATION LAB" ], a [ H.href "../index.html" ] [ text "← Personal website" ], button [ onClick Theme ] [ text (if m.light then "Dark theme" else "Light theme") ] ]
        , section [ H.class "lab-intro" ] [ span [ H.class "eyebrow blue" ] [ text "A WORKBENCH FOR VISUAL IDEAS / 001–009" ], h1 [] [ text "A little less static." ], p [] [ text "Pull a curve into shape. Tune a signal. Watch a simple rule become a pattern. An experimental home for the illustrations in my field manual." ] ]
        , nav [ H.class "lab-tabs", H.attribute "aria-label" "Experiments" ] (List.indexedMap (\i demo -> button [ onClick (Select demo), H.attribute "aria-pressed" (if m.demo == demo then "true" else "false") ] [ text ("0" ++ String.fromInt (i + 1) ++ " / " ++ title demo) ]) [ Bezier, Signal, Fractal, Automaton, DigitalDemo Digital.Map, DigitalDemo Digital.Mux, DigitalDemo Digital.Datapath, DigitalDemo Digital.Systolic, DigitalDemo Digital.Fabric ])
        , main_ []
            [ div [ H.class "bench" ]
                [ div [ H.class "canvas-wrap" ]
                    [ div [ H.class "canvas-meta" ] [ span [] [ text (title m.demo) ], span [] [ text "LIVE SVG" ] ]
                    , div [ H.class "canvas", H.id "experiment-canvas", H.attribute "role" "group", H.attribute "aria-label" (description m) ] [ drawing m ]
                    , div [ H.class "canvas-foot" ] [ text (status m) ]
                    ]
                , section [ H.class "controls", H.attribute "aria-label" "Experiment controls" ]
                    ([ h2 [] [ text "Try something." ], p [] [ text (instruction m.demo) ] ] ++ controls m ++
                        [ div [ H.class "actions" ] [ button [ onClick Reset ] [ text "Reset" ], button [ onClick Export ] [ text "Save SVG ↓" ] ] ])
                ]
            , section [ H.class "explanation" ]
                [ div [] [ span [ H.class "eyebrow blue" ] [ text "WHAT YOU’RE SEEING" ], h3 [] [ text (title m.demo) ], p [] [ text (description m) ] ]
                , div [] [ span [ H.class "eyebrow blue" ] [ text "A QUESTION TO EXPLORE" ], h3 [] [ text (question m.demo) ], p [] [ text (hint m.demo) ] ]
                ]
            ]
        , footer [ H.class "lab-footer" ] [ text "Antonio Andara / An evolving collection of interactive illustrations. Move a control and follow the consequences." ]
        ]

slider : String -> String -> Float -> Float -> Float -> Float -> Html Msg
slider key caption low high step value =
    label [ H.class "slider" ]
        [ span [] [ text caption, output [] [ text (String.fromFloat (toFloat (round (value * 100)) / 100)) ] ]
        , input [ H.type_ "range", H.attribute "aria-label" caption, H.min (String.fromFloat low), H.max (String.fromFloat high), H.step (String.fromFloat step), H.value (String.fromFloat value), onInput (Change key) ] []
        ]

controls : Model -> List (Html Msg)
controls m =
    case m.demo of
        DigitalDemo kind -> List.map (Html.map DigitalMsg) (Digital.controls kind m.digital)
        Bezier ->
            [ slider "t" "Progress t" 0 1 0.01 m.phase, playback m
            , slider "p1x" "First handle · x" 20 340 1 m.p1.x, slider "p1y" "First handle · y" 20 240 1 m.p1.y
            , slider "p2x" "Second handle · x" 20 340 1 m.p2.x, slider "p2y" "Second handle · y" 20 240 1 m.p2.y ]
        Signal -> [ slider "amplitude" "Amplitude" 0 85 1 m.amplitude, slider "cycles" "Cycles" 0.5 8 0.5 m.cycles, slider "t" "Phase" 0 1 0.01 m.phase, playback m ]
        Fractal -> [ slider "depth" "Recursion depth" 0 5 1 (toFloat m.depth) ]
        Automaton -> [ slider "rule" "Rule number" 0 255 1 (toFloat m.rule), div [ H.class "actions" ] (List.map (\n -> button [ onClick (Change "rule" (String.fromInt n)) ] [ text (String.fromInt n) ]) [ 30, 90, 110, 184 ]) ]

playback : Model -> Html Msg
playback m =
    div [ H.class "actions" ] [ button [ onClick Toggle, H.attribute "aria-pressed" (if m.playing then "true" else "false") ] [ text (if m.playing then "Pause" else "Play") ] ]

instruction : Demo -> String
instruction demo =
    case demo of
        DigitalDemo kind -> Digital.instruction kind
        Bezier -> "Drag the two hollow handles, or use their sliders. Scrub t to reveal how a point on the curve is constructed."
        Signal -> "Change the height and frequency of the wave. Press Play to move it through time."
        Fractal -> "Increase the depth one step at a time. Each triangle gives way to three smaller copies."
        Automaton -> "Choose a rule, or try a preset. Each new row depends on three cells in the row above."

status : Model -> String
status m =
    case m.demo of
        DigitalDemo kind -> Digital.status kind m.digital
        Bezier -> "t = " ++ String.fromFloat (toFloat (round (m.phase * 100)) / 100) ++ " / de Casteljau construction"
        Signal -> "y = A sin(2π · cycles · x + 2π · phase)"
        Fractal -> String.fromInt (3 ^ m.depth) ++ " triangles / depth " ++ String.fromInt m.depth
        Automaton -> "Rule " ++ String.fromInt m.rule ++ " / 47 cells × 24 generations / fixed dead boundaries"

description : Model -> String
description m =
    case m.demo of
        DigitalDemo kind -> Digital.description kind
        Bezier -> "A cubic Bézier curve has two endpoints and two control points. The dotted construction repeatedly interpolates between points; its final point lies exactly on the curve."
        Signal -> "Amplitude changes the distance from the center line. Cycles controls how many oscillations fit across the plate. Phase moves the wave horizontally without changing its shape."
        Fractal -> "Starting with one triangle, remove the middle and repeat in each of the three corners. This is the Sierpiński triangle: the same structure appears at smaller scales."
        Automaton -> "A single live cell starts the pattern. The rule number encodes eight on/off decisions, one for each possible three-cell neighborhood. Blue cells are alive; empty cells are dead."

question : Demo -> String
question demo =
    case demo of
        DigitalDemo kind -> Digital.question kind
        Bezier -> "Can you make the curve double back?"
        Signal -> "What changes when the amplitude is zero?"
        Fractal -> "How much of the triangle remains?"
        Automaton -> "How different can neighboring rules be?"

hint : Demo -> String
hint demo =
    case demo of
        DigitalDemo kind -> Digital.hint kind
        Bezier -> "Move the first handle to the right and the second to the left. The handles influence the direction at each endpoint; the curve does not have to pass through them."
        Signal -> "Try zero amplitude, then change the cycles. Bring the amplitude back and compare one cycle with eight."
        Fractal -> "Each step keeps three quarters of the previous area, even though the number of triangles triples. After n steps the remaining fraction is (3/4)ⁿ."
        Automaton -> "Compare rule 30 with 31, then try 90. One changed decision can transform the whole pattern."

pointString : Point -> String
pointString pt = String.fromFloat pt.x ++ "," ++ String.fromFloat pt.y

lerp : Float -> Point -> Point -> Point
lerp t a b = Point (a.x + t * (b.x - a.x)) (a.y + t * (b.y - a.y))

poly : String -> List Point -> S.Svg msg
poly cls pts = S.polyline [ A.class cls, A.points (String.join " " (List.map pointString pts)) ] []

dot : String -> Float -> Point -> S.Svg msg
dot cls radius pt = S.circle [ A.class cls, A.cx (String.fromFloat pt.x), A.cy (String.fromFloat pt.y), A.r (String.fromFloat radius) ] []

drawing : Model -> Html Msg
drawing m =
    case m.demo of
        DigitalDemo kind -> Html.map DigitalMsg (Digital.drawing kind m.digital)
        Fractal -> Ink.fractal m.depth
        Automaton -> Ink.cellularAutomaton m.rule
        Signal ->
            let
                pts = List.range 0 320 |> List.map (\i -> let x = toFloat i / 320 in Point (30 + x * 300) (130 - m.amplitude * sin (2 * pi * (x * m.cycles + m.phase))))
            in
            S.svg [ A.viewBox "0 0 360 260", A.class "diagram" ] [ S.title [] [ S.text "Adjustable sine wave" ], poly "construction" [ Point 30 40, Point 30 220 ], poly "construction" [ Point 30 130, Point 330 130 ], poly "curve" pts, dot "accent" 4 (Point 180 (130 - m.amplitude * sin (2 * pi * (0.5 * m.cycles + m.phase)))) ]
        Bezier ->
            let
                start = Point 40 200
                end = Point 320 60
                a = lerp m.phase start m.p1
                b = lerp m.phase m.p1 m.p2
                c = lerp m.phase m.p2 end
                d = lerp m.phase a b
                e = lerp m.phase b c
                pos = lerp m.phase d e
                handle index pt = S.circle [ A.class "handle", A.cx (String.fromFloat pt.x), A.cy (String.fromFloat pt.y), A.r "8", H.attribute "data-handle" (String.fromInt index) ] []
            in
            S.svg [ A.viewBox "0 0 360 260", A.class "diagram", H.id "bezier-svg" ]
                [ S.title [] [ S.text "Cubic Bézier curve with movable control points" ]
                , poly "construction" [ start, m.p1, m.p2, end ]
                , S.path [ A.class "curve", A.d ("M" ++ pointString start ++ " C" ++ pointString m.p1 ++ " " ++ pointString m.p2 ++ " " ++ pointString end) ] []
                , poly "construction" [ a, b, c ], poly "curve" [ d, e ]
                , dot "accent" 3 a, dot "accent" 3 b, dot "accent" 3 c
                , dot "accent" 4 start, dot "accent" 4 end, dot "marker" 6 pos
                , handle 1 m.p1, handle 2 m.p2
                ]
