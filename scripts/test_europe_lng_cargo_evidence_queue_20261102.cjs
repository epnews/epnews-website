'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-queue-'));
try{
 const input=path.join(dir,'in.json'),output=path.join(dir,'out.json');
 fs.writeFileSync(input,JSON.stringify({scope:'test',unit:'million m3',rows:[{geo:'FR',month:'01',priorityMagnitude:12},{geo:'DE',month:'02',priorityMagnitude:null}]}));
 cp.execFileSync(process.execPath,['scripts/build_europe_lng_cargo_evidence_queue_20261102.cjs',input,output]);
 const d=JSON.parse(fs.readFileSync(output,'utf8'));
 assert.equal(d.summary.total,2);assert.equal(d.items[1].priorityMagnitude,null);
 assert(d.items.every(x=>x.status==='unverified'&&x.physicalOrigin===null&&x.sourceLinks.length===0));
 assert.equal(d.scoreAuthorized,false);
 console.log('Cargo evidence queue tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
