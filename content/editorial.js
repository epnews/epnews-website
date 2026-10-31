// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ['bukele-haiti-reinforcements-2026','us-treasury-debt-buyback-october-2026','us-canada-tariff-talks-2026','qatar-iran-peace-proposal-2026'],
  analysis: [],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
