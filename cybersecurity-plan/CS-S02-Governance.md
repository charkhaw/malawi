# 2. Governance

## 2.1 Governance and decision rights

| Role or body | Responsibility |
|---|---|
| Project Steering Committee | Receives the security status monthly; decides on any High residual risk referred to it |
| Security Working Group | Supplier security lead, NRB security officer, NRB ICT manager, Solution Architect and Network Engineer. Reviews the risk register, controls, vulnerabilities, incidents and the monthly compliance report, every two weeks during implementation and monthly in operation |
| Supplier security lead | The Cybersecurity and PKI Specialist. Owns this plan, the risk register and the Incident Response Plan; incident manager until handover |
| NRB security officer | Accepts residual risk; incident manager from handover |

| Decision | Decided by |
|---|---|
| Approval of the security design and policies | Purchaser's Project Manager |
| Acceptance of a Medium residual risk | NRB security officer |
| Acceptance of a High residual risk, time-bound with a treatment plan | Purchaser's Project Manager |
| Suspension of signing or production on an S1 incident | Incident manager, at once |
| Resumption of signing or production after an S1 incident | NRB, in writing |
| Invocation of the secondary environment | NRB's business continuity manager, on the Supplier's advice |

The Supplier remains the single point of accountability under ITP 16.2(b). Its obligations under GCC 44.1
are flowed down in writing to the equipment manufacturer, the card manufacturer and the facility works
subcontractor, according to what each touches.

## 2.2 Security policies

The System enforces the following policies, as stated in System Architecture Section 10.7. They are
drafted during design, approved with it in week 6, and owned by NRB from handover.

| Policy | What it governs | Implemented through |
|---|---|---|
| Information security | Objectives, scope, roles and frameworks | This plan |
| Access control | Role-based access, separation of duties, multi-factor authentication, privileged and just-in-time access, recertification | System Architecture Sections 6.12 and 10.3 |
| Acceptable use | Use of facility systems, removable media and personal devices, handling of citizen data | System Architecture Sections 10.2 and 10.3 |
| Cryptographic key management | Algorithms, key lifecycle, custody of the hardware security modules, certificates | System Architecture Section 10.4 |
| Vulnerability management | Scanning, assessment, penetration testing, remediation by severity | System Architecture Section 10.5 |
| Patch management | Patch cycles, emergency patching, the equipment manufacturer's releases | System Architecture Section 10.5 |
| Logging and monitoring | Log sources, integrity, retention, alerting | System Architecture Sections 10.6 and 10.7 |
| Incident response | Classification, escalation and reporting | Section 7 |

Each policy is reviewed annually and after any S1 incident.
