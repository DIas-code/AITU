/**
 * План курса из силлабуса: тема каждой из 10 недель, схема оценивания, литература.
 *
 * Источник фактов — eng_Syllabus_Programming for DA_DB_2026.docx (учебный год 2026–2027).
 * Темы недель переведены на русский, английский оригинал сохранён: он совпадает с
 * формулировками в силлабусе и LMS.
 */

export interface WeekPlan {
  week: number;
  /** Короткое имя недели для плитки. */
  short: string;
  /** Тема как она записана в силлабусе. */
  topic: string;
  topicEn: string;
  /** Что разбирается на лекции. */
  points: string[];
  /** Что сдаём на этой неделе. */
  due?: string;
}

export const WEEK_PLAN: Record<string, WeekPlan[]> = {
  prog: [
    {
      week: 1,
      short: "Инструменты и основы Python",
      topic:
        "Введение в инструменты Data Science и основы Python: Jupyter Notebook, Google Colab, Git/GitHub и структуры данных Python",
      topicEn:
        "Introduction to Data Science Tools and Python Fundamentals: Jupyter Notebook, Google Colab, Git/GitHub, and Python Data Structures",
      points: [
        "Роль программирования в анализе данных; Python как основной язык",
        "Среды разработки: Jupyter Notebook, Google Colab, PyCharm, VS Code",
        "Git и GitHub: контроль версий, хранение проекта, совместная работа",
        "Синтаксис Python: переменные, типы данных, ветвления, циклы, функции",
        "Структуры данных: списки, кортежи, множества, словари",
        "Модули, пакеты и внешние библиотеки",
        "Обзор основных библиотек: NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn",
      ],
    },
    {
      week: 2,
      short: "Файлы и каталоги",
      topic: "Работа с файлами и каталогами в Python: pathlib, os, CSV, JSON и архивы",
      topicEn: "Working with Files and Directories in Python: pathlib, os, CSV, JSON, and Archives",
      points: [
        "Пути и каталоги через os и pathlib",
        "Создание, копирование, перемещение, переименование и удаление файлов",
        "Чтение и запись текстовых файлов",
        "CSV встроенными средствами и через Pandas; JSON",
        "Кодировки и корректная работа с текстом",
        "Построчная обработка больших файлов, архивы",
        "Обработка файловых исключений; структура проекта data / notebooks / results",
      ],
      due: "Assignment 1",
    },
    {
      week: 3,
      short: "NumPy",
      topic: "Библиотека NumPy: массивы, векторизованные операции и математические вычисления",
      topicEn: "NumPy Library: Arrays, Vectorized Operations, and Mathematical Computing",
      points: [
        "Одномерные и многомерные массивы, их атрибуты",
        "Индексация, срезы, reshape и транспонирование",
        "Векторизованные вычисления против циклов Python",
        "Broadcasting",
        "Агрегаты и статистики: среднее, медиана, дисперсия, СКО, min, max",
        "Матричные операции и линейная алгебра; NumPy Random",
      ],
      due: "Assignment 2 (часть 1)",
    },
    {
      week: 4,
      short: "Pandas",
      topic: "Библиотека Pandas: загрузка, обработка и анализ табличных данных",
      topicEn: "Pandas Library: Loading, Processing, and Analyzing Tabular Data",
      points: [
        "Series и DataFrame",
        "Загрузка данных: CSV, Excel, JSON",
        "Первичный осмотр: head(), tail(), info(), describe()",
        "Выборка через loc и iloc, фильтрация и сортировка",
        "Пропуски и дубликаты",
        "Создание и преобразование колонок",
        "groupby, merge / join / concat, сводные таблицы",
      ],
      due: "Assignment 2 (часть 2)",
    },
    {
      week: 5,
      short: "Визуализация",
      topic: "Библиотеки визуализации: Matplotlib, Seaborn и Plotly",
      topicEn: "Data Visualization Libraries: Matplotlib, Seaborn, and Plotly",
      points: [
        "Роль визуализации в разведочном анализе",
        "Графики Matplotlib: линейные, столбчатые, гистограммы, диаграммы рассеяния, boxplot",
        "Статистическая визуализация в Seaborn",
        "Корреляционные матрицы и тепловые карты",
        "Интерактивная визуализация в Plotly",
        "Подписи, легенды, аннотации; выбор типа графика под данные",
      ],
      due: "Assignment 2 (часть 3) · Midterm Exam",
    },
    {
      week: 6,
      short: "Обработка текста",
      topic:
        "Обработка текста: NLTK и spaCy — токенизация, нормализация, стемминг и лемматизация",
      topicEn:
        "Text Processing Libraries: NLTK and spaCy for Tokenization, Normalization, Stemming, and Lemmatization",
      points: [
        "Неструктурированные текстовые данные",
        "NLTK и spaCy",
        "Очистка и нормализация текста, стоп-слова",
        "Токенизация предложений и слов",
        "Стемминг и лемматизация, их отличия",
        "Частотный анализ слов; базовый пайплайн предобработки",
      ],
      due: "Assignment 3",
    },
    {
      week: 7,
      short: "Представление текста",
      topic: "Представление текста: Bag-of-Words, TF-IDF и эмбеддинги для задач NLP",
      topicEn: "Text Representation Methods: Bag-of-Words, TF-IDF, and Embeddings for NLP Tasks",
      points: [
        "Задача перевода текста в числа",
        "Bag-of-Words и матрица «документ–термин», n-граммы",
        "TF-IDF в Scikit-learn; сравнение с Bag-of-Words",
        "Ограничения разреженных представлений",
        "Эмбеддинги: Word2Vec, GloVe и современные модели",
        "Близость текстов; признаки для классификации и кластеризации",
      ],
    },
    {
      week: 8,
      short: "Базы данных и SQL",
      topic: "Реляционные базы данных и SQL: PostgreSQL/SQLite и интеграция с Python",
      topicEn: "Relational Databases and SQL: PostgreSQL/SQLite and Python Integration",
      points: [
        "Реляционная модель: таблицы, строки, столбцы, первичные и внешние ключи",
        "SQLite и PostgreSQL, базовый синтаксис SQL",
        "CREATE TABLE и типы данных; INSERT, UPDATE, DELETE",
        "SELECT, WHERE, ORDER BY",
        "Агрегаты COUNT, SUM, AVG, MIN, MAX; GROUP BY и HAVING",
        "Подключение Python к БД, выгрузка результатов в DataFrame",
      ],
      due: "Assignment 4 (часть 1)",
    },
    {
      week: 9,
      short: "Продвинутый SQL",
      topic:
        "Продвинутый SQL для аналитики: JOIN, агрегации, подзапросы, оконные функции и Pandas",
      topicEn:
        "Advanced SQL for Analytics: JOINs, Aggregations, Subqueries, Window Functions, and Pandas Integration",
      points: [
        "INNER / LEFT / RIGHT / FULL JOIN, запросы к нескольким таблицам",
        "Подзапросы и CTE (WITH)",
        "Оконные функции: ROW_NUMBER(), RANK(), DENSE_RANK()",
        "Аналитические запросы: группировка, ранжирование, тренды",
        "Начала оптимизации запросов",
        "SQL из Python, связка SQL + Pandas, выгрузка результатов",
      ],
      due: "Assignment 4 (часть 2)",
    },
    {
      week: 10,
      short: "Проектная неделя",
      topic:
        "Проектная неделя: связка Python, Pandas, визуализации, NLP и SQL в аналитическом проекте",
      topicEn:
        "Project Week: Integration of Python, Pandas, Data Visualization, NLP, and SQL in an Analytical Project",
      points: [
        "Постановка задачи и аналитических вопросов",
        "Выбор или сбор набора данных; репозиторий проекта в Git/GitHub",
        "Загрузка, очистка и преобразование данных",
        "Разведочный анализ и визуализации",
        "SQL для хранения и агрегации, предобработка текста — где применимо",
        "Интерпретация результатов и отчёт по проекту",
      ],
      due: "Endterm Exam",
    },
  ],
};

/** Строка схемы оценивания. */
export interface AssessmentRow {
  period: string;
  what: string;
  points: number;
  form: string;
  when?: string;
}

export const ASSESSMENT: Record<string, AssessmentRow[]> = {
  prog: [
    { period: "1 аттестация", what: "Assignment 1", points: 30, form: "Критериальная оценка", when: "неделя 3" },
    { period: "1 аттестация", what: "Assignment 2", points: 30, form: "Критериальная оценка", when: "неделя 5" },
    { period: "1 аттестация", what: "Quiz 1–4", points: 40, form: "Тест", when: "по ходу" },
    { period: "2 аттестация", what: "Assignment 3", points: 30, form: "Критериальная оценка", when: "неделя 8" },
    { period: "2 аттестация", what: "Assignment 4", points: 30, form: "Критериальная оценка", when: "неделя 10" },
    { period: "2 аттестация", what: "Quiz 5–8", points: 40, form: "Тест", when: "по ходу" },
    { period: "Экзамен", what: "Проектная работа", points: 100, form: "Критериальная оценка", when: "сессия" },
  ],
};

export const FORMULA: Record<string, string> = {
  prog: "Итог = 0,3 × MidTerm + 0,3 × EndTerm + 0,4 × финальный проект",
};

/** Основная литература курса. */
export interface Book {
  author: string;
  title: string;
  note?: string;
  url?: string;
}

export const BOOKS: Record<string, Book[]> = {
  prog: [
    { author: "Paul Barry", title: "Head First Python: A Learner's Guide to the Fundamentals of Python Programming", note: "3-е издание, O'Reilly Media, 2023" },
    { author: "Третьякова Т. И., Саринова А. Ж.", title: "Программирование на языке Python", note: "Учебное пособие, Алматы: Альманах, 2023" },
    { author: "Eric Matthes", title: "Python Crash Course", note: "2-е издание, No Starch Press, 2019" },
    { author: "Иванов М.", title: "Алгоритмический тренинг. Решения практических задач на Python и C++", note: "БХВ-Петербург, 2023" },
    { author: "Charles R. Severance", title: "Python for Everybody", note: "Свободно доступна", url: "http://do1.dr-chuck.com/pythonlearn/EN_us/pythonlearn.pdf" },
    { author: "Kushal Das", title: "Python for You and Me", note: "Свободно доступна", url: "https://pymbook.readthedocs.io/en/latest/" },
  ],
};
