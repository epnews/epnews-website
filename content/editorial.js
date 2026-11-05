// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ['peru-chancay-callao-20261105','iran-radar-base-damage-oct31-2026','ukraine-patriot-sale-oct31-2026','netanyahu-loses-majority-oct30-2026','alaska-election-probe-oct29-2026'],
  analysis: [],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
