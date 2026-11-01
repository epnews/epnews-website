#!/usr/bin/env python3
"""Audited SWP UNGA recorded-vote alignment from original positions ZIP.
Usage: python scripts/verify_swp_country_alignment.py positions.zip resolutions.csv output.json
"""
import collections
import csv
import json
import re
import sys
import zipfile
from pathlib import Path

YEARS = ("2021", "2022", "2023", "2024")
ACTORS = ("USA", "CHN", "RUS", "IND")
EU = set("AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU LUX MLT NLD POL PRT ROU SVK SVN ESP SWE".split())
VALID = {"y", "n", "a"}
# Source CSV has multiline fields *after* the first 15 columns. Match
# the beginning of each logical record, then parse only needed prefix.
PREFIX = re.compile(rb'^R/[^,]+,(?:"(?:[^"]|"")*"|[^,]*),[A-Z]{3},[^,]*,(20(?:21|22|23|24)),')


def ratio(same, total):
    return {"same": same, "both_recorded": total,
            "different": total - same,
            "agreement_pct": round(100 * same / total, 2) if total else None}


def build(positions_zip, resolutions_csv):
    meta = {}
    year_counts = collections.defaultdict(collections.Counter)
    with open(resolutions_csv, encoding="utf-8-sig", newline="") as stream:
        for row in csv.DictReader(stream):
            year = row["year"]
            if year not in YEARS:
                continue
            key = (year, row["unres"])
            flag = row["adopted_without_vote"]
            if key in meta or flag not in ("0", "1"):
                raise ValueError("Duplicate or invalid metadata: " + str(key))
            meta[key] = (flag, int(row["yes"] or 0),
                         int(row["no"] or 0), int(row["abstentions"] or 0))
            year_counts[year]["all"] += 1
            year_counts[year]["recorded" if flag == "0" else "consensus"] += 1

    selected = collections.defaultdict(dict)
    vote_totals = collections.defaultdict(collections.Counter)
    country_rows = collections.Counter()
    position_counts = collections.defaultdict(collections.Counter)
    stats = collections.Counter()
    with zipfile.ZipFile(positions_zip) as archive:
        names = [n for n in archive.namelist() if n.lower().endswith(".csv")]
        if len(names) != 1:
            raise ValueError("Expected exactly one CSV inside positions ZIP")
        with archive.open(names[0]) as stream:
            header = next(stream).decode("utf-8-sig").rstrip("\r\n").split(",")
            for name, index in (("unres", 0), ("iso_alpha3_code", 2),
                                ("year", 4), ("position", 12),
                                ("adopted_without_vote", 14)):
                if header[index] != name:
                    raise ValueError("Unexpected source column order: " + name)
            for line in stream:
                stats["physical_lines"] += 1
                match = PREFIX.match(line)
                if not match:
                    continue
                year = match.group(1).decode()
                row = next(csv.reader([line.decode("utf-8")]))
                if len(row) < 15 or row[4] != year:
                    raise ValueError("Incomplete first 15 fields on source line")
                key = (year, row[0])
                if key not in meta or row[14] != meta[key][0]:
                    raise ValueError("Resolution or consensus mismatch: " + str(key))
                country, position, flag = row[2], row[12], row[14]
                country_rows[key] += 1
                stats[year + "_rows"] += 1
                if flag == "1":
                    stats[year + "_consensus_excluded"] += 1
                    continue
                position_counts[year][position] += 1
                if position not in VALID:
                    if position != "non-voting.a":
                        raise ValueError("Unexpected position: " + repr(position))
                    stats[year + "_nonvoting_excluded"] += 1
                    continue
                vote_totals[key][position] += 1
                if country not in EU and country not in ACTORS:
                    continue
                if country in selected[key]:
                    raise ValueError("Duplicate country-resolution: " + str((key, country)))
                selected[key][country] = position

    annual = {}
    for year in YEARS:
        keys = [k for k in meta if k[0] == year and meta[k][0] == "0"]
        for key in [k for k in meta if k[0] == year]:
            if country_rows[key] != 193:
                raise ValueError("Expected 193 country rows: " + str((key, country_rows[key])))
        for key in keys:
            actual = tuple(vote_totals[key][p] for p in ("y", "n", "a"))
            if actual != meta[key][1:]:
                raise ValueError("Vote tally mismatch: " + str((key, actual, meta[key][1:])))
        votes = [selected[key] for key in keys]
        actors = {}
        for actor in ACTORS:
            arr = [v[actor] for v in votes if actor in v]
            actors[actor] = {"recorded": len(arr), "yes": arr.count("y"),
                             "no": arr.count("n"), "abstain": arr.count("a"),
                             "not_recorded": len(votes) - len(arr)}
        pairwise = {}
        for i, a in enumerate(ACTORS):
            for b in ACTORS[i+1:]:
                both = [(v[a], v[b]) for v in votes if a in v and b in v]
                pairwise[a + "_" + b] = ratio(sum(x == y for x, y in both), len(both))
        eu = []
        for v in votes:
            member_votes = [v[c] for c in EU if c in v]
            if len(member_votes) < 14:
                continue
            majority, n = collections.Counter(member_votes).most_common(1)[0]
            if n >= 14 and n > len(member_votes) / 2:
                eu.append((v, majority, n, len(member_votes)))
        eu_alignment = {}
        for actor in ACTORS:
            both = [(v[actor], maj) for v, maj, _, _ in eu if actor in v]
            eu_alignment[actor] = ratio(sum(x == y for x, y in both), len(both))
        annual[year] = {
            "resolutions": year_counts[year]["all"],
            "recorded_vote_resolutions": len(keys),
            "consensus_resolutions_excluded": year_counts[year]["consensus"],
            "source_country_rows": stats[year + "_rows"],
            "nonvoting_rows_excluded": stats[year + "_nonvoting_excluded"],
            "actors": actors,
            "pairwise": pairwise,
            "eu_majority": {
                "eligible_resolutions": len(eu),
                "mean_cohesion_pct": round(100 * sum(n / total for _, _, n, total in eu) / len(eu), 2) if eu else None,
                "alignment": eu_alignment,
            },
            "validation": {"country_row_count_mismatches": 0,
                           "aggregate_vote_tally_mismatches": 0},
        }
    return {
        "source_positions_zip": Path(positions_zip).name,
        "source_resolutions_csv": Path(resolutions_csv).name,
        "methodology": "Exact y/n/a on recorded-vote resolutions; consensus and nonvoting excluded; identical abstentions count; EU is a strict majority of >=14 recorded EU27 members; not influence.",
        "annual": annual,
        "scan_stats": dict(stats),
        "influence_score_authorized": False,
    }


if __name__ == "__main__":
    result = build(sys.argv[1], sys.argv[2])
    Path(sys.argv[3]).write_text(json.dumps(result, indent=2) + "\n")
    for year, record in result["annual"].items():
        print(year, record["recorded_vote_resolutions"],
              record["pairwise"]["USA_CHN"]["agreement_pct"])
