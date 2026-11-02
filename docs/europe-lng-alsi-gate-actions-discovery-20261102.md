# Gate ALSI authenticated facility discovery workflow

Use the GitHub Actions **Gate ALSI authenticated operator acquisition** workflow with **mode = discover** first. This requires the repository secret `GIE_ALSI_API_KEY` from free GIE API registration, but **does not require guessing a facility URL**. The job downloads GIE's authenticated `/api/about?show=listing`, filters Gate candidates in the Netherlands, and uploads `gate-alsi-facility-candidates.json` as a 14-day artifact.

Review the candidate's `operator_eic`, `facility_eic`, `country`, company/facility names, and published `url`. Verify that the entry corresponds to Gate terminal rather than a different facility or network connection point. Then run the same workflow with **mode = acquire** and the exact validated facility URL, for the desired gas-day range. That run uploads operator-reported daily observations and a data coverage audit.

No API key is printed or stored in repository files. These data measure LNG inventory and send-out; they are **not** vessel cargo origin, unloading certificates, company profit, or national economic benefit. Do not change SOI meter scores based on this workflow alone.

Primary reference: [GIE API manual v013, §2.1.1 listing and §7.1 parameters](https://www.gie.eu/transparency-platform/GIE_API_documentation_v013.pdf).
