# France LNG: matched monthly EIA US export destination vs Eurostat import partner attribution

**Major evidence finding:** U.S. Energy Information Administration monthly series **NGM_EPG0_EVE_NUS-NFR_MMCF** (U.S. LNG exports by vessel to France) reports positive exports for every month of January–June 2025 and 2026, while Eurostat `nrg_ti_gasm` `G3200` monthly import reporter FR, partner US is zero for both periods.

**Primary EIA source:** https://www.eia.gov/dnav/ng/hist/ngm_epg0_eve_nus-nfr_mmcfm.htm ; accessible monthly reproduction and metadata: https://www.ckeconomics.com/data/us-lng-exports-to-france (source figures updated Oct 22 2026).

| Month | EIA 2025 US→France million cubic feet | EIA 2026 US→France million cubic feet |
|---|---:|---:|
| January | 49,610 | 45,261 |
| February | 64,434 | 32,701 |
| March | 70,290 | 61,535 |
| April | 52,503 | 46,541 |
| May | 52,021 | 18,144 |
| June | 27,282 | 10,869 |
| **H1 sum** | **316,140** | **215,051** |
| **H1 gas-equivalent bcm** | **8.9520878816** | **6.0895661765** |

Conversion `million cubic feet × 0.000028316846592 = bcm` (volume unit conversion only, without calorific or accounting reconciliation).

Eurostat all-partner extraction run #41272584603 artifact #13069403354:
- FR H1 2025 LNG total **16.441131 bcm**; US **0**; DZ **10.907769**; NG **5.533362**.
- FR H1 2026 LNG total **13.028502 bcm**; US **0**.
- EIA France-bound H1 2025 **8.952 bcm** equals about **59.1%** of the previously measured **15.161669 bcm** EU27 vs NUPI/Bruegel US numerator discrepancy. This is an **illustrative scale comparison only**, NOT the fraction of the discrepancy explained: EIA destination and Eurostat import partner definitions, cargo timing, geographic scope and gas-equivalent conversion may differ, and cross-country flows can duplicate/reclassify.
- EIA France-bound H1 2026 **6.090 bcm** equals about **41.1%** of **14.818062 bcm** previously measured EU27 vs NUPI/Bruegel US numerator discrepancy; same caveat.

Additional **official French government** corroboration: France's SDES provisional energy balance 2025 reports US **31% of all natural gas imports** (not LNG-only), while Norwegian gas 36%, Russia 17%; LNG was 64% of all gas imports. https://www.statistiques.developpement-durable.gouv.fr/edition-numerique/chiffres-cles-energie/13-gaz-naturel . This reinforces that US is material to France, but is full-year and all-gas and cannot be directly equated to the H1 LNG series.

**What is now established:** The France Eurostat US=0 is incompatible with reading it as no US LNG exported by vessel to France. This is a matched-month and matched-destination **measurement/classification mismatch**. Not established: specific misclassification mechanism, actual cargo discharge dates, amount of the EU-wide 15 bcm numerator gap causally explained, company revenue or influence.

**Next:** Apply same EIA destination series to Germany and Poland and the full EU destination set; distinguish EU27 from EEA, transit/reexports, month of departure vs arrival, and calorific conversion. Until resolved, do not rewrite Eurostat official cells or calculate a combined adjusted numerator. Readiness **53%**; influence/net benefit null.
