// Preview-only EP News comments. Requires a SEPARATE D1 binding EP_COMMENTS_DB
// and EP_COMMENTS_PREVIEW_ENABLED=true on the preview environment only.
// Never bind the production visitor database to this endpoint.
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const validArticle=s=>typeof s==="string"&&/^[a-z0-9-]{1,100}$/.test(s);
const badWords=/\b(?:fuck|fucking|shit|bitch|cunt|nigger|faggot)\b/i;
const links=/(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|net|org|ru|xyz)\b)/i;
function preview(context){
 const host=new URL(context.request.url).hostname;
 return context.env.EP_COMMENTS_PREVIEW_ENABLED==="true"&&host!=="epnews.pages.dev"&&host!=="www.epnews.pages.dev"&&!!context.env.EP_COMMENTS_DB;
}
async function setup(db){
 await db.prepare("CREATE TABLE IF NOT EXISTS reader_comments (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id TEXT NOT NULL, parent_id INTEGER, display_name TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, status TEXT NOT NULL DEFAULT 'visible', FOREIGN KEY(parent_id) REFERENCES reader_comments(id))").run();
 await db.prepare("CREATE INDEX IF NOT EXISTS reader_comments_article ON reader_comments(article_id,status,created_at)").run();
 await db.prepare("CREATE TABLE IF NOT EXISTS comment_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, comment_id INTEGER NOT NULL, reason TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(comment_id) REFERENCES reader_comments(id))").run();
}
async function handler(ctx){
 if(!preview(ctx))return json({error:"Comments preview unavailable"},503);
 const db=ctx.env.EP_COMMENTS_DB;
 try{
 await setup(db);
 if(ctx.request.method==="GET"){
  const article=new URL(ctx.request.url).searchParams.get("article");
  if(!validArticle(article))return json({error:"Invalid article"},400);
  const r=await db.prepare("SELECT id,parent_id,display_name,body,created_at FROM reader_comments WHERE article_id=? AND status='visible' ORDER BY id ASC LIMIT 100").bind(article).all();
  return json({comments:r.results||[]});
 }
 if(ctx.request.method!=="POST")return json({error:"Method not allowed"},405);
 if(Number(ctx.request.headers.get("content-length")||0)>4096)return json({error:"Too large"},413);
 const body=await ctx.request.json().catch(()=>null);
 if(!body||typeof body!=="object")return json({error:"Invalid request"},400);
 if(body.action==="report"){
  const id=Number(body.comment_id),reason=String(body.reason||"inappropriate").slice(0,100);
  if(!Number.isSafeInteger(id)||id<1)return json({error:"Invalid comment"},400);
  const existing=await db.prepare("SELECT id FROM reader_comments WHERE id=? AND status='visible'").bind(id).first();
  if(!existing)return json({error:"Comment not found"},404);
  await db.prepare("INSERT INTO comment_reports(comment_id,reason) VALUES(?,?)").bind(id,reason).run();
  return json({ok:true},201);
 }
 const article=body.article,name=typeof body.name==="string"?body.name.trim():"",message=typeof body.message==="string"?body.message.trim():"";
 if(!validArticle(article)||name.length<2||name.length>40||message.length<3||message.length>1200)return json({error:"Check name and comment length"},400);
 if(badWords.test(message)||badWords.test(name)||links.test(message))return json({error:"Comment held by language or link filter"},422);
 const parent=body.parent_id==null?null:Number(body.parent_id);
 if(parent!==null){
  if(!Number.isSafeInteger(parent)||parent<1)return json({error:"Invalid reply"},400);
  const p=await db.prepare("SELECT id FROM reader_comments WHERE id=? AND article_id=? AND status='visible'").bind(parent,article).first();
  if(!p)return json({error:"Reply target not found"},404);
 }
 // Basic per-client cooldown using a cookie; NOT robust against malicious clients.
 const cookies=ctx.request.headers.get("cookie")||"";
 const match=cookies.match(/(?:^|;\s*)ep_comment_last=(\d+)/);
 const now=Math.floor(Date.now()/1000);
 if(match&&now-Number(match[1])<30)return json({error:"Please wait before posting again"},429);
 const result=await db.prepare("INSERT INTO reader_comments(article_id,parent_id,display_name,body) VALUES(?,?,?,?)").bind(article,parent,name,message).run();
 const response=json({ok:true,id:result.meta.last_row_id},201);
 response.headers.append("Set-Cookie",`ep_comment_last=${now}; Path=/api/comments; Max-Age=30; SameSite=Strict; Secure; HttpOnly`);
 return response;
 }catch(err){console.error("Comments preview error",err);return json({error:"Comments unavailable"},503)}
}
export const onRequestGet=handler;
export const onRequestPost=handler;
