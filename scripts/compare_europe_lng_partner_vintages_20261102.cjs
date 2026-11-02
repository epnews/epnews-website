'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(process.argv.length<4)throw Error('Usage: node scripts/compare_europe_lng_partner_vintages_20261102.cjs <older.json> <newer.json> [report.json]');
const a=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),b=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
for(const d of [a,b]){assert.equal(d.dataset,'nrg_ti_gasm');assert.equal(d.siec,'G3200');assert.equal(d.unit,'MIO_M3')}
const out={comparison:'Official Eurostat capture-vintage changes, not physical cargo origins',changes:[],missingSeries:[],warnings:[],scoreAuthorized:false};
for(const geo of ['EU27_2020','FR','DE','PL']){
 const p=a.geographies[geo]?.partners,q=b.geographies[geo]?.partners;assert(p&&q,'Reporter absent: '+geo);
 for(const code of new Set([...Object.keys(p),...Object.keys(q)]))for(const year of ['2025','2026']){
  const old=p[code]?.h1_bcm?.[year],now=q[code]?.h1_bcm?.[year];
  if(!Number.isFinite(old)||!Number.isFinite(now)){
   if(old!==now)out.missingSeries.push({geo,code,year,old:old??null,new:now??null});continue;
  }
  const delta=now-old;
  if(Math.abs(delta)>1e-9)out.changes.push({geo,code,year,oldBcm:old,newBcm:now,deltaBcm:delta});
 }
}
out.changes.sort((x,y)=>Math.abs(y.deltaBcm)-Math.abs(x.deltaBcm));
const summary={changedCells:out.changes.length,missingnessChanges:out.missingSeries.length,largestChanges:out.changes.slice(0,20)};
out.summary=summary;
if(process.argv[4])fs.writeFileSync(process.argv[4],JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
