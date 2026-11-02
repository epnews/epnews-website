"""Test cross-report invariants reject inconsistent source attribution."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("check_gate_cross_diagnostic_consistency_20261102.py")
spec=importlib.util.spec_from_file_location("crosscheck",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def fixture():
    return {"arrival_records":3,"measured_records":2,"diagnostics":{
        "unmeasured_exposure":{"by_status":{
            "geschat":{"records":1,"proxy_gwh":100},
            "gemeten":{"records":2,"proxy_gwh":200},
            "bevestigd":{"records":0,"proxy_gwh":0}},
            "raw_proxy_volume_gwh":300,"indicative_value_eur":1234},
        "gasday_concentration":{"measured_arrival_records":2,"distinct_measured_gas_days":1,"multi_assignment_gas_days":1},
        "gasday_utc_offsets":{"utc_day_offset_counts":{"0":1,"1":1}},
        "gasday_offset_hours":{"offset_groups":{"0":{"records":1},"1":{"records":1}}},
        "ttf_value_sensitivity":{"reported_indicative_value_eur":1234}}}
class CrossCheckTest(unittest.TestCase):
    def test_consistent(self):
        self.assertEqual(len(m.check(fixture())["checks_passed"]),8)
    def test_status_partition(self):
        x=fixture();x["diagnostics"]["unmeasured_exposure"]["by_status"]["geschat"]["records"]=2
        with self.assertRaises(ValueError):m.check(x)
    def test_volume_mismatch(self):
        x=fixture();x["diagnostics"]["unmeasured_exposure"]["raw_proxy_volume_gwh"]=301
        with self.assertRaises(ValueError):m.check(x)
    def test_offset_mismatch(self):
        x=fixture();x["diagnostics"]["gasday_offset_hours"]["offset_groups"]["1"]["records"]=2
        with self.assertRaises(ValueError):m.check(x)
    def test_valuation_mismatch(self):
        x=fixture();x["diagnostics"]["ttf_value_sensitivity"]["reported_indicative_value_eur"]=1235
        with self.assertRaises(ValueError):m.check(x)
if __name__=="__main__":unittest.main()
