'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const candidates=JSON.parse(fs.readFileSync(path.join(root,'data/soi-diplomatic-source-candidates.json'),'utf8'));
const worklist=JSON.parse(fs.readFileSync(path.join(root,'data/soi-diplomatic-audit-worklist.json'),'utf8'));
const anchors={
 us:{host:'pacom.mil',path:'3621934',scope:'December 2023'},
 china:{host:'spa.gov.sa',path:'ed7aabfefaw',scope:'March 2023'},
 russia:{host:'base.garant.ru',path:'411209091',scope:'March 2025'},
 eu:{host:'eeas.europa.eu',path:'eu-moldova-security-defence-partnership',scope:'May 2024'},
 india:{host:'pib.gov.in',path:'2104450',scope:'nominal merchandise trade'}
};
function auditSource(c){
 const a=c.sourceAudit||{}, expected=anchors[c.sphere], errors=[];
 if(!expected)return {sphere:c.sphere,valid:false,errors:['unexpected sphere']};
 let u;try{u=new URL(a.sourceUrl);}catch{errors.push('invalid URL');}
 if(u&&(u.protocol!=='https:'||!(u.hostname===expected.host||u.hostname.endsWith('.'+expected.host))||!(u.pathname+u.search).includes(expected.path)))errors.push('wrong source anchor');
 // Scope is a property of the claim, not a claim of independent verification.
 if(a.claimScope!==undefined&&!a.claimScope.includes(expected.scope))errors.push('wrong claim scope');
 if(a.status!=='pending-independent-review'||a.claimChecked!==false||a.sourceOpened!==false||a.reviewer!==null)errors.push('premature verification promotion');
 return {sphere:c.sphere,valid:errors.length===0,errors};
}
const audited=candidates.cases.map(auditSource);
assert.equal(audited.length,5);
assert.deepEqual(audited.map(x=>x.sphere).sort(),Object.keys(anchors).sort());
assert.ok(audited.every(x=>x.valid),JSON.stringify(audited));
assert.equal(auditSource({...candidates.cases[1],sourceAudit:{...candidates.cases[1].sourceAudit,sourceUrl:'https://www.state.gov/unrelated-us-gcc-statement'}}).valid,false);
assert.equal(auditSource({...candidates.cases[0],sourceAudit:{...candidates.cases[0].sourceAudit,sourceOpened:true}}).valid,false);
const p=worklist.crossSphereFinancialReconciliationPolicy;
assert.deepEqual(p.thresholds.map(x=>x.relativeDifferencePercentMax),[2,5,null]);
assert.equal(p.scoreAuthorized,false);
assert.ok(p.comparisonPrerequisites.length>=5);
assert.ok(p.notApplicableTo.includes('causal attribution'));
assert.ok(p.notApplicableTo.includes('realized expenditures vs budget authorization'));
assert.ok(p.notApplicableTo.includes('net economic benefit'));
assert.ok(p.override.includes('definitional mismatch'));
assert.equal(worklist.scoringAuthorized,false);
console.log('PASS: five source anchors, verification guard, and existing 2%/5% financial materiality policy');
module.exports={auditSource};
