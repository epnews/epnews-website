#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),cp=require('node:child_process'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const a=JSON.parse(cp.execFileSync(process.execPath,['scripts/soi_research_batch_engine.cjs'],{cwd:root,encoding:'utf8'}));
const b=JSON.parse(cp.execFileSync(process.execPath,['scripts/soi_research_batch_engine.cjs'],{cwd:root,encoding:'utf8'}));
assert.deepEqual(a,b,'Research batch must be deterministic');
assert.equal(a.counts.meterSlots,20);
assert.equal(a.counts.researchCases,12);
assert.equal(a.counts.total,a.queue.length);
assert.equal(a.selectedBatch.length,Math.min(a.batchSize,a.queue.length));
assert.equal(a.scoreChangesAuthorized,false);
assert.equal(a.needleChangesAuthorized,false);
assert.equal(a.sourceEvidenceAcquired,false);
assert(a.queue.slice(0,a.batchSize).every(x=>x.priority>=a.queue[a.batchSize]?.priority||a.queue.length<=a.batchSize));
assert.equal(new Set(a.queue.map(x=>x.id)).size,a.queue.length);
assert(a.queue.filter(x=>x.kind==='meter-slot'&&!x.scored).every(x=>x.activation==='blocked-until-scoring-gates-met'));
console.log('SOI research batch engine: deterministic, deduplicated, 20-slot audit, no-score safety PASS');
