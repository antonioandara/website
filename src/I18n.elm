module I18n exposing (Language(..), all, code, fromCode, label, next, pick)

{-| Language identity and the small helpers every localized module shares.
`pick` keeps English and Spanish values side by side at the call site.
-}


type Language
    = English
    | Spanish


all : List Language
all =
    [ English, Spanish ]


code : Language -> String
code language =
    case language of
        English ->
            "en"

        Spanish ->
            "es"


fromCode : String -> Language
fromCode value =
    if String.startsWith "es" (String.toLower value) then
        Spanish

    else
        English


label : Language -> String
label language =
    case language of
        English ->
            "English"

        Spanish ->
            "Español"


next : Language -> Language
next language =
    case language of
        English ->
            Spanish

        Spanish ->
            English


{-| Choose a value for the active language, English first.
-}
pick : Language -> String -> String -> String
pick language english spanish =
    case language of
        English ->
            english

        Spanish ->
            spanish
