// Aggregate article reads; never store raw referrers, IPs or visitor identifiers.
const sources=new Set(['facebook','google','internal','other','direct','youtube']);
const reply=(status)=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403);
 if(!env.EP_VISITS_DB)return reply(503);
 try{
  const raw=await request.text();
  if(raw.length>512)return reply(413);
  const {slug,source,campaign,campaignOnly}=JSON.parse(raw);
  if(typeof slug!=='string'||!/^[a-z0-9-]{1,120}$/.test(slug)||!sources.has(source))return reply(400);
  const db=env.EP_VISITS_DB;
  if(!campaignOnly&&!String(campaign||"").startsWith("diagnostic-")){
  await db.prepare("CREATE TABLE IF NOT EXISTS article_reads_hourly (hour TEXT NOT NULL, slug TEXT NOT NULL, source TEXT NOT NULL, total INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(hour,slug,source))").run();
  await db.prepare("INSERT INTO article_reads_hourly(hour,slug,source,total) VALUES(strftime('%Y-%m-%dT%H:00:00Z','now'),?,?,1) ON CONFLICT(hour,slug,source) DO UPDATE SET total=total+1").bind(slug,source).run();
  }
  if(typeof campaign==='string'&&/^[a-z0-9-]{1,100}$/.test(campaign)&&['facebook','youtube'].includes(source)){
   await db.prepare("CREATE TABLE IF NOT EXISTS article_campaign_daily (day TEXT NOT NULL, slug TEXT NOT NULL, source TEXT NOT NULL, campaign TEXT NOT NULL, total INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(day,slug,source,campaign))").run();
   await db.prepare("INSERT INTO article_campaign_daily(day,slug,source,campaign,total) VALUES(date('now'),?,?,?,1) ON CONFLICT(day,slug,source,campaign) DO UPDATE SET total=total+1").bind(slug,source,campaign).run();
  }
  return reply(204);
 }catch{return reply(503);}
}
