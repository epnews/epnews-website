"""Offline tests for independent Gate operator / Gaspeil gas-day reconciliation."""
import importlib.util
import unittest
from pathlib import Path
P=Path(__file__).with_name("reconcile_gate_alsi_gaspeil_20261102.py")
spec=importlib.util.spec_from_file_location("gate_reconcile",P)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def op(day,status="C"):
    return {"gasDayStart":day,"status":status,"inventory":{"gwh":"2874.56"},"sendOut":"496.3"}

def vessel(key,day,arrived,status="gemeten"):
    return {"key":key,"imo":key,"arrivedAt":arrived,"measuredGasDay":day,"measuredGwh":970,"status":status}

class ReconcileTest(unittest.TestCase):
    def test_shared_day_and_prearrival(self):
        a={"data":[op("2026-10-01","E"),op("2026-10-29")]}
        g={"lossingen":[vessel("a","2026-10-01","2026-10-01T01:00:00Z"),
                         vessel("b","2026-10-01","2026-10-01T22:00:00Z"),
                         vessel("c","2026-10-29","2026-10-30T21:00:00Z")]}
        result=module.reconcile(a,g)
        types=[v["type"] for v in result["exceptions"]]
        self.assertIn("shared_operator_gas_day",types)
        self.assertIn("measurement_before_arrival",types)
        self.assertIn("operator_day_not_confirmed",types)
        self.assertEqual(result["daily_comparison"][0]["operator_inventory_gwh"],"2874.56")
        self.assertIn("not independent",result["caveat"])
    def test_duplicate_operator_day_rejected(self):
        with self.assertRaises(ValueError):
            module.reconcile({"data":[op("2026-10-01"),op("2026-10-01")]},{"lossingen":[]})

if __name__=="__main__": unittest.main()
