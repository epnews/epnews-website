"""Ensure the Gate five-vessel follow-up preserves provenance and all discrepancies."""
import unittest
from pathlib import Path
p=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-five-vessel-page-crosscheck-20261102.md"
class FiveVesselEvidenceTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.t=p.read_text(encoding="utf-8")
    def test_all_imos_and_ship_pages(self):
        for imo in ("9956599","9750658","9854375","9968932","9864667"):
            self.assertIn("https://www.gaspeil.nl/radar/schip/"+imo,self.t)
    def test_date_conflicts(self):
        for s in ("Oct 22 vs Oct 23","Oct 1 port visit vs Oct 2 unloading","Oct 30 arrival; Oct 29 measured day","Oct 12 arrival; Oct 11 measured day"):
            self.assertIn(s,self.t)
    def test_no_false_independence(self):
        for s in ("not independent confirmation of cargo","not an unloading receipt","No evidence here establishes certified US-origin volume"):
            self.assertIn(s,self.t)
if __name__=="__main__":unittest.main()
