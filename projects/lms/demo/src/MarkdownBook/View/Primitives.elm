module MarkdownBook.View.Primitives exposing
    ( viewBinaryCalculator
    , viewBooleanAlgebra
    , viewCallout
    , viewCircuitEmbed
    , viewExercise
    , viewFeedbackBlock
    , viewQuiz
    , viewReferencedPrimitive
    , viewTruthTable
    , viewVideo
    )

import Dict
import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html
import Html.Attributes as HtmlAttr
import MarkdownBook.Interactive.BinaryCalculator as BinaryCalculator
import MarkdownBook.Interactive.BooleanAlgebra as BooleanAlgebra
import MarkdownBook.Interactive.State as InteractiveState
import MarkdownBook.Interactive.TruthTable as TruthTable
import MarkdownBook.Model exposing (Exercise, ExerciseKind(..), LearnerState, Quiz, QuizKind(..), QuizOption, QuizState)
import MarkdownBook.View.Components exposing (card, feedbackPanel, primitiveKicker)
import MarkdownBook.View.Theme exposing (ChoiceStyle(..), ComponentStyle, Palette, PanelStyle(..), ThemeInfo)
import Set


type alias QuizConfig msg r =
    { r
        | onSelectQuizOption : String -> String -> Bool -> msg
        , onUpdateQuizResponse : String -> String -> msg
        , onSubmitQuiz : String -> msg
        , themeInfo : ThemeInfo
    }


type alias ExerciseConfig msg r =
    { r
        | onUpdateExercise : String -> String -> msg
        , onSubmitExercise : String -> msg
        , themeInfo : ThemeInfo
    }


type alias InteractiveConfig msg r =
    { r
        | onBooleanAlgebra : String -> BooleanAlgebra.Msg -> msg
        , onBinaryCalculator : String -> BinaryCalculator.Msg -> msg
        , onTruthTable : String -> TruthTable.Msg -> msg
        , interactives : InteractiveState.State
    }


viewQuiz : Palette -> QuizConfig msg r -> LearnerState -> Quiz -> Element msg
viewQuiz colors config learner quiz =
    let
        state =
            Dict.get quiz.id learner.quizzes
                |> Maybe.withDefault { selected = Set.empty, response = "", submitted = False }

        correct =
            quizIsCorrect quiz state
    in
    card colors
        (panelAttributes colors config.themeInfo.componentStyle)
        [ primitiveKicker colors "Quiz" quiz.id
        , Element.paragraph [ Font.size 19, Font.bold, Element.spacing 7 ] [ Element.text quiz.question ]
        , case quiz.kind of
            SingleChoice ->
                Element.column [ Element.spacing 10, Element.width Element.fill ]
                    (quiz.options |> List.map (viewChoice colors config quiz state False))

            MultipleChoice ->
                Element.column [ Element.spacing 10, Element.width Element.fill ]
                    (quiz.options |> List.map (viewChoice colors config quiz state True))

            ShortAnswer ->
                Input.text
                    [ Element.width Element.fill
                    , Element.padding 12
                    , Border.rounded 6
                    , Border.width 1
                    , Border.color colors.line
                    ]
                    { onChange = config.onUpdateQuizResponse quiz.id
                    , text = state.response
                    , placeholder = Just (Input.placeholder [] (Element.text "Type your answer"))
                    , label = Input.labelHidden quiz.question
                    }
        , submitRow colors config.onSubmitQuiz quiz.id state.submitted correct
        , if state.submitted then
            viewQuizFeedback colors quiz correct

          else
            Element.none
        ]


viewChoice : Palette -> QuizConfig msg r -> Quiz -> QuizState -> Bool -> QuizOption -> Element msg
viewChoice colors config quiz state allowMultiple option =
    let
        selected =
            Set.member option.text state.selected
    in
    Input.button
        ([ Element.width Element.fill
         , Element.padding 12
         , Element.mouseOver [ Background.color colors.hover ]
         ]
            ++ choiceAttributes colors config.themeInfo.componentStyle selected
        )
        { onPress = Just (config.onSelectQuizOption quiz.id option.text allowMultiple)
        , label =
            Element.row [ Element.spacing 12, Element.width Element.fill ]
                [ Element.el
                    [ Element.width (Element.px 22)
                    , Element.height (Element.px 22)
                    , Border.rounded
                        (if allowMultiple then
                            4

                         else
                            20
                        )
                    , Border.width 2
                    , Border.color
                        (if selected then
                            colors.accent

                         else
                            colors.muted
                        )
                    , Background.color
                        (if selected then
                            colors.accent

                         else
                            colors.white
                        )
                    ]
                    Element.none
                , Element.paragraph [ Element.width Element.fill ] [ Element.text option.text ]
                ]
        }


viewQuizFeedback : Palette -> Quiz -> Bool -> Element msg
viewQuizFeedback colors quiz correct =
    let
        text =
            if correct then
                quiz.feedback.correct |> Maybe.withDefault "Correct."

            else
                quiz.feedback.incorrect |> Maybe.withDefault "Not quite yet."
    in
    feedbackPanel colors correct text


viewExercise : Palette -> ExerciseConfig msg r -> LearnerState -> Exercise -> Element msg
viewExercise colors config learner exercise =
    let
        state =
            Dict.get exercise.id learner.exercises
                |> Maybe.withDefault { response = Maybe.withDefault "" exercise.starter, submitted = False }

        placeholderText =
            exercise.placeholder |> Maybe.withDefault "Write your response"
    in
    card colors
        (panelAttributes colors config.themeInfo.componentStyle)
        [ primitiveKicker colors "Exercise" exercise.id
        , Element.paragraph [ Font.size 18, Font.bold, Element.spacing 6 ] [ Element.text exercise.prompt ]
        , Input.multiline
            [ Element.width Element.fill
            , Element.height
                (Element.px
                    (case exercise.kind of
                        FreeResponse ->
                            132

                        CodeExercise ->
                            220
                    )
                )
            , Element.padding 12
            , Border.rounded config.themeInfo.componentStyle.cornerRadius
            , Border.width 1
            , Border.color colors.line
            , Font.family
                (case exercise.kind of
                    FreeResponse ->
                        [ Font.typeface "Inter", Font.sansSerif ]

                    CodeExercise ->
                        [ Font.monospace ]
                )
            , Background.color colors.paper
            ]
            { onChange = config.onUpdateExercise exercise.id
            , text = state.response
            , placeholder = Just (Input.placeholder [] (Element.text placeholderText))
            , label = Input.labelHidden exercise.prompt
            , spellcheck = exercise.kind == FreeResponse
            }
        , submitRow colors config.onSubmitExercise exercise.id state.submitted True
        , if state.submitted then
            feedbackPanel colors True (exercise.feedback.submitted |> Maybe.withDefault "Submitted.")

          else
            Element.none
        ]


panelAttributes : Palette -> ComponentStyle -> List (Element.Attribute msg)
panelAttributes colors style =
    [ Border.rounded style.cornerRadius
    , Background.color colors.white
    ]
        ++ (case style.panelStyle of
                NakedPanel ->
                    [ Border.width 0
                    , Background.color colors.transparent
                    , Element.padding 0
                    , Element.htmlAttribute (HtmlAttr.style "box-shadow" "none")
                    ]

                Borderless ->
                    [ Border.width 0
                    , Element.htmlAttribute (HtmlAttr.style "box-shadow" "none")
                    ]

                SoftPanel ->
                    [ Border.width 0
                    , Element.htmlAttribute (HtmlAttr.style "box-shadow" "0 12px 36px rgba(8, 15, 28, 0.12)")
                    ]

                OutlinedPanel ->
                    [ Border.width 1
                    , Border.color colors.line
                    , Element.htmlAttribute (HtmlAttr.style "box-shadow" "none")
                    ]
           )


choiceAttributes : Palette -> ComponentStyle -> Bool -> List (Element.Attribute msg)
choiceAttributes colors style selected =
    let
        fill =
            if selected then
                colors.accentSoft

            else
                colors.paper

        stroke =
            if selected then
                colors.accent

            else
                colors.line
    in
    case style.choiceStyle of
        SoftChoice ->
            [ Border.width 0
            , Border.rounded style.cornerRadius
            , Background.color fill
            ]

        OutlinedChoice ->
            [ Border.width 1
            , Border.color stroke
            , Border.rounded style.cornerRadius
            , Background.color fill
            ]

        MinimalChoice ->
            [ Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
            , Border.color stroke
            , Border.rounded 0
            , Background.color
                (if selected then
                    colors.accentSoft

                 else
                    colors.transparent
                )
            ]


viewBooleanAlgebra : Palette -> InteractiveConfig msg r -> String -> Element msg
viewBooleanAlgebra colors config id =
    config.interactives.booleanAlgebra
        |> Dict.get id
        |> Maybe.withDefault BooleanAlgebra.defaultState
        |> BooleanAlgebra.view colors (config.onBooleanAlgebra id)


viewBinaryCalculator : Palette -> InteractiveConfig msg r -> String -> Element msg
viewBinaryCalculator colors config id =
    config.interactives.binaryCalculators
        |> Dict.get id
        |> Maybe.withDefault BinaryCalculator.defaultState
        |> BinaryCalculator.view colors (config.onBinaryCalculator id)


viewTruthTable : Palette -> InteractiveConfig msg r -> String -> Element msg
viewTruthTable colors config id =
    config.interactives.truthTables
        |> Dict.get id
        |> Maybe.withDefault TruthTable.defaultState
        |> TruthTable.view colors (config.onTruthTable id)


submitRow : Palette -> (String -> msg) -> String -> Bool -> Bool -> Element msg
submitRow colors toSubmit id submitted correct =
    Element.row [ Element.width Element.fill, Element.spacing 12 ]
        [ Input.button
            [ Element.paddingEach { top = 10, bottom = 10, left = 16, right = 16 }
            , Border.rounded 10
            , Background.color colors.ink
            , Font.color colors.white
            , Font.bold
            ]
            { onPress = Just (toSubmit id)
            , label = Element.text (if submitted then "Submit again" else "Submit")
            }
        , if submitted then
            Element.el
                [ Font.bold
                , Font.color
                    (if correct then
                        colors.success

                     else
                        colors.danger
                    )
                ]
                (Element.text
                    (if correct then
                        "Correct"

                     else
                        "Try again"
                    )
                )

          else
            Element.none
        ]


quizIsCorrect : Quiz -> QuizState -> Bool
quizIsCorrect quiz state =
    case quiz.kind of
        SingleChoice ->
            case Set.toList state.selected of
                [ selected ] ->
                    quiz.options
                        |> List.any (\option -> option.text == selected && option.correct)

                _ ->
                    False

        MultipleChoice ->
            let
                expected =
                    quiz.options
                        |> List.filter .correct
                        |> List.map .text
                        |> Set.fromList
            in
            state.selected == expected

        ShortAnswer ->
            case quiz.answer of
                Just answer ->
                    normalizeAnswer state.response == normalizeAnswer answer

                Nothing ->
                    String.trim state.response /= ""


normalizeAnswer : String -> String
normalizeAnswer =
    String.trim >> String.toLower


viewCallout : Palette -> String -> List (Element msg) -> Element msg
viewCallout colors kind children =
    let
        ( label, color ) =
            case kind of
                "tip" ->
                    ( "Tip", colors.success )

                "warning" ->
                    ( "Warning", colors.warning )

                "question" ->
                    ( "Question", colors.accent )

                _ ->
                    ( "Note", colors.muted )
    in
    Element.row
        [ Element.width Element.fill
        , Element.spacing 14
        , Element.padding 18
        , Border.rounded 12
        , Background.color colors.white
        , Border.widthEach { top = 0, bottom = 0, left = 4, right = 0 }
        , Border.color color
        ]
        [ Element.el
            [ Element.alignTop
            , Element.width (Element.px 30)
            , Element.height (Element.px 30)
            , Border.rounded 30
            , Background.color colors.accentSoft
            , Font.color color
            , Font.bold
            , Font.center
            , Element.paddingEach { top = 6, bottom = 0, left = 0, right = 0 }
            ]
            (Element.text
                (if kind == "tip" then
                    "✦"

                 else if kind == "warning" then
                    "!"

                 else if kind == "question" then
                    "?"

                 else
                    "i"
                )
            )
        , Element.column [ Element.spacing 7, Element.width Element.fill ]
            [ Element.el [ Font.size 13, Font.bold, Font.color color ] (Element.text label)
            , Element.column [ Element.spacing 8, Element.width Element.fill ] children
            ]
        ]


viewVideo : Palette -> String -> String -> Element msg
viewVideo colors src title =
    card colors [ Border.color colors.line, Background.color colors.white ]
        [ primitiveKicker colors "Video" title
        , Element.html
            (Html.video
                [ HtmlAttr.src src
                , HtmlAttr.controls True
                , HtmlAttr.style "width" "100%"
                , HtmlAttr.style "border-radius" "6px"
                ]
                []
            )
        ]


viewCircuitEmbed : Palette -> String -> String -> String -> String -> Element msg
viewCircuitEmbed colors id height_ theme_ clock_ =
    let
        baseUrl =
            "https://circuitverse.org"

        params =
            [ if theme_ /= "" then
                Just ( "theme", theme_ )

              else
                Nothing
            , if clock_ == "false" then
                Just ( "clock_time", "false" )

              else
                Nothing
            ]
                |> List.filterMap identity

        queryString =
            case params of
                [] ->
                    ""

                _ ->
                    "?" ++ String.join "&" (List.map (\( k, v ) -> k ++ "=" ++ v) params)

        src =
            baseUrl ++ "/simulator/embed/" ++ id ++ queryString
    in
    Element.column
        [ Element.width Element.fill
        , Element.spacing 8
        , Border.rounded 8
        , Border.width 1
        , Border.color colors.line
        , Background.color colors.code
        , Element.clip
        ]
        [ Element.row
            [ Element.width Element.fill
            , Element.paddingEach { top = 7, bottom = 7, left = 12, right = 12 }
            , Background.color colors.code
            , Border.widthEach { top = 0, bottom = 1, left = 0, right = 0 }
            , Border.color colors.line
            ]
            [ Element.el [ Font.size 12, Font.bold, Font.color colors.codeText ]
                (Element.text ("Circuit #" ++ id))
            ]
        , Element.html
            (Html.node "iframe"
                [ HtmlAttr.src src
                , HtmlAttr.attribute "width" "100%"
                , HtmlAttr.attribute "height" (height_ ++ "px")
                , HtmlAttr.attribute "scrolling" "no"
                , HtmlAttr.attribute "frameborder" "0"
                , HtmlAttr.attribute "webkitAllowFullScreen" ""
                , HtmlAttr.attribute "mozAllowFullScreen" ""
                , HtmlAttr.attribute "allowFullScreen" ""
                , HtmlAttr.style "display" "block"
                , HtmlAttr.style "border" "none"
                ]
                []
            )
        ]


viewReferencedPrimitive : Palette -> String -> String -> Element msg
viewReferencedPrimitive colors kind id =
    card colors [ Border.color colors.line, Background.color colors.sidebar ]
        [ primitiveKicker colors ("Referenced " ++ kind) id
        , Element.paragraph [ Font.color colors.muted ]
            [ Element.text ("No inline definition was found for `" ++ id ++ "`. A future importer can resolve this from a separate Markdown or data file.") ]
        ]


viewFeedbackBlock : Palette -> { for : String, when : String, children : List (Element msg) } -> Element msg
viewFeedbackBlock colors info =
    card colors [ Border.color colors.success, Background.color colors.successSoft ]
        [ primitiveKicker colors ("Feedback: " ++ info.when) info.for
        , Element.column [ Element.spacing 8, Element.width Element.fill ] info.children
        ]
