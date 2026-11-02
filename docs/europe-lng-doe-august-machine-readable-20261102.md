# Reusable DOE August 2026 destination evidence

The structured data at `data/europe-lng-doe-august-2026-destination-summary.json` transcribes the published DOE August destination-region totals and five top country destinations, preserving source, publication date, reporting month, unit, geographic caveats and non-verification flags.

Run `node scripts/test_europe_lng_doe_august_2026_destination_summary.cjs` for arithmetic consistency and invariants. The sum of regions is compared with a 0.1 Bcf tolerance for rounding. Top-country figures are subsets, **not additional volumes to add**.

The file does not contain the underlying DOE vessel-level XLSX and cannot verify October Gate Rotterdam discharge. No SOI meter scores or interactions are changed (evidence audit 20/30, readiness 53%).
