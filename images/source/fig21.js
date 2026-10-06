// Figure 2.1, Architecture overview.
const F = require("./figlib.js")(1520, 850, 17);

// Tiers: [y, h, name lines, bullets, right edge]
const TX = 450, NAMEW = 200, BX = 668;
function tier(y, h, name, bullets, right = 1010) {
  F.box(TX, y, right - TX, h, [], "solid");
  F.text(TX + 18, y + h / 2 - ((name.length - 1) * 12), name, { size: 20, anchor: "start", weight: 700, spacing: 0.6 });
  F.line([[TX + NAMEW, y + 14], [TX + NAMEW, y + h - 14]], { width: 1.2 });
  const lh = 21.5, top = y + h / 2 - ((bullets.length - 1) * lh) / 2;
  bullets.forEach((b, i) => {
    const cont = b.startsWith("  ");
    if (!cont) F.raw(`<circle cx="${BX - 10}" cy="${top + i * lh}" r="2.6" fill="#000"/>`);
    F.text(BX, top + i * lh, [b.trim()], { size: 16.5, anchor: "start" });
  });
}

tier(20, 130, ["PRESENTATION"], ["Operator consoles", "Web administration portals", "Supervisor and production dashboards", "Audit and reporting interfaces", "Graphical layout design"]);
tier(180, 130, ["APPLICATION"], ["Card personalization management", "Laser personalization control software", "Mailing and dispatch management", "Production workflow orchestration", "Stock control and card accountability"]);
tier(340, 170, ["INTEGRATION"], ["Interfaces to NRIS and to dispatch", "  and delivery tracking", "Service orchestration", "Exception and retry handling"], 970);
tier(540, 130, ["DATA"], ["Identity and personalization data", "Production and dispatch records", "Audit logs", "Machine telemetry", "Clustered, replicated, encrypted"], 970);

// Production hardware
F.box(TX, 700, 560, 130, [], "solid");
F.text(TX + 18, 753, ["PRODUCTION", "HARDWARE"], { size: 20, anchor: "start", weight: 700, spacing: 0.6 });
F.line([[TX + NAMEW, 714], [TX + NAMEW, 816]], { width: 1.2 });
[[668, 714, "Personalization line 1"], [838, 714, "Personalization line 2"], [668, 770, "Mailing line 1"], [838, 770, "Mailing line 2"]]
  .forEach(([x, y, t]) => F.box(x, y, 160, 46, [t], "grey", { size: 15 }));

// Between tiers
[[150, 180], [310, 340], [510, 540]].forEach(([a, b]) => F.line([[800, a], [800, b]], { start: true, end: true }));
// Equipment is driven from the application tier
F.line([[990, 700], [990, 310]], { start: true, end: true, width: 2.2 });

// Cross-cutting bands, text rotated
function band(x, title, lines) {
  F.box(x, 20, 80, 810, [], "light");
  const cx = x + 40, cy = 425;
  const all = [[title, 700, 18], ...lines.map((l) => [l, 400, 15.5])];
  all.forEach(([t, w, s], i) => F.raw(`<text transform="translate(${cx + (i - 1) * 21},${cy}) rotate(-90)" text-anchor="middle" dominant-baseline="central" font-size="${s}" font-weight="${w}"${w > 400 ? ' letter-spacing="1"' : ""}>${t}</text>`));
}
band(1030, "MONITORING AND MANAGEMENT", ["Production and machine health monitoring • Environmental and consumable thresholds", "Alerting • Performance analytics and reporting"]);
band(1130, "SECURITY", ["Identity and access management • Cryptographic services • Key management", "Digital signature generation • Tamper-proof audit logging"]);

// External systems
F.box(20, 350, 150, 70, ["NRIS"], "double");
F.line([[170, 385], [TX, 385]], { start: true, end: true });
F.label(310, 350, ["Requests and citizen records in;", "status and lifecycle events out"]);

F.box(20, 440, 150, 70, ["Dispatch and", "delivery tracking"], "double", { size: 16 });
F.line([[170, 475], [TX, 475]], { start: true, end: true });
F.label(310, 440, ["Dispatch data out;", "delivery status in"]);

F.box(1370, 390, 140, 70, ["Public key", "infrastructure"], "double", { size: 16 });
F.line([[1210, 425], [1370, 425]], { start: true, end: true });
F.label(1290, 382, ["Signing requests out;", "certificates in"]);

F.box(1370, 520, 140, 90, ["NRB Security", "Operations", "Center"], "double", { size: 15 });
F.line([[1210, 565], [1370, 565]], { end: true });
F.label(1290, 522, ["Security alerts", "and events out"]);

F.write("fig21");
