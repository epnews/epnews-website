import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deploymentEvidence,changes} from './publication-state-evidence.mjs';
const r={id:1,head_sha:'merge',event:'push',name:'EP News browser publication verification',status:'completed',conclusion:'success'};
test('exact production run only',()=>{assert.equal(deploymentEvidence([r],'merge').status,'BROWSER_RUN_PASSED');assert.equal(deploymentEvidence([r],'other').status,'UNVERIFIED');assert.equal(deploymentEvidence([{...r,event:'pull_request'}],'merge').status,'UNVERIFIED');});
test('latest failure wins',()=>assert.equal(deploymentEvidence([r,{...r,id:2,conclusion:'failure'}],'merge').status,'BROWSER_RUN_FAILED'));
test('deduplicate identical transitions',()=>{const p={number:1,head:'a',status:'MERGED'};assert.equal(changes([p],[p]).length,0);assert.equal(changes([],[p]).length,1);});
