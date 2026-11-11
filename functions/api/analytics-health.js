// Reports only whether the replacement analytics secret is bound in the deployed environment.
// Never returns secret values, lengths, hashes, or visitor data.
export const onRequestGet = ({env}) => new Response(JSON.stringify({
  replacementSecretActive: Boolean(env.EP_NEWS_ANALYTICS_KEY),
  analyticsConfigured: Boolean(env.EP_NEWS_ANALYTICS_KEY || env.ANALYTICS_DASHBOARD_TOKEN),
  databaseBound: Boolean(env.EP_VISITS_DB)
}), {headers: {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
