'use strict';
const CHECKS=['outcomeDefined','baselineDocumented','followupDocumented','matchedDefinitions','confoundersAddressed','independentOutcomeCorroborated'];
function verifiedSourceAudit(a){return !!a&&a.status==='independently-verified'&&a.claimChecked===true&&a.sourceOpened===true&&a.publicationDateChecked===true&&a.matchedDefinitionChecked===true&&typeof a.reviewer==='string'&&a.reviewer.trim().length>0&&/^\d{4}-\d{2}-\d{2}$/.test(a.reviewedOn||'');}
function assess(candidate){const q=candidate.measurementQuality||{};const missing=CHECKS.filter(k=>q[k]!==true);if(!verifiedSourceAudit(candidate.sourceAudit))missing.push('independentSourceAudit');return {sphere:candidate.sphere,missing,measurementReady:missing.length===0,influenceScoreAuthorized:false,score:null};}
function assessAll(data){return data.cases.map(assess);}
module.exports={CHECKS,verifiedSourceAudit,assess,assessAll};
