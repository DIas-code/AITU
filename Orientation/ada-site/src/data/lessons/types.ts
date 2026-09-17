import type { L10n, L10nList } from "../types";
import type { ReadingRef } from "../books";

/**
 * Модель урока / lesson model.
 *
 * Один урок = одна неделя одной дисциплины. Файлы лежат в src/data/lessons/<course>/week-NN.ts
 * и собираются в индекс в src/data/lessons/index.ts.
 */

/** Формула. tex рендерится KaTeX на сборке; note — как её читать словами. */
export interface Formula {
  tex: string;
  /** Пояснение под формулой: что означает каждый символ. */
  note?: L10n;
  /** display: отдельным блоком по центру; inline не используем в секциях. */
  display?: boolean;
}

/** Блок кода. */
export interface CodeBlock {
  /** python | sql | text */
  lang: string;
  caption?: L10n;
  code: string;
  /** Что должно получиться. */
  out?: L10n;
}

/** Таблица внутри урока. */
export interface LessonTable {
  head: L10nList;
  /** Строки: массив ячеек. Ячейки не переводятся (числа, термины) либо переводятся через rowsRu. */
  rows: string[][];
  rowsRu?: string[][];
}

/** Смысловой блок урока. */
export interface Section {
  heading: L10n;
  /** Абзацы текста. */
  body: L10nList;
  formula?: Formula;
  code?: CodeBlock;
  table?: LessonTable;
  /** Выноска: главное, что нужно запомнить. */
  key?: L10n;
  /** Частая ошибка. */
  pitfall?: L10n;
}

/** Разобранный пример: шаги с числами. */
export interface Worked {
  title: L10n;
  intro: L10n;
  steps: { text: L10n; formula?: Formula; code?: CodeBlock }[];
  conclusion: L10n;
}

/** Задача с ответом. */
export interface Exercise {
  q: L10n;
  hint?: L10n;
  a: L10n;
}

export interface Lesson {
  /** slug дисциплины: math | prog */
  course: string;
  week: number;
  title: L10n;
  /** Одно предложение: о чём урок. */
  summary: L10n;
  /** Чему научишься. */
  goals: L10nList;
  sections: Section[];
  worked?: Worked;
  exercises: Exercise[];
  /** Самопроверка перед следующим занятием. */
  checklist: L10nList;
  /** Что почитать. Если пусто — берётся из плана недели. */
  reading?: ReadingRef[];
  /** Минут на урок без задач. */
  minutes: number;
}

/** Идентификатор урока в URL: math-01 */
export const lessonId = (course: string, week: number) =>
  `${course}-${String(week).padStart(2, "0")}`;
