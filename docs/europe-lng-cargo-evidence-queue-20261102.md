# Europe LNG physical cargo verification queue

This is a **research queue**, not an evidence claim. Run the matched-month official extraction, the classification audit, then the anomaly-ranking script from #537, and finally:

`node scripts/build_europe_lng_cargo_evidence_queue_20261102.cjs ranked.json cargo-evidence-queue.json`

Each country-month case requires independently sourced terminal arrival/discharge data, IMO vessel identity, load-port and transshipment history, volume, time period, source URL, retrieval date, and reporting-vintage notes. A vessel's last port alone does not prove the physical origin of its LNG. Do not equate EU27 aggregate with France/Germany/Poland (overlapping reporters), or unspecified-partner values with U.S. origin. An unmatched vessel, absent public terminal records, or inconsistent measurement units remains **unverified**.

No cargo record has been independently matched by this change. SOI evidence audit stays 20/30; meter readiness 53%. No influence or physical-origin scoring is authorized.
