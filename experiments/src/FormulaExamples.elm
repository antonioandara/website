module FormulaExamples exposing (all)

{-| Shared, named examples for both formula views. -}
all : List { name : String, source : String }
all =
    [ { name = "NAND", source = "!(a & b)" }
    , { name = "OR", source = "a | b" }
    , { name = "AND", source = "a & b" }
    , { name = "NOR", source = "!(a | b)" }
    , { name = "Exclusive OR", source = "(a | b) & !(a & b)" }
    , { name = "Implication", source = "!a | b" }
    , { name = "Multiplexer", source = "(!s & a) | (s & b)" }
    , { name = "Majority of three", source = "(a & b) | (a & c) | (b & c)" }
    , { name = "Enabled OR", source = "(a | b) & !c" }
    , { name = "Three pairs", source = "(a & b) | (c & d) | (e & f)" }
    , { name = "Always true", source = "a | !a" }
    , { name = "Contradiction", source = "a & !a" }
    ]
