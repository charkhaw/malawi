/*
 * Writes the Power and Air Pressure Requirements document, the dedicated
 * document Section VII clause 3.2.6.1.3 asks for, in the house style of the
 * documents build-docx.js produces.
 *
 *   node make-power-air.js
 *
 * Output: Power-and-Air-Pressure-Requirements.docx
 *
 * The power figures are the manufacturer's datasheet values for the laser
 * personalization system. The air figures follow the manufacturer's
 * confirmation that the laser-only configuration offered uses no compressed
 * air. The document is short enough to be written here directly rather than
 * from Markdown sections with a contents page.
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Header, Footer,
  PageNumber, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
} = require("docx");

const OUT = path.join(__dirname, "Power-and-Air-Pressure-Requirements.docx");
const TITLE = "Power and Air Pressure Requirements";
const RFP_REF = "RFP No. MW-PPPC-546386-GO-RFB";
const CONTENT_DXA = 9020;   // A4 width less 1 inch margins, as in build-docx.js

const POWER = [
  ["Supply voltage", "100 to 240 VAC"],
  ["Supply frequency", "50/60 Hz"],
  ["Power supply rating", "2,500 W per machine"],
  ["Machines supplied", "2"],
  ["Total for both machines", "5,000 W"],
];
const AIR = [
  ["Compressed air", "Not required"],
  ["Air pressure", "Not applicable"],
  ["Flow rate", "Not applicable"],
  ["Compressor specification", "Not applicable"],
];

const para = (text) => new Paragraph({ spacing: { after: 140, line: 276 }, children: [new TextRun(text)] });
const heading = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 140 }, children: [new TextRun(text)] });

function table(rows) {
  const widths = [3600, CONTENT_DXA - 3600];
  const cell = (text, i, isHeader) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: isHeader ? { type: ShadingType.CLEAR, fill: "EDEDED" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text, bold: isHeader })] })],
  });
  return new Table({
    columnWidths: widths,
    width: { size: CONTENT_DXA, type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: ["Item", "Requirement"].map((t, i) => cell(t, i, true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((t, i) => cell(t, i, false)) })),
    ],
  });
}

const doc = new Document({
  creator: "Inkript",
  title: TITLE,
  styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },   // 10.5pt
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
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: ["Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES], size: 16, color: "595959" })],
        })],
      }),
    },
    children: [
      new Paragraph({ spacing: { before: 240, after: 80 }, children: [new TextRun({ text: TITLE, size: 32, color: "2F5496" })] }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "Laser personalization systems. Response to Section VII clause 3.2.6.1.3", size: 22, color: "595959" })],
      }),

      heading("1. Purpose"),
      para("This document sets out the electrical power and air pressure requirements of the personalization unit, as Section VII clause 3.2.6.1.3 requires. It covers the two laser personalization systems supplied, which are identical. The power figures are those of the manufacturer's datasheet, attached to the proposal as the laser personalization system datasheet."),

      heading("2. Electrical power requirements"),
      table(POWER),
      new Paragraph({ spacing: { after: 0 }, children: [] }),
      para("Each machine is supplied from a dedicated circuit of the facility's electrical installation, described in System Architecture Section 9.5. The facility supply of 220 V plus or minus 20 V at 50 Hz plus or minus 2 Hz, given for the equipment in System Architecture Section 9.4, is within the machine's input range."),

      heading("3. Air pressure requirements"),
      table(AIR),
      new Paragraph({ spacing: { after: 0 }, children: [] }),
      para("The personalization systems are offered for laser personalization without drop-on-demand inkjet printing. In that configuration they use no compressed air, as the manufacturer confirms, so no air pressure, flow rate or compressor applies, and no air compressor is supplied or installed."),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("Wrote " + path.basename(OUT) + "  (" + Math.round(buf.length / 1024) + " KB)");
});
