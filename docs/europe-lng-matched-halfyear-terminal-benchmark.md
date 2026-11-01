# Germany and Poland matched-half-year LNG terminal benchmark

**Purpose:** test physical LNG terminal volumes against Eurostat G3200 reporter series without falsely assuming physical origin or equivalent measurement scope.

## Germany: H1 2025 vs H1 2026
German Bundesnetzagentur figures cited in Handelsblatt 5 July 2026:
- H1 2025 German LNG terminals: **39 TWh**; total natural-gas imports ~491 TWh.
- H1 2026 German LNG terminals: **67 TWh**; total natural-gas imports ~551 TWh.
- Change: **+28 TWh (+71.79%)**, *all LNG origin countries combined*, NOT an estimate of US-origin shipments.
- Source https://www.handelsblatt.com/politik/deutschland/fluessigerdgas-lng-anteil-an-gasimporten-steigt-trotz-iran-konflikt-deutlich/100237979.html
- Federal regulator annual official figures: **106 TWh** LNG terminals in full-year 2025; BDEW ~**96% US** for full-year 2025. **Do not apply annual 96% mechanically to H1 2025 or H1 2026.**
- Source https://www.bundesnetzagentur.de/DE/Gasversorgung/a_2025/start.html

Eurostat `nrg_ti_gasm`, `siec=G3200`, `unit=MIO_M3`, reporter DE:
- H1 2025 TOTAL **4.020376 bcm**, US-coded **0**, NSP **4.020376 bcm**.
- H1 2026 TOTAL **6.177744 bcm**, US-coded **0**, NSP **6.177744 bcm**.
- Artifact #13069403354, workflow #41272584603.
- **Not comparable by direct subtraction:** TWh vs bcm require consistent calorific conversion and coverage of LNG arrivals versus customs/energy trade reporting; NSP is not necessarily 100% US.

## Poland: matched H1 2025
Industry Institute of Energy Studies (ISE) reports **40 LNG cargoes**, approximately **2.66 million tonnes** / **3.7 bcm** gas-equivalent landed at Świnoujście in H1 2025. It explicitly notes cargoes from **Qatar and USA** during H1. This is physical country-of-origin corroboration within the *same* half-year. https://www.cire.pl/artykuly/serwis-informacyjny-cire-24/polskie-lng-w-drugim-kwartale-2025-
ORLEN annual report shows Q1 Cheniere contract **4 deliveries**, Q2 Cheniere **6**, and Q2 Venture Global **3 including 1 to Lithuania**. Contract supplier does not independently prove origin or full cargo manifest. https://raportroczny.orlen.pl/en/management-report/our-performance-in-2025/upstream-and-supply/
Eurostat reporter PL H1 2025 TOTAL **4.110640 bcm**, US-coded **0**, NSP **3.187868 bcm**; other partner groups also positive. H1 2026 TOTAL **4.253218 bcm**, US-coded **0**, NSP **3.622 bcm** approximately. Source artifact above.
- Scope discrepancy (terminal vs country imports) **4.110640 - 3.7 = 0.410640 bcm**, not a US-attribution correction. The ISE 3.7 figure is rounded and estimated.

## France: not yet numerically matched
Eurostat H1 2025 France TOTAL **16.441131 bcm**, partner DZ **10.907769**, NG **5.533362**, US **0**; H1 2026 TOTAL **13.028502 bcm**, US **0**. The Statistical Review of World Energy 2026 (via Statista) lists USA as the largest 2025 France LNG origin, but annual rather than matched H1. https://www.statista.com/statistics/1096327/natural-gas-trade-movement-france/
**Critical next requirement:** acquire monthly France terminal arrival cargo origin and volume for H1 2025 and H1 2026 from primary French regulator/terminal operator or cargo dataset; reconcile France's DZ+NG Eurostat classifications and clarify whether these represent a different dimension (e.g. partner misinterpretation).

## Interpretive boundaries
No US H1 correction can yet be computed. No explanation of the ~15 bcm NUPI/Eurostat US numerator gap has been established. No influence score, net national benefit, or causal counterfactual may be assigned. Meter readiness **53%**. All UI/dials untouched.
