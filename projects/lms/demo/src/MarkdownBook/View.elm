module MarkdownBook.View exposing (Config, viewBook)

import Element exposing (Element)
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.State as InteractiveState
import MarkdownBook.Interactive.TruthTable as TruthTable
import MarkdownBook.Model exposing (Book, Chapter, LearnerState)
import MarkdownBook.View.Layout as Layout
import MarkdownBook.View.MarkdownStyle as MarkdownStyle
import MarkdownBook.View.Theme exposing (Theme, ThemeInfo)


type alias Config msg =
    { onSelectChapter : String -> msg
    , onToggleChapterComplete : String -> msg
    , onToggleSidebar : msg
    , onToggleTheme : msg
    , onSelectQuizOption : String -> String -> Bool -> msg
    , onUpdateQuizResponse : String -> String -> msg
    , onSubmitQuiz : String -> msg
    , onUpdateExercise : String -> String -> msg
    , onSubmitExercise : String -> msg
    , onBooleanAlgebra : String -> BooleanAlgebra.Msg -> msg
    , onBinaryCalculator : String -> BinaryCalculator.Msg -> msg
    , onTruthTable : String -> TruthTable.Msg -> msg
    , sidebarVisible : Bool
    , theme : Theme
    , themeInfo : ThemeInfo
    , markdownStyle : MarkdownStyle.Settings
    , interactives : InteractiveState.State
    }


viewBook : Config msg -> Book -> LearnerState -> Chapter -> Element msg
viewBook =
    Layout.viewBook
