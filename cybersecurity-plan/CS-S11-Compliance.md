# 11. Compliance

## 11.1 Compliance and governance statement

Inkript confirms that, if awarded the Contract, it will:

- design, implement and maintain the security architecture required by Section VII clause 1.6, as described in System Architecture Section 10 and governed by this plan;
- take the technical and organizational measures required by GCC 44.1, and flow those obligations down to its subcontractors, suppliers and manufacturers;
- notify the Purchaser's Project Manager and designated security representatives immediately, and in any event within 24 hours, of the cyber security incidents listed in SCC 19.7, as set out in Section 7.4;
- report monthly on the status of compliance with cyber security risk management, and on foreseeable cyber security risks and their mitigation, as required by SCC 19.6(d);
- store and process citizen data only in Malawi, with NRB as data controller, and use synthetic or masked data for all work outside the production system;
- comply with the Data Protection Act 2024, the Communications Act 2016, the National Registration Act 2015, the Electronic Transactions and Cybersecurity Act 2016, Malawi's National Digitalization Policy, the Project Environmental and Social Management Plan, the principles of the General Data Protection Regulation, and data minimization and purpose limitation;
- maintain its ISO/IEC 27001 certification throughout the Contract; and
- assign security decisions as set out in Section 2.1, with residual risk accepted only by the Purchaser.

## 11.2 Requirements compliance matrix

| Requirement | Response |
|---|---|
| **Section VII clause 1.6.1, Security architecture.** Multi-layered security architecture | Complies. System Architecture Section 10.1; Section 3.1 |
| **Section VII clause 1.6.2, Security architecture requirements.** Encryption in transit and at rest, zero trust, RBAC and least privilege, segmented network, secure APIs, HSMs, key lifecycle, MFA for privileged access, tamper-proof audit trails | Complies. System Architecture Sections 9.2, 10.1 to 10.6 |
| **Section VII clause 1.6.3, Data protection.** AES-256 at rest, TLS 1.2 or higher, masking, secure deletion, retention enforcement | Complies. System Architecture Section 10.2 |
| **Section VII clause 1.6.4, Identity and access management.** Centralized IAM, MFA, PAM, just-in-time access, access logging, recertification | Complies. System Architecture Section 10.3 |
| **Section VII clause 1.6.5, Application security.** Secure development lifecycle, OWASP Top 10, SAST and DAST, API security, vulnerability and patch management | Complies. System Architecture Section 10.5; Section 6.2 |
| **Section VII clause 1.6.6, Infrastructure security.** CIS-hardened systems, EDR, anti-malware and IPS, next generation firewalls, secure baselines, SIEM | Complies. System Architecture Sections 9.1, 9.2 and 10.7 |
| **Section VII clause 1.6.7, Physical security.** Biometric access, CCTV, secure zones, environmental monitoring linked to alerts, visitor logging | Complies. Installed under the facility works and integrated with security monitoring. System Architecture Section 9.5 |
| **Section VII clause 1.6.8, Security monitoring and incident response.** SOC, 24/7 monitoring, SIEM, incident response plan, escalation matrix, forensics, reporting timelines | Complies. System Architecture Section 10.7; Section 7 |
| **Section VII clause 1.6.9, Vulnerability and penetration testing.** Independent penetration test before go-live and annually; quarterly vulnerability assessment; remediation tracking | Complies. Sections 6.2 and 6.3 |
| **Section VII clause 1.6.10, Business continuity and disaster recovery.** Encrypted, offsite and immutable backups; failover; annual DR test; ransomware recovery | Complies. System Architecture Sections 9.3 and 12.3; Section 8 |
| **Section VII clause 1.6.11.1, Accreditation.** Compliance of the bidder and key personnel with recognized standards | Complies. Section 9.3 |
| **Section VII clause 1.6.11.2, Certification.** ISO/IEC 27001, mandatory; ISO 9001 and ISO/IEC 20000-1, preferred | ISO/IEC 27001 and ISO 9001: complies, certificates attached |
| **Section VII clause 1.6.11.3, Frameworks.** NIST CSF, CIS Controls, ISO/IEC 27002, OWASP | Complies. Section 3.2; System Architecture Section 10.8 |
| **Section VII clause 1.6.11.4, Cryptography.** FIPS 140-2 or 140-3 HSMs, X.509, eIDAS-aligned signatures | Complies. System Architecture Section 10.4 |
| **Section VII clause 1.6.11.5, Legal and regulatory.** Malawi legislation, ESMP, GDPR principles, minimization, Privacy Impact Assessment | Complies. Section 11.1; System Architecture Section 10.2 |
| **GCC 44.1.** Cyber security measures, including by subcontractors | Complies. Sections 2.1 and 11.1 |
| **SCC 19.6(d).** Report on compliance with cyber security risk management | Complies. Section 6.3 |
| **SCC 19.7.** Notification within 24 hours of listed incidents | Complies. Section 7 |
