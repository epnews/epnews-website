"""Offline tests for Gaspeil snapshot classification and attribution anomalies."""
import importlib.util
import unittest
from pathlib import Path
SCRIPT=Path(__file__).with_name("fetch_gate_gaspeil_snapshot_20261102.py")
spec=importlib.util.spec_from_file_location("gate_snapshot",SCRIPT)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def record(key, imo, arrived, status="gemeten", day=None):
    return {"key":key,"imo":imo,"ship":imo,"terminal":"gate","arrivedAt":arrived,"status":status,
            "measuredGasDay":day,"measuredGwh":970 if day else None,
            "origin":{"iso":"US","likely":True,"basis":"DOE history"}}

class SnapshotTest(unittest.TestCase):
    def test_duplicate_day_and_prearrival(self):
        records=[
            record("a","1","2026-10-01T01:00:00Z",day="2026-10-01"),
            record("b","2","2026-10-01T22:00:00Z",day="2026-10-01"),
            record("c","3","2026-10-30T21:00:00Z",day="2026-10-29"),
            record("d","4","2026-10-31T22:00:00Z",status="geschat")
        ]
        result=module.analyze({"ok":True,"count":len(records),"lossingen":records})
        self.assertEqual(result["record_count"],4)
        self.assertEqual(result["status_counts"],{"gemeten":3,"geschat":1})
        self.assertEqual(len(result["duplicate_measured_gas_days"]["2026-10-01"]),2)
        self.assertEqual(result["measured_day_precedes_arrival_date"][0]["imo"],"3")
    def test_rejects_out_of_window(self):
        with self.assertRaises(ValueError):
            module.analyze({"ok":True,"count":1,"lossingen":[record("x","5","2026-09-30T22:00:00Z")]})
    def test_rejects_duplicate_keys(self):
        v=record("x","5","2026-10-01T00:00:00Z")
        with self.assertRaises(ValueError):
            module.analyze({"ok":True,"count":2,"lossingen":[v,v]})

if __name__=="__main__":
    unittest.main()
