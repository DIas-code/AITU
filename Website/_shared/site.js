/*
  Общая логика всех страниц. Страница сообщает о себе через <body>:
    data-root   — путь до папки Aitu (например "../../")
    data-course — id курса из sitemap.js (math, prog, eng, ped)
    data-page   — href страницы внутри курса ("week3/3-1-numpy.html" или "course")
  Отсюда рисуются шапка, полоска недель, кнопки «назад / дальше», подсветка кода.
*/
(function () {
  var S = window.SITE, body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var CID = body.getAttribute('data-course');
  var PAGE = body.getAttribute('data-page');
  var course = null;
  S.courses.forEach(function (c) { if (c.id === CID) course = c; });

  function url(dir, href) { return ROOT + encodeURI(dir + href); }
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  /* ── текущая неделя семестра ── */
  var DAY = 864e5;
  function weekOf(d) {
    var n = Math.floor((d - new Date(S.term.week1 + 'T00:00:00')) / (7 * DAY)) + 1;
    return n;
  }
  window.SITE_NOW = weekOf(new Date());
  window.SITE_URL = url;

  /* ── шапка ── */
  var nav = '<a class="brand" href="' + ROOT + 'index.html"><b>ADA-M</b>AITU</a><nav class="courses">';
  S.courses.forEach(function (c) {
    nav += '<a style="--c:' + c.color + '" class="' + (c === course ? 'on' : '') + '" href="' + url(c.dir, 'course.html') + '"><i></i>' + c.short + '</a>';
  });
  nav += '<a style="--c:#1a1f24" class="' + (PAGE === 'deadlines' ? 'on' : '') + '" href="' + ROOT + 'deadlines.html"><i></i>Дедлайны</a>';
  nav += '</nav>';
  var bi = false;
  if (course && PAGE !== 'course') course.pages.forEach(function (p) { if (p.href === PAGE && p.bi) bi = true; });
  if (bi) nav += '<button id="lang" type="button" title="Русский / English">EN</button>';

  var head = '<header class="top"><div class="bar">' + nav + '</div>';
  if (course) {
    document.documentElement.style.setProperty('--c', course.color);
    var cur = null;
    course.pages.forEach(function (p) { if (p.href === PAGE) cur = p; });
    head += '<div class="weeks" style="--c:' + course.color + '"><span class="lbl">Недели</span>';
    for (var w = 1; w <= S.term.weeks; w++) {
      var cls = (cur && cur.w === w ? 'on ' : '') + (w === window.SITE_NOW ? 'now' : '');
      head += '<a class="' + cls + '" href="' + url(course.dir, 'course.html') + '#w' + w + '">' + w + '</a>';
    }
    head += '</div>';
  }
  head += '</header>';
  body.insertBefore(el(head), body.firstChild);
  if (!document.querySelector('footer')) {
    body.appendChild(el('<footer>AITU · Applied Data Analytics · ' + S.term.name + '</footer>'));
  }

  /* ── назад / дальше внутри курса ── */
  var holder = document.getElementById('pager');
  if (holder && course) {
    var list = course.pages.filter(function (p) { return p.w > 0; });
    var i = -1;
    list.forEach(function (p, k) { if (p.href === PAGE) i = k; });
    var h = '';
    if (i > 0) h += '<a class="prev" href="' + url(course.dir, list[i - 1].href) + '"><span>← Назад · неделя ' + list[i - 1].w + '</span>' + list[i - 1].title + '</a>';
    if (i >= 0 && i < list.length - 1) h += '<a class="next" href="' + url(course.dir, list[i + 1].href) + '"><span>Дальше · неделя ' + list[i + 1].w + '</span>' + list[i + 1].title + '</a>';
    holder.className = 'pager';
    holder.innerHTML = h;
    if (i >= 0 && list[i].src) {
      holder.insertAdjacentHTML('afterend', '<p class="srcnote">Источник: <a href="' + url(course.materials, list[i].src) + '">' + list[i].src.split('/').pop() + '</a></p>');
    }
  }

  /* ── язык RU / EN (только для двуязычных страниц) ── */
  var btn = document.getElementById('lang');
  if (btn) {
    var H = document.documentElement;
    var setLang = function (l) {
      H.setAttribute('data-lang', l); H.setAttribute('lang', l);
      btn.textContent = l === 'ru' ? 'EN' : 'RU';
      try { localStorage.setItem('ada-m-lang', l); } catch (e) {}
    };
    var saved = 'ru';
    try { saved = localStorage.getItem('ada-m-lang') || 'ru'; } catch (e) {}
    var q = /[?&]lang=(ru|en)/.exec(location.search);
    setLang(q ? q[1] : saved);
    btn.addEventListener('click', function () { setLang(H.getAttribute('data-lang') === 'ru' ? 'en' : 'ru'); });
  }

  /* ── блоки кода: подсветка и кнопка «копировать» ── */
  var blocks = document.querySelectorAll('.code pre code');
  if (blocks.length) {
    blocks.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'copy'; b.type = 'button'; b.textContent = 'Копировать';
      b.onclick = function () {
        navigator.clipboard.writeText(c.innerText).then(function () {
          b.textContent = 'Скопировано'; setTimeout(function () { b.textContent = 'Копировать'; }, 1200);
        });
      };
      c.parentNode.parentNode.appendChild(b);
    });
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    js.onload = function () { blocks.forEach(function (c) { window.hljs.highlightElement(c); }); };
    document.head.appendChild(js);
  }
})();
