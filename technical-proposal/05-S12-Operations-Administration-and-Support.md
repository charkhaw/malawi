# 12. Operations, Administration and Support

## 12.1 System administration and configuration management

**Installation and configuration.** Installation procedures are standardized and repeatable for every
component, with guided installation for software components. Configuration is held centrally rather
than on each host.

| Capability | Provision |
|---|---|
| Centralized configuration management | One interface governs configuration across the estate |
| Secure baseline templates | Pre-configured hardened baselines for servers, databases, personalization machines and mailing systems |
| Version-controlled configuration | Every setting is versioned, so the configuration in force on any date can be established |
| Secure parameter management | Credentials and sensitive parameters held under protection rather than in configuration files |
| Multi-environment deployment | The same configuration is deployed across development, training, user acceptance testing and production |

**Change management.** Changes to the system pass through a defined framework rather than being
applied directly:

| Control | Effect |
|---|---|
| Role-based approval workflow | Request, approve, implement and verify are separate steps held by separate roles |
| Separation of duties | Those who develop, those who administer and those who approve are different people |
| Change logging | Every change is recorded with what changed, when, by whom and under which approval |
| Version control | Software releases, configuration files, scripts and interface definitions are all versioned |
| Rollback | Every change has a defined path back to the previous state |
| Impact analysis | The components, interfaces and environments a proposed change affects are identified from the configuration repository, and the effect is assessed before approval |
| Scheduling | Changes are scheduled into maintenance windows against the production calendar |
| Emergency changes | An expedited path exists, with mandatory post-implementation review |

**Configuration governance.** A central configuration repository holds the baselines, an audit trail
records every configuration change, compliance against baseline is enforced, and **automated drift detection**
identifies where a component's live configuration has diverged from its approved baseline, including
changes made outside the approval workflow.

## 12.2 Operational monitoring, diagnostics and troubleshooting

**Monitoring.**

| Monitored | Coverage |
|---|---|
| Production | Card personalization throughput, batch progress, printer and line status |
| Mailing | Mailing system performance, insertion and verification rates, reject rates |
| Platform | Server and database performance, storage utilization, network connectivity |
| Environment | Temperature, humidity, power and uninterruptible power supply status |
| Consumables | Blank card stock, carrier stock, envelopes and other consumables against thresholds |

Monitoring runs 24/7. Alerting is by dashboard notification, email and SMS, on configurable
thresholds with defined escalation rules.

**Diagnostics.** Built-in diagnostic tools cover every hardware component, with automated self-check
routines for the personalization equipment, log analysis, fault detection and isolation, error code
interpretation, and predictive failure analytics where the equipment exposes the necessary telemetry.

**Troubleshooting.**

| Capability | Provision |
|---|---|
| Guided workflows | Step-by-step troubleshooting procedures for common faults |
| Centralized log aggregation | Logs from every component collected and searchable in one place |
| Event correlation | Related events across components associated rather than presented separately |
| Root cause analysis | Tools to trace a symptom back to its origin |
| Remote troubleshooting | Diagnosis and correction from the system administration workstations without attending the equipment, and Supplier access from outside the Facility over the remote access arranged with NRB and e-Government, as stated in Section 13.1 |
| Simulation and test modes | Faults reproduced in a non-production environment for diagnosis |
| Automated ticket generation | Detected issues raise tickets without waiting for a person to notice |

**Performance monitoring.** Real-time and historical dashboards, throughput monitoring in cards per
hour and batch rates, bottleneck detection, service level monitoring and reporting, performance
reports produced automatically on a defined schedule, capacity utilization tracking, and trend
analysis and forecasting.

## 12.3 Backup, recovery and restoration

| Requirement | Provision |
|---|---|
| Scheduled automated backup | Databases, configuration, application systems and audit logs |
| Backup types | Full, incremental and differential |
| Encryption | All backup storage encrypted |
| Validation | Backup integrity checked rather than assumed |
| Offsite replication | Replicated to the immutable backup storage of the secondary environment, at the Purchaser's disaster recovery data center |
| Immutable storage | Backup copies that cannot be altered or deleted within their retention period |

**Backup management.** A centralized console governs scheduling and policy, retention is enforced on
daily, weekly, monthly and yearly cycles, and backup monitoring raises an alert and a
notification for every failed or missed backup job.

**Ransomware recovery.** The backup copies at both sites are immutable, so an attacker holding
administrative credentials can neither delete nor encrypt them within their retention period. The
backup management and the immutable backup storage are administered with credentials held apart
from the production directory, so that administrative rights taken in production do not reach
them. Recovery from a ransomware incident starts once the evidence has been preserved as described
in Section 10.7: hosts are rebuilt from the secure baselines described in Section 12.1, data is
restored from the most recent immutable copy verified as clean onto an isolated segment and checked
before it returns to production, critical services are restored first, and the credentials in use
at the time of the incident are replaced before service resumes.

**Restoration.**

| Capability | Provision |
|---|---|
| Guided restoration | Documented, guided procedures rather than expert improvisation |
| Granular restoration | File, database and full system level recovery |
| Point-in-time recovery | Recovery to a chosen moment, not only to the last full backup |
| Prioritized recovery | Critical services restored first against a defined order |
| Verification | Recovery validated against defined checks before service resumes |

Restoration procedures are tested, not only written. Disaster recovery drills are performed at least
annually under Section 9.3, and they include verification of data integrity after recovery.

## 12.4 Support model, service levels and performance indicators

**Warranty.** Three years of warranty defect repair from Final Acceptance, covering all equipment,
systems, components, software and services supplied, installed, configured or commissioned. The
service includes diagnosis, repair, replacement, reconfiguration and restoration of defective items.

**Post-warranty.** Three years of post-warranty maintenance services, renewable, on the same response
and resolution standards. The modes of service, preventive maintenance and service reporting are set
out in the Warranty Defect Repair and Technical Support Service Sub-Plan of the Preliminary Project
Plan.

**Support desk.** User support and hotline, 24 hours a day, seven days a week. Response time is
counted from the moment an incident is logged through the service desk, hotline, email or other
agreed channel.

**Service levels.**

| Severity | Definition | Response | On-site attendance | Target resolution |
|---|---|---|---|---|
| 1, Critical | Complete production stoppage, critical equipment or system unavailable, national ID production halted, or a major safety or security issue | 30 minutes, 24x7 | 2 hours | 4 hours temporary restoration, 8 hours permanent resolution where technically possible |
| 2, High | Major degradation affecting production capacity, quality or a critical subsystem, with production continuing in a limited manner | 1 hour, 24x7 | 4 hours | 8 hours restoration |
| 3, Medium | Non-critical fault with limited operational impact, workaround available | 4 business hours | 1 business day | 2 business days |
| 4, Low | Minor defect, cosmetic issue, information request or configuration assistance with negligible production impact | 1 business day | As required | 5 business days |

For Severity 1 and Severity 2 incidents, effort continues without interruption until service is
restored. Where a permanent repair cannot be completed within the resolution period, a temporary
replacement, workaround or alternative capable of restoring the affected production function is
provided.

**Support structure.**

| Level | Responsibility | Personnel | Typical issues |
|---|---|---|---|
| L1, first line | Initial logging, diagnosis and basic resolution | Facility operators, helpdesk, resident support staff | User issues, basic equipment faults, alarms, configuration checks, restart and recovery procedures |
| L2, technical | Detailed diagnosis, repair, replacement and restoration | Resident engineers and Supplier technical engineers | Hardware failures, electrical and electronic faults, software and configuration issues, production equipment faults |
| L3, specialist | Advanced diagnosis and specialist intervention | Equipment manufacturer product-line specialists and senior engineers | Complex equipment failures, recurring faults, firmware and software defects, controller issues, major integration problems |
| L4, engineering | Root cause resolution and product engineering | Manufacturer engineering and product development | Design defects, systemic failures, unresolved L3 issues, defects requiring engineering change |

From Operational Acceptance, NRB operates the System and provides first-line support, and the
Supplier provides Level 2 support and above.

**Escalation.**

| Severity | L1 to L2 | L2 to L3 | L3 to L4 |
|---|---|---|---|
| 1, Critical | Immediate, within 30 minutes | 30 to 60 minutes | 2 hours |
| 2, High | 1 hour | 2 hours | 4 hours |
| 3, Medium | 4 business hours | 1 business day | As required |
| 4, Low | 1 business day | As required | As required |

**Key performance indicators.**

| Indicator | Target |
|---|---|
| Overall Equipment Effectiveness | 85 percent, with a minimum acceptable monthly figure of 80 percent |
| Mean Time To Repair, Critical | 4 hours |
| Mean Time To Repair, High | 8 hours |
| Mean Time To Repair, Medium | 2 business days |
| Mean Time To Repair, Low | 5 business days |
| Mean Time Between Failures | Not less than 90 percent of the manufacturer's specified figure for each critical equipment category |
| Preventive Maintenance Compliance | 95 percent monthly, and 100 percent for safety-critical and mission-critical activities |

No recurring failure of the same component more than twice in any rolling 90 day period is accepted
without a formal root cause analysis and a corrective action plan. No scheduled preventive
maintenance activity is deferred without written approval from the Purchaser.

**Technical team.** A technical team covers post-Operational Acceptance technical assistance,
comprising the Card Production Facility Infrastructure Engineer, ID Card Security Specialist,
Facilities and Electrical Engineer, Network Engineer, and Cybersecurity and PKI Specialist, each
meeting the qualification and certification requirements set for the role.

## 12.5 Spare parts and consumables

**On-site spare parts holding.** An inventory of critical spare parts, components and maintenance
materials is maintained at the Card Production Facility throughout the contract period. The minimum
holding is:

| Requirement | Provision |
|---|---|
| Single points of failure | At least one replacement unit or module for every critical component identified as a potential single point of failure |
| Wear and maintenance parts | Not less than three months of forecast consumption of commonly used maintenance and wear parts |

**Critical Spare Parts List.** A list is submitted for the Purchaser's approval before commissioning,
stating for each item the minimum and maximum stock levels, the lead time, the equipment it applies
to, and the manufacturer's part number.

**Replenishment.**

| Item | Replenishment |
|---|---|
| Critical spare part consumed in maintenance | Within 72 hours |
| Any spare part used from on-site inventory | Within 5 business days, or sooner where the component is critical |
| Critical components | 48 to 72 hours |

**Consumables.** Adequate stock is maintained of lubricants, cleaning materials, filters, cleaning
kits, fuses, belts, seals, gaskets, oils and greases, calibration materials and other maintenance
consumables recommended by the equipment manufacturer.

Spare part and consumable levels are tracked by the stock control function described in
Section 6.10, with low-stock
alerting against defined thresholds, so that reordering is triggered by the system rather than
discovered by an operator at a machine.
