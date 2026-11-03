# Global Power Indicators — reporting-year alignment audit

## Scope
The public interface is renamed without changing stored selector values or underlying scoring logic. The **All indicators** selector retains the legacy internal value `Overall change` to preserve existing dashboard behavior.

## Existing verified observations
| Indicator | Current observation | Measurement type | Alignment issue |
| --- | --- | --- | --- |
| Economic growth | 2025 real GDP growth, World Bank | Annual rate | Needs 2024 companion observation |
| Military spending | 2025 real military spending change, SIPRI | Year-over-year rate | Needs comparable 2024 change and source revision review |
| Energy & resources | 2024 net energy imports as % of energy use, World Bank / IEA | Level, not change | Needs comparable 2025 observation; EU 2024 value is modeled and not an official IEA country observation |

## Validation gates before a common-year index
1. Obtain 2024 and 2025 values for all five SOIs, with matching indicator definitions, periods and sources.
2. Label missing values explicitly rather than carrying observations forward without disclosure.
3. Keep EU modeled energy values visually and analytically separate from official observations.
4. Do not combine GDP growth, military spending change, and energy-dependence levels into a purported geopolitical influence score.
5. Retain original-unit observations and existing needle behavior while reviewing a separate scoring methodology.

## Known limitation
This PR is a **label-only interface milestone plus research audit**. It does not activate an overall composite needle or claim that same-year datasets have been completed.
