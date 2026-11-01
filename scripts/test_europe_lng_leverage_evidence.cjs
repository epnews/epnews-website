const assert=require('node:assert/strict');const fs=require('node:fs');
const a=fs.readFileSync('docs/europe-lng-dependency-methane-leverage-audit.md','utf8');
const b=fs.readFileSync('docs/europe-lng-source-provenance-ledger.md','utf8');
assert.equal(100-57-16,27);assert.equal(100-62-19,19);
assert.equal(62-57,5);assert.equal(19-16,3);assert.equal(62+19,81);
for(const p of ['not legally binding','does **not** amend','GREEN','YELLOW','RED/UNPROVEN','not directly comparable','Readiness remains 53%'])assert.ok(a.includes(p),p);
for(const p of ['one underlying import series','No numeric evidence imported','raw Bruegel reproduction','influence null'])assert.ok(b.includes(p),p);
console.log('Europe import-share arithmetic and non-causation provenance checks passed');
