# IEA free World Energy Balances Highlights: five-SOI feasibility audit
**Research-only. No activation or five-actor numeric comparison.**

## Official 2026 release
IEA World Energy Balances Highlights is free, last updated 14 October 2026, and advertises selected flows for 64 countries and regions. Download format XLSX, with an account sign-in/register prompt on the product page. The public landing page does not enumerate all 64 actors, all selected flows, or the downloadable workbook contents. Therefore **Russia, EU27 aggregate, and import/export flow coverage remain unverified**, not assumed present.
Source: https://www.iea.org/data-and-statistics/data-product/world-energy-balances-highlights

## Critical period comparability issue
IEA's April 2026 World Energy Balances documentation says **India is reported on a fiscal-year basis**: IEA year Y corresponds to 1 April Y through 31 March Y+1. This must be reconciled with calendar-year data for the other actors before calling a five-actor comparison same-period.
Source: https://iea.blob.core.windows.net/assets/4c066cb0-d2bd-4d53-9053-5a4f654c11d3/EARLYBAL_Documentation_April2026.pdf

## Full IEA source is distinct from the free highlights
IEA's paid World Energy Balances (July 2026) advertises 156 countries, 34 aggregates, and detailed 98 flows; it does not follow that the **free** 64-country extract contains every actor or the net-import inputs. The paid product also calls out licensing for derived data/services.
Source: https://www.iea.org/data-and-statistics/data-product/world-energy-balances

## Acceptance checklist for workbook audit
1. Obtain the free 14 October 2026 XLSX legitimately through the IEA free account download (or other authorized public source).
2. Enumerate actual region codes and confirm United States, China, Russia, India, EU27 aggregate. If EU only is present, document whether it represents EU27.
3. Enumerate 2024 flows and verify imports, exports, total energy supply, bunkers, stock changes and energy product aggregation.
4. Verify India fiscal-year treatment and EU external trade boundary; reconcile with IEA primary energy use.
5. Verify non-CC material reuse terms for website display and derived comparisons.
6. Only then run existing five-actor comparability gate and command-meter tests before a separate implementation PR.

## Result
The public page verifies that a free XLSX exists; it does **not** substantiate a five-actor apples-to-apples import-dependence series. Do not fill missing values by averaging Eurostat denominators or mix Eurostat 57.29% / exploratory 61.04% with WDI values.

## Direct workbook inspection — uploaded 2026 Highlights XLSX

User supplied the official workbook `World Energy Balances Highlights 2026.xlsx`. Sheet `TimeSeries_1971-2025` contains 2024 columns and the product `Total` with flows `Production (PJ)`, `Imports (PJ)`, `Exports (PJ)`, and `Total energy supply (PJ)`. **Exports are negative in the source**, so net imports = Imports + Exports.

| Actor | 2024 imports PJ | 2024 exports PJ (negative) | 2024 TES PJ | Net imports / TES |
|---|---:|---:|---:|---:|
| United States | 21493.393274 | -30479.379067 | 91869.278589 | -9.781274% approx |
| People's Republic of China | 45594.436454 | -3840.667639 | 173834.994958 | 24.019197% approx |
| India | 20026.581438 | -3029.933619 | 47172.909257 | 36.030528% approx |

These three ratios reproduce the published World Bank 2024 series to displayed precision, a significant independent validation of the common IEA accounting basis. The workbook's `Country` column **does not include Russia or an EU27 aggregate**. The free extract is therefore insufficient for a five-SOI comparison. Do not replace Russia with a broad Eurasian region or the EU with a partial member-state sum.

The earlier note's access uncertainty is now resolved by direct workbook inspection. Remaining blocker is **coverage**, not the ability to download. The India fiscal-year qualification still needs explicit presentation even when all three ratios reproduce WDI.

**Next action:** obtain authorized IEA data for Russia and EU27 with matching 2024 flows; alternatively independently verify complete EU27 constituent coverage from the same IEA vintage. Retain the existing research-only gate and do not change meter scores or needles.
