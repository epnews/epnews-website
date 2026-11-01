# Europe LNG supplier-share validation status and absolute-volume cross-check

**Scope:** Follow-up to PR #260. Re-read the original [NUPI policy brief PDF](https://www.geopol.no/en/content/download/32346/1270746/NUPI_Policy_Brief_15_Piria_Szulecki_Lentschig.pdf?version=4), p. 2, against the July 2026 [Bruegel European natural-gas imports dataset](https://www.bruegel.org/dataset/european-natural-gas-imports).

## Important methodological distinction
The NUPI authors define the **European Economic Area (EEA) import portfolio** as gas imported from **outside the EEA**. Norway's production is treated as indigenous to the EEA, not an external gas import. These are **not the same denominator** as EU-27 LNG imports or the EU's total gas supply. Do not substitute Eurostat EU-only monthly figures to claim exact reproduction of NUPI's EEA shares.

## Directly transcribed NUPI H1 LNG import volumes and rounded shares
| Supplier | H1 2025 bcm | H1 2026 bcm | H1 2025 share | H1 2026 share |
|---|---:|---:|---:|---:|
| US | 41 | 44 | 57% | 62% |
| Russia | 11 | 13 | 16% | 19% |
| Other countries | 19 | 13 | 27% | 19% |
| Sum of rounded bcm buckets | **71** | **70** | **100%** | **100%** |

**Arithmetic checks:** 41+11+19=71; 44+13+13=70. Ratios from the **rounded** volume buckets are US 57.75% and 62.86%; Russia 15.49% and 18.57%; Other 26.76% and 18.57%. These do **not reproduce every published whole-percent share by conventional rounding** (e.g. 44/70 rounds to 63%, not the reported 62%) because published volumes and shares are separately rounded from underlying unrounded records. **Do not silently alter the reported 62% or treat the bucket sums as precise denominators.**

The source explicitly states that **absolute US LNG volumes rose 41→44 bcm** and Russian LNG volumes **11→13 bcm**, while other LNG volumes fell **19→13 bcm**. PR #260's generic warning that share gains need not mean volume gains remains valid in principle, but the source **does document volume gains for these two suppliers**.

## Independent primary-source reproduction status
The Bruegel dataset landing page is currently inaccessible through the research browser (HTTP 403). An alternative Eurostat monthly import table is available but uses **different country reporting boundaries and possibly different origin/receipt definitions**. Therefore **we have NOT independently reproduced the exact H1 2025/2026 EEA country-level source data**. NUPI's published values are verified as accurately quoted from the original PDF, **not verified independently against raw Bruegel observations**.

**Reproduction acceptance checklist:** obtain July 2026 vintage Bruegel source file; inspect sheet labels and units; reproduce H1 2025 and H1 2026 LNG-only external-to-EEA rows; preserve unrounded source totals; confirm shares within stated rounding precision; record checksum and publication vintage; test sensitivity to revised data. Until then label as *NUPI-reported Bruegel-derived*.

## Wider natural-gas import context (not LNG-only)
NUPI also reports H1 2025→2026 EEA total external gas imports: US 41→44 bcm, Russia 19→22 bcm, other suppliers 49→44 bcm; respective **shares** US 37→40%, Russia 18→20%, combined 55→60%. LNG and total-gas Russia numbers differ; avoid confusing them. Note US total and LNG volumes appear equal in rounded figures; do not assume exact identity.

## Implication for Command Meter
Supplier concentration is an observed secondary-source indicator, not a calibrated geopolitical-influence measurement. No Europe needle activation or score change from this audit alone. **Readiness remains 53%, influence and net-benefit scores null**; dashboard selectors, needles and comparisons untouched.
