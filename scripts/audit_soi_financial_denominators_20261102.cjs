const fs=require('node:fs');const assert=require('node:assert/strict');
const d=JSON.parse(fs.readFileSync('data/soi-financial-denominator-audit-20261102.json','utf8'));
assert.equal(d.measurements.length,12);assert.equal(d.auditUnchanged,'20/30');assert.equal(d.scoreAuthorized,false);assert.equal(d.derivedNotNewSource,true);
for(const m of d.measurements){assert.ok(m.id&&m.interpretation);if(Number.isFinite(m.from)&&Number.isFinite(m.to)){assert.ok(Math.abs((m.to-m.from)-m.delta)<0.001,m.id+' delta');assert.ok(Math.abs((m.to/m.from-1)*100-m.pct)<0.12,m.id+' pct');}}
assert.ok(d.notes.some(x=>x.includes('not directly comparable')));
console.log('SOI denominators: 12 assertions validated; no new source or score');
