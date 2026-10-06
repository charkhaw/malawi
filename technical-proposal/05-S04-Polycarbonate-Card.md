# 4. Polycarbonate Card

Two million polycarbonate cards are supplied. The cards are delivered as blank card bodies
carrying the full static security construction described in Sections 4.2 and 4.3, and are
personalized at the Card Production Facility on the systems described in Section 3. The cards are
chipless, and each card body is serialized at manufacture, under a numbering scheme, format and range
proposed by the Supplier and approved by the Purchaser. They are delivered in shipments of not less than 500,000 cards, and all two million are on
site before commissioning begins.

## 4.1 Construction and durability

| Property | Specification |
|---|---|
| Material | 100% polycarbonate |
| Construction | Six or more layers, fully fused |
| Adhesives | None |
| Service life | Minimum ten years |

The card is built from polycarbonate layers fused into a single monolithic body under heat and
pressure. Because fusion forms a continuous material rather than a bonded stack, there is no
interface at which the card can be opened, and no adhesive layer to fail with age or heat.

Features printed on inner layers before fusion are sealed within the body and cannot be reached
without leaving visible damage to the card. With no adhesive interface, the card is not exposed to
delamination, the common failure mode of laminated cards over a ten-year life.

## 4.2 Card body security features, front

| Feature | Description |
|---|---|
| Guilloche background | Fine interlaced line patterns, reproducible only by the original design data |
| Rainbow (IRIS) printing | Continuous color transition across the background with no visible boundary between colors |
| Optically Variable Magnetic Ink (OVMI) | Malawi flag motif, changing appearance with viewing angle |
| Changing Laser Image (CLI) | Photograph and card number, applied during personalization |
| Micro-text | Including micro-text within the portrait box |
| Relief tactile text | Raised text verifiable by touch, including tactile micro-text |
| Deliberate error elements | Intentional variations within the micro-text and relief text, known to the issuing authority |
| Invisible UV printing | National emblem, visible only under ultraviolet light |
| Numismatic background pattern | Fine engraved-style patterning of the type used in banknote printing |
| Photonic crystal pattern elements | Structural color effects that shift with viewing angle |
| Thermochromic ink | Changes color when warmed by a finger, verifiable without any equipment |

The features are distributed across three levels of inspection. Some can be checked by any holder
without equipment, such as the OVMI, the rainbow printing, the tactile relief and the thermochromic
ink. Some require simple equipment, such as the UV printing and the micro-text. The deliberate error
elements are known only to the issuing authority and are used in forensic examination, where a
counterfeit that reproduces the visible design correctly will reproduce the intended text rather than
the deliberate error.

## 4.3 Card body security features, back

| Feature | Description |
|---|---|
| Rainbow color transition effect | Continuous color transition across the reverse |
| Optically Variable Magnetic Ink (OVMI) | Malawi map or rising red half-sun symbol |
| Invisible UV printing | Malawi map or rising red half-sun symbol, under ultraviolet light |
| Guilloche security structures | Interlaced line patterning |
| Micro-text | Too small to be read without magnification |
| Deliberate error elements | Intentional variations for forensic verification |

## 4.4 Personalization security features

Applied at the Card Production Facility by laser engraving, within the card body:

| Feature | Specification |
|---|---|
| Portrait | High resolution, 600 dpi or higher, greyscale, with photograph size and image to ICAO specifications |
| Stacked-layer greyscale personalization | Elements engraved at differing depths within the fused body |
| Secondary image | Second rendering of the portrait in its own zone of the layout, so that substitution of the main portrait is evident |
| CLI elements | Photograph and number, visible alternately as the card is tilted |
| Micro-lettering | Above 600 dpi |
| QR code | Carrying both alphanumeric values, described in Section 4.5 |
| Card identifier | Machine-readable rendering of the card serial number, read on the mailing line |
| Multilingual data | Card text in English and Chichewa, as the approved layout requires |
| Tactile laser printing | Raised relief, verifiable by touch |

## 4.5 Digitally signed biometric QR code

Each card carries a QR code containing the cardholder's biographical data together with facial and
fingerprint biometric information. The contents are digitally signed, and are readable only by
verification software holding the keys issued for the purpose.

**Purpose.** The signature allows an authorized verification application to establish two things
offline, with no connection to NRIS and no database lookup: that the data originated from the
authorized issuing system, and that not a single character has been altered since it was signed.

**How the signature is applied.** During personalization, the system assembles the QR payload from
the citizen record retrieved from NRIS and submits it to the hardware security modules for signing.
The signing key is generated inside the module and never leaves it. The resulting signature is
encoded into the QR code alongside the payload and engraved into the card. The signing architecture,
key custody and certificate lifecycle are described in Section 10.4.

**How the contents are read and verified.** Reading the code requires a device with standard
scanning capability, running verification software that holds the keys issued for the purpose. That
application checks the signature using the public key carried in the signer's certificate, and checks
that certificate against the certificate authority it already trusts. Both checks are computed
on the device, so verification works in the field without connectivity.

Because the card is chipless, the signed QR code is its only cryptographically verifiable feature.

## 4.6 Standards compliance and laboratory testing

Cards comply with:

| Standard | Scope |
|---|---|
| ISO/IEC 7810 | Physical characteristics and dimensions |
| ISO/IEC 10373-1 | Test methods |
| ISO/IEC 24789-1 and 24789-2 | Card service life and durability |

Not fewer than two laboratory test reports are provided, from an independent international laboratory
holding ISO/IEC 17025 accreditation with a scope covering these standards, dated within the last
three years, and covering:

| # | Test |
|---|---|
| i | Card usage and aging simulation, minimum ten years service life |
| ii | Card dimensions |
| iii | Card bending stiffness |
| iv | Card resistance to chemicals, except salt mist |
| v | Card resistance to chemicals, salt mist |
| vi | Card dimensional stability and warpage, temperature and humidity |
| vii | Card ultraviolet light exposure |
| viii | Card dynamic bending stress, up to 1,000 cycles |
| ix | Card dynamic torsional stress, up to 1,000 cycles |
| x | Card peel strength |
| xi | Card adhesion, blocking |
| xii | Card opacity |
| xiii | Card warpage |
| xiv | Card resistance to heat |

Testing is arranged and provided by the Supplier.

## 4.7 Card samples

Sample card images are provided showing the exact layout, design and security features:

- Blank card, front
- Blank card, back
- Personalized card, front
- Personalized card, back

Not fewer than two physical sample cards, blank or from previous national identity programs, are
included in the bid submission, so that the card construction and the types of security feature
described above can be examined directly.

Physical samples are provided again during production testing, so that the cards produced on the
installed line can be compared against the approved design before volume production begins.

Five thousand specimen cards to the approved design are supplied, in addition to the two million, for
testing the laser personalization systems.
