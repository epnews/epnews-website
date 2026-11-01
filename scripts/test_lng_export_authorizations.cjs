const assert=require('node:assert/strict');
const fs=require('node:fs');
const s=fs.readFileSync('docs/us-lng-post-disruption-export-authorizations.md','utf8');
assert.equal(4.6+0.8,5.3999999999999995);
assert.equal(35-27,8);
for(const phrase of ['March 2026','Early April 2026','13%','22%','Regulatory permission','not actual added cargoes','Command Meter readiness 53%','net national benefit null'])assert.ok(s.includes(phrase),phrase);
console.log('Post-disruption authorization evidence guardrails passed');
