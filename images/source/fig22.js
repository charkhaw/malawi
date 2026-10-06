// Figure 2.2, End-to-end process flow.
const F = require("./figlib.js")(1100, 1220, 17);
const CX = 540, X = 390, W = 300, SX = 40, SW = 250;

const steps = [
  [["1. Requests retrieved"], 20, 56, "Job received"],
  [["2. Record validation"], 110, 56, "Card rejected"],
  [["3. Queue and batch release"], 200, 56, "Card in production"],
  [["4. Retrieve citizen data"], 290, 56, null],
  [["5. Compose layout", "and sign QR"], 380, 64, null],
  [["6. Draw blank and", "laser engrave"], 478, 64, "Card personalized"],
  null, // 7 is the decision
  [["9. Batch and transfer to mailing", "(manual batch transfer)"], 750, 64, null],
  [["10. Print carrier, affix", "and verify card"], 848, 64, null],
  [["11. Insert and seal"], 942, 56, "Card packaged"],
  [["12. Sort and dispatch", "to office"], 1036, 64, "Card dispatched"],
  [["13. Arrival confirmed,", "available for collection"], 1134, 64, "Card delivered"],
];

function status(cy, t, fromX) {
  F.box(SX, cy - 22, SW, 44, [t], "dashed");
  F.line([[fromX, cy], [SX + SW, cy]], { end: true });
}

let prevBottom = null;
for (const s of steps) {
  if (!s) { prevBottom = 704; continue; }
  const [lines, y, h, st] = s;
  F.box(X, y, W, h, lines);
  if (prevBottom !== null) F.line([[CX, prevBottom], [CX, y]], { end: true });
  if (st) status(y + h / 2, st, X);
  prevBottom = y + h;
  if (y === 478) { F.line([[CX, y + h], [CX, 576]], { end: true }); prevBottom = null; }
}

// 7. Decision
F.diamond(CX, 640, 140, 64, ["7. Verification", "pass?"]);
status(640, "Quality control completed", CX - 140);
F.label(552, 727, ["pass"], "start");

// 8. Reject branch
F.line([[CX + 140, 640], [750, 640]], { end: true });
F.label(715, 626, ["fail"]);
F.box(750, 608, 160, 64, ["8. Reject and", "reproduce"]);
F.line([[910, 640], [950, 640]], { end: true });
F.box(950, 608, 130, 64, ["Secure", "destruction"]);
F.line([[830, 608], [830, 510], [X + W, 510]], { end: true });
F.label(842, 550, ["Reproduction", "in same job"], "start");
F.line([[830, 672], [830, 710]], { end: true });
F.box(755, 710, 150, 44, ["Card rejected"], "dashed");

F.write("fig22");
