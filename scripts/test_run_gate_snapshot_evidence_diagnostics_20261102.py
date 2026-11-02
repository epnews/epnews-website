"""Offline integration checks for archived snapshot envelope and seven diagnostics."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("run_gate_snapshot_evidence_diagnostics_20261102.py")
spec=importlib.util.spec_from_file_location("integration",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(imo,day,measured,estimate,origin):
    return {"key":imo+"|"+day,"imo":imo,"ship":imo,"arrivedAt":day+"T12:00:00Z",
            "status":"gemeten" if measured is not None else "geschat",
            "measuredGasDay":day if measured is not None else None,
            "measuredGwh":measured,"estimatedGwh":estimate,
            "cargoGwh":measured if measured is not None else estimate,
            "valueEur":estimate*100*1000,"ttfEurMwh":100,
            "origin":origin,"doe":None}
def snapshot(rows):
    return {"retrievedAtUtc":"2026-11-02T10:00:00Z",
            "data":{"ok":True,"count":len(rows),"lossingen":rows}}
class IntegrationTest(unittest.TestCase):
    def test_one_snapshot_seven_diagnostics(self):
        rows=[row("1","2026-10-01",970,1015,{"iso":"US","basis":"begin van het AIS-spoor","likely":False}),
              row("2","2026-10-01",970,1074,{"iso":"US","basis":"DOE-historie: 2 keer","likely":True}),
              row("3","2026-10-03",None,350,None)]
        x=m.run(snapshot(rows))
        self.assertEqual(x["arrival_records"],3)
        self.assertEqual(x["measured_records"],2)
        self.assertEqual(len(x["diagnostics"]),7)
        self.assertEqual(x["diagnostics"]["arrival_collisions"]["potential_duplicate_exposure_gwh"],970)
        self.assertEqual(x["diagnostics"]["origin_basis"]["basis_counts"]["historical_doe_voyages"],1)
        self.assertEqual(x["diagnostics"]["indicative_valuation"]["counts"]["value_matches_estimated"],3)
    def test_rejects_raw_unwrapped_data(self):
        with self.assertRaises(ValueError):m.run({"ok":True,"count":0,"lossingen":[]})
    def test_rejects_mismatched_count(self):
        s=snapshot([]);s["data"]["count"]=1
        with self.assertRaises(ValueError):m.run(s)
if __name__=="__main__":unittest.main()
