# Gate terminal EIC identifier crosswalk — 2026-11-02

## Primary and regulatory source leads

1. [ACER REMIT list of LNG facilities](https://www.acer-remit.eu/portal/facilities) is the EU regulatory register for LNG facility identifiers. Search indexing exposes **Rotterdam Gate terminal** associated with `21W0000000000079` and `21Z0000000002204`, alongside operator `Gate Terminal B.V.` and `21X000000001063H`. **Caution:** the accessible rendered page did not expose the underlying rows, so the exact identifier-to-facility role is a **candidate crosswalk, not authenticated ALSI identity verification**.
2. [ENTSOG EIC code list (February 2019)](https://www.entsog.eu/sites/default/files/2019-02/Approved_21_EIC_Codes_190226.pdf) directly identifies `21X000000001063H` as **Gate Terminal B.V.** This is an operator/company identifier, not proof that a candidate facility EIC is accepted by ALSI.
3. [GIE ALSI API manual v013](https://www.gie.eu/transparency-platform/GIE_API_documentation_v013.pdf) requires `country`, `company` and `facility` for a facility-level API query. GIE's authenticated `/api/about?show=listing` is the authoritative check before using these candidates.

## Candidate mapping — do not silently promote to verified

| Field | Candidate | Status |
| --- | --- | --- |
| country | NL | verified geographic location |
| company | 21X000000001063H | directly corroborated as Gate Terminal B.V. by ENTSOG 2019 |
| facility | 21W0000000000079 | ACER search-index lead only; role unresolved |
| facility | 21Z0000000002204 | ACER search-index lead only; role unresolved |

The `21W` and `21Z` codes may refer to different facility or connection-point roles. **Do not choose one based on prefix alone.** Match the exact GIE ALSI listing facility entry to Gate before requesting time-series data. Do not conflate ENTSOG network connection-point codes with GIE LNG facility codes.

## Next evidence action

With a registered GIE ALSI API key, use `scripts/fetch_europe_lng_gate_alsi_20261102.py --list-facilities`, confirm the operator, country, facility name and EIC, then fetch October daily facility data. No API key, authenticated listing, October measurements, unloading certificates or cargo-origin verification was available in this audit. No meter score change.
