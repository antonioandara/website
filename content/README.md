# Editing bilingual content

The magic homepage section and published journal entries are authored here.
Edit the corresponding files in **both** `en/` and `es/`, then run `npm run build`.
For a quick content-only update/check, run `npm run build:content`.

Each Markdown file starts with metadata between `---` lines. Metadata uses
plain, single-line `key: value` fields (not full YAML; do not wrap values in
quotes). The body supports standard Markdown: paragraphs, emphasis, links,
headings, lists, and code blocks. Keep drawings and interactive layouts in Elm.
The magic `lead` remains a separate field to preserve its larger typography.

To add a journal entry, create matching `journal/my-note.md` files in both
languages. Set `id: my-note` and include `number`, `category`, `title`, and
`summary`, followed by the Markdown body. Numbers must match across languages,
be unique in each language, and determine display order. Remove both files to
remove an entry. All entries here are published; keep drafts outside these folders.

The generator rejects missing metadata, duplicate fields, mismatched translation
IDs, and inconsistent journal numbers. It writes `src/Generated/Content.elm`;
that file is checked in for direct Elm compilation, but must never be edited by
hand. Commit regenerated content with Markdown changes.

`sections/magic.md` requires `id`, `heading`, `subtitle`, `plateMeta`,
`plateTitle`, `plateCaption`, and `lead`. This first migration supports only the
magic section; migrating another section requires extending the generator schema
and its Elm view. Interface labels still live in `src/Copy.elm`.

Run `npm run test:content` for generator checks and `npm test` for browser checks.
