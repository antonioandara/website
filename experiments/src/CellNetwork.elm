module CellNetwork exposing (Cell, Network, expand, path)

{-| Grow the embedded graph regions into territories. Existing contacts are
seeds, not inferred from a fresh Voronoi diagram. Equal fixed/input pins
coalesce. Packing contacts and extra cells are accepted only if every input
assignment stays solvable. Corner bridges and minimum-interior growth reduce
slivers. Contours are traced from the final ownership grid; the current input
colors never participate in geometry generation.
-}

import Array exposing (Array)
import ConstraintMap exposing (Map)
import Dict exposing (Dict)
import PackingConstraints
import Set exposing (Set)


type alias Point =
    { x : Float, y : Float }


type alias Cell =
    { id : Int, contours : List (List Point), center : Point, area : Float, neighbors : List Int, outline : String }


type alias Network =
    { cells : List Cell, coverage : Float, step : Float, map : Map, preserved : Bool }


type alias Grid =
    { columns : Int, rows : Int, dx : Float, dy : Float, owners : Array Int }


expand : Map -> Network
expand map =
    let
        choose steps =
            case steps of
                step :: rest ->
                    let
                        candidate =
                            prepare map (seed step map)
                    in
                    if seedValid map candidate || List.isEmpty rest then
                        candidate

                    else
                        choose rest

                [] ->
                    seed 1 map

        seeded =
            choose [ max 2 (sqrt (map.width * map.height / 35000)), 2, 1, 0.5 ]

        guarded =
            protectSeeds seeded

        ( contracted, aliases ) =
            coalesce map

        initial =
            { seeded | owners = Array.map (\id -> Dict.get id aliases |> Maybe.withDefault -1) seeded.owners }

        allowed =
            Array.fromList (List.map (\r -> Set.fromList (r.id :: r.neighbors)) contracted.regions)

        frontier =
            Array.toIndexedList initial.owners
                |> List.filter (\( i, id ) -> id >= 0 && List.any (\n -> owner initial n < 0) (adjacent False initial i))
                |> List.map Tuple.first

        speeds =
            Array.fromList
                (List.map
                    (\r ->
                        if r.constant /= Nothing then
                            0.72

                        else if r.input /= Nothing then
                            1.4

                        else if r.expression /= "" then
                            1.2

                        else
                            1
                    )
                    contracted.regions
                )

        grown =
            { initial | owners = grow allowed speeds initial frontier initial.owners }

        ( filled, extended ) =
            fillPacking contracted (Array.map (\id -> Dict.get id aliases |> Maybe.withDefault -1) guarded.owners) grown

        ( grid, packed, preserved ) =
            territories map guarded extended filled

        contacts =
            adjacency grid

        boundaries =
            Array.toIndexedList grid.owners |> List.foldl (boundary grid) Dict.empty

        centers =
            labelCenters grid

        rawConnections =
            boundaryConnections boundaries

        ( vertices, connections ) =
            collapseJunctions grid (smoothVertices grid rawConnections) rawConnections

        cell region =
            let
                loops =
                    trace (Dict.get region.id boundaries |> Maybe.withDefault Dict.empty)

                contours =
                    List.map (curveContour grid connections vertices) loops

                stats =
                    Dict.get region.id centers
            in
            { id = region.id
            , contours = contours
            , center = interiorCenter (stats |> Maybe.map .point |> Maybe.withDefault region.center) contours
            , area = abs (List.sum (List.map (List.map (\v -> Dict.get v vertices |> Maybe.withDefault (vertexPoint grid v)) >> contourArea) loops))
            , neighbors = Dict.get region.id contacts |> Maybe.withDefault Set.empty |> Set.toList
            , outline = curvedOutline grid connections vertices loops
            }

        cells =
            List.map cell packed.regions
    in
    { cells = cells
    , coverage = List.sum (List.map .area cells) / (map.width * map.height)
    , step = max grid.dx grid.dy
    , preserved = preserved
    , map = { packed | regions = List.map2 (\region grownCell -> { region | center = grownCell.center, polygon = grownCell.contours |> List.head |> Maybe.withDefault [] }) packed.regions cells }
    }


{-| Palette pins and copies of the same input have identical values for
all assignments. They may share territory without imposing a new constraint.
-}
coalesce : Map -> ( Map, Dict Int Int )
coalesce map =
    let
        key region =
            case region.constant of
                Just c ->
                    "palette:" ++ String.fromInt c

                Nothing ->
                    case region.input of
                        Just name ->
                            "input:" ++ name

                        Nothing ->
                            "node:" ++ String.fromInt region.id

        collect region ( known, regions, aliases ) =
            case Dict.get (key region) known of
                Just id ->
                    ( known, regions, Dict.insert region.id id aliases )

                Nothing ->
                    let
                        id =
                            List.length regions
                    in
                    ( Dict.insert (key region) id known, regions ++ [ { region | id = id } ], Dict.insert region.id id aliases )

        ( _, grouped, aliasMap ) =
            List.foldl collect ( Dict.empty, [], Dict.empty ) map.regions

        alias id =
            Dict.get id aliasMap |> Maybe.withDefault -1

        original id =
            map.regions |> List.filter (\r -> alias r.id == id)

        neighbors region =
            let
                constrained =
                    original region.id |> List.concatMap .neighbors |> List.map alias

                otherPalette =
                    case region.constant of
                        Nothing ->
                            []

                        Just c ->
                            grouped |> List.filter (\r -> r.constant /= Nothing && r.constant /= Just c) |> List.map .id
            in
            { region | neighbors = Set.fromList (constrained ++ otherPalette) |> Set.remove region.id |> Set.toList }
    in
    ( { map | regions = List.map neighbors grouped, output = alias map.output }, aliasMap )


{-| Grow and fuse existing territories first. Any new contact is checked
against every input row. Only a genuinely blocked crevice receives a small
flexible packing cell; it then grows using the same rule.
-}
fillPacking : Map -> Array Int -> Grid -> ( Grid, Map )
fillPacking map protected grid =
    case PackingConstraints.initial map of
        Nothing ->
            ( grid, map )

        Just initial ->
            let
                blanks =
                    Array.toIndexedList grid.owners |> List.filter (\( _, id ) -> id < 0) |> List.map Tuple.first

                palette =
                    map.regions
                        |> List.filter (\r -> r.constant /= Nothing)
                        |> List.sortBy
                            (\r ->
                                if r.constant == Just 2 then
                                    0

                                else
                                    1
                            )
                        |> List.map .id

                surrounding index owners =
                    adjacent False grid index
                        |> List.filterMap
                            (\n ->
                                Array.get n owners
                                    |> Maybe.andThen
                                        (\id ->
                                            if id < 0 then
                                                Nothing

                                            else
                                                Just id
                                        )
                            )

                choose index owners state =
                    let
                        ns =
                            surrounding index owners

                        candidates =
                            Set.fromList ns |> Set.toList |> List.sortBy (\id -> negate (List.filter ((==) id) ns |> List.length))

                        try ids model =
                            case ids of
                                [] ->
                                    ( model, Nothing )

                                id :: rest ->
                                    let
                                        ( checked, accepted ) =
                                            PackingConstraints.contact id ns model
                                    in
                                    case accepted of
                                        Just next ->
                                            ( next, Just id )

                                        Nothing ->
                                            try rest checked
                    in
                    try (candidates ++ List.filter (\id -> not (List.member id candidates)) palette) state

                sweep remaining owners state =
                    let
                        claim index ( current, graph, ( left, progress ) ) =
                            let
                                ( checked, selected ) =
                                    choose index current graph
                            in
                            case selected of
                                Nothing ->
                                    ( current, checked, ( index :: left, progress ) )

                                Just id ->
                                    ( Array.set index id current, checked, ( left, True ) )

                        ( updated, sweptGraph, ( pending, madeProgress ) ) =
                            List.foldl claim ( owners, state, ( [], False ) ) remaining
                    in
                    if madeProgress && not (List.isEmpty pending) then
                        sweep (List.reverse pending) updated sweptGraph

                    else
                        ( updated, sweptGraph, List.reverse pending )

                fill remaining owners state budget =
                    let
                        ( updated, next, pending ) =
                            sweep remaining owners state

                        pressure index =
                            List.length (Set.toList (Set.fromList (surrounding index updated)))

                        ordered =
                            List.sortBy pressure pending

                        seedSpacer candidates =
                            case candidates of
                                [] ->
                                    Nothing

                                index :: rest ->
                                    let
                                        center =
                                            { x = (toFloat (modBy grid.columns index) + 0.5) * grid.dx, y = (toFloat (index // grid.columns) + 0.5) * grid.dy }
                                    in
                                    case PackingConstraints.spacer center (surrounding index updated) next of
                                        Nothing ->
                                            seedSpacer rest

                                        Just ( graph, id ) ->
                                            Just ( index, id, graph )
                    in
                    if List.isEmpty pending || budget <= 0 then
                        ( updated, next )

                    else
                        case seedSpacer ordered of
                            Nothing ->
                                ( updated, next )

                            Just ( index, id, graph ) ->
                                fill (List.filter ((/=) index) pending) (Array.set index id updated) graph (budget - 1)

                ( packedOwners, packed ) =
                    fill blanks grid.owners initial 256

                donorSafe index owners =
                    let
                        donor =
                            Array.get index owners |> Maybe.withDefault -1

                        ring =
                            adjacent True grid index |> List.filter (\n -> Array.get n owners == Just donor)

                        required =
                            adjacent False grid index |> List.filter (\n -> Array.get n owners == Just donor)

                        visit front reached =
                            case front of
                                [] ->
                                    reached

                                n :: rest ->
                                    let
                                        next =
                                            adjacent False grid n |> List.filter (\k -> List.member k ring && not (Set.member k reached))
                                    in
                                    visit (rest ++ next) (List.foldl Set.insert reached next)
                    in
                    case required of
                        [] ->
                            True

                        first :: rest ->
                            List.all (\n -> Set.member n (visit [ first ] (Set.singleton first))) rest

                -- A diagonal meeting is a zero-width contact on a square
                -- raster. Widen compatible palette/input junctions into a
                -- real neck instead of splitting the wire into tiny islands.
                joinCorners current graph =
                    let
                        widen index ( owners, state, changed ) =
                            let
                                id =
                                    Array.get index owners |> Maybe.withDefault -1

                                info =
                                    List.drop id state.map.regions |> List.head

                                mergeable =
                                    info |> Maybe.map (\r -> r.constant /= Nothing || r.input /= Nothing) |> Maybe.withDefault False

                                diagonals =
                                    adjacent True grid index |> List.filter (\n -> modBy grid.columns n > modBy grid.columns index && n // grid.columns /= index // grid.columns && Array.get n owners == Just id)

                                widenBetween other ( latest, model, progress ) =
                                    let
                                        candidates =
                                            adjacent False grid index |> List.filter (\n -> List.member n (adjacent False grid other) && Array.get n latest /= Just id && Array.get n protected == Just -1 && donorSafe n latest)

                                        try links attempted =
                                            case links of
                                                [] ->
                                                    ( latest, attempted, progress )

                                                pixel :: rest ->
                                                    let
                                                        ( checked, accepted ) =
                                                            PackingConstraints.contact id (surrounding pixel latest) attempted
                                                    in
                                                    case accepted of
                                                        Nothing ->
                                                            try rest checked

                                                        Just next ->
                                                            ( Array.set pixel id latest, next, True )
                                    in
                                    try candidates model
                            in
                            if mergeable then
                                List.foldl widenBetween ( owners, state, changed ) diagonals

                            else
                                ( owners, state, changed )
                    in
                    List.foldl (\index state -> widen index state) ( current, graph, False ) (List.range 0 (Array.length current - 1))

                round pass current graph =
                    let
                        ( updated, next, changed ) =
                            joinCorners current graph
                    in
                    if pass <= 0 || not changed then
                        ( updated, next )

                    else
                        round (pass - 1) updated next

                ( joinedOwners, joinedGraph ) =
                    round 5 packedOwners packed

                -- Give thin physical components room to grow. Fixed palette
                -- copies are assessed separately: a large blue reservoir must
                -- not conceal a second blue component with no usable interior.
                thicken pass current graph =
                    let
                        ( physical, _, _ ) =
                            territories map { grid | owners = protected } graph.map { grid | owners = current }

                        centers =
                            labelCenters physical

                        weak =
                            Dict.filter (\_ center -> center.depth < 5) centers

                        targets =
                            Array.toIndexedList current
                                |> List.filter (\( index, _ ) -> Dict.member (owner physical index) weak)

                        extend ( index, id ) ( latest, model, changed ) =
                            let
                                candidates =
                                    adjacent False grid index
                                        |> List.filter (\pixel -> Array.get pixel latest /= Just id && Array.get pixel protected == Just -1 && donorSafe pixel latest)

                                take pixel ( pixels, state, progress ) =
                                    let
                                        ( checked, accepted ) =
                                            PackingConstraints.contact id (surrounding pixel pixels) state
                                    in
                                    case accepted of
                                        Nothing ->
                                            ( pixels, checked, progress )

                                        Just nextGraph ->
                                            ( Array.set pixel id pixels, nextGraph, True )
                            in
                            List.foldl take ( latest, model, changed ) candidates

                        ( expanded, expandedGraph, grew ) =
                            List.foldl extend ( current, graph, False ) targets
                    in
                    if pass <= 0 || not grew || Dict.isEmpty weak then
                        ( expanded, expandedGraph )

                    else
                        thicken (pass - 1) expanded expandedGraph

                ( thickOwners, thickGraph ) =
                    thicken 5 joinedOwners joinedGraph

                -- Resolve a blocked junction as a small patch, rather than
                -- forcing one pixel to touch all three palette pins at once.
                closeJunction index ( current, graph ) =
                    if Array.get index current /= Just -1 then
                        ( current, graph )

                    else
                        let
                            cx =
                                modBy grid.columns index

                            cy =
                                index // grid.columns

                            patches =
                                List.concatMap
                                    (\radius ->
                                        List.concatMap
                                            (\ox ->
                                                List.map
                                                    (\oy ->
                                                        List.concatMap
                                                            (\y -> List.map (\x -> y * grid.columns + x) (List.range (max 0 (cx - ox)) (min (grid.columns - 1) (cx - ox + radius))))
                                                            (List.range (max 0 (cy - oy)) (min (grid.rows - 1) (cy - oy + radius)))
                                                    )
                                                    (List.range 0 radius)
                                            )
                                            (List.range 0 radius)
                                    )
                                    [ 1, 2, 3, 5 ]

                            attempt remaining =
                                case remaining of
                                    [] ->
                                        ( current, graph )

                                    pixels :: rest ->
                                        let
                                            ids =
                                                pixels |> List.concatMap (\pixel -> surrounding pixel current) |> Set.fromList |> Set.toList

                                            tryId candidates =
                                                case candidates of
                                                    [] ->
                                                        attempt rest

                                                    id :: others ->
                                                        let
                                                            movable =
                                                                List.all (\pixel -> Array.get pixel protected == Just -1 || Array.get pixel current == Just id) pixels

                                                            patched =
                                                                List.foldl
                                                                    (\pixel acc ->
                                                                        if Array.get pixel acc == Just id || Array.get pixel acc == Just -1 || donorSafe pixel acc then
                                                                            Array.set pixel id acc

                                                                        else
                                                                            acc
                                                                    )
                                                                    current
                                                                    pixels

                                                            borders =
                                                                pixels |> List.concatMap (\pixel -> surrounding pixel patched) |> Set.fromList |> Set.remove id |> Set.toList
                                                        in
                                                        if not movable || List.any (\pixel -> Array.get pixel patched /= Just id) pixels then
                                                            tryId others

                                                        else
                                                            case PackingConstraints.connect id borders graph of
                                                                Nothing ->
                                                                    tryId others

                                                                Just accepted ->
                                                                    ( patched, accepted )
                                        in
                                        tryId ids
                        in
                        attempt patches

                ( closedOwners, closedGraph ) =
                    List.foldl closeJunction ( thickOwners, thickGraph ) (List.range 0 (Array.length thickOwners - 1))

                ( finalOwners, finalGraph ) =
                    round 3 closedOwners closedGraph
            in
            ( { grid | owners = finalOwners }, finalGraph.map )


{-| Split any still-disconnected copies into solid physical cells. Actual
shared borders become the final constraints, and every original gadget edge
must survive (or join pins that are known equal).
-}
territories : Map -> Grid -> Map -> Grid -> ( Grid, Map, Bool )
territories source seeded contracted grown =
    let
        flood id label front back labels =
            case front of
                [] ->
                    if List.isEmpty back then
                        labels

                    else
                        flood id label (List.reverse back) [] labels

                index :: rest ->
                    let
                        next =
                            adjacent False grown index |> List.filter (\n -> owner grown n == id && Array.get n labels == Just -1)

                        marked =
                            List.foldl (\n -> Array.set n label) labels next
                    in
                    flood id label rest (List.foldl (::) back next) marked

        collect ( index, id ) ( labels, regions ) =
            if id < 0 || Array.get index labels /= Just -1 then
                ( labels, regions )

            else
                let
                    label =
                        List.length regions

                    info =
                        List.drop id contracted.regions |> List.head |> Maybe.withDefault { id = id, polygon = [], center = { x = 0, y = 0 }, neighbors = [], input = Nothing, constant = Nothing, expression = "" }

                    marked =
                        flood id label [ index ] [] (Array.set index label labels)
                in
                ( marked, regions ++ [ { info | id = label } ] )

        ( owners, packedRegions ) =
            List.foldl collect ( Array.repeat (Array.length grown.owners) -1, [] ) (Array.toIndexedList grown.owners)

        grid =
            { grown | owners = owners }

        contacts =
            adjacency grid

        originalCells =
            Array.toIndexedList seeded.owners
                |> List.foldl
                    (\( index, id ) ids ->
                        if id < 0 then
                            ids

                        else
                            Dict.insert id (owner grid index) ids
                    )
                    Dict.empty

        cell id =
            Dict.get id originalCells |> Maybe.withDefault -1

        preserved =
            source.regions |> List.all (\r -> r.neighbors |> List.all (\n -> cell r.id == cell n || (Dict.get (cell r.id) contacts |> Maybe.withDefault Set.empty |> Set.member (cell n))))

        final =
            { source | output = cell source.output, regions = List.map (\r -> { r | neighbors = Dict.get r.id contacts |> Maybe.withDefault Set.empty |> Set.toList }) packedRegions }
    in
    ( grid, final, preserved )


{-| Preserve one seed per original region and one actual contact per edge.
The remaining seed area can relax rather than pinning every pixel of the
initial circuit drawing in place.
-}
protectSeeds : Grid -> Grid
protectSeeds grid =
    let
        mark ( index, id ) ( anchors, edges, pixels ) =
            if id < 0 then
                ( anchors, edges, pixels )

            else
                let
                    withAnchor =
                        if Set.member id anchors then
                            pixels

                        else
                            Array.set index id pixels

                    keepContact n ( known, kept ) =
                        let
                            other =
                                owner grid n

                            key =
                                ( min id other, max id other )
                        in
                        if other < 0 || other == id || Set.member key known then
                            ( known, kept )

                        else
                            ( Set.insert key known, Array.set n other (Array.set index id kept) )

                    ( nextEdges, nextPixels ) =
                        List.foldl keepContact ( edges, withAnchor ) (adjacent False grid index)
                in
                ( Set.insert id anchors, nextEdges, nextPixels )

        ( _, _, protected ) =
            List.foldl mark ( Set.empty, Set.empty, Array.repeat (Array.length grid.owners) -1 ) (Array.toIndexedList grid.owners)
    in
    { grid | owners = protected }


seed : Float -> Map -> Grid
seed step map =
    let
        columns =
            ceiling (map.width / step)

        rows =
            ceiling (map.height / step)

        dx =
            map.width / toFloat columns

        dy =
            map.height / toFloat rows

        region r owners =
            let
                xs =
                    List.map .x r.polygon

                ys =
                    List.map .y r.polygon

                low values =
                    List.minimum values |> Maybe.withDefault 0

                high values =
                    List.maximum values |> Maybe.withDefault 0

                x0 =
                    max 0 (floor (low xs / dx))

                x1 =
                    min (columns - 1) (floor (high xs / dx))

                y0 =
                    max 0 (floor (low ys / dy))

                y1 =
                    min (rows - 1) (floor (high ys / dy))

                row y acc =
                    List.foldl
                        (\x current ->
                            if contains { x = (toFloat x + 0.5) * dx, y = (toFloat y + 0.5) * dy } r.polygon then
                                Array.set (y * columns + x) r.id current

                            else
                                current
                        )
                        acc
                        (List.range x0 x1)
            in
            List.foldl row owners (List.range y0 y1)
    in
    { columns = columns, rows = rows, dx = dx, dy = dy, owners = List.foldl region (Array.repeat (columns * rows) -1) map.regions }


{-| Thin graph corridors can be narrower than a grid pixel. Repair their
rasterization before growing: reserve every node, remove accidental contacts,
and reconnect split seeds / missing edges through compatible empty pixels.
This avoids sampling the entire map at subpixel resolution for a thin wire.
-}
prepare : Map -> Grid -> Grid
prepare map initial =
    let
        permitted id =
            List.drop id map.regions |> List.head |> Maybe.map (\r -> Set.fromList (r.id :: r.neighbors)) |> Maybe.withDefault Set.empty

        reserve r owners =
            let
                x =
                    clamp 0 (initial.columns - 1) (floor (r.center.x / initial.dx))

                y =
                    clamp 0 (initial.rows - 1) (floor (r.center.y / initial.dy))
            in
            Array.set (y * initial.columns + x) r.id owners

        reserved =
            { initial | owners = List.foldl reserve initial.owners map.regions }

        trim ( i, id ) owners =
            if id < 0 then
                owners

            else
                let
                    allowed =
                        permitted id
                in
                if
                    List.any
                        (\n ->
                            let
                                other =
                                    Array.get n owners |> Maybe.withDefault -1
                            in
                            other >= 0 && not (Set.member other allowed)
                        )
                        (adjacent False initial i)
                then
                    Array.set i -1 owners

                else
                    owners

        clean =
            { reserved | owners = List.foldl trim reserved.owners (Array.toIndexedList reserved.owners) }

        component grid id front back visited =
            case front of
                [] ->
                    if List.isEmpty back then
                        visited

                    else
                        component grid id (List.reverse back) [] visited

                i :: rest ->
                    let
                        next =
                            adjacent False grid i |> List.filter (\n -> owner grid n == id && not (Set.member n visited))
                    in
                    component grid id rest (List.foldl (::) back next) (List.foldl Set.insert visited next)

        groups grid =
            Array.toIndexedList grid.owners
                |> List.foldl
                    (\( i, id ) acc ->
                        if id < 0 then
                            acc

                        else
                            Dict.update id (\old -> Just (i :: Maybe.withDefault [] old)) acc
                    )
                    Dict.empty

        originalPixels =
            groups clean

        connectRegion region grid =
            case Dict.get region.id originalPixels |> Maybe.withDefault [] of
                [] ->
                    grid

                first :: _ ->
                    let
                        again current budget =
                            let
                                connected =
                                    component current region.id [ first ] [] (Set.singleton first)
                            in
                            if budget <= 0 then
                                current

                            else if List.all (\i -> Set.member i connected) (Dict.get region.id originalPixels |> Maybe.withDefault []) then
                                current

                            else
                                case bridge (permitted region.id) current region.id (Set.toList connected) (\n -> owner current n == region.id && not (Set.member n connected)) of
                                    Nothing ->
                                        current

                                    Just owners ->
                                        again { current | owners = owners } (budget - 1)
                    in
                    again grid 100

        joinedSeeds =
            List.foldl connectRegion clean map.regions

        joinedPixels =
            groups joinedSeeds

        contacts =
            adjacency joinedSeeds

        join region grid =
            List.foldl
                (\other current ->
                    if other <= region.id then
                        current

                    else
                        let
                            starts =
                                Dict.get region.id joinedPixels |> Maybe.withDefault []
                        in
                        if Dict.get region.id contacts |> Maybe.withDefault Set.empty |> Set.member other then
                            current

                        else
                            case bridge (permitted region.id) current region.id starts (\n -> owner current n == other) of
                                Nothing ->
                                    current

                                Just owners ->
                                    { current | owners = owners }
                )
                grid
                region.neighbors
    in
    List.foldl join joinedSeeds map.regions


bridge : Set Int -> Grid -> Int -> List Int -> (Int -> Bool) -> Maybe (Array Int)
bridge allowed grid id starts target =
    let
        fill current parents owners =
            if current < 0 then
                owners

            else
                fill (Dict.get current parents |> Maybe.withDefault -1) parents (Array.set current id owners)

        loop front back parents =
            case front of
                [] ->
                    if List.isEmpty back then
                        Nothing

                    else
                        loop (List.reverse back) [] parents

                i :: rest ->
                    let
                        neighbors =
                            adjacent False grid i
                    in
                    if List.any target neighbors then
                        Just (fill i parents grid.owners)

                    else
                        let
                            next =
                                neighbors
                                    |> List.filter
                                        (\n ->
                                            (owner grid n < 0 || owner grid n == id)
                                                && not (Dict.member n parents)
                                                && List.all (\k -> owner grid k < 0 || Set.member (owner grid k) allowed) (adjacent False grid n)
                                        )

                            updated =
                                List.foldl (\n acc -> Dict.insert n i acc) parents next
                        in
                        loop rest (List.foldl (::) back next) updated
    in
    loop starts [] (Dict.fromList (List.map (\i -> ( i, -1 )) starts))


contains : Point -> List Point -> Bool
contains p polygon =
    List.map2 Tuple.pair polygon (List.drop 1 polygon ++ List.take 1 polygon)
        |> List.foldl
            (\( a, b ) within ->
                if (a.y > p.y) /= (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x then
                    not within

                else
                    within
            )
            False


owner : Grid -> Int -> Int
owner grid index =
    Array.get index grid.owners |> Maybe.withDefault -1


adjacent : Bool -> Grid -> Int -> List Int
adjacent diagonal grid index =
    let
        x =
            modBy grid.columns index

        y =
            index // grid.columns

        offsets =
            if diagonal then
                [ ( 0, -1 ), ( 1, 0 ), ( 0, 1 ), ( -1, 0 ), ( 1, -1 ), ( 1, 1 ), ( -1, 1 ), ( -1, -1 ) ]

            else
                [ ( 0, -1 ), ( 1, 0 ), ( 0, 1 ), ( -1, 0 ) ]
    in
    List.filterMap
        (\( dx, dy ) ->
            if x + dx >= 0 && x + dx < grid.columns && y + dy >= 0 && y + dy < grid.rows then
                Just ((y + dy) * grid.columns + x + dx)

            else
                Nothing
        )
        offsets


adjacency : Grid -> Dict Int (Set Int)
adjacency grid =
    Array.toIndexedList grid.owners
        |> List.foldl
            (\( i, id ) result ->
                if id < 0 then
                    result

                else
                    List.foldl
                        (\n acc ->
                            let
                                other =
                                    owner grid n
                            in
                            if other < 0 || other == id then
                                acc

                            else
                                Dict.update id (\old -> Just (Set.insert other (Maybe.withDefault Set.empty old))) acc
                        )
                        result
                        (adjacent False grid i)
            )
            Dict.empty


seedValid : Map -> Grid -> Bool
seedValid map grid =
    let
        contacts =
            adjacency grid

        pixelsByRegion =
            Array.toIndexedList grid.owners
                |> List.foldl
                    (\( i, id ) groups ->
                        if id < 0 then
                            groups

                        else
                            Dict.update id (\old -> Just (i :: Maybe.withDefault [] old)) groups
                    )
                    Dict.empty

        -- Every source region must stay connected after discretization.
        flood id front back seen =
            case front of
                [] ->
                    if List.isEmpty back then
                        seen

                    else
                        flood id (List.reverse back) [] seen

                i :: rest ->
                    let
                        next =
                            adjacent False grid i |> List.filter (\n -> owner grid n == id && not (Set.member n seen))
                    in
                    flood id rest (List.foldl (::) back next) (List.foldl Set.insert seen next)

        valid r =
            let
                pixels =
                    Dict.get r.id pixelsByRegion |> Maybe.withDefault []
            in
            Dict.get r.id contacts
                |> Maybe.withDefault Set.empty
                |> (==) (Set.fromList r.neighbors)
                |> (\matching ->
                        matching
                            && (case pixels of
                                    [] ->
                                        False

                                    first :: _ ->
                                        Set.size (flood r.id [ first ] [] (Set.singleton first)) == List.length pixels
                               )
                   )
    in
    List.all valid map.regions


{-| Advance the earliest arriving front first. Axial and diagonal travel
costs approximate Euclidean distance, rather than the square rings of a FIFO
flood. A cell may claim only pixels joined to its territory and compatible
with its constraint neighbors.
-}
grow : Array (Set Int) -> Array Float -> Grid -> List Int -> Array Int -> Array Int
grow allowed speeds grid frontier initialOwners =
    let
        enqueue cost id index queue =
            Dict.update cost (\old -> Just (( index, id ) :: Maybe.withDefault [] old)) queue

        propose cost id index owners queue =
            List.foldl
                (\n pending ->
                    if Array.get n owners /= Just -1 then
                        pending

                    else
                        let
                            dx =
                                toFloat (modBy grid.columns n - modBy grid.columns index) * grid.dx

                            dy =
                                toFloat (n // grid.columns - index // grid.columns) * grid.dy

                            travel =
                                round (1000 * sqrt (dx * dx + dy * dy) / (Array.get id speeds |> Maybe.withDefault 1))
                        in
                        enqueue (cost + travel) id n pending
                )
                queue
                (adjacent True grid index)

        queue0 =
            List.foldl (\index queue -> propose 0 (owner grid index) index initialOwners queue) Dict.empty frontier

        advance queue owners =
            case Dict.toList queue |> List.head of
                Nothing ->
                    owners

                Just ( cost, events ) ->
                    case events of
                        [] ->
                            advance (Dict.remove cost queue) owners

                        ( index, id ) :: rest ->
                            let
                                remaining =
                                    if List.isEmpty rest then
                                        Dict.remove cost queue

                                    else
                                        Dict.insert cost rest queue

                                value n =
                                    Array.get n owners |> Maybe.withDefault -1

                                permitted =
                                    Array.get id allowed |> Maybe.withDefault Set.empty

                                canGrow =
                                    value index
                                        < 0
                                        && List.any (\n -> value n == id) (adjacent False grid index)
                                        && List.all (\n -> value n < 0 || Set.member (value n) permitted) (adjacent True grid index)
                            in
                            if canGrow then
                                let
                                    updated =
                                        Array.set index id owners
                                in
                                advance (propose cost id index updated remaining) updated

                            else
                                advance remaining owners
    in
    advance queue0 initialOwners



-- Boundary half-edges have the owned pixel on their right. At a corner
-- with several outgoing edges, take the right turn to keep contours separate.


boundary : Grid -> ( Int, Int ) -> Dict Int (Dict Int (List Int)) -> Dict Int (Dict Int (List Int))
boundary grid ( index, id ) all =
    if id < 0 then
        all

    else
        let
            x =
                modBy grid.columns index

            y =
                index // grid.columns

            vertex a b =
                b * (grid.columns + 1) + a

            side isBoundary a b acc =
                if isBoundary then
                    Dict.update a (\old -> Just (b :: Maybe.withDefault [] old)) acc

                else
                    acc

            add current =
                current
                    |> side (y == 0 || owner grid (index - grid.columns) /= id) (vertex x y) (vertex (x + 1) y)
                    |> side (x == grid.columns - 1 || owner grid (index + 1) /= id) (vertex (x + 1) y) (vertex (x + 1) (y + 1))
                    |> side (y == grid.rows - 1 || owner grid (index + grid.columns) /= id) (vertex (x + 1) (y + 1)) (vertex x (y + 1))
                    |> side (x == 0 || owner grid (index - 1) /= id) (vertex x (y + 1)) (vertex x y)
        in
        Dict.update id (Maybe.withDefault Dict.empty >> add >> Just) all


trace : Dict Int (List Int) -> List (List Int)
trace edges =
    let
        walk start previous current remaining points =
            if current == start && not (List.isEmpty points) then
                ( List.reverse points, remaining )

            else
                case Dict.get current remaining of
                    Nothing ->
                        ( List.reverse points, remaining )

                    Just outgoing ->
                        let
                            direction a b =
                                if b == a + 1 then
                                    0

                                else if b > a then
                                    1

                                else if b == a - 1 then
                                    2

                                else
                                    3

                            incoming =
                                direction previous current

                            priority destination =
                                case modBy 4 (direction current destination - incoming) of
                                    1 ->
                                        0

                                    0 ->
                                        1

                                    3 ->
                                        2

                                    _ ->
                                        3

                            next =
                                List.sortBy priority outgoing |> List.head |> Maybe.withDefault start

                            rest =
                                List.filter ((/=) next) outgoing

                            updated =
                                if List.isEmpty rest then
                                    Dict.remove current remaining

                                else
                                    Dict.insert current rest remaining
                        in
                        walk start current next updated (current :: points)
    in
    case Dict.toList edges |> List.head of
        Nothing ->
            []

        Just ( start, _ ) ->
            let
                ( contour, remaining ) =
                    walk start (start - 1) start edges []
            in
            contour :: trace remaining


boundaryConnections : Dict Int (Dict Int (List Int)) -> Dict Int (Set Int)
boundaryConnections boundaries =
    let
        add a b =
            Dict.update a (\old -> Just (Set.insert b (Maybe.withDefault Set.empty old)))
    in
    Dict.foldl (\_ edges acc -> Dict.foldl (\a ends current -> List.foldl (\b next -> next |> add a b |> add b a) current ends) acc edges) Dict.empty boundaries


{-| Relax the entire border network together. Shared borders use one set of
coordinates; junctions and the outer frame remain anchored.
-}
smoothVertices : Grid -> Dict Int (Set Int) -> Dict Int Point
smoothVertices grid connections =
    let
        originals =
            Dict.map (\key _ -> vertexPoint grid key) connections

        relax positions =
            let
                smooth vertex neighbors =
                    let
                        origin =
                            vertexPoint grid vertex

                        p =
                            Dict.get vertex positions |> Maybe.withDefault origin

                        x =
                            modBy (grid.columns + 1) vertex

                        y =
                            vertex // (grid.columns + 1)
                    in
                    case Set.toList neighbors of
                        [ a, b ] ->
                            if x == 0 || x == grid.columns || y == 0 || y == grid.rows then
                                origin

                            else
                                let
                                    pa =
                                        Dict.get a positions |> Maybe.withDefault (vertexPoint grid a)

                                    pb =
                                        Dict.get b positions |> Maybe.withDefault (vertexPoint grid b)
                                in
                                { x = clamp (origin.x - 2 * grid.dx) (origin.x + 2 * grid.dx) (p.x * 0.5 + (pa.x + pb.x) * 0.25)
                                , y = clamp (origin.y - 2 * grid.dy) (origin.y + 2 * grid.dy) (p.y * 0.5 + (pa.y + pb.y) * 0.25)
                                }

                        _ ->
                            origin
            in
            Dict.map smooth connections
    in
    List.foldl (\_ positions -> relax positions) originals (List.range 1 24)


simplifyPoints : List Point -> List Point
simplifyPoints vertices =
    List.map3
        (\before current after ->
            if abs ((current.x - before.x) * (after.y - current.y) - (current.y - before.y) * (after.x - current.x)) < 0.0000001 then
                Nothing

            else
                Just current
        )
        (List.drop (List.length vertices - 1) vertices ++ List.take (List.length vertices - 1) vertices)
        vertices
        (List.drop 1 vertices ++ List.take 1 vertices)
        |> List.filterMap identity


vertexPoint : Grid -> Int -> Point
vertexPoint grid key =
    { x = toFloat (modBy (grid.columns + 1) key) * grid.dx, y = toFloat (key // (grid.columns + 1)) * grid.dy }


labelCenters : Grid -> Dict Int { point : Point, depth : Int }
labelCenters grid =
    let
        border i id =
            List.length (adjacent False grid i) < 4 || List.any (\n -> owner grid n /= id) (adjacent False grid i)

        starts =
            Array.toIndexedList grid.owners |> List.filter (\( i, id ) -> id >= 0 && border i id) |> List.map Tuple.first

        depths =
            List.foldl (\i acc -> Array.set i 1 acc) (Array.repeat (Array.length grid.owners) 0) starts

        point i =
            { x = (toFloat (modBy grid.columns i) + 0.5) * grid.dx, y = (toFloat (i // grid.columns) + 0.5) * grid.dy }

        loop front back distances centers =
            case front of
                [] ->
                    if List.isEmpty back then
                        centers

                    else
                        loop (List.reverse back) [] distances centers

                i :: rest ->
                    let
                        id =
                            owner grid i

                        depth =
                            Array.get i distances |> Maybe.withDefault 1

                        next =
                            adjacent False grid i |> List.filter (\n -> owner grid n == id && Array.get n distances == Just 0)

                        updated =
                            List.foldl (\n acc -> Array.set n (depth + 1) acc) distances next

                        best =
                            Dict.update id
                                (\old ->
                                    if (Maybe.map .depth old |> Maybe.withDefault 0) < depth then
                                        Just { point = point i, depth = depth }

                                    else
                                        old
                                )
                                centers
                    in
                    loop rest (List.foldl (::) back next) updated best
    in
    loop starts [] depths Dict.empty


{-| Round each shared degree-two border vertex with the same quadratic
curve in either direction. Junctions and frame corners stay anchored, so
adjacent cells share precisely the same curve and separators stay open.
-}
curvedOutline : Grid -> Dict Int (Set Int) -> Dict Int Point -> List (List Int) -> String
curvedOutline grid connections positions loops =
    let
        point p =
            String.fromFloat p.x ++ " " ++ String.fromFloat p.y

        segment before current after =
            let
                piece =
                    curveCorner grid connections positions before current after
            in
            { entry = piece.entry
            , exit = piece.exit
            , command =
                case piece.control of
                    Just p ->
                        " Q " ++ point p ++ " " ++ point piece.exit

                    Nothing ->
                        ""
            }

        contour vertices =
            case vertices of
                [] ->
                    ""

                _ ->
                    let
                        pieces =
                            List.map3 segment
                                (List.drop (List.length vertices - 1) vertices ++ List.take (List.length vertices - 1) vertices)
                                vertices
                                (List.drop 1 vertices ++ List.take 1 vertices)
                    in
                    case List.head pieces of
                        Nothing ->
                            ""

                        Just first ->
                            "M "
                                ++ point first.entry
                                ++ first.command
                                ++ String.concat (List.map (\piece -> " L " ++ point piece.entry ++ piece.command) (List.drop 1 pieces))
                                ++ " Z"
    in
    String.join " " (List.map contour loops)


curveCorner grid connections positions before current after =
    let
        position v =
            Dict.get v positions |> Maybe.withDefault (vertexPoint grid v)

        p =
            position current

        a =
            position before

        b =
            position after

        midpoint u v =
            { x = (u.x + v.x) / 2, y = (u.y + v.y) / 2 }

        rounded =
            (Dict.get current connections |> Maybe.map Set.size)
                == Just 2
                && p.x
                > 0.000001
                && p.y
                > 0.000001
                && p.x
                < toFloat grid.columns
                * grid.dx
                - 0.000001
                && p.y
                < toFloat grid.rows
                * grid.dy
                - 0.000001
                && abs ((p.x - a.x) * (b.y - p.y) - (p.y - a.y) * (b.x - p.x))
                > 0.000001
    in
    if rounded then
        { entry = midpoint a p, exit = midpoint p b, control = Just p }

    else
        { entry = p, exit = p, control = Nothing }


curveContour grid connections positions loop =
    let
        sample piece =
            case piece.control of
                Nothing ->
                    [ piece.entry ]

                Just p ->
                    List.range 0 8
                        |> List.map
                            (\i ->
                                let
                                    t =
                                        toFloat i / 8

                                    u =
                                        1 - t
                                in
                                { x = u * u * piece.entry.x + 2 * u * t * p.x + t * t * piece.exit.x
                                , y = u * u * piece.entry.y + 2 * u * t * p.y + t * t * piece.exit.y
                                }
                            )
    in
    List.map3 (curveCorner grid connections positions)
        (List.drop (List.length loop - 1) loop ++ List.take (List.length loop - 1) loop)
        loop
        (List.drop 1 loop ++ List.take 1 loop)
        |> List.concatMap sample


interiorCenter preferred contours =
    let
        inside p =
            modBy 2 (List.filter (contains p) contours |> List.length) == 1

        points =
            List.concat contours

        xs =
            List.map .x points

        ys =
            List.map .y points

        low values =
            List.minimum values |> Maybe.withDefault 0

        high values =
            List.maximum values |> Maybe.withDefault 0

        edges =
            List.concatMap (\polygon -> List.map2 Tuple.pair polygon (List.drop 1 polygon ++ List.take 1 polygon)) contours

        distance p ( a, b ) =
            let
                dx =
                    b.x - a.x

                dy =
                    b.y - a.y

                t =
                    if dx * dx + dy * dy == 0 then
                        0

                    else
                        clamp 0 1 (((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy))
            in
            (p.x - a.x - t * dx) ^ 2 + (p.y - a.y - t * dy) ^ 2

        clearance p =
            List.map (distance p) edges |> List.minimum |> Maybe.withDefault 0

        candidates =
            List.concatMap
                (\y ->
                    List.map
                        (\x -> { x = low xs + (toFloat x + 0.5) / 21 * (high xs - low xs), y = low ys + (toFloat y + 0.5) / 21 * (high ys - low ys) })
                        (List.range 0 20)
                )
                (List.range 0 20)
    in
    if inside preferred then
        preferred

    else
        candidates |> List.filter inside |> List.sortBy (clearance >> negate) |> List.head |> Maybe.withDefault preferred


{-| Tiny blocked raster junctions represent a meeting point, not a fourth
face. Collapse their boundary vertices together so the surrounding cells
meet exactly, without introducing an edge between unrelated regions.
-}
collapseJunctions : Grid -> Dict Int Point -> Dict Int (Set Int) -> ( Dict Int Point, Dict Int (Set Int) )
collapseJunctions grid positions connections =
    let
        flood front visited =
            case front of
                [] ->
                    visited

                index :: rest ->
                    let
                        next =
                            adjacent False grid index |> List.filter (\n -> owner grid n < 0 && not (Set.member n visited))
                    in
                    flood (next ++ rest) (List.foldl Set.insert visited next)

        collapse index ( seen, vertices, links ) =
            if owner grid index >= 0 || Set.member index seen then
                ( seen, vertices, links )

            else
                let
                    pixels =
                        flood [ index ] (Set.singleton index)

                    corners =
                        Set.toList pixels
                            |> List.concatMap
                                (\pixel ->
                                    let
                                        x =
                                            modBy grid.columns pixel

                                        y =
                                            pixel // grid.columns

                                        v a b =
                                            b * (grid.columns + 1) + a
                                    in
                                    [ v x y, v (x + 1) y, v x (y + 1), v (x + 1) (y + 1) ]
                                )
                            |> Set.fromList
                            |> Set.toList

                    points =
                        List.map (vertexPoint grid) corners

                    xs =
                        List.map .x points

                    ys =
                        List.map .y points

                    mean values =
                        List.sum values / toFloat (List.length values)

                    anchored values edge =
                        if List.member 0 values then
                            0

                        else if List.member edge values then
                            edge

                        else
                            mean values

                    point =
                        { x = anchored xs (toFloat grid.columns * grid.dx), y = anchored ys (toFloat grid.rows * grid.dy) }

                    small =
                        Set.size pixels <= 16
                in
                if small then
                    ( Set.union seen pixels
                    , List.foldl (\v -> Dict.insert v point) vertices corners
                    , List.foldl (\v -> Dict.insert v (Set.fromList [ -1, -2, -3 ])) links corners
                    )

                else
                    ( Set.union seen pixels, vertices, links )

        ( _, result, network ) =
            List.foldl collapse ( Set.empty, positions, connections ) (List.range 0 (Array.length grid.owners - 1))
    in
    ( result, network )


contourArea : List Point -> Float
contourArea points =
    List.map2 (\a b -> a.x * b.y - b.x * a.y) points (List.drop 1 points ++ List.take 1 points) |> List.sum |> (\value -> value / 2)


path : Cell -> String
path cell =
    cell.outline
