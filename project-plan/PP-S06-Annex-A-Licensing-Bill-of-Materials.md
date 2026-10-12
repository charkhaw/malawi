# Annex A. Licensing Bill of Materials

Every software license and subscription supplied under the Contract is listed below with its license
metric, its quantity and the components it serves. Each is supplied with its entitlement, support and
updates for three years from Operational Acceptance, so no title needs renewing within that period
to remain licensed and supported.

**Software, subscriptions and support.**

| Title | License metric | Quantity | Serves |
|---|---|---|---|
| Windows Server Datacenter | Per physical core, with every core licensed and not fewer than 16 core licenses per host | 144 core licenses: the 2 application hosts at the primary site and the host at the secondary site, each of two 24-core processors | The server operating system and Hyper-V on those hosts, failover clustering of the application hosts, and every Windows Server virtual machine they run, including the domain controllers |
| Windows Server Standard | Per physical core, with every core licensed and not fewer than 16 core licenses per host | 96 core licenses: the 2 database hosts at the primary site, each of two 24-core processors | The server operating system and Hyper-V on the database hosts, failover clustering of the database hosts, and the two database node virtual machines |
| SQL Server Standard | Per virtual core, not fewer than four per virtual machine, with Software Assurance | The virtual cores allocated to the active database node | The production database. The passive node at the primary site and the secondary copy at the secondary site are covered by the failover rights of Software Assurance |
| SQL Server Developer | No license fee, for development and testing | The development, user acceptance testing and training environments | Non-production databases |
| Windows desktop operating system | Per device, supplied with the workstation | 10 | The operator and administrative workstations |
| Endpoint detection and response | Per endpoint | 35: the 5 hosts; 20 virtual machines, being the 16 production and 2 non-production virtual machines at the primary site, and the domain controller and the database copy at the secondary site; and the 10 workstations. The standby copies at the secondary site run only in place of the virtual machines they copy | Endpoint protection and anti-malware |
| Privileged access management | Per privileged user | Every administrator and privileged account | Privileged access issued for a session and a purpose |
| Multi-factor authentication | Per user | Every administrator and operator | Authentication of administrators and operators |
| Vulnerability scanning | Per scanned asset | All hosts, virtual machines, network devices and workstations | Scheduled vulnerability scanning and compliance reporting |
| Monitoring, log aggregation and security information and event management: MDR / MSOC | Subscription, by monitored node and event volume | All infrastructure and application sources, and the full event volume of the estate | Monitoring, alerting, ticket generation and log aggregation, and the collection and correlation of security events across all sources for the Security Operations Center |
| Bulk SMS service | Per message, in a three-year bundle | The alert volume of the estate over three years | Delivery of alerts by SMS to the NRB staff designated for each type of alert |
| Backup and recovery, Veeam Backup & Replication | Per protected workload | 16, the production virtual machines at the primary site, with configuration and audit logs, replicated to the secondary site | Scheduled backup, immutable retention and restoration |
| Next generation firewall security subscriptions | Per appliance | 3: the high availability pair at the primary site and the firewall at the secondary site | Intrusion prevention signatures and threat updates |
| Storage array and network device support and firmware | Per device | The storage array, 5 switches and 2 firewalls at the primary site, and 1 switch and 1 firewall at the secondary site | Manufacturer support, replacement and firmware updates |
| Hardware security module support and client software | Per module | 2, one at each site | Firmware updates, and the client software through which the Signing Service reaches the modules |

The application hosts and the secondary host carry Windows Server Datacenter, because the edition
licenses an unlimited number of Windows Server virtual machines on the host it covers: either
application host runs every production virtual machine of the application cluster when the other is
lost, together with the non-production environments, and the secondary host runs the ten virtual
machines of the secondary environment. The database hosts carry Windows Server Standard, which
licenses two Windows Server virtual machines on each fully licensed host: each database host runs one
database node, and either can run both when the other is lost.

**Equipment software**, supplied by the equipment manufacturer:

| Title | License metric | Quantity | Serves |
|---|---|---|---|
| Personalization control software | Per machine | 2 | Operation and marking control of the laser personalization systems |
| Mailing system control software | Per machine | 2 | Operation of the mailing and dispatch systems |
| Calibration and diagnostic software | Per machine | 4 | Laser calibration, and diagnostics for all four machines |
| Card layout template editor | Per installation | 1 | Card layout design on the workstation in the controlled design area |

**Application software.** The application services are custom software developed under the Contract:
the Card Personalization Management System, Data Preparation Service, Signing Service, Printer
Control Service, Quality Control Management, Mailing and Dispatch Management System, Stock Control
and Card Accountability, Monitoring, Reporting and Analytics, and Administration and Access Control.
The Purchaser holds the rights in them that the Contract grants in custom materials, and no license
fee or subscription is needed to continue using them.

**Components with no license fee.** Open source components, including libraries, middleware and any
software used for message queuing, are identified in the software inventory
together with their license terms, as described in System Architecture Section 6.14.

**Mapping of licenses to functional components.**

| Functional component | Licenses it depends on |
|---|---|
| Card Personalization Management System | Windows Server Datacenter, SQL Server |
| Data Preparation Service and the NRIS interface | Windows Server Datacenter, SQL Server |
| Signing Service | Windows Server Datacenter, hardware security module client software |
| Printer Control Service | Windows Server Datacenter, personalization control software |
| Laser Personalization Control Software | Personalization control software, calibration and diagnostic software, card layout template editor |
| Quality Control Management | Windows Server Datacenter, SQL Server |
| Mailing and Dispatch Management System | Windows Server Datacenter, SQL Server, mailing system control software |
| Stock Control and Card Accountability | Windows Server Datacenter, SQL Server |
| Monitoring, Reporting and Analytics | Windows Server Datacenter, SQL Server, monitoring and log aggregation (MDR / MSOC), bulk SMS service |
| Administration and Access Control | Windows Server Datacenter, multi-factor authentication, privileged access management |
| Security monitoring and the Security Operations Center | Monitoring, log aggregation and security information and event management (MDR / MSOC), endpoint detection and response, vulnerability scanning |
| Network and storage infrastructure | Next generation firewall security subscriptions, storage array and network device support and firmware |
| Clustered database at the primary site | Windows Server Standard, SQL Server Standard |
| Backup, recovery and the secondary environment | Backup and recovery, Windows Server Datacenter, SQL Server |
| Operator and administrative workstations | Windows desktop operating system, endpoint detection and response, multi-factor authentication |

**Three-year coverage.**

| License type | Coverage for three years from Operational Acceptance |
|---|---|
| Windows Server Datacenter and Standard | Perpetual licenses, with security and quality updates and support by the Supplier under Section 5 |
| SQL Server Standard | Perpetual licenses with Software Assurance for three years, providing updates, license mobility between the clustered hosts, and failover rights for the passive node and the secondary copy |
| Subscriptions: MDR / MSOC, security, operations, firewall, storage array and network device support, and the bulk SMS service | A subscription term of three years |
| Equipment software | Support and updates from the equipment manufacturer for the warranty period |
| Hardware security modules | Support and firmware updates for three years |
| Application software | Corrected and updated under the warranty described in Section 5 |

License terms for every title are supplied with the Proposal in the Software List.
