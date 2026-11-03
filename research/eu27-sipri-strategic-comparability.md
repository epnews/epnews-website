# EU-27 Strategic comparison — SIPRI methodological gate

**Status:** Research specification; **no EU meter score or comparison activation**.

## Scope correction

The SIPRI 2025 fact sheet reports **Europe (region)** military expenditure up 14% to $864 billion. This includes non-EU countries and **must not be substituted for the EU-27**. Likewise, European NATO membership is not EU-27 membership. The current EU meter's EU defence expenditure +20% comes from a different series; it must not be silently relabeled as a SIPRI real change.

Sources:
- SIPRI 2025 military expenditure fact sheet: https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025
- SIPRI 2026 military expenditure database (1949–2025): https://www.sipri.org/databases/milex
- SIPRI series notes via Our World in Data: https://ourworldindata.org/grapher/military-spending-sipri

## Comparable EU-27 calculation (pending verified source rows)

1. Fix the **same 27 EU member countries** for 2024 and 2025. Exclude the UK, Russia, Ukraine, Norway, and other non-EU countries; do not double-count NATO or regional totals.
2. Retrieve each member's 2024 and 2025 military expenditure in **constant 2024 US dollars** from the **same SIPRI April 2026 database vintage**. Record country codes, revision date, source URLs, missing values, and estimate/definition notes.
3. Sum the 27 country values independently for each year: `EU27_2024 = Σ country_constant_2024_USD_2024`; `EU27_2025 = Σ country_constant_2024_USD_2025`.
4. Compute `real_change_pct = 100 × (EU27_2025 / EU27_2024 − 1)` only if both totals are complete and positive. This is an aggregate **real spending change**, not a mean of 27 national growth rates.
5. Compare the resulting change in **percentage points** with the US, China, Russia and India SIPRI 2024→2025 real military-spending changes, subject to source-vintage and coverage reconciliation. Distinguish national actors from the multi-country EU aggregate.
6. Review SIPRI's country-specific notes; its uniform definition is imperfect, so even same-source numbers are spending-input proxies, not measures of military capability, deterrence or geopolitical influence.
7. Add unit tests for exactly 27 unique EU member countries, no missing values, same vintage, same constant-price unit, matching periods, correct aggregate formula, and refusal on mismatches.

## Do not activate

- The SIPRI Europe regional +14% is **not** EU-27.
- The EU's existing +20% defence expenditure indicator is **not** proven equivalent to the four national SIPRI changes.
- A third-party estimate of EU-27 totals, or a World Bank current-USD EU aggregate, cannot establish the **real 2024→2025** change without a matched constant-price series.
- No change to `chaos-meter-data.js`, `chaos-comparability.js`, existing category needles, or overall scoring gate is authorized by this document.

Next research deliverable: acquire and independently audit the full 27×2 SIPRI constant-2024-USD observations, calculate the aggregate and run comparison regression checks before requesting UI activation.
