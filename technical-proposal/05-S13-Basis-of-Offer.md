# 13. Basis of Offer

The Information System uses the items and services the Purchaser provides, listed in Section 13.1,
and interfaces with the systems outside the scope of supply listed in Section 13.2. Each item and
each system has a named owner.

## 13.1 Purchaser-provided items and services

| Item | Basis |
|---|---|
| **Public key infrastructure** | The Department of e-Government provides the Public Key Infrastructure and the certification authority. No certification authority is supplied under this Contract. The hardware security modules and the Signing Service described in Section 10.4 use that infrastructure. It also issues the certificates that authenticate the System's interfaces and services, including the NRIS interface described in Section 7.4, and their renewals |
| **Document Signer certificate** | Issued by the Government certification authority against a certificate signing request produced by the hardware security modules. An agreed renewal lead time is required, because card production stops if the certificate lapses before a replacement is in place. The validity period must cover the signing period plus the ten year service life of the last card signed under it |
| **QR code specification** | The digital signing protocol, data format and structural schema of the QR code, including whether its payload is encrypted, are specified by the Purchaser and provided to the Supplier, together with the key material that encryption requires. The keys held by verification software are issued by the Purchaser. Final QR code dimensions follow the Purchaser's optimization |
| **Card design** | The Malawi National ID template is redesigned jointly with the Purchaser. Detailed layout data is issued to the Supplier following award. The position, symbology and dimensions of the card identifier described in Section 5.4 are settled in that design, and the card serial numbering scheme, format and range proposed by the Supplier are approved by the Purchaser during design, as described in Section 6.10 |
| **Eligibility determination** | Entitlement to a card is decided in NRIS before a production request is released. The System validates each record for completeness and data quality, and retrieves approved citizen records |
| **NRIS interface development** | The Purchaser develops and provides the NRIS application programming interface. NRB developers build the NRIS side of each interface, working to the Interface Control Documents and in coordination with the Supplier |
| **NRIS documentation** | Interface specifications, including the NRIS recovery endpoints described in Section 7.15, data dictionary, message formats, authentication mechanisms and database platform details, provided at the point in the schedule where interface design begins |
| **NRIS test environment** | A test environment with representative data, against which integration testing and acceptance testing are performed |
| **Wide area and internet connectivity** | Provided over the Malawi Government Wide Area Network. The Supplier states the technical network requirements and the Purchaser provisions against them |
| **Electrical connection** | A separate dedicated electrical connection to the facility, provisioned against the Supplier's final approved design |
| **Statutory approvals** | NRB coordinates with the Buildings Department for approval of the structural and electrical designs |
| **Site information** | The ground floor plan for the designated area. Apart from the Government Wide Area Network connection and NRB's perimeter firewall, the design does not rely on any existing electrical, environmental, network or security infrastructure at the site |
| **Disaster recovery facility** | The Purchaser's existing disaster recovery data center, into which the secondary environment described in Section 9.3 is deployed. The Purchaser provides the space, power and cooling for its equipment, its connection to the Malawi Government Wide Area Network, and access for the Supplier to install and maintain it |
| **Security Operations Center integration** | NRB identifies the product its Security Operations Center runs, the endpoint to which alerts and security events are forwarded, and the events it requires, so that the facility's Security Operations Center is integrated with it as described in Section 10.7 |
| **Remote access** | Supplier remote access for support is arranged with NRB and e-Government and is subject to their controls |
| **Cards per carrier letter** | The distribution of one to four cards per carrier is agreed with NRB for capacity planning |

## 13.2 Interfaces to systems outside the scope of supply

| System | Boundary |
|---|---|
| **NRIS** | The National Registration and Identification System is operated by NRB. The integration boundary is the interface described in Section 7.1. NRIS presently integrates with the existing card printers through a middleware application connected directly to its database. The System integrates with the NRIS application programming interface that the Purchaser develops and provides, as described in Section 7.2 |
| **Government public key infrastructure** | Operated by e-Government. The System consumes certificates issued by it and does not administer it |
| **NRIS document tracking system** | Holds card status through printing, dispatching and ready for collection, and notifies the cardholder by SMS. The dispatch and delivery status described in Section 8.4 feeds it. Confirmation that a card has arrived at the registration office and is ready for collection is given by NRB, and the System records it as described in Section 8.3 |
| **Courier and postal services** | No courier or postal operator is currently designated. The System generates tracking references and is ready for integration with a courier or postal service interface, as described in Section 8.6. The Supplier is responsible for engaging with the courier or postal operator through which cards are delivered, to agree with it on the data exchange and to connect the System to the operator's tracking service. Physical delivery of cards is outside the scope of supply and remains the responsibility of NRB, which today delivers to registration offices with its own fleet. The operator's own systems are also outside the scope of supply. The interface specification and address data standard are the operator's, and the System is configured to them |
| **Malawi Government Wide Area Network** | Provisioned and administered by NRB and e-Government. The perimeter firewall and the wide area service are outside the scope of supply |
| **Purchaser disaster recovery site** | Operated by NRB at its existing data center. The Supplier provisions the equipment of the secondary environment there |
| **NRB mail service** | Operated by NRB. The System's own mail relay delivers alert emails to the NRB staff addresses designated for each type of alert, and the System does not administer the mail service |
| **SMS service provider** | A bulk SMS provider in Malawi, under the subscription supplied with the System, delivers alert messages to the NRB staff designated for each type of alert |
| **NRB Security Operations Center** | Operated by NRB. The facility's Security Operations Center forwards alerts and security events to it, as described in Section 10.7, and is handed over to NRB |

## 13.3 Matters for confirmation

**Custody of the signing key after Operational Acceptance.** The Document Signer private key is
generated inside the hardware security modules supplied under this Contract and cannot be extracted
from them. Which party holds custody of those modules, and which party is responsible for certificate
renewal and revocation following Operational Acceptance, is confirmed with the Purchaser during
design.
