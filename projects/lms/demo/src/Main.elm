port module Main exposing (main)

import Browser
import Dict
import Element
import Generated.Book
import Json.Decode as Decode
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.State as InteractiveState
import MarkdownBook.Interactive.TruthTable as TruthTable
import MarkdownBook.Model exposing (Book, Chapter, LearnerState, QuizState, emptyLearnerState)
import MarkdownBook.View
import MarkdownBook.View.MarkdownStyle as MarkdownStyle
import MarkdownBook.View.Theme as Theme exposing (Theme(..))
import Set


type alias Model =
    { book : Book
    , activeSlug : String
    , learner : LearnerState
    , sidebarVisible : Bool
    , theme : Theme
    , interactives : InteractiveState.State
    }


type Msg
    = SelectChapter String
    | ToggleChapterComplete String
    | ToggleSidebar
    | ToggleTheme
    | SetTheme String
    | SelectQuizOption String String Bool
    | UpdateQuizResponse String String
    | SubmitQuiz String
    | UpdateExercise String String
    | SubmitExercise String
    | BooleanAlgebraMsg String BooleanAlgebra.Msg
    | BinaryCalculatorMsg String BinaryCalculator.Msg
    | TruthTableMsg String TruthTable.Msg


port persistTheme : String -> Cmd msg


port themeChanged : (String -> msg) -> Sub msg


main : Program Decode.Value Model Msg
main =
    Browser.document
        { init = \flags ->
            let
                narrow = Decode.decodeValue (Decode.field "narrow" Decode.bool) flags |> Result.withDefault False
                theme = Decode.decodeValue (Decode.field "theme" Decode.string) flags |> Result.withDefault "dark"
            in
            ( { initModel | sidebarVisible = not narrow, theme = themeFromName theme }, Cmd.none )
        , update = update
        , subscriptions = \_ -> themeChanged SetTheme
        , view = view
        }


initModel : Model
initModel =
    { book = Generated.Book.book
    , activeSlug =
        Generated.Book.book.chapters
            |> List.head
            |> Maybe.map .slug
            |> Maybe.withDefault ""
    , learner = emptyLearnerState
    , sidebarVisible = True
    , theme = NocturneFieldnotes
    , interactives = InteractiveState.empty
    }


themeFromName : String -> Theme
themeFromName name =
    if name == "light" then FieldnotesLight else NocturneFieldnotes


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SelectChapter slug ->
            ( { model | activeSlug = slug }, Cmd.none )

        ToggleChapterComplete slug ->
            let
                learner =
                    model.learner

                completed =
                    learner.completedChapters
            in
            ( { model
                | learner =
                    { learner
                        | completedChapters =
                            if Set.member slug completed then
                                Set.remove slug completed

                            else
                                Set.insert slug completed
                    }
              }
            , Cmd.none
            )

        ToggleSidebar ->
            ( { model | sidebarVisible = not model.sidebarVisible }, Cmd.none )

        ToggleTheme ->
            let
                theme = if model.theme == FieldnotesLight then NocturneFieldnotes else FieldnotesLight
            in
            ( { model | theme = theme }, persistTheme (if theme == FieldnotesLight then "light" else "dark") )

        SetTheme name ->
            ( { model | theme = themeFromName name }, Cmd.none )

        SelectQuizOption quizId option allowMultiple ->
            ( { model | learner = updateQuiz quizId (toggleOption option allowMultiple) model.learner }
            , Cmd.none
            )

        UpdateQuizResponse quizId response ->
            ( { model | learner = updateQuiz quizId (\state -> { state | response = response, submitted = False }) model.learner }
            , Cmd.none
            )

        SubmitQuiz quizId ->
            ( { model | learner = updateQuiz quizId (\state -> { state | submitted = True }) model.learner }
            , Cmd.none
            )

        UpdateExercise exerciseId response ->
            ( { model | learner = updateExercise exerciseId (\state -> { state | response = response, submitted = False }) model.learner }
            , Cmd.none
            )

        SubmitExercise exerciseId ->
            ( { model | learner = updateExercise exerciseId (\state -> { state | submitted = True }) model.learner }
            , Cmd.none
            )

        BooleanAlgebraMsg id interactiveMsg ->
            ( { model | interactives = InteractiveState.updateBooleanAlgebra id interactiveMsg model.interactives }
            , Cmd.none
            )

        BinaryCalculatorMsg id interactiveMsg ->
            ( { model | interactives = InteractiveState.updateBinaryCalculator id interactiveMsg model.interactives }
            , Cmd.none
            )

        TruthTableMsg id interactiveMsg ->
            ( { model | interactives = InteractiveState.updateTruthTable id interactiveMsg model.interactives }
            , Cmd.none
            )


toggleOption : String -> Bool -> QuizState -> QuizState
toggleOption option allowMultiple state =
    if allowMultiple then
        { state
            | selected =
                if Set.member option state.selected then
                    Set.remove option state.selected

                else
                    Set.insert option state.selected
            , submitted = False
        }

    else
        { state | selected = Set.singleton option, submitted = False }


updateQuiz : String -> (QuizState -> QuizState) -> LearnerState -> LearnerState
updateQuiz quizId transform learner =
    { learner
        | quizzes =
            Dict.update quizId
                (\maybeState ->
                    maybeState
                        |> Maybe.withDefault { selected = Set.empty, response = "", submitted = False }
                        |> transform
                        |> Just
                )
                learner.quizzes
    }


updateExercise : String -> ({ response : String, submitted : Bool } -> { response : String, submitted : Bool }) -> LearnerState -> LearnerState
updateExercise exerciseId transform learner =
    { learner
        | exercises =
            Dict.update exerciseId
                (\maybeState ->
                    maybeState
                        |> Maybe.withDefault { response = "", submitted = False }
                        |> transform
                        |> Just
                )
                learner.exercises
    }


view : Model -> Browser.Document Msg
view model =
    { title = model.book.title
    , body =
        [ Element.layout
            [ Element.width Element.fill
            , Element.height Element.fill
            ]
            (MarkdownBook.View.viewBook (viewConfig model) model.book model.learner (activeChapter model))
        ]
    }


viewConfig : Model -> MarkdownBook.View.Config Msg
viewConfig model =
    { onSelectChapter = SelectChapter
    , onToggleChapterComplete = ToggleChapterComplete
    , onToggleSidebar = ToggleSidebar
    , onToggleTheme = ToggleTheme
    , onSelectQuizOption = SelectQuizOption
    , onUpdateQuizResponse = UpdateQuizResponse
    , onSubmitQuiz = SubmitQuiz
    , onUpdateExercise = UpdateExercise
    , onSubmitExercise = SubmitExercise
    , onBooleanAlgebra = BooleanAlgebraMsg
    , onBinaryCalculator = BinaryCalculatorMsg
    , onTruthTable = TruthTableMsg
    , sidebarVisible = model.sidebarVisible
    , theme = model.theme
    , themeInfo = Theme.themeInfo model.theme
    , markdownStyle = MarkdownStyle.default
    , interactives = model.interactives
    }


activeChapter : Model -> Chapter
activeChapter model =
    model.book.chapters
        |> List.filter (\chapter -> chapter.slug == model.activeSlug)
        |> List.head
        |> Maybe.withDefault
            (model.book.chapters
                |> List.head
                |> Maybe.withDefault
                    { title = "No chapters"
                    , slug = ""
                    , summary = "Add chapters to book/book.md."
                    , path = ""
                    , body = "# No chapters"
                    }
            )
