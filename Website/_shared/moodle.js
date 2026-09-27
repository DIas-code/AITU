/*
  Календарь Moodle → список дедлайнов.
  Источник: живой — сервер Dias Calendar (npm run dev → localhost:3000/api/ics),
            запасной — снимок _shared/moodle-snapshot.js (обновляю по просьбе).
  Занятия «Attendance» выбрасываются: это расписание пар, а не дедлайны.
*/
(function () {
  var TZ = 'Asia/Almaty';
  // Онлайн (Vercel) — своя функция /api/ics. На компьютере (file://) — запущенный Dias Calendar.
  var ONLINE = /^https?:$/.test(location.protocol) && !/^(localhost|127\.)/.test(location.hostname);
  var LIVE = ONLINE ? '/api/ics' : 'http://localhost:3000/api/ics';

  function unescape(v) {
    return v.replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1');
  }

  // 20261004T185900Z → Date. Без Z — время Алматы (UTC+5). Только дата — конец дня.
  function parseDate(v, params) {
    var m = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(v);
    if (!m) return null;
    if (!m[4]) return { date: new Date(Date.UTC(+m[1], m[2] - 1, +m[3], 23 - 5, 59)), allDay: true };
    var utc = Date.UTC(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +m[6]);
    if (!m[7]) utc -= 5 * 3600e3;   // floating / TZID Asia/Almaty
    return { date: new Date(utc), allDay: false };
  }

  function kind(summary) {
    if (/ is due$/.test(summary)) return { type: 'due', title: summary.replace(/ is due$/, '') };
    if (/ closes$/.test(summary)) return { type: 'closes', title: summary.replace(/ closes$/, '') };
    if (/ opens$/.test(summary)) return { type: 'opens', title: summary.replace(/ opens$/, '') };
    return { type: 'event', title: summary };
  }

  function parse(ics) {
    var text = ics.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');
    var out = [];
    (text.match(/BEGIN:VEVENT\n[\s\S]*?END:VEVENT/g) || []).forEach(function (block) {
      var p = {};
      block.split('\n').forEach(function (line) {
        var i = line.indexOf(':');
        if (i < 0) return;
        var head = line.slice(0, i).split(';');
        p[head[0]] = { value: line.slice(i + 1), params: head.slice(1) };
      });
      var summary = p.SUMMARY ? unescape(p.SUMMARY.value) : '';
      if (!summary || /^Attendance\b/.test(summary)) return;
      var d = p.DTSTART && parseDate(p.DTSTART.value, p.DTSTART.params);
      if (!d) return;
      var cat = p.CATEGORIES ? unescape(p.CATEGORIES.value) : '';
      var k = kind(summary);
      out.push({
        id: p.UID ? p.UID.value : summary + d.date.toISOString(),
        title: k.title,
        type: k.type,
        course: cat ? cat.split(' | ')[0].trim() : null,
        teacher: cat.indexOf(' | ') > 0 ? cat.split(' | ')[1].trim() : null,
        due: d.date,
        allDay: d.allDay,
        description: p.DESCRIPTION ? unescape(p.DESCRIPTION.value).trim() : ''
      });
    });
    return out.sort(function (a, b) { return a.due - b.due; });
  }

  // Ключ дня по времени Алматы. Ровно 00:00 считаем концом предыдущего дня (Moodle ставит так «до конца дня»).
  var keyFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  var hmFmt = new Intl.DateTimeFormat('ru-RU', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });
  function dayKey(date) { return keyFmt.format(date); }
  function effectiveKey(e) {
    return hmFmt.format(e.due) === '00:00' ? dayKey(new Date(e.due - 60e3)) : dayKey(e.due);
  }
  function timeText(e) {
    if (e.allDay) return 'весь день';
    var t = hmFmt.format(e.due);
    return t === '00:00' ? '24:00' : t;
  }

  function load(cb) {
    var done = false;
    var fallback = function (why) {
      if (done) return; done = true;
      var s = window.MOODLE_SNAPSHOT;
      if (s) cb({ events: parse(s.ics), source: 'snapshot', syncedAt: new Date(s.fetchedAt), liveError: why });
      else cb({ events: [], source: 'none', liveError: why });
    };
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); fallback('timeout'); }, ONLINE ? 12000 : 4000);
    fetch(LIVE, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { return r.ok ? r.text() : r.text().then(function (t) { throw new Error(t); }); })
      .then(function (t) {
        clearTimeout(timer);
        if (done) return; done = true;
        cb({ events: parse(t), source: 'live', syncedAt: new Date() });
      })
      .catch(function (err) { clearTimeout(timer); fallback(err && err.message); });
  }

  window.MOODLE = { load: load, parse: parse, dayKey: dayKey, effectiveKey: effectiveKey, timeText: timeText, TZ: TZ, ONLINE: ONLINE };
})();
