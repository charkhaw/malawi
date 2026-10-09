# 2. Changes and Stakeholders

## 2.1 What changes and how it is aligned with the project

Section VII clause 0.2.2 expects the facility to move national identity card issuance from a
potentially manual, less secure and slower process to a modern, secure and efficient one. Today the
existing card printers are fed by a middleware application reading the NRIS database, as described in
System Architecture Section 13.2. The change is therefore to how NRB's staff receive, produce, account
for and dispatch cards, as well as to the equipment they use.

Each process follows the same path. It is designed with NRB and approved in weeks 5 and 6, its
procedure is drafted in week 5 and issued in week 24, it is taught in weeks 25 to 28, and it is proven
in live operation before NRB takes ownership of it. The process designs are in Preliminary Project Plan
Section 2.4.

| Process | What changes for NRB staff | Proven by |
|---|---|---|
| Request intake | Records released in NRIS are retrieved through one gateway, instead of by middleware reading the database. A record that fails validation is held with a reason and reported back to NRIS | Pre-commissioning test 9; operational acceptance test 6 |
| Production | Batches are assigned to either line, with in-line verification and reproduction of rejected cards within the same job | Operational acceptance tests 1, 3 and 7 |
| Card accountability | Every blank is held against its serial number from delivery to issue or certified destruction, and reconciled every shift | Operational acceptance tests 9 and 14 |
| Mailing and dispatch | Cards are matched with their carriers by card identifier, enveloped and batched by ordering office | Operational acceptance test 8 |
| Status | Status is published to NRIS automatically, where it drives the document tracker and the SMS to the cardholder | Operational acceptance tests 6 and 9 |
| Operation and first-line support | NRB staff operate the facility, administer the System and give first-line support | Operational acceptance tests 13 and 16 |

**Procedures.** The Standard Operating Procedures are drafted with the NRB staff who will use them.
They are issued in week 24 so that training teaches from them, then corrected from pilot production in
week 26 and from coaching in weeks 27 and 28 under the documentation control of Preliminary Project
Plan Section 4.7. They are proven usable in operational acceptance test 16. From handover each
procedure has a named NRB process owner, and it changes only through documentation control, and
through Section 5 where the change also touches the System.

## 2.2 Stakeholders, impact and communication

The numbers of staff are those recommended in Preliminary Project Plan Section 3.2.

| Group | What changes for them | How they are engaged | Ready when |
|---|---|---|---|
| User roles: operators, mailing and dispatch officers, quality assurance staff, card issuance officers, supervisors and helpdesk, 24 | New consoles, procedures and controls across two shifts | Discovery walkthroughs; pilot production in week 26; training in weeks 25 to 28; coaching in weeks 27 and 28 | Assessed competent; operational acceptance test 13 passed |
| Technical staff, 15 | Administration and first-line support of a new estate | Factory training in week 17; shadowing from week 15; technical training in weeks 26 and 27 | Operational acceptance test 16 passed |
| Management, 9 | Oversight of a new facility, its controls and its approvals | Project Steering Committee; design review; management training in week 26 | Readiness decisions taken at each gate in Section 4.2 |
| Staff of the existing printing operation | Their process moves to the new facility at cutover | Discovery walkthroughs; briefing before cutover. Their nomination as trainees is NRB's decision | NRB's cutover decision |
| NRB developers | Build the NRIS side of the interface, which replaces the middleware | Interface Control Documents; joint checkpoint every two weeks from week 7; user acceptance testing in weeks 24 and 25 | Integration complete |
| e-Government | Issues the certificates and provisions the network and remote access | Working sessions during design; inputs dated in Preliminary Project Plan Section 2.7 | Inputs delivered on their dates |
| Registration and ordering offices | Cards arrive batched by ordering office, with their status in the document tracker | Through NRB | NRB's announcement of live production |

**Communication.** NRB leads communication with its own staff, with the registration and ordering
offices and with the public, and decides when live production is announced. The Supplier provides the
content and briefings NRB needs, and takes part in stakeholder engagement when asked, under GCC 9.13.
The Supplier keeps NRB management and the NRIS team informed through the project bodies in Section 3.1,
and makes no public statement.
