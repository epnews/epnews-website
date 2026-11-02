'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'lng-partner-'));
const src='scripts/audit_europe_lng_full_partner_residual_20261102.cjs';
const make=(us,other)=>({source:'official',dataset:'nrg_ti_gasm',siec:'G3200',geographies:{EU27_2020:{partners:{TOTAL:{h1_bcm:{2025:10,2026:10}},US:{h1_bcm:{2025:us,2026:us}},NSP:{h1_bcm:{2025:2,2026:2}},DZ:{h1_bcm:{2025:other,2026:other}},XX:{h1_bcm:{2025:null,2026:null}}}}}}});
try{
 const file=path.join(tmp,'input.json'),out=path.join(tmp,'output.json');
 fs.writeFileSync(file,JSON.stringify(make(3,5)));
 cp.execFileSync(process.execPath,[src,file,out]);
 const result=JSON.parse(fs.readFileSync(out,'utf8'));
 assert.equal(result.periods.length,2);
 for(const p of result.periods){assert.equal(p.unreconciledCellDifferenceBcm,0);assert.equal(p.otherAttributedBcm,5);assert.equal(p.incompletePartnerCount,1);assert.deepEqual(p.incompletePartnerCodes,['XX']);}
 fs.writeFileSync(file,JSON.stringify(make(3,4)));
 const bad=cp.spawnSync(process.execPath,[src,file,out],{encoding:'utf8'});
 assert.notEqual(bad.status,0,'A materially incomplete sum must fail');
 console.log('Full-partner audit positive and negative regression tests passed');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
