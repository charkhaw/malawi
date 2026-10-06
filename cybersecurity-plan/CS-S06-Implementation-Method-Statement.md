# 6. Implementation Method Statement

## 6.1 Security activities by phase

Security runs through every phase of the Implementation Sub-Plan in Preliminary Project Plan Section
2.1, and the milestones below carry a security condition.

| Phase and weeks | Security activities | Security condition |
|---|---|---|
| Mobilization and planning, weeks 1 to 2 | Security Working Group formed; personnel screened and inducted; risk register baselined; escalation matrix issued | |
| Design and detailed planning, weeks 3 to 6 | Threat modeling of the design; Privacy Impact Assessment; Security Design Documentation, including the access control matrix, key management procedures and hardening guide; policies drafted; certificate profile agreed with e-Government | Detailed Design Approval: no High risk without an approved treatment |
| Procurement and manufacturing, weeks 7 to 16 | Secure development with static and dynamic testing; equipment control PCs hardened with the manufacturer; ICT ordered through authorized channels; synthetic data only | |
| Factory acceptance testing, week 17 | Equipment hardening verified; integrity baseline of the control software recorded | Successful FAT: baseline recorded |
| Installation and site acceptance testing, weeks 21 to 26, with the ICT from week 15 | Equipment inspected on delivery; firewalls, directory, multi-factor authentication, privileged access management and monitoring built before the hosts they protect; key ceremony witnessed by NRB in week 16; secondary environment to the same baselines; security testing and penetration testing; integration with NRB's Security Operations Center | Installation and SAT: no Critical or High finding open; no citizen data before this point |
| Training and knowledge transfer, weeks 25 to 28 | Security training; incident response exercise | Training completed |
| Commissioning, weeks 27 to 30 | Operational acceptance tests 9 to 12; NRB runs the Security Operations Center under observation | System commissioned |
| Handover and go-live, weeks 31 to 32 | Security Operations Center transferred; credentials rotated; residual risks accepted by NRB | Full handover |

## 6.2 Security testing

| Test and weeks | Exit criterion |
|---|---|
| Static and dynamic testing of software written under the Contract, weeks 7 to 16 | No unresolved high severity finding in a promoted release |
| Pre-commissioning test 5, cybersecurity and access control, week 19 | Security Readiness Report |
| Pre-commissioning test 13, backup and recovery, including failover, week 20 | Backup and Recovery Test Report |
| Security testing, weeks 20 and 21: vulnerability assessment, authentication, encryption validation, configuration against the hardened baselines, and simulation of the activity each detection rule for a High or Critical risk must catch | Findings rated and entered for remediation; each tested rule raised its alert |
| Independent penetration testing of the full deployed configuration, including the Machine Control Zone, week 24 | Report delivered unedited to the Purchaser |
| Remediation and retest, weeks 25 and 26 | No Critical or High finding open |
| Operational acceptance tests 9 to 12, week 27 | Success criteria of Table B |

The penetration tester is independent of Inkript, and its scope and rules of engagement are approved
by NRB before testing begins.

## 6.3 Handover and operation

**At handover.** Every privileged credential known to the Supplier is rotated, break-glass
credentials are re-sealed for NRB custodians, the module administrator credentials are re-issued to
the custodians NRB designates, and Supplier access is reduced to named support accounts usable only
with NRB's approval. As-built security documentation, the policies and procedures, and the risk
register with each residual risk accepted are handed over with the Security Operations Center.

**In operation.** NRB operates the Security Operations Center, and the Supplier provides the following
within its warranty and support obligations:

- **Monthly.** Patch cycle; vulnerability scan; Security Working Group; cyber security compliance status report.
- **Quarterly.** Vulnerability assessment report; privileged access recertification; risk register review.
- **Annually.** Independent penetration test; disaster recovery test; incident response exercise; policy review.

Critical vulnerabilities are mitigated within 72 hours and remediated within 14 days, and High within
30 days. On the equipment control systems, where releases follow the manufacturer's schedule, a
compensating control is applied within 7 days of a Critical advisory.

**Compliance reporting.** The report required by SCC 19.6(d), on the status of compliance with cyber
security risk management and on foreseeable risks and their mitigation, is issued monthly from week 4.
It covers control implementation, open vulnerabilities by severity and age, patching, incidents and
notifications, changes to the risk register, and certificates nearing expiry.
