"""Offline guard against broken Bash continuation in integrated workflow run blocks."""
import unittest
from pathlib import Path
WORKFLOW=Path(__file__).resolve().parents[1]/".github/workflows/gate-operator-baseline-integrated.yml"
def check(text):
    bad=[]
    for line_number,line in enumerate(text.splitlines(),1):
        if not line.startswith("          "):continue
        stripped=line.rstrip()
        if stripped.endswith("\\\\"):
            bad.append(line_number)
    if bad:raise ValueError("Double shell continuation backslashes at workflow lines: "+",".join(map(str,bad)))
    return True
class ShellWorkflowTest(unittest.TestCase):
    def test_integrated_workflow(self):
        self.assertTrue(check(WORKFLOW.read_text(encoding="utf-8")))
    def test_double_backslash_rejected(self):
        with self.assertRaises(ValueError):check("          python script.py \\\\\n            --arg value")
    def test_single_backslash_accepted(self):
        self.assertTrue(check("          python script.py \\\n            --arg value"))
if __name__=="__main__":unittest.main()
