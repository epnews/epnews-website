# DOE vessel-level LNG export workbook acquisition — 2026-11-02

## Official source located

DOE's 2026 monthly release page: https://www.energy.gov/hgeo/articles/natural-gas-imports-and-exports-monthly-2026

The page's **third** downloadable workbook is:

**U.S. LNG Exports and Re-Exports Details (Jan 2016 – Aug 2026).xlsx**

Direct official file URL (resolved from DOE link 5 on its monthly report page):

https://www.energy.gov/sites/default/files/2026-10/3.%20U.S.%20LNG%20Exports%20and%20Re-Exports%20Details%20%28Jan%202016%20-%20Aug%202026%29.xlsx

Published 2026-10-22; covered data end August 2026. Do not confuse this workbook with DOE's other two summary/general natural-gas workbooks.

## Acquisition status

The exact workbook URL was identified from DOE's official live page. Automated binary retrieval in the research runtime **failed due to DNS/network restrictions**, and the web text reader cannot parse XLSX binaries. **The workbook has not been downloaded or inspected; no row-level vessel records, column names, ship matches or origin claims are asserted.**

## Reproducible follow-up

1. Download the linked XLSX in a network-enabled environment, preserve source URL, download time, original filename, SHA-256 and workbook metadata.
2. Inspect sheet names, headers, date and unit columns; do not assume IMO is included.
3. Filter U.S. LNG vessel export rows for VENTURE GATOR, CORAL ENERGY, HUASHAN, and RIBERA DEL DUERO KNUTSEN (allow name variants). Preserve all raw matching rows, dates, U.S. load terminals, destinations, volumes and source-sheet references.
4. Validate destination and reporting month; August records **cannot** directly verify October Rotterdam arrival claims.
5. Match any historical row to independent terminal-operator unloading records and source-distinct vessel histories. DOE reported export destinations are not terminal discharge certificates.
6. Keep unmatched cargo origins and volumes null; no SOI influence scores until causal evidence exists.

No meter changes; evidence audit remains 20/30, readiness 53%.
