"""Regression: variance review flags are not custody-transfer proof."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_estimate_stock_variance_20261102.py")
spec=importlib.util.spec_from_file_location("variance",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(imo,e,v):
    return {"key":imo+"|2026-10-01","ship":imo,"imo":imo,"estimatedGwh":e,"measuredGwh":v}
class VarianceAuditTest(unittest.TestCase):
    def test_2pct_threshold_is_review_only(self):
        x=m.audit({"lossingen":[row("a",1000,1020),row("b",1000,1021)]})
        self.assertEqual(x["above_2pct_review_threshold"],1)
        self.assertTrue(all(not r["certified_unloading"] for r in x["rows"]))
    def test_increases_decreases_and_sums(self):
        x=m.audit({"lossingen":[row("a",100,120),row("b",100,80)]})
        self.assertEqual((x["increased"],x["decreased"],x["net_change_gwh"]),(1,1,0))
    def test_estimate_must_be_positive(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[row("a",0,10)]})
    def test_unmeasured_is_excluded(self):
        x=m.audit({"lossingen":[{"key":"a","ship":"a","imo":"a","estimatedGwh":100,"measuredGwh":None}]})
        self.assertEqual(x["measured_records"],0)
if __name__=="__main__":unittest.main()
