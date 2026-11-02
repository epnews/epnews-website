const fs = require('node:fs');
const assert = require('node:assert/strict');
const d = JSON.parse(fs.readFileSync('data/soi-next-consolidated-verification-staging-20261102.json','utf8'));
const a=d.verifiedCorrections;
assert.ok(a.length>=10 && a.length<=25,'consolidated evidence batch required');
assert.equal(new Set(a.map(x=>x.id)).size,a.length,'duplicate evidence IDs');
for(const x of a){assert.ok(x.id && (x.source || (Array.isArray(x.sources)&&x.sources.length)), 'source required');assert.ok(x.limitation || (x.limitations&&x.limitations.length),'limitation required');assert.notEqual(x.gatePromotion,true,'no unearned audit gate');}
assert.equal(d.scoring.auditCompleted,20);
assert.equal(d.scoring.auditTotal,30);
assert.equal(d.scoring.gatePromotion,false);
assert.equal(d.scoring.influenceScores,null);
const ids=new Set(a.map(x=>x.id));
assert.ok(ids.has('EU-ERA-2025-FINAL-DISBURSEMENT'));
assert.ok(ids.has('EU-ERA-2025-COMBINED-G7-PAID'));
assert.ok(ids.has('CHINA-WHOOSH-THREE-YEAR-RIDERS'));
console.log('SOI consolidated verification staging audit passed:',a.length,'records; no score or gate changes');
