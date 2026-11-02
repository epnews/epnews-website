'use strict';
const fs=require('node:fs');
const {EU27}=require('./build_soi_un_vote_report.cjs');
const ACTORS={us:'USA',china:'CHN',russia:'RUS',india:'IND'};
function calculate(source,metadata,cohort,support){
 if(source.schema!=='soi-unga-source-votes-v1'||metadata.schema!=='soi-unga-source-topics-v1'||source.sourceTopicCsvSha256!==metadata.sourceCsvSha256)throw Error('Source provenance mismatch');
 if(!Array.isArray(cohort)||cohort.length!==160||new Set(cohort).size!==160)throw Error('Frozen cohort mismatch');
 const codes=support.commonSupportAtLeastFive;
 if(codes.length!==6||codes.some(c=>Number(c)<100||Number(c)>134))throw Error('Invalid restricted issue codes');
 const votes=new Map();
 for(const r of source.rows){const key=r.year+':'+r.resolution;const row=votes.get(key)||new Map();if(row.has(r.country))throw Error('Duplicate vote');row.set(r.country,r.vote);votes.set(key,row)}
 const years=[2021,2022,2023,2024],results={};
 for(const actor of [...Object.keys(ACTORS),'eu'])results[actor]={};
 for(const year of years){const eligible=metadata.resolutions.filter(r=>r.year===year&&r.categories.some(c=>codes.includes(c)));const counters=Object.fromEntries([...Object.keys(ACTORS),'eu'].map(a=>[a,{matchedPairs:0,agreements:0,eligibleResolutions:eligible.length,actorEligibleResolutions:0,byCode:Object.fromEntries(codes.map(c=>[c,{matchedPairs:0,agreements:0,resolutions:0}]))}]));
 for(const r of eligible){const row=votes.get(year+':'+r.resolution);if(!row)throw Error('Missing resolution '+r.resolution);const matchedCodes=r.categories.filter(c=>codes.includes(c));const euVotes=EU27.map(c=>row.get(c)).filter(v=>['Y','N','A'].includes(v));const counts={Y:0,N:0,A:0};for(const v of euVotes)counts[v]++;const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);const eu=euVotes.length>=20&&sorted[0][1]/euVotes.length>=.75&&sorted[0][1]>sorted[1][1]?sorted[0][0]:null;
 for(const [actor,counter] of Object.entries(counters)){const ref=actor==='eu'?eu:row.get(ACTORS[actor]);if(!['Y','N','A'].includes(ref))continue;counter.actorEligibleResolutions++;for(const c of matchedCodes)counter.byCode[c].resolutions++;
 for(const partner of cohort){const vote=row.get(partner);if(!['Y','N','A'].includes(vote))continue;counter.matchedPairs++;if(vote===ref)counter.agreements++;for(const c of matchedCodes){const w=1/matchedCodes.length;counter.byCode[c].matchedPairs+=w;if(vote===ref)counter.byCode[c].agreements+=w;}}}}
 for(const [actor,c] of Object.entries(counters)){c.restrictedAgreementPercent=c.matchedPairs?+(100*c.agreements/c.matchedPairs).toFixed(4):null;results[actor][year]=c;}}
 return {schema:'soi-unga-six-code-restricted-sensitivity-v1',years,policyCodes:codes,sourceArchiveSha256:source.sourceArchiveSha256,sourceTopicCsvSha256:source.sourceTopicCsvSha256,results,representativeOfAllUNGA:false,topicAdjustedFullAgenda:false,influenceScoreAuthorized:false,canActivateInfluenceNeedle:false};
}
if(require.main===module){const [src,topics,cohortPath,supportPath,out]=process.argv.slice(2);if(!out)throw Error('Usage: node scripts/soi_unga_six_code_sensitivity.cjs votes.json topics.json cohort.json support.json output.json');const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));const result=calculate(read(src),read(topics),read(cohortPath).frozenExternalPartners,read(supportPath));fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log('Six-code restricted sensitivity computed; influence needle disabled')}
module.exports={calculate};
