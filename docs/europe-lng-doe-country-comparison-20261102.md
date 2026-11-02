# DOE Europe vs EU27 LNG comparison guardrails (2026-11-02)

## Source datasets

- U.S. Department of Energy, *Natural Gas Imports and Exports Monthly August 2026* (October 22, 2026): https://www.energy.gov/sites/default/files/2026-10/Natural%20Gas%20Imports%20and%20Exports%20Monthly%20August%202026.pdf
- DOE monthly release and supporting LNG export detail: https://www.energy.gov/hgeo/articles/natural-gas-imports-and-exports-monthly-2026
- Eurostat international trade in goods: https://ec.europa.eu/eurostat/web/international-trade-in-goods/database
- Eurostat natural gas imports context: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Natural_gas_supply_statistics

## Quantitative DOE evidence

January–August 2026: 2,332.8 Bcf U.S.-produced LNG vessel exports to DOE-defined Europe; January–August 2025: 2,351.5 Bcf, a change of **−18.7 Bcf (−0.795%)**. All-destination vessel exports: 4,200.1 Bcf versus 3,458.5 Bcf (**+741.6 Bcf, +21.44%**). These are DOE reported figures and arithmetic comparisons, not terminal receipts.

## Non-equivalence and double-counting traps

- DOE Europe **includes Türkiye**; EU27 does not. A DOE-Europe aggregate must not be labeled EU27 or summed with EU member country observations.
- DOE records U.S.-produced LNG *vessel exports with reported destination*. Eurostat reporter-partner trade labels measure a different trade-statistics concept. A U.S. DOE export destination is not a certified physical receipt in that country's terminal.
- Country-level Eurostat figures must be compared using the same months, reporter, partner definition, units and revisions; EU27 totals overlap individual member states. Never add EU27 to France, Germany or Poland.
- DOE LNG cargo counts can include split cargos and should not be equated to unique vessel voyages.
- DOE export-point prices are FOB/export-point values, not corporate realized revenue, margins, profits or net national economic benefits. Converting Bcf to GWh requires documented heating-value assumptions; do not convert by an unstated constant.
- No October vessel-specific conclusions can be drawn from the August reporting vintage.

## Next independently verifiable milestone

Download DOE's August 2026 LNG export detail workbook, inspect its schema, and search for exact vessel names and reported destination/terminal/date rows in the **covered months only**. Match to independent receiving-terminal completion records; absent vessel IMO or physical origin remains null. Track corrections and revisions.

**Status:** methodological reconciliation of existing primary data, not new cargo-origin evidence. SOI evidence audit 20/30; readiness 53%; no meter changes.
