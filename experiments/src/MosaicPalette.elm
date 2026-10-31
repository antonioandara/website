module MosaicPalette exposing (getColor)

{-| Formula Mosaic's muted RGB palette, independent of the other formula views.
-}


getColor : Int -> String
getColor index =
    case index of
        0 ->
            "#bb5961"

        1 ->
            "#397d68"

        2 ->
            "#426f9f"

        _ ->
            "#999999"
