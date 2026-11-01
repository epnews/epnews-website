const assert=require('node:assert/strict');
const fs=require('node:fs');
const s=fs.readFileSync('docs/us-lng-2026-forecast-vintage-shock-audit.md','utf8');
assert.ok(Math.abs((17.0-16.4)-0.6)<1e-9);
assert.ok(Math.abs(100*(17-16.4)/16.4-3.6585365853658534)<1e-8);
assert.equal(Math.round(0.6*365),219);
for(const p of ['forecast revision','not** a measurement','same calendar year','53% readiness remains','causal shock-attribution gates open','periods differ'])assert.ok(s.includes(p),p);
console.log('LNG forecast-vintage audit assertions passed');
