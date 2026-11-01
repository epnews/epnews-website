/* Completion tracking is not an economic or geopolitical influence score. */
(function(root){'use strict';
const statuses=Object.freeze(['Verified','Partially verified','Insufficient evidence']);
function classify(gate){
 if(!gate||!Array.isArray(gate.requirements)||!gate.requirements.length)return 'Insufficient evidence';
 const results=gate.requirements.map(r=>r&&r.status);
 if(results.every(s=>s==='Verified'))return 'Verified';
 if(results.some(s=>s==='Verified'||s==='Partially verified'))return 'Partially verified';
 return 'Insufficient evidence';
}
function audit(gates){
 if(!Array.isArray(gates))return [];
 return gates.map(g=>({id:g.id,title:g.title,status:classify(g),requirements:g.requirements||[],nextAction:g.nextAction||'Document missing evidence',caveat:g.caveat||''}));
}
root.EPCompletionModel={statuses,classify,audit};
})(typeof window!=='undefined'?window:globalThis);
