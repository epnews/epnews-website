// Reader discussion UI, intentionally only active on Cloudflare preview URLs.
(function(){
 if(location.hostname==="epnews.pages.dev"||location.hostname==="www.epnews.pages.dev")return;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function mount(){
  const m=location.pathname.match(/^\/article\/([a-z0-9-]+)\/?$/) || location.hash.match(/^#article\/([a-z0-9-]+)$/);
  const article=m&&m[1],shell=document.querySelector('#route-view .article-shell')||document.querySelector('[data-ep-comments-article]');
  if(!article||!shell)return;
  const existing=shell.querySelector('#reader-discussion');
  if(existing&&existing.dataset.initialized==='yes')return;
  const section=existing||document.createElement('section');section.id='reader-discussion';section.className='reader-discussion';section.dataset.initialized='yes';
  section.innerHTML='<h2>Reader Discussion <small>TEST PREVIEW</small></h2><p>Open discussion. Profanity and links are filtered. Comments are visible to other preview visitors.</p><div id="reader-comments">Loading comments…</div><form id="reader-form"><label>Display name <input name="name" maxlength="40" minlength="2" required></label><label>Comment <textarea name="message" maxlength="1200" minlength="3" required></textarea></label><input type="hidden" name="parent_id"><button type="submit">Post comment</button><button type="button" id="reader-cancel" hidden>Cancel reply</button><p id="reader-feedback" role="status"></p></form>';
  if(!existing){const target=shell.querySelector('.facebook-discussion');if(target)target.before(section);else shell.append(section);}
  const list=section.querySelector('#reader-comments'),form=section.querySelector('form'),feedback=section.querySelector('#reader-feedback');
  async function load(){
   try{
    const res=await fetch('/api/comments?article='+encodeURIComponent(article),{cache:'no-store'}),data=await res.json();
    if(!res.ok)throw Error(data.error||'Unavailable');
    list.innerHTML=data.comments.length?data.comments.map(c=>`<div class="reader-comment" style="margin-left:${c.parent_id?'1.5rem':'0'}"><strong>${escape(c.display_name)}</strong> <time>${escape(c.created_at)}</time><p>${escape(c.body)}</p><button type="button" data-reply="${c.id}">Reply</button> <button type="button" data-report="${c.id}">Report</button></div>`).join(''):'No comments yet. Start the discussion.';
   }catch(e){list.textContent='Comments unavailable: '+e.message}
  }
  list.addEventListener('click',async e=>{
   const reply=e.target.closest('[data-reply]'),report=e.target.closest('[data-report]');
   if(reply){form.elements.parent_id.value=reply.dataset.reply;section.querySelector('#reader-cancel').hidden=false;form.elements.message.focus()}
   if(report){try{const r=await fetch('/api/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'report',comment_id:Number(report.dataset.report),reason:'reader report'})});feedback.textContent=r.ok?'Report received.':'Unable to report.'}catch{feedback.textContent='Unable to report.'}}
  });
  section.querySelector('#reader-cancel').onclick=()=>{form.elements.parent_id.value='';section.querySelector('#reader-cancel').hidden=true};
  form.addEventListener('submit',async e=>{
   e.preventDefault();feedback.textContent='Submitting…';
   try{
    const payload={article,name:form.elements.name.value,message:form.elements.message.value,parent_id:form.elements.parent_id.value?Number(form.elements.parent_id.value):null};
    const r=await fetch('/api/comments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),data=await r.json();
    if(!r.ok)throw Error(data.error||'Unable to post');
    form.elements.message.value='';form.elements.parent_id.value='';section.querySelector('#reader-cancel').hidden=true;feedback.textContent='Comment posted.';await load();
   }catch(e){feedback.textContent=e.message}
  });
  load();
 }
 const observer=new MutationObserver(()=>mount());
 // Article rendering replaces #route-view contents; watch nested replacements as well.
 observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('popstate',mount);window.addEventListener('hashchange',mount);mount();
})();
