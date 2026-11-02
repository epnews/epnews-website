'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_monthly_partner_reconciliation_20261102.cjs <official.json> [out.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert.equal(d.dataset,'nrg_ti_gasm');assert.equal(d.unit,'MIO_M3');assert.equal(d.siec,'G3200');
const result={source:d.source,units:'million m3',months:[],warnings:[],scoreAuthorized:false};
for(const [geo,g] of Object.entries(d.geographies)){
 const p=g.partners;assert(p.TOTAL,'TOTAL missing '+geo);
 for(const month of g.months){
  const total=p.TOTAL.months_million_m3[month];if(!Number.isFinite(total)){result.warnings.push(geo+' '+month+' total missing');continue;}
  const entries=Object.entries(p).filter(([code,v])=>code!=='TOTAL').map(([code,v])=>({code,value:v.months_million_m3[month]}));
  const positive=entries.filter(x=>Number.isFinite(x.value)&&x.value>0).sort((a,b)=>b.value-a.value);
  const sum=entries.reduce((s,x)=>s+(Number.isFinite(x.value)?x.value:0),0),difference=total-sum;
  const us=p.US?.months_million_m3[month],nsp=p.NSP?.months_million_m3[month];
  const record={geo,month,total,sumPartners:sum,difference,usLabeled:Number.isFinite(us)?us:null,nspLabeled:Number.isFinite(nsp)?nsp:null,positivePartnerCount:positive.length,missingPartnerCount:entries.filter(x=>x.value===null||x.value===undefined).length,largestPartners:positive.slice(0,6)};
  result.months.push(record);
  assert(Math.abs(difference)<=10,'Material monthly partner sum discrepancy '+geo+' '+month+': '+difference);
 }
}
result.summary={monthReporterObservations:result.months.length,maxAbsDifference:Math.max(...result.months.map(x=>Math.abs(x.difference))),warningCount:result.warnings.length};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary));
