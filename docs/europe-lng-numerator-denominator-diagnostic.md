# EU-27 versus EEA LNG supplier-share reconciliation: first quantitative diagnostic

**Status: material source conflict quantified, not yet resolved.** The exact Eurostat H1 figures come from the successful official API extraction (workflow run 41270962043); NUPI volumes and shares are independently rounded figures transcribed from the NUPI original PDF, citing Bruegel. Run `node scripts/reconcile_europe_lng_sources.cjs` to generate machine-readable numerator/denominator/share differences. No new source extraction is claimed.

| Period | Eurostat EU27 US LNG | NUPI EEA US LNG | Difference | Eurostat EU27 total LNG | NUPI rounded EEA total LNG |
|---|---:|---:|---:|---:|---:|
| H1 2025 | 25.838331 bcm | 41 bcm | +15.161669 bcm | 74.763896 bcm | 71 bcm |
| H1 2026 | 29.181938 bcm | 44 bcm | +14.818062 bcm | 71.913064 bcm | 70 bcm |

Russia differences are +3.571477 bcm (2025) and +5.265156 bcm (2026) for NUPI minus Eurostat. NUPI share 57→62% versus Eurostat 34.56→40.58% is not explained by merely swapping a 71–75 bcm denominator: the **US supplier numerator itself** differs by roughly 15 bcm in each period. Rounded NUPI figures are not exact measurements.

## New independent institutional cross-check (but shared underlying Bruegel family)
The [Council of the European Union's US relations page](https://www.consilium.europa.eu/en/policies/united-states/) reports **over 82.9 bcm of US LNG imported by the EU in full-year 2025, almost 58% of EU LNG imports**, and identifies **Bruegel** as the source of its gas-import chart. This is a different period and a Bruegel-linked reporting family; it **does not independently verify NUPI's H1 2026 figure**. It nevertheless shows that the approximately 58% US supplier share is not confined to an EEA-only analyst publication, undermining the hypothesis that EEA-versus-EU membership alone explains the approximately 20 percentage-point gap.

Eurostat [nrg_ti_gasm](https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gasm/default/table?lang=en) explicitly describes **monthly imported natural gas including LNG by country of origin**. Its `G3200` category is **Liquefied natural gas**, as the [custom table confirms](https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gasm__custom_9062313/default/table?lang=en). Therefore the discrepancy is **not simply an accidental natural-gas-versus-LNG category selection**.

## Unresolved identification tests
1. Compare partner-by-partner monthly totals for EU27 and separately reporting Norway/Iceland, checking missing/unknown origins and EU intra-trade double counting.
2. Obtain original Bruegel/Kpler/ENTSOG July 2026 raw monthly cargo data, its country-origin attribution, inclusion of transshipments and EEA external boundary.
3. Inspect Eurostat country-of-origin definition and potential physical delivery versus administrative attribution differences, source vintage and revision flags.
4. Compare like-for-like 2025 annual Eurostat versus Bruegel EU-only series, **not** H1 Eurostat versus full-year Council.
5. Do not assign political leverage from supplier concentration or infer causation from this descriptive comparison.

**Conclusion:** The principal difference is in **attributed US-origin volumes**, not simply the overall amount of LNG counted. Cause is still unknown. This is a measurable improvement in the diagnosis, not closure of the EU dependence causal requirement. Readiness remains 53%; no needle or score changes.
