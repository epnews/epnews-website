import json,unittest
from pathlib import Path
from scripts.audit_cheniere_financial_baseline import audit
class TestCheniere(unittest.TestCase):
 def test_financial_baseline(self):
  d=json.loads(Path('data/cheniere-h1-2025-2026-financial-baseline.json').read_text())
  r=audit(d)
  self.assertEqual(r['financialChange']['totalRevenue']['absolute'],1515)
  self.assertEqual(r['financialChange']['consolidatedAdjustedEbitda']['absolute'],849)
  self.assertEqual(r['financialChange']['netIncome']['absolute'],-2413)
  self.assertEqual(r['financialChange']['lngExported']['absolute'],201)
  self.assertIsNone(d['nationalBenefit']['netNationalEconomicBenefitUsd'])
if __name__=='__main__':unittest.main()
