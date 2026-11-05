const ORIGIN='https://epnews.pages.dev';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get=(s,k)=>{const m=s.match(new RegExp('["\\x27]'+k+'["\\x27]\\s*:\\s*["\\x27]([^"\\x27]*)["\\x27]'));return m?m[1]:''};
export async function onRequestGet({params,env,request}){
 const id=String(params.slug||'');
 if(!/^[a-z0-9-]{1,120}$/.test(id))return new Response('Not found',{status:404});
 const response=await env.ASSETS.fetch(new URL('/content/stories.js',request.url));
 if(!response.ok)return new Response('Metadata unavailable',{status:503});
 const source=await response.text();
 const entries=source.split(/(?=\{"id":)/);
 const entry=entries.find(s=>get(s,'id')===id);
 if(!entry||get(entry,'status')!=='published')return new Response('Not found',{status:404});
 const title=get(entry,'title'),description=get(entry,'deck');
 const imageMatch=entry.match(/image\s*:\s*\{\s*src\s*:\s*['"]([^'"]+)['"]/);
 const image=new URL('/'+(imageMatch?imageMatch[1]:'assets/images/ep-news-official-horizontal-masthead-20261105.png').replace(/^\//,''),ORIGIN).href;
 const url=ORIGIN+'/share/'+encodeURIComponent(id);
 const dest=id==='panama-ports-20261105'?'/investigations/panama-ports-who-won.html':'/#article/'+encodeURIComponent(id);
 const tags=[['og:type','article'],['og:site_name','Epic Perspective News'],['og:title',title],['og:description',description],['og:image',image],['og:url',url]];
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Epic Perspective News</title><meta name="description" content="'+esc(description)+'">'+tags.map(([k,v])=>'<meta property="'+k+'" content="'+esc(v)+'">').join('')+'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+esc(image)+'"><link rel="canonical" href="'+esc(url)+'"><meta http-equiv="refresh" content="0;url='+esc(dest)+'"></head><body><a href="'+esc(dest)+'">Read '+esc(title)+'</a></body></html>';
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
}