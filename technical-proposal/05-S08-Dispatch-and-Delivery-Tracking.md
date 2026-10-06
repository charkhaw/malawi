# 8. Dispatch and Delivery Tracking

## 8.1 Dispatch record generation

A dispatch record is created for every mail piece at the point the mailing line releases it. The
record is the unit of accountability from that point onward, and every later status refers to it.

| Field | Content |
|---|---|
| Card serial number | Identifies the physical card in the envelope |
| National Identity Number | Identifies the cardholder the card was produced for |
| Card identifier read at the line | The value read from the card with its carrier after affixing, which is what proves the pairing |
| Destination | The registration office the mail piece is addressed to |
| Dispatch batch | The batch the mail piece was grouped into for handover |
| Tracking reference | The reference generated for the mail piece, used where a courier or postal operator applies one |
| Time of release | When the mail piece completed verification and was released |

The record is written from what the machine read, not from what the job intended. A mail piece
released after the verification station confirmed the card against its carrier carries a record of
that confirmation, and a mail piece diverted to the reject magazine does not produce a
dispatch record at all. The dispatch set is therefore a record of what physically exists, which is
what allows it to be reconciled against the production job and against blank card stock.

Dispatch records are available for export in structured form, and are retained under the retention
policy described in Section 11.4.

## 8.2 Dispatch batching and destination routing

**Grouping.** Completed mail pieces are grouped into dispatch batches by destination. A batch is the
unit handed over for transport, and it carries its own identity, its destination, its contents list
and its handover time.

**Routing.** The destination for each mail piece is the registration office that ordered the card.
It is carried on the production record retrieved from NRIS and printed on the carrier letter, where it
shows through the envelope window, so routing is determined by data rather than by sorting after the
fact.

**Batch tracking.** Each batch is tracked as a unit in addition to the individual mail pieces within
it. Tracking at both levels is what allows a query about a single citizen and a query about a
consignment to be answered from the same records:

| Level | Answers |
|---|---|
| Mail piece | Where is the card for this National Identity Number |
| Dispatch batch | What was sent to this office, when, and how many pieces it contained |

**Handover.** A batch is closed at handover. The closing record states the batch, its destination,
its piece count, the time and the party that accepted it. A mail piece cannot be added to a batch
after it closes, so the contents list and the handover record cannot diverge.

## 8.3 Delivery status tracking and cardholder notification

Status is maintained for every mail piece from release through to the point the card is available
for collection.

| Status | Set when |
|---|---|
| Packaged | The mail piece has been verified and released by the mailing line |
| Dispatched | The batch containing it has been handed over for transport |
| Delivered | Arrival at the destination office has been confirmed |
| Available for collection | The office has confirmed the card is ready for the cardholder |

**Notification.** NRB operates a document tracking system within NRIS which moves a card through
printing, dispatching and ready for collection, and sends the cardholder an SMS once the card is
ready. The status this system reports is what advances that tracker. Notification therefore derives
from the production and dispatch record rather than from a separate count kept alongside it, and a
citizen is told the card is ready because the system that produced and dispatched it said so.

**Why status is set from events rather than assumed.** A status that advances on a timer, or on the
expected arrival of a batch, reports progress that may not have happened. Each status above is set
by a specific event, and a mail piece whose event has not occurred holds its previous status and is
visible as outstanding rather than silently progressing.

## 8.4 Status feedback to NRIS

Dispatch and delivery status is fed back into NRIS over the interface described in Section 7.1. The
events raised are those listed in Section 7.11: card packaged, card dispatched and card delivered.

| Event | Carries |
|---|---|
| Card packaged | Card serial number, National Identity Number, job, time |
| Card dispatched | The above, plus the dispatch batch and its destination |
| Card delivered | The above, plus confirmation time |

Each event is attributable to a single physical card. A status update that referred only to a batch
would be unable to answer a question about one citizen, which is the question the tracker and the
SMS notification exist to answer.

Events raised while the NRIS interface is unavailable are held and published in the order they
occurred when it returns, under Section 7.15, so an interruption in the interface delays the
notification rather than losing it.

## 8.5 Undelivered, returned and re-dispatched items

Not every mail piece reaches its destination, and the cases are handled distinctly because they have
different causes and different resolutions.

| Case | Handling |
|---|---|
| Rejected at the mailing line | No dispatch record is created. The card is recorded against the job as a reject, held under control, and reproduced within the job or returned to stock reconciliation |
| Batch not received at destination | The batch remains open against its handover record, and the mail pieces within it hold the dispatched status. The discrepancy is visible as a batch whose delivery was never confirmed |
| Individual piece missing from a received batch | The piece is recorded as missing against the batch it was dispatched in, and the card is flagged in NRIS as not delivered |
| Returned undelivered | The return is recorded against the dispatch record, the card status is updated in NRIS, and the card is held under control pending instruction |
| Uncollected after notification | The status remains available for collection. Handling of uncollected cards is an operational decision of the Purchaser, and the system reports the position rather than acting on it |
| Re-dispatch | A returned card that is re-dispatched produces a new dispatch record referencing the original, so both movements are visible and the card's history is not overwritten |

**Cards returned under control.** A card that comes back is still a personalized identity document.
It is recorded, held in secure storage under Section 6.10, and either re-dispatched or passed to
secure destruction with a destruction record. It is not returned to blank stock, because it is no
longer blank, and it is not left unaccounted, because it was issued from controlled stock.

A re-dispatch is a movement of an existing card. It is distinct from a reprint under Section 7.12,
which produces a new card with a new serial number.

## 8.6 Courier integration readiness

No courier or postal operator is currently designated for card delivery. The Supplier is responsible
for engaging with the courier or postal operator through which cards are delivered, to agree with it
on the exchange of dispatch data, tracking references and delivery status, and to connect the system
to the operator's tracking service, through its application programming interface or, where it
offers none, by secure file transfer. The system is built so that an operator can be introduced
without change to the dispatch record structure.

| Capability | Provision |
|---|---|
| Tracking reference generation | A tracking reference is generated for every mail piece and every dispatch batch, in a format that can be replaced by an operator's own reference without changing the dispatch record structure |
| Dispatch data export | Dispatch and batch data is produced in structured form for transmission to an operator |
| Status ingestion | Delivery status received from an external party is written against the dispatch record by the same path that records internal confirmation |
| Interface | Integration with an operator's application programming interface is provided as a configured interface, in the same pattern as the interfaces described in Section 7.2 |
| Address validation | Destination data is validated against the record it came from before the address is printed on the carrier |

**Why this is built now rather than later.** The point at which a courier is introduced is the point
at which the delivery model changes, and a system that assumed a single delivery path would need its
dispatch records restructured to accommodate one. Generating a tracking reference and holding
delivery status as an event from the outset means the operator becomes a source of those events
rather than a change to what the system records.

Physical delivery of cards, from the Card Production Facility to registration offices or to
cardholders' addresses, is outside the scope of supply and remains the responsibility of NRB, which
today uses its own fleet. The operator's own systems are also outside the scope of supply, and both
are listed in Section 13.2. The interface specification and address data standard are the
operator's, and the system's data exchange and address validation are configured to them.
