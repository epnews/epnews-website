'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-chain-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 const e={loadingDate:'2026-01-01',arrivalDate:'2026-01-12',dischargeDate:'2026-01-13',dischargeVolume:'100',volumeUnit:'m3 LNG',vesselIMO:'1234567'};
 fs.writeFileSync(a,JSON.stringify({items:[{id:'good',evidence:e},{id:'reverse',evidence:{...e,loadingDate:'2026-01-20'}},{id:'missing',evidence:{...e,dischargeVolume:null}},{id:'unit',evidence:{...e,volumeUnit:'unknown'}}]}));
 cp.execFileSync(process.execPath,['scripts/audit_europe_lng_cargo_chain_integrity_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.manualReviewCandidates,1);
 assert(d.items[1].chainAudit.issues.includes('impossible-date-order'));
 assert(d.items[2].chainAudit.issues.includes('invalid-discharge-volume'));
 assert(d.items[3].chainAudit.issues.includes('unsupported-or-missing-unit'));
 assert(d.items.every(x=>x.physicalOriginVerified===false));assert.equal(d.scoreAuthorized,false);
 console.log('LNG cargo chain-integrity tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
