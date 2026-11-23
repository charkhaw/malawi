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
 * design images. The captions only point to System Architecture Sections 4.2
 * to 4.4, so the attachment claims nothing the proposal does not.
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, PageNumber, Tab,
  Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, HeadingLevel,
  TabStopType,
} = require("docx");

const OUT = path.join(__dirname, "attachments", "Sample-Card-Images.docx");
const IMG = path.join(__dirname, "attachments", "sample-card-images");
const TITLE = "Sample Card Images";
const RFP_REF = "RFP No. MW-PPPC-546386-GO-RFB";
const BLUE = "2F5496";
const GREY = "404040";
const CONTENT_DXA = 11906 - 2 * 1440;          // A4 width less 1 inch margins
const CONTENT_MM = CONTENT_DXA / 1440 * 25.4;

/* ImageRun sizes are in pixels at 96 per inch; the images are placed by width
   in millimetres and keep their proportions. */
function image(name, widthMm) {
  const file = path.join(IMG, name + ".png");
  const data = fs.readFileSync(file);
  const w = data.readUInt32BE(16), h = data.readUInt32BE(20);   // PNG header
  const px = (mm) => Math.round(mm / 25.4 * 96);
  return new ImageRun({ type: "png", data, transformation: { width: px(widthMm), height: px(widthMm * h / w) } });
}

const figure = (name, widthMm) => new Paragraph({
  alignment: AlignmentType.CENTER,
  keepNext: true,                                // the caption stays with its image
  spacing: { before: 60, after: 80 },
  children: [image(name, widthMm)],
});

const caption = (text, last) => new Paragraph({
  spacing: { after: last ? 0 : 320 },
  children: [new TextRun({ text, size: 20, color: GREY })],
});

const heading = (text, pageBreakBefore) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  pageBreakBefore,
  children: [new TextRun(text)],
});

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const half = CONTENT_DXA / 2;
const personalized = (label, name, widthMm) => new TableCell({
  width: { size: half, type: WidthType.DXA },
  borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER },
  children: [
    new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [new TextRun({ text: label, bold: true })] }),
    new Paragraph({ children: [image(name, widthMm)] }),
  ],
});

/* both personalized faces at the same height */
const pairHeightMm = 46;
const pairWidth = (name) => {
  const d = fs.readFileSync(path.join(IMG, name + ".png"));
  return pairHeightMm * d.readUInt32BE(16) / d.readUInt32BE(20);
};

const doc = new Document({
  creator: "Inkript",
  title: TITLE,
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 21 } },          // 10.5pt, as the other documents
      title: {
        run: { font: "Calibri", size: 44, color: BLUE },
        paragraph: { spacing: { before: 0, after: 80 }, keepNext: true },
      },
      heading1: {
        run: { font: "Calibri", size: 26, bold: false, color: BLUE },
        paragraph: { spacing: { before: 120, after: 120 }, keepNext: true },
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
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 6 } },
          children: [new TextRun({ text: TITLE + "   |   " + RFP_REF, size: 16, color: "595959" })],
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
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(TITLE)] }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({
          text: "SAMPLE DESIGN", bold: true, size: 20, color: BLUE, characterSpacing: 30,
          border: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 2 },
        })],
      }),
      new Paragraph({ children: [new TextRun({ text: "Joint Venture of RM Enterprise Limited and Inkript Securities S.A.L", color: GREY })] }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: RFP_REF + ", Section VII, requirement 3.4.5.1", color: GREY })],
      }),
      new Paragraph({
        spacing: { after: 360, line: 276 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE, space: 8 } },
        children: [new TextRun(
          "The images show the blank card, front and back, and the personalized card, front and back, with the " +
          "security features marked. They are referred to in System Architecture Section 4.7 and in Technical " +
          "Responsiveness Checklist row 3.4.5.1. The final card layout and artwork are agreed with NRB in the joint " +
          "redesign described in Preliminary Project Plan Section 2.4.")],
      }),

      heading("1. Blank card, front"),
      figure("blank-front-features", 140),
      caption("Security features of the front, as described in System Architecture Section 4.2.", true),

      heading("2. Blank card, back", true),
      figure("blank-back-features", CONTENT_MM),
      caption("Security features of the back, as described in System Architecture Section 4.3."),
      heading("Blank card under ultraviolet light, front and back"),
      figure("uv-front-back", CONTENT_MM),
      caption("Invisible UV printing: the national emblem on the front, and the rising half-sun symbol on the back.", true),

      heading("Personalized card, front and back", true),
      new Table({
        width: { size: CONTENT_DXA, type: WidthType.DXA },
        columnWidths: [half, half],
        borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideHorizontal: NO_BORDER, insideVertical: NO_BORDER },
        rows: [new TableRow({
          cantSplit: true,
          children: [
            personalized("3. Personalized card, front", "personalized-front", pairWidth("personalized-front")),
            personalized("4. Personalized card, back", "personalized-back", pairWidth("personalized-back")),
          ],
        })],
      }),
      new Paragraph({
        spacing: { before: 80, after: 320 },
        children: [new TextRun({
          text: "Laser personalization within the card body, shown with specimen data. Personalization features as " +
                "described in System Architecture Section 4.4.",
          size: 20, color: GREY,
        })],
      }),
      heading("Laser and tactile features of the front"),
      figure("laser-tactile-features", CONTENT_MM),
      caption("Changing laser image (CLI), tactile micro-text in relief text and a deliberate error element (left), and " +
              "their position on the front artwork (right).", true),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("Wrote " + path.relative(__dirname, OUT) + "  (" + (buf.length / 1024).toFixed(0) + " KB)");
});
