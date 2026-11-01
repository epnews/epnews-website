'use strict';
const CHECKS=['outcomeDefined','baselineDocumented','followupDocumented','matchedDefinitions','confoundersAddressed','independentOutcomeCorroborated'];
function assess(candidate){const q=candidate.measurementQuality||{};const missing=CHECKS.filter(k=>q[k]!==true);const eligible=missing.length===0;return {sphere:candidate.sphere,missing,measurementReady:eligible,influenceScoreAuthorized:false,score:null};}
function assessAll(data){return data.cases.map(assess);}
module.exports={CHECKS,assess,assessAll};
