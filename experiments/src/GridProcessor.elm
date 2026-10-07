module GridProcessor exposing
    ( Grid
    , RegionResult
    , Segmenter
    , SegmenterName
    , boundary
    , unassigned
    , createGrid
    , getCell
    , setCell
    , floodFillRegions
    , floodFillRegions4
    , floodFillRegions8
    , unionFindRegions
    , regionGrowRegions
    , morphCloseRegions
    , segmenters
    , segmenterNames
    , buildRegionAdjacency
    , computeRegionCentroids
    )

{-| Pixel grid processing for map region detection — multi-algorithm.

Port of `src/utils/gridProcessor.js` — Phase 5 of the progressive Elm port.

## Grid Representation

The grid is a flat `Array Int` where:
- `boundary` (65535) = boundary/line pixel
- `0..65534` = region ID for that pixel
- `unassigned` (65534) = initial fill value for unprocessed cells

Grid dimensions are typically 800×500, but for educational use the algorithms
work on any size. Each algorithm is a pure function: Grid → RegionResult.

## Algorithms

1. `floodFill4` — 4-directional DFS flood fill (fast, may leak diagonally)
2. `floodFill8` — 8-directional DFS flood fill (stops diagonal leaks)
3. `unionFind` — two-pass connected-component labeling (8-way, disjoint-set)
4. `regionGrow` — BFS from each seed, one region at a time (8-way)
5. `morphClose` — morphological close (dilate→erode) then floodFill8

## Performance Note

The JS version uses mutable `Uint16Array` for in-place operations on 400K-cell
grids. The Elm port uses immutable `Array` with functional updates, which is
slower for large grids. The Elm lab uses a 360×240 logical drawing grid and
renders horizontal runs as SVG paths to keep interaction practical.

---

-}

import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)


-- ═══════════════════════════════════════════════════════════
--  Constants
-- ═══════════════════════════════════════════════════════════

{-| boundary pixel marker. Any pixel with this value is considered a wall/line.
-}
boundary : Int
boundary =
    65535


{-| Sentinel value for unprocessed cells.
-}
unassigned : Int
unassigned =
    65534



-- ═══════════════════════════════════════════════════════════
--  Types
-- ═══════════════════════════════════════════════════════════

{-| A pixel grid with width, height, and flat cell data.
    Cells are indexed as `data[y * w + x]`.
-}
type alias Grid =
    { w : Int
    , h : Int
    , data : Array Int
    }


{-| Result of a region segmentation algorithm.

    - `regionMap`: array mapping each cell to its region ID (or boundary)
    - `numRegions`: total number of distinct regions found

-}
type alias RegionResult =
    { regionMap : Array Int
    , numRegions : Int
    }


{-| Type alias for a segmentation function: Grid → RegionResult.
-}
type alias Segmenter =
    Grid -> RegionResult


{-| Human-readable name for a segmenter.
-}
type alias SegmenterName =
    String


-- ═══════════════════════════════════════════════════════════
--  Grid basics
-- ═══════════════════════════════════════════════════════════

{-| Create a new grid filled with `unassigned` (or the given fill value).
-}
createGrid : Int -> Int -> Grid
createGrid w h =
    { w = w
    , h = h
    , data = Array.repeat (w * h) unassigned
    }


{-| Get the value of a cell, returning boundary for out-of-bounds access.
-}
getCell : Grid -> Int -> Int -> Int
getCell grid x y =
    if x < 0 || x >= grid.w || y < 0 || y >= grid.h then
        boundary

    else
        Array.get (y * grid.w + x) grid.data |> Maybe.withDefault boundary


{-| Set the value of a cell, returning the modified grid.
    Out-of-bounds coordinates are silently ignored.
-}
setCell : Grid -> Int -> Int -> Int -> Grid
setCell grid x y val =
    if x >= 0 && x < grid.w && y >= 0 && y < grid.h then
        { grid | data = Array.set (y * grid.w + x) val grid.data }

    else
        grid



-- ═══════════════════════════════════════════════════════════
--  Neighbour deltas
-- ═══════════════════════════════════════════════════════════

n4 : List ( Int, Int )
n4 =
    [ ( -1, 0 ), ( 1, 0 ), ( 0, -1 ), ( 0, 1 ) ]


n8 : List ( Int, Int )
n8 =
    [ ( -1, 0 ), ( 1, 0 ), ( 0, -1 ), ( 0, 1 )
    , ( -1, -1 ), ( 1, -1 ), ( -1, 1 ), ( 1, 1 )
    ]


{-| Scan neighbours used by union-find first pass (already-processed cells only).
-}
scanNeighbours : List ( Int, Int )
scanNeighbours =
    [ ( -1, 0 ), ( 0, -1 ), ( -1, -1 ), ( 1, -1 ) ]



-- ═══════════════════════════════════════════════════════════
--  Algorithm 1: Flood fill 4-way (DFS, stack-based)
-- ═══════════════════════════════════════════════════════════

{-| Segment regions using 4-directional flood fill.

    Scans the grid left-to-right, top-to-bottom. When an unassigned cell
    is found, a DFS flood fill propagates through the 4 orthogonal
    directions, labeling all connected cells with the same region ID.

    Fast but can leak through diagonal adjacency (two regions touching
    at a corner are merged).

-}
floodFillRegions4 : Segmenter
floodFillRegions4 grid =
    floodFillWith n4 grid


-- ═══════════════════════════════════════════════════════════
--  Algorithm 2: Flood fill 8-way (DFS, stack-based)
-- ═══════════════════════════════════════════════════════════

{-| Segment regions using 8-directional flood fill.

    Same as 4-way but considers diagonal neighbors too. This prevents
    diagonal leaks: two regions that only touch at a corner are properly
    separated.

-}
floodFillRegions8 : Segmenter
floodFillRegions8 grid =
    floodFillWith n8 grid


{-| Core DFS flood fill using the given neighbour directions.
-}
floodFillWith : List ( Int, Int ) -> Grid -> RegionResult
floodFillWith deltas grid =
    let
        total =
            grid.w * grid.h

        initMap =
            Array.repeat total boundary
    in
    floodScan deltas grid initMap 0 0 0


{-| Scan the grid for unassigned seeds and flood from each.
-}
floodScan : List ( Int, Int ) -> Grid -> Array Int -> Int -> Int -> Int -> RegionResult
floodScan deltas grid regionMap regionId x y =
    if y >= grid.h then
        { regionMap = regionMap, numRegions = regionId }

    else if x >= grid.w then
        floodScan deltas grid regionMap regionId 0 (y + 1)

    else
        let
            idx =
                y * grid.w + x
        in
        if getDataAt grid idx == boundary || Array.get idx regionMap /= Just boundary then
            floodScan deltas grid regionMap regionId (x + 1) y

        else
            let
                newMap =
                    floodFrom deltas grid regionMap idx regionId
            in
            floodScan deltas grid newMap (regionId + 1) (x + 1) y


{-| Flood from a seed cell using DFS with explicit stack.
-}
floodFrom : List ( Int, Int ) -> Grid -> Array Int -> Int -> Int -> Array Int
floodFrom deltas grid regionMap seedIdx regionId =
    let
        initStack =
            [ seedIdx ]

        initMap =
            Array.set seedIdx regionId regionMap
    in
    floodLoop deltas grid initMap initStack regionId


floodLoop : List ( Int, Int ) -> Grid -> Array Int -> List Int -> Int -> Array Int
floodLoop deltas grid regionMap stack regionId =
    case stack of
        [] ->
            regionMap

        ci :: rest ->
            let
                cx =
                    remainderBy grid.w ci

                cy =
                    ci // grid.w

                ( newStack, newMap ) =
                    List.foldl
                        (\( dx, dy ) ( stk, mp ) ->
                            let
                                nx =
                                    cx + dx

                                ny =
                                    cy + dy
                            in
                            if nx >= 0 && nx < grid.w && ny >= 0 && ny < grid.h then
                                let
                                    ni =
                                        ny * grid.w + nx
                                in
                                if getDataAt grid ni /= boundary && Array.get ni mp == Just boundary then
                                    ( ni :: stk, Array.set ni regionId mp )

                                else
                                    ( stk, mp )

                            else
                                ( stk, mp )
                        )
                        ( rest, regionMap )
                        deltas
            in
            floodLoop deltas grid newMap newStack regionId



-- ═══════════════════════════════════════════════════════════
--  Algorithm 3: Union-Find (two-pass connected components)
-- ═══════════════════════════════════════════════════════════

{-| Segment regions using two-pass union-find connected-component labeling.

    First pass: assign provisional labels, using a disjoint-set to track
    equivalences when merging labels from neighboring cells.

    Second pass: resolve all equivalences into final region IDs.

    Handles 8-way connectivity. Memory-efficient — linear time in the
    number of cells.

-}
unionFindRegions : Segmenter
unionFindRegions grid =
    let
        total =
            grid.w * grid.h

        -- First pass
        firstResult =
            unionFindFirstPass grid total

        -- Resolve equivalences and remap
        remap =
            buildRemap firstResult.parent firstResult.nextLabel

        -- Second pass: build final region map
        regionMap =
            Array.repeat total boundary
                |> applyRemap firstResult.labels remap total
    in
    { regionMap = regionMap
    , numRegions = Dict.size remap
    }


type alias UnionFindState =
    { labels : Array Int
    , parent : Dict Int Int
    , nextLabel : Int
    }


unionFindFirstPass : Grid -> Int -> UnionFindState
unionFindFirstPass grid total =
    let
        init : UnionFindState
        init =
            { labels = Array.repeat total -1
            , parent = Dict.empty
            , nextLabel = 0
            }
    in
    unionFindScan grid init 0 total


unionFindScan : Grid -> UnionFindState -> Int -> Int -> UnionFindState
unionFindScan grid state idx total =
    if idx >= total then
        state

    else if getDataAt grid idx == boundary then
        unionFindScan grid state (idx + 1) total

    else
        let
            x =
                remainderBy grid.w idx

            y =
                idx // grid.w

            -- Collect labels from already-processed neighbors
            neighborLabels =
                List.filterMap
                    (\( dx, dy ) ->
                        let
                            nx =
                                x + dx

                            ny =
                                y + dy
                        in
                        if nx >= 0 && nx < grid.w && ny >= 0 && ny < grid.h then
                            let
                                nl =
                                    Array.get (ny * grid.w + nx) state.labels |> Maybe.withDefault -1
                            in
                            if nl >= 0 then
                                Just nl

                            else
                                Nothing

                        else
                            Nothing
                    )
                    scanNeighbours
        in
        case neighborLabels of
            [] ->
                let
                    newLabel =
                        state.nextLabel

                    newState =
                        { labels = Array.set idx newLabel state.labels
                        , parent = Dict.insert newLabel newLabel state.parent
                        , nextLabel = newLabel + 1
                        }
                in
                unionFindScan grid newState (idx + 1) total

            _ ->
                let
                    minLabel =
                        List.minimum neighborLabels |> Maybe.withDefault 0

                    newParent =
                        List.foldl
                            (\nl p ->
                                ufUnion nl minLabel p
                            )
                            state.parent
                            neighborLabels

                    newState =
                        { labels = Array.set idx minLabel state.labels
                        , parent = newParent
                        , nextLabel = state.nextLabel
                        }
                in
                unionFindScan grid newState (idx + 1) total


{-| Union-Find find with path halving.
-}
ufFind : Int -> Dict Int Int -> Int
ufFind x parent =
    let
        px =
            Dict.get x parent |> Maybe.withDefault x
    in
    if px == x then
        x

    else
        let
            ppx =
                Dict.get px parent |> Maybe.withDefault px
        in
        if ppx == px then
            px

        else
            ufFindLoop x parent


ufFindLoop : Int -> Dict Int Int -> Int
ufFindLoop x parent =
    let
        px =
            Dict.get x parent |> Maybe.withDefault x
    in
    if px == x then
        x

    else
        ufFindLoop px parent


{-| Union two labels: make the larger root point to the smaller.
-}
ufUnion : Int -> Int -> Dict Int Int -> Dict Int Int
ufUnion a b parent =
    let
        ra =
            ufFind a parent

        rb =
            ufFind b parent
    in
    if ra == rb then
        parent

    else if ra < rb then
        Dict.insert rb ra parent

    else
        Dict.insert ra rb parent


{-| Build the remap table: provisional label → final region ID.
-}
buildRemap : Dict Int Int -> Int -> Dict Int Int
buildRemap parent nextLabel =
    let
        labelsWithRoots =
            List.map (\label -> ( label, ufFind label parent )) (List.range 0 (nextLabel - 1))

        rootToRegion =
            List.foldl
                (\( _, root ) ( remap, nextId ) ->
                    if Dict.member root remap then
                        ( remap, nextId )

                    else
                        ( Dict.insert root nextId remap, nextId + 1 )
                )
                ( Dict.empty, 0 )
                labelsWithRoots
                |> Tuple.first
    in
    labelsWithRoots
        |> List.filterMap
            (\( label, root ) ->
                Dict.get root rootToRegion
                    |> Maybe.map (\region -> ( label, region ))
            )
        |> Dict.fromList


{-| Apply the remap to the label array.
-}
applyRemap : Array Int -> Dict Int Int -> Int -> Array Int -> Array Int
applyRemap labels remap total output =
    List.foldl
        (\i out ->
            let
                lbl =
                    Array.get i labels |> Maybe.withDefault -1
            in
            if lbl >= 0 then
                let
                    region =
                        Dict.get lbl remap |> Maybe.withDefault boundary
                in
                Array.set i region out

            else
                out
        )
        output
        (List.range 0 (total - 1))


{-| Helpers for grid data access.
-}
getDataAt : Grid -> Int -> Int
getDataAt grid idx =
    Array.get idx grid.data |> Maybe.withDefault boundary


-- ═══════════════════════════════════════════════════════════
--  Algorithm 4: Region growing (BFS queue)
-- ═══════════════════════════════════════════════════════════

{-| Segment regions using BFS from each seed.

    For each unassigned cell, a BFS queue expands the region in all 8
    directions. The queue is processed with an explicit head pointer
    rather than dequeuing (matching the JS implementation's efficiency).

-}
regionGrowRegions : Segmenter
regionGrowRegions grid =
    let
        total =
            grid.w * grid.h

        initMap =
            Array.repeat total boundary
    in
    regionGrowScan grid initMap 0 0 0


regionGrowScan : Grid -> Array Int -> Int -> Int -> Int -> RegionResult
regionGrowScan grid regionMap regionId x y =
    if y >= grid.h then
        { regionMap = regionMap, numRegions = regionId }

    else if x >= grid.w then
        regionGrowScan grid regionMap regionId 0 (y + 1)

    else
        let
            idx =
                y * grid.w + x
        in
        if getDataAt grid idx == boundary || Array.get idx regionMap /= Just boundary then
            regionGrowScan grid regionMap regionId (x + 1) y

        else
            let
                newMap =
                    growRegion grid regionMap idx regionId
            in
            regionGrowScan grid newMap (regionId + 1) (x + 1) y


growRegion : Grid -> Array Int -> Int -> Int -> Array Int
growRegion grid regionMap seedIdx regionId =
    let
        queue =
            [ seedIdx ]

        enqueued =
            Dict.singleton seedIdx True
    in
    growLoop grid regionMap queue [] regionId enqueued


growLoop : Grid -> Array Int -> List Int -> List Int -> Int -> Dict Int Bool -> Array Int
growLoop grid regionMap queue nextQueue regionId enqueued =
    case queue of
        [] ->
            case nextQueue of
                [] ->
                    regionMap

                _ ->
                    growLoop grid regionMap (List.reverse nextQueue) [] regionId enqueued

        ci :: rest ->
            if Array.get ci regionMap /= Just boundary then
                -- Already processed — skip
                growLoop grid regionMap rest nextQueue regionId enqueued

            else
                let
                    -- Mark this cell now that we're processing it
                    map1 =
                        Array.set ci regionId regionMap

                    cx =
                        remainderBy grid.w ci

                    cy =
                        ci // grid.w

                    foldResult =
                        List.foldl
                            (\( dx, dy ) acc ->
                                let
                                    nx =
                                        cx + dx

                                    ny =
                                        cy + dy
                                in
                                if nx >= 0 && nx < grid.w && ny >= 0 && ny < grid.h then
                                    let
                                        ni =
                                            ny * grid.w + nx
                                    in
                                    if getDataAt grid ni /= boundary && Array.get ni acc.mp == Just boundary && not (Dict.member ni acc.eq) then
                                        { acc | eq = Dict.insert ni True acc.eq, nq = ni :: acc.nq }

                                    else
                                        acc

                                else
                                    acc
                            )
                            { mp = map1, eq = enqueued, nq = nextQueue }
                            n8
                in
                growLoop grid foldResult.mp rest foldResult.nq regionId foldResult.eq

-- ═══════════════════════════════════════════════════════════
--  Algorithm 5: Morphological close
-- ═══════════════════════════════════════════════════════════

{-| Segment regions after morphological closing.

    Dilation: expand boundary pixels outward (2px radius, circular kernel)
    to fill small gaps.

    Erosion: shrink boundaries back by keeping only pixels that have at
    least 2 boundary neighbors in the original data.

    The closed grid is then segmented with 8-way flood fill.

    Useful for hand-drawn maps where strokes may have small gaps.

-}
morphCloseRegions : Segmenter
morphCloseRegions grid =
    let
        total =
            grid.w * grid.h

        -- Step 1: Dilate
        dilated =
            dilate grid total

        -- Step 2: Erode
        closed =
            erode grid dilated total
    in
    -- Step 3: Flood fill on closed grid
    floodFillRegions8 { w = grid.w, h = grid.h, data = closed }


{-| Dilate: any pixel within 2px (circular, radius² ≤ 5) of a boundary
    becomes boundary in the output.
-}
dilate : Grid -> Int -> Array Int
dilate grid total =
    let
        -- Start with a copy of the original data
        base =
            grid.data
    in
    -- For each boundary pixel, mark its neighborhood
    List.foldl
        (\idx arr ->
            if Array.get idx base == Just boundary then
                let
                    x =
                        remainderBy grid.w idx

                    y =
                        idx // grid.w
                in
                List.foldl
                    (\( dx, dy ) a ->
                        let
                            nx =
                                x + dx

                            ny =
                                y + dy
                        in
                        if nx >= 0 && nx < grid.w && ny >= 0 && ny < grid.h then
                            Array.set (ny * grid.w + nx) boundary a

                        else
                            a
                    )
                    arr
                    (circle2Radius 2 5)

            else
                arr
        )
        base
        (List.range 0 (total - 1))


{-| Generate (dx, dy) offsets within a circle of given radius.
    Includes all points where dx² + dy² ≤ maxDistSq.
-}
circle2Radius : Int -> Int -> List ( Int, Int )
circle2Radius radius maxDistSq =
    List.concatMap
        (\dy ->
            List.filterMap
                (\dx ->
                    if dx * dx + dy * dy <= maxDistSq then
                        Just ( dx, dy )

                    else
                        Nothing
                )
                (List.range -radius radius)
        )
        (List.range -radius radius)


{-| Erode: a boundary pixel in the dilated grid stays boundary ONLY if
    it has ≥ 2 boundary neighbors in the ORIGINAL data (4-way).
-}
erode : Grid -> Array Int -> Int -> Array Int
erode grid dilated total =
    Array.initialize total
        (\idx ->
            if Array.get idx dilated /= Just boundary then
                Array.get idx grid.data |> Maybe.withDefault unassigned

            else
                let
                    x =
                        remainderBy grid.w idx

                    y =
                        idx // grid.w

                    boundaryCount =
                        List.foldl
                            (\( dx, dy ) count ->
                                let
                                    nx =
                                        x + dx

                                    ny =
                                        y + dy
                                in
                                if nx >= 0 && nx < grid.w && ny >= 0 && ny < grid.h then
                                    if Array.get (ny * grid.w + nx) grid.data == Just boundary then
                                        count + 1

                                    else
                                        count

                                else
                                    count
                            )
                            0
                            n4
                in
                if boundaryCount >= 2 then
                    boundary

                else
                    unassigned
        )



-- ═══════════════════════════════════════════════════════════
--  Dispatch table
-- ═══════════════════════════════════════════════════════════

{-| Map from algorithm key to segmenter function.
-}
segmenters : Dict String Segmenter
segmenters =
    Dict.fromList
        [ ( "floodFill4", floodFillRegions4 )
        , ( "floodFill8", floodFillRegions8 )
        , ( "unionFind", unionFindRegions )
        , ( "regionGrow", regionGrowRegions )
        , ( "morphClose", morphCloseRegions )
        ]


{-| Human-readable names for each algorithm.
-}
segmenterNames : Dict String SegmenterName
segmenterNames =
    Dict.fromList
        [ ( "floodFill4", "Flood Fill 4-way" )
        , ( "floodFill8", "Flood Fill 8-way" )
        , ( "unionFind", "Union-Find (2-pass)" )
        , ( "regionGrow", "Region Growing (BFS)" )
        , ( "morphClose", "Morphological Close" )
        ]


{-| Default algorithm (4-way flood fill). Backward-compatible convenience.
-}
floodFillRegions : Segmenter
floodFillRegions =
    floodFillRegions4



-- ═══════════════════════════════════════════════════════════
--  Adjacency & centroids (shared by all algorithms)
-- ═══════════════════════════════════════════════════════════

{-| Build a region adjacency list from a region map.

    Scans the grid and records edges between adjacent regions.
    A "scan across boundary" pass handles regions separated by thin
    boundary lines (up to maxBoundaryRun pixels wide).

    Returns: `adj[i]` is the list of region IDs adjacent to region i.

-}
buildRegionAdjacency : Array Int -> Int -> Int -> Int -> List (List Int)
buildRegionAdjacency regionMap w h numRegions =
    let
        maxRun =
            12

        -- Use a Set to deduplicate edges during construction
        emptySets =
            List.repeat numRegions Set.empty

        -- Process all cells
        resultSets =
            List.foldl
                (\y acc ->
                    List.foldl
                        (\x acc2 ->
                            let
                                r =
                                    Array.get (y * w + x) regionMap |> Maybe.withDefault boundary
                            in
                            if r == boundary || r >= numRegions then
                                acc2

                            else
                                List.foldl
                                    (\( dx, dy ) acc3 ->
                                        let
                                            nx =
                                                x + dx

                                            ny =
                                                y + dy
                                        in
                                        if nx < w && ny < h then
                                            let
                                                nr =
                                                    Array.get (ny * w + nx) regionMap |> Maybe.withDefault boundary
                                            in
                                            if nr /= boundary && nr < numRegions && nr /= r then
                                                addEdgeSets r nr acc3

                                            else if nr == boundary then
                                                scanAcrossBoundarySets w h regionMap x y dx dy r maxRun acc3

                                            else
                                                acc3

                                        else
                                            acc3
                                    )
                                    acc2
                                    [ ( 1, 0 ), ( 0, 1 ) ]
                        )
                        acc
                        (List.range 0 (w - 1))
                )
                emptySets
                (List.range 0 (h - 1))
    in
    List.map Set.toList resultSets


addEdgeSets : Int -> Int -> List (Set Int) -> List (Set Int)
addEdgeSets a b sets =
    List.indexedMap
        (\i s ->
            if i == a then
                Set.insert b s

            else if i == b then
                Set.insert a s

            else
                s
        )
        sets


scanAcrossBoundarySets :
    Int
    -> Int
    -> Array Int
    -> Int
    -> Int
    -> Int
    -> Int
    -> Int
    -> Int
    -> List (Set Int)
    -> List (Set Int)
scanAcrossBoundarySets w h regionMap startX startY dx dy region maxRun sets =
    let
        ( nx, ny, steps ) =
            followBoundary w h regionMap (startX + dx) (startY + dy) dx dy 0 maxRun
    in
    if steps > 0 && nx >= 0 && nx < w && ny >= 0 && ny < h then
        let
            nr =
                Array.get (ny * w + nx) regionMap |> Maybe.withDefault boundary
        in
        if nr /= boundary && nr < List.length sets then
            addEdgeSets region nr sets

        else
            sets

    else
        sets


followBoundary : Int -> Int -> Array Int -> Int -> Int -> Int -> Int -> Int -> Int -> ( Int, Int, Int )
followBoundary w h regionMap x y dx dy steps maxSteps =
    if steps >= maxSteps then
        ( x, y, steps )

    else if x < 0 || x >= w || y < 0 || y >= h then
        ( x, y, steps )

    else if Array.get (y * w + x) regionMap == Just boundary then
        followBoundary w h regionMap (x + dx) (y + dy) dx dy (steps + 1) maxSteps

    else
        ( x, y, steps )


{-| Compute centroids for each region in a region map.

    Returns a list of (cx, cy) pairs, one per region.
    Regions with zero pixels get (0, 0).

-}
computeRegionCentroids : Array Int -> Int -> Int -> Int -> List ( Int, Int )
computeRegionCentroids regionMap w h numRegions =
    let
        -- Accumulate sums and counts per region
        initialSums =
            List.repeat numRegions ( 0, 0, 0 )

        sums =
            List.foldl
                (\y acc ->
                    List.foldl
                        (\x acc2 ->
                            let
                                r =
                                    Array.get (y * w + x) regionMap |> Maybe.withDefault boundary
                            in
                            if r == boundary || r >= numRegions then
                                acc2

                            else
                                List.indexedMap
                                    (\i ( sx, sy, cnt ) ->
                                        if i == r then
                                            ( sx + x, sy + y, cnt + 1 )

                                        else
                                            ( sx, sy, cnt )
                                    )
                                    acc2
                        )
                        acc
                        (List.range 0 (w - 1))
                )
                initialSums
                (List.range 0 (h - 1))
    in
    List.map
        (\( sx, sy, cnt ) ->
            if cnt > 0 then
                ( round (toFloat sx / toFloat cnt), round (toFloat sy / toFloat cnt) )

            else
                ( 0, 0 )
        )
        sums
