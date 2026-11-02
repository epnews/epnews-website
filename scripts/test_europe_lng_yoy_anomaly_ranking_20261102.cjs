'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-rank-'));
try{
 const input=path.join(dir,'input.json'),output=path.join(dir,'output.json');
 fs.writeFileSync(input,JSON.stringify({rows:[{geo:'FR',month:'01',deltaTotal:10,deltaUSLabel:4,deltaNSPLabel:-2,deltaOtherLabels:8},{geo:'DE',month:'02',deltaTotal:10,deltaUSLabel:null,deltaNSPLabel:5,deltaOtherLabels:null},{geo:'PL',month:'03',deltaTotal:20,deltaUSLabel:18,deltaNSPLabel:0,deltaOtherLabels:2}]}));
 cp.execFileSync(process.execPath,['scripts/rank_europe_lng_yoy_anomalies_20261102.cjs',input,output]);
 const d=JSON.parse(fs.readFileSync(output,'utf8'));
 assert.equal(d.rows[0].geo,'PL');assert.equal(d.rows[0].priorityMagnitude,18);
 assert.equal(d.rows[2].priorityMagnitude,null);assert.equal(d.summary.incomplete,1);
 assert.equal(d.scoreAuthorized,false);assert(d.rows.every(r=>r.physicalOriginVerified===false));
 console.log('LNG anomaly ranking tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
