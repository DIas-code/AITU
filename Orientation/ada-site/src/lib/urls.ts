import type { Lang } from "../data/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Абсолютный путь внутри сайта. page — "index" | "plan" | "kit" | "books" | "courses/math" */
export const url = (lang: Lang, page: string): string =>
  page === "index" ? `${BASE}/${lang}.html` : `${BASE}/${lang}/${page}.html`;

/** Тот же путь на другом языке — для переключателя. */
export const other = (lang: Lang): Lang => (lang === "en" ? "ru" : "en");
