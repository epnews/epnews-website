# EP News visual publishing standard

Every approved article package should include:
- **Website featured image:** 16:9 landscape image (`image.src`), meaningful alt text (`image.alt`), and credit/license line (`image.credit`).
- **Homepage thumbnail:** Uses the same image automatically in Editor's Desk and, for the selected `EDITORIAL.lead`, in the investigation hero. Where an image is missing, the original illustration/no-image layout remains.
- **Facebook social graphic:** Separate 1080 x 1350 (4:5) for platform sharing and feed-safe typography, managed as an optional `socialGraphic` value in story metadata. It does not appear on the website by default.
- **Permissions:** Use original owned graphics, licensed/permission-cleared images or legitimately reusable photographs with attribution. Do not use AI-made documentary scenes as real photographs. Never copy photographs directly from a news publisher without rights.
- **Editorial approval:** New visuals, titles, placements, source claims and permissions must be reviewed in a GitHub pull request before merge. The current demo articles remain samples, not real reporting.

## Story metadata example

```js
{
  id: 'verified-story-id',
  category: 'investigations',
  type: 'INVESTIGATION',
  status: 'draft',
  title: 'Verified headline',
  deck: 'Short summary',
  image: {
    src: 'assets/images/verified-story-hero.webp',
    alt: 'Accurate description of the actual photograph',
    credit: 'Photo: photographer / licensing source'
  },
  socialGraphic: 'assets/social/verified-story-facebook.webp',
  body: ['Sourced article paragraph'],
  sources: [{label: 'Primary source', url: 'https://example.org/'}]
}
```

Upload the actual images to those paths in GitHub; filenames alone do not create them. For now, the frontend supports `assets/...` and HTTPS image URLs. The `socialGraphic` field is editorial metadata only. The featured image renders on the article page, in Editor's Desk when that article is featured, and as the lead photo when its ID matches `EDITORIAL.lead`. The existing hero text is still manually authored in `index.html`; edit it separately when changing the lead.

For investigation articles, keep clickable inline primary-source references and a Sources & Documents section. For Facebook, keep captions free of long clickable source lists.
