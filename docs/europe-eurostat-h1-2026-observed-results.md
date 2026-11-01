# Official Eurostat EU-27 LNG import origin results — successful extraction

**Evidence:** GitHub Actions manual run [#41270962043](https://github.com/epnews/epnews-website/actions/runs/41270962043), success; artifact **13068699602**, SHA256 `5713d5aeec5c97da891e7a03bde7fff1de4206e6b22405bf9435ee1f951d2383`, source observations JSON `europe-eurostat-eu27-lng-observations.json`. Extraction code: `scripts/extract_eurostat_eu27_lng.py`; official Eurostat dataset `nrg_ti_gasm`, `siec=G3200`, `unit=MIO_M3`, `geo=EU27_2020`, partners US/RU/TOTAL, January–June of each year.

| Metric | H1 2025 | H1 2026 | Change |
|---|---:|---:|---:|
| EU-27 US LNG imports (bcm) | 25.838331 | 29.181938 | +3.343607 |
| EU-27 Russian LNG imports (bcm) | 7.428523 | 7.734844 | +0.306321 |
| EU-27 total LNG imports (bcm) | 74.763896 | 71.913064 | -2.850832 |
| US share (%) | 34.559904 | 40.579467 | +6.019563 percentage points |
| Russia share (%) | 9.935976 | 10.755826 | +0.819850 percentage points |

**CRITICAL: Not interchangeable with NUPI/Bruegel.** NUPI reports **EEA external-origin LNG** H1 US shares 57→62% and Russia 16→19%; Eurostat here reports EU-27 `nrg_ti_gasm` `G3200` imports with its own product and trade-partner definitions. Differences are large and cannot be attributed *only* to EU/EEA geographic boundaries without further reconciliation. In particular, inspect whether Eurostat `G3200` means *LNG as traded product* or whether NUPI's customs/vessel-based LNG imports include volumes or flows not captured by the selected Eurostat category; also confirm source coverage and missing partner flags. **Do not use the new 40.58% as an EEA LNG dependency score.**

**Evidence quality:** GREEN for faithful transcription of downloaded EU-27 Eurostat API output and arithmetic; YELLOW for interpreting product/partner comparability; RED/OPEN for explaining disagreement with NUPI/Bruegel and for converting import shares into political leverage. The GitHub run passed extraction and offline tests, not a full independent audit of Eurostat's classification.

**Decision:** Add EU-27 observed import-share series as an explicitly separate indicator only; **do not change existing Europe needle, readiness 53%, national-benefit or geopolitical influence scores** until definition and denominator reconciliation. Do not claim EU methane policy was caused by these flows.
