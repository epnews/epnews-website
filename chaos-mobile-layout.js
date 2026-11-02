/* Mobile-only layout enhancement; preserves original data, selectors, IDs and needle. */
(()=>{'use strict';function init(){if(!window.matchMedia('(max-width:700px)').matches)return;const root=document.getElementById('chaos-dashboard');if(!root||root.dataset.mobileOrganized==='true')return;root.dataset.mobileOrganized='true';
const wrap=(node,title)=>{if(!node||node.closest('.chaos-mobile-drawer'))return;const d=document.createElement('details');d.className='chaos-mobile-drawer';const s=document.createElement('summary');s.textContent=title;d.append(s);node.parentNode.insertBefore(d,node);d.append(node);};
const gate=root.querySelector('#gate-alsi-operator-evidence');wrap(gate,'LATEST VERIFIED LNG EVIDENCE · DETAILS');
const recent=root.querySelector('.chaos-recent');wrap(recent,'LATEST INVESTIGATION UPDATES');
const comparison=root.querySelector('#soi-unga-restricted-comparison');wrap(comparison,'DIPLOMATIC VOTING COMPARISON · DETAILS');
const intro=root.querySelector(':scope > p');if(intro)intro.classList.add('chaos-mobile-intro');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();
