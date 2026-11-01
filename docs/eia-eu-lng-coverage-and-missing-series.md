# EIA LNG destination coverage: validated partial results, not EU-wide totals

Extraction run [41273413346](https://github.com/epnews/epnews-website/actions/runs/41273413346), artifact **13069877695**, succeeded technically after PR #275. Actual artifact: **10/27** EIA destination series retrieved, **17/27** HTTP 404. These are unavailable XLS series, not zero exports.

Observed partial sum for retrieved countries: **30.93 bcm H1 2025**, **31.51 bcm H1 2026** (rounded). These numbers cover only the retrieved subset and are **not** EU27 total, nor a defensible US export share. Not every retrieved country has necessarily complete months; the machine-readable coverage audit computes totals only for six valid months.

Observed destinations (rounded bcm):
| Country | H1 2025 | H1 2026 |
|---|---:|---:|
| France | 8.95 | 6.09 |
| Poland | 3.34 | 3.65 |
| Netherlands | 8.88 | 8.65 |
| Belgium | 2.03 | 2.54 |
| Italy | 5.07 | 7.31 |

Germany is among 404s, so **German EIA destination data remains null**. No assumption that its physical US LNG deliveries were zero.

New coverage workflow independently retrieves source data and emits per-country failure codes, month completeness, partial sums and **EU27 total null unless every destination is complete**. This safeguards against falsely claiming reconciliation with Eurostat/NUPI ~15 bcm numerator gap.

**Next evidence acquisition:** investigate EIA aggregate Europe destination series and official monthly DOE LNG cargo exports by destination (country names) to recover unavailable EIA legacy series; cross-check EU27/EEA coverage and avoid double counting. No geopolitical score or net benefit assigned. Meter readiness **53%**.
