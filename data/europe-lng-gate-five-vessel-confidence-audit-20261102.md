# Five-vessel October Gate LNG: claim-specific confidence audit

This is the first reproducible application of the [claim-specific confidence policy](europe-lng-gate-claim-applicability-audit-20261102.md) to the [five-IMO evidence matrix](gate-october-five-vessel-evidence-request-matrix-20261102.json). **No new independently certified port/discharge/loading documents were obtained.**

## Current claim classification

| Vessel | IMO | Berth claim | Vessel GWh discharge claim | Voyage origin claim | Flag |
| --- | --- | --- | --- | --- | --- |
| BW NIVALIS | 9968932 | Preliminary | Preliminary | Preliminary | Shared 970 GWh assignment |
| VIVIT AMERICAS LNG | 9864667 | Preliminary | Preliminary | Preliminary | Shared 970 GWh; Oct 1 gas day precedes Oct 2 logbook berth |
| MINERVA LIMNOS | 9854375 | Preliminary | Preliminary | Preliminary | Oct 11 gas day precedes Oct 12 berth |
| VLADIMIR VIZE | 9750658 | Preliminary | Preliminary | Preliminary | Oct 21 gas day precedes Oct 23 berth |
| VENTURE GATOR | 9956599 | Preliminary | Preliminary | Preliminary | Oct 29 gas day precedes Oct 30 berth |

**15 claims total: 15 preliminary, 0 reasonably certain, 0 high.** These are **evidence sufficiency classifications**, not statements that the vessels did not call or unload. Gaspeil ship pages remain valuable leads, but are not independent port records. GIE tank inventory is not a vessel-specific discharge meter. Historical AIS visits do not certify same-voyage loading.

The confidence audit explicitly treats four earlier gas-day assignments as discrepancies needing review, but a gas-day assignment is not necessarily intended to represent berth start; do **not** describe these as proof of bad timestamps. The two Oct 1 970 GWh assignments remain a **material attribution conflict** until a source-specific explanation is obtained.

## Reproduce
```sh
python scripts/audit_gate_five_vessel_confidence_20261102.py --output /tmp/gate-five-vessel-confidence.json
python scripts/test_audit_gate_five_vessel_confidence_20261102.py
```

**Next highest-value records:** independent Port of Rotterdam historical berth events by IMO; Gate ship/shore discharge tickets; voyage-specific loading documents; GIE E-status revisions for Oct 1 and Oct 23. Do not adjust command-meter scores based on this report.

Primary background: [Gaspeil API documentation](https://www.gaspeil.nl/api-docs), [Gate terminal operations](https://www.gateterminal.com/en/commercial/operational-data/), [Port of Rotterdam arrival/departure information](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures).
