'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-pipeline-'));
const run=(script,input)=>{const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');fs.writeFileSync(a,JSON.stringify(input));cp.execFileSync(process.execPath,[script,a,b],{stdio:'pipe'});return JSON.parse(fs.readFileSync(b,'utf8'))};
try{
 const identity=run('scripts/audit_europe_lng_cargo_identity_consistency_20261102.cjs',{items:[{id:'case-a',identityEvidence:[{vesselIMO:'9074729'},{vesselIMO:'9074729'}]},{id:'case-b',identityEvidence:[{vesselIMO:'9074729'},{vesselIMO:'9074728'}]}]});
 assert.equal(identity.summary.manualReviewCandidates,1);
 const chrono=run('scripts/audit_europe_lng_cargo_chain_integrity_20261102.cjs',{items:[{id:'case-a',evidence:{loadingDate:'2026-01-01',arrivalDate:'2026-01-05',dischargeDate:'2026-01-06',dischargeVolume:'20',volumeUnit:'m3 LNG',vesselIMO:'9074729'}}]});
 assert.equal(chrono.summary.manualReviewCandidates,1);
 const backlog=run('scripts/summarize_europe_lng_cargo_review_backlog_20261102.cjs',{items:[{id:'case-a',evidenceCompleteness:'fields-present',sourceAudit:{independentReviewCandidate:true},provenanceAudit:{candidateForManualReview:true},chainAudit:chrono.items[0].chainAudit,imoAudit:{checksumValid:true},identityAudit:identity.items[0].identityAudit},{id:'case-b'}]});
 assert.equal(backlog.summary.readyForHumanReview,1);assert.equal(backlog.summary.blocked,1);
 assert(backlog.rows.every(x=>x.physicalOriginVerified===false&&x.scoreAuthorized===false));
 console.log('LNG cargo research pipeline integration tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
