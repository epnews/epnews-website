# EU27 2024 energy dependency: official source reconciliation

**Finding:** EP News had used a modeled EU27 2024 net energy import proxy of 61.51735784436232%. Eurostat's September 2026 energy statistics overview reports **57.3%** EU energy dependency for 2024. Difference: 4.21735784436232 percentage points.

**Official source:** https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_statistics_-_an_overview (Energy dependency section, data extracted September 2026). Eurostat defines energy dependency as net imports divided by gross available energy. Its article reports EU gross available energy 55,790 PJ in 2024 and domestic primary production 23,003 PJ; neither alone should be used to reconstruct the exact published dependency without stock changes and the complete balance.

**Correction:** Replace the modeled EU27 value with the official Eurostat 57.3% in the staged 2024 reporting-year dataset, retain the World Bank WDI country observations, and label the EU's distinct official source in the comparison panel. The World Bank EU aggregate is not published for this indicator; **do not label Eurostat 57.3% as WDI**. This correction does not touch live meter scoring or needle logic.

**Methodological caution:** EU external trade and intra-EU trade must be treated consistently. Eurostat's article notes that underlying import/export tables include intra-EU trade; use the published EU-level dependency ratio rather than reconstructing it from gross fuel trade totals. The earlier 61.52% was a calibrated proxy and is retired for the 2024 reporting-year cohort.
