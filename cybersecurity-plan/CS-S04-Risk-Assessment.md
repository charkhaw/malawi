# 4. Risk Assessment

## 4.1 Method

Risk is managed to ISO/IEC 27005:2022.

- **Identification.** Asset-based, for the signing key, citizen data, card stock, production integrity, the audit trail and availability; and event-based, for what an attacker would set out to achieve, such as a card produced for a person not entitled to one.
- **Analysis.** Likelihood and impact rated on the scales in Section 4.2, before and after treatment.
- **Treatment.** Each risk modified, avoided, shared or retained, with its controls in Section 5.2, recorded in the template in Section 5.3.
- **Acceptance.** Residual risk accepted by the authority set in Section 4.2.
- **Monitoring and review.** By the Security Working Group, at each gate in weeks 6, 17, 26 and 30, at handover, and quarterly in operation.

The register in Section 4.3 is the baseline adopted at mobilization, and it is refined by threat
modeling during design.

## 4.2 Risk criteria and assessment matrix

| Likelihood | Impact |
|---|---|
| 1 Rare: not expected over the life of the System | 1 Negligible: no data exposed, no production effect |
| 2 Unlikely: needs a combination of failures or a capable attacker | 2 Minor: error caught before dispatch; up to one shift lost |
| 3 Possible: has occurred in comparable systems | 3 Moderate: limited data exposure or incorrect cards recalled; up to one day lost |
| 4 Likely: expected to be attempted during the life of the System | 4 Major: data of many citizens exposed, blank stock lost, or several days lost |
| 5 Almost certain: expected to occur repeatedly | 5 Severe: a genuine card for a person not entitled to it, compromise of the signing key, or bulk exfiltration of biometric data |

The rating is likelihood multiplied by impact.

| Impact \ Likelihood | 1 Rare | 2 Unlikely | 3 Possible | 4 Likely | 5 Almost certain |
|---|---|---|---|---|---|
| **5 Severe** | 5 Medium | 10 High | 15 High | 20 Critical | 25 Critical |
| **4 Major** | 4 Low | 8 Medium | 12 High | 16 High | 20 Critical |
| **3 Moderate** | 3 Low | 6 Medium | 9 Medium | 12 High | 15 High |
| **2 Minor** | 2 Low | 4 Low | 6 Medium | 8 Medium | 10 High |
| **1 Negligible** | 1 Low | 2 Low | 3 Low | 4 Low | 5 Medium |

| Band and rating | Treatment | Residual risk accepted by |
|---|---|---|
| Critical, 20 to 25 | The activity does not proceed until the risk is reduced | Not accepted |
| High, 10 to 16 | Treated before the gate at which it is reviewed | Purchaser's Project Manager, time-bound with a treatment plan |
| Medium, 5 to 9 | Treated where cost-effective, then monitored | NRB security officer |
| Low, 1 to 4 | Monitored through routine controls | Risk owner |

## 4.3 Risk identification register

Ratings are likelihood × impact. Each risk is owned by the Supplier during implementation and by the
NRB role shown from handover. Its controls are set out in Section 5.2.

| Risk | Inherent | Residual | Owner from handover |
|---|---|---|---|
| **C01** The Document Signer key is used outside an authorized production job, or extracted | 3 × 5 = 15, High | 1 × 5 = 5, Medium | NRB security officer |
| **C02** A card is produced for a person not entitled to it, by an insider acting alone or in collusion | 3 × 5 = 15, High | 1 × 5 = 5, Medium | NRB operations manager |
| **C03** Blank, rejected or personalized cards are stolen or diverted | 3 × 4 = 12, High | 1 × 4 = 4, Low | NRB operations manager |
| **C04** Citizen demographic or biometric data is exfiltrated | 3 × 5 = 15, High | 2 × 4 = 8, Medium | NRB security officer |
| **C05** Ransomware encrypts or destroys the production estate | 4 × 5 = 20, Critical | 2 × 3 = 6, Medium | NRB ICT manager |
| **C06** Administrator credentials are stolen through phishing or reuse | 4 × 5 = 20, Critical | 2 × 4 = 8, Medium | NRB security officer |
| **C07** Forged requests or altered data on the NRIS interface | 2 × 5 = 10, High | 1 × 5 = 5, Medium | NRB security officer |
| **C08** The personalization or mailing control systems are compromised, or left vulnerable by the manufacturer's patch schedule | 3 × 4 = 12, High | 2 × 3 = 6, Medium | NRB ICT manager |
| **C09** Tampered or counterfeit hardware or software is delivered | 2 × 5 = 10, High | 1 × 4 = 4, Low | NRB ICT manager |
| **C10** A vulnerability in software written under the Contract is exploited | 3 × 4 = 12, High | 2 × 3 = 6, Medium | NRB ICT manager |
| **C11** Audit records are altered to conceal unauthorized activity | 3 × 4 = 12, High | 1 × 4 = 4, Low | NRB security officer |
| **C12** Remote support is abused, or citizen data leaves Malawi through support or factory work | 3 × 4 = 12, High | 1 × 4 = 4, Low | NRB security officer |
| **C13** The primary site or its storage is lost | 2 × 5 = 10, High | 2 × 3 = 6, Medium | NRB ICT manager |
| **C14** The Document Signer certificate lapses, or its algorithm weakens within the ten year card life | 3 × 4 = 12, High | 1 × 4 = 4, Low | NRB security officer |
| **C15** Security alerts are missed, or NRB cannot operate the controls after handover | 3 × 4 = 12, High | 2 × 3 = 6, Medium | NRB security officer |

## 4.4 Risk position before and after treatment

**Inherent.**

| Impact \ Likelihood | 1 Rare | 2 Unlikely | 3 Possible | 4 Likely | 5 Almost certain |
|---|---|---|---|---|---|
| **5 Severe** | | C07, C09, C13 | C01, C02, C04 | C05, C06 | |
| **4 Major** | | | C03, C08, C10, C11, C12, C14, C15 | | |
| **3 Moderate** | | | | | |

**Residual.**

| Impact \ Likelihood | 1 Rare | 2 Unlikely | 3 Possible | 4 Likely | 5 Almost certain |
|---|---|---|---|---|---|
| **5 Severe** | C01, C02, C07 | | | | |
| **4 Major** | C03, C09, C11, C12, C14 | C04, C06 | | | |
| **3 Moderate** | | C05, C08, C10, C13, C15 | | | |

Treatment moves all 15 risks out of the High and Critical bands: 2 Critical and 13 High before
treatment become 10 Medium and 5 Low after it. The three risks that remain at impact 5, C01, C02 and
C07, cannot be made less severe, only less likely and quicker to detect. Each has a dedicated detection
rule and is reviewed at every Security Working Group.
