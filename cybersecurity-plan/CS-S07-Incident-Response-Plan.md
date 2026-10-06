# 7. Incident Response Plan

## 7.1 Team and escalation matrix

The plan is aligned with NIST Special Publication 800-61 Revision 3 and uses the incident classes S1
to S4 defined in System Architecture Section 10.7.

| Role | During implementation | From handover |
|---|---|---|
| Incident manager | Supplier security lead | NRB security officer |
| Technical lead | Supplier security lead | Supplier security lead, at Level 2 and above |
| Security Operations Center analysts | Supplier on-call security engineer | NRB security engineers |
| Notified and informed | Purchaser's Project Manager and NRB security officer | Purchaser's Project Manager |
| Consulted | NRB data protection officer; e-Government for certificates; the equipment manufacturer for the production lines | The same |

| Class and acknowledgement | Escalated to | Purchaser notified |
|---|---|---|
| S1, critical: acknowledged within 15 minutes | Immediately to the incident manager, technical lead, NRB security officer and the Purchaser's Project Manager | Immediately, and in writing within 24 hours |
| S2, major: acknowledged within 15 minutes | Immediately to the incident manager, technical lead and NRB security officer | Immediately, and in writing within 24 hours |
| S3, moderate: acknowledged within 1 hour | Incident manager and technical lead | In writing within 24 hours |
| S4, minor: acknowledged next business day | Recorded | In the monthly report |

Names, telephone numbers and email addresses are added at mobilization, verified quarterly and
re-issued at handover. S1 and S2 alerts reach on-call staff by SMS as well as on the console.

## 7.2 Response process

| Stage | What is done |
|---|---|
| Detect and classify | Alert triaged and classified S1 to S4 |
| Notify | Incident declared and escalated by the matrix; the Purchaser notified |
| Contain | Affected component isolated, accounts disabled, signing or production suspended where required |
| Preserve | Logs, memory and disk images captured before anything is rebuilt, under System Architecture Section 10.7 |
| Investigate | Scope and root cause established, and the cards and citizens affected identified from the audit trail |
| Eradicate and recover | Hosts rebuilt from the hardened baselines, credentials rotated, service restored under Section 8. After an S1 incident, production resumes only on NRB's written decision |
| Close | Final report and lessons learned entered in the risk register |

## 7.3 Contractual incident categories

Each category listed in SCC 19.7 has a playbook. Their first actions are:

| SCC 19.7 category | Class | First actions |
|---|---|---|
| (a) Personal data breach | S1 if exfiltration is confirmed, otherwise S2 | Block the outbound path; disable the accounts involved; isolate the host; identify the records affected |
| (b) Biometric data breach | S1 | As for (a); identify the batches present at the time, which bounds the citizens affected |
| (c) Cryptographic key compromise | S1 | Suspend signing; withdraw the Signing Service's module credentials; ask e-Government to revoke the certificate; list the cards signed in the affected period |
| (d) Unauthorized card production or issuance | S1 | Stop the job; quarantine the cards; secure the camera record; suspend the accounts involved |
| (e) Ransomware and malware | S1, or S2 for a single contained host | Isolate the segment; disable compromised accounts; preserve evidence; recover from immutable backups |
| (f) Unauthorized privileged access | S2, or S1 if it reaches signing or the production lines | Terminate sessions; disable the account; rotate the credentials it could reach |
| (g) Compromise of personalization systems | S2, or S1 if cards were produced improperly | Stop the affected line while the other continues; verify against the integrity baseline |
| (h) Compromise of mailing systems | S2 | Stop the affected line; hold and re-check its mail pieces |
| (i) Fraudulent card production or issuance attempts | S2, or S1 if a card was produced | Preserve the records; restrict the accounts involved; report to NRB |
| (j) Incident likely to affect NRIS | S1 or S2 by effect | Suspend the exchange with NRIS; revoke the interface certificate if compromise is suspected; notify NRB |

## 7.4 Notification and reporting

| Report | When | Content |
|---|---|---|
| Initial notification | Immediately on detection | What has been seen, its class, and the first actions |
| Written report | Within 24 hours | What happened; systems, data and cards potentially affected; containment so far; next update |
| Final report | Within 10 business days of containment | Timeline, root cause, cards and citizens affected, actions, lessons learned |

NRB, as data controller, decides on and makes any notification required by the Data Protection Act
2024 and any report to law enforcement, supported by the Supplier's reports. The Supplier makes no
public statement. The plan is exercised in week 28 and annually, and reviewed after every S1 or S2
incident.
