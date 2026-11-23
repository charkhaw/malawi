/*
 * Writes the attachment "Sample card images", cited by System Architecture
 * Section 4.7 and Technical Responsiveness Checklist row 3.4.5.1.
 *
 *   node make-card-images.js
 *
 * Output: attachments/Sample-Card-Images.docx
 *
 * The PDF is this file converted by LibreOffice, as the System Architecture's
 * is: soffice --headless --convert-to pdf --outdir attachments <the .docx>
 *
 * The images in attachments/sample-card-images/ are the card manufacturer's
 * design images, enlarged (Lanczos) to 300 dpi at the size they are placed here
 * and lightly sharpened, so that they print and zoom cleanly. The files as
 * received are in sample-card-images/original/.
 *
 * Nothing here claims more than the proposal: the captions point to System
 * Architecture Sections 4.2 to 4.4, and the feature map on the last page only
 * points each feature listed in Section VII 3.4.2 to 3.4.4 at the image that
 * shows it. Its page numbers are those of the layout below: one page each for
 * the opening, the front, the back and the personalized card.
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, PageNumber, Tab,
  Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, HeadingLevel,
  TabStopType, ShadingType, VerticalAlign, LevelFormat,
} = require("docx");

const OUT = path.join(__dirname, "attachments", "Sample-Card-Images.docx");
const IMG = path.join(__dirname, "attachments", "sample-card-images");
const TITLE = "Sample Card Images";
const RFP_REF = "RFP No. MW-PPPC-546386-GO-RFB";
const BLUE = "2F5496";
const GREY = "404040";
const RULE = "BFBFBF";
const CONTENT_DXA = 11906 - 2 * 1440;          // A4 width less 1 inch margins
const CONTENT_MM = CONTENT_DXA / 1440 * 25.4;

/* ------------------------------------------------------------- building blocks */

/* ImageRun sizes are in pixels at 96 per inch; the images are placed by width
   in millimetres and keep their proportions. */
function pngSize(name) {
  const d = fs.readFileSync(path.join(IMG, name + ".png"));
  return { data: d, w: d.readUInt32BE(16), h: d.readUInt32BE(20) };   // PNG header
}
function image(name, widthMm) {
  const { data, w, h } = pngSize(name);
  const px = (mm) => Math.round(mm / 25.4 * 96);
  return new ImageRun({ type: "png", data, transformation: { width: px(widthMm), height: px(widthMm * h / w) } });
}

const run = (text, opts = {}) => new TextRun({ text, ...opts });

const figure = (name, widthMm) => new Paragraph({
  alignment: AlignmentType.CENTER,
  keepNext: true,                                // the caption stays with its image
  spacing: { before: 60, after: 80 },
  children: [image(name, widthMm)],
});

const caption = (text, last) => new Paragraph({
  spacing: { after: last ? 0 : 320 },
  children: [run(text, { size: 20, color: GREY })],
});

const heading = (text, pageBreakBefore) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  pageBreakBefore,
  children: [run(text)],
});

const LINE = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

/* A ruled table, in the style of the other documents: dual widths in DXA, a
   shaded header row, and group rows spanning the table where given. */
function table(widths, header, rows) {
  const cell = (text, i, { head, group } = {}) => new TableCell({
    width: { size: group ? CONTENT_DXA : widths[i], type: WidthType.DXA },
    columnSpan: group ? widths.length : undefined,
    shading: head || group ? { type: ShadingType.CLEAR, fill: head ? "EDEDED" : "F5F7FB" } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({ children: [run(text, { bold: head || group, color: group ? BLUE : undefined, size: 20 })] })],
  });
  return new Table({
    width: { size: CONTENT_DXA, type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: LINE, bottom: LINE, left: LINE, right: LINE, insideHorizontal: LINE, insideVertical: LINE },
    rows: [
      new TableRow({ tableHeader: true, cantSplit: true, children: header.map((t, i) => cell(t, i, { head: true })) }),
      ...rows.map((r) => new TableRow({
        cantSplit: true,
        children: typeof r === "string" ? [cell(r, 0, { group: true })] : r.map((t, i) => cell(t, i)),
      })),
    ],
  });
}

/* the facts that identify the attachment, as label and value without rules */
function facts(rows) {
  const widths = [2300, CONTENT_DXA - 2300];
  return new Table({
    width: { size: CONTENT_DXA, type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
    rows: rows.map(([label, value]) => new TableRow({
      cantSplit: true,
      children: [label, value].map((t, i) => new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
        margins: { top: 40, bottom: 40, left: 0, right: 100 },
        children: [new Paragraph({ children: [run(t, i === 0 ? { bold: true, color: GREY } : {})] })],
      })),
    })),
  });
}

/* the requirement, quoted as Section VII states it: its sentence, then its list,
   in one shaded cell, so the bar beside it runs straight past the bullets */
const quote = (sentence, items) => new Table({
  width: { size: CONTENT_DXA, type: WidthType.DXA },
  columnWidths: [CONTENT_DXA],
  borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
  rows: [new TableRow({
    cantSplit: true,
    children: [new TableCell({
      width: { size: CONTENT_DXA, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: "F5F7FB" },
      borders: { left: { style: BorderStyle.SINGLE, size: 24, color: BLUE }, top: NONE, bottom: NONE, right: NONE },
      margins: { top: 100, bottom: 100, left: 220, right: 220 },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [run(sentence, { italics: true })] }),
        ...items.map((t) => new Paragraph({ numbering: { reference: "quote-bullets", level: 0 }, children: [run(t)] })),
      ],
    })],
  })],
});

/* -------------------------------------------------- personalized pair, page 4 */

const half = CONTENT_DXA / 2;
const PAIR_HEIGHT_MM = 46;                       // both faces at the same height
const personalized = (label, name) => {
  const { w, h } = pngSize(name);
  return new TableCell({
    width: { size: half, type: WidthType.DXA },
    borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
    children: [
      new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [run(label, { bold: true })] }),
      new Paragraph({ children: [image(name, PAIR_HEIGHT_MM * w / h)] }),
    ],
  });
};

/* ------------------------------------------------------------- feature map */

/* Every feature Section VII lists in 3.4.2 to 3.4.4, in its order and wording,
   with repeats merged, and where it is shown. */
const FEATURES = [
  "Front, requirement 3.4.2",
  ["Guilloche background", "Page 2: guilloche background"],
  ["Rainbow (IRIS) printing", "Page 2: rainbow (IRIS) colour transition effect"],
  ["Optical Variable Magnetic Ink (OVMI) with Malawi flag motif", "Page 2: OVMI, the rising sun of the Malawi flag"],
  ["CLI (Changing Laser Image), photo and number", "Page 4: CLI zone of the personalized front"],
  ["Microtext, including micro-text within the portrait box", "Page 2: micro-text within the portrait box, and micro-text with deliberate error"],
  ["Relief tactile text, and tactile micro-text in relief text", "Page 4: tactile micro-text in relief text"],
  ["Deliberate error elements (micro-text and relief text)", "Page 2: in the micro-text. Page 4: in the relief text"],
  ["Invisible UV elements, front and back, and invisible UV printing (national emblem)", "Page 3: national emblem on the front under UV light"],
  ["Numismatic background pattern", "Page 2: numismatic security background"],
  ["Crystal pattern security background, and photonic crystal pattern elements", "Page 2: photonic crystal pattern security background"],
  ["Thermochromic ink", "Page 2: thermochromic ink"],
  "Back, requirement 3.4.3",
  ["Rainbow colour transition effect", "Page 3: rainbow (IRIS) colour transition effect"],
  ["Optically Variable Magnetic Ink (OVMI), Malawi map or rising red half-sun symbol", "Page 3: OVMI, the map of Malawi"],
  ["Invisible UV printing, Malawi map or rising red half-sun symbol", "Page 3: rising half-sun on the back under UV light"],
  ["Photonic crystal patterns", "Page 3: photonic crystal pattern"],
  ["Guilloche security structures", "Page 3: photonic crystal pattern with guilloche security"],
  ["Micro-text, and deliberate error elements", "Page 3: micro-text with deliberate error"],
  "Personalization, requirement 3.4.4",
  ["High-resolution portrait (600+ dpi)", "Page 4: portrait on the personalized front"],
  ["Stacked-layer greyscale personalization", "Page 4: personalized front and back"],
  ["Secondary image", "Page 4: second portrait in the CLI zone"],
  ["CLI elements", "Page 4: photo and number in the CLI zone"],
  ["Micro-lettering (above 600 dpi)", "Page 4: micro-text in relief text"],
  ["QR code, and multilingual data", "Page 4: QR code on the back; English and Chichewa fields on the front"],
  ["Tactile laser printing", "Page 4: tactile micro-text in relief text"],
];

/* -------------------------------------------------------------- the document */

const doc = new Document({
  creator: "Inkript",
  title: TITLE,
  numbering: {
    config: [{
      reference: "quote-bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } } },
      }],
    }],
  },
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 21 } },          // 10.5pt, as the other documents
      title: {
        run: { font: "Calibri", size: 48, color: BLUE },
        paragraph: { spacing: { before: 0, after: 40 }, keepNext: true },
      },
      heading1: {
        run: { font: "Calibri", size: 26, bold: false, color: BLUE },
        paragraph: { spacing: { before: 240, after: 120 }, keepNext: true },
      },
    },
    // the page numbers take their size from the paragraph style in LibreOffice
    paragraphStyles: [
      { id: "Footer", name: "footer", basedOn: "Normal", run: { size: 16, color: "595959" } },
    ],
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
          children: [run(TITLE + "   |   " + RFP_REF, { size: 16, color: "595959" })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          style: "Footer",
          tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_DXA }],
          // one run per piece: LibreOffice, which makes the PDF, drops the size
          // of a field's value and of the text after it when they share a run
          children: ["Sample design", new Tab(), "Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES]
            .map((c) => new TextRun({ size: 16, color: "595959", children: [c] })),
        })],
      }),
    },
    children: [
      /* page 1: what this answers, and where to find each image */
      new Paragraph({ heading: HeadingLevel.TITLE, children: [run(TITLE)] }),
      new Paragraph({
        spacing: { after: 280 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE, space: 8 } },
        children: [
          run("Attachment to the Technical Proposal", { size: 26, color: GREY }),
          run("     "),
          run("SAMPLE DESIGN", {
            bold: true, size: 18, color: BLUE, characterSpacing: 30,
            border: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 2 },
          }),
        ],
      }),
      facts([
        ["Requirement", "Section VII, 3.4.5 Sample Card Images, requirement 3.4.5.1"],
        ["Referred to in", "System Architecture Section 4.7, and Technical Responsiveness Checklist row 3.4.5.1"],
      ]),

      heading("The requirement"),
      quote(
        "3.4.5.1 The firm shall provide sample card images demonstrating the exact layout, design and security features. Required samples include:",
        [
          "Blank Card – Front Side (Image)",
          "Blank Card – Back Side (Image)",
          "Personalized Card – Front Side (Image)",
          "Personalized Card – Back Side (Image)",
        ]),

      heading("Where each image is"),
      table([CONTENT_DXA - 1400, 1400], ["Image", "Page"], [
        ["1. Blank card, front, with its security features marked", "2"],
        ["2. Blank card, back, with its security features marked", "3"],
        ["Blank card under ultraviolet light, front and back", "3"],
        ["3. Personalized card, front", "4"],
        ["4. Personalized card, back", "4"],
        ["Laser and tactile features of the front", "4"],
        ["Security feature map: each feature listed in requirements 3.4.2 to 3.4.4, and where it is shown", "5"],
      ]),
      new Paragraph({
        spacing: { before: 240, line: 276 },
        children: [run(
          "The images show a sample design of the card. The final layout and artwork are agreed with NRB in the " +
          "joint redesign described in Preliminary Project Plan Section 2.4.")],
      }),

      /* page 2 */
      heading("1. Blank card, front", true),
      figure("blank-front-features", 140),
      caption("Security features of the front, as described in System Architecture Section 4.2.", true),

      /* page 3 */
      heading("2. Blank card, back", true),
      figure("blank-back-features", CONTENT_MM),
      caption("Security features of the back, as described in System Architecture Section 4.3."),
      heading("Blank card under ultraviolet light, front and back"),
      figure("uv-front-back", CONTENT_MM),
      caption("Invisible UV printing: the national emblem on the front, and the rising half-sun symbol on the back.", true),

      /* page 4 */
      heading("Personalized card, front and back", true),
      new Table({
        width: { size: CONTENT_DXA, type: WidthType.DXA },
        columnWidths: [half, half],
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
        rows: [new TableRow({
          cantSplit: true,
          children: [
            personalized("3. Personalized card, front", "personalized-front"),
            personalized("4. Personalized card, back", "personalized-back"),
          ],
        })],
      }),
      new Paragraph({
        spacing: { before: 80, after: 320 },
        children: [run(
          "Laser personalization within the card body, shown with specimen data. Personalization features as " +
          "described in System Architecture Section 4.4.", { size: 20, color: GREY })],
      }),
      heading("Laser and tactile features of the front"),
      figure("laser-tactile-features", CONTENT_MM),
      caption("Changing laser image (CLI), tactile micro-text in relief text and a deliberate error element (left), and " +
              "their position on the front artwork (right).", true),

      /* page 5 */
      heading("Security feature map", true),
      new Paragraph({
        spacing: { after: 160 },
        children: [run("Each security feature listed in Section VII requirements 3.4.2 to 3.4.4, and the image in this attachment that shows it.")],
      }),
      table([4300, CONTENT_DXA - 4300], ["Feature, as listed in Section VII", "Where it is shown"], FEATURES),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("Wrote " + path.relative(__dirname, OUT) + "  (" + (buf.length / 1024).toFixed(0) + " KB)");
});
