port module FieldManual.Reader exposing (Flags, Model, Msg(..), application, boolString, isLight, themeName)

import Browser
import Browser.Dom as Dom
import Browser.Events
import Browser.Navigation as Navigation
import Html exposing (Html)
import Json.Decode as Decode
import Task
import Url exposing (Url)


{-| Browser-only effects: storage and document metadata outside the Elm root. -}
port persistTheme : { name : String, color : String } -> Cmd msg


{-| A scroll notification, with no UI decisions or DOM measurements in JavaScript. -}
port scrollObserved : (() -> msg) -> Sub msg


type Theme = Dark | Light


type alias Flags = { theme : String }


type alias Model =
    { theme : Theme
    , sidebarOpen : Bool
    , activeChapter : Maybe String
    , measuring : Bool
    , measureAgain : Bool
    , category : String
    , key : Navigation.Key
    , url : Url
    }


type Msg
    = ToggleTheme
    | ToggleSidebar
    | CloseSidebar
    | SelectCategory String
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | Measure
    | Measured (Result Dom.Error (Maybe String))
    | NoOp


application : String -> List String -> (Model -> Html Msg) -> Program Flags Model Msg
application title chapters view =
    Browser.application
        { init = \flags url key ->
            let
                model = { theme = if flags.theme == "light" then Light else Dark, sidebarOpen = False, activeChapter = Nothing, category = "All", measuring = True, measureAgain = False, key = key, url = url }
            in
            ( model, Cmd.batch [ saveTheme model, navigate url, measure chapters ] )
        , view = \model -> { title = title, body = [ view model ] }
        , update = update chapters
        , subscriptions = \model -> Sub.batch
            [ scrollObserved (\_ -> Measure)
            , Browser.Events.onResize (\_ _ -> Measure)
            , if model.sidebarOpen then
                Browser.Events.onKeyDown (Decode.field "key" Decode.string |> Decode.andThen (\key -> if key == "Escape" then Decode.succeed CloseSidebar else Decode.fail "Not Escape"))
              else Sub.none
            ]
        , onUrlRequest = LinkClicked
        , onUrlChange = UrlChanged
        }


update : List String -> Msg -> Model -> (Model, Cmd Msg)
update chapters msg model =
    case msg of
        ToggleTheme ->
            let next = { model | theme = if isLight model then Dark else Light }
            in ( next, saveTheme next )

        ToggleSidebar ->
            ( { model | sidebarOpen = not model.sidebarOpen }
            , Cmd.batch [ focus (if model.sidebarOpen then "menu-toggle" else "sidebar-close"), requestMeasure ]
            )

        CloseSidebar ->
            ( { model | sidebarOpen = False }, Cmd.batch [ focus "menu-toggle", requestMeasure ] )

        SelectCategory category ->
            ( { model | category = category }, requestMeasure )

        LinkClicked request ->
            case request of
                Browser.Internal url ->
                    if url.path == model.url.path && url.query == model.url.query then
                        ( model, Navigation.pushUrl model.key (Url.toString url) )
                    else
                        ( model, Navigation.load (Url.toString url) )
                Browser.External url ->
                    ( model, Navigation.load url )

        UrlChanged url ->
            ( { model | url = url }, Cmd.batch [ navigate url, requestMeasure ] )

        Measure ->
            if model.measuring then
                ( { model | measureAgain = True }, Cmd.none )
            else
                ( { model | measuring = True }, measure chapters )

        Measured result ->
            ( { model | activeChapter = Result.withDefault model.activeChapter result, measuring = model.measureAgain, measureAgain = False }
            , if model.measureAgain then measure chapters else Cmd.none
            )

        NoOp ->
            ( model, Cmd.none )


focus : String -> Cmd Msg
focus target =
    Dom.focus target |> Task.attempt (\_ -> NoOp)


navigate : Url -> Cmd Msg
navigate url =
    case url.fragment of
        Nothing -> Cmd.none
        Just fragment ->
            let target = Url.percentDecode fragment |> Maybe.withDefault fragment
            in
            Dom.focus target
                |> Task.andThen (\_ -> Dom.getElement target)
                |> Task.andThen (\element -> Dom.getElement "reading-header" |> Task.map (\header -> max 0 (element.element.y - header.element.height - 28)))
                |> Task.andThen (Dom.setViewport 0)
                |> Task.attempt (\_ -> Measure)


requestMeasure : Cmd Msg
requestMeasure =
    Task.perform (\_ -> Measure) (Task.succeed ())


measure : List String -> Cmd Msg
measure chapters =
    -- Read the viewport last so an in-flight navigation cannot leave us using
    -- an old scroll position. Coalesce scroll notifications in update.
    Task.sequence (List.map Dom.getElement chapters)
        |> Task.andThen (\elements ->
            Dom.getElement "reading-header"
                |> Task.andThen (\header ->
                    Dom.getViewport
                        |> Task.map (\viewport ->
                            if viewport.viewport.y > 0 && viewport.viewport.y + viewport.viewport.height >= viewport.scene.height - 2 then
                                List.reverse chapters |> List.head
                            else
                                List.map2 Tuple.pair chapters elements
                                    |> List.filter (\(_, element) -> element.element.y <= viewport.viewport.y + header.element.height + 80)
                                    |> List.reverse
                                    |> List.head
                                    |> Maybe.map Tuple.first
                        )
                )
        )
        |> Task.attempt Measured


isLight : Model -> Bool
isLight model = model.theme == Light


themeName : Model -> String
themeName model = if isLight model then "Light mode" else "Dark mode"


boolString : Bool -> String
boolString value = if value then "true" else "false"


saveTheme : Model -> Cmd Msg
saveTheme model =
    persistTheme { name = if isLight model then "light" else "dark", color = if isLight model then "#fbfaf4" else "#11171c" }
