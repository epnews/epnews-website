#!/usr/bin/env python3
"""Audit derived annual UNGA pairwise and EU majority alignment without raw ZIP.

Run: python scripts/audit_unga_historical_alignment.py
Checks internal consistency and computes pooled counts and endpoint changes.
Does NOT estimate geopolitical influence, issue-adjusted effects, or joint abstentions.
"""
import json
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1] / "data/soi-swp-country-vote-alignment-2021-2024.json"
PAIRS = ("USA_CHN", "USA_RUS", "USA_IND", "CHN_RUS", "CHN_IND", "RUS_IND")
ACTORS = ("USA", "CHN", "RUS", "IND")


def check_record(record):
    assert record["resolutions"] == record["recorded_vote_resolutions"] + record["consensus_resolutions_excluded"]
    assert record["source_country_rows"] == record["resolutions"] * 193
    assert record["validation"]["country_row_count_mismatches"] == 0
    assert record["validation"]["aggregate_vote_tally_mismatches"] == 0
    n = record["recorded_vote_resolutions"]
    for actor in ACTORS:
        a = record["actors"][actor]
        assert a["yes"] + a["no"] + a["abstain"] == a["recorded"]
        assert a["recorded"] + a["not_recorded"] == n
    for key in PAIRS:
        a, b = key.split("_")
        pair = record["pairwise"][key]
        check_pair(pair)
        assert pair["both_recorded"] <= min(record["actors"][a]["recorded"], record["actors"][b]["recorded"])
        assert pair["both_recorded"] >= record["actors"][a]["recorded"] + record["actors"][b]["recorded"] - n
    eu = record["eu_majority"]
    assert 0 <= eu["eligible_resolutions"] <= n
    assert 0 <= eu["mean_cohesion_pct"] <= 100
    for actor in ACTORS:
        pair = eu["alignment"][actor]
        check_pair(pair)
        assert pair["both_recorded"] <= min(eu["eligible_resolutions"], record["actors"][actor]["recorded"])
        assert pair["both_recorded"] >= eu["eligible_resolutions"] + record["actors"][actor]["recorded"] - n


def check_pair(pair):
    same, total = pair["same"], pair["both_recorded"]
    assert total > 0 and 0 <= same <= total
    assert pair["different"] == total - same
    assert abs(pair["agreement_pct"] - round(100 * same / total, 2)) < 0.000001


def main():
    source = json.loads(SOURCE.read_text())
    assert source["influence_score_authorized"] is False
    years = sorted(source["annual"])
    assert years == ["2021", "2022", "2023", "2024"]
    for year in years:
        check_record(source["annual"][year])
    for key in PAIRS + tuple("EU_" + actor for actor in ACTORS):
        def get(year):
            record = source["annual"][year]
            return record["eu_majority"]["alignment"][key[3:]] if key.startswith("EU_") else record["pairwise"][key]
        counts = [get(y) for y in years]
        same = sum(p["same"] for p in counts)
        total = sum(p["both_recorded"] for p in counts)
        delta = 100 * (counts[-1]["same"] / counts[-1]["both_recorded"] - counts[0]["same"] / counts[0]["both_recorded"])
        print(f"{key}: pooled {same}/{total} ({100 * same / total:.2f}%); 2024–2021 {delta:+.2f} pp")
    print("PASS: annual source aggregate and denominator invariants")


if __name__ == "__main__":
    main()
