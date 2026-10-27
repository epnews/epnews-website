# EP News v2 — editorial website prototype

This is a fully static, zero-build site designed to deploy to Cloudflare Pages.

## Local preview
Open `index.html` in a web browser. The optional Google web fonts require connectivity; fallback fonts are defined.

## Free Cloudflare Pages deployment
Connect your GitHub repository to Cloudflare Pages, choose the repository, leave **Build command** blank, and set output directory to `/` (repository root). `index.html` must be in the repository root. Once deployed, Cloudflare provides a `pages.dev` address.

## Content warning — IMPORTANT
All news items are DEMONSTRATION PLACEHOLDERS rather than substantiated news reports. Replace every item in `app.js` > `STORIES` with independently verified, sourced, edited coverage before publicly launching the editorial feed. Do not remove the demonstration banner while placeholders remain. The abstract art is code-drawn illustration, not documentary photography.

## Privacy
The site makes optional requests to Google Fonts. Public GitHub repositories expose code and revision history. This demo does not collect newsletter emails or visitor analytics. Hosting providers may keep their own service logs. Keep private or unpublished investigations out of your public repository.

## Customization
* Masthead, navigation, and modules: `index.html`
* Colors, typography, design, responsiveness: `styles.css`
* Story data, section routing, article layout, news-wire filtering, search: `app.js`

No paid theme, build tools, external JavaScript libraries, or hosting subscription are required.
