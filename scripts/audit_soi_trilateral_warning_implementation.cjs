'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/soi-trilateral-warning-implementation-20261102.json'),'utf8'));
assert.equal(d.caseId,'us-japan-korea');
assert.equal(d.scoringAuthorized,false);
assert.equal(d.auditGateCompleted,false);
assert.equal(d.gateProgressUnchanged,true);
assert.equal(d.influenceScore,null);
assert.equal(d.causalAttribution,'not_established');
assert.ok(d.observations.length>=6);
assert.ok(d.observations.some(x=>x.type==='pre_activation_exercise'));
assert.ok(d.observations.some(x=>x.type==='operational_activation'));
assert.ok(d.observations.some(x=>x.status==='planned_not_confirmed'));
for(const x of d.observations){assert.match(x.id,/^[a-z0-9-]+$/);assert.match(x.date,/^20\d{2}-\d{2}-\d{2}$/);assert.match(x.source,/^https:\/\//);assert.ok(x.measurement.length>20);}
assert.ok(d.comparison.missing.length>=3);
console.log('SOI trilateral implementation evidence audit passed; no score or gate promotion');
