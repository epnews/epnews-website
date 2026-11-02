"""Test operator stock delta calculation and fail-closed quality gates."""
import importlib.util
import unittest
from pathlib import Path
P=Path(__file__).with_name("audit_gate_inventory_deltas_20261102.py")
spec=importlib.util.spec_from_file_location("gate_stock",P)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(day,stock,status="C"):
    return {"gasDayStart":day,"status":status,"inventory":{"gwh":stock}}
class TestStockAudit(unittest.TestCase):
    def test_baseline_and_estimated(self):
        data={"data":[row("2026-09-30","100"),row("2026-10-01","120","E"),row("2026-10-02","150"),row("2026-10-03","190")]}
        a=m.audit(data)
        self.assertFalse(a["missing_september_30_baseline"])
        self.assertIsNone(a["days"][0]["inventory_delta_gwh"])
        self.assertIsNone(a["days"][1]["inventory_delta_gwh"])
        self.assertEqual(a["days"][2]["inventory_delta_gwh"],"40")
        self.assertEqual(a["valid_confirmed_day_deltas"],1)
    def test_missing_baseline_and_duplicate(self):
        data={"data":[row("2026-10-01","100"),row("2026-10-02","120")]}
        a=m.audit(data)
        self.assertTrue(a["missing_september_30_baseline"])
        self.assertIsNone(a["days"][0]["inventory_delta_gwh"])
        self.assertEqual(a["days"][1]["inventory_delta_gwh"],"20")
        with self.assertRaises(ValueError):
            m.audit({"data":[row("2026-10-01","100"),row("2026-10-01","101")]})
if __name__=="__main__":unittest.main()
