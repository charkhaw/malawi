// Cybersecurity Risk Management Plan Figure 9.1, cybersecurity timeline. Weeks match the
// Information System schedule in make-schedule.js and the work packages in Section 9.1.
const ROWS = [
  { ms: true, label: "Contractual milestones", at: [6, 17, 20, 26, 28, 30, 32] },
  { phase: "1  Governance and management" },
  { label: "Security Working Group, every two weeks", bars: [[1, 32]], light: true },
  { label: "Policies; Statement of Applicability", bars: [[3, 4], [24, 1], [30, 1]] },
  { label: "Compliance status report, monthly", gates: [4, 8, 12, 16, 20, 24, 28, 32] },
  { phase: "2  Risk management" },
  { label: "Register baseline; threat model; privacy assessment", bars: [[1, 2], [3, 3]] },
  { label: "Risk review at each gate; acceptance", gates: [6, 17, 26, 30, 32] },
  { phase: "3  Security design" },
  { label: "Security Design Documentation", bars: [[3, 3]] },
  { label: "Hardening guide; detection use cases", bars: [[4, 13]] },
  { phase: "4  Secure build and supply chain" },
  { label: "Secure development and release gate", bars: [[3, 14]] },
  { label: "Equipment hardening; integrity baseline at FAT", bars: [[11, 7]] },
  { label: "Inspection on delivery", bars: [[15, 1], [21, 1]] },
  { phase: "5  Security implementation" },
  { label: "Security-first platform build", bars: [[15, 3]] },
  { label: "Key ceremony", bars: [[16, 1]] },
  { label: "Secondary environment", bars: [[16, 3]] },
  { label: "Machine Control Zone", bars: [[21, 3]] },
  { label: "Integration with NRB's Security Operations Center", bars: [[25, 1]], by: true },
  { phase: "6  Security testing and assurance" },
  { label: "Pre-commissioning tests 5 and 13", bars: [[19, 2]] },
  { label: "Security testing", bars: [[20, 2]] },
  { label: "Independent penetration test; remediation and retest", bars: [[24, 1], [25, 2]] },
  { label: "Security readiness review", gates: [26] },
  { label: "Operational acceptance tests 9 to 12", bars: [[27, 1]], by: true },
  { phase: "7  Incident response and continuity" },
  { label: "Escalation matrix; response plans; forensic readiness", bars: [[2, 1], [17, 3]] },
  { label: "Incident response exercise", bars: [[28, 1]], by: true },
  { phase: "8  Capacity building" },
  { label: "NRB staff shadow installation", bars: [[15, 12]], by: true },
  { label: "Security training modules", bars: [[25, 3]], by: true },
  { label: "NRB runs the Security Operations Center, observed", bars: [[27, 4]], by: true },
  { phase: "9  Handover" },
  { label: "Security Operations Center transferred; credentials rotated", bars: [[31, 2]], tail: true },
];

const F = require("./figlib.js")(1480, 1080, 16);
const LX = 20, GX = 500, WK = 26, TOP = 70, RH = 25.5;
const wx = (w) => GX + w * WK;   // x after w weeks

F.text(LX, 34, ["Week"], { size: 15, anchor: "start", weight: 700 });
for (let w = 0; w < 32; w++) {
  if (Math.floor(w / 4) % 2 === 0) F.raw(`<rect x="${wx(w)}" y="${TOP - 26}" width="${WK}" height="${ROWS.length * RH + 30}" fill="#f3f3f3"/>`);
  F.text(wx(w) + WK / 2, TOP - 12, [String(w + 1)], { size: 12.5 });
}
for (let w = 0; w <= 32; w += 4) F.line([[wx(w), TOP - 26], [wx(w), TOP + ROWS.length * RH + 4]], { width: 0.7 });
F.line([[LX, TOP], [wx(32), TOP]], { width: 1 });

F.raw(`<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#fff"/><line x1="0" y1="0" x2="0" y2="6" stroke="#000" stroke-width="1.6"/></pattern></defs>`);

function diamond(x, y, filled) {
  F.raw(`<path d="M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z" fill="${filled ? "#000" : "#fff"}" stroke="#000" stroke-width="1.4"/>`);
}

ROWS.forEach((r, i) => {
  const y = TOP + i * RH, cy = y + RH / 2;
  if (i % 2 === 1) F.raw(`<rect x="${LX}" y="${y}" width="${wx(32) - LX}" height="${RH}" fill="#000" fill-opacity="0.035"/>`);
  if (r.phase) { F.text(LX, cy, [r.phase], { size: 15, anchor: "start", weight: 700 }); return; }
  F.text(LX + (r.ms ? 0 : 22), cy, [r.label], { size: 15, anchor: "start", weight: r.ms ? 700 : 400 });
  for (const [s, d] of r.bars || []) {
    const fill = r.by ? "url(#hatch)" : r.light ? "#a6a6a6" : "#000";
    F.raw(`<rect x="${wx(s - 1) + 1}" y="${cy - 7}" width="${d * WK - 2}" height="14" fill="${fill}" stroke="#000" stroke-width="${r.light ? 1 : 1.6}"/>`);
  }
  for (const g of r.gates || []) diamond(wx(g), cy, false);
  for (const m of r.at || []) diamond(wx(m), cy, true);
  if (r.tail) {
    F.line([[wx(32) + 4, cy], [wx(32) + 40, cy]], { end: true, width: 2 });
    F.text(wx(32) + 48, cy - 9, ["Warranty", "services"], { size: 13, anchor: "start" });
  }
});

const ly = TOP + ROWS.length * RH + 32;
const items = [
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="#000" stroke="#000" stroke-width="1.6"/>`), "Supplier security activity"],
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="url(#hatch)" stroke="#000" stroke-width="1.6"/>`), "With or by NRB"],
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="#a6a6a6" stroke="#000"/>`), "Recurring"],
  [(x) => diamond(x + 20, ly, true), "Contractual milestone"],
  [(x) => diamond(x + 20, ly, false), "Security gate or event"],
];
let lx = LX;
for (const [draw, label] of items) { draw(lx); F.text(lx + 50, ly, [label], { size: 15, anchor: "start" }); lx += 60 + label.length * 7.6 + 30; }

F.write("figcsgantt");
