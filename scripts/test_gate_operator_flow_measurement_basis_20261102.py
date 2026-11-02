"""Guard operator specifications against invented discharge or conversion claims."""
import unittest
from pathlib import Path
P=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-operator-flow-measurement-basis-20261102.md"
class OperatorSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.t=P.read_text()
    def test_operator_primary_source_and_specs(self):
        for x in ("https://www.gateterminal.com/en/commercial/operational-data/","12,500 m³ LNG/hour","139,000 normal m³ gas/hour","30,000 m³ LNG total","OBA","fiscal flow measurement"):
            self.assertIn(x,self.t)
    def test_no_volume_overclaim(self):
        for x in ("capacity limit","not vessel discharge","not the same as a vessel's LNG custody-transfer measurement","not_obtained","No revenue, origin or SOI meter score"):
            self.assertIn(x,self.t)
if __name__=="__main__":unittest.main()
