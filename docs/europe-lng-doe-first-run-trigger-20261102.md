# One-time merge-triggered DOE vessel research attempt

The DOE workbook workflow was previously only `workflow_dispatch`; the connected GitHub tool cannot dispatch it. Add a narrowly scoped `push` trigger on `main` for changes to **this workflow file only**. Merging this PR will therefore cause GitHub Actions to attempt the existing official DOE download and four-vessel candidate extraction, without scheduling recurring jobs or publishing results. Manual dispatch remains available.

After merge, inspect the **DOE LNG vessel workbook acquisition** Actions run, the synthetic matcher preflight, HTTP download step, and the 14-day provenance/candidate artifact. A passing repository publishing gate does not establish that this research workflow passed. If the DOE server blocks GitHub runner access, report the actual failure rather than claiming vessel-level evidence. No automatic cargo scoring or meter changes (audit 20/30; readiness 53%).

**Status at PR creation:** trigger not yet executed; no workbook rows verified.
