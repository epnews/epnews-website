# EU27 2024 military spending — completed source audit

**Result: +14.6181367934% real change from 2023 to 2024**, derived from the April 2026 SIPRI Military Expenditure Database via Our World in Data's SIPRI-sourced CSV. All 27 EU member states have nonmissing 2023 and 2024 observations in constant 2024 US dollars. This is an **analyst-calculated EU27 aggregate**, not a SIPRI-published EU27 headline figure.

- 2023: USD **314,277,593,850** in constant 2024 dollars.
- 2024: USD **360,219,122,430** in constant 2024 dollars.
- Difference: USD **45,941,528,580** in constant 2024 dollars.
- Calculation: `100 × (360219122430 / 314277593850 − 1) = 14.6181367934%`.
- Reproducible 27-row input: `data/eu27-sipri-2024-country-audit.csv`.
- Test: `node scripts/test_eu27_sipri_2024.cjs`.

**Source:** https://ourworldindata.org/grapher/military-spending-sipri.csv?v=1&csvType=full&useColumnShortNames=true (SIPRI 2026 constant 2024 US dollars; OWID minor processing); primary producer https://www.sipri.org/databases/milex. Retrieval: 2026-11-02. For commercial reuse of SIPRI data, consult SIPRI's licensing conditions before redistribution; this repository includes only the 27-country, two-year extract for verification.

**Limitations:** SIPRI estimates and historical revisions apply; country expenditure comparisons have definitional differences. Aggregation assumes dollar-denominated constant-price country figures are additive. This measures changes in expenditure, **not** military capability, deterrence or geopolitical influence. Do not substitute Europe's regional spending growth for EU27.

**Publication status:** research-only. Do not alter live meter or assign composite influence score without separate review.
