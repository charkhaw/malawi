# 3. Training Sub-Plan

## 3.1 Approach and knowledge transfer

Training covers the Information System as supplied: the personalization and mailing equipment, the
application software, the integration with NRIS, and the ICT infrastructure and security components
that support them. Training on the facility systems, including the power, HVAC, fire suppression and
physical security installations, is delivered under the facility works.

The aim is that NRB staff operate, administer and give first-line support to the system without the
Supplier. Operational independence is tested at operational acceptance, and the training is built
backwards from that test: every task a member of NRB staff must perform unaided at acceptance is
taught, practiced and assessed before it.

**Knowledge transfer is a progression, not a course.** Responsibility moves from the Supplier to NRB
in stages, and each stage has a condition that must be met before the next begins.

| Stage | Weeks | Who leads | What NRB staff do | Condition to move on |
|---|---|---|---|---|
| Factory training | 17 | Equipment manufacturer | Technical staff in the factory acceptance delegation learn the equipment where it is built, alongside its engineers | Equipment operation, calibration and first-line maintenance demonstrated at the factory |
| Shadowing | 15 to 26 | Supplier | Technical staff work alongside the engineers installing, configuring and commissioning the system | Participation recorded against each installation activity |
| Formal training | 25 to 28 | Supplier, then NRB trainers under observation | Classroom, laboratory and hands-on training on the deployed system, by role | Each trainee assessed as competent for their role, Section 3.7 |
| Coaching in production | 27 to 28 | NRB staff, coached by the Supplier | NRB staff operate production during the operational acceptance tests, with Supplier engineers beside them | Two shifts run without Supplier intervention |
| Independent operation | 28 onward | NRB staff | NRB staff operate the whole system, with the Supplier observing only | Operational independence demonstrated in operational acceptance test 16 |

**Train the trainer.** NRB designates trainers from among the trainees, and they are certified to
train further staff. User-stream trainers learn their stream as trainees, then deliver it to the cover
group under observation. Technical-stream trainers, who will already have been through factory
training and shadowing, co-deliver the technical training alongside the Supplier's trainers. Each is
certified on the observed delivery. A trainer who has taught a class under observation has shown the
thing certification is meant to establish.

## 3.2 Recommended trainees and prerequisites

The numbers below are derived from how the facility runs: two personalization lines and two mailing
lines, operated across two shifts of seven hours. They state the minimum needed to operate, and the
number recommended for training so that every role has cover.

**User training.**

| Role | Posts per shift | Minimum to operate two shifts | Recommended to train |
|---|---|---|---|
| Card personalization operator | 2, one per line | 4 | 6 |
| Mailing and dispatch officer | 2, one per line | 4 | 6 |
| Quality assurance staff | 1 | 2 | 3 |
| Card issuance officer, including blank card stock | 1 | 2 | 3 |
| Supervisor | 1 | 2 | 3 |
| Helpdesk and frontline support | 1 | 2 | 3 |
| **Total** | **8** | **16** | **24** |

Three people are trained for every post that is staffed on both shifts: one for each shift, and one
to cover leave, sickness and rotation. The supervisor and the card issuance officer on each shift are
also the two custodians needed for the secure destruction of rejected cards, so both shifts can close
out their own rejects.

**Technical training.**

| Role | Minimum | Recommended to train |
|---|---|---|
| System administrator | 2 | 3 |
| Database administrator | 1 | 2 |
| Network engineer | 1 | 2 |
| Security engineer | 2 | 3 |
| Infrastructure engineer | 1 | 2 |
| Technical support, equipment first-line maintenance | 2, one per shift | 3 |
| **Total** | **9** | **15** |

No technical role is held by one trained person. A system that one person knows how to administer
stops being administrable when that person is on leave.

**Management training.** Nine participants are recommended: two from executive leadership, two
operations managers, and one each of ICT, security and facility management, with two from audit and
compliance.

**Trainers.** Six trainers are recommended for certification, drawn from the trainees above rather
than in addition to them: four from the user stream, one for each of personalization, mailing and
dispatch, quality and issuance, and supervision and helpdesk; and two from the technical stream.

**Prerequisites.**

| Role | Prerequisite |
|---|---|
| All user roles | Secondary education, basic computer literacy, the ability to work to written procedures, and clearance to the Purchaser's standard for access to citizen data and secure card stock |
| Supervisor | As above, with supervisory experience |
| Helpdesk and frontline support | As above, with experience of desktop support |
| System administrator | Degree or diploma in information technology, with Windows Server administration experience |
| Database administrator | Degree or diploma in information technology, with SQL Server administration experience |
| Network engineer | Degree or diploma in information technology or engineering, with network experience at the level of Cisco CCNA |
| Security engineer | Degree or diploma in information technology or information security, with experience of security monitoring |
| Infrastructure engineer | Degree or diploma in information technology or engineering, with server, storage and virtualization experience |
| Technical support, equipment | Technician qualification in electrical, electronic or mechanical engineering |
| Trainers | The prerequisites of their stream, with experience of instructing others |

## 3.3 User training

**Participants.** Card personalization operators, card issuance officers, quality assurance staff,
mailing and dispatch officers, helpdesk and frontline support staff, and supervisors.

**Curriculum.** Training is role-based. Every trainee takes the common modules, and each role takes
the modules its work requires. **O** operator, **M** mailing and dispatch, **Q** quality assurance,
**I** card issuance, **S** supervisor, **H** helpdesk.

| Module | Content | Days | Roles |
|---|---|---|---|
| System overview | The path of a card from the NRIS request to dispatch, the part each role plays in it, and what each console does | 0.5 | All |
| Card personalization operations | Loading blank stock, assigning jobs to a line, monitoring production, reject handling and in-job reproduction, assisting calibration, emergency stops | 2 | O, S |
| Mailing system operations | Loading carriers and envelopes, card-to-carrier matching, reject magazines, dispatch batching by ordering office, dispatch records | 2 | M, S |
| Card issuance workflow | Releasing batches, reprint and replacement requests, records held at validation, the exception queue | 1 | I, S |
| Quality assurance procedures | Reading verification results, inspecting security features, reject decisions, reject trends by cause | 1 | Q, O |
| Routine operations | Daily start-up and shut-down, consumables, shift handover, blank card issue and return, end-of-shift reconciliation, secure destruction under dual custody | 1 | All |
| Security and compliance | Handling citizen data, access rules, secure stock, what must be reported and to whom | 0.5 | All |
| Reporting | Production, issuance, rejection and service level reports and dashboards | 0.5 | S, I, Q, H |
| Helpdesk and first-line support | Logging incidents, assigning severity, first-line checks, escalation to the Supplier | 1 | H |
| Scenarios and supervised production | Simulated faults and exceptions: a card that cannot be matched, a stock discrepancy, a cancellation arriving mid-job, a line stopping mid-batch. Then pilot production, run by the trainees under supervision | 2 | All |

An operator's path is seven days, and a supervisor's, the longest, is nine and a half, within the two
weeks allowed.

**Pilot production is run by the trainees.** The pilot run in week 26 is operated by the operators
being trained, under supervision. The first cards the lines produce for the record are produced by
the people who will operate them, and pilot production doubles as their practical assessment.

**Mode.** Classroom-based theoretical training, hands-on practical training on the deployed system,
live production environment demonstrations, scenario-based simulations, and on-the-job operational
coaching through operational acceptance.

**Materials.** User manuals, Standard Operating Procedures, quick reference guides for each console,
presentation slides, practical exercise manuals, video tutorials for the equipment tasks that are
easier shown than described, assessment tests, attendance registers and training reports. All are in
English, and delivered in editable electronic format and as PDF.

## 3.4 Technical training

**Participants.** System administrators, database administrators, network engineers, security
engineers, infrastructure engineers and technical support staff.

**Curriculum.** **SA** system administrator, **DB** database administrator, **NE** network engineer,
**SE** security engineer, **IE** infrastructure engineer, **TS** technical support.

| Module | Content | Days | Roles |
|---|---|---|---|
| System architecture | Components, network zones, data flows, high availability and the secondary environment | 1 | All |
| Hardware administration | Virtualization hosts, the storage array, hardware security modules, workstations, and first-line maintenance of the personalization and mailing equipment | 1 | IE, TS |
| Software administration | Application services, configuration, releases and change control | 1 | SA, TS |
| Database administration | SQL Server administration, replication to the secondary environment, backup, restore and point in time recovery | 2 | DB |
| Network and infrastructure | Zones and VLANs, firewall policy, the Government Wide Area Network links, the storage network, the Hyper-V clusters, the standalone host at the secondary site and the storage array | 2 | NE, IE, SE |
| Security administration | Access control and privileged access, hardware security module operation and key lifecycle, security monitoring, Security Operations Center procedures, incident handling | 2 | SE, SA |
| Integration and APIs | The NRIS interface and its Interface Control Documents, monitoring exchanges, exceptions and retries | 1 | SA, DB |
| Troubleshooting and support | Diagnostics, log analysis, event correlation, escalation, and fault simulations on the training environment | 2 | All |
| Performance monitoring | Dashboards, capacity tracking, alert thresholds | 0.5 | SA, IE, NE |
| Backup, recovery and failover | Restoration drills on the training environment, and the failover procedures for the cluster and the secondary environment | 1 | SA, DB, IE |

Specialists take the depth of their own field, and the system administrator takes what is needed to
oversee the rest. The longest path, the system administrator's, is eight and a half days, within the
two weeks allowed.

**Equipment training at the factory.** Technical support staff and infrastructure engineers in the
factory acceptance delegation are trained by the equipment manufacturer on equipment operation,
calibration, preventive maintenance and first-line repair during the factory acceptance visit in week
17. Travel and boarding for the delegation are borne by the Government of Malawi under the Contract.

**Fault simulation is taught on the real platform.** Faults are induced in the training environment,
which runs the same software and versions as production: a service stopped, a certificate near
expiry, an NRIS exchange failing and retrying. The loss of a host and a database failover are
performed for real in the failover tests before commissioning, which technical trainees attend while
shadowing. Administrators who have only read a
recovery procedure meet the fault for the first time in production. Administrators who have performed
it meet it for the second time.

**Mode.** Advanced classroom technical training, hands-on laboratory sessions, equipment training by
the manufacturer, practical troubleshooting workshops, live administration sessions on the production
system for critical technical staff, shadow support during installation and commissioning, and
knowledge transfer sessions.

**Materials.** Technical manuals, administration guides, installation manuals, configuration guides,
as-built documentation, network diagrams, troubleshooting manuals, maintenance procedures, laboratory
exercise guides and configuration backup templates, in editable electronic format and as PDF.

## 3.5 Management training

**Participants.** Executive leadership, operations managers, ICT managers, security managers,
facility managers, and audit and compliance personnel.

**Curriculum.** Management training concerns oversight, governance and sustainability rather than
operation.

| Module | Content |
|---|---|
| Solution overview | What the facility produces, how, and where its limits are |
| Governance and operations | Roles, separation of duties, approvals and change control |
| Security and compliance | Data protection obligations, custody of the signing key, incident reporting obligations |
| Performance and reporting | Production, quality and service level dashboards, and what each measure means |
| Business continuity | Failover and recovery, what the secondary environment covers and what it does not, and who decides |
| Maintenance and lifecycle | Warranty and post-warranty support, spare parts, releases, and renewal of the Document Signer certificate |
| Audit and compliance | Audit trails, stock reconciliation, destruction certificates, and how each is inspected |

**Mode and duration.** A half-day executive briefing with presentations, and two days of strategy
sessions, workshops and facilitated sessions for managers. Executive sessions may be held virtually where appropriate.

**Materials.** Executive briefing materials, governance manuals, operational dashboards, service
level templates, risk management documentation, business continuity documentation and strategic
operational guides.

## 3.6 Schedule, location and training environment

**Schedule.**

| Week | Activity |
|---|---|
| 2 | Recommended trainee numbers and prerequisites issued to NRB |
| 15 | Technical trainee nominations received from NRB |
| 15 to 26 | Technical staff shadow installation and commissioning, from the start of the ICT installation |
| 17 | Equipment training for the factory acceptance delegation |
| 20 | User trainee nominations received from NRB |
| 25 and 26 | User training, groups one and two, one for each shift, run in parallel. NRB user-stream trainers train in these groups |
| 26 | Pilot production run by the trainees under supervision |
| 26 | Management training |
| 26 and 27 | Technical training, with NRB technical trainers co-delivering |
| 27 and 28 | User training, cover group, delivered by NRB trainers under observation |
| 28 | Operational independence, operational acceptance test 16 |

The order is deliberate. Operators are trained first, so that the two shifts can run the sustained
production test from week 27 and NRB staff can demonstrate independence in week 28, before the final
acceptance demonstration in weeks 29 and 30 described in Section 2.2.

**Location.**

| Training | Location |
|---|---|
| User classroom sessions | The training facilities provided by the Government of Malawi, or on site at the Card Production Facility |
| User hands-on training | On the deployed system at the Card Production Facility |
| Technical classroom and laboratory | On site, using the training environment |
| Live administration sessions | On the production system, for critical technical staff |
| Equipment training | At the equipment manufacturer's facility during factory acceptance, and on site |
| Management training | At NRB headquarters, on site, or at executive conference facilities, and virtually where appropriate |

**Training environment.** A dedicated training environment runs as isolated virtual machines on the
platform described in System Architecture Section 9.1, on its own network segment, with the same
software and versions as production. It holds
masked data rather than citizen records, as described in System Architecture Section 10.2, so
trainees can practice on realistic records, and faults can be induced, without either touching real
citizen data.

**Training cards are accounted for.** Cards used in hands-on training are issued from controlled stock
against their serial numbers and destroyed under dual custody, as described in System Architecture
Section 6.10, so training leaves the stock reconciliation as complete as production does.

## 3.7 Assessment, certification and operational independence

**Assessment.** Every trainee is assessed on the tasks their role performs, not only on what they
remember.

| Assessment | Method | Standard |
|---|---|---|
| Knowledge | Written test at the end of each stream | Pass mark of 70 percent |
| Competence | Each task in the role's competence list performed unaided on the deployed system | Every task passed |
| Trainer | Delivery under observation: the cover group for user-stream trainers, technical sessions for technical-stream trainers | Delivered to the standard of the Supplier's own trainers |

A trainee who does not pass is retrained on the tasks concerned and assessed again.

**Competence matrix.** For every trainee, the tasks of their role are recorded as assessed competent,
with the date and the assessor. The matrix is handed to NRB with the training reports, so the
Purchaser knows before operational acceptance which of its staff can perform which task, and where
cover is thin.

**Certificates.** Each trainee assessed competent receives a certificate of competence for their role.
Each trainer who passes the observed session receives a trainer certificate for their stream.

**Records.** Attendance registers are kept for every session, and a training report is issued for
every course, with attendance, assessment results and any retraining, in editable format and as PDF.

**Operational independence is the final test of the training.** Two operational acceptance tests
measure whether it worked:

| Test | What it requires of NRB staff |
|---|---|
| 13, multi-shift operation | Two shifts run production with consistent throughput, shift handover completes without disruption, and nothing depends on the Supplier being present |
| 16, operational independence | NRB staff operate the full system, perform every routine task and handle minor faults, with the Supplier observing only, and the operational manuals prove usable |

The training is judged by those results rather than by the courses delivered. Where either test shows
a gap, the tasks concerned are retrained and the test is repeated.

## 3.8 Supplier trainers and sample materials

**Supplier trainers.** Training is delivered by members of the Supplier's technical team, each
teaching the field they install and support, and by the equipment manufacturer's certified trainers
for the equipment. Each holds at least the qualifications below, and their curricula vitae and
certificates are provided with the key personnel.

| Trainer | Delivers | Qualification and experience |
|---|---|---|
| Training and Change Management Specialist | Leads the program: training needs, curricula, train the trainer, assessment and certification, and the management workshops | Degree in ICT, education or human resource development; trainer certification and change management certification; at least five years delivering ICT training to government staff, operators and technical administrators |
| Equipment manufacturer's certified trainers | Equipment operation, calibration, preventive maintenance and first-line repair, at the factory and on site | Certified by the manufacturer to train on the personalization and mailing systems supplied |
| Secure Personalization System Engineer | Card personalization operations, reject handling and calibration | Bachelor's degree in computer, electronics or mechatronics engineering; at least five years on large-scale polycarbonate card personalization and laser engraving; manufacturer certification on the personalization system supplied |
| Card Mailing System Engineer | Mailing system operations and dispatch | Bachelor's degree in IT, computer, electronics or mechatronics engineering; at least five years on ID card mailing and dispatch systems |
| ID Card Security Specialist | Quality assurance procedures and the inspection of card security features | Degree or diploma in computer science or information security; ACE-M and PKI certifications; at least five years implementing multilayer polycarbonate card security |
| Card Production Facility Infrastructure Engineer | Hardware administration, the clusters and the storage array, database administration, backup, recovery and failover | Degree in computer engineering, IT or electrical engineering; Cisco CCNA or CCNP and relevant manufacturer certifications; at least five years in data center and high availability systems |
| Network Engineer | Zones and VLANs, firewall policy and the wide area network links | Degree or diploma in computer science, network engineering or telecommunications; CCNA and CCNP; at least five years on VLANs, firewalls and secure government networks |
| Cybersecurity and PKI Specialist | Security administration, hardware security module operation and key lifecycle, security monitoring and incident handling | Degree in cybersecurity, computer science or information security; CISSP, CISM and CEH; at least seven years in cybersecurity, including three in identity management or PKI |
| Software Integration Specialist | Software administration, the NRIS interface, integration and APIs | Degree in computer science, software engineering or information systems; certifications in APIs, middleware and web services; at least five years in enterprise systems integration |

**Sample module outline.** Every module is prepared to the same pattern. Card personalization
operations, the two-day module for operators and supervisors in Section 3.3, is set out below as it
is delivered.

| Session | Content | Practical exercise on the deployed system |
|---|---|---|
| Day 1, morning | The personalization line: feeder, laser stations, verification, reject module and stacker; emergency stops and safe working; the Printer Controller Admin console | Walk the line at rest, locate every emergency stop, and identify each module and its status on the console |
| Day 1, afternoon | Blank card stock: issue against serial numbers, loading the feeder, returning unused blanks; selecting a prepared batch and assigning it to a line | Issue blanks to a training job, load them, assign the job to a line and start it |
| Day 2, morning | Monitoring production: batch progress, line status and reject reasons; a laser station taken out of service mid-batch; assisting calibration | Take a station out of service during a run and confirm production continues on the others; read the calibration log |
| Day 2, afternoon | Rejects and reconciliation: in-job reproduction, quarantine of rejected cards, closing a batch against its reconciliation; shift handover | Resolve a seeded reject, close the batch with every blank accounted for, and hand over to the next shift |

At the end of the module the trainee performs each task in the operator's competence list on the
deployed system without help.

**Sample competence record.** The record kept for each trainee, shown for the card personalization
operator:

| Task | Standard |
|---|---|
| Issue blank cards to a job and load the feeder | Every blank issued against its serial number, and the count agrees with the job |
| Assign a prepared batch to a line and start production | Correct batch on the correct line, started without assistance |
| Respond to a laser station out of service | Production continues on the remaining stations, and the event is reported to the supervisor |
| Handle a rejected card | Card quarantined against its serial number, and its reproduction confirmed within the job |
| Close a batch | Closed only with every blank accounted for, and any discrepancy raised |
| Stop the line safely | Emergency stop reached and operated from the working position, and the restart follows the procedure |
| Hand over the shift | Handover record complete, and open issues passed on |

For each task the record holds the assessor, the date and the result, competent or retrain, and it
feeds the competence matrix described in Section 3.7.
