import unittest
from scripts.build_eia_h1_domestic_gas_panel import audit,PERIODS,REQUIRED
class TestPanel(unittest.TestCase):
 def test_missing_series_fail_closed(self):
  result=audit({})
  self.assertFalse(result['complete'])
  self.assertEqual(set(result['status']),set(REQUIRED))
 def test_full_panel(self):
  panel={name:{'observations':{p:1.0 for p in PERIODS},'units':'verified units'} for name in REQUIRED}
  self.assertTrue(audit(panel)['complete'])
 def test_one_missing_month(self):
  panel={name:{'observations':{p:1.0 for p in PERIODS},'units':'verified units'} for name in REQUIRED}
  del panel['lng_exports']['observations']['2026-06']
  self.assertFalse(audit(panel)['complete'])
  self.assertEqual(audit(panel)['status']['lng_exports']['missingMonths'],['2026-06'])
if __name__=='__main__':unittest.main()
