"""Tests: historical DOE, AIS and vessel-class inferences cannot certify loading origin."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_origin_evidence_basis_20261102.py")
spec=importlib.util.spec_from_file_location("origin_audit",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(key,basis,iso="US",status="gemeten",doe=None):
    return {"key":key,"ship":key,"imo":key,"status":status,"doe":doe,
            "origin":{"iso":iso,"basis":basis,"likely":False} if iso else None}
class OriginAuditTest(unittest.TestCase):
    def test_historical_doe_is_not_current_voyage(self):
        x=m.audit({"lossingen":[row("a","DOE-historie: 17 keer Amerikaans gas geëxporteerd")]})
        self.assertEqual(x["basis_counts"]["historical_doe_voyages"],1)
        self.assertEqual(x["same_voyage_doe_confirmations"],0)
        self.assertFalse(x["rows"][0]["certified_loading_origin"])
    def test_ais_is_not_loading_certificate(self):
        x=m.audit({"lossingen":[row("a","begin van het AIS-spoor")]})
        self.assertEqual(x["basis_counts"]["ais_track_start"],1)
        self.assertFalse(x["rows"][0]["certified_loading_origin"])
    def test_arc7_route_is_inference(self):
        x=m.audit({"lossingen":[row("a","Arc7 Jamal-tankers",iso="RU")]})
        self.assertEqual(x["basis_counts"]["vessel_class_route_inference"],1)
    def test_unknown_stays_unknown(self):
        x=m.audit({"lossingen":[row("a","",iso=None)]})
        self.assertEqual(x["origin_label_counts"]["unknown"],1)
    def test_confirmed_doe_does_not_automatically_certify_origin(self):
        x=m.audit({"lossingen":[row("a","DOE-historie",status="bevestigd",doe={"loadedGwh":100})]})
        self.assertEqual(x["same_voyage_doe_confirmations"],1)
        self.assertFalse(x["rows"][0]["certified_loading_origin"])
if __name__=="__main__":unittest.main()
