import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bookDir = path.join(root, "book");
const outDir = path.join(root, "generated", "Generated");
const outFile = path.join(outDir, "Book.elm");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) {
    return [{}, content];
  }

  const end = content.indexOf("\n---", 4);

  if (end === -1) {
    return [{}, content];
  }

  const raw = content.slice(4, end).trim();
  const body = content.slice(end + "\n---".length).replace(/^\n/, "");
  const meta = {};

  for (const line of raw.split("\n")) {
    const index = line.indexOf(":");

    if (index > -1) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      meta[key] = value;
    }
  }

  return [meta, body];
}

function chapterLinks(markdown) {
  const lines = markdown.split('\n');
  const groups = [];
  let currentGroup = null;

  for (const line of lines) {
    const groupMatch = line.match(/^### (.+)/);
    if (groupMatch) {
      currentGroup = { title: groupMatch[1].trim(), chapters: [] };
      groups.push(currentGroup);
      continue;
    }

    const linkMatch = line.match(/^- \[(.+?)\]\((.+?)\)/);
    if (linkMatch) {
      const entry = { label: linkMatch[1], path: linkMatch[2] };
      if (currentGroup) {
        currentGroup.chapters.push(entry);
      } else {
        if (groups.length === 0 || groups[groups.length - 1].title !== '') {
          groups.push({ title: '', chapters: [] });
        }
        groups[groups.length - 1].chapters.push(entry);
      }
    }
  }

  return groups;
}

function elmString(value) {
  return JSON.stringify(value);
}

function chapterRecord(chapter) {
  return `        { title = ${elmString(chapter.title)}
        , slug = ${elmString(chapter.slug)}
        , summary = ${elmString(chapter.summary)}
        , path = ${elmString(chapter.path)}
        , body = ${elmString(chapter.body)}
        }`;
}

const [bookMeta, bookBody] = parseFrontmatter(read(path.join(bookDir, "book.md")));
const groups = chapterLinks(bookBody);
const allChapterEntries = groups.flatMap(g => g.chapters);

const chapters = allChapterEntries.map((link) => {
  const fullPath = path.join(bookDir, link.path);
  const [meta, body] = parseFrontmatter(read(fullPath));

  return {
    title: meta.title || link.label,
    slug: meta.slug || path.basename(link.path, ".md"),
    summary: meta.summary || "",
    path: link.path,
    body
  };
});

const groupRecords = groups.map(g => {
  const slugs = g.chapters.map(link => {
    const fullPath = path.join(bookDir, link.path);
    const [meta] = parseFrontmatter(read(fullPath));
    return meta.slug || path.basename(link.path, ".md");
  });
  return `        { title = ${elmString(g.title)}\n        , chapterSlugs = [${slugs.map(s => elmString(s)).join(', ')}]\n        }`;
});

const moduleSource = `module Generated.Book exposing (book)

import MarkdownBook.Model exposing (Book)


book : Book
book =
    { title = ${elmString(bookMeta.title || "Untitled Book")}
    , author = ${elmString(bookMeta.author || "")}
    , slug = ${elmString(bookMeta.slug || "book")}
    , summary = ${elmString(bookMeta.summary || "")}
    , chapters =
${chapters.length === 0 ? "        []" : "        [\n" + chapters.map(chapterRecord).join("\n        ,\n") + "\n        ]"}
    , groups =
${groupRecords.length === 0 ? "        []" : "        [\n" + groupRecords.join("\n        ,\n") + "\n        ]"}
    }
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, moduleSource);
console.log(`Generated ${path.relative(root, outFile)} with ${chapters.length} chapters.`);
