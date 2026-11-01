import unittest
from scripts.build_eia_h1_volume_matching import SERIES,MONTHS
class TestSeries(unittest.TestCase):
 def test_four_distinct_series(self):
  self.assertEqual(len(SERIES),4)
  self.assertEqual(len({x[0] for x in SERIES.values()}),4)
 def test_months(self):
  self.assertEqual(len(MONTHS),12)
  self.assertEqual(MONTHS[0],'2025-01')
  self.assertEqual(MONTHS[-1],'2026-06')
 def test_source_pages(self):
  self.assertTrue(all(x[2].startswith('https://www.eia.gov/dnav/ng/') for x in SERIES.values()))
if __name__=='__main__':unittest.main()
