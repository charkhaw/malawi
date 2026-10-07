# 5. Technical Change Control

## 5.1 Change types and approval

Change control covers every component named in Section VII clause 1.4.1.2: the hardware, the
software, the middleware and the security systems, including equipment firmware and the
manufacturer's releases, the NRIS interfaces, the card layout templates, the firewalls, the security
monitoring and the hardware security modules. The physical security installations are under the
facility works, and only their integration with monitoring falls under this control. The capabilities
that support it are described in System Architecture Section 12.1.

| Type | Examples | Approved by, and when applied |
|---|---|---|
| Standard | Pre-approved, repeatable changes such as the monthly patch cycle | The change board approves the model once; applied in a maintenance window |
| Normal | Software releases, configuration changes, firmware, interface definitions, card layout templates, new versions from manufacturers | The change board, after testing outside production; applied in a maintenance window |
| Emergency | Critical security patches applied out of cycle, and changes needed during an incident or recovery | The incident manager or the NRB ICT manager; reviewed at the next change board |
| Change to scope, price or time | A change to what the Contract requires | The Purchaser, by Change Order under GCC 39, recorded in the Change Order Log; then delivered as a normal change |

The Change Order Log, which records contractual Changes, is kept apart from the technical change log.
Patching follows the cycle in Cybersecurity Risk Management Plan Section 6.3.

## 5.2 Change procedure

| Step | What is done and recorded |
|---|---|
| Request | The change is logged in the configuration repository with its reason and requester |
| Impact analysis | The components, interfaces, environments and security controls affected are identified, and a rollback plan is written |
| Approval | By the authority for its type in Section 5.1. The approver is neither the requester nor the implementer |
| Scheduling | Placed in a maintenance window in the production calendar agreed with NRB |
| Implementation | Promoted from development through user acceptance testing to production, with the training environment kept at the same version. Developers do not deploy to production |
| Verification | The change is checked against its expected result and reconciled with the audit log |
| Closure | The configuration baseline is updated. Emergency and failed changes are reviewed, and the lessons recorded |

**Maintenance windows.** Changes are made outside the production day of two seven-hour shifts. Paired
components are changed one at a time while the other carries the load, and equipment one line at a
time while the other line produces, as described in System Architecture Section 11.5.

**Drift.** When drift detection finds a configuration that differs from its baseline, the difference
is investigated. It is either reversed, or approved as a change after the event. A difference that
cannot be explained is treated as a security event.

## 5.3 Lifecycle and handover of change control

| Period | How change is controlled |
|---|---|
| Design to installation, weeks 6 to 26 | Approved documents are changed only with the Project Manager's approval, under GCC 21.3.7. Builds and configurations are versioned, and every departure from the approved design is recorded for the as-built documentation |
| Requirements freeze | Under GCC 39.1.5, the date after which the Technical Requirements are frozen is proposed at the Installation Certificate in week 26 and agreed in the Project Plan. A Change raised later is dealt with after Operational Acceptance, except defect corrections and emergency changes |
| Commissioning, weeks 27 to 30 | The accepted configuration is the baseline, as set out in Preliminary Project Plan Section 4.7, and changes pass only through Section 5.2 |
| Handover, weeks 31 to 32 | The final configuration baselines are delivered in the as-built documentation. NRB takes the approver roles and chairs the change board. Supplier access is reduced to named support accounts used with NRB's approval |
| Warranty | Defect corrections and new versions are delivered as normal changes. Modifications go first through the Contract's change procedure, then through change control |

NRB's administrators and managers are trained for these roles in the software administration module
and the governance and operations module of the Training Sub-Plan, Preliminary Project Plan Sections
3.4 and 3.5.
