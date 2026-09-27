/* Общие вычисления для главной и страниц курсов: даты недель и сколько осталось до сроков. */
(function () {
  var S = window.SITE, DAY = 864e5;
  var start = new Date(S.term.week1 + 'T00:00:00');

  function fmt(d) { return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2); }
  function weekRange(w) {
    var a = new Date(+start + (w - 1) * 7 * DAY), b = new Date(+a + 5 * DAY);
    return fmt(a) + '–' + fmt(b);
  }
  function taskDate(t) {
    if (t.due) {
      var tm = !t.time || t.time === '24:00' ? '23:59:59' : t.time + ':00';
      return new Date(t.due + 'T' + tm + '+05:00');                  // время Астаны
    }
    if (t.w > S.term.weeks) return new Date('2026-11-28T23:59:00+05:00');
    return new Date(+start + ((t.w - 1) * 7 + 5) * DAY + 86399e3);   // суббота той недели
  }
  var WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  function taskWhen(t) {
    if (t.w > S.term.weeks && !t.due) return 'сессия 16–28.11';
    var d = taskDate(t), day = WD[new Date(+d + 5 * 3600e3).getUTCDay()];
    if (t.due) return 'до ' + fmt(new Date(t.due + 'T12:00:00')) + ' (' + day + ')' + (t.time ? ', ' + t.time : '') + ' · Moodle';
    return '≈ до ' + fmt(d) + ' (' + day + ') · по силлабусу';
  }
  // Напоминание вместо статуса: сдано ли — сайт не знает, он только считает время до срока.
  function dayStart(d) { var x = new Date(+d + 5 * 3600e3); return Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()); }
  function left(t) {
    var d = taskDate(t), now = new Date();
    if (d < now) return 'past';
    var n = Math.round((dayStart(d) - dayStart(now)) / DAY);
    return n;
  }
  function badge(t) {
    var n = left(t), approx = t.due ? '' : '≈ ';
    if (n === 'past') return '<span class="st todo">Прошло</span>';
    if (n === 0) return '<span class="st late">Сегодня</span>';
    if (n === 1) return '<span class="st wip">Завтра</span>';
    return '<span class="st ' + (n <= 7 ? 'wip' : 'todo') + '">' + approx + 'через ' + n + ' дн.</span>';
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  window.SITE_DATA = { weekRange: weekRange, taskDate: taskDate, taskWhen: taskWhen, left: left, badge: badge, esc: esc };
})();
