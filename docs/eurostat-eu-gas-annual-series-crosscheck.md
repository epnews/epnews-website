# Eurostat EU27 natural-gas dependency: annual-series cross-check

- Official annual Eurostat dataset `nrg_ind_id`, geography `EU27_2020`, commodity `G3000` (natural gas), unit `PC` reports **93.690% for 2024**.
- The **2025 observation is absent** from that annual indicator as checked in November 2026.
- Separately, Eurostat's *Natural gas supply statistics* reports **87.6% for 2025** using provisional monthly cumulated gas-balance data (June 2026 publication).
- **Do not calculate or publish a matched 2024–2025 percentage-point change** between the annual 2024 and provisional 2025 figures without verifying methodological equivalence. Do not substitute either gas figure for the all-energy EU dependency metric.
- The live reporting-year dropdown retains 2025 gas as supporting evidence only, with no impact on scores, needles, or cross-SOI comparisons.

Sources:
- https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ind_id?geo=EU27_2020&time=2024
- https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ind_id?geo=EU27_2020&siec=G3000&unit=PC&time=2025
- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Natural_gas_supply_statistics
