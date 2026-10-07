/*
 * The documents this toolchain builds. Both scripts take the key as their
 * argument and default to the System Architecture:
 *
 *   node sync-toc.js [sa|pp|cs|cm|trc]
 *   node build-docx.js [sa|pp|cs|cm|trc]
 *
 * pending   subsections that belong in the document but are not drafted yet.
 *           They are listed in the contents register and every build warns
 *           about them. Remove an entry once its content is written.
 * external  references written as "<name> Section 12.4" point into another
 *           document. They stay as plain text rather than becoming fields, and
 *           the build checks each one against that document's real headings.
 * linkExternal  makes each section number in those references a hyperlink
 *           that opens the other document at that heading. The link works
 *           while the Word files sit in one folder under the names below.
 */

module.exports = {
  sa: {
    dir: "technical-proposal",
    prefix: "05",
    toc: "05-TP-System-Architecture-TOC.md",
    title: "Technical Proposal - System Architecture",
    out: "Document-5-Technical-Proposal-System-Architecture.docx",
    pending: [
      { section: 3, after: "3.9", title: "3.10 Technical data and installation requirements" },
    ],
    external: {},
  },
  pp: {
    dir: "project-plan",
    prefix: "PP",
    toc: "PP-TOC.md",
    title: "Preliminary Project Plan - Information System Sub-Plans",
    out: "Preliminary-Project-Plan-Information-System-Sub-Plans.docx",
    pending: [],
    external: { "System Architecture": "sa" },
  },
  cs: {
    dir: "cybersecurity-plan",
    prefix: "CS",
    toc: "CS-TOC.md",
    title: "Cybersecurity Risk Management Plan",
    out: "Cybersecurity-Risk-Management-Plan.docx",
    pending: [],
    external: { "System Architecture": "sa", "Preliminary Project Plan": "pp" },
  },
  cm: {
    dir: "change-management-plan",
    prefix: "CM",
    toc: "CM-TOC.md",
    title: "Change Management Plan",
    out: "Change-Management-Plan.docx",
    pending: [],
    external: {
      "System Architecture": "sa",
      "Preliminary Project Plan": "pp",
      "Cybersecurity Risk Management Plan": "cs",
    },
  },
  trc: {
    dir: "compliance-checklist",
    prefix: "TRC",
    toc: "TRC-TOC.md",
    title: "Technical Responsiveness Checklist",
    out: "Technical-Responsiveness-Checklist.docx",
    pending: [],
    linkExternal: true,
    external: {
      "System Architecture": "sa",
      "Preliminary Project Plan": "pp",
      "Cybersecurity Risk Management Plan": "cs",
      "Change Management Plan": "cm",
    },
  },
};
