#!/usr/bin/env node
/* Трёхстороннее слияние каталога: база (последняя синхронизация) + ПК (Яндекс Диск) + сайт (GitHub).
   node tools/sync.js BASE.js PC.js GH.js OUT.js REPORT.json
   Правило: если изменилась только одна сторона — берётся она; если обе по-разному — берётся сайт (GitHub),
   а версия с ПК записывается в отчёт как конфликт. Сравнение по элементам: meta, sections, acts, items (по id). */
const fs=require('fs');
const [,,fBase,fPc,fGh,fOut,fRep]=process.argv;
const load=f=>{ const t=fs.readFileSync(f,'utf8'); const i=t.indexOf('window.COLLECTION = '); return {head:t.slice(0,i), data:JSON.parse(t.slice(i+20, t.lastIndexOf(';')))}; };
const B=load(fBase).data, P=load(fPc), G=load(fGh).data;
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const rep={pc:[],gh:[],conflicts:[],deleted:[]};
function pick(key,b,p,g){
  if(eq(p,g)) return g;
  if(eq(b,p)) { if(g!==undefined||b!==undefined) rep.gh.push(key); return g; }
  if(eq(b,g)) { rep.pc.push(key); return p; }
  rep.conflicts.push({key, pc:p, gh:g}); return g!==undefined?g:p;
}
function mergeList(name,keyf){
  const mb=new Map((B[name]||[]).map(x=>[keyf(x),x])), mp=new Map((P.data[name]||[]).map(x=>[keyf(x),x])), mg=new Map((G[name]||[]).map(x=>[keyf(x),x]));
  const order=[]; const seen=new Set();
  const push=k=>{ if(!seen.has(k)){ seen.add(k); order.push(k);} };
  // порядок: как на сайте, затем новые с ПК на место после соседа
  (G[name]||[]).forEach(x=>push(keyf(x)));
  const pcList=(P.data[name]||[]).map(keyf);
  pcList.forEach((k,i)=>{ if(!seen.has(k)){ const prev=pcList.slice(0,i).reverse().find(x=>seen.has(x)); const pos=prev?order.indexOf(prev)+1:0; order.splice(pos,0,k); seen.add(k);} });
  const out=[];
  for(const k of order){
    const v=pick(name+':'+k, mb.get(k), mp.get(k), mg.get(k));
    if(v===undefined){ rep.deleted.push(name+':'+k); continue; }
    out.push(v);
  }
  return out;
}
const M={...G};
M.meta=pick('meta',B.meta,P.data.meta,G.meta);
M.sections=mergeList('sections',x=>x.id);
M.acts=mergeList('acts',x=>x.id);
M.items=mergeList('items',x=>x.id);
const ids={}; M.items.forEach(i=>ids[i.id]=(ids[i.id]||0)+1);
rep.duplicateIds=Object.keys(ids).filter(k=>ids[k]>1);
rep.changed=!eq(M,G)||!eq(M,P.data); rep.toGitHub=!eq(M,G); rep.toPC=!eq(M,P.data);
// фото, на которые ссылается каталог
rep.photos=[...new Set(M.items.flatMap(i=>i.variants.map(v=>v.photo)).filter(p=>p&&/^photos\//.test(p)))];
rep.files=[...new Set(M.acts.map(a=>a.file).filter(Boolean))];
fs.writeFileSync(fOut, P.head+'window.COLLECTION = '+JSON.stringify(M,null,1)+';\n');
fs.writeFileSync(fRep, JSON.stringify(rep,null,1));
console.log(JSON.stringify({toGitHub:rep.toGitHub,toPC:rep.toPC,pc:rep.pc.length,gh:rep.gh.length,conflicts:rep.conflicts.length,deleted:rep.deleted,duplicateIds:rep.duplicateIds}));
