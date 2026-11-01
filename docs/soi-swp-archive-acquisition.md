# SWP data archive acquisition — empirical import milestone

**Current state:** SWP/GESIS codebook and publisher page have been verified, but the full archive has **not** been downloaded in this environment. The DOI resolves to https://search.gesis.org/research_data/SDN-10.7802-2855 ; this JavaScript-driven catalogue did not expose a verified direct archive URL to our read-only source tools. Do **not** guess file IDs or URLs, fabricate data, or claim a completed empirical import.

The published codebook https://access.gesis.org/sharing/2855/6622 documents `unga-res_positions.csv` (~1,996,092 positions), supplied as a ZIP. The publisher https://www.swp-berlin.org/en/publication/united-nations-general-assembly-resolutions-voting-data-and-issue-categories-2025 labels its publication CC BY 4.0; confirm the archive's own file license before redistributing data.

**Batch workflow:** (1) download ZIP from GESIS record, (2) verify its file name and provenance, (3) verify its exact license, (4) run streamed ZIP checksum, (5) validate six actual SWP columns, (6) reject duplicate country-resolution records, (7) exclude imputed consensus positions, (8) exclude non-voting positions, (9) report 2021–2024 actor/topic/year coverage, (10) reconcile aggregate counts with published codebook and investigate discrepancies.

Run `python scripts/audit_swp_positions_zip.py /path/to/unga-res_positions.zip /path/to/audit.json` after acquiring the original archive. Test with `python scripts/test_audit_swp_positions_zip.py`. The resulting JSON includes no row-level voting data and is **not** a diplomatic influence score. Do not merge empirical figures into the live dashboard until the original source archive has been obtained, checksummed, independently checked, and legally cleared.
