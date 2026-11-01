# H1 2025–2026 EIA coverage-adjusted domestic natural gas gross-value audit

The prior H1 incidence audit multiplied an arithmetic average of EIA on-system sale prices by all residential/industrial deliveries. This is methodologically misaligned. This audit instead joins **each monthly price** to **each monthly delivery volume** and adjusts volume using the national Table 24 on-system price-coverage percentage for the same sector, month and year.

For each month: `covered sales (Bcf) = total deliveries (Bcf) × coverage (%) / 100`; `modeled gross sales value (USD million) = covered sales (Bcf) × EIA on-system price (USD/Mcf)`. Six monthly estimates are summed separately for each year and sector. Volume is fetched from the official EIA DNav monthly XLS series and source SHA256s are retained. Missing months cause a hard failure. Prices are the verified monthly price series committed earlier.

The 12 monthly national coverage percentages per sector were transcribed from the October 2025 archived and October 2026 current Table 24 PDFs and remain **PENDING_INDEPENDENT_REVIEW** pending independent page/header-to-month validation. Consequently results are **PROVISIONAL_NOT_FOR_PUBLICATION**. The workflow intentionally checks that publishable is false. The calculations do not alter Command Meter controls or the readiness estimate.

These are nominal *modeled gross on-system sales values*, not verified customer bills, actual utility receipts, profits, inflation-adjusted impacts, LNG-export-caused domestic costs, or net national economic benefits. Coverage ratios are rounded and may not precisely replicate billed gas sales. The H1 change is descriptive, not causal. All economic and geopolitical score fields remain null.

Source PDFs:
- https://www.eia.gov/naturalgas/monthly/archive/2025/2025_10/pdf/table_24.pdf
- https://www.eia.gov/naturalgas/monthly/pdf/table_24.pdf

To complete: independently verify all monthly national Total rows and sector columns against source pages, then update review status through a separate reviewed PR, run the workflow, and compare with the original unadjusted proxy.
