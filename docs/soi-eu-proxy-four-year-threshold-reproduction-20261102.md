# Four-year EU voting-proxy sensitivity: source recomputation protocol

The original full-cohort results are reproduced, but the existing sensitivity JSON provides strict-90% and all-27 variants only for 2021 and 2024. We must not invent missing 2022–2023 percentages.

This PR adds a standalone, stream-based source recomputation script that evaluates **all four years** against three explicitly specified EU-27 proxy rules: baseline 20 valid votes/75% agreement; strict 24/90%; and 27/100%. It derives a fixed 160-country external cohort from countries present in every year, excludes consensus and nonvoting rows, and retains numerator, denominator and eligible-resolution counts. It does **not** modify the public dashboard or activate a needle.

Run locally against the uploaded original SWP ZIP:

```bash
python scripts/reproduce_soi_eu_proxy_thresholds.py '2025-03-09_unga-res_un_resolutions_positions(4).zip' eu-proxy-results.json
python -m unittest scripts/test_reproduce_soi_eu_proxy_thresholds.py
```

The generated output should be independently checked against the published source SHA-256 `04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522`, baseline EU percentages and known 2021/2024 strict variants. **The 2022–2023 strict values are not claimed or published until this script is actually run on the original archive.**
