import {onRequestGet as shareMetadata} from '../share/[slug].js';

// Render the actual EP News app at its permanent article URL, with server-side
// Open Graph metadata for social crawlers. No browser redirect or hash URL.
export async function onRequestGet({params,env,request}){
 const slug=String(params.slug||'');
 if(!/^[a-z0-9-]{1,120}$/.test(slug))return new Response('Not found',{status:404});
 if(slug==='panama-ports-20261105'){
  const full=await env.ASSETS.fetch(new URL('/investigations/panama-ports-who-won.html',request.url));
  if(!full.ok)return new Response('Investigation unavailable',{status:503});
  let html=await full.text();
  const canonical='https://epnews.pages.dev/article/panama-ports-20261105';
  html=html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="'+canonical+'">');
  html=html.replace('</head>','<link rel="canonical" href="'+canonical+'"></head>');
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
 }
 const preview=await shareMetadata({params:{slug},env,request});
 if(preview.status!==200)return new Response('Article not found',{status:404});
 const page=await env.ASSETS.fetch(new URL('/index.html',request.url));
 if(!page.ok)return new Response('Site unavailable',{status:503});
 let html=await page.text();
 const metadata=await preview.text();
 const title=metadata.match(/<title>[^<]*<\/title>/i)?.[0]||'';
 const description=metadata.match(/<meta name="description" content="[^"]*">/i)?.[0]||'';
 const tags=[...metadata.matchAll(/<meta (?:property="og:[^"]+"|name="twitter:[^"]+") content="[^"]*">/g)].map(m=>m[0]);
 const canonical='<link rel="canonical" href="https://epnews.pages.dev/article/'+slug+'">';
 const ogUrl='<meta property="og:url" content="https://epnews.pages.dev/article/'+slug+'">';
 html=html.replace(/<title>[^<]*<\/title>/i,title);
 html=html.replace(/<meta name="description"[^>]*>/i,description);
 // The static HTML shell already declares <base href="/">; do not duplicate it.
 html=html.replace('</head>',tags.filter(t=>!t.includes('property="og:url"')).join('')+ogUrl+canonical+'</head>');
 // Supply article-specific body text in the initial HTML, not only metadata.
 // Keep the existing client-side application intact: its normal router restores
 // the homepage shell before app.js initializes and renders the article.
 const asset=await env.ASSETS.fetch(new URL('/content/'+slug+'.js',request.url));
 if(asset.ok){
  const source=await asset.text();
  const match=source.match(/\\bbody\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*(?:["']?sources|["']?related|["']?tags)/);
  if(match){
   const paragraphs=[];
   for(const token of match[1].match(/"(?:\\\\.|[^"\\\\])*"/g)||[]){
    try{const value=JSON.parse(token);if(typeof value==='string'&&value.length>25)paragraphs.push(value);}catch{}
   }
   if(paragraphs.length>=2){
    const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const headline=(metadata.match(/<meta property="og:title" content="([^"]*)"/i)||[])[1]||slug;
    const desc=(metadata.match(/<meta name="description" content="([^"]*)"/i)||[])[1]||'';
    const article='<article class="article-shell" data-ssr-article="'+esc(slug)+'"><h1>'+headline+'</h1><p>'+desc+'</p><div class="article-body">'+paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div></article>';
    const start=html.indexOf('<main id="home-view">');
    const end=html.indexOf('<div id="route-view" hidden></div>',start);
    if(start>=0&&end>start){
     const homepage=html.slice(start,end);
     const restore='<script>document.getElementById("ep-home-template").replaceWith(document.getElementById("ep-home-template").content.cloneNode(true));document.getElementById("route-view").hidden=true;</'+'script>';
     html=html.slice(0,start)+'<template id="ep-home-template">'+homepage+'</template><div id="route-view">'+article+'</div>'+restore+html.slice(end+'<div id="route-view" hidden></div>'.length);
    }
   }
  }
 }
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
}
