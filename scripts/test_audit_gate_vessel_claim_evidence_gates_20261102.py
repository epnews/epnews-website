"""Regression tests for Gate vessel-specific evidence gating."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_vessel_claim_evidence_gates_20261102.py")
spec=importlib.util.spec_from_file_location("claim_gates",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def op(day,status):return {"gasDayStart":day+"T00:00:00Z","status":status}
def ship(k,day,vol):return {"key":k,"measuredGasDay":day,"measuredGwh":vol}
class ClaimGateTest(unittest.TestCase):
    def test_estimated_day_shared_assignment_both_reasons(self):
        x=m.audit({"data":[op("2026-10-01","E")]},{"lossingen":[ship("a","2026-10-01",970),ship("b","2026-10-01",970)]})
        for row in x["records"]:
            self.assertIn("operator_inventory_day_not_confirmed",row["blocked_claim_reasons"])
            self.assertIn("multiple_vessel_attributions_same_gas_day",row["blocked_claim_reasons"])
    def test_confirmed_day_still_not_vessel_certified(self):
        x=m.audit({"data":[op("2026-10-02","C")]},{"lossingen":[ship("a","2026-10-02",100)]})
        self.assertEqual(x["records"][0]["blocked_claim_reasons"],["no_independent_vessel_discharge_certificate"])
    def test_unmeasured_excluded_from_inventory_claims(self):
        x=m.audit({"data":[]},{"lossingen":[ship("a",None,None)]})
        self.assertEqual(x["inventory_attributed_records"],0)
        self.assertIn("no_inventory_derived_vessel_attribution",x["records"][0]["blocked_claim_reasons"])
    def test_missing_operator_day_not_confirmed(self):
        x=m.audit({"data":[]},{"lossingen":[ship("a","2026-10-03",100)]})
        self.assertIn("operator_inventory_day_not_confirmed",x["records"][0]["blocked_claim_reasons"])
    def test_partial_measurement_rejected(self):
        with self.assertRaises(ValueError):m.audit({"data":[]},{"lossingen":[ship("a","2026-10-03",None)]})
if __name__=="__main__":unittest.main()
