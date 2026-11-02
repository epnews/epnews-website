# Verified Eurostat all-partners capture: NSP upper-bound test

**Primary artifact:** [official Eurostat LNG all-partners workflow #41398935427](https://github.com/epnews/epnews-website/actions/runs/41398935427), artifact **13120931082** (`europe-lng-all-partners.json`). The workflow succeeded on November 2, 2026. Official dataset `nrg_ti_gasm`, `G3200`, `MIO_M3`; values converted to bcm. NUPI H1 EEA supplier volumes are separately rounded and are not identical in geographical scope.

| H1 | EU27 total | EU27 US-labelled | EU27 NSP | NUPI US rounded | Minimum US gap | Residual even if ALL EU27 NSP were US |
|---|---:|---:|---:|---:|---:|---:|
| 2025 | 74.763896 | 25.838331 | 7.209819 | 41 | 14.661669 | **7.451850 bcm** |
| 2026 | 71.913064 | 29.181938 | 9.818390 | 44 | 14.318062 | **4.499672 bcm** |

The last column assumes NUPI US volumes were rounded to nearest whole bcm, then hypothetically reassigns **every** Eurostat EU27 NSP-coded LNG unit to US origin. This is a mathematical *upper bound on NSP's possible contribution*, **not an actual origin allocation**. Even that extreme reassignment cannot reconcile the NUPI/Eurostat US numerator. Differences in geographical boundary, partner reporting, transit classification, unexamined categories and vintage remain unresolved.

Additional reporter-level official capture results:

| Reporter | H1 2025 NSP / total bcm | H1 2026 NSP / total bcm |
|---|---|---|
| Germany | 4.020376 / 4.020376 (100%) | 6.177744 / 6.177744 (100%) |
| Poland | 3.187868 / 4.110640 (77.55%) | 3.619022 / 4.253218 (85.09%) |
| France | 0 / 16.441131 | 0 / 13.028502 |

France's LNG is attributed to other country codes; France US-coded zero does not prove absence of physical US cargo. Germany and Poland NSP should not be inferred as US-origin. EU27 aggregate must not be added to its constituent member-country totals. The new executable audit reads the original artifact as input and checks these residuals without hard-coding its source observations.

**Finding:** NSP alone is quantitatively insufficient to explain the ~15 bcm mismatch under the published definitions. This narrows the source discrepancy but does not establish causal political leverage, close an influence gate, or authorize scores. Overall SOI evidence audit remains 20/30; meter readiness 53%.
