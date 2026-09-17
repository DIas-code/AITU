/**
 * Индекс материалов.
 *
 * Чтобы добавить лекцию: создай файл в src/data/lessons/<курс>/w<NN>-l<n>.ts,
 * импортируй его здесь и добавь в массив. Страница /lessons/<id>.html,
 * карточка на странице недели и плитка недели появятся сами.
 */
import type { Lesson } from "./types";
import { lessonId } from "./types";

import progW01L1 from "./lessons/prog/w01-l1";
import progW01L2 from "./lessons/prog/w01-l2";
import progW01L3 from "./lessons/prog/w01-l3";

export const LESSONS: Lesson[] = [progW01L1, progW01L2, progW01L3];

export const allIds = (): string[] => LESSONS.map(lessonId);

export const byId = (id: string): Lesson | undefined =>
  LESSONS.find((l) => lessonId(l) === id);

/** Материалы одной недели, по порядку. */
export const byWeek = (course: string, week: number): Lesson[] =>
  LESSONS.filter((l) => l.course === course && l.week === week).sort((a, b) => a.order - b.order);

/** Все материалы курса. */
export const byCourse = (course: string): Lesson[] =>
  LESSONS.filter((l) => l.course === course).sort((a, b) => a.week - b.week || a.order - b.order);

/** Номера недель, в которых что-то есть. */
export const weeksWithMaterial = (course: string): Set<number> =>
  new Set(LESSONS.filter((l) => l.course === course).map((l) => l.week));
