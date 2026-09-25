
/* Переключатель языка: RU <-> EN. Выбор запоминается в браузере. */
(function () {
  var html = document.documentElement;
  var btn = document.getElementById('lang');

  function set(lang) {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    if (btn) btn.textContent = lang === 'ru' ? 'EN' : 'RU';
    try { localStorage.setItem('ada-m-lang', lang); } catch (e) {}
  }

  var saved = 'ru';
  try { saved = localStorage.getItem('ada-m-lang') || 'ru'; } catch (e) {}
  // ?lang=en в адресе — чтобы можно было дать ссылку сразу на английскую версию
  var q = /[?&]lang=(ru|en)/.exec(location.search);
  set(q ? q[1] : saved);

  if (btn) {
    btn.addEventListener('click', function () {
      set(html.getAttribute('data-lang') === 'ru' ? 'en' : 'ru');
    });
  }

  addEventListener('keydown', function (e) {
    if (e.key === 'l' && !/input|textarea/i.test(document.activeElement.tagName)) {
      set(html.getAttribute('data-lang') === 'ru' ? 'en' : 'ru');
    }
  });
})();
