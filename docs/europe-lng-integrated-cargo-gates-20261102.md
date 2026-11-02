# LNG cargo research gates — integrated execution

Run `node scripts/run_europe_lng_cargo_research_gates_20261102.cjs input-cases.json reviewed-backlog.json`. The runner invokes all six existing cargo screening stages and the final backlog summarizer in sequence, preserving accumulated fields rather than relying on manually joined intermediate files. It uses temporary files and cleans them up.

Run `node scripts/test_europe_lng_integrated_cargo_gates_20261102.cjs` to exercise a complete synthetic case and a missing-evidence case. A complete synthetic case is **eligible for human review only**. This runner does not fetch cargo arrivals, authenticate evidence or verify gas production origin. Existing SOI meter needle/selectors/evidence panels remain untouched; evidence audit 20/30, readiness 53%.
