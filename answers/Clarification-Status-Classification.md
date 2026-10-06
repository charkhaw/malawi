# Clarification Status — our 31 questions against the client's responses

Sources used, all dated on or before 9 September 2026:

- `Responses-to-Request-for-Clarifications_001_NRB-28-Aug-2026_STEP (1).pdf` — NRB's answers to another bidder
- `Addendum-2-to-the-RFP-Turnkey_STEP (1).pdf` — Addendum No. 2, which formally amends the RFP
- `Inkript_Technical_Clarification_Queries.docx` — our combined list

**Result: 3 drop, 4 narrow, 24 keep unchanged.**

| Status | Count | Meaning |
|---|---|---|
| **ANSWERED — drop** | 3 | Fully resolved. Re-asking would look careless. |
| **PARTIAL — narrow** | 4 | Part resolved. Revised wording given below; ask only the remainder. |
| **UNANSWERED — keep** | 24 | Neither document touches it. Send as drafted. |

---

## ⚠ Read this first — the deadline

The Responses document states, in answer to the request for an extension:

> *"Bidders are advised that the clarifications made did not lead to material changes, as such, the
> closing date for bid submission remains as communicated through Addendum No. 1."*

And in answer to an earlier question:

> *"The revised bid submission date is 22nd September 2026."*

**Addendum No. 2 does not extend the deadline.** It amends technical specifications only, and closes
with: *"all other details of the Request for Proposal remain unchanged unless revised through Addenda
1 and 2 issued."*

So on the documents in hand the deadline is **22 September 2026** — thirteen days from today, not
mid-October. If a third addendum extending it exists, it is not in this folder. Worth confirming
before planning around October.

---

# Section 1 — Polycarbonate cards

### 1.1 Is an integrated circuit required? — **ANSWERED, DROP**

Answered twice over, and unambiguously.

> *"Bidders are advised that this procurement is for the supply of two (2) million **chipless**
> polycarbonate (PC) cards. Consequently, all technical specifications and requirements relating to
> integrated circuits (chips) on blank cards are non-applicable and are hereby excluded from the
> technical scope of this tender."* — Responses

Addendum No. 2 then removed every operative chip reference: §1.5.2.4.1 now reads *"Card encoding
transactions (magnetic/laser engraving)"*; §2.1.4.3.1 now reads *"Encode barcode data (where
applicable)"*; §0.4.7.5 drops *"encoding chip information"*; Table A Test 6 drops *"Chip encoding"*;
Table B Test 7 now reads *"(barcode/QR if applicable)"*.

*Residual inconsistency, not worth re-asking:* §3.1.1 and §3.1.11 still say *"Polycarbonate Smart
Cards"*. Addendum 2 left those untouched. The Responses answer overrides them.

### 1.2 Confirm the portrait is full colour at 600 dpi — **ANSWERED, DROP**

**The answer is the opposite of what our question assumed.** Our 1.2 asks NRB to *confirm full
colour*. They have ruled it out.

> *"This is an anomaly; it should be greyscale instead of full color."* — Responses

Addendum No. 2 §3.2.2.1.1 now reads *"Picture: 600 dpi or higher in greyscale"*, and Section III
§1.4 item 2 now reads *"Stacked-Layer greyscale personalization"*.

Sending 1.2 as drafted would ask them to confirm something they have just formally amended away.

### 1.3 At what stage is colour personalization applied? — **ANSWERED (moot), DROP**

The premise no longer exists. There is no colour personalization — greyscale laser engraving only.
The card *body* still carries full-colour static artwork (rainbow/IRIS printing, guilloche), but that
is pre-printed by the card OEM and was never the subject of this question.

### 1.4 "Pre-personalized" cards — blank bodies, or serialized / chip-initialized? — **PARTIAL, NARROW**

The chip half is answered (no chip). The blank-body half was **asked by the other bidder and not
answered** — NRB never confirmed it. Serialization was not addressed at all, and matters: §3.4.2
requires *"CLI (Changing Laser Image) – photo & number"* and §2.1.3.2.2 lists *"Card Serial Number"*
among the data elements.

> **Revised wording:** Please confirm that the two million cards are blank card bodies carrying the
> card-body security features specified at §3.4.2 and §3.4.3 and no cardholder data. Please confirm
> separately whether the cards are to be serialized at manufacture and, if so, state the numbering
> scheme, format and range.

### 1.5 One consignment or call-off? Secure storage capacity at the CPF? — **UNANSWERED, KEEP**

Neither document addresses delivery phasing or the blank-card storage capacity available at the
facility. Directly affects our logistics and the secure storage room design under §3.5.3.1.2.

### 1.6 Does an approved card design exist? Release the artwork? — **UNANSWERED, KEEP**

Not addressed. Table B Test 7 assumes *"Approved design templates applied"* without saying who
produces them. Still the question that decides whether card design is a workstream inside 32 weeks.

### 1.7 QR code specification — **PARTIAL, NARROW — and now much more important**

A significant disclosure, volunteered rather than asked for:

> *"The NRB currently prints digitally signed biometric QR code which includes the biodata, face and
> fingerprint biometric information."* — Responses

That answers the content and confirms it is digitally signed. It does not answer the encoding
standard, version, error correction level, biometric template format or size, or what *"both alpha
numeric values"* at §3.1.3 means.

**This is the single most consequential thing in the responses.** With no chip, the signed QR is the
card's entire electronic security anchor — and it is what the HSM, PKI, key management and digital
signature enforcement requirements exist to serve. Sizing it wrongly affects the QR zone layout, the
laser marking area, the signing infrastructure and the personalization software.

> **Revised wording:** We note the National Registration Bureau currently prints a digitally signed
> biometric QR code containing biodata, facial and fingerprint biometric information. Please state
> the QR encoding standard and version, the error correction level, the maximum payload size, the
> biometric template format and size (for example ISO/IEC 19794), the signature algorithm and
> certificate profile, and which party holds the signing key. Please also clarify the meaning of
> *"QR code (both alpha numeric values)"* at §3.1.3.

---

# Section 2 — Mailing and dispatch systems

### 2.1 Carrier letter — paper size, weight, branding, stock supply — **UNANSWERED, KEEP**
### 2.2 Envelope — size, material, window, branding, tamper-evidence — **UNANSWERED, KEEP**
### 2.3 Courier or postal operator, contract, API, last-mile responsibility — **UNANSWERED, KEEP**

None of the three is touched by either document. 2.1 and 2.2 remain the largest specification gap in
the mailing scope — no envelope or carrier format is stated anywhere in the RFP, so no bidder can
confirm machine compatibility or consumable supply on a common basis.

### 2.4 Is 2,000 mailers/hour aggregate? Measured on what card mix? — **PARTIAL, NARROW**

NRB answered the *equivalent* question for the personalization machines, not the mailing machines:

> *"the stipulated minimum duplex printing speed of 2,000 cards per hour represents the aggregate,
> combined output of the two (2) required laser personalization machines. Consequently, each
> individual machine must achieve a minimum throughput of 1,000 cards per hour."* — Responses

§3.3.10 uses the identical construction — *"At least 2,000 completed mailers per hour with 02
machines"* — so aggregate is now the near-certain reading, and the first half of our question is
effectively resolved by parallel. The second half is untouched, and it is the half that matters:
with 1–4 cards per letter permitted, the measurement basis changes capacity by up to four times.

> **Revised wording:** We note the response confirming that 2,000 cards per hour is the aggregate
> output of the two personalization machines. Please confirm the same aggregate basis applies to the
> 2,000 completed mailers per hour at §3.3.10, and state whether that rate is measured on
> single-card mailers or on the expected mix of one to four cards per letter.

### 2.5 Business rule for multi-card mailers and expected distribution — **UNANSWERED, KEEP**
### 2.6 Definition of "completed mailer" — **UNANSWERED, KEEP**

---

# Section 3 — Software and application

### 3.1 §2.1.4.9 is a heading with no requirement — **UNANSWERED, KEEP**

Addendum No. 2 amended §2.1.4.3.1 but left §2.1.4.9 as an empty heading.

### 3.2 RTO and RPO values — **UNANSWERED, KEEP**
### 3.3 Concurrent users — 20 or 100? — **UNANSWERED, KEEP**
### 3.4 Enrolled records and annual issuance volume — **UNANSWERED, KEEP**

---

# Section 4 — Integration to NRIS

### 4.1 Issue the NRIS interface documentation — **UNANSWERED, KEEP**
### 4.2 NRIS technology platform — **UNANSWERED, KEEP**
### 4.3 NRIS-side responsibility and interface boundary — **UNANSWERED, KEEP**
### 4.4 NRIS test or staging environment — **UNANSWERED, KEEP**
### 4.5 Disaster recovery facility — supply or integrate? — **UNANSWERED, KEEP**
### 4.6 The eight status events, including "Card delivered" — **UNANSWERED, KEEP**

The whole integration section is untouched by both documents. 4.1, 4.3 and 4.5 remain the three
largest unpriced scope risks in the bid.

---

# Section 5 — Cybersecurity, PKI and HSM

### 5.1 ISO 27001 "should ... (mandatory)", scope, JV members — **UNANSWERED, KEEP**

### 5.2 New PKI and HSMs, or integrate with existing? — **PARTIAL, NARROW — and now sharper**

Only the chip-related sub-part is moot: with no chip, there is no key injection at the card plant.
The core question is unanswered — and the disclosure at 1.7 makes it more pressing, not less. A
digitally signed biometric QR code requires signing keys, an HSM and a certificate authority. NRB
says it *currently* prints such a QR, which implies signing infrastructure already exists somewhere.

> **Revised wording:** We note that the National Registration Bureau currently prints a digitally
> signed biometric QR code. Please confirm whether the Contractor is to supply a new PKI and HSMs, or
> to integrate with existing Government signing infrastructure. Please state which party conducts the
> key ceremony, which party holds and manages the signing keys, and whether the HSMs are within the
> Contractor's scope of supply.

*(Delete the trailing chip and key-injection sentence from our original 5.2 — it no longer applies.)*

### 5.3 SOC — establish, integrate, or as-a-service? — **UNANSWERED, KEEP**
### 5.4 Who appoints and pays the independent penetration tester? — **UNANSWERED, KEEP**
### 5.5 Outbound remote access from the CPF — **UNANSWERED, KEEP**
### 5.6 "Recommended" and "preferred" items — required, and do they score? — **UNANSWERED, KEEP**

On 5.6 there is a partial signal but not an answer. The Responses establish that *"the minimum
specifications detailed in the bidding document are non-negotiable"* and that bidders must *"meet or
exceed the baseline requirements"*. That concerns substitutions, not whether optional-language items
attract evaluation credit. Keep the question.

---

# Section 6 — ICT infrastructure

### 6.1 Are servers, storage, network, firewalls and licences in scope? — **UNANSWERED, KEEP**
### 6.2 NRIS location, connectivity, bandwidth, who pays — **UNANSWERED, KEEP**

Untouched by both documents. 6.1 remains the largest single scope unknown in the tender.

---

# What the responses change in our technical solution

Four things now settled that we must build to, independent of any further clarification:

**1. No chip, anywhere.** No contact or contactless encoding stations in the personalization line, no
chip cost in the card, no chip OS or applet licensing, no ICAO/LDS data structure, no BAC/PACE/EAC.
This removes cost and complexity from both the machine configuration and the card.

**2. Greyscale only.** No colour print subsystem on the personalization machines — no surface
pre-treatment, colour print module or curing stage. As the other bidder correctly argued, that is a
material difference in machine price, footprint, throughput and consumable cost.

**3. The signed biometric QR code is the card's electronic security anchor.** It carries biodata,
facial and fingerprint biometrics, digitally signed. Everything the RFP demands around HSMs, key
management lifecycle and *"digital signature enforcement for card personalization"* exists to serve
this, not a chip. Our cybersecurity and integration documents should say so explicitly — it shows we
understood what the security architecture is actually protecting.

**4. Throughput floor per machine.** Each personalization machine must independently achieve ≥1,000
cards/hour; 2,000 is the aggregate. Our machine provider must evidence the per-machine figure, not
just the combined one.

## One opportunity worth taking

The Responses volunteer something NRB did not have to say:

> *"the hardware procurement for personalization equipment is independent from the 2,000,000 blank
> card supply requirements. The NRB maintains the flexibility to upgrade to smart (chip-based) cards
> in future iterations based on prevailing strategic requirements."*

§3.1.10 separately requires a *"modular machine for future expansion and upgrades"*. Those two
statements line up: offering a personalization line with a defined, costed upgrade path to chip
encoding directly answers a stated NRB intention while adding nothing to the current scope.

Under the p.64 scoring scale, 3 is *"marginally exceeding"* and 4 is *"significantly exceeding"* the
requirement. This is a clean, low-cost way to argue for a 4 on a requirement most bidders will simply
meet — and it costs us nothing today because the chip is out of scope.
