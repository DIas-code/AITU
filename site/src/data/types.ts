/**
 * Модель данных сайта.
 *
 * Сайт русскоязычный. Английский текст появляется только там, где он был в исходном
 * ноутбуке: преподаватель дублирует часть абзацев. Такой абзац хранится как {ru, en},
 * и на странице его можно переключить кнопкой RU/EN.
 */

/** Текст: русский обязателен, английский — если он был в оригинале. */
export interface Rich {
  ru: string;
  en?: string;
}

/** Короткая запись: строка превращается в Rich без английской версии. */
export const rich = (v: Rich | string): Rich => (typeof v === "string" ? { ru: v } : v);

/** Есть ли у текста английская версия. */
export const hasEn = (v: Rich): boolean => typeof v.en === "string" && v.en.length > 0;

/** Тон выноски: главное / частая ошибка / просто заметка. */
export type Tone = "key" | "pitfall" | "info";

export const TONE_LABEL: Record<Tone, string> = {
  key: "Главное",
  pitfall: "Частая ошибка",
  info: "Заметка",
};

/** Строительный блок внутри секции лекции. */
export type Block =
  /** Абзац текста. Разрешена простая разметка: `код`, *курсив*, **жирный**. */
  | { kind: "text"; value: Rich | string }
  /** Маркированный список. */
  | { kind: "list"; items: (Rich | string)[]; ordered?: boolean }
  /**
   * Ячейка кода. `out` — то, что печатается (stdout), `result` — значение последней
   * строки, как его показывает Jupyter, `error` — текст исключения, если код падает
   * намеренно. `note` — подпись под блоком.
   */
  | {
      kind: "code";
      code: string;
      out?: string;
      result?: string;
      error?: string;
      note?: Rich | string;
      /** Ввод пользователя, если в примере есть input(). */
      stdin?: string;
      /** Язык подсветки. По умолчанию python; для схем и таблиц — "text". */
      lang?: string;
    }
  /** Картинка из ноутбука. src — путь относительно /media. */
  | { kind: "image"; src: string; alt: string; caption?: Rich | string }
  /** Выноска. */
  | { kind: "note"; tone: Tone; value: Rich | string }
  /** Таблица. */
  | { kind: "table"; head: string[]; rows: string[][]; caption?: Rich | string };

/** Смысловой раздел лекции. Попадает в оглавление. */
export interface Section {
  /** Якорь в URL: латиница и дефисы. */
  id: string;
  heading: Rich | string;
  blocks: Block[];
}

/** Задача для самопроверки: ответ скрыт до клика. */
export interface Exercise {
  q: Rich | string;
  hint?: Rich | string;
  a: Rich | string;
}

export type MaterialKind = "lecture" | "practice" | "lab" | "reading";

export const KIND_LABEL: Record<MaterialKind, string> = {
  lecture: "Лекция",
  practice: "Практика",
  lab: "Лабораторная",
  reading: "Чтение",
};

/** Одна единица материала: лекция, практика и т.п. */
export interface Lesson {
  /** slug курса, см. courses.ts */
  course: string;
  week: number;
  /** Порядок внутри недели: 1, 2, 3… */
  order: number;
  kind: MaterialKind;
  /** Номер как его называет преподаватель: «1.2». Показывается в шапке. */
  label?: string;
  title: Rich | string;
  /** Одно-два предложения: о чём материал. */
  summary: Rich | string;
  /** Чему научишься. */
  goals: (Rich | string)[];
  sections: Section[];
  exercises: Exercise[];
  /** Самопроверка перед следующим занятием. */
  checklist: (Rich | string)[];
  /** Имя исходного .ipynb внутри папки недели — для кнопки «скачать оригинал». */
  source?: string;
  /**
   * Файлы данных, нужные для примеров лекции. Лежат в
   * public/data/<курс>/<wNN>/ и предлагаются к скачиванию на странице.
   */
  dataFiles?: string[];
  /** Сколько минут читать без задач. */
  minutes: number;
}

/** Идентификатор материала в URL: prog-w01-l1 */
export const lessonId = (l: Pick<Lesson, "course" | "week" | "order">): string =>
  `${l.course}-w${String(l.week).padStart(2, "0")}-l${l.order}`;

/** Папка недели: week1, week2… — так их называет пользователь на диске. */
export const weekDir = (week: number): string => `week${week}`;
