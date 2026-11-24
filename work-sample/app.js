'use strict';
const $ = id => document.getElementById(id);
const examples = {
  normal: 'Draft the launch checklist for Juniper Studio by 2026-12-04. Priority: normal.',
  invalid: 'Prepare the welcome guide for Harbor House. Priority: high.',
  'storage-failure': 'Outline the welcome guide for Harbor House by 2026-12-08. Priority: high.'
};
let token = '', review = null, busy = false;
function status(message, mode='') { $('status').textContent = message; $('status').className = 'status '+mode; }
function invalidate() {
  review = null; $('proposal').hidden = true; $('empty-review').hidden = false;
  $('approve').innerHTML='Approve &amp; save task <span aria-hidden="true">✓</span>';
  $('review-badge').textContent = 'WAITING'; $('step-review').classList.remove('active'); $('step-save').classList.remove('active');
}
function controls(value) {
  busy = value;
  for (const id of ['request','example','review','approve','refresh','clear','confirm-clear','cancel-clear']) $(id).disabled = value || !token;
}
const browserStore=new MannaBrowserDemo.Store();
async function api(path,body){
 if(path==='/api/session'){await browserStore.open();return {token:'browser-ready'};}
 if(path==='/api/tasks')return browserStore.tasks();
 if(path==='/api/review')return browserStore.review(body);
 if(path==='/api/approve')return browserStore.approve(body);
 throw new Error('Unsupported browser action. Nothing saved.');
}
async function loadTasks() {
  const data = await api('/api/tasks');
  $('count').textContent = data.tasks.length;
  $('tasks').replaceChildren();
  if (!data.tasks.length) { const p = document.createElement('p'); p.className='quiet'; p.textContent='No tasks saved yet. Review and approve a fictional request to create the first one.'; $('tasks').append(p); }
  for (const task of data.tasks) {
    const article=document.createElement('article'); article.className='task';
    const title=document.createElement('h3'); title.textContent=task.title;
    const due=document.createElement('div'); due.className='due'; due.textContent='Due '+task.due;
    const meta=document.createElement('div'); meta.className='meta'; meta.textContent=task.project+' · '+task.priority+' priority';
    const id=document.createElement('div'); id.className='task-id'; id.textContent=task.id+' · saved in this browser';
    article.append(title,due,meta,id); $('tasks').append(article);
  }
}
$('request').addEventListener('input',()=> { invalidate(); status('Request changed. Review it again before approving.'); });
$('example').addEventListener('change',()=> { $('request').value=examples[$('example').value]; invalidate(); status($('example').value==='storage-failure' ? 'Deliberate failure example: approval will test an IndexedDB transaction abort. Nothing will be saved.' : 'Scenario loaded. Review the request when ready.'); });
$('review').addEventListener('click',async()=> {
  if(busy) return; invalidate(); controls(true);
  try {
    review=await api('/api/review',{request:$('request').value,scenario:$('example').value==='storage-failure'?'storage-failure':'normal'});
    for(const field of ['title','project','due','priority']) $('p-'+field).textContent=review.proposal[field];
    $('proposal').hidden=false; $('empty-review').hidden=true; $('review-badge').textContent='NOT SAVED'; $('step-review').classList.add('active');
    $('scenario-note').textContent=review.scenario==='storage-failure'?'Deliberate test: approving will abort the browser storage transaction.':review.alreadySaved?'An identical task is already saved. Approval will return it without creating a duplicate.':'Check these details. Only your next click saves a task.';
    status('Review ready. No task has been saved.');
  } catch(error) { status(error.message,'error'); }
  finally { controls(false); }
});
$('approve').addEventListener('click',async()=> {
  if(busy || !review) return; controls(true);
  try {
    const result=await api('/api/approve',{reviewId:review.reviewId,fingerprint:review.fingerprint,approval:'APPROVE'});
    // A save and a subsequent queue refresh are different outcomes.
    $('review-badge').textContent=result.duplicate?'ALREADY SAVED':'SAVED'; $('step-save').classList.add('active');
    $('scenario-note').textContent='This task is saved. Approving this review again returns the same task without creating a duplicate.';
    $('approve').innerHTML='Check existing task <span aria-hidden="true">↻</span>';
    status(result.message,'success');
    try { await loadTasks(); } catch { status(result.message+' The queue could not refresh; check it again before retrying.','success'); }
  } catch(error) { status(error.message,'error'); }
  finally { controls(false); }
});
$('refresh').addEventListener('click',async()=> {
  if(busy) return; controls(true);
  try { await loadTasks(); status('Saved queue read from the browser storage.'); }
  catch(error) { status(error.message,'error'); }
  finally { controls(false); }
});
$('clear').addEventListener('click',()=>{$('clear-panel').hidden=false;$('confirm-clear').focus();});
$('cancel-clear').addEventListener('click',()=>{$('clear-panel').hidden=true;$('clear').focus();});
$('confirm-clear').addEventListener('click',async()=>{
 if(busy)return;controls(true);
 try{await browserStore.clear();invalidate();await loadTasks();$('clear-panel').hidden=true;status('Demo tasks cleared from this browser.','success');}
 catch(error){status(error.message,'error');}finally{controls(false);if($('clear-panel').hidden)$('clear').focus();}
});
(async()=> {
  try { const session=await api('/api/session'); token=session.token; await loadTasks(); status('Browser storage ready. Nothing is saved until you approve.'); }
  catch(error) { token=''; status(error.message,'error'); }
  finally { controls(false); }
})();
