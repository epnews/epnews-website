# Gate LNG: cross-diagnostic integrity gates for one archived October snapshot

The existing Gate integrated workflow produces **ten** diagnostics from one public Gaspeil snapshot plus separately acquired authenticated GIE operator data. The prior run [41432664614](https://github.com/epnews/epnews-website/actions/runs/41432664614) completed successfully, but independently successful scripts could still publish mutually inconsistent counts or monetary proxy totals if source schemas drift or a later script changes its interpretation.

This milestone adds an **enforced post-audit consistency report**. It runs before uploading the research artifact and fails the workflow on contradictory figures, without changing any evidence or meter score.

## Eight enforced invariants
1. `geschat + gemeten + bevestigd` arrival record counts equal the total number of Gate arrival records.
2. `gemeten + bevestigd` count equals the number of records with measured-volume assignments (the present snapshot has zero `bevestigd`).
3. The day-concentration report's measured-record count matches the integrated report.
4. UTC gas-day offset histogram counts sum to the measured-record count.
5. Arrival-hour offset groups match the UTC offset histogram **for each offset**.
6. The sum of all status-specific proxy cargo volumes equals the raw reported proxy volume.
7. Published indicative `valueEur` sums agree between the status-coverage and TTF valuation diagnostics.
8. Multi-assignment gas-day count cannot exceed the number of distinct measured gas days.

These are **internal arithmetic checks**, not independent corroboration of cargo discharge, vessel origin, actual sales prices or net economic benefits. Shared upstream inventory-derived attributions remain unresolved even if all eight checks pass.

## Reproduction
```sh
python scripts/test_check_gate_cross_diagnostic_consistency_20261102.py
python scripts/check_gate_cross_diagnostic_consistency_20261102.py \
  --report gate-october-crosschecked-evidence-diagnostics.json \
  --output gate-october-cross-diagnostic-consistency.json
```

The workflow archives the consistency report alongside the ten diagnostics and original snapshots, and its five offline tests verify detection of status, volume, offset and value contradictions. No command-meter scoring or needle behavior changes.
