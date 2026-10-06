/*
 * Rebuilds a document's contents register from its section files.
 *
 *   node sync-toc.js          the System Architecture
 *   node sync-toc.js pp       the Preliminary Project Plan
 *
 * The contents page in the Word file is a TOC field that Word builds from the
 * headings, so the entry lines in the register are not rendered. The register
 * remains the record of the structure the document is meant to have, which is
 * what makes a missing subsection detectable.
 *
 * Pending subsections are declared per document in docs.config.js. They are
 * written into the register so the gap has somewhere to show, and
 * build-docx.js warns about them on every build.
 */

const fs = require("fs");
const path = require("path");
const DOCS = require("./docs.config");

const KEY = process.argv[2] || "sa";
const DOC = DOCS[KEY];
if (!DOC) { console.error("Unknown document '" + KEY + "'. Known: " + Object.keys(DOCS).join(", ")); process.exit(1); }

const SRC = path.join(__dirname, DOC.dir);
const TOC = path.join(SRC, DOC.toc);
const SECTION_RE = new RegExp("^" + DOC.prefix + "-S(\\d+)");
const PENDING = DOC.pending || [];

function sectionFiles() {
  return fs.readdirSync(SRC)
    .filter((f) => SECTION_RE.test(f))
    .map((f) => ({ f, n: parseInt(f.match(SECTION_RE)[1], 10) }))
    .sort((a, b) => a.n - b.n);
}

const blocks = [];
for (const { f, n } of sectionFiles()) {
  const lines = fs.readFileSync(path.join(SRC, f), "utf8").replace(/\r\n/g, "\n").split("\n");
  const h1 = lines.find((l) => /^# /.test(l));
  if (!h1) continue;
  const title = h1.replace(/^# /, "");
  const subs = lines.filter((l) => /^## /.test(l)).map((l) => l.replace(/^## /, ""));

  // splice in any pending entries for this section, after their stated predecessor
  for (const p of PENDING.filter((x) => x.section === n)) {
    const i = subs.findIndex((s) => s.startsWith(p.after + " "));
    if (i >= 0) subs.splice(i + 1, 0, p.title);
    else subs.push(p.title);
  }

  blocks.push({ annex: /^Annex/i.test(title), title, subs });
}

const out = ["# " + DOC.title, "", "## Table of Contents", "", "---", ""];
for (const b of blocks) {
  if (b.annex) out.push("---", "");
  out.push("### " + b.title);
  for (const s of b.subs) out.push("- " + s);
  out.push("");
}

const raw = fs.existsSync(TOC) ? fs.readFileSync(TOC, "utf8") : "";
const crlf = raw.includes("\r\n");
const text = out.join("\n").replace(/\n+$/, "\n");
fs.writeFileSync(TOC, crlf ? text.replace(/\n/g, "\r\n") : text);

console.log("ToC rebuilt from " + blocks.length + " section files  (" + DOC.dir + ")");
if (PENDING.length) {
  console.log("\n" + PENDING.length + " subsection(s) listed but NOT DRAFTED:");
  for (const p of PENDING) console.log("  ! " + p.title);
}
