const ORIGIN='https://epnews.pages.dev';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get=(s,k)=>{const m=s.match(new RegExp('(?:["\\x27]'+k+'["\\x27]|\\b'+k+'\\b)\\s*:\\s*["\\x27]([^"\\x27]*)["\\x27]'));return m?m[1]:''};
export async function onRequestGet({params,env,request}){
 const id=String(params.slug||'');
 if(!/^[a-z0-9-]{1,120}$/.test(id))return new Response('Not found',{status:404});
 const scripts=["content/stories.js","content/chaos-investigation.js","content/october-news.js","content/comey-case.js","content/fec-filing-outage.js","content/venezuela-oil-corpus-christi.js","content/us-canada-tariff-talks.js","content/qatar-iran-peace-proposal.js","content/us-treasury-debt-buyback-2026.js","content/bukele-haiti-reinforcements-2026.js","content/china-trade-manufacturing-2026.js","content/st-lng-texas-offshore-port-2026.js","content/vance-iran-outreach-october-2026.js","content/new-energy-dependency-oct28.js","content/brett-sylvia-pentagon-oct29-2026.js","content/alaska-election-probe-oct29-2026.js","content/iran-hidden-military-procurement-oct29-2026.js","content/argentina-lithium-supply-chain-oct29-2026.js","content/audi-georgia-factory-oct29-2026.js","content/new-factories-economic-costs-oct29-2026.js","content/china-import-shift-oct29-2026.js","content/mexico-owned-american-copper-oct29-2026.js","content/ilhan-omar-2016-investigation-oct29-2026.js","content/qatar-woodside-lng-oct29-2026.js","content/netanyahu-loses-majority-oct30-2026.js","content/valero-houston-refinery-oct30-2026.js","content/iran-qatar-doha-talks-oct31-2026.js","content/iran-radar-base-damage-oct31-2026.js","content/ukraine-patriot-sale-oct31-2026.js","content/brazil-serra-verde-20261105.js","content/peru-chancay-callao-20261105.js","content/argentina-andes-atlantic-corridor-20261105.js","content/guyana-oil-benefits-20261105.js","content/canada-uae-trade-20261105.js","content/ecuador-us-trade-20261105.js","content/editorial.js"];
 let entry='';
 for(const path of scripts){
  const res=await env.ASSETS.fetch(new URL('/'+path,request.url));
  if(!res.ok)continue;
  const content=await res.text();
  const token=new RegExp('(?:["\\x27]id["\\x27]|\\bid)\\s*:\\s*["\\x27]'+id+'["\\x27]');
  const match=token.exec(content);
  if(!match)continue;
  const slice=content.slice(match.index);
  const next=/(?:["']id["']|\bid)\s*:\s*["']/.exec(slice.slice(match[0].length));
  entry=next?slice.slice(0,match[0].length+next.index):slice;
  if(path==='content/chaos-investigation.js')entry=content;
  if(get(entry,'status')==='published')break;
  entry='';
 }
 if(id==='power'){
  const original=await env.ASSETS.fetch(new URL('/content/chaos-investigation.js',request.url));
  if(!original.ok)return new Response('Metadata unavailable',{status:503});
  const data=await original.text();
  const getValue=(key)=>{const match=data.match(new RegExp('["\\x27]'+key+'["\\x27]\\s*:\\s*["\\x27]([^"\\x27]+)["\\x27]'));return match?match[1]:''};
  if(getValue('status')!=='published')return new Response('Not found',{status:404});
  entry=data;
 }
 if(!entry)return new Response('Not found',{status:404});
 const title=get(entry,'title'),description=get(entry,'deck');
 const imageMatch=entry.match(/image\s*:\s*\{\s*src\s*:\s*['"]([^'"]+)['"]/);
 const image=new URL('/'+(imageMatch?imageMatch[1]:'assets/images/ep-news-official-horizontal-masthead-20261105.png').replace(/^\//,''),ORIGIN).href;
 const url=ORIGIN+'/share/'+encodeURIComponent(id);
 const dest=id==='panama-ports-20261105'?'/investigations/panama-ports-who-won.html':'/#article/'+encodeURIComponent(id);
 const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"><meta http-equiv="refresh" content="0;url='+esc(dest)+'"></head><body><a href="'+esc(dest)+'">Read '+esc(title)+'</a></body></html>';
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
}