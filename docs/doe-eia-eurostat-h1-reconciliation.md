# DOE–EIA–Eurostat LNG destination reconciliation: verified H1 baseline

Primary DOE artifact: GitHub Actions run [41274597029](https://github.com/epnews/epnews-website/actions/runs/41274597029), artifact 13071205431. Official DOE LNG exports/re-exports workbook Jan 2016–Aug 2026. DOE workbook was parsed by vessel, gas type LNG, activity exports vs re-exports, country and departure month.

| H1 | DOE vessel LNG exports to declared EU27 destinations (bcm) | Eurostat EU27 LNG imports partner US (bcm) | Difference DOE less Eurostat (bcm) | NUPI/Bruegel EEA US LNG rounded (bcm) |
|---|---:|---:|---:|---:|
| 2025 | 42.113690658 | 25.838331 | 16.275359658 | ~41 |
| 2026 | 43.359559983 | 29.181938 | 14.177621983 | ~44 |

DOE reported **zero LNG vessel re-exports** to EU27 in both H1 periods in this extracted ledger. 2025 ledger counted 791 export transactions worldwide, 2026 995 worldwide (not EU27-specific counts). Thirteen EU27 destinations recorded positive DOE LNG exports in each period. DOE/EIA France H1 2025 ~8.952 bcm and H1 2026 ~6.090 bcm; DOE Germany ~4.188 and ~5.385; DOE Poland ~3.34 and ~3.65. All DOE values are departure-destination, **not proof of European customs imports**.

Eurostat source: `nrg_ti_gasm`, G3200, EU27_2020, US partner, MIO_M3, months January–June of each year. Source extraction run 41270962043 artifact 13068699602. Earlier Eurostat partner audit found significant country-level coding to NSP and other partners, so it is **incorrect** to interpret the ~14–16 bcm arithmetic difference as physically missing gas or deliberate misreporting.

NUPI/Bruegel EEA rounded estimates ~41 and ~44 bcm are a **third distinct methodology/geography**, not an exact validation of DOE EU27 totals. EU27 vs EEA, departure vs arrival dates, transit/re-gasification, and partner classification must be reconciled before attributing a discrepancy to any single cause.

Reconciliation workflow recalculates DOE from the official workbook and produces JSON with matched period comparisons, six country checkpoints and explicit limitations. Eurostat/NUPI benchmarks are versioned constants from prior source artifacts; re-fetch those before claiming a fresh updated comparison.

**Open evidence questions:** Map Eurostat partner NSP and LNG terminal cargo receipts to DOE declared destinations; obtain customs and port receipts for France, Germany, Poland; align vessel departure/arrival lags and EU27/EEA definitions. No net US benefit or geopolitical influence score. Meter editorial readiness remains 53%.
