# DOE LNG XLSX downloader integrity hardening

Review of the merged downloader identified material reliability and security defects before the first GitHub-runner attempt:

- The hostname test `endsWith('energy.gov')` could accept unrelated hosts such as `notenergy.gov`. Now only `energy.gov` or a dot-delimited subdomain is allowed.
- The old implementation did not reject incomplete HTTP bodies; now checks `res.complete` and rejects truncated responses.
- The old script did not enforce its 30-second request timeout because it lacked a timeout event handler. The new script destroys timed-out requests.
- Missing redirect Location and HTTP error codes now generate explicit failures; failed requests cannot silently appear successful.
- The download remains bounded at 100 MB and checks ZIP local-file signature before writing. Manifest includes SHA-256, timestamp and final URL. Existing outputs are not overwritten.

**Status:** source hardening only; no claim that the DOE workbook has been downloaded or that the script has been exercised against the DOE endpoint. Manual workflow dispatch is still required. The SOI evidence audit remains 20/30 and meter readiness 53%; no meter functionality changed.
