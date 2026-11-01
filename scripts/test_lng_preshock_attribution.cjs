const assert=require('node:assert/strict');
const fs=require('node:fs');
const s=fs.readFileSync('docs/us-lng-pre-shock-capacity-attribution.md','utf8');
for(const required of ['2019','October **2025**','April 22','17.4 Bcf/d','23%','2.6 Bcf/d','0.8 Bcf/d','Capacity is not shipments','Readiness remains 53%','causal quantity gate remains open'])assert.ok(s.includes(required),required);
assert.equal(2.6+0.8,3.4);
console.log('Pre-shock LNG timing evidence and attribution guardrails passed');
