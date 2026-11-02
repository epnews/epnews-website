"""Regression for independently sourced vessel records request matrix."""
import importlib.util
import json
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_independent_evidence_requests_20261102.py")
spec=importlib.util.spec_from_file_location("audit",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class MatrixTest(unittest.TestCase):
    def test_all_unverified(self):
        x=m.audit(json.loads(m.P.read_text()))
        self.assertEqual(x["vessels"],5)
        self.assertEqual(x["independent_port_records_obtained"],0)
        self.assertEqual(x["discharge_records_obtained"],0)
        self.assertEqual(x["loading_records_obtained"],0)
        self.assertEqual(x["duplicate_assignment_vessels"],2)
        self.assertEqual(x["pre_berth_assignment_vessels"],3)
    def test_reject_false_confirmation(self):
        x=json.loads(m.P.read_text())
        x["records"][0]["terminal_discharge_record"]="confirmed"
        with self.assertRaises(AssertionError):m.audit(x)
if __name__=="__main__":unittest.main()
