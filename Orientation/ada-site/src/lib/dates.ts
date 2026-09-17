import { CURRENT_TERM } from "../data/calendar";
import type { Lang } from "../data/types";

export const MONTHS: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
};

export const WEEKDAYS: Record<Lang, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ru: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
};

/** ISO-строка «2026-09-07» → Date без часового пояса. */
export function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** «7 Sep» / «7 сен» */
export function short(iso: string, lang: Lang): string {
  const d = parse(iso);
  return `${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
}

/** «7 Sep 2026» / «7 сен 2026» */
export function full(iso: string, lang: Lang): string {
  return `${short(iso, lang)} ${parse(iso).getFullYear()}`;
}

/** «Mon» / «пн» */
export function weekday(iso: string, lang: Lang): string {
  return WEEKDAYS[lang][parse(iso).getDay()];
}

/** Диапазон учебной недели n: «7 Sep — 13 Sep». */
export function weekRange(n: number, lang: Lang, firstWeekStart = CURRENT_TERM.firstWeekStart): string {
  const a = parse(firstWeekStart);
  a.setDate(a.getDate() + (n - 1) * 7);
  const b = new Date(a);
  b.setDate(b.getDate() + 6);
  const f = (d: Date) => `${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
  return `${f(a)} — ${f(b)}`;
}

/** Русское склонение: plural(3, ["день","дня","дней"]) → "дня". Для en вернёт [0] или [2]. */
export function plural(n: number, forms: [string, string, string], lang: Lang = "ru"): string {
  if (lang === "en") return n === 1 ? forms[0] : forms[2];
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return forms[0];
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return forms[1];
  return forms[2];
}

/** Дней от сегодня до даты. Считается на сборке; в браузере обновляется скриптом. */
export function daysUntil(iso: string): number {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return Math.round((parse(iso).getTime() - t.getTime()) / 86400000);
}
