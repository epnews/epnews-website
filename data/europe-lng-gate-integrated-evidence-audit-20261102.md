# Gate Rotterdam October evidence audit — reproducible integrated run

This report generator is the **single operator/vessel evidence-quality summary**, not another source of cargo quantities.

## Actual inputs
- [Authenticated GIE Gate operator acquisition](https://github.com/epnews/epnews-website/actions/runs/41418617064) (artifact ID 13128372919): 31 October operator gas days; 29 C and 2 E.
- [Successful Gaspeil October acquisition](https://github.com/epnews/epnews-website/actions/runs/41420849109) (artifact ID 13130001495): 22 vessel arrivals, 16 tank-derived and 6 estimated.
- The GIE artifact and Gaspeil artifact must both be unzipped before running. GIE is the operator stock source; Gaspeil's tank-derived assignments reuse GIE data.

```sh
python scripts/test_gate_integrated_evidence_audit_20261102.py
python scripts/gate_integrated_evidence_audit_20261102.py \
  --operator gate-alsi-operator-october-2026.json \
  --gaspeil gate-gaspeil-october-2026-snapshot.json
```

## Exceptions emitted
The report flags vessel measurements that predate API arrivals; multiple vessels assigned to one gas day; Gaspeil assignments linked to GIE E days; and missing GIE gas days. It also records whether September 30 is present.

For the October artifacts, expected priority checks are Oct 1 shared 970 GWh assignments to BW NIVALIS and VIVIT AMERICAS LNG (GIE day E), and chronology checks for VENTURE GATOR, VLADIMIR VIZE and MINERVA LIMNOS. Recompute from artifacts rather than hard-coding these as immutable truth.

## Research decision rule
- Operator status C certifies reporting quality, **not unloading or origin**.
- Gaspeil status `gemeten` is a tank-derived inference; `geschat` is estimated; `bevestigd` refers to DOE-matched evidence.
- An AIS port call is not an unloading certificate; TTF × cargo GWh is not realized company revenue.
- No new SOI influence score is warranted without voyage-level unloading and loading records.

Source attribution: Gaspeil.nl (CC BY 4.0), GIE ALSI+, Port of Rotterdam and AIS sources as described in the existing audit.
