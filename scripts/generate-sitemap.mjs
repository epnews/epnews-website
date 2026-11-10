// Generate a published-article sitemap from the scripts actually loaded by the homepage.
// Run: node scripts/generate-sitemap.mjs [--check]
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
const origin='https://epnews.pages.dev';
const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const index=await read('index.html');
const loaded=[...index.matchAll(/<script\b[^>]*\bsrc=["'](content\/[^"'?#]+\.js)(?:\?[^"']*)?["']/g)].map(m=>m[1]);
const files=[...new Set(loaded)];
if(files.length<5)throw Error('Suspiciously few content scripts in index.html; refusing to overwrite sitemap');
const ids=new Set();
let publishedCount=0;
for(const file of files){
 if(!existsSync(new URL(file,root)))throw Error('Homepage references missing content script: '+file);
 const src=await read(file);
 // Content entries use id/status properties. Find every id and check its enclosing
 // story object by locating the next id boundary; status may occur before id.
 const markers=[...src.matchAll(/(?:["']?id["']?)\s*:\s*["']([a-z0-9-]+)["']/g)];
 for(let i=0;i<markers.length;i++){
  const marker=markers[i],id=marker[1];
  // Include the preceding property block to handle entries with status before id.
  const from=Math.max(0,marker.index-1600);
  const to=i+1<markers.length?markers[i+1].index:Math.min(src.length,marker.index+12000);
  const segment=src.slice(from,to);
  // Match a status within the entry vicinity, avoiding unrelated published prose.
  const before=src.slice(Math.max(0,marker.index-1600),marker.index);
  const after=src.slice(marker.index,Math.min(to,marker.index+1600));
  const statusBefore=[...before.matchAll(/(?:["']?status["']?)\s*:\s*["'](published|draft|archived)["']/g)].at(-1);
  const statusAfter=after.match(/(?:["']?status["']?)\s*:\s*["'](published|draft|archived)["']/);
  const status=statusAfter?.[1]||statusBefore?.[1];
  if(status==='published'){ids.add(id);publishedCount++;}
 }
}
if(publishedCount<5)throw Error('Published article discovery unexpectedly low ('+publishedCount+'); refusing to overwrite sitemap');
const paths=new Set(['/','/article/power','/investigations/panama-ports-who-won.html']);
for(const id of ids)paths.add('/article/'+id);
const ordered=[...paths].sort((a,b)=>a==='/'?-1:b==='/'?1:a.localeCompare(b));
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+ordered.map(path=>'  <url><loc>'+origin+path+'</loc></url>').join('\n')+'\n</urlset>\n';
const current=await read('sitemap.xml');
if(process.argv.includes('--check')){
 if(current!==xml){console.error('Sitemap out of date: '+ordered.length+' expected URLs. Run node scripts/generate-sitemap.mjs');process.exitCode=1;}
 else console.log('Sitemap verified: '+ordered.length+' URLs');
}else{
 if(current!==xml)await writeFile(new URL('sitemap.xml',root),xml);
 console.log('Sitemap generated: '+ordered.length+' URLs from '+files.length+' loaded content scripts');
}
