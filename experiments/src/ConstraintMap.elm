module ConstraintMap exposing (Map, Region, build, buildOrganic, fixedInputs)

import Dict exposing (Dict)
import FormulaParser exposing (Expr(..))


type alias Point = { x : Float, y : Float }
type alias Region = { id : Int, polygon : List Point, center : Point, neighbors : List Int, input : Maybe String, constant : Maybe Int, expression : String }
type alias Map = { regions : List Region, output : Int, width : Float, height : Float }
type alias Anchor = { id : Int, region : Int, point : Point }
type alias Edge = { a : Int, b : Int }
type alias Info = { input : Maybe String, constant : Maybe Int, expression : String }
type alias Build = { anchors : List Anchor, edges : List Edge, info : List Info }
type alias Tree = { width : Float, height : Float }

fixedInputs : Dict String Bool -> Map -> Dict Int Int
fixedInputs assignment map =
    map.regions |> List.filterMap (\region ->
        case region.constant of
            Just color -> Just (region.id,color)
            Nothing -> region.input |> Maybe.map (\name -> (region.id,if Dict.get name assignment==Just True then 1 else 0))) |> Dict.fromList

kind : Expr -> (String,List Expr)
kind expr = case expr of
    Var _ -> ("INPUT",[])
    Not (And a b) -> ("NAND",[a,b])
    Not (Or a b) -> ("NOR",[a,b])
    Not child -> ("NOT",[child])
    And a b -> ("AND",[a,b])
    Or a b -> ("OR",[a,b])

expression : Expr -> String
expression expr = case expr of
    Var name -> name
    Not child -> "!(" ++ expression child ++ ")"
    And a b -> "(" ++ expression a ++ " & " ++ expression b ++ ")"
    Or a b -> "(" ++ expression a ++ " | " ++ expression b ++ ")"

measure : Expr -> Tree
measure expr =
    let (gate,children)=kind expr
        sizes=List.map measure children
        childHeight=List.map .height sizes |> List.maximum |> Maybe.withDefault 0
        childWidth=List.sum (List.map .width sizes) + (if List.length sizes>1 then 70 else 0)
        ownWidth=if gate=="NOT" then 150 else 260
        ownHeight=if gate=="NOT" then 125 else if gate=="NAND" || gate=="NOR" then 225 else 180
    in if gate=="INPUT" then {width=110,height=0}
       else {width=max ownWidth childWidth,height=childHeight+(if childHeight>0 then 70 else 0)+ownHeight}

addRegion : Info -> Point -> Build -> (Int,Build)
addRegion info point state =
    let id=List.length state.info
        anchor={id=List.length state.anchors,region=id,point=point}
    in (anchor.id,{state | info=state.info++[info],anchors=state.anchors++[anchor]})

anchorAt : Int -> Build -> Anchor
anchorAt id state = List.drop id state.anchors |> List.head |> Maybe.withDefault {id= -1,region= -1,point={x=0,y=0}}

join : Int -> Int -> Build -> Build
join a b state = {state | edges=state.edges++[{a=a,b=b}]}

attach : Int -> Point -> Build -> (Int,Build)
attach existing point state =
    let source=anchorAt existing state
        anchor={id=List.length state.anchors,region=source.region,point=point}
    in (anchor.id,join existing anchor.id {state | anchors=state.anchors++[anchor]})

buildTree : Expr -> Float -> Float -> Build -> (Int,Build)
buildTree expr left top state =
    let
        (gate,children)=kind expr
        size=measure expr
        sizes=List.map measure children
        childHeight=List.map .height sizes |> List.maximum |> Maybe.withDefault 0
        gateY=top+childHeight+(if childHeight>0 then 70 else 0)
        gateX=left+(size.width-(if gate=="NOT" then 150 else 260))/2
        position dx dy={x=gateX+dx,y=gateY+dy}
        bare={input=Nothing,constant=Nothing,expression=""}
        child index childExpr terminal state0 =
            case childExpr of
                Var name -> addRegion {bare | input=Just name,expression=name} terminal state0
                _ ->
                    let childSize=measure childExpr
                        childLeft=if List.length children==1 then left+(size.width-childSize.width)/2 else if index==0 then left else left+size.width-childSize.width
                        (out,subtree)=buildTree childExpr childLeft (top+childHeight-childSize.height) state0
                        (bend,routed)=attach out {x=terminal.x,y=gateY-20} subtree
                    in attach bend terminal routed
        first=List.head children |> Maybe.withDefault (Var "a")
        second=List.drop 1 children |> List.head |> Maybe.withDefault (Var "b")
        (x,withX)=child 0 first (position 40 35) state
    in
    if gate=="NOT" then
        let (out,s1)=addRegion {bare | expression=expression expr} (position 65 85) withX
            (neutral,s2)=addRegion {bare | constant=Just 2} (position 120 85) s1
        in (out,s2 |> join x out |> join out neutral)
    else
        let
            (y,withY)=child 1 second (position 200 35) withX
            nodes=[("s1",80,80),("s2",160,80),("d1",20,115),("d2",220,115),("l",10,55),("r",230,55),("and",120,130)] ++ (if gate=="NAND" || gate=="NOR" then [("out",120,195)] else [])
            addNode (name,px,py) (known,acc)=
                let isOutput=if gate=="NAND" || gate=="NOR" then name=="out" else name=="and"
                    (id,next)=addRegion {bare | expression=if isOutput then expression expr else ""} (position px py) acc
                in (Dict.insert name id known,next)
            (ids,withNodes)=List.foldl addNode (Dict.fromList [("x",x),("y",y)],withY) nodes
            get name=Dict.get name ids |> Maybe.withDefault x
            edges=[("x","s1"),("s1","and"),("y","s2"),("s2","and"),("s1","s2"),("l","x"),("l","d1"),("d1","and"),("r","y"),("r","d2"),("d2","and")] ++ (if gate=="NAND" || gate=="NOR" then [("and","out")] else [])
            connected=List.foldl (\(a,b) -> join (get a) (get b)) withNodes edges
            inverted=gate=="OR" || gate=="NOR"
            palette=[("x",2,(70,20)),("y",2,(170,20)),("and",2,(150,158)),("l",1,(8,18)),("r",1,(232,18)),("d1",0,(5,155)),("d2",0,(235,155))] ++ (if gate=="NAND" || gate=="NOR" then [("out",2,(170,205))] else [])
            addClue (name,color,(px,py)) acc=
                let actual=if inverted && color/=2 then 1-color else color
                    (id,next)=addRegion {bare | constant=Just actual} (position px py) acc
                in join (get name) id next
            completed=List.foldl addClue connected palette
        in (get (if gate=="NAND" || gate=="NOR" then "out" else "and"),completed)

build : Int -> Expr -> Map
build =
    buildCells False


{-| Compile the formula graph first, then thicken each embedded vertex and
its incident half-edges into a single cell. Each edge's two halves terminate
at the same contact segment. Clearance from unrelated vertices and edges
keeps non-neighbors apart; routed anchors belonging to one node are merged.
-}
buildOrganic : Int -> Expr -> Map
buildOrganic =
    buildCells True


buildCells : Bool -> Int -> Expr -> Map
buildCells organic seed source =
    let
        expr=case source of
            Var _ -> Not (Not source)
            _ -> source
        size=measure expr
        (outputAnchor,network)=buildTree expr 25 25 {anchors=[],edges=[],info=[]}
        output=(anchorAt outputAnchor network).region
        anchors=network.anchors
        point id=(anchorAt id network).point
        incident id=network.edges |> List.filter (\edge -> edge.a==id || edge.b==id)
        other id edge=if edge.a==id then edge.b else edge.a
        clearance anchor=
            let others=anchors |> List.filter (\a -> a.id/=anchor.id) |> List.map (\a -> distance anchor.point a.point)
                lines=network.edges |> List.filter (\e -> e.a/=anchor.id && e.b/=anchor.id) |> List.map (\e -> segmentDistance anchor.point (point e.a) (point e.b))
            in min (if organic then 24 else 17) ((if organic then 0.44 else 0.32) * (List.minimum (others++lines) |> Maybe.withDefault 40))
        radii=List.map (\anchor -> (anchor.id,clearance anchor * (0.91+0.08*noise (toFloat (seed*97+anchor.id*23))))) anchors |> Dict.fromList
        radius id=Dict.get id radii |> Maybe.withDefault 1
        angle id edge=let a=point id
                          b=point (other id edge)
                      in atan2 (b.y-a.y) (b.x-a.x)
        gap id edge=
            incident id |> List.filter ((/=) edge) |> List.map (\e -> let delta=abs (angle id e-angle id edge) in min delta (2*pi-delta)) |> List.minimum |> Maybe.withDefault (2*pi)
        width edge=min (radius edge.a * min (if organic then 0.68 else 0.45) (sin (min (pi/2) (gap edge.a edge/3)))) (radius edge.b * min (if organic then 0.68 else 0.45) (sin (min (pi/2) (gap edge.b edge/3))))
        pieces anchor=
            let sorted=incident anchor.id |> List.sortBy (angle anchor.id)
                r=radius anchor.id
                onCircle theta=
                    let radial=if organic then r * (0.94 + 0.06 * sin (3*theta + toFloat (seed + anchor.id))) else r
                    in {x=anchor.point.x+radial*cos theta,y=anchor.point.y+radial*sin theta}
                section edge next=
                    let a=anchor.point
                        b=point (other anchor.id edge)
                        theta=angle anchor.id edge
                        nextTheta=angle anchor.id next
                        half=width edge
                        alpha=asin (min 0.99 (half / max 0.000001 r))
                        nextAlpha=asin (min 0.99 (width next / max 0.000001 r))
                        finish=(if nextTheta<=theta then nextTheta+2*pi else nextTheta)-nextAlpha
                        begin=theta+alpha
                        mid={x=(a.x+b.x)/2,y=(a.y+b.y)/2}
                        cap sign={x=mid.x-sign*sin theta*half,y=mid.y+sign*cos theta*half}
                        samples=max 2 (ceiling ((finish-begin)/(pi/12)))
                    in [onCircle (theta-alpha),cap -1,cap 1] ++ List.map (\i -> onCircle (begin+(finish-begin)*toFloat i/toFloat samples)) (List.range 0 samples)
            in case sorted of
                [] -> List.map (\i -> onCircle (2*pi*toFloat i/24)) (List.range 0 23)
                first::_ -> List.concat (List.map2 section sorted (List.drop 1 sorted++[first]))
        regions=List.indexedMap (\id info ->
            let members=List.filter (\a -> a.region==id) anchors
                polygons=List.map pieces members
                neighbors=network.edges |> List.filterMap (\e ->
                    let
                        a=(anchorAt e.a network).region
                        b=(anchorAt e.b network).region
                    in if a==id && b/=id then Just b else if b==id && a/=id then Just a else Nothing) |> unique
                center=members |> List.head |> Maybe.map .point |> Maybe.withDefault {x=0,y=0}
            in {id=id,polygon=union polygons,center=center,neighbors=neighbors,input=info.input,constant=info.constant,expression=info.expression}) network.info
    in {regions=regions,output=output,width=size.width+50,height=size.height+50}

noise : Float -> Float
noise x = let n=sin x*43758.5453 in n-toFloat (floor n)

distance : Point -> Point -> Float
distance a b = sqrt ((a.x-b.x)^2+(a.y-b.y)^2)

segmentDistance : Point -> Point -> Point -> Float
segmentDistance p a b =
    let dx=b.x-a.x
        dy=b.y-a.y
        t=clamp 0 1 (((p.x-a.x)*dx+(p.y-a.y)*dy)/max 0.000001 (dx*dx+dy*dy))
    in distance p {x=a.x+t*dx,y=a.y+t*dy}

unique : List Int -> List Int
unique list=Dict.fromList (List.map (\id -> (id,())) list) |> Dict.keys

key : Point -> String
key p=String.fromInt (round (p.x*1000000)) ++ "," ++ String.fromInt (round (p.y*1000000))

union : List (List Point) -> List Point
union polygons =
    let
        addEdge (a,b) acc=
            let ka=key a
                kb=key b
                edgeKey=if ka<kb then ka++"/"++kb else kb++"/"++ka
            in if ka==kb then acc else if Dict.member edgeKey acc then Dict.remove edgeKey acc else Dict.insert edgeKey (a,b) acc
        addPolygon poly acc=List.foldl addEdge acc (List.map2 Tuple.pair poly (List.drop 1 poly++List.take 1 poly))
        edges=List.foldl addPolygon Dict.empty polygons |> Dict.values
        outgoing=List.map (\(a,b) -> (key a,(a,b))) edges |> Dict.fromList
        walk current remaining result=if remaining<=0 then List.reverse result else
            case Dict.get current outgoing of
                Nothing -> List.reverse result
                Just (a,b) -> walk (key b) (remaining-1) (a::result)
    in case edges of
        [] -> []
        (start,_)::_ -> walk (key start) (List.length edges) []
