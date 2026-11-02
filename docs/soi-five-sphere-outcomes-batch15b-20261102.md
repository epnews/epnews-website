# SOI five-sphere outcomes: second consolidated 15-observation research batch (2 November 2026)

This **research-only** supplement to `data/soi-five-sphere-verified-outcomes-batch15-20261102.json` adds **15 nonduplicate source-opened measurements** across the US, China, Russia, EU and India. A government statistic is a verified *official published figure*, not independent external corroboration. Ember and CREA provide third-party analysis but remain estimates subject to their methods. No observations are promoted to a geopolitical influence score.

## Actual outcomes, not promises

| ID | Actual reported outcome | Primary or independent source |
|---|---|---|
| US-CHINA-2025-GOODS-IMPORTS | US goods imports from China **$308.7bn**, down **29.9%** in 2025 | USTR official estimate |
| US-CHINA-2025-GOODS-EXPORTS | US goods exports to China **$106.0bn**, down **26.0%** | USTR official estimate |
| US-INDIA-2025-SERVICES-TRADE | US–India services trade **$90.4bn**, with $42.9bn US exports and $47.6bn imports (rounding difference) | USTR official estimate |
| EU-2025-ENERGY-IMPORT-VALUE | EU energy imports **€336.7bn** in 2025; Eurostat states **−11.1%** YoY | Eurostat Comext |
| EU-2025-ENERGY-IMPORT-MASS | EU energy imports **723.3m tonnes** in 2025; Eurostat states **−0.6%** YoY | Eurostat Comext |
| EU-2026Q1-LNG-ORIGIN-SHARES | EU LNG supplier shares: US **57.4%**, Russia **17.3%** (basis not explicit in article) | Eurostat Comext |
| EU-2026-10-UKRAINE-FACILITY-CASH | Commission released **€2.9bn** on 2 Oct 2026, **including** €0.8bn from Ukraine Support Loan | European Commission payer statement |
| CHINA-2025-SOLAR-OPERATING-GENERATION | China solar generated **1,175 TWh** in 2025, up **336 TWh** | Ember independent analysis |
| CHINA-2025-WIND-OPERATING-GROWTH | China wind generation increased **138 TWh** in 2025 | Ember independent analysis |
| CHINA-2025-FOSSIL-GENERATION-CHANGE | China fossil generation **fell 56 TWh** in 2025 | Ember independent analysis |
| RUSSIA-2026-09-FOSSIL-EXPORT-GROSS | Russia fossil export gross revenues **€625m/day** in Sept 2026 | CREA independent model |
| RUSSIA-2026-09-LNG-EXPORT-GROSS | Russian unloaded LNG cargo gross revenues **€75m/day**, up **68%** MoM, included in total | CREA independent model |
| RUSSIA-2026-09-SANCTIONED-SHADOW-TANKERS | **57%** of Russian seaborne oil transported by sanctioned shadow tankers | CREA modeled flows |
| INDIA-FY2025-26-SOLAR-CAPACITY-ADDED | **34,955.24 MW** solar installed capacity added during Indian FY2025–26 through Jan 2026 | India Ministry of Power Lok Sabha answer |
| INDIA-2025-RENEWABLE-OPERATING-GROWTH | Indian renewable electricity generation rose **98 TWh** in 2025 (solar +53, wind +22, hydro +21) | Ember independent analysis |

## Directly opened sources and provenance

- US Trade Representative, China: https://ustr.gov/countries-regions/china-mongolia-taiwan/peoples-republic-china
- US Trade Representative, India: https://ustr.gov/countries-regions/south-central-asia/india
- Eurostat, **25 March 2026**, 2025 energy imports: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260325-3
- Eurostat, **26 June 2026**, Q1 2026 LNG: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260626-2
- European Commission, **2 October 2026**, eighth Ukraine Facility disbursement: https://enlargement.ec.europa.eu/news/commission-disburses-eur29-billion-under-ukraine-facility-support-financial-stability-and-reforms-2026-10-02_en
- Ember, *Global Electricity Review 2026*, country profiles: https://ember-energy.org/latest-insights/global-electricity-review-2026/major-countries-and-regions/
- CREA, **20 October 2026**, September Russia exports: https://energyandcleanair.org/september-2026-monthly-analysis-of-russian-fossil-fuel-exports-and-sanctions/
- India Ministry of Power, **12 March 2026**, Lok Sabha capacity reply: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2238921&lang=1&reg=1

## Three material audit cautions

1. **Eurostat historical-vintage mismatch:** its 25 March 2026 release reports 2025 EU energy imports of €336.7bn / 723.3m tonnes, with respective −11.1% / −0.6% changes. Its *earlier* 21 March 2025 release gave 2024 €375.9bn / 720.4m tonnes. Directly computing changes across these releases produces inconsistent growth rates; this may reflect data revisions or definition changes, **not a valid new measured growth estimate**. Use the *same vintage* and pull revised Comext cells before doing annual value-per-tonne or attribution work. Earlier source: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250321-1
2. **Overlap and definitions:** Russia's €75m/day LNG is a subset of €625m/day all-fuel gross revenue. EU €0.8bn Support Loan is included in €2.9bn Facility disbursement. Chinese solar and wind generation contribute to total clean growth; Indian FY-to-January installed MW and calendar-year TWh are different denominators. USTR services components sum to $90.5bn versus $90.4bn published total due to rounding.
3. **Measured output is not influence:** actual imports, generated power, installed capacity and released loan cash are observations. None measures the *counterfactual effect* of sanctions, tariffs, diplomacy or financial aid. Gross energy trade values are not net national benefit, and revenue models are not audited cash receipts.

## Next cost and counterfactual gates

Obtain matched Comext source-vintage annual series and LNG share denominators; reconcile Ukraine cash to recipient treasury statements; price Russian oil discounts, shipping, tax and insurance costs; obtain India and China plant-level capex/curtailment and generation cost; use weather-adjusted power demand and product-matched trade baselines; verify official estimates independently before promotion.

The existing command meter, needle, selectors, comparison controls, evidence panels and publishing code are untouched. The 30-item audit stays **20/30**. Run `node scripts/audit_soi_five_sphere_outcomes_batch15b_20261102.cjs` for the research evidence guard. The repository's existing research-only three-check auto-merge workflow must be the sole merge mechanism.
