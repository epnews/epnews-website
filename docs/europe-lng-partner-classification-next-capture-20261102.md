# Europe LNG full-partner classification capture extension

The existing official Eurostat all-partners extractor already covers France, Germany, Poland and EU27 for H1 2025 and H1 2026, and preserves missing monthly values. This update extends its output with an explicit, per-reporter/year comparison of total LNG, US-labelled LNG and NSP-labelled LNG. No summation across all partner codes is attempted because codes can include aggregate categories, which could double count individual origins.

**Why:** The previously documented roughly 15 bcm US-origin gap between NUPI/Bruegel EEA and Eurostat EU27 cannot be explained by nearest-bcm rounding. France's US-coded zero and Germany's NSP entries suggest classification differences but do not authorize a US-origin correction. This capture helps distinguish missing values from zero and isolates the NSP share without falsely labeling NSP as American.

**Next evidence:** Run the existing `Eurostat LNG All Partner Classification` workflow after merge; preserve its artifact and inspect full origin distributions, reporter-by-reporter. A complete origin reconciliation still requires matched Bruegel raw monthly cargo records and independent terminal data.

No influence score, audit completion increment, or meter UI changes. SOI 20/30; Europe influence readiness 53%.
