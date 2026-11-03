/* Strict cross-SOI energy-dependence observation gate. Research-only: not a score. */
(function(root){'use strict';
const SOIS=Object.freeze(['us','china','russia','eu','india']);
function audit(rows){
 if(!Array.isArray(rows))return {comparable:false,reason:'Observations must be an array'};
 const seen=new Set();let signature=null;
 for(const row of rows){
  if(!row||!SOIS.includes(row.soi)||seen.has(row.soi))return {comparable:false,reason:'Missing, duplicate or unknown SOI'};
  seen.add(row.soi);
  if(!Number.isFinite(row.value))return {comparable:false,reason:'Missing or nonfinite observation'};
  for(const key of ['metric','year','unit','source','denominator','geography']){
   if(typeof row[key]!=='string'||!row[key].trim())return {comparable:false,reason:'Missing '+key};
  }
  if(row.geography!==row.soi && !(row.soi==='eu'&&row.geography==='EU27_2020'))return {comparable:false,reason:'Actor geography mismatch'};
  const current=JSON.stringify([row.metric,row.year,row.unit,row.source,row.denominator]);
  if(signature!==null&&current!==signature)return {comparable:false,reason:'Source, definition, year or unit mismatch'};
  signature=current;
 }
 if(seen.size!==SOIS.length)return {comparable:false,reason:'All five SOIs required'};
 return {comparable:true,metric:rows[0].metric,year:rows[0].year,unit:rows[0].unit};
}
const api={audit,SOIS};root.EPEnergyIndependenceGate=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
