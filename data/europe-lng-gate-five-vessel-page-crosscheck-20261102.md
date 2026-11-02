# Gate October: vessel-page cross-check of chronology and duplicate assignments

**Checked 2026-11-02.** This review compares Gaspeil's October API snapshot (run [41421856688](https://github.com/epnews/epnews-website/actions/runs/41421856688)) with its **individual ship pages**, which include additional AIS/satellite-AIS voyage context. Both are from Gaspeil, so this is **cross-presentation validation, not independent confirmation of cargo**.

## Three pre-arrival measurement assignments

| Vessel / IMO | API arrival vs measured gas day | Ship-page findings | Evidence consequence |
| --- | --- | --- | --- |
| [VENTURE GATOR](https://www.gaspeil.nl/radar/schip/9956599) / 9956599 | Oct 30 arrival; Oct 29 measured day | Page says last Gate unloading **Oct 30**, 943 GWh; GFW satellite AIS lists **Sep 28** Rotterdam call, not a matching Oct 30 satellite port event in the displayed list | Chronology discrepancy remains. Do not interpret Oct 29 stock day as independent proof of Oct 30 unload |
| [VLADIMIR VIZE](https://www.gaspeil.nl/radar/schip/9750658) / 9750658 | Oct 22 API arrival; Oct 21 measured day | Page reports last Gate unloading **Oct 23**, 1,037 GWh; satellite AIS lists **Oct 23 Rotterdam Maasvlakte**, 38 hours at quay, and **Oct 11 Sabetta**, 62 hours, `at quay: no` | **Potential API-vs-ship-page arrival-date mismatch** (Oct 22 vs Oct 23). Sabetta visit is voyage evidence, but no direct loading certificate |
| [MINERVA LIMNOS](https://www.gaspeil.nl/radar/schip/9854375) / 9854375 | Oct 12 arrival; Oct 11 measured day | Page says last Gate unloading **Oct 12**, 877 GWh; satellite AIS lists **Oct 12 Rotterdam**, 26 hours at quay, plus **Sep 17 Sabine Pass**, 37 hours at quay | Stronger voyage-chain lead, not certified origin or cargo volume |

## October 1 shared 970 GWh attribution

| Vessel / IMO | Ship-page evidence | Limitation |
| --- | --- | --- |
| [BW NIVALIS](https://www.gaspeil.nl/radar/schip/9968932) / 9968932 | Ship page lists Oct 1 Rotterdam satellite AIS port visit (28 hours, at quay) and a Gate `970 GWh` assignment. It also lists **zero DOE-recorded US export cargoes to the Netherlands** for this vessel | Oct 1 GIE operator status E; ship page does not establish which of two vessel records owns the 970 GWh inventory-derived value |
| [VIVIT AMERICAS LNG](https://www.gaspeil.nl/radar/schip/9864667) / 9864667 | Ship page lists Oct 1 Rotterdam satellite AIS port visit (26 hours, `at quay: no`), but identifies last Gate unloading as **Oct 2**, 970 GWh. It also lists **Sep 17 Freeport USA** satellite AIS port visit (30 hours, at quay) | **Date labeling mismatch** (Oct 1 port visit vs Oct 2 unloading). This makes the shared Oct 1 stock-day attribution particularly unsafe to sum |

## Independent-source acquisition priorities
1. Port of Rotterdam berth/arrival/departure event timestamps and terminal jetty identity for all five vessels; **AIS at quay is not an unloading receipt**.
2. Gate terminal's per-ship discharge completion / cargo quantity log and the GIE Oct 1 status E explanation.
3. Loading-port berth and bills of lading for VIVIT, BW NIVALIS, MINERVA, VENTURE GATOR, VLADIMIR VIZE.
4. Ask Gaspeil whether `measuredGasDay` is a gas-day stock-change key rather than a physical unloading timestamp, and how duplicate stock-day assignments are deduplicated.

## Source and rights
- Gaspeil public radar ship pages (CC BY 4.0 for Gaspeil's own content). Embedded Global Fishing Watch satellite AIS content is marked **CC BY-NC 4.0**; report paraphrases only and preserves attribution.
- [Gate terminal official site](https://www.gateterminal.com/en/) confirms terminal operations and fourth tank commissioned October 1, but **does not provide individual vessel unload confirmations**.
- No evidence here establishes certified US-origin volume, realized LNG revenue, profit, or a geopolitical influence score.
