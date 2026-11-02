"""Regression: keep five-vessel chronology and attribution cautions complete."""
import unittest
from pathlib import Path
p=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-five-vessel-event-chronology-20261102.md"
class VesselChronologyTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.t=p.read_text(encoding="utf-8")
    def test_all_five_vessels(self):
        for imo in ("9968932","9864667","9854375","9750658","9956599"):
            self.assertIn("https://www.gaspeil.nl/radar/schip/"+imo,self.t)
    def test_event_and_lag(self):
        for s in ("Oct 5 21:07","Oct 14 21:07","Oct 25 00:07","Oct 31 20:07","STG 1","STG 2"):
            self.assertIn(s,self.t)
    def test_timezones_and_independence(self):
        for s in ("Dutch local time","may be UTC","not independently verified terminal discharge receipts","not a certified LNG quantity"):
            self.assertIn(s,self.t)
if __name__=="__main__":unittest.main()
