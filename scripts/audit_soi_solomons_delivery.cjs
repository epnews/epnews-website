'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const d=JSON.parse(fs.readFileSync('data/soi-solomons-delivery-ledger-20261102.json','utf8'));
assert.equal(d.policy.influenceScore,null);
assert.equal(d.policy.auditGatePromotion,false);
assert.ok(d.observations.length>=7);
for(const x of d.observations){assert.ok(Number.isFinite(Date.parse(x.date)));assert.ok(Number.isFinite(x.value)&&x.value>0);assert.ok(x.source.startsWith('https://solomons.gov.sb/'));}
assert.ok(d.methodology.some(x=>x.includes('do not sum')));
console.log('SOI Solomon Islands delivery ledger: passed');
