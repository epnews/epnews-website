import unittest
from scripts.audit_eia_eu_lng_coverage import audit
from scripts.extract_eia_eu_lng_destinations import EU27,FACTOR
class Coverage(unittest.TestCase):
 def test_all_missing_never_zero(self):
  d={'countries':{},'failures':{k:'HTTP Error 404' for k in EU27}}
  r=audit(d)
  self.assertEqual(r['periods']['2025']['partial_retrieved_sum_bcm'],0)
  self.assertIsNone(r['periods']['2025']['eu27_total_bcm'])
  self.assertFalse(r['coverage_complete'])
 def test_one_complete_is_still_not_eu_total(self):
  months={f'2025-{m:02d}':100 for m in range(1,7)}
  months.update({f'2026-{m:02d}':200 for m in range(1,7)})
  d={'countries':{'FR':{'monthly_mmcf':months,'h1_bcm':{'2025':600*FACTOR,'2026':1200*FACTOR}}},'failures':{k:'404' for k in EU27 if k!='FR'}}
  r=audit(d)
  self.assertEqual(r['periods']['2025']['complete_destination_count'],1)
  self.assertIsNone(r['periods']['2025']['eu27_total_bcm'])
  self.assertGreater(r['periods']['2025']['partial_retrieved_sum_bcm'],0)
if __name__=='__main__':unittest.main()
