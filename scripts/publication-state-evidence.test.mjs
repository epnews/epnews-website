import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deploymentEvidence,changes,publicationSlugs} from './publication-state-evidence.mjs';
const r={id:1,head_sha:'merge',event:'push',name:'EP News browser publication verification',status:'completed',conclusion:'success'};
test('exact production run only',()=>{assert.equal(deploymentEvidence([r],'merge').status,'BROWSER_RUN_PASSED');assert.equal(deploymentEvidence([r],'other').status,'UNVERIFIED');assert.equal(deploymentEvidence([{...r,event:'pull_request'}],'merge').status,'UNVERIFIED');});
test('latest failure wins',()=>assert.equal(deploymentEvidence([r,{...r,id:2,conclusion:'failure'}],'merge').status,'BROWSER_RUN_FAILED'));
test('deduplicate identical transitions',()=>{const p={number:1,head:'a',status:'MERGED'};assert.equal(changes([p],[p]).length,0);assert.equal(changes([],[p]).length,1);});

test('actual Philippines intake layout',()=>assert.deepEqual(publicationSlugs([{filename:'content/philippines-china-australia-defense-20261117.js'},{filename:'editorial-evidence/philippines-china-australia-defense-20261117.json'}]),['philippines-china-australia-defense-20261117']));
test('unrelated evidence cannot qualify a content change',()=>assert.deepEqual(publicationSlugs([{filename:'content/foo.js'},{filename:'editorial-evidence/bar.json'}]),[]));

test('verified recheck supersedes original failure without erasing it',()=>{
 const failed={...r,id:10,conclusion:'failure'};
 const checks={http:true,headline:true,body:true,graphic:true,canonical:true,ogTitle:true,ogImage:true,share:true,overflow:true};
 const recheck={id:20,ancestorVerified:true,status:'completed',conclusion:'success',report:['desktop','mobile'].map(viewport=>({slug:'story',viewport,passed:true,attempts:[{checks}]}))};
 const result=deploymentEvidence([failed],'merge',[recheck],['story']);
 assert.equal(result.status,'BROWSER_RECHECK_PASSED');
 assert.equal(result.originalFailureRunId,10);
 assert.equal(result.runId,20);
 for(const patch of [{ancestorVerified:false},{report:recheck.report.slice(0,1)},{id:9},{conclusion:'failure'}])
  assert.equal(deploymentEvidence([failed],'merge',[{...recheck,...patch}],['story']).status,'BROWSER_RUN_FAILED');
});
