# 4. Transition and Readiness

## 4.1 Transition sequence

The change activities run within the ten phases and contractual milestones of Preliminary Project
Plan Section 2.1, on the dates already set there. This plan adds no date of its own.

| Phase and weeks | Change activities | Condition |
|---|---|---|
| Mobilization and planning, weeks 1 to 2 | Plan baselined in the Project Initiation Document; recommended trainee numbers and prerequisites issued to NRB; discovery walkthroughs begin | |
| Design and detailed planning, weeks 3 to 6 | Walkthroughs of current production and dispatch with the staff who perform them; Discovery Report in week 4; future-state processes, roles and draft procedures in week 5; design review with NRB | Detailed Design Approval: processes, roles and separation of duties approved |
| Procurement and manufacturing, weeks 7 to 16 | Joint checkpoints with NRB developers every two weeks; factory acceptance delegation nominated by week 12; technical trainees nominated and shadowing from week 15 | |
| Factory acceptance testing, week 17 | Equipment training of the NRB delegation at the factory | Successful FAT |
| Installation and site acceptance testing, weeks 21 to 26, with the ICT from week 15 | User trainees nominated by week 20; procedures, manuals and training materials issued in week 24; user acceptance testing with NRIS stakeholders in weeks 24 and 25; pilot production run by the trainees in week 26, its cards not issued | Installation and SAT: the readiness gate in Section 4.2 |
| Training and knowledge transfer, weeks 25 to 28 | User training groups in weeks 25 and 26; management training in week 26; technical training in weeks 26 and 27; cover group trained by NRB trainers in weeks 27 and 28 | Training completed: competence matrix delivered |
| Commissioning, weeks 27 to 30 | Live production begins with the operational acceptance tests, on NRB's cutover decision for each request type; coaching in production; operational independence in week 28; final acceptance demonstration in weeks 29 and 30 | System commissioned |
| Handover and go-live, weeks 31 to 32 | Stabilization with resident engineers on every shift and a daily review with NRB; process ownership and change control transferred to NRB | Full handover and go-live |

The resources for each activity are the roles in Section 6.1 and the NRB staff in Section 2.2. The
schedule is the one shown in Preliminary Project Plan Section 2.2.

## 4.2 Readiness gates and fallback

People and process readiness is checked at the gates the project already has, and each gate has a
defined outcome if readiness is not met.

| Gate and week | Readiness required | If not met |
|---|---|---|
| Detailed Design Approval, week 6 | Future-state processes, roles and separation of duties approved | Corrected before approval, not carried into the build |
| Successful FAT, week 17 | NRB delegation trained on the equipment | Equipment training completed on site during installation |
| Installation and SAT, week 26 | Procedures issued; pilot production passes pre-commissioning test 15; both shifts staffed by trainees | Live production does not start. Requests stay in NRIS and the existing printers continue |
| Start of live production, week 27 | NRB's cutover decision for each request type | That request type stays on the existing printers |
| Operational independence, week 28 | Operational acceptance tests 13 and 16 passed | Tasks retrained and the tests repeated before the final demonstration |
| System commissioned, week 30 | Final acceptance demonstration passed; manuals proven usable | Corrected and the test repeated |
| Full handover, week 32 | NRB holds process ownership and the change-control roles in Section 3.1 | |

**Fallback.** Issuance does not depend on the new facility until it is proven. A request is produced
by one facility only, the existing printers remain available until operational acceptance test 2 has
passed, and a request not yet produced stays in NRIS, so a pause delays cards without losing them.
These arrangements are set out in Preliminary Project Plan Section 2.6.

## 4.3 Feasibility and transition risks

**Why the transition is feasible.**

- Every input from NRB that the transition depends on, from trainee nominations to the cutover decision, is dated in Preliminary Project Plan Section 2.7 and followed in the monthly report.
- Training has no float, and the plan is built around it: operators are trained first, so that both shifts can run production from week 27.
- Responsibility moves to NRB in stages, and each stage has a condition that must be met before the next, as set out in Preliminary Project Plan Section 3.1.
- The fallback in Section 4.2 keeps card issuance running whatever happens to the new facility during acceptance.

**Transition risks.** Rated on the scale of the project risk register in Preliminary Project Plan
Section 2.9. R10 and R11 are in that register; R13 and R14 are added by this plan.

| Risk | Rating | Mitigation | Owner |
|---|---|---|---|
| **R10** A request is produced by both the existing printers and the new facility during transition | Low likelihood, high impact | Release to the new facility marked in NRIS and excluded from the middleware selection; tested in pilot production | NRB, with the Supplier |
| **R11** Trained NRB staff are not available in the numbers needed for operational independence | Medium likelihood, medium impact | Recommended numbers issued in week 2; nominations by week 20; operators trained first | NRB, with the Supplier |
| **R13** Staff return to former practice, or work around the new controls, once the Supplier steps back | Medium likelihood, medium impact | Procedures written with the staff who use them; NRB trainers; operational acceptance tests 13 and 16; daily review during stabilization; adoption issues in the monthly service review | NRB operations manager, with the Supplier |
| **R14** An unapproved or faulty change stops production or weakens a control | Low likelihood, high impact | Change procedure in Section 5.2; drift detection; changes outside the production day; rollback plan for every change; requirements freeze | Change board |

The risk that NRB cannot operate the security controls after handover is C15 in Cybersecurity Risk
Management Plan Section 4.3.
