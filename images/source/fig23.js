// Figure 2.3, Card issuance lifecycle.
const F = require("./figlib.js")(1400, 730, 17);

function op(y, h, name, trigger) {
  F.box(20, y, 480, h, [], "solid");
  F.text(260, y + 24, [name], { weight: 700 });
  F.text(260, y + 50, trigger, { size: 16 });
  return y + h / 2;
}

const ys = [
  op(20, 72, "First issuance", ["First-time registration approved in NRIS"]),
  op(106, 72, "Replacement", ["Card reported lost, stolen, damaged or defaced"]),
  op(192, 92, "Duplicate", ["Authorized request for an additional card", "against an existing record"]),
  op(298, 92, "Re-issuance", ["Change of personal details, including marriage", "and legal change of name"]),
  op(404, 92, "Renewal", ["Expiry of the card, in accordance with", "applicable legislation and policy"]),
];

// Collector into the production request
const BUS = 570;
ys.forEach((y) => F.line([[500, y], [BUS, y]]));
F.line([[BUS, ys[0]], [BUS, ys[4]]]);
F.line([[BUS, 257], [650, 257]], { end: true });
F.box(650, 217, 230, 80, ["Production request", "issued by NRIS"]);
F.line([[880, 257], [980, 257]], { end: true });
F.box(980, 217, 230, 80, ["Common", "production path"], "solid");

// Cancellation
const cy = op(560, 72, "Cancellation", ["Death recorded in NRIS, or cancellation of the record"]);
F.line([[500, cy], [620, cy]], { end: true });
F.diamond(760, cy, 140, 78, ["Record already", "released to", "production?"]);
F.line([[900, cy], [940, cy], [940, 520], [980, 520]], { end: true });
F.label(952, 540, ["no"], "start");
F.box(980, 482, 300, 76, ["No card produced,", "record flagged in NRIS"]);
F.line([[940, cy], [940, 650], [980, 650]], { end: true });
F.label(952, 628, ["yes"], "start");
F.box(980, 590, 400, 120, ["Job intercepted at the earliest stage the", "card has not yet reached. A card already", "personalized is held for secure destruction", "and reconciled against blank card stock"], "solid", { size: 16 });

F.write("fig23");
