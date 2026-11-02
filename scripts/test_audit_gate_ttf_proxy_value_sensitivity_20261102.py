"""Offline regression for TTF proxy value sensitivity, missing fields and ambiguous collisions."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_ttf_proxy_value_sensitivity_20261102.py")
spec=importlib.util.spec_from_file_location("ttf_sensitivity",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(key,estimate,cargo,price,day=None):
    return {"key":key,"ship":key,"imo":key,"estimatedGwh":estimate,"cargoGwh":cargo,
            "ttfEurMwh":price,"valueEur":estimate*price*1000 if price is not None else None,
            "measuredGasDay":day,"measuredGwh":cargo if day else None}
class SensitivityTest(unittest.TestCase):
    def test_original_and_current_basis(self):
        x=m.audit({"lossingen":[row("a",100,80,50),row("b",100,120,40)]})
        self.assertEqual(x["reported_indicative_value_eur"],9000000)
        self.assertEqual(x["best_available_volume_ttf_hypothetical_eur"],8800000)
        self.assertEqual(x["volume_basis_change_eur"],-200000)
        self.assertEqual(x["positive_value_differences_eur"],800000)
        self.assertEqual(x["negative_value_differences_eur"],-1000000)
    def test_collision_preserves_both_alternatives(self):
        x=m.audit({"lossingen":[row("a",1000,970,73.32,"2026-10-01"),
                                  row("b",1000,970,72.13,"2026-10-01")]})
        options=x["collision_alternative_scenarios"]
        self.assertEqual(len(options),2)
        self.assertEqual({o["hypothetical_value_eur"] for o in options},{71120400,69966100})
    def test_missing_price_is_not_zero(self):
        x=m.audit({"lossingen":[row("a",100,100,None)]})
        self.assertEqual(x["priced_records"],0)
        self.assertEqual(x["missing_price_or_volume_keys"],["a"])
    def test_same_vessel_separate_days_not_collision(self):
        x=m.audit({"lossingen":[row("a",100,100,50,"2026-10-01"),
                                  row("b",100,100,50,"2026-10-02")]})
        self.assertEqual(x["collision_alternative_scenarios"],[])
if __name__=="__main__":unittest.main()
