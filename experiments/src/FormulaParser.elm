module FormulaParser exposing
    ( Expr(..)
    , collectVariables
    , evaluate
    , parse
    , buildTruthTable
    )

import Dict exposing (Dict)
import Parser exposing ((|.), (|=), Parser)
import Set

{- Recursive-descent parser for Boolean expressions.

Supports variables (a-z, A-Z, single or multi-letter), operators ! (NOT), & (AND), | (OR), parentheses.

  Grammar
    expr     = orExpr
    orExpr   = andExpr ('|' andExpr)*
    andExpr  = notExpr ('&' notExpr)*
    notExpr  = '!' notExpr | atom
    atom     = VAR | '(' expr ')'
    VAR      = [a-zA-Z]+
-}

-- AST
type Expr
    = Var String
    | Not Expr
    | And Expr Expr
    | Or Expr Expr


--  Parser

{-  Parse a string into a boolean expression AST.
    parse "!(a & b)"
    --> Ok (Not (And (Var "a") (Var "b")))

    parse "a | b & c"
    --> Ok (Or (Var "a") (And (Var "b") (Var "c")))
-}
parse : String -> Result (List Parser.DeadEnd) Expr
parse input =
    Parser.run exprParser input


exprParser : Parser Expr
exprParser =
    Parser.succeed identity
        |. Parser.spaces
        |= Parser.lazy (\() -> orExpr)
        |. Parser.spaces
        |. Parser.end


{-  orExpr = andExpr ('|' orExpr)?
    Right-recursive. Semantically equivalent to left-recursive for OR since it's associative.
-}
orExpr : Parser Expr
orExpr =
    Parser.lazy (\() ->
        andExpr
            |> Parser.andThen
                (\left ->
                    Parser.oneOf
                        [ Parser.backtrackable
                            (Parser.succeed (Or left)
                                |. Parser.spaces
                                |. Parser.symbol "|"
                                |. Parser.spaces
                                |= Parser.lazy (\() -> orExpr)
                            )
                        , Parser.succeed left
                        ]
                )
    )


{-  andExpr = notExpr ('&' andExpr)?
    Right-recursive. Semantically equivalent to left-recursive for AND.
-}
andExpr : Parser Expr
andExpr =
    Parser.lazy (\() ->
        notExpr
            |> Parser.andThen
                (\left ->
                    Parser.oneOf
                        [ Parser.backtrackable
                            (Parser.succeed (And left)
                                |. Parser.spaces
                                |. Parser.symbol "&"
                                |. Parser.spaces
                                |= Parser.lazy (\() -> andExpr)
                            )
                        , Parser.succeed left
                        ]
                )
    )


notExpr : Parser Expr
notExpr =
    Parser.oneOf
        [ Parser.succeed Not
            |. Parser.symbol "!"
            |. Parser.spaces
            |= Parser.lazy (\() -> notExpr)
        , atom
        ]


atom : Parser Expr
atom =
    Parser.oneOf
        [ Parser.succeed identity
            |. Parser.symbol "("
            |. Parser.spaces
            |= Parser.lazy (\() -> orExpr)
            |. Parser.spaces
            |. Parser.symbol ")"
        , Parser.map Var variable
        ]


variable : Parser String
variable =
    Parser.variable
        { start = Char.isAlpha
        , inner = Char.isAlpha
        , reserved = Set.empty
        }

--  Queries

{-  Collect all variable names from an AST.

    collectVariables (parse "!(a & b)" |> Result.withDefault (Var ""))
    --> ["a", "b"]

-}
collectVariables : Expr -> List String
collectVariables ast =
    collectVariableSet ast
        |> Set.toList


collectVariableSet : Expr -> Set.Set String
collectVariableSet ast =
    case ast of
        Var name ->
            Set.singleton name

        Not inner ->
            collectVariableSet inner

        And left right ->
            Set.union (collectVariableSet left) (collectVariableSet right)

        Or left right ->
            Set.union (collectVariableSet left) (collectVariableSet right)

-- Eval
{-  Evaluate a boolean expression given an assignment of variables to truth values.

    evaluate (parse "a | b" |> Result.withDefault (Var "")) (Dict.fromList [("a", True), ("b", False)])
    --> True

-}
evaluate : Expr -> Dict String Bool -> Bool
evaluate ast assignment =
    case ast of
        Var name ->
            Dict.get name assignment |> Maybe.withDefault False

        Not inner ->
            not (evaluate inner assignment)

        And left right ->
            evaluate left assignment && evaluate right assignment

        Or left right ->
            evaluate left assignment || evaluate right assignment


--  Truth table creation

{-  A single row in a truth table: a variable assignment and the result of
    evaluating the expression under that assignment.
-}
type alias TruthRow =
    { assignment : Dict String Bool
    , result : Bool
    }


{-  Build the complete truth table for a boolean expression.

    buildTruthTable (parse "a | b" |> Result.withDefault (Var ""))
    --> [ { assignment = Dict.fromList [("a",False),("b",False)], result = False }
    --> , { assignment = Dict.fromList [("a",False),("b",True)],  result = True  }
    --> , { assignment = Dict.fromList [("a",True), ("b",False)], result = True  }
    --> , { assignment = Dict.fromList [("a",True), ("b",True)],  result = True  }
    --> ]

-}
buildTruthTable : Expr -> List TruthRow
buildTruthTable ast =
    let
        vars : List String
        vars =
            collectVariables ast

        varCount : Int
        varCount =
            List.length vars

        rowCount : Int
        rowCount =
            2 ^ varCount

        -- Generate assignment for row index `mask`.
        -- mask ranges from 0 to 2^n - 1.
        -- Bit position i (from left) maps to vars[i].
        assignmentForMask : Int -> Dict String Bool
        assignmentForMask mask =
            List.indexedMap
                (\i var ->
                    ( var, bitAt mask (varCount - 1 - i) )
                )
                vars
                |> Dict.fromList
    in
    List.range 0 (rowCount - 1)
        |> List.map
            (\mask ->
                let
                    assignment =
                        assignmentForMask mask
                in
                { assignment = assignment
                , result = evaluate ast assignment
                }
            )


bitAt : Int -> Int -> Bool
bitAt mask bitPos =
    modBy 2 (mask // (2 ^ bitPos)) == 1
