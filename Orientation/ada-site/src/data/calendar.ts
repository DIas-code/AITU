import type { Term } from "./types";

/**
 * Академический календарь / academic calendar.
 * Источник: «Академ календарь 2026-2027_1 курс_ADA_МАГ.pdf», утверждён Учёным советом AITU.
 * Чтобы добавить следующий триместр — допиши объект в TERMS.
 */

export const TERMS: Term[] = [
  {
    id: "fall-2026",
    name: { en: "Fall term", ru: "Осенний триместр" },
    academicYear: "2026–2027",
    firstWeekStart: "2026-09-07",
    weeksCount: 10,
    events: [
      { title: { en: "Induction week", ru: "Ознакомительная неделя" }, from: "2026-09-01", to: "2026-09-05", key: true },
      { title: { en: "Registration to academic disciplines", ru: "Регистрация на учебные дисциплины" }, from: "2026-09-01", to: "2026-09-05", key: true },
      { title: { en: "Theoretical learning", ru: "Теоретическое обучение" }, from: "2026-09-07", to: "2026-11-14", key: true },
      { title: { en: "Mid-term control", ru: "Рубежный контроль 1" }, from: "2026-10-05", to: "2026-10-10" },
      { title: { en: "End-term control", ru: "Рубежный контроль 2" }, from: "2026-11-09", to: "2026-11-14" },
      { title: { en: "Fall term examination period", ru: "Промежуточная аттестация осеннего триместра" }, from: "2026-11-16", to: "2026-11-28", key: true },
      { title: { en: "Break", ru: "Каникулы" }, from: "2026-11-30", to: "2026-12-05" },
    ],
    holidays: [{ en: "25 October — Republic Day", ru: "25 октября — День Республики" }],
  },
];

export const CURRENT_TERM = TERMS[0];
export const FIRST_CLASS = CURRENT_TERM.firstWeekStart;
export const EXAM_SESSION = { from: "2026-11-16", to: "2026-11-28" };
