# v3 questions scanned against the combined list

Checking each of the 8 questions in `clarifications/Clarification Questions v3 - Malawi.md` against
`Inkript_Technical_Clarification_Queries.docx` (31 questions) and the client's responses.

**Result: 3 to add as a new section, 1 to add or move to the commercial list, 1 to merge into an
existing question, 3 to drop.**

| v3 # | Subject | Verdict | Where it goes |
|---|---|---|---|
| 1 | Scoring scale 4/2/0 vs 0–4 | **ADD** | New Section 7 |
| 2 | Scope of Category II (30 points) | **ADD** | New Section 7 |
| 3 | Missing "Technical Team" category | **ADD** | New Section 7 |
| 4 | NRIS technical documentation | **DROP** | Already covered, better, by combined 4.1 |
| 5 | Pre-printed card bodies vs on-site personalization | **MERGE** | Into combined 1.4 |
| 6 | Full colour vs greyscale | **DROP** | Answered by Addendum 2 |
| 7 | Chip / smart card requirement | **DROP** | Answered by the Responses |
| 8 | Warranty commencement | **ADD** | New Section 8, or the commercial list |

---

## v3 Q1 — Scoring scale — **ADD**

Not in the combined list. The combined list has no evaluation section at all — its six sections are
cards, mailing, software, NRIS integration, cyber/PKI/HSM and ICT infrastructure. Not answered by
either client document.

Still live, and it matters: page 57 gives a 4/2/0 scale where 4 is fully compliant; page 64 gives
0–4 where **2** is *"meeting the requirements"* and 4 is *"significantly exceeding"*. The same
compliant answer scores 4 or 2 depending on which governs. That changes what clearing the 70%
threshold actually requires.

## v3 Q2 — Scope of Category II — **ADD, and this is the most valuable one**

Not in the combined list. Combined 4.1 cites §III Cat.2 in its clause reference, but only to ask for
interface documentation — it never asks what Category 2 is actually scored on.

Not answered by either document. Still the position that the 30-point category titled *"Integration
to the National Registration and Identity System (NRIS)"* is scored against four sub-criteria that
are entirely laser personalization machine specifications.

Of everything in either list, this is the question whose answer most changes where we spend effort.

## v3 Q3 — Missing "Technical Team" category — **ADD**

Not in the combined list, not answered. Cheap to ask. If a scored category really is missing from the
100%, the consequences are material.

## v3 Q4 — NRIS technical documentation — **DROP**

**Superseded by combined 4.1**, which is more comprehensive. v3 Q4 asks for *"interface control
documents, API specifications, data dictionary, database platform and network topology"*. Combined
4.1 asks for *"interface specifications and endpoints, web service definitions, the data dictionary
for the elements at §VII 2.1.3.2.2, supported message formats and authentication mechanisms"* — and
combined 4.2 separately covers the platform, ESB, middleware and identity provider.

The combined pair is the better instrument. Keep it and drop v3 Q4.

## v3 Q5 — Pre-printed card bodies — **MERGE into combined 1.4**

Substantially overlaps combined 1.4, but each has something the other lacks.

- **v3 Q5** names the static artwork explicitly — security artwork, Guilloche backgrounds, UV
  printing, OVMI Malawi flag motif — and draws the scope boundary: on-site work is limited to laser
  engraving of citizen data.
- **Combined 1.4** adds serialization, which v3 Q5 omits entirely.

The chip element in both is now moot. Suggested merged wording, replacing combined 1.4:

> Please confirm that the two million polycarbonate cards are to be delivered to the Central Printing
> Facility as pre-printed card bodies incorporating all static security artwork, Guilloche
> backgrounds, UV printing and the Optically Variable Magnetic Ink (OVMI) Malawi flag motif specified
> at §3.4.2 and §3.4.3, carrying no cardholder data, such that on-site personalization is limited to
> the laser engraving of individual citizen biographical and biometric data. Please confirm
> separately whether the cards are to be serialized at manufacture and, if so, state the numbering
> scheme, format and range.

## v3 Q6 — Full colour vs greyscale — **DROP**

Answered. *"This is an anomaly; it should be greyscale instead of full color."* Addendum No. 2
amended §3.2.2.1.1 to *"Picture: 600 dpi or higher in greyscale"* and Section III §1.4 item 2 to
*"Stacked-Layer greyscale personalization"*.

Note the direction: v3 Q6 asks them to *resolve* the contradiction, which they have. Combined 1.2
asks them to *confirm full colour*, which they have now ruled out. Both drop, for slightly different
reasons.

## v3 Q7 — Chip / smart card requirement — **DROP**

Answered: *"two (2) million **chipless** polycarbonate (PC) cards… all technical specifications and
requirements relating to integrated circuits (chips) on blank cards are non-applicable and are hereby
excluded."* Addendum No. 2 removed the operative chip references.

## v3 Q8 — Warranty commencement — **ADD, but decide where**

Not in the combined list, not answered. Still live: SCC GCC 29.4 starts the warranty at *"Final
Acceptance"*, while SCC GCC 7.3 runs spare parts from *"Operational Acceptance"*, and no definition
of Final Acceptance is given.

The judgement call is placement. The combined document is titled *Technical* Clarification Queries,
and this is contractual — it affects how we price three years of warranty and the spare-parts
obligation more than it affects the technical design. Either add a Section 8 for contractual items,
or hold it for the commercial clarification list. It should not simply be lost.

---

# Also missing from both lists

Not part of what you asked, but these were in the earlier 17-question letter and fell out of **both**
v3 and the combined list. All are technical, none is answered by the client documents.

**Site drawings and site survey information (§0.6, p.204).** The section titled *"Site Drawings and
Site Survey Information Relevant to the Information System"* contains only a postal address. We are
committing to renovate the allocated room to the §3.5 specification — partitioning, anti-static and
raised flooring, precision cooling, clean-agent suppression, access control, structured cabling — in
32 weeks with liquidated damages at 0.5% per week, without knowing the room's dimensions, electrical
capacity or structural condition. **Of everything absent from both lists, this is the one I would put
back.** It belongs in a new section, or in Section 6 alongside the infrastructure questions.

**Site visit records (ITP 7.4 as amended by Addendum No. 1).** A Purchaser-organised site visit took
place on 31 August 2026. If we did not attend, the minutes and any material issued to attendees are a
routine and well-founded request under equal-information principles. I still do not know whether we
attended — it has been asked twice.

**NRIS technology architecture diagram (§0.4.10.2, p.203).** §0.4.10.1 lists the architecture
components — front-end systems, core systems, card personalization and mailing, data centre, DR
facility, network and cybersecurity infrastructure — then says *"The technology architecture is
depicted by the diagram below"*. The diagram at that location shows only eBRS, eMRS, eDRS and the NID
hub at a conceptual level. Fits naturally in Section 4 beside 4.1 and 4.2.

**Mailing sort criterion (§3.3).** *"Continuous sorting and dispatch sorting"* is required and Table A
Test 7 verifies *"Sorting functionality"*, but the criterion is never stated — by district,
Traditional Authority, courier zone, postal route or dispatch batch. It determines the number of
sorting outputs the machine needs. Fits in Section 2 with the other mailing questions.

---

# Proposed new sections for the combined document

**Section 7 — Evaluation and scoring** *(v3 Q1, Q2, Q3)*

| No. | RFP clause | Query |
|---|---|---|
| 7.1 | §III pp.57, 64 | Which scoring scale governs — the 4/2/0 scale at p.57, or the 0–4 scale at p.64 in which 2 denotes meeting the requirements? |
| 7.2 | §III Table 2, p.60 | Is Category II scored solely against its four listed sub-criteria, all of which address the laser personalization system, or are the NRIS integration requirements of §VII 2.1 also scored within it? |
| 7.3 | §III p.57 | The scoring approach refers to "All categories beside Technical Team". No such category appears in Table 1 or 2, and the five listed already total 100%. Confirm no separately scored Technical Team category exists. |

**Section 8 — Contractual** *(v3 Q8, if not moved to the commercial list)*

| No. | RFP clause | Query |
|---|---|---|
| 8.1 | SCC GCC 29.4; 7.3; §VII 5.1.1.1 | Does the Warranty Period commence at Operational Acceptance? If "Final Acceptance" is a distinct milestone, state its definition and the event that establishes it. |

**Additions to existing sections**, if you take the four items above:

| No. | Section | Query |
|---|---|---|
| 1.8 | Cards | *(merged into 1.4 — no new number needed)* |
| 2.7 | Mailing | State the sorting criterion required — district, Traditional Authority, courier zone, postal route or dispatch batch. |
| 4.7 | NRIS | Provide the technology architecture diagram referred to at §0.4.10.2, showing the components listed at §0.4.10.1 and the interfaces between NRIS and the Card Production Facility. |
| 6.3 | Infrastructure | Provide floor plans and dimensions of the allocated room, existing electrical supply capacity and single-line diagram, existing HVAC, cabling and security provisions, and any structural or as-built drawings. |
| 6.4 | Infrastructure | Provide the record of the site visit held on 31 August 2026 and any material issued to attendees. |
