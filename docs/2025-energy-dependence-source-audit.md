# 2025 net energy import dependence — availability audit

Checked 2026-11-03 against the World Bank WDI API for indicator `EG.IMP.CONS.ZS` (net energy imports as percent of energy use), source IEA. API metadata reports `lastupdated: 2026-10-08`.

Source URL: https://api.worldbank.org/v2/country/USA;CHN;RUS;IND;EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2024:2025&per_page=100

**2025:** all five requested entities (US, China, Russia, India, EU) return JSON `value: null`. **2024:** US, China, Russia and India have values; the EU aggregate returns `null` in the WDI series, so the site's 2024 EU energy number must remain explicitly labeled **modeled proxy**, never official WDI/IEA.

**Publication decision:** preserve missing 2025 energy cells; do not use zero, copy 2024 observations into 2025, or substitute LNG export share for energy import dependence. Recheck the source when the underlying data release changes. This audit is a source-availability snapshot, not a forecast or geopolitical influence measure.

Validation: `node scripts/test_2025_energy_availability.cjs`. No live meter or needle changes.
