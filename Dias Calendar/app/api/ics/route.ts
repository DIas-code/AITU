// Сырой календарь Moodle для страницы «Дедлайны» общего сайта (Aitu/deadlines.html).
// Ссылка с токеном остаётся на сервере; наружу уходит только содержимое календаря.
export const dynamic = 'force-dynamic';

const CORS = { 'Access-Control-Allow-Origin': '*' };

export async function GET() {
  const url = process.env.MOODLE_CALENDAR_URL;
  if (!url) return new Response('MOODLE_CALENDAR_URL is not configured.', { status: 500, headers: CORS });
  try {
    const res = await fetch(url, { cache: 'no-store', headers: { 'User-Agent': 'AITU-Deadlines/1.0' } });
    if (!res.ok) throw new Error(`Moodle returned ${res.status}`);
    const text = await res.text();
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Moodle did not return a calendar');
    return new Response(text, { headers: { ...CORS, 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'no-store' } });
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'Could not sync Moodle.', { status: 502, headers: CORS });
  }
}
