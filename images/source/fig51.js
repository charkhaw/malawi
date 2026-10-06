// Figure 5.1, Mailing line.
const F = require("./figlib.js")(1270, 660, 17);

// Job data interface
F.box(405, 20, 460, 60, ["Mailing and Dispatch Management System"]);
F.line([[635, 80], [635, 130]], { start: true, end: true });
F.label(647, 100, ["job data for the batch in; dispatch records out"], "start", { size: 14.5 });

F.raw(`<rect x="20" y="130" width="1230" height="440" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(38, 156, ["MAILING LINE 1"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });

// Row 1, left to right
const r1 = 180, h = 84;
F.box(40, r1, 190, h, ["Card input hopper", "600 cards"]);
F.line([[230, r1 + 42], [280, r1 + 42]], { end: true });
F.box(280, r1, 210, h, ["Card reading station", "first read: identifier", "matched to job data"], "solid", { size: 15.5 });
F.line([[490, r1 + 42], [540, r1 + 42]], { end: true });
F.box(540, r1, 190, h, ["Card transport", "modules"]);
F.line([[730, r1 + 42], [780, r1 + 42]], { end: true });
F.box(780, r1, 200, h, ["Carrier printing station", "with address and", "dispatch reference"], "solid", { size: 15.5 });
F.line([[980, r1 + 42], [1030, r1 + 42]], { end: true });
F.box(1030, r1, 200, h, ["Card affixing station", "one to four cards"], "solid", { size: 16 });

// Row 2, right to left
const r2 = 390;
F.line([[1130, r1 + h], [1130, r2]], { end: true });
F.box(1030, r2, 200, h, ["Verification station", "second read: card", "matches its carrier"], "solid", { size: 15.5 });
F.line([[1030, r2 + 42], [980, r2 + 42]], { end: true });
F.box(780, r2, 200, h, ["Folding station"]);
F.line([[780, r2 + 42], [730, r2 + 42]], { end: true });
F.box(530, r2, 200, h, ["Inserting module"]);
F.line([[530, r2 + 42], [490, r2 + 42]], { end: true });
F.box(280, r2, 210, h, ["Sealing station", "address shows through", "the envelope window"], "solid", { size: 15.5 });
F.line([[280, r2 + 42], [230, r2 + 42]], { end: true });
F.box(40, r2, 190, h, ["Dispatch sorting", "by destination"]);

// Reject magazines at the two reads
F.box(300, 292, 170, 70, ["Reject", "magazine"], "light");
F.line([[385, r1 + h], [385, 292]], { end: true });
F.label(395, 280, ["no match"], "start", { size: 14 });
F.box(830, 292, 170, 70, ["Reject", "magazine"], "light");
F.line([[1060, r2], [1060, 327], [1000, 327]], { end: true });
F.label(1052, 377, ["mismatch"], "end", { size: 14 });

F.label(635, 520, ["Buffer modules between stations absorb short stoppages without halting the line"]);

// Output and second line
F.line([[135, r2 + h], [135, 600]], { end: true });
F.label(147, 594, ["dispatch batches"], "start");
F.box(510, 590, 740, 56, ["Mailing line 2: identical, and independent of line 1"], "solid", { size: 16 });

F.write("fig51");
