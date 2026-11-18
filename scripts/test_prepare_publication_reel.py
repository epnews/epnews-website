#!/usr/bin/env python3
"""Self-contained positive and negative tests for the editorial Reel handoff."""
import json, pathlib, subprocess, sys, tempfile
SCRIPT=pathlib.Path(__file__).resolve().parent/"prepare_publication_reel.py"
base={"slug":"editorial-generator-test","headline":"INTERNAL TEST ONLY","facebook_description":"Internal automation test, not news.","drive_file_id":"1vW-FyICS4Bbq7FJxpxbx3nKJD0dlKb2R","reel_drive_file_id":"synthetic-portrait-test-id","reel_image_verified":True,"image_verified":True,"fact_checked":True,"website_published":True}
with tempfile.TemporaryDirectory() as directory:
    root=pathlib.Path(directory)
    source=root/"story.json"
    def run(payload, approve=True):
        source.write_text(json.dumps(payload),encoding="utf-8")
        cmd=[sys.executable,str(SCRIPT),str(source)]
        if approve: cmd.append("--approve-reel")
        return subprocess.run(cmd,cwd=root,capture_output=True,text=True)
    assert run(base,False).returncode!=0, "Must require explicit approval"
    for flag in ("image_verified","fact_checked","website_published","reel_image_verified"):
        invalid=dict(base,**{flag:False})
        assert run(invalid).returncode!=0, "Must reject unverified "+flag
    for bad_id in (None,base["drive_file_id"],"short"):
        assert run(dict(base,reel_drive_file_id=bad_id)).returncode!=0, "Must reject missing or reused portrait ID"
    assert run(base).returncode==0, "Verified approved story must generate manifest"
    output=root/"publication-manifests/editorial-generator-test.json"
    data=json.loads(output.read_text(encoding="utf-8"))
    assert data["approved_for_reel"] is True and data["automatic_reel"] is True
    assert data["drive_file_id"]==base["drive_file_id"]
    assert data["reel_drive_file_id"]==base["reel_drive_file_id"] and data["reel_image_verified"] is True
    assert run(base).returncode!=0, "Must not overwrite existing manifest"
print("PASS: editorial Reel manifest generator safety and output tests")
