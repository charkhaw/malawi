/*
 * Writes the integrated programme of works of the joint venture of RM Enterprise
 * Limited and Inkript Securities S.A.L, the Gantt chart of the Project
 * Organization and Management Sub-Plan (PDS ITP 16.2(a)(i)).
 *
 *   node make-programme.js
 *
 * Output: project-plan/Integrated-Programme-of-Works.xml   Microsoft Project XML
 *         project-plan/Integrated-Programme-of-Works.html  the Gantt chart, printable
 *                                                           on A3 landscape
 *
 * The PDF is the HTML printed from Edge or Chrome: A3, landscape, without
 * headers and footers. Open the XML in Project with File > Open, file type
 * "XML Format", to edit the programme there.
 *
 * The Information System tasks are read from make-schedule.js, so the two
 * schedules cannot drift apart. This script adds what that schedule holds only
 * as a dependency: the facility works broken into their work packages, the
 * logistics and coordination carried by RM Enterprise, and the party that
 * performs every task, written to Project as the text field "Performed by".
 *
 * Every link is checked against the stated weeks, as in make-schedule.js, and
 * the script stops on any task Project would move when the file is opened.
 */

const fs = require("fs");
const path = require("path");

const OUT_XML = path.join(__dirname, "project-plan", "Integrated-Programme-of-Works.xml");
const OUT_HTML = path.join(__dirname, "project-plan", "Integrated-Programme-of-Works.html");
const PROJECT_START = new Date(Date.UTC(2027, 0, 4));   // as in make-schedule.js
const WEEKS = 32;

/* ------------------------------------------------- the schedule to extend */

const src = fs.readFileSync(path.join(__dirname, "make-schedule.js"), "utf8");
const BASE = eval(src.slice(src.indexOf("const T = "),
  src.indexOf("/* ------------------------------------------------------------- normalize")) + "; PLAN");

const T = (weeks) => [["T", "FS", weeks]];
const PLAN = BASE.filter((p) => p.key !== "fac").map((p) => ({ ...p, pred: p.pred && [...p.pred] }));
const at = (key) => {
  const i = PLAN.findIndex((p) => p.key === key);
  if (i < 0) throw new Error("no task " + key);
  return i;
};
const after = (key, ...items) => PLAN.splice(at(key) + 1, 0, ...items);
const relink = (key, pred) => { PLAN[at(key)].pred = pred; };
const addLink = (key, ...pred) => { PLAN[at(key)].pred.push(...pred); };

after("T",
  { sum: "Project management and coordination" },
  { key: "pm", name: "Project management, progress reporting and single point of contact with NRB", s: 1, d: 32, pred: ["T"] },
  { key: "coord", name: "Coordination with end users and government stakeholders in Malawi", s: 1, d: 32, pred: ["T"] });

after("disc1",
  { key: "facsurvey", name: "Site survey and assessment of the existing facility: dimensions, structure, electrical load and environment", s: 1, d: 2, pred: ["T"] });

after("proc",
  { key: "facdes", name: "Facility design: architectural, electrical and mechanical drawings, layout plans, power and cooling design, bill of quantities", s: 3, d: 3, pred: ["facsurvey", ["spgms", "FF", 1]] });
addLink("dsub", "facdes");

after("drev",
  { key: "facappr", name: "Statutory approval of the structural and electrical designs, coordinated by NRB", s: 6, d: 1, pred: ["facdes"] });

// The facility renovation, previously one bar, as its work packages. The server
// room is built first, to the ICT Site Preparation Guide.
const works = PLAN.findIndex((p) => p.sum && p.sum.startsWith("4 "));
PLAN.splice(works + 1, 0,
  { key: "facmob", name: "Mobilization and site establishment of the facility works", s: 7, d: 1, pred: ["dda", "facappr", "spgms"] },
  { key: "fachse", name: "Health, safety, environmental and waste management of the works", s: 7, d: 12, pred: [["facmob", "SS", 0]] },
  { key: "faccivil", name: "Civil and architectural works: partitions, secure areas and physical reinforcement", s: 7, d: 5, pred: [["facmob", "SS", 0]] },
  { key: "facsrv", name: "Server room, built first: power, UPS, precision cooling, clean agent suppression, access control, racks and cabling", s: 9, d: 5, pred: [["faccivil", "SS", 2]] },
  { key: "facsrvtest", name: "Server room tested and commissioned", s: 14, d: 1, pred: ["facsrv", "D_power"] });
relink("srvready", ["facsrvtest"]);
after("srvready",
  { key: "facelec", name: "Electrical installation: distribution boards, dedicated circuits, protection, earthing, lightning protection, emergency lighting", s: 8, d: 8, pred: [["faccivil", "SS", 1]] },
  { key: "fachvac", name: "HVAC and environmental control: air conditioning, ventilation, humidity control, air filtration and sensors", s: 10, d: 7, pred: [["faccivil", "SS", 3]] },
  { key: "facfire", name: "Fire detection, alarm and suppression systems", s: 11, d: 5, pred: [["faccivil", "SS", 4]] },
  { key: "faccab", name: "Structured cabling, network cabinets, outlets and labelling", s: 11, d: 5, pred: [["faccivil", "SS", 4]] },
  { key: "facsec", name: "Physical security systems: access control, CCTV and intrusion detection", s: 12, d: 5, pred: ["faccivil"] },
  { key: "facstore", name: "Secure blank card store, sized for 2,000,000 cards", s: 12, d: 6, pred: ["faccivil"] },
  { key: "facfin", name: "Finishes and fit-out: ceilings, floors, doors, furniture, workstations, quality control and consumables stations", s: 14, d: 4, pred: [["faccivil", "FS", 2]] },
  { key: "factest", name: "Facility systems tested and commissioned, including pre-commissioning tests 2 and 3 (electrical power, environmental systems)", s: 16, d: 2,
    pred: ["facelec", "facfire", ["fachvac", "FF", 1], ["facsec", "FF", 1], ["faccab", "FF", 2]] });
relink("facinsp", ["factest", "facfin", "facstore"]);
relink("facready", ["facinsp"]);
after("facready",
  { key: "facstoreready", name: "Secure blank card store ready", at: 18, pred: ["facinsp"] });
addLink("carddel", "facstoreready");

after("tcover",
  { key: "trainlog", name: "Training venues, logistics and trainee coordination", s: 24, d: 5, pred: T(23) },
  { key: "factrain", name: "Facility training: facility operations, electrical, HVAC, fire and security systems, preventive maintenance, emergency procedures", s: 27, d: 2, pred: T(26) });
addLink("tms", "factrain");

after("stab",
  { key: "facdocs", name: "Facility as-built drawings, test reports, manuals, warranties and maintenance schedules delivered", s: 31, d: 2, pred: ["comms"] });
addLink("golive", "facdocs");

/* Tasks that start in week 1 carry no link from the Effective Date. Project
   starts a task without predecessors at the project start anyway, and it
   opened this programme with those six tasks at zero duration while they
   carried the link. Links from the Effective Date with a lag are kept. */
for (const p of PLAN) {
  if (p.pred) p.pred = p.pred.filter((x) => x !== "T");
}

/* ------------------------------------------- who performs each task */

const IK = "Inkript", RM = "RME", EQ = "Equipment manufacturer", CM = "Card manufacturer";
const NRB = "NRB", DEV = "NRB developers", EG = "e-Government", PT = "Independent penetration tester";
const OWNER = {
  pm: [IK], coord: [RM],
  mob: [IK], base: [IK], disc1: [IK], facsurvey: [RM], order: [IK], trainrec: [IK],
  disc2: [IK], spg: [IK], spgms: [IK], net: [IK], hld: [IK], lld: [IK], icd: [IK, DEV], secd: [IK, EG],
  card: [IK, CM], proc: [IK], facdes: [RM], dsub: [IK, RM], drev: [NRB, IK], facappr: [NRB, RM], dda: [NRB],
  mfg: [EQ], mfgopt: [EQ], eqready: [EQ], cardsfat: [CM], qual: [CM], fatproc: [IK], cardsbulk: [CM], cards2: [CM],
  ictp: [IK], app1: [IK], app2: [IK], sim: [IK], intb: [IK], agent: [RM], cdoc: [RM],
  facmob: [RM], fachse: [RM], faccivil: [RM], facsrv: [RM], facsrvtest: [RM], srvready: [RM], facelec: [RM],
  fachvac: [RM], facfire: [RM], faccab: [RM], facsec: [RM], facstore: [RM], facfin: [RM], factest: [RM],
  facinsp: [RM, IK], facready: [RM], facstoreready: [RM],
  fat: [EQ, IK], pcs: [IK], fattrain: [EQ], fatms: [IK],
  ship: [IK], cust: [RM], onsite: [RM], cardship: [IK, RM], carddel: [RM], cardship2: [IK, RM], cardsall: [RM],
  ictdel: [RM, IK], shadow: [NRB], plat: [IK], hsm: [IK], dr: [IK], appdep: [IK], pcprog: [IK],
  nrisint1: [IK, DEV], nrisint2: [IK, DEV], precomit: [IK], perfsec: [IK], insp: [IK, RM], eqinst: [EQ],
  cspl: [IK], uat: [IK, NRB], socint: [IK], pen: [PT], precomeq: [IK], pilot: [IK], satms: [IK],
  tuser: [IK], ttech: [IK], tmgmt: [IK], tcover: [NRB], trainlog: [RM], factrain: [RM], tms: [IK],
  oat1: [NRB, IK], oat2: [NRB, IK], oat16: [NRB], oat17: [NRB, IK], comms: [IK], wdocs: [IK],
  asbuilt: [IK], soc: [IK], stab: [IK], facdocs: [RM], golive: [IK, RM],
  D_docs: [NRB], D_testenv: [NRB], D_carddes: [NRB], D_qr: [NRB], D_cert: [EG], D_obs: [NRB], D_fatdel: [NRB],
  D_power: [NRB], D_techtrainees: [NRB], D_wan: [NRB, EG], D_blantyre: [NRB], D_custdocs: [NRB], D_testconn: [NRB],
  D_trainees: [NRB], nrisside: [DEV], nrisready: [DEV], dsissue: [EG], dsissued: [EG], D_soc: [NRB], D_remote: [NRB, EG],
};

/* ------------------------------------------------------------- normalize */

const byKey = {};
const rows = [];
let currentSum = null;
for (const p of PLAN) {
  if (p.sum) {
    currentSum = { name: p.sum, summary: true, children: [] };
    rows.push(currentSum);
    continue;
  }
  const t = { ...p, milestone: p.at !== undefined, level: currentSum ? 2 : 1 };
  t.start = t.milestone ? t.at : t.s - 1;
  t.finish = t.milestone ? t.at : t.s - 1 + t.d;
  t.links = (p.pred || []).map((x) => (Array.isArray(x) ? { key: x[0], type: x[1], lag: x[2] } : { key: x, type: "FS", lag: 0 }));
  t.owners = p.key === "T" ? [] : OWNER[p.key];
  if (!t.owners) throw new Error("no owner for task " + p.key);
  if (byKey[t.key]) throw new Error("duplicate key " + t.key);
  byKey[t.key] = t;
  rows.push(t);
  if (currentSum) currentSum.children.push(t);
}
for (const k of Object.keys(OWNER)) if (!byKey[k]) throw new Error("owner given for unknown task " + k);

/* ------------------------------------------------ check every link holds */

const problems = [];
for (const t of Object.values(byKey)) {
  for (const l of t.links) {
    const p = byKey[l.key];
    if (!p) { problems.push(t.key + ": unknown predecessor " + l.key); continue; }
    const ok =
      l.type === "FS" ? t.start >= p.finish + l.lag :
      l.type === "SS" ? t.start >= p.start + l.lag :
      l.type === "FF" ? t.finish >= p.finish + l.lag : false;
    if (!ok) problems.push(t.key + " (" + l.type + " from " + l.key + ", lag " + l.lag + "): stated weeks do not satisfy the link");
  }
}
const earliest = {};
const visiting = new Set();
function es(k) {
  if (earliest[k] !== undefined) return earliest[k];
  if (visiting.has(k)) throw new Error("dependency loop at " + k);
  visiting.add(k);
  const t = byKey[k];
  let e = 0;
  for (const l of t.links) {
    const p = byKey[l.key];
    const pes = es(l.key);
    const pdur = p.finish - p.start;
    if (l.type === "FS") e = Math.max(e, pes + pdur + l.lag);
    if (l.type === "SS") e = Math.max(e, pes + l.lag);
    if (l.type === "FF") e = Math.max(e, pes + pdur + l.lag - (t.finish - t.start));
  }
  visiting.delete(k);
  return (earliest[k] = e);
}
for (const t of Object.values(byKey)) {
  if (es(t.key) < t.start) problems.push(t.name + ": stated week " + (t.start + 1) + ", links allow week " + (earliest[t.key] + 1));
}
if (problems.length) {
  console.error("Programme is inconsistent with its own links:");
  for (const p of problems) console.error("  ! " + p);
  process.exit(1);
}

for (const r of rows.filter((x) => x.summary)) {
  r.start = Math.min(...r.children.map((c) => c.start));
  r.finish = Math.max(...r.children.map((c) => c.finish));
}
let id = 0, top = 0, sub = 0;
for (const r of rows) {
  r.uid = ++id;
  if (r.summary || r.level === 1) { top++; sub = 0; r.outline = String(top); }
  else { sub++; r.outline = top + "." + sub; }
}

/* ---------------------------------------------------- who, in Project */

/* The party performing each task goes into Project's Text1 field, named
   "Performed by". It was first written as resource assignments, and Project
   2013 then recomputed every duration from them and opened the whole programme
   at zero length. A text field carries the same information and leaves the
   schedule exactly as stated. */
const PERFORMED_BY = 188743731;   // Project's field ID for the task field Text1
const leaves = rows.filter((r) => !r.summary);

/* ---------------------------------------------------------- dates and XML */

const DAY = 86400000;
const pad = (n) => String(n).padStart(2, "0");
const iso = (d, hh) => d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + hh + ":00:00";
const startAt = (t) => iso(new Date(PROJECT_START.getTime() + 7 * t * DAY), "08");
const endAt = (t) => (t === 0 ? startAt(0) : iso(new Date(PROJECT_START.getTime() + (7 * t - 3) * DAY), "17"));
const hours = (weeks) => "PT" + weeks * 40 + "H0M0S";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const LINK_TYPE = { FF: 0, FS: 1, SF: 2, SS: 3 };
const TENTHS_OF_MINUTE_PER_WEEK = 5 * 8 * 60 * 10;

/* Element order follows the order Project 2013 writes, as in make-schedule.js. */
const taskXml = rows.map((r) => {
  const dur = hours(r.milestone ? 0 : r.finish - r.start);
  const start = r.milestone ? endAt(r.start) : startAt(r.start);
  const finish = endAt(r.finish);
  const lines = [
    "<UID>" + r.uid + "</UID>",
    "<ID>" + r.uid + "</ID>",
    "<Name>" + esc(r.name) + "</Name>",
    "<Active>1</Active>",
    "<Manual>0</Manual>",
    "<Type>0</Type>",
    "<IsNull>0</IsNull>",
    "<OutlineNumber>" + r.outline + "</OutlineNumber>",
    "<OutlineLevel>" + (r.summary ? 1 : r.level) + "</OutlineLevel>",
    "<Priority>500</Priority>",
    "<Start>" + start + "</Start>",
    "<Finish>" + finish + "</Finish>",
    "<Duration>" + dur + "</Duration>",
    "<ManualStart>" + start + "</ManualStart>",
    "<ManualFinish>" + finish + "</ManualFinish>",
    "<ManualDuration>" + dur + "</ManualDuration>",
    "<DurationFormat>9</DurationFormat>",
    "<Milestone>" + (r.milestone ? 1 : 0) + "</Milestone>",
    "<Summary>" + (r.summary ? 1 : 0) + "</Summary>",
    "<ConstraintType>0</ConstraintType>",
  ];
  if (r.contract) lines.push("<Notes>Contractual milestone in the Implementation Schedule</Notes>");
  for (const l of r.links || []) {
    lines.push(
      "<PredecessorLink>" +
        "<PredecessorUID>" + byKey[l.key].uid + "</PredecessorUID>" +
        "<Type>" + LINK_TYPE[l.type] + "</Type>" +
        "<CrossProject>0</CrossProject>" +
        "<LinkLag>" + l.lag * TENTHS_OF_MINUTE_PER_WEEK + "</LinkLag>" +
        "<LagFormat>9</LagFormat>" +
      "</PredecessorLink>"
    );
  }
  if (!r.summary && r.owners.length) {
    lines.push("<ExtendedAttribute><FieldID>" + PERFORMED_BY + "</FieldID><Value>" + esc(r.owners.join(", ")) + "</Value></ExtendedAttribute>");
  }
  return "    <Task>\n      " + lines.join("\n      ") + "\n    </Task>";
}).join("\n");

const workDay = (n) =>
  "      <WeekDay><DayType>" + n + "</DayType><DayWorking>1</DayWorking><WorkingTimes>" +
  "<WorkingTime><FromTime>08:00:00</FromTime><ToTime>12:00:00</ToTime></WorkingTime>" +
  "<WorkingTime><FromTime>13:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime>" +
  "</WorkingTimes></WeekDay>";

fs.writeFileSync(OUT_XML, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Project xmlns="http://schemas.microsoft.com/project">
  <SaveVersion>14</SaveVersion>
  <Name>Integrated-Programme-of-Works.xml</Name>
  <Title>Integrated Programme of Works, MW-PPPC-546386-GO-RFB</Title>
  <ScheduleFromStart>1</ScheduleFromStart>
  <StartDate>${startAt(0)}</StartDate>
  <CalendarUID>1</CalendarUID>
  <DefaultStartTime>08:00:00</DefaultStartTime>
  <DefaultFinishTime>17:00:00</DefaultFinishTime>
  <MinutesPerDay>480</MinutesPerDay>
  <MinutesPerWeek>2400</MinutesPerWeek>
  <DaysPerMonth>20</DaysPerMonth>
  <DurationFormat>9</DurationFormat>
  <WeekStartDay>1</WeekStartDay>
  <NewTasksAreManual>0</NewTasksAreManual>
  <ExtendedAttributes>
    <ExtendedAttribute><FieldID>${PERFORMED_BY}</FieldID><FieldName>Text1</FieldName><Alias>Performed by</Alias></ExtendedAttribute>
  </ExtendedAttributes>
  <Calendars>
    <Calendar>
      <UID>1</UID>
      <Name>Standard</Name>
      <IsBaseCalendar>1</IsBaseCalendar>
      <BaseCalendarUID>-1</BaseCalendarUID>
      <WeekDays>
      <WeekDay><DayType>1</DayType><DayWorking>0</DayWorking></WeekDay>
${[2, 3, 4, 5, 6].map(workDay).join("\n")}
      <WeekDay><DayType>7</DayType><DayWorking>0</DayWorking></WeekDay>
      </WeekDays>
    </Calendar>
  </Calendars>
  <Tasks>
${taskXml}
  </Tasks>
</Project>
`);

/* ------------------------------------------------------- the Gantt chart */

const COLOR = { [IK]: "ik", [RM]: "rm", [EQ]: "mf", [CM]: "mf", [PT]: "mf", [NRB]: "pu", [DEV]: "pu", [EG]: "pu" };
const pct = (w) => (100 * w / WEEKS).toFixed(4) + "%";
const weeksText = (r) => (r.milestone ? String(r.start) : r.start + 1 === r.finish ? String(r.finish) : (r.start + 1) + "–" + r.finish);
const bar = (r) => {
  if (r.summary) {
    return `<div class="sum" style="left:${pct(r.start)};width:${pct(r.finish - r.start)}"></div>`;
  }
  if (r.milestone) {
    const cls = r.contract ? "ms contract" : "ms " + (COLOR[r.owners[0]] || "pu");
    return `<div class="${cls}" style="left:${pct(r.start)}"></div>`;
  }
  return `<div class="bar ${COLOR[r.owners[0]]}" style="left:${pct(r.start)};width:${pct(r.finish - r.start)}"></div>`;
};
const weekHead = Array.from({ length: WEEKS }, (_, i) => `<span style="left:${pct(i)};width:${pct(1)}">${i + 1}</span>`).join("");
const body = rows.map((r) => {
  const cls = r.summary ? "row-sum" : r.contract ? "row-contract" : "";
  const owner = r.summary ? "" : r.owners.join(", ");
  return `<tr class="${cls}"><td class="num">${r.outline}</td><td class="name">${esc(r.name)}</td>` +
    `<td class="owner">${esc(owner)}</td><td class="wk">${r.summary ? (r.start + 1) + "–" + r.finish : weeksText(r)}</td>` +
    `<td class="gantt"><div class="track">${bar(r)}</div></td></tr>`;
}).join("\n");

fs.writeFileSync(OUT_HTML, `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Integrated Programme of Works</title>
<style>
  @page { size: A3 landscape; margin: 10mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Calibri, Carlito, "Liberation Sans", Arial, sans-serif; font-size: 7.3pt; color: #000; background: #fff; }
  h1 { font-size: 15pt; margin: 0 0 1mm; color: #1F3864; }
  .sub { font-size: 9pt; margin: 0 0 0.6mm; }
  .note { font-size: 8pt; color: #404040; margin: 0 0 2.5mm; }
  .legend { display: flex; gap: 6mm; font-size: 8pt; margin: 0 0 2.5mm; align-items: center; flex-wrap: wrap; }
  .legend span { display: inline-flex; align-items: center; gap: 1.5mm; }
  .key { display: inline-block; width: 8mm; height: 2.6mm; position: relative; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  thead { display: table-header-group; }
  tr { break-inside: avoid; }
  th, td { border-bottom: 0.2mm solid #D9D9D9; padding: 0.2mm 1mm; vertical-align: middle; line-height: 1.15; }
  th { background: #1F3864; color: #fff; font-weight: bold; text-align: left; font-size: 7.6pt; }
  col.c-num { width: 9mm; } col.c-name { width: 138mm; } col.c-owner { width: 36mm; } col.c-wk { width: 11mm; }
  td.num, td.wk { color: #404040; }
  td.wk, th.wk { text-align: center; }
  tr.row-sum td { background: #EDEDED; font-weight: bold; }
  tr.row-contract td.name { font-weight: bold; }
  td.gantt { padding: 0; }
  .track { position: relative; height: 3.1mm; margin: 0 1.8mm;
    background-image: repeating-linear-gradient(to right, transparent 0, transparent calc(100% / ${WEEKS} - 0.2mm), #E4E4E4 calc(100% / ${WEEKS} - 0.2mm), #E4E4E4 calc(100% / ${WEEKS})); }
  th.gantt { padding: 0; position: relative; height: 5mm; }
  .weeks { position: relative; height: 5mm; margin: 0 1.8mm; }
  .weeks span { position: absolute; top: 0; height: 5mm; line-height: 5mm; text-align: center; font-size: 6.6pt; border-left: 0.2mm solid #5B7BB4; }
  .bar { position: absolute; top: 0.5mm; height: 2.1mm; border-radius: 0.3mm; }
  .sum { position: absolute; top: 0.9mm; height: 1.1mm; background: #000; }
  .sum::before, .sum::after { content: ""; position: absolute; top: 0; border-top: 1.6mm solid #000; border-left: 0.9mm solid transparent; border-right: 0.9mm solid transparent; }
  .sum::before { left: -0.9mm; } .sum::after { right: -0.9mm; }
  .ik { background: #1F4E79; } .rm { background: #C55A11; } .mf { background: #8C8C8C; }
  .pu { background: repeating-linear-gradient(45deg, #FFFFFF 0, #FFFFFF 0.5mm, #7F7F7F 0.5mm, #7F7F7F 0.8mm); border: 0.2mm solid #7F7F7F; }
  .ms { position: absolute; top: 0.15mm; width: 2.8mm; height: 2.8mm; margin-left: -1.4mm; transform: rotate(45deg) scale(0.78); }
  .ms.pu { background: #fff; border: 0.35mm solid #595959; }
  .ms.contract { background: #000; }
  .legend .ms { position: relative; margin-left: 0; display: inline-block; }
</style></head><body>
<h1>Integrated Programme of Works</h1>
<p class="sub">Joint Venture of RM Enterprise Limited and Inkript Securities S.A.L &nbsp;|&nbsp; RFP No. MW-PPPC-546386-GO-RFB, Provision of a Turnkey Solution for the Rehabilitation, Upgrading and Commissioning of the Central Printing Facility</p>
<p class="note">Weeks are counted from the Effective Date: week 1 is the first week after it. Phases 1 to 10 are the lines of the Implementation Schedule, and black diamonds are its contractual milestones. Each task is assigned to the party that performs it: RME is RM Enterprise Limited and Inkript is Inkript Securities S.A.L, the members of the joint venture.</p>
<div class="legend">
  <span><i class="key"><b class="bar ik" style="left:0;width:100%"></b></i>Inkript</span>
  <span><i class="key"><b class="bar rm" style="left:0;width:100%"></b></i>RME</span>
  <span><i class="key"><b class="bar mf" style="left:0;width:100%"></b></i>Manufacturers and independent tester, under the joint venture</span>
  <span><i class="key"><b class="bar pu" style="left:0;width:100%"></b></i>NRB, NRB developers and e-Government</span>
  <span><i class="ms contract"></i>Contractual milestone</span>
  <span><i class="ms ik"></i>Milestone</span>
</div>
<table>
<colgroup><col class="c-num"><col class="c-name"><col class="c-owner"><col class="c-wk"><col></colgroup>
<thead><tr><th>No.</th><th>Task</th><th>Performed by</th><th class="wk">Weeks</th><th class="gantt"><div class="weeks">${weekHead}</div></th></tr></thead>
<tbody>
${body}
</tbody>
</table>
</body></html>
`);

console.log("Wrote " + path.relative(__dirname, OUT_XML) + " and " + path.relative(__dirname, OUT_HTML));
console.log("  " + rows.filter((r) => r.summary).length + " groups, " + leaves.filter((r) => !r.milestone).length + " tasks, " +
  leaves.filter((r) => r.milestone).length + " milestones, " + leaves.reduce((n, r) => n + r.links.length, 0) + " links, all consistent");
console.log("  Finish: week " + Math.max(...leaves.map((r) => r.finish)));
