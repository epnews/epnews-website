"""Regression for arrival-hour grouping and timezone-aware offset diagnostics."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_gasday_offset_hour_patterns_20261102.py")
spec=importlib.util.spec_from_file_location("offset_hours",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(k,arrival,day):return {"key":k,"ship":k,"arrivedAt":arrival,"measuredGasDay":day}
class OffsetHourTest(unittest.TestCase):
    def test_three_offset_groups(self):
        x=m.audit({"lossingen":[row("a","2026-10-02T22:00:00Z","2026-10-01"),
                                  row("b","2026-10-02T11:00:00Z","2026-10-02"),
                                  row("c","2026-10-02T04:00:00Z","2026-10-03")]})
        self.assertEqual(x["measured_arrival_records"],3)
        self.assertEqual(x["offset_groups"]["-1"]["utc_arrival_hours"],[22])
        self.assertEqual(x["offset_groups"]["1"]["utc_arrival_hours"],[4])
    def test_estimated_only_excluded(self):
        x=m.audit({"lossingen":[row("a","2026-10-02T04:00:00Z",None)]})
        self.assertEqual(x["offset_groups"],{})
    def test_offset_uses_utc_day_not_local_offset_day(self):
        x=m.audit({"lossingen":[row("a","2026-10-02T23:00:00-05:00","2026-10-03")]})
        self.assertIn("0",x["offset_groups"])
        self.assertEqual(x["offset_groups"]["0"]["utc_arrival_hours"],[4])
    def test_rejects_naive_timestamp(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[row("a","2026-10-02T04:00:00","2026-10-03")]})
if __name__=="__main__":unittest.main()
