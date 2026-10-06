// Plan Figure 2.1, Information System schedule. Read from make-schedule.js so it cannot drift.
const fs = require("fs");
const SRC = "C:/Users/ckhawaja/Desktop/tender Malawi/make-schedule.js";

// Plan and total float, as in the schedule analysis: earliest start from the links, latest finish
// from week 32 and from every contractual milestone treated as a deadline at its stated week.
const src = fs.readFileSync(SRC, "utf8");
const PLAN = eval(src.slice(src.indexOf("const T = "), src.indexOf("/* ------------------------------------------------------------- normalize")) + "; PLAN");
const t = {};
for (const p of PLAN) {
  if (p.sum) continue;
  const x = { ...p, ms: p.at !== undefined };
  x.start = x.ms ? x.at : x.s - 1; x.dur = x.ms ? 0 : x.d; x.finish = x.start + x.dur;
  x.links = (p.pred || []).map((y) => (Array.isArray(y) ? { k: y[0], type: y[1], lag: y[2] } : { k: y, type: "FS", lag: 0 }));
  t[x.key] = x;
}
const keys = Object.keys(t), order = [], seen = new Set();
const visit = (k) => { if (seen.has(k)) return; seen.add(k); t[k].links.forEach((l) => visit(l.k)); order.push(k); };
keys.forEach(visit);
const es = {};
for (const k of order) {
  let e = 0;
  for (const l of t[k].links) {
    const p = t[l.k];
    if (l.type === "FS") e = Math.max(e, es[l.k] + p.dur + l.lag);
    if (l.type === "SS") e = Math.max(e, es[l.k] + l.lag);
    if (l.type === "FF") e = Math.max(e, es[l.k] + p.dur + l.lag - t[k].dur);
  }
  es[k] = e;
}
const succ = {}; keys.forEach((k) => (succ[k] = []));
for (const k of keys) for (const l of t[k].links) succ[l.k].push({ ...l, k });
const lf = {};
for (const k of [...order].reverse()) {
  let late = 32;
  if (t[k].contract) late = Math.min(late, t[k].finish);
  for (const s of succ[k]) {
    const ls = lf[s.k] - t[s.k].dur;
    if (s.type === "FS") late = Math.min(late, ls - s.lag);
    if (s.type === "SS") late = Math.min(late, ls - s.lag + t[k].dur);
    if (s.type === "FF") late = Math.min(late, lf[s.k] - s.lag);
  }
  lf[k] = late;
}
const critical = (k) => !t[k].ms && lf[k] - (es[k] + t[k].dur) === 0;
for (const k of keys) if (es[k] !== t[k].start) throw new Error(`${k}: stated week ${t[k].start + 1}, links give ${es[k] + 1}`);

// Rows shown. "by" marks work by the Purchaser or other parties.
const ROWS = [
  { phase: "1  Project mobilization and planning", keys: ["mob", "base", "disc1", "order"] },
  { phase: "2  Design and detailed planning", keys: ["disc2", "hld", "lld", "icd", "secd", "card", "proc", "drev"], ms: ["dda"] },
  { label: "Discovery and Discovery Report", keys: ["disc1", "disc2"] },
  { label: "High-Level and Low-Level Design", keys: ["hld", "lld"] },
  { label: "Interface Control Documents", keys: ["icd"] },
  { label: "Design review and approval", keys: ["drev"], ms: ["dda"] },
  { phase: "3  Procurement and manufacturing", keys: ["mfg", "mfgopt", "cardsfat", "cardsbulk", "cards2", "ictp", "app1", "app2", "sim", "intb"] },
  { label: "Equipment manufacture, then options fitted", keys: ["mfg", "mfgopt"] },
  { label: "Blank cards: first run, first delivery, remainder", keys: ["cardsfat", "cardsbulk", "cards2"], ms2: ["carddel", "cardsall"] },
  { label: "ICT infrastructure manufacture and delivery", keys: ["ictp"] },
  { label: "Application build", keys: ["app1", "app2"] },
  { label: "NRIS interface, tested against simulators", keys: ["sim", "intb"] },
  { label: "NRIS side of the interface (NRB)", keys: ["nrisside"], by: true },
  { phase: "4  Facility renovation (facility works)", keys: ["fac"], by: true, ms2: ["srvready"] },
  { phase: "5  Factory acceptance testing", keys: ["fat", "pcs", "fattrain"], ms: ["fatms"] },
  { phase: "6  Shipping and customs clearance", keys: ["ship", "cust"], ms: ["onsite"] },
  { phase: "7  Installation and site acceptance testing", keys: ["ictdel", "plat", "hsm", "appdep", "dr", "nrisint1", "nrisint2", "insp", "eqinst", "precomit", "perfsec", "precomeq", "pen", "uat", "pilot"] },
  { label: "ICT installation and platform build", keys: ["ictdel", "plat", "hsm", "appdep"] },
  { label: "Secondary environment and replication", keys: ["dr"] },
  { label: "Document Signer certificate (e-Government)", keys: ["dsissue"], by: true },
  { label: "Integration with NRIS", keys: ["nrisint1", "nrisint2"] },
  { label: "Equipment installation and commissioning", keys: ["insp", "eqinst"] },
  { label: "Pre-commissioning, performance, security tests", keys: ["precomit", "perfsec", "pen", "precomeq"] },
  { label: "User acceptance testing and pilot production", keys: ["uat", "pilot"], ms: ["satms"] },
  { phase: "8  Training and knowledge transfer", keys: ["shadow", "tuser", "ttech", "tmgmt", "tcover"] },
  { label: "Shadowing of installation and commissioning", keys: ["shadow"] },
  { label: "User, technical and management training", keys: ["tuser", "ttech", "tmgmt", "tcover"], ms: ["tms"] },
  { phase: "9  Commissioning and performance testing", keys: ["oat1", "oat2", "oat16", "oat17"], ms: ["comms"] },
  { phase: "10  Handover, go-live and closure", keys: ["asbuilt", "soc", "stab"], ms: ["golive"] },
];

const F = require("./figlib.js")(1360, 930, 16);
const LX = 20, GX = 470, WK = 27, TOP = 70, RH = 25.5;
const wx = (w) => GX + w * WK;   // x at the start of week w + 1, i.e. after w weeks

// Header and grid
F.text(LX, 34, ["Week"], { size: 15, anchor: "start", weight: 700 });
for (let w = 0; w < 32; w++) {
  if (Math.floor(w / 4) % 2 === 0) F.raw(`<rect x="${wx(w)}" y="${TOP - 26}" width="${WK * 1}" height="${ROWS.length * RH + 30}" fill="#f3f3f3"/>`);
  F.text(wx(w) + WK / 2, TOP - 12, [String(w + 1)], { size: 12.5 });
}
for (let w = 0; w <= 32; w += 4) F.line([[wx(w), TOP - 26], [wx(w), TOP + ROWS.length * RH + 4]], { width: 0.7 });
F.line([[LX, TOP], [wx(32), TOP]], { width: 1 });

// Hatch for work by others
F.raw(`<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#fff"/><line x1="0" y1="0" x2="0" y2="6" stroke="#000" stroke-width="1.6"/></pattern></defs>`);

function diamond(x, y, filled) {
  F.raw(`<path d="M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z" fill="${filled ? "#000" : "#fff"}" stroke="#000" stroke-width="1.4"/>`);
}

ROWS.forEach((r, i) => {
  const y = TOP + i * RH, cy = y + RH / 2;
  if (i % 2 === 1) F.raw(`<rect x="${LX}" y="${y}" width="${wx(32) - LX}" height="${RH}" fill="#000" fill-opacity="0.035"/>`);
  if (r.phase) {
    F.text(LX, cy, [r.phase], { size: 15, anchor: "start", weight: 700 });
    const s = Math.min(...r.keys.map((k) => t[k].start)), f = Math.max(...r.keys.map((k) => t[k].finish));
    const phaseOnly = !ROWS[i + 1] || ROWS[i + 1].phase;
    if (!phaseOnly) {
      // summary bracket
      F.raw(`<path d="M${wx(s)} ${cy + 5} L${wx(s)} ${cy - 4} L${wx(f)} ${cy - 4} L${wx(f)} ${cy + 5}" fill="none" stroke="#000" stroke-width="2.4"/>`);
    }
  } else {
    F.text(LX + 22, cy, [r.label], { size: 15, anchor: "start" });
  }
  const leaf = !r.phase || !ROWS[i + 1] || ROWS[i + 1].phase;
  if (leaf) {
    const ks = [...r.keys].sort((a, b) => critical(a) - critical(b));
    for (const k of ks) {
      const x = wx(t[k].start), w = t[k].dur * WK;
      const fill = r.by ? "url(#hatch)" : critical(k) ? "#000" : "#a6a6a6";
      const sw = critical(k) ? 2.2 : 1;
      F.raw(`<rect x="${x + 1}" y="${cy - 7}" width="${w - 2}" height="14" fill="${fill}" stroke="#000" stroke-width="${sw}"/>`);
    }
  }
  for (const m of r.ms || []) diamond(wx(t[m].at), cy, true);
  for (const m of r.ms2 || []) diamond(wx(t[m].at), cy, false);
});

// Legend
const ly = TOP + ROWS.length * RH + 30;
const items = [
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="#000" stroke="#000" stroke-width="2.2"/>`), "Critical: no float"],
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="#a6a6a6" stroke="#000"/>`), "Carries float"],
  [(x) => F.raw(`<rect x="${x}" y="${ly - 7}" width="40" height="14" fill="url(#hatch)" stroke="#000"/>`), "By the Purchaser or others"],
  [(x) => diamond(x + 20, ly, true), "Contractual milestone"],
  [(x) => diamond(x + 20, ly, false), "Other key milestone"],
];
let lx = LX;
for (const [draw, label] of items) { draw(lx); F.text(lx + 50, ly, [label], { size: 15, anchor: "start" }); lx += 60 + label.length * 7.6 + 30; }

F.write("figgantt");
console.log("float: cards2 " + (lf.cards2 - (es.cards2 + t.cards2.dur)) + ", cardship2 " + (lf.cardship2 - (es.cardship2 + t.cardship2.dur)));
const crit = keys.filter(critical).filter((k) => !k.startsWith("D_"));
console.log("critical tasks: " + crit.length + " -> " + crit.join(", "));
