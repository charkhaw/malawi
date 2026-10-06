# Impact of Addendum No. 3, Responses to Queries 003 and Responses to Queries 04

Internal working note. Source documents in `documents/`:

- `Draft Addendum No 3_Cleared.pdf`
- `Draft Responses to Queries_003-NRB.pdf`
- `Responses to Queries_04.pdf`

Both response documents answer questions we submitted. Queries 003 is marked **Draft**;
Queries 04 is not, and appears later. Where the two disagree, Queries 04 is treated as governing
and the disagreement is listed in section 5 below.

---

## 1. Addendum No. 3

| Clause | Change |
|---|---|
| ITP 23.1 | Submission deadline **13 October 2026, 10:00am local time** |
| ITP 26.1 | Opening **13 October 2026, 10:00am**, 2nd Floor Livingstone Towers, Blantyre |
| ITP 36.2 | **New.** All proposal prices converted to **United States Dollar** for evaluation. Source of exchange rate: **Reserve Bank of Malawi**. Rate date: **date of opening, 13 October 2026** |

Confirmed twice in the responses that this is the **final extension**. Queries 04: "no further
extensions will be provided". Queries 003: "this is the final acceptable extension".

ITP 36.2 is new and did not appear in Addendum No. 1 or No. 2. It is a Financial Part matter.

---

## 2. Corrections required to Document 5 as currently drafted

These answers make text we have already written incorrect. Listed most serious first.

### 2.1 Shift pattern: 14 hours per day, not 16

> "The combined throughput for two machines for personalization is at least 2000 cards per hour.
> This means one machine must have a throughput of at least 1000 cards per hour. **Shift pattern:
> operations to run on two 7 hrs shifts per day.**"

> "To match the printing throughput, each mailer must process at least 1,000 items per hour, based
> on an **assumed daily operating window of two 7-hour shifts**."

Two 7-hour shifts is **14 hours**. At 2,000 cards per hour that is **exactly 28,000 cards**, which
is the daily requirement with **no margin at all**.

Sections 3.5 and 5.6 currently state a sixteen-hour two-shift day producing 32,000 against 28,000
required, and argue headroom from it. That argument is now wrong in both places, and it is an
over-claim of the kind that the item-by-item commentary makes binding.

**Affected:** Section 3.5 (throughput table and the headroom paragraph), Section 5.6 (same).

### 2.2 Throughput is measured on accepted finished cards

> "The expected throughput will be measured based on the **accepted finished cards**."

Gross machine output does not count. Combined with a reject rate acceptance criterion of 1% and
zero headroom in the daily figure, the rated machine output must exceed 2,000 per hour to deliver
2,000 accepted cards per hour.

**Affected:** Section 3.5 must state the measurement basis. This also needs putting to the machine
provider, because it changes what rated figure we need from them.

### 2.3 There is no courier, and cards are not delivered to citizens

> "**There is no Courier contracted for the delivery of cards by NRB.** In the current setup, NRB
> manages the delivery services to all card ordering sites **using its own fleet and program**. The
> NRIS has a document tracker system that keeps track of the card statuses: printing, dispatching
> and ready for collection and **send an SMS to the owner once ready for collection**."

> "the mailing system must package printed cards into envelopes marked with the destination address.
> Currently, the National Registration Bureau (NRB) **dispatches these cards in batches to the
> ordering remote offices**."

> "The NRB does not have a designated courier/postal service for ID card delivery service. **The
> solution must be ready for API integrations with a courier/postal service.**"

The delivery model is not last-mile delivery to citizen home addresses. Cards go in batches to the
**ordering registration office**, and the citizen collects after an SMS. The envelope address is
the office, not the cardholder.

**Affected:**
- Section 5.3, which states the envelope address derives from the citizen record
- Section 5.7, which states mail pieces are handed to courier services for last-mile delivery to
  citizen addresses recorded during enrolment
- Section 7.11, where "Card delivered" is defined as delivery confirmation from the courier
- **Section 8 in its entirety**, which is built around courier integration and delivery tracking

The correct position: the system produces addressed mail pieces for dispatch to ordering offices,
integrates with the existing NRIS document tracker and its SMS notification, and is **ready for**
courier API integration without depending on a courier existing.

### 2.4 NRB builds the NRIS side of the interfaces

> "The NRIS is managed by the NRB, **whose developers will build the required interfaces in
> coordination with the Supplier**. Therefore, this task carries **no contractual obligations or
> costs for the Bidder**."

> "currently, the NRIS integrates with the existing card printers through a **middleware application
> that connects directly to the database** for the card printing process. **NRB plans to develop an
> API** for the personalization and mailing system."

Section 7.2 currently opens: "All interfaces between NRIS and the Personalization and Mailing System
are designed, developed, tested and deployed as part of the supply." That is now wrong on the NRIS
side.

**Affected:** Section 7.2, and the framing in 7.1. Section 7.5 should also record that the present
integration is middleware to database and that an API is planned, since that is the interface we
will actually consume.

Note the tension with §2.1.3.1.1, which says the Supplier shall design, develop, test and deploy all
interfaces. The safe position is that we specify, design and deliver the production side and the
Interface Control Documents, and NRB's developers build the NRIS side in coordination, per this
clarification.

### 2.5 PKI is provided by Government. We must not propose one

Stated four times across the two documents:

> "The Public Key Infrastructure (PKI) solution shall be **provisioned and made available by the
> Purchaser**."

> "The Department of e-Government is responsible for providing the Malawi Government's Public Key
> Infrastructure (PKI). **Bidders must not procure a new PKI**; instead, they must plan to utilize
> the e-Government PKI that will be provisioned for the National Registration Bureau."

> "**The Supplier shall not be required to deliver a new PKI solution**; furthermore, the
> personalization system will use the PKI for the generation of secure digitally signed QR codes on
> the non-chip cards."

> "**The Hardware Security Module (HSM) solution will be required to utilize the PKI** when
> generating secure QR codes on the cards."

This settles the open Option A / Option B question: **Option B**. The HSM is ours to supply, listed
under supporting ICT infrastructure. The certification authority is not, and proposing one would be
a deviation.

**Affected:** Section 4.5, Section 6.5, and Section 10.4 when drafted. Also the Basis of Offer list,
since certificate issue and renewal now sit with e-Government rather than NRB.

---

## 3. Scope now confirmed as ours

### 3.1 Supporting ICT infrastructure is in scope

> "The supporting ICT infrastructure, software licenses, and three-year support are **within the
> Supplier's scope of supply** and must be included in the system inventory tables."

This closes the scope gap identified during the RFP read, where §1.3 demanded enterprise
architecture but §3 listed only lasers, mailing, cards and renovation. Servers, database platform,
HSM, next generation firewalls, IDS/IPS, EDR, SIEM, backup storage and the monitoring stack are all
ours, with three-year support, and all must appear in the System Inventory Tables.

**Affected:** Section 9 throughout, and Section 6.13 software inventory and licensing.

### 3.2 Security Operations Centre

> "The Supplier must **implement a Security Operations Center (SOC)** for the proposed system as part
> of the deliverables. Following the handover period, the NRB will assume full responsibility for
> managing the SOC."

Build and transfer, not a managed service.

### 3.3 Non-production environments

> "the bidder must provide non-production environments for **development, training and User
> Acceptance Testing**. The bidder should recommend whether these additional environments should be
> hosted within the same card personalization system environment or collocated at the NRIS data
> center. Furthermore, the bidder may propose either a virtualized or physical infrastructure."

Three environments, and we make the hosting recommendation.

### 3.4 Identity: integrate with existing Active Directory

> "The NRB will provide its existing **Active Directory (AD) system** for integration. The Supplier
> must deliver a solution that implements industry-standard secure access controls."

**Affected:** Section 6.12, Section 10.3.

### 3.5 Serialized blank card inventory, interfaced to NRIS

> "The Bidder must provide a **serialized blank card inventory control system capable of interfacing
> with the NRIS**. The system must ensure end-to-end traceability of each blank card throughout its
> entire lifecycle, **from initial supplier delivery to its final issuance or disposal state**."

Section 6.10 covers receipt, issue, reconciliation and destruction, but does not state that blanks
are serialized or that the stock system interfaces with NRIS. Both need adding.

### 3.6 Availability

> "The card personalization system must maintain an availability level of **99% during both the
> warranty and post-warranty periods**. Permitted exclusions: scheduled maintenance windows, system
> outages, NRIS unavailability, and power or connectivity failures external to the card
> personalization system."

**Affected:** Section 11, Section 12.4.

### 3.7 Data residency

> "The **NRB is the data controller** for citizen data held in the personalization system. **Citizen
> data cannot be stored or processed outside Malawi** without formal clearance from the Data
> Protection Authority."

Bears on FAT at the OEM factory, on remote support access, and on offsite backup. Section 7.8
already states that only the batch in preparation is held and that NRIS remains the system of
record, which is consistent, and is reinforced by:

> "the personalization system must only retain the production and audit data whilst the NRIS remains
> the system of records."

---

## 4. Card and personalization detail now settled

| Item | Position |
|---|---|
| QR code contents | Biodata, fingerprint and facial image. Confirmed repeatedly |
| QR code size | Purchaser is **optimizing it to reduce its physical footprint** and will communicate final dimensions to the Supplier |
| QR code specification | Purchaser will provide **digital signing protocols, data formats and structural schemas** to the successful Supplier |
| QR code reading | Requires "specialized software equipped with the appropriate **security decryption keys**", which implies the payload is encrypted as well as signed |
| Card design | **Joint redesign with the Purchaser.** A graphical layout designer is required to redesign the Malawi National ID template |
| Card languages | **English and Chichewa** |
| Card variants | One blank design serves both national ID and foreign registration card |
| Photograph | **ICAO compliant**, ICAO specifications apply for size and image |
| Photo personalization | **Greyscale**, confirmed again |
| Chip | Excluded. Modular design must support **future chip encoding mandates** |
| CLI and MLI | CLI is the minimum. MLI additionally is acceptable |
| Layers | Minimum six. More is welcome if it adds security |
| Thermochromic ink | **Mandatory, cannot be omitted or modified** |
| OVMI | **Mandatory. No change to OVI** |
| Photonic crystal | Front required, dual-sided optional |
| Lamination | Not mandated. May be proposed |
| Card delivery | Phased acceptable, **minimum 500,000 per delivery**. Single batch of 2,000,000 also acceptable |
| Lab test reports | **At least two**, redacted accepted if sufficient for comparison. ISO/IEC 17025 is a minimum |
| Physical card samples | **At least two** with the bid, blank or previously personalized |

---

## 5. Contradictions between the two response documents

### 5.1 Disaster recovery scope

**Queries 003:** "Designing and implementing a secondary Disaster Recovery (DR) site is **excluded
from this project's scope**. However, proposals must demonstrate full architectural readiness for
future DR integration." And: "This project involves a single-site implementation. It does not
include establishing a new physical Disaster Recovery site."

**Queries 04:** "The Purchaser operates an NRIS Disaster Recovery Site within a secure Data Center
located in Blantyre. ... **Bidders must ensure that the secondary environment is fully functional and
operational at the Operational Acceptance stage.**"

The readings can be reconciled: we do not build a DR *facility*, but we do deploy our system's
secondary *environment* into the Purchaser's existing Blantyre data centre, and it must work at
Operational Acceptance. That reconciliation should be stated explicitly in Section 9.3 and Section
13 rather than left implicit, because the two documents read differently on their face.

### 5.2 Card samples with the bid

**Queries 003:** "the samples required are **images** as indicated in the referred clause."

**Queries 04:** "Bidders are advised to submit **at least two physical card samples** together with
their bid."

Queries 04 is later. Submitting physical samples satisfies both readings.

---

## 6. Facility and site

| Item | Position |
|---|---|
| Floor plan | **Provided** by the Buildings Department, ground floor, designated rehabilitation and card production area |
| Existing services | "The Supplier shall design the new facility layout **without accounting for any existing electrical, HVAC, ICT, or security infrastructure**" |
| New services | Supplier designs and implements **completely new electrical, networking and HVAC** systems |
| Power connection | Purchaser supplies a **separate dedicated electrical power connection** based on the Supplier's final approved design |
| Approvals | NRB coordinates with the Buildings Department for structural and electrical design approvals |
| WAN and internet | Provided via the **Malawi Government Wide Area Network**. NRB provisions it. **The Supplier defines the technical network requirements and the Purchaser provisions them** |
| Perimeter firewall and WAN | Managed jointly by NRB and e-Government. **External network management is outside this procurement** |
| Supplier remote access | Must be arranged directly with NRB and e-Government |
| Further site visit | **Permitted.** Bidders may arrange their own through Mr. Sacha Miteche, +265 (0) 997 657 203, sacha.miteche@nrb.gov.mw |

---

## 7. Items for the bid team, outside Document 5

- **Deadline 13 October 2026. Final. No further extensions will be granted.**
- **JV general experience:** each member must independently meet the five-year Information System
  experience requirement. "The requirement as provided under Paragraph 1.4.1 is indeed correct."
  This constrains the JV composition and must be checked against RME.
- **Currency:** USD, Reserve Bank of Malawi rate at the opening date.
- **32 weeks** covers only the activities in the Implementation Schedule on p.191.
- **US$70 million** is the whole first phase of the Digital Malawi Acceleration Project, not this
  contract.
- **Manufacturer's Authorisation** remains required and is described as critical. No relief offered
  for manufacturers who will not provide one. A distributor agreement is an acceptable example
  document under Section III 1.5(iii).
- **Insurance:** GCC 37.2 co-insured wording stands. The request to change it to additional insured
  was refused.
- **Certifications** (ISO 27001, FIPS 140-2/140-3): "the bidder's proposed team members/partner must
  possess the mandatory certifications required for their respective roles".
- **Confidential marking:** any format is acceptable.
- **Acceptance testing:** 500 to 1,000 test cards against the **NRIS test environment**. Cards
  produced during testing are **not issued to citizens**.
- **Training:** the Supplier recommends the minimum number of staff and prerequisite skills, and NRB
  uses that to size train-the-trainer certification.
- **Warranty service levels:** a severity-based response, on-site attendance and resolution table is
  given in Annex A to Queries 003. It needs reading in full against Section 12.4.

---

## 8. Still open

- Whether the QR payload is encrypted as well as signed. The phrase "security decryption keys"
  suggests encryption, but no clause states it. The full specification comes only to the awarded
  supplier.
- Final QR code dimensions, pending the Purchaser's optimization.
- Cards per carrier letter, "will be agreed upon with NRB".
- The DR reading at 5.1 above.
- Machine rated throughput needed to deliver 2,000 **accepted** cards per hour at a 1% reject rate.
  This is a question for the machine provider, not the Purchaser.
