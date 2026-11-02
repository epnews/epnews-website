'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_full_partner_residual_20261102.cjs <official-artifact.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
assert.equal(d.dataset,'nrg_ti_gasm');assert.equal(d.siec,'G3200');
const result={source:d.source,artifactRun:'https://github.com/epnews/epnews-website/actions/runs/41398935427',sourceScope:'EU27_2020, G3200, H1, MIO_M3 to bcm',periods:[],scoreAuthorized:false};
for(const year of ['2025','2026']){
 const p=d.geographies.EU27_2020.partners,total=p.TOTAL.h1_bcm[year];
 const cells=Object.entries(p).filter(([code,v])=>code!=='TOTAL'&&Number.isFinite(v.h1_bcm[year])).map(([code,v])=>({code,bcm:v.h1_bcm[year]}));
 const sum=cells.reduce((a,x)=>a+x.bcm,0),gap=total-sum;
 assert(Math.abs(gap)<0.01,'Partner sum does not reconcile within 0.01 bcm');
 const positives=cells.filter(x=>x.bcm>0).sort((a,b)=>b.bcm-a.bcm);
 const us=p.US.h1_bcm[year],nsp=p.NSP.h1_bcm[year];
 const nonUsNonNsp=total-us-nsp;
 result.periods.push({year,totalBcm:total,sumReportedPartnerCellsBcm:sum,unreconciledCellDifferenceBcm:gap,positivePartnerCount:positives.length,largestPartners:positives.slice(0,12),usLabeledBcm:us,nspLabeledBcm:nsp,otherAttributedBcm:nonUsNonNsp,warning:'Other attributed volume includes named non-US origins; it is not missing US origin. Eurostat reporting basis is not equivalent to physical ultimate origin.'});
}
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.periods.map(x=>({year:x.year,partnerDifference:x.unreconciledCellDifferenceBcm,otherAttributed:x.otherAttributedBcm})),null,2));
