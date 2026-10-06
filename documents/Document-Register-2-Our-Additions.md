# Document Register 2 — Our Additions

RFP No. MW-PPPC-546386-GO-RFB

**Nothing in this file is required by the tender.** Every item here is something we choose to ask for
or produce, and every one carries a stated reason.

Companion file: `Document-Register-1-Tender-Required.md` holds the 85 items the RFP actually demands.
Item numbers are shared across both files, so a reference like "2.20" means the same thing in either.

## Why these exist

They fall into four purposes. Knowing which is which tells you what happens if we drop one.

| Purpose | What it buys us | If dropped |
|---|---|---|
| **Score quality** | The tender scores evidence quality, not assertions. A measurement outscores a specification line. | We still comply, but score lower on a weighted criterion. |
| **Risk transfer** | Our item-by-item commentary legally overrides supplier datasheets (ITP 16.2(c)). Anything we state becomes binding on us. | We carry a risk that should sit with the supplier. |
| **Delivery de-risking** | Facts we need to actually build the thing in 32 weeks, which the RFP never asks anyone to provide. | We design or price on assumptions. |
| **Internal control** | Instruments that stop us making mistakes. Never submitted. | We lose the mechanism that catches omissions. |

**If time gets tight, cut from the bottom of each table upward.** The first two rows in each section
are the ones I would fight to keep.

---

# PART 1 — Machine provider (personalization + mailing equipment OEM)

| # | Document | Purpose | Why we want it |
|---|---|---|---|
| 1.16 | **Measured test report or sample output** for the 600 dpi / 0.33 mm micro-text claim | Score quality | Item 1.12 is worth 8 points and is scored on evidence quality. A datasheet line asserts; a measurement proves. Same requirement, different score. |
| 1.17 | **Throughput test record** stating whether 2,000 cards/hour is nominal, sustained or measured, and the card layout assumed | Risk transfer | Our commentary overrides their datasheet under ITP 16.2(c). If they quote a nominal figure and we write it as sustained, we have made a binding overstatement that surfaces at FAT — where it is far more expensive than here. |
| 1.18 | **Reference list of comparable installations** — national ID or secure card programmes using the same machine model | Score quality | Not asked for on the machine side, but corroborates capability claims and reinforces our own experience narrative. |
| 1.19 | **Interface and integration capability note** — protocols and data formats for receiving job data and returning status, at machine level | Delivery de-risking | We must design the NRIS integration under §2.1. Knowing the machine's real interface prevents us designing something it cannot do. |
| 1.20 | **Preventive maintenance schedule and consumable consumption rates** | Delivery de-risking | Feeds the maintenance plan, spare-parts provisioning and recurrent-cost pricing. Without it those are guesses. |
| 1.21 | **Installation prerequisites** — floor loading, clearances, services, rigging access | Delivery de-risking | We are renovating the room that receives this equipment. Without these figures we design the facility blind. |
| 1.22 | **Written confirmation of any requirement they cannot meet** | Risk transfer | The single most valuable item in this file. A qualified answer now is recoverable; the same gap discovered at Factory Acceptance Testing is not. |

---

# PART 2 — Polycarbonate card OEM

| # | Document | Purpose | Why we want it |
|---|---|---|---|
| 2.19 | **Physical card samples** — not just the images the tender asks for | Delivery de-risking | The tender wants images at bid stage. We want physical stock to prove our laser line personalizes their card body before we commit to the pairing. |
| 2.20 | **Card body compatibility statement with the proposed laser system** | Risk transfer | The card OEM and the machine OEM are different companies. The card body must survive that specific laser at those settings. **The tender assigns this interface to neither of them, so as prime it lands on us.** Highest technical risk in the supply chain, and invisible in the RFP. |
| 2.21 | **Artwork and design capability, with lead times once a design is approved** | Delivery de-risking | The tender never says who produces the card design. Until PPPC answers our clarification, we need to know what the OEM can absorb and how long it takes. |
| 2.22 | **Production capacity allocation statement** — confirmation they can deliver 2 million cards within our schedule | Delivery de-risking | Total annual capacity is a qualification criterion. *Available* capacity against our 32-week programme is not asked for anywhere — and it is what actually determines whether we deliver. |
| 2.23 | **Security and personnel vetting arrangements** at the manufacturing site | Score quality | Supports our security narrative and the ISO 27001 story in the cybersecurity category. |

---

# PART 3 — CIRA rehabilitation subcontractor

| # | Document | Purpose | Why we want it |
|---|---|---|---|
| 3.7 | **Site survey report** for the allocated CPF room | Delivery de-risking | §0.6 provides no drawings at all. If they can survey the room, we stop designing the renovation blind. |
| 3.8 | **Local supply chain and lead times** — materials, HVAC, electrical, fire suppression | Delivery de-risking | The 32-week schedule depends on Malawi procurement lead times we cannot see from outside the country. |
| 3.9 | **Method statements** for partitioning, anti-static and raised flooring, clean-agent suppression | Score quality | Feeds Category I (20 points), which is scored on the quality and completeness of the design and implementation plan. |
| 3.10 | **HSE record and safety statistics** | Score quality | Strengthens the Occupational Health and Safety Plan and the wider ES management strategies. |

---

# PART 4 — Inkript: our own internal and supporting documents

| # | Document | Purpose | Why we want it |
|---|---|---|---|
| 5.26 | **Requirements Traceability Register** — every Section VII clause with its owner, response location, evidence artefact and status | Internal control | Never submitted. It is the instrument that guarantees no clause is missed, and under ITP 30.3 an omission is an uncurable material deviation. **This is the one I would protect above everything else in this file.** |
| 5.27 | **Compliance summary matrix** placed ahead of the item-by-item checklist | Score quality | The checklist itself is mandatory; a summary in front of it is not. It helps an evaluator find compliance quickly rather than hunting. |
| 5.28 | **Assumptions and clarifications log** | Risk transfer | Where the RFP is silent or self-contradictory and PPPC has not answered, we state the assumption openly instead of guessing silently. Protects us contractually if the assumption later proves wrong. |
| 5.29 | **Card-to-machine compatibility statement** — our own, spanning both OEMs | Risk transfer | The counterpart to 2.20, written from the prime's side. Two suppliers, one interface, and the tender assigns it to neither. |
| 5.30 | **Organisation chart showing the three-party structure** — Inkript, machine OEM, CIRA subcontractor | Score quality | Not requested, but it answers the unspoken evaluator question of who actually does what across three companies. |
| 5.31 | **Reference letters from past national ID clients** | Score quality | The EXP forms require Operational Acceptance Certificates, which are formal but dry. Letters add credibility the forms cannot carry. |
| 5.32 | **Glossary mapping our product names to the RFP's terminology** | Risk transfer | The item-by-item commentary prevails over datasheets. If our naming differs from theirs, a mapping prevents an evaluator scoring a requirement as unmet simply because they could not find it. |

---

# Totals

| Source | Additions |
|---|---|
| Machine provider | 7 |
| Card OEM | 5 |
| CIRA subcontractor | 4 |
| Inkript — internal and supporting | 7 |
| **Total** | **23** |

| Purpose | Count |
|---|---|
| Delivery de-risking | 8 |
| Risk transfer | 6 |
| Score quality | 8 |
| Internal control | 1 |

## The three I would not drop

1. **5.26 Requirements Traceability Register** — it is the control that prevents an uncurable
   omission. Everything else in the bid depends on it being right.
2. **2.20 / 5.29 Card-to-machine compatibility** — two suppliers, one interface, assigned to neither
   by the tender. If nobody owns it, it fails during commissioning and it is ours to fix.
3. **1.22 Written confirmation of what the machine provider cannot meet** — the cheapest possible
   insurance against a binding overstatement in a document that legally overrides their datasheet.
