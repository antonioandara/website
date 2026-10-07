module SignalPropagation exposing (Frame, repair)

{-| Repair a running coloring, starting at changed input pins. Colors outside
an expanding shared-border neighborhood stay frozen. Unresolved regions are
unassigned, then local constraint decisions settle them. OUT is never a pin.
-}

import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)


type alias Frame =
    { colors : Array Int, changed : List Int, status : String }


type Search
    = Solved (Array Int) (List ( Array Int, Int ))
    | Impossible
    | Limit


repair : List (List Int) -> Dict Int Int -> Array Int -> List Frame
repair adjacency fixed previous =
    let
        neighbors id =
            List.drop id adjacency |> List.head |> Maybe.withDefault []

        color id colors =
            Array.get id colors |> Maybe.withDefault -1

        roots =
            Dict.toList fixed |> List.filter (\( id, c ) -> color id previous /= c) |> List.map Tuple.first

        pinned =
            Dict.foldl Array.set previous fixed

        conflicts =
            roots |> List.concatMap (\id -> neighbors id |> List.filter (\n -> color n pinned == color id pinned)) |> Set.fromList

        editable ids =
            Set.filter (\id -> not (Dict.member id fixed)) ids

        first =
            editable conflicts

        unresolved =
            Array.toIndexedList previous |> List.filter (\( _, c ) -> c < 0) |> List.map Tuple.first |> Set.fromList

        initialActive =
            Set.union unresolved (Set.union (Set.fromList roots) first)

        clear ids colors =
            Set.foldl (\id -> Array.set id -1) colors ids

        frame status before after =
            { colors = after
            , changed = Array.toIndexedList after |> List.filter (\( id, c ) -> color id before /= c) |> List.map Tuple.first
            , status = status
            }

        finish colors =
            { colors = colors, changed = [], status = "Settled. Shared-border constraints derive OUT from the inputs." }

        searchFrames start decisions =
            let
                advance ( colors, id ) ( old, frames ) =
                    ( colors, frames ++ [ frame "Propagating — resolving a tile from its neighbors." old colors ] )
            in
            List.foldl advance ( start, [] ) decisions |> Tuple.second

        expand active frontier partial frames =
            let
                ( result, _ ) =
                    search adjacency previous partial 100000
            in
            case result of
                Solved colors decisions ->
                    frames ++ searchFrames partial decisions ++ [ finish colors ]

                Limit ->
                    frames ++ [ { colors = partial, changed = [], status = "Repair budget reached. Some tiles remain unresolved; try a simpler formula." } ]

                Impossible ->
                    let
                        next =
                            Set.toList frontier |> List.concatMap neighbors |> Set.fromList |> editable |> (\ids -> Set.diff ids active)

                        cleared =
                            clear next partial
                    in
                    if Set.isEmpty next then
                        frames ++ [ { colors = partial, changed = [], status = "No local repair exists for these input pins." } ]

                    else
                        expand (Set.union active next)
                            next
                            cleared
                            (frames ++ [ frame "Propagating — the unresolved wave crosses shared borders." partial cleared ])

        silent =
            clear (Set.fromList roots) previous

        released =
            clear first silent

        injected =
            Dict.foldl Array.set released fixed

        initialFrames =
            if List.isEmpty roots then
                []

            else
                [ frame "Propagating — an input signal changed." previous silent ]
                    ++ (if Set.isEmpty first then
                            []

                        else
                            [ frame "Propagating — releasing conflicting neighbors." silent released ]
                       )
                    ++ [ frame "Propagating — applying the new input pins." released injected ]
    in
    if List.isEmpty roots && Set.isEmpty unresolved then
        [ finish previous ]

    else
        expand initialActive initialActive injected initialFrames


search : List (List Int) -> Array Int -> Array Int -> Int -> ( Search, Int )
search adjacency previous colors budget =
    if budget <= 0 then
        ( Limit, 0 )

    else
        let
            available id neighbors =
                List.filter (\c -> List.all (\n -> Array.get n colors /= Just c) neighbors) [ 0, 1, 2 ]
                    |> List.sortBy
                        (\c ->
                            if Array.get id previous == Just c then
                                0

                            else
                                c + 1
                        )

            choices =
                List.indexedMap (\id neighbors -> ( id, available id neighbors )) adjacency
                    |> List.filter (\( id, _ ) -> Array.get id colors == Just -1)
                    |> List.sortBy (Tuple.second >> List.length)

            try id candidates remaining =
                case candidates of
                    [] ->
                        ( Impossible, remaining )

                    c :: rest ->
                        let
                            updated =
                                Array.set id c colors

                            ( result, left ) =
                                search adjacency previous updated remaining
                        in
                        case result of
                            Solved final decisions ->
                                ( Solved final (( updated, id ) :: decisions), left )

                            Impossible ->
                                try id rest left

                            Limit ->
                                ( Limit, left )
        in
        case List.head choices of
            Nothing ->
                if List.indexedMap (\id ns -> List.all (\n -> Array.get n colors /= Array.get id colors) ns) adjacency |> List.all identity then
                    ( Solved colors [], budget - 1 )

                else
                    ( Impossible, budget - 1 )

            Just ( id, candidates ) ->
                try id candidates (budget - 1)
