// Figure 9.1, Network zones.
const F = require("./figlib.js")(1400, 1345, 17);

// Outside the facility
F.box(30, 35, 150, 60, ["NRIS"], "double");
F.box(250, 40, 550, 50, ["Government Wide Area Network"], "double");
F.line([[180, 65], [250, 65]]);
F.box(960, 12, 410, 200, [], "double");
F.text(1165, 34, ["Secondary environment,", "Purchaser's disaster recovery data center"], { size: 15.5 });
F.box(985, 76, 200, 54, ["Host (x1): standby", "services, database copy"], "grey", { size: 15 });
F.box(1195, 76, 150, 54, ["Storage array"], "grey", { size: 15 });
F.box(985, 142, 175, 54, ["Immutable", "backup storage"], "grey", { size: 15 });
F.box(1170, 142, 175, 54, ["Firewall and", "switch"], "grey", { size: 15 });
F.line([[800, 65], [960, 65]]);
F.label(880, 88, ["Database replication", "and backup copies"]);
F.box(360, 130, 240, 62, ["Perimeter firewall", "(NRB and e-Government)"], "double", { size: 16 });
F.line([[480, 90], [480, 130]]);

// Facility
F.raw(`<rect x="15" y="225" width="1370" height="970" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(35, 250, ["CARD PRODUCTION FACILITY"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });
F.line([[480, 192], [480, 580]]);

// Zones above the firewall
F.zone(40, 270, 260, 270, ["EXTERNAL", "INTEGRATION ZONE"]);
F.box(60, 380, 220, 66, ["Integration", "gateway (x1)"]);
F.zone(320, 270, 130, 270, ["DMZ"]);
F.text(385, 385, ["Provisioned,", "no service", "at go-live"], { size: 16, italic: true });
F.zone(510, 270, 250, 270, ["WORKSTATION", "SEGMENT"]);
F.box(535, 365, 200, 86, ["Operator and", "administrative", "workstations (x10)"], "grey");
F.zone(780, 270, 580, 270, ["MANAGEMENT AND MONITORING ZONE"]);
F.box(800, 320, 270, 62, ["Management and administrative", "access host (x1)"]);
F.box(1090, 320, 250, 62, ["Domain controller (x1)"]);
F.box(800, 396, 270, 62, ["Security monitoring (x1)"]);
F.box(1090, 396, 250, 62, ["Backup management (x1)"]);
F.box(1090, 472, 250, 50, ["Immutable backup storage"], "grey", { size: 16 });

F.line([[170, 540], [170, 580]]);
F.label(182, 561, ["NRIS exchange, mutual TLS"], "start");
F.line([[420, 540], [420, 580]]);
F.line([[635, 540], [635, 580]]);
F.line([[1070, 540], [1070, 580]]);

// Firewall pair
F.box(40, 580, 1320, 60, ["Next generation firewall pair: zone policy, intrusion detection and prevention"], "grey", { size: 18 });

// Zones below the firewall
F.zone(40, 690, 520, 310, ["APPLICATION ZONE"]);
F.box(60, 740, 230, 62, ["Application server (x2),", "load balanced"]);
F.box(310, 740, 230, 62, ["Signing Service (x1)"]);
F.box(310, 915, 230, 62, ["Hardware security", "modules (x2)"], "grey");
F.line([[425, 802], [425, 915]]);
F.label(413, 858, ["Signing Service only"], "end");

F.zone(580, 690, 220, 310, ["DATABASE ZONE"]);
F.box(600, 800, 180, 70, ["Database (x2),", "clustered"]);

F.zone(820, 690, 540, 310, ["MACHINE CONTROL ZONE"]);
F.box(960, 740, 260, 62, ["Printer control (x1),", "both lines"]);
F.line([[1090, 802], [1090, 812]]);
F.line([[966, 812], [1230, 812]]);
F.line([[966, 812], [966, 830]]);
F.line([[1230, 812], [1230, 830]]);
F.box(846, 830, 240, 50, ["Access switch 1"], "grey", { size: 15.5 });
F.box(1110, 830, 240, 50, ["Access switch 2"], "grey", { size: 15.5 });
F.line([[966, 880], [966, 897]]);
F.line([[900, 897], [1032, 897]]);
F.line([[1230, 880], [1230, 897]]);
F.line([[1164, 897], [1296, 897]]);
[[840, "Personalization", "line 1"], [972, "Mailing", "line 1"], [1104, "Personalization", "line 2"], [1236, "Mailing", "line 2"]]
  .forEach(([x, a, b]) => { F.box(x, 915, 120, 60, [a, b], "grey", { size: 15.5 }); F.line([[x + 60, 897], [x + 60, 915]]); });

F.line([[300, 640], [300, 690]]);
F.line([[690, 640], [690, 690]]);
F.line([[1090, 640], [1090, 690]]);
F.label(1102, 655, ["Batches to printer control;", "job data to the mailing lines"], "start", { size: 14 });

// Platform and non-production
F.box(40, 1030, 820, 140, [], "solid");
F.text(56, 1052, ["PLATFORM"], { size: 15, anchor: "start", weight: 700, spacing: 0.8 });
F.box(65, 1080, 220, 62, ["Virtualization hosts (x4),", "two clusters"], "grey", { size: 15.5 });
F.box(345, 1080, 200, 62, ["Core switch pair"], "grey");
F.box(605, 1080, 230, 62, ["Storage array,", "dual controllers"], "grey");
F.line([[285, 1111], [345, 1111]], { width: 4.5 });
F.line([[545, 1111], [605, 1111]], { width: 4.5 });
F.label(450, 1060, ["Storage network: separate segment, redundant paths"]);

F.zone(880, 1030, 480, 140, ["NON-PRODUCTION SEGMENT"]);
F.text(1120, 1086, ["Development, training and", "user acceptance testing"], { size: 16 });
F.text(1120, 1138, ["Virtual machines on the application hosts,", "masked data only"], { size: 14.5, italic: true });
F.line([[1360, 1100], [1373, 1100], [1373, 610], [1360, 610]]);

// Legend
F.box(15, 1215, 900, 115, [], "solid");
F.text(33, 1238, ["Legend"], { size: 16, anchor: "start", weight: 700 });
[[33, 1256, "solid", "Virtual machine, supplied under this contract"],
 [480, 1256, "grey", "Hardware, supplied under this contract"],
 [33, 1293, "double", "Provided by the Purchaser"],
 [480, 1293, "zone", "Network zone"]]
  .forEach(([x, y, st, t]) => { F.box(x, y, 62, 28, [], st); F.text(x + 76, y + 14, [t], { size: 16, anchor: "start" }); });

F.write("fig91");
