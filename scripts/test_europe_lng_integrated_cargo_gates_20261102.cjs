'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-gates-test-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 const good={id:'synthetic',evidence:{terminal:'T',arrivalDate:'2026-01-05',loadingDate:'2026-01-01',dischargeDate:'2026-01-06',vesselIMO:'9074729',loadPort:'P',dischargeVolume:'20',volumeUnit:'m3 LNG',sourceURL:'https://terminal.example/a',retrievedAt:'2026-11-02',reportingVintage:'2026-11'},sources:[{type:'terminal-discharge',url:'https://terminal.example/a',upstreamProvider:'Terminal Authority'},{type:'vessel-tracking',url:'https://vessel.example/b',upstreamProvider:'Vessel Registry'}],identityEvidence:[{vesselIMO:'9074729'},{vesselIMO:'9074729'}]};
 fs.writeFileSync(a,JSON.stringify({items:[good,{id:'unknown'}]}));
 cp.execFileSync(process.execPath,['scripts/run_europe_lng_cargo_research_gates_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));
 assert.equal(d.pipelineStages.length,7);assert.equal(d.summary.total,2);
 assert.equal(d.summary.readyForHumanReview,1);assert.equal(d.summary.blocked,1);
 assert(d.rows.every(x=>x.physicalOriginVerified===false&&x.scoreAuthorized===false));
 console.log('Integrated cargo evidence gate tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
