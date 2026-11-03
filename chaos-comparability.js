/* Comparable observation contract: original-unit differences only, never composite influence. */
(function(root){'use strict';
const matchedMetricUnits={
 'gdp-growth-2025':'percentage points',
 'sipri-real-change-2025':'percentage points',
 'ei-total-energy-supply-2025':'EJ'
};
function compare(a,b){
 if(!a||!b||!a.metric||a.metric!==b.metric)return {comparable:false,reason:'Different measures'};
 if(!a.period||a.period!==b.period)return {comparable:false,reason:'Different observation periods'};
 if(!Object.prototype.hasOwnProperty.call(matchedMetricUnits,a.metric))return {comparable:false,reason:'Metric lacks a reviewed comparison unit'};
 if(!Number.isFinite(a.number)||!Number.isFinite(b.number))return {comparable:false,reason:'Missing numeric observations'};
 return {comparable:true,difference:a.number-b.number,unit:matchedMetricUnits[a.metric],metric:a.metric,period:a.period};
}
const api={compare,matchedMetricUnits};root.EPChaosComparability=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
