// Counts homepage visits using a Cloudflare D1 database.
// Counts one visit per browser tab session, not unique people or page views.
// Requires D1 binding: EP_VISITS_DB. No IPs, identities, or user agents are stored.
const headers = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff"
};
const respond = (data, status = 200) => new Response(JSON.stringify(data), {status, headers});
async function ensureTable(db) {
  await db.prepare("CREATE TABLE IF NOT EXISTS site_visits (id INTEGER PRIMARY KEY CHECK (id = 1), total INTEGER NOT NULL DEFAULT 0)").run();
  await db.prepare("INSERT OR IGNORE INTO site_visits (id, total) VALUES (1, 0)").run();
}
async function handler(context, increment) {
  const db = context.env.EP_VISITS_DB;
  if (!db) return respond({error:"Counter database not configured"},503);
  try {
    await ensureTable(db);
    if (increment) {
      await db.prepare("UPDATE site_visits SET total = total + 1 WHERE id = 1").run();
    }
    const row = await db.prepare("SELECT total FROM site_visits WHERE id = 1").first();
    return respond({total: Number(row?.total || 0), label:"visits since activation"});
  } catch (error) {
    console.error("Visitor counter error", error);
    return respond({error:"Counter temporarily unavailable"},503);
  }
}
export const onRequestGet = context => handler(context, false);
export const onRequestPost = context => handler(context, true);
