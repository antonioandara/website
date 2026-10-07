module Content exposing (Profile, JournalEntry, profile, journal)

{-| Personal facts and proposed editorial copy live here, separate from layout.
Only user-provided identity, interests, and profile URLs are used.
Add verified project case studies and career details as they become available.
-}

type alias Profile =
    { name : String, identity : String, introduction : String, github : String, linkedin : String, x : String, youtube : String, magicYoutube : String }

profile : Profile
profile =
    { name = "Antonio Andara Lara"
    , identity = "Computers. Embedded. Open-source. Sleight of hand."
    , introduction = "I’m Antonio and I like to make things. Here I share some of my work, experiments, and writing. I hope you find something that sparks your curiosity."
    , github = "https://github.com/antonioandara"
    , linkedin = "https://www.linkedin.com/in/antonio-alejandro-andara-lara-ab5453a4/"
    , x = "https://x.com/A3L"
    , youtube = "https://www.youtube.com/@andaralabs"
    , magicYoutube = "https://www.youtube.com/@viamagus"
    }


type alias JournalEntry =
    { number : String, category : String, title : String, summary : String, paragraphs : List String }

{-| Published field notes. Unpublished drafts are kept in CONTENT-PLAN.md. -}
journal : List JournalEntry
journal =
    [ { number = "001", category = "PERSONAL", title = "Things I make", summary = "Why engineering, experiments, and magic belong in the same notebook."
      , paragraphs = [ "I want this website to be a place where the different parts of my work can meet. Engineering, software, experiments, and magic all have a home here.", "Some pages will explain a finished project. Others will follow an idea while it is still taking shape. I want to share the work and the thinking around it, and leave room for the site to grow." ] }]
