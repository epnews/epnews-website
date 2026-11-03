/* International Alignment descriptive display adapter. No influence scoring. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.EPInternationalAlignment=api;})(typeof window!=='undefined'?window:null,function(){'use strict';
const ACTORS=['us','china','russia','india','eu'],YEARS=['2021','2022','2023','2024'];
function build(source,actor){
 if(!source||source.schema!=='soi-international-alignment-original-archive-reproduction-v1'||source.publicAlignmentNeedleAuthorized!==false||source.overallInfluenceScore!==null||source.externalPartnerUniverse2024!==160)throw Error('Invalid descriptive alignment provenance');
 if(!ACTORS.includes(actor))throw Error('Unknown sphere');
 const rows=source.series[actor];if(!Array.isArray(rows)||rows.length!==4)throw Error('Incomplete alignment series');
 return {actor,kind:'recorded-vote-agreement',unit:'percent',notInfluence:true,needleAuthorized:false,years:rows.map((r,i)=>{if(String(r.year)!==YEARS[i]||!Number.isInteger(r.agreements)||!Number.isInteger(r.matchedExternalCountryVotePairs)||r.matchedExternalCountryVotePairs<=0||r.agreements<0||r.agreements>r.matchedExternalCountryVotePairs||Math.abs(100*r.agreements/r.matchedExternalCountryVotePairs-r.agreementPercent)>.000051)throw Error('Invalid source counts');return {year:r.year,percentage:r.agreementPercent,agreements:r.agreements,denominator:r.matchedExternalCountryVotePairs};}),disclaimer:'UN recorded voting agreement with a fixed 160-country external cohort; EU is a member-vote proxy. Changing agenda mix and missing votes affect comparability. Not causal influence or a weighted influence score.'};
}
return {build,ACTORS,YEARS};
});
