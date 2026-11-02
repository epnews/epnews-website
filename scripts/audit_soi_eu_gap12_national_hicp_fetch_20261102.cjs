'use strict';
/** Fetch national 2025-S2 to 2026-S1 HICP and compute country-level real energy-price changes.
 * Run: node scripts/audit_soi_eu_gap12_national_hicp_fetch_20261102.cjs
 * Optional offline fixture: SOI_HICP_FIXTURE=/path/to/eurostat-json node ...
 */
const fs=require('node:fs'),assert=require('node:assert/strict');
const source='data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json';
const target='data/soi-eu-gap12-national-real-energy-price-changes-20261102.json';
const panel=JSON.parse(fs.readFileSync(source,'utf8'));
const geos=[...new Set(panel.pairs.map(x=>x.geo))].sort();
const params=new URLSearchParams({coicop18:'TOTAL',unit:'I25',sinceTimePeriod:'2025-07',untilTimePeriod:'2026-06'});
for(const geo of geos)params.append('geo',geo);
const url='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?'+params.toString();
function parse(payload){
 const dims=payload.dimension;assert(dims&&dims.geo&&dims.time,'Eurostat JSON-stat geo/time dimensions missing');
 const keys=payload.id;assert(Array.isArray(keys));const sizes=payload.size;assert(Array.isArray(sizes));
 const idx={};for(const name of keys){const x=dims[name];assert(x&&x.category&&x.category.index,'Missing dimension '+name);idx[name]=x.category.index;}
 for(const [k,v] of [['unit','I25'],['coicop18','TOTAL'],['freq','M']])if(idx[k])assert(Object.prototype.hasOwnProperty.call(idx[k],v),'Unexpected '+k);
 const months=Array.from({length:12},(_,i)=>{const y=2025+Math.floor((i+6)/12),m=(i+6)%12+1;return y+'-'+String(m).padStart(2,'0')});
 const value=payload.value||{};const result={};
 for(const geo of geos){assert(Object.prototype.hasOwnProperty.call(idx.geo,geo),'Missing country '+geo);const series=[];
 for(const month of months){assert(Object.prototype.hasOwnProperty.call(idx.time,month),'Missing month '+month);let linear=0;for(let i=0;i<keys.length;i++){const k=keys[i],selected=k==='geo'?geo:k==='time'?month:k==='unit'?'I25':k==='coicop18'?'TOTAL':k==='freq'?'M':null;assert(selected!==null,'Unfiltered dimension '+k);assert(Object.prototype.hasOwnProperty.call(idx[k],selected),'Missing '+k+'='+selected);linear=linear*sizes[i]+idx[k][selected]}const v=Array.isArray(value)?value[linear]:value[String(linear)];assert(typeof v==='number'&&v>0,'Missing index '+geo+' '+month);series.push({month,index:v})}
 const s2=series.slice(0,6).reduce((a,b)=>a+b.index,0)/6,s1=series.slice(6).reduce((a,b)=>a+b.index,0)/6;
 result[geo]={observations:series,mean2025S2:s2,mean2026S1:s1,deflator2026S1To2025S2:s2/s1};}
 return result;
}
async function main(){
 let payload;if(process.env.SOI_HICP_FIXTURE){payload=JSON.parse(fs.readFileSync(process.env.SOI_HICP_FIXTURE,'utf8'))}else{const response=await fetch(url);const body=await response.text();if(!response.ok)throw Error('Eurostat HTTP '+response.status+': '+body.slice(0,1200));payload=JSON.parse(body)}
 const indices=parse(payload);
 const comparisons=panel.pairs.map(x=>({...x,realEndIn2025S2EUR100kWh:Number((x.endEUR100kWh*indices[x.geo].deflator2026S1To2025S2).toFixed(5)),realChangePercent:Number(((x.endEUR100kWh/x.startEUR100kWh*indices[x.geo].deflator2026S1To2025S2-1)*100).toFixed(3))}));
 const out={version:'2026-11-02',targetGap:'SOI-GAP-12',status:'direct-Eurostat-country-index-calculated',sourceUrl:url,retrievedAt:new Date().toISOString(),sourcePanel:source,geos,indices,comparisons,methodology:['National all-items HICP I25 (2025=100) six-month arithmetic mean per semester; not household energy-specific deflator','Country and commodity matched nominal prices from preexisting panel; country index applied to same-country price changes','This is descriptive real price movement, not household expenditure or causal geopolitical influence'],gapClosed:false,auditCompleted:20,auditTotal:30,scoreAuthorized:false};
 fs.writeFileSync(target,JSON.stringify(out,null,2)+'\n');console.log('Wrote '+target+' with '+geos.length+' national indices and '+comparisons.length+' real comparisons');
}
if(require.main===module)main().catch(e=>{console.error(e.stack);process.exitCode=1});
module.exports={parse,geos,url};
