module Content exposing (Profile, JournalEntry, profile, journal)

{-| Personal facts and editorial copy live here, separate from layout.
Only user-provided identity, interests, and profile URLs are used.
Add verified project case studies and career details as they become available.
-}

import Generated.Content as Generated
import I18n exposing (Language(..), pick)


type alias Profile =
    { name : String, identity : String, introduction : String, github : String, linkedin : String, x : String, youtube : String, magicYoutube : String }


{-| URL values are language independent; only the identity and introduction change. -}
profile : Language -> Profile
profile language =
    { name = "Antonio Andara Lara"
    , identity =
        pick language
            "Computers. Embedded. Open-source. Sleight of hand."
            "Computadoras. Electrónica. Programación. Código abierto. Prestidigitación."
    , introduction =
        pick language
            "I’m Antonio and I like to make things. Here I share some of my work, experiments, and writing. I hope you find something that sparks your curiosity."
            "Soy Antonio y me gusta hacer cosas. Aquí comparto parte de mi trabajo, experimentos y mis algunos articulos. Espero que algo que despierte tu curiosidad."
    , github = "https://github.com/antonioandara"
    , linkedin = "https://www.linkedin.com/in/antonio-alejandro-andara-lara-ab5453a4/"
    , x = "https://x.com/A3L"
    , youtube = "https://www.youtube.com/@andaralabs"
    , magicYoutube = "https://www.youtube.com/@viamagus"
    }


type alias JournalEntry =
    Generated.JournalEntry


journal : Language -> List JournalEntry
journal =
    Generated.journal
