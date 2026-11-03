# EU-27 energy-balance methodology constraint
Status: research only; no meter or scoring changes.

## Official source finding
Eurostat's official Energy balances (nrg_bal) metadata, section 3.3, states: "For energy balances, the methodology is not harmonised at international level - international organisations as well as national administrations apply various approaches when constructing energy balance."
https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm
Metadata posted 3 February 2025. It also notes that Eurostat, OECD/IEA and UNECE use agreed fuel-level annual questionnaires; shared questionnaires do not establish identical energy-balance calculation conventions. Section 6.2 permits free reuse under Eurostat copyright rules.

## Existing 2024 figures remain separate
World Bank/IEA EG.IMP.CONS.ZS: US -9.78127421443322%, China 24.0191966181448%, Russia -70.7306703064017%, India 36.0305276064275%; EU missing. See research/soi-energy-import-dependence-2024-audit.md.
Eurostat EU27: net imports (1,187,769.816 - 424,430.939) ktoe / gross available energy 1,332,509.965 ktoe = 57.285791254851894%. Independently matches 57.286% indicator. See research/eu27-energy-import-dependency-2024-reproduction.md.
Eurostat total energy supply dataset ten00122: https://ec.europa.eu/eurostat/databrowser/product/view/ten00122?category=t_nrg . Its label does not prove equivalence to WDI primary energy use.

## Next evidence gate
Find a single freely reusable source of 2024 net imports and energy-use denominator for all five actors, or reconcile Eurostat and IEA conventions quantitatively. Check EU external-trade boundary, intra-EU flows, international bunkers, stock adjustments, calendar year, revisions and units. Require scripts/test_soi_energy_independence_gate.cjs and command-meter CI before activation.
Energy Scale EJ remains a separate, non-influence measure. No public observation, score, needle or UI change authorized.