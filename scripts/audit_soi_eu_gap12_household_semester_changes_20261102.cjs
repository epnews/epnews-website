'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const d=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json','utf8'));
const old=JSON.parse(fs.readFileSync(d.sourceFiles[0],'utf8'));
const recent=JSON.parse(fs.readFileSync(d.sourceFiles[1],'utf8'));
assert.equal(d.pairs.length,11);const seen=new Set();
for(const p of d.pairs){const k=p.geo+'|'+p.commodity;assert(!seen.has(k));seen.add(k);const x=old.observations.find(z=>z.geo===p.geo&&z.commodity===p.commodity&&z.consumer==='household');const y=recent.observations.find(z=>z.geo===p.geo&&z.commodity===p.commodity&&z.consumer==='household'&&z.period==='2026-S1');assert(x&&y);
if(p.priorStartEUR100kWh!==undefined){assert.equal(p.priorStartEUR100kWh,x.value);assert(p.startSource.startsWith('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/'));assert.notEqual(p.startEUR100kWh,x.value)}else assert.equal(p.startEUR100kWh,x.value);
assert.equal(p.endEUR100kWh,y.value);assert(Math.abs(p.nominalChangePercent-100*(p.endEUR100kWh/p.startEUR100kWh-1))<0.00051);
if(p.geo==='MT'&&p.commodity==='electricity')assert.equal(p.endSourceStatus,'p');}
assert.equal(d.gapClosed,false);assert.equal(d.scoreAuthorized,false);assert.equal(d.auditCompleted,20);
console.log('11 national household semester changes audited with source-revision provenance and Malta provisional status');
