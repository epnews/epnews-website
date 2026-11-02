'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const d=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-price-contrasts-2025s2-20261102.json','utf8'));
const historical=JSON.parse(fs.readFileSync(d.sourceFile,'utf8'));
const official=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json','utf8'));
assert.equal(d.comparisons.length,6);assert.equal(d.gapClosed,false);assert.equal(d.auditCompleted,20);assert.equal(d.scoreAuthorized,false);
const get=(geo,commodity,consumer)=>{const current=official.pairs.find(x=>x.geo===geo&&x.commodity===commodity&&x.consumer===consumer);if(current)return current.startEUR100kWh;const older=historical.observations.find(x=>x.geo===geo&&x.commodity===commodity&&x.consumer===consumer);assert(older,'Missing source '+geo+' '+commodity);return older.value};
for(const c of d.comparisons){const hi=get(c.higher,c.commodity,c.consumer),lo=get(c.lower,c.commodity,c.consumer);assert(hi>lo);assert.equal(c.higherPrice,hi);assert.equal(c.lowerPrice,lo);assert(Math.abs(c.ratio-hi/lo)<0.00051);assert(Math.abs(c.differenceEUR100kWh-(hi-lo))<0.005)}
for(const p of d.pairs){assert.equal(p.householdElectricity,get(p.geo,'electricity','household'));assert.equal(p.householdGas,get(p.geo,'natural gas','household'))}
console.log('Six country contrasts audited against revised official price panel with historical fallback');
