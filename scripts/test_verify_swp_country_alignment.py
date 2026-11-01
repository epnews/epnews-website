#!/usr/bin/env python3
"""Regression: consensus/nonvoting exclusions and embedded CSV newlines."""
import csv
import io
import itertools
import pathlib
import tempfile
import unittest
import zipfile

from verify_swp_country_alignment import ACTORS, EU, build


class AlignmentTest(unittest.TestCase):
    def test_recorded_only_and_multiline_source(self):
        with tempfile.TemporaryDirectory() as directory:
            root = pathlib.Path(directory)
            metadata_path = root / "resolutions.csv"
            zip_path = root / "positions.zip"
            countries = list(ACTORS) + sorted(EU)
            countries += [
                code for code in (
                    "".join(chars) for chars in itertools.product("ABCDEFGHIJKLMNOPQRSTUVWXYZ", repeat=3)
                ) if code not in countries
            ][:193 - len(countries)]
            self.assertEqual(len(countries), 193)
            metadata = []
            rows = []
            for resolution, flag in (("R/79/1", "0"), ("R/79/2", "1"), ("R/79/3", "0")):
                counts = {"y": 0, "n": 0, "a": 0}
                for country in countries:
                    position = "y"
                    if resolution == "R/79/1" and country == "CHN":
                        position = "n"
                    if resolution == "R/79/1" and country == "IND":
                        position = "a"
                    if resolution == "R/79/3" and country == "USA":
                        position = "non-voting.a"
                    if flag == "0" and position in counts:
                        counts[position] += 1
                    row = [""] * 16
                    row[0], row[1], row[2], row[3], row[4] = resolution, "Test Country", country, "79", "2024"
                    row[12], row[14] = position, flag
                    row[15] = "later field with\nembedded newline" if country == "USA" else "text"
                    rows.append(row)
                metadata.append({
                    "unres": resolution, "year": "2024", "adopted_without_vote": flag,
                    "yes": counts["y"], "no": counts["n"], "abstentions": counts["a"]
                })
            with metadata_path.open("w", newline="") as stream:
                writer = csv.DictWriter(stream, fieldnames=list(metadata[0]))
                writer.writeheader()
                writer.writerows(metadata)
            header = ["unres", "country", "iso_alpha3_code", "session", "year", "vote_date",
                      "title", "yes", "no", "abstentions", "non_voting", "position_alt",
                      "position", "total_voting_membership", "adopted_without_vote", "notes"]
            text = io.StringIO(newline="")
            writer = csv.writer(text)
            writer.writerow(header)
            writer.writerows(rows)
            with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as archive:
                archive.writestr("positions.csv", text.getvalue())
            result = build(zip_path, metadata_path)
            year = result["annual"]["2024"]
            self.assertEqual(year["recorded_vote_resolutions"], 2)
            self.assertEqual(year["consensus_resolutions_excluded"], 1)
            self.assertEqual(year["pairwise"]["USA_CHN"]["both_recorded"], 1)
            self.assertEqual(year["pairwise"]["USA_CHN"]["agreement_pct"], 0)
            self.assertEqual(year["eu_majority"]["alignment"]["USA"]["agreement_pct"], 100)
            self.assertEqual(result["scan_stats"]["2024_nonvoting_excluded"], 1)
            self.assertEqual(year["validation"]["aggregate_vote_tally_mismatches"], 0)


if __name__ == "__main__":
    unittest.main()
