# EU-27 2024 total energy supply denominator reproduction
**Research-only candidate, not a WDI/IEA matched observation and not an influence score.**

## Eurostat 2024 EU27_2020 TOTAL KTOE balance
Source: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020&freq=A&siec=TOTAL&unit=KTOE&time=2024
Published dataset updated 2026-06-02.

| Flow | Code | Value (ktoe) |
|---|---|---:|
| Gross available energy | GAE | 1,332,509.965 |
| International maritime bunkers | INTMARB | 40,690.559 |
| International aviation | INTAVI | 41,166.705 |
| Total energy supply | NRGSUP | 1,250,652.709 |
| Imports | IMP | 1,187,769.816 |
| Exports | EXP | 424,430.939 |

Official flow formula: Total energy supply = Gross available energy - International maritime bunkers - International aviation.
Source: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_balance_-_new_methodology
Flow arithmetic yields 1,250,652.701 ktoe versus directly reported 1,250,652.709 ktoe, a 0.008 ktoe discrepancy in the published rounded figures. Use directly reported NRGSUP; investigate rounding/revisions rather than asserting exact identity.

Net imports = 1,187,769.816 - 424,430.939 = 763,338.877 ktoe.
Published Eurostat dependency = net imports / GAE * 100 = 57.285791254851894%.
Exploratory alternative = net imports / NRGSUP * 100 = 61.0352395598577%. **This 61.04% is NOT a World Bank/IEA-matched observation.**
The different denominators alone move the reported ratio by about 3.75 percentage points. This does not resolve trade boundaries, bunker treatment in the numerator, international energy balance methodology, or source vintage.

## Release gate
Compare IEA and Eurostat energy supply accounting and external trade boundary; reconcile 0.008 ktoe rounding difference; independently verify EU27 external versus intra-EU trade treatment. Never substitute 61.04% for WDI EUU missing data or put it into the live five-actor comparison without common-source validation.
No meter UI, needles, selectors or scores change.