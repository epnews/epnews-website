# Europe LNG H1 2025–26: rounded-source bounds and origin attribution

## Numerical bounds from published precision

NUPI reports integer bcm values, apparently rounded, while the Eurostat series has six decimal places. Assuming conventional nearest-integer rounding for each NUPI **supplier volume**, the US true volume must lie in [40.5,41.5) bcm in H1 2025 and [43.5,44.5) bcm in H1 2026. Therefore the discrepancy with the **Eurostat US-labelled numerator** is bounded as follows:

| Period | Eurostat US-labelled bcm | NUPI rounded US bcm | Minimum discrepancy | Maximum discrepancy |
|---|---:|---:|---:|---:|
| H1 2025 | 25.838331 | 41 | 14.661669 | <15.661669 bcm |
| H1 2026 | 29.181938 | 44 | 14.318062 | <15.318062 bcm |

Thus **rounding cannot explain the US-attributed-volume discrepancy**. These bounds are conditional on nearest-integer rounding, not a claim that the source used that exact convention.

NUPI independently rounds three supplier buckets; adding their integer values yields 71 and 70 bcm, but each actual summed total can differ by up to 1.5 bcm. Treat reported 57% and 62% as separately rounded, not as exact ratios of integer volumes.

## Source-definition diagnostic

Eurostat's monthly gas-trade methodology can attribute imports to last transit country, whereas annual statistics describe ultimate origin. This is a plausible contributor to the mismatch but **not an established quantitative explanation**. France's monthly LNG US-coded zero alongside substantial reported imports, and Germany's large `NSP` entries, indicate that reporter-specific partner classifications require independent investigation. Do not relabel `NSP` as US origin or infer cargo provenance from contract suppliers.

The prior transit-partner extraction found only 0.112 bcm (2025) and 0.159 bcm (2026) in EU27 NL+BE+FR+ES partner labels. That rules out those four labels alone as the missing ~15 bcm attribution, but not other reporting classifications. The France/DZ+NG and Germany/NSP entries are **classification questions**, not corrections to NUPI.

## Priority for the next primary-data batch

1. Retrieve all Eurostat `nrg_ti_gasm` `G3200` partner codes by reporter and month, particularly France, Germany and Poland. Keep zero, missing and confidential cells distinct.
2. Independently match 2025/2026 terminal arrivals by physical origin, landing country and month; use France as the first test of the discrepancy.
3. Obtain Bruegel July 2026 raw EU-only and EEA-external monthly cargo series to compare like-for-like. NUPI and Bruegel are one underlying source family, not independent corroboration.
4. Recompute partner allocation sensitivity and document unexplained residual without assigning it to any supplier.

**Editorial boundary:** This is a quantified descriptive discrepancy, not evidence of a policy concession, causation or geopolitical leverage. Do not close any of six causal requirements or activate Europe influence scoring. Command-meter readiness remains 53%; overall SOI evidence audit remains 20/30.
