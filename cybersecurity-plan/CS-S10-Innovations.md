# 10. Innovations

| Innovation | What it does |
|---|---|
| Closed-loop production integrity, answering C01, C02 | Security monitoring reconciles NRIS requests, signatures made by the hardware security modules and serialized blanks issued, for every job and every shift, and raises an S1 alert on any difference. A card produced for the wrong person, which no single control would notice, is found in the shift in which it is made |
| Detection derived from the risk register, answering all risks | Every High or Critical risk is linked to a detection rule, a playbook and a test showing the rule fires, so that the Security Operations Center watches for the outcomes this facility fears rather than for generic attacks alone |
| Cyber-physical correlation, answering C02, C03, C06 | Access control and intrusion events are correlated with system events, so that a privileged session opened from a room no authorized person has entered, or the card store opened outside a shift, raises an alert |
| Bounded exposure by design, answering C04 | Biometric data is held only for the batch in production, and the audit trail records which batches were present at any moment, so a breach can be scoped to the citizens actually exposed |
| Integrity baseline from the factory, answering C08, C09 | The hashes of the equipment control software accepted at factory acceptance are the reference against which the installed lines are verified on arrival, after each release and on any alert |
| Targeted reissue, answering C01, C14 | Each card records the certificate under which it was signed, so that if a key were compromised or an algorithm weakened, only the affected cards need be identified and reissued |
