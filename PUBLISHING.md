# EP News publishing guide

The homepage design stays in `index.html` and `styles.css`. Article records are now maintained separately in `content/stories.js`; application behavior stays in `app.js`.

## Publishing a new article

1. Create or update an entry in the `STORIES` array in `content/stories.js`. Fields supported by the current site: `id` (unique short URL slug), `category` (politics, world, economy, investigations), `type` (e.g., REPORTING, ANALYSIS, INVESTIGATIVE SERIES), `title`, `deck`, `body` (array of plain-text paragraphs). `categoryLabel` is optional.
2. For a publishable article, add verified sourcing to the prose (the current article template doesn't support a dedicated links/sources block yet). A future upgrade should add `publishedAt`, `updatedAt`, `sources`, `image`, and author metadata with suitable rendering.
3. Ensure an article has a unique `id`, has been fact-checked, and contains no private material. The `body` paragraphs render as escaped text, not HTML.
4. Open a branch and pull request into `main`. Review the Cloudflare preview deployment. Only merge after editorial approval.
5. Once merged, Cloudflare Pages deploys `main` automatically.

## Front-page controls

The layout has several hardcoded editorial slots in `app.js` (editor's picks and featured sections). Adding an article to `STORIES` alone does **not** guarantee it appears in all homepage features. We should move those selections into a second content configuration in a follow-up upgrade, after verifying this migration.

## Editorial safeguards

All existing records are demonstration content. Keep the DEMO banner until actual verified reporting replaces them. Never present sample stories as current news; clearly distinguish news, analysis, and research in progress.

## Test locally

Open `index.html` in a browser, check navigation, article links, search, and responsive layout. The content file must remain at `content/stories.js` so the relative script path resolves. No build command or paid hosting is required.
