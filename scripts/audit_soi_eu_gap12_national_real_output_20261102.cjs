'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const file='data/soi-eu-gap12-national-real-energy-price-changes-20261102.json';
const d=JSON.parse(fs.readFileSync(file,'utf8'));
assert.equal(d.gapClosed,false);assert.equal(d.scoreAuthorized,false);assert.equal(d.auditCompleted,20);
assert.equal(d.comparisons.length,11);assert.equal(d.geos.length,10);
assert(d.sourceUrl.includes('ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr'));
for(const geo of d.geos){const row=d.indices[geo];assert.equal(row.observations.length,12);assert(row.mean2025S2>0&&row.mean2026S1>0);for(const x of row.observations)assert(x.index>0)}
for(const x of d.comparisons){const f=d.indices[x.geo].deflator2026S1To2025S2;assert(Math.abs(x.realChangePercent-100*(x.endEUR100kWh/x.startEUR100kWh*f-1))<0.00051)}
console.log('Official HICP country panel: '+d.geos.length+' geos, 12 months each, '+d.comparisons.length+' real comparisons verified');
