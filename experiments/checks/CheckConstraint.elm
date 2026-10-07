port module CheckConstraint exposing (main)

import Array
import ConstraintMap
import Dict
import FormulaExamples
import FormulaParser
import GenerativeTiling
import Generated.DefaultTiling
import Json.Encode as E
import LabLogic exposing (SolveResult(..))
import Platform
import Set


port report : E.Value -> Cmd msg


main : Program () () Never
main =
    Platform.worker
        { init = \_ -> ( (), report (E.list check (FormulaExamples.all ++ [ { name = "Identity", source = "a" }, { name = "Nested negation", source = "!!!a" }, { name = "Uneven tree", source = "a & (b | (c & (d | !e)))" } ])) )
        , update = \msg _ -> never msg
        , subscriptions = \_ -> Sub.none
        }


check example =
    case FormulaParser.parse example.source of
        Err _ ->
            E.null

        Ok ast ->
            let
                map =
                    tiling.constraint |> Maybe.withDefault (ConstraintMap.build 7 ast)

                adjacency =
                    List.map .neighbors map.regions

                rowCheck row =
                    let
                        fixed =
                            ConstraintMap.fixedInputs row.assignment map

                        expected =
                            if row.result then
                                1

                            else
                                0

                        solved =
                            case LabLogic.solve 200000 adjacency fixed of
                                Solved colors ->
                                    Array.get map.output colors == Just expected && List.isEmpty (LabLogic.conflicts adjacency colors) && List.all (\c -> c >= 0 && c < 3) (Array.toList colors)

                                _ ->
                                    False

                        forced =
                            LabLogic.solve 200000 adjacency (Dict.insert map.output (1 - expected) fixed) == Impossible
                    in
                    E.object [ ( "solved", E.bool solved ), ( "forced", E.bool forced ), ( "outputUnpinned", E.bool (not (Dict.member map.output fixed)) ) ]

                rows =
                    FormulaParser.buildTruthTable ast

                tiling =
                    GenerativeTiling.generateFor example.source GenerativeTiling.defaultConfig

                actualAdjacency =
                    List.map .neighbors tiling.tiles

                connectionsValid =
                    tiling.constraintsPreserved && List.map Set.fromList actualAdjacency == List.map Set.fromList adjacency

                variables =
                    FormulaParser.collectVariables ast

                toggles row =
                    let
                        prior =
                            GenerativeTiling.recolor tiling row variables example.source

                        toggle name =
                            let
                                assignment =
                                    Dict.update name (Maybe.map not) row.assignment

                                next =
                                    { assignment = assignment, result = FormulaParser.evaluate ast assignment }

                                frames =
                                    GenerativeTiling.propagate (Just prior) tiling { next | result = not next.result } variables example.source

                                last =
                                    List.reverse frames |> List.head

                                complete frame =
                                    List.all (\t -> t.colorIndex >= 0 && t.colorIndex < 3) frame.tiles
                                        && List.isEmpty (LabLogic.conflicts actualAdjacency (Array.fromList (List.map .colorIndex frame.tiles)))
                                        && (List.drop map.output frame.tiles |> List.head |> Maybe.map .colorIndex)
                                        == Just
                                            (if next.result then
                                                1

                                             else
                                                0
                                            )

                                interrupted =
                                    List.drop (List.length frames // 2) frames |> List.head |> Maybe.withDefault prior

                                resumed =
                                    GenerativeTiling.propagate (Just interrupted) tiling next variables example.source |> List.reverse |> List.head
                            in
                            (last |> Maybe.map complete |> Maybe.withDefault False)
                                && (resumed |> Maybe.map complete |> Maybe.withDefault False)
                    in
                    List.map toggle variables

                transitions row ( previous, checks ) =
                    let
                        frames =
                            GenerativeTiling.propagate previous tiling { row | result = not row.result } (FormulaParser.collectVariables ast) example.source

                        final =
                            List.reverse frames |> List.head

                        colors frame =
                            Array.fromList (List.map .colorIndex frame.tiles)

                        frameValid frame =
                            List.isEmpty (LabLogic.conflicts actualAdjacency (colors frame))

                        settled =
                            final
                                |> Maybe.map
                                    (\frame ->
                                        List.all (\t -> t.colorIndex >= 0 && t.colorIndex < 3) frame.tiles
                                            && Array.get map.output (colors frame)
                                            == Just
                                                (if row.result then
                                                    1

                                                 else
                                                    0
                                                )
                                    )
                                |> Maybe.withDefault False

                        causal =
                            case previous of
                                Nothing ->
                                    True

                                Just old ->
                                    let
                                        inputIds =
                                            map.regions |> List.filter (\r -> r.input /= Nothing) |> List.map .id |> Set.fromList

                                        advance frame ( prior, reached, ok ) =
                                            let
                                                changed =
                                                    List.map2
                                                        (\a b ->
                                                            if a.colorIndex /= b.colorIndex then
                                                                Just b.tile.id

                                                            else
                                                                Nothing
                                                        )
                                                        prior.tiles
                                                        frame.tiles
                                                        |> List.filterMap identity

                                                touches id =
                                                    Set.member id reached || Set.member id inputIds || (List.drop id actualAdjacency |> List.head |> Maybe.withDefault [] |> List.any (\n -> Set.member n reached))
                                            in
                                            ( frame, List.foldl Set.insert reached changed, ok && List.all touches changed && Set.fromList changed == Set.fromList frame.changed )

                                        ( _, _, result ) =
                                            List.foldl advance ( old, Set.empty, True ) frames
                                    in
                                    result

                        unchangedInputsStop =
                            case previous of
                                Nothing ->
                                    True

                                Just old ->
                                    if
                                        List.all
                                            (\r ->
                                                case r.input of
                                                    Nothing ->
                                                        True

                                                    Just name ->
                                                        List.drop r.id old.tiles
                                                            |> List.head
                                                            |> Maybe.map
                                                                (\t ->
                                                                    t.colorIndex
                                                                        == (if Dict.get name row.assignment == Just True then
                                                                                1

                                                                            else
                                                                                0
                                                                           )
                                                                )
                                                            |> Maybe.withDefault False
                                            )
                                            map.regions
                                    then
                                        List.length frames == 1 && (final |> Maybe.map (\f -> List.map .colorIndex f.tiles == List.map .colorIndex old.tiles) |> Maybe.withDefault False)

                                    else
                                        True
                    in
                    ( final, checks ++ [ not (List.isEmpty frames) && List.all frameValid frames && settled && causal && unchangedInputsStop ] )
            in
            E.object
                [ ( "name", E.string example.name )
                , ( "cachedDefaultMatches", E.bool
                    (if example.source == "!(a & b)" then
                        let
                            strip geometry =
                                { geometry
                                    | tiles = List.map (\t -> { t | polygon = [] }) geometry.tiles
                                    , constraint = Maybe.map (\cachedMap -> { cachedMap | regions = List.map (\r -> { r | polygon = [] }) cachedMap.regions }) geometry.constraint
                                }
                        in
                        strip tiling == Generated.DefaultTiling.tiling
                     else True)
                  )
                , ( "coverage", E.float tiling.coverage )
                , ( "regions", E.int (List.length tiling.tiles) )
                , ( "rows", E.list rowCheck rows )
                , ( "connectionsValid", E.bool connectionsValid )
                , ( "transitions", E.list E.bool (List.foldl transitions ( Nothing, [] ) rows |> Tuple.second) )
                , ( "inputToggles", E.list E.bool (List.concatMap toggles rows) )
                ]
