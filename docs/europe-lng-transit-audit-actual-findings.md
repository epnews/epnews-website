# Actual Eurostat transit-partner extraction findings — workflow 41272337466

**Source:** [successful GitHub Actions run](https://github.com/epnews/epnews-website/actions/runs/41272337466), artifact ID **13069926216**, digest `sha256:bb162d5316b43c1611ef6473acc46d8eb41ec801681152f536753b63b00d710a`. File `europe-lng-transit-attribution.json`. All 84 combinations (12 geographies × 7 partners) returned without request errors; data has missing-value handling. Values below are half-year totals in **bcm**.

| Reporter | 2025 total LNG | 2025 US attributed | 2026 total LNG | 2026 US attributed |
|---|---:|---:|---:|---:|
| France | 16.441 | 0 | 13.029 | 0 |
| Germany | 4.020 | 0 | 6.178 | 0 |
| Poland | 4.111 | 0 | 4.253 | 0 |
| Netherlands | 13.297 | 9.567 | 13.266 | 10.543 |
| Belgium | 7.511 | 1.780 | 7.609 | 2.743 |
| EU27 aggregate | 74.764 | 25.838 | 71.913 | 29.182 |

**Crucial finding:** EU27 monthly LNG attributed to partner NL+BE+FR+ES sums to **0.112 bcm** in H1 2025 and **0.159 bcm** in H1 2026. These four reported partner labels do not directly explain the ~15 bcm discrepancy against NUPI/Bruegel US-origin totals. This does **not disprove** last-transit reporting effects through other partners or nonreported categories.

For France, Germany and Poland, all four queried European transit-partner labels, plus US/Russia, are zero or near zero in this extraction despite substantial total imports. Their imports may be attributed to other partners, confidential/unspecified categories, or reflect national reporting methodology. Do not call the residual 'unknown origin': it includes all **unqueried** partner countries.

**Residual diagnostic** (TOTAL minus only the six named partner cells US, RU, NL, BE, FR, ES; therefore includes other legitimate partners):
- EU27 H1 2025: **41.384 bcm**; H1 2026: **34.837 bcm**.
- France H1 2025: **16.441 bcm**; H1 2026: **13.029 bcm**.
- Germany H1 2025: **4.020 bcm**; H1 2026: **6.178 bcm**.
- Poland H1 2025: **4.111 bcm**; H1 2026: **4.246 bcm**.

**Next decisive data collection:** query ALL reported Eurostat `partner` codes for G3200 by reporter/month and rank positive residual origins, including `UNKNOWN`, `NSP` and any confidential categories if actually present. Then crosswalk each reporter to independent cargo landing/origin data for matching period, starting with France, Germany and Poland. Avoid summing nested regional and country totals together. The source artifact alone does not provide this full breakdown.

**Status:** extraction complete; transit-hub named-partner hypothesis not supported by these specific figures; full partner classification unresolved. No Europe influence dial activation, readiness 53%, no national benefit score.
