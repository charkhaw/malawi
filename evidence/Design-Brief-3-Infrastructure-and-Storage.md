# Design Brief: Infrastructure, Storage and Virtualization

**Project:** National ID card production facility, Malawi. We supply, install and commission a turnkey
card personalization and mailing facility, including all supporting ICT infrastructure.

**What we need from you:** validate the design below, correct what is wrong, and give us a bill of
materials we can price. The platform decision is made. The sizing is not.

**Timing:** the tender closes 13 October 2026. There will be no further extension.

---

## 1. What the RFP requires

It never names a single piece of technology. No servers, no virtual machines, no storage products,
no vendors, no brands. What it does is set outcomes, and those outcomes are contractual. Missing any
one of them makes the bid non-compliant, and non-compliance cannot be cured after submission.

**It must not stop.** Availability of at least **99%**, measured across the three-year warranty and
the three-year post-warranty period. Scheduled maintenance, customer-side outages and external power
or network failures are excluded, and nothing else is.

**It must recover by itself.** Failover must start **automatically within 60 seconds**, and full
service must be back within **5 to 15 minutes**. No human in the loop. That single requirement is
what rules out any design where recovery means restoring from backup.

**There must be a live second copy in another city.** A replica at the customer's existing data
center in Blantyre, **no more than 5 minutes behind** the primary. We deploy into their facility; we
do not build it.

**Backups must survive an attacker with administrator rights.** The RFP requires **immutable backup
storage** explicitly, as anti-ransomware protection, alongside encrypted backups, offsite
replication, integrity validation and annual recovery testing.

**The network must be compartmented.** Six named zones: External Integration, DMZ, Application,
Database, Machine Control, Management and Monitoring. VLAN segmentation and firewall isolation
between them. All six are mandatory even where one carries no service.

**Everything encrypted.** AES-256 at rest, TLS 1.2 or higher in transit, and personal data masked in
every non-production environment. Citizen data must never be stored or processed outside Malawi.

**It must be self-contained.** The customer's latest clarification: *"The solution must be completely
net-new and self-contained. No existing NRB resources within the data center can be utilized or
shared."* That includes the network at the DR site, so the firewall and switch there are ours. The
same clarification treats every "recommended" or "preferred" item as a strict baseline, which is why
immutable backups and next generation firewalls are not optional.

**Anything whose failure stops production needs a spare on site.** At least one replacement unit for
every critical single point of failure, plus three months of wear parts, with critical spares
replenished within 48 to 72 hours of use. This one shapes the architecture more than it looks: if
your design creates a single point of failure, it also creates a procurement obligation.

**Clause references**, so you can check rather than take our word:

| Subject | Clause |
|---|---|
| Enterprise-grade, redundant, mission-critical hardware architecture | 1.3.1.2.1 |
| Clustering, automated failover, load balancing, point-in-time recovery | 1.3.1.1.2.7 |
| 60-second failover, 5 to 15 minute recovery, 5-minute replication lag | 1.5.2.2.3 |
| Enterprise database: ACID, clustering, HA, replication, encryption at rest | 1.3.1.1.2.4.1 |
| Six network zones | 1.3.1.3.1 |
| VLAN segmentation, firewall isolation, encrypted communications | 1.3.1.3.2 |
| Backup: automated, full/incremental/differential, encrypted, validated, offsite, immutable | 1.4.1.6 |
| AES-256, TLS 1.2+, data masking | 1.6.3 |
| Hardened OS to CIS benchmarks, EDR, IPS, NGFW, SIEM | 1.6.6 |
| DR testing annually, ransomware recovery, immutable backups | 1.6.10 |
| 220V ±20V / 50Hz ±2Hz, British Standard plugs, 18-27°C, 40-60% rH, ≤80 dB, FCC Class B or EN 55022 and EN 50082-1 | 3.0 |
| Availability 99%, spare parts obligation | Clarification responses |
| Net-new and self-contained, no customer resources; "preferred" items as baselines | Clarification responses, Queries 005 |

## 2. The workload

Smaller than the requirements list suggests. This is not a compute-heavy system.

| Driver | Figure |
|---|---|
| Card production | 2,000 cards per hour across two lines, 28,000 per day |
| Operating window | Two shifts of seven hours, fourteen hours per day |
| Concurrent users | 10 to 20 minimum, scalable to **100 without degradation** |
| Identity record scale | **10 to 50 million** records |
| Transactions | 1 to 10 million per month, peaks above 100,000 per day |
| Retention | **10 to 15 years**, 15% annual growth |
| Audit and log volume | Millions of entries per day, retained 5 to 10 years, compressed |

2,000 cards an hour is roughly one card every two seconds. The demanding characteristics are
redundancy, retention and audit volume, not throughput.

**Our storage derivation, for you to check rather than accept.** Portraits, signatures and biometric
data are held only while a card is in production, so the retained record is about 5 KB per card,
roughly 0.25 TB at the 50 million record ceiling. Roughly 4 TB of compressed audit and log data over
ten years. Roughly 1 TB of telemetry and working space. About **6 TB derived**, which we have
provisioned at **not less than 20 TB usable** to absorb several years of 15% annual growth.

The system holds production and audit data only. The national identity register stays with the
customer's own system; we retrieve per batch and do not retain long term.

## 3. What we're proposing

**Hyperconverged, on Microsoft Hyper-V with Storage Spaces Direct.** Two servers at the primary
site. No separate storage array. The disks live inside the servers, and Storage Spaces Direct pools
and mirrors them across both, so every block exists on both machines.

**Why two servers.** Either server must carry the whole production workload on its own, so the loss
of one, or taking one down for patching, leaves production at full capacity. The RFP requires high
availability, not redundancy retained during maintenance, so we do not buy a third. A two-node
cluster needs a witness: a file share on the backup storage or a switch-hosted witness, never a cloud
witness, because nothing may depend on connectivity outside Malawi.

**How failover works, and why the storage choice is the same decision.** A virtual machine's disk
image never lives on the host running it. The host contributes CPU and memory only. When a host
fails, the survivor detects it and restarts its virtual machines on itself, from the same images,
which it can still read because the data was mirrored to it. Thirty to sixty seconds,
nobody involved, nothing restored. That is how the 60-second requirement is met, and it only works
because of how the storage is built.

**Roughly fifteen production virtual machines**, spread across the two hosts and placed into the six
network zones:

| Virtual machine | Instances | Zone |
|---|---|---|
| Integration gateway, the interface to the customer's identity system | 2 | External Integration |
| Load distribution | 2 | Application |
| Application servers, card management, data preparation, quality control, stock control | 2 | Application |
| Signing service | 1 | Application |
| Mailing and dispatch management | 1 | Application |
| Printer control, one per production line | 2 | Machine Control |
| Reporting and analytics | 1 | Management and Monitoring |
| Management, administration, time source | 1 | Management and Monitoring |
| Security monitoring, SIEM and log aggregation | 2 | Management and Monitoring |
| Backup management | 1 | Management and Monitoring |

The **signing service is deliberately alone** on its own instance. It is the only component permitted
to hold credentials to the hardware security modules, and we state that explicitly in the proposal,
so it cannot share a machine with anything else.

**Database: SQL Server Standard**, virtualized rather than on dedicated physical nodes, as a two-node
failover cluster with a log-shipped copy at Blantyre. See question 5.4.

**Non-production:** development, training and user acceptance testing run as virtual machines on the
same two hosts, on their own segment behind the firewalls, with masked data only. They are the first
workloads stopped when a host is lost.

**Also at the primary site:** immutable backup storage of not less than 40 TB usable, a server or an
appliance, whichever you judge cheaper, provided no administrator can override the retention;
two core switches; two access switches carrying the Machine Control Zone on physically separate
hardware rather than only a separate VLAN; two next generation firewalls as an HA pair; two hardware
security modules as an HA pair; and ten operator and administrative workstations. The production
machines themselves come with their own industrial control PCs from the equipment manufacturer, so
those are not in your scope.

**Secondary site,** at the customer's Blantyre data center: **one host** with resilient local storage
of not less than 20 TB usable, carrying the secondary copy of the database, which receives log
shipping, and standby copies of the service virtual machines, kept current by Hyper-V Replica and
switched off until a failover. Also immutable backup storage for the offsite copies, and **our own
firewall and switch**. High availability is not required at this site. It must be functional at
operational acceptance, not a cold standby. No production equipment there.


## 4. Why Hyper-V and Storage Spaces Direct rather than vSAN or Nutanix

**We are buying Windows Server Datacenter anyway.** The stack is Microsoft-centric and the database is
SQL Server. Datacenter edition includes Hyper-V, Storage Spaces Direct, and unlimited Windows Server
virtual machines on the licensed host. The storage layer therefore costs nothing additional. vSAN is
a separate license on top of vSphere, and Nutanix is an appliance purchase.

**One support relationship** across operating system, hypervisor, storage and database, rather than
three vendors pointing at each other when something is slow.

**Skills and handover.** We expect to maintain this for six years, and Windows-skilled engineers are
easier to find and retain than VMware or Nutanix specialists, in Malawi and generally.

**We are not claiming it is the better product.** vSAN and Nutanix have more mature tooling and a
more polished operational experience. Our reasoning is that at two nodes and 20 TB, on a Microsoft
stack we are already licensing, the premium buys us capability we would not use. If you disagree,
say so and show the numbers.

**Three things we want you to check before we commit:**

- **Hardware validation.** Storage Spaces Direct is unforgiving about hardware. It needs validated
  configurations, controllers in pass-through mode and drives from a supported list. Getting this
  wrong is the usual way these deployments fail. Tell us exactly what is required.
- **Usable versus raw capacity.** A two-node cluster uses two-way mirroring, so usable capacity is
  roughly half of raw: **20 TB usable means about 40 TB raw**, 20 TB per host. Nested resiliency would
  survive a host and a drive failing together, but leaves roughly a quarter of raw usable. Propose it
  only if you judge the exposure during a host outage too high, and show the cost.
- **Product direction.** Confirm the current support and licensing position for Storage Spaces Direct
  on Windows Server versus the Azure-connected variant, and what that means for a six-year commitment
  with no dependency on cloud connectivity. Citizen data cannot leave Malawi, so any design requiring
  a cloud control plane needs flagging now, not later.

## 5. What we need from you

**5.1 Host specification and count.** Confirm two hosts, each able to run every production virtual
machine alone at full performance, and the non-production environments when both are up. Cores,
memory, local disk.
Note that SQL Server licenses per core, so core count drives cost directly in two places.

**5.2 Storage layout.** Resiliency mode, raw capacity required for 20 TB usable, drive types and
counts per host, and how capacity is expanded later without replacing the platform.

**5.3 Host interconnect.** Every write crosses the network between hosts. Specify the required speed
and link count, whether RDMA is needed, and the switch specification that follows. With two hosts it
can be a direct connection between them rather than through the core switches; tell us which you
recommend. We would rather over-specify this than discover it after installation.

**5.4 SQL Server edition, clustering and licensing.** We propose **SQL Server Standard**, not
Enterprise, because it meets the requirements at roughly a quarter of the cost per core:

- **High availability:** a two-node failover cluster instance, as a guest cluster on the Storage
  Spaces Direct pool using shared virtual disks, with the two nodes on separate hosts.
- **Secondary site:** log shipping to Blantyre at an interval inside five minutes.
- **Encryption at rest:** Transparent Data Encryption, which Standard has had since SQL Server 2019.
- **Licensing:** per virtual core on the active node only, four-core minimum, with Software
  Assurance for license mobility between hosts and for the failover rights that cover the passive
  node and the Blantyre copy.

Confirm three things: that the cluster **initiates failover automatically within 60 seconds** and
restores full service within 15 minutes; that log shipping **holds the five minute lag** over the
Government Wide Area Network; and that the workload fits Standard's limits of 24 cores and a 128 GB
buffer pool. If any of these fails, say so and we move to Enterprise with Always On availability
groups. **We will want the licensing position confirmed in writing by a Microsoft licensing reseller
before we price it.**

**5.5 Backup platform.** It must deliver immutability that an administrator cannot override. Tell us
how you achieve that and with what. Backup storage is needed at both sites, not less than 40 TB
usable each; copies are replicated automatically to the DR storage.

**5.6 Secondary site.** One host, the database replica and Hyper-V Replica for the standby virtual
machines is our outline. Confirm it meets the 5-minute replication lag and the 5 to 15 minute
recovery target, and specify the host and its storage.

**5.7 Network devices.** Specify the firewall and switch for the DR site. Include manufacturer
support and firmware subscriptions for three years on every switch and firewall at both sites: 4
switches and 2 firewalls at the primary site, 1 switch and 1 firewall at the DR site.

**5.8 What we have missed.** Tell us what is wrong above, and what you need to know to firm up
anything you cannot answer yet.

## 6. Constraints on your response

- **Send pricing in a separate note.** The technical submission must contain no price information of
  any kind. Quantities and specifications are necessary and welcome; costs must stay out of that
  document entirely.
- **Malawi delivery.** Lead times, in-country support and spares logistics all matter. Equipment must
  be installed and accepted on a 32-week program, with factory testing at week 17 and installation
  from week 21.
- **Three years of support on everything**, renewable for a further three.
- **Everything runs on premises.** Security information and event management, endpoint detection
  and response management and the backup software must not depend on a cloud service. Security logs
  and endpoint data contain personal data, and citizen data cannot leave Malawi.
- **Every critical single point of failure needs an on-site spare.** If your design creates one, say
  so and tell us what the spare looks like.
