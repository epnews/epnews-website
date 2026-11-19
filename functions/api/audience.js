// Optional first-party audience estimates. No IP, UA, raw referrer or fingerprint stored.
const reply=(status)=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slugPattern=/^[a-z0-9-]{1,120}$/;
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403);
 if(request.headers.get('Sec-GPC')==='1'||request.headers.get('DNT')==='1')return reply(204);
 if(!env.EP_VISITS_DB)return reply(503);
 try{
  const raw=await request.text();if(raw.length>512)return reply(413);
  const {browser,session,kind,slug}=JSON.parse(raw);
  if(typeof browser!=='string'||typeof session!=='string'||typeof slug!=='string'||!uuid.test(browser)||!uuid.test(session)||!['session','article'].includes(kind)||!(slug==='home'||slugPattern.test(slug)))return reply(400);
  const db=env.EP_VISITS_DB, b=await digest(browser), s=await digest(browser+':'+session);
  await db.batch([
   db.prepare("CREATE TABLE IF NOT EXISTS audience_sessions_v2 (session TEXT PRIMARY KEY,browser TEXT NOT NULL,day TEXT NOT NULL,landing TEXT NOT NULL)"),
   db.prepare("CREATE TABLE IF NOT EXISTS audience_articles_v2 (day TEXT NOT NULL,browser TEXT NOT NULL,slug TEXT NOT NULL,PRIMARY KEY(day,browser,slug))"),
   db.prepare("CREATE INDEX IF NOT EXISTS audience_sessions_v2_day ON audience_sessions_v2(day)"),
   db.prepare("CREATE INDEX IF NOT EXISTS audience_articles_v2_day ON audience_articles_v2(day)")
  ]);
  const writes=[db.prepare("DELETE FROM audience_sessions_v2 WHERE day<date('now','-59 days')"),db.prepare("DELETE FROM audience_articles_v2 WHERE day<date('now','-59 days')"),db.prepare("INSERT OR IGNORE INTO audience_sessions_v2(session,browser,day,landing) VALUES(?,?,date('now'),?)").bind(s,b,slug)];
  if(kind==='article')writes.push(db.prepare("INSERT OR IGNORE INTO audience_articles_v2(day,browser,slug) VALUES(date('now'),?,?)").bind(b,slug));
  await db.batch(writes);
  return reply(204);
 }catch{return reply(503);}
}
