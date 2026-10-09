# 5. Warranty Defect Repair and Technical Support Service Sub-Plan

## 5.1 Coverage and periods

| Obligation | Period | Basis |
|---|---|---|
| Warranty defect repair | Three years from Final Acceptance | Technical Requirements 5.1.1.1, SCC GCC 29.4 |
| Spare parts supply | Three years from Operational Acceptance | SCC GCC 7.3 |
| Technical support: 24/7 hotline, Level 2 and Level 3 assistance | The warranty and post-warranty periods | Technical Requirements 5.2.1.1 and 5.2.1.2 |
| Post-warranty maintenance | Three years following the warranty period, renewable | Technical Requirements 5.2.1.3 |
| Post-Operational Acceptance technical assistance | From Operational Acceptance | Technical Requirements 5.3 |
| System availability of not less than 99 percent | The warranty and post-warranty periods | Measured as described in System Architecture Section 9.3 |

**What the warranty covers.** All equipment, systems, components, software and services supplied,
installed, configured or commissioned under the Contract. The service covers diagnosis, repair,
replacement, reconfiguration and restoration of defective items at no additional cost to the
Purchaser. Warranty of the facility systems, including power, HVAC, fire suppression and physical
security installations, is provided under the facility works.

**Modes of service.** Each class of component is serviced in the way that restores production
fastest, and repair is kept off the critical path:

| Component | Mode | Restoration and repair |
|---|---|---|
| Personalization and mailing equipment | On site | A faulty module is replaced from the on-site spares by the technical team. The faulty module is returned to the equipment manufacturer for repair and restocked |
| ICT infrastructure | On site | Services continue on the redundant components described in System Architecture Section 9.3 while the failed item is replaced from the on-site spares. The failed item is returned to its manufacturer under warranty |
| Hardware security modules | On site | If the module at the primary site fails, signing continues on the module at the secondary site, over the encrypted connection between the sites. A replacement module is enrolled from the remaining module, so no new key and no new certificate are needed |
| Application software | On call, remotely or on site | Defects are corrected and released under the change control described in System Architecture Section 12.1 |

## 5.2 Support organization and service desk

**Service delivery methodology.** Every request for support follows one path. It is logged at the
service desk with a reference, classified by severity, restored first and repaired second, escalated
through the four support levels on the times in System Architecture Section 12.4, and closed only
when its cause is recorded. A fault that recurs is taken to root cause analysis rather than repaired
again, and the position is reported to NRB each month under Section 5.6.

**Service desk.** A user support hotline operates 24 hours a day, seven days a week. Every incident,
whether reported by telephone, by email or through the service desk, is logged with a reference, a
severity and an owner, and response time is counted from the moment it is logged.

**Support levels.** Four levels, defined in System Architecture Section 12.4:

| Level | Provided by |
|---|---|
| Level 1, first line | NRB operators and helpdesk staff trained under Section 3, supported by the technical team |
| Level 2, technical | The technical team at the Card Production Facility |
| Level 3, product line | The equipment manufacturer's product line specialists and the Supplier's senior engineers |
| Level 4, engineering | The equipment manufacturer's engineering and product development |

**Technical team.** The technical team required for post-Operational Acceptance technical assistance
comprises the roles listed in System Architecture Section 12.4, each meeting the qualification and
certification requirements for its role. The on-site attendance target for a critical incident is two
hours at any hour of the day, so the team is based in Lilongwe.

**Equipment manufacturer support.** Level 3 and Level 4 support for the personalization and mailing
equipment is provided by the equipment manufacturer under a support agreement with the Supplier
covering the warranty period, so that escalation beyond the Supplier's own engineers reaches the people
who designed the equipment.

**Remote support and citizen data.** Remote access for support is made only through the arrangement
agreed with NRB and e-Government. It is used to diagnose, not to move data: citizen data is not stored
or processed outside Malawi, as set out in System Architecture Section 10.2, and any log sent to a
manufacturer for analysis has personal data removed before it leaves the facility.

**Security incidents.** An incident the service desk identifies as a security incident is handled
under the classification and 24 hour notification described in System Architecture Section 10.7
rather than as an equipment fault.

**Post-Operational Acceptance technical assistance.** Modifications to the Information System after
Operational Acceptance, such as those needed to comply with changes in legislation or regulation, are
requested through the change procedure of the Contract and delivered under change control.

## 5.3 Service levels and performance indicators

The service levels and performance indicators are set out in System Architecture Section 12.4:
four severities with their response, on-site attendance and resolution targets, the escalation times
between levels, and the targets for Overall Equipment Effectiveness, Mean Time To Repair, Mean Time
Between Failures and Preventive Maintenance Compliance. They are not repeated here, so that there is
one statement of each figure.

**Service level commitment.** We commit to those service levels and performance indicator targets
for the warranty and post-warranty periods, and to the system availability of not less than 99
percent in Section 5.1, each measured as set out below and reported monthly.

**How each measure is taken.**

| Measure | Source and method |
|---|---|
| Response, attendance and resolution | Service desk records: the time an incident was logged, responded to, attended on site, restored and resolved |
| Overall Equipment Effectiveness | Production records: availability, multiplied by performance against the contractual rate in System Architecture Section 3.5, multiplied by the proportion of accepted cards |
| Mean Time To Repair | Service desk records, by severity |
| Mean Time Between Failures | Failure records for each critical equipment category, compared with the manufacturer's specified figure |
| Preventive Maintenance Compliance | Preventive maintenance tasks completed on schedule as a proportion of those scheduled, each month |
| Availability | Monitoring records, with the exclusions set out in System Architecture Section 9.3 |

Measures are drawn from the system's own records rather than compiled by hand, so that a figure in a
service report can be traced to the events behind it.

## 5.4 Preventive and corrective maintenance

**Preventive maintenance.** A preventive maintenance calendar is agreed with NRB at Operational
Acceptance. The operating day is fourteen hours, so equipment maintenance is scheduled in the
remaining hours and does not stop production.

| Activity | Frequency | Basis |
|---|---|---|
| Servicing of the personalization and mailing equipment: optics, cooling, feeders and card transport | At the equipment manufacturer's intervals | Manufacturer's maintenance schedule |
| Laser calibration | At the manufacturer's intervals and when calibration logs show drift | System Architecture Section 3.8 |
| Backup verification and restoration testing | On the backup schedule | System Architecture Section 12.3 |
| Security patching | On a defined cycle, with critical patches applied out of cycle | System Architecture Section 10.5 |
| Vulnerability assessment | At least quarterly | Technical Requirements 1.6.9 |
| Penetration testing | Annually, by an independent third party | Technical Requirements 1.6.9 |
| Disaster recovery test | At least annually | Technical Requirements 1.4.1.6 |
| Access recertification | At the interval set in the access control policy | Technical Requirements 1.6.4 |
| Certificate expiry monitoring | Continuous, with renewal raised at the agreed lead time | System Architecture Section 13.1 |

No scheduled preventive maintenance is deferred without the Purchaser's written approval, and
compliance is reported monthly against the target in System Architecture Section 12.4.

**Corrective maintenance.** A fault is restored first and repaired second:

| Step | Action |
|---|---|
| Log | The incident is logged, classified by severity and assigned |
| Restore | Production is restored from the on-site spares or by failover, within the restoration target for its severity |
| Repair | The permanent correction is made, and a failed part is returned for repair |
| Replenish | The spare used is replaced within the replenishment time in System Architecture Section 12.5 |
| Review | A component failing more than twice in any 90 day period is subject to root cause analysis and a corrective action plan |

## 5.5 Spare parts and consumables

The on-site holding, the replenishment times and the consumables stock are set out in System
Architecture Section 12.5. The holding is delivered with the equipment and maintained at the Card
Production Facility throughout the Contract period.

**Critical Spare Parts List.** Submitted to NRB for approval in week 24, before commissioning begins
in week 27. For each item it states the minimum and maximum stock levels, the lead time, the equipment
it applies to and the manufacturer's part number. It identifies every component that is a single point
of failure, since each of those requires a replacement unit on site.

**Spare parts by category.**

| Category | Held for |
|---|---|
| Printer specific components | Laser marking units and their optics, cooling, card feeders and transport, verification cameras and reject modules, and the feeders, inserters and carrier printers of the mailing systems |
| Encoding and laminating modules | None are fitted. The cards are chipless, the QR code is laser engraved, and there is no laminating stage |
| Electronic and power spares | Industrial control PCs, power supplies, control boards and sensors of the equipment, and power supplies and drives of the ICT infrastructure |
| Infrastructure spares | A replacement for every critical infrastructure component identified as a single point of failure in the Critical Spare Parts List, and spare drives for the storage array. Components deployed in pairs, including the core switches, the firewalls, and the controllers and power supplies of the storage array, are covered by their second unit while a replacement is obtained, and the hardware security module at the primary site by the module at the secondary site. Spares for the facility systems are held under the facility works |
| Consumables and adjacent wear items | Lubricants, cleaning materials, filters, cleaning kits, fuses, belts, seals, gaskets, oils and greases, and calibration materials |

**Spares are tracked like stock.** The spares holding and the consumables are recorded in the stock
control function described in System Architecture Section 6.10, with alerts against minimum levels, so
that a spare used is visible for replenishment the moment it leaves the store.

## 5.6 Service reporting, review and handover

**Monthly service report.** Each month the Supplier reports to NRB:

| Content | Detail |
|---|---|
| Incidents | Number by severity, with response, attendance and resolution against target |
| Performance indicators | Overall Equipment Effectiveness, Mean Time To Repair, Mean Time Between Failures and Preventive Maintenance Compliance |
| Availability | Achieved availability, with any excluded periods identified |
| Preventive maintenance | Tasks scheduled, completed and deferred with approval |
| Spare parts | Spares consumed and replenished, and holdings against minimum levels |
| Problems | Recurring failures, root cause analyses and corrective actions |
| Security | Security incidents notified in the period |

The report is reviewed with NRB each month, and any measure missing its target is reviewed with the
action being taken to correct it.

**Warranty and support documentation.** Delivered at Operational Acceptance: warranty certificates,
the support escalation matrix, the service level documents, and the equipment manufacturer's support
contacts.

**Handover of operation.** From Operational Acceptance, NRB staff provide first-line support and
operate the Security Operations Center, as described in System Architecture Section 10.7. The
Supplier provides Level 2 support and above.

**From warranty to post-warranty.** At the end of the warranty period, support continues under
post-warranty maintenance for three years, renewable, on the same response and resolution standards.
