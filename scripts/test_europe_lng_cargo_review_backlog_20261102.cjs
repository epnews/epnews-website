'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-backlog-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 const good={id:'complete',evidenceCompleteness:'fields-present',sourceAudit:{independentReviewCandidate:true},provenanceAudit:{candidateForManualReview:true},chainAudit:{readyForManualReview:true},imoAudit:{checksumValid:true},identityAudit:{readyForHumanReview:true}};
 fs.writeFileSync(a,JSON.stringify({items:[good,{...good,id:'blocked',imoAudit:{checksumValid:false}},{id:'empty'}]}));
 cp.execFileSync(process.execPath,['scripts/summarize_europe_lng_cargo_review_backlog_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.readyForHumanReview,1);assert.equal(d.summary.blocked,2);
 assert(d.rows[1].blockers.includes('imoChecksum'));assert.equal(d.rows[2].blockers.length,6);
 assert(d.rows.every(x=>x.physicalOriginVerified===false&&x.scoreAuthorized===false));
 console.log('Cargo review backlog tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
