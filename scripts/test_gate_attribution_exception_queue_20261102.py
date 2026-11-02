"""Offline regression for Gate October source independence and exception prioritization."""
from pathlib import Path
import unittest
DOC=Path(__file__).resolve().parents[1]/"data/europe-lng-gate-attribution-exception-queue-20261102.md"
class ExceptionQueueTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.text=DOC.read_text(encoding="utf-8")
    def test_priority_conflicts(self):
        for marker in ("BW NIVALIS", "VIVIT AMERICAS LNG", "VENTURE GATOR", "MINERVA LIMNOS", "2026-10-01", "2026-10-29", "2026-10-11"):
            self.assertIn(marker,cls.text)
    def test_source_independence(self):
        for marker in ("not independent verification", "not a cargo certificate", "zero DOE-confirmed", "influence score unchanged"):
            self.assertIn(marker,cls.text.lower())
    def test_no_volume_or_revenue_overclaim(self):
        for marker in ("No sum of Gaspeil", "no US-origin fraction", "no TTF-marked"):
            self.assertIn(marker,cls.text)
if __name__=="__main__": unittest.main()
