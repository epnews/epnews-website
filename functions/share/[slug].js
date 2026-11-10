const ORIGIN='https://epnews.pages.dev';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get=(s,k)=>{const m=s.match(new RegExp('(?:["\\x27]'+k+'["\\x27]|\\b'+k+'\\b)\\s*:\\s*["\\x27]([^"\\x27]*)["\\x27]'));return m?m[1]:''};
export async function onRequestGet({params,env,request}){
 const id=String(params.slug||'');
 if(!/^[a-z0-9-]{1,120}$/.test(id))return new Response('Not found',{status:404});
 // Direct metadata lookup for Myanmar rare-earths article; bypass missing/stale metadata index.
 if(id==='myanmar-us-rare-earths-20261110'){
  const sourceResponse=await env.ASSETS.fetch(new URL('/content/myanmar-us-rare-earths-20261110.js',request.url));
  if(!sourceResponse.ok)return new Response('Article asset unavailable',{status:503});
  const source=await sourceResponse.text();
  if(get(source,'status')!=='published')return new Response('Not found',{status:404});
  const title=get(source,'title'),description=get(source,'deck');
  if(!title)return new Response('Article metadata unavailable',{status:503});
  const image=ORIGIN+'/assets/images/epnews_myanmar_rare_earths_website_1600x900.jpg';
  const url=ORIGIN+'/article/'+id;
  const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"></head><body><a href="'+esc(url)+'">Read '+esc(title)+'</a></body></html>';
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 // Direct metadata lookup for the Big Bend article. Avoids exceeding Worker subrequest limits.
 if(id==='big-bend-border-construction-20261109'){
  const res=await env.ASSETS.fetch(new URL('/content/big-bend-border-construction-20261109.js',request.url));
  if(!res.ok)return new Response('Article unavailable',{status:503});
  const entry=await res.text();
  if(get(entry,'status')!=='published')return new Response('Not found',{status:404});
  const title=get(entry,'title'),description=get(entry,'deck');
  const image=ORIGIN+'/assets/images/big-bend-border-construction-20261109_1600x900.jpg';
  const url=ORIGIN+'/article/'+id;
  const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"></head><body><a href="'+esc(url)+'">Read '+esc(title)+'</a></body></html>';
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 // Direct metadata lookup for the Japan–Philippines article avoids scanning dozens of assets.
 if(id==='japan-philippines-radar-drones-20261109'){
  const res=await env.ASSETS.fetch(new URL('/content/japan-philippines-radar-drones-20261109.js',request.url));
  if(!res.ok)return new Response('Article unavailable',{status:503});
  const entry=await res.text();
  if(get(entry,'status')!=='published')return new Response('Not found',{status:404});
  const title=get(entry,'title'),description=get(entry,'deck');
  const image=ORIGIN+'/assets/images/japan-philippines-radar-drones-20261109_1600x900.jpg';
  const url=ORIGIN+'/article/'+id;
  const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"><meta http-equiv="refresh" content="0;url='+esc(url)+'"></head><body><a href="'+esc(url)+'">Read '+esc(title)+'</a></body></html>';
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 // Fast path for the flagship article: avoid scanning every story asset.
 if(id==='power'){
  const original=await env.ASSETS.fetch(new URL('/content/chaos-investigation.js',request.url));
  if(!original.ok)return new Response('Metadata unavailable',{status:503});
  const entry=await original.text();
  const status=get(entry,'status');
  if(status!=='published')return new Response('Not found',{status:404});
  const title=get(entry,'title'),description=get(entry,'deck');
  const image=new URL('/assets/images/chaos-flagship-hero-approved-20261031.jpg',ORIGIN).href;
  const url=ORIGIN+'/article/power';
  const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"><meta http-equiv="refresh" content="0;url=/article/power"></head><body><a href="/article/power">Read '+esc(title)+'</a></body></html>';
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 // One small metadata request replaces the previous 40+ sequential asset fetches.
 // Never scan every article in a live Cloudflare request: that can trigger Error 1101.
 // New stories should resolve without waiting for the asynchronous metadata-index job.
 // The Schumer article file exists on main, but its share index was not generated.
 if(id==='schumer-leadership-challenge-20261109'){
  const title='Democrats Won the Senate. Now Schumer Faces a Fight Over Who Leads It.';
  const description='Chris Van Hollen is considering a challenge to Chuck Schumer after Democrats\u0027 Senate victory—but Schumer still has substantial caucus support.';
  const image=ORIGIN+'/assets/images/schumer-leadership-20261109_1600x900.jpg';
  const url=ORIGIN+'/article/'+id;
  const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
  const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"></head><body><a href="'+esc(url)+'">Read '+esc(title)+'</a></body></html>';
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 const indexResponse=await env.ASSETS.fetch(new URL('/content/share-index.json',request.url));
 let record;
 if(indexResponse.ok){
  try { const index=await indexResponse.json(); record=Object.prototype.hasOwnProperty.call(index,id)?index[id]:null; }
  catch { /* Missing or stale index can resolve to SPA HTML; fall through to direct article lookup. */ record=null; }
 }
 if(!record){
  // Newly added articles can resolve directly before the index generation job completes.
  const direct=await env.ASSETS.fetch(new URL('/content/'+id+'.js',request.url));
  if(direct.ok){
   const source=await direct.text();
   if(get(source,'status')==='published'){
    const imageMatch=source.match(/image\\s*:\\s*\\{\\s*src\\s*:\\s*['"]([^'"]+)['"]/);
    record={title:get(source,'title'),deck:get(source,'deck'),image:imageMatch?.[1]||'assets/images/ep-news-official-horizontal-masthead-20261105.png'};
   }
  }
 }
 if(!record||!record.title)return new Response('Not found',{status:404});
 const title=record.title,description=record.deck||'';
 const image=new URL('/'+String(record.image||'assets/images/ep-news-official-horizontal-masthead-20261105.png').replace(/^[/]+/,''),ORIGIN).href;
 const url=ORIGIN+'/article/'+encodeURIComponent(id);
 const dest='/article/'+encodeURIComponent(id);
 const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"><meta http-equiv="refresh" content="0;url='+esc(dest)+'"></head><body><a href="'+esc(dest)+'">Read '+esc(title)+'</a></body></html>';
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
}
