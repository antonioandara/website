module ParsingTrace exposing (Step, walkthrough)

import FormulaParser exposing (Expr(..))


type alias Step =
    { rule : String
    , action : String
    , explanation : String
    , cursor : Int
    , depth : Int
    , built : Maybe Expr
    , forest : List Expr
    }


type alias State =
    { remaining : List String
    , cursor : Int
    , steps : List Step
    , forest : List Expr
    }


{-| A teaching walkthrough of successful parses. Follows the same
right-recursive grammar as FormulaParser, preserving source parentheses.
FormulaParser remains the authority for validating input.
-}
walkthrough : List String -> List Step
walkthrough tokens =
    let
        initial =
            emit 0 "exprParser" "Start" "Read the expression. NOT binds first, then AND, then OR; parentheses override that order." Nothing
                { remaining = tokens, cursor = 0, steps = [], forest = [] }
    in
    case parseOr 1 initial of
        Just ( ast, state ) ->
            if List.isEmpty state.remaining then
                emit 0 "exprParser" "Complete" "No input remains. The finished tree records which operations belong together." (Just ast) state
                    |> .steps
                    |> List.reverse

            else
                []

        Nothing ->
            []


emit : Int -> String -> String -> String -> Maybe Expr -> State -> State
emit depth rule action explanation built state =
    let
        forest =
            case ( action, built ) of
                ( "Read variable", Just expr ) ->
                    expr :: state.forest

                ( "Build NOT", Just expr ) ->
                    expr :: List.drop 1 state.forest

                ( "Build AND", Just expr ) ->
                    expr :: List.drop 2 state.forest

                ( "Build OR", Just expr ) ->
                    expr :: List.drop 2 state.forest

                _ ->
                    state.forest
    in
    { state
        | forest = forest
        , steps =
            { rule = rule, action = action, explanation = explanation, cursor = state.cursor, depth = depth, built = built, forest = List.reverse forest }
                :: state.steps
    }


consume : State -> State
consume state =
    { state | remaining = List.drop 1 state.remaining, cursor = state.cursor + 1 }


nextToken : State -> String
nextToken state =
    List.head state.remaining
        |> Maybe.map (\token -> "“" ++ token ++ "”")
        |> Maybe.withDefault "the end"


parseOr : Int -> State -> Maybe ( Expr, State )
parseOr depth state =
    parseBinary depth "orExpr" "|" Or parseAnd parseOr state


parseAnd : Int -> State -> Maybe ( Expr, State )
parseAnd depth state =
    parseBinary depth "andExpr" "&" And parseNot parseAnd state


parseBinary : Int -> String -> String -> (Expr -> Expr -> Expr) -> (Int -> State -> Maybe ( Expr, State )) -> (Int -> State -> Maybe ( Expr, State )) -> State -> Maybe ( Expr, State )
parseBinary depth rule symbol constructor tighter recurse state =
    let
        entered =
            emit depth rule "Left side"
                (if symbol == "|" then
                    "Read the left side first. AND and NOT bind more tightly than OR."

                 else
                    "Read the left side first. NOT binds more tightly than AND."
                )
                Nothing state
    in
    tighter (depth + 1) entered
        |> Maybe.andThen
            (\( left, afterLeft ) ->
                if List.head afterLeft.remaining == Just symbol then
                    let
                        found =
                            emit depth rule "Read operator" ("Read " ++ symbol ++ ". The left side is ready; now read the right side.") Nothing (consume afterLeft)
                    in
                    recurse (depth + 1) found
                        |> Maybe.map
                            (\( right, afterRight ) ->
                                let
                                    combined =
                                        constructor left right
                                in
                                ( combined, emit depth rule (if symbol == "&" then "Build AND" else "Build OR")
                                        (if symbol == "&" then "Join both sides with AND: both must be true." else "Join both sides with OR: at least one must be true.") (Just combined) afterRight )
                            )

                else
                    Just ( left, emit depth rule "Return result" ("Next is " ++ nextToken afterLeft ++ ", not " ++ symbol ++ ". This part is complete; pass its tree back.") (Just left) afterLeft )
            )


parseNot : Int -> State -> Maybe ( Expr, State )
parseNot depth state =
    if List.head state.remaining == Just "!" then
        parseNot (depth + 1) (emit depth "notExpr" "Read NOT" "Read !. First read what it negates: a variable, a group, or another NOT." Nothing (consume state))
            |> Maybe.map
                (\( inner, afterInner ) ->
                    ( Not inner, emit depth "notExpr" "Build NOT" "Add NOT above its child: it reverses that child’s truth value." (Just (Not inner)) afterInner )
                )

    else
        parseAtom (depth + 1) (emit depth "notExpr" "Read an atom" "No ! ahead. Read one unit: a variable or a whole parenthesized group." Nothing state)


parseAtom : Int -> State -> Maybe ( Expr, State )
parseAtom depth state =
    case state.remaining of
        "(" :: _ ->
            parseOr (depth + 1) (emit depth "atom" "Open group" "Read (. Parse everything inside as one unit, starting again at OR." Nothing (consume state))
                |> Maybe.andThen
                    (\( inner, afterInner ) ->
                        if List.head afterInner.remaining == Just ")" then
                            Just ( inner, emit depth "atom" "Close group" "Read ). Keep the inner tree; parentheses control grouping, not a new node." (Just inner) (consume afterInner) )

                        else
                            Nothing
                    )

        name :: _ ->
            if String.all Char.isAlpha name then
                Just ( Var name, emit depth "atom" "Read variable" ("Read " ++ name ++ ". Add a leaf: its truth value will come from the input switch.") (Just (Var name)) (consume state) )

            else
                Nothing

        [] ->
            Nothing
