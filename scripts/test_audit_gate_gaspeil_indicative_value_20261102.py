"""Regression of valueEur methodology using representative observed Gaspeil rows."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_gaspeil_indicative_value_20261102.py")
spec=importlib.util.spec_from_file_location("value_audit",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(ship,estimate,cargo,ttf,status="gemeten"):
    return {"ship":ship,"imo":"1234567","estimatedGwh":estimate,"cargoGwh":cargo,
            "measuredGwh":cargo if status=="gemeten" else None,"ttfEurMwh":ttf,
            "valueEur":round(estimate*ttf*1000),"status":status}
class ValueAuditTest(unittest.TestCase):
    def test_estimate_value_not_measured_value(self):
        x=m.audit({"lossingen":[row("VENTURE GATOR",1110,943,103.9)]})
        self.assertEqual(x["counts"]["value_matches_estimated"],1)
        self.assertEqual(x["counts"]["value_matches_best_available"],0)
        self.assertEqual(x["counts"]["measured_cargo_differs_from_estimated"],1)
    def test_estimate_equal_cargo_can_match_both(self):
        x=m.audit({"lossingen":[row("HLS CARTAGENA",1015,1015,103.94,"geschat")]})
        self.assertEqual(x["counts"]["value_matches_best_available"],1)
    def test_nonmatching_value_is_detected(self):
        x=row("TEST",1000,800,50)
        x["valueEur"]=100
        self.assertEqual(m.audit({"lossingen":[x]})["counts"]["value_mismatch_estimated"],1)
if __name__=="__main__":unittest.main()
