'use strict';
document.querySelectorAll('[data-path]').forEach(button=>button.addEventListener('click',()=>{
 const group=button.dataset.path.split('-')[0];
 document.querySelectorAll('[data-path]').forEach(b=>{if(b.dataset.path.startsWith(group+'-'))b.setAttribute('aria-pressed',String(b===button));});
 document.querySelectorAll('[data-path-panel]').forEach(p=>{if(p.dataset.pathPanel.startsWith(group+'-'))p.hidden=p.dataset.pathPanel!==button.dataset.path;});
}));
document.querySelectorAll('[data-check]').forEach(input=>input.addEventListener('change',()=>{
 const id=input.dataset.check,items=[...document.querySelectorAll('[data-check="'+id+'"]:checked')].map(v=>v.value);
 document.querySelector('[data-check-output="'+id+'"]').textContent=items.length?'Your question list: '+items.join(' · ')+'. Nothing sent or reserved.':'Nothing selected. This list stays on this page.';
}));
