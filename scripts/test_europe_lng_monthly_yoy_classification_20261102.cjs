'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-yoy-'));
try{
 const a=path.join(dir,'in.json'),o=path.join(dir,'out.json');
 fs.writeFileSync(a,JSON.stringify({months:[{geo:'FR',month:'2025-01',total:100,usLabeled:20,nspLabeled:10},{geo:'FR',month:'2026-01',total:120,usLabeled:35,nspLabeled:5},{geo:'DE',month:'2025-02',total:20,usLabeled:null,nspLabeled:20},{geo:'DE',month:'2026-02',total:30,usLabeled:0,nspLabeled:30}]}));
 cp.execFileSync(process.execPath,['scripts/audit_europe_lng_monthly_yoy_classification_20261102.cjs',a,o]);
 const d=JSON.parse(fs.readFileSync(o,'utf8'));assert.equal(d.summary.matchedReporterMonths,2);assert.equal(d.summary.missingLabelPairs,1);
 const fr=d.rows.find(x=>x.geo==='FR');assert.equal(fr.deltaTotal,20);assert.equal(fr.deltaUSLabel,15);assert.equal(fr.deltaNSPLabel,-5);assert.equal(fr.deltaOtherLabels,10);
 const de=d.rows.find(x=>x.geo==='DE');assert.equal(de.deltaUSLabel,null);
 console.log('Matched-month classification tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
