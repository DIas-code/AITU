// Vercel-функция: календарь Moodle для страницы «Дедлайны» (Website/deadlines.html).
// Ссылка с токеном — только в переменной окружения MOODLE_CALENDAR_URL в настройках Vercel.
module.exports = async (req, res) => {
  const url = process.env.MOODLE_CALENDAR_URL;
  if (!url) {
    res.status(500).send('MOODLE_CALENDAR_URL is not configured.');
    return;
  }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'AITU-Deadlines/1.0' } });
    if (!r.ok) throw new Error('Moodle returned ' + r.status);
    const text = await r.text();
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Moodle did not return a calendar');
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');   // кэш 5 минут
    res.status(200).send(text);
  } catch (err) {
    res.status(502).send((err && err.message) || 'Could not sync Moodle.');
  }
};
