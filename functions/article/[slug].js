import {onRequestGet as shareMetadata} from '../share/[slug].js';

// Render the actual EP News app at its permanent article URL, with server-side
// Open Graph metadata for social crawlers. No browser redirect or hash URL.
export async function onRequestGet({params,env,request}){
 const slug=String(params.slug||'');
 if(!/^[a-z0-9-]{1,120}$/.test(slug))return new Response('Not found',{status:404});
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
 html=html.replace('</head>',tags.filter(t=>!t.includes('property="og:url"')).join('')+ogUrl+canonical+'</head>');
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300'}});
}
