#!/usr/bin/env python3
"""Synthetic test only: no actual DOE cargo records."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE = Path(__file__).with_name("match_europe_lng_doe_vessels_20261102.py")
spec = importlib.util.spec_from_file_location("doe_matcher", MODULE)
matcher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(matcher)

class VesselMatcherTests(unittest.TestCase):
    def test_normalization(self):
        self.assertEqual(matcher.normalize("Ribera-del Duero Knutsen"), "RIBERADELD UEROKNUTSEN".replace(" ", ""))
        self.assertEqual(matcher.normalize(None), "")

    def test_synthetic_rows(self):
        from openpyxl import Workbook
        wb = Workbook()
        ws = wb.active
        ws.title = "Synthetic only"
        ws.append(["Vessel", "Destination", "Volume"])
        ws.append(["HUASHAN", "Netherlands", 10])
        ws.append(["Ribera del Duero-Knutsen", "Netherlands", 20])
        ws.append(["CORAL ENERGY EXTENDED", "Unknown", 30])
        ws.append(["NO VESSEL", "Venture Gator-like string", 40])
        ws.append(["VENTURE GATOR", "Unknown", None])
        ws.append(["Unknown ship", "9617698", 50])
        ws.append(["Unknown ship", "IMO 9617698 extra", 60])
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp) / "synthetic.xlsx"
            wb.save(p)
            out = matcher.inspect(p)
        self.assertEqual(out["sheets"][0]["matched_rows"], 4)
        self.assertEqual(len(out["matches"]), 4)
        self.assertEqual({m["vessel_target"] for m in out["matches"]},
            {"HUASHAN", "RIBERA DEL DUERO KNUTSEN", "VENTURE GATOR", "CORAL ENERGY"})
        self.assertEqual(sum(m["match_type"] == "exact_imo" for m in out["matches"]), 1)
        self.assertTrue(all(m["verification_status"] == "candidate_only_not_discharge_verified" for m in out["matches"]))

if __name__ == "__main__":
    unittest.main()
