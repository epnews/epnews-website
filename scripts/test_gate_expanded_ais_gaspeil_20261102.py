"""Guard the expanded Gate evidence review against cargo and origin overclaiming."""
from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
DOC=ROOT/"data/europe-lng-gate-expanded-ais-gaspeil-crosscheck-20261102.md"

class CrosscheckTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.text=DOC.read_text(encoding="utf-8")
    def test_distinct_sources(self):
        for token in ("tankermap.com/port/gate-rotterdam", "gaspeil.nl/api/v1/lng/lossingen", "portofrotterdam.com", "gateterminal.com"):
            self.assertIn(token, self.text)
    def test_conflict_and_quality_preserved(self):
        for token in ("15-minute", "3-minute", "gemeten", "geschat", "likely", "not certified", "no score change"):
            self.assertIn(token.lower(), self.text.lower())
    def test_vessel_leads(self):
        for vessel in ("HLS CARTAGENA","VLADIMIR VIZE","UMM AL HANAYA","HUASHAN","VENTURE GATOR","RIBERA DEL DUERO KNUTSEN"):
            self.assertIn(vessel,self.text)

if __name__=="__main__": unittest.main()
