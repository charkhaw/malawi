// Figure 10.1, Card signing.
// 7 October 2026: one hardware security module at each site; the key is replicated to the module at
// the secondary site, which signs if the module at the primary site is unavailable.
const F = require("./figlib.js")(1460, 915, 17);

// Certification authority, outside the facility
F.box(740, 20, 320, 100, [], "double");
F.text(900, 44, ["Government certification", "authority (e-Government)"], { weight: 600 });
F.text(900, 96, ["Root and issuing certification authority"], { size: 14 });

// Facility
F.raw(`<rect x="20" y="210" width="1080" height="500" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(40, 236, ["CARD PRODUCTION FACILITY"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });

// Every card
F.step(86, 268, 1);
F.label(106, 268, ["Assembles the QR payload"], "start");
F.box(70, 290, 230, 90, ["Data Preparation", "Service"]);
F.box(420, 290, 220, 90, ["Signing Service"]);

F.box(780, 270, 280, 270, [], "light");
F.text(920, 296, ["Hardware security", "module, primary site"], { weight: 700 });
F.box(850, 350, 140, 56, ["Module 1"], "grey", { size: 16 });
F.label(920, 470, ["Document Signer private key:", "generated inside, never extracted"]);

// Secondary environment
F.box(1130, 250, 310, 310, [], "double");
F.text(1285, 278, ["SECONDARY ENVIRONMENT"], { size: 14, weight: 700, spacing: 1 });
F.box(1215, 350, 140, 56, ["Module 2"], "grey", { size: 16 });
F.line([[990, 378], [1215, 378]], { end: true });
F.label(1285, 448, ["Key replicated over the", "modules' protected channel,", "encrypted between the sites"], "middle", { size: 14 });
F.label(1285, 518, ["Signs if module 1", "is unavailable"], "middle", { size: 14 });

F.line([[300, 320], [420, 320]], { end: true });
F.label(360, 294, ["QR payload"]);
F.step(360, 320, 2);
F.line([[420, 352], [300, 352]], { end: true });
F.label(360, 378, ["Signature"]);
F.step(360, 352, 3);

F.line([[640, 320], [780, 320]], { end: true });
F.label(710, 294, ["Payload"]);
F.step(710, 320, 2);
F.line([[780, 352], [640, 352]], { end: true });
F.label(710, 378, ["Signature"]);
F.step(710, 352, 3);

F.line([[185, 380], [185, 470]], { end: true });
F.step(185, 425, 4);
F.label(206, 425, ["Signed job"], "start");
F.box(70, 470, 230, 80, ["Printer Control", "Service"]);
F.line([[185, 550], [185, 600]], { end: true });
F.label(197, 575, ["QR engraved"], "start");
F.box(70, 600, 230, 80, ["Personalization", "lines (x2)"], "grey");

F.line([[530, 380], [530, 470]], { end: true });
F.step(530, 425, 5);
F.label(551, 425, ["Record and certificate logged"], "start");
F.box(420, 470, 220, 80, ["Audit trail"]);

// Once for each certificate
F.line([[900, 270], [900, 120]], { end: true, width: 4 });
F.label(916, 152, ["Once per certificate:", "signing request, public key only"], "start");
F.line([[740, 70], [530, 70], [530, 290]], { end: true, width: 4 });
F.label(735, 52, ["Once per certificate: Document Signer certificate"], "end");

// Legend
F.box(20, 730, 1420, 165, [], "solid");
F.text(38, 752, ["Legend"], { size: 16, anchor: "start", weight: 700 });
[[38, 770, "solid", "Software supplied under this contract"],
 [560, 770, "grey", "Hardware supplied under this contract"],
 [38, 812, "double", "Provided by the Purchaser"]]
  .forEach(([x, y, st, t]) => { F.box(x, y, 62, 28, [], st); F.text(x + 76, y + 14, [t], { size: 16, anchor: "start" }); });
F.step(591, 826, 4);
F.text(636, 826, ["Signing step for every card"], { size: 16, anchor: "start" });
F.line([[38, 868], [100, 868]], { end: true, width: 4 });
F.text(114, 868, ["Once for each Document Signer certificate"], { size: 16, anchor: "start" });

F.write("fig101");
