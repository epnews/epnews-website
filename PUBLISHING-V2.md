# EP News publishing workflow — version 2

## Write or update articles
Edit `content/stories.js`: each item needs a unique `id`, `category`, `type`, `title`, `deck`, and `body` array of paragraphs.

Optional fields: `author`, `publishedAt`, `updatedAt` (YYYY-MM-DD), `status` (`draft` or `published`), and `sources: [{label, url}]`. Example source URL: `https://example.org/document`. Date and source metadata appear on article pages. Never mark unverified material as published.

## Homepage placement
Edit `content/editorial.js`. Add the article's id at the beginning of `wire` to put it at the top of the headline wire. `editorPicks` controls the editor's desk; `analysis` controls analysis recommendations. All referenced ids must exist. The large lead investigation hero remains fixed in `index.html` for now.

## Editorial approval
1. Create a feature branch and add the complete sourced story.
2. Open a draft PR against `main`; test Cloudflare preview, navigation, search, citations, and mobile layout.
3. Review fact-checking, attribution, image permissions, and links; change `status` to `published` only on approval.
4. Merge after approval to deploy via Cloudflare Pages.

**Privacy:** The repository and preview branches are public. Keep unpublished sensitive investigations and personal data elsewhere.

**Limitations:** Existing demo headlines and banner remain. There is no working newsletter, database, or image upload system yet. The homepage hero cannot be switched through editorial.js in this version.
