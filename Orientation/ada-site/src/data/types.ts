/**
 * Типы данных сайта / Site data types.
 *
 * Сайт двуязычный: английский основной, русский равноценный.
 * The site is bilingual: English is primary, Russian is a full peer.
 * Любая строка, которую видит пользователь, — это L10n.
 */

export type Lang = "en" | "ru";
export const LANGS: Lang[] = ["en", "ru"];

/** Пара «английский / русский». */
export interface L10n {
  en: string;
  ru: string;
}

/** Достаёт нужный язык. */
export const t = (v: L10n, lang: Lang): string => v[lang];

/** Список строк на двух языках. */
export type L10nList = { en: string[]; ru: string[] };

export type Cycle = "ООД" | "БД" | "ПД" | "НИР" | "ИА";
export type Component = "ВК" | "КВ";
export type ControlForm = "exam" | "report" | "defense";

export const CONTROL_LABEL: Record<ControlForm, L10n> = {
  exam: { en: "exam", ru: "экзамен" },
  report: { en: "report", ru: "отчёт" },
  defense: { en: "defense", ru: "защита" },
};

/** Часы по учебному плану. lec+lab+pr+srop+sro === total. */
export interface Hours {
  total: number;
  lec: number;
  lab: number;
  pr: number;
  /** СРОП / instructor-supervised independent study (ISIS). */
  srop: number;
  /** СРО / student independent study (SIS). */
  sro: number;
}

export interface AssessmentRow {
  period: L10n;
  kind: L10n;
  points: number;
  form: L10n;
  when: L10n;
  hot?: boolean;
}

export interface PrepBlock {
  title: L10n;
  why: L10n;
  items: L10nList;
  /** Чем закрывать: ссылки на главы книг. */
  reading?: import("./books").ReadingRef[];
}

export interface QaItem {
  group: L10n;
  q: L10n;
  a: L10n;
}

export interface Course {
  slug: string;
  short: L10n;
  title: L10n;
  /** Оригинальное английское название из учебного плана — печатается как есть. */
  officialEn: string;
  officialRu: string;
  trimester: number;
  code: string;
  cycle: Cycle;
  component: Component;
  credits: number;
  control: ControlForm;
  lecturer: string;
  language: L10n;
  hours: Hours;
  hoursHandbook?: { total: number; lec: number; pr: number; isis: number; sis: number };
  method: L10n;
  prerequisites: L10n;
  postrequisites: L10n;
  about: L10n;
  assessment: AssessmentRow[];
  formula: L10n;
  lever: L10n;
  prep: PrepBlock[];
  qa: QaItem[];
  /** id книг из books.ts, которые стоят в силлабусе этой дисциплины. */
  books: string[];
  /** CSS-класс акцента: t-math | t-prog */
  accent: string;
  /** Подготовка к финальному экзамену. */
  examPrep: L10nList;
}

export interface WeekTopic {
  title: L10n;
  detail: L10n;
  /** Английские термины — их услышишь на лекции; не переводятся. */
  terms: string[];
  /** Что прочитать на этой неделе. */
  reading: import("./books").ReadingRef[];
}

export interface Week {
  n: number;
  topics: Record<string, WeekTopic>;
  todo: L10n;
  control?: L10n;
}

export interface WarmupDay {
  /** ISO: 2026-08-31 */
  date: string;
  load: L10n;
  university?: L10n;
  tracks: Record<string, { title: L10n; detail: L10n; source: L10n }>;
  outcome: L10n;
}

export interface Term {
  id: string;
  name: L10n;
  academicYear: string;
  firstWeekStart: string;
  weeksCount: number;
  events: { title: L10n; from: string; to: string; key?: boolean }[];
  holidays: L10n[];
}
