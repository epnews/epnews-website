// EP News homepage placement. Newly published stories enter the headline wire automatically.
// Editor picks remain manually curated. Do not manually insert article IDs into wire.
const EDITORIAL = {
  editorPicks: ["trump-stephen-miller-chief-of-staff-20261106","iran-invasion-logistics-20261106","panama-ports-20261105","trump-democrats-common-ground-20261106"],
  analysis: [],
  wire: [...new Set(STORIES
    .filter(story => story.status === 'published' && story.id !== 'power')
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .map(story => story.id))]
};
