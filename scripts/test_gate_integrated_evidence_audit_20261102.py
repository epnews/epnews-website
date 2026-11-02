"""Regression for integrated Gate October artifact quality audit."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("gate_integrated_evidence_audit_20261102.py")
s=importlib.util.spec_from_file_location("gate_audit",p)
m=importlib.util.module_from_spec(s);s.loader.exec_module(m)

def vessel(imo,day,arrived,status="gemeten"):
    return {"imo":imo,"key":imo,"ship":imo,"terminal":"gate","status":status,"arrivedAt":arrived,"measuredGasDay":day,"measuredGwh":970}
class AuditTest(unittest.TestCase):
    def test_duplicate_estimated_day_and_chronology(self):
        op={"data":[{"gasDayStart":"2026-10-01","status":"E"},{"gasDayStart":"2026-10-29","status":"C"}]}
        gas={"data":{"lossingen":[vessel("1","2026-10-01","2026-10-01T01:00:00Z"),
                                   vessel("2","2026-10-01","2026-10-01T22:00:00Z"),
                                   vessel("3","2026-10-29","2026-10-30T21:00:00Z"),
                                   vessel("4",None,"2026-10-30T01:00:00Z","geschat")]}}
        x=m.report(op,gas)
        self.assertEqual(x["operator_days"],2)
        self.assertEqual(x["october_operator_days"],2)
        self.assertEqual(x["baseline_operator_days"],0)
        self.assertEqual(x["vessel_arrivals"],4)
        self.assertEqual(x["distinct_measured_days"],2)
        self.assertEqual(x["independent_cargo_certifications"],0)
        self.assertTrue(x["missing_september_30_baseline"])
        self.assertEqual({v["type"] for v in x["exceptions"]},
                         {"nonconfirmed_operator_day","shared_measured_day","measured_before_arrival"})
    def test_duplicate_operator_days_rejected(self):
        with self.assertRaises(ValueError):
            m.report({"data":[{"gasDayStart":"2026-10-01"},{"gasDayStart":"2026-10-01"}]},{"lossingen":[]})
if __name__=="__main__":unittest.main()
