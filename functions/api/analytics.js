// Private EP News analytics. Configure ANALYTICS_DASHBOARD_TOKEN as a Cloudflare Pages secret.
// Requires HTTPS and never returns metrics without the correct token.
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function onRequestGet({request,env}){
  if(!env.ANALYTICS_DASHBOARD_TOKEN)return reply({error:'Dashboard secret not configured'},503);
  const supplied=request.headers.get('X-Analytics-Token')||'';
  const expected=env.ANALYTICS_DASHBOARD_TOKEN;
  const a=new TextEncoder().encode(supplied),b=new TextEncoder().encode(expected);
  let diff=a.length^b.length;
  for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a[i]||0)^(b[i]||0);
  if(diff!==0)return reply({error:'Unauthorized'},401);
  const db=env.EP_VISITS_DB;
  if(!db)return reply({error:'Database unavailable'},503);
  try{
    const visits=await db.prepare('SELECT total FROM site_visits WHERE id=1').first();
    const clicks=await db.prepare('SELECT placement,total FROM facebook_outbound_clicks').all();
    await db.prepare("CREATE TABLE IF NOT EXISTS analytics_daily (day TEXT NOT NULL, metric TEXT NOT NULL, placement TEXT NOT NULL DEFAULT '', total INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(day,metric,placement))").run();
    const daily=await db.prepare("SELECT day,metric,placement,total FROM analytics_daily WHERE day >= date('now','-29 days') ORDER BY day ASC").all();
    const byPlacement={header:0,homepage:0,footer:0,article:0};
    for(const row of clicks.results||[])if(Object.hasOwn(byPlacement,row.placement))byPlacement[row.placement]=Number(row.total)||0;
    const totalClicks=Object.values(byPlacement).reduce((a,b)=>a+b,0);
    const totalVisits=Number(visits?.total||0);
    return reply({totalVisits,totalClicks,clicksPer100Visits:totalVisits?Math.round(totalClicks/totalVisits*1000)/10:null,byPlacement,daily:daily.results||[],note:'Clicks per 100 visits is not a follower conversion rate. Daily history begins at deployment; dates use UTC. Diagnostic clicks excluded.'});
  }catch(e){console.error('Analytics dashboard error',e);return reply({error:'Analytics temporarily unavailable'},503);}
}
