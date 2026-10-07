# 4. Testing and Quality Assurance Sub-Plan

## 4.1 Test strategy and levels

Testing is arranged in levels, and each level proves something the next one relies on. A defect is
cheapest to correct at the level where it first appears, so each level is designed to find its own
class of defect before the next begins. The Purchaser's acceptance tests confirm a system that has
already been tested. They are not where its defects are first found.

| Level | What it proves | Where | Weeks | Performed by | Output |
|---|---|---|---|---|---|
| Development testing | Each component meets its design, and passes code review and static and dynamic security testing | Supplier's development environment | 7 to 16 | Supplier | Test records and release gate results |
| Interface testing against simulators | The production side of the NRIS interface conforms to the Interface Control Documents | Staging environment | 9 to 16 | Supplier | Interface test results |
| Factory acceptance testing | The equipment meets its specification on the actual card stock, and works with the application | Equipment manufacturer's facility | 17 | Supplier and equipment manufacturer, witnessed by NRB | Factory Acceptance Test report |
| Inspection on delivery | Goods arrived complete, undamaged and as ordered | Card Production Facility | 15 for the ICT infrastructure, 21 for the equipment | Supplier, with NRB | Delivery inspection record |
| Integration testing | The system works with NRIS and meets its performance and security requirements | Card Production Facility, against the NRIS test environment | 18 to 26 | Supplier, with NRB developers | Integration, performance and security test reports |
| User acceptance testing | Business workflows, functions and reports are acceptable to NRIS stakeholders | Card Production Facility | 24 and 25 | NRB stakeholders, supported by the Supplier | User Acceptance Test report |
| Pre-commissioning tests | The installed system is ready for the Installation Certificate | Card Production Facility | 19 to 26 | Supplier, with the Purchaser's assistance | The Table A reports |
| Operational acceptance tests | The system operates in live production, and NRB operates it | Card Production Facility, live | 27 to 30 | Purchaser, with the Supplier's assistance | The Table B reports |
| Continuing assurance | The system remains secure and recoverable | Card Production Facility | After acceptance | Supplier, and an independent party for penetration testing | Vulnerability, penetration and disaster recovery test reports |

**Inspection on delivery.** Each delivery is checked against the packing list and the purchase
order, and its packaging and shock indicators are checked for damage. Serial numbers are recorded at
receipt. A shortage, a discrepancy or damage is recorded, photographed and reported for replacement,
and the item is held aside until it is resolved. NRB signs the delivery inspection record before
installation begins.

**Entry and exit.** A level begins only when the level before it has met its exit condition, and no
level exits with a critical or major defect open, as defined in Section 4.7. Each level ends with a
report, and the Purchaser's approval of the report is the record that the level is complete.

**Every requirement is traced to a test.** Each technical requirement is mapped to the test or tests
that verify it, and the mapping is maintained through every level. Acceptance therefore demonstrates
every requirement, rather than the requirements that happened to fall within a test someone thought to
write.

## 4.2 Test environments and test data

| Environment | Location | Used for | Data |
|---|---|---|---|
| Development | Supplier's facility | Build, development testing | Synthetic |
| Staging | Supplier's facility | Interface testing against simulators, integration before factory acceptance | Synthetic |
| Factory | Equipment manufacturer's facility | Factory acceptance testing | Synthetic, on the actual card stock |
| User acceptance testing | Non-production segment of the platform at the Card Production Facility | Integration testing and user acceptance testing | Records from the NRIS test environment |
| Training | Non-production segment of the platform at the Card Production Facility | Training under Section 3, and fault simulation | Masked |
| Production | Card Production Facility and the secondary environment | Pre-commissioning, against the NRIS test environment, then operational acceptance in live operation | Test records, then live records |

The non-production environments are described in System Architecture Section 9.1. The NRIS test
environment is provided by the Purchaser, and connectivity to it from the Card Production Facility is
among the inputs dated in Section 2.7.

**Citizen data stays in Malawi.** Every test performed away from Malawi uses synthetic data, as set
out in Section 1.2. Citizen data enters testing only on the installed system, and in the
non-production environments only in masked form.

**Test cards are accounted for.** Every card used in factory acceptance, in pilot production and in
testing on site is issued from controlled stock against its serial number, and destroyed under dual
custody as described in System Architecture Section 6.10. Test cards are never issued to citizens,
and testing leaves the stock reconciliation as complete as production does.

## 4.3 Factory acceptance testing

**When and where.** Week 17, at the equipment manufacturer's production facility, witnessed by the
NRB delegation. The factory acceptance test procedure is issued to NRB for approval in week 14, so
that the delegation arrives knowing what will be tested and what passing means.

**What is tested.**

| Area | Test |
|---|---|
| Laser personalization features | Laser engraved text, greyscale portrait, secondary image, micro-lettering, CLI, the QR code with both alphanumeric values, and tactile laser printing, all on the actual card body |
| Marking resolution | Portrait at 600 dpi or higher in greyscale, and micro text at 600 dpi or higher at a line width and height of 0.33 mm, measured on the produced cards |
| Independent laser stations | A station is switched off and taken out of operation during a run, and production continues without interruption |
| Throughput | The contractual rate in System Architecture Section 3.5, not less than 1,000 cards per hour on each personalization system, with the full personalization content |
| Card recognition and verification | Recognition of the blank card body, X-Y alignment of front, back and CLI, in-line verification, rejection and in-job reproduction |
| Calibration | Calibration of individual stations and of all stations together, with the audit log it produces |
| Mailing and dispatch | One to four cards per carrier, card-to-carrier matching by card identifier, 1D, 2D and QR code verification, reject magazines, buffer modules and rate |
| Application boundary | The Printer Control Service submitting jobs to the equipment manufacturer's personalization control software and receiving results back |
| Safety and conformity | Emergency stops, noise level, and the electrical and environmental conformity documents |

**Why the actual card body.** The laser systems and the card come from two manufacturers. Marking
quality depends on how that laser marks that card body, so a factory acceptance test run on another
manufacturer's blanks would prove the wrong combination. Qualification cards reach the factory in
week 14 so that laser parameters are set on the actual card before the test, as scheduled in
Section 2.5.

**Exit.** The Factory Acceptance Test report is signed by the NRB delegation. Equipment ships only
with no critical or major defect open. A minor defect is recorded with the date by which it will be
corrected on site. All data used at the factory is synthetic.

## 4.4 Integration and security testing

What each integration test covers is set out in System Architecture Section 7.16. The plan for
performing them is as follows:

| Test | Weeks | Conditions | Performed with |
|---|---|---|---|
| Interface testing against simulators | 9 to 16 | Staging, simulators generated from the Interface Control Documents | Supplier |
| Interface testing against NRIS | 18 to 24 | NRIS test environment, each interface as NRB delivers it | NRB developers |
| System integration testing | 23 and 24 | End to end, with exceptions induced | NRB developers |
| Performance testing | 20 and 21 | Production platform | Supplier |
| Security testing | 20 and 21 | Vulnerability assessment, authentication testing, encryption validation | Supplier |
| Independent penetration testing | 24 | The full deployed configuration, including the Machine Control Zone | Independent third party |
| User acceptance testing | 24 and 25 | NRIS stakeholders, against the live integration | NRB, supported by the Supplier |

**Penetration testing is independent and comes early enough to act on.** The initial full
penetration test is performed by an independent third party in week 24, once the equipment and its
Machine Control Zone are installed, so that the whole deployed configuration is tested. Findings are
corrected and retested in weeks 25 and 26, before the security operations acceptance test in week 27,
which requires that no critical vulnerability remains. Penetration testing is repeated annually and vulnerability
assessment at least quarterly, as described in System Architecture Section 10.5.

**Performance is verified by the methods in System Architecture Section 11.6**: throughput
benchmarks, load testing against the response time thresholds, stress testing of concurrent users to
100 and beyond, transaction integrity at peak, and a sustained operation test.

**Failover is tested by failing it.** An application host and a database host are each removed while
production runs, and the recovery targets for the loss of a host are measured. The database and the service virtual machines are then
failed over to the secondary environment, and the recovery point and recovery time it achieves are
measured, rather than checked by inspection of the configuration. It is rehearsed in pre-commissioning, repeated in
operational acceptance, and tested at least annually thereafter, as described in System Architecture
Section 9.3.

**Deliverables.** Test plans and test scripts, integration test reports, performance test reports,
stress test reports, security test reports and the User Acceptance Test report.

## 4.5 Pre-commissioning tests

The Pre-Commissioning Test Program is submitted to NRB for approval in week 17, and the tests run in
weeks 19 to 26: those of the ICT estate from week 19, and those that need the equipment from week 24. They are performed by the Supplier with the Purchaser's assistance, and their
successful completion is the condition for the Installation Certificate.

| # | Test | Scope | Week | Deliverable |
|---|---|---|---|---|
| 1 | Physical installation verification | Placement and anchoring of the equipment, racks and workstations, cable management and labeling, and safety clearances. Building-level items are verified with the facility works | 24 | Physical Installation Verification Report |
| 2 | Electrical power | Performed under the facility works. The Information System relies on its result | | |
| 3 | Environmental systems | Performed under the facility works. The Information System relies on its result | | |
| 4 | Network infrastructure | LAN and WAN connectivity, redundancy, switch function, throughput, latency, VLANs, DNS and DHCP | 19 | Network Acceptance Report |
| 5 | Cybersecurity and access control | Active Directory integration, role-based access, password policy, firewall rules, anti-malware, endpoint protection, log generation and event monitoring | 19 | Security Readiness Report |
| 6 | Personalization equipment | Hopper loading and feeding, image, text and variable data engraving, alignment and greyscale consistency, and QR encoding | 24 | Equipment Functional Test Report |
| 7 | Mailing system | Envelope feeding and insertion, address printing, sorting and batch processing | 24 | Mailing System Functional Test Report |
| 8 | Software installation and configuration | Operating systems, database, application, license verification, backup configuration and monitoring tools | 19 | Software Readiness Report |
| 9 | NRIS integration | Interface connectivity, secure communication, retrieval of demographic data, photograph and signature, status updates, and invalid record, missing data and communication failure handling | 25 | NRIS Integration Test Report |
| 10 | Data validation and integrity | Field mapping, transformation, character encoding, completeness and duplicate record detection | 25 | Data Integrity Verification Report |
| 11 | Card security features | Laser engraving quality, secondary image, micro text, guilloche, security background, UV features and machine-readable elements | 25 | Card Security Features Verification Report |
| 12 | Quality control system | Automated inspection, defect detection, OCR, barcode and image quality verification | 25 | Quality Assurance Test Report |
| 13 | Backup and recovery | Backup execution, database and configuration restoration, and the disaster recovery procedures, including failover to the secondary environment | 20 | Backup and Recovery Test Report |
| 14 | Production workflow simulation | Record retrieval from NRIS, job generation, personalization, quality inspection, mailing preparation, dispatch generation and status update to NRIS | 25 | Workflow Simulation Report |
| 15 | Pilot production readiness | 500 to 1,000 test cards produced through the actual production process | 26 | Pilot Production Readiness Report |
| 16 | Performance and capacity | Sustained and peak production rates in accepted finished cards, batch processing and mailing throughput | 26 | Capacity and Performance Test Report |

**Pilot production.** The pilot run produces between 500 and 1,000 test cards from records in the
NRIS test environment, through the full process from retrieval to dispatch record and status update.
It is operated by the operators being trained, as described in Section 3.3. It verifies data accuracy,
print and engraving quality, mailing and reporting, and the sample card images required by the
Technical Requirements are submitted again from its production. The cards are not issued, and are
destroyed under dual custody.

**Failure and retest.** A test that fails is corrected and repeated at no cost to the Purchaser, and
any test whose result the correction could affect is repeated with it.

## 4.6 Operational acceptance tests

The operational acceptance tests are performed by the Purchaser with the Supplier's assistance, in
the live production environment, once the Installation Certificate has been issued. Their successful
completion is the condition for the Operational Acceptance Certificate.

**No test is performed for the first time at acceptance.** Each operational acceptance test has
already been rehearsed in pre-commissioning, so that acceptance confirms a known result.

| # | Test | Principal success criteria | Weeks | Rehearsed in |
|---|---|---|---|---|
| 1 | End-to-end workflow | All test records processed end to end without manual intervention, with status in NRIS and a full audit trail | 27 | Pre-commissioning 14 |
| 2 | Sustained production stability | Continuous operation over the defined period, availability of not less than 99 percent, no severity 1 failure | 27 and 28 | Pre-commissioning 16 |
| 3 | Production throughput | Contractual accepted finished cards per hour and mail items per hour achieved, with no backlog | 27 | Pre-commissioning 16 |
| 4 | Peak load | No failure or data loss, response times within thresholds, throughput not less than 95 percent of the nominal capacity, which is the contractual rate in System Architecture Section 3.5 | 27 | Performance testing |
| 5 | Data accuracy and integrity | Not less than 99.99 percent accuracy of data on cards, no mismatch with NRIS, no loss or duplication | 27 | Pre-commissioning 10 |
| 6 | NRIS business process integration | New issuance, reprint, replacement, and lost and damaged card processing, with no failed or orphaned transactions | 27 | Pre-commissioning 9 |
| 7 | Card quality and security | Full compliance with the approved design, security features correctly applied, reject rate not more than 1 percent | 27 | Pre-commissioning 11 and 15 |
| 8 | Mailing and dispatch | Not less than 99.5 percent accuracy in insertion and addressing, correct card-to-envelope-to-recipient matching | 27 | Pre-commissioning 7 and 15 |
| 9 | Audit trail and traceability | Full traceability from NRIS record to dispatch, all user actions and events logged and tamper-proof | 27 | Pre-commissioning 14 |
| 10 | Security operations | Access limited to authorized users, failed logins alerted, no privilege escalation, no critical vulnerability | 27 | Pre-commissioning 5 and penetration testing |
| 11 | Backup, restore and recovery | Backup during live operation and restoration without corruption or significant disruption | 27 | Pre-commissioning 13 |
| 12 | Monitoring and alerting | Alerts for failures, degradation and consumable thresholds received in real time | 27 | Pre-commissioning 8 |
| 13 | Multi-shift operation | Two shifts, handover without disruption, consistent throughput, no dependency on the Supplier | 27 and 28 | Training, Section 3 |
| 14 | Consumables and inventory | Accurate consumption tracking, low stock alerts, no stoppage for want of stock | 27 | Pilot production |
| 15 | Reporting and service levels | Daily, weekly and monthly reports, service level measures calculated correctly, no discrepancy between logs and reports | 27 | Pilot production |
| 16 | Operational independence | NRB staff operate the full system with the Supplier observing only | 28 | Training, Section 3.7 |
| 17 | Final operational acceptance demonstration | Continuous production over the agreed observation period with availability of not less than 99 percent, data accuracy not less than 99.99 percent, reject rate not more than 1 percent and mailing accuracy not less than 99.5 percent | 29 and 30 | All of the above |

**How the measures are taken.** Each success criterion is measured the same way throughout, and the
method is agreed with NRB in the operational acceptance test procedures before the tests begin:

| Measure | Basis |
|---|---|
| Throughput | Cards per hour, across the two production lines, over the fourteen hour operating day |
| Reject rate | Cards rejected as a proportion of cards attempted |
| Data accuracy | Data on the produced cards, as read by in-line verification, compared with the NRIS source record |
| Mailing accuracy | Mail pieces correctly matched and addressed, as a proportion of mail pieces produced |
| Availability | Measured with the exclusions set out in System Architecture Section 9.3 |

**The observation period.** The final demonstration is planned on an observation period of ten
working days in weeks 29 and 30, as set out in Section 2.2, with the period agreed at design approval.

## 4.7 Defect management and quality assurance

**Defect classification.** Defects found in testing are classified by their effect on acceptance:

| Class | Definition | Rule |
|---|---|---|
| Critical | Stops a test, corrupts or loses data, produces an incorrect card, or opens a security exposure | Corrected before testing continues |
| Major | Causes a success criterion to be missed, or a required function to fail with no workaround | Corrected before the level exits |
| Minor | A function fails with a workaround that does not affect acceptance | May be carried forward with an agreed correction date |
| Cosmetic | No effect on function or result | Corrected in the next scheduled release |

After Operational Acceptance, faults are handled under the support severities in System Architecture
Section 12.4 rather than under this classification.

**Correction and regression.** Every correction is retested, and the tests its change could affect
are repeated with it. A defect is closed when the retest passes, not when the correction is made.
Every defect is logged with its class, cause, correction and retest result, and the log is delivered
with the test reports.

**Quality gates.** Four contractual points are treated as quality gates, each with entry criteria and
a recorded decision:

| Gate | Week | Entry criteria |
|---|---|---|
| Detailed Design Approval | 6 | All design deliverables complete, reviewed with NRB and consistent with each other |
| Successful factory acceptance | 17 | Factory Acceptance Test report signed, no critical or major defect open |
| Installation Certificate | 26 | All pre-commissioning tests passed and their reports approved |
| Operational Acceptance | 30 | All operational acceptance tests passed, no critical unresolved defect |

**Configuration control.** Every tested build and configuration is versioned, and what passes
acceptance is recorded as the baseline, so that what is deployed is what was tested. Changes after the
baseline pass through the change control described in System Architecture Section 12.1.

**Software quality.** Software developed for this Contract is built under the secure development
lifecycle and release gate described in System Architecture Section 10.5.

**Quality assurance review.** Test reports are reviewed and signed by the Supplier's quality
assurance before they are submitted to NRB.

**Documentation control.** Every deliverable is versioned, reviewed and approved before issue, and
delivered in editable format and as PDF.

**Test deliverables.** Factory Acceptance Test reports, the pre-commissioning reports listed in
Section 4.5, User Acceptance Test reports, test scripts and results, performance test reports, stress
test reports, security test reports, and defect logs with their resolutions.
