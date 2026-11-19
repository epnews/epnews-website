import {automaticReading} from './analytics-policy.js';
const reply=status=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403);
 if(!automaticReading(request,env))return reply(403);
 if(!env.EP_VISITS_DB)return reply(503);
 try{
 const raw=await request.text();if(raw.length>512)return reply(413);
 const {slug,seconds,depth}=JSON.parse(raw);
 if(typeof slug!=='string'||!/^[a-z0-9-]{1,120}$/.test(slug)||!Number.isInteger(seconds)||seconds<1||seconds>1800||!Number.isInteger(depth)||depth<0||depth>100)return reply(400);
 const db=env.EP_VISITS_DB;
 await db.batch([
 db.prepare("CREATE TABLE IF NOT EXISTS reading_aggregate_v2(day TEXT NOT NULL,slug TEXT NOT NULL,measuredViews INTEGER NOT NULL,totalSeconds INTEGER NOT NULL,engagedViews INTEGER NOT NULL,depth25 INTEGER NOT NULL,depth50 INTEGER NOT NULL,depth75 INTEGER NOT NULL,depth100 INTEGER NOT NULL,PRIMARY KEY(day,slug))"),
 db.prepare("DELETE FROM reading_aggregate_v2 WHERE day<date('now','-29 days')"),
 db.prepare("INSERT INTO reading_aggregate_v2 VALUES(date('now'),?,1,?,?,?,?,?,?) ON CONFLICT(day,slug) DO UPDATE SET measuredViews=measuredViews+1,totalSeconds=totalSeconds+excluded.totalSeconds,engagedViews=engagedViews+excluded.engagedViews,depth25=depth25+excluded.depth25,depth50=depth50+excluded.depth50,depth75=depth75+excluded.depth75,depth100=depth100+excluded.depth100").bind(slug,seconds,Number(seconds>=30),Number(depth>=25),Number(depth>=50),Number(depth>=75),Number(depth>=100))
 ]);return reply(204);
 }catch{return reply(503);}
}
