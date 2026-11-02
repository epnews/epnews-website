# Corrected authoritative SWP/GESIS topic taxonomy

The SWP/GESIS UNGA-RES codebook (https://access.gesis.org/sharing/2702/5478) explicitly distinguishes **100–134 issue categories**, **201–223 regional codes**, **300–547 country codes**, and **600–605 categories not used for analysis**. The dataset version under analysis is DOI 10.7802/2855.

**Correction to exploratory PRs #677 and #678:** the five first-digit numeric families are **not five substantive policy topics**. Their coverage and matched-pair audits may be retained as provenance diagnostics, but must never be used to generate topic-adjusted diplomatic agreement percentages. Prior numeric-family aggregation is invalid for the intended issue-mix standardization.

The accompanying script classifies all 358 source recorded resolutions and audits the number lacking 100–134 issue codes by year. The next statistical design must decide explicitly how to treat issue-less resolutions, choose a defensible pre-registered issue taxonomy and minimum resolution support, and test sensitivity. No adjusted scores or original influence-needle changes are authorized.
