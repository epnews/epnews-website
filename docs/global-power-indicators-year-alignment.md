# Global Power Indicators — reporting-year alignment audit

## Scope
The public interface is renamed without changing stored selector values or underlying scoring logic. The **All indicators** selector retains the legacy internal value `Overall change` to preserve existing dashboard behavior.

## Existing verified observations
| Indicator | Current observation | Measurement type | Alignment issue |
| --- | --- | --- | --- |
| Economic growth | 2025 real GDP growth, World Bank | Annual rate | Needs 2024 companion observation |
| Military spending | 2025 real military spending change, SIPRI | Year-over-year rate | Needs comparable 2024 change and source revision review |
| Energy & resources | 2024 net energy imports as % of energy use, World Bank / IEA | Level, not change | Needs comparable 2025 observation; EU 2024 value is modeled and not an official IEA country observation |

## Validation gates before a common-year index
1. Obtain 2024 and 2025 values for all five SOIs, with matching indicator definitions, periods and sources.
2. Label missing values explicitly rather than carrying observations forward without disclosure.
3. Keep EU modeled energy values visually and analytically separate from official observations.
4. Do not combine GDP growth, military spending change, and energy-dependence levels into a purported geopolitical influence score.
5. Retain original-unit observations and existing needle behavior while reviewing a separate scoring methodology.

## Known limitation
This PR is a **label-only interface milestone plus research audit**. It does not activate an overall composite needle or claim that same-year datasets have been completed.

## Source audit — 2 November 2026

### Energy reporting-year ceiling
The World Bank WDI indicator `EG.IMP.CONS.ZS` currently reports a **1990–2024** reference period. A complete **2025** panel is therefore **not available from this source**. Do not extrapolate or label 2024 observations as 2025. The WDI European Union aggregate currently displays 2023 as its most recent year; the existing 2024 EU modeled proxy must remain explicitly modeled.

- WDI definition and coverage: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/EG.IMP.CONS.ZS
- Published country-year coverage: https://data.worldbank.org/indicator/EG.IMP.CONS.ZS

### 2024 SIPRI real military expenditure growth — independently documented country values
The SIPRI April 2025 fact sheet provides these **2023–2024** changes in real terms. They are source-publication figures, not yet a reconciled current-vintage series; SIPRI replaces prior annual releases when updating its database.

| SOI | 2024 real military expenditure change | Source status |
| --- | ---: | --- |
| United States | +5.7% | SIPRI 2024 fact sheet |
| China | +7.0% | SIPRI estimate |
| Russia | +38% | SIPRI estimate, rounded |
| India | +1.6% | SIPRI 2024 fact sheet |
| EU27 | **Not established here** | Must aggregate the 27 EU member states, excluding non-EU Europe, in constant-price terms and with a consistent source vintage |

- SIPRI 2024 fact sheet: https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024
- SIPRI database and revision policy: https://www.sipri.org/databases/milex

### Outstanding before publishing a common-year comparison
1. Obtain and record WDI 2024 real GDP growth for USA, CHN, RUS, IND and EU27 with the same indicator and retrieval vintage.
2. Reconcile 2024 military spending growth against the latest SIPRI database vintage, including an EU27 constant-price aggregate; do not use the SIPRI *Europe* regional total as EU27.
3. Verify that all 2024 energy import dependence observations share the same IEA/WDI definition; keep the modeled EU value separate.
4. Display 2024 and 2025 as **separate** selectable year cohorts; mark 2025 energy data missing until verified.
5. Treat real military spending increases as expenditure changes, not automatically positive geopolitical outcomes.

**Publication status:** research evidence only. No new live meter values, composite score, or dial behavior authorized by this audit.

## Verified 2024 GDP growth cohort (WDI, retrieved November 2026)

Indicator: World Bank World Development Indicators `NY.GDP.MKTP.KD.ZG`, annual real GDP growth (%), calendar year 2024. The **European Union** aggregate is EU27, not the euro area. Values below are published one-decimal observations, not historical forecasts.

| SOI | 2024 real GDP growth | 2025 real GDP growth (same WDI table) |
| --- | ---: | ---: |
| United States | 2.8% | 2.2% |
| China | 5.0% | 5.0% |
| Russia | 4.9% | 1.0% |
| India | 7.1% | 7.6% |
| European Union (EU27) | 1.1% | 1.5% |

**Direct WDI DataBank table:** https://databank.worldbank.org/reports.aspx?country=USA%2CEMU%2CEUU%2CRUS%2CCHN%2CIND%2CBRA&series=NY.GDP.MKTP.KD.ZG&source=2

**Interpretation:** These are annual GDP growth *rates*. Subtracting 2024 from 2025 yields a change in the annual growth rate in percentage points, **not** GDP growth itself, GDP size, global output share or international influence. The 2024 GDP panel is now complete; the 2024 EU27 SIPRI constant-price military aggregate remains outstanding. Do not substitute SIPRI's wider Europe region for EU27.

**Live-site gate:** This update records verified source data in research documentation only. It does not alter the dashboard's 2025 observations, needle logic, or any composite score.
