/* Страница курса целиком строится из sitemap.js: план по неделям, страницы, файлы, задания, оценивание. */
(function () {
  var S = window.SITE, D = window.SITE_DATA, url = window.SITE_URL, NOW = window.SITE_NOW;
  var id = document.body.getAttribute('data-course'), c = null;
  S.courses.forEach(function (x) { if (x.id === id) c = x; });
  var m = document.querySelector('main');
  document.title = c.short + ' — ' + c.title;

  function fileLink(f) {
    var name = f.split('/').pop();
    return '<li><a href="' + url(c.materials, f) + '">' + D.esc(name) + '</a></li>';
  }

  var h = '<div class="phead"><div class="kicker">' + c.code + '</div><h1>' + c.title + '</h1>' +
    '<p class="sub">' + D.esc(c.teacher) + '</p>' +
    (c.recurring ? '<p class="sub small"><b>Каждую неделю:</b> ' + c.recurring + '</p>' : '') + '</div>';

  // справочные страницы без недели (калькуляторы, таблицы)
  var ref = c.pages.filter(function (p) { return p.w === 0; }).concat((c.extras || []).map(function (e) { return { href: e.href, title: e.title, mat: true }; }));
  if (ref.length) {
    h += '<div class="pl" style="margin-bottom:18px">';
    ref.forEach(function (p) { h += '<a href="' + url(p.mat ? c.materials : c.dir, p.href) + '">' + p.title + '</a>'; });
    h += '</div>';
  }

  for (var w = 1; w <= S.term.weeks; w++) {
    var wk = c.weeks.filter(function (x) { return x.w === w; })[0] || {};
    var pages = c.pages.filter(function (p) { return p.w === w; });
    var tasks = c.tasks.filter(function (t) { return t.w === w; });
    h += '<section class="wk' + (w === NOW ? ' cur' : '') + '" id="w' + w + '">' +
      '<h3>Неделя ' + w + ' <small>' + D.weekRange(w) + (w === NOW ? ' · сейчас' : '') + '</small></h3>' +
      '<p class="tp">' + D.esc(wk.topic || '') + '</p>';
    if (pages.length) {
      h += '<div class="pl">';
      pages.forEach(function (p) { h += '<a class="pg" href="' + url(c.dir, p.href) + '">' + p.title + '</a>'; });
      h += '</div>';
    }
    tasks.forEach(function (t) {
      h += '<div class="tk">' + D.badge(t) + '<b>' + D.esc(t.title) + '</b><span class="pts">' + D.taskWhen(t) + ' · ' + t.pts + (t.dueNote ? ' · ' + t.dueNote : '') + '</span></div>';
      if (t.files) h += '<ul class="files">' + t.files.map(fileLink).join('') + '</ul>';
    });
    if (wk.files) h += '<ul class="files">' + wk.files.map(fileLink).join('') + '</ul>';
    h += '</section>';
  }

  var fin = c.tasks.filter(function (t) { return t.w > S.term.weeks; });
  if (fin.length) {
    h += '<section class="wk" id="final"><h3>Сессия <small>16–28.11</small></h3>';
    fin.forEach(function (t) { h += '<div class="tk">' + D.badge(t) + '<b>' + D.esc(t.title) + '</b><span class="pts">' + t.pts + '</span></div>'; });
    h += '</section>';
  }

  h += '<h2>Оценивание и правила</h2><div class="info"><div class="card"><h3>Формула</h3><p style="margin:0">' + D.esc(c.formula) + '</p>' +
    (c.taskNote ? '<p class="small muted" style="margin:8px 0 0">' + D.esc(c.taskNote) + '</p>' : '') + '</div>' +
    '<div class="card"><h3>Важно</h3><ul>' + c.rules.map(function (r) { return '<li>' + D.esc(r) + '</li>'; }).join('') + '</ul></div></div>';
  if (c.note) h += '<p class="small muted">' + D.esc(c.note) + '</p>';
  h += '<p class="small"><a href="' + url('../Syllabi/', c.syllabus) + '">Силлабус (оригинал)</a> <span class="muted">— только на компьютере, онлайн его нет</span></p>';

  m.innerHTML = h;
  if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
})();
