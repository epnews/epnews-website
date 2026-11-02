'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/summarize_europe_lng_cargo_review_backlog_20261102.cjs <cases.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const rows=d.items.map(x=>{
 const gates={fieldCompleteness:x.evidenceCompleteness==='fields-present',sourceIndependence:x.sourceAudit?.independentReviewCandidate===true,provenance:x.provenanceAudit?.candidateForManualReview===true,chronology:x.chainAudit?.readyForManualReview===true,imoChecksum:x.imoAudit?.checksumValid===true,identityConsistency:x.identityAudit?.readyForHumanReview===true};
 const blockers=Object.keys(gates).filter(k=>!gates[k]);
 return {id:x.id??null,gates,blockers,readyForHumanReview:blockers.length===0,physicalOriginVerified:false,scoreAuthorized:false};
});
const out={rows,summary:{total:rows.length,readyForHumanReview:rows.filter(x=>x.readyForHumanReview).length,blocked:rows.filter(x=>x.blockers.length).length},scoreAuthorized:false,warning:'All gates passing permits human review only; never automatic cargo-origin verification.'};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
