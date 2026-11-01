# Country-level DOE–Eurostat LNG attribution audit

Baseline: verified [DOE–Eurostat H1 workflow run 41274848313](https://github.com/epnews/epnews-website/actions/runs/41274848313), artifact **13071186566**.

H1 2025 DOE declared U.S. LNG vessel destinations vs Eurostat LNG partner US:
- France DOE **8.952 bcm**, Eurostat US **0**, Eurostat all-origin LNG **16.441131 bcm**, coded Algeria **10.907769** and Nigeria **5.533362**.
- Germany DOE **~4.188 bcm**, Eurostat US **0**, Eurostat all-origin LNG **4.020376 bcm**, entirely coded **NSP** (partner not specified). DOE departures can exceed same-period arrivals; this does not demonstrate missing gas.
- Poland DOE **~3.34 bcm**, Eurostat US **0**, Eurostat all-origin LNG **4.110640 bcm**, **NSP 3.187868 bcm**.

H1 2026:
- France DOE **~6.09 bcm**, Eurostat US **0**, all-origin LNG **13.028502 bcm**.
- Germany DOE **~5.385 bcm**, Eurostat US **0**, all-origin LNG **6.177744 bcm**.

The difference is strongly concentrated in partner attribution for these destination countries, but **does not yet prove a complete numerical bridge** between DOE EU27 42.11/43.36 bcm and Eurostat US-partner 25.84/29.18 bcm. Country-of-departure, partner-of-import, customs attribution, shipment lag, transit, and re-export remain unresolved. France's Algeria/Nigeria partner categories are particularly important to investigate before assigning a cause.

The workflow uses independently extracted Eurostat country figures from prior verified runs as versioned benchmarks; it re-fetches DOE but **does not** re-fetch Eurostat, so any later Eurostat revision requires updating the benchmarks. Missing country/partner combinations are not interpreted as zero.

No meter influence or net economic benefit scoring. Readiness **53%**.
