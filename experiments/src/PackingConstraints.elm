module PackingConstraints exposing (State, connect, contact, initial, spacer)

{-| Accept a packing contact only if it has a valid extension for every input
assignment. Keep one witness coloring per row, so most redundant contacts need
no search. The original gate graph remains a subgraph; OUT stays derived.
-}

import Array exposing (Array)
import ConstraintMap exposing (Map)
import Dict exposing (Dict)
import LabLogic exposing (SolveResult(..))
import Set exposing (Set)


type alias Witness =
    { fixed : Dict Int Int, colors : Array Int }


type alias State =
    { map : Map, witnesses : List Witness, rejected : Set String }


initial : Map -> Maybe State
initial map =
    let
        names =
            map.regions |> List.filterMap .input |> Set.fromList |> Set.toList

        assignments =
            List.foldl (\name rows -> List.concatMap (\row -> [ Dict.insert name False row, Dict.insert name True row ]) rows) [ Dict.empty ] names

        solve assignment =
            let
                fixed =
                    ConstraintMap.fixedInputs assignment map
            in
            case LabLogic.solve 200000 (List.map .neighbors map.regions) fixed of
                Solved colors ->
                    Just { fixed = fixed, colors = colors }

                _ ->
                    Nothing

        witnesses =
            List.filterMap solve assignments
    in
    if List.length witnesses == List.length assignments then
        Just { map = map, witnesses = witnesses, rejected = Set.empty }

    else
        Nothing


contact : Int -> List Int -> State -> ( State, Maybe State )
contact id neighbors state =
    let
        key =
            String.fromInt id ++ ":" ++ (neighbors |> Set.fromList |> Set.remove id |> Set.toList |> List.map String.fromInt |> String.join ",")
    in
    if Set.member key state.rejected then
        ( state, Nothing )

    else
        case connect id neighbors state of
            Just accepted ->
                ( accepted, Just accepted )

            Nothing ->
                ( { state | rejected = Set.insert key state.rejected }, Nothing )


connect : Int -> List Int -> State -> Maybe State
connect id neighbors state =
    let
        edges =
            List.filter ((/=) id) neighbors

        regions =
            state.map.regions
                |> List.map
                    (\r ->
                        if r.id == id then
                            { r | neighbors = Set.fromList (r.neighbors ++ edges) |> Set.toList }

                        else if List.member r.id edges then
                            { r | neighbors = Set.insert id (Set.fromList r.neighbors) |> Set.toList }

                        else
                            r
                    )
    in
    if List.all (\n -> List.drop id state.map.regions |> List.head |> Maybe.map (\r -> List.member n r.neighbors) |> Maybe.withDefault False) edges then
        Just state

    else
        validate
            { state
                | map =
                    let
                        map =
                            state.map
                    in
                    { map | regions = regions }
            }


spacer : { x : Float, y : Float } -> List Int -> State -> Maybe ( State, Int )
spacer center neighbors state =
    let
        id =
            List.length state.map.regions

        region =
            { id = id, polygon = [], center = center, neighbors = [], input = Nothing, constant = Nothing, expression = "Packing cell" }

        map =
            state.map

        expanded =
            { state | map = { map | regions = map.regions ++ [ region ] }, witnesses = List.map (\w -> { w | colors = Array.push -1 w.colors }) state.witnesses }
    in
    connect id neighbors expanded |> Maybe.map (\result -> ( result, id ))


validate : State -> Maybe State
validate state =
    let
        adjacency =
            List.map .neighbors state.map.regions

        repair witness =
            let
                unset =
                    Array.toIndexedList witness.colors |> List.filter (\( _, c ) -> c < 0)

                fill ( id, _ ) colors =
                    let
                        ns =
                            List.drop id adjacency |> List.head |> Maybe.withDefault []

                        available =
                            List.filter (\c -> List.all (\n -> Array.get n colors /= Just c) ns) [ 0, 1, 2 ]
                    in
                    Array.set id (List.head available |> Maybe.withDefault -1) colors

                quick =
                    List.foldl fill witness.colors unset
            in
            if Array.toList quick |> List.all (\c -> c >= 0) then
                if List.isEmpty (LabLogic.conflicts adjacency quick) then
                    Just { witness | colors = quick }

                else
                    search witness

            else
                search witness

        search witness =
            case LabLogic.solve 64 adjacency witness.fixed of
                Solved colors ->
                    Just { witness | colors = colors }

                _ ->
                    Nothing

        repairAll remaining verified =
            case remaining of
                [] ->
                    Just { state | witnesses = List.reverse verified }

                witness :: rest ->
                    case repair witness of
                        Nothing ->
                            Nothing

                        Just updated ->
                            repairAll rest (updated :: verified)
    in
    repairAll state.witnesses []
