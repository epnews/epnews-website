"""Regression: distinguish repeated voyages from same-day shared cargo assignment."""
import importlib.util
import unittest
from pathlib import Path
p=Path(__file__).with_name("audit_gate_arrival_collision_exposure_20261102.py")
spec=importlib.util.spec_from_file_location("collision",p)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def row(imo,day,volume,gasday=None):
    return {"imo":imo,"key":f"{imo}|{day}","cargoGwh":volume,"measuredGwh":volume if gasday else None,"measuredGasDay":gasday}
class CollisionTest(unittest.TestCase):
    def test_shared_970_is_collision_not_two_certified_cargoes(self):
        d={"lossingen":[row("9968932","2026-10-01",970,"2026-10-01"),row("9864667","2026-10-01",970,"2026-10-01")]}
        x=m.audit(d)
        self.assertEqual(x["potential_duplicate_exposure_gwh"],970)
        self.assertEqual(x["raw_best_available_sum_gwh"],1940)
        self.assertEqual(x["noncertified_adjusted_sum_gwh"],970)
    def test_same_ship_separate_arrivals_are_not_duplicates(self):
        d={"lossingen":[row("9901362","2026-10-09",350),row("9901362","2026-10-23",350)]}
        x=m.audit(d)
        self.assertEqual(x["unique_imos"],1)
        self.assertEqual(len(x["repeat_imo_visits"]),1)
        self.assertEqual(x["potential_duplicate_exposure_gwh"],0)
    def test_reused_arrival_key_is_invalid(self):
        d={"lossingen":[row("1","2026-10-01",1),row("1","2026-10-01",1)]}
        with self.assertRaises(ValueError):m.audit(d)
    def test_different_volume_same_day_not_automatically_duplicate(self):
        d={"lossingen":[row("1","2026-10-01",800,"2026-10-01"),row("2","2026-10-01",900,"2026-10-01")]}
        self.assertEqual(m.audit(d)["potential_duplicate_exposure_gwh"],0)
if __name__=="__main__":unittest.main()
