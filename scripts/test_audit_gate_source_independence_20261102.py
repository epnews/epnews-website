"""Source-independence regression tests prevent double counting GIE and Gaspeil."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_source_independence_20261102.py")
spec=importlib.util.spec_from_file_location("independence",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def op(day,status):return {"gasDayStart":day+"T00:00:00Z","status":status}
def ship(key,day,vol):return {"key":key,"measuredGasDay":day,"measuredGwh":vol}
class SourceIndependenceTest(unittest.TestCase):
    def test_measured_source_is_not_independent(self):
        x=m.audit({"data":[op("2026-10-01","C")]},{"lossingen":[ship("a","2026-10-01",970)]})
        self.assertEqual(x["rows"][0]["independent_cargo_volume_sources"],0)
        self.assertFalse(x["rows"][0]["operator_and_gaspeil_count_as_two_independent_discharge_confirmations"])
        self.assertIn("gie_operator_inventory",x["source_dependency_graph"]["gaspeil_measured_gwh"]["depends_on"])
    def test_estimated_only_has_no_inventory_quantity(self):
        x=m.audit({"data":[]},{"lossingen":[ship("a",None,None)]})
        self.assertFalse(x["rows"][0]["inventory_derived_attribution"])
        self.assertEqual(x["operator_status_counts"]["NO_MEASUREMENT"],1)
    def test_operator_estimate_not_certification(self):
        x=m.audit({"data":[op("2026-10-01","E")]},{"lossingen":[ship("a","2026-10-01",970)]})
        self.assertEqual(x["rows"][0]["operator_inventory_status"],"E")
        self.assertEqual(x["rows"][0]["discharge_certification_status"],"not_independently_verified")
    def test_reject_partial(self):
        with self.assertRaises(ValueError):m.audit({"data":[]},{"lossingen":[ship("a","2026-10-01",None)]})
if __name__=="__main__":unittest.main()
