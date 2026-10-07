module GenerativeTiling exposing
    ( ColoredTile
    , ColoredTiling
    , Config
    , Point
    , Tile
    , Tiling
    , defaultConfig
    , fromPolygons
    , fromSites
    , generate
    , generateFor
    , generateOrganic
    , outline
    , paint
    , paintGraph
    , paintSkeleton
    , propagate
    , propagateConstraints
    , propagationControls
    , recolor
    , recolorFrom
    )

{-| Formula constraint graphs and their organic contact-cell embedding.
Organic borders preserve the graph; colors are solved from inputs only.
-}

import Array exposing (Array)
import CellNetwork
import ConstraintMap
import Dict exposing (Dict)
import FormulaParser exposing (Expr(..))
import GraphColoring
import Html exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Json.Decode as Decode
import LabLogic exposing (SolveResult(..))
import LogicCircuit
import SignalPropagation
import Svg exposing (Svg)
import Svg.Attributes as S


type alias Point =
    { x : Float, y : Float }


type alias Tile =
    { id : Int
    , site : Point
    , polygon : List Point
    , neighbors : List Int
    , centroid : Point
    , area : Float
    , baseColor : Int
    }


type alias Tiling =
    { width : Float
    , height : Float
    , tiles : List Tile
    , seed : Int
    , rectangular : Bool
    , outlines : Dict Int String
    , constraint : Maybe ConstraintMap.Map
    , coverage : Float
    , constraintsPreserved : Bool
    }


type alias Config =
    { seed : Int
    , width : Float
    , height : Float
    , count : Int
    }


type alias ColoredTile =
    { tile : Tile
    , colorIndex : Int
    , valueColor : Int
    , label : String
    , note : String
    , variable : Maybe String
    }


type alias ColoredTiling =
    { tiling : Tiling
    , tiles : List ColoredTile
    , status : String
    , circuit : Maybe LogicCircuit.State
    , links : List ( Int, Int )
    , changed : List Int
    }


defaultConfig : Config
defaultConfig =
    { seed = 7
    , width = 960
    , height = 600
    , count = 44
    }


generate : Config -> Tiling
generate =
    generateFor "!(a & b)"


generateFor : String -> Config -> Tiling
generateFor formula config =
    generateOrganic config.seed (FormulaParser.parse formula |> Result.withDefault (Var "a"))


recolor : Tiling -> { assignment : Dict String Bool, result : Bool } -> List String -> String -> ColoredTiling
recolor =
    recolorFrom Nothing


recolorFrom : Maybe ColoredTiling -> Tiling -> { assignment : Dict String Bool, result : Bool } -> List String -> String -> ColoredTiling
recolorFrom previous tiling row variables formulaText =
    graphColor previous tiling row.assignment


propagate : Maybe ColoredTiling -> Tiling -> { assignment : Dict String Bool, result : Bool } -> List String -> String -> List ColoredTiling
propagate previous tiling row variables source =
    propagateConstraints previous tiling row.assignment


propagateConstraints : Maybe ColoredTiling -> Tiling -> Dict String Bool -> List ColoredTiling
propagateConstraints previous tiling assignment =
    case previous of
        Just prior ->
            if prior.tiling == tiling then
                case tiling.constraint of
                    Just map ->
                        SignalPropagation.repair (List.map .neighbors tiling.tiles)
                            (ConstraintMap.fixedInputs assignment map)
                            (Array.fromList (List.map .colorIndex prior.tiles))
                            |> List.map (\frame -> coloredFromColors tiling frame.colors frame.changed frame.status)

                    Nothing ->
                        [ graphColor Nothing tiling assignment ]

            else
                [ graphColor Nothing tiling assignment ]

        Nothing ->
            [ graphColor Nothing tiling assignment ]


graphColor : Maybe ColoredTiling -> Tiling -> Dict String Bool -> ColoredTiling
graphColor previous tiling assignment =
    let
        map =
            tiling.constraint |> Maybe.withDefault { regions = [], output = -1, width = tiling.width, height = tiling.height }

        fixed =
            ConstraintMap.fixedInputs assignment map

        adjacency =
            List.map .neighbors tiling.tiles

        colors =
            solveColors adjacency fixed tiling.tiles
    in
    coloredFromColors tiling
        colors
        []
        (if Array.toList colors |> List.any ((>) 0) then
            "Coloring search could not complete."

         else
            "Settled. Shared-border constraints derive OUT from the inputs."
        )


coloredFromColors : Tiling -> Array Int -> List Int -> String -> ColoredTiling
coloredFromColors tiling colors changed status =
    let
        map =
            tiling.constraint |> Maybe.withDefault { regions = [], output = -1, width = tiling.width, height = tiling.height }

        tileView tile =
            let
                region =
                    List.drop tile.id map.regions |> List.head

                input =
                    region |> Maybe.andThen .input

                constant =
                    region |> Maybe.andThen .constant

                color =
                    Array.get tile.id colors |> Maybe.withDefault -1

                value =
                    if color < 0 then
                        "?"

                    else
                        String.fromInt color

                label =
                    case input of
                        Just name ->
                            name ++ "=" ++ value

                        Nothing ->
                            case constant of
                                Just c ->
                                    if c == 2 then
                                        "n"

                                    else
                                        String.fromInt c

                                Nothing ->
                                    if tile.id == map.output then
                                        "OUT=" ++ value

                                    else
                                        ""

                note =
                    region
                        |> Maybe.map
                            (\r ->
                                if r.expression /= "" then
                                    r.expression

                                else if r.constant /= Nothing then
                                    "Fixed palette clue"

                                else
                                    "Three-color constraint region"
                            )
                        |> Maybe.withDefault ""
            in
            { tile = tile, colorIndex = color, valueColor = color, label = label, note = note, variable = input }
    in
    { tiling = tiling, tiles = List.map tileView tiling.tiles, status = status, circuit = Nothing, links = [], changed = changed }


solveColors : List (List Int) -> Dict Int Int -> List Tile -> Array Int
solveColors adjacency fixed tiles =
    case LabLogic.solve 200000 adjacency fixed of
        Solved assignment ->
            assignment

        -- Never substitute a decorative coloring if the solver cannot finish.
        _ ->
            Dict.foldl Array.set (Array.repeat (List.length tiles) -1) fixed



-- Sites


fromSites : Float -> Float -> List Point -> Tiling
fromSites width height sites =
    { width = width, height = height, seed = 0, constraint = Nothing, coverage = 1, constraintsPreserved = True, rectangular = False, outlines = Dict.empty, tiles = indexTiles (voronoiCells width height sites) }


fromPolygons : List (List Point) -> Tiling
fromPolygons polygons =
    { width = 360, height = 240, seed = 0, constraint = Nothing, coverage = 1, constraintsPreserved = True, rectangular = False, outlines = Dict.empty, tiles = indexTiles (List.map (\poly -> ( centroid poly, poly )) polygons) }


outline : List Point -> String
outline points =
    case points of
        [] ->
            ""

        start :: rest ->
            "M " ++ px start ++ " " ++ String.join " " (List.map (\pt -> "L " ++ px pt) rest) ++ " Z"



-- Voronoi


voronoiPolygons : Float -> Float -> List Point -> List (List Point)
voronoiPolygons w h sites =
    List.indexedMap
        (\i site ->
            List.foldl
                (\( j, other ) poly ->
                    if i == j then
                        poly

                    else
                        clipAgainst site other poly
                )
                (bbox w h)
                (List.indexedMap Tuple.pair sites)
                |> dropTiny
        )
        sites


voronoiCells : Float -> Float -> List Point -> List ( Point, List Point )
voronoiCells w h sites =
    List.map2 Tuple.pair sites (voronoiPolygons w h sites)
        |> List.filter (\( _, poly ) -> List.length poly >= 3 && abs (shoelace poly) > 40)


indexTiles : List ( Point, List Point ) -> List Tile
indexTiles cells =
    let
        polys =
            List.map Tuple.second cells

        adj =
            buildAdjacency polys
    in
    List.map3
        (\i ( site, poly ) neighbors ->
            { id = i
            , site = site
            , polygon = poly
            , neighbors = neighbors
            , centroid = centroid poly
            , area = abs (shoelace poly)
            , baseColor = -1
            }
        )
        (List.range 0 (List.length cells - 1))
        cells
        adj


buildAdjacency : List (List Point) -> List (List Int)
buildAdjacency polys =
    let
        n =
            List.length polys

        indexed =
            List.indexedMap Tuple.pair polys

        pairs =
            List.concatMap
                (\( i, pi ) ->
                    List.filterMap
                        (\( j, pj ) ->
                            if j > i && shareEdge pi pj then
                                Just ( i, j )

                            else
                                Nothing
                        )
                        indexed
                )
                indexed
    in
    List.foldl
        (\( a, b ) acc ->
            acc
                |> insertNeighbor a b
                |> insertNeighbor b a
        )
        (Array.repeat n [])
        pairs
        |> Array.toList
        |> List.map (List.sort >> unique)


insertNeighbor : Int -> Int -> Array (List Int) -> Array (List Int)
insertNeighbor from to adj =
    case Array.get from adj of
        Just row ->
            Array.set from (to :: row) adj

        Nothing ->
            adj


unique : List comparable -> List comparable
unique list =
    case list of
        [] ->
            []

        x :: rest ->
            x :: unique (List.filter ((/=) x) rest)


shareEdge : List Point -> List Point -> Bool
shareEdge pa pb =
    let
        edges poly =
            case poly of
                [] ->
                    []

                first :: _ ->
                    List.map2 Tuple.pair poly (List.drop 1 poly ++ [ first ])

        long ( a, b ) =
            distance a b > 0.0001

        match ( a1, a2 ) ( b1, b2 ) =
            (near a1 b2 && near a2 b1) || (near a1 b1 && near a2 b2)
    in
    edges pa
        |> List.filter long
        |> List.any (\ea -> List.any (match ea) (List.filter long (edges pb)))


near : Point -> Point -> Bool
near a b =
    distance a b < 0.00001


distance : Point -> Point -> Float
distance a b =
    let
        dx =
            a.x - b.x

        dy =
            a.y - b.y
    in
    sqrt (dx * dx + dy * dy)


bbox : Float -> Float -> List Point
bbox w h =
    [ { x = 0, y = 0 }
    , { x = w, y = 0 }
    , { x = w, y = h }
    , { x = 0, y = h }
    ]


clipAgainst : Point -> Point -> List Point -> List Point
clipAgainst site other poly =
    case poly of
        [] ->
            []

        _ ->
            let
                last =
                    poly |> List.reverse |> List.head |> Maybe.withDefault site
            in
            List.foldl
                (\curr ( prev, acc ) ->
                    let
                        currIn =
                            inside site other curr
                    in
                    if currIn then
                        if inside site other prev then
                            ( curr, curr :: acc )

                        else
                            ( curr, curr :: intersect site other prev curr :: acc )

                    else if inside site other prev then
                        ( curr, intersect site other prev curr :: acc )

                    else
                        ( curr, acc )
                )
                ( last, [] )
                poly
                |> Tuple.second
                |> List.reverse


inside : Point -> Point -> Point -> Bool
inside site other p =
    let
        mx =
            (site.x + other.x) / 2

        my =
            (site.y + other.y) / 2
    in
    (p.x - mx) * (other.x - site.x) + (p.y - my) * (other.y - site.y) <= 1.0e-7


intersect : Point -> Point -> Point -> Point -> Point
intersect site other a b =
    let
        mx =
            (site.x + other.x) / 2

        my =
            (site.y + other.y) / 2

        nx =
            other.x - site.x

        ny =
            other.y - site.y

        da =
            (a.x - mx) * nx + (a.y - my) * ny

        db =
            (b.x - mx) * nx + (b.y - my) * ny

        denom =
            da - db
    in
    if abs denom < 1.0e-12 then
        a

    else
        let
            t =
                da / denom
        in
        { x = a.x + t * (b.x - a.x)
        , y = a.y + t * (b.y - a.y)
        }


dropTiny : List Point -> List Point
dropTiny poly =
    let
        cleaned =
            collapseClose poly
    in
    if List.length cleaned < 3 then
        []

    else
        cleaned


collapseClose : List Point -> List Point
collapseClose poly =
    case poly of
        [] ->
            []

        first :: rest ->
            let
                folded =
                    List.foldl
                        (\p ( prev, acc ) ->
                            if near p prev then
                                ( prev, acc )

                            else
                                ( p, p :: acc )
                        )
                        ( first, [ first ] )
                        rest
                        |> Tuple.second
                        |> List.reverse
            in
            case folded of
                start :: more ->
                    case List.reverse more of
                        last :: _ ->
                            if near start last then
                                start :: List.reverse (List.drop 1 (List.reverse more))

                            else
                                folded

                        [] ->
                            folded

                [] ->
                    []


shoelace : List Point -> Float
shoelace poly =
    case poly of
        [] ->
            0

        first :: _ ->
            List.map2 (\a b -> a.x * b.y - b.x * a.y) poly (List.drop 1 poly ++ [ first ])
                |> List.sum
                |> (\s -> s / 2)


centroid : List Point -> Point
centroid poly =
    let
        a =
            shoelace poly
    in
    if abs a < 1.0e-6 then
        let
            n =
                toFloat (max 1 (List.length poly))
        in
        { x = List.foldl (\p s -> s + p.x) 0 poly / n
        , y = List.foldl (\p s -> s + p.y) 0 poly / n
        }

    else
        let
            pairs =
                case poly of
                    [] ->
                        []

                    first :: _ ->
                        List.map2 Tuple.pair poly (List.drop 1 poly ++ [ first ])

            cx =
                List.foldl (\( p, q ) s -> s + (p.x + q.x) * (p.x * q.y - q.x * p.y)) 0 pairs / (6 * a)

            cy =
                List.foldl (\( p, q ) s -> s + (p.y + q.y) * (p.x * q.y - q.x * p.y)) 0 pairs / (6 * a)
        in
        { x = cx, y = cy }



-- PRNG


scramble : Int -> Int
scramble seed =
    let
        n =
            remainderBy 2147483647 (abs (1664525 * (seed + 17) + 1013904223))
    in
    if n <= 0 then
        seed + 1

    else
        n


nextFloat : Int -> ( Float, Int )
nextFloat seed =
    let
        next =
            remainderBy 2147483647 (abs (1664525 * seed + 1013904223))

        safe =
            if next <= 0 then
                seed + 1

            else
                next
    in
    ( toFloat safe / 2147483647, safe )



-- SVG


propagationControls : Bool -> Bool -> (Bool -> msg) -> msg -> Html msg
propagationControls animate pending onAnimate onStep =
    Html.div [ A.class "lab-actions mosaic-row propagation-controls" ]
        [ Html.label [] [ Html.input [ A.type_ "checkbox", A.checked animate, E.onCheck onAnimate ] [], Html.text " Animate coloring" ]
        , Html.button [ E.onClick onStep, A.disabled (not pending) ] [ Html.text "Step propagation" ]
        ]


paintGraph : (Int -> msg) -> ColoredTiling -> Html msg
paintGraph onTile colored =
    case colored.tiling.constraint of
        Nothing ->
            paint onTile colored

        Just map ->
            let
                tiles =
                    List.map (\r -> { id = r.id, site = r.center, centroid = r.center, polygon = r.polygon, neighbors = r.neighbors, area = 0, baseColor = -1 }) map.regions

                tiling =
                    { width = map.width, height = map.height, seed = colored.tiling.seed, tiles = tiles, rectangular = False, outlines = Dict.empty, constraint = Just map, coverage = colored.tiling.coverage, constraintsPreserved = colored.tiling.constraintsPreserved }

                assignment =
                    colored.tiles |> List.filterMap (\t -> t.variable |> Maybe.map (\name -> ( name, t.colorIndex == 1 ))) |> Dict.fromList

                graphClick id =
                    let
                        name =
                            List.drop id map.regions |> List.head |> Maybe.andThen .input

                        source =
                            colored.tiles |> List.filter (\t -> t.variable /= Nothing && t.variable == name) |> List.head |> Maybe.map (.tile >> .id) |> Maybe.withDefault -1
                    in
                    onTile source
            in
            paint graphClick (graphColor Nothing tiling assignment)


{-| Geometry and adjacency both come from the formula's planar constraint
graph. Never transfer colors from the unrelated rectangular display map.
-}
generateOrganic : Int -> Expr -> Tiling
generateOrganic seed ast =
    let
        map =
            ConstraintMap.buildOrganic seed ast

        network =
            CellNetwork.expand map

        largest cell =
            cell.contours |> List.sortBy (shoelace >> abs >> negate) |> List.head |> Maybe.withDefault []

        tiles =
            List.map (\cell -> { id = cell.id, site = cell.center, centroid = cell.center, polygon = largest cell, neighbors = cell.neighbors, area = cell.area, baseColor = -1 }) network.cells
    in
    { width = map.width
    , height = map.height
    , seed = seed
    , tiles = tiles
    , rectangular = False
    , outlines = Dict.fromList (List.map (\cell -> ( cell.id, CellNetwork.path cell )) network.cells)
    , constraint = Just network.map
    , coverage = network.coverage
    , constraintsPreserved = network.preserved
    }


{-| The same graph nodes, colors and animation in their unexpanded shapes.
-}
paintSkeleton : (Int -> msg) -> ColoredTiling -> Html msg
paintSkeleton onTile colored =
    case colored.tiling.constraint of
        Nothing ->
            Html.text ""

        Just map ->
            let
                original =
                    colored.tiling

                tiles =
                    List.map (\r -> { id = r.id, site = r.center, centroid = r.center, polygon = r.polygon, neighbors = r.neighbors, area = abs (shoelace r.polygon), baseColor = -1 }) map.regions

                tiling =
                    { original | tiles = tiles, outlines = Dict.empty }

                values =
                    List.map2 (\value tile -> { value | tile = tile }) colored.tiles tiles
            in
            paint onTile { colored | tiling = tiling, tiles = values }


mapKind : Tiling -> String
mapKind tiling =
    if tiling.rectangular then
        "tiles"

    else if not (Dict.isEmpty tiling.outlines) then
        "organic"

    else
        "graph"


tilePath : Tiling -> Tile -> String
tilePath tiling tile =
    Dict.get tile.id tiling.outlines
        |> Maybe.withDefault
            (if tiling.constraint /= Nothing then
                outline tile.polygon

             else
                wavyPath tiling tile
            )


interactionOutline : Tiling -> List Int -> ColoredTile -> Svg msg
interactionOutline tiling changed tile =
    Svg.path
        [ S.d (tilePath tiling tile.tile)
        , S.class "tile-highlight"
        , A.attribute "data-highlight" (String.fromInt tile.tile.id)
        , A.attribute "data-changing"
            (if List.member tile.tile.id changed then
                "true"

             else
                "false"
            )
        , S.fill "none"
        , S.pointerEvents "none"
        , S.strokeLinejoin "round"
        , A.attribute "vector-effect" "non-scaling-stroke"
        ]
        []


paint : (Int -> msg) -> ColoredTiling -> Html msg
paint onTile colored =
    let
        w =
            colored.tiling.width

        h =
            colored.tiling.height
    in
    Html.div
        [ A.class "mosaic-map"
        , A.attribute "data-view" (mapKind colored.tiling)
        , A.attribute "data-propagating"
            (if String.startsWith "Propagating" colored.status then
                "true"

             else
                "false"
            )
        ]
        [ Svg.svg
            [ S.viewBox ("-12 -12 " ++ String.fromFloat (w + 24) ++ " " ++ String.fromFloat (h + 24))
            , S.class "mosaic-surface"
            , A.style "aspect-ratio" (String.fromFloat (w + 24) ++ " / " ++ String.fromFloat (h + 24))
            , A.style "max-height" "760px"
            , A.attribute "aria-label" "Formula map with closed edges; opposite sides do not connect"
            , S.preserveAspectRatio "xMidYMid meet"
            ]
            (Svg.rect [ S.width (String.fromFloat w), S.height (String.fromFloat h), S.fill "#141e27" ] []
                :: List.map (viewTile onTile colored.tiling colored.changed) colored.tiles
                ++ List.map (interactionOutline colored.tiling colored.changed) colored.tiles
                ++ [ Svg.rect
                        [ S.width (String.fromFloat w)
                        , S.height (String.fromFloat h)
                        , S.fill "none"
                        , S.stroke "var(--ink)"
                        , S.strokeWidth "2.5"
                        , S.class "mosaic-frame"
                        , S.pointerEvents "none"
                        , A.attribute "vector-effect" "non-scaling-stroke"
                        ]
                        []
                   ]
            )
        , Html.p [ A.class "small-note mosaic-boundary-note" ]
            [ Html.text
                (if colored.tiling.rectangular then
                    "Original 6 × 5 tile map: every pair of tiles sharing a border must have different colors. Input and OUT clues use formula values. Opposite edges do not connect."

                 else if mapKind colored.tiling == "organic" then
                    "Cells grow and merge into a fully packed map. Equal pins share territory; neutral and extra cells fill the remaining space. Shared borders preserve the logic, and OUT is forced by the inputs. Pale tiles are unresolved while the signal travels; opposite edges do not connect."

                 else
                    "The same nodes and colors before expansion. Every contact represents a three-color constraint."
                )
            ]
        , neighborInspector colored
        ]


viewTile : (Int -> msg) -> Tiling -> List Int -> ColoredTile -> Svg msg
viewTile onTile tiling changed tile =
    let
        fill =
            if tile.colorIndex < 0 then
                "#b8c3cc"

            else
                GraphColoring.getColor tile.colorIndex

        path =
            tilePath tiling tile.tile

        labelPoint =
            tile.tile.centroid

        labeled =
            tile.label /= ""

        clickable =
            tile.variable /= Nothing

        attrs =
            if clickable then
                [ E.onClick (onTile tile.tile.id)
                , A.attribute "tabindex" "0"
                , A.attribute "role" "button"
                , keyActivate (onTile tile.tile.id)
                , S.class "mosaic-cell is-input"
                ]

            else
                [ S.class "mosaic-cell", A.attribute "tabindex" "0" ]
    in
    Svg.g
        (attrs
            ++ [ A.attribute "data-region" (String.fromInt tile.tile.id)
               , A.attribute "data-color" (String.fromInt tile.colorIndex)
               , A.attribute "data-neighbors" (String.join "," (List.map String.fromInt tile.tile.neighbors))
               , A.attribute "aria-describedby" (mapKind tiling ++ "-region-info-" ++ String.fromInt tile.tile.id)
               , A.attribute "data-changing"
                    (if List.member tile.tile.id changed then
                        "true"

                     else
                        "false"
                    )
               , A.attribute "aria-label"
                    (if labeled then
                        tile.label

                     else
                        "Mosaic region"
                    )
               ]
        )
        [ Svg.title [] [ Svg.text ("Region " ++ String.fromInt (tile.tile.id + 1) ++ " · " ++ tile.note) ]
        , Svg.path
            [ S.d path
            , S.fill fill
            , S.fillRule "evenodd"
            , S.stroke "#11171c"
            , S.strokeWidth "0.7"
            , A.attribute "vector-effect" "non-scaling-stroke"
            , S.strokeLinejoin "round"
            , S.strokeLinecap "round"
            ]
            []
        , if labeled then
            Svg.text_
                [ S.x (String.fromFloat labelPoint.x)
                , S.y (String.fromFloat labelPoint.y)
                , S.textAnchor "middle"
                , S.dominantBaseline "middle"
                , S.fontSize
                    (if mapKind tiling == "graph" then
                        "9"

                     else
                        "15"
                    )
                , S.fill "#fffdf6"
                , S.stroke "#142126"
                , S.strokeWidth "1.5"
                , S.strokeLinejoin "round"
                , A.style "paint-order" "stroke"
                , S.fontWeight "700"
                , S.letterSpacing "0.04em"
                , S.pointerEvents "none"
                ]
                [ Svg.text tile.label ]

          else
            Svg.text ""
        ]


{-| Inspect actual shared-border neighbors, without drawing a second graph
on top of the map. CSS keeps hover/focus inspection local to this map.
-}
neighborInspector : ColoredTiling -> Html msg
neighborInspector colored =
    let
        scope =
            ".mosaic-map[data-view=\"" ++ mapKind colored.tiling ++ "\"]"

        selector id pseudo =
            scope
                ++ (if pseudo == ":focus-visible" then
                        ":not(:has(.mosaic-cell:hover))"

                    else
                        ""
                   )
                ++ ":has(.mosaic-cell[data-region=\""
                ++ String.fromInt id
                ++ "\"]"
                ++ pseudo
                ++ ")"

        rules tile =
            let
                roots =
                    List.map (selector tile.tile.id) [ ":hover", ":focus-visible" ]

                highlighted =
                    List.map (\root -> root ++ " .tile-highlight[data-highlight=\"" ++ String.fromInt tile.tile.id ++ "\"]") roots
            in
            String.join "," highlighted
                ++ "{stroke:#fffdf6;stroke-width:3;opacity:1;filter:drop-shadow(0 0 1px #142126)}"
                ++ String.join "," (List.map (\root -> root ++ " .map-region-info[data-info=\"" ++ String.fromInt tile.tile.id ++ "\"]") roots)
                ++ "{display:block}"

        info tile =
            Html.div [ A.class "map-region-info", A.id (mapKind colored.tiling ++ "-region-info-" ++ String.fromInt tile.tile.id), A.attribute "data-info" (String.fromInt tile.tile.id) ]
                [ Html.strong []
                    [ Html.text
                        ("Region "
                            ++ String.fromInt (tile.tile.id + 1)
                            ++ (if tile.label == "" then
                                    ""

                                else
                                    " · " ++ tile.label
                               )
                        )
                    ]
                , Html.text (" — " ++ tile.note ++ ". Shared-border neighbors: " ++ String.join ", " (List.map (\id -> String.fromInt (id + 1)) tile.tile.neighbors) ++ ".")
                ]
    in
    Html.div [ A.class "map-neighbor-inspector" ]
        [ Html.node "style" [] [ Html.text (String.concat (List.map rules colored.tiles)) ]
        , Html.div [ A.class "map-inspector-hint" ] [ Html.text "Hover or focus a tile to trace its outline and inspect its neighbors." ]
        , Html.div [ A.class "map-region-information" ] (List.map info colored.tiles)
        ]


wavyPath : Tiling -> Tile -> String
wavyPath tiling tile =
    let
        -- Round only bends shared by two regions. Four-way junctions stay
        -- fixed; both incident regions use the same quadratic corner arc.
        rounded p =
            p.x
                > 0.001
                && p.y
                > 0.001
                && p.x
                < tiling.width
                - 0.001
                && p.y
                < tiling.height
                - 0.001
                && (tiling.tiles |> List.filter (\t -> List.any (\q -> pointKey p == pointKey q) t.polygon) |> List.length)
                == 2

        boundaries =
            tiling.tiles |> List.concatMap (\t -> List.map2 Tuple.pair t.polygon (List.drop 1 t.polygon ++ List.take 1 t.polygon))

        clearance p =
            let
                toSegment ( a, b ) =
                    let
                        dx =
                            b.x - a.x

                        dy =
                            b.y - a.y

                        t =
                            clamp 0 1 (((p.x - a.x) * dx + (p.y - a.y) * dy) / max 0.000001 (dx * dx + dy * dy))
                    in
                    distance p (mix t a b)
            in
            boundaries
                |> List.filter (\( a, b ) -> not (near p a || near p b))
                |> List.map toSegment
                |> List.minimum
                |> Maybe.withDefault 0

        points =
            tile.polygon

        corners =
            List.map3
                (\before p after ->
                    let
                        radius =
                            if rounded p then
                                0.42 * clearance p

                            else
                                0

                        cut q =
                            mix (min 0.48 (radius / max 0.000001 (distance p q))) p q
                    in
                    ( cut before, p, cut after )
                )
                (List.drop (List.length points - 1) points ++ List.take (List.length points - 1) points)
                points
                (List.drop 1 points ++ List.take 1 points)

        segment ( a, p, b ) =
            "Q " ++ px p ++ " " ++ px b

        edge ( _, _, a ) ( b, _, _ ) =
            "Q " ++ px (mix 0.5 a b) ++ " " ++ px b
    in
    case corners of
        [] ->
            ""

        first :: _ ->
            let
                ( start, _, _ ) =
                    first
            in
            "M " ++ px start ++ " " ++ String.join " " (List.map2 (\current next -> segment current ++ " " ++ edge current next) corners (List.drop 1 corners ++ [ first ])) ++ " Z"


mix : Float -> Point -> Point -> Point
mix t a b =
    { x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t }


pointKey : Point -> String
pointKey p =
    String.fromInt (round (p.x * 1000000)) ++ "," ++ String.fromInt (round (p.y * 1000000))


{-| Partition each face/edge/vertex triangle into three pieces. Face and
vertex regions meet only at a point, with edge regions between them. Thus
all edges join class 0 to class 2, unlike an ordinary Voronoi map.
-}
cellNetwork : Int -> List ( Point, List Point ) -> List Tile
cellNetwork seed cells =
    let
        add color site poly groups =
            Dict.update (String.fromInt color ++ ":" ++ pointKey site)
                (\old -> Just { site = site, color = color, parts = poly :: (old |> Maybe.map .parts |> Maybe.withDefault []) })
                groups

        triangle vertex edge face groups =
            let
                divide a b =
                    let
                        ( first, last ) =
                            if ( a.x, a.y ) < ( b.x, b.y ) then
                                ( a, b )

                            else
                                ( b, a )

                        t =
                            0.36 + 0.28 * fractal (toFloat (round (first.x * 1000)) * 7 + toFloat (round (first.y * 1000)) * 11 + toFloat (round (last.x * 1000)) * 13 + toFloat (round (last.y * 1000)) * 17 + toFloat seed * 31)
                    in
                    mix t first last

                ve =
                    divide vertex edge

                vf =
                    divide vertex face

                ef =
                    divide edge face
            in
            groups |> add 0 vertex [ vertex, ve, vf ] |> add 2 edge [ ve, edge, ef, vf ] |> add 0 face [ vf, ef, face ]

        cell ( _, poly ) groups =
            let
                face =
                    centroid poly

                edge ( a, b ) acc =
                    let
                        middle =
                            mix 0.5 a b
                    in
                    acc |> triangle a middle face |> triangle b middle face
            in
            List.foldl edge groups (List.map2 Tuple.pair poly (List.drop 1 poly ++ List.take 1 poly))

        assembled =
            List.foldl cell Dict.empty cells |> Dict.values

        indexed =
            indexTiles (List.map (\g -> ( g.site, unionPieces g.parts )) assembled)
    in
    List.map2 (\g tile -> { tile | baseColor = g.color }) assembled indexed


unionPieces : List (List Point) -> List Point
unionPieces pieces =
    let
        insert ( a, b ) edges =
            let
                ka =
                    pointKey a

                kb =
                    pointKey b

                key =
                    if ka < kb then
                        ka ++ "/" ++ kb

                    else
                        kb ++ "/" ++ ka
            in
            if Dict.member key edges then
                Dict.remove key edges

            else
                Dict.insert key ( a, b ) edges

        -- Orient all pieces consistently before canceling internal edges.
        add poly edges =
            let
                oriented =
                    if shoelace poly < 0 then
                        List.reverse poly

                    else
                        poly
            in
            List.foldl insert edges (List.map2 Tuple.pair oriented (List.drop 1 oriented ++ List.take 1 oriented))

        remaining =
            List.foldl add Dict.empty pieces |> Dict.values

        outgoing =
            List.map (\( a, b ) -> ( pointKey a, ( a, b ) )) remaining |> Dict.fromList

        walk key budget points =
            if budget <= 0 then
                List.reverse points

            else
                case Dict.get key outgoing of
                    Nothing ->
                        List.reverse points

                    Just ( a, b ) ->
                        walk (pointKey b) (budget - 1) (a :: points)
    in
    case remaining of
        [] ->
            []

        ( start, _ ) :: _ ->
            walk (pointKey start) (List.length remaining) []


px : Point -> String
px p =
    String.fromFloat p.x ++ " " ++ String.fromFloat p.y


fractal : Float -> Float
fractal x =
    let
        s =
            sin x * 43758.5453
    in
    s - toFloat (floor s)


keyActivate : msg -> Html.Attribute msg
keyActivate msg =
    E.preventDefaultOn "keydown"
        (Decode.field "key" Decode.string
            |> Decode.andThen
                (\key ->
                    if key == "Enter" || key == " " then
                        Decode.succeed ( msg, True )

                    else
                        Decode.fail "Not an activation key"
                )
        )
