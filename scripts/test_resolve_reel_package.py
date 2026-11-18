import json, os, pathlib, subprocess, sys, tempfile, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class ResolverTests(unittest.TestCase):
    def run_case(self, manifest=True, changes=None, event="workflow_dispatch"):
        with tempfile.TemporaryDirectory() as tmp:
            p=pathlib.Path(tmp)
            (p/"config").mkdir()
            (p/"config/reel-music-catalog.json").write_text('{"categories":{}}')
            folder="publication-manifests" if manifest else "reel-packages"
            (p/folder).mkdir()
            data=dict(drive_file_id="abcdefghijklmnop",music_category="none",duration="15")
            if manifest:
                data.update(reel_drive_file_id="portraitabcdefghijkl",reel_image_verified=True,slug="test-story",headline="Headline",facebook_description="Description",image_verified=True,fact_checked=True,website_published=True,approved_for_reel=True,automatic_reel=True)
            else:
                data.update(approved=True,reel_title="Headline",reel_description="Description")
            data.update(changes or {})
            path=f"{folder}/test-story.json"
            (p/path).write_text(json.dumps(data))
            env=dict(os.environ,PACKAGE_PATH=path,GITHUB_ENV=str(p/"env"),EVENT_NAME=event)
            r=subprocess.run([sys.executable,str(ROOT/"scripts/resolve_reel_package.py")],cwd=p,env=env,capture_output=True,text=True)
            return r,(p/"env").read_text() if (p/"env").exists() else ""
    def test_both_formats(self):
        for manifest in (True,False):
            r,out=self.run_case(manifest)
            self.assertEqual(r.returncode,0,r.stderr)
            self.assertIn("Headline",out)
            self.assertIn("Description",out)
    def test_manifest_gates(self):
        for field in ("image_verified","fact_checked","website_published","approved_for_reel"):
            r,out=self.run_case(changes={field:False})
            self.assertNotEqual(r.returncode,0)
            self.assertFalse(out)
    def test_portrait_gate(self):
        for changes in ({"reel_image_verified":False},{"reel_drive_file_id":None},{"reel_drive_file_id":"abcdefghijklmnop"}):
            r,out=self.run_case(changes=changes)
            self.assertNotEqual(r.returncode,0)
            self.assertFalse(out)
        r,out=self.run_case()
        self.assertIn("portraitabcdefghijkl",out)
        self.assertNotIn("\nabcdefghijklmnop\n",out)
    def test_legacy_gate(self):
        self.assertNotEqual(self.run_case(False,{"approved":False})[0].returncode,0)
    def test_slug(self):
        self.assertNotEqual(self.run_case(changes={"slug":"other"})[0].returncode,0)
    def test_automatic_gate(self):
        self.assertNotEqual(self.run_case(changes={"automatic_reel":False},event="push")[0].returncode,0)
if __name__=="__main__": unittest.main()
