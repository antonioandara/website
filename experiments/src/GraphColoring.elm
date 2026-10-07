module GraphColoring exposing
    ( ColorIndex
    , colorGraph
    , findAllColorings
    , getColor
    , getColorName
    , colors
    , colorNames
    )

{-| Backtracking graph coloring algorithms.

Port of `src/utils/coloring.js` — Phase 2 of the progressive Elm port.

Provides both single-solution and all-solutions search over k-colorings
of a graph represented as an adjacency list.

-}

import Array exposing (Array)


-- ═══════════════════════════════════════════════════════════
--  Types
-- ═══════════════════════════════════════════════════════════

{-| A color index: 0, 1, 2, … up to numColors - 1.
-}
type alias ColorIndex =
    Int


{-| An adjacency list where adjList[i] is the list of neighbors of vertex i.
-}
type alias AdjList =
    List (List Int)



-- ═══════════════════════════════════════════════════════════
--  Color palettes
-- ═══════════════════════════════════════════════════════════

{-| Hex color strings for the standard palette.
    Index 0 = Red, 1 = Green, 2 = Blue, 3 = Yellow.
-}
colors : Array String
colors =
    Array.fromList [ "#bb5961", "#397d68", "#426f9f", "#d2ac58" ]


{-| Human-readable color names matching the palette.
-}
colorNames : Array String
colorNames =
    Array.fromList [ "Red", "Green", "Blue", "Yellow" ]


{-| Get the hex color string for a color index.
-}
getColor : ColorIndex -> String
getColor idx =
    Array.get idx colors |> Maybe.withDefault "#999999"


{-| Get the human-readable name for a color index.
-}
getColorName : ColorIndex -> String
getColorName idx =
    Array.get idx colorNames |> Maybe.withDefault "Unknown"



-- ═══════════════════════════════════════════════════════════
--  Single solution
-- ═══════════════════════════════════════════════════════════

{-| Find ONE valid coloring of the graph using at most `numColors` colors.

    Returns `Nothing` if no coloring exists, or `Just assignment` where
    `assignment[i]` is the color of vertex i.

-}
colorGraph : AdjList -> Int -> Maybe (Array ColorIndex)
colorGraph adjList numColors =
    let
        adj =
            Array.fromList adjList

        n =
            Array.length adj
    in
    if n == 0 then
        Just Array.empty

    else
        Array.repeat n -1
            |> backtrack adj numColors 0


{-| Recursive backtracking for a single solution.

    `assignment[v]` is either a color or -1 when unassigned.
    `v` is the current vertex being assigned.
-}
backtrack : Array (List Int) -> Int -> Int -> Array ColorIndex -> Maybe (Array ColorIndex)
backtrack adj numColors v assignment =
    if v >= Array.length adj then
        Just assignment

    else
        tryColors (List.range 0 (numColors - 1)) (neighborsOf adj v) assignment v adj numColors


{-| Try colors 0..numColors-1 for vertex v. Return first valid solution.
-}
tryColors : List ColorIndex -> List Int -> Array ColorIndex -> Int -> Array (List Int) -> Int -> Maybe (Array ColorIndex)
tryColors colorsToTry neighbors assignment v adj numColors =
    case colorsToTry of
        [] ->
            Nothing

        color :: rest ->
            if isValidColor neighbors color assignment then
                case backtrack adj numColors (v + 1) (Array.set v color assignment) of
                    Just solution ->
                        Just solution

                    Nothing ->
                        tryColors rest neighbors assignment v adj numColors

            else
                tryColors rest neighbors assignment v adj numColors


-- ═══════════════════════════════════════════════════════════
--  All solutions
-- ═══════════════════════════════════════════════════════════

{-| Find ALL valid colorings of the graph using at most `numColors` colors,
    up to `maxSolutions`.

    The search stops once `maxSolutions` solutions are found.

-}
findAllColorings : AdjList -> Int -> Int -> List (Array ColorIndex)
findAllColorings adjList numColors maxSolutions =
    let
        adj =
            Array.fromList adjList

        n =
            Array.length adj
    in
    if maxSolutions <= 0 then
        []

    else if n == 0 then
        [ Array.empty ]

    else
        Array.repeat n -1
            |> findAllBacktrack adj numColors 0 maxSolutions []
            |> List.reverse


{-| Recursive backtracking that collects all solutions.
-}
findAllBacktrack : Array (List Int) -> Int -> Int -> Int -> List (Array ColorIndex) -> Array ColorIndex -> List (Array ColorIndex)
findAllBacktrack adj numColors v maxSolutions found assignment =
    if List.length found >= maxSolutions then
        found

    else if v >= Array.length adj then
        assignment :: found

    else
        findAllTryColors (List.range 0 (numColors - 1)) (neighborsOf adj v) assignment v adj numColors maxSolutions found


{-| Try all colors for vertex v, collecting every valid solution.
-}
findAllTryColors :
    List ColorIndex
    -> List Int
    -> Array ColorIndex
    -> Int
    -> Array (List Int)
    -> Int
    -> Int
    -> List (Array ColorIndex)
    -> List (Array ColorIndex)
findAllTryColors colorsToTry neighbors assignment v adj numColors maxSolutions found =
    case colorsToTry of
        [] ->
            found

        color :: rest ->
            if List.length found >= maxSolutions then
                found

            else if isValidColor neighbors color assignment then
                let
                    next =
                        findAllBacktrack adj numColors (v + 1) maxSolutions found (Array.set v color assignment)
                in
                findAllTryColors rest neighbors assignment v adj numColors maxSolutions next

            else
                findAllTryColors rest neighbors assignment v adj numColors maxSolutions found


-- ═══════════════════════════════════════════════════════════
--  Helpers
-- ═══════════════════════════════════════════════════════════

{-| Check if assigning `color` to a vertex with given `neighbors` is valid.
-}
isValidColor : List Int -> ColorIndex -> Array ColorIndex -> Bool
isValidColor neighbors color assignment =
    List.all
        (\neighbor ->
            case Array.get neighbor assignment of
                Just assignedColor ->
                    assignedColor < 0 || assignedColor /= color

                Nothing ->
                    True
        )
        neighbors


{-| Get the neighbor list for a vertex, or empty list if out of bounds.
-}
neighborsOf : Array (List Int) -> Int -> List Int
neighborsOf adj v =
    adj
        |> Array.get v
        |> Maybe.withDefault []
