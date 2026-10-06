# 5. Mitigation and Control Strategy

## 5.1 Control strategy

| Rule | Application |
|---|---|
| Remove the risk before controlling it | No citizen data at the factory or in development, no internet-facing service at go-live, no copy of the signing key outside the modules, no standing remote access |
| Three layers for every severe risk | Each risk of impact 5 has a preventive control, a detective control that makes it visible within the shift, and a corrective control that limits the outcome |
| Engineered before administrative | A control the System enforces, such as a release that requires a second role, is preferred to one that relies on a procedure being followed |
| Every control verified | A control counts toward residual risk only once a test has shown it works, under Section 6.2 |

Against an insider with legitimate access, prevention can only go so far, because the access needed to
commit the act is the access needed to do the job. Each insider risk is therefore paired with a
reconciliation or behavior rule that finds the act within the shift.

## 5.2 Controls by risk

| Risk | Principal controls |
|---|---|
| C01 Signing key misused or extracted | Key generated inside FIPS 140 validated modules and not exportable; Signing Service the sole client of the modules, signing only for released jobs; module administration under a quorum of custodians; signatures reconciled against requests and blanks issued |
| C02 Card produced for a person not entitled | Production only from records released in NRIS; operator runs and supervisor releases; serialized reconciliation every shift; untraceable cards rejected at quality control; behavior analytics |
| C03 Cards stolen or diverted | Serialized stock; secure store under biometric access; destruction under dual custody with certificate; card-to-carrier matching |
| C04 Citizen data exfiltrated | Biometric data held only for the batch in production; AES-256 at rest; Database Zone behind the firewall; removable storage disabled; outbound traffic restricted; retrieval volumes monitored |
| C05 Ransomware | Endpoint detection and response; segmentation; hardened baselines; immutable backups under separate credentials; tested recovery |
| C06 Administrator credentials stolen | Multi-factor authentication; privileged access issued per session and recorded; administration only through the administrative access host; awareness training |
| C07 NRIS interface abused | Mutual certificate authentication; integrity check and validation of every exchange; requests accepted only if released in NRIS |
| C08 Equipment control systems compromised | Machine Control Zone on its own switches; removable media controlled; integrity baseline from factory acceptance; compensating firewall rules within seven days of an advisory |
| C09 Tampered hardware or software | Supply through authorized channels; inspection on delivery; secure boot and signed firmware; software hashes verified |
| C10 Application vulnerability | Secure development lifecycle; static and dynamic testing; release gate; independent penetration testing |
| C11 Audit records altered | Write-once audit storage; events forwarded to monitoring and to NRB's Security Operations Center; auditor role separate from administrator |
| C12 Remote support abused or data leaves Malawi | No standing remote access; each session approved by NRB and recorded; synthetic data at the factory; personal data removed from logs |
| C13 Primary site lost | Secondary environment replicating within five minutes; immutable offsite backups; annual disaster recovery test |
| C14 Certificate lapses or algorithm weakens | Expiry alerts at 180, 90 and 30 days; renewal lead time agreed with e-Government; certificate reference recorded on every card |
| C15 Alerts missed or NRB not ready | Detection rules derived from this register; S1 and S2 alerts by SMS; three security engineers trained for two posts; Security Operations Center run by NRB under observation before transfer |

## 5.3 Mitigation and control strategy template

Each risk is treated through a record in this form, created when the risk is identified and closed
only when the residual risk has been verified and accepted.

| Field | Content |
|---|---|
| Risk ID, title and owner | Register identifier; the role accountable during implementation and from handover |
| Risk scenario | Asset, threat source, what happens, and the consequence |
| Inherent rating | Likelihood, impact and band, on the scales of Section 4.2 |
| Treatment option | Modify, avoid, share or retain |
| Preventive controls | Each control, with its ISO/IEC 27001 Annex A reference and System Architecture reference |
| Detective controls | Each control, with its detection rule in security monitoring |
| Corrective controls | The incident category in Section 7.3 and the recovery scenario in Section 8.1 |
| Actions | Each implementation action, who performs it and the week it is due |
| Verification | The test or evidence that shows each control works, and its acceptance criterion |
| Residual rating | Likelihood, impact and band after verified treatment |
| Acceptance | Accepting authority, name and date |
| Review | Next review date and the events that trigger an earlier one |
