const reply=status=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403);
 if(request.headers.get('Sec-GPC')==='1'||request.headers.get('DNT')==='1')return reply(204);
 try{
  const raw=await request.text();if(raw.length>512)return reply(413);
  const {view,slug,seconds,depth}=JSON.parse(raw);
  if(typeof view!=='string'||!uuid.test(view)||typeof slug!=='string'||!/^[a-z0-9-]{1,120}$/.test(slug)||!Number.isInteger(seconds)||seconds<0||seconds>1800||!Number.isInteger(depth)||depth<0||depth>100)return reply(400);
  const db=env.EP_VISITS_DB;if(!db)return reply(503);
  const id=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(view))),x=>x.toString(16).padStart(2,'0')).join('');
  await db.batch([
   db.prepare("CREATE TABLE IF NOT EXISTS engagement_views_v3 (id TEXT PRIMARY KEY,day TEXT NOT NULL,slug TEXT NOT NULL,seconds INTEGER NOT NULL,depth INTEGER NOT NULL)"),
   db.prepare("CREATE INDEX IF NOT EXISTS engagement_views_v3_day ON engagement_views_v3(day)"),
   db.prepare("DELETE FROM engagement_views_v3 WHERE day<date('now','-59 days')"),
   db.prepare("INSERT INTO engagement_views_v3(id,day,slug,seconds,depth) VALUES(?,date('now'),?,?,?) ON CONFLICT(id) DO UPDATE SET seconds=MAX(seconds,excluded.seconds),depth=MAX(depth,excluded.depth) WHERE slug=excluded.slug").bind(id,slug,seconds,depth)
  ]);return reply(204);
 }catch{return reply(503);}
}
