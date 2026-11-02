'use strict';
/* Import the complete national Eurostat HICP workflow artifact after independent review.
 * Usage: node scripts/audit_soi_eu_gap12_import_official_hicp_artifact_20261102.cjs /path/to/soi-eu-gap12-national-real-energy-price-changes-20261102.json
 * Does not fetch external sources, invent data, or promote the SOI influence score.
 */
const fs=require('node:fs'),assert=require('node:assert/strict');
const input=process.argv[2];if(!input){console.error('Pass extracted JSON from GitHub Actions run 41390176956 artifact 13116843168');process.exit(2)}
const data=JSON.parse(fs.readFileSync(input,'utf8'));
const panel=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json','utf8'));
const prov=JSON.parse(fs.readFileSync('data/soi-eu-gap12-national-hicp-successful-run-provenance-20261102.json','utf8'));
assert.equal(prov.artifact.id,13116843168);
assert.equal(data.targetGap,'SOI-GAP-12');assert.equal(data.gapClosed,false);assert.equal(data.scoreAuthorized,false);assert.equal(data.auditCompleted,20);
assert.equal(data.sourcePanel,'data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json');
assert(data.sourceUrl.startsWith('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?'));
assert(data.sourceUrl.includes('coicop18=TOTAL')&&data.sourceUrl.includes('unit=I25'));
const geos=[...new Set(panel.pairs.map(x=>x.geo))].sort();assert.deepEqual([...data.geos].sort(),geos);assert.equal(geos.length,10);
const months=Array.from({length:12},(_,i)=>{const n=i+6;return String(2025+Math.floor(n/12))+'-'+String(n%12+1).padStart(2,'0')});
for(const geo of geos){const row=data.indices[geo];assert(row&&row.observations.length===12,'Missing monthly series '+geo);assert.deepEqual(row.observations.map(x=>x.month),months);for(const x of row.observations)assert(Number.isFinite(x.index)&&x.index>0);const a=row.observations.slice(0,6).reduce((s,x)=>s+x.index,0)/6,b=row.observations.slice(6).reduce((s,x)=>s+x.index,0)/6;assert(Math.abs(a-row.mean2025S2)<1e-9);assert(Math.abs(b-row.mean2026S1)<1e-9);assert(Math.abs(a/b-row.deflator2026S1To2025S2)<1e-10)}
assert.equal(data.comparisons.length,11);
for(const x of data.comparisons){const p=panel.pairs.find(y=>y.geo===x.geo&&y.commodity===x.commodity);assert(p);assert.equal(x.startEUR100kWh,p.startEUR100kWh);assert.equal(x.endEUR100kWh,p.endEUR100kWh);const f=data.indices[x.geo].deflator2026S1To2025S2;assert(Math.abs(x.realChangePercent-100*(x.endEUR100kWh/x.startEUR100kWh*f-1))<0.00051)}
const target='data/soi-eu-gap12-national-hicp-120-monthly-values-11-real-comparisons-20261102.json';
fs.writeFileSync(target,JSON.stringify({...data,sourceArtifactId:13116843168,sourceRunId:41390176956,sourceArtifactSha256:prov.artifact.sha256,upstreamNominalPricesIndependentlyVerified:false},null,2)+'\n');
console.log('Imported official workflow artifact: 120 country-month indices and 11 computed real price changes into '+target);
