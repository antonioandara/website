module Generated.Book exposing (book)

import MarkdownBook.Model exposing (Book)


book : Book
book =
    { title = "A little digital logic"
    , author = "Antonio Andara"
    , slug = "antonio-lms-preview"
    , summary = "Read a little. Change something. See what happens."
    , chapters =
        [
        { title = "Thinking in bits"
        , slug = "thinking-in-bits"
        , summary = "Eight switches. One number. A small experiment in how computers represent quantities."
        , path = "chapters/01-bits.md"
        , body = "\n## A number you can touch\n\nA bit has two states: **0** and **1**. Put eight bits together and each position carries a different weight, from 128 on the left to 1 on the right.\n\nTry the calculator below. Toggle a bit in row **A**, watch its decimal value change, then set a second number in row **B**.\n\n<binary-calculator id=\"preview-bits\" />\n\n## Check your intuition\n\n```quiz id=\"preview-bit-question\"\nquestion: What is the decimal value of 00001010?\ntype: single-choice\noptions:\n  - text: 8\n    correct: false\n  - text: 10\n    correct: true\n  - text: 12\n    correct: false\nfeedback:\n  correct: Exactly. The set bits contribute 8 and 2.\n  incorrect: Look at the weights of the two set bits. Count from the right: 1, 2, 4, 8.\n```\n\n"
        }
        ,
        { title = "From bits to decisions"
        , slug = "from-bits-to-decisions"
        , summary = "Change the inputs, inspect the truth table, and connect a Boolean expression to its behavior."
        , path = "chapters/02-logic.md"
        , body = "\n## Two inputs, one decision\n\nNumbers are one use for bits. Another is a decision: **true** or **false**.\n\nAn AND operation is true only when both inputs are true. OR needs at least one true input. NOT reverses a value.\n\n<truth-table id=\"preview-truth\" />\n\n"
        }
        ]
    , groups =
        [
        { title = ""
        , chapterSlugs = ["thinking-in-bits", "from-bits-to-decisions"]
        }
        ]
    }
