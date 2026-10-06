# 1. Scope and Approach

## 1.1 Scope of the sub-plans

The Implementation, Training, Testing and Quality Assurance, and Warranty Defect Repair and Technical
Support Service sub-plans cover the Information System: the two laser personalization systems, the
two mailing and dispatch systems, the application software, the integration with NRIS, the
supporting ICT infrastructure at the Card Production Facility and in the secondary environment, the
security components, and the supply of polycarbonate cards as it bears on production. The system
itself is described in the System Architecture.

| Sub-plan | Section |
|---|---|
| Implementation Sub-Plan | Section 2 |
| Training Sub-Plan | Section 3 |
| Testing and Quality Assurance Sub-Plan | Section 4 |
| Warranty Defect Repair and Technical Support Service Sub-Plan | Section 5 |
| Licensing Bill of Materials | Annex A |

**Boundary with the facility works.** The civil and architectural works, electrical installation,
HVAC and environmental control, fire detection and suppression, and the physical security
installations are planned under the facility works. They appear here only where the Information
System depends on them, chiefly the readiness of the server room and production floor for
installation, and that dependency is scheduled in Section 2.

**Boundary with project organization.** Project management authorities, the project-wide schedule
and the staffing of the project team are set out in the Project Organization and Management
Sub-Plan. The schedule in Section 2 is the Information System's part of it and uses the same ten
contractual milestones.

## 1.2 Delivery approach

The contractual Implementation Schedule sets ten milestones over 32 weeks from the Effective Date.
The Information System is delivered against those milestones in parallel workstreams, joined at
defined points, under the following principles:

| Principle | Effect on the plan |
|---|---|
| Design approved before build | Nothing the design can change is built or configured before design approval. Three things it cannot change start earlier: the equipment, ordered at mobilization and built on its standard configuration, with its options fitted after approval; the ICT infrastructure, ordered at mobilization in the quantities already fixed, and configured to the approved design; and the application components the Technical Requirements fully define, built from week 3 |
| Integration risk retired early | The NRIS interface is specified during design, built and tested against simulators from week 7, and tested against the NRIS test environment on site. The first contact with NRIS is not the first test of the interface |
| Nothing reaches the production line untested | Each component passes factory acceptance, staging integration, pre-commissioning and operational acceptance in turn, and a failure at one stage is corrected before the next begins |
| Citizen data stays in Malawi | Every activity performed away from Malawi, including build, staging and factory acceptance testing, uses synthetic data. Citizen data is used only on the installed system |
| Knowledge transfer alongside delivery | NRB technical staff attend factory acceptance testing, shadow installation and commissioning, and are trained on the system as deployed. Operational independence is built during delivery rather than attempted at the end |
| The Purchaser's inputs are dated | Every input the plan depends on is stated with the week it is needed, in Section 2.7, so that a late input is visible as a schedule risk before it becomes a delay |

The principle that shapes the schedule most is the second. The interface to NRIS is built by two
teams in two organizations, and on the Purchaser's side it is still to be developed. An interface
tested for the first time on site in week 23 would leave three weeks to find and correct every
disagreement between two independently written halves. Specifying it in week 6, testing the
production side against simulators from week 7, and integrating each interface with NRIS as it is
delivered from week 18 moves that discovery forward by months.
