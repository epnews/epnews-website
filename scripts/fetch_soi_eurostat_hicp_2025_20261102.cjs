'use strict';
const fs=require('node:fs');
const endpoint='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr';
const params=new URLSearchParams({geo:'EU27_2020',coicop:'CP00',sinceTimePeriod:'2025-01',untilTimePeriod:'2025-12'});
const months=Array.from({length:12},(_,i)=>'2025-'+String(i+1).padStart(2,'0'));
function parse(json){
 const ids=json.id||[];const dims=json.size||[];
 for(const [k,v] of Object.entries({geo:'EU27_2020',coicop:'CP00',freq:'M'})){const d=json.dimension?.[k];if(!d||d.category?.index?.[v]===undefined)throw Error('Missing dimension '+k+'='+v);}
 const unitDim=json.dimension?.unit; if(!unitDim)throw Error('Missing unit');const units=Object.keys(unitDim.category.index||{});if(units.length!==1)throw Error('Ambiguous HICP index units '+units.join(','));
 const timeDim=json.dimension?.time; if(!timeDim)throw Error('Missing time');
 const out=months.map(month=>{const indices={};for(let i=0;i<ids.length;i++){const d=json.dimension[ids[i]];const index=d.category.index;if(ids[i]==='time'){if(index[month]===undefined)throw Error('Missing '+month);indices[ids[i]]=index[month];}else{const selected=ids[i]==='geo'?'EU27_2020':ids[i]==='coicop'?'CP00':ids[i]==='freq'?'M':units[0];if(index[selected]===undefined)throw Error('Missing '+ids[i]+':'+selected);indices[ids[i]]=index[selected];}}let flat=0;for(let i=0;i<ids.length;i++)flat=flat*dims[i]+indices[ids[i]];const v=json.value?.[flat]??json.value?.[String(flat)];if(typeof v!=='number'||!Number.isFinite(v)||v<=0)throw Error('Invalid HICP '+month);return {month,index:v};});
 const mean=a=>a.reduce((s,x)=>s+x.index,0)/a.length;const s1=mean(out.slice(0,6)),s2=mean(out.slice(6));return {dataset:'prc_hicp_minr',geo:'EU27_2020',coicop:'CP00',unit:units[0],source:endpoint+'?'+params,observations:out,meanS1:s1,meanS2:s2,deflatorS2ToS1:s1/s2,semesterInflationPercent:(s2/s1-1)*100};
}
async function main(){const res=await fetch(endpoint+'?'+params);if(!res.ok)throw Error('Eurostat HTTP '+res.status);const d=parse(await res.json());const path='data/soi-eu-hicp-2025-verified-index-20261102.json';fs.writeFileSync(path,JSON.stringify(d,null,2)+'\n');console.log('Wrote '+path+' with '+d.observations.length+' source-backed months');}
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1});module.exports={parse,months};
