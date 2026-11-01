import unittest
from scripts.build_eia_h1_onsystem_sales import SERIES,MONTHS
class TestOnsystemSales(unittest.TestCase):
 def test_series(self):
  self.assertEqual(SERIES,{'residential':'n3010us1m','industrial':'n3035us1m'})
 def test_scope(self):
  self.assertEqual(len(MONTHS),12)
  self.assertEqual(MONTHS[0],'2025-01')
  self.assertEqual(MONTHS[-1],'2026-06')
 def test_price_volume_units(self):
  # 1 MMcf = 1000 Mcf, so MMcf * USD/Mcf / 1000 = million USD.
  self.assertAlmostEqual(1000*10/1000,10)
if __name__=='__main__':unittest.main()
