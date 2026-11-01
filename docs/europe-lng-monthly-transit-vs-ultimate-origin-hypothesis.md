# Eurostat monthly transit attribution versus LNG ultimate origin: documented reconciliation hypothesis

## Official source discovery
Eurostat's [Natural gas supply statistics](https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/10590.pdf) states: **monthly natural gas trade reports imports from the last transit country** (since January 2013), whereas **annual natural-gas trade reports ultimate origin** and excludes transit flows. See the PDF's section discussing the January 2013 methodology change. The [annual dataset description](https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gas/default/table?lang=en) explicitly says 'country of ultimate origin'. The [monthly dataset](https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gasm/default/table?lang=en) says 'by country of origin' in its short description, which is **not sufficient** to override the more specific Eurostat methodological warning.

**Caution:** The Eurostat explanation discusses monthly *natural-gas trade* generally; we have not yet established how every national reporter applies the last-transit-country convention to LNG cargoes, regasification and reloads. The interpretation is a **testable hypothesis**, not a proven allocation of the missing US volumes.

## Why this matters
Prior verified extraction of `nrg_ti_gasm`, `G3200`, `MIO_M3`, `EU27_2020`:
- H1 2025 US 25.838331 bcm; total 74.763896 bcm.
- H1 2026 US 29.181938 bcm; total 71.913064 bcm.

NUPI's separately rounded Bruegel-derived EEA figures:
- H1 2025 US 41 bcm; total approximately 71 bcm.
- H1 2026 US 44 bcm; total approximately 70 bcm.

**Difference in US numerators: +15.161669 bcm and +14.818062 bcm**, far larger than the difference in total LNG denominators. Last-transit versus ultimate-origin attribution could shift supplier labels without changing total arrivals much. It cannot yet be asserted as the full explanation.

## Reproducible closure experiment
1. Retrieve the **July 2026 vintage** Bruegel LNG monthly source observations with origin and landing countries, plus Eurostat EU member country monthly partner cells (US, RU, NL, BE, FR, ES, TOTAL, and residual partners) for Jan–Jun 2025/26.
2. Produce **EU-only** Bruegel totals first (do not substitute EEA) and compare each reporting member's total LNG receipts and US-labelled origins with Eurostat. Flag missing values and revision vintage.
3. Calculate how much of the US discrepancy is offset by higher Eurostat **EU transit-hub partner** attributions, especially Netherlands and Belgium. Treat the net EU27 partner attribution and individual member entries separately to avoid double counting.
4. Inspect country-level LNG import questionnaire definitions and any LNG cargo re-export/regasification rules. Compare with independently documented terminal landing records.
5. If annual 2025 Eurostat ultimate-origin data becomes available, compare **matched full-year EU-only Bruegel** against that annual series as an additional test. The current annual dataset advertises coverage only through 2024, so do not pretend it supports 2025.
6. Close the discrepancy only after a partner-level reconciliation explains the majority of the ~15 bcm gap **without assuming a causal policy concession**.

## Editorial decision
This is a **stronger hypothesis** with official methodology, not completed numerical reconciliation. The existing two published series stay separately labeled. Command Meter readiness **53%**, geopolitical influence **null**, national net benefit **null**. No UI or needle changes.
