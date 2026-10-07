module MarkdownBook.Primitive exposing
    ( parseExercise
    , parseInfo
    , parseQuiz
    )

import MarkdownBook.Model exposing (Exercise, ExerciseKind(..), Feedback, Quiz, QuizKind(..), QuizOption)


parseInfo : Maybe String -> ( String, Maybe String )
parseInfo maybeLanguage =
    case maybeLanguage |> Maybe.withDefault "" |> String.words of
        name :: rest ->
            ( name, findId rest )

        [] ->
            ( "", Nothing )


findId : List String -> Maybe String
findId words =
    words
        |> List.filterMap
            (\word ->
                if String.startsWith "id=" word then
                    word
                        |> String.dropLeft 3
                        |> trimQuotes
                        |> Just

                else
                    Nothing
            )
        |> List.head


parseQuiz : Maybe String -> String -> Quiz
parseQuiz maybeId body =
    let
        fields =
            parseFields body

        options =
            parseOptions body
    in
    { id = Maybe.withDefault (field "id" fields |> Maybe.withDefault "quiz") maybeId
    , question = field "question" fields |> Maybe.withDefault "Untitled quiz"
    , kind = field "type" fields |> Maybe.map quizKindFromString |> Maybe.withDefault SingleChoice
    , options = options
    , answer = field "answer" fields
    , feedback = parseFeedback body
    }


parseExercise : Maybe String -> String -> Exercise
parseExercise maybeId body =
    let
        fields =
            parseFields body
    in
    { id = Maybe.withDefault (field "id" fields |> Maybe.withDefault "exercise") maybeId
    , prompt = field "prompt" fields |> Maybe.withDefault "Untitled exercise"
    , kind = field "kind" fields |> Maybe.map exerciseKindFromString |> Maybe.withDefault FreeResponse
    , language = field "language" fields
    , placeholder = field "placeholder" fields
    , starter = blockField "starter" body
    , feedback = parseFeedback body
    }


type alias Fields =
    List ( String, String )


parseFields : String -> Fields
parseFields body =
    body
        |> String.lines
        |> parseFieldsHelp Nothing []
        |> List.reverse


parseFieldsHelp : Maybe String -> Fields -> List String -> Fields
parseFieldsHelp currentSection fields lines =
    case lines of
        [] ->
            fields

        line :: rest ->
            let
                trimmed =
                    String.trim line
            in
            if trimmed == "options:" || trimmed == "feedback:" then
                parseFieldsHelp (Just (String.dropRight 1 trimmed)) fields rest

            else if isListItem trimmed || String.startsWith "correct:" trimmed || String.startsWith "incorrect:" trimmed || String.startsWith "submitted:" trimmed then
                parseFieldsHelp currentSection fields rest

            else if String.endsWith ": |" trimmed then
                parseFieldsHelp (Just "block") fields rest

            else
                case splitKeyValue trimmed of
                    Just pair ->
                        parseFieldsHelp currentSection (pair :: fields) rest

                    Nothing ->
                        parseFieldsHelp currentSection fields rest


field : String -> Fields -> Maybe String
field key fields =
    fields
        |> List.filterMap
            (\( candidate, value ) ->
                if candidate == key then
                    Just value

                else
                    Nothing
            )
        |> List.head


parseOptions : String -> List QuizOption
parseOptions body =
    body
        |> String.lines
        |> parseOptionsHelp [] Nothing
        |> finalizeOption
        |> List.reverse


type alias OptionBuilder =
    { text : Maybe String
    , correct : Maybe Bool
    }


emptyOption : OptionBuilder
emptyOption =
    { text = Nothing, correct = Nothing }


parseOptionsHelp : List QuizOption -> Maybe OptionBuilder -> List String -> ( List QuizOption, Maybe OptionBuilder )
parseOptionsHelp parsed current lines =
    case lines of
        [] ->
            ( parsed, current )

        line :: rest ->
            let
                trimmed =
                    String.trim line
            in
            if String.startsWith "- text:" trimmed then
                parseOptionsHelp
                    (current |> Maybe.map optionFromBuilder |> maybeCons parsed)
                    (Just { emptyOption | text = Just (trimValue (String.dropLeft 7 trimmed)) })
                    rest

            else if String.startsWith "correct:" trimmed then
                parseOptionsHelp
                    parsed
                    (Just
                        (case current of
                            Just builder ->
                                { builder | correct = Just (stringToBool (trimValue (String.dropLeft 8 trimmed))) }

                            Nothing ->
                                { emptyOption | correct = Just (stringToBool (trimValue (String.dropLeft 8 trimmed))) }
                        )
                    )
                    rest

            else
                parseOptionsHelp parsed current rest


finalizeOption : ( List QuizOption, Maybe OptionBuilder ) -> List QuizOption
finalizeOption ( parsed, current ) =
    current
        |> Maybe.map optionFromBuilder
        |> maybeCons parsed


optionFromBuilder : OptionBuilder -> QuizOption
optionFromBuilder builder =
    { text = Maybe.withDefault "Untitled option" builder.text
    , correct = Maybe.withDefault False builder.correct
    }


maybeCons : List a -> Maybe a -> List a
maybeCons list maybeValue =
    case maybeValue of
        Just value ->
            value :: list

        Nothing ->
            list


parseFeedback : String -> Feedback
parseFeedback body =
    let
        feedbackLines =
            body
                |> String.lines
                |> linesAfter "feedback:"
                |> takeWhile (\line -> String.startsWith "  " line || String.trim line == "")

        feedbackFields =
            feedbackLines
                |> List.filterMap (String.trim >> splitKeyValue)
    in
    { correct = field "correct" feedbackFields
    , incorrect = field "incorrect" feedbackFields
    , submitted = field "submitted" feedbackFields
    }


blockField : String -> String -> Maybe String
blockField name body =
    let
        marker =
            name ++ ": |"
    in
    body
        |> String.lines
        |> linesAfter marker
        |> takeWhile (\line -> String.startsWith "  " line || String.trim line == "")
        |> List.map stripTwoSpaces
        |> String.join "\n"
        |> emptyToNothing


linesAfter : String -> List String -> List String
linesAfter marker lines =
    case lines of
        [] ->
            []

        line :: rest ->
            if String.trim line == marker then
                rest

            else
                linesAfter marker rest


splitKeyValue : String -> Maybe ( String, String )
splitKeyValue line =
    case String.indexes ":" line of
        index :: _ ->
            Just
                ( line |> String.left index |> String.trim
                , line |> String.dropLeft (index + 1) |> trimValue
                )

        [] ->
            Nothing


quizKindFromString : String -> QuizKind
quizKindFromString value =
    case value of
        "multiple-choice" ->
            MultipleChoice

        "short-answer" ->
            ShortAnswer

        _ ->
            SingleChoice


exerciseKindFromString : String -> ExerciseKind
exerciseKindFromString value =
    case value of
        "code" ->
            CodeExercise

        _ ->
            FreeResponse


isListItem : String -> Bool
isListItem line =
    String.startsWith "- " line


stringToBool : String -> Bool
stringToBool value =
    String.toLower value == "true"


trimValue : String -> String
trimValue =
    String.trim >> trimQuotes


trimQuotes : String -> String
trimQuotes value =
    value
        |> trimChar '"'
        |> trimChar '\''


trimChar : Char -> String -> String
trimChar char value =
    let
        withoutLeft =
            if String.startsWith (String.fromChar char) value then
                String.dropLeft 1 value

            else
                value
    in
    if String.endsWith (String.fromChar char) withoutLeft then
        String.dropRight 1 withoutLeft

    else
        withoutLeft


stripTwoSpaces : String -> String
stripTwoSpaces line =
    if String.startsWith "  " line then
        String.dropLeft 2 line

    else
        line


emptyToNothing : String -> Maybe String
emptyToNothing value =
    if String.trim value == "" then
        Nothing

    else
        Just value


takeWhile : (a -> Bool) -> List a -> List a
takeWhile predicate list =
    case list of
        [] ->
            []

        first :: rest ->
            if predicate first then
                first :: takeWhile predicate rest

            else
                []
