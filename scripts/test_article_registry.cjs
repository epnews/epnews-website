// EP News: fail a PR if article registration or the existing news feed breaks.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1].split('?')[0]);
const context = vm.createContext({});
for (const file of scripts.filter(s => s.startsWith('content/'))) {
  assert.ok(fs.existsSync(file), 'Missing script: ' + file);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename:file});
}
const result = vm.runInContext('({ stories: STORIES, editorial: EDITORIAL })', context);
const ids = result.stories.map(s => s.id);
assert.equal(new Set(ids).size, ids.length, 'Duplicate article IDs');
const qatar = result.stories.find(s => s.id === 'qatar-iran-peace-proposal-2026');
assert.ok(qatar, 'Qatar article missing from STORIES registry');
assert.equal(qatar.category, 'world');
assert.equal(qatar.status, 'published');
assert.ok(qatar.body.length > 0, 'Qatar article body missing');
assert.ok(fs.existsSync(qatar.image.src), 'Qatar image missing');
for (const id of result.editorial.wire) {
  assert.ok(ids.includes(id), 'Headline wire references missing story: ' + id);
}
for (const id of ['us-canada-tariff-talks-2026','venezuela-oil-corpus-christi-2026','fec-filing-outage-2026','comey-criminal-information-2026']) {
  assert.ok(ids.includes(id), 'Existing story disappeared: ' + id);
}

// Every newly published report must be discoverable from the homepage.
// Older legacy/demo content predating this policy is grandfathered in.
const homepageIds = new Set([
  ...result.editorial.wire,
  ...result.editorial.editorPicks,
  ...result.editorial.analysis,
  result.editorial.lead || 'power'
]);
for (const story of result.stories) {
  if (story.status === 'published' && story.publishedAt >= '2026-10-28') {
    assert.ok(homepageIds.has(story.id),
      'Published article missing from homepage editorial placement: ' + story.id +
      '. Add it to EDITORIAL.wire, editorPicks, analysis, or lead.');
  }
}
assert.ok(homepageIds.has('us-treasury-debt-buyback-october-2026'),
  'Treasury buyback article missing from homepage placement');

assert.ok(html.includes('src="app.js"'), 'Application script missing');
console.log('PASS: Qatar + '+result.stories.length+' total stories; '+result.editorial.wire.length+' headline wire IDs; legacy articles retained.');
