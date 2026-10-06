/*
 * Builds a document's section files into one Word document.
 *
 *   node build-docx.js          the System Architecture
 *   node build-docx.js pp       the Preliminary Project Plan
 *
 * Documents are declared in docs.config.js. For each, the contents register
 * is picked up first and then every section file in numeric order, so adding
 * a new section file is all that is needed for it to appear in the output.
 *
 * A reference into another document is written "System Architecture Section
 * 12.4". It stays plain text, since a field cannot point into another file,
 * and the build checks it against that document's real headings instead.
 *
 * Section numbers are not written into the document as text. Headings carry a
 * multilevel list, so Word owns the numbering: delete 3.1 in Word and 3.2
 * becomes 3.1 on the spot. The contents page is a real TOC field and every
 * "Section 9.2" in the body is a REF field pointing at that heading's
 * bookmark, so both follow the same renumbering on F9.
 *
 * Numbers still live in the markdown headings. They are the stable identity
 * behind the bookmarks and the cross-references, and the build checks them
 * against their position, so the source and the document cannot drift apart
 * silently. A cross-reference to a section that does not exist fails the build.
 *
 * All of this is field codes, so the build finishes by asking Word to evaluate
 * them. If Word is unavailable the document is still produced, and still shows
 * the right numbers, because every field is written with a cached value.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  ImageRun, PageBreak, Header, Footer, PageNumber,
  Bookmark,
  LevelFormat, LevelSuffix, TableOfContents, SimpleField,
} = require("docx");

const DOCS = require("./docs.config");

const KEY = process.argv[2] || "sa";
const DOC = DOCS[KEY];
if (!DOC) { console.error("Unknown document '" + KEY + "'. Known: " + Object.keys(DOCS).join(", ")); process.exit(1); }

const ROOT = __dirname;
const SRC = path.join(ROOT, DOC.dir);
const OUT = path.join(ROOT, DOC.out);

const DOC_TITLE = DOC.title;
const RFP_REF = "RFP No. MW-PPPC-546386-GO-RFB";

const CONTENT_DXA = 9020;   // A4 width less 1 inch margins
const IMG_MAX_PX = 600;

/* ------------------------------------------------------------------ files */

const sectionRe = (doc) => new RegExp("^" + doc.prefix + "-S(\\d+)");
const SECTION_RE = sectionRe(DOC);

function sectionFiles() {
  const all = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
  const toc = all.filter((f) => f === DOC.toc);
  const secs = all
    .filter((f) => SECTION_RE.test(f))
    .map((f) => ({ f, n: parseInt(f.match(SECTION_RE)[1], 10) }))
    .sort((a, b) => a.n - b.n)
    .map((x) => x.f);
  return [...toc, ...secs];
}

/* -------------------------------------------------------------- bookmarks */

/* "8.1 Dispatch record generation" -> "sec_8_1";  "Annex A. Abbreviations" -> "annex_a" */
function anchorFor(text) {
  const num = text.match(/^(\d+(?:\.\d+)*)[.\s]/);
  if (num) return "sec_" + num[1].replace(/\./g, "_");
  const annex = text.match(/^Annex\s+([A-Za-z])/);
  if (annex) return "annex_" + annex[1].toLowerCase();
  return null;
}

/* every heading that exists in a document's sections: this document's, so that
   only live targets are linked, and another document's, so that references into
   it can be checked */
function liveAnchors(doc) {
  const dir = path.join(ROOT, doc.dir);
  const re = sectionRe(doc);
  const set = new Set();
  for (const f of fs.readdirSync(dir).filter((x) => re.test(x))) {
    fs.readFileSync(path.join(dir, f), "utf8").replace(/\r\n/g, "\n").split("\n")
      .filter((l) => /^#{1,2} /.test(l))
      .forEach((l) => {
        const a = anchorFor(l.replace(/^#{1,2} /, "").trim());
        if (a) set.add(a);
      });
  }
  return set;
}

const NUM_REF = "section-numbering";

/* "9. Infrastructure" -> { number: "9", title: "Infrastructure" }
   "9.1 Sizing basis"  -> { number: "9.1", title: "Sizing basis" }
   "Annex A. ..."      -> { number: null, title: unchanged }
   The number is dropped from the text because the multilevel list supplies it. */
function splitHeading(text) {
  const m = text.match(/^(\d+(?:\.\d+)*)\.?\s+(.*)$/);
  return m ? { number: m[1], title: m[2].trim() } : { number: null, title: text };
}

/* ------------------------------------------------------ cross-references */

let ANCHORS = new Set();
const DANGLING = [];

/* "Section 9.2", "Sections 9.1 and 9.4", "Sections 6.2, 6.3 and 6.4" */
const XREF_PHRASE = /\bSections?\s+\d+(?:\.\d+)?(?:(?:,|\s+and)\s+\d+(?:\.\d+)?)*/g;

/* Within a matched phrase every N.M becomes a REF field carrying the current
   number as its cached value, so the text reads correctly before Word updates
   it. A bare section number is left as text: REF would return "9." including
   the separator the list format puts after a top-level number. */
function phraseRuns(phrase, style) {
  const out = [];
  const re = /\d+\.\d+/g;
  let last = 0, m;
  while ((m = re.exec(phrase)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: phrase.slice(last, m.index), ...style }));
    const anchor = "sec_" + m[0].replace(/\./g, "_");
    if (ANCHORS.has(anchor)) {
      out.push(new SimpleField("REF " + anchor + " \\w \\h", m[0]));
    } else {
      DANGLING.push(m[0]);
      out.push(new TextRun({ text: m[0], ...style }));
    }
    last = m.index + m[0].length;
  }
  if (last < phrase.length) out.push(new TextRun({ text: phrase.slice(last), ...style }));
  return out;
}

/* "System Architecture Section 12.4" points into another document. A field
   cannot follow it there, so it stays as text, and each number in it is
   checked against that document's headings so a renumber there cannot leave
   this document pointing at the wrong place without anyone noticing. */
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const EXT_NAMES = Object.keys(DOC.external || {});
const EXT_PHRASE = EXT_NAMES.length
  ? new RegExp("\\b(" + EXT_NAMES.map(escapeRe).join("|") + ")\\s+(Sections?\\s+\\d+(?:\\.\\d+)?(?:(?:,|\\s+and)\\s+\\d+(?:\\.\\d+)?)*)", "g")
  : null;
const EXT_ANCHORS = {};
const EXT_DANGLING = [];

function externalRanges(text) {
  if (!EXT_PHRASE) return [];
  const ranges = [];
  let m;
  EXT_PHRASE.lastIndex = 0;
  while ((m = EXT_PHRASE.exec(text)) !== null) {
    ranges.push([m.index, m.index + m[0].length]);
    const name = m[1];
    const anchors = EXT_ANCHORS[name] || (EXT_ANCHORS[name] = liveAnchors(DOCS[DOC.external[name]]));
    for (const n of m[2].match(/\d+(?:\.\d+)?/g) || []) {
      if (!anchors.has("sec_" + n.replace(/\./g, "_"))) EXT_DANGLING.push(name + " Section " + n);
    }
  }
  return ranges;
}

function xrefRuns(text, style) {
  const ext = externalRanges(text);
  const inExternal = (i) => ext.some(([a, b]) => i >= a && i < b);
  const out = [];
  let last = 0, m;
  XREF_PHRASE.lastIndex = 0;
  while ((m = XREF_PHRASE.exec(text)) !== null) {
    if (inExternal(m.index)) continue;   // left in the text run that follows
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...style }));
    out.push(...phraseRuns(m[0], style));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...style }));
  return out;
}

/* ------------------------------------------------------- image dimensions */

function pngSize(b) {
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

function jpgSize(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return { w: IMG_MAX_PX, h: Math.round(IMG_MAX_PX / 2) };
}

function imageParagraph(relPath) {
  const abs = path.resolve(SRC, relPath);
  if (!fs.existsSync(abs)) {
    console.warn("  ! image not found, skipped: " + relPath);
    return null;
  }
  const data = fs.readFileSync(abs);
  const ext = path.extname(abs).slice(1).toLowerCase();
  const type = ext === "jpeg" ? "jpg" : ext;
  const { w, h } = type === "png" ? pngSize(data) : jpgSize(data);
  const scale = Math.min(1, IMG_MAX_PX / w);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 120 },
    children: [new ImageRun({
      data, type,
      transformation: { width: Math.round(w * scale), height: Math.round(h * scale) },
    })],
  });
}

/* ------------------------------------------------------------ inline bold */

function runs(text, { italics = false, bold = false, xref = false } = {}) {
  const emit = (t, style) =>
    xref ? xrefRuns(t, style) : [new TextRun({ text: t, ...style })];

  const out = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(...emit(text.slice(last, m.index), { italics, bold }));
    out.push(...emit(m[1], { italics, bold: true }));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...emit(text.slice(last), { italics, bold }));
  return out.length ? out : [new TextRun({ text, italics, bold })];
}

/* ------------------------------------------------------------ contents page */

/* A real TOC field, so the contents follow the headings rather than being a
   second copy of them. Word fills it from the Heading 1 and Heading 2 styles,
   numbers included. */
function contentsField() {
  return new TableOfContents("Contents", {
    hyperlink: true,
    headingStyleRange: "1-2",
  });
}

/* ---------------------------------------------------------------- tables */

function splitRow(line) {
  return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
}

function buildTable(rows) {
  const header = rows[0];
  const body = rows.slice(1);
  const cols = header.length;

  const weights = [];
  for (let c = 0; c < cols; c++) {
    let total = header[c].length;
    for (const r of body) total += (r[c] || "").length;
    weights.push(Math.max(total / (body.length + 1), 6));
  }
  const sum = weights.reduce((a, b) => a + b, 0);
  const widths = weights.map((w) => Math.round((w / sum) * CONTENT_DXA));
  widths[cols - 1] += CONTENT_DXA - widths.reduce((a, b) => a + b, 0);

  const cell = (text, i, isHeader) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: isHeader ? { type: ShadingType.CLEAR, fill: "EDEDED" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      spacing: { before: 0, after: 0 },
      children: runs(text, { bold: isHeader, xref: true }),
    })],
  });

  return new Table({
    columnWidths: widths,
    width: { size: CONTENT_DXA, type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: header.map((t, i) => cell(t, i, true)) }),
      ...body.map((r) => new TableRow({
        children: header.map((_, i) => cell(r[i] || "", i, false)),
      })),
    ],
  });
}

/* ------------------------------------------------------------- md parsing */

function parseMarkdown(md, { isToc, isFirstFile }) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let para = [];
  let table = null;

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ");
    // a caption hard-wrapped over several lines arrives here, not at the one-line caption rule
    const cap = text.match(/^\*([^*].*[^*])\*$/);
    out.push(cap
      ? new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: runs(cap[1], { italics: true, xref: true }),
        })
      : new Paragraph({
          spacing: { after: 140, line: 276 },
          children: runs(text, { xref: true }),
        }));
    para = [];
  };
  const flushTable = () => {
    if (!table) return;
    out.push(buildTable(table));
    out.push(new Paragraph({ spacing: { after: 140 }, children: [] }));
    table = null;
  };
  const flushAll = () => { flushPara(); flushTable(); };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (/^\s*\|/.test(line)) {
      flushPara();
      const cells = splitRow(line);
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
      (table = table || []).push(cells);
      continue;
    }
    flushTable();

    if (!line.trim()) { flushPara(); continue; }

    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flushAll();
      const depth = m[1].length;
      const text = m[2].trim();

      // the contents page lists entries as "### N. Title" and "- N.M Title";
      // the TOC field supplies those now, so the lines themselves are dropped
      if (isToc && depth === 3) continue;

      // The contents page carries the document title and the word "Contents".
      // They are styled to look like headings but are deliberately not Heading
      // styles, because the TOC field collects Heading 1 and 2 and would
      // otherwise list the contents page inside itself.
      if (isToc) {
        out.push(new Paragraph({
          spacing: { before: depth === 1 ? 240 : 360, after: 140 },
          children: [new TextRun({ text, size: depth === 1 ? 32 : 26, color: "2F5496" })],
        }));
        if (depth === 2) out.push(contentsField());
        continue;
      }

      if (depth === 1 && !isFirstFile && out.length === 0) {
        out.push(new Paragraph({ children: [new PageBreak()] }));
      }

      const heading = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2,
                       HeadingLevel.HEADING_3, HeadingLevel.HEADING_4][depth - 1];
      const anchor = isToc ? null : anchorFor(text);
      const { number, title } = isToc ? { number: null, title: text } : splitHeading(text);
      /* The bookmark starts one character into the title, not at the start of
         the paragraph. Inserting a new heading by clicking at the start of an
         existing one and typing is the natural way to do it, and a bookmark
         that began at position zero would swallow the new text: the reference
         would then silently point at the new section instead of the one it was
         written about. One character of clearance puts the insertion outside
         the bookmark, and REF still resolves because the bookmark is still
         inside the heading paragraph. */
      const children = anchor
        ? [
            new TextRun({ text: title.slice(0, 1) }),
            new Bookmark({ id: anchor, children: runs(title.slice(1)) }),
          ]
        : runs(title);

      out.push(new Paragraph({
        heading,
        // the number comes from the multilevel list, not from the text
        numbering: number ? { reference: NUM_REF, level: depth - 1 } : undefined,
        spacing: { before: depth === 1 ? 240 : 260, after: 140 },
        children,
      }));
      if (isToc && depth === 2) out.push(contentsField());
      continue;
    }

    if ((m = line.match(/^!\[[^\]]*\]\(([^)]+)\)\s*$/))) {
      flushAll();
      const p = imageParagraph(m[1]);
      if (p) out.push(p);
      continue;
    }

    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { flushAll(); continue; }

    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara();
      if (isToc) continue;   // contents entries come from the TOC field
      out.push(new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 60 },
        children: runs(m[1], { xref: true }),
      }));
      continue;
    }

    if ((m = line.match(/^\*([^*].*[^*])\*\s*$/))) {
      flushPara();
      out.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: runs(m[1], { italics: true, xref: true }),
      }));
      continue;
    }

    para.push(line.trim());
  }

  flushAll();
  return out;
}

/* ------------------------------------------------------------------ build */

const files = sectionFiles();
if (!files.length) { console.error("No source files found in " + SRC); process.exit(1); }

const anchors = liveAnchors(DOC);
ANCHORS = anchors;

/* Headings are numbered by position. If a markdown heading says 7.5 but sits
   fifth in its section, the bookmark and every cross-reference to it would
   point somewhere the reader does not expect, so stop rather than ship it. */
(function checkHeadingOrder() {
  const wrong = [];
  for (const f of files.filter((x) => SECTION_RE.test(x))) {
    const lines = fs.readFileSync(path.join(SRC, f), "utf8").replace(/\r\n/g, "\n").split("\n");
    let section = null, sub = 0;
    for (const l of lines) {
      let m;
      if ((m = l.match(/^# (.*)$/))) {
        sub = 0;
        const n = m[1].trim().match(/^(\d+)\./);
        section = n ? n[1] : null;
      } else if ((m = l.match(/^## (.*)$/))) {
        sub++;
        const lit = m[1].trim().match(/^(\d+)\.(\d+)\s/);
        if (!lit) { wrong.push(f + "  ## " + m[1].trim() + "  (no number)"); continue; }
        if (lit[1] !== section || Number(lit[2]) !== sub) {
          wrong.push(f + "  " + lit[1] + "." + lit[2] + " is in position " + section + "." + sub);
        }
      }
    }
  }
  if (wrong.length) {
    console.error("\nHeading numbers do not match their position:");
    for (const w of wrong) console.error("  ! " + w);
    console.error("\nRenumber the markdown headings and run this again.");
    process.exit(1);
  }
})();

const children = [];
files.forEach((f, i) => {
  console.log("  + " + f);
  const md = fs.readFileSync(path.join(SRC, f), "utf8");
  if (i > 0) children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(...parseMarkdown(md, {
    isToc: /TOC\.md$/i.test(f), isFirstFile: i === 0,
  }));
});

/* Warn about Table of Contents entries that have no drafted content. */
(function checkPending() {
  const toc = files.find((f) => /TOC\.md$/i.test(f));
  if (!toc) return;
  const entries = fs.readFileSync(path.join(SRC, toc), "utf8")
    .replace(/\r\n/g, "\n").split("\n")
    .filter((l) => /^- \d+\.\d+ /.test(l))
    .map((l) => l.replace(/^- /, "").trim());
  const missing = entries.filter((e) => {
    const a = anchorFor(e);
    return !a || !anchors.has(a);
  });
  if (missing.length) {
    console.log("\n  WARNING: " + missing.length + " Table of Contents entr" +
      (missing.length === 1 ? "y has" : "ies have") + " no drafted content:");
    for (const m of missing) console.log("    ! " + m);
    console.log("    (rendered without a link or page number)");
  }
})();

/* Only "Section 4.2" becomes a field. A reference written as "described in 4.2"
   stays plain text and silently stops following the numbering, which is exactly
   the failure this whole mechanism exists to prevent. Catch the ones that read
   like a reference: a number that matches a real section and follows a word
   that introduces one. Figure captions, ITP clause numbers, TLS versions and
   measurements do not follow those words, so they are left alone. */
(function checkBareRefs() {
  const found = [];
  for (const f of files.filter((x) => SECTION_RE.test(x))) {
    const lines = fs.readFileSync(path.join(SRC, f), "utf8").replace(/\r\n/g, "\n").split("\n");
    lines.forEach((l, i) => {
      if (/^#{1,4} /.test(l)) return;
      // blank out what is already a proper reference, so "Sections 4.2 and 4.3"
      // does not report its own second half, and references into another
      // document, whose numbers mean nothing here
      let rest = EXT_PHRASE ? l.replace(EXT_PHRASE, (m) => " ".repeat(m.length)) : l;
      rest = rest.replace(XREF_PHRASE, (m) => " ".repeat(m.length));
      // (?!\.\d) skips deeper clause numbers such as 5.2.1.2, which are the RFP's, not
      // ours, while still catching a bare "4.5." at the end of a sentence
      for (const m of rest.matchAll(/\b(?:in|under|see|per|and|,)\s+(\d+\.\d+)(?!\.\d)/gi)) {
        if (ANCHORS.has("sec_" + m[1].replace(".", "_"))) {
          found.push(f + ":" + (i + 1) + "  " + l.trim());
        }
      }
    });
  }
  const uniq = [...new Set(found)];
  if (uniq.length) {
    console.error("\n" + uniq.length + " line(s) reference a section without the word \"Section\",");
    console.error("so they would stay as plain text and not follow the numbering:");
    for (const x of uniq) console.error("  ! " + x);
    process.exit(1);
  }
})();

/* A cross-reference to a section that is not there would render in Word as
   "Error! Reference source not found." Catch it here instead. */
if (DANGLING.length) {
  const list = [...new Set(DANGLING)].sort();
  console.error("\n" + DANGLING.length + " cross-reference(s) point at sections that do not exist:");
  for (const d of list) console.error("  ! Section " + d);
  process.exit(1);
}
if (EXT_DANGLING.length) {
  const list = [...new Set(EXT_DANGLING)].sort();
  console.error("\n" + list.length + " reference(s) into another document point at sections that do not exist there:");
  for (const d of list) console.error("  ! " + d);
  process.exit(1);
}

const doc = new Document({
  creator: "Inkript",
  title: DOC_TITLE,
  /* Word never refreshes a REF or TOC field while you type. This asks it to
     refresh every field when the document is opened, so an editing session
     always starts from correct numbers rather than yesterday's. Ctrl+A then F9
     does the same thing on demand, mid-session. */
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: "Calibri", size: 21 } } },   // 10.5pt
  },
  /* Word owns the section numbers. Level 0 numbers the Heading 1 paragraphs,
     level 1 the Heading 2 paragraphs beneath them, and a space after the
     number keeps the headings reading exactly as they did before. */
  numbering: {
    config: [{
      reference: NUM_REF,
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          suffix: LevelSuffix.SPACE,
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 0, firstLine: 0 } } },
        },
        {
          level: 1,
          format: LevelFormat.DECIMAL,
          text: "%1.%2",
          suffix: LevelSuffix.SPACE,
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 0, firstLine: 0 } } },
        },
      ],
    }],
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 6 } },
          children: [new TextRun({ text: DOC_TITLE + "   |   " + RFP_REF, size: 16, color: "595959" })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: ["Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES], size: 16, color: "595959" })],
        })],
      }),
    },
    children,
  }],
});

/* ------------------------------------------------- evaluate page-number fields */

function updateFields(file) {
  const ps = [
    "$ErrorActionPreference='Stop'",
    "$w=New-Object -ComObject Word.Application",
    "$w.Visible=$false; $w.DisplayAlerts=0",
    "$d=$w.Documents.Open('" + file.replace(/'/g, "''") + "',$false,$false)",
    // page numbers only resolve once Word has laid the document out
    "$d.Repaginate()",
    "$d.Fields.Update() | Out-Null",
    "foreach($s in $d.StoryRanges){ $s.Fields.Update() | Out-Null }",
    // repaginate and update again: filling the numbers can itself shift the layout
    "$d.Repaginate()",
    "$d.Fields.Update() | Out-Null",
    "$d.Save(); $d.Close([ref]$false); $w.Quit()",
  ].join("; ");
  execFileSync("powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", ps],
    { stdio: "pipe", timeout: 240000 });
}

/* Word consumes the update-on-open flag: it opens the file, refreshes the
   fields, and saves without the setting because it considers the job done. The
   post-build field evaluation therefore strips what the packer wrote, so the
   flag has to be put back afterwards. The schema fixes where it goes: the
   CT_Settings sequence puts updateFields immediately before footnotePr. */
async function setUpdateFieldsOnOpen(file) {
  const JSZip = require("jszip");
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const name = "word/settings.xml";
  let xml = await zip.file(name).async("string");
  if (/<w:updateFields\b/.test(xml)) return false;
  const tag = '<w:updateFields w:val="true"/>';
  xml = xml.includes("<w:footnotePr")
    ? xml.replace("<w:footnotePr", tag + "<w:footnotePr")
    : xml.replace("</w:settings>", tag + "</w:settings>");
  zip.file(name, xml);
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return true;
}

Packer.toBuffer(doc).then(async (buf) => {
  try {
    fs.writeFileSync(OUT, buf);
  } catch (e) {
    if (e.code === "EBUSY" || e.code === "EPERM") {
      console.error("\nCannot write " + path.basename(OUT) + ": the file is open.");
      console.error("Close it in Word (and in any preview pane) and run this again.");
      process.exit(1);
    }
    throw e;
  }
  console.log("\nWrote " + path.basename(OUT) + "  (" + (buf.length / 1024).toFixed(0) + " KB, " + files.length + " source files)");
  try {
    updateFields(OUT);
    console.log("Contents page links and page numbers evaluated.");
    if (await setUpdateFieldsOnOpen(OUT)) {
      console.log("Set to refresh all fields when the document is opened.");
    }
  } catch (e) {
    console.log("Could not evaluate page-number fields (Word unavailable).");
    console.log("The contents page is still clickable. Open in Word and press Ctrl+A then F9 to fill the page numbers.");
  }
});
