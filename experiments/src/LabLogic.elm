module LabLogic exposing (Point, SolveResult(..), Stroke, conflicts, rasterize, solve, solveWithColors, solveVariant)

{-| Interactive lab helpers. Search has an explicit budget so user input cannot
start an unbounded exponential search on the browser's main thread.
-}

import Array exposing (Array)
import Dict exposing (Dict)
import GridProcessor


type alias Point =
    ( Int, Int )


type alias Stroke =
    List Point


type SolveResult
    = Solved (Array Int)
    | Impossible
    | LimitReached


conflicts : List (List Int) -> Array Int -> List ( Int, Int )
conflicts adjacency colors =
    adjacency
        |> List.indexedMap
            (\i neighbors ->
                neighbors
                    |> List.filter (\j -> j > i && colorAt colors i >= 0 && colorAt colors i == colorAt colors j)
                    |> List.map (Tuple.pair i)
            )
        |> List.concat


colorAt : Array Int -> Int -> Int
colorAt colors i =
    Array.get i colors |> Maybe.withDefault -1


solve : Int -> List (List Int) -> Dict Int Int -> SolveResult
solve =
    solveWithColors 3


solveWithColors : Int -> Int -> List (List Int) -> Dict Int Int -> SolveResult
solveWithColors colorCount budget adjacency fixed =
    let
        initial =
            Dict.foldl Array.set (Array.repeat (List.length adjacency) -1) fixed
    in
    if not (List.isEmpty (conflicts adjacency initial)) || List.any (\c -> c < 0 || c >= colorCount) (Dict.values fixed) then
        Impossible

    else
        search colorCount 0 Nothing (Array.fromList adjacency) initial budget |> Tuple.first


solveVariant : Int -> Int -> List (List Int) -> Dict Int Int -> Maybe (Array Int) -> SolveResult
solveVariant variant budget adjacency fixed previous =
    let
        initial = Dict.foldl Array.set (Array.repeat (List.length adjacency) -1) fixed
    in
    search 3 variant previous (Array.fromList adjacency) initial budget |> Tuple.first


search : Int -> Int -> Maybe (Array Int) -> Array (List Int) -> Array Int -> Int -> ( SolveResult, Int )
search colorCount variant previous adjacency colors budget =
    if budget <= 0 then
        ( LimitReached, 0 )

    else
        let
            choices =
                Array.toIndexedList adjacency
                    |> List.filter (\( i, _ ) -> colorAt colors i < 0)
                    |> List.map
                        (\( i, neighbors ) ->
                            ( i, List.filter (\c -> List.all (\j -> colorAt colors j /= c) neighbors) (List.range 0 (colorCount - 1) |> List.sortBy (\c -> modBy colorCount (c + variant * (i + 1)))) )
                        )
                    |> List.sortBy (Tuple.second >> List.length)
        in
        case List.head choices of
            Nothing ->
                ( if previous == Just colors then Impossible else Solved colors, budget - 1 )

            Just ( i, available ) ->
                tryColors colorCount variant previous adjacency colors i available (budget - 1)


tryColors : Int -> Int -> Maybe (Array Int) -> Array (List Int) -> Array Int -> Int -> List Int -> Int -> ( SolveResult, Int )
tryColors colorCount variant previous adjacency colors i available budget =
    case available of
        [] ->
            ( Impossible, budget )

        c :: rest ->
            case search colorCount variant previous adjacency (Array.set i c colors) budget of
                ( Impossible, remaining ) ->
                    tryColors colorCount variant previous adjacency colors i rest remaining

                other ->
                    other


rasterize : Int -> Int -> List Stroke -> GridProcessor.Grid
rasterize width height strokes =
    List.foldl (paintStroke width height) (GridProcessor.createGrid width height) strokes


paintStroke : Int -> Int -> Stroke -> GridProcessor.Grid -> GridProcessor.Grid
paintStroke width height stroke grid =
    case stroke of
        [] ->
            grid

        [ point ] ->
            paintLine width height point point grid

        a :: b :: rest ->
            paintStroke width height (b :: rest) (paintLine width height a b grid)


paintLine : Int -> Int -> Point -> Point -> GridProcessor.Grid -> GridProcessor.Grid
paintLine width height ( x1, y1 ) ( x2, y2 ) grid =
    let
        steps =
            max 1 (max (abs (x2 - x1)) (abs (y2 - y1)))

        paint step acc =
            let
                x =
                    round (toFloat x1 + toFloat (x2 - x1) * toFloat step / toFloat steps)

                y =
                    round (toFloat y1 + toFloat (y2 - y1) * toFloat step / toFloat steps)
            in
            List.foldl
                (\( dx, dy ) current ->
                    if x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height then
                        GridProcessor.setCell current (x + dx) (y + dy) GridProcessor.boundary

                    else
                        current
                )
                acc
                [ ( 0, 0 ) ]
    in
    List.foldl paint grid (List.range 0 steps)
