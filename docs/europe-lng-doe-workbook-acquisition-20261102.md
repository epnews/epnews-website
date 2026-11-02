# DOE vessel-level workbook acquisition

Official DOE source page (published 2026-10-22): https://www.energy.gov/hgeo/articles/natural-gas-imports-and-exports-monthly-2026

Run `node scripts/fetch_europe_lng_doe_workbook_20261102.cjs /path/to/doe-lng-exports.xlsx` from a network-enabled environment. The script uses HTTPS, restricts redirect domains to energy.gov, enforces a 100 MB ceiling, checks XLSX ZIP signature, and records a SHA-256, download timestamp, and source URL in a manifest. Existing files are not overwritten.

**Current acquisition status:** external download failed in this execution environment (network connection error); the web text reader rejects XLSX. This PR adds a reproducible downloader only; **it does not include or inspect the workbook**. Do not claim vessel matches or cargo origins.

After successful retrieval, inspect workbook sheets and columns before implementing row-level vessel matching. Preserve the source spreadsheet unmodified. Cross-check with primary receiving-terminal unloading records and independent vessel history. No SOI score changes (20/30 evidence audit, 53% readiness).
