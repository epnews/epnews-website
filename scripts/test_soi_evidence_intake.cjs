#!/usr/bin/env node
'use strict';
const cp=require('node:child_process'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const root=path.resolve(__dirname,'..'),f=path.join(root,'data/soi-research-evidence-intake.json');
const original=fs.readFileSync(f,'utf8');
try{
 const ok=JSON.parse(cp.execFileSync(process.execPath,['scripts/validate_soi_evidence_intake.cjs'],{cwd:root,encoding:'utf8'}));
 assert.equal(ok.total,0);assert.equal(ok.scoreChangesAuthorized,false);
 // Validator must reject fabricated records, duplicates and unauthorized scores.
 const invalid={schemaVersion:1,records:[{id:'bad',taskId:'missing',status:'independently-verified',sourceUrl:'http://invalid',scoreAuthorized:true}]};
 fs.writeFileSync(f,JSON.stringify(invalid));
 assert.throws(()=>cp.execFileSync(process.execPath,['scripts/validate_soi_evidence_intake.cjs'],{cwd:root,stdio:'pipe'}));
 console.log('Evidence intake structural gate and negative test PASS');
}finally{fs.writeFileSync(f,original)}
