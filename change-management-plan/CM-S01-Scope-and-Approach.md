# 1. Scope and Approach

## 1.1 Purpose and scope

This plan sets out how the operational and process change brought by the Information System is
managed, from the Effective Date to handover, and how changes to the System itself are controlled
through the warranty period. It is the change management part of the plan evaluated under Category 3
of Section III. Together with the Cybersecurity Risk Management Plan, it forms the Cybersecurity Risk
and Change Management Plan referred to in the System Architecture.

Change has three meanings in this Contract, and the plan keeps them apart:

| Meaning | Where it is managed |
|---|---|
| Operational and process change: NRB's staff and processes moving to the new facility | Sections 2, 3, 4 and 6 |
| Technical change control: changes to the hardware, software, middleware and security systems, under Section VII clause 1.4.1.2 | Section 5, using the capabilities in System Architecture Section 12.1 |
| Contractual Change: a change to scope, price or time under GCC 39 | Routed under Section 5.1 only |

| Category 3 item | Requested | Where answered |
|---|---|---|
| Purpose, Table 1 | Sequenced activities, resources and transition steps | Sections 4.1 and 6.1 |
| | Feasibility | Sections 4.2 and 4.3 |
| | Alignment of operational and process change management | Sections 2.1 and 3.1 |
| 1. Alignment with international frameworks | Change Management Plan mapped to NIST CSF | Sections 1.2 and 1.3 |
| | Framework Compliance Matrix | Section 1.3 |
| | Evidence of past implementation | Section 7.3 |
| 2. Risk identification, mitigation and response | Change and transition risks | Section 4.3 |
| | Compliance and Governance Statement | Sections 3.1 and 7.1 |
| 3. Resources, skills, duration and capacity building | Resource and Skill Matrix | Section 6.1 |
| | Capacity-Building and Knowledge Transfer Plan | Section 6.2 |
| | Timeline | Section 4.1 |
| | Compliance Statement | Section 7.2 |

The cybersecurity items of Category 3 are answered in the Cybersecurity Risk Management Plan, as
listed in Cybersecurity Risk Management Plan Section 1.1. The process designs, the transition
mechanics and the training are set out in the Preliminary Project Plan Sections 2 and 3, and this
plan refers to them rather than repeating them.

## 1.2 Frameworks and method

**Prosci ADKAR** structures the people side of the change: each person affected moves through
awareness, desire, knowledge, ability and reinforcement, and each stage is reached through an activity
already in the schedule.

| Stage | How it is achieved on this project | Evidence |
|---|---|---|
| Awareness | Walkthroughs of current production and dispatch with the staff who perform each step, weeks 1 to 4; design review with NRB, weeks 5 and 6; factory acceptance delegation, week 17 | Discovery Report; Detailed Design Approval |
| Desire | Procedures written with NRB staff; NRB trainers drawn from NRB's own staff; NRB leadership involved through the Project Steering Committee and the management training in week 26 | Approved procedures; trainer nominations |
| Knowledge | Shadowing from week 15; formal training in weeks 25 to 28 | Training reports; competence matrix |
| Ability | Pilot production run by the trainees in week 26; coaching in live production in weeks 27 and 28 | Pre-commissioning test 15; operational acceptance test 13 |
| Reinforcement | Operational independence shown in week 28; daily review with NRB during stabilization in weeks 31 and 32; monthly service review | Operational acceptance test 16; monthly service report |

**ITIL 4 change enablement and ISO/IEC 20000-1:2018 clause 8.5.1** structure the technical change
control in Section 5. The practice is aligned with them.

**NIST Cybersecurity Framework 2.0** is the structure shared with the Cybersecurity Risk Management
Plan, and the change controls are mapped to it in Section 1.3.

## 1.3 Framework compliance matrix

The matrix covers the change-related categories. The rest of the Framework is mapped in
Cybersecurity Risk Management Plan Section 3.2.

| NIST CSF 2.0, with ISO/IEC 27001 and ISO/IEC 20000-1 | How it is met | Evidence |
|---|---|---|
| ID.RA-07 Changes managed and assessed for risk (A.8.32; ISO/IEC 20000-1 clause 8.5.1) | Change types, approval and procedure, Sections 5.1 and 5.2 | Change log; change board minutes |
| PR.PS-01 Configuration management (A.8.9) | Baselines, version control and drift detection, Section 5.3; System Architecture Section 12.1 | Configuration repository; drift reports |
| PR.PS Separation of environments (A.8.31) | Changes promoted from development through user acceptance testing to production, Section 5.2 | Release records |
| GV.RR Roles and responsibilities (A.5.2, A.5.3) | Roles, decision rights and separation of duties, Section 3.1 | Approved governance tables |
| GV.PO Documented operating procedures (A.5.37) | Procedure lifecycle and ownership, Section 2.1 | Approved Standard Operating Procedures |
| PR.AT Awareness and training (A.6.3) | Capacity building, Section 6.2; Preliminary Project Plan Section 3 | Training records; competence matrix |
| ID.IM Improvement (Clause 10) | Review of emergency and failed changes; lessons from pilot production and coaching, Section 5.2 | Review records |
