import type { Lesson } from "./types";
import { lessonId } from "./types";

/**
 * Индекс уроков.
 *
 * Файлы подхватываются автоматически: создай src/data/lessons/<course>/week-NN.ts,
 * экспортируй из него `lesson` — и урок появится на сайте, в меню недели и в навигации.
 * Ничего регистрировать вручную не нужно.
 */
const modules = import.meta.glob<{ lesson: Lesson }>("./*/week-*.ts", { eager: true });

export const LESSONS: Lesson[] = Object.values(modules)
  .map((m) => m.lesson)
  .sort((a, b) => a.course.localeCompare(b.course) || a.week - b.week);

export const lessonFor = (course: string, week: number): Lesson | undefined =>
  LESSONS.find((l) => l.course === course && l.week === week);

export const lessonsOf = (course: string): Lesson[] =>
  LESSONS.filter((l) => l.course === course).sort((a, b) => a.week - b.week);

/** Предыдущий и следующий урок внутри одной дисциплины. */
export function neighbours(course: string, week: number) {
  const list = lessonsOf(course);
  const i = list.findIndex((l) => l.week === week);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

export { lessonId };
export type { Lesson };
