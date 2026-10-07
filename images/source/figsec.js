// Figure 10.1, Cybersecurity architecture, by NIST CSF 2.0 function.
const F = require("./figlib.js")(1400, 790, 16);

function title(x, y, t, anchor = "start") { F.text(x, y, [t], { size: 16, anchor, weight: 700, spacing: 1.2 }); }
function chips(x0, y, w, h, gap, list, size = 15) {
  list.forEach((c, i) => {
    const [lines, style] = Array.isArray(c) && Array.isArray(c[0]) ? c : [c, "solid"];
    F.box(x0 + i * (w + gap), y, w, h, lines, style, { size });
  });
}

// Govern and Identify
F.box(20, 20, 670, 120, [], "light");
title(36, 44, "GOVERN");
chips(32, 60, 152, 70, 8, [
  ["Roles and separation", "of duties"],
  ["Access", "recertification"],
  ["ISO/IEC 27001,", "NIST CSF 2.0"],
  ["Malawi data", "protection law"],
], 14.5);
F.box(710, 20, 670, 120, [], "light");
title(726, 44, "IDENTIFY");
chips(722, 60, 152, 70, 8, [
  ["Software and", "license inventory"],
  ["Serialized blank", "card stock"],
  ["Data classification,", "residency, retention"],
  ["Zone and trust", "boundary model"],
], 14.5);

// Protect, in depth
F.box(20, 160, 920, 610, [], "light");
title(36, 184, "PROTECT");
const layers = [
  ["Network", [
    [["Perimeter firewall,", "NRB and", "e-Government"], "double"],
    ["Next generation", "firewall pair,", "intrusion prevention"],
    ["Ten segregated zones;", "Machine Control Zone", "on its own VLAN"],
    ["Mutual certificate", "authentication to NRIS;", "TLS 1.2 or higher"],
  ]],
  ["Identity and access", [
    ["Single sign-on"],
    ["Multi-factor", "authentication for", "administrators", "and operators"],
    ["Privileged access", "management,", "just-in-time"],
    ["Role-based and", "context-aware", "access"],
  ]],
  ["Platform and endpoints", [
    ["Secure boot"],
    ["Hardened", "configuration", "baselines"],
    ["Endpoint detection", "and response"],
    ["Vulnerability", "scanning and", "patching"],
  ]],
  ["Applications and interfaces", [
    ["Secure coding", "standard and", "code review"],
    ["Static and dynamic", "security testing"],
    ["Release gate and", "dependency control"],
    ["Interface", "authentication, rate", "limiting, validation"],
  ]],
  ["Data and keys", [
    ["Encryption at rest", "and in transit"],
    ["Data masking", "outside production"],
    ["Hardware security", "modules, FIPS", "validated"],
    ["Signing Service,", "sole client of", "the modules"],
  ]],
];
layers.forEach(([name, list], i) => {
  const y = 205 + i * 111;
  if (i) F.line([[32, y - 5], [928, y - 5]], { width: 0.8 });
  F.text(36, y + 50 - (name.includes(" and ") ? 10 : 0), name.includes(" and ") ? [name.split(" and ")[0] + " and", name.split(" and ")[1]] : [name], { size: 16, anchor: "start", weight: 600 });
  chips(215, y, 171, 96, 8, list, 15);
});

// Detect, respond, recover span every layer
function band(x, name, list) {
  F.box(x, 160, 135, 610, [], "light");
  title(x + 67.5, 184, name, "middle");
  list.forEach((c, i) => F.box(x + 8, 205 + i * 90, 119, 82, c, "solid", { size: 14 }));
}
band(960, "DETECT", [
  ["Security", "information", "and event", "management"],
  ["Log", "aggregation"],
  ["User behavior", "analytics"],
  ["Security", "Operations", "Center"],
  ["Tamper-proof", "audit logs"],
  ["Common time", "source"],
]);
band(1105, "RESPOND", [
  ["Incident", "classification,", "S1 to S4"],
  ["Containment", "and evidence", "preservation"],
  ["Notification", "within 24 hours"],
]);
band(1250, "RECOVER", [
  ["Immutable", "backups"],
  ["Failover within", "the cluster"],
  ["Secondary", "environment"],
  ["Recovery tested", "at least annually"],
]);

F.write("figsec");
