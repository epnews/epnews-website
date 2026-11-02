# Gate Rotterdam: five-vessel event chronology from public ship logbooks

Checked **2026-11-02** against the individual Gaspeil ship pages and the October snapshot in [run 41421856688](https://github.com/epnews/epnews-website/actions/runs/41421856688). The ship-page **logbook events are additional fields from the same Gaspeil publisher**, which itself cites Port of Rotterdam, AIS and GIE; they are **not independently verified terminal discharge receipts**.

## Public logbook event table

| Vessel | Arrival / berth-start log entry | Departure log entry | Measurement publication | API measured gas day | Assessment |
| --- | --- | --- | --- | --- | --- |
| [BW NIVALIS](https://www.gaspeil.nl/radar/schip/9968932) | Oct 1 03:07 (Gate STG 1 registration) | Oct 2 07:12 departure time, published Oct 2 08:07 | Oct 5 21:07, 970 GWh | Oct 1 | Two vessels share same Oct 1 stock-derived 970 GWh; operator day E |
| [VIVIT AMERICAS LNG](https://www.gaspeil.nl/radar/schip/9864667) | Oct 2 00:07 (Gate STG 2 registration) | Oct 3 02:19 departure time, published Oct 3 03:07 | Oct 5 21:07, 970 GWh | Oct 1 | Oct 1 stock day predates ship-page berth-start; shared 970 GWh unresolved |
| [MINERVA LIMNOS](https://www.gaspeil.nl/radar/schip/9854375) | Oct 12 23:07 (Gate STG 1 registration) | Oct 14 00:55 departure time, published Oct 14 01:07 | Oct 14 21:07, 877 GWh | Oct 11 | Assigned gas day predates logged berth start by a calendar day |
| [VLADIMIR VIZE](https://www.gaspeil.nl/radar/schip/9750658) | Oct 23 01:07 (Gate STG 1 registration) | Oct 24 16:25 departure time, published Oct 24 17:07 | Oct 25 00:07, 1,037 GWh | Oct 21 | Assigned gas day predates berth start by two calendar days; Oct 22 API arrival also differs from Oct 23 ship-page event |
| [VENTURE GATOR](https://www.gaspeil.nl/radar/schip/9956599) | Oct 30 22:07 (Gate STG 1 registration) | Nov 1 00:30 departure time, published Nov 1 01:07 | Oct 31 20:07, 943 GWh | Oct 29 | Assigned gas day predates berth start; measurement publication is before departure, not necessarily impossible |

**Time caution:** Logbook event publication times are shown in Dutch local time, whereas API `arrivedAt` may be UTC. A midnight local/UTC conversion can explain a one-day arrival-date difference; this report **does not label the Oct 22/23 VLADIMIR VIZE discrepancy as a confirmed data error** without comparing timezone-aware timestamps. Even after timezone conversion, a stock-day key should not be equated to a physical unloading timestamp.

## Research significance

1. **Two distinct berth slots for the shared Oct 1 970 GWh assignment:** BW NIVALIS STG 1 Oct 1 and VIVIT STG 2 Oct 2. A single tank-derived value appearing on both records is an attribution ambiguity, not proof that either vessel failed to unload.
2. **Measurement publication lag:** BW and VIVIT 970 GWh figures were both published Oct 5; that may indicate retrospective matching rather than contemporaneous unloading measurements.
3. **Three pre-berth gas-day assignments:** MINERVA, VLADIMIR and VENTURE have logbook berth starts later than the Gaspeil gas-day keys. Request algorithm documentation and terminal-level unloading certificates.
4. **Independent verification priority:** Match Port of Rotterdam ship movement and jetty records to terminal discharge logs; then obtain same-voyage loading records. A satellite AIS port call or berth-start entry is not a certified LNG quantity.

Gaspeil.nl attribution CC BY 4.0; its embedded Global Fishing Watch satellite-AIS data marked CC BY-NC 4.0. No certified US share, realized revenue, profit, or geopolitical meter change follows from these events.
