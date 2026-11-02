"""Guard primary-source API status semantics and source independence."""
import unittest
from pathlib import Path
p=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-gaspeil-primary-methodology-20261102.md"
class StatusSemanticsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.t=p.read_text(encoding="utf-8")
    def test_primary_docs_and_three_statuses(self):
        self.assertIn("https://www.gaspeil.nl/api-docs",self.t)
        for s in ("`geschat`","`gemeten`","`bevestigd`","GIE ALSI+","Department of Energy"):
            self.assertIn(s,self.t)
    def test_critical_nonindependence_and_unknowns(self):
        for s in ("not an independently measured custody-transfer volume","zero `bevestigd`","not a guarantee","same** 970 GWh"):
            self.assertIn(s,self.t)
if __name__=="__main__":unittest.main()
