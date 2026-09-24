
/* Поиск по карточкам команд: печатаешь — остаются подходящие,
   пустые группы скрываются целиком. */
(function () {
  var box = document.querySelector('.search');
  if (!box) return;

  var cards = [].slice.call(document.querySelectorAll('.cmd'));
  var grids = [].slice.call(document.querySelectorAll('.cmdgrid'));
  var nav = document.querySelector('.gnav');

  var empty = document.createElement('p');
  empty.className = 'nores';
  empty.textContent = 'Ничего не нашлось. Попробуй короче — например np или файл.';
  empty.hidden = true;
  (grids[0] || box).parentNode.insertBefore(empty, grids[0] || null);

  function run() {
    var q = box.value.trim().toLowerCase();
    var total = 0;

    cards.forEach(function (c) {
      var ok = !q || (c.dataset.cmd || '').indexOf(q) !== -1;
      c.classList.toggle('hide', !ok);
      if (ok) total++;
    });

    grids.forEach(function (g) {
      var shown = g.querySelectorAll('.cmd:not(.hide)').length;
      g.hidden = !shown;
      var head = g.previousElementSibling;
      if (head && head.classList.contains('grp')) head.hidden = !shown;
    });

    if (nav) nav.hidden = !!q;
    empty.hidden = total !== 0;
  }

  box.addEventListener('input', run);
  addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== box) { e.preventDefault(); box.focus(); }
    if (e.key === 'Escape' && document.activeElement === box) { box.value = ''; run(); box.blur(); }
  });
})();
