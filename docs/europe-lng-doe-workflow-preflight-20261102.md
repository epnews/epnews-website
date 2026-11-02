# DOE vessel extraction: preflight before download

The existing manual workflow ran the synthetic workbook regression **after** downloading and parsing the DOE file. If DOE network access fails, the regression never executes and no matcher validation is reported. This change moves the synthetic test **before** external download, so a failed download does not conceal a matcher defect.

The workflow is still manual (`workflow_dispatch`) and is not an automatic publishing path. **This change has not dispatched a run, downloaded the DOE workbook or verified any cargo record.** After merge, manually run the workflow from GitHub Actions and inspect both the preflight result and the artifact. A successful synthetic test does not validate actual DOE rows or cargo discharge.

No SOI meter changes; audit 20/30 and readiness 53%.
