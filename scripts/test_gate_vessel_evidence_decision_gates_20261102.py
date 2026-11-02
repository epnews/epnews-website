"""Verify evidence quality is never inflated by repeated Gaspeil/GIE observations."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("gate_vessel_evidence_decision_gates_20261102.py")
s=importlib.util.spec_from_file_location("gates",p)
m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def ev(kind,source):return {"kind":kind,"source_id":source}
class EvidenceGateTest(unittest.TestCase):
    def test_gaspeil_api_and_page_are_not_independent(self):
        x=m.classify({"imo":"9968932","evidence":[ev("gaspeil_api","gaspeil"),ev("gaspeil_ship_page","gaspeil"),ev("gie_inventory","gie")]})
        self.assertEqual(x["discharge_status"],"modeled_or_reported_only")
        self.assertEqual(x["origin_status"],"unverified")
        self.assertFalse(x["soi_score_eligible"])
    def test_ais_berth_does_not_certify_discharge(self):
        x=m.classify({"imo":"9854375","evidence":[ev("independent_port_berth_record","rotterdam"),ev("ais_loading_port_visit","gfw")]})
        self.assertEqual(x["discharge_status"],"berth_corrob_only")
        self.assertEqual(x["origin_status"],"voyage_lead_only")
    def test_certified_documentation_still_not_revenue(self):
        x=m.classify({"imo":"9750658","evidence":[ev("independent_port_berth_record","port"),ev("terminal_discharge_certificate","gate"),ev("voyage_specific_loading_certificate","loader")]})
        self.assertEqual(x["discharge_status"],"certified_vessel_discharge")
        self.assertEqual(x["origin_status"],"voyage_documented")
        self.assertEqual(x["revenue_status"],"not_established")
        self.assertFalse(x["soi_score_eligible"])
    def test_duplicate_source_not_independent(self):
        x=m.classify({"evidence":[ev("independent_port_berth_record","same"),ev("terminal_discharge_certificate","same")]})
        self.assertNotEqual(x["discharge_status"],"certified_vessel_discharge")
if __name__=="__main__":unittest.main()
