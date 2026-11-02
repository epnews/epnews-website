# DOE vessel-level workbook: manually triggered GitHub research job

The GitHub Actions workflow `.github/workflows/europe-lng-doe-workbook-acquisition.yml` provides an **on-demand, network-enabled** route around the current research environment's DNS failure. After merge, go to Actions → **DOE LNG vessel workbook acquisition** → **Run workflow**. It downloads the official DOE XLSX, records a SHA-256 provenance manifest, scans for four Rotterdam vessel names, and uploads **only** the manifest and candidate-row JSON as a 14-day artifact. It does not commit the large workbook or publish the evidence to the website.

The workflow is **not scheduled**, and a successful GitHub workflow does **not** certify that a name match is a cargo discharge. The August 2026 reporting cutoff still prevents confirmation of October 2026 Rotterdam arrivals. Inspect candidate rows, reporting period, export terminal, destination and independently sourced receiving-terminal completion records before promoting evidence.

**Current status:** workflow created, **not executed**. No real DOE vessel rows inspected; no SOI meter changes (audit 20/30; readiness 53%). If the official DOE endpoint fails on GitHub runners, review workflow logs and correct retrieval rather than treating an empty artifact as no cargoes.
