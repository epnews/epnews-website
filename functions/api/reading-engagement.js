const reply=status=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403);
 if(request.headers.get('Sec-GPC')==='1'||request.headers.get('DNT')==='1')return reply(204);
 if(!env.EP_VISITS_DB)return reply(503);
 try{
  const raw=await request.text();if(raw.length>512)return reply(413);
  const {id,slug,source,campaign,seconds,depth}=JSON.parse(raw);
  if(typeof id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)||typeof slug!=='string'||!/^[a-z0-9-]{1,120}$/.test(slug)||!['facebook','youtube','untagged'].includes(source)||typeof campaign!=='string'||!/^([a-z0-9-]{1,100})?$/.test(campaign)||campaign.startsWith('diagnostic-')||(source==='untagged'&&campaign)||!Number.isInteger(seconds)||seconds<0||seconds>1800||!Number.isInteger(depth)||depth<0||depth>100)return reply(400);
  const db=env.EP_VISITS_DB;
  await db.batch([
   db.prepare("CREATE TABLE IF NOT EXISTS reading_engagement_v1 (id TEXT PRIMARY KEY,day TEXT NOT NULL,slug TEXT NOT NULL,source TEXT NOT NULL,campaign TEXT NOT NULL,seconds INTEGER NOT NULL,depth INTEGER NOT NULL)"),
   db.prepare("CREATE INDEX IF NOT EXISTS reading_engagement_v1_day ON reading_engagement_v1(day)"),
   db.prepare("DELETE FROM reading_engagement_v1 WHERE day<date('now','-29 days')"),
   db.prepare("INSERT INTO reading_engagement_v1(id,day,slug,source,campaign,seconds,depth) VALUES(?,date('now'),?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET seconds=MAX(seconds,excluded.seconds),depth=MAX(depth,excluded.depth) WHERE slug=excluded.slug AND source=excluded.source AND campaign=excluded.campaign").bind(id,slug,source,campaign,seconds,depth)
  ]);return reply(204);
 }catch{return reply(503);}
}
