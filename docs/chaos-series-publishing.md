# Who Benefits From the Chaos? — publishing guide

The permanent hub is `/#series/chaos`. The existing first report retains its URL `/#article/power`; do not remove or rename that ID.

## Publish a new installment
1. Create a new story in `content/` using a unique stable `id`, `category: 'investigations'`, `seriesId: 'chaos'`, `status: 'published'`, `publishedAt: 'YYYY-MM-DD'`, headline, deck, body or structured sections, image with credit, and sources.
2. Load the new content script in `index.html` before `content/editorial.js` and `app.js`. The story should be added with `STORIES.push({...})`.
3. Each new report automatically appears in the series hub, newest publication date first. The latest non-original report is featured. The original report remains in the archive.
4. Each article keeps its own permanent `/#article/<id>` link. Do not replace the earlier report with a new one.
5. For corrections or substantive revisions, edit the affected report, set `updatedAt`, and add a visible change note in its body or sections.
6. Check the hub, the original article link, the new article link, other news categories, and the headline wire before merging. Validate `app.js` JavaScript syntax.

No new article is included in this infrastructure change; future investigations require independently verified reporting and editorial approval.
