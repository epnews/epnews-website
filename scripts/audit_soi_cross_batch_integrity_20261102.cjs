const fs=require('node:fs');const assert=require('node:assert/strict');
const base=JSON.parse(fs.readFileSync('data/soi-five-sphere-verified-outcomes-batch15-20261102.json','utf8'));
const follow=JSON.parse(fs.readFileSync('data/soi-next-consolidated-verification-staging-20261102.json','utf8'));
const b=new Map(base.observations.map(x=>[x.id,x]));const f=new Map(follow.verifiedCorrections.map(x=>[x.id,x]));
const checks=[
['EU-ERA-2025-FINAL-DISBURSEMENT','EU-ERA-2025-LOANS-PAID','supersedes'],
['US-DFC-ENERGY-REPORTING-YEAR-CORRECTION','US-DFC-2025-ENERGY-OUTPUT','reporting-year'],
['US-DFC-TRANSMISSION-REPORTING-YEAR-CORRECTION','US-DFC-2025-GRID-CONSTRUCTION','reporting-year-uncertain'],
['CHINA-LAOS-2025-CROSSBORDER-FREIGHT-SOURCE-DEPENDENCE','CHINA-LAOS-2025-CROSSBORDER-FREIGHT','source-dependence'],
['EU-ERA-2025-COMBINED-G7-PAID','EU-ERA-2025-FINAL-DISBURSEMENT','derived-overlap'],
['CHINA-WHOOSH-THREE-YEAR-RIDERS','CHINA-INDONESIA-WHOOSH-RIDERS','cumulative-overlap'],
['CHINA-WHOOSH-2026-PARTIAL-YEAR-RIDERS','CHINA-WHOOSH-THREE-YEAR-RIDERS','period-overlap'],
['CHINA-WHOOSH-FOREIGN-RIDERS-CUMULATIVE','CHINA-WHOOSH-THREE-YEAR-RIDERS','subset'],
['US-DFC-2024-ENERGY-JOBS-WOMEN-SHARE','US-DFC-2024-ENERGY-JOBS-SUPPORTED','subset'],
['EU-UKRAINE-FACILITY-2025-NOVEMBER','EU-ERA-2025-FINAL-DISBURSEMENT','distinct-program'],
['EU-ERA-OTHER-G7-2025-PAID','EU-ERA-2025-FINAL-DISBURSEMENT','distinct-donor'],
['CHINA-WHOOSH-DAILY-TRAIN-TRIPS-2026','CHINA-WHOOSH-THREE-YEAR-RIDERS','supply-not-demand']];
for(const [id,parent,kind] of checks){assert.ok(f.has(id),'missing '+id);assert.ok(f.has(parent)||b.has(parent),'missing parent '+parent);assert.ok(kind);}
assert.equal(follow.scoring.auditCompleted,20);assert.equal(follow.scoring.auditTotal,30);assert.equal(follow.scoring.gatePromotion,false);
assert.equal(new Set([...b.keys(),...f.keys()]).size,b.size+f.size,'duplicate IDs across batches');
console.log('SOI cross-batch integrity: '+checks.length+' linkage checks passed; no audit promotion');
