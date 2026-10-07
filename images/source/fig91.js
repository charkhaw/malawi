// Figure 9.1, Network zones.
// 7 October 2026: ten zones, each a VLAN; the User Network on a stack of edge switches; the Backup
// Zone and the Management Network below the firewall pair; the Storage Zone, not routed, on the
// platform; one hardware security module at each site; the secondary site without a storage array.
const F = require("./figlib.js")(1400, 1565, 17);

// A network zone with its VLAN under the title.
function Z(x, y, w, h, title, vlan) {
  F.zone(x, y, w, h, title);
  F.text(x + 14, y + 22 + [].concat(title).length * 18.75, ["VLAN " + vlan], { size: 15, anchor: "start" });
}

// Outside the facility
F.box(30, 35, 150, 60, ["NRIS"], "double");
F.box(250, 40, 530, 50, ["Government Wide Area Network"], "double");
F.line([[180, 65], [250, 65]]);
F.box(940, 12, 440, 200, [], "double");
F.text(1160, 34, ["Secondary environment,", "Purchaser's disaster recovery data center"], { size: 15.5 });
F.box(962, 76, 210, 54, ["Host (x1): standby", "services, database copy"], "grey", { size: 15 });
F.box(1182, 76, 176, 54, ["Hardware security", "module, replicated"], "grey", { size: 15 });
F.box(962, 142, 210, 54, ["Backup repository and", "immutable storage"], "grey", { size: 15 });
F.box(1182, 142, 176, 54, ["Firewall and", "core switch"], "grey", { size: 15 });
F.line([[780, 65], [940, 65]]);
F.label(860, 88, ["Replication and", "backup copies,", "encrypted"]);
F.box(360, 130, 240, 62, ["Perimeter firewall", "(NRB and e-Government)"], "double", { size: 16 });
F.line([[480, 90], [480, 130]]);

// Facility
F.raw(`<rect x="15" y="225" width="1370" height="1150" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(35, 250, ["CARD PRODUCTION FACILITY"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });
F.line([[480, 192], [480, 560]]);

// Zones above the firewall
Z(40, 270, 260, 250, ["EXTERNAL", "INTEGRATION ZONE"], 60);
F.box(60, 375, 220, 66, ["Integration", "gateway (x1)"]);
Z(320, 270, 130, 250, ["DMZ"], 100);
F.text(385, 395, ["Provisioned,", "no service", "at go-live"], { size: 16, italic: true });
Z(510, 270, 280, 250, ["USER NETWORK"], 20);
F.box(540, 330, 220, 86, ["Operator and", "administrative", "workstations (x10)"], "grey");
F.line([[650, 416], [650, 440]]);
F.box(540, 440, 220, 56, ["Edge switch", "stack (x3)"], "grey", { size: 16 });
Z(810, 270, 550, 250, ["MANAGEMENT AND MONITORING ZONE"], 90);
F.box(830, 335, 270, 62, ["Management and administrative", "access host (x1)"]);
F.box(1120, 335, 220, 62, ["Domain", "controllers (x2)"]);
F.box(830, 415, 270, 62, ["Security monitoring (x1)"]);

F.line([[170, 520], [170, 560]]);
F.label(182, 541, ["NRIS exchange, mutual TLS"], "start");
F.line([[420, 520], [420, 560]]);
F.line([[650, 520], [650, 560]]);
F.line([[1085, 520], [1085, 560]]);

// Firewall pair
F.box(40, 560, 1320, 60, ["Next generation firewall pair: zone policy, intrusion detection and prevention"], "grey", { size: 18 });

// Production zones below the firewall
Z(40, 670, 520, 325, ["APPLICATION ZONE"], 40);
F.box(60, 730, 230, 62, ["Application server (x2),", "load balanced"]);
F.box(310, 730, 230, 62, ["Signing Service (x1)"]);
F.box(60, 815, 230, 160, [], "dashed");
F.box(75, 830, 200, 76, ["Development (x1),", "training and user", "acceptance testing (x1)"], "solid", { size: 14.5 });
F.text(175, 935, ["Non-production segment,", "masked data only"], { size: 14, italic: true });
F.box(310, 815, 230, 160, [], "dashed");
F.line([[425, 792], [425, 837]]);
F.box(335, 837, 180, 62, ["Hardware security", "module (x1)"], "grey", { size: 16 });
F.text(425, 935, ["Segment reached by the", "Signing Service only"], { size: 14, italic: true });

Z(590, 670, 200, 325, ["DATABASE ZONE"], 50);
F.box(605, 795, 170, 70, ["Database (x2),", "clustered"]);

Z(820, 670, 540, 325, ["MACHINE CONTROL ZONE"], 30);
F.box(960, 735, 260, 62, ["Printer control (x1),", "both lines"]);
F.line([[1090, 797], [1090, 807]]);
F.line([[966, 807], [1230, 807]]);
F.line([[966, 807], [966, 825]]);
F.line([[1230, 807], [1230, 825]]);
F.box(846, 825, 240, 50, ["Access switch 1"], "grey", { size: 15.5 });
F.box(1110, 825, 240, 50, ["Access switch 2"], "grey", { size: 15.5 });
F.line([[966, 875], [966, 892]]);
F.line([[900, 892], [1032, 892]]);
F.line([[1230, 875], [1230, 892]]);
F.line([[1164, 892], [1296, 892]]);
[[840, "Personalization", "line 1"], [972, "Mailing", "line 1"], [1104, "Personalization", "line 2"], [1236, "Mailing", "line 2"]]
  .forEach(([x, a, b]) => { F.box(x, 910, 120, 60, [a, b], "grey", { size: 15.5 }); F.line([[x + 60, 892], [x + 60, 910]]); });

F.line([[300, 620], [300, 670]]);
F.line([[690, 620], [690, 670]]);
F.line([[1090, 620], [1090, 670]]);
F.label(1102, 638, ["Batches to printer control;", "job data to the mailing lines"], "start", { size: 14 });

// Infrastructure zones below the firewall
F.line([[575, 620], [575, 1025]]);
F.line([[805, 620], [805, 1025]]);
Z(40, 1025, 640, 135, ["BACKUP ZONE"], 80);
F.box(60, 1082, 190, 60, ["Backup server (x1)"]);
F.box(270, 1082, 190, 60, ["Backup repository,", "encrypted"], "grey", { size: 16 });
F.box(480, 1082, 180, 60, ["Immutable backup", "storage, 40 TB"], "grey", { size: 16 });
Z(700, 1025, 660, 135, ["MANAGEMENT NETWORK"], 10);
F.text(1030, 1092, ["Out-of-band management interfaces of the hosts, storage array,",
  "switches, firewalls, hardware security module and backup storage"], { size: 15 });
F.text(1030, 1136, ["Reached from the administrative access host"], { size: 14.5, italic: true });

// Platform
F.box(40, 1190, 1320, 160, [], "solid");
F.text(56, 1212, ["PLATFORM"], { size: 15, anchor: "start", weight: 700, spacing: 0.8 });
F.box(65, 1250, 240, 70, ["Virtualization hosts (x4),", "two clusters"], "grey", { size: 15.5 });
F.box(385, 1250, 200, 70, ["Core switch pair,", "layer 3"], "grey", { size: 15.5 });
F.line([[305, 1285], [385, 1285]], { width: 4.5 });
F.zone(665, 1215, 675, 120, ["STORAGE ZONE"]);
F.text(679, 1255.75, ["VLAN 70, not routed"], { size: 15, anchor: "start" });
F.box(905, 1250, 415, 70, ["Storage array: dual controllers,", "not less than 20 TB usable after RAID"], "grey", { size: 15.5 });
F.line([[585, 1285], [905, 1285]], { width: 4.5 });
F.label(785, 1307, ["Redundant paths"]);

// Legend
F.box(15, 1400, 900, 150, [], "solid");
F.text(33, 1423, ["Legend"], { size: 16, anchor: "start", weight: 700 });
[[33, 1441, "solid", "Virtual machine, supplied under this contract"],
 [480, 1441, "grey", "Hardware, supplied under this contract"],
 [33, 1478, "double", "Provided by the Purchaser"],
 [480, 1478, "zone", "Network zone, one VLAN each"],
 [33, 1515, "dashed", "Segment within a zone"]]
  .forEach(([x, y, st, t]) => { F.box(x, y, 62, 28, [], st); F.text(x + 76, y + 14, [t], { size: 16, anchor: "start" }); });

F.write("fig91");
