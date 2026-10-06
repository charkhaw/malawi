// Figure 3.1, Personalization line and independent laser stations.
const F = require("./figlib.js")(1400, 800, 17);

F.raw(`<rect x="20" y="20" width="1360" height="640" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(38, 46, ["PERSONALIZATION LINE 1"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });

// Feeder
F.box(40, 250, 180, 84, ["Card feeder", "600 cards from", "controlled stock"], "solid", { size: 16 });
F.line([[220, 292], [270, 292]]);

// Distribution to the stations
const ST = [[80, "Laser station 1", true], [170, "Laser station 2", true], [260, "Laser station 3", false], [350, "Laser station 4", true], [470, "Laser station n", true]];
F.line([[270, 110], [270, 500]]);
F.line([[680, 110], [680, 500]]);
for (const [y, name, up] of ST) {
  if (up) {
    F.box(330, y, 290, 60, [name, "complete card, both faces"], "solid", { size: 16 });
    F.line([[270, y + 30], [330, y + 30]], { end: true });
    F.line([[620, y + 30], [680, y + 30]]);
  } else {
    F.box(330, y, 290, 60, [], "light");
    F.raw(`<rect x="330" y="${y}" width="290" height="60" fill="none" stroke="#000" stroke-width="1.6" stroke-dasharray="3 5"/>`);
    F.text(475, y + 20, [name + ": out of service", "switched off or removed"], { size: 15.5, italic: true });
  }
}
F.text(475, 430, ["⋮"], { size: 24 });
F.label(475, 560, ["Cards are routed only to available stations. Production", "continues without interruption while a station is out of service"]);
F.label(475, 612, ["Each station: card recognition against the job's card reference,", "X-Y alignment of front, back and CLI, then all marking"], "middle", { size: 14 });

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
F.box(40, 590, 200, 56, ["Cooling system"], "solid", { size: 16 });
F.box(1000, 590, 200, 56, ["Air compressor", "system"], "solid", { size: 16 });
F.box(1220, 590, 150, 56, ["Industrial", "control PC"], "solid", { size: 16 });

// Outside the line
F.line([[1295, 646], [1295, 700]], { start: true, end: true });
F.label(1285, 682, ["batches in, card results out"], "end", { size: 14.5 });
F.box(1170, 700, 210, 70, ["Printer Control", "Service"]);
F.box(20, 700, 520, 70, ["Personalization line 2: identical, and", "independent of line 1"], "solid", { size: 16 });

F.write("fig31");
