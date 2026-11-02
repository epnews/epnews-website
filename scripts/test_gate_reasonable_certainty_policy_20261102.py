"""Regression: independent evidence, source copies and material conflicts."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("gate_reasonable_certainty_policy_20261102.py")
spec=importlib.util.spec_from_file_location("policy",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def o(kind,family):return {"kind":kind,"source_family":family}
class ConfidencePolicyTest(unittest.TestCase):
    def test_independent_primary_and_port_reasonably_certain(self):
        x=m.evaluate({"claim":"berth","observations":[o("primary_document","gate"),o("independent_port_record","rotterdam"),o("independent_ais","gfw")]})
        self.assertEqual(x["confidence_band"],"reasonably_certain")
        self.assertEqual(x["policy_points"],75)
        self.assertIsNone(x["estimated_probability"])
        self.assertFalse(x["eligible_for_meter"])
    def test_duplicate_gaspeil_views_do_not_create_independence(self):
        x=m.evaluate({"claim":"cargo","observations":[o("aggregated_ship_log","gaspeil"),o("aggregated_ship_log","gaspeil")]})
        self.assertEqual(x["confidence_band"],"preliminary")
        self.assertEqual(x["independent_source_families"],1)
    def test_material_duplicate_volume_veto(self):
        x=m.evaluate({"claim":"970 GWh on both ships","observations":[o("primary_document","gate"),o("independent_port_record","port"),o("independent_ais","ais"),o("operator_inventory","gie")],"material_conflict":True})
        self.assertEqual(x["confidence_band"],"preliminary")
    def test_unexplained_discrepancy_veto(self):
        x=m.evaluate({"observations":[o("primary_document","gate"),o("independent_port_record","port"),o("independent_ais","ais")],"unexplained_discrepancy":True})
        self.assertEqual(x["confidence_band"],"preliminary")
    def test_two_independent_weak_leads_remain_preliminary(self):
        x=m.evaluate({"observations":[o("independent_ais","ais"),o("aggregated_ship_log","gaspeil")]})
        self.assertEqual(x["confidence_band"],"preliminary")
if __name__=="__main__":unittest.main()
