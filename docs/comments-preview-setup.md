# EP News comments — preview-only test build

This branch adds a preview-only comments UI and API. **Do not merge or enable on production yet.**

## Cloudflare preview configuration
1. Create a NEW Cloudflare D1 database for test comments. Do not reuse the production EP_VISITS_DB.
2. Bind it as `EP_COMMENTS_DB` on the **Preview** environment only.
3. Set `EP_COMMENTS_PREVIEW_ENABLED` to `true` on the **Preview** environment only. Never set this in Production.
4. Deploy this branch through Cloudflare Pages preview and open an article URL on the preview hostname.
5. Confirm the production hostname `epnews.pages.dev` never serves the comments API, even if configuration is mistaken.

## Test cases
- Read, post, refresh, reply, and report comments across two different article IDs.
- Verify HTML is escaped and scripts cannot execute.
- Confirm profanity and URL filter rejects matching posts.
- Verify 30-second cooldown on a browser session.
- Verify invalid article IDs, oversized input, and nonexistent reply targets fail.
- Confirm production is unchanged and preview D1 contains only test data.

## IMPORTANT limitations before public launch
- The current profanity filter is a minimal English keyword filter, not comprehensive.
- Cookie cooldown is not sufficient anti-bot protection. Add Cloudflare Turnstile and server-side IP-hash/rate limiting.
- Reports are stored but an authenticated admin moderation dashboard has not yet been built.
- Anonymous display names can be impersonated. Consider verified accounts or clearly labeling unverified names.
- Add retention and privacy policy before launch.
