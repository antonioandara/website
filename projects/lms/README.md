# MarkdownBook preview

A small public peek at the Elm LMS: two short lessons, a binary calculator,
a quiz, and an editable truth table. The lesson sidebar is flat; the reader has
no settings, theme studio, or Markdown styling studio.

The dark default and light alternative use the main site's colors, Libre
Baskerville, and IBM Plex Mono. The reader shares `manual-theme` with the main
site, including changes from another tab. Old LMS-specific preferences are
ignored. Answers and completion stay in memory and reset on reload.

- `demo/book/`: the two Markdown lessons.
- `demo/src/`: the website-local Elm reader and interactive components.
- `demo/src/MarkdownBook/View/Theme.elm`: the two fixed palettes.
- `demo/src/MarkdownBook/View/MarkdownStyle.elm`: fixed lesson styling.
- `demo/scripts/generate-book.mjs`: Markdown-to-Elm build step.
- `preview.png`: actual reader screenshot used by the homepage.

Run `npm run build:lms` and `npm run test:lms` from the repository root.
The main build includes this preview. To refresh the homepage screenshot,
run `REFRESH_LMS_PREVIEW=1 npm run test:lms`.

The source is a local adaptation of the original LMS. Changes here do not
alter the original project.
