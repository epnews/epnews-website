"""Regression: five vessel claims remain preliminary until independent records exist."""
import importlib.util
import json
import sys
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_five_vessel_confidence_20261102.py")
sys.path.insert(0,str(p.parent))
spec=importlib.util.spec_from_file_location("vessel_audit",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class FiveVesselAuditTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result=m.audit(json.loads(m.MATRIX.read_text()))
    def test_15_claims_preliminary(self):
        self.assertEqual(self.result["summary"],{"vessels":5,"claims":15,"reasonably_certain":0,"high":0,"preliminary":15})
    def test_duplicate_volume_conflicts(self):
        x=[r for r in self.result["claims"] if r["claim_type"]=="discharge_volume" and r["material_conflict"]]
        self.assertEqual({r["ship"] for r in x},{"BW NIVALIS","VIVIT AMERICAS LNG"})
    def test_preberth_flags(self):
        x=[r for r in self.result["claims"] if r["claim_type"]=="berth" and r["unexplained_discrepancy"]]
        self.assertEqual(len(x),4)
    def test_all_no_meter(self):
        self.assertTrue(all(not x["eligible_for_meter"] for x in self.result["claims"]))
    def test_no_unsupported_certifications(self):
        for x in self.result["claims"]:
            self.assertEqual(x["independent_port_record"],"not_obtained")
            self.assertEqual(x["terminal_discharge_record"],"not_obtained")
            self.assertEqual(x["voyage_loading_record"],"not_obtained")
if __name__=="__main__":unittest.main()
