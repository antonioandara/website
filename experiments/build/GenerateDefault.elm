port module GenerateDefault exposing (main)

import Dict
import GenerativeTiling
import Json.Encode as E
import Platform


port report : E.Value -> Cmd msg


main : Program () () Never
main =
    Platform.worker
        { init = \_ -> ( (), report (encodeTiling (GenerativeTiling.generate GenerativeTiling.defaultConfig)) )
        , update = \msg _ -> never msg
        , subscriptions = \_ -> Sub.none
        }


point p =
    E.object [ ( "x", E.float p.x ), ( "y", E.float p.y ) ]


optional encode value =
    Maybe.map encode value |> Maybe.withDefault E.null


region r =
    E.object
        [ ( "id", E.int r.id ), ( "polygon", E.list point [] )
        , ( "center", point r.center ), ( "neighbors", E.list E.int r.neighbors )
        , ( "input", optional E.string r.input ), ( "constant", optional E.int r.constant )
        , ( "expression", E.string r.expression )
        ]


constraint map =
    E.object
        [ ( "regions", E.list region map.regions ), ( "output", E.int map.output )
        , ( "width", E.float map.width ), ( "height", E.float map.height )
        ]


tile t =
    E.object
        [ ( "id", E.int t.id ), ( "site", point t.site )
        , ( "polygon", E.list point [] ), ( "neighbors", E.list E.int t.neighbors )
        , ( "centroid", point t.centroid ), ( "area", E.float t.area ), ( "baseColor", E.int t.baseColor )
        ]


{-| Curved SVG outlines contain the rendered geometry. Sampled polygons are
only needed while generating it, so leave them out of the browser cache.
-}
encodeTiling tiling =
    E.object
        [ ( "width", E.float tiling.width ), ( "height", E.float tiling.height )
        , ( "tiles", E.list tile tiling.tiles ), ( "seed", E.int tiling.seed )
        , ( "rectangular", E.bool tiling.rectangular )
        , ( "outlines", E.list (\( id, path ) -> E.list identity [ E.int id, E.string path ]) (Dict.toList tiling.outlines) )
        , ( "constraint", optional constraint tiling.constraint )
        , ( "coverage", E.float tiling.coverage ), ( "constraintsPreserved", E.bool tiling.constraintsPreserved )
        ]
