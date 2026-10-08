module FieldManual.Illustrations exposing (processorStack, computerStack, explodedStackDiagram, cellularAutomaton, gameOfLife, functional, composable, fractal, turingMachine, touchDiagram, kernelDiagram, bezierDiagram, rasterDiagram, signal, orbit, chip, cube, network, contours)

import Bitwise
import Set exposing (Set)
import Html exposing (Html)
import Html.Attributes exposing (attribute)
import Svg exposing (Svg)

{-| Compatibility alias for older pages. New callers should use computerStack. -}
explodedStackDiagram : Html msg
explodedStackDiagram =
    computerStack


computerStack : Html msg
computerStack =
    let
        plane x y children =
            svgEl "g" [ ( "transform", "matrix(1 0 -0.6 0.5 " ++ String.fromInt x ++ " " ++ String.fromInt y ++ ")" ) ] children

        memory y =
            plane 124 y
                ([ box 0 0 154 30
                 , path "fill-blue" "M8 30 H146 V35 H8 Z"
                 ] ++ List.map (\x -> box x 6 24 18) [ 10, 46, 82, 118 ]
                    ++ List.map (\x -> path "soft" ("M" ++ String.fromInt x ++ " 30 V35")) (List.range 2 28 |> List.map ((*) 5)))
    in
    svgRoot "diagram computer-stack" "0 0 420 360"
        [ svgLabel "26" "26" "COMPUTER / SYSTEM ARCHITECTURE"
        -- CPU: a processor die, pins, and traces on a square motherboard.
        , path "fill-blue" "M40 116 H230 L290 66 V74 L230 124 H40 Z"
        , plane 100 66
            ([ box 0 0 190 100
             , box 57 13 76 74
             , svgEl "rect" [ ( "class", "line fill-blue" ), ( "x", "71" ), ( "y", "27" ), ( "width", "48" ), ( "height", "46" ) ] []
             , path "soft" "M76 33 H113 V67 H76 Z M76 50 H113 M94 33 V67"
             , path "" "M0 23 H30 V36 H57 M0 75 H36 V62 H57 M133 35 H159 V18 H184 M133 65 H154 V86 H184"
             , circle "fill-paper" 10 10 3, circle "fill-paper" 180 90 3
             ] ++ List.concatMap (\y -> [ path "" ("M50 " ++ String.fromInt y ++ " H57 M133 " ++ String.fromInt y ++ " H140") ]) [ 24, 36, 48, 60, 72 ])
        , path "soft" "M245 93 H305"
        , svgLabel "318" "97" "CPU"
        , flowArrow 94 135 94 158
        -- RAM: two slim DIMMs with separate packages and edge contacts.
        , memory 165
        , memory 195
        , path "soft" "M272 180 H305"
        , svgLabel "318" "184" "RAM"
        , flowArrow 94 221 94 244
        -- SSD: a long M.2-style board, controller, flash packages, and connector.
        , plane 100 259
            [ path "fill-faint" "M0 0 H179 V10 H190 V49 H179 V59 H0 Z"
            , circle "" 10 29 5
            , box 27 13 25 32
            , svgEl "rect" [ ( "class", "line fill-blue" ), ( "x", "66" ), ( "y", "9" ), ( "width", "40" ), ( "height", "40" ) ] []
            , svgEl "rect" [ ( "class", "line fill-blue" ), ( "x", "117" ), ( "y", "9" ), ( "width", "40" ), ( "height", "40" ) ] []
            , path "soft" "M52 22 H66 M52 29 H66 M52 36 H66 M106 22 H117 M106 36 H117 M157 22 H176 M157 36 H176"
            , path "" "M176 13 H190 M176 20 H190 M176 27 H190 M176 34 H190 M176 41 H190 M176 48 H190"
            ]
        , path "soft" "M286 276 H305"
        , svgLabel "318" "280" "SSD"
        -- A routed return channel distinguishes the bus from the construction lines.
        , path "dash soft" "M52 282 H27 V88 H41"
        , flowArrow 27 88 42 88
        , svgLabel "55" "332" "COMPUTE / BUFFER / SAVE"
        ]


{-| Build a processor upward from gates, through functional blocks and a datapath. -}
processorStack : Html msg
processorStack =
    let
        plane y children =
            svgEl "g" [ ( "transform", "matrix(1 0 -0.6 0.5 106 " ++ String.fromInt y ++ ")" ) ]
                ([ path "fill-blue" "M0 92 H190 V101 H0 Z"
                 , path "fill-faint" "M0 0 H190 V92 H0 Z"
                 , circle "fill-paper" 8 8 2
                 , circle "fill-paper" 182 84 2
                 ] ++ children)

        label y number title =
            svgEl "g" []
                [ path "soft" ("M281 " ++ String.fromInt y ++ " H303")
                , svgLabel "313" (String.fromInt (y - 8)) number
                , svgLabel "313" (String.fromInt (y + 8)) title
                ]
    in
    svgRoot "diagram processor-stack" "0 0 500 430"
        [ svgLabel "26" "26" "COMPUTATION FROM THE GROUND UP"
        -- The assembled core: pins, a die, and its internal floorplan.
        , plane 54
            ([ box 51 10 88 72
             , path "fill-blue" "M63 21 H127 V71 H63 Z"
             , path "soft" "M63 39 H127 M100 21 V71 M63 56 H100 M113 39 V71"
             , svgLabel "69" "34" "CORE"
             , path "" "M10 29 H31 V38 H51 M139 54 H159 V70 H180"
             ] ++ List.concatMap
                (\y -> [ path "" ("M44 " ++ String.fromInt y ++ " H51 M139 " ++ String.fromInt y ++ " H146") ])
                [ 22, 34, 46, 58, 70 ])
        , label 78 "04 / TOP LEVEL???" "CPU"
        , flowArrow 82 136 82 113
        , flowArrow 236 136 236 113
        -- A register-to-register datapath with routed operand and result buses.
        , plane 142
            [ box 16 19 42 48
            , svgLabel "21" "39" "REG"
            , path "soft" "M22 47 H51 M22 55 H51"
            , path "fill-blue" "M89 18 L119 27 V60 L89 69 L89 49 L99 43 L89 37 Z"
            , svgLabel "94" "83" "ALU"
            , box 146 28 28 32
            , svgLabel "147" "49" "OUT"
            , path "" "M58 30 H74 V30 H89 M58 56 H79 V56 H89 M119 43 H146"
            , path "soft" "M160 60 V76 H36 V67 M36 19 V9 H160 V28"
            ]
        , label 168 "03 / ALGORITHMS" "SAVE PREVIOUS STATE"
        , flowArrow 82 224 82 201
        , flowArrow 236 224 236 201
        -- Functional blocks assembled from the gates below.
        , plane 230
            [ path "fill-blue" "M20 16 L46 26 V61 L20 71 Z"
            , svgLabel "23" "47" "MUX"
            , path "" "M9 29 H20 M9 57 H20 M46 43 H64 M33 76 V66"
            , path "fill-blue" "M76 15 L116 26 V61 L76 72 V50 L87 43 L76 36 Z"
            , svgLabel "87" "46" "ALU"
            , path "" "M64 28 H76 M64 58 H76 M116 43 H132"
            , box 139 23 34 42
            , svgLabel "142" "48" "REG"
            , path "" "M132 43 H139 M173 43 H183"
            ]
        , label 256 "02 / ROUTE AND OPERATE" "MATH/LOGIC"
        , flowArrow 82 312 82 289
        , flowArrow 236 312 236 289
        -- Recognizable AND, OR, and NOT gate symbols, with input/output wires.
        , plane 318
            [ path "fill-paper" "M22 22 H36 C61 22 61 64 36 64 H22 Z"
            , path "" "M9 32 H22 M9 54 H22 M55 43 H66"
            , svgLabel "23" "84" "AND"
            , path "fill-paper" "M79 22 Q97 43 79 64 Q108 64 123 43 Q108 22 79 22 Z"
            , path "" "M66 32 H85 M66 54 H85 M123 43 H133"
            , svgLabel "91" "84" "OR"
            , path "fill-paper" "M144 24 L170 43 L144 62 Z"
            , circle "fill-paper" 174 43 4
            , path "" "M133 43 H144 M178 43 H185"
            , svgLabel "144" "84" "NOT"
            ]
        , label 344 "01 / COMBINATIONAL" "BOOLEAN GATES"
        , svgLabel "26" "410" "SIMPLE PARTS / BOUNDLESS COMPLEXITY"
        ]


touchDiagram : Html msg
touchDiagram =
    svgRoot "diagram touch-diagram" "0 0 360 230"
        [ svgEl "path" [ ( "class", "line" ), ( "d", "M72 77 L180 26 L292 78 L182 132 Z" ) ] []
        , svgEl "path" [ ( "class", "line fill-faint" ), ( "d", "M72 77 L182 132 L182 168 L72 112 Z" ) ] []
        , svgEl "path" [ ( "class", "line" ), ( "d", "M292 78 L182 132 L182 168 L292 112 Z" ) ] []
        , svgEl "path" [ ( "class", "line" ), ( "d", "M72 112 L182 168 L292 112" ) ] []
        , svgEl "path" [ ( "class", "line fill-blue" ), ( "d", "M128 88 L158 74 L189 88 L159 103 Z M166 108 L196 94 L227 108 L197 123 Z M104 106 L134 92 L165 106 L135 122 Z M142 126 L172 112 L203 126 L173 142 Z M204 82 L234 68 L265 82 L235 97 Z" ) ] []
        , svgLabel "36" "42" "GRID FIELD"
        , svgEl "line" [ ( "class", "line dash" ), ( "x1", "180" ), ( "y1", "26" ), ( "x2", "180" ), ( "y2", "8" ) ] []
        ]


kernelDiagram : Html msg
kernelDiagram =
    svgRoot "diagram kernel-diagram" "0 0 360 260"
        [ svgEl "path" [ ( "class", "line" ), ( "d", "M62 184 C98 160 120 82 170 64 C224 44 235 151 296 168" ) ] []
        , svgEl "path" [ ( "class", "line" ), ( "d", "M72 176 C106 160 122 119 160 102 C212 79 240 145 286 156" ) ] []
        , svgEl "path" [ ( "class", "line" ), ( "d", "M92 196 L162 218 L292 174" ) ] []
        , svgEl "path" [ ( "class", "line" ), ( "d", "M92 196 L92 140 L162 116 L162 218" ) ] []
        , svgEl "path" [ ( "class", "line fill-blue" ), ( "d", "M92 196 L162 218 L162 176 L92 154 Z M162 218 L232 194 L232 152 L162 176 Z" ) ] []
        , svgLabel "138" "238" "1  2  1"
        , svgLabel "134" "40" "WEIGHT CURVE"
        ]


bezierDiagram : Html msg
bezierDiagram =
    svgRoot "diagram bezier-diagram" "0 0 360 220"
        [ svgEl "path" [ ( "class", "line soft" ), ( "d", "M54 164 L120 38 M306 46 L258 164" ) ] []
        , svgEl "path" [ ( "class", "line thick" ), ( "d", "M54 164 C120 38 258 164 306 46" ) ] []
        , svgEl "circle" [ ( "class", "line fill-blue" ), ( "cx", "54" ), ( "cy", "164" ), ( "r", "6" ) ] []
        , svgEl "circle" [ ( "class", "line fill-paper" ), ( "cx", "120" ), ( "cy", "38" ), ( "r", "5" ) ] []
        , svgEl "circle" [ ( "class", "line fill-paper" ), ( "cx", "258" ), ( "cy", "164" ), ( "r", "5" ) ] []
        , svgEl "circle" [ ( "class", "line fill-blue" ), ( "cx", "306" ), ( "cy", "46" ), ( "r", "6" ) ] []
        , svgLabel "149" "116" "t = 0.62"
        ]


rasterDiagram : Html msg
rasterDiagram =
    svgRoot "diagram raster-diagram" "0 0 360 260"
        [ svgEl "path" [ ( "class", "line fill-blue" ), ( "d", "M74 220 L128 52 L176 52 L234 220 L190 220 L180 186 L122 186 L112 220 Z M132 148 L170 148 L150 82 Z" ) ] []
        , svgEl "path" [ ( "class", "line thick" ), ( "d", "M224 160 C224 123 251 100 286 100 C316 100 334 119 334 151 L334 220 L300 220 L300 204 C292 217 278 225 260 225 C234 225 216 210 216 187 C216 166 234 153 266 151 L300 149 C299 135 291 128 277 128 C262 128 253 136 248 149 Z M258 186 C258 196 267 202 280 202 C293 202 303 193 303 181 L303 172 L274 175 C264 177 258 181 258 186 Z" ) ] []
        , svgEl "path" [ ( "class", "line soft" ), ( "d", "M42 52 H338 M42 86 H338 M42 120 H338 M42 154 H338 M42 188 H338 M42 222 H338 M74 30 V238 M108 30 V238 M142 30 V238 M176 30 V238 M210 30 V238 M244 30 V238 M278 30 V238 M312 30 V238" ) ] []
        , svgLabel "54" "34" "RASTER EDGE"
        ]


arrow : String -> String -> String -> String -> Html msg
arrow x1 y1 x2 y2 =
    svgEl "g" []
        [ svgEl "line" [ ( "class", "line" ), ( "x1", x1 ), ( "y1", y1 ), ( "x2", x2 ), ( "y2", y2 ) ] []
        , svgEl "path" [ ( "class", "line fill-blue" ), ( "d", "M" ++ x2 ++ " " ++ y2 ++ " l-16 -7 l5 7 l-5 7 Z" ) ] []
        ]


svgRoot : String -> String -> List (Svg msg) -> Html msg
svgRoot className viewBox children =
    Svg.svg
        [ attribute "class" className
        , attribute "viewBox" viewBox
        , attribute "aria-hidden" "true"
        , attribute "focusable" "false"
        ]
        children


svgLabel : String -> String -> String -> Svg msg
svgLabel x y label =
    Svg.text_
        [ attribute "class" "svg-label"
        , attribute "x" x
        , attribute "y" y
        ]
        [ Svg.text label ]


svgEl : String -> List ( String, String ) -> List (Svg msg) -> Svg msg
svgEl tag attrs children =
    Svg.node tag (List.map (\( key, value ) -> attribute key value) attrs) children




{-| Sample a sine wave. Frequency and amplitude are bounded to keep the plate readable. -}
signal : { amplitude : Float, cycles : Float } -> Html msg
signal config =
    let
        point i =
            let
                x = toFloat i / 120
            in
            String.fromFloat (30 + x * 300) ++ "," ++ String.fromFloat (130 - clamp 0 85 config.amplitude * sin (x * 2 * pi * clamp 0.5 8 config.cycles))
    in
    svgRoot "diagram" "0 0 360 260"
        [ path "soft" "M30 40 V220 M30 130 H330 M330 40 V220"
        , svgEl "polyline" [ ( "class", "line thick" ), ( "points", String.join " " (List.map point (List.range 0 120)) ) ] []
        , svgLabel "32" "28" "SIGNAL / TIME DOMAIN"
        , svgLabel "260" "245" "t →"
        ]


{-| An orbital object with one to six planes. -}
orbit : Int -> Html msg
orbit count =
    svgRoot "diagram" "0 0 360 260"
        (List.map
            (\i -> svgEl "ellipse" [ ( "class", "line" ), ( "cx", "180" ), ( "cy", "130" ), ( "rx", "106" ), ( "ry", "40" ), ( "transform", "rotate(" ++ String.fromFloat (toFloat i * 180 / toFloat (clamp 1 6 count)) ++ " 180 130)" ) ] [])
            (List.range 0 (clamp 1 6 count - 1))
            ++ [ circle "fill-blue" 180 130 16, circle "fill-paper" 276 112 5, svgLabel "28" "28" "ORBITAL PLANES" ]
        )


chip : Html msg
chip =
    svgRoot "diagram" "0 0 360 260"
        ([ svgEl "rect" [ ( "class", "line fill-faint" ), ( "x", "115" ), ( "y", "66" ), ( "width", "130" ), ( "height", "130" ) ] []
         , svgEl "rect" [ ( "class", "line fill-blue" ), ( "x", "143" ), ( "y", "94" ), ( "width", "74" ), ( "height", "74" ) ] []
         , svgLabel "152" "135" "CORE"
         , svgLabel "26" "28" "LOGIC / 24 PIN"
         ]
            ++ List.concatMap
                (\i ->
                    let
                        p = String.fromInt (80 + i * 20)
                        q = String.fromInt (130 + i * 20)
                    in
                    [ path "" ("M80 " ++ p ++ " H115 M245 " ++ p ++ " H280")
                    , path "" ("M" ++ q ++ " 36 V66 M" ++ q ++ " 196 V226")
                    ]
                )
                (List.range 0 5)
        )


cube : Html msg
cube =
    svgRoot "diagram" "0 0 360 260"
        [ path "fill-faint" "M180 38 L285 96 L180 156 L75 96 Z"
        , path "fill-blue" "M75 96 L180 156 V222 L75 162 Z"
        , path "" "M180 156 L285 96 V162 L180 222 Z"
        , path "dash" "M180 38 V105 L75 162 M180 105 L285 162"
        , path "soft" "M50 216 L160 248 M302 92 V174"
        , svgLabel "24" "28" "SOLID / ISOMETRIC"
        ]


network : Html msg
network =
    let
        nodes = [ ( 64, 130 ), ( 152, 64 ), ( 152, 196 ), ( 260, 60 ), ( 294, 130 ), ( 260, 200 ) ]
    in
    svgRoot "diagram" "0 0 360 260"
        ([ path "" "M64 130 L152 64 L260 60 M64 130 L152 196 L260 200 M152 64 L294 130 L152 196"
         , path "dash" "M152 64 V196 M260 60 L294 130 L260 200"
         , svgLabel "24" "28" "NETWORK / ADJACENCY"
         ]
            ++ List.map (\( x, y ) -> circle "fill-paper" x y 10) nodes
            ++ [ circle "fill-blue" 64 130 4, circle "fill-blue" 294 130 4 ]
        )


{-| Concentric contour lines, with a bounded density of three to twelve levels. -}
contours : Int -> Html msg
contours levels =
    let
        contour level =
            let
                point i =
                    let
                        angle = toFloat i / 100 * 2 * pi
                        radius = toFloat level * 8 * (1 + 0.13 * sin (3 * angle) + 0.08 * cos (5 * angle))
                    in
                    String.fromFloat (180 + radius * cos angle * 1.25) ++ "," ++ String.fromFloat (135 + radius * sin angle * 0.85)
            in
            svgEl "polyline" [ ( "class", "line" ), ( "points", String.join " " (List.map point (List.range 0 100)) ) ] []
    in
    svgRoot "diagram" "0 0 360 260"
        (svgLabel "24" "28" "CONTOUR / HEIGHT FIELD" :: List.map contour (List.range 1 (clamp 3 12 levels)))


path : String -> String -> Svg msg
path style d =
    svgEl "path" [ ( "class", "line " ++ style ), ( "d", d ) ] []


circle : String -> Int -> Int -> Int -> Svg msg
circle style x y radius =
    svgEl "circle" [ ( "class", "line " ++ style ), ( "cx", String.fromInt x ), ( "cy", String.fromInt y ), ( "r", String.fromInt radius ) ] []


{-| Elementary cellular automaton, 47 cells wide and 24 generations.
The rule is clamped to the standard 0–255 range; boundaries are dead.
-}
cellularAutomaton : Int -> Html msg
cellularAutomaton requestedRule =
    let
        rule = clamp 0 255 requestedRule
        next row =
            let
                alive i = if Set.member i row then 1 else 0
            in
            List.range 0 46
                |> List.filter (\i -> Bitwise.and 1 (Bitwise.shiftRightZfBy (4 * alive (i - 1) + 2 * alive i + alive (i + 1)) rule) == 1)
                |> Set.fromList

        generations remaining row =
            if remaining <= 0 then [] else row :: generations (remaining - 1) (next row)

        cells rowIndex row =
            Set.toList row |> List.map (\column -> pixel (39 + toFloat column * 6) (55 + toFloat rowIndex * 7) 5)
    in
    svgRoot "diagram" "0 0 360 260"
        ([ svgLabel "24" "28" ("CELLULAR / RULE " ++ String.fromInt rule)
         , svgLabel "39" "244" "SINGLE SEED → 24 GENERATIONS"
         ] ++ List.concat (List.indexedMap cells (generations 24 (Set.singleton 23))))


{-| Three actual generations of Conway's Life, using the B3/S23 rule
on an unbounded grid. The glider advances one cell diagonally every four steps.
-}
gameOfLife : Html msg
gameOfLife =
    let
        initial = Set.fromList [ ( 1, 0 ), ( 2, 1 ), ( 0, 2 ), ( 1, 2 ), ( 2, 2 ) ]
        advance n board = if n <= 0 then board else advance (n - 1) (lifeStep board)
        frame index =
            let
                left = 24 + toFloat index * 110
                board = advance (index * 4) initial
            in
            [ svgEl "g" []
                (List.concatMap
                    (\row -> List.map
                        (\col -> svgEl "rect"
                            [ ( "x", String.fromFloat (left + toFloat col * 12) )
                            , ( "y", String.fromInt (88 + row * 12) )
                            , ( "width", "11" ), ( "height", "11" )
                            , ( "class", if Set.member ( col, row ) board then "life-cell" else "life-empty" )
                            ] [])
                        (List.range 0 6))
                    (List.range 0 6))
            , svgLabel (String.fromFloat left) "198" ("GEN / " ++ String.fromInt (index * 4))
            ]
    in
    svgRoot "diagram" "0 0 360 260"
        ([ svgLabel "24" "28" "GAME OF LIFE / GLIDER"
         , svgLabel "24" "242" "B3/S23 / A PATTERN IN MOTION"
         ] ++ List.concatMap frame (List.range 0 2))


lifeStep : Set ( Int, Int ) -> Set ( Int, Int )
lifeStep board =
    let
        neighbors ( x, y ) =
            List.concatMap (\dx -> List.filterMap (\dy -> if dx == 0 && dy == 0 then Nothing else Just ( x + dx, y + dy )) [ -1, 0, 1 ]) [ -1, 0, 1 ]
        candidates = Set.toList board |> List.concatMap neighbors |> Set.fromList
        survives cell =
            let count = neighbors cell |> List.filter (\neighbor -> Set.member neighbor board) |> List.length
            in count == 3 || (count == 2 && Set.member cell board)
    in
    Set.filter survives candidates


functional : Html msg
functional =
    svgRoot "diagram" "0 0 360 260"
        [ svgLabel "24" "28" "FUNCTIONAL / PURE TRANSFORM"
        , svgLabel "24" "83" "INPUT"
        , svgLabel "285" "83" "OUTPUT"
        , box 116 78 128 98
        , svgLabel "162" "115" "f(x)"
        , svgLabel "149" "145" "x × x"
        , svgLabel "31" "132" "3"
        , flowArrow 51 127 112 127
        , flowArrow 248 127 310 127
        , svgLabel "324" "132" "9"
        , circle "fill-paper" 116 127 3
        , circle "fill-paper" 244 127 3
        , path "soft dash" "M116 194 H244"
        , svgLabel "55" "225" "SAME INPUT → SAME OUTPUT"
        ]


composable : Html msg
composable =
    svgRoot "diagram" "0 0 360 260"
        [ svgLabel "24" "28" "COMPOSABLE / FUNCTIONAL"
        , box 75 76 70 64
        , box 215 76 70 64
        , svgLabel "104" "113" "f"
        , svgLabel "244" "113" "g"
        -- Every type sits on a real directed wire: A into f, B into g, C out.
        , flowArrow 24 108 71 108
        , flowArrow 149 108 211 108
        , flowArrow 289 108 336 108
        , svgLabel "42" "94" "A"
        , svgLabel "176" "94" "B"
        , svgLabel "309" "94" "C"
        , path "soft" "M75 155 V170 H285 V155"
        -- The same pipeline collapsed into a single reusable function.
        , box 132 192 96 38
        , svgLabel "155" "216" "g ∘ f"
        , flowArrow 77 211 128 211
        , flowArrow 232 211 283 211
        , svgLabel "60" "216" "A"
        , svgLabel "295" "216" "C"
        ]


{-| Direction-aware arrows, reusable for horizontal, vertical, and diagonal flows. -}
flowArrow : Float -> Float -> Float -> Float -> Svg msg
flowArrow x1 y1 x2 y2 =
    let
        angle = atan2 (y2 - y1) (x2 - x1) * 180 / pi
    in
    svgEl "g" [ ( "class", "flow-arrow" ) ]
        [ path "" ("M" ++ String.fromFloat x1 ++ " " ++ String.fromFloat y1 ++ " L" ++ String.fromFloat x2 ++ " " ++ String.fromFloat y2)
        , svgEl "path"
            [ ( "class", "line fill-blue" )
            , ( "d", "M-8 -4 L0 0 L-8 4 L-6 0 Z" )
            , ( "transform", "translate(" ++ String.fromFloat x2 ++ " " ++ String.fromFloat y2 ++ ") rotate(" ++ String.fromFloat angle ++ ")" )
            ] []
        ]


{-| Sierpiński triangle. Depth is bounded to 0–5 (at most 243 triangles). -}
fractal : Int -> Html msg
fractal requestedDepth =
    let
        midpoint ( ax, ay ) ( bx, by ) = ( (ax + bx) / 2, (ay + by) / 2 )
        point ( x, y ) = String.fromFloat x ++ "," ++ String.fromFloat y
        triangles depth a b c =
            if depth <= 0 then
                [ svgEl "polygon" [ ( "class", "fractal-cell" ), ( "points", String.join " " (List.map point [ a, b, c ]) ) ] [] ]
            else
                triangles (depth - 1) a (midpoint a b) (midpoint a c)
                    ++ triangles (depth - 1) (midpoint a b) b (midpoint b c)
                    ++ triangles (depth - 1) (midpoint a c) (midpoint b c) c
    in
    svgRoot "diagram" "0 0 360 260"
        ([ svgLabel "24" "28" "FRACTAL / SIERPINSKI"
         , svgLabel "24" "245" ("SELF-SIMILAR / DEPTH " ++ String.fromInt (clamp 0 5 requestedDepth))
         ] ++ triangles (clamp 0 5 requestedDepth) ( 180, 48 ) ( 80, 222 ) ( 280, 222 ))


turingMachine : Html msg
turingMachine =
    let
        tape = [ "…", "1", "0", "0", "1", "0", "…" ]
        cell index symbol =
            svgEl "g" []
                [ svgEl "rect" [ ( "class", if index == 3 then "line fill-blue" else "line fill-faint" ), ( "x", String.fromInt (26 + index * 44) ), ( "y", "142" ), ( "width", "44" ), ( "height", "42" ) ] []
                , svgLabel (String.fromInt (43 + index * 44)) "168" symbol
                ]
    in
    svgRoot "diagram" "0 0 360 260"
        ([ svgLabel "24" "28" "TURING MACHINE / TAPE & HEAD"
         , box 136 53 88 48
         , svgLabel "166" "82" "q0"
         , path "" "M180 101 V132 M174 126 L180 132 L186 126"
         , arrow "202" "122" "244" "122"
         , svgLabel "26" "218" "(q0, 0) → (q1, 1, R)"
         , svgLabel "26" "244" "READ 0 / WRITE 1 / MOVE RIGHT"
         ] ++ List.indexedMap cell tape)


pixel : Float -> Float -> Float -> Svg msg
pixel x y size =
    svgEl "rect" [ ( "class", "life-cell" ), ( "x", String.fromFloat x ), ( "y", String.fromFloat y ), ( "width", String.fromFloat size ), ( "height", String.fromFloat size ) ] []


box : Int -> Int -> Int -> Int -> Svg msg
box x y width height =
    svgEl "rect" [ ( "class", "line fill-faint" ), ( "x", String.fromInt x ), ( "y", String.fromInt y ), ( "width", String.fromInt width ), ( "height", String.fromInt height ) ] []
