# Comments preview smoke test

This branch exists solely to trigger a Cloudflare Pages branch preview after PR #871 was merged. Do not merge this PR.

Required Cloudflare **Preview** settings:
- D1 binding `EP_COMMENTS_DB` → separate test database (never production visitor DB)
- Environment variable `EP_COMMENTS_PREVIEW_ENABLED=true`

The API must respond with HTTP 503 on production and before preview configuration. Test the article URL on the preview hostname, then verify comments, replies, filtering and reporting. Production rollout is not approved.
