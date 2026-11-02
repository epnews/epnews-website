'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');
const d=JSON.parse(fs.readFileSync('data/soi-russia-dprk-deployment-evidence-20261102.json','utf8'));
assert.equal(d.policy.influenceScore,null);assert.equal(d.policy.auditGatePromotion,false);
assert.ok(d.observations.length>=7);
for(const o of d.observations){assert.ok(!Number.isNaN(Date.parse(o.date)));assert.ok(o.source.startsWith('https://'));if(o.value!==undefined)assert.ok(o.value>0);}
assert.ok(d.limitations.some(x=>x.includes('predate treaty entry')));
console.log('Russia DPRK deployment evidence audit passed');
