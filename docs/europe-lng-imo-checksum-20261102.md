# IMO vessel-number check digit

The IMO ship number is seven digits; the final digit equals the weighted sum of the first six digits (weights 7, 6, 5, 4, 3, 2) modulo 10. This executable gate improves on earlier **format-only** screening, which allowed invalid identifiers. Passing a check digit establishes only mathematical plausibility, not vessel existence, identity, movement, cargo loading, transshipment, discharge or gas production origin. Continue independent port/terminal and vessel-record verification.

No live vessel records were retrieved. No command-meter behavior or SOI score changes (audit 20/30, readiness 53%).
