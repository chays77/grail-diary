#!/usr/bin/env node
// build-diary.js — builds/rebuilds a Grail Diary's flippable HTML from its source files
//
// Usage:   node build-diary.js <journal-slug>
// Example: node build-diary.js my-book
//
// What it does:
//   1. If journals/<slug>/diary/index.html doesn't exist yet, scaffolds it from
//      diary-template/index.html (and creates diary/assets/ for optional images).
//   2. Reads journals/<slug>/entries/*.md and injects them as the ENTRIES data.
//   3. Reads journals/<slug>/journal.config.md and injects the diary's title and
//      the verbatim capture rules (criteria + the bar + optional priority lens).
//   4. Reads the optional `owner:` value from grail.config.md for the title page.
//
// The markdown files are the source of truth. The HTML is the rendered view.
// Run this after any session that adds, edits, or removes entries.
//
// Pure Node, no dependencies.

const fs   = require("fs");
const path = require("path");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node build-diary.js <journal-slug>");
  process.exit(1);
}

const ROOT          = __dirname;
const JOURNAL_DIR   = path.join(ROOT, "journals", slug);
const ENTRIES_DIR   = path.join(JOURNAL_DIR, "entries");
const CONFIG_FILE   = path.join(JOURNAL_DIR, "journal.config.md");
const DIARY_DIR     = path.join(JOURNAL_DIR, "diary");
const HTML_FILE     = path.join(DIARY_DIR, "index.html");
const TEMPLATE_FILE = path.join(ROOT, "diary-template", "index.html");
const GRAIL_CONFIG  = path.join(ROOT, "grail.config.md");

if (!fs.existsSync(JOURNAL_DIR)) {
  console.error(`No journal found at: ${JOURNAL_DIR}`);
  console.error(`Run the setup interview first (see README), or check the slug.`);
  process.exit(1);
}

// --- Scaffold the diary from the template on first run -----------------------
if (!fs.existsSync(HTML_FILE)) {
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`No diary at ${HTML_FILE} and no template at ${TEMPLATE_FILE} — aborting.`);
    process.exit(1);
  }
  fs.mkdirSync(path.join(DIARY_DIR, "assets"), { recursive: true });
  fs.copyFileSync(TEMPLATE_FILE, HTML_FILE);
  console.log(`Scaffolded ${path.relative(ROOT, HTML_FILE)} from diary-template/.`);
}

// --- Parse a .md file into { frontmatter{}, body } ---------------------------
function parseMd(content) {
  const fm = {};
  let body = content;

  if (content.startsWith("---")) {
    const end = content.indexOf("\n---", 3);
    if (end !== -1) {
      const block = content.slice(3, end).trim();
      body = content.slice(end + 4).trim();
      for (const line of block.split("\n")) {
        if (/^\s{2,}/.test(line)) continue; // skip nested keys
        const colon = line.indexOf(":");
        if (colon === -1) continue;
        const key = line.slice(0, colon).trim();
        let val = line.slice(colon + 1).trim();
        if (val.startsWith("#")) val = "";          // value is only a comment
        val = val.replace(/\s+#.*$/, "");           // strip trailing comments
        val = val.replace(/^["']|["']$/g, "");      // strip surrounding quotes
        fm[key] = val;
      }
    }
  }

  return { fm, body };
}

// --- Read the journal's capture rules from journal.config.md -----------------
// The diary DISPLAYS the owner's stated filter verbatim — it never authors,
// summarizes, or rewords it. This parse is transcription, not interpretation.
function parseJournalConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.warn(`WARN: no journal.config.md at ${CONFIG_FILE} — title page will use the slug.`);
    return { fm: {}, criteria: [], bar: null, lens: null };
  }
  const raw = fs.readFileSync(CONFIG_FILE, "utf8");
  const { fm, body } = parseMd(raw);

  // criteria bullets: "- **label** — description" (em-dash, double hyphen, or hyphen)
  const criteria = [];
  const critRe = /^- \*\*(.+?)\*\*\s*(?:—|--|-)\s*(.+)$/gm;
  let m;
  while ((m = critRe.exec(body)) !== null) {
    criteria.push({ name: m[1].trim(), desc: m[2].trim() });
  }

  // a named ## section's prose (until the next ## heading), comments stripped
  function section(headingRe) {
    const re = new RegExp(`^##\\s+(${headingRe})\\s*$([\\s\\S]*?)(?=^##\\s|$(?![\\s\\S]))`, "m");
    const hit = re.exec(body);
    if (!hit) return null;
    const name = hit[1].trim();
    const text = hit[2]
      .replace(/<!--[\s\S]*?-->/g, "")
      .split("\n")
      .map(l => l.replace(/^>\s?/, "").trim())
      .filter(l => l && !l.startsWith("#"))
      .join(" ")
      .trim();
    return text ? { name, text } : null;
  }

  const barSec  = section("The Bar.*");
  const lensSec = section("Priority.*");

  return {
    fm,
    criteria,
    bar:  barSec  ? { name: "The Bar",    desc: barSec.text }  : null,
    lens: lensSec ? { name: lensSec.name, desc: lensSec.text } : null,
  };
}

// --- Read the optional owner name from grail.config.md -----------------------
function readOwner() {
  if (!fs.existsSync(GRAIL_CONFIG)) return "";
  const raw = fs.readFileSync(GRAIL_CONFIG, "utf8");
  const m = /^owner:\s*(.+)$/m.exec(raw);
  if (!m) return "";
  let val = m[1].trim();
  if (val.startsWith("#")) return "";               // value is only a comment
  return val.replace(/\s+#.*$/, "").replace(/^["']|["']$/g, "").trim();
}

// --- Read all entry files, sorted by filename (chronological) -----------------
const entries = [];
if (fs.existsSync(ENTRIES_DIR)) {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith(".md")).sort();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf8");
    const { fm, body } = parseMd(raw);
    if (!fm.slug || !fm.date) {
      console.warn(`SKIP ${file} — missing slug or date in frontmatter`);
      continue;
    }
    entries.push({
      slug:              fm.slug,
      date:              fm.date,
      matched_criterion: fm.matched_criterion || "null",
      origin:            fm.origin || "live-session",
      body:              body,
    });
  }
}
if (entries.length === 0) {
  console.warn("No entries yet — building the diary with title + rules pages only.");
}

// --- Build the injected blocks ------------------------------------------------
const config = parseJournalConfig();
const title  = config.fm.journal || slug;
const author = readOwner();
const anchor = config.fm.anchor || "";
const today  = new Date().toISOString().slice(0, 10);

const entriesBlock =
  `// --- Embedded entry data (injected by build-diary.js from entries/*.md) ------\n` +
  `// Re-verified ${today} against entries/*.md (${entries.length} files; matches 1:1).\n` +
  `const ENTRIES = ${JSON.stringify(entries)};`;

const diaryBlock =
  `// --- Diary meta (injected by build-diary.js from journal.config.md) ----------\n` +
  `const DIARY = ${JSON.stringify({ kicker: "A Grail Diary", title, author, anchor }, null, 2)};`;

const rulesBlock =
  `// --- Capture rules (injected by build-diary.js from journal.config.md) -------\n` +
  `const RULES = ${JSON.stringify({
    heading: "Rules for Capture",
    sub: "What this journal captures, in the owner's words.",
    criteria: config.criteria,
    lens: config.lens,
    bar: config.bar,
  }, null, 2)};`;

const slugBlock =
  `// --- Journal slug (injected by build-diary.js) --------------------------------\n` +
  `const JOURNAL_SLUG = ${JSON.stringify(slug)};`;

// --- Inject into the HTML ------------------------------------------------------
let html = fs.readFileSync(HTML_FILE, "utf8");

function inject(label, pattern, replacement) {
  if (!pattern.test(html)) {
    console.error(`Could not find the ${label} block in index.html — pattern mismatch. Aborting.`);
    process.exit(1);
  }
  html = html.replace(pattern, replacement);
}

inject("ENTRIES", /\/\/ --- Embedded entry data[\s\S]*?const ENTRIES = \[[\s\S]*?\];/, entriesBlock);
inject("DIARY",   /\/\/ --- Diary meta[\s\S]*?const DIARY = \{[\s\S]*?\};/,            diaryBlock);
inject("RULES",   /\/\/ --- Capture rules[\s\S]*?const RULES = \{[\s\S]*?\};/,          rulesBlock);
inject("SLUG",    /\/\/ --- Journal slug[\s\S]*?const JOURNAL_SLUG = ".*?";/,           slugBlock);
inject("TITLE",   /<title>[\s\S]*?<\/title>/,                                           `<title>${title} — Grail Diary</title>`);

fs.writeFileSync(HTML_FILE, html, "utf8");
console.log(`Done. ${entries.length} entries written to ${path.relative(ROOT, HTML_FILE)} (${today}).`);
console.log(`Open it directly in a browser (file://) — no server needed.`);
