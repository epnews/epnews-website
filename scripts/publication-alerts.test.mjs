import {test} from 'node:test';
import assert from 'node:assert/strict';
import {alertFor,alreadySent} from './publication-alerts.mjs';
const p={number:1,head:'abc',status:'BLOCKED'};
test('blocked alerts',()=>assert.equal(alertFor(p).kind,'CHECKS_BLOCKED'));
test('no unverified readiness or merge-only alert',()=>{for(const status of ['UNVERIFIED','RUNNING','MERGED','READY','CLOSED'])assert.equal(alertFor({...p,status}),null);});
test('production failure alerts',()=>assert.equal(alertFor({...p,status:'MERGED',deployment:{status:'BROWSER_RUN_FAILED',runId:4}}).kind,'PRODUCTION_BROWSER_FAILED'));
test('only bot markers deduplicate',()=>{const {key}=alertFor(p);const body='<!-- epnews-alert:'+key+' -->';assert.equal(alreadySent([{user:{login:'github-actions[bot]'},body}],key),true);assert.equal(alreadySent([{user:{login:'someone'},body}],key),false);});
test('new SHA creates new alert',()=>assert.notEqual(alertFor(p).key,alertFor({...p,head:'def'}).key));
