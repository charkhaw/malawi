// Figure 6.2, Design time and run time.
const F = require("./figlib.js")(1100, 900, 17);

// Panels
F.box(10, 10, 1080, 410, [], "solid");
F.text(30, 36, ["DESIGN TIME"], { size: 17, anchor: "start", weight: 700, spacing: 1.2 });
F.box(10, 440, 1080, 450, [], "solid");
F.text(30, 466, ["RUN TIME"], { size: 17, anchor: "start", weight: 700, spacing: 1.2 });

// Design time flow
F.box(30, 62, 220, 70, ["Card Layout", "Template Editor"]);
F.line([[250, 97], [360, 97]], { end: true });
F.label(305, 85, ["produces"]);
F.box(360, 62, 200, 70, ["Template", "(laser job file)"]);
F.line([[560, 97], [680, 97]], { end: true });
F.label(620, 67, ["versioned and", "approved"]);
F.box(680, 62, 220, 70, ["Approved template,", "version n"]);

// Card drawing: zones at fixed positions
const CW = 440, CH = 250;
function card(x0, y0, bound) {
  F.raw(`<rect x="${x0}" y="${y0}" width="${CW}" height="${CH}" rx="16" fill="#fff" stroke="#000" stroke-width="2"/>`);
  const Z = [
    ["portrait", "box", 16, 16, 100, 124],
    ["text fields", null, 130, 16, 170, 90],
    ["QR zone", null, 314, 16, 110, 90],
    ["signature", "field", 16, 150, 100, 44],
    ["micro-text zone", null, 130, 116, 170, 34],
    ["CLI window", null, 130, 158, 82, 36],
    ["tactile", "region", 218, 158, 82, 36],
    ["card identifier", "zone", 314, 116, 110, 78],
    ["MRZ zone", null, 16, 204, 408, 32],
  ];
  for (const [a, b, x, y, w, h] of Z) {
    F.raw(`<rect x="${x0 + x}" y="${y0 + y}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="5 4"/>`);
    const cx = x0 + x + w / 2, cy = y0 + y + h / 2;
    if (!bound) { F.text(cx, b ? cy - 9 : cy, b ? [a, b] : [a], { size: 14.5 }); continue; }
    if (a === "portrait") F.raw(`<rect x="${x0 + x + 10}" y="${y0 + y + 10}" width="${w - 20}" height="${h - 20}" fill="#cfcfcf"/>`);
    if (a === "text fields") [0, 1, 2, 3].forEach((i) => F.raw(`<rect x="${x0 + x + 12}" y="${y0 + y + 14 + i * 18}" width="${[140, 110, 130, 90][i]}" height="6" fill="#444"/>`));
    if (a === "QR zone") {
      const n = 11, m = 6.5, qx = cx - (n * m) / 2, qy = cy - (n * m) / 2;
      let x = 0x9e3779b9 | 0;
      const rnd = () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) & 1; };
      const inFinder = (r, c) => (r < 4 && c < 4) || (r < 4 && c > n - 5) || (r > n - 5 && c < 4);
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
        if (!inFinder(r, c) && rnd()) F.raw(`<rect x="${qx + c * m}" y="${qy + r * m}" width="${m}" height="${m}" fill="#000"/>`);
      for (const [r, c] of [[0, 0], [0, n - 3], [n - 3, 0]]) {
        const fx = qx + c * m, fy = qy + r * m;
        F.raw(`<rect x="${fx}" y="${fy}" width="${3 * m}" height="${3 * m}" fill="#000"/><rect x="${fx + m * 0.5}" y="${fy + m * 0.5}" width="${2 * m}" height="${2 * m}" fill="#fff"/><rect x="${fx + m}" y="${fy + m}" width="${m}" height="${m}" fill="#000"/>`);
      }
    }
    if (a === "signature") F.raw(`<path d="M${x0 + x + 14} ${cy + 6} q10 -18 20 0 t20 -4 t20 2 t18 -6" fill="none" stroke="#000" stroke-width="2"/>`);
    if (a === "micro-text zone") F.raw(`<rect x="${x0 + x + 12}" y="${cy - 1.5}" width="${w - 24}" height="3" fill="#444"/>`);
    if (a === "CLI window") F.raw(`<rect x="${x0 + x + 18}" y="${cy - 8}" width="${w - 36}" height="16" fill="#555"/>`);
    if (a === "tactile") F.raw(`<circle cx="${cx}" cy="${cy}" r="7" fill="#333"/>`);
    if (a === "card identifier") [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((i) => F.raw(`<rect x="${x0 + x + 16 + i * 6.6}" y="${y0 + y + 18}" width="${[3, 2, 4, 2, 3, 2, 2, 4, 3, 2, 3, 2][i]}" height="42" fill="#000"/>`));
    if (a === "MRZ zone") F.raw(`<text x="${cx}" y="${cy + 1}" font-family="Consolas, monospace" font-size="15" text-anchor="middle" dominant-baseline="central">&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>`);
  }
}
card(330, 140, false);
F.text(550, 407, ["Positions fixed at design time"], { size: 15.5 });

// Run time flow
F.line([[850, 132], [850, 474], [370, 474], [370, 492]], { end: true });
F.label(862, 300, ["template,", "read only"], "start");
F.box(20, 492, 170, 70, ["Citizen record", "from NRIS"]);
F.line([[190, 527], [270, 527]], { end: true });
F.box(270, 492, 200, 70, ["Data Preparation", "Service"]);
F.line([[470, 527], [580, 527]], { end: true });
F.label(525, 513, ["print-ready job"]);
F.box(580, 492, 180, 70, ["Printer Control", "Service"]);
F.line([[760, 527], [880, 527]], { end: true });
F.label(820, 513, ["batch"]);
F.box(880, 492, 200, 70, ["Laser Personalization", "Control Software"], "solid", { size: 16 });

card(330, 596, true);
F.text(550, 866, ["Values bound into the same positions at run time"], { size: 15.5 });

F.write("fig62");
