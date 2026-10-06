# Technical Proposal - System Architecture

## Table of Contents

---

### 1. Introduction
- 1.1 Scope of supply
- 1.2 Integration and interoperability responsibility

### 2. Solution Overview
- 2.1 Architecture overview
- 2.2 End-to-end process flow
- 2.3 Card issuance lifecycle

### 3. Card Personalization System
- 3.1 Configuration and modular design
- 3.2 Laser marking capability
- 3.3 Marking resolution
- 3.4 Independent laser station operation
- 3.5 Throughput and duplex performance
- 3.6 Card recognition, alignment and in-line verification
- 3.7 Reject detection and in-job reproduction
- 3.8 Laser calibration and audit logging
- 3.9 Machine software, job and batch reporting
- 3.10 Technical data and installation requirements

### 4. Polycarbonate Card
- 4.1 Construction and durability
- 4.2 Card body security features, front
- 4.3 Card body security features, back
- 4.4 Personalization security features
- 4.5 Digitally signed biometric QR code
- 4.6 Standards compliance and laboratory testing
- 4.7 Card samples

### 5. Mailing and Dispatch System
- 5.1 Configuration
- 5.2 Carrier letter printing and card affixing
- 5.3 Envelope insertion, sealing and address printing
- 5.4 Verification and card-to-recipient matching
- 5.5 Sorting, reject magazines and buffer modules
- 5.6 Throughput and capacity
- 5.7 Job data and dispatch records

### 6. Application Software
- 6.1 Software architecture
- 6.2 Card Personalization Management System
- 6.3 Card Layout Template Editor
- 6.4 Data Preparation Service
- 6.5 Signing Service
- 6.6 Printer Control Service
- 6.7 Laser Personalization Control Software
- 6.8 Quality Control Management
- 6.9 Mailing and Dispatch Management System
- 6.10 Stock Control and Card Accountability
- 6.11 Monitoring, Reporting and Analytics
- 6.12 Administration and Access Control
- 6.13 Presentation Layer
- 6.14 Software inventory and licensing

### 7. NRIS Integration
- 7.1 Integration architecture
- 7.2 Interfaces, protocols and middleware
- 7.3 Data mapping and transformation
- 7.4 Secure data exchange
- 7.5 Database connectivity
- 7.6 Real-time and batch processing
- 7.7 Card production request management
- 7.8 Citizen data retrieval
- 7.9 Personalization and quality assurance integration
- 7.10 Card lifecycle transactions
- 7.11 Production status feedback
- 7.12 Reprint and exception management
- 7.13 Reporting and analytics integration
- 7.14 Audit trail and end-to-end traceability
- 7.15 Disaster recovery integration
- 7.16 Integration testing
- 7.17 Integration deliverables

### 8. Dispatch and Delivery Tracking
- 8.1 Dispatch record generation
- 8.2 Dispatch batching and destination routing
- 8.3 Delivery status tracking and cardholder notification
- 8.4 Status feedback to NRIS
- 8.5 Undelivered, returned and re-dispatched items
- 8.6 Courier integration readiness

### 9. Infrastructure
- 9.1 Deployment architecture and platform
- 9.2 Network architecture and security zoning
- 9.3 High availability, failover and disaster recovery
- 9.4 Infrastructure scope of supply
- 9.5 Facility requirements

### 10. Security Architecture
- 10.1 Security model
- 10.2 Data protection and encryption
- 10.3 Identity and access management
- 10.4 PKI, HSM and digital signature architecture
- 10.5 Application and interface security
- 10.6 Logging and audit
- 10.7 Security monitoring and Security Operations Center
- 10.8 Standards compliance

### 11. Performance and Capacity
- 11.1 Production capacity
- 11.2 System response times
- 11.3 Concurrent users
- 11.4 Data volumes, growth and retention
- 11.5 Performance under peak and failover conditions
- 11.6 Performance validation

### 12. Operations, Administration and Support
- 12.1 System administration and configuration management
- 12.2 Operational monitoring, diagnostics and troubleshooting
- 12.3 Backup, recovery and restoration
- 12.4 Support model, service levels and performance indicators
- 12.5 Spare parts and consumables

### 13. Basis of Offer
- 13.1 Purchaser-provided items and services
- 13.2 Interfaces to systems outside the scope of supply
- 13.3 Matters for confirmation

---

### Annex A. Abbreviations
