"""Regression: signed proxy totals cannot conceal absolute disagreement."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_proxy_variance_cancellation_20261102.py")
spec=importlib.util.spec_from_file_location("cancellation",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(e,v):return {"estimatedGwh":e,"measuredGwh":v}
class CancellationTest(unittest.TestCase):
    def test_perfect_signed_cancellation_still_has_disagreement(self):
        x=m.audit({"lossingen":[row(100,120),row(100,80)]})
        self.assertEqual(x["net_difference_gwh"],0)
        self.assertEqual(x["absolute_differences_gwh"],40)
        self.assertEqual(x["cancellation_share_pct"],100)
    def test_no_variance(self):
        x=m.audit({"lossingen":[row(100,100)]})
        self.assertEqual(x["cancellation_share_pct"],None)
    def test_missing_measured_excluded(self):
        x=m.audit({"lossingen":[row(100,None),row(100,110)]})
        self.assertEqual(x["measured_records"],1)
    def test_zero_estimate_rejected(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[row(0,10)]})
if __name__=="__main__":unittest.main()
