module Copy exposing (Strings, Experiments, ExperimentCopy, Specimen, forLanguage, specimens)

{-| Interface strings and remaining section copy, kept in one place so English and
Spanish stay side by side. Markdown editorial content lives under content/. Views read
`Copy.forLanguage model.language`.

`forLanguage` returns `en` or `es`, both typed as `Strings`, so the compiler
refuses to build when a translation is missing a field.
-}

import I18n exposing (Language(..))


type alias Strings =
    { title : String
    , chapters : List String
    , shell : Shell
    , home : Home
    , library : Library
    , lms : Lms
    }


type alias Shell =
    { skip : String
    , contentsAria : String
    , closeSidebar : String
    , openSidebar : String
    , profileEyebrow : String
    , sidebarTitle : String
    , sideNote : String
    , editionNight : String
    , editionDay : String
    , github : String
    , coverMeta : String
    , dayEdition : String
    , nightEdition : String
    , coverEyebrow : String
    , homeTitleTop : String
    , homeTitleBottom : String
    , libraryTitleTop : String
    , libraryTitleBottom : String
    , libraryDeck : String
    , libraryDescription : String
    , homeReadLink : String
    , libraryReadLink : String
    , plateMeta : String
    , plateNote : String
    , coverBottom : String
    , scrollHint : String
    , workNav : String
    , journalNav : String
    , connectNav : String
    , themeToDark : String
    , themeToLight : String
    , themeLight : String
    , themeDark : String
    , languageToEs : String
    , languageToEn : String
    , footerNote : String
    , footerLibrary : String
    , backToTop : String
    }


type alias Home =
    { engineering : Engineering
    , openSource : OpenSource
    , experiments : Experiments
    , magic : Magic
    , journal : Journal
    , videos : Videos
    , connect : Connect
    }


type alias Engineering =
    { heading : String
    , subtitle : String
    , lead : String
    , p1 : String
    , p2 : String
    , linkedinLink : String
    , githubLink : String
    , plateMeta : String
    , plateTitle : String
    , plateCaption : String
    , eyebrow : String
    , projectTitle : String
    , projectBody : String
    , noteSummary : String
    , noteBody : String
    }


type alias OpenSource =
    { heading : String
    , subtitle : String
    , quote : String
    , body : String
    , githubLink : String
    , plateMeta : String
    , plateTitle : String
    , plateCaption : String
    }


type alias Experiments =
    { heading : String
    , subtitle : String
    , intro : String
    , metaPrefix : String
    , openLabel : String
    , items : List ExperimentCopy
    }


type alias ExperimentCopy =
    { title : String, description : String }


type alias Magic =
    { magicLink : String, xLink : String }


type alias Journal =
    { heading : String, subtitle : String, intro : String, empty : String }


type alias Videos =
    { heading : String
    , subtitle : String
    , lead : String
    , body : String
    , youtubeLink : String
    , plateMeta : String
    , plateTitle : String
    , plateCaption : String
    }


type alias Connect =
    { heading : String
    , subtitle : String
    , lead : String
    , body : String
    , links : List LinkCopy
    }


type alias LinkCopy =
    { number : String, label : String, description : String }


type alias Library =
    { pageTitle : String
    , catalogue : String
    , heading : String
    , subtitle : String
    , intro : String
    , recipe : String
    , countSuffix : String
    , filterAria : String
    , categories : List ( String, String )
    }


type alias Lms =
    { chapterHeading : String
    , chapterSubtitle : String
    , eyebrow : String
    , heading : String
    , lead : String
    , body : String
    , tags : List String
    , demo : String
    , previewLeft : String
    , previewRight : String
    , previewAlt : String
    , previewCaption : String
    }


type alias Specimen =
    { key : String
    , title : String
    , category : String
    , caption : String
    , example : String
    }


type alias SpecimenRow =
    { key : String
    , category : String
    , example : String
    , en : ( String, String )
    , es : ( String, String )
    }


forLanguage : Language -> Strings
forLanguage language =
    case language of
        English ->
            en

        Spanish ->
            es


en : Strings
en =
    { title = "Antonio Andara — Engineering & Magic"
    , chapters =
        [ "Engineering & work"
        , "Open source"
        , "Experiments"
        , "Experimental LMS"
        , "Brain Magic & wonder"
        , "Field notes"
        , "Andara Labs / Via Magus"
        , "Get in touch"
        ]
    , shell =
        { skip = "Skip to the manual"
        , contentsAria = "Manual contents"
        , closeSidebar = "Close sidebar"
        , openSidebar = "Open sidebar"
        , profileEyebrow = "ANTONIO ANDARA"
        , sidebarTitle = "A closer look."
        , sideNote = "Open source engineering and a little sleight of hand."
        , editionNight = "EDITION 01 / NIGHT"
        , editionDay = "EDITION 02 / DAY"
        , github = "GitHub ↗"
        , coverMeta = "ANTONIO ANDARA"
        , dayEdition = "● DAY EDITION"
        , nightEdition = "● NIGHT EDITION"
        , coverEyebrow = "ENGINEERING / SOFTWARE / MAGIC"
        , homeTitleTop = "Antonio"
        , homeTitleBottom = "Andara"
        , libraryTitleTop = "Drawing"
        , libraryTitleBottom = "library"
        , libraryDeck = "Small, reusable pieces of a visual language."
        , libraryDescription = "A collection of schematics, patterns, and objects, drawn in Elm."
        , homeReadLink = "Explore my work"
        , libraryReadLink = "Browse the drawings"
        , plateMeta = "PLATE 002"
        , plateNote = "READ. COMPUTE. REPEAT."
        , coverBottom = "BUILD / SHARE / EXPERIMENT / WONDER"
        , scrollHint = "SCROLL TO INSPECT ↓"
        , workNav = "Work"
        , journalNav = "Journal"
        , connectNav = "Connect"
        , themeToDark = "Switch to dark mode"
        , themeToLight = "Switch to light mode"
        , themeLight = "Light mode"
        , themeDark = "Dark mode"
        , languageToEs = "Switch to Spanish"
        , languageToEn = "Switch to English"
        , footerNote = "ANTONIO ANDARA / ENGINEERING & MAGIC"
        , footerLibrary = "Drawing library ↗"
        , backToTop = "Back to the surface ↑"
        }
    , home =
        { engineering =
            { heading = "Work you can look inside."
            , subtitle = "ENGINEERING & PRACTICE"
            , lead = "I’m an electronic engineer. I love to understand things deeply."
            , p1 = "Some of my interests are electronics, microcontrollers (MCUs), mechatronics, programming languages and language design, distributed systems, decentralization, blockchain, and open source. I enjoy exploring the latest technology, helping people understand it, and staying up to date with the latest innovations."
            , p2 = "This is a place for anyone who wants to learn and have a good time doing it. I hope you find something interesting here."
            , linkedinLink = "Professional background ↗"
            , githubLink = "My GitHub ↗"
            , plateMeta = "IN PRACTICE / 01"
            , plateTitle = "learning from first principles"
            , plateCaption = "Bottom up design."
            , eyebrow = "ELECTRONICS / SOFTWARE / MAGIC"
            , projectTitle = "A personal field manual"
            , projectBody = "This site is a working example of my work and my explorations of web development and functional programming."
            , noteSummary = "Look at the implementation"
            , noteBody = "The main application is built in Elm using the Elm architecture of model, update, and view. This is the first site I have published."
            }
        , openSource =
            { heading = "Build. Share. Cooperate."
            , subtitle = "OPEN SOURCE"
            , quote = "Sharing is the most fundamental act of friendship. Because it is a way you can give something without losing something. — Richard Stallman"
            , body = "Open-source software is an important part of my work. This site connects the experiments and ideas with the places where the code and everything else lives."
            , githubLink = "Explore my GitHub ↗"
            , plateMeta = "PRINCIPLE / 01"
            , plateTitle = "find the connections"
            , plateCaption = "Innovation thrives at the intersection of seemingly disjointed topics."
            }
        , experiments =
            { heading = "My workbench."
            , subtitle = "SOME EXPERIMENTS & SMALL EXPLORATIONS"
            , intro = "These are experiments on different interesting topics. There is no real structure behind them, more like a stream of consciousness."
            , metaPrefix = "EXPERIMENT"
            , openLabel = "OPEN ↗"
            , items =
                [ { title = "Three-color formula tiles"
                  , description = "Connected logic tiles. Toggle an input and watch shared-border constraints carry the change toward the output."
                  }
                , { title = "Formula parser & AST explorer"
                  , description = "Step through a Boolean formula, watch its syntax tree grow, and explore how inputs change the result."
                  }
                ]
            }
        , magic =
            { magicLink = "Watch Via Magus on YouTube ↗"
            , xLink = "Find me on X ↗"
            }
        , journal =
            { heading = "Project Notes."
            , subtitle = "A PERSONAL JOURNAL"
            , intro = "Short notes on different topics."
            , empty = "No notes yet. The first entries are still being written."
            }
        , videos =
            { heading = "My YouTube channel."
            , subtitle = "ANDARA LABS / VIDEO"
            , lead = "I don't make too many videos, but some things are better shown."
            , body = "Andara Labs is my YouTube channel. It’s the place to follow the video side of my work; this section will grow into a collection of individual videos and the notes behind them."
            , youtubeLink = "Visit Andara Labs on YouTube ↗"
            , plateMeta = "CHANNEL / @ANDARALABS"
            , plateTitle = "watch on youtube ↗"
            , plateCaption = "Open the channel to explore the videos."
            }
        , connect =
            { heading = "Let’s compare notes."
            , subtitle = "WORK / COLLABORATION / CONVERSATION"
            , lead = "Looking for engineering consultation or tutoring? Have a project, a magic idea, or a question about something I’ve written?"
            , body = "For professional conversations, find me on LinkedIn. For code, visit GitHub. For videos and the conversations around the work, there’s Andara Labs and X."
            , links =
                [ { number = "01", label = "LinkedIn", description = "Professional background & opportunities" }
                , { number = "02", label = "GitHub", description = "Code & open-source work" }
                , { number = "03", label = "YouTube", description = "Andara Labs / @andaralabs" }
                , { number = "04", label = "X", description = "Ideas & conversation / @A3L" }
                ]
            }
        }
    , library =
        { pageTitle = "Drawing library — Antonio Andara"
        , catalogue = "Drawing catalogue"
        , heading = "A cabinet of mechanisms."
        , subtitle = "REUSABLE DRAWINGS"
        , intro = "All drawings share a visual language. Filter the collection or open an Elm recipe to see how a figure can be reused."
        , recipe = "Elm recipe"
        , countSuffix = "drawings /"
        , filterAria = "Filter drawings"
        , categories =
            [ ( "All", "All" )
            , ( "Systems", "Systems" )
            , ( "Signals", "Signals" )
            , ( "Objects", "Objects" )
            , ( "Patterns", "Patterns" )
            , ( "Concepts", "Concepts" )
            ]
        }
    , lms =
        { chapterHeading = "Experimental."
        , chapterSubtitle = "MARKDOWNBOOK / LEARNING SOFTWARE"
        , eyebrow = "MARKDOWNBOOK / ELM LMS"
        , heading = "Simple and to the point."
        , lead = "I like to teach and this is my attempt at building a good and easy to use learning management system."
        , body = "This is a Markdown-first learning management system in Elm. Lessons can include interactive tools, quizzes, and exercises."
        , tags = [ "Interactive lessons", "Markdown authoring", "Elm" ]
        , demo = "Try a sample lesson ↗"
        , previewLeft = "MARKDOWNBOOK"
        , previewRight = "WORKING PREVIEW"
        , previewAlt = "MarkdownBook reader showing a binary lesson, course navigation, and an interactive eight-bit calculator"
        , previewCaption = "A look inside the working app. Open the demo to toggle bits, answer a question or two."
        }
    }


es : Strings
es =
    { title = "Antonio Andara — Ingeniero y mago"
    , chapters =
        [ "Ingeniería y trabajo"
        , "Código abierto"
        , "Experimentos"
        , "LMS experimental"
        , "Magia mental y asombro"
        , "Articulos"
        , "Andara Labs / Via Magus"
        , "Contacto"
        ]
    , shell =
        { skip = "Saltar a la pagina"
        , contentsAria = "Contenido"
        , closeSidebar = "Cerrar barra lateral"
        , openSidebar = "Abrir barra lateral"
        , profileEyebrow = "ANTONIO ANDARA"
        , sidebarTitle = "Una mirada de cerca."
        , sideNote = "Ingeniería de código abierto y un poco de prestidigitación."
        , editionNight = "EDICIÓN 01 / NOCHE"
        , editionDay = "EDICIÓN 02 / DÍA"
        , github = "GitHub ↗"
        , coverMeta = "ANTONIO ANDARA"
        , dayEdition = "● EDICIÓN DÍA"
        , nightEdition = "● EDICIÓN NOCHE"
        , coverEyebrow = "INGENIERÍA / SOFTWARE / MAGIA"
        , homeTitleTop = "Antonio"
        , homeTitleBottom = "Andara"
        , libraryTitleTop = "Dibujos"
        , libraryTitleBottom = "biblioteca"
        , libraryDeck = "Pequeños bloques reutilizables."
        , libraryDescription = "Colección de esquemas, patrones y objetos, dibujados en Elm."
        , homeReadLink = "Explora mi trabajo"
        , libraryReadLink = "Explora los dibujos"
        , plateMeta = "LÁMINA 002"
        , plateNote = "LEER. PROCESAR. REPETIR."
        , coverBottom = "CONSTRUIR / COMPARTIR / EXPERIMENTAR"
        , scrollHint = "DESPLAZA PARA INSPECCIONAR ↓"
        , workNav = "Trabajo"
        , journalNav = "Diario"
        , connectNav = "Contacto"
        , themeToDark = "Cambiar a modo oscuro"
        , themeToLight = "Cambiar a modo claro"
        , themeLight = "Modo claro"
        , themeDark = "Modo oscuro"
        , languageToEs = "Cambiar a español"
        , languageToEn = "Cambiar a inglés"
        , footerNote = "ANTONIO ANDARA / INGENIERÍA Y MAGIA"
        , footerLibrary = "Biblioteca de dibujos ↗"
        , backToTop = "Volver a la superficie ↑"
        }
    , home =
        { engineering =
            { heading = "Trabajo que puedes examinar."
            , subtitle = "INGENIERÍA Y PRÁCTICA"
            , lead = "Soy ingeniero electrónico. Me encanta entender las cosas a fondo."
            , p1 = "Algunos de mis intereses son la electrónica, los microcontroladores (MCU), la mecatrónica, los lenguajes de programación, el diseño de lenguajes, los sistemas distribuidos, la descentralización, blockchain y el código abierto. Disfruto explorar la tecnología más reciente, ayudar a las personas a entenderla y mantenerme al día con las últimas innovaciones."
            , p2 = "Este es un lugar para cualquiera que quiera aprender y pasarlo bien haciéndolo. Espero que encuentres algo interesante aquí."
            , linkedinLink = "Trayectoria profesional ↗"
            , githubLink = "Mi GitHub ↗"
            , plateMeta = "EN LA PRÁCTICA / 01"
            , plateTitle = "aprendizaje desde primeros principios"
            , plateCaption = "Diseño de abajo hacia arriba."
            , eyebrow = "ELECTRÓNICA / SOFTWARE / MAGIA"
            , projectTitle = "Un manual de campo personal"
            , projectBody = "Este sitio es un ejemplo de mi trabajo y de mis exploraciones en desarrollo web y programación funcional."
            , noteSummary = "Mira la implementación"
            , noteBody = "La aplicación principal está construida en Elm usando la arquitectura de Elm: modelo, actualización y vista. Este es el primer sitio que publico."
            }
        , openSource =
            { heading = "Construir. Compartir. Cooperar."
            , subtitle = "CÓDIGO ABIERTO"
            , quote = "Compartir es el acto más fundamental de la amistad. Porque es una forma de dar algo sin perder nada. — Richard Stallman"
            , body = "El software de código abierto es una parte importante de mi trabajo. Este sitio conecta los experimentos y las ideas con los lugares donde vive el código y todo lo demás."
            , githubLink = "Explora mi GitHub ↗"
            , plateMeta = "PRINCIPIO / 01"
            , plateTitle = "encuentra las conexiones"
            , plateCaption = "La innovación prospera en la intersección de temas aparentemente inconexos."
            }
        , experiments =
            { heading = "Banco de trabajo."
            , subtitle = "ALGUNOS EXPERIMENTOS Y EXPLORACIONES"
            , intro = "Estos son experimentos sobre distintos temas interesantes. No hay una estructura real detrás, más bien un flujo de conciencia."
            , metaPrefix = "EXPERIMENTO"
            , openLabel = "ABRIR ↗"
            , items =
                [ { title = "Fichas de fórmulas de tres colores"
                  , description = "Fichas lógicas conectadas. Activa una entrada y observa cómo las restricciones de borde compartido propagan el cambio hacia la salida."
                  }
                , { title = "Parseo de fórmulas y explorador de AST"
                  , description = "Recorre paso a paso una fórmula booleana, observa cómo crece su árbol de sintaxis y explora cómo las entradas cambian el resultado."
                  }
                ]
            }
        , magic =
            { magicLink = "Mira Via Magus en YouTube ↗"
            , xLink = "Encuéntrame en X ↗"
            }
        , journal =
            { heading = "Notas."
            , subtitle = "MI DIARIO"
            , intro = "Notas breves sobre distintos temas."
            , empty = "Aún no hay notas. Las primeras entradas todavía se están escribiendo."
            }
        , videos =
            { heading = "Mi canal de YouTube."
            , subtitle = "ANDARA LABS / VIDEO"
            , lead = "No hago demasiados vídeos, pero algunas cosas es mejor mostrarlas."
            , body = "Andara Labs es mi canal de YouTube. Es el lugar para seguir el lado audiovisual de mi trabajo; esta sección crecerá hasta convertirse en una colección de vídeos individuales y las notas que hay detrás."
            , youtubeLink = "Visita Andara Labs en YouTube ↗"
            , plateMeta = "CANAL / @ANDARALABS"
            , plateTitle = "ver en youtube ↗"
            , plateCaption = "Abre el canal para explorar los vídeos."
            }
        , connect =
            { heading = "Comparemos notas."
            , subtitle = "TRABAJO / COLABORACIÓN / CONVERSACIÓN"
            , lead = "¿Buscas asesoría o clases de ingeniería? ¿Tienes un proyecto, una idea de magia o una pregunta sobre algo que he escrito?"
            , body = "Para conversaciones profesionales, encuéntrame en LinkedIn. Para el código, visita GitHub. Para los vídeos y las conversaciones en torno al trabajo, están Andara Labs y X."
            , links =
                [ { number = "01", label = "LinkedIn", description = "Trayectoria profesional y oportunidades" }
                , { number = "02", label = "GitHub", description = "Código y trabajo de código abierto" }
                , { number = "03", label = "YouTube", description = "Andara Labs / @andaralabs" }
                , { number = "04", label = "X", description = "Ideas y conversación / @A3L" }
                ]
            }
        }
    , library =
        { pageTitle = "Biblioteca de dibujos — Antonio Andara"
        , catalogue = "Catálogo de dibujos"
        , heading = "Un gabinete de mecanismos."
        , subtitle = "DIBUJOS REUTILIZABLES"
        , intro = "Dibujos en un lenguaje visual compartido. Filtra la colección o abre una receta de Elm para ver cómo se puede reutilizar una figura."
        , recipe = "Receta de Elm"
        , countSuffix = "dibujos /"
        , filterAria = "Filtrar dibujos"
        , categories =
            [ ( "All", "Todo" )
            , ( "Systems", "Sistemas" )
            , ( "Signals", "Señales" )
            , ( "Objects", "Objetos" )
            , ( "Patterns", "Patrones" )
            , ( "Concepts", "Conceptos" )
            ]
        }
    , lms =
        { chapterHeading = "Experimental."
        , chapterSubtitle = "MARKDOWNBOOK / SOFTWARE DE APRENDIZAJE"
        , eyebrow = "MARKDOWNBOOK / ELM LMS"
        , heading = "Simple y directo."
        , lead = "Me gusta enseñar y este es mi intento de construir un sistema de gestión del aprendizaje bueno y fácil de usar."
        , body = "Este es un sistema de gestión del aprendizaje centrado en Markdown, escrito en Elm. Las lecciones pueden incluir herramientas interactivas, cuestionarios y ejercicios."
        , tags = [ "Lecciones interactivas", "Autoría en Markdown", "Elm" ]
        , demo = "Prueba una lección de ejemplo ↗"
        , previewLeft = "MARKDOWNBOOK"
        , previewRight = "VISTA PREVIA FUNCIONAL"
        , previewAlt = "Lector de MarkdownBook mostrando una lección binaria, navegación del curso y una calculadora interactiva de ocho bits"
        , previewCaption = "Un vistazo al interior de la aplicación en funcionamiento. Abre la demo para alternar bits y responder una que otra pregunta."
        }
    }


{-| Drawings are keyed by their English `key`; only the label and caption move. -}
specimens : Language -> List Specimen
specimens language =
    List.map
        (\row ->
            let
                ( title, caption ) =
                    case language of
                        English ->
                            row.en

                        Spanish ->
                            row.es
            in
            { key = row.key
            , title = title
            , category = row.category
            , caption = caption
            , example = row.example
            }
        )
        specimenRows


specimenRows : List SpecimenRow
specimenRows =
    [ { key = "stack", category = "Systems", example = "Ink.computerStack"
      , en = ( "Computer stack", "A processor board, paired memory sticks, and solid-state storage connected by a data path." )
      , es = ( "Pila de computadora", "Una placa de procesador, módulos de memoria emparejados y almacenamiento de estado sólido conectados por una ruta de datos." )
      }
    , { key = "processor", category = "Systems", example = "Ink.processorStack"
      , en = ( "From gates to a CPU", "Logic gates build muxes and an ALU; connected into a datapath, they become a CPU core. Follow the arrows upward." )
      , es = ( "De puertas lógicas a una CPU", "Las puertas lógicas construyen multiplexores y una ALU; conectadas en una ruta de datos, se convierten en un núcleo de CPU. Sigue las flechas hacia arriba." )
      }
    , { key = "touch", category = "Systems", example = "Ink.touchDiagram"
      , en = ( "Capacitive surface", "A measured field becomes a coordinate." )
      , es = ( "Superficie capacitiva", "Un campo medido se convierte en una coordenada." )
      }
    , { key = "chip", category = "Systems", example = "Ink.chip"
      , en = ( "Logic core", "A 24-pin package with a visible core." )
      , es = ( "Núcleo lógico", "Un encapsulado de 24 patillas con un núcleo visible." )
      }
    , { key = "network", category = "Systems", example = "Ink.network"
      , en = ( "Connected nodes", "Solid paths, potential connections, shared state." )
      , es = ( "Nodos conectados", "Rutas sólidas, conexiones potenciales, estado compartido." )
      }
    , { key = "signal", category = "Signals", example = "Ink.signal { amplitude = 65, cycles = 2 }"
      , en = ( "Wave study", "A sampled wave with adjustable amplitude and frequency." )
      , es = ( "Estudio de onda", "Una onda muestreada con amplitud y frecuencia ajustables." )
      }
    , { key = "kernel", category = "Signals", example = "Ink.kernelDiagram"
      , en = ( "Kernel weight", "The shape of a weighted neighborhood." )
      , es = ( "Peso del kernel", "La forma de un vecindario ponderado." )
      }
    , { key = "bezier", category = "Signals", example = "Ink.bezierDiagram"
      , en = ( "Bézier handles", "A curve and the control points behind it." )
      , es = ( "Manijas de Bézier", "Una curva y los puntos de control que hay detrás." )
      }
    , { key = "orbit", category = "Objects", example = "Ink.orbit 3"
      , en = ( "Orbital planes", "Intersecting ellipses around a common center." )
      , es = ( "Planos orbitales", "Elipses que se cruzan alrededor de un centro común." )
      }
    , { key = "cube", category = "Objects", example = "Ink.cube"
      , en = ( "Isometric solid", "Three faces, construction lines, a little depth." )
      , es = ( "Sólido isométrico", "Tres caras, líneas de construcción, un poco de profundidad." )
      }
    , { key = "contours", category = "Objects", example = "Ink.contours 9"
      , en = ( "Contour field", "A small landscape made from nested lines." )
      , es = ( "Campo de contornos", "Un pequeño paisaje hecho de líneas anidadas." )
      }
    , { key = "raster", category = "Objects", example = "Ink.rasterDiagram"
      , en = ( "Raster letter", "Letterforms reveal their underlying grid." )
      , es = ( "Letra de trama", "Las letras revelan su cuadrícula subyacente." )
      }
    , { key = "automaton", category = "Patterns", example = "Ink.cellularAutomaton 30"
      , en = ( "Cellular automaton", "Rule 30, grown from one live cell across 24 generations." )
      , es = ( "Autómata celular", "Regla 30, crecida desde una célula viva a lo largo de 24 generaciones." )
      }
    , { key = "life", category = "Patterns", example = "Ink.gameOfLife"
      , en = ( "Game of Life", "A glider at generations 0, 4, and 8. Local rules create traveling structure." )
      , es = ( "Juego de la vida", "Un planeador en las generaciones 0, 4 y 8. Las reglas locales crean estructura viajera." )
      }
    , { key = "functional", category = "Concepts", example = "Ink.functional"
      , en = ( "Functional", "A pure function: square the input, with no hidden state." )
      , es = ( "Funcional", "Una función pura: eleva al cuadrado la entrada, sin estado oculto." )
      }
    , { key = "composable", category = "Concepts", example = "Ink.composable"
      , en = ( "Composable", "Follow A into f, B into g, and C out. The same pipeline becomes one reusable function." )
      , es = ( "Componible", "Sigue A hacia f, B hacia g y C hacia la salida. La misma tubería se convierte en una función reutilizable." )
      }
    , { key = "fractal", category = "Patterns", example = "Ink.fractal 4"
      , en = ( "Fractal", "A Sierpiński triangle repeats the same structure at smaller scales." )
      , es = ( "Fractal", "Un triángulo de Sierpiński repite la misma estructura a escalas menores." )
      }
    , { key = "formula-parser", category = "Concepts", example = "Ink.formulaParser"
      , en = ( "Formula parser & AST", "Tokens become a syntax tree: NOT wraps AND, OR joins the branches, and input values evaluate toward the root." )
      , es = ( "Analizador de fórmulas y AST", "Los tokens se convierten en un árbol de sintaxis: NOT envuelve a AND, OR une las ramas y los valores de entrada se evalúan hacia la raíz." )
      }
    , { key = "turing", category = "Concepts", example = "Ink.turingMachine"
      , en = ( "Turing machine", "A tape, a state, and a head. Read a symbol, write a symbol, then move." )
      , es = ( "Máquina de Turing", "Una cinta, un estado y un cabezal. Lee un símbolo, escribe un símbolo y luego muévete." )
      }
    ]
