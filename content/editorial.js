// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ["houthis-bab-el-mandeb-20261115","venezuela-oil-custody-20261115","spacex-starship-orbital-recovery-20261115","diesel-global-fuel-crisis-20261115"],
  analysis: [],
  chaosUpdates: ["venezuela-oil-custody-20261115","europe-russian-supply-chain-20261115","russian-diesel-exports-20261115","houthis-bab-el-mandeb-20261115","canada-philippines-trade-20261115"],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
