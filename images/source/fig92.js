// Figure 9.2, High availability and the secondary environment.
// 1 October 2026: application and database clusters of two hosts each; the secondary site has a
// storage array and a domain controller.
// 7 October 2026: hosts of two 24-core processors and 256 GB; one hardware security module at each
// site; an encrypted backup repository beside the immutable backup storage at each site; the
// secondary site runs one host on internal storage, without a storage array.
// 12 October 2026: 384 GB on every host; one database virtual machine that fails over between the
// database hosts; a load balancer pair at the primary site and one at the secondary site; a Veeam
// server running at the secondary site.
const F = require("./figlib.js")(1400, 660, 17);

// Primary
F.raw(`<rect x="20" y="20" width="800" height="620" fill="none" stroke="#000" stroke-width="1.3"/>`);
F.text(38, 46, ["CARD PRODUCTION FACILITY, PRIMARY"], { size: 15, anchor: "start", weight: 700, spacing: 1 });
const HW = 178;
[[40, "Application host 1", true], [233, "Application host 2", true], [428, "Database host 1", false], [622, "Database host 2", false]]
  .forEach(([x, title, app], i) => {
    F.box(x, 70, HW, 230, [], "light");
    F.text(x + HW / 2, 90, [title], { weight: 700, size: 15 });
    F.text(x + HW / 2, 111, ["2 x 24 cores, 384 GB"], { size: 13.5 });
    if (app) {
      F.box(x + 12, 126, HW - 24, 52, ["Production", "service instances"], "solid", { size: 15 });
      F.box(x + 12, 188, HW - 24, 92, ["Development,", "testing and", "training"], "solid", { size: 15 });
    } else {
      if (i === 2) F.box(x + 12, 160, HW - 24, 70, ["Database", "virtual machine"], "solid", { size: 15.5 });
      else F.box(x + 12, 160, HW - 24, 70, ["Failover host", "for the database"], "dashed", { size: 15 });
    }
    F.line([[x + HW / 2, 300], [x + HW / 2, 320]]);
  });
F.box(40, 320, 760, 50, ["Storage array: dual controllers, redundant paths, not less than 20 TB usable after RAID"], "grey", { size: 15.5 });
F.box(40, 390, 760, 96, [], "solid");
F.text(420, 411, [
  "Loss of an application host: its virtual machines restart on the other application host from",
  "the same disk images on the storage array, and development, testing and training stop first.",
  "Loss of a database host: the database virtual machine restarts on the other database host.",
  "Failover starts automatically within 60 seconds.",
], { size: 15 });
F.box(40, 510, 360, 48, ["Personalization and mailing", "lines, at this site only"], "grey", { size: 14.5 });
F.box(40, 570, 360, 50, ["Load balancer pair,", "high availability, 10 Gbps"], "grey", { size: 14.5 });
F.box(440, 510, 360, 48, ["Hardware security module"], "grey", { size: 15.5 });
F.box(440, 570, 360, 50, ["Backup repository and immutable", "backup storage, 40 TB usable"], "grey", { size: 14.5 });

// Secondary
F.box(1000, 20, 380, 620, [], "double");
F.text(1190, 50, ["PURCHASER'S DISASTER", "RECOVERY DATA CENTER"], { size: 15, weight: 700, spacing: 1 });
F.box(1025, 92, 330, 298, [], "light");
F.text(1190, 112, ["Virtualization host (x1)"], { weight: 700, size: 16 });
F.text(1190, 134, ["2 x 24 cores, 384 GB, internal storage", "not less than 20 TB usable after RAID"], { size: 13.5 });
F.box(1045, 166, 290, 68, ["Standby copies of the service", "virtual machines, switched", "off until a failover"], "solid", { size: 14.5 });
F.box(1045, 242, 290, 40, ["Database, secondary copy, running"], "solid", { size: 14.5 });
F.box(1045, 290, 290, 40, ["Domain controller, running"], "solid", { size: 14.5 });
F.box(1045, 338, 290, 40, ["Veeam server, running"], "solid", { size: 14.5 });
F.box(1025, 404, 330, 52, ["Hardware security module,", "replicated from the primary site"], "grey", { size: 14.5 });
F.box(1025, 468, 330, 60, ["Backup repository and immutable", "backup storage, offsite copies"], "grey", { size: 14.5 });
F.box(1025, 540, 330, 50, ["Firewall, core switch and", "load balancer"], "grey", { size: 14.5 });
F.text(1190, 614, ["No personalization or mailing equipment"], { size: 14, italic: true });

// Replication over the Government Wide Area Network
F.line([[820, 200], [1045, 200]], { end: true });
F.label(910, 172, ["Virtual machine", "replication"], "middle", { size: 14.5 });
F.line([[820, 262], [1045, 262]], { end: true });
F.label(910, 230, ["Database replication,", "lag 5 minutes or less"], "middle", { size: 14.5 });
F.line([[800, 534], [950, 534], [950, 430], [1025, 430]], { end: true });
F.label(942, 470, ["Key replication"], "end", { size: 14 });
F.line([[800, 595], [980, 595], [980, 498], [1025, 498]], { end: true });
F.label(905, 613, ["Backup replication"], "middle", { size: 14 });
F.label(910, 316, ["encrypted, over the", "Government Wide", "Area Network"], "middle", { size: 14, italic: true });

F.write("fig92");
