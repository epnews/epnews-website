import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const entries=JSON.parse(fs.readFileSync('content/image-imports.json','utf8'));
const index=fs.readFileSync('index.html','utf8');
let count=0;
for(const file of fs.readdirSync('content').filter(x=>x.endsWith('.js')&&!['stories.js','editorial.js'].includes(x))){
  const path='content/'+file;
  if(!index.includes('src="'+path+'"')&&!index.includes("src='"+path+"'"))continue;
  const src=fs.readFileSync(path,'utf8');
  const match=src.match(/\bimage\s*:\s*\{[^}]*?\bsrc\s*:\s*["']([^"']+)["']/s);
  if(!match||!entries.some(e=>e.path===match[1]))continue;
  execFileSync(process.execPath,['scripts/preflight-article.mjs',path],{stdio:'inherit'});
  count++;
}
console.log('Verified '+count+' registered image-imported article packages');
