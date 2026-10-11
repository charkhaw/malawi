// Figure 9.1, Network zones.
// 7 October 2026: ten zones, each a VLAN; the Backup Zone and the Management Network below the
// firewall pair; the Storage Zone, not routed, on the platform; one hardware security module at
// each site; the secondary site without a storage array. The personalization and mailing lines,
// the workstations and the management interfaces connect through one stack of edge switches.
// 9 October 2026: security monitoring runs on three virtual machines.

// Bands, top to bottom: zones above the firewall, the firewall pair, production zones,
// infrastructure zones, platform, legend.
const A = 270, AH = 230;
const FW = A + AH + 40;
const C = FW + 60 + 50, CH = 325;
const D = C + CH + 30, DH = 135;
const P = D + DH + 30, PH = 225;
const FB = P + PH + 25;
const L = FB + 25;
const F = require("./figlib.js")(1400, L + 165, 17);

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
F.raw(`<rect x="15" y="225" width="1370" height="${FB - 225}" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(35, 250, ["CARD PRODUCTION FACILITY"], { size: 15, anchor: "start", weight: 700, spacing: 1.2 });
F.line([[480, 192], [480, FW]]);

// Zones above the firewall
Z(40, A, 260, AH, ["EXTERNAL", "INTEGRATION ZONE"], 60);
F.box(60, A + 105, 220, 66, ["Integration", "gateway (x1)"]);
Z(320, A, 130, AH, ["DMZ"], 100);
F.text(385, A + 125, ["Provisioned,", "no service", "at go-live"], { size: 16, italic: true });
Z(510, A, 280, AH, ["USER NETWORK"], 20);
F.box(540, A + 65, 220, 86, ["Operator and", "administrative", "workstations (x10)"], "grey");
F.text(650, A + 180, ["Connected through the", "edge switch stack"], { size: 14, italic: true });
Z(810, A, 550, AH, ["MANAGEMENT AND MONITORING ZONE"], 90);
F.box(830, A + 65, 270, 62, ["Management and administrative", "access host (x1)"]);
F.box(1120, A + 65, 220, 62, ["Domain", "controllers (x2)"]);
F.box(830, A + 145, 270, 62, ["Security monitoring (x3)"]);

F.line([[170, A + AH], [170, FW]]);
F.label(182, A + AH + 21, ["NRIS exchange, mutual TLS"], "start");
F.line([[420, A + AH], [420, FW]]);
F.line([[650, A + AH], [650, FW]]);
F.line([[1085, A + AH], [1085, FW]]);

// Firewall pair
F.box(40, FW, 1320, 60, ["Next generation firewall pair: zone policy, intrusion detection and prevention"], "grey", { size: 18 });

// Production zones below the firewall
Z(40, C, 520, CH, ["APPLICATION ZONE"], 40);
F.box(60, C + 60, 230, 62, ["Application server (x2),", "load balanced"]);
F.box(310, C + 60, 230, 62, ["Signing Service (x1)"]);
F.box(60, C + 145, 230, 160, [], "dashed");
F.box(75, C + 160, 200, 76, ["Development (x1),", "training and user", "acceptance testing (x1)"], "solid", { size: 14.5 });
F.text(175, C + 265, ["Non-production segment,", "masked data only"], { size: 14, italic: true });
F.box(310, C + 145, 230, 160, [], "dashed");
F.line([[425, C + 122], [425, C + 167]]);
F.box(335, C + 167, 180, 62, ["Hardware security", "module (x1)"], "grey", { size: 16 });
F.text(425, C + 265, ["Segment reached by the", "Signing Service only"], { size: 14, italic: true });

Z(590, C, 200, CH, ["DATABASE ZONE"], 50);
F.box(605, C + 125, 170, 70, ["Database (x2),", "clustered"]);

Z(820, C, 540, CH, ["MACHINE CONTROL ZONE"], 30);
F.box(960, C + 70, 260, 62, ["Printer control (x1),", "both lines"]);
F.line([[1090, C + 132], [1090, C + 160]]);
F.line([[900, C + 160], [1296, C + 160]]);
[[840, "Personalization", "line 1"], [972, "Mailing", "line 1"], [1104, "Personalization", "line 2"], [1236, "Mailing", "line 2"]]
  .forEach(([x, a, b]) => { F.box(x, C + 185, 120, 60, [a, b], "grey", { size: 15.5 }); F.line([[x + 60, C + 160], [x + 60, C + 185]]); });
F.text(1090, C + 280, ["Lines connected through the edge switch stack"], { size: 14, italic: true });

F.line([[300, FW + 60], [300, C]]);
F.line([[690, FW + 60], [690, C]]);
F.line([[1090, FW + 60], [1090, C]]);
F.label(1102, FW + 78, ["Batches to printer control;", "job data to the mailing lines"], "start", { size: 14 });

// Infrastructure zones below the firewall
F.line([[575, FW + 60], [575, D]]);
F.line([[805, FW + 60], [805, D]]);
Z(40, D, 640, DH, ["BACKUP ZONE"], 80);
F.box(60, D + 57, 190, 60, ["Backup server (x1)"]);
F.box(270, D + 57, 190, 60, ["Backup repository,", "encrypted"], "grey", { size: 16 });
F.box(480, D + 57, 180, 60, ["Immutable backup", "storage, 40 TB"], "grey", { size: 16 });
Z(700, D, 660, DH, ["MANAGEMENT NETWORK"], 10);
F.text(1030, D + 67, ["Out-of-band management interfaces of the hosts, storage array,",
  "switches, firewalls, hardware security module and backup storage"], { size: 15 });
F.text(1030, D + 111, ["Reached from the administrative access host"], { size: 14.5, italic: true });

// Platform
F.box(40, P, 1320, PH, [], "solid");
F.text(56, P + 22, ["PLATFORM"], { size: 15, anchor: "start", weight: 700, spacing: 0.8 });
F.box(65, P + 50, 240, 70, ["Virtualization hosts (x4),", "two clusters"], "grey", { size: 15.5 });
F.box(65, P + 140, 240, 62, ["Edge switch stack (x3)"], "grey", { size: 15.5 });
F.box(385, P + 50, 200, 152, ["Core switch pair,", "layer 3"], "grey", { size: 15.5 });
F.line([[305, P + 85], [385, P + 85]], { width: 4.5 });
F.line([[305, P + 171], [385, P + 171]]);
F.zone(665, P + 45, 675, 140, ["STORAGE ZONE"]);
F.text(679, P + 85.75, ["VLAN 70, not routed"], { size: 15, anchor: "start" });
F.box(905, P + 75, 415, 70, ["Storage array: dual controllers,", "not less than 20 TB usable after RAID"], "grey", { size: 15.5 });
F.line([[585, P + 110], [905, P + 110]], { width: 4.5 });
F.label(785, P + 132, ["Redundant paths"]);

// Legend
F.box(15, L, 900, 150, [], "solid");
F.text(33, L + 23, ["Legend"], { size: 16, anchor: "start", weight: 700 });
[[33, L + 41, "solid", "Virtual machine, supplied under this contract"],
 [480, L + 41, "grey", "Hardware, supplied under this contract"],
 [33, L + 78, "double", "Provided by the Purchaser"],
 [480, L + 78, "zone", "Network zone, one VLAN each"],
 [33, L + 115, "dashed", "Segment within a zone"]]
  .forEach(([x, y, st, t]) => { F.box(x, y, 62, 28, [], st); F.text(x + 76, y + 14, [t], { size: 16, anchor: "start" }); });

F.write("fig91");
