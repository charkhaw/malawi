/*
 * Writes the Information System schedule as Microsoft Project XML.
 *
 *   node make-schedule.js
 *
 * Output: project-plan/Information-System-Schedule.xml
 * Open it in Project 2013 with File > Open, file type "XML Format".
 *
 * This is the source of the schedule in Section 2 of the Preliminary Project
 * Plan. Weeks are contract weeks from the Effective Date: week 1 is the first
 * week after it. Time is modelled in whole weeks, t = 0 at the start of week 1,
 * so week n runs from t = n - 1 to t = n.
 *
 * Every task hangs from the Effective Date milestone through its links, and
 * nothing carries a fixed date. Changing the project start date in Project
 * therefore moves the whole schedule with it.
 *
 * Before writing, every link is checked against the weeks stated here. A link
 * the stated weeks do not satisfy stops the script, because Project would
 * otherwise quietly move the task and the Gantt would disagree with the text.
 */

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "project-plan", "Information-System-Schedule.xml");

// A Monday. Only a working value for Project; the plan itself counts weeks.
const PROJECT_START = new Date(Date.UTC(2027, 0, 4));

/*
 * s, d   leaf task starting in week s, lasting d weeks
 * at     milestone at t = at (the end of week "at", or the start of week at + 1)
 * pred   predecessors: "key" for finish-to-start, or [key, "FS"|"SS"|"FF", lagWeeks]
 * sum    summary task; the leaves that follow belong to it until the next sum
 *
 * Purchaser inputs "needed by week n" sit at t = n - 1, the start of that week,
 * matching Section 2.7.
 */
const T = (weeks) => [["T", "FS", weeks]];

const PLAN = [
  { key: "T", name: "Effective Date", at: 0 },

  { sum: "1 Project mobilization and planning" },
  { key: "mob", name: "Mobilize the Information System team", s: 1, d: 1, pred: ["T"] },
  { key: "base", name: "Confirm Purchaser inputs and baseline the schedule", s: 1, d: 2, pred: ["T"] },
  { key: "disc1", name: "Discovery: NRIS documentation, current process and site walkthroughs", s: 1, d: 2, pred: ["T"] },
  { key: "order", name: "Order long-lead equipment and ICT infrastructure", s: 2, d: 1, pred: ["mob"] },
  { key: "trainrec", name: "Recommended trainee numbers and prerequisites issued to NRB", at: 2, pred: ["base"] },

  { sum: "2 Design and detailed planning" },
  { key: "disc2", name: "Discovery: NRIS test data profiling and Discovery Report", s: 3, d: 2, pred: ["disc1", "D_docs", "D_testenv"] },
  { key: "spg", name: "ICT Site Preparation Guide", s: 3, d: 2, pred: ["disc1"] },
  { key: "spgms", name: "ICT Site Preparation Guide issued to the facility works", at: 4, pred: ["spg"] },
  { key: "net", name: "Network requirements for the Government Wide Area Network", s: 4, d: 1, pred: [["spg", "SS", 1]] },
  { key: "hld", name: "High-Level Design", s: 3, d: 2, pred: ["disc1"] },
  { key: "lld", name: "Low-Level Design", s: 4, d: 2, pred: [["hld", "SS", 1]] },
  { key: "icd", name: "Interface Control Documents, agreed with NRB developers", s: 3, d: 3, pred: ["disc1"] },
  { key: "secd", name: "Security Design Documentation and certificate profile with e-Government", s: 3, d: 3, pred: ["disc1"] },
  { key: "card", name: "Card layout and card identifier, joint redesign with NRB", s: 3, d: 3, pred: ["disc1"] },
  { key: "proc", name: "Future-state processes and draft Standard Operating Procedures", s: 3, d: 3, pred: ["disc1"] },
  { key: "dsub", name: "Design submitted for approval", at: 5, pred: ["disc2", "net", "lld", "icd", "secd", "card", "proc"] },
  { key: "drev", name: "Design review with NRB", s: 6, d: 1, pred: ["dsub"] },
  { key: "dda", name: "Detailed Design Approval", at: 6, pred: ["drev"], contract: true },

  { sum: "3 Procurement and manufacturing" },
  { key: "mfg", name: "Equipment manufacture, started on order: two personalization and two mailing systems", s: 3, d: 10, pred: ["order"] },
  { key: "mfgopt", name: "Options fixed at design approval fitted to the equipment", s: 11, d: 2, pred: [["dda", "FS", 4], ["mfg", "SS", 8]] },
  { key: "eqready", name: "Equipment ready for factory acceptance", at: 12, pred: ["mfg", "mfgopt"] },
  { key: "cardsfat", name: "Blank cards, first production run: qualification and factory acceptance stock", s: 7, d: 7, pred: ["dda", "D_carddes"] },
  { key: "qual", name: "Qualification cards delivered to the equipment factory", at: 14, pred: [["cardsfat", "FS", 1]] },
  { key: "fatproc", name: "Factory acceptance test procedure issued to NRB for approval", at: 14, pred: [["dda", "FS", 8]] },
  { key: "cardsbulk", name: "Blank cards, first delivery of not less than 500,000", s: 14, d: 5, pred: ["cardsfat"] },
  { key: "cards2", name: "Blank cards, remaining 1,500,000 in shipments of not less than 500,000", s: 19, d: 5, pred: ["cardsbulk"] },
  { key: "ictp", name: "ICT infrastructure manufacture and delivery, ordered at mobilization", s: 3, d: 11, pred: ["order"] },
  { key: "app1", name: "Application build: components defined by the Technical Requirements, from design start", s: 3, d: 12, pred: ["disc1"] },
  { key: "app2", name: "Application build: NRIS-facing and signing components, after design approval", s: 7, d: 10, pred: ["dda", "D_qr", "D_cert"] },
  { key: "sim", name: "NRIS interface simulators from the Interface Control Documents", s: 7, d: 2, pred: ["dda"] },
  { key: "intb", name: "Production side of the NRIS interface, tested against simulators", s: 9, d: 8, pred: ["sim"] },
  { key: "agent", name: "Clearing agent appointed", at: 12, pred: [["dda", "FS", 6]] },
  { key: "cdoc", name: "Customs documentation prepared", s: 13, d: 4, pred: ["agent"] },

  { sum: "4 Facility renovation (facility works)" },
  { key: "fac", name: "Facility renovation, under the facility works, server room first", s: 7, d: 12, pred: ["spgms", "dda"] },
  { key: "srvready", name: "Server room handed over: sealed, powered through its UPS, cooled and cabled", at: 14, pred: [["fac", "SS", 8], "D_power"] },
  { key: "facinsp", name: "Readiness inspection of the production floor", s: 18, d: 1, pred: [["fac", "SS", 11]] },
  { key: "facready", name: "Production floor ready for installation", at: 18, pred: ["fac", "facinsp"] },

  { sum: "5 Factory acceptance testing" },
  { key: "fat", name: "Factory acceptance of the equipment on production card stock, NRB delegation present", s: 17, d: 1, pred: ["eqready", "cardsfat", "qual", "fatproc", "D_fatdel", ["T", "FS", 16]] },
  { key: "pcs", name: "Printer Control Service proven against the equipment software", s: 17, d: 1, pred: ["eqready", "app1", ["T", "FS", 16]] },
  { key: "fattrain", name: "NRB technical staff trained at the factory", s: 17, d: 1, pred: ["eqready", ["T", "FS", 16]] },
  { key: "fatms", name: "Successful FAT", at: 17, pred: ["fat", "pcs", "fattrain"], contract: true },

  { sum: "6 Shipping and customs clearance" },
  { key: "ship", name: "Shipping of the personalization and mailing equipment", s: 18, d: 2, pred: ["fatms"] },
  { key: "cust", name: "Customs clearance and delivery to NRB", s: 20, d: 1, pred: ["ship", "cdoc", "D_custdocs"] },
  { key: "onsite", name: "Equipment delivered on site", at: 20, pred: ["cust"], contract: true },
  { key: "cardship", name: "First card delivery shipped, cleared and delivered to NRB", s: 19, d: 2, pred: ["cardsbulk", "D_custdocs"] },
  { key: "carddel", name: "First card delivery on site", at: 20, pred: ["cardship"] },
  { key: "cardship2", name: "Remaining card shipments cleared and delivered to NRB", s: 24, d: 2, pred: ["cards2", "D_custdocs"] },
  { key: "cardsall", name: "All 2,000,000 cards on site, before commissioning", at: 25, pred: ["cardship2"] },

  { sum: "7 Installation and site acceptance testing" },
  { key: "ictdel", name: "ICT infrastructure delivered to site, inspected and racked", s: 15, d: 1, pred: ["ictp", "srvready"] },
  { key: "shadow", name: "NRB technical staff shadow installation and commissioning", s: 15, d: 12, pred: [["ictdel", "SS", 0], "D_techtrainees"] },
  { key: "plat", name: "Platform build: application and database clusters, storage array, directory, database, security, non-production environments", s: 16, d: 1, pred: ["ictdel"] },
  { key: "hsm", name: "Hardware security modules installed, key ceremony, certificate signing request to e-Government", s: 16, d: 1, pred: ["ictdel"] },
  { key: "dr", name: "Secondary environment deployed at Blantyre and replication established", s: 16, d: 3, pred: ["ictdel", "D_wan", "D_blantyre"] },
  { key: "appdep", name: "Application deployed and integrated with the directory", s: 17, d: 1, pred: ["plat", "app1", "app2"] },
  { key: "pcprog", name: "Pre-Commissioning Test Program submitted to NRB for approval", at: 17, pred: [["ictdel", "FS", 2]] },
  { key: "nrisint1", name: "Early integration with NRIS: interfaces tested as NRB delivers them", s: 18, d: 5, pred: ["appdep", "intb", "D_testconn"] },
  { key: "nrisint2", name: "Integration with NRIS completed against NRB's delivered side", s: 23, d: 2, pred: ["nrisready", "appdep", "intb", "D_testconn"] },
  { key: "precomit", name: "Pre-commissioning tests of the ICT estate, Table A 4, 5, 8 and 13", s: 19, d: 2, pred: ["appdep", "dr", "pcprog"] },
  { key: "perfsec", name: "Performance testing of the software, and security testing", s: 20, d: 2, pred: ["appdep", ["precomit", "SS", 1]] },
  { key: "insp", name: "Equipment inspected on delivery, unpacked and placed", s: 21, d: 1, pred: ["onsite", "facready"] },
  { key: "eqinst", name: "Equipment installed and commissioned by the manufacturer's engineers", s: 21, d: 3, pred: ["onsite", "facready"] },
  { key: "cspl", name: "Critical Spare Parts List submitted to NRB for approval", at: 24, pred: [["onsite", "FS", 4]] },
  { key: "uat", name: "User acceptance testing with NRIS stakeholders", s: 24, d: 2, pred: ["appdep", ["nrisint2", "SS", 1]] },
  { key: "socint", name: "Security Operations Center integrated with NRB's Security Operations Center", s: 25, d: 1, pred: ["appdep", "D_soc"] },
  { key: "pen", name: "Independent penetration testing of the full deployed configuration", s: 24, d: 1, pred: ["eqinst", "appdep"] },
  { key: "precomeq", name: "Pre-commissioning tests of the equipment and integration, Table A 1, 6, 7, 9 to 12, 14 and 16", s: 24, d: 3, pred: ["eqinst", "pcprog", ["nrisint2", "FF", 2]] },
  { key: "pilot", name: "Pilot production of 500 to 1,000 test cards, not issued to citizens", s: 26, d: 1, pred: ["eqinst", "uat", "nrisint2", "dsissued", "carddel"] },
  { key: "satms", name: "Installation and SAT complete", at: 26, pred: ["precomit", "precomeq", "perfsec", "pen", "pilot", "dr"], contract: true },

  { sum: "8 Training and knowledge transfer" },
  { key: "tuser", name: "User training, groups one and two, one for each shift", s: 25, d: 2, pred: [["eqinst", "FS", 1], "D_trainees", ["T", "FS", 24]] },
  { key: "ttech", name: "Technical training, NRB technical trainers co-delivering", s: 26, d: 2, pred: [["tuser", "SS", 1]] },
  { key: "tmgmt", name: "Management training", s: 26, d: 1, pred: [["tuser", "SS", 1]] },
  { key: "tcover", name: "User training, cover group, delivered by NRB trainers under observation", s: 27, d: 2, pred: ["tuser"] },
  { key: "tms", name: "Training completed", at: 28, pred: ["tuser", "ttech", "tmgmt", "tcover"], contract: true },

  { sum: "9 System commissioning and performance testing" },
  { key: "oat1", name: "Operational acceptance tests 1 to 12, 14 and 15", s: 27, d: 1, pred: ["satms", "cardsall"] },
  { key: "oat2", name: "Sustained production stability and multi-shift operation, tests 2 and 13", s: 27, d: 2, pred: ["satms"] },
  { key: "oat16", name: "Operational independence, test 16", s: 28, d: 1, pred: ["tuser", "ttech"] },
  { key: "oat17", name: "Final acceptance demonstration, test 17, ten working day observation", s: 29, d: 2, pred: ["oat1", "oat2", "oat16", "D_obs"] },
  { key: "comms", name: "System commissioned", at: 30, pred: ["oat17"], contract: true },
  { key: "wdocs", name: "Warranty and support documentation delivered", at: 30, pred: ["oat17"] },

  { sum: "10 Handover, go-live and closure" },
  { key: "asbuilt", name: "As-built documentation, prepared progressively from week 27, finalized", s: 31, d: 2, pred: ["comms"] },
  { key: "soc", name: "Transfer of Security Operations Center operation to NRB", s: 31, d: 2, pred: ["comms", "socint"] },
  { key: "stab", name: "Stabilization: resident engineers on every shift, daily review with NRB", s: 31, d: 2, pred: ["comms", "D_remote"] },
  { key: "golive", name: "Full handover and go-live", at: 32, pred: ["asbuilt", "soc", "stab"], contract: true },

  { sum: "Dependencies on the Purchaser and other parties" },
  { key: "D_docs", name: "NRIS documentation received (NRB)", at: 1, pred: T(1) },
  { key: "D_testenv", name: "Access to the NRIS test environment for profiling (NRB)", at: 2, pred: T(2) },
  { key: "D_carddes", name: "Card design decisions (NRB)", at: 5, pred: T(5) },
  { key: "D_qr", name: "QR code specification (NRB)", at: 5, pred: T(5) },
  { key: "D_cert", name: "Certificate profile and signing request procedure (e-Government)", at: 5, pred: T(5) },
  { key: "D_obs", name: "Observation period for the final acceptance demonstration agreed (NRB)", at: 5, pred: T(5) },
  { key: "D_fatdel", name: "Factory acceptance delegation nominated (NRB)", at: 11, pred: T(11) },
  { key: "D_power", name: "Dedicated electrical connection to the facility live (NRB)", at: 12, pred: T(12) },
  { key: "D_techtrainees", name: "Technical trainees nominated (NRB)", at: 14, pred: T(14) },
  { key: "D_wan", name: "Government Wide Area Network provisioned (NRB, e-Government)", at: 15, pred: T(15) },
  { key: "D_blantyre", name: "Access, floor space, power and cooling at the Blantyre data center (NRB)", at: 15, pred: T(15) },
  { key: "D_custdocs", name: "Purchaser documents for customs clearance (NRB)", at: 16, pred: T(16) },
  { key: "D_testconn", name: "Connectivity from the facility to the NRIS test environment (NRB)", at: 17, pred: T(17) },
  { key: "D_trainees", name: "User trainees nominated (NRB)", at: 19, pred: T(19) },
  { key: "nrisside", name: "NRIS side of the interface (NRB developers)", s: 7, d: 16, pred: ["dda", "icd"] },
  { key: "nrisready", name: "NRIS side of the interface ready for integration (NRB)", at: 22, pred: ["nrisside"] },
  { key: "dsissue", name: "Document Signer certificate issue (e-Government)", s: 17, d: 3, pred: ["hsm"] },
  { key: "dsissued", name: "Document Signer certificate issued (e-Government)", at: 19, pred: ["dsissue"] },
  { key: "D_soc", name: "NRB Security Operations Center integration details (NRB)", at: 24, pred: T(24) },
  { key: "D_remote", name: "Remote support access arranged (NRB, e-Government)", at: 25, pred: T(25) },
];

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
  if (byKey[t.key]) throw new Error("duplicate key " + t.key);
  byKey[t.key] = t;
  rows.push(t);
  if (currentSum) currentSum.children.push(t);
}

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
if (problems.length) {
  console.error("Schedule is inconsistent with its own links:");
  for (const p of problems) console.error("  ! " + p);
  process.exit(1);
}

/* Project schedules every task as soon as its links allow. A task stated later
   than its links require is therefore pulled forward when the file is opened,
   and the Gantt no longer matches the text. Compute each task's earliest start
   the way Project does and refuse to write the file if any stated week is later.
   A date the Contract fixes, such as factory acceptance, is held by a link from
   the Effective Date, never by a stated week alone. */
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
const pulled = Object.values(byKey).filter((t) => es(t.key) < t.start);
if (pulled.length) {
  console.error("Project would pull these tasks earlier than stated, because nothing holds them:");
  for (const t of pulled) console.error("  ! " + t.name + ": stated week " + (t.start + 1) + ", links allow week " + (earliest[t.key] + 1));
  process.exit(1);
}

/* ---------------------------------------------------------- dates and XML */

const DAY = 86400000;
const pad = (n) => String(n).padStart(2, "0");
const iso = (d, hh) => d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + hh + ":00:00";
// start of week t (Monday 08:00), and end of week t (Friday 17:00)
const startAt = (t) => iso(new Date(PROJECT_START.getTime() + 7 * t * DAY), "08");
const endAt = (t) => (t === 0 ? startAt(0) : iso(new Date(PROJECT_START.getTime() + (7 * t - 3) * DAY), "17"));
const hours = (weeks) => "PT" + weeks * 40 + "H0M0S";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const LINK_TYPE = { FF: 0, FS: 1, SF: 2, SS: 3 };
const TENTHS_OF_MINUTE_PER_WEEK = 5 * 8 * 60 * 10;

for (const r of rows.filter((x) => x.summary)) {
  r.start = Math.min(...r.children.map((c) => c.start));
  r.finish = Math.max(...r.children.map((c) => c.finish));
}

let id = 0;
let top = 0, sub = 0;
for (const r of rows) {
  r.uid = ++id;
  if (r.summary || r.level === 1) { top++; sub = 0; r.outline = String(top); }
  else { sub++; r.outline = top + "." + sub; }
}

/* Project's XML reader is order-sensitive: an element out of sequence is
   silently ignored rather than rejected. The order below is the order Project
   2013 itself writes, taken from a file it saved.

   Type is 0, fixed units, which is Project's own default. Type 1, fixed
   duration, made Project 2013 discard every duration on import and open the
   whole schedule at zero length. With no resources assigned the two schedule
   identically, so nothing is lost. Found by bisecting against a file Project
   wrote itself. */
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
  return "    <Task>\n      " + lines.join("\n      ") + "\n    </Task>";
}).join("\n");

const workDay = (n) =>
  "      <WeekDay><DayType>" + n + "</DayType><DayWorking>1</DayWorking><WorkingTimes>" +
  "<WorkingTime><FromTime>08:00:00</FromTime><ToTime>12:00:00</ToTime></WorkingTime>" +
  "<WorkingTime><FromTime>13:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime>" +
  "</WorkingTimes></WeekDay>";

const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Project xmlns="http://schemas.microsoft.com/project">
  <SaveVersion>14</SaveVersion>
  <Name>Information-System-Schedule.xml</Name>
  <Title>Information System Schedule, MW-PPPC-546386-GO-RFB</Title>
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
`;

fs.writeFileSync(OUT, xml);

const leaves = rows.filter((r) => !r.summary);
console.log("Wrote " + path.relative(__dirname, OUT));
console.log("  " + rows.filter((r) => r.summary).length + " phases, " + leaves.filter((r) => !r.milestone).length + " tasks, " +
  leaves.filter((r) => r.milestone).length + " milestones, " + leaves.reduce((n, r) => n + r.links.length, 0) + " links, all consistent");
console.log("  Finish: week " + Math.max(...leaves.map((r) => r.finish)));
