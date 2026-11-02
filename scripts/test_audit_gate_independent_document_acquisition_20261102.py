"""Offline tests for Gate independent-document acquisition register."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_independent_document_acquisition_20261102.py")
spec=importlib.util.spec_from_file_location("acquisition",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class AcquisitionTest(unittest.TestCase):
    def test_requests_all_four_document_families(self):
        x=m.audit({"lossingen":[{"key":"a","imo":"1234567","status":"gemeten","measuredGasDay":"2026-10-01"}]})
        self.assertEqual(len(x["arrival_requests"][0]["required_document_codes"]),4)
        self.assertFalse(x["arrival_requests"][0]["document_received"])
    def test_estimated_only_remains_uncertified(self):
        x=m.audit({"data":{"lossingen":[{"key":"a","status":"geschat"}]}})
        self.assertEqual(x["arrival_requests"][0]["evidence_acquisition_state"],"not_requested_or_not_recorded")
    def test_duplicate_arrival_key_rejected(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[{"key":"a"},{"key":"a"}]})
    def test_missing_key_rejected(self):
        with self.assertRaises(ValueError):m.audit({"lossingen":[{"status":"geschat"}]})
    def test_empty_snapshot(self):
        self.assertEqual(m.audit({"lossingen":[]})["arrival_records"],0)
if __name__=="__main__":unittest.main()
