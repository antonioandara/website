module MarkdownBook.Model exposing
    ( Book
    , Chapter
    , ChapterGroup
    , Exercise
    , ExerciseKind(..)
    , ExerciseState
    , Feedback
    , LearnerState
    , Quiz
    , QuizKind(..)
    , QuizOption
    , QuizState
    , emptyLearnerState
    )

import Dict exposing (Dict)
import Set exposing (Set)


type alias Book =
    { title : String
    , author : String
    , slug : String
    , summary : String
    , chapters : List Chapter
    , groups : List ChapterGroup
    }


type alias ChapterGroup =
    { title : String
    , chapterSlugs : List String
    }


type alias Chapter =
    { title : String
    , slug : String
    , summary : String
    , path : String
    , body : String
    }


type QuizKind
    = SingleChoice
    | MultipleChoice
    | ShortAnswer


type alias Quiz =
    { id : String
    , question : String
    , kind : QuizKind
    , options : List QuizOption
    , answer : Maybe String
    , feedback : Feedback
    }


type alias QuizOption =
    { text : String
    , correct : Bool
    }


type alias Feedback =
    { correct : Maybe String
    , incorrect : Maybe String
    , submitted : Maybe String
    }


type ExerciseKind
    = FreeResponse
    | CodeExercise


type alias Exercise =
    { id : String
    , prompt : String
    , kind : ExerciseKind
    , language : Maybe String
    , placeholder : Maybe String
    , starter : Maybe String
    , feedback : Feedback
    }


type alias LearnerState =
    { quizzes : Dict String QuizState
    , exercises : Dict String ExerciseState
    , completedChapters : Set String
    }


type alias QuizState =
    { selected : Set String
    , response : String
    , submitted : Bool
    }


type alias ExerciseState =
    { response : String
    , submitted : Bool
    }


emptyLearnerState : LearnerState
emptyLearnerState =
    { quizzes = Dict.empty
    , exercises = Dict.empty
    , completedChapters = Set.empty
    }
