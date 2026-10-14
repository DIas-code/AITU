/* Живые графики и расчёты для страниц Programming (недели 5–6).
   Plotly.js грузится из интернета (как подсветка кода). Без интернета — вместо графика подсказка.
   Данные студентов — week5/students.js (копия University Students 2026 New.csv). */
(function () {
  var PLOTLY = 'https://cdn.jsdelivr.net/npm/plotly.js-dist-min@2.35.2/plotly.min.js';
  var queue = [], state = 0; // 0 — не грузили, 1 — грузится, 2 — готово, 3 — ошибка

  function load(cb) {
    if (state === 2) return cb(window.Plotly);
    if (state === 3) return;
    queue.push(cb);
    if (state === 1) return;
    state = 1;
    var s = document.createElement('script');
    s.src = PLOTLY;
    s.onload = function () { state = 2; queue.forEach(function (f) { f(window.Plotly); }); queue = []; };
    s.onerror = function () {
      state = 3;
      document.querySelectorAll('.chart').forEach(function (d) {
        d.innerHTML = '<div class="wait">График рисует Plotly.js из интернета — сейчас он не загрузился. Код выше всё равно верный.</div>';
      });
    };
    document.head.appendChild(s);
  }

  // общий вид графиков — близко к оформлению сайта
  var BASE = {
    font: { family: 'Segoe UI, Inter, system-ui, Arial, sans-serif', size: 12.5, color: '#1a1f24' },
    margin: { l: 56, r: 18, t: 44, b: 52 },
    paper_bgcolor: '#fff', plot_bgcolor: '#fff',
    title: { font: { size: 14.5 }, x: 0.02, xanchor: 'left' },
    legend: { orientation: 'h', y: -0.2 },
    colorway: ['#2f6fb5', '#e0802f', '#2c9a68', '#c8463c', '#7b59b0', '#8a6d3b']
  };
  function merge(a, b) {
    var o = {}, k;
    for (k in a) o[k] = a[k];
    for (k in b) o[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') ? merge(a[k], b[k]) : b[k];
    return o;
  }

  function draw(id, traces, layout, conf) {
    var el = typeof id === 'string' ? document.getElementById(id) : id;
    if (!el) return;
    if (!el.firstChild) el.innerHTML = '<div class="wait">Рисую график…</div>';
    load(function (P) {
      el.innerHTML = '';
      var lay = merge(BASE, layout || {});
      if (lay.title && typeof lay.title.text === 'undefined' && layout && typeof layout.title === 'string') lay.title = merge(BASE.title, { text: layout.title });
      P.react(el, traces, lay, merge({ responsive: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }, conf || {}));
    });
  }

  // ── данные студентов ──
  var rows = null;
  function students() {
    if (rows) return rows;
    var C = window.STUDENTS_COLS || [];
    rows = (window.STUDENTS || []).map(function (r) {
      var o = {}; C.forEach(function (c, i) { o[c] = r[i]; }); return o;
    });
    return rows;
  }

  // ── статистика как в pandas ──
  function num(a) { return a.filter(function (x) { return x !== null && x !== undefined && x === x; }); }
  var AGG = {
    count: function (a) { return num(a).length; },
    size: function (a) { return a.length; },
    sum: function (a) { return num(a).reduce(function (s, x) { return s + x; }, 0); },
    mean: function (a) { a = num(a); return a.length ? AGG.sum(a) / a.length : NaN; },
    median: function (a) {
      a = num(a).slice().sort(function (x, y) { return x - y; });
      var n = a.length, h = Math.floor(n / 2);
      return n ? (n % 2 ? a[h] : (a[h - 1] + a[h]) / 2) : NaN;
    },
    min: function (a) { return Math.min.apply(null, num(a)); },
    max: function (a) { return Math.max.apply(null, num(a)); },
    std: function (a) { // ddof=1, как .std() в pandas
      a = num(a); var m = AGG.mean(a), n = a.length;
      return n > 1 ? Math.sqrt(a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / (n - 1)) : NaN;
    }
  };
  function quantile(a, q) { // линейная интерполяция, как в pandas
    a = num(a).slice().sort(function (x, y) { return x - y; });
    var p = (a.length - 1) * q, lo = Math.floor(p), hi = Math.ceil(p);
    return a[lo] + (a[hi] - a[lo]) * (p - lo);
  }
  function corr(x, y) {
    var mx = AGG.mean(x), my = AGG.mean(y), sxy = 0, sxx = 0, syy = 0;
    for (var i = 0; i < x.length; i++) { var a = x[i] - mx, b = y[i] - my; sxy += a * b; sxx += a * a; syy += b * b; }
    return sxy / Math.sqrt(sxx * syy);
  }
  // groupby: ключи отсортированы, как в pandas по умолчанию
  function groupBy(data, keys) {
    keys = [].concat(keys);
    var m = {};
    data.forEach(function (r) {
      var k = keys.map(function (c) { return r[c]; });
      var id = JSON.stringify(k);
      (m[id] = m[id] || { key: k, rows: [] }).rows.push(r);
    });
    return Object.keys(m).map(function (id) { return m[id]; }).sort(function (a, b) {
      for (var i = 0; i < a.key.length; i++) {
        if (a.key[i] < b.key[i]) return -1;
        if (a.key[i] > b.key[i]) return 1;
      }
      return 0;
    });
  }
  function col(data, c) { return data.map(function (r) { return r[c]; }); }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }).sort(); }
  function fmt(x, d) {
    if (typeof x !== 'number' || x !== x) return 'NaN';
    if (Number.isInteger(x)) return String(x);
    return x.toFixed(d === undefined ? 2 : d);
  }

  // линейная регрессия y = a + b·x (для regplot)
  function linfit(x, y) {
    var mx = AGG.mean(x), my = AGG.mean(y), sxy = 0, sxx = 0;
    for (var i = 0; i < x.length; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) * (x[i] - mx); }
    var b = sxy / sxx; return { a: my - b * mx, b: b };
  }

  // переключатели .seg: кнопка с data-v, колбэк получает значение
  function seg(el, cb) {
    el = typeof el === 'string' ? document.getElementById(el) : el;
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      el.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      cb(b.getAttribute('data-v'));
    });
  }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // рисовать график, только когда он показался на экране — страница открывается быстро
  function whenVisible(id, fn) {
    var el = document.getElementById(id);
    if (!el) return;
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (ents) {
      if (ents[0].isIntersecting) { io.disconnect(); fn(); }
    }, { rootMargin: '300px' });
    io.observe(el);
  }

  window.LIVE = {
    load: load, draw: draw, students: students, AGG: AGG, quantile: quantile, corr: corr,
    groupBy: groupBy, col: col, uniq: uniq, fmt: fmt, linfit: linfit, seg: seg, esc: esc,
    whenVisible: whenVisible,
    PROG: ['Cybersecurity', 'Data Science', 'IT Management', 'Software Engineering'],
    NUM: ['admission_score', 'math_score', 'programming_score', 'english_score', 'attendance', 'assignments', 'final_score']
  };
})();
