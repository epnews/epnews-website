import unittest
from scripts.audit_eia_table24_coverage import national_total
class Table24Tests(unittest.TestCase):
 def test_national_total_row(self):
  self.assertTrue(national_total('Total 97.1 13.4'))
  self.assertTrue(national_total('  Total 96.9 13.9'))
  self.assertFalse(national_total('Texas 97.1 13.4'))
  self.assertFalse(national_total('Totality 12'))
 def test_score_gates(self):
  from pathlib import Path
  src=Path('scripts/audit_eia_table24_coverage.py').read_text()
  for value in ("'reviewStatus':'NOT_VERIFIED'","'onsystemGrossSalesValueUsd':None","'lngCausedCostUsd':None","'netNationalBenefitUsd':None","'geopoliticalInfluenceScore':None"):
   self.assertIn(value,src)
if __name__=='__main__':unittest.main()
