import unittest
from scripts.build_eia_h1_coverage_adjusted_values import calculate
class TestCoverageAdjusted(unittest.TestCase):
 def test_monthly_calculation_and_null_gates(self):
  prices={'sectors':{'residential':{'2025':[10]*6,'2026':[12]*6},'industrial':{'2025':[5]*6,'2026':[6]*6}}}
  cov={'sectors':{'residential':{'2025':[50]*6,'2026':[60]*6},'industrial':{'2025':[10]*6,'2026':[20]*6}}}
  deliveries={s:{f'{y}-{m:02d}':1.0 for y in (2025,2026) for m in range(1,7)} for s in ('residential','industrial')}
  out=calculate(prices,cov,deliveries)
  self.assertEqual(out['sectors']['residential']['2025']['estimatedGrossSalesValueMillionUsd'],30)
  self.assertEqual(out['sectors']['residential']['2026']['estimatedGrossSalesValueMillionUsd'],43.2)
  self.assertEqual(out['sectors']['industrial']['2025']['estimatedGrossSalesValueMillionUsd'],3)
  self.assertEqual(out['sectors']['industrial']['2026']['estimatedGrossSalesValueMillionUsd'],7.2)
  for k in ('actualConsumerExpenditureUsd','lngCausedDomesticCostUsd','netNationalBenefitUsd','geopoliticalInfluenceScore'):self.assertIsNone(out[k])
if __name__=='__main__':unittest.main()
