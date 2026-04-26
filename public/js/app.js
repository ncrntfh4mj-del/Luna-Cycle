const S={lastPeriod:null,cycleLen:28,periodLen:5,currentPage:'dashboard',todayPhase:null,calYear:new Date().getFullYear(),calMonth:new Date().getMonth(),moodToday:null,suppChecked:{}};
const $=id=>document.getElementById(id);
const DOW_KO=['일','월','화','수','목','금','토'];
const MONTHS_KO=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const PHASE_KO={menstrual:'생리기',follicular:'여포기',fertile:'가임기',ovulation:'배란일',luteal:'황체기','next-period':'예상 생리일'};

function getDayInfo(date,base,cycle,period,ovDay,fertileStart){
  const diff=Math.round((date-base)/86400000);
  const dayInCycle=((diff%cycle)+cycle)%cycle;
  const isNext=diff>0&&dayInCycle<period&&diff>=cycle;
  if(isNext)return{phase:'next-period',label:'예상 생리일',emoji:'🩸'};
  if(dayInCycle<period)return{phase:'menstrual',label:`생리 ${dayInCycle+1}일째`,emoji:'🩸'};
  if(dayInCycle===ovDay)return{phase:'ovulation',label:'배란일',emoji:'🌕'};
  if(dayInCycle>=fertileStart&&dayInCycle<ovDay)return{phase:'fertile',label:'가임기',emoji:'🌿'};
  if(dayInCycle<ovDay)return{phase:'follicular',label:'여포기',emoji:'🌱'};
  return{phase:'luteal',label:'황체기',emoji:'🍂'};
}

function calcCycle(lastPeriod,cycleLen,periodLen){
  const base=new Date(lastPeriod+'T00:00:00');
  const cycle=+cycleLen,period=+periodLen;
  const ovDay=cycle-14,fertileStart=ovDay-5;
  const today=new Date();today.setHours(0,0,0,0);
  const todayInfo=getDayInfo(today,base,cycle,period,ovDay,fertileStart);
  const diff=Math.round((today-base)/86400000);
  let mult=Math.ceil(diff/cycle);if(mult<=0)mult=1;
  const nextP=new Date(base);nextP.setDate(base.getDate()+mult*cycle);
  const nextO=new Date(base);nextO.setDate(base.getDate()+mult*cycle-14);
  if(nextO<today)nextO.setDate(nextO.getDate()+cycle);
  const upcoming={nextPeriod:fmt(nextP),daysUntilPeriod:Math.round((nextP-today)/86400000),nextOvulation:fmt(nextO),daysUntilOv:Math.round((nextO-today)/86400000),inPeriod:Math.round((nextP-today)/86400000)<=0};
  const week=[];
  for(let i=-1;i<=5;i++){const d=new Date(today);d.setDate(today.getDate()+i);week.push({date:fmtInput(d),day:d.getDate(),dow:d.getDay(),isToday:i===0,...getDayInfo(d,base,cycle,period,ovDay,fertileStart)});}
  const cb=new Date(base);cb.setDate(base.getDate()+(Math.max(mult,1)-1)*cycle);
  const add=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
  const phaseSummary=[
    {emoji:'🩸',name:'생리기',from:fmt(cb),to:fmt(add(cb,period-1))},
    {emoji:'🌱',name:'여포기',from:fmt(add(cb,period)),to:fmt(add(cb,fertileStart-1))},
    {emoji:'🌿',name:'가임기',from:fmt(add(cb,fertileStart)),to:fmt(add(cb,ovDay-1))},
    {emoji:'🌕',name:'배란일',from:fmt(add(cb,ovDay)),to:fmt(add(cb,ovDay))},
    {emoji:'🍂',name:'황체기',from:fmt(add(cb,ovDay+1)),to:fmt(add(cb,cycle-1))},
  ];
  return{today:todayInfo,upcoming,weekDays:week,phaseSummary};
}

function calcCalendar(lastPeriod,cycleLen,periodLen,year,month){
  const base=new Date(lastPeriod+'T00:00:00');
  const cycle=+cycleLen,period=+periodLen;
  const ovDay=cycle-14,fertileStart=ovDay-5;
  const daysInMonth=new Date(year,month+1,0).getDate();
  const days=[];
  for(let d=1;d<=daysInMonth;d++){const date=new Date(year,month,d);date.setHours(0,0,0,0);days.push({day:d,...getDayInfo(date,base,cycle,period,ovDay,fertileStart)});}
  return days;
}

function fmt(d){return`${d.getMonth()+1}월 ${d.getDate()}일`;}
function fmtInput(d){return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}

(function init(){
  loadSettings();bindNav();bindSidebar();bindMood();bindJournal();bindSettings();bindCalNav();refreshDashboard();
})();

function loadSettings(){
  const saved=localStorage.getItem('luna_settings');
  if(saved){const p=JSON.parse(saved);S.lastPeriod=p.lastPeriod;S.cycleLen=p.cycleLen||28;S.periodLen=p.periodLen||5;}
  else{const d=new Date();d.setDate(d.getDate()-14);S.lastPeriod=fmtInput(d);}
  $('setLastPeriod').value=S.lastPeriod||'';
  $('setCycleLen').value=S.cycleLen;
  $('setPeriodLen').value=S.periodLen;
  const todayKey=fmtInput(new Date());
  const moods=JSON.parse(localStorage.getItem('luna_moods')||'{}');
  if(moods[todayKey]){S.moodToday=moods[todayKey];highlightMood(moods[todayKey].emoji);$('moodSelected').textContent=moods[todayKey].label;}
  S.suppChecked=JSON.parse(localStorage.getItem('luna_supps_'+todayKey)||'{}');
}

function saveSettings(){localStorage.setItem('luna_settings',JSON.stringify({lastPeriod:S.lastPeriod,cycleLen:S.cycleLen,periodLen:S.periodLen}));}

function refreshDashboard(){
  if(!S.lastPeriod)return;
  const data=calcCycle(S.lastPeriod,S.cycleLen,S.periodLen);
  S.todayPhase=data.today.phase;
  renderHeader(data.today);renderWeekStrip(data.weekDays);renderPhaseCard(data.today);
  renderDday(data.upcoming);renderYogaPreview(data.today.phase);renderDietPreview(data.today.phase);
  renderSuppChecks(data.today.phase);renderMeditatePreview(data.today.phase);
  renderSidebarPhase(data.today);renderYogaPage(data.today.phase);
  renderNutritionPage(data.today.phase);renderJournalMeta(data.today);
}

function bindNav(){
  document.querySelectorAll('.nav-item').forEach(item=>{item.addEventListener('click',e=>{e.preventDefault();navigateTo(item.dataset.page);$('sidebar').classList.remove('open');});});
  document.querySelectorAll('.card-cta').forEach(btn=>{btn.addEventListener('click',()=>navigateTo(btn.dataset.page));});
}

function navigateTo(page){
  S.currentPage=page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  $(`page-${page}`)?.classList.add('active');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  if(page==='calendar')renderCalendarPage();
  window.scrollTo(0,0);
}

function bindSidebar(){
  $('menuBtn').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
  document.addEventListener('click',e=>{if(!$('sidebar').contains(e.target)&&!$('menuBtn').contains(e.target))$('sidebar').classList.remove('open');});
}function renderHeader(today){
  const now=new Date();
  const hour=now.getHours();
  const greet=hour<12?'좋은 아침이에요':hour<18?'좋은 오후예요':'좋은 저녁이에요';
  $('greeting').textContent=greet;
  $('todayDate').textContent=`${now.getFullYear()}년 ${MONTHS_KO[now.getMonth()]} ${now.getDate()}일`;
  const w=WELLNESS[today.phase];
  $('phaseHero').innerHTML=`<strong>${w?.emoji} ${PHASE_KO[today.phase]}</strong>${w?.tagline||''}`;
  $('topbarPhase').textContent=`${w?.emoji} ${PHASE_KO[today.phase]}`;
}

function renderWeekStrip(weekDays){
  const strip=$('weekStrip');strip.innerHTML='';
  weekDays.forEach(d=>{
    const el=document.createElement('div');
    el.className=`week-day ${d.phase}${d.isToday?' today':''}`;
    el.innerHTML=`<span class="wd-dow">${DOW_KO[d.dow]}</span><span class="wd-num">${d.day}</span><span class="wd-icon">${d.emoji}</span>`;
    el.addEventListener('click',()=>navigateTo('calendar'));
    strip.appendChild(el);
  });
}

function renderPhaseCard(today){
  const w=WELLNESS[today.phase];if(!w)return;
  $('phaseInfo').innerHTML=`<div class="phase-name">${w.emoji} ${w.name}</div><div class="phase-tagline">${w.tagline}</div>`;
  const bars=$('hormoneMini');bars.innerHTML='';
  setTimeout(()=>{
    Object.entries(w.hormone.levels).forEach(([name,val])=>{
      const row=document.createElement('div');row.className='hm-row';
      row.innerHTML=`<span class="hm-label">${name}</span><div class="hm-track"><div class="hm-fill" style="width:0" data-val="${val}"></div></div>`;
      bars.appendChild(row);
    });
    requestAnimationFrame(()=>setTimeout(()=>{bars.querySelectorAll('.hm-fill').forEach(f=>f.style.width=f.dataset.val+'%');},100));
  },50);
}

function renderDday(up){
  const el=$('ddayContent');
  if(up.inPeriod){el.innerHTML=`<div class="dday-item"><div class="dday-num">🩸</div><div class="dday-sub"><strong>현재 생리 중</strong>몸을 잘 챙겨요</div></div>`;return;}
  el.innerHTML=`
    <div class="dday-item"><div class="dday-num">D-${up.daysUntilPeriod}</div><div class="dday-sub"><strong>다음 생리 예정</strong>${up.nextPeriod}</div></div>
    <div class="dday-divider"></div>
    <div class="dday-item"><div class="dday-num">${up.daysUntilOv>0?'D-'+up.daysUntilOv:'완료'}</div><div class="dday-sub"><strong>다음 배란 예정</strong>${up.nextOvulation}</div></div>`;
}

function renderYogaPreview(phase){
  const w=WELLNESS[phase];if(!w)return;
  $('yogaPreview').innerHTML=w.yoga.slice(0,2).map(a=>`<div class="preview-item"><span class="pi-icon">${a.emoji}</span><div class="pi-text">${a.name}<small>${a.benefit} · ${a.duration}</small></div></div>`).join('');
}

function renderDietPreview(phase){
  const w=WELLNESS[phase];if(!w)return;
  $('dietPreview').innerHTML=w.diet.meals.slice(0,3).map(m=>`<div class="preview-item"><span class="pi-icon">${m.icon}</span><div class="pi-text">${m.menu}<small>${m.time} · ${m.reason}</small></div></div>`).join('');
}

function renderSuppChecks(phase){
  const w=WELLNESS[phase];if(!w)return;
  const el=$('suppChecks');el.innerHTML='';
  const todayKey=fmtInput(new Date());
  const suppKey='luna_supps_'+todayKey;
  w.supplements.slice(0,4).forEach((s,i)=>{
    const id=`supp_${i}`;
    const checked=S.suppChecked[id]||false;
    const item=document.createElement('div');item.className='supp-check-item';
    item.innerHTML=`<div class="check-box ${checked?'checked':''}" data-id="${id}">${checked?'✓':''}</div><span class="check-label">${s.emoji} ${s.name}</span><span class="check-time">${s.timing}</span>`;
    item.querySelector('.check-box').addEventListener('click',function(){
      const isNow=!S.suppChecked[id];S.suppChecked[id]=isNow;
      this.classList.toggle('checked',isNow);this.textContent=isNow?'✓':'';
      localStorage.setItem(suppKey,JSON.stringify(S.suppChecked));
      showToast(isNow?`${s.name} 복용 완료 ✓`:`${s.name} 취소`);
    });
    el.appendChild(item);
  });
}

function renderMeditatePreview(phase){
  const w=WELLNESS[phase];if(!w)return;
  $('meditatePreview').innerHTML=`<div class="med-title">${w.meditation.title}</div><div class="med-meta">⏱ ${w.meditation.duration} · 🎵 ${w.meditation.music}<br>🌬 ${w.meditation.breathwork}</div>`;
}

function renderSidebarPhase(today){
  const w=WELLNESS[today.phase];if(!w)return;
  $('sidebarPhase').innerHTML=`<div style="font-size:1.4rem;margin-bottom:6px">${w.emoji}</div><div style="font-weight:500;color:var(--ink);font-size:.82rem;margin-bottom:3px">${w.name}</div><div style="color:var(--ink-3);font-size:.75rem">${w.tagline}</div>`;
}

function renderYogaPage(phase){
  const w=WELLNESS[phase];if(!w)return;
  $('yogaSectionTitle').textContent=`${w.emoji} ${w.name} 아사나`;
  $('asanaGrid').innerHTML=w.yoga.map(a=>`<div class="asana-card"><div class="asana-emoji">${a.emoji}</div><div class="asana-name">${a.name}</div><div class="asana-sanskrit">${a.sanskrit}</div><div class="asana-benefit">${a.benefit}</div><div class="asana-meta"><span>⏱ ${a.duration}</span></div><div class="asana-tip">💡 ${a.tip}</div></div>`).join('');
  $('meditationCard').innerHTML=`<div class="med-card-title">🧘 ${w.meditation.title}</div><div class="med-card-duration">⏱ ${w.meditation.duration}</div><div class="med-card-guide">"${w.meditation.guide}"</div><div class="med-card-meta"><div class="med-meta-item">🎵 <span>${w.meditation.music}</span></div><div class="med-meta-item">🌬 <span>${w.meditation.breathwork}</span></div></div>`;
  $('videoList').innerHTML=w.workout.videos.map(v=>`<a class="video-card" href="${v.url}" target="_blank" rel="noopener"><div class="video-thumb">▶</div><div><div class="v-title">${v.title}</div><div class="v-meta"><span class="v-channel">${v.channel}</span></div></div><div class="video-right"><span class="v-duration">⏱ ${v.duration}</span><span class="v-tag">${v.tag}</span></div></a>`).join('');
}

function renderNutritionPage(phase){
  const w=WELLNESS[phase];if(!w)return;
  $('dietSectionTitle').textContent=`${w.emoji} ${w.name} 식단`;
  $('mealGrid').innerHTML=w.diet.meals.map(m=>`<div class="meal-card"><div class="meal-time-badge"><span class="meal-time-icon">${m.icon}</span><span>${m.time}</span></div><div class="meal-name">${m.menu}</div><div class="meal-reason">${m.reason}</div></div>`).join('');
  $('avoidBox').innerHTML=`<strong>⚠ 오늘은 피해요</strong> ${w.diet.avoid}`;
  $('suppFullList').innerHTML=w.supplements.map(s=>`<div class="supp-full-item"><span class="sf-emoji">${s.emoji}</span><div><div class="sf-name">${s.name}</div><div class="sf-reason">${s.reason}</div></div><div class="sf-right"><div class="sf-dose">${s.dose}</div><div class="sf-timing">${s.timing}</div></div></div>`).join('');
}

function renderJournalMeta(today){
  const now=new Date();
  $('journalMeta').textContent=`${now.getFullYear()}년 ${MONTHS_KO[now.getMonth()]} ${now.getDate()}일 · ${PHASE_KO[today.phase]}`;
  renderHistoryList();
  const todayKey=fmtInput(now);
  const journals=JSON.parse(localStorage.getItem('luna_journals')||'{}');
  if(journals[todayKey]){$('journalQuick').value=journals[todayKey].text||'';$('journalTextarea').value=journals[todayKey].text||'';}
}

function bindJournal(){
  $('energySlider').addEventListener('input',function(){$('energyVal').textContent=this.value;});
  document.querySelectorAll('.chip').forEach(chip=>{chip.addEventListener('click',function(){if(this.dataset.sym==='없음')document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));this.classList.toggle('active');});});
  $('journalSave').addEventListener('click',()=>{const text=$('journalQuick').value.trim();if(!text)return;saveJournalEntry(text);showToast('저널이 저장됐어요 ✓');});
  $('journalSaveFull').addEventListener('click',()=>{
    const text=$('journalTextarea').value.trim();
    const symptoms=[...document.querySelectorAll('.chip.active')].map(c=>c.dataset.sym);
    const energy=$('energySlider').value;
    if(!text&&symptoms.length===0){showToast('내용을 입력해주세요');return;}
    saveJournalEntry(text,symptoms,energy);showToast('저널이 저장됐어요 ✓');renderHistoryList();
  });
}

function saveJournalEntry(text,symptoms=[],energy=5){
  const todayKey=fmtInput(new Date());
  const journals=JSON.parse(localStorage.getItem('luna_journals')||'{}');
  journals[todayKey]={text,symptoms,energy,mood:S.moodToday?.emoji||'',phase:S.todayPhase||'',date:todayKey};
  localStorage.setItem('luna_journals',JSON.stringify(journals));
  $('journalQuick').value=text;
  renderHistoryList();
}

function renderHistoryList(){
  const journals=JSON.parse(localStorage.getItem('luna_journals')||'{}');
  const keys=Object.keys(journals).sort().reverse();
  const el=$('historyList');
  if(keys.length===0){el.innerHTML=`<div class="history-empty">아직 기록이 없어요<br>오늘의 감정을 기록해봐요 🌸</div>`;return;}
  el.innerHTML=keys.slice(0,20).map(k=>{const j=journals[k];const[y,m,d]=k.split('-');return`<div class="history-item"><div class="hi-date">${y}년 ${parseInt(m)}월 ${parseInt(d)}일</div><div class="hi-mood">${j.mood||''}</div><div class="hi-text">${j.text?j.text.slice(0,80)+(j.text.length>80?'...':''):''}</div>${j.phase?`<div class="hi-phase">${PHASE_KO[j.phase]||j.phase}</div>`:''}</div>`;}).join('');
}

function bindMood(){
  document.querySelectorAll('.mood-btn').forEach(btn=>{btn.addEventListener('click',function(){
    const emoji=this.dataset.mood;const label=this.dataset.label;
    S.moodToday={emoji,label};highlightMood(emoji);$('moodSelected').textContent=label;
    const moods=JSON.parse(localStorage.getItem('luna_moods')||'{}');
    moods[fmtInput(new Date())]={emoji,label};
    localStorage.setItem('luna_moods',JSON.stringify(moods));
    showToast(`오늘 기분: ${label} ${emoji}`);
  });});
}

function highlightMood(emoji){document.querySelectorAll('.mood-btn').forEach(b=>b.classList.toggle('selected',b.dataset.mood===emoji));}

function bindSettings(){
  $('settingsSave').addEventListener('click',()=>{
    S.lastPeriod=$('setLastPeriod').value;
    S.cycleLen=parseInt($('setCycleLen').value)||28;
    S.periodLen=parseInt($('setPeriodLen').value)||5;
    saveSettings();refreshDashboard();showToast('설정이 저장됐어요 ✓');navigateTo('dashboard');
  });
}

function bindCalNav(){
  $('calPrev').addEventListener('click',()=>{S.calMonth--;if(S.calMonth<0){S.calMonth=11;S.calYear--;}renderCalendarPage();});
  $('calNext').addEventListener('click',()=>{S.calMonth++;if(S.calMonth>11){S.calMonth=0;S.calYear++;}renderCalendarPage();});
}

function renderCalendarPage(){
  if(!S.lastPeriod)return;
  $('calMonthTitle').textContent=`${S.calYear}년 ${MONTHS_KO[S.calMonth]}`;
  const days=calcCalendar(S.lastPeriod,S.cycleLen,S.periodLen,S.calYear,S.calMonth);
  const grid=$('calDays');grid.innerHTML='';
  const firstDow=new Date(S.calYear,S.calMonth,1).getDay();
  const todayStr=fmtInput(new Date());
  for(let i=0;i<firstDow;i++){const el=document.createElement('div');el.className='cal-day empty';grid.appendChild(el);}
  days.forEach(({day,phase,label,emoji})=>{
    const date=new Date(S.calYear,S.calMonth,day);
    const dow=date.getDay();const dStr=fmtInput(date);
    const el=document.createElement('div');
    let cls=`cal-day ${phase}`;
    if(dow===0)cls+=' sunday';if(dow===6)cls+=' saturday';if(dStr===todayStr)cls+=' today';
    el.className=cls;el.innerHTML=`<span class="cal-day-num">${day}</span><span class="cal-day-icon">${emoji}</span>`;
    el.title=label;grid.appendChild(el);
  });
}

function showToast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}