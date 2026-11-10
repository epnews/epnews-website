import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), dir=path.join(root,'content');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.js')&&f!=='editorial.js').sort();
const index={};
const field=(s,k)=>{const m=s.match(new RegExp('(?:["\\x27]'+k+'["\\x27]|\\b'+k+'\\b)\\s*:\\s*(["\\x27])((?:\\\\.|(?!\\1)[^\\\\])*)\\1'));return m?m[2].replace(/\\\"/g,'"').replace(/\\\\/g,'\\'):''};
for(const file of files){
 const source=fs.readFileSync(path.join(dir,file),'utf8');
 const re=/(?:["']id["']|\bid)\s*:\s*["']([a-z0-9-]{1,120})["']/g;
 const matches=[...source.matchAll(re)];
 for(let i=0;i<matches.length;i++){
  const match=matches[i], id=match[1];
  const segment=source.slice(match.index,i+1<matches.length?matches[i+1].index:undefined);
  const status=field(segment,'status');
  if(status!=='published')continue;
  const title=field(segment,'title'),deck=field(segment,'deck');
  if(!title)continue;
  const imageMatch=segment.match(/image\s*:\s*\{\s*src\s*:\s*['"]([^'"]+)['"]/);
  const prefixImage=source.slice(0,match.index).match(/image\s*:\s*\{\s*src\s*:\s*['"]([^'"]+)['"]/);
  const image=imageMatch?.[1]||(matches.length===1?prefixImage?.[1]:'')||'assets/images/ep-news-official-horizontal-masthead-20261105.png';
  index[id]={title,deck,image};
 }
}
if(!index.power){
 const s=fs.readFileSync(path.join(dir,'chaos-investigation.js'),'utf8');
 index.power={title:field(s,'title'),deck:field(s,'deck'),image:'assets/images/chaos-flagship-hero-approved-20261031.jpg'};
}
fs.writeFileSync(path.join(dir,'share-index.json'),JSON.stringify(index,null,2)+'\n');
console.log('Generated share metadata for '+Object.keys(index).length+' published articles');
