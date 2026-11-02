'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),https=require('node:https');
const url='https://www.energy.gov/sites/default/files/2026-10/3.%20U.S.%20LNG%20Exports%20and%20Re-Exports%20Details%20%28Jan%202016%20-%20Aug%202026%29.xlsx';
const dest=process.argv[2];
if(!dest)throw Error('Usage: node scripts/fetch_europe_lng_doe_workbook_20261102.cjs <output.xlsx>');
const maxBytes=100*1024*1024;
function fetch(u,redirects=0){if(redirects>3)throw Error('Too many redirects');
 const parsed=new URL(u);if(parsed.protocol!=='https:'||!parsed.hostname.endsWith('energy.gov'))throw Error('Unexpected redirect domain');
 https.get(u,{timeout:30000,headers:{'User-Agent':'EPNewsResearch/1.0'}},res=>{
  if([301,302,307,308].includes(res.statusCode)){res.resume();return fetch(new URL(res.headers.location,u).href,redirects+1)}
  if(res.statusCode!==200)throw Error('DOE HTTP '+res.statusCode);
  let total=0;const hash=crypto.createHash('sha256'),chunks=[];
  res.on('data',c=>{total+=c.length;if(total>maxBytes){res.destroy(Error('Workbook exceeds 100MB'));return}hash.update(c);chunks.push(c)});
  res.on('end',()=>{const data=Buffer.concat(chunks);if(data.subarray(0,2).toString()!=='PK')throw Error('Response is not an XLSX ZIP');
   fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,data,{flag:'wx'});
   const manifest={sourceUrl:url,finalUrl:u,retrievedAt:new Date().toISOString(),sha256:hash.digest('hex'),bytes:total,reportingThrough:'2026-08',rowLevelAnalyzed:false};
   fs.writeFileSync(dest+'.manifest.json',JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(manifest));
  });
  res.on('error',e=>{console.error(e.message);process.exitCode=1});
 }).on('error',e=>{console.error(e.message);process.exitCode=1});
}
fetch(url);
