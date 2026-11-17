import fs from 'node:fs';
import assert from 'node:assert/strict';
const [slug,network,snapshot]=process.argv.slice(2);
assert(/^[a-z0-9-]{1,120}$/.test(slug||''),'Invalid slug');
assert(['youtube','facebook'].includes(network),'Invalid network');
const data=JSON.parse(fs.readFileSync(snapshot,'utf8'));
assert(data.network===network&&data.complete===true,'Complete provider history required');
assert(Number.isFinite(Date.parse(data.checked_at))&&Math.abs(Date.now()-Date.parse(data.checked_at))<300000,'Fresh provider history required');
assert(Array.isArray(data.posts),'Missing provider posts');
const canonical='https://epnews.pages.dev/article/'+slug;
const share='https://epnews.pages.dev/share/'+slug;
const matches=data.posts.filter(p=>p.slug===slug||p.article_url===canonical||p.article_url===share||[p.text,p.description].some(t=>typeof t==='string'&&[canonical,share].some(u=>t.includes(u))));
if(matches.length){console.error(JSON.stringify({decision:'BLOCK_DUPLICATE',matches:matches.map(p=>({id:p.id,status:p.status,url:p.publicUrl}))}));process.exit(3);}
console.log(JSON.stringify({decision:'NO_MATCH_IN_VERIFIED_HISTORY',slug,network}));
