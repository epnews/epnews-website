const assert=require('node:assert/strict');
const d=require('../data/ei-2026-energy-supply-2024-2025.json');
assert.equal(d.metric,'total_energy_supply');
assert.equal(d.not_net_import_dependence,true);
assert.equal(d.unit,'EJ');
assert.deepEqual(Object.keys(d.actors).sort(),['china','eu','india','russia','us']);
for(const [id,r] of Object.entries(d.actors)){assert(Number.isInteger(r.row)&&r.row>0,id);assert(r.year2024>0&&r.year2025>0,id);}
assert(Math.abs(d.actors.eu.year2025-52.19255687721864)<1e-10);
console.log('EI 2026 source input checks passed; no dependence scores published');
