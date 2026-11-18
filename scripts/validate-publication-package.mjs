import crypto from 'node:crypto';
export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function validateDraft(d) {
 const errors=[]; const check=(ok,msg)=>{if(!ok)errors.push(msg)};
 const s=d?.story, e=d?.evidence, im=d?.image_import;
 check(/^[a-z0-9-]{1,120}$/.test(d?.slug||''),'Invalid slug');
 check(s?.id===d?.slug && s?.status==='published','Story identity/status mismatch');
 for(const k of ['title','deck','category','categoryLabel','type','author','publishedAt','updatedAt'])check(typeof s?.[k]==='string' && s[k].trim(),'Missing story '+k);
 check(Array.isArray(s?.body)&&s.body.length>0&&s.body.every(x=>typeof x==='string'&&x.trim()),'Missing article body');
 check(Array.isArray(s?.sources)&&s.sources.length>0,'Missing sources');
 for(const source of Array.isArray(s?.sources)?s.sources:[]){
  check(typeof source?.url==='string'&&/^https?:\/\//.test(source.url)&&source.label,'Invalid source');
  const item=e?.sources?.find?.(x=>x.url===source?.url);
  check(item?.verified===true&&Array.isArray(item.claims)&&item.claims.length&&item.checked_at&&item.evidence_excerpt,'Missing source evidence: '+source?.url);
 }
 check(/^assets\/images\/[a-zA-Z0-9_.-]+\.(png|jpe?g|webp)$/.test(im?.path||''),'Invalid image path');
 check(s?.image?.src===im?.path,'Story image path mismatch');
 check(/^https:\/\/drive\.google\.com\/uc\?export=download&id=[A-Za-z0-9_-]+$/.test(im?.url||''),'Invalid Drive URL');
 check(e?.image?.original_source&&e.image.attribution&&e.image.rights,'Missing image provenance');
 check(e?.image?.authentic===true||(e?.image?.authentic===false&&e.image.kind==='ai-generated-editorial-illustration'&&/AI.generated/i.test(s?.image?.credit||'')&&/AI.generated/i.test(s?.image?.alt||'')),'Image authenticity/disclosure invalid');
 check(d?.publisher_approved!==true&&e?.publisher_approved!==true,'Draft must not assert publisher approval');
 check(d?.reel==null,'Website-only preparation');
 return errors;
}
