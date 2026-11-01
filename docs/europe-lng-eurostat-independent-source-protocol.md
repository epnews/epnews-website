# Europe LNG supplier share independent-source reproducibility: Eurostat cross-check protocol

## New primary data discovery
The [Eurostat monthly natural-gas imports dataset `nrg_ti_gasm`](https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gasm/default/table?lang=en) has official monthly quantities by **reporting country**, **origin partner**, **SIEC gas product** (including LNG), **unit** and **month**. Eurostat's metadata lists an update on **22 October 2026** and data through September 2026. Unlike the NUPI analyst paper, this is an independent official data collection and permits a **parallel 2025/2026 source-concentration cross-check**.

The [Bruegel European natural-gas imports dataset](https://www.bruegel.org/dataset/european-natural-gas-imports) is the original source behind NUPI's EEA LNG shares, but raw July-2026-vintage source values have **not** been retrieved. **Do not call Eurostat a reproduction of Bruegel.**

## Exact extraction contract (before any numeric claim)
1. Eurostat `nrg_ti_gasm`; `freq=M`, `siec=G3200` **only after confirming this is the live SIEC LNG code from metadata** (do not assume `G3000` total natural gas equals LNG); `unit=MIO_M3`; `time=2025-01..2025-06,2026-01..2026-06`; `partner=US,RU` and all non-EEA origins.
2. Retrieve either EEA reporting aggregate **if available** or sum individual EEA reporting states with a published country list. Prevent double counting EU aggregate plus members. Exclude Norway as an *external origin* to match NUPI's EEA-external convention; Norway may still be a reporting country. Clarify whether Iceland/Liechtenstein report LNG and whether country/port of landing or final destination is counted.
3. Retrieve `partner=TOTAL` as a control, then reconcile to sum of partners and flags. Do not blindly sum aggregates, confidential categories and constituent countries.
4. Sum six months of **unrounded million cubic metres**, divide by 1000 to bcm, then compute shares from same-series unrounded denominator. Report coverage, missing/confidential flags, geography, source revision date and any discrepancies.
5. Compare official Eurostat independently measured shares against **NUPI/Bruegel-reported** H1 2025/26 shares (US 57→62%, Russia 16→19%). Differences may be due to geography, reporting convention, shipment origin, data revision or coverage; do not force a match.

## Other candidate source, lower confidence
[Brent & Beyond open data](https://www.brentandbeyond.com/data/) advertises a downloadable **EU-27** monthly LNG/pipeline origin CSV assembled from Eurostat, but EU-27 is not EEA. It can corroborate Eurostat data handling, **not** substitute for the July Bruegel vintage or an EEA reconstruction. [Energy Map](https://energy-map.info/en/datasets/990546a0-70a5-4bc1-b265-3708567f6219) also mirrors Eurostat and is not an independent observation.

## Research status / meter gate
**Found:** official primary dataset with matching months, origins and LNG classification. **Not yet done:** authenticated data extraction, six-month country aggregation, published computed shares or vintage reconciliation. Therefore **no new measured percentage is independently verified**. Retain the NUPI attribution, Europe needle unchanged, **53% readiness**, influence and net national benefit null. No UI modifications.
