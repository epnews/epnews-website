'use strict';
const fs=require('node:fs');
const {EU27}=require('./build_soi_un_vote_report.cjs');
const ACTORS={us:'USA',china:'CHN',russia:'RUS',india:'IND'};
function audit(source,metadata,cohort){
 if(source.schema!=='soi-unga-source-votes-v1'||metadata.schema!=='soi-unga-source-topics-v1')throw Error('Unexpected source schema');
 if(source.sourceTopicCsvSha256!==metadata.sourceCsvSha256)throw Error('Source metadata checksum mismatch');
 if(!Array.isArray(cohort)||cohort.length!==160||new Set(cohort).size!==160)throw Error('Invalid frozen cohort');
 const votes=new Map();
 for(const r of source.rows){const key=r.year+':'+r.resolution;let row=votes.get(key);if(!row){row=new Map();votes.set(key,row)}if(row.has(r.country))throw Error('Duplicate vote');row.set(r.country,r.vote)}
 const years=[2021,2022,2023,2024],families=['1','2','3','4','6'],results={};
 for(const actor of [...Object.keys(ACTORS),'eu'])results[actor]={};
 for(const year of years){const counters=Object.fromEntries([...Object.keys(ACTORS),'eu'].map(a=>[a,Object.fromEntries(families.map(f=>[f,{fractionalResolutionWeight:0,fractionalMatchedPairs:0,fractionalAgreements:0}]))]));
 for(const resolution of metadata.resolutions.filter(r=>r.year===year)){const key=year+':'+resolution.resolution,row=votes.get(key);if(!row)throw Error('Missing source resolution '+key);
 const fam=[...new Set(resolution.categories.map(c=>c[0]))];if(fam.some(f=>!families.includes(f)))throw Error('Unexpected family');const weight=1/fam.length;
 const euVotes=EU27.map(c=>row.get(c)).filter(v=>['Y','N','A'].includes(v));const tally={Y:0,N:0,A:0};for(const v of euVotes)tally[v]++;const ranked=Object.entries(tally).sort((a,b)=>b[1]-a[1]);const eu=euVotes.length>=20&&ranked[0][1]/euVotes.length>=.75&&ranked[0][1]>ranked[1][1]?ranked[0][0]:null;
 for(const actor of Object.keys(counters)){const ref=actor==='eu'?eu:row.get(ACTORS[actor]);if(!['Y','N','A'].includes(ref))continue;for(const f of fam)counters[actor][f].fractionalResolutionWeight+=weight;
 for(const partner of cohort){const vote=row.get(partner);if(!['Y','N','A'].includes(vote))continue;for(const f of fam){counters[actor][f].fractionalMatchedPairs+=weight;if(vote===ref)counters[actor][f].fractionalAgreements+=weight;}}}}
 for(const actor of Object.keys(counters))results[actor][year]=counters[actor];}
 return {schema:'soi-unga-family-matched-pair-coverage-v1',sourceArchiveSha256:source.sourceArchiveSha256,years,families,results,adjustedScoresAuthorized:false,influenceScoreAuthorized:false,canActivateInfluenceNeedle:false};
}
if(require.main===module){const [votesPath,topicsPath,cohortPath,out]=process.argv.slice(2);if(!out)throw Error('Usage: node scripts/audit_soi_unga_family_matched_pairs.cjs votes.json topics.json cohort-audit.json output.json');const cohort=JSON.parse(fs.readFileSync(cohortPath,'utf8')).frozenExternalPartners;fs.writeFileSync(out,JSON.stringify(audit(JSON.parse(fs.readFileSync(votesPath,'utf8')),JSON.parse(fs.readFileSync(topicsPath,'utf8')),cohort),null,2)+'\n');console.log('Five-family matched-pair audit generated; scores disabled')}
module.exports={audit};
