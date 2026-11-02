'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const input=process.argv[2];if(!input)throw Error('Pass official all-partners JSON artifact path');
const d=JSON.parse(fs.readFileSync(input,'utf8'));
const nupi={2025:41,2026:44};
const report={source:d.source,dataset:d.dataset,unit:'bcm',scope:'EU27 official G3200 H1 versus rounded NUPI EEA US LNG',rows:[],qualification:'NSP is not US origin; conditional upper bounds are arithmetic only. NUPI EEA and Eurostat EU27 scopes differ.',scoreAuthorized:false};
for(const year of [2025,2026]){
 const row=d.classification_audit['EU27_2020|'+year];assert(row);
 const us=row.us_labeled_bcm,nsp=row.nsp_bcm,total=row.total_bcm;
 assert(us>=0&&nsp>=0&&total>0&&us+nsp<=total+1e-7);
 const minGap=nupi[year]-0.5-us,maxGap=nupi[year]+0.5-us;
 const residualLower=minGap-nsp;
 const v={year,total,usLabeled:us,nsp,nspPercentOfTotal:100*nsp/total,nupiUsRounded:nupi[year],usDiscrepancyMin:minGap,usDiscrepancyMaxExclusive:maxGap,unexplainedIfAllNspWereUsMin:residualLower,warning:'All-NSP-to-US is a deliberately extreme hypothetical, not an origin estimate.'};
 assert(residualLower>0,'Even maximum NSP allocation should leave a gap');report.rows.push(v);
}
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.rows,null,2));
