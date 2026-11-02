"""Offline tests for operator status segregation of stock-derived vessel assignments."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_measured_operator_quality_segments_20261102.py")
spec=importlib.util.spec_from_file_location("quality",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def op(day,status):return {"gasDayStart":day+"T00:00:00Z","status":status}
def vessel(key,day,vol):return {"key":key,"measuredGasDay":day,"measuredGwh":vol}
class OperatorQualityTest(unittest.TestCase):
    def test_confirmed_estimated_and_missing(self):
        o={"data":[op("2026-10-01","E"),op("2026-10-02","C")]}
        s={"data":{"lossingen":[vessel("a","2026-10-01",970),vessel("b","2026-10-01",970),
                                vessel("c","2026-10-02",100),vessel("d","2026-10-03",50)]}}
        x=m.audit(o,s)
        self.assertEqual(x["operator_status_segments"]["E"]["arrival_assignments"],2)
        self.assertEqual(x["operator_status_segments"]["E"]["distinct_gas_days"],1)
        self.assertEqual(x["operator_status_segments"]["C"]["attributed_gwh"],100)
        self.assertEqual(x["operator_status_segments"]["MISSING"]["arrival_assignments"],1)
    def test_estimated_only_vessel_not_counted(self):
        x=m.audit({"data":[]},{"lossingen":[vessel("a",None,None)]})
        self.assertEqual(x["measured_arrival_records"],0)
    def test_duplicate_operator_day_rejected(self):
        with self.assertRaises(ValueError):
            m.audit({"data":[op("2026-10-01","C"),op("2026-10-01","E")]},{"lossingen":[]})
    def test_incomplete_measured_record_rejected(self):
        with self.assertRaises(ValueError):
            m.audit({"data":[]},{"lossingen":[vessel("a","2026-10-01",None)]})
if __name__=="__main__":unittest.main()
