const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/cycle', (req, res) => {
  const { lastPeriod, cycleLen = 28, periodLen = 5 } = req.body;
  if (!lastPeriod) return res.status(400).json({ error: 'lastPeriod required' });

  const base  = new Date(lastPeriod + 'T00:00:00');
  const cycle = +cycleLen, period = +periodLen;
  const ovDay = cycle - 14, fertileStart = ovDay - 5;
  const today = new Date(); today.setHours(0,0,0,0);

  res.json({
    today:        getDayInfo(today, base, cycle, period, ovDay, fertileStart),
    upcoming:     getUpcoming(base, cycle, today),
    weekDays:     getWeekDays(base, cycle, period, ovDay, fertileStart, today),
    phaseSummary: getPhaseSummary(base, cycle, period, ovDay, fertileStart, today),
  });
});

app.post('/api/calendar', (req, res) => {
  const { lastPeriod, cycleLen = 28, periodLen = 5, year, month } = req.body;
  if (!lastPeriod) return res.status(400).json({ error: 'lastPeriod required' });

  const base  = new Date(lastPeriod + 'T00:00:00');
  const cycle = +cycleLen, period = +periodLen;
  const ovDay = cycle - 14, fertileStart = ovDay - 5;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    date.setHours(0,0,0,0);
    days.push({ day: d, ...getDayInfo(date, base, cycle, period, ovDay, fertileStart) });
  }

  const today = new Date(); today.setHours(0,0,0,0);
  res.json({ days, upcoming: getUpcoming(base, cycle, today), phaseSummary: getPhaseSummary(base, cycle, period, ovDay, fertileStart, today) });
});

function getDayInfo(date, base, cycle, period, ovDay, fertileStart) {
  const diff       = Math.round((date - base) / 86400000);
  const dayInCycle = ((diff % cycle) + cycle) % cycle;
  const isNext     = diff > 0 && dayInCycle < period && diff >= cycle;

  if (isNext)                                           return { phase:'next-period', label:'예상 생리일',            emoji:'🩸' };
  if (dayInCycle < period)                              return { phase:'menstrual',   label:`생리 ${dayInCycle+1}일째`, emoji:'🩸' };
  if (dayInCycle === ovDay)                             return { phase:'ovulation',   label:'배란일',                 emoji:'🌕' };
  if (dayInCycle >= fertileStart && dayInCycle < ovDay) return { phase:'fertile',     label:'가임기',                 emoji:'🌿' };
  if (dayInCycle < ovDay)                               return { phase:'follicular',  label:'여포기',                 emoji:'🌱' };
  return                                                       { phase:'luteal',      label:'황체기',                 emoji:'🍂' };
}

function getUpcoming(base, cycle, today) {
  const diff = Math.round((today - base) / 86400000);
  let mult   = Math.ceil(diff / cycle); if (mult <= 0) mult = 1;
  const nextP = new Date(base); nextP.setDate(base.getDate() + mult * cycle);
  const nextO = new Date(base); nextO.setDate(base.getDate() + mult * cycle - 14);
  if (nextO < today) nextO.setDate(nextO.getDate() + cycle);
  return {
    nextPeriod:      fmt(nextP),
    daysUntilPeriod: Math.round((nextP - today) / 86400000),
    nextOvulation:   fmt(nextO),
    daysUntilOv:     Math.round((nextO - today) / 86400000),
    inPeriod:        Math.round((nextP - today) / 86400000) <= 0,
  };
}

function getWeekDays(base, cycle, period, ovDay, fertileStart, today) {
  const week = [];
  for (let i = -1; i <= 5; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    week.push({ date: fmtInput(d), day: d.getDate(), dow: d.getDay(), isToday: i === 0, ...getDayInfo(d, base, cycle, period, ovDay, fertileStart) });
  }
  return week;
}

function getPhaseSummary(base, cycle, period, ovDay, fertileStart, today) {
  const diff = Math.round((today - base) / 86400000);
  const mult = Math.max(Math.ceil(diff / cycle), 1);
  const cb   = new Date(base); cb.setDate(base.getDate() + (mult-1)*cycle);
  const add  = (d,n) => { const r=new Date(d); r.setDate(r.getDate()+n); return r; };
  return [
    { emoji:'🩸', name:'생리기', from:fmt(cb),                   to:fmt(add(cb,period-1))       },
    { emoji:'🌱', name:'여포기', from:fmt(add(cb,period)),        to:fmt(add(cb,fertileStart-1)) },
    { emoji:'🌿', name:'가임기', from:fmt(add(cb,fertileStart)),  to:fmt(add(cb,ovDay-1))        },
    { emoji:'🌕', name:'배란일', from:fmt(add(cb,ovDay)),         to:fmt(add(cb,ovDay))          },
    { emoji:'🍂', name:'황체기', from:fmt(add(cb,ovDay+1)),       to:fmt(add(cb,cycle-1))        },
  ];
}

function fmt(d)      { return `${d.getMonth()+1}월 ${d.getDate()}일`; }
function fmtInput(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`\n🌙 Luna Cycle`);
  console.log(`👉  http://localhost:${PORT}\n`);
});
