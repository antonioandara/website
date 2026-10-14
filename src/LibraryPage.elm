module LibraryPage exposing (main)

import Copy
import FieldManual.Components exposing (chapterHeading)
import FieldManual.Library as Library
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import Html exposing (Html, p, section, text)
import Html.Attributes exposing (class, id, tabindex)
import SiteShell


main : Program Reader.Flags Model Msg
main =
    Reader.application
        (\model -> (Copy.forLanguage model.language).library.pageTitle)
        [ "library" ]
        (\model ->
            SiteShell.view True [ ( "01", "library", (Copy.forLanguage model.language).library.catalogue ) ] (body model) model
        )


body : Model -> Html Msg
body model =
    let
        libraryCopy =
            (Copy.forLanguage model.language).library
    in
    section [ class "chapter", id "library", tabindex -1 ]
        [ chapterHeading "01" libraryCopy.heading libraryCopy.subtitle
        , p [ class "section-intro" ] [ text libraryCopy.intro ]
        , Library.view model.language model.category SelectCategory Measure
        ]
