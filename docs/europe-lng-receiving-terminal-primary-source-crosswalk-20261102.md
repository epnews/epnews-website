# Receiving-terminal corroboration: primary-source crosswalk (2026-11-02)

## Newly checked primary sources

1. [Gate terminal — Operational data](https://www.gateterminal.com/en/commercial/operational-data/) identifies maximum vessel discharge rate **12,500 m³ LNG/hour**, minimum gas delivery rate **139,000 m³(n)/hour**, 30,000 m³ LNG heel for three tanks, near-real-time quality determination, and fiscal gas send-out measurement. **These are operational specifications, not observed vessel unloadings or October throughput.**
2. [Gas Infrastructure Europe — LNG Database](https://www.gie.eu/transparency/databases/lng-database/) identifies a downloadable [GIE LNG Database XLSX published August 26, 2026](https://www.gie.eu/wp-content/uploads/filr/10655/26082026_GIE_LNG_Database_public.xlsx). The published database describes terminals, storage and send-out capacity, ship classes and operators; it is **facility reference data, not certified individual cargo discharges**.
3. [GIE ALSI+](https://alsi.gie.eu/) is the distinct operational LNG transparency platform. Terminal-level inventory/send-out observations must not be mislabeled as vessel discharge certificates.

## Crosswalk to verified DOE historical departure rows

The primary DOE vessel export dataset in `data/europe-lng-doe-four-vessel-2026-jan-aug-20261102.json` includes:
- RIBERA DEL DUERO KNUTSEN, **June 6, 2026**, Corpus Christi, TX, reported Netherlands destination, **3,564.06 MMCF**.
- HUASHAN, **July 24, 2026**, Cameron, LA, reported Netherlands destination, **3,676.40 MMCF**.

The two reported destination volumes total **7,240.46 MMCF**. They do not establish Rotterdam Gate as receiving terminal, October 2026 arrivals, actual unloading volume, or subsequent gas send-out. DOE dates are U.S. **departures**, not terminal arrivals. Do not match a DOE departure to an ALSI+ inventory movement without time-window, vessel/terminal identity and independent arrival/discharge confirmation.

## Evidence gap and next independently testable milestones

1. Obtain dated, terminal-specific Gate Rotterdam October 2026 ship calls with vessel IMO and berth.
2. Obtain independent receiving-terminal unloading confirmation, including date and volume.
3. Compare with DOE U.S. loading records for the **same voyage** once October DOE vessel records are published; maintain an explicit data-availability lag.
4. Use ALSI+ operational series only as corroborating context, not voyage-level proof.

**Status:** terminal operational specifications and August facility database source verified; October discharge and origin remain unverified. No meter score change.
