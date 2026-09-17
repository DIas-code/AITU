const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Абсолютный путь внутри сайта.
 * page — "index" | "courses/prog" | "courses/prog/week-01" | "lessons/prog-w01-l1"
 */
export const url = (page: string): string =>
  page === "index" ? `${BASE}/` : `${BASE}/${page}.html`;

/**
 * Путь к файлу в public/. Имена файлов приходят с диска как есть — с пробелами и
 * кириллицей, поэтому кодируем их для ссылки.
 */
export const asset = (path: string): string =>
  `${BASE}/${encodeURI(path.replace(/^\//, ""))}`;

/** w01, w02 … */
export const weekTag = (week: number): string => `w${String(week).padStart(2, "0")}`;

/** Ссылка на страницу недели. */
export const weekUrl = (course: string, week: number): string =>
  url(`courses/${course}/week-${String(week).padStart(2, "0")}`);
