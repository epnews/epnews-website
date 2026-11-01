import unittest
from scripts.reconcile_doe_eurostat_lng import reconcile
class Reconciliation(unittest.TestCase):
 def test_gaps_and_distinct_denominators(self):
  l={'source':'DOE','periods':{'2025':{'eu27_exports_bcm':42.113690658,'eu27_reexports_bcm':0,'destinations':{}},'2026':{'eu27_exports_bcm':43.359559983,'eu27_reexports_bcm':0,'destinations':{}}}}
  r=reconcile(l)
  self.assertAlmostEqual(r['periods']['2025']['doe_minus_eurostat_bcm'],16.275359658)
  self.assertAlmostEqual(r['periods']['2026']['doe_minus_eurostat_bcm'],14.177621983)
  self.assertNotEqual(r['periods']['2025']['nupi_eea_us_lng_rounded_bcm'],r['periods']['2025']['eurostat_eu27_us_partner_arrival_bcm'])
if __name__=='__main__':unittest.main()
