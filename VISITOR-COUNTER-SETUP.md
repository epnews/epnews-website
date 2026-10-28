# EP News website visitor counter

A visible **SITE VISITS** footer counter, backed by **Cloudflare D1**. It records one visit per browser-tab session through sessionStorage, not distinct people. It starts at zero upon activation and cannot reconstruct historic visits. It does not store IP addresses, visitor identities, or use tracking cookies.

## Required one-time Cloudflare dashboard setup

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/). Create a **D1 database** called `ep-news-visits` under Storage & databases > D1 (dashboard wording may vary).
2. Open **Workers & Pages > your EP News Pages project > Settings > Bindings**.
3. Add a **D1 database binding** to the *Production* environment. Set its variable name **exactly** `EP_VISITS_DB` and choose `ep-news-visits`.
4. Save, and **redeploy** the latest production deployment. Cloudflare requires a redeploy after adding a binding.
5. Open the website in a fresh browser tab. The footer shows **SITE VISITS** and an integer if the binding works. If the database is unconfigured or unavailable, the site shows a dash rather than a fabricated number.

The `functions/api/visits.js` Pages Function automatically creates the minimal database table at its first request. No manual SQL needed.

## Semantics and limitations

- A **visit** is counted once per browser tab session. Refreshing or navigating within that tab does not increment it again. Opening a new tab or browser session may increment it.
- This is **not a unique visitor count** and not an audited analytics metric. Bots and scripted POST requests can inflate it. It includes all visits after activation, not historical traffic.
- The public endpoint supports GET to read and POST to increment. For more robust bot-resistance or accurate unique visitors, use Cloudflare Web Analytics (private reporting) alongside this simple public counter.
- The counter can begin at zero; do not manufacture historical totals. Preview deployments should use a *different D1 database binding* or no binding to avoid polluting production totals.
- If Cloudflare deployment uses an output directory, confirm that the top-level `functions/` directory is detected by Pages (Git integration is expected).

## Testing

- GET `https://epnews.pages.dev/api/visits` returns `{"total":0,"label":"visits since activation"}` after binding.
- Refreshing the same tab keeps the count unchanged. A fresh tab counts a new session.
- The footer hides numeric claims if backend is unavailable, showing `—`.
