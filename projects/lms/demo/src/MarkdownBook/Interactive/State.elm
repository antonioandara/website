module MarkdownBook.Interactive.State exposing
    ( State
    , empty
    , updateBinaryCalculator
    , updateBooleanAlgebra
    , updateTruthTable
    )

import Dict exposing (Dict)
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.TruthTable as TruthTable


type alias State =
    { booleanAlgebra : Dict String BooleanAlgebra.State
    , binaryCalculators : Dict String BinaryCalculator.State
    , truthTables : Dict String TruthTable.State
    }


empty : State
empty =
    { booleanAlgebra = Dict.empty
    , binaryCalculators = Dict.empty
    , truthTables = Dict.empty
    }


updateBooleanAlgebra : String -> BooleanAlgebra.Msg -> State -> State
updateBooleanAlgebra id msg state =
    { state
        | booleanAlgebra =
            Dict.update id
                (\maybeWidget ->
                    maybeWidget
                        |> Maybe.withDefault BooleanAlgebra.defaultState
                        |> BooleanAlgebra.update msg
                        |> Just
                )
                state.booleanAlgebra
    }


updateBinaryCalculator : String -> BinaryCalculator.Msg -> State -> State
updateBinaryCalculator id msg state =
    { state
        | binaryCalculators =
            Dict.update id
                (\maybeWidget ->
                    maybeWidget
                        |> Maybe.withDefault BinaryCalculator.defaultState
                        |> BinaryCalculator.update msg
                        |> Just
                )
                state.binaryCalculators
    }


updateTruthTable : String -> TruthTable.Msg -> State -> State
updateTruthTable id msg state =
    { state
        | truthTables =
            Dict.update id
                (\maybeWidget ->
                    maybeWidget
                        |> Maybe.withDefault TruthTable.defaultState
                        |> TruthTable.update msg
                        |> Just
                )
                state.truthTables
    }
