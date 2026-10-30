# EP News automatic Reel handoff

When an EP News story is fact-checked, its graphic is uploaded to the public Google Drive folder, and the image is independently verified, create one JSON file in `reel-packages/` using `reel-packages/example.json` as a starting point.

Supply `drive_file_id`, `reel_title`, `reel_description` (~100 words, 3–5 hashtags), `music_category`, `music_track` (optional), `duration` and `custom_seconds` if applicable. After editorial approval set `approved: true` and `automatic_reel: true`. Merge the package into main. A GitHub push trigger then selects exactly one newly added/modified opted-in package, validates it, downloads the Drive image, generates an MP4 and stores an artifact. Automatic runs use preview mode; no public publishing or Meta draft upload occurs. For multiple stories, merge one package per PR or trigger manual runs with package_path.

This does NOT automatically extract article text from the EP News website or from the Story Multiplier. The editorial/publishing workflow must write the JSON package as part of its existing approval process. Soundtrack selection remains reference metadata only until appropriate audio rights and files are available. A failed validation or Drive download prevents video generation.
