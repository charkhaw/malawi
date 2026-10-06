// Figure 7.1, Integration with NRIS.
const F = require("./figlib.js")(1210, 600, 17);

// NRIS estate
F.box(20, 20, 500, 560, [], "double");
F.text(40, 48, ["NRIS, NATIONAL REGISTRATION BUREAU"], { size: 15, anchor: "start", weight: 700, spacing: 1 });
F.box(45, 76, 210, 76, ["Electronic Birth", "Registration System"], "solid", { size: 16 });
F.box(285, 76, 210, 76, ["Electronic Marriage", "Registration System"], "solid", { size: 16 });
F.box(140, 245, 260, 100, ["National Identity System", "central hub, generates the", "National Identity Number"], "solid", { size: 16 });
F.box(165, 470, 210, 76, ["Electronic Death", "Registration System"], "solid", { size: 16 });
F.line([[190, 152], [190, 245]], { end: true });
F.label(200, 202, ["births"], "start", { size: 14.5 });
F.line([[350, 152], [350, 245]], { end: true });
F.label(360, 202, ["marriages"], "start", { size: 14.5 });
F.line([[270, 470], [270, 345]], { end: true });
F.label(280, 412, ["deaths"], "start", { size: 14.5 });

// The single boundary
F.line([[400, 285], [750, 285]], { start: true, end: true });
F.label(620, 240, ["Production requests,", "approved citizen records"]);
F.line([[400, 318], [750, 318]], { start: true, end: true });
F.label(620, 342, ["Status and lifecycle", "events, audit records"]);
F.label(620, 420, ["One endpoint, mutual", "certificate authentication"], "middle", { size: 14.5, italic: true });

// Production system
F.raw(`<rect x="720" y="200" width="470" height="380" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(738, 228, ["PERSONALIZATION AND MAILING SYSTEM"], { size: 15, anchor: "start", weight: 700, spacing: 1 });
F.box(750, 262, 160, 80, ["Integration", "gateway"]);
F.line([[910, 302], [990, 302]], { start: true, end: true });
F.box(990, 262, 180, 80, ["Data Preparation", "Service"]);
F.line([[1080, 342], [1080, 420]], { start: true, end: true });
F.box(990, 420, 180, 56, ["Database"], "dotted");
F.box(750, 395, 160, 110, ["Card personalization,", "quality control,", "stock control,", "mailing and", "dispatch services"], "solid", { size: 14.5 });
F.line([[910, 448], [990, 448]], { start: true, end: true });
F.label(955, 537, ["Other services reach NRIS only through the", "database and the Data Preparation Service"], "middle", { size: 14.5 });

F.write("fig71");
