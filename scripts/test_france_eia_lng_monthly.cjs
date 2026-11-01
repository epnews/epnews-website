#!/usr/bin/env node
const assert=require('node:assert/strict');
const cf=0.000028316846592;
const y2025=[49610,64434,70290,52503,52021,27282];
const y2026=[45261,32701,61535,46541,18144,10869];
const sum=a=>a.reduce((s,x)=>s+x,0);
assert.equal(sum(y2025),316140);
assert.equal(sum(y2026),215051);
assert.ok(Math.abs(sum(y2025)*cf-8.95208788159488)<1e-10);
assert.ok(Math.abs(sum(y2026)*cf-6.0895661764561915)<1e-10);
const doc=require('node:fs').readFileSync('docs/france-eia-eurostat-lng-matched-monthly-discrepancy.md','utf8');
for(const t of ['EIA','Eurostat','8.9520878816','6.0895661765','NOT the fraction','53%'])assert.ok(doc.includes(t),t);
console.log('France matched-month EIA/Eurostat assertions passed');
