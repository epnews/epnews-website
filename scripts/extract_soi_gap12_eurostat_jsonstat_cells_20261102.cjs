'use strict';
/* Extract exact household energy prices from independently downloaded official Eurostat JSON-stat.
 * Usage: node scripts/extract_soi_gap12_eurostat_jsonstat_cells_20261102.cjs electricity.json gas.json > verified-cells.json
 * Input must be original official JSON-stat responses for nrg_pc_204 and nrg_pc_202.
 * This script never synthesizes or fills missing source observations.
 */
const fs=require('node:fs'),assert=require('node:assert/strict');
if(process.argv.length!==4){console.error('Supply original official electricity and gas JSON-stat files');process.exit(2)}
const specs=[{commodity:'electricity',dataset:'nrg_pc_204',band:'KWH2500-4999',geos:['IE','DE','BE','HU','MT','BG']},{commodity:'natural gas',dataset:'nrg_pc_202',band:'GJ20-199',geos:['SE','NL','HU','HR','RO']}];
const cells=[];
const retrievedAt=process.env.EUROSTAT_RETRIEVED_AT;
assert(typeof retrievedAt==='string'&&/^\\d{4}-\\d{2}-\\d{2}T/.test(retrievedAt),'Set EUROSTAT_RETRIEVED_AT to actual retrieval timestamp (ISO 8601)');
function parse(json,spec){
 assert(json.class==='dataset','Not Eurostat JSON-stat dataset');
 assert(typeof json.source==='string'&&/Eurostat/i.test(json.source),'Official Eurostat source metadata required');
 assert(Array.isArray(json.id)&&Array.isArray(json.size)&&json.id.length===json.size.length);
 assert(json.dimension&&json.value,'Missing dimensions or values');
 const keys=json.id.map((id,i)=>{const d=json.dimension[id];assert(d&&d.category&&d.category.index,'Missing index '+id);const pairs=Object.entries(d.category.index).map(([k,v])=>[k,Number(v)]);assert(pairs.length===json.size[i]);return new Map(pairs)});
 const findDim=(candidates)=>{const i=json.id.findIndex(x=>candidates.includes(x));assert(i>=0,'Missing dimension '+candidates.join('/'));return i};
 const geo=findDim(['geo']),time=findDim(['time']),unit=findDim(['unit']),currency=findDim(['currency']),cons=findDim(['nrg_cons','consumption']),tax=findDim(['tax']);
 const selection={};selection[time]='2026-S1';selection[unit]='KWH';selection[currency]='EUR';selection[cons]=spec.band;selection[tax]='I_TAX';
 // Explicitly fail on unaccounted multi-valued dimensions rather than choosing the first arbitrarily.
 for(let i=0;i<json.id.length;i++)if(!Object.hasOwn(selection,i)&&i!==geo)assert(json.size[i]===1,'Ambiguous unselected dimension '+json.id[i]);
 for(const g of spec.geos){const chosen={...selection,[geo]:g};const coords=json.id.map((_,i)=>{const code=chosen[i];if(code===undefined)return 0;assert(keys[i].has(code),'Missing '+json.id[i]+'='+code);return keys[i].get(code)});
 let offset=0;for(let i=0;i<coords.length;i++)offset=offset*json.size[i]+coords[i];
 const value=Array.isArray(json.value)?json.value[offset]:json.value[String(offset)];
 assert(Number.isFinite(value)&&value>0,'Missing official observation '+g);
 cells.push({geo:g,commodity:spec.commodity,period:'2026-S1',valueEURkWh:value,dataset:spec.dataset,unit:'KWH',currency:'EUR',consumptionBand:spec.band,taxes:'I_TAX',sourceUrl:'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/'+spec.dataset,retrievedAt});
 }
}
specs.forEach((spec,i)=>parse(JSON.parse(fs.readFileSync(process.argv[i+2],'utf8')),spec));
assert.equal(cells.length,11);console.log(JSON.stringify({cells},null,2));
