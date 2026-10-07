module Digital exposing (Kind(..), Model, Msg, initial, update, controls, drawing, title, description, instruction, status, question, hint)

import Bitwise
import Html exposing (Html, button, div, input, label, output, p, span, text)
import Html.Attributes as H
import Html.Events exposing (onClick, onInput)
import Svg as S
import Svg.Attributes as A

type Kind = Map | Mux | Datapath | Systolic | Fabric

type alias Model =
    { colors : List Int, tile : Int, graph : Bool, select : Int, bits : List Int, operand : Int, register : Int, xor : Bool, tick : Int, route : Bool }

type Msg = Tile String | Paint | Graph | Select String | Flip Int | Operand String | Operation | Clock | Step | Rewind | Route

initial : Model
initial = { colors = List.range 0 11 |> List.map (\i -> modBy 3 (modBy 4 i + 2 * (i // 4))), tile = 0, graph = False, select = 0, bits = [ 1, 0, 1, 0 ], operand = 3, register = 0, xor = False, tick = 0, route = False }

get : Int -> List Int -> Int
get i xs = List.drop i xs |> List.head |> Maybe.withDefault 0

result : Model -> Int
result m = if m.xor then Bitwise.xor m.register m.operand else modBy 16 (m.register + m.operand)

update : Msg -> Model -> Model
update msg m =
    case msg of
        Tile raw -> { m | tile = clamp 0 11 (String.toInt raw |> Maybe.withDefault 0) }
        Paint -> { m | colors = List.indexedMap (\i c -> if i == m.tile then modBy 3 (c + 1) else c) m.colors }
        Graph -> { m | graph = not m.graph }
        Select raw -> { m | select = clamp 0 3 (String.toInt raw |> Maybe.withDefault 0) }
        Flip n -> { m | bits = List.indexedMap (\i b -> if i == n then 1 - b else b) m.bits }
        Operand raw -> { m | operand = clamp 0 15 (String.toInt raw |> Maybe.withDefault 0) }
        Operation -> { m | xor = not m.xor }
        Clock -> { m | register = result m }
        Step -> { m | tick = min 7 (m.tick + 1) }
        Rewind -> { m | tick = max 0 (m.tick - 1) }
        Route -> { m | route = not m.route }

title : Kind -> String
title kind = case kind of
    Map -> "Three-color map"
    Mux -> "Multiplexer"
    Datapath -> "Clocked datapath"
    Systolic -> "Systolic array"
    Fabric -> "FPGA fabric"

instruction : Kind -> String
instruction kind = case kind of
    Map -> "Select a hexagon and cycle its color. Show the adjacency graph to see which regions constrain each other."
    Mux -> "Toggle the four data inputs. Change the two-bit select address and follow the selected wire."
    Datapath -> "Set a four-bit operand and choose ADD or XOR. A clock edge captures the ALU result in the register."
    Systolic -> "Step the clock to follow a wave of multiply–accumulate operations through nine processing elements."
    Fabric -> "Toggle the LUT inputs, change its logic function, and choose between two illustrative routing paths."

description : Kind -> String
description kind = case kind of
    Map -> "Each hexagon is a region; regions sharing an edge must have different colors. Each graph node represents one region and each graph edge represents a shared border. This particular patch admits a three-coloring; arbitrary maps do not necessarily do so."
    Mux -> "A 4-to-1 multiplexer routes exactly one data bit to Y. The binary select address S1 S0 chooses D0 through D3; unselected inputs do not affect Y."
    Datapath -> "The register Q feeds one ALU input and operand B feeds the other. The combinational result D changes immediately; Q changes only on a clock edge. ADD wraps modulo 16 and XOR works bit by bit."
    Systolic -> "This 3×3 output-stationary array multiplies A by B. A values move right and B values move down with staggered injection. PE(i,j) accumulates A(i,k)×B(k,j) at clock 1+i+j+k, using zero-based indices. Each output stays in its processing element."
    Fabric -> "A conceptual fabric of lookup-table blocks and routing channels. LUT 0 computes AND or XOR from two bits. A highlighted route carries its output to LUT 8, configured as a buffer. These are illustrative connections, not a vendor-specific FPGA architecture."

question : Kind -> String
question kind = case kind of
    Map -> "Where do the conflicts appear?"
    Mux -> "Does changing an unselected input matter?"
    Datapath -> "What happens after the register reaches 15?"
    Systolic -> "Why does the bottom-right cell finish last?"
    Fabric -> "Can a different route carry the same logic?"

hint : Kind -> String
hint kind = case kind of
    Map -> "Matching letters mark matching colors. Conflicting borders become dashed red graph edges; switch views without changing the coloring. Reset restores a valid coloring."
    Mux -> "Hold the select address fixed and toggle the other three inputs. Only the selected input changes the output."
    Datapath -> "Try B = 1 with ADD, then clock repeatedly. Switch to XOR and notice that applying the same operand twice restores the starting value."
    Systolic -> "The first cell starts at clock 1. Each hop delays an operand by one clock, so the last cell receives its last pair at clock 7. Rewind to examine the partial sums."
    Fabric -> "Changing the route preserves the Boolean result here. Real routing also affects delay and resource usage; this illustration does not simulate those electrical effects."

edges : List (Int, Int)
edges =
    List.range 0 11
        |> List.concatMap
            (\i -> List.range (i + 1) 11
                |> List.filterMap
                    (\j ->
                        let
                            dq = modBy 4 j - modBy 4 i
                            dr = j // 4 - i // 4
                        in
                        if List.member (dq, dr) [(1,0),(0,1),(-1,1)] then Just (i,j) else Nothing
                    )
            )

conflicts : Model -> List (Int,Int)
conflicts m = List.filter (\(a,b) -> get a m.colors == get b m.colors) edges

status : Kind -> Model -> String
status kind m = case kind of
    Map -> String.fromInt (List.length (conflicts m)) ++ " conflicting borders / 12 regions / 3 colors"
    Mux -> "S1 S0 = " ++ String.fromInt (m.select // 2) ++ String.fromInt (modBy 2 m.select) ++ " / Y = D" ++ String.fromInt m.select ++ " = " ++ String.fromInt (get m.select m.bits)
    Datapath -> "Q = " ++ String.fromInt m.register ++ " / next D = " ++ String.fromInt (result m) ++ " / 4-bit unsigned"
    Systolic -> "Clock " ++ String.fromInt m.tick ++ " / 7" ++ (if m.tick == 7 then " / C = A × B complete" else " / partial sums")
    Fabric -> "LUT 0 → LUT 8 / Y = " ++ String.fromInt (fabricValue m) ++ " / " ++ (if m.route then "lower route" else "upper route")

range : String -> Int -> Int -> Int -> (String -> Msg) -> Html Msg
range caption low high value msg = label [H.class "slider"] [span [] [text caption, output [] [text (String.fromInt value)]], input [H.type_ "range",H.attribute "aria-label" caption,H.min (String.fromInt low),H.max (String.fromInt high),H.step "1",H.value (String.fromInt value),onInput msg] []]

btn : String -> Msg -> Html Msg
btn caption msg = button [onClick msg] [text caption]

bitControls : Int -> Model -> Html Msg
bitControls count m = div [H.class "actions"] (List.range 0 (count - 1) |> List.map (\i -> btn ("D" ++ String.fromInt i ++ " = " ++ String.fromInt (get i m.bits)) (Flip i)))

controls : Kind -> Model -> List (Html Msg)
controls kind m = case kind of
    Map -> [range "Selected region" 0 11 m.tile Tile, div [H.class "actions"] [btn "Cycle color" Paint,btn (if m.graph then "Show tiles" else "Show graph") Graph], p [] [text ("Region " ++ String.fromInt m.tile ++ " / color " ++ colorName (get m.tile m.colors))]]
    Mux -> [range "Select address" 0 3 m.select Select,bitControls 4 m]
    Datapath -> [range "Operand B" 0 15 m.operand Operand,div [H.class "actions"] [btn (if m.xor then "Operation: XOR" else "Operation: ADD") Operation,btn "Clock ↑" Clock]]
    Systolic -> [div [H.class "actions"] [button [onClick Rewind,H.disabled (m.tick == 0)] [text "Back"],button [onClick Step,H.disabled (m.tick == 7)] [text "Step clock →"]],p [] [text "A = [[1,2,3], [4,5,6], [7,8,9]]"],p [] [text "B = [[1,0,2], [0,1,0], [2,0,1]]"]]
    Fabric -> [bitControls 2 m,div [H.class "actions"] [btn (if m.xor then "LUT: XOR" else "LUT: AND") Operation,btn (if m.route then "Use upper route" else "Use lower route") Route]]

colorName : Int -> String
colorName n = getName n ["A","B","C"]

getName : Int -> List String -> String
getName n xs = List.drop n xs |> List.head |> Maybe.withDefault ""

svg : String -> List (S.Svg msg) -> Html msg
svg caption children = S.svg [A.viewBox "0 0 520 360", A.class "diagram digital"] (S.title [] [S.text caption] :: children)

line : String -> String -> S.Svg msg
line cls path = S.path [A.class cls,A.d path] []

-- An open arrowhead ends exactly at the receiving port.
directed : String -> (Float,Float) -> (Float,Float) -> S.Svg msg
directed cls start end =
    let
        (ax,ay) = start
        (bx,by) = end
        angle = atan2 (by-ay) (bx-ax)
        wing offset = (bx - 6 * cos angle + offset * sin angle, by - 6 * sin angle - offset * cos angle)
    in S.g [] [line cls ("M" ++ xy start ++ " L" ++ xy end),line cls ("M" ++ xy (wing 3) ++ " L" ++ xy end ++ " L" ++ xy (wing -3))]

junction : Float -> Float -> S.Svg msg
junction x y = S.circle [A.class "junction",A.cx (String.fromFloat x),A.cy (String.fromFloat y),A.r "3"] []

labelAt : Float -> Float -> String -> S.Svg msg
labelAt x y caption = S.text_ [A.x (String.fromFloat x),A.y (String.fromFloat y),A.textAnchor "middle"] [S.text caption]

box : String -> Float -> Float -> Float -> Float -> S.Svg msg
box cls x y w h = S.rect [A.class cls,A.x (String.fromFloat x),A.y (String.fromFloat y),A.width (String.fromFloat w),A.height (String.fromFloat h),A.rx "4"] []

xy : (Float,Float) -> String
xy (x,y) = String.fromFloat x ++ " " ++ String.fromFloat y

center : Int -> (Float,Float)
center i = (65 + toFloat (modBy 4 i) * 88 + toFloat (i // 4) * 44,85 + toFloat (i // 4) * (44 * sqrt 3))

mapDrawing : Model -> Html Msg
mapDrawing m =
    let
        edge (i,j) = line (if get i m.colors == get j m.colors then "conflict" else "wire") ("M" ++ xy (center i) ++ " L" ++ xy (center j))
        border (i,j) =
            let
                (ax,ay) = center i
                (bx,by) = center j
                mx = (ax+bx)/2
                my = (ay+by)/2
                dx = (bx-ax)/(2 * sqrt 3)
                dy = (by-ay)/(2 * sqrt 3)
            in line "conflict" ("M" ++ xy (mx-dy,my+dx) ++ " L" ++ xy (mx+dy,my-dx))
        tile i =
            let
                (x,y) = center i
                points = List.range 0 5 |> List.map (\n -> let angle = (toFloat n * 60 - 30) * pi / 180 in xy (x + (88 / sqrt 3) * cos angle,y + (88 / sqrt 3) * sin angle)) |> String.join " "
                attrs = [A.class ("region color-" ++ String.fromInt (get i m.colors) ++ (if i == m.tile then " selected-region" else "")),onClick (Tile (String.fromInt i))]
            in S.g [] [(if m.graph then S.circle (attrs ++ [A.cx (String.fromFloat x),A.cy (String.fromFloat y),A.r "21"]) [] else S.polygon (attrs ++ [A.points points]) []),labelAt x (y+4) (String.fromInt i ++ colorName (get i m.colors))]
    in svg "Three-color hexagonal map and adjacency graph"
        ( [labelAt 260 22 (if m.graph then "ADJACENCY / ONE NODE PER REGION" else "TILED MAP / SHARED EDGES CONSTRAIN COLORS")]
        ++ (if m.graph then List.map edge edges else []) ++ List.map tile (List.range 0 11)
        ++ (if m.graph then [] else List.map border (conflicts m))
        ++ [labelAt 260 340 "A / BLUE     B / AMBER     C / MINT"] )

mux : Model -> Html Msg
mux m =
    let wire i = let y = 80 + toFloat i * 55 in S.g [] [labelAt 65 (y+4) ("D" ++ String.fromInt i ++ " = " ++ String.fromInt (get i m.bits)),line (if i == m.select then "live-wire" else "wire") ("M105 " ++ String.fromFloat y ++ " H220"),labelAt 236 (y-10) (String.fromInt i)]
    in svg "Four-to-one multiplexer"
        ( [line "block" "M220 48 L315 78 V256 L220 288 Z"] ++ List.map wire (List.range 0 3)
        ++ [line "live-wire" ("M220 " ++ String.fromFloat (80 + toFloat m.select * 55) ++ " L300 167 H400"),labelAt 450 171 ("Y = " ++ String.fromInt (get m.select m.bits)),line "wire" "M268 271.8315789473684 V316",labelAt 268 340 ("S1 S0 = " ++ String.fromInt (m.select // 2) ++ String.fromInt (modBy 2 m.select))] )

datapath : Model -> Html Msg
datapath m = svg "Four-bit register and ALU with feedback"
    [box "block" 55 115 110 90,labelAt 110 144 "REGISTER Q",labelAt 110 179 (String.fromInt m.register),directed "live-wire" (165,160) (245,160),box "block" 245 100 100 115,labelAt 295 137 (if m.xor then "XOR" else "ADD"),labelAt 295 170 ("D = " ++ String.fromInt (result m)),directed "wire" (295,55) (295,100),labelAt 295 36 ("B = " ++ String.fromInt m.operand),line "live-wire" "M345 160 H420 V260 H110 V225",directed "live-wire" (110,225) (110,205),labelAt 265 285 "D → CAPTURE ON CLOCK EDGE",line "wire" "M30 240 H40 V190 H55",line "wire" "M55 180 L66 190 L55 200",labelAt 50 265 "CLK ↑",labelAt 260 325 "4 BITS / ADD WRAPS MODULO 16"]

matrixA : Int -> Int -> Int
matrixA i k = 1 + i * 3 + k

matrixB : Int -> Int -> Int
matrixB k j = get j (case k of
    0 -> [1,0,2]
    1 -> [0,1,0]
    _ -> [2,0,1])

systolic : Model -> Html Msg
systolic m =
    let
        pe i j =
            let
                x = 120 + toFloat j * 130
                y = 85 + toFloat i * 95
                k = m.tick - 1 - i - j
                active = k >= 0 && k < 3
                total = List.range 0 2 |> List.filter (\n -> 1+i+j+n <= m.tick) |> List.map (\n -> matrixA i n * matrixB n j) |> List.sum
                caption = if active then String.fromInt (matrixA i k) ++ "×" ++ String.fromInt (matrixB k j) else if k >= 3 then "DONE" else "WAIT"
            in [directed "wire" (x-45,y+31) (x,y+31),directed "wire" (x+42.5,y-33) (x+42.5,y),box (if active then "active-block" else "block") x y 85 62,labelAt (x+42) (y+18) caption,S.text_ [A.class "sum",A.x (String.fromFloat (x+42)),A.y (String.fromFloat (y+46)),A.textAnchor "middle",H.attribute "data-cell" (String.fromInt i ++ "-" ++ String.fromInt j)] [S.text (String.fromInt total)]]
    in svg "Three-by-three systolic matrix multiplication"
        ([labelAt 260 22 ("CLOCK " ++ String.fromInt m.tick ++ " / A →   B ↓"),labelAt 50 120 "A row 0",labelAt 50 215 "A row 1",labelAt 50 310 "A row 2"]
        ++ List.map (\j -> labelAt (162.5 + toFloat j * 130) 47 ("B col " ++ String.fromInt j)) (List.range 0 2)
        ++ List.concatMap (\i -> List.concatMap (pe i) (List.range 0 2)) (List.range 0 2))

fabricValue : Model -> Int
fabricValue m = if m.xor then Bitwise.xor (get 0 m.bits) (get 1 m.bits) else Bitwise.and (get 0 m.bits) (get 1 m.bits)

fabric : Model -> Html Msg
fabric m =
    let
        block i =
            let
                x = 60 + toFloat (modBy 3 i) * 155
                y = 62 + toFloat (i // 3) * 100
            in S.g [] [box (if i == 0 || i == 8 then "active-block" else "block") x y 80 52,labelAt (x+40) (y+20) ("LUT " ++ String.fromInt i),labelAt (x+40) (y+40) (if i == 0 then (if m.xor then "XOR" else "AND") else if i == 8 then "BUFFER" else "· · ·")]
        route = if m.route then "M140 88 H177 V238 H333 V288 H370" else "M140 88 H177 V138 H333 V288 H370"
    in svg "Conceptual FPGA logic blocks and selectable routing"
        ([labelAt 260 22 ("D0=" ++ String.fromInt (get 0 m.bits) ++ "  D1=" ++ String.fromInt (get 1 m.bits) ++ " / PROGRAMMABLE INTERCONNECT")]
        ++ List.map (\y -> line "wire" ("M35 " ++ String.fromInt y ++ " H480")) [138,238]
        ++ List.map (\x -> line "wire" ("M" ++ String.fromInt x ++ " 40 V330")) [177,333]
        ++ [line "live-wire" route, junction 177 (if m.route then 238 else 138), junction 333 (if m.route then 238 else 138)]
        ++ List.map block (List.range 0 8)
        ++ [directed "live-wire" (450,288) (480,288),labelAt 445 338 ("Y = " ++ String.fromInt (fabricValue m))])

drawing : Kind -> Model -> Html Msg
drawing kind m = case kind of
    Map -> mapDrawing m
    Mux -> mux m
    Datapath -> datapath m
    Systolic -> systolic m
    Fabric -> fabric m
