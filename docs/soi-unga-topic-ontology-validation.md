# Source category ontology gate

The original SWP/GESIS `main_category` field contains 60 observed numeric codes, starting with digits 1, 2, 3, 4 and 6. The first-digit grouping is mathematically reproducible but **not yet proven to correspond to authoritative substantive topic families**.

**Do not silently combine family 3 with another family.** Family 3 has too few distinct resolutions for a reliable standalone annual estimate. Country-vote pairs within a resolution are not independent resolution samples. A post-hoc merge based on observed scores would undermine comparability.

The JSON gate specifies source-codebook verification, resolution-level support requirements, alternative allocation sensitivity and score authorization. The next research batch should retrieve the original SWP/GESIS variable documentation for `main_category`, `sub_category` and `subjects` and build an explicit source-defined mapping. Only then pre-register a minimum distinct-resolution threshold and run sensitivity analysis.

This PR does not change any live dashboard metric, selector, evidence panel or influence needle.
