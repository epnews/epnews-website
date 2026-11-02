'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
function validIMO(v){const s=String(v??'').trim().replace(/^IMO\s*/i,'');if(!/^\d{7}$/.test(s))return false;return s.slice(0,6).split('').reduce((n,d,i)=>n+Number(d)*(7-i),0)%10===Number(s[6]);}
if(require.main===module){
 if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_imo_checksum_20261102.cjs <cases.json> [output.json]');
 const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
 const items=d.items.map(item=>{const imo=item.evidence?.vesselIMO??null;const valid=validIMO(imo);return {...item,imoAudit:{input:imo,checksumValid:valid},physicalOriginVerified:false,verificationStatus:valid?'manual-imo-identity-review-required':'invalid-or-missing-imo-checksum'}});
 const out={items,summary:{total:items.length,checksumValid:items.filter(x=>x.imoAudit.checksumValid).length},scoreAuthorized:false,warning:'Valid IMO checksum does not verify vessel identity, cargo origin, or source authenticity.'};
 if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
}
module.exports={validIMO};
