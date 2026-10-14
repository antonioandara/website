module EditorialMarkdown exposing (view)

import Html exposing (Html, div, pre, text)
import Markdown.Parser
import Markdown.Renderer


view : String -> Html msg
view source =
    case Markdown.Parser.parse source |> Result.mapError (\_ -> "Unable to parse Markdown") |> Result.andThen (Markdown.Renderer.render Markdown.Renderer.defaultHtmlRenderer) of
        Ok children ->
            div [] children

        Err _ ->
            pre [] [ text source ]
