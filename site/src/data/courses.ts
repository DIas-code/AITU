/**
 * Курсы.
 *
 * Чтобы добавить курс: скопируй объект, поменяй slug и поля. Страница курса
 * /courses/<slug>.html и пункт в меню появятся сами.
 *
 * sourceDir — папка курса на диске относительно этого проекта. Оттуда скрипты
 * `npm run prep` забирают ноутбуки (папки week1, week2, …): картинки вынимаются
 * в public/media, сами .ipynb копируются в public/source для скачивания.
 *
 * Факты о курсе (часы, кредиты, преподаватель, схема оценивания) — из силлабуса
 * eng_Syllabus_Programming for DA_DB_2026.docx.
 */

export interface Hours {
  total: number;
  /** Лекции. */
  lec: number;
  /** Практические. */
  pr: number;
  /** IASS — работа под руководством преподавателя. */
  iass: number;
  /** SIS — самостоятельная работа. */
  sis: number;
}

export interface Course {
  slug: string;
  /** Короткое имя для меню. */
  short: string;
  title: string;
  /** Название из силлабуса. */
  official?: string;
  /** Одно-два предложения: о чём курс. */
  about: string;
  /** Папка с материалами относительно корня проекта site/. */
  sourceDir: string;
  /** Класс акцентного цвета из global.css. */
  accent: string;
  /** Триместр всегда 10 недель. */
  weeks: number;
  lecturer?: string;
  language?: string;
  credits?: number;
  hours?: Hours;
  term?: string;
  prerequisites?: string;
  postrequisites?: string;
  /** Имя файла силлабуса в папке курса — для кнопки «скачать». */
  syllabus?: string;
}

export const WEEKS = 10;

export const COURSES: Course[] = [
  {
    slug: "prog",
    short: "Программирование",
    title: "Programming for Data Analysis and Database",
    official: "Программирование для анализа данных и баз данных",
    about:
      "Десятинедельный курс о рабочих инструментах аналитика: Python и его библиотеки " +
      "для данных, обработка текста и SQL. Начинается с основ языка и структур данных, " +
      "заканчивается собственным аналитическим проектом.",
    sourceDir: "../Programing for data analysis",
    accent: "t-prog",
    weeks: WEEKS,
    lecturer: "Светлана Билощицкая, д. т. н., ассоциированный профессор",
    language: "английский, русский",
    credits: 5,
    hours: { total: 150, lec: 30, pr: 20, iass: 10, sis: 90 },
    term: "1 курс магистратуры, 1 триместр",
    prerequisites: "Python на начальном уровне",
    postrequisites:
      "Курсы по Data Science, машинному и глубокому обучению, статистике; проекты и магистерская диссертация",
    syllabus: "eng_Syllabus_Programming for DA_DB_2026.docx",
  },
];

export const courseBySlug = (slug: string): Course | undefined =>
  COURSES.find((c) => c.slug === slug);
