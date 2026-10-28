// Anonymous aggregate counts of clicks from EP News to its Facebook page.
// Reuses EP_VISITS_DB; stores no IP addresses, cookies, or visitor identifiers.
const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const respond = (body,status=200) => new Response(JSON.stringify(body),{status,headers});
const placements = new Set(['header','homepage','footer','article','diagnostic']);
async function ensureTable(db) {
  await db.prepare("CREATE TABLE IF NOT EXISTS facebook_outbound_clicks (placement TEXT PRIMARY KEY, total INTEGER NOT NULL DEFAULT 0)").run();
}
export async function onRequestPost({request,env}) {
  if (!env.EP_VISITS_DB) return respond({error:'Analytics database not configured'},503);
  const origin=request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return respond({error:'Forbidden'},403);
  let data;
  try { data=JSON.parse(await request.text()); } catch { return respond({error:'Invalid JSON'},400); }
  if (!data || !placements.has(data.placement)) return respond({error:'Invalid placement'},400);
  try {
    await ensureTable(env.EP_VISITS_DB);
    await env.EP_VISITS_DB.prepare("INSERT INTO facebook_outbound_clicks (placement,total) VALUES (?,1) ON CONFLICT(placement) DO UPDATE SET total=total+1").bind(data.placement).run();
    await env.EP_VISITS_DB.prepare("CREATE TABLE IF NOT EXISTS analytics_daily (day TEXT NOT NULL, metric TEXT NOT NULL, placement TEXT NOT NULL DEFAULT '', total INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(day,metric,placement))").run();
    await env.EP_VISITS_DB.prepare("INSERT INTO analytics_daily(day,metric,placement,total) VALUES(date('now'),'facebook',?,1) ON CONFLICT(day,metric,placement) DO UPDATE SET total=total+1").bind(data.placement).run();
    return respond({ok:true});
  } catch(error) { console.error('Facebook click counter error',error);return respond({error:'Counter temporarily unavailable'},503); }
}
export async function onRequestGet({env}) {
  if (!env.EP_VISITS_DB) return respond({error:'Analytics database not configured'},503);
  try {
    await ensureTable(env.EP_VISITS_DB);
    const rows=await env.EP_VISITS_DB.prepare("SELECT placement,total FROM facebook_outbound_clicks ORDER BY placement").all();
    const byPlacement=Object.fromEntries(placements.values().map(p=>[p,0]));
    for(const row of rows.results||[]) if(placements.has(row.placement)) byPlacement[row.placement]=Number(row.total)||0;
    return respond({total:Object.entries(byPlacement).filter(([key])=>key!=='diagnostic').reduce((sum,[,count])=>sum+count,0),byPlacement,metric:'outbound link clicks, not Facebook follows; diagnostic excluded from total'});
  } catch(error) { console.error('Facebook click report error',error);return respond({error:'Counter temporarily unavailable'},503); }
}
