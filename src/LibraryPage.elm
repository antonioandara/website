module LibraryPage exposing (main)

import FieldManual.Components exposing (chapterHeading)
import FieldManual.Library as Library
import FieldManual.Reader as Reader exposing (Model, Msg(..))
import Html exposing (p, section, text)
import Html.Attributes exposing (class, id, tabindex)
import SiteShell

main : Program Reader.Flags Model Msg
main =
    Reader.application "Drawing library — Antonio Andara" [ "library" ]
        (\model -> SiteShell.view True [ ( "01", "library", "Drawing catalogue" ) ]
            (section [ class "chapter", id "library", tabindex -1 ]
                [ chapterHeading "01" "A cabinet of mechanisms." "REUSABLE DRAWINGS"
                , p [ class "section-intro" ] [ text "Eighteen drawings in a shared visual language. Filter the collection or open an Elm recipe to see how a figure can be reused." ]
                , Library.view model.category SelectCategory Measure
                ]) model)
