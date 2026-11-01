# EIA Natural Gas Monthly Table 24 coverage reconciliation

This replaces the nonexistent candidate EIA DNav onsystem-volume series used by PR #292. EIA's [October 2026 Natural Gas Monthly](https://www.eia.gov/naturalgas/monthly/) identifies [Table 24](https://www.eia.gov/naturalgas/monthly/pdf/table_24.pdf) as the percentage of total deliveries included in residential, commercial, and industrial prices, by state, 2024–2026.

The workflow downloads the actual Table 24 PDF, records its SHA256 and extracts candidate United States rows with page references for human verification. It **does not claim that raw PDF rows are automatically mapped to all 12 target months**. Table 24 spans multiple pages, years, and months; column headings must be paired with the correct row and publication vintage before accepting any percentage. National aggregate coverage must not be replaced with a single state's percentage or an unweighted state average.

**Future verified computation:** onsystem sales MMcf = matched total sector deliveries MMcf × EIA national sector/month coverage percentage ÷ 100. Onsystem gross sales estimate million USD = onsystem MMcf × matched monthly retail price USD/Mcf ÷ 1000. This is a derived estimate based on published rounded coverage percentages, **not audited revenue or actual household bills**. Coverage of price surveys, reporting revisions and rounding are limitations. Verify Table 24 national percentages before enabling any numeric sales result.

The source artifact and JSON extraction evidence are a preliminary research milestone, not a completed reconciliation. No unsupported cost or geopolitical scores; Command Meter UI untouched, editorial readiness remains 53%.
