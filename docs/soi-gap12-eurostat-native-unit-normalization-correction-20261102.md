# Eurostat native dimension normalization correction

Independent review of the official Eurostat household price dataset structures showed the preceding reconciliation tool used display labels instead of native dimension codes. Electricity nrg_pc_204 uses unit `KWH`, currency `EUR`, consumption `KWH2500-4999`, tax `I_TAX`, semester `2026-S1`. Gas nrg_pc_202 uses unit `KWH`, currency `EUR`, household D2 consumption `GJ20-199`, tax `I_TAX`. Check exact gas consumption dimension against current API metadata before submitting data; do not silently accept other bands.

The corrected script takes independently extracted official **EUR per kWh** numeric cells (`valueEURkWh`) and multiplies by 100 to compare with the existing **EUR per 100 kWh** price panel. A numerical agreement without matching unit, currency, band, tax and period is not verification. The script remains fail-closed when source cells are missing and does not alter existing price values or meter scores.

Official dataset references:
- https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204
- https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_202

No exact 2026-S1 cells are introduced by this PR; `upstreamNominalPricesIndependentlyVerified=false` remains unchanged.
