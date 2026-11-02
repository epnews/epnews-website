'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-evidence-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 fs.writeFileSync(a,JSON.stringify({items:[{id:'FR-01',evidence:{}},{id:'DE-02',evidence:{terminal:'T',arrivalDate:'2026-01-02',vesselIMO:'1234567',loadPort:'P',dischargeVolume:'20',volumeUnit:'m3',sourceURL:'https://example.org',retrievedAt:'2026-11-02',reportingVintage:'2026-11'}}]}));
 cp.execFileSync(process.execPath,['scripts/validate_europe_lng_cargo_evidence_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.total,2);
 assert.equal(d.items[0].verificationStatus,'missing-evidence');
 assert.equal(d.items[1].verificationStatus,'manual-source-review-required');
 assert(d.items.every(x=>x.physicalOriginVerified===false));assert.equal(d.scoreAuthorized,false);
 console.log('Cargo evidence validator tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
