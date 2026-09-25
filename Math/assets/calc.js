
/* ============================================================================
   1. МАТЕМАТИЧЕСКОЕ ЯДРО — точные p-value без внешних библиотек
   ============================================================================ */

// Логарифм гамма-функции (аппроксимация Ланцоша)
function lgamma(x){
  const g=[676.5203681218851,-1259.1392167224028,771.32342877765313,
           -176.61502916214059,12.507343278686905,-0.13857109526572012,
           9.9843695780195716e-6,1.5056327351493116e-7];
  if(x<0.5) return Math.log(Math.PI/Math.sin(Math.PI*x))-lgamma(1-x);
  x-=1;
  let a=0.99999999999980993, t=x+7.5;
  for(let i=0;i<8;i++) a+=g[i]/(x+i+1);
  return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a);
}
function lnFact(n){ return lgamma(n+1); }
function lnChoose(n,k){ return lnFact(n)-lnFact(k)-lnFact(n-k); }

// Непрерывная дробь для неполной бета-функции (Numerical Recipes)
function betacf(a,b,x){
  const TINY=1e-300, EPS=3e-14;
  let qab=a+b, qap=a+1, qam=a-1;
  let c=1, d=1-qab*x/qap;
  if(Math.abs(d)<TINY) d=TINY;
  d=1/d; let h=d;
  for(let m=1;m<=300;m++){
    const m2=2*m;
    let aa=m*(b-m)*x/((qam+m2)*(a+m2));
    d=1+aa*d; if(Math.abs(d)<TINY) d=TINY;
    c=1+aa/c; if(Math.abs(c)<TINY) c=TINY;
    d=1/d; h*=d*c;
    aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));
    d=1+aa*d; if(Math.abs(d)<TINY) d=TINY;
    c=1+aa/c; if(Math.abs(c)<TINY) c=TINY;
    d=1/d;
    const del=d*c; h*=del;
    if(Math.abs(del-1)<EPS) break;
  }
  return h;
}
// Регуляризованная неполная бета-функция I_x(a,b)
function betai(a,b,x){
  if(x<=0) return 0;
  if(x>=1) return 1;
  const bt=Math.exp(lgamma(a+b)-lgamma(a)-lgamma(b)+a*Math.log(x)+b*Math.log(1-x));
  return (x < (a+1)/(a+b+2)) ? bt*betacf(a,b,x)/a : 1-bt*betacf(b,a,1-x)/b;
}
// Двусторонний p-value для распределения Стьюдента
function tPvalue(t,df){ return betai(df/2, 0.5, df/(df+t*t)); }
// Правый хвост F-распределения: P(F > f)
function fTail(f,d1,d2){ return betai(d2/2, d1/2, d2/(d2+d1*f)); }

/* ============================================================================
   2. ТАБЛИЦЫ КРИТИЧЕСКИХ ЗНАЧЕНИЙ
   ============================================================================ */

// Таблица Стьюдента: df -> [p=0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.02, 0.01, 0.001]
const T_P = [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0.05,0.02,0.01,0.001];
const T_TABLE = {
  1:[.158,.325,.510,.727,1.00,1.38,1.96,3.08,6.31,12.7,31.8,63.7,637],
  2:[.142,.289,.445,.617,.816,1.06,1.39,1.89,2.92,4.30,6.96,9.92,31.6],
  3:[.137,.277,.424,.584,.765,.978,1.25,1.64,2.35,3.18,4.54,5.84,12.9],
  4:[.134,.271,.414,.569,.741,.941,1.19,1.53,2.13,2.78,3.75,4.60,8.61],
  5:[.132,.267,.408,.559,.727,.920,1.16,1.48,2.02,2.57,3.36,4.03,6.87],
  6:[.131,.265,.404,.553,.718,.906,1.13,1.44,1.94,2.45,3.14,3.71,5.96],
  7:[.130,.263,.402,.549,.711,.896,1.12,1.41,1.89,2.36,3.00,3.50,5.41],
  8:[.130,.262,.399,.546,.706,.889,1.11,1.40,1.86,2.31,2.90,3.36,5.04],
  9:[.129,.261,.398,.543,.703,.883,1.10,1.38,1.83,2.26,2.82,3.25,4.78],
  10:[.129,.260,.397,.542,.700,.879,1.09,1.37,1.81,2.23,2.76,3.17,4.59],
  11:[.129,.260,.396,.540,.697,.876,1.09,1.36,1.80,2.20,2.72,3.11,4.44],
  12:[.128,.259,.395,.539,.695,.873,1.08,1.36,1.78,2.18,2.68,3.05,4.32],
  13:[.128,.259,.394,.538,.694,.870,1.08,1.35,1.77,2.16,2.65,3.01,4.22],
  14:[.128,.258,.393,.537,.692,.868,1.08,1.35,1.76,2.14,2.62,2.98,4.14],
  15:[.128,.258,.393,.536,.691,.866,1.07,1.34,1.75,2.13,2.60,2.95,4.07],
  16:[.128,.258,.392,.535,.690,.865,1.07,1.34,1.75,2.12,2.58,2.92,4.02],
  17:[.128,.257,.392,.534,.689,.863,1.07,1.33,1.74,2.11,2.57,2.90,3.97],
  18:[.127,.257,.392,.534,.688,.862,1.07,1.33,1.73,2.10,2.55,2.88,3.92],
  19:[.127,.257,.391,.533,.688,.861,1.07,1.33,1.73,2.09,2.54,2.86,3.88],
  20:[.127,.257,.391,.533,.687,.860,1.06,1.33,1.72,2.09,2.53,2.85,3.85],
  21:[.127,.257,.391,.532,.686,.859,1.06,1.32,1.72,2.08,2.52,2.83,3.82],
  22:[.127,.256,.390,.532,.686,.858,1.06,1.32,1.72,2.07,2.51,2.82,3.79],
  23:[.127,.256,.390,.532,.685,.858,1.06,1.32,1.71,2.07,2.50,2.81,3.77],
  24:[.127,.256,.390,.531,.685,.857,1.06,1.32,1.71,2.06,2.49,2.80,3.75],
  25:[.127,.256,.390,.531,.684,.856,1.06,1.32,1.71,2.06,2.49,2.79,3.73],
  26:[.127,.256,.390,.531,.684,.856,1.06,1.32,1.71,2.06,2.48,2.78,3.71],
  27:[.127,.256,.389,.531,.684,.855,1.06,1.31,1.70,2.05,2.47,2.77,3.69],
  28:[.127,.256,.389,.530,.683,.855,1.06,1.31,1.70,2.05,2.47,2.76,3.67],
  29:[.127,.256,.389,.530,.683,.854,1.06,1.31,1.70,2.05,2.46,2.76,3.66],
  30:[.127,.256,.389,.530,.683,.854,1.06,1.31,1.70,2.04,2.46,2.75,3.65],
  40:[.126,.255,.388,.529,.681,.851,1.05,1.30,1.68,2.02,2.42,2.70,3.55],
  60:[.126,.254,.387,.527,.679,.848,1.05,1.30,1.67,2.00,2.39,2.66,3.46],
  120:[.126,.254,.386,.526,.677,.845,1.04,1.29,1.66,1.98,2.36,2.62,3.37],
  Infinity:[.126,.253,.385,.524,.674,.842,1.04,1.28,1.65,1.96,2.33,2.58,3.29]
};

// Таблица F-критерия, alpha = 0.05. Ключ — k2 (знаменатель), массив по k1 = [1,2,3,4,5,6,8,12,24,inf]
const F_K1 = [1,2,3,4,5,6,8,12,24,Infinity];
const F_TABLE = {
  1:[161.45,199.50,215.72,224.57,230.17,233.97,238.89,243.91,249.04,254.32],
  2:[18.51,19.00,19.16,19.25,19.30,19.33,19.37,19.41,19.45,19.50],
  3:[10.13,9.55,9.28,9.12,9.01,8.94,8.84,8.74,8.64,8.53],
  4:[7.71,6.94,6.59,6.39,6.26,6.16,6.04,5.91,5.77,5.63],
  5:[6.61,5.79,5.41,5.19,5.05,4.95,4.82,4.68,4.53,4.36],
  6:[5.99,5.14,4.76,4.53,4.39,4.28,4.15,4.00,3.84,3.67],
  7:[5.59,4.74,4.35,4.12,3.97,3.87,3.73,3.57,3.41,3.23],
  8:[5.32,4.46,4.07,3.84,3.69,3.58,3.44,3.28,3.12,2.93],
  9:[5.12,4.26,3.86,3.63,3.48,3.37,3.23,3.07,2.90,2.71],
  10:[4.96,4.10,3.71,3.48,3.33,3.22,3.07,2.91,2.74,2.54],
  11:[4.84,3.98,3.59,3.36,3.20,3.09,2.95,2.79,2.61,2.40],
  12:[4.75,3.88,3.49,3.26,3.11,3.00,2.85,2.69,2.50,2.30],
  13:[4.67,3.80,3.41,3.18,3.02,2.92,2.77,2.60,2.42,2.21],
  14:[4.60,3.74,3.34,3.11,2.96,2.85,2.70,2.53,2.35,2.13],
  15:[4.54,3.68,3.29,3.06,2.90,2.79,2.64,2.48,2.29,2.07],
  16:[4.49,3.63,3.24,3.01,2.85,2.74,2.59,2.42,2.24,2.01],
  17:[4.45,3.59,3.20,2.96,2.81,2.70,2.55,2.38,2.19,1.96],
  18:[4.41,3.55,3.16,2.93,2.77,2.66,2.51,2.34,2.15,1.92],
  19:[4.38,3.52,3.13,2.90,2.74,2.63,2.48,2.31,2.11,1.88],
  20:[4.35,3.49,3.10,2.87,2.71,2.60,2.45,2.28,2.08,1.84],
  21:[4.32,3.47,3.07,2.84,2.68,2.57,2.42,2.25,2.05,1.81],
  22:[4.30,3.44,3.05,2.82,2.66,2.55,2.40,2.23,2.03,1.78],
  23:[4.28,3.42,3.03,2.80,2.64,2.53,2.38,2.20,2.00,1.76],
  24:[4.26,3.40,3.01,2.78,2.62,2.51,2.36,2.18,1.98,1.73],
  25:[4.24,3.38,2.99,2.76,2.60,2.49,2.34,2.16,1.96,1.71],
  26:[4.22,3.37,2.98,2.74,2.59,2.47,2.32,2.15,1.95,1.69],
  27:[4.21,3.35,2.96,2.73,2.57,2.46,2.30,2.13,1.93,1.67]
};

// Табличное t: ближайшее df не больше заданного (консервативно)
function tCrit(df,alpha){
  const col=T_P.indexOf(alpha);
  if(col<0) return null;
  const keys=Object.keys(T_TABLE).map(Number).sort((a,b)=>a-b);
  if(T_TABLE[df]) return {v:T_TABLE[df][col],df:df,exact:true};
  let use=keys[0];
  for(const k of keys){ if(k<=df) use=k; }
  return {v:T_TABLE[use][col],df:use,exact:false};
}

/* ============================================================================
   3. РЕНДЕР ТАБЛИЦ НА СТРАНИЦЕ
   ============================================================================ */
(function renderTables(){
  const tb=document.getElementById('ttable-body');
  if(!tb) return;
  const keys=Object.keys(T_TABLE).map(Number).sort((a,b)=>a-b);
  tb.innerHTML=keys.map(df=>{
    const label = df===Infinity ? '∞' : df;
    return '<tr><th>'+label+'</th>'+T_TABLE[df].map((v,i)=>
      '<td class="num'+(T_P[i]===0.05?' hl':'')+'">'+String(v).replace('.',',')+'</td>').join('')+'</tr>';
  }).join('');

  const fb=document.getElementById('ftable-body');
  if(!fb) return;
  fb.innerHTML=Object.keys(F_TABLE).map(Number).sort((a,b)=>a-b).map(k2=>
    '<tr><th>'+k2+'</th>'+F_TABLE[k2].map(v=>
      '<td class="num">'+v.toFixed(2).replace('.',',')+'</td>').join('')+'</tr>'
  ).join('');
})();

/* ============================================================================
   4. КАЛЬКУЛЯТОРЫ
   ============================================================================ */
const $=id=>document.getElementById(id);
const fmt=(x,d=4)=>{
  if(!isFinite(x)) return '—';
  if(Math.abs(x)!==0 && Math.abs(x)<1e-4) return x.toExponential(2);
  return x.toFixed(d).replace(/\.?0+$/,'') || '0';
};
const pFmt=p=> p<1e-4 ? p.toExponential(2) : p.toFixed(4);

// Разбор текста в массив чисел
function parseNums(str){
  return (str||'').replace(/,(?=\d)/g,'.').split(/[\s,;\n\t]+/)
    .filter(s=>s.length && s!=='-' && s!=='—')
    .map(Number).filter(n=>isFinite(n));
}
function stats(a){
  const n=a.length, mean=a.reduce((s,x)=>s+x,0)/n;
  const ss=a.reduce((s,x)=>s+(x-mean)**2,0);
  const v=n>1?ss/(n-1):NaN;
  return {n,mean,ss,v,sd:Math.sqrt(v)};
}
const kv=(k,v)=>'<div class="kv"><span>'+k+'</span><span>'+v+'</span></div>';
const err=m=>'<div class="err">⚠ '+m+'</div>';
function concl(reject,text){
  return '<div class="concl '+(reject?'bad':'ok')+'">'+(reject?'✕ H₀ отвергается. ':'✓ H₀ не отвергается. ')+text+'</div>';
}
// Общий блок вывода по t-статистике
function tVerdict(t,df,alpha,what){
  const p=tPvalue(t,df), tc=tCrit(df,alpha);
  let html=kv('t вычисленное',fmt(t,3))+kv('df',df);
  if(tc) html+=kv('t критическое (α='+String(alpha).replace('.',',')+(tc.exact?'':', df='+tc.df+' по таблице')+')',fmt(tc.v,3));
  html+=kv('p-value (двусторонний)',pFmt(p));
  const reject=p<alpha;
  return html+concl(reject, reject
    ? what+' статистически значимы (p &lt; '+String(alpha).replace('.',',')+').'
    : what+' статистически не значимы — различие можно объяснить случайностью выборки.');
}

const CALCS={
  desc(){
    const a=parseNums($('d-data').value);
    if(a.length<2) return err('Нужно минимум 2 числа.');
    const s=stats(a);
    const sorted=[...a].sort((x,y)=>x-y);
    const mad=a.reduce((t,x)=>t+Math.abs(x-s.mean),0)/s.n;
    const med=s.n%2 ? sorted[(s.n-1)/2] : (sorted[s.n/2-1]+sorted[s.n/2])/2;
    return kv('n',s.n)
      +kv('Среднее x̄',fmt(s.mean))
      +kv('Медиана',fmt(med))
      +kv('Размах R',fmt(sorted[s.n-1]-sorted[0]))
      +kv('Сумма квадратов отклонений Σ(x−x̄)²',fmt(s.ss))
      +kv('Среднее линейное отклонение d̄',fmt(mad))
      +kv('Дисперсия выборочная s² (÷ n−1)',fmt(s.v))
      +kv('Дисперсия генеральная σ² (÷ n)',fmt(s.ss/s.n))
      +kv('Стандартное отклонение s',fmt(s.sd))
      +kv('Коэффициент вариации V',fmt(s.sd/s.mean*100,2)+' %')
      +'<div class="concl '+(s.sd/Math.abs(s.mean)*100<33?'ok':'bad')+'">'
      +(s.sd/Math.abs(s.mean)*100<33
        ? 'V &lt; 33 % — совокупность однородна.'
        : 'V ≥ 33 % — совокупность неоднородна, среднее плохо описывает данные.')+'</div>';
  },

  t1(){
    const a=parseNums($('t1-data').value), mu=Number(String($('t1-mu').value).replace(',','.'));
    const alpha=Number($('t1-a').value);
    if(a.length<2) return err('Нужно минимум 2 значения.');
    if(!isFinite(mu)) return err('Укажите эталонное значение μ₀.');
    const s=stats(a), t=(s.mean-mu)/(s.sd/Math.sqrt(s.n));
    return kv('n',s.n)+kv('x̄',fmt(s.mean))+kv('μ₀',fmt(mu))+kv('s',fmt(s.sd))
      +tVerdict(t,s.n-1,alpha,'Отличие среднего от эталонного значения');
  },

  tp(){
    const a=parseNums($('tp-a').value), b=parseNums($('tp-b').value);
    const alpha=Number($('tp-al').value);
    if(a.length!==b.length) return err('Выборки должны быть одинаковой длины: сейчас '+a.length+' и '+b.length+'.');
    if(a.length<2) return err('Нужно минимум 2 пары.');
    const d=a.map((x,i)=>x-b[i]), s=stats(d), t=s.mean/(s.sd/Math.sqrt(s.n));
    return kv('n пар',s.n)
      +kv('Разности dᵢ',d.map(x=>fmt(x,2)).join('; '))
      +kv('Среднее разностей d̄',fmt(s.mean))
      +kv('s_d',fmt(s.sd))
      +tVerdict(t,s.n-1,alpha,'Различия между измерениями «до» и «после»');
  },

  ti(){
    const a=parseNums($('ti-a').value), b=parseNums($('ti-b').value);
    const alpha=Number($('ti-al').value);
    if(a.length<2||b.length<2) return err('В каждой выборке нужно минимум 2 значения.');
    const s1=stats(a), s2=stats(b);
    const df=s1.n+s2.n-2;
    // основная формула — из лекции (слайд 14): Sd = sqrt(Sx²/n₁ + Sy²/n₂)
    const Sd=Math.sqrt(s1.v/s1.n+s2.v/s2.n);
    const t=(s1.mean-s2.mean)/Sd;
    // справочно — классический вариант с объединённой дисперсией
    const sp=((s1.n-1)*s1.v+(s2.n-1)*s2.v)/(s1.n+s2.n-2);
    const tPooled=(s1.mean-s2.mean)/Math.sqrt(sp*(1/s1.n+1/s2.n));
    // сопутствующая проверка равенства дисперсий
    const big=Math.max(s1.v,s2.v), small=Math.min(s1.v,s2.v);
    const F=big/small;
    const d1=(s1.v>=s2.v?s1.n:s2.n)-1, d2=(s1.v>=s2.v?s2.n:s1.n)-1;
    const fp=fTail(F,d1,d2)*2;
    return kv('n₁ / x̄₁ / s²₁',s1.n+' / '+fmt(s1.mean)+' / '+fmt(s1.v))
      +kv('n₂ / x̄₂ / s²₂',s2.n+' / '+fmt(s2.mean)+' / '+fmt(s2.v))
      +kv('Sd = √(s²₁/n₁ + s²₂/n₂) — формула лекции',fmt(Sd,4))
      +tVerdict(t,df,alpha,'Различия средних двух групп')
      +'<div class="kv" style="margin-top:8px"><span>Вариант с объединённой дисперсией (s²ₚ = '
      +fmt(sp,2)+')</span><span>t = '+fmt(tPooled,3)+'</span></div>'
      +'<div class="concl" style="font-weight:500;color:var(--text-dim)">Проверка предпосылки: F = '+fmt(F,3)
      +' (df '+d1+'; '+d2+'), p = '+pFmt(Math.min(fp,1))+' → дисперсии '
      +(Math.min(fp,1)<0.05?'<b class="bad">различаются значимо</b> — корректнее t-тест Уэлча.':'<b class="ok">однородны</b>, объединённая дисперсия применима.')
      +'</div>';
  },

  f(){
    const alpha=Number($('f-al').value);
    const ra=parseNums($('f-a').value), rb=parseNums($('f-b').value);
    let v1,n1,v2,n2;
    if(ra.length>1 && rb.length>1){
      const s1=stats(ra), s2=stats(rb);
      v1=s1.v; n1=s1.n; v2=s2.v; n2=s2.n;
    } else {
      v1=Number(String($('f-s1').value).replace(',','.')); n1=Number($('f-n1').value);
      v2=Number(String($('f-s2').value).replace(',','.')); n2=Number($('f-n2').value);
      if(![v1,n1,v2,n2].every(x=>isFinite(x)&&x>0))
        return err('Заполните либо обе выборки сырыми данными, либо все четыре поля s² и n.');
      if(n1<2||n2<2) return err('Объём каждой выборки должен быть не меньше 2.');
    }
    const swap=v2>v1;
    const big=swap?v2:v1, small=swap?v1:v2;
    const d1=(swap?n2:n1)-1, d2=(swap?n1:n2)-1;
    const F=big/small;
    const p=Math.min(fTail(F,d1,d2)*2,1);   // двусторонний
    const fc=F_TABLE[d2] ? F_TABLE[d2][F_K1.indexOf(d1)] : undefined;
    let html=kv('s² в числителе (бо́льшая)',fmt(big)+(swap?'  ← выборка 2':'  ← выборка 1'))
      +kv('s² в знаменателе',fmt(small))
      +kv('F вычисленное',fmt(F,4))
      +kv('df₁ (числитель) / df₂ (знаменатель)',d1+' / '+d2);
    if(fc!==undefined) html+=kv('F критическое (α=0,05) по таблице',fmt(fc,2));
    html+=kv('p-value (двусторонний)',pFmt(p));
    const reject=p<alpha;
    return html+concl(reject, reject
      ? 'Дисперсии различаются <b>значимо</b> — группы имеют разную степень однородности.'
      : 'Различие между оценками дисперсий <b>случайное, несущественное</b> — дисперсии можно считать равными.');
  },

  fe(){
    const a=+$('fe-a').value, b=+$('fe-b').value, c=+$('fe-c').value, d=+$('fe-d').value;
    const alpha=Number($('fe-al').value);
    if(![a,b,c,d].every(x=>Number.isInteger(x)&&x>=0)) return err('Все четыре ячейки — целые неотрицательные числа.');
    const n=a+b+c+d;
    if(n===0) return err('Таблица пуста.');
    const r1=a+b, r2=c+d, c1=a+c, c2=b+d;
    // вероятность конкретной таблицы через гипергеометрическое распределение
    const pT=x=>Math.exp(lnChoose(r1,x)+lnChoose(r2,c1-x)-lnChoose(n,c1));
    const obs=pT(a);
    const lo=Math.max(0,c1-r2), hi=Math.min(r1,c1);
    let two=0, left=0, right=0;
    for(let x=lo;x<=hi;x++){
      const p=pT(x);
      if(p<=obs*(1+1e-9)) two+=p;
      if(x<=a) left+=p;
      if(x>=a) right+=p;
    }
    two=Math.min(two,1);
    const oddsStr=(b*c===0||a*d===0)?'∞ или 0 (есть нулевая ячейка)':fmt(a*d/(b*c),3);
    const reject=two<alpha;
    return kv('Таблица',`[${a} ${b} | ${c} ${d}]`)
      +kv('Суммы по строкам / столбцам',r1+', '+r2+' / '+c1+', '+c2+'   (n = '+n+')')
      +kv('Доля в группе 1',(r1? fmt(a/r1*100,1):'—')+' %')
      +kv('Доля в группе 2',(r2? fmt(c/r2*100,1):'—')+' %')
      +kv('Отношение шансов (OR)',oddsStr)
      +kv('p наблюдаемой таблицы',pFmt(obs))
      +kv('p односторонний (левый хвост)',pFmt(Math.min(left,1)))
      +kv('p односторонний (правый хвост)',pFmt(Math.min(right,1)))
      +kv('p двусторонний',pFmt(two))
      +concl(reject, reject
        ? 'Связь между признаком и группой <b>статистически значима</b>.'
        : 'Оснований считать связь значимой нет — распределение частот объяснимо случайностью.');
  }
};

document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-calc]');
  if(!btn) return;
  const key=btn.dataset.calc;
  const out=$('out-'+key);
  try{ out.innerHTML=CALCS[key](); }
  catch(ex){ out.innerHTML=err('Ошибка в данных: '+ex.message); }
});