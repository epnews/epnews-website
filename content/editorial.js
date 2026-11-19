// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated and must not duplicate Chaos featured investigations. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ["south-korea-us-defense-china-trade-20261118","iran-oil-blockade-20261118","trump-philippines-trade-20261118","philippines-china-australia-defense-20261117"],
  analysis: [],
  chaosUpdates: ["china-open-trade-rare-earths-20261118","five-global-powers-three-seats-20261118","us-russian-uranium-enrichment-20261117","india-lpg-saudi-aramco-20261117","russia-oil-windfall-20261116","ai-chip-contradiction-20261116","carrier-contradiction-20261116","venezuela-oil-custody-20261115","europe-russian-supply-chain-20261115"],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
