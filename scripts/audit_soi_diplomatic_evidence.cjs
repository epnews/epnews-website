const fs=require('node:fs'); const assert=require('node:assert/strict');
const d=JSON.parse(fs.readFileSync('data/soi-diplomatic-evidence-20261101.json','utf8'));
const gates=JSON.parse(fs.readFileSync('data/command-meter-cross-country-research-gates.json','utf8'));
assert.equal(d.scoring.influenceScore,null); assert.equal(gates.scorePolicy.geopoliticalInfluenceScore,null);
assert.equal(new Set(d.records.map(r=>r.id)).size,d.records.length);
for(const r of d.records){assert.equal(r.influenceScore,null);assert.ok(r.sources.length>=1);assert.ok(r.gaps.length>=1);assert.ok(r.stage);}
for(const [country,ids] of Object.entries(d.countryEvidence)){for(const id of ids){const r=d.records.find(x=>x.id===id);assert.ok(r);assert.ok(r.actors.includes(country));}}
assert.deepEqual(d.countryEvidence.China,[]); assert.deepEqual(d.countryEvidence.Russia,[]); assert.deepEqual(d.countryEvidence.Europe,[]);
const quad=d.records.find(r=>r.id.includes('QUAD'));assert.equal(quad.observations[0].disbursedUsd,null);assert.equal(quad.observations[1].disbursedUsd,null);
const missile=d.records.find(r=>r.id.includes('AMRAAM'));assert.equal(missile.observations[0].operational,false);
console.log('SOI diplomatic evidence audit passed');
