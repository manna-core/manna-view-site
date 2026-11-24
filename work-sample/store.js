'use strict';
// Fictional browser-only adapter. No fetch, model, MCP, server database or cookies.
((root)=>{
 const DB_NAME='manna-public-work-sample-v1',REFERENCE=Date.UTC(2026,10,24),YEAR=365*86400000,TTL=300000;
 const fail=message=>new Error(message);
 function extract(request){
  if(typeof request!=='string'||request.length<1||request.length>500)throw fail('Nothing saved. Use a fictional request of 1–500 characters.');
  const m=/^([A-Za-z][A-Za-z0-9 ,\-]{3,119}) for (Juniper Studio|Harbor House|Orion Workshop) by (\d{4}-\d{2}-\d{2})\. Priority: (low|normal|high)\.$/.exec(request.trim());
  if(!m)throw fail('Nothing saved. Include a task, fictional project, date and priority using the example format.');
  const date=new Date(m[3]+'T00:00:00Z');
  if(!Number.isFinite(+date)||date.toISOString().slice(0,10)!==m[3])throw fail('Nothing saved. That calendar date does not exist.');
  if(+date<REFERENCE||+date>REFERENCE+YEAR)throw fail('Nothing saved. Choose a date within one year after November 24, 2026.');
  return {title:m[1].trim(),project:m[2],due:m[3],priority:m[4]};
 }
 async function fingerprint(p){const bytes=await root.crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(p)));return [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('');}
 class Store{
  constructor({clock=()=>Date.now(),name=DB_NAME}={}){this.clock=clock;this.name=name;this.reviews=new Map();this.db=null;}
  async open(){
   if(!root.indexedDB)throw fail('Browser storage is unavailable. No save is confirmed.');
   this.db=await new Promise((resolve,reject)=>{
    const r=root.indexedDB.open(this.name,1);
    r.onupgradeneeded=()=>{const db=r.result;db.createObjectStore('tasks',{keyPath:'fingerprint'});const meta=db.createObjectStore('meta',{keyPath:'id'});meta.put({id:'state',revision:0});};
    r.onsuccess=()=>{r.result.onversionchange=()=>r.result.close();resolve(r.result);};
    r.onerror=()=>reject(fail('Browser storage could not open. No save is confirmed.'));
    r.onblocked=()=>reject(fail('Another tab is blocking browser storage. Close it and reload. No save is confirmed.'));
   });return this;
  }
  run(mode,work){return new Promise((resolve,reject)=>{
   if(!this.db)return reject(fail('Browser storage is unavailable. No save is confirmed.'));
   let tx,result,reason;
   try{tx=this.db.transaction(['tasks','meta'],mode);work(tx,value=>{result=value;},message=>{reason=message;tx.abort();});}
   catch{if(tx)try{tx.abort();}catch{}return reject(fail('Browser storage failed. No save is confirmed; check saved tasks before retrying.'));}
   tx.oncomplete=()=>resolve(result);
   tx.onabort=()=>reject(fail(reason||'Browser storage failed. Nothing was saved. Check storage permissions or available space.'));
   tx.onerror=()=>{};
  });}
  async tasks(){return this.run('readonly',(tx,done)=>{let tasks,revision;const finish=()=>{if(tasks&&revision!==undefined)done({tasks:tasks.map(({fingerprint,...task})=>task),revision});};tx.objectStore('tasks').getAll().onsuccess=e=>{tasks=e.target.result;finish();};tx.objectStore('meta').get('state').onsuccess=e=>{revision=e.target.result?.revision||0;finish();};});}
  async review(body){
   if(!body||!['normal','storage-failure'].includes(body.scenario))throw fail('Nothing saved. Choose a supported scenario.');
   const proposal=extract(body.request),digest=await fingerprint(proposal),snapshot=await this.tasks(),now=this.clock();
   for(const [id,r]of this.reviews)if(now-r.created>TTL||now<r.created)this.reviews.delete(id);
   if(this.reviews.size>=128)throw fail('Too many open reviews. Wait five minutes. Nothing saved.');
   const id=[...root.crypto.getRandomValues(new Uint32Array(4))].map(x=>x.toString(16)).join('-');
   this.reviews.set(id,{fingerprint:digest,proposal,scenario:body.scenario,revision:snapshot.revision,created:now});
   return {reviewId:id,fingerprint:digest,proposal,scenario:body.scenario,alreadySaved:snapshot.tasks.some(t=>t.id==='TASK-'+digest.slice(0,12).toUpperCase())};
  }
  async approve(body){
   const r=this.reviews.get(body?.reviewId);
   if(body?.approval!=='APPROVE'||!r||body.fingerprint!==r.fingerprint)throw fail('Nothing saved. Explicit approval must match a reviewed request.');
   const age=this.clock()-r.created;if(age<0||age>TTL)throw fail('Nothing saved. This review expired; review the request again.');
   return this.run('readwrite',(tx,done,abort)=>{
    const tasks=tx.objectStore('tasks'),meta=tx.objectStore('meta');
    tasks.get(r.fingerprint).onsuccess=e=>{
     if(e.target.result){if(r.scenario==='storage-failure')return abort('Nothing saved. The deliberate IndexedDB failure test aborted the transaction. Your queue is unchanged.');const {fingerprint,...task}=e.target.result;done({saved:false,duplicate:true,task,message:'Already saved in this browser. The same task was returned; no duplicate was created.'});return;}
     meta.get('state').onsuccess=m=>{
      const revision=m.target.result?.revision||0;
      if(revision!==r.revision)return abort('Nothing saved. The task queue changed; review the request again.');
      tasks.count().onsuccess=c=>{
       if(c.target.result>=100)return abort('Nothing saved. This browser’s fictional queue is full. Clear demo tasks to start again.');
       const task={id:'TASK-'+r.fingerprint.slice(0,12).toUpperCase(),...r.proposal,savedAt:new Date(this.clock()).toISOString()};
       const write=tasks.add({...task,fingerprint:r.fingerprint});
       write.onsuccess=()=>{
        if(r.scenario==='storage-failure')return abort('Nothing saved. The deliberate IndexedDB failure test aborted the transaction. Your queue is unchanged.');
        meta.put({id:'state',revision:revision+1});done({saved:true,duplicate:false,task,message:'Task saved in this browser. Reload this page to check it persists.'});
       };
      };
     };
    };
   });
  }
  async clear(){await this.run('readwrite',(tx,done)=>{const meta=tx.objectStore('meta');meta.get('state').onsuccess=e=>{tx.objectStore('tasks').clear();meta.put({id:'state',revision:(e.target.result?.revision||0)+1});done(true);};});this.reviews.clear();}
 }
 root.MannaBrowserDemo={Store,extract,DB_NAME};
})(globalThis);
