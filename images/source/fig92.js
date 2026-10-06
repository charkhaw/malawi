// Figure 9.2, High availability and the secondary environment.
// 1 October 2026: application and database clusters of two hosts each; the secondary site has a
// storage array and a domain controller.
const F = require("./figlib.js")(1400, 660, 17);

// Primary
F.raw(`<rect x="20" y="20" width="800" height="620" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(38, 46, ["CARD PRODUCTION FACILITY, PRIMARY"], { size: 15, anchor: "start", weight: 700, spacing: 1 });
const HW = 178;
[[40, "Application host 1", true], [233, "Application host 2", true], [428, "Database host 1", false], [622, "Database host 2", false]]
  .forEach(([x, title, app], i) => {
    F.box(x, 70, HW, 230, [], "light");
    F.text(x + HW / 2, 94, [title], { weight: 700, size: 15 });
    if (app) {
      F.box(x + 12, 112, HW - 24, 58, ["Production", "service instances"], "solid", { size: 15 });
      F.box(x + 12, 182, HW - 24, 96, ["Development,", "testing and", "training"], "solid", { size: 15 });
    } else {
      F.box(x + 12, 150, HW - 24, 70, ["Database", "node " + (i - 1)], "solid", { size: 15.5 });
    }
    F.line([[x + HW / 2, 300], [x + HW / 2, 320]]);
  });
F.box(40, 320, 760, 50, ["Storage array: dual controllers, redundant paths to all four hosts, not less than 20 TB usable"], "grey", { size: 15.5 });
F.box(40, 390, 760, 96, [], "solid");
F.text(420, 411, [
  "Loss of an application host: its virtual machines restart on the other application host from",
  "the same disk images on the storage array, and development, testing and training stop first.",
  "Loss of a database host: the database node on the other database host takes over.",
  "Failover starts automatically within 60 seconds.",
], { size: 15 });
F.box(40, 510, 360, 110, ["Personalization and", "mailing lines", "at this site only"], "grey", { size: 16 });
F.box(440, 510, 360, 110, ["Immutable backup storage", "not less than 40 TB usable"], "grey", { size: 16 });

// Secondary
F.box(1000, 20, 380, 620, [], "double");
F.text(1190, 50, ["PURCHASER'S DISASTER", "RECOVERY DATA CENTER"], { size: 15, weight: 700, spacing: 1 });
F.box(1025, 92, 330, 228, [], "light");
F.text(1190, 114, ["Virtualization host (x1)"], { weight: 700, size: 16 });
F.box(1045, 128, 290, 72, ["Standby copies of the service", "virtual machines, switched", "off until a failover"], "solid", { size: 15 });
F.box(1045, 210, 290, 48, ["Database, secondary copy, running"], "solid", { size: 15 });
F.box(1045, 266, 290, 42, ["Domain controller, running"], "solid", { size: 15 });
F.line([[1190, 320], [1190, 334]]);
F.box(1025, 334, 330, 56, ["Storage array,", "not less than 20 TB usable"], "grey", { size: 15.5 });
F.box(1025, 404, 330, 60, ["Immutable backup storage", "offsite copies"], "grey", { size: 16 });
F.box(1025, 478, 330, 46, ["Firewall and switch"], "grey", { size: 16 });
F.text(1190, 588, ["No personalization or mailing", "equipment at this site"], { size: 15, italic: true });

// Replication over the Government Wide Area Network
F.line([[820, 164], [1045, 164]], { end: true });
F.label(910, 134, ["Virtual machine", "replication"], "middle", { size: 14.5 });
F.line([[820, 234], [1045, 234]], { end: true });
F.label(910, 198, ["Database replication,", "lag 5 minutes or less"], "middle", { size: 14.5 });
F.line([[800, 565], [910, 565], [910, 434], [1025, 434]], { end: true });
F.label(920, 505, ["Backup", "replication"], "start", { size: 14.5 });
F.label(910, 300, ["over the Government", "Wide Area Network"], "middle", { size: 14, italic: true });

F.write("fig92");
