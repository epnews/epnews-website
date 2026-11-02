# SOI GAP-12 — Independent Eurostat household nominal-price source audit (2026-11-02)

## Scope
Eleven country/commodity semester pairs already archived in the SOI GAP-12 panel: six electricity and five natural-gas comparisons, 2025-S2 to 2026-S1, EUR per 100 kWh, household customers, taxes included. This is **source corroboration**, not a replacement of original Eurostat machine-readable series. Do not increase audit completion or authorize geopolitical influence scores based on this review.

## Independently checked 2025-S2 anchors — 11/11 exact

Eurostat's **5 May 2026** household electricity news release (https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260505-1) explicitly reports: IE 40.42, DE 38.69, BE 34.99, HU 10.82, MT 12.82, BG 13.55 EUR/100kWh. These match the existing six panel values.

Eurostat's **5 May 2026** household gas news release (https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260505-2) explicitly reports: SE 20.92, NL 17.19, HU 3.40, HR 5.43, RO 5.66 EUR/100kWh. These match the existing five panel values.

## Independently checked 2026-S1 contextual anchors — 11/11 rounded, NOT exact

Eurostat's **30 October 2026** electricity release (https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20261030-2) reports country price bands: IE approximately 0.39 EUR/kWh; DE and BE approximately 0.36; HU approximately 0.11; MT and BG approximately 0.13. Existing panel values in EUR/100kWh are IE 38.71, DE 36.18, BE 35.75, HU 11.39, MT 12.68, BG 13.41. These are directionally and rounding-consistent, but the news release is rounded to cents per kWh, **not enough to independently verify the hundredth-EUR/100kWh exact inputs**.

Eurostat's **30 October 2026** gas release (https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20261030-3) reports SE approximately 0.22 EUR/kWh, NL 0.16, HU 0.03, HR 0.05, RO 0.06. Existing panel inputs SE 22.01, NL 16.22, HU 3.30, HR 5.02, RO 5.94 EUR/100kWh are consistent with rounded news figures but not exact verification.

## Source hierarchy and remaining verification

The canonical country-by-country values must be extracted from Eurostat's official **nrg_pc_204** (household electricity) and **nrg_pc_202** (household gas) series, matching geo, period, consumption band, tax level, unit, and consumer definition. Source dataset for gas: https://ec.europa.eu/eurostat/databrowser/view/NRG_PC_202/default/table?lang=EN ; electricity: https://ec.europa.eu/eurostat/databrowser/view/NRG_PC_204/default/table?lang=EN . Do not substitute the news article's rounded figures for exact dataset cells. Do not treat 2025-S2 to 2026-S1 changes as the same as the news release's year-over-year comparisons.

The prior HICP file's 11 real-price percentage changes remain **conditional on upstream 2026-S1 exact nominal inputs**; `upstreamNominalPricesIndependentlyVerified=false` remains correct until dataset-cell-level verification is complete. General consumer HICP deflation is not energy-specific inflation. No firm profits, national net benefits, or SOI influence inferred. Existing moving needle, selectors, comparisons, and evidence panels must remain unchanged.
