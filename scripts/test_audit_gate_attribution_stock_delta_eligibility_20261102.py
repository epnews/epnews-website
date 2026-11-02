"""Verify C/C adjacency gates are stricter than current-day C status."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_attribution_stock_delta_eligibility_20261102.py")
spec=importlib.util.spec_from_file_location("delta_eligibility",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def op(day,status,stock=100):
    return {"gasDayStart":day+"T00:00:00Z","status":status,"inventory":{"gwh":stock}}
def ship(key,day,volume=50):return {"key":key,"measuredGasDay":day,"measuredGwh":volume}
class DeltaEligibilityTest(unittest.TestCase):
    def test_c_after_e_is_withheld(self):
        x=m.audit({"data":[op("2026-10-01","E"),op("2026-10-02","C")]},{"lossingen":[ship("a","2026-10-02")]})
        self.assertEqual(x["confirmed_adjacent_stock_withheld"],1)
        self.assertIn("prior_inventory_not_confirmed_or_missing",x["rows"][0]["ineligible_reasons"])
    def test_both_confirmed_with_stocks_eligible(self):
        x=m.audit({"data":[op("2026-10-01","C"),op("2026-10-02","C")]},{"lossingen":[ship("a","2026-10-02")]})
        self.assertEqual(x["confirmed_adjacent_stock_eligible"],1)
    def test_missing_prior_day_withheld(self):
        x=m.audit({"data":[op("2026-10-02","C")]},{"lossingen":[ship("a","2026-10-02")]})
        self.assertEqual(x["confirmed_adjacent_stock_withheld"],1)
    def test_missing_stock_withheld(self):
        x=m.audit({"data":[op("2026-10-01","C",None),op("2026-10-02","C")]},{"lossingen":[ship("a","2026-10-02")]})
        self.assertEqual(x["confirmed_adjacent_stock_withheld"],1)
    def test_estimated_only_excluded(self):
        x=m.audit({"data":[]},{"lossingen":[ship("a",None,None)]})
        self.assertEqual(x["measured_arrival_records"],0)
if __name__=="__main__":unittest.main()
