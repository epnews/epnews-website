#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const queue=JSON.parse(cp.execFileSync(process.execPath,['scripts/soi_research_batch_engine.cjs'],{cwd:root,encoding:'utf8'}));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/soi-research-evidence-intake.json'),'utf8'));
const ids=new Set(queue.queue.map(x=>x.id)),seen=new Set(),report=[];
assert.equal(manifest.schemaVersion,1);
assert(Array.isArray(manifest.records));
const statuses=new Set(['candidate','retrieved','independently-verified','rejected']);
for(const [i,r] of manifest.records.entries()){
 assert.equal(typeof r.id,'string');assert(r.id.trim(),'Empty evidence ID');
 assert(!seen.has(r.id),'Duplicate evidence ID: '+r.id);seen.add(r.id);
 assert(ids.has(r.taskId),'Unknown backlog task: '+r.taskId);
 assert(statuses.has(r.status),'Invalid status for '+r.id);
 assert(/^https:\/\//.test(r.sourceUrl),'HTTPS source URL required: '+r.id);
 assert(/^\d{4}-\d{2}-\d{2}$/.test(r.sourcePublicationDate),'Source date required: '+r.id);
 assert(typeof r.claim==='string'&&r.claim.trim(),'Claim required: '+r.id);
 assert(typeof r.sourceOrganization==='string'&&r.sourceOrganization.trim(),'Source organization required: '+r.id);
 assert(typeof r.methodology==='string'&&r.methodology.trim(),'Methodology required: '+r.id);
 assert(typeof r.period==='string'&&r.period.trim(),'Period required: '+r.id);
 assert(typeof r.unit==='string'&&r.unit.trim(),'Unit required: '+r.id);
 assert(typeof r.independentVerifier==='string'&&r.independentVerifier.trim()||r.status!=='independently-verified','Independent verifier required');
 assert(typeof r.documentHash==='string'&&/^sha256:[a-f0-9]{64}$/.test(r.documentHash)||r.status!=='independently-verified','SHA256 document fingerprint required');
 assert(typeof r.counterfactual==='string'&&r.counterfactual.trim()||r.status!=='independently-verified','Counterfactual limitations required');
 assert(typeof r.costsAndIncidence==='string'&&r.costsAndIncidence.trim()||r.status!=='independently-verified','Costs and incidence required');
 assert(r.scoreAuthorized===false,'Evidence intake must never authorize scoring');
 report.push({id:r.id,taskId:r.taskId,status:r.status,scoreAuthorized:false});
}
const output={schemaVersion:1,total:report.length,verified:report.filter(x=>x.status==='independently-verified').length,records:report,scoreChangesAuthorized:false,needleChangesAuthorized:false,notice:'Manifest validation is structural only; a human must substantiate verification claims, provenance and independence before meter use.'};
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output));
