module LogicCircuit exposing (Graph, Node, State, compile, frames, initial, inputName)

import Dict exposing (Dict)
import FormulaParser exposing (Expr(..))


type Operation = Input String | Invert | Conjunction | Disjunction | Output

type alias Node = { id : Int, operation : Operation, inputs : List Int, depth : Int, label : String, expression : String }
type alias Graph = { nodes : List Node, output : Int }
type alias State = { graph : Graph, values : Dict Int Bool, changed : List Int, caption : String }

inputName : Node -> Maybe String
inputName node = case node.operation of
    Input name -> Just name
    _ -> Nothing

compile : Expr -> Graph
compile expr =
    let
        append operation label inputs nodes =
            let id=List.length nodes
                depth=inputs |> List.filterMap (\i -> List.drop i nodes |> List.head |> Maybe.map .depth) |> List.maximum |> Maybe.map ((+) 1) |> Maybe.withDefault 0
                terms=inputs |> List.filterMap (\i -> List.drop i nodes |> List.head |> Maybe.map .expression)
                expression=case operation of
                    Input name -> name
                    Invert -> "!(" ++ String.join "" terms ++ ")"
                    Conjunction -> "(" ++ String.join " & " terms ++ ")"
                    Disjunction -> "(" ++ String.join " | " terms ++ ")"
                    Output -> String.join "" terms
            in (id,nodes ++ [{id=id,operation=operation,label=label,inputs=inputs,depth=depth,expression=expression}])
        build ast nodes = case ast of
            Var name ->
                case List.filter (\n -> inputName n == Just name) nodes |> List.head of
                    Just node -> (node.id,nodes)
                    Nothing -> append (Input name) name [] nodes
            Not child ->
                let (id,next)=build child nodes in append Invert "NOT" [id] next
            And a b -> binary Conjunction "AND" a b nodes
            Or a b -> binary Disjunction "OR" a b nodes
        binary operation label a b nodes =
            let (left,first)=build a nodes
                (right,second)=build b first
            in append operation label [left,right] second
        (root,built)=build expr []
        (output,complete)=append Output "OUT" [root] built
    in {nodes=complete,output=output}

value : Dict String Bool -> Dict Int Bool -> Node -> Bool
value assignment values node =
    let inputs=List.map (\id -> Dict.get id values |> Maybe.withDefault False) node.inputs
    in case node.operation of
        Input name -> Dict.get name assignment |> Maybe.withDefault False
        Invert -> not (List.head inputs |> Maybe.withDefault False)
        Conjunction -> List.all identity inputs
        Disjunction -> List.any identity inputs
        Output -> List.head inputs |> Maybe.withDefault False

initial : Graph -> Dict String Bool -> State
initial graph assignment =
    {graph=graph,values=List.foldl (\node values -> Dict.insert node.id (value assignment values node) values) Dict.empty graph.nodes,changed=[],caption="Settled. Gate values follow the formula; shared borders constrain map colors."}

{-| Inputs change first. Only gates whose computed values change emit a new
signal. Gates are visited by dependency depth, so downstream regions never
update before their incoming signals. The output is never supplied externally.
-}
frames : Graph -> Dict String Bool -> Maybe State -> List State
frames graph assignment previous =
    case previous of
        Nothing -> [initial graph assignment]
        Just old ->
            if old.graph /= graph then [initial graph assignment] else
            let
                updateDepth depth state =
                    let nodes=List.filter (\node -> node.depth == depth) graph.nodes
                        changes=nodes |> List.filterMap (\node -> let next=value assignment state.values node in if Dict.get node.id state.values == Just next then Nothing else Just (node.id,next))
                    in {graph=graph,values=List.foldl (\(id,next) -> Dict.insert id next) state.values changes,changed=List.map Tuple.first changes,caption=if depth==0 then "Inputs changed. Updating dependent gate values." else "Propagating through gate layer " ++ String.fromInt depth ++ "."}
                advance depth (state,steps) =
                    let next=updateDepth depth state
                    in (next,if List.isEmpty next.changed then steps else steps ++ [next])
                maxDepth=graph.nodes |> List.map .depth |> List.maximum |> Maybe.withDefault 0
                (last,completedSteps)=List.foldl advance (old,[]) (List.range 0 maxDepth)
            in if List.isEmpty completedSteps then [{old | changed=[],caption="Settled. No signal changed."}]
               else completedSteps ++ [{last | changed=[],caption="Settled. Unchanged gate outputs stop propagation along that branch."}]
