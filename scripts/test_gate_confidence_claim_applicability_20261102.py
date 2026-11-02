"""Protect against high scores from evidence unrelated to the actual claim."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("gate_reasonable_certainty_policy_20261102.py")
spec=importlib.util.spec_from_file_location("policy",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def obs(kind,family):return {"kind":kind,"source_family":family}
class ClaimApplicabilityTest(unittest.TestCase):
    def test_ais_and_inventory_cannot_establish_discharge(self):
        x=m.evaluate({"claim_type":"discharge_volume","claim":"970 GWh","observations":[obs("independent_ais","gfw"),obs("operator_inventory","gie"),obs("aggregated_ship_log","gaspeil")]})
        self.assertEqual(x["confidence_band"],"preliminary")
        self.assertEqual(x["policy_points"],0)
        self.assertEqual(len(x["excluded_nonprobative"]),3)
    def test_loading_origin_requires_document(self):
        x=m.evaluate({"claim_type":"voyage_origin","observations":[obs("historical_voyage","doe_old"),obs("independent_ais","gfw")]})
        self.assertEqual(x["confidence_band"],"preliminary")
    def test_berth_multiple_sources_are_not_necessarily_enough(self):
        x=m.evaluate({"claim_type":"berth","observations":[obs("independent_ais","gfw"),obs("aggregated_ship_log","gaspeil")]})
        self.assertEqual(x["confidence_band"],"preliminary")
    def test_unknown_claim_rejected(self):
        with self.assertRaises(ValueError):m.evaluate({"claim_type":"any","observations":[]})
    def test_string_false_is_not_a_valid_conflict_flag(self):
        with self.assertRaises(ValueError):m.evaluate({"claim_type":"berth","material_conflict":"false","observations":[]})
    def test_independent_primary_docs_can_be_reasonably_certain(self):
        x=m.evaluate({"claim_type":"discharge_volume","observations":[obs("primary_document","gate"),obs("primary_document","surveyor"),obs("primary_document","carrier")]})
        self.assertEqual(x["confidence_band"],"high")
        self.assertFalse(x["eligible_for_meter"])
if __name__=="__main__":unittest.main()
