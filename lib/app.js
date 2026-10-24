/* Каталог коллекции шевронов. Данные — data/collection.js, фото — photos/, тексты приказов — prikazy/. */
(function(){
"use strict";
if(!window.COLLECTION){ document.getElementById('app').innerHTML='<div class="wrap"><p class="sub" style="padding-block:40px">Не найден файл data/collection.js. Откройте index.html из папки коллекции целиком.</p></div>'; return; }
let S = window.COLLECTION;
let ORIGINAL = JSON.stringify(S);
const LOCAL = location.protocol === 'file:';
const FS = 'showDirectoryPicker' in window;
const CAN_EDIT = LOCAL || location.hash === '#admin';

const REGIONS = [["31","Белгородская область","Белгород","ЦФО"],["32","Брянская область","Брянск","ЦФО"],["33","Владимирская область","Владимир","ЦФО"],["36","Воронежская область","Воронеж","ЦФО"],["37","Ивановская область","Иваново","ЦФО"],["40","Калужская область","Калуга","ЦФО"],["44","Костромская область","Кострома","ЦФО"],["46","Курская область","Курск","ЦФО"],["48","Липецкая область","Липецк","ЦФО"],["50","Московская область","Моск. обл.","ЦФО"],["57","Орловская область","Орёл","ЦФО"],["62","Рязанская область","Рязань","ЦФО"],["67","Смоленская область","Смоленск","ЦФО"],["68","Тамбовская область","Тамбов","ЦФО"],["69","Тверская область","Тверь","ЦФО"],["71","Тульская область","Тула","ЦФО"],["76","Ярославская область","Ярославль","ЦФО"],["77","г. Москва","Москва","ЦФО"],["10","Республика Карелия","Карелия","СЗФО"],["11","Республика Коми","Коми","СЗФО"],["29","Архангельская область","Архангельск","СЗФО"],["83","Ненецкий АО","НАО","СЗФО"],["35","Вологодская область","Вологда","СЗФО"],["39","Калининградская область","Калининград","СЗФО"],["47","Ленинградская область","Лен. обл.","СЗФО"],["51","Мурманская область","Мурманск","СЗФО"],["53","Новгородская область","Новгород","СЗФО"],["60","Псковская область","Псков","СЗФО"],["78","г. Санкт-Петербург","Петербург","СЗФО"],["01","Республика Адыгея","Адыгея","ЮФО"],["08","Республика Калмыкия","Калмыкия","ЮФО"],["82","Республика Крым","Крым","ЮФО"],["23","Краснодарский край","Краснодар","ЮФО"],["30","Астраханская область","Астрахань","ЮФО"],["34","Волгоградская область","Волгоград","ЮФО"],["61","Ростовская область","Ростов","ЮФО"],["92","г. Севастополь","Севастополь","ЮФО"],["80","Донецкая Народная Республика","ДНР","ЮФО"],["81","Луганская Народная Республика","ЛНР","ЮФО"],["85","Запорожская область","Запорожье","ЮФО"],["84","Херсонская область","Херсон","ЮФО"],["05","Республика Дагестан","Дагестан","СКФО"],["06","Республика Ингушетия","Ингушетия","СКФО"],["07","Кабардино-Балкарская Республика","Кабардино-Балкария","СКФО"],["09","Карачаево-Черкесская Республика","Карачаево-Черкесия","СКФО"],["15","Республика Северная Осетия — Алания","Сев. Осетия","СКФО"],["20","Чеченская Республика","Чечня","СКФО"],["26","Ставропольский край","Ставрополь","СКФО"],["02","Республика Башкортостан","Башкортостан","ПФО"],["12","Республика Марий Эл","Марий Эл","ПФО"],["13","Республика Мордовия","Мордовия","ПФО"],["16","Республика Татарстан","Татарстан","ПФО"],["18","Удмуртская Республика","Удмуртия","ПФО"],["21","Чувашская Республика","Чувашия","ПФО"],["59","Пермский край","Пермь","ПФО"],["43","Кировская область","Киров","ПФО"],["52","Нижегородская область","Н. Новгород","ПФО"],["56","Оренбургская область","Оренбург","ПФО"],["58","Пензенская область","Пенза","ПФО"],["63","Самарская область","Самара","ПФО"],["64","Саратовская область","Саратов","ПФО"],["73","Ульяновская область","Ульяновск","ПФО"],["45","Курганская область","Курган","УФО"],["66","Свердловская область","Свердловск","УФО"],["72","Тюменская область","Тюмень","УФО"],["74","Челябинская область","Челябинск","УФО"],["86","Ханты-Мансийский АО — Югра","ХМАО","УФО"],["89","Ямало-Ненецкий АО","ЯНАО","УФО"],["04","Республика Алтай","Респ. Алтай","СФО"],["17","Республика Тыва","Тыва","СФО"],["19","Республика Хакасия","Хакасия","СФО"],["22","Алтайский край","Алтайский край","СФО"],["24","Красноярский край","Красноярск","СФО"],["38","Иркутская область","Иркутск","СФО"],["42","Кемеровская область — Кузбасс","Кузбасс","СФО"],["54","Новосибирская область","Новосибирск","СФО"],["55","Омская область","Омск","СФО"],["70","Томская область","Томск","СФО"],["03","Республика Бурятия","Бурятия","ДФО"],["14","Республика Саха (Якутия)","Якутия","ДФО"],["75","Забайкальский край","Забайкалье","ДФО"],["41","Камчатский край","Камчатка","ДФО"],["25","Приморский край","Приморье","ДФО"],["27","Хабаровский край","Хабаровск","ДФО"],["28","Амурская область","Амур","ДФО"],["49","Магаданская область","Магадан","ДФО"],["65","Сахалинская область","Сахалин","ДФО"],["79","Еврейская АО","ЕАО","ДФО"],["87","Чукотский АО","Чукотка","ДФО"]];
const FO_NAMES = {"ЦФО":"Центральный","СЗФО":"Северо-Западный","ЮФО":"Южный","СКФО":"Северо-Кавказский","ПФО":"Приволжский","УФО":"Уральский","СФО":"Сибирский","ДФО":"Дальневосточный"};
const REG = Object.fromEntries(REGIONS.map(r=>[r[0],{code:r[0],name:r[1],short:r[2],fo:r[3]}]));
const GROUPS = {ru:"Россия",foreign:"Иностранные государства",unofficial:"Неуставные знаки"};
const KINDS = ["Нарукавный","Нагрудный","Нашивка на головной убор","Другое"];
const STATUS_TXT = {have:"В коллекции",want:"Ищу"};
const ACT_STATUS = {active:"Действует",partial:"Действует частично",repealed:"Утратил силу",unknown:"Статус уточняется"};
const SHIELD = '<svg class="ph" viewBox="0 0 100 124" aria-hidden="true"><path d="M8 6h84v62c0 26-18 44-42 52C26 112 8 94 8 68z"/><text x="50" y="70">нет фото</text></svg>';
const TR = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};

let UI = {view:'katalog', section:'all', status:'all', q:'', edit:false, dirty:0, saving:false};
let dirHandle = null;
const pendingFiles = new Map(); // actId -> File (PDF приказа, ещё не записанный в папку)

/* ---------- сохранение на сайт (GitHub) ---------- */
const GH = Object.assign({owner:'davidov-s', repo:'kollekciya-shevronov', branch:'main'}, (S.meta && S.meta.github) || {});
const RAW = `https://raw.githubusercontent.com/${GH.owner}/${GH.repo}/${GH.branch}/`;
const TOKEN_KEY = 'kollekciya-gh-token';
const getToken = () => { try{ return localStorage.getItem(TOKEN_KEY) || ''; }catch(_){ return ''; } };
const setToken = v => { try{ v ? localStorage.setItem(TOKEN_KEY, v) : localStorage.removeItem(TOKEN_KEY); return true; }catch(_){ return false; } };
let dataSha = null, remoteState = '';   // remoteState: '', 'loading', 'ok', 'error'
async function gh(path, opts={}){
  const headers = {'Authorization':'Bearer '+getToken(), 'Accept':'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28'};
  if(opts.body) headers['Content-Type'] = 'application/json';
  const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/${path}`, {...opts, headers, cache:'no-store'});
  if(!r.ok){
    const msg = r.status===401 ? 'ключ GitHub недействителен или истёк'
      : (r.status===403 || r.status===404) ? 'у ключа нет доступа к репозиторию (нужно право Contents: Read and write)'
      : (r.status===409 || r.status===422) ? 'данные на сайте изменились с момента открытия страницы'
      : 'GitHub ответил '+r.status;
    const e = new Error(msg); e.status = r.status; throw e;
  }
  return r.status===204 ? null : r.json();
}
const encPath = p => p.split('/').map(encodeURIComponent).join('/');
function utf8ToB64(str){ const b=new TextEncoder().encode(str); let bin=''; for(let i=0;i<b.length;i+=0x8000) bin+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000)); return btoa(bin); }
function b64ToUtf8(b64){ const bin=atob(b64.replace(/\s/g,'')); const a=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return new TextDecoder().decode(a); }
const blobToB64 = blob => new Promise((res,rej)=>{ const r=new FileReader(); r.onerror=rej; r.onload=()=>res(String(r.result).split(',')[1]); r.readAsDataURL(blob); });
async function ghSha(path){ try{ return (await gh('contents/'+encPath(path)+'?ref='+GH.branch)).sha; }catch(e){ if(e.status===404) return null; throw e; } }
const ghPut = (path, b64, message, sha) => gh('contents/'+encPath(path), {method:'PUT', body:JSON.stringify({message, content:b64, branch:GH.branch, ...(sha?{sha}:{})})});
function parseCollection(text){ const pre='window.COLLECTION = '; const i=text.indexOf(pre); const j=text.lastIndexOf(';'); return JSON.parse(text.slice(i+pre.length, j)); }
async function loadRemote(){
  if(!getToken()) return;
  remoteState='loading';
  try{
    const j = await gh('contents/data/collection.js?ref='+GH.branch);
    let text = j.content ? b64ToUtf8(j.content) : '';
    if(!text){ const blob = await gh('git/blobs/'+j.sha); text = b64ToUtf8(blob.content); }
    const remote = parseCollection(text);
    dataSha = j.sha; remoteState='ok';
    if(!UI.dirty && JSON.stringify(remote)!==JSON.stringify(S)){ S = remote; ORIGINAL = JSON.stringify(S); }
  }catch(e){ remoteState='error'; toast('Не удалось загрузить данные с сайта: '+e.message); }
  render();
}
async function pushToGitHub(uploads){
  const when = today();
  for(const u of uploads) await ghPut(u.path, u.b64, `Файл ${u.path} (${when})`);
  const sha = dataSha || await ghSha('data/collection.js');
  const res = await ghPut('data/collection.js', utf8ToB64(serialize()), `Правка каталога (${when})`, sha);
  dataSha = res && res.content && res.content.sha || null;
}
function openTokenDialog(){
  const d=ensureDlg(); const has=!!getToken();
  d.innerHTML = `<form class="form" id="tok-ed" novalidate><h2>Ключ для сохранения на сайт</h2>
    <p class="hint" style="font-size:14px;margin:0">Ключ хранится только в этом браузере на этом устройстве и в данные коллекции не попадает. Как получить ключ — в файле instrukciya.html, раздел «Админ с телефона».</p>
    <div class="fld"><label for="t-key">Ключ GitHub (github_pat_…)</label><input id="t-key" type="password" autocomplete="off" value="" placeholder="${has?'ключ сохранён — вставьте новый, чтобы заменить':'вставьте ключ'}"></div>
    <div class="form-foot"><span id="t-err" style="color:var(--signal);margin-right:auto"></span>${has?'<button type="button" class="btn danger" id="t-del">Удалить ключ</button>':''}<button type="button" class="btn" data-close>Отмена</button><button type="submit" class="btn primary">Проверить и сохранить</button></div></form>`;
  if(!d.open) d.showModal();
}
async function commitToken(){
  const v=$('#t-key').value.trim(); const err=$('#t-err');
  if(!v){ err.textContent='Вставьте ключ.'; return; }
  const old=getToken();
  if(!setToken(v)){ err.textContent='Браузер не даёт сохранить ключ (частный режим?).'; return; }
  err.textContent='Проверяю…';
  try{ await gh('contents/data/collection.js?ref='+GH.branch); dlg.close(); toast('Ключ подключён'); loadRemote(); }
  catch(e){ setToken(old); err.textContent='Ключ не подошёл: '+e.message+'.'; }
}

const $ = (s,el=document)=>el.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plural = (n,a,b,c)=>{const m=n%10,h=n%100;return (m===1&&h!==11)?a:(m>=2&&m<=4&&(h<12||h>14))?b:c};
const fmtDate = d => { if(!d) return ''; const p=d.split('-'); return p.length===3 ? p[2]+'.'+p[1]+'.'+p[0] : d; };
const slug = s => String(s).toLowerCase().split('').map(c=>TR[c]!==undefined?TR[c]:c).join('').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'file';
const secById = id => S.sections.find(s=>s.id===id);
const actById = id => S.acts.find(a=>a.id===id);
const itemById = id => S.items.find(i=>i.id===id);
const photoOf = it => (it.variants.find(v=>v.photo)||{}).photo || '';
const qtyOf = it => it.variants.reduce((a,v)=>a+(+v.qty||0),0);
const spareOf = it => it.status==='have' ? it.variants.reduce((a,v)=>a+(+v.spare||0),0) : 0;
const showDonors = () => LOCAL || UI.edit || S.meta.showDonorsOnWeb !== false;
const today = () => { const d=new Date(); return String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear(); };
const stamp = () => { const d=new Date(), p=n=>String(n).padStart(2,'0'); return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds()); };
function markDirty(){ UI.dirty++; }
const OWN = () => S.meta.owner || {};
function contactLinks(){
  const o=OWN(), out=[];
  if(o.phone) out.push(`<a href="tel:${esc(o.phone.replace(/[^+\d]/g,''))}">${esc(o.phone)}</a>`);
  if(o.email) out.push(`<a href="mailto:${esc(o.email)}">${esc(o.email)}</a>`);
  if(o.telegram){ const h=o.telegram.replace(/^https?:\/\/t\.me\//,'').replace(/^@/,''); out.push(`<a href="https://t.me/${esc(h)}" target="_blank" rel="noopener">Telegram: @${esc(h)}</a>`); }
  if(o.other) out.push(`<span>${esc(o.other)}</span>`);
  return out;
}
function ownerBlock(){
  const o=OWN(), c=contactLinks();
  if(!o.name && !c.length) return UI.edit?'<section class="owner" id="owner"><div class="empty"><b>Владелец коллекции не указан</b><span>Заполните имя и контакты в «Настройках».</span></div></section>':'';
  return `<section class="owner" id="owner">
    <div class="owner-who"><div class="eyebrow">Владелец коллекции</div><h2>${esc(o.name||'')}</h2>${o.about?`<p class="muted">${esc(o.about)}</p>`:''}</div>
    <div class="owner-msg"><p>${esc(o.cta||'Если у вас есть шевроны для коллекции или вы хотите обменяться — свяжитесь со мной.')}</p>
      ${c.length?`<ul class="contacts">${c.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}</div>
  </section>`;
}
function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),3800); }
function download(name, data, type){
  const blob = data instanceof Blob ? data : new Blob([data],{type:type||'application/octet-stream'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500);
}

/* ---------- итоги ---------- */
function stats(){
  const have = S.items.filter(i=>i.status==='have');
  const guHave = S.items.filter(i=>i.section==='gu'&&i.status==='have').length;
  const countries = new Set(S.items.filter(i=>secById(i.section)?.group==='foreign'&&i.country).map(i=>i.country.trim().toLowerCase())).size;
  return {have:have.length, guHave, guAll:89, countries, want:S.items.filter(i=>i.status==='want').length, swap:S.items.reduce((a,i)=>a+spareOf(i),0)};
}

/* ---------- каркас ---------- */
function render(){
  const st = stats();
  const editBtn = CAN_EDIT ? `<button class="btn" id="b-edit" aria-pressed="${UI.edit}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>${UI.edit?'Режим редактирования':'Редактировать'}</button>` : '';
  $('#app').innerHTML = `
  <div class="wrap">
    <header class="top">
      <div>
        <div class="eyebrow">${esc(S.meta.eyebrow||'Коллекция знаков различия')}</div>
        <h1>${esc(S.meta.title)}</h1>
        <p class="sub">${esc(S.meta.subtitle||'')}</p>
        ${OWN().name?`<p class="sub owner-line">Собрание: ${esc(OWN().name)}</p>`:''}
      </div>
      <div class="actions">
        <button class="btn qrbtn" data-qrtoggle="1" aria-pressed="${UI.view==='qr'}" title="${UI.view==='qr'?'Скрыть QR-код':'Показать QR-код'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/></svg>QR-код</button>
        ${(OWN().name||contactLinks().length)?'<button class="btn" id="b-contact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>Связаться</button>':''}
        ${editBtn}
      </div>
    </header>
    <div class="stats" role="list">
      <div class="stat" role="listitem"><b>${st.have}</b><span>знаков в коллекции</span></div>
      <div class="stat" role="listitem"><b>${st.guHave}<small> из ${st.guAll}</small></b><span>субъектов РФ (ГУ)</span><div class="bar"><i style="width:${Math.round(st.guHave/st.guAll*100)}%"></i></div></div>
      <div class="stat" role="listitem"><b>${st.countries}</b><span>${plural(st.countries,'страна','страны','стран')}</span></div>
      <div class="stat" role="listitem"><b>${st.want}</b><span>в списке «Ищу»</span></div>
      ${st.swap?`<div class="stat" role="listitem"><b>${st.swap}</b><span>на обмен</span></div>`:''}
    </div>
    <nav class="tabs" role="tablist">
      ${[['katalog','Каталог'],['karta','Карта регионов'],['prikazy','Приказы'],['qr','QR-код']].map(([k,t])=>`<button class="tab" role="tab" data-go="${k}" aria-selected="${UI.view===k}">${t}</button>`).join('')}
    </nav>
    ${UI.edit?adminBar():''}
    <main id="view"></main>
    ${ownerBlock()}
    <footer>Описания знаков — по приказам МЧС России; статусы актов сверяйте с официальными источниками.${S.meta.updated?' Обновлено '+esc(S.meta.updated)+'.':''}</footer>
  </div>
  ${UI.dirty?`<div class="savebar"><span>Несохранённых изменений: ${UI.dirty}</span><button class="btn" id="b-discard">Отменить</button><button class="btn gold" id="b-save" ${UI.saving?'disabled':''}>${UI.saving?'Сохраняю…':(LOCAL&&FS?(getToken()?'Сохранить в папку и на сайт':'Сохранить в папку'):(getToken()?'Сохранить на сайт':'Скачать данные'))}</button></div>`:''}`;
  renderView();
}
function adminBar(){
  const tok = !!getToken();
  const site = tok ? (remoteState==='ok' ? 'Изменения сохраняются и на сайт.' : remoteState==='loading' ? 'Загружаю данные с сайта…' : 'Ключ сайта подключён.') : 'Сайт не подключён — изменения останутся только здесь.';
  const folder = LOCAL ? (dirHandle ? 'Папка выбрана.' : (FS ? 'При первом сохранении укажите папку коллекции.' : 'Браузер не умеет сохранять в папку.')) : '';
  const where = [folder, site].filter(Boolean).join(' ');
  return `<div class="adminbar"><b>Режим редактирования.</b><span class="sp">${where}</span>
    <button class="btn small" id="b-add">+ Знак</button>
    <button class="btn small" id="b-add-act">+ Приказ</button>
    <button class="btn small" id="b-add-sec">+ Раздел</button>
    <button class="btn small" id="b-csv">Таблица CSV</button>
    <button class="btn small" id="b-settings">Настройки</button>
    <button class="btn small" id="b-token">${tok?'Ключ сайта ✓':'Подключить сайт'}</button></div>`;
}
function renderView(){
  const v = $('#view');
  if(UI.view==='karta') v.innerHTML = viewMap();
  else if(UI.view==='prikazy') v.innerHTML = viewActs();
  else if(UI.view==='qr'){ v.innerHTML = viewQR(); drawQR(); }
  else v.innerHTML = viewCatalog();
}

/* ---------- каталог ---------- */
function filtered(){
  const q = UI.q.trim().toLowerCase();
  return S.items.filter(it=>{
    if(UI.status==='swap'){ if(!spareOf(it)) return false; }
    else if(UI.status!=='all' && it.status!==UI.status) return false;
    if(UI.section!=='all' && it.section!==UI.section) return false;
    if(q){
      const hay = [it.id,it.name,it.country,it.note,it.region&&REG[it.region]?.name,...it.variants.map(v=>(showDonors()?v.donor:'')+' '+v.label+' '+v.note)].join(' ').toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}
function card(it){
  const p = photoOf(it); const nv = it.variants.length;
  return `<button class="card ${it.status}" data-open="${esc(it.id)}">
    <div class="tile">${p?`<img src="${esc(p)}" alt="${esc(it.name)}" loading="lazy">`:SHIELD}${nv>1?`<span class="badge">×${nv}</span>`:''}${it.ref&&p?'<span class="refchip">образец</span>':''}</div>
    <div class="cmeta"><span class="inv">${esc(it.id)}</span>${it.status==='want'?'<span class="pill want">Ищу</span>':spareOf(it)?`<span class="pill swap">обмен ×${spareOf(it)}</span>`:''}</div>
    <div class="nm">${esc(it.name)}${it.country?` <span class="inv">· ${esc(it.country)}</span>`:''}</div>
  </button>`;
}
function viewCatalog(){
  const items = filtered();
  const counts = id => { const a=S.items.filter(i=>i.section===id); return a.filter(i=>i.status==='have').length+'/'+a.length; };
  let side = `<button class="sec" data-sec="all" aria-current="${UI.section==='all'}"><span>Все разделы</span><span class="n">${S.items.filter(i=>i.status==='have').length}/${S.items.length}</span></button>`;
  let opts = `<option value="all">Все разделы</option>`;
  for(const g of Object.keys(GROUPS)){
    side += `<h4>${GROUPS[g]}</h4>`; opts += `<optgroup label="${GROUPS[g]}">`;
    for(const s of S.sections.filter(s=>s.group===g)){
      side += `<button class="sec" data-sec="${esc(s.id)}" aria-current="${UI.section===s.id}"><span>${esc(s.title)}</span><span class="n">${counts(s.id)}</span></button>`;
      opts += `<option value="${esc(s.id)}" ${UI.section===s.id?'selected':''}>${esc(s.title)} (${counts(s.id)})</option>`;
    }
    opts += `</optgroup>`;
  }
  let body = '';
  for(const s of S.sections.filter(s=>UI.section==='all'||s.id===UI.section)){
    const list = items.filter(i=>i.section===s.id);
    const all = S.items.filter(i=>i.section===s.id);
    if(!list.length && UI.section==='all' && (all.length || !UI.edit)) continue;
    let inner;
    if(!list.length){
      inner = `<div class="empty"><b>${all.length?'Ничего не найдено':'Раздел пока пуст'}</b><span>${all.length?'Измените фильтр или строку поиска.':esc(s.hint||'Знаки этого раздела появятся здесь.')}</span>${UI.edit?`<button class="btn small" data-add-in="${esc(s.id)}">+ Добавить знак в раздел</button>`:''}</div>`;
    } else if(s.group==='foreign'){
      const byC = {}; list.forEach(i=>{ const c=i.country||'Страна не указана'; (byC[c]=byC[c]||[]).push(i); });
      inner = Object.keys(byC).sort((a,b)=>a.localeCompare(b,'ru')).map(c=>`<div class="sub-h">${esc(c)} · ${byC[c].length}</div><div class="grid" style="margin-bottom:18px">${byC[c].map(card).join('')}</div>`).join('');
    } else inner = `<div class="grid">${list.map(card).join('')}</div>`;
    body += `<section class="group"><div class="group-h"><h2>${esc(s.title)}</h2><span class="n">${all.filter(i=>i.status==='have').length} из ${all.length}</span>${UI.edit?`<button class="btn small" data-edit-sec="${esc(s.id)}">Раздел</button>`:''}</div>${inner}</section>`;
  }
  if(!body) body = `<div class="empty"><b>Ничего не найдено</b><span>Измените фильтр или строку поиска.</span></div>`;
  return `<div class="cat">
    <aside class="side" aria-label="Разделы">${side}</aside>
    <div style="min-width:0">
      <div class="filters">
        <select class="sec-select" id="sec-select" aria-label="Раздел">${opts}</select>
        <div class="seg" role="group" aria-label="Статус">${[['all','Все'],['have','В коллекции'],['want','Ищу'],['swap','На обмен']].map(([k,t])=>`<button data-st="${k}" aria-pressed="${UI.status===k}">${t}</button>`).join('')}</div>
        <input class="search" id="q" type="search" placeholder="Поиск: регион, номер, страна" value="${esc(UI.q)}" aria-label="Поиск">
      </div>
      <div id="groups">${body}</div>
    </div></div>`;
}

/* ---------- карта ---------- */
function viewMap(){
  const fos = {}; REGIONS.forEach(r=>{(fos[r[3]]=fos[r[3]]||[]).push(r)});
  return `<div class="legend"><span><i class="full"></i>Знак ГУ МЧС в коллекции</span><span><i class="part"></i>Есть знаки РЦ, округа или СПСЧ</span><span><i></i>Ищу</span></div><div class="fos">` +
  Object.keys(fos).map(fo=>{
    const regs = fos[fo]; let full=0;
    const tiles = regs.map(r=>{
      const gu = S.items.find(i=>i.section==='gu'&&i.region===r[0]);
      const other = S.items.filter(i=>i.region===r[0]&&i.section!=='gu'&&i.status==='have');
      const cls = gu&&gu.status==='have' ? 'full' : other.length ? 'part' : '';
      if(cls==='full') full++;
      const title = r[1] + (cls==='full'?' — знак ГУ в коллекции':cls==='part'?' — есть другие знаки региона':' — ищу');
      return `<button class="sj ${cls}" ${gu?`data-open="${esc(gu.id)}"`:`data-region="${r[0]}"`} title="${esc(title)}"><span class="c">${r[0]}</span><span class="t">${esc(r[2])}</span></button>`;
    }).join('');
    return `<div class="fo"><h3>${FO_NAMES[fo]} ФО <small>${full}/${regs.length}</small></h3><div class="bar"><i style="width:${Math.round(full/regs.length*100)}%"></i></div><div class="subj">${tiles}</div></div>`;
  }).join('') + `</div>`;
}

/* ---------- приказы ---------- */
function viewActs(){
  const rows = [...S.acts].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).map(a=>{
    const n = S.items.filter(i=>i.variants.some(v=>v.act===a.id)).length;
    const pend = pendingFiles.has(a.id);
    return `<article class="act" id="act-${esc(a.id)}">
      <div class="d"><b>№ ${esc(a.num)}</b>${fmtDate(a.date)}</div>
      <div style="min-width:0">
        <div class="note">${esc(a.kind)}</div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.approved)}</p>
        ${a.statusNote?`<p class="note">${esc(a.statusNote)}</p>`:''}
        <div class="row"><span class="pill ${esc(a.status)}">${ACT_STATUS[a.status]||esc(a.status)}</span>
          ${n?`<button class="linkbtn" data-act-filter="${esc(a.id)}">${n} ${plural(n,'знак','знака','знаков')} в коллекции</button>`:''}
          ${a.file?`<a href="${esc(a.file)}" target="_blank" rel="noopener">Текст приказа (PDF)</a>`:''}
          ${pend?'<span class="hint">PDF будет записан при сохранении</span>':''}
          ${a.url?`<a href="${esc(a.url)}" target="_blank" rel="noopener">Источник в интернете</a>`:''}
          ${UI.edit?`<button class="btn small" data-edit-act="${esc(a.id)}">Изменить</button>`:''}</div>
      </div></article>`;
  }).join('');
  return `<p class="lead">Нормативные акты, которыми утверждались нарукавные знаки и символика МЧС России и пожарной охраны. Порядок — по дате.</p><div class="acts">${rows}</div>`;
}

/* ---------- QR ---------- */
function viewQR(){
  const url = S.meta.publicUrl;
  return `<div class="qrwrap">
    <div class="qrbox">${url?'<div id="qr"></div>':'<p style="text-align:center">Адрес сайта ещё не указан</p>'}<div class="cap">${esc(S.meta.title)}</div></div>
    <div class="qrtext"><h2>QR-код коллекции</h2>
      ${url?`<p>Наведите камеру телефона — откроется сайт коллекции: все знаки, карта регионов и справочник приказов.</p><p class="mono">${esc(url)}</p>
      <div class="actions"><button class="btn" id="b-copy">Скопировать ссылку</button><button class="btn" id="b-qr-png">Скачать PNG для печати</button><button class="btn" id="b-qr-svg">Скачать SVG</button></div>`
      :`<p>QR-код ведёт на веб-версию каталога. Опубликуйте папку коллекции на хостинге (см. instrukciya.html), затем впишите адрес сайта в «Редактировать → Настройки».</p>`}
      ${UI.edit?'<div class="actions" style="margin-top:10px"><button class="btn" id="b-settings2">Изменить адрес</button></div>':''}
    </div></div>`;
}
function qrMatrix(text){ if(typeof qrcode!=='function') return null; const q=qrcode(0,'M'); q.addData(text); q.make(); return q; }
function qrSvg(text, px){
  const q = qrMatrix(text); if(!q) return '';
  const n = q.getModuleCount(), m = 4, size = n+m*2; let d='';
  for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(q.isDark(r,c)) d+=`M${c+m} ${r+m}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" ${px?`width="${px}" height="${px}"`:''} shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#fff"/><path d="${d}" fill="#142033"/></svg>`;
}
function drawQR(){ const el=$('#qr'); if(el&&S.meta.publicUrl) el.innerHTML = qrSvg(S.meta.publicUrl) || '<p>Не загрузился файл lib/qrcode.js.</p>'; }
function qrPng(){
  const q = qrMatrix(S.meta.publicUrl); if(!q) return;
  const n=q.getModuleCount(), m=4, cell=Math.floor(1200/(n+m*2)), side=cell*(n+m*2);
  const c=document.createElement('canvas'); c.width=side; c.height=side+130; const x=c.getContext('2d');
  x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height); x.fillStyle='#142033';
  for(let r=0;r<n;r++) for(let k=0;k<n;k++) if(q.isDark(r,k)) x.fillRect((k+m)*cell,(r+m)*cell,cell,cell);
  x.font='600 44px "Golos Text", Arial, sans-serif'; x.textAlign='center'; x.fillText(S.meta.title, side/2, side+70, side-40);
  c.toBlob(b=>download('qr-kollekciya.png', b),'image/png');
}

/* ---------- карточка знака ---------- */
let dlg;
function ensureDlg(){ if(!dlg){ dlg=document.createElement('dialog'); document.body.appendChild(dlg); dlg.addEventListener('click',e=>{ if(e.target===dlg) dlg.close(); }); } return dlg; }
function openItem(id, vi=0){
  const it = itemById(id); if(!it) return;
  const d = ensureDlg(); const sec = secById(it.section); const v = it.variants[vi]||it.variants[0]||{};
  const act = v.act ? actById(v.act) : null; const reg = it.region ? REG[it.region] : null;
  d.innerHTML = `<div class="dlg" style="position:relative"><button class="close" aria-label="Закрыть" data-close>×</button>
    <div class="media">${v.photo?`<img src="${esc(v.photo)}" alt="${esc(it.name)}">`:SHIELD}
      ${it.ref&&v.photo?`<div class="refcap">Образец: ${esc(it.ref.text)}${it.ref.url?` · <a href="${esc(it.ref.url)}" target="_blank" rel="noopener">источник</a>`:''}</div>`:''}
      ${it.variants.length>1?`<div class="thumbs">${it.variants.map((x,k)=>`<button data-vi="${k}" aria-pressed="${k===vi}">${esc(x.label||('Вариант '+(k+1)))}</button>`).join('')}</div>`:''}</div>
    <div class="info">
      <div class="cmeta"><span class="inv">${esc(it.id)}${it.variants.length>1?' · '+esc(v.label||''):''}</span><span class="pill ${it.status}">${STATUS_TXT[it.status]}</span></div>
      <h2>${esc(it.name)}</h2>
      <dl class="kv">
        <dt>Раздел</dt><dd>${esc(sec?sec.title:'')}</dd>
        ${reg?`<dt>Субъект РФ</dt><dd>${esc(reg.name)} (${reg.code})</dd>`:''}
        ${it.country?`<dt>Страна</dt><dd>${esc(it.country)}</dd>`:''}
        <dt>Вид</dt><dd>${esc(it.kind||'')}</dd>
        <dt>Основание</dt><dd>${act?`<button class="linkbtn" data-act="${esc(act.id)}">${esc(act.kind)} от ${fmtDate(act.date)} № ${esc(act.num)}</button>${act.status==='repealed'?' <span class="pill repealed">утратил силу</span>':''}${act.file?` · <a href="${esc(act.file)}" target="_blank" rel="noopener">PDF</a>`:''}`:(sec&&sec.group==='unofficial'?'Не утверждён приказом':'Не указано')}</dd>
        ${it.status==='have'?`<dt>Количество</dt><dd>${+v.qty||1} шт.</dd>`:''}
        ${it.status==='have'&&+v.spare?`<dt>На обмен</dt><dd>${+v.spare} шт.</dd>`:''}
        ${v.donor&&showDonors()?`<dt>Кто передал</dt><dd>${esc(v.donor)}</dd>`:''}
        ${v.date?`<dt>Получен</dt><dd>${esc(v.date)}</dd>`:''}
        ${v.note?`<dt>Примечание</dt><dd>${esc(v.note)}</dd>`:''}
        ${it.note?`<dt>Заметка</dt><dd>${esc(it.note)}</dd>`:''}
        ${it.url?`<dt>Ссылка</dt><dd><a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.url)}</a></dd>`:''}
      </dl>
      ${spareOf(it)&&contactLinks().length?`<div class="askbox swapbox"><b>Этот знак есть на обмен.</b> Предложите свой шеврон взамен — посмотрите список «Ищу» и напишите: ${contactLinks().join(' · ')}</div>`:''}
      ${it.status==='want'&&contactLinks().length?`<div class="askbox"><b>Есть такой шеврон?</b> Буду благодарен, если поделитесь или предложите обмен: ${contactLinks().join(' · ')}</div>`:''}
      ${it.desc?`<details><summary>Описание знака</summary><p class="legal">${esc(it.desc)}</p></details>`:''}
      ${UI.edit?`<div class="dlg-actions"><button class="btn primary" data-edit="${esc(it.id)}">Изменить</button><button class="btn danger" data-del="${esc(it.id)}">Удалить</button><span id="confirm-slot"></span></div>`:''}
    </div></div>`;
  d.querySelectorAll('[data-vi]').forEach(b=>b.onclick=()=>openItem(id,+b.dataset.vi));
  if(!d.open) d.showModal();
}

/* ---------- редактор знака ---------- */
const blankVariant = ()=>({act:'',label:'',photo:'',qty:1,donor:'',date:'',note:''});
function nextId(section, region){
  const pfx = (secById(section)||{}).prefix || 'ЗН';
  if(section==='gu' && region){ let id='ГУ-'+region, k=2; while(itemById(id)) id='ГУ-'+region+'-'+(k++); return id; }
  let n = 1; const re = new RegExp('^'+pfx.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'-(\\d+)$');
  S.items.forEach(i=>{ const m=i.id.match(re); if(m) n=Math.max(n,+m[1]+1); });
  return pfx+'-'+String(n).padStart(2,'0');
}
let draft=null, draftOrig=null;
function openEditor(id, presetSection){
  const it = id ? itemById(id) : null; draftOrig = id;
  draft = it ? JSON.parse(JSON.stringify(it)) : {id:'',section:presetSection||(UI.section!=='all'?UI.section:'gu'),name:'',region:null,country:'',kind:'Нарукавный',status:'have',desc:'',note:'',url:'',variants:[blankVariant()]};
  renderEditor();
}
function renderEditor(){
  const d = ensureDlg(); const it = draft; const sec = secById(it.section)||{};
  const actOpts = sel => `<option value="">— не указан —</option>`+[...S.acts].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).map(a=>`<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>№ ${esc(a.num)} от ${fmtDate(a.date)}</option>`).join('');
  d.innerHTML = `<form class="form" id="ed" novalidate>
    <h2>${draftOrig?'Изменить знак':'Новый знак'}</h2>
    <div class="fgrid">
      <div class="fld"><label for="f-section">Раздел</label><select id="f-section">${Object.keys(GROUPS).map(g=>`<optgroup label="${GROUPS[g]}">${S.sections.filter(s=>s.group===g).map(s=>`<option value="${esc(s.id)}" ${s.id===it.section?'selected':''}>${esc(s.title)}</option>`).join('')}</optgroup>`).join('')}</select></div>
      <div class="fld"><label for="f-id">Инвентарный номер</label><input id="f-id" value="${esc(it.id)}" placeholder="${esc(nextId(it.section,it.region))}"><span class="hint">Пусто — номер присвоится сам</span></div>
      <div class="fld wide"><label for="f-name">Наименование</label><input id="f-name" value="${esc(it.name)}" placeholder="Например: ГУ МЧС России по Тверской области"></div>
      ${sec.group==='foreign'?`<div class="fld"><label for="f-country">Страна</label><input id="f-country" value="${esc(it.country)}" placeholder="Например: Беларусь"></div>`:
       `<div class="fld"><label for="f-region">Субъект РФ</label><select id="f-region"><option value="">—</option>${REGIONS.slice().sort((a,b)=>a[1].localeCompare(b[1],'ru')).map(r=>`<option value="${r[0]}" ${r[0]===it.region?'selected':''}>${esc(r[1])}</option>`).join('')}</select></div>`}
      <div class="fld"><label for="f-kind">Вид знака</label><select id="f-kind">${KINDS.map(k=>`<option ${k===it.kind?'selected':''}>${k}</option>`).join('')}</select></div>
      <div class="fld"><label for="f-status">Статус</label><select id="f-status"><option value="have" ${it.status==='have'?'selected':''}>В коллекции</option><option value="want" ${it.status==='want'?'selected':''}>Ищу</option></select></div>
      <div class="fld"><label for="f-url">Ссылка (необязательно)</label><input id="f-url" type="url" value="${esc(it.url||'')}" placeholder="https://"></div>
      <div class="fld wide"><label for="f-note">Заметка</label><input id="f-note" value="${esc(it.note)}" placeholder="Место на стенде, история, обмен"></div>
      <div class="fld wide"><label for="f-desc">Описание знака (по приказу или своё)</label><textarea id="f-desc">${esc(it.desc)}</textarea></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b>Варианты исполнения</b><button type="button" class="btn small" id="v-add">+ Вариант</button></div>
    ${it.variants.map((v,k)=>`<div class="var" data-k="${k}">
      <div><div class="pv">${v.photo?`<img src="${esc(v.photo)}" alt="">`:'<span>нет фото</span>'}</div>
        <div class="pbtns"><label class="btn small" for="v-file-${k}">${v.photo?'Заменить фото':'Добавить фото'}</label><input type="file" accept="image/*" id="v-file-${k}" data-file="${k}">${v.photo?`<button type="button" class="btn small" data-rmphoto="${k}">Убрать фото</button>`:''}</div></div>
      <div class="fgrid">
        <div class="fld"><label for="v-label-${k}">Подпись варианта</label><input id="v-label-${k}" data-vf="label" value="${esc(v.label)}" placeholder="Образец 2022"></div>
        <div class="fld"><label for="v-act-${k}">Приказ</label><select id="v-act-${k}" data-vf="act">${actOpts(v.act)}</select></div>
        <div class="fld"><label for="v-qty-${k}">Количество, шт.</label><input id="v-qty-${k}" data-vf="qty" type="number" min="0" value="${esc(v.qty)}"></div>
        <div class="fld"><label for="v-spare-${k}">Из них на обмен, шт.</label><input id="v-spare-${k}" data-vf="spare" type="number" min="0" value="${esc(v.spare||0)}"></div>
        <div class="fld"><label for="v-donor-${k}">Кто передал</label><input id="v-donor-${k}" data-vf="donor" value="${esc(v.donor)}"></div>
        <div class="fld"><label for="v-date-${k}">Когда получен</label><input id="v-date-${k}" data-vf="date" value="${esc(v.date||'')}" placeholder="2025"></div>
        <div class="fld"><label for="v-note-${k}">Примечание</label><input id="v-note-${k}" data-vf="note" value="${esc(v.note)}"></div>
        ${it.variants.length>1?`<div class="fld wide"><button type="button" class="btn small danger" data-vrm="${k}">Удалить вариант</button></div>`:''}
      </div></div>`).join('')}
    <div class="form-foot"><span id="ed-err" style="color:var(--signal);margin-right:auto"></span><button type="button" class="btn" data-close>Отмена</button><button type="submit" class="btn primary">Готово</button></div>
  </form>`;
  if(!d.open) d.showModal();
}
function readEditor(){
  const f = $('#ed'); if(!f) return;
  const g = id => { const el=$('#'+id,f); return el?el.value:''; };
  draft.section = g('f-section'); draft.id = g('f-id').trim(); draft.name = g('f-name').trim();
  if($('#f-country',f)){ draft.country = g('f-country').trim(); draft.region=null; } else { draft.region = g('f-region')||null; draft.country=''; }
  draft.kind = g('f-kind'); draft.status = g('f-status'); draft.url = g('f-url').trim(); draft.note = g('f-note'); draft.desc = g('f-desc');
  f.querySelectorAll('.var').forEach(row=>{ const v = draft.variants[+row.dataset.k];
    row.querySelectorAll('[data-vf]').forEach(el=>{ v[el.dataset.vf] = (el.dataset.vf==='qty'||el.dataset.vf==='spare') ? (+el.value||0) : el.value; }); });
}
function resizeImage(file){
  return new Promise((res,rej)=>{ const r=new FileReader(); r.onerror=rej; r.onload=()=>{ const img=new Image(); img.onerror=rej; img.onload=()=>{
    const k=Math.min(1,1000/Math.max(img.width,img.height)); const c=document.createElement('canvas'); c.width=Math.round(img.width*k); c.height=Math.round(img.height*k);
    c.getContext('2d').drawImage(img,0,0,c.width,c.height); res(c.toDataURL('image/jpeg',0.85)); }; img.src=r.result; }; r.readAsDataURL(file); });
}
function commitEditor(){
  readEditor(); const err = $('#ed-err');
  if(!draft.name){ err.textContent='Укажите наименование.'; $('#f-name').focus(); return; }
  if(!draft.id) draft.id = nextId(draft.section, draft.region);
  const clash = S.items.find(i=>i.id===draft.id && i.id!==draftOrig);
  if(clash){ err.textContent='Номер '+draft.id+' уже занят: '+clash.name+'.'; return; }
  if(draft.ref && !draft.variants.some(v=>/\/ref-/.test(v.photo||''))) delete draft.ref;
  if(draft.status==='want') draft.variants.forEach(v=>{ v.qty=0; v.spare=0; });
  else draft.variants.forEach(v=>{ if(+v.spare>0 && +v.spare>=+v.qty) v.qty=+v.spare+1; });
  if(draftOrig){ const i=S.items.findIndex(x=>x.id===draftOrig); S.items[i]=draft; } else S.items.push(draft);
  markDirty(); const id=draft.id; draft=null; dlg.close(); render(); openItem(id);
}

/* ---------- редактор приказа ---------- */
let actDraft=null, actOrig=null, actFile=null;
function openActEditor(id){
  const a = id?actById(id):null; actOrig=id; actFile=null;
  actDraft = a?{...a}:{id:'',kind:'Приказ МЧС России',num:'',date:'',title:'',approved:'',status:'active',statusNote:'',url:'',file:''};
  const d=ensureDlg();
  d.innerHTML = `<form class="form" id="act-ed" novalidate><h2>${id?'Изменить приказ':'Новый приказ'}</h2><div class="fgrid">
    <div class="fld"><label for="a-kind">Вид акта</label><input id="a-kind" value="${esc(actDraft.kind)}"></div>
    <div class="fld"><label for="a-num">Номер</label><input id="a-num" value="${esc(actDraft.num)}"></div>
    <div class="fld"><label for="a-date">Дата</label><input id="a-date" type="date" value="${esc(actDraft.date)}"></div>
    <div class="fld"><label for="a-status">Статус</label><select id="a-status">${Object.keys(ACT_STATUS).map(k=>`<option value="${k}" ${k===actDraft.status?'selected':''}>${ACT_STATUS[k]}</option>`).join('')}</select></div>
    <div class="fld wide"><label for="a-title">Название</label><input id="a-title" value="${esc(actDraft.title)}"></div>
    <div class="fld wide"><label for="a-approved">Что утверждено</label><textarea id="a-approved">${esc(actDraft.approved)}</textarea></div>
    <div class="fld wide"><label for="a-note">Примечание к статусу</label><input id="a-note" value="${esc(actDraft.statusNote)}"></div>
    <div class="fld wide"><label for="a-url">Ссылка на текст в интернете</label><input id="a-url" type="url" value="${esc(actDraft.url)}" placeholder="https://"></div>
    <div class="fld wide"><label for="a-file">Файл приказа (PDF) — будет скопирован в папку prikazy</label><input id="a-file" type="file" accept="application/pdf,.pdf,.doc,.docx">
      <span class="hint">${actDraft.file?'Сейчас: '+esc(actDraft.file):'Файл не прикреплён'}</span></div>
  </div><div class="form-foot"><span id="act-err" style="color:var(--signal);margin-right:auto"></span>${id?'<button type="button" class="btn danger" id="a-del">Удалить приказ</button>':''}<button type="button" class="btn" data-close>Отмена</button><button type="submit" class="btn primary">Готово</button></div></form>`;
  if(!d.open) d.showModal();
}
function commitAct(){
  const g=id=>$('#'+id).value.trim();
  Object.assign(actDraft,{kind:g('a-kind'),num:g('a-num'),date:g('a-date'),status:$('#a-status').value,title:g('a-title'),approved:g('a-approved'),statusNote:g('a-note'),url:g('a-url')});
  if(!actDraft.num||!actDraft.date){ $('#act-err').textContent='Укажите номер и дату.'; return; }
  if(!actOrig){ const base='act-'+slug(actDraft.num)+'-'+actDraft.date.slice(0,4); let id=base, k=2; while(actById(id)) id=base+'-'+(k++); actDraft.id=id; S.acts.push(actDraft); }
  else { const i=S.acts.findIndex(a=>a.id===actOrig); S.acts[i]=actDraft; }
  const f=$('#a-file').files[0]; if(f) pendingFiles.set(actDraft.id, f);
  markDirty(); dlg.close(); render();
}

/* ---------- разделы ---------- */
let secOrig=null;
function openSecEditor(id){
  secOrig=id; const s = id?secById(id):{title:'',group:'ru',prefix:'',hint:''};
  const d=ensureDlg(); const n = id?S.items.filter(i=>i.section===id).length:0;
  d.innerHTML = `<form class="form" id="sec-ed" novalidate><h2>${id?'Раздел':'Новый раздел'}</h2><div class="fgrid">
    <div class="fld wide"><label for="r-title">Название раздела</label><input id="r-title" value="${esc(s.title)}"></div>
    <div class="fld"><label for="r-group">Группа</label><select id="r-group">${Object.keys(GROUPS).map(g=>`<option value="${g}" ${g===s.group?'selected':''}>${GROUPS[g]}</option>`).join('')}</select></div>
    <div class="fld"><label for="r-prefix">Префикс номеров</label><input id="r-prefix" value="${esc(s.prefix)}" placeholder="Например: БЛР" ${id?'':''}></div>
    <div class="fld wide"><label for="r-hint">Подсказка для пустого раздела</label><input id="r-hint" value="${esc(s.hint||'')}"></div>
  </div><div class="form-foot"><span id="sec-err" style="color:var(--signal);margin-right:auto"></span>${id&&!n?'<button type="button" class="btn danger" id="r-del">Удалить раздел</button>':''}<button type="button" class="btn" data-close>Отмена</button><button type="submit" class="btn primary">Готово</button></div></form>`;
  if(!d.open) d.showModal();
}
function commitSec(){
  const title=$('#r-title').value.trim(), group=$('#r-group').value, prefix=$('#r-prefix').value.trim().toUpperCase(), hint=$('#r-hint').value.trim();
  if(!title||!prefix){ $('#sec-err').textContent='Укажите название и префикс.'; return; }
  if(secOrig){ Object.assign(secById(secOrig),{title,group,prefix,hint}); }
  else { let id='sec-'+slug(title), k=2; while(secById(id)) id='sec-'+slug(title)+'-'+(k++); S.sections.push({id,title,group,prefix,hint}); }
  markDirty(); dlg.close(); render();
}

/* ---------- настройки ---------- */
function openSettings(){
  const d=ensureDlg();
  d.innerHTML = `<form class="form" id="set-ed" novalidate><h2>Настройки</h2><div class="fgrid">
    <div class="fld wide"><label for="s-title">Название коллекции</label><input id="s-title" value="${esc(S.meta.title)}"></div>
    <div class="fld wide"><label for="s-eyebrow">Надзаголовок</label><input id="s-eyebrow" value="${esc(S.meta.eyebrow||'')}"></div>
    <div class="fld wide"><label for="s-sub">Подзаголовок</label><input id="s-sub" value="${esc(S.meta.subtitle||'')}"></div>
    <div class="fld wide"><label for="s-url">Адрес сайта для QR-кода</label><input id="s-url" type="url" value="${esc(S.meta.publicUrl||'')}" placeholder="https://логин.github.io/kollekciya-shevronov/"></div>
    <div class="fld wide" style="margin-top:6px"><b>Владелец коллекции и контакты</b><span class="hint">Показываются внизу каждой страницы и у знаков из списка «Ищу». Пустые поля не выводятся.</span></div>
    <div class="fld wide"><label for="o-name">Имя</label><input id="o-name" value="${esc(OWN().name||'')}"></div>
    <div class="fld wide"><label for="o-about">О себе (должность, организация)</label><input id="o-about" value="${esc(OWN().about||'')}"></div>
    <div class="fld"><label for="o-phone">Телефон</label><input id="o-phone" type="tel" value="${esc(OWN().phone||'')}" placeholder="+7 900 000-00-00"></div>
    <div class="fld"><label for="o-email">Эл. почта</label><input id="o-email" type="email" value="${esc(OWN().email||'')}"></div>
    <div class="fld"><label for="o-tg">Telegram</label><input id="o-tg" value="${esc(OWN().telegram||'')}" placeholder="@имя"></div>
    <div class="fld"><label for="o-other">Другой способ связи</label><input id="o-other" value="${esc(OWN().other||'')}" placeholder="ВКонтакте, MAX…"></div>
    <div class="fld wide"><label for="o-cta">Обращение к посетителям</label><textarea id="o-cta">${esc(OWN().cta||'')}</textarea></div>
    <label class="check wide" style="grid-column:1/-1"><input type="checkbox" id="s-donors" ${S.meta.showDonorsOnWeb!==false?'checked':''}> Показывать на сайте, кто передал знак</label>
  </div><div class="form-foot"><button type="button" class="btn" data-close>Отмена</button><button type="submit" class="btn primary">Готово</button></div></form>`;
  if(!d.open) d.showModal();
}

/* ---------- выгрузка ---------- */
function exportCSV(){
  const head=['Инв. №','Раздел','Наименование','Субъект/страна','Вид','Статус','Вариант','Приказ','Кол-во','На обмен','Кто передал','Когда получен','Примечание','Заметка','Фото'];
  const rows=[head];
  S.items.forEach(it=>it.variants.forEach(v=>{ const a=v.act?actById(v.act):null;
    rows.push([it.id,(secById(it.section)||{}).title,it.name,it.country||(it.region&&REG[it.region]?REG[it.region].name:''),it.kind,STATUS_TXT[it.status],v.label,a?('№ '+a.num+' от '+fmtDate(a.date)):'',it.status==='have'?(v.qty||1):0,it.status==='have'?(+v.spare||0):0,v.donor,v.date||'',v.note,it.note,v.photo&&!v.photo.startsWith('data:')?v.photo:'']); }));
  const csv='﻿'+rows.map(r=>r.map(c=>{c=String(c==null?'':c); return /[;"\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c;}).join(';')).join('\r\n');
  download('kollekciya-shevronov.csv', csv, 'text/csv;charset=utf-8');
}

/* ---------- сохранение в папку ---------- */
const serialize = () => '/* Данные коллекции. Файл перезаписывается при сохранении из режима редактирования. */\nwindow.COLLECTION = '+JSON.stringify(S,null,1)+';\n';
function dataUrlToBlob(u){ const [h,b]=u.split(','); const bin=atob(b); const a=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return new Blob([a],{type:(h.match(/data:([^;]+)/)||[])[1]||'image/jpeg'}); }
async function writeFile(dir, name, data){ const fh=await dir.getFileHandle(name,{create:true}); const w=await fh.createWritable(); await w.write(data); await w.close(); }
async function saveWeb(){
  UI.saving=true; render();
  try{
    const uploads=[];
    for(const it of S.items) for(let k=0;k<it.variants.length;k++){
      const v=it.variants[k];
      if(v.photo && v.photo.startsWith('data:')){
        const fn=slug(it.id)+'-'+(k+1)+'-'+Date.now().toString(36)+'.jpg';
        uploads.push({path:'photos/'+fn, b64:v.photo.split(',')[1]}); v.photo='photos/'+fn;
      }
    }
    for(const [actId,file] of pendingFiles){ const a=actById(actId); if(!a) continue;
      const ext=(file.name.match(/\.[a-z0-9]+$/i)||['.pdf'])[0].toLowerCase();
      const fn='prikaz-'+slug(a.kind.replace(/^Приказ\s*/,'')||'akt')+'-'+slug(a.num)+'-'+(a.date||'').slice(0,4)+ext;
      uploads.push({path:'prikazy/'+fn, b64:await blobToB64(file)}); a.file='prikazy/'+fn; }
    S.meta.updated = today();
    await pushToGitHub(uploads); pendingFiles.clear();
    ORIGINAL = JSON.stringify(S); UI.dirty=0; UI.saving=false; render(); toast('Сохранено. Сайт обновится через 1–2 минуты.');
  }catch(e){ UI.saving=false; render(); toast('Не удалось сохранить на сайт: '+e.message+(e.status===409||e.status===422?'. Обновите страницу и повторите.':'')); }
}
async function save(){
  if(!(LOCAL && FS) && getToken()) return saveWeb();
  if(!FS){
    download('collection.js', serialize(), 'text/javascript;charset=utf-8');
    if(pendingFiles.size) toast('PDF приказов в этом браузере не сохраняются — положите их в папку prikazy вручную.');
    toast('Скачан collection.js — замените им файл в папке data коллекции.');
    ORIGINAL = JSON.stringify(S); UI.dirty=0; render(); return;
  }
  UI.saving=true; render();
  try{
    if(!dirHandle) dirHandle = await window.showDirectoryPicker({id:'kollekciya-shevronov', mode:'readwrite'});
    if(dirHandle.queryPermission && await dirHandle.queryPermission({mode:'readwrite'})!=='granted'){
      if(await dirHandle.requestPermission({mode:'readwrite'})!=='granted') throw new Error('нет разрешения на запись в папку');
    }
    let dataDir;
    try{ dataDir = await dirHandle.getDirectoryHandle('data'); await dataDir.getFileHandle('collection.js'); }
    catch(_){ dirHandle=null; throw new Error('выбрана не та папка. Укажите папку коллекции — ту, где лежат index.html и папка data'); }
    const photosDir = await dirHandle.getDirectoryHandle('photos',{create:true});
    const existing = new Set(); for await (const name of photosDir.keys()) existing.add(name);
    const uploads = [];
    // фото, добавленные с телефона, — скачать с сайта в папку
    for(const it of S.items) for(const v of it.variants){
      const m = /^photos\/(.+)$/.exec(v.photo||''); if(!m || existing.has(m[1])) continue;
      try{ const r=await fetch(RAW+'photos/'+encodeURIComponent(m[1])); if(r.ok){ await writeFile(photosDir, m[1], await r.blob()); existing.add(m[1]); } }catch(_){}
    }
    for(const it of S.items) for(let k=0;k<it.variants.length;k++){
      const v=it.variants[k];
      if(v.photo && v.photo.startsWith('data:')){
        const base=slug(it.id)+'-'+(k+1); let fn=base+'.jpg', n=2; while(existing.has(fn)) fn=base+'-'+(n++)+'.jpg';
        await writeFile(photosDir, fn, dataUrlToBlob(v.photo)); existing.add(fn); uploads.push({path:'photos/'+fn, b64:v.photo.split(',')[1]}); v.photo='photos/'+fn;
      }
    }
    if(pendingFiles.size){
      const pd = await dirHandle.getDirectoryHandle('prikazy',{create:true});
      for(const [actId,file] of pendingFiles){ const a=actById(actId); if(!a) continue;
        const ext=(file.name.match(/\.[a-z0-9]+$/i)||['.pdf'])[0].toLowerCase();
        const fn='prikaz-'+slug(a.kind.replace(/^Приказ\s*/,'')||'akt')+'-'+slug(a.num)+'-'+(a.date||'').slice(0,4)+ext;
        await writeFile(pd, fn, file); uploads.push({path:'prikazy/'+fn, b64:await blobToB64(file)}); a.file='prikazy/'+fn; }
      pendingFiles.clear();
    }
    try{ const old = await (await (await dataDir.getFileHandle('collection.js')).getFile()).text();
      const bk = await dataDir.getDirectoryHandle('backup',{create:true}); await writeFile(bk,'collection-'+stamp()+'.js',old); }catch(_){}
    S.meta.updated = today();
    await writeFile(dataDir,'collection.js', serialize());
    let siteMsg = '';
    if(getToken()){ try{ await pushToGitHub(uploads); siteMsg=' и на сайт (обновится через 1–2 минуты)'; }catch(e){ siteMsg='. На сайт не сохранилось: '+e.message; } }
    ORIGINAL = JSON.stringify(S); UI.dirty=0; UI.saving=false; render(); toast('Сохранено в папку'+siteMsg);
  }catch(e){
    UI.saving=false; render();
    if(e && e.name==='AbortError') return;
    toast('Не удалось сохранить: '+(e && e.message || e));
  }
}

/* ---------- события ---------- */
document.addEventListener('click', async e=>{
  const t = e.target.closest('button,[data-open]'); if(!t) return;
  const ds = t.dataset;
  if(ds.close!==undefined){ dlg&&dlg.close(); return; }
  if(ds.qrtoggle){ if(UI.view==='qr'){ UI.view=UI.prevView||'katalog'; } else { UI.prevView=UI.view; UI.view='qr'; } render(); if(UI.view==='qr'){ const q=$('.qrwrap'); q&&q.scrollIntoView({behavior:'smooth',block:'start'}); } return; }
  if(ds.go){ if(ds.go==='qr'&&UI.view!=='qr') UI.prevView=UI.view; UI.view=ds.go; render(); return; }
  if(ds.open){ openItem(ds.open); return; }
  if(ds.region){ if(UI.edit){ openEditor(null,'gu'); draft.region=ds.region; draft.name=REG[ds.region].name; draft.status='want'; renderEditor(); } else toast(REG[ds.region].name+' — пока ищу'); return; }
  if(ds.sec){ UI.section=ds.sec; renderView(); return; }
  if(ds.st){ UI.status=ds.st; renderView(); return; }
  if(ds.act){ dlg&&dlg.close(); UI.view='prikazy'; render(); const el=document.getElementById('act-'+ds.act); if(el){ el.classList.add('hl'); el.scrollIntoView({block:'center'}); } return; }
  if(ds.actFilter){ UI.view='katalog'; UI.section='all'; UI.status='all'; UI.q=''; render(); const a=actById(ds.actFilter);
    const list=S.items.filter(i=>i.variants.some(v=>v.act===ds.actFilter));
    $('#groups').innerHTML = `<section class="group"><div class="group-h"><h2>По приказу № ${esc(a.num)} от ${fmtDate(a.date)}</h2><span class="n">${list.length}</span></div><div class="grid">${list.map(card).join('')}</div></section>`; return; }
  if(ds.edit){ openEditor(ds.edit); return; }
  if(ds.del){ $('#confirm-slot').innerHTML=`<span class="confirm">Удалить знак ${esc(ds.del)}? <button class="btn small danger" data-del-yes="${esc(ds.del)}">Удалить</button><button class="btn small" data-close>Нет</button></span>`; return; }
  if(ds.delYes){ S.items=S.items.filter(i=>i.id!==ds.delYes); markDirty(); dlg.close(); render(); return; }
  if(ds.addIn){ openEditor(null, ds.addIn); return; }
  if(ds.editAct){ openActEditor(ds.editAct); return; }
  if(ds.editSec){ openSecEditor(ds.editSec); return; }
  if(ds.vrm){ readEditor(); draft.variants.splice(+ds.vrm,1); renderEditor(); return; }
  if(ds.rmphoto){ readEditor(); draft.variants[+ds.rmphoto].photo=''; renderEditor(); return; }
  switch(t.id){
    case 'b-edit': UI.edit=!UI.edit; render(); break;
    case 'b-add': openEditor(null); break;
    case 'b-add-act': openActEditor(null); break;
    case 'b-add-sec': openSecEditor(null); break;
    case 'b-settings': case 'b-settings2': openSettings(); break;
    case 'b-contact': { const el=document.getElementById('owner'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); break; }
    case 'b-csv': exportCSV(); break;
    case 'v-add': readEditor(); draft.variants.push(blankVariant()); renderEditor(); break;
    case 'b-save': save(); break;
    case 'b-token': openTokenDialog(); break;
    case 't-del': setToken(''); dataSha=null; remoteState=''; dlg.close(); render(); toast('Ключ удалён с этого устройства'); break;
    case 'b-discard': S=JSON.parse(ORIGINAL); pendingFiles.clear(); UI.dirty=0; render(); toast('Изменения отменены'); break;
    case 'a-del': { const used=S.items.some(i=>i.variants.some(v=>v.act===actOrig)); if(used){ $('#act-err').textContent='На этот приказ ссылаются знаки — сначала измените их.'; break; } S.acts=S.acts.filter(a=>a.id!==actOrig); markDirty(); dlg.close(); render(); break; }
    case 'r-del': S.sections=S.sections.filter(s=>s.id!==secOrig); if(UI.section===secOrig) UI.section='all'; markDirty(); dlg.close(); render(); break;
    case 'b-copy': try{ await navigator.clipboard.writeText(S.meta.publicUrl); toast('Ссылка скопирована'); }catch(_){ const m=$('.qrtext .mono'); if(m){ const r=document.createRange(); r.selectNodeContents(m); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast('Ссылка выделена — скопируйте её'); } } break;
    case 'b-qr-png': qrPng(); break;
    case 'b-qr-svg': download('qr-kollekciya.svg', qrSvg(S.meta.publicUrl,1000), 'image/svg+xml'); break;
  }
});
document.addEventListener('input', e=>{ if(e.target.id==='q'){ UI.q=e.target.value; const pos=e.target.selectionStart; renderView(); const q=$('#q'); q.focus(); try{q.setSelectionRange(pos,pos)}catch(_){} } });
document.addEventListener('change', async e=>{
  const t=e.target;
  if(t.id==='sec-select'){ UI.section=t.value; renderView(); return; }
  if(t.id==='f-section'){ readEditor(); renderEditor(); return; }
  if(t.dataset && t.dataset.file!==undefined && t.files && t.files[0]){ readEditor(); try{ draft.variants[+t.dataset.file].photo = await resizeImage(t.files[0]); }catch(_){ toast('Не удалось прочитать изображение'); } renderEditor(); }
});
document.addEventListener('submit', e=>{ e.preventDefault(); const id=e.target.id;
  if(id==='tok-ed'){ commitToken(); return; }
  if(id==='ed') commitEditor(); else if(id==='act-ed') commitAct(); else if(id==='sec-ed') commitSec();
  else if(id==='set-ed'){ S.meta.title=$('#s-title').value.trim()||S.meta.title; S.meta.eyebrow=$('#s-eyebrow').value.trim(); S.meta.subtitle=$('#s-sub').value.trim(); S.meta.publicUrl=$('#s-url').value.trim(); S.meta.showDonorsOnWeb=$('#s-donors').checked; S.meta.owner={name:$('#o-name').value.trim(),about:$('#o-about').value.trim(),phone:$('#o-phone').value.trim(),email:$('#o-email').value.trim(),telegram:$('#o-tg').value.trim(),other:$('#o-other').value.trim(),cta:$('#o-cta').value.trim()}; document.title=S.meta.title; markDirty(); dlg.close(); render(); } });
window.addEventListener('beforeunload', e=>{ if(UI.dirty){ e.preventDefault(); e.returnValue=''; } });

// фото, которого ещё нет в локальной папке или на сайте, — взять напрямую из репозитория
document.addEventListener('error', e=>{ const el=e.target; if(el.tagName==='IMG' && !el.dataset.fb){ const src=el.getAttribute('src')||''; if(/^photos\//.test(src)){ el.dataset.fb='1'; el.src=RAW+src; } } }, true);

document.title = (CAN_EDIT && !LOCAL) ? 'Шевроны · админ' : S.meta.title;
if(CAN_EDIT && !LOCAL) UI.edit = true;
render();
if(CAN_EDIT && getToken()) loadRemote();
})();
