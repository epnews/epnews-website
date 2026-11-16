// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ["trump-putin-xi-nuclear-talks-20261116","autonomous-weapons-20261116","ai-chip-contradiction-20261116","carrier-contradiction-20261116"],
  analysis: [],
  chaosUpdates: ["russia-oil-windfall-20261116","ai-chip-contradiction-20261116","carrier-contradiction-20261116","venezuela-oil-custody-20261115","europe-russian-supply-chain-20261115"],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
