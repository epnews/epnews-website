# Gate October 2026: measured-attribution gas-day concentration

**Data source:** [Gaspeil October Gate arrival API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), accessed 2026-11-02; [methodology](https://www.gaspeil.nl/api-docs). This is a diagnostic of Gaspeil's inventory-derived associations, **not** certified ship discharge.

- **16** arrival records contain `measuredGasDay` plus `measuredGwh`, spread across only **15 distinct attributed gas days**.
- **14** of the gas days have one associated arrival; **one gas day (2026-10-01)** has **two** vessel records with the same **970 GWh** assignment.
- October 1 therefore shows **1,940 GWh** when those two vessel-level attributed quantities are naively summed. This is **not** proof that 1,940 GWh was unloaded on October 1, or even that 970 GWh was unloaded twice.
- The two records are **VIVIT AMERICAS LNG** and **BW NIVALIS**, different IMOs and separate vessel events. A shared inventory-derived assignment could reflect duplicated attribution, multi-berth operations, inventory timing, or a source-model issue; the underlying terminal allocation cannot be adjudicated from Gaspeil alone.
- **Six** additional arrivals remain estimated-only and do not appear in this measured-gas-day grouping.

The distinction matters: counting **16 measured-attribution records** is not the same as having **16 independent observed cargo discharges**. There are **15 attributed inventory days**, including one duplicated-volume association. Neither number certifies physical unloading or commercial benefit.

## Reproduce and automate

```sh
python scripts/audit_gate_gasday_attribution_concentration_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_gasday_attribution_concentration_20261102.py
```

The ninth integrated Gate diagnostic uses the same archived snapshot as the preceding eight. The automated workflow now runs its offline regression tests and archives the grouped daily evidence with other research reports.

**Next independent evidence need:** terminal berth-level unloading and custody-transfer statements, actual operator gas-day boundaries, and independent port event histories. The October 1 collision remains an unresolved evidence flag, not a justified adjustment to the command meter.
