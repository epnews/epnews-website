'use strict';
const {build}=require('./soi_external_alignment.cjs');
const {EU27}=require('./build_soi_un_vote_report.cjs');
const ACTORS={us:'USA',china:'CHN',russia:'RUS',india:'IND'};
function standardize(rows,partners,metadata,years=[2021,2022,2023,2024],opts={}){
 if(!metadata||metadata.schema!=='soi-unga-source-topics-v1'||metadata.influenceScoreAuthorized!==false)throw Error('Unverified topic metadata');
 if(!Array.isArray(years)||!years.length||new Set(years).size!==years.length)throw Error('Invalid years');
 const cohort=[...new Set(partners)].filter(x=>!EU27.includes(x)&&!Object.values(ACTORS).includes(x));
 if(!cohort.length)throw Error('No external partners');
 const resolutions=new Map(),weights=new Map();
 for(const r of metadata.resolutions){if(!years.includes(r.year))continue;const key=r.year+':'+r.resolution;if(resolutions.has(key))throw Error('Duplicate resolution metadata');if(!r.categories?.length||new Set(r.categories).size!==r.categories.length)throw Error('Invalid categories');resolutions.set(key,r.categories);for(const cat of r.categories)weights.set(cat,(weights.get(cat)||0)+1/r.categories.length)}
 const total=[...weights.values()].reduce((a,b)=>a+b,0);
 if(!total)throw Error('No topic weights');
 const voteMaps=new Map();
 for(const r of rows){if(!years.includes(r.year))continue;const key=r.year+':'+r.resolution;if(!resolutions.has(key))throw Error('Vote resolution has no topic metadata: '+key);if(!voteMaps.has(key))voteMaps.set(key,new Map());const votes=voteMaps.get(key);if(votes.has(r.country))throw Error('Duplicate country vote');if(!['Y','N','A','X'].includes(r.vote))throw Error('Invalid vote');votes.set(r.country,r.vote)}
 const output={schema:'soi-unga-fractional-topic-adjusted-v1',years,externalPartners:cohort.length,topicWeights:Object.fromEntries([...weights].map(([k,v])=>[k,v/total])),results:{},influenceScoreAuthorized:false,canActivateInfluenceNeedle:false};
 for(const year of years){const byActor=Object.fromEntries([...Object.keys(ACTORS),'eu'].map(a=>[a,{}]));
 for(const [key,categories] of resolutions){if(!key.startsWith(year+':'))continue;const votes=voteMaps.get(key);if(!votes)throw Error('Resolution has no vote data: '+key);
 const validEU=EU27.map(c=>votes.get(c)).filter(v=>v&&v!=='X');const count={Y:0,N:0,A:0};for(const v of validEU)count[v]++;const ordered=Object.entries(count).sort((a,b)=>b[1]-a[1]);const minEU=opts.minEU??20,threshold=opts.euThreshold??.75;const euVote=validEU.length>=minEU&&ordered[0][1]/validEU.length>=threshold&&ordered[0][1]>ordered[1][1]?ordered[0][0]:null;
 for(const actor of Object.keys(byActor)){const ref=actor==='eu'?euVote:votes.get(ACTORS[actor]);if(!ref||ref==='X')continue;for(const country of cohort){const vote=votes.get(country);if(!vote||vote==='X')continue;const share=1/categories.length;for(const cat of categories){const cell=byActor[actor][cat]??={agreement:0,shared:0};cell.shared+=share;if(vote===ref)cell.agreement+=share;}}}}
 for(const [actor,cells] of Object.entries(byActor)){const absent=Object.keys(output.topicWeights).filter(cat=>!cells[cat]||cells[cat].shared===0);let adjusted=null;if(!absent.length)adjusted=+Object.entries(output.topicWeights).reduce((sum,[cat,w])=>sum+w*cells[cat].agreement/cells[cat].shared*100,0).toFixed(4);(output.results[actor]??=[]).push({year,topicAdjustedAgreementPercent:adjusted,missingTopics:absent,coveredTopics:Object.keys(cells).length,topicCount:Object.keys(output.topicWeights).length});}}
 return output;
}
module.exports={standardize};
