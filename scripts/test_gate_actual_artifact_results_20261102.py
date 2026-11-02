"""Offline regression guarding real Gate October artifact reconciliation findings."""
from pathlib import Path
import unittest
DOC=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-two-artifact-reconciliation-results-20261102.md"

class ActualArtifactReconciliationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.t=DOC.read_text(encoding="utf-8")
    def test_artifact_provenance(self):
        for s in ("41418617064","13128372919","41420849109","13130001495"):
            self.assertIn(s,self.t)
    def test_real_counts_and_quality(self):
        for s in ("31 distinct","29 confirmed","two estimated","22 October-arrival","16 `gemeten`","6 `geschat`","zero `bevestigd`","15 distinct gas days"):
            self.assertIn(s,self.t)
    def test_all_chronology_conflicts_and_duplicate(self):
        for s in ("BW NIVALIS","VIVIT AMERICAS LNG","VENTURE GATOR","VLADIMIR VIZE","MINERVA LIMNOS","2026-10-01","status **E"):
            self.assertIn(s,self.t)
    def test_no_overclaim(self):
        for s in ("not independent discharge evidence","No geopolitical score","not 19 verified US unloads"):
            self.assertIn(s,self.t)

if __name__=="__main__": unittest.main()
