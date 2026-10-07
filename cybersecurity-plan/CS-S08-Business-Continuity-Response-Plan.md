# 8. Business Continuity Response Plan

## 8.1 Recovery targets and scenarios

NRIS is the system of record, so a disruption delays cards and does not lose them, provided the record
of every card produced and in progress, and the means of signing cards, are preserved. The recovery
targets are those of System Architecture Section 9.3: automatic failover within 60 seconds, full
service recovery within 5 to 15 minutes, data loss of not more than 5 minutes, and availability of
not less than 99 percent. They are confirmed with the Purchaser during design.

| Scenario | Response and decision |
|---|---|
| Loss of a host, database node, switch, firewall or storage controller | Automatic failover within the facility; the component repaired under the support model |
| Loss of the hardware security module at the primary site | Signing continues on the module at the secondary site, over the encrypted connection between the sites; the module replaced under the support model |
| Loss of a personalization or mailing line | Production continues on the other line |
| Loss of the primary storage array or site | The secondary environment carries the data and application services and keeps every record available to NRIS; production resumes when the primary platform and equipment are available. Invoked by NRB's business continuity manager |
| Ransomware or a destructive attack | Incident Response Plan first. Hosts rebuilt from the hardened baselines; data restored from the most recent immutable copy verified as clean, on an isolated segment; credentials replaced. The secondary environment is checked before it is trusted, because replication may have carried the damage. Directed by the incident manager, with NRB |
| Loss of both hardware security modules, or compromise of the signing key | New key pair generated at a ceremony and a new certificate requested from e-Government. Decided by NRB |
| Government Wide Area Network or NRIS unavailable | Production continues on records already retrieved; status events held and sent on restoration, under System Architecture Section 7.15 |

Restoration follows a fixed order, so that each service depends only on what is already running:
network and directory, security monitoring, database, integration gateway, application services,
Signing Service, then the production lines.

## 8.2 Activation, communication and testing

Failover within the facility is automatic. Invocation of the secondary environment and the response
to a site loss are decided by NRB's business continuity manager on the advice of the Supplier's
technical lead. NRB communicates with registration offices and the public; the Supplier keeps NRB
management, the NRIS team and, for a security incident, the Purchaser's Project Manager informed.

Security is not relaxed during recovery. The secondary environment has its own firewall, encryption
and monitoring, break-glass access raises an alert and is rotated after use, emergency changes are
reviewed afterwards, and restored data is verified before service resumes.

Recovery is tested, not only written:

- **Week 20.** Pre-commissioning test 13: backup, restoration and failover to the secondary environment.
- **Week 27.** Operational acceptance test 11: backup and restoration in live operation.
- **Annually.** Disaster recovery test, simulating full system failure, with the recovery point and time achieved recorded.

The business continuity and disaster recovery procedures are delivered in week 19, and corrected after
every test.
