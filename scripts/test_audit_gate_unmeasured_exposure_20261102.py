"""Regression: status share accounting and unverified estimates."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_unmeasured_exposure_20261102.py")
spec=importlib.util.spec_from_file_location("unmeasured",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(k,status,gwh,value):
    return {"key":k,"status":status,"cargoGwh":gwh,"valueEur":value}
class UnmeasuredTest(unittest.TestCase):
    def test_estimated_and_stock_attributed_shares(self):
        x=m.audit({"lossingen":[row("a","geschat",25,250),row("b","gemeten",75,750)]})
        self.assertEqual(x["by_status"]["geschat"]["proxy_gwh_share_pct"],25)
        self.assertEqual(x["by_status"]["geschat"]["indicative_value_share_pct"],25)
        self.assertEqual(x["by_status"]["bevestigd"]["records"],0)
    def test_missing_value_not_assumed_zero_volume(self):
        x=m.audit({"lossingen":[row("a","geschat",20,None),row("b","gemeten",80,100)]})
        self.assertEqual(x["raw_proxy_volume_gwh"],100)
        self.assertEqual(x["by_status"]["geschat"]["indicative_value_eur"],0)
    def test_reject_unknown_status(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[row("a","invented",20,10)]})
    def test_zero_total_has_no_share(self):
        x=m.audit({"lossingen":[]})
        self.assertIsNone(x["by_status"]["geschat"]["proxy_gwh_share_pct"])
if __name__=="__main__":unittest.main()
