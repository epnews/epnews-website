"""Guard against mixing legacy three-tank figures with October four-tank reporting."""
import unittest
from pathlib import Path
P=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-fourth-tank-legacy-spec-conflict-20261102.md"
class TankVersionTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.t=P.read_text()
    def test_operator_sources(self):
        for s in ("https://www.gateterminal.com/en/","https://www.gateterminal.com/en/gate-terminal/profiel/facts-figures/","https://www.gateterminal.com/en/commercial/operational-data/","https://www.gateterminal.com/en/gate-terminal/functions/functions-terminal/"):
            self.assertIn(s,self.t)
    def test_legacy_vs_new(self):
        for s in ("October 1, 2026","180,000 m³","200,000 m³","12 bcm/year","30,000 m³","Temporal coincidence is not causal evidence","must **not** be presented as current"):
            self.assertIn(s,self.t)
if __name__=="__main__":unittest.main()
