# 3. Architecture and Framework Compliance

## 3.1 Cybersecurity architecture

The architecture is layered, so that no single control is the only thing standing between an attacker
and citizen data or the signing key. It is described in System Architecture Section 10, with the
network zones in System Architecture Section 9.2.

![Cybersecurity architecture](../images/Figure-10-1-Cybersecurity-Architecture.png)

*Figure 3.1: Cybersecurity architecture, arranged by the six functions of the NIST Cybersecurity
Framework 2.0. Protective controls run in depth from the network to the data and keys, with
detection, response and recovery spanning every layer. The double border is provided by the
Purchaser.*

## 3.2 Framework compliance matrix

| NIST CSF 2.0 category, with ISO/IEC 27001 Annex A | How it is met | Evidence |
|---|---|---|
| GV.OC Organizational context (A.5.31, A.5.34) | Mission, stakeholders and Malawi legal obligations set the risk criteria, Section 4.2 | Compliance statement; Privacy Impact Assessment |
| GV.RM Risk management strategy (Clause 6.1; Clause 8.2) | ISO/IEC 27005 process and acceptance authority, Section 4 | Risk register |
| GV.RR Roles and authorities (A.5.2, A.5.3) | Governance and decision rights, Section 2.1; qualified personnel, Section 9.3 | CVs and certificates |
| GV.PO Policy (A.5.1, A.5.10) | Eight security policies, Section 2.2 | Approved policies |
| GV.OV Oversight (A.5.35, A.5.36) | Security Working Group and monthly compliance report, Section 6.3 | Monthly reports |
| GV.SC Supply chain (A.5.19 to A.5.22) | Obligations flowed down under GCC 44.1; inspection on delivery; factory integrity baseline, Section 6.1 | Delivery and factory records |
| ID.AM Asset management (A.5.9, A.5.12) | Hardware, software, certificate and key inventories; serialized blank stock; data classification, System Architecture Sections 6.10 and 10.2 | Asset register |
| ID.RA Risk assessment (A.5.7, A.8.8) | Risk register; threat modeling at design; vulnerability scanning, Sections 4 and 6.1 | Register; scan reports |
| ID.IM Improvement (A.5.27; Clause 10) | Findings of tests, exercises and incidents fed back into the register and procedures | Post-incident reports |
| PR.AA Identity and access control (A.5.15 to A.5.18, A.8.2, A.8.5) | Single sign-on, multi-factor authentication, privileged and just-in-time access, recertification, System Architecture Section 10.3 | Pre-commissioning test 5; operational acceptance test 10 |
| PR.AT Awareness and training (A.6.3) | Security modules for users, administrators and managers, Section 9.4 | Training records |
| PR.DS Data security (A.8.11, A.8.13, A.8.24) | AES-256 at rest, TLS 1.2 or higher in transit, masking, minimization, encrypted immutable backups, System Architecture Section 10.2 | Encryption validation |
| PR.PS Platform security (A.8.7, A.8.9, A.8.25 to A.8.29) | Hardened CIS baselines, secure boot, patching, endpoint detection, secure development, System Architecture Sections 9.1 and 10.5 | Hardening guide; release gate records |
| PR.IR Infrastructure resilience (A.8.14, A.8.20, A.8.22) | Segregated zones, firewall pair, clustering, secondary environment, System Architecture Sections 9.2 and 9.3 | Pre-commissioning tests 4 and 13 |
| DE.CM Continuous monitoring (A.8.15, A.8.16) | Security information and event management at all hours, behavior analytics, physical events, System Architecture Section 10.7 | Operational acceptance tests 10 and 12 |
| DE.AE Adverse event analysis (A.5.25) | Detection rules derived from the risk register; classification S1 to S4, Sections 7.2 and 10 | Exercise report |
| RS.MA Incident management (A.5.24, A.5.26) | Incident Response Plan and escalation matrix, Section 7 | Approved plan |
| RS.AN Incident analysis (A.5.28) | Evidence preserved with chain of custody, System Architecture Section 10.7 | Evidence log |
| RS.CO Incident reporting (A.5.5, A.6.8) | Notification within 24 hours under SCC 19.7, Section 7.4 | Notification records |
| RS.MI Incident mitigation (A.5.26) | Containment by category, Section 7.3 | Exercise report |
| RC.RP Recovery plan execution (A.5.29, A.5.30) | Business Continuity Response Plan, Section 8 | Disaster recovery test report |
| RC.CO Recovery communication (A.5.29) | Communication during recovery, Section 8.2 | Disaster recovery test report |
