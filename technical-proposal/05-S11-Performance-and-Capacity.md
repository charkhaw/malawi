# 11. Performance and Capacity

## 11.1 Production capacity

| Measure | Performance |
|---|---|
| Combined personalization output | Not less than 2,000 cards per hour across two machines |
| Output per personalization line | Not less than 1,000 cards per hour |
| Combined mailing output | Not less than 2,000 completed mailers per hour across two machines, measured on single-card mailers |
| Output per mailing line | Not less than 1,000 completed mailers per hour |
| Operating window | Two shifts of seven hours, fourteen hours per day |
| Daily output | 28,000 cards and 28,000 envelopes |
| Batch size | 500 to 1,000 cards per batch |
| Sustained operation | Continuous 24/7 capability during peak issuance periods, with no degradation over sustained production cycles of at least 8 to 12 hours |

**Simultaneous multi-line operation.** Both personalization lines and both mailing lines run
concurrently on the same job or on different jobs. Capacity is the sum of the lines available rather
than the capacity of a single line with a standby.

**Rejection handling does not stop the flow.** Rejected cards are detected, recorded and reproduced
within the originating job without halting production, so the reject rate reduces neither the
continuity of the run nor the completeness of the job.

**Zero backlog under peak load.** The mailing capacity matches the personalization capacity line for
line, and buffer modules absorb short interruptions. Personalized cards therefore do not accumulate
ahead of the mailing lines during a sustained run.

**Capacity beyond the daily figure.** The equipment is rated for continuous duty. The fourteen hour
window produces the required daily volume, and the window can be extended during peak issuance
without exceeding the equipment rating. Capacity is therefore bounded by operating hours rather than
by the machines.

## 11.2 System response times

| Operation | Target |
|---|---|
| User interface response, standard queries | 2 seconds or less |
| Transaction processing initiation | 3 seconds or less |
| Card personalization job submission | 5 seconds or less |
| Search and retrieval | 3 seconds or less |
| Standard report generation | 10 seconds or less |
| Complex report generation | 60 seconds or less |
| Batch job initiation | 30 seconds or less |
| Real-time validation of identity records | 2 to 5 seconds |
| Card encoding initiation | Near real time |
| Database transaction commit, normal load | 2 seconds or less |
| Failover initiation | 60 seconds or less, automatic |
| Full service recovery | 5 to 15 minutes |
| Data synchronization lag, primary to secondary | Near real time, not more than 5 minutes |

These are targets under production load rather than on an idle system. Section 11.6 describes how
each is verified.

**Where response time matters operationally.** An operator releasing a batch and a supervisor
answering a query about one citizen are both waiting at a counter or a machine. A report that takes
sixty seconds is read once; an interface that takes five seconds is used several hundred times a
shift, and the difference compounds into production time.

## 11.3 Concurrent users

| Measure | Capacity |
|---|---|
| Minimum concurrent users | 10 to 20 |
| Scalable capacity without degradation | Up to 100 concurrent users |

The following categories are supported concurrently:

| Category | Typical activity |
|---|---|
| Card operators | Running production jobs at the lines |
| Supervisors | Releasing work, monitoring progress, handling exceptions |
| System administrators | Configuration, user administration, maintenance |
| Quality assurance personnel | Reviewing verification outcomes and reject trends |
| Security auditors | Reviewing audit trails and access records |
| Management | Reporting and analytics |
| External integration users | Programmatic consumers of the interfaces |

**Session handling.** Concurrent sessions per role are configurable, session timeouts are configurable
per role, and application traffic is load balanced across the two active application servers
described in Section 9.1.

The platform is sized for a hundred concurrent users from Operational Acceptance, as set out in
Section 9.1, and is stress tested to that figure under Section 11.6. Capacity beyond it is added to
the cluster rather than by changing the architecture.

## 11.4 Data volumes, growth and retention

| Measure | Capacity |
|---|---|
| Identity record scale supported | 10 million to 50 million records |
| Transaction volume | 1 million to 10 million transactions per month |
| Peak transaction volume | 100,000 or more transactions per day during issuance campaigns |
| Data retention | 10 to 15 years |
| Annual data growth | 15 percent, accommodated without redesign |
| Audit and log retention | 5 to 10 years |
| Log volume | Millions of entries per day, stored and queryable |

**Scale supported against data held.** The platform is sized and licensed to operate at national
register scale. What it retains is production and audit data, with NRIS remaining the system of
record for citizen identity data. The distinction is deliberate: the system must perform at the scale
of the national population it serves, without becoming a second standing copy of the register.

**Growth.** Capacity is added without replacing the platform: horizontally, by adding application
server instances to the load balancing described in Section 9.1, and for the database by extending
the processor, memory and storage allocated to the clustered database. A 15 percent annual growth
rate compounds to roughly double the volume within five years, which a platform sized only for the
volume at go-live would not absorb.

**Transaction types.** Each of the following is processed as a transaction recorded against the
identity that initiated it and the record it affected, under Section 10.6, and is counted in the
transaction volumes above. The card carries no chip or magnetic stripe, so card encoding is by laser
engraving.

| Type | Transactions |
|---|---|
| Card personalization | Card encoding by laser engraving, card printing, and re-issuance and reprint, under Sections 6.2 and 7.12 |
| Mailing and dispatch | Envelope generation, card-to-envelope matching, dispatch confirmation, tracking reference generation and delivery status updates, under Sections 5.3, 5.4, 8.1, 8.3 and 8.6 |
| Administrative | User creation and role assignment, configuration updates, audit log queries, report generation requests and security event handling, under Sections 6.11, 6.12, 10.6 and 10.7 |

**Archival and compression.** Audit and log data is compressed and archived on a defined schedule,
and remains queryable after archival. Retention periods are enforced by policy in the platform rather
than by operator action, and records reaching the end of their retention are deleted under the
secure deletion procedures in Section 10.2.

## 11.5 Performance under peak and failover conditions

Performance is guaranteed under the following conditions rather than only under normal load:

| Condition | Position |
|---|---|
| Peak load | The throughput and response targets hold at peak issuance volumes |
| Mixed workload | Concurrent production, reporting and administrative activity |
| Concurrent batch and real-time processing | Batch preparation runs alongside real-time status exchange without either being starved |
| Failover and disaster recovery mode | On the loss of a host, the other host of its cluster carries that cluster's production workload at full performance, as described in Section 9.1. On failover to the secondary environment, the data and application services continue within the recovery targets in Section 9.3, and card production resumes when the production platform at the Card Production Facility is restored |
| Maintenance windows | Minimal downtime: the paired hosts, application servers, database nodes, storage controllers, firewalls and core switches are maintained one at a time while the other of each pair carries the load, and maintenance is scheduled outside the production window where possible |

**Availability.** Not less than 99 percent, measured as described in Section 9.3.

**Concurrent batch and real-time work is the condition that usually breaks.** Batch preparation is
throughput-bound and status exchange is latency-bound, and a platform that treats them alike will
serve one badly. They are separated by workload so that a large batch preparing does not delay a
status update NRIS is waiting on.

## 11.6 Performance validation

Performance is demonstrated rather than asserted. Each figure above is verified before Operational
Acceptance.

| Test | Verifies |
|---|---|
| Throughput benchmark at factory and site acceptance testing | The production and mailing rates in Section 11.1 |
| Load testing | The response time thresholds in Section 11.2, under production load |
| Stress testing | Concurrent user capacity in Section 11.3, to the scalable figure and beyond it to the point of degradation |
| Transaction integrity testing | That no transaction is lost or duplicated at peak volume |
| Sustained operation test | That no critical degradation occurs across a continuous production run |
| Failover test | The failover and recovery targets, by inducing failure rather than by inspection |

**Acceptance is conditional on these results.** The system is accepted only if all throughput
benchmarks are achieved, response thresholds are verified under load, concurrent user capacity is
validated by stress testing, transaction integrity is maintained at peak, and no critical performance
degradation is observed over sustained operation.

**Monitoring continues after acceptance.** Real-time performance dashboards, service level monitoring,
throughput analytics, bottleneck detection, automated performance reporting and historical trend
analysis are provided under Section 12.2, so that performance is a continuously observed property
rather than a condition demonstrated once at handover.
