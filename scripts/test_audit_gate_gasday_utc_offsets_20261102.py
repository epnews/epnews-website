"""Regression: date labels are not timestamps or discharge certification."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_gasday_utc_offsets_20261102.py")
spec=importlib.util.spec_from_file_location("offset",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(imo,arrival,day):
    return {"ship":imo,"imo":imo,"key":imo+"|"+arrival[:10],"arrivedAt":arrival,"measuredGasDay":day}
class GasDayOffsetTest(unittest.TestCase):
    def test_previous_utc_date_is_flagged_not_proven(self):
        x=m.audit({"lossingen":[row("V","2026-10-30T21:07:31.305Z","2026-10-29")]})
        self.assertEqual(x["prearrival_utc_day_labels"],1)
        self.assertFalse(x["rows"][0]["proven_causality"])
    def test_same_and_next_day(self):
        x=m.audit({"lossingen":[row("A","2026-10-01T01:07:00Z","2026-10-01"),row("B","2026-10-02T21:07:00Z","2026-10-03")]})
        self.assertEqual(x["utc_day_offset_counts"],{"0":1,"1":1})
    def test_unmeasured_not_counted(self):
        x=m.audit({"lossingen":[row("A","2026-10-01T01:07:00Z",None)]})
        self.assertEqual(x["measured_arrival_records"],0)
    def test_offset_timezone_handled(self):
        x=m.audit({"lossingen":[row("A","2026-10-02T00:30:00+02:00","2026-10-01")]})
        self.assertEqual(x["rows"][0]["utc_calendar_day_offset"],0)
if __name__=="__main__":unittest.main()
