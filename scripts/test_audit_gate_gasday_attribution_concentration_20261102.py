"""Offline regression for day-level attribution and repeated-volume collisions."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_gasday_attribution_concentration_20261102.py")
spec=importlib.util.spec_from_file_location("dayconcentration",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(key,day,gwh):return {"key":key,"measuredGasDay":day,"measuredGwh":gwh}
class GasDayTest(unittest.TestCase):
    def test_two_assignments_one_day_same_volume(self):
        x=m.audit({"lossingen":[row("a","2026-10-01",970),row("b","2026-10-01",970)]})
        self.assertEqual(x["distinct_measured_gas_days"],1)
        self.assertEqual(x["measured_arrival_records"],2)
        self.assertEqual(x["multi_assignment_gas_days"],1)
        self.assertTrue(x["days"][0]["same_volume_collision"])
    def test_distinct_volumes_same_day_not_exact_collision(self):
        x=m.audit({"lossingen":[row("a","2026-10-01",900),row("b","2026-10-01",970)]})
        self.assertFalse(x["days"][0]["same_volume_collision"])
        self.assertEqual(x["multi_assignment_gas_days"],1)
    def test_estimated_only_excluded(self):
        x=m.audit({"lossingen":[row("a",None,None)]})
        self.assertEqual(x["measured_arrival_records"],0)
    def test_partial_measurement_rejected(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[row("a","2026-10-01",None)]})
if __name__=="__main__":unittest.main()
