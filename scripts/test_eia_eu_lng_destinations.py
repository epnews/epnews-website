import unittest
from scripts.extract_eia_eu_lng_destinations import month,EU27,FACTOR
class DateParsing(unittest.TestCase):
 def test_string_date(self):
  self.assertEqual(month('2025-01',None),'2025-01')
  self.assertEqual(month('2026/6',None),'2026-06')
  self.assertIsNone(month('not a date',None))
 def test_coverage(self):
  self.assertEqual(len(EU27),27)
  self.assertIn('FR',EU27);self.assertIn('DE',EU27);self.assertIn('PL',EU27)
 def test_unit(self):
  self.assertAlmostEqual(316140*FACTOR,8.95208788159488,places=8)
if __name__=='__main__':unittest.main()
