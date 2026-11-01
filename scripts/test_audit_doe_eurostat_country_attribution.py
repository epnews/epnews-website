import unittest
from scripts.audit_doe_eurostat_country_attribution import build
class CountryAudit(unittest.TestCase):
 def test_zero_partner_does_not_erase_doe_shipments(self):
  ledger={'periods':{'2025':{'destinations':{'France':{'exports_bcm':8.952},'Germany':{'exports_bcm':4.188},'Poland':{'exports_bcm':3.34}}},'2026':{'destinations':{'France':{'exports_bcm':6.09},'Germany':{'exports_bcm':5.385}}}}}
  out=build(ledger)
  self.assertAlmostEqual(out['countries']['2025']['Germany']['difference_bcm'],4.188)
  self.assertEqual(out['countries']['2025']['Poland']['eurostat_other_partner_codes_bcm']['NSP'],3.187868)
  self.assertEqual(out['countries']['2026']['France']['eurostat_lng_all_origins_bcm'],13.028502)
if __name__=='__main__':unittest.main()
