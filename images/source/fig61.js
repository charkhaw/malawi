// Figure 6.1, Application component architecture, drawn as SVG and rendered by headless Edge.
const fs = require("fs");
const OUT = "C:/Users/ckhawaja/AppData/Local/Temp/claude/c--Users-ckhawaja-Desktop-tender-Malawi/f4044861-1ae7-45be-98ca-7e097c9c52d8/scratchpad/fig61.html";
const W = 1640, H = 1045;
const FONT = "'Segoe UI', Arial, sans-serif";

const S = []; // svg parts

function box(x, y, w, h, lines, style = "solid", fs_ = 18.5) {
  const fill = style === "grey" ? "#d9d9d9" : "#ffffff";
  const dash = style === "dashed" ? ' stroke-dasharray="9 6"' : style === "dotted" ? ' stroke-dasharray="1.5 5" stroke-linecap="round" stroke-width="2.4"' : "";
  const sw = style === "dotted" ? "" : ' stroke-width="1.6"';
  if (style === "double") {
    S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#000" stroke-width="1.4"/>`);
    S.push(`<rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" fill="none" stroke="#000" stroke-width="1.4"/>`);
  } else {
    S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#000"${sw}${dash}/>`);
  }
  const lh = fs_ * 1.25, cy = y + h / 2 - ((lines.length - 1) * lh) / 2;
  lines.forEach((t, i) => S.push(`<text x="${x + w / 2}" y="${cy + i * lh}" font-size="${fs_}" text-anchor="middle" dominant-baseline="central">${t}</text>`));
}

function line(pts, { start = false, end = false, dashed = false, width = 1.6 } = {}) {
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  S.push(`<path d="${d}" fill="none" stroke="#000" stroke-width="${width}"${dashed ? ' stroke-dasharray="7 5"' : ""}${start ? ' marker-start="url(#a0)"' : ""}${end ? ' marker-end="url(#a1)"' : ""}/>`);
}

function label(x, y, lines, anchor = "middle", size = 13) {
  lines.forEach((t, i) => S.push(`<text x="${x}" y="${y + i * size * 1.25}" font-size="${size}" text-anchor="${anchor}" fill="#111">${t}</text>`));
}

// Software boundary
S.push(`<rect x="30" y="120" width="1245" height="735" rx="10" fill="none" stroke="#8a8a8a" stroke-width="1.3"/>`);
S.push(`<text x="52" y="836" font-size="14" font-weight="600" letter-spacing="1.6" fill="#666">APPLICATION SOFTWARE</text>`);

// Boxes
box(88, 20, 150, 66, ["NRIS"], "double");
box(730, 20, 190, 66, ["Hardware security", "modules (x2)"], "grey");
box(395, 165, 165, 75, ["Card Layout", "Template Editor"], "dashed");
box(730, 165, 190, 75, ["Signing Service"]);
box(60, 300, 205, 95, ["Card Personalization", "Management System,", "with Production", "Workflow Engine"], "solid", 16);
box(395, 300, 205, 95, ["Data Preparation", "Service"]);
box(730, 300, 190, 95, ["Printer Control", "Service"]);
box(1030, 300, 215, 95, ["Laser Personalization", "Control Software"], "dashed");
box(395, 465, 205, 85, ["Stock Control and", "Card Accountability"]);
box(730, 465, 190, 85, ["Quality Control", "Management"]);
box(1030, 465, 215, 85, ["Mailing and Dispatch", "Management System"]);
box(60, 635, 1185, 55, ["Database"], "dotted");
box(300, 750, 240, 75, ["Monitoring, Reporting", "and Analytics"]);
box(730, 750, 240, 75, ["Administration and", "Access Control (SSO)"]);
box(1405, 300, 195, 95, ["Personalization", "lines (x2)"], "grey");
box(1405, 465, 195, 85, ["Mailing lines (x2)"], "grey");
box(1405, 620, 195, 95, ["Courier or postal", "service, when", "introduced"], "double", 17);

// Connectors
line([[163, 86], [163, 262], [440, 262], [440, 300]], { start: true, end: true });
label(176, 252, ["requests / production status"], "start", 15);

line([[477, 240], [477, 300]], { end: true });
label(486, 276, ["template"], "start", 15);

line([[580, 300], [580, 202], [730, 202]], { start: true, end: true });
label(655, 170, ["QR payload /", "signature"], "middle", 15);

line([[825, 165], [825, 86]], { start: true, end: true });
label(836, 109, ["signing"], "start", 15);

line([[395, 330], [265, 330]], { end: true });
label(330, 320, ["queued records"], "middle", 15);
line([[265, 367], [395, 367]], { end: true });
label(330, 387, ["released batches"], "middle", 15);

line([[600, 347], [730, 347]], { end: true });
label(665, 337, ["print-ready jobs"], "middle", 15);

line([[920, 347], [1030, 347]], { start: true, end: true });
label(975, 318, ["batches out,", "results back"], "middle", 15);

line([[1245, 347], [1405, 347]], { end: true });

line([[1502, 395], [1502, 465]], { end: true, dashed: true });
label(1513, 425, ["manual batch", "transfer"], "start", 15);

line([[825, 395], [825, 465]], { end: true });
label(836, 436, ["card results"], "start", 15);

line([[600, 507], [730, 507]], { start: true, end: true });
label(665, 497, ["stock check"], "middle", 15);

line([[920, 507], [1030, 507]], { end: true });
label(975, 479, ["accepted", "cards"], "middle", 15);

line([[1245, 500], [1405, 500]], { start: true, end: true });
label(1347, 472, ["job data,", "match results"], "middle", 15);

line([[1245, 535], [1330, 535], [1330, 667], [1405, 667]], { start: true, end: true });
label(1341, 584, ["dispatch data /", "delivery status"], "start", 15);

// Database links
line([[162, 395], [162, 635]]);
line([[497, 550], [497, 635]]);
line([[825, 550], [825, 635]]);
line([[1137, 550], [1137, 635]]);
line([[420, 690], [420, 750]]);
line([[850, 690], [850, 750]]);

// Legend
S.push(`<rect x="30" y="885" width="1060" height="140" fill="#fff" stroke="#000" stroke-width="1.3"/>`);
S.push(`<text x="48" y="913" font-size="16" font-weight="700">Legend</text>`);
const L = [
  [48, 930, "solid", "Developed for this Contract"],
  [370, 930, "dashed", "Supplied by the equipment manufacturer"],
  [775, 930, "dotted", "Licensed third-party software"],
  [48, 978, "grey", "Hardware"],
  [370, 978, "double", "External system"],
];
for (const [x, y, st, t] of L) {
  box(x, y, 62, 30, [], st);
  S.push(`<text x="${x + 76}" y="${y + 15}" font-size="16" dominant-baseline="central">${t}</text>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">
<defs>
<marker id="a1" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#000"/></marker>
<marker id="a0" viewBox="0 0 10 10" refX="0.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="#000"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="#fff"/>
${S.join("\n")}
</svg>`;
fs.writeFileSync(OUT, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#fff}svg{display:block}</style></head><body>${svg}</body></html>`);
console.log("wrote " + OUT);
