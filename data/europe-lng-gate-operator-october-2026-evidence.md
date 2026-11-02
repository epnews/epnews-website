# Gate Rotterdam — October 2026 authenticated ALSI+ operator evidence

**Source:** GIE ALSI+ authenticated operator-reported facility series, retrieved 2026-11-02.
**Reproducible workflow:** https://github.com/epnews/epnews-website/actions/runs/41418617064
**Artifact:** `gate-alsi-acquire-research` (artifact ID `13128372919`; 14-day retention).
**API:** https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W0000000000079&from=2026-10-01&to=2026-10-31

## Verified identity
- Facility: Rotterdam Gate Terminal, Netherlands; facility EIC `21W0000000000079`.
- Operator: Gate Terminal B.V.; operator EIC `21X000000001063H`.
- Gas days: 2026-10-01 through 2026-10-31 inclusive.

## Reporting quality
- 31/31 distinct in-window gas days (100% coverage).
- 29 confirmed (`C`), 2 estimated (`E`: October 1 and October 23).
- No missing days, duplicate days, no-data statuses, or contradictory-status days.
- Confirmed share: 93.55%; usable reporting share: 100%.
- Observed inventory range: **2,382.52–3,854.95 GWh** (stock, not monthly throughput).
- Raw sum of daily `sendOut` numeric entries: **18,250.4 in API-reported daily units**; do not present as GWh or an energy total until the unit definition is independently verified.

## Evidence boundary
These are facility-level operator-reported inventory and send-out observations. **They do not identify vessels, certified unload volumes, cargo origins, American export shares, realized company revenues, profit, or net national economic benefit.** AIS port-call overlaps are leads, not proof of unloading. Do not assign an additional geopolitical influence score from this evidence alone.

## Evidence-panel presentation contract
Label: **Gate Rotterdam — authenticated operator series (Oct 2026)**.
Display coverage 31/31, confirmed 29, estimated 2, missing 0; inventory min/max in GWh; clearly flag sendOut units as unverified. Link to the acquisition run and this methodology. Preserve moving needles, selectors, comparison panels, and existing scores. Do not treat this document as a claim that the evidence-panel UI has already been updated.

## Reproduction
Run `Gate ALSI authenticated operator acquisition` workflow with `mode=acquire`, dates `2026-10-01` to `2026-10-31`, and the existing `GIE_ALSI_API_KEY` GitHub Actions secret. Keep the key out of source, logs, and artifacts. Re-run the offline regression test before incorporating the dataset into production.
