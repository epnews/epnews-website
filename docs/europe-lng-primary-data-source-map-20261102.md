# European LNG physical-cargo evidence: source map (2026-11-02)

## Primary infrastructure dataset: Gas Infrastructure Europe ALSI

- Official operator reporting: https://www.gie.eu/agsi-and-alsi-transparency-platforms/
- Data platform: https://alsi.gie.eu
- Official API documentation: https://www.gie.eu/transparency-platform/GIE_API_documentation_v007.pdf
- GIE ELSA support confirms ALSI is published daily by infrastructure operators and that the data can be accessed without an account through ELSA: https://elsa.gie.eu/support/

**Fields:** gas day, LNG tank inventory (10³ m³ LNG), terminal send-out (GWh/day), declared inventory and send-out capacities, reporting status and facility/operator identifiers. ALSI terminal send-out is *regasified gas injected into the grid*, **not** a physical vessel unloading, loading port, supplier-country classification, LNG cargo quantity or realized revenue. Inventory changes cannot be assumed equal to arrivals because send-out and other facility operations occur simultaneously.

## Cargo-identity research leads (not verified cases)

- Rotterdam Gate/EemsEnergy and other EU terminals: ALSI facility-level operational data can anchor gas-day windows, but a separate terminal arrival record and independently sourced IMO/port history are needed.
- Zeebrugge LNG Terminal: public AIS vessel activity example at https://www.aiscatcher.org/place/2619/zeebrugge-lng-terminal ; AIS proximity or reported destination alone does **not** prove LNG discharge, load port or physical origin.
- A potential derived Netherlands cargo-record research feed documents vessel IMO, terminal, arrival timestamp, estimated versus measured cargo energy, origin inference and DOE matching at https://www.gaspeil.nl/api-docs . This is a **third-party derived dataset**, not an official terminal or DOE source; verify each observation independently, inspect licensing and provenance, and preserve uncertainty flags. Do not count it as independent of the underlying AIS/ALSI/DOE records it republishes.

## Required next evidence collection

1. Select the highest-priority month and reporter from the existing 24 matched-month classification anomalies; do not add EU27 totals to country totals.
2. Locate an actual dated terminal discharge/berth record with named ship and IMO. Preserve original link, timestamp, reporting vintage and unit.
3. Cross-check vessel IMO and loading/transshipment history against a genuinely independent primary source. Confirm discharge amount from terminal/operator documentation if available.
4. Compare the event to relevant Eurostat reporter-label observations **without** treating month-level customs categories as direct cargo provenance.
5. Record unknown origin as null. No influence score until the causal attribution standard is independently met.

## Research status

This document establishes sources and distinctions; it does **not** assert any newly verified physical cargo arrivals or add observations to the evidence audit. SOI evidence audit stays 20/30; meter readiness stays 53%. Preserve all command-meter behavior.
