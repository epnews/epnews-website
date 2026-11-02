"""Regression guard for Gate ALSI evidence-panel scope and meter preservation."""
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class GateEvidencePanelTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.page = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.method = (ROOT / "data/europe-lng-gate-operator-october-2026-evidence.md").read_text(encoding="utf-8")

    def test_visible_coverage_and_estimates(self):
        for marker in ("gate-alsi-operator-evidence", "31/31 gas days", "29 confirmed", "2 estimated", "0 missing", "2,382.52–3,854.95 GWh"):
            self.assertIn(marker, self.page)

    def test_no_cargo_origin_or_profit_claim(self):
        for marker in ("does not prove individual ship discharges", "No geopolitical influence score has been changed", "send-out units require independent confirmation"):
            self.assertIn(marker, self.page)

    def test_meter_elements_remain(self):
        for marker in ('id="chaos-sphere"', 'id="chaos-dimension"', 'id="chaos-command-dial"'):
            self.assertIn(marker, self.page)

    def test_primary_source_and_methodology(self):
        self.assertIn("41418617064", self.page)
        self.assertIn("21W0000000000079", self.method)
        self.assertIn("October 1 and October 23", self.method)
        self.assertIn("do not present as GWh", self.method)

if __name__ == "__main__":
    unittest.main()
