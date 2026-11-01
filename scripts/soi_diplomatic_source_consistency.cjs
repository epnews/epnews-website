'use strict';
// Detect contradictory claim-to-source mapping without asserting a source was independently opened.
const EXPECTED={
 us:{host:'pacom.mil',path:'3621934',scope:'December 2023'},
 china:{host:'spa.gov.sa',path:'ed7aabfefaw',scope:'March 2023'},
 russia:{host:'base.garant.ru',path:'411209091',scope:'March 2025'},
 eu:{host:'eeas.europa.eu',path:'eu-moldova-security-defence-partnership',scope:'May 2024'},
 india:{host:'pib.gov.in',path:'2104450',scope:'nominal merchandise trade'}
};
function auditAnchor(c){const a=c.sourceAudit||{},expected=EXPECTED[c.sphere];if(!expected)return {sphere:c.sphere,valid:false,errors:['unknown sphere']};const errors=[];let url;try{url=new URL(a.sourceUrl);}catch{errors.push('invalid URL');}if(url&&(!url.hostname.endsWith(expected.host)||!url.pathname.includes(expected.path)&&!url.search.includes(expected.path)))errors.push('unexpected source for claim');if(!(a.claimScope||'').includes(expected.scope))errors.push('claim scope mismatch');if(a.status!=='pending-independent-review')errors.push('unapproved verification promotion');if(a.claimChecked||a.sourceOpened||a.publicationDateChecked||a.matchedDefinitionChecked||a.reviewer||a.reviewedOn)errors.push('premature verification');return {sphere:c.sphere,valid:errors.length===0,errors};}
function auditAll(d){return d.cases.map(auditAnchor);}
module.exports={EXPECTED,auditAnchor,auditAll};
