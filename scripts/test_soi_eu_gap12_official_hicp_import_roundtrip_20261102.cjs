'use strict';
/* Offline integration test: full importer with 120 synthetic monthly observations.
 * Validates generated archival dataset and rejects tampered inputs.
 */
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const panel=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json','utf8'));
const prov=JSON.parse(fs.readFileSync('data/soi-eu-gap12-national-hicp-successful-run-provenance-20261102.json','utf8'));
const geos=[...new Set(panel.pairs.map(x=>x.geo))].sort();
const months=Array.from({length:12},(_,i)=>{const n=i+6;return String(2025+Math.floor(n/12))+'-'+String(n%12+1).padStart(2,'0')});
const indices=Object.fromEntries(geos.map((geo,i)=>{const observations=months.map((month,j)=>({month,index:100+i+j/10}));const a=observations.slice(0,6).reduce((s,x)=>s+x.index,0)/6,b=observations.slice(6).reduce((s,x)=>s+x.index,0)/6;return [geo,{observations,mean2025S2:a,mean2026S1:b,deflator2026S1To2025S2:a/b}]}));
const comparisons=panel.pairs.map(x=>({...x,realEndIn2025S2EUR100kWh:Number((x.endEUR100kWh*indices[x.geo].deflator2026S1To2025S2).toFixed(5)),realChangePercent:Number((100*(x.endEUR100kWh/x.startEUR100kWh*indices[x.geo].deflator2026S1To2025S2-1)).toFixed(3))}));
const data={targetGap:'SOI-GAP-12',gapClosed:false,scoreAuthorized:false,auditCompleted:20,sourcePanel:'data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json',sourceUrl:'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?coicop18=TOTAL&unit=I25',geos,indices,comparisons};
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'soi-hicp-test-'));const input=path.join(dir,'input.json'),target='data/soi-eu-gap12-national-hicp-120-monthly-values-11-real-comparisons-20261102.json';const prior=fs.existsSync(target)?fs.readFileSync(target):null;
function run(){return cp.spawnSync(process.execPath,['scripts/audit_soi_eu_gap12_import_official_hicp_artifact_20261102.cjs',input],{encoding:'utf8'})}
try{fs.writeFileSync(input,JSON.stringify(data));let p=run();assert.equal(p.status,0,p.stderr);const output=JSON.parse(fs.readFileSync(target,'utf8'));assert.equal(output.sourceArtifactId,prov.artifact.id);assert.equal(output.upstreamNominalPricesIndependentlyVerified,false);assert.equal(output.geos.length,10);assert.equal(output.comparisons.length,11);assert.equal(Object.values(output.indices).reduce((s,x)=>s+x.observations.length,0),120);
data.indices[geos[0]].observations[0].index=0;fs.writeFileSync(input,JSON.stringify(data));p=run();assert.notEqual(p.status,0,'Zero HICP must be rejected');
console.log('Importer integration: full 120-observation roundtrip, 11 calculations, provenance, tamper rejection PASS');
}finally{if(prior!==null)fs.writeFileSync(target,prior);else if(fs.existsSync(target))fs.unlinkSync(target);fs.rmSync(dir,{recursive:true,force:true})}
