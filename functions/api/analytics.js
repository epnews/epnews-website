// Private EP News analytics. Configure ANALYTICS_DASHBOARD_TOKEN as a Cloudflare Pages secret.
// Requires HTTPS and never returns metrics without the correct token.
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function onRequestGet({request,env}){
  const configuredToken=env.EP_ANALYTICS_READ_TOKEN||env.EP_NEWS_ANALYTICS_KEY||env.ANALYTICS_DASHBOARD_TOKEN;
  const tokens=[configuredToken,env.EP_ANALYTICS_COLLECTOR_TOKEN].filter(t=>typeof t==='string'&&t.length>0);
  if(!tokens.length)return reply({error:'Dashboard secret not configured'},503);
  const supplied=request.headers.get('X-Analytics-Token')||'';
  const a=new TextEncoder().encode(supplied);
  let matched=0;
  for(const expected of tokens){
    const b=new TextEncoder().encode(expected);
    let diff=a.length^b.length;
    for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a[i]||0)^(b[i]||0);
    matched|=Number(diff===0);
  }
  if(!matched)return reply({error:'Unauthorized'},401);
  const db=env.EP_VISITS_DB;
  if(!db)return reply({error:'Database unavailable'},503);
  try{
    const visits=await db.prepare('SELECT total FROM site_visits WHERE id=1').first();
    const clicks=await db.prepare('SELECT placement,total FROM facebook_outbound_clicks').all();

    const daily=await db.prepare("SELECT day,metric,placement,total FROM analytics_daily WHERE day >= date('now','-29 days') ORDER BY day ASC").all();
    // Optional new table: report empty until the first tracked read.
    const exists=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='article_reads_hourly'").first();
    const articleReads=exists?(await db.prepare("SELECT slug,SUM(total) AS total FROM article_reads_hourly WHERE hour>=strftime('%Y-%m-%dT00:00:00Z','now','-29 days') GROUP BY slug ORDER BY total DESC,slug LIMIT 100").all()).results: [];
    const referralSources=exists?(await db.prepare("SELECT source,SUM(total) AS total FROM article_reads_hourly WHERE hour>=strftime('%Y-%m-%dT00:00:00Z','now','-29 days') GROUP BY source").all()).results: [];
    const hourlyReads=exists?(await db.prepare("SELECT hour,SUM(total) AS total FROM article_reads_hourly WHERE hour>=strftime('%Y-%m-%dT00:00:00Z','now','-6 days') GROUP BY hour ORDER BY hour").all()).results: [];
    const articleDaily=exists?(await db.prepare("SELECT substr(hour,1,10) AS day,SUM(total) AS total FROM article_reads_hourly WHERE hour>=strftime('%Y-%m-%dT00:00:00Z','now','-29 days') GROUP BY day ORDER BY day").all()).results: [];
    // Preserve existing aggregates; export daily article/source counts without visitor identifiers.
    const articleReferralDaily=exists?(await db.prepare("SELECT substr(hour,1,10) AS day,slug,source,SUM(total) AS total FROM article_reads_hourly WHERE hour>=strftime('%Y-%m-%dT00:00:00Z','now','-29 days') GROUP BY day,slug,source ORDER BY day,slug,source").all()).results: [];
    const articleReferralCoverage=exists?await db.prepare("SELECT MIN(hour) AS firstRecordedHour,MAX(hour) AS lastRecordedHour FROM article_reads_hourly").first():null;
    const audienceExists=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='audience_sessions_v2'").first();
    const audience=audienceExists?{
      coverage:await db.prepare("SELECT MIN(day) AS firstDay,MAX(day) AS lastDay FROM audience_sessions_v2").first(),
      totals:await db.prepare("SELECT COUNT(*) AS tabSessions,COUNT(DISTINCT browser) AS uniqueBrowsers,COUNT(DISTINCT CASE WHEN browser IN (SELECT browser FROM audience_sessions_v2 GROUP BY browser HAVING COUNT(*)>1) THEN browser END) AS returningBrowsers FROM audience_sessions_v2 WHERE day>=date('now','-29 days')").first(),
      daily:(await db.prepare("SELECT day,COUNT(*) AS tabSessions,COUNT(DISTINCT browser) AS uniqueBrowsers FROM audience_sessions_v2 WHERE day>=date('now','-29 days') GROUP BY day ORDER BY day").all()).results,
      landing:(await db.prepare("SELECT landing,COUNT(*) AS tabSessions FROM audience_sessions_v2 WHERE day>=date('now','-29 days') GROUP BY landing ORDER BY tabSessions DESC,landing").all()).results,
      articles:(await db.prepare("SELECT slug,COUNT(DISTINCT browser) AS uniqueBrowsers FROM audience_articles_v2 WHERE day>=date('now','-29 days') GROUP BY slug ORDER BY uniqueBrowsers DESC,slug").all()).results,
      note:'Opt-in browser estimates only; tab sessions, not people; returning means multiple measured tabs in retained history; IDs rotate after 30 days; UTC; no historical backfill.'
    }:null;
    const byPlacement={header:0,homepage:0,footer:0,article:0};
    for(const row of clicks.results||[])if(Object.hasOwn(byPlacement,row.placement))byPlacement[row.placement]=Number(row.total)||0;
    const totalClicks=Object.values(byPlacement).reduce((a,b)=>a+b,0);
    const totalVisits=Number(visits?.total||0);
    return reply({totalVisits,totalClicks,clicksPer100Visits:totalVisits?Math.round(totalClicks/totalVisits*1000)/10:null,byPlacement,daily:daily.results||[],articleReads,referralSources,hourlyReads,articleDaily,articleReferralDaily,articleReferralCoverage,audience,note:'Clicks per 100 visits is not a follower conversion rate. Daily history begins at deployment; dates use UTC. Diagnostic clicks excluded.'});
  }catch(e){console.error('Analytics dashboard error',e);return reply({error:'Analytics temporarily unavailable'},503);}
}
