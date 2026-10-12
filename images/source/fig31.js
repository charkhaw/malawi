// Figure 3.1, Personalization line and its laser stations.
// 12 October 2026: five stations as offered, two for each face and one for the CLI, serviced
// between production runs; filtering system in place of cooling, and no air compressor.
const F = require("./figlib.js")(1400, 800, 17);

F.raw(`<rect x="20" y="20" width="1360" height="640" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(38, 46, ["PERSONALIZATION LINE 1"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });

// Feeder
F.box(40, 250, 180, 84, ["Card feeder", "600 cards from", "controlled stock"], "solid", { size: 16 });
F.line([[220, 292], [280, 292]], { end: true });

// Laser marking: five stations, one pass
F.box(280, 90, 400, 404, [], "dashed");
F.text(480, 118, ["LASER MARKING, ONE PASS"], { size: 14, weight: 700, spacing: 1 });
const G = [[146, "Front face", "laser stations 1 and 2"], [258, "Back face", "laser stations 3 and 4"], [370, "CLI", "laser station 5"]];
for (const [y, a, b] of G) F.box(310, y, 340, 84, [a, b], "solid", { size: 16 });
F.label(480, 548, ["Each card: recognition against the job's card reference,", "X-Y alignment of front, back and CLI, then all marking"], "middle", { size: 14 });
F.label(480, 608, ["A station is serviced between production runs, after the job", "settings are reconfigured; production continues on line 2"], "middle", { size: 14 });

// Verification and outputs
F.line([[680, 292], [730, 292]], { end: true });
F.box(730, 250, 200, 84, ["In-line verification", "cameras and", "scanners"], "solid", { size: 16 });
F.line([[930, 270], [965, 270], [965, 180], [1010, 180]], { end: true });
F.label(973, 228, ["pass"], "start");
F.box(1010, 140, 190, 80, ["Card stacker", "600 cards"]);
F.line([[1200, 180], [1360, 180]], { end: true });
F.label(1280, 150, ["verified cards", "to mailing"]);
F.line([[930, 314], [965, 314], [965, 404], [1010, 404]], { end: true });
F.label(973, 360, ["fail"], "start");
F.box(1010, 364, 190, 80, ["Card reject", "module"]);
F.label(1105, 470, ["Recorded against the job,", "reproduced within it, held", "for secure destruction"], "middle", { size: 14.5 });

// Support systems
F.box(40, 590, 200, 56, ["Filtering system"], "solid", { size: 16 });
F.box(1220, 590, 150, 56, ["Industrial", "control PC"], "solid", { size: 16 });

// Outside the line
F.line([[1295, 646], [1295, 700]], { start: true, end: true });
F.label(1285, 682, ["batches in, card results out"], "end", { size: 14.5 });
F.box(1170, 700, 210, 70, ["Printer Control", "Service"]);
F.box(20, 700, 520, 70, ["Personalization line 2: identical, and", "independent of line 1"], "solid", { size: 16 });

F.write("fig31");
