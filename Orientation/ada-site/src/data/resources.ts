import type { L10n } from "./types";

/** Инструменты, материалы, датасеты и метод / toolkit, material, datasets, method. */

export interface StackGroup {
  group: L10n;
  items: { name: string; note: L10n }[];
}

export const STACK: StackGroup[] = [
  {
    group: { en: "Core", ru: "База" },
    items: [
      { name: "Python 3.12", note: { en: "The language of the course. Installed together with the uv package manager.", ru: "Основной язык курса. Ставится вместе с менеджером пакетов uv." } },
      { name: "uv", note: { en: "Fast package and virtual-environment manager. Alternatives: conda or Miniforge.", ru: "Быстрый менеджер пакетов и виртуальных окружений. Альтернативы — conda или Miniforge." } },
      { name: "JupyterLab", note: { en: "Where notebooks live: labs and projects are submitted as notebooks.", ru: "Среда для ноутбуков: в них сдаются лабораторные и проекты." } },
      { name: "VS Code", note: { en: "Editor for scripts, SQL and git. Python and Jupyter extensions.", ru: "Редактор для скриптов, SQL и git. Расширения Python и Jupyter." } },
      { name: "git + GitHub", note: { en: "The history of your work and the place projects are submitted from.", ru: "История работы и место, откуда сдаются проекты." } },
    ],
  },
  {
    group: { en: "Data analysis", ru: "Анализ данных" },
    items: [
      { name: "numpy", note: { en: "Arrays and vectorised computation.", ru: "Массивы и векторные вычисления." } },
      { name: "pandas", note: { en: "Tables, cleaning, aggregation, joins.", ru: "Таблицы, очистка, агрегация, соединения." } },
      { name: "matplotlib + seaborn", note: { en: "Charts, from quick looks to publication quality.", ru: "Графики: от быстрых до публикационных." } },
      { name: "scipy.stats", note: { en: "Distributions and statistical tests — the workhorse of the maths course.", ru: "Распределения и статистические тесты — рабочая лошадь курса математики." } },
      { name: "statsmodels", note: { en: "Regression with a full statistical summary: coefficients, p-values, R².", ru: "Регрессия с полной статистической сводкой: коэффициенты, p-значения, R²." } },
      { name: "scikit-learn", note: { en: "Clustering, PCA, feature preprocessing.", ru: "Кластеризация, PCA, предобработка признаков." } },
    ],
  },
  {
    group: { en: "Databases", ru: "Базы данных" },
    items: [
      { name: "DuckDB", note: { en: "SQL straight over CSV files and DataFrames, no server. The best way to practise.", ru: "SQL прямо по CSV и DataFrame, без сервера. Лучший способ тренироваться." } },
      { name: "SQLite", note: { en: "A file database; sample schemas such as Chinook load in one command.", ru: "Файловая база; учебные схемы вроде Chinook разворачиваются одной командой." } },
      { name: "SQLAlchemy", note: { en: "The bridge between Python and a database; works with pandas.read_sql.", ru: "Связка Python и БД, работает с pandas.read_sql." } },
      { name: "PostgreSQL", note: { en: "Optional: a real server, once you reach query plans and indexes.", ru: "Опционально: настоящий сервер, если дойдёте до планов выполнения и индексов." } },
      { name: "DBeaver", note: { en: "A GUI client, so you can see the schema instead of guessing at it.", ru: "Графический клиент, чтобы видеть схему, а не писать вслепую." } },
    ],
  },
  {
    group: { en: "The second language", ru: "Второй язык" },
    items: [
      { name: "R + RStudio", note: { en: "The syllabus names R alongside Python and lists R for Data Science.", ru: "Силлабус называет R наравне с Python, а в литературе стоит R for Data Science." } },
      { name: "tidyverse", note: { en: "dplyr and ggplot2 — the same analysis under a different philosophy.", ru: "dplyr и ggplot2 — тот же анализ, другая идеология." } },
    ],
  },
];

export interface SetupBlock {
  title: L10n;
  lines: { kind: "cmd" | "comment" | "blank"; text: string }[];
}

export const SETUP: SetupBlock[] = [
  {
    title: { en: "Python and the environment", ru: "Python и окружение" },
    lines: [
      { kind: "comment", text: "# PowerShell" },
      { kind: "cmd", text: "winget install --id=astral-sh.uv -e" },
      { kind: "cmd", text: "uv python install 3.12" },
      { kind: "blank", text: "" },
      { kind: "comment", text: "# project for the trimester" },
      { kind: "cmd", text: "uv init ada-t1" },
      { kind: "cmd", text: "cd ada-t1" },
    ],
  },
  {
    title: { en: "Packages", ru: "Пакеты" },
    lines: [
      { kind: "cmd", text: "uv add numpy pandas matplotlib seaborn scipy statsmodels \\" },
      { kind: "cmd", text: "       scikit-learn jupyterlab duckdb sqlalchemy" },
      { kind: "blank", text: "" },
      { kind: "comment", text: "# run" },
      { kind: "cmd", text: "uv run jupyter lab" },
    ],
  },
  {
    title: { en: "Git and the repository", ru: "Git и репозиторий" },
    lines: [
      { kind: "cmd", text: "git init" },
      { kind: "cmd", text: 'git add . && git commit -m "environment ready"' },
      { kind: "comment", text: "# create an empty repo on GitHub, then:" },
      { kind: "cmd", text: "git remote add origin https://github.com/USER/ada-t1.git" },
      { kind: "cmd", text: "git push -u origin main" },
    ],
  },
  {
    title: { en: "A sample database for SQL", ru: "Учебная база для SQL" },
    lines: [
      { kind: "comment", text: "# Chinook — the classic teaching schema" },
      { kind: "cmd", text: "duckdb" },
      { kind: "cmd", text: "ATTACH 'chinook.db' AS db (TYPE sqlite);" },
      { kind: "cmd", text: "SELECT name FROM db.sqlite_master WHERE type='table';" },
    ],
  },
];

export const REPO_TREE: { path: string; note: L10n }[] = [
  { path: "ada-t1/", note: { en: "repository root", ru: "корень репозитория" } },
  { path: "├── math/", note: { en: "one folder per lab: lab-01 … lab-08", ru: "по папке на лабораторную: lab-01 … lab-08" } },
  { path: "├── prog/", note: { en: "week-01 … week-10, notebook and data inside", ru: "week-01 … week-10, внутри ноутбук и данные" } },
  { path: "├── projects/", note: { en: "midterm and final — what actually gets submitted", ru: "midterm и final — то, что реально сдаётся" } },
  { path: "├── data/", note: { en: "raw data, not committed to git", ru: "сырые данные, в git не коммитятся" } },
  { path: "├── notes/", note: { en: "notes and the exam cheat sheet", ru: "конспекты и шпаргалка к экзамену" } },
  { path: "├── .gitignore", note: { en: "data/, .ipynb_checkpoints/, .venv/", ru: "data/, .ipynb_checkpoints/, .venv/" } },
  { path: "└── README.md", note: { en: "what lives where and how to run it", ru: "что где лежит и как запустить" } },
];

export interface Resource {
  name: string;
  url: string;
  kind: L10n;
  note: L10n;
}

const K = {
  video: { en: "video", ru: "видео" },
  course: { en: "course", ru: "курс" },
  drill: { en: "drill", ru: "тренажёр" },
  book: { en: "book", ru: "книга" },
  interactive: { en: "interactive", ru: "интерактив" },
  practice: { en: "practice", ru: "практика" },
};

export const FREE: Resource[] = [
  { name: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", kind: K.video, note: { en: "Fifteen videos that give geometric intuition instead of rote rules. Watch before weeks 7–8 and 10.", ru: "Пятнадцать роликов, которые дают геометрическую интуицию вместо зубрёжки. Смотреть перед неделями 7–8 и 10." } },
  { name: "3Blue1Brown — Essence of Calculus", url: "https://www.3blue1brown.com/topics/calculus", kind: K.video, note: { en: "The same treatment for derivatives and integrals.", ru: "То же самое для производных и интегралов." } },
  { name: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest", kind: K.video, note: { en: "One video per topic of the maths course: p-values, ANOVA, regression, PCA, clustering.", ru: "По ролику на каждую тему курса математики: p-значение, ANOVA, регрессия, PCA, кластеризация." } },
  { name: "Seeing Theory", url: "https://seeing-theory.brown.edu/", kind: K.interactive, note: { en: "Brown University: probability and statistics as animations you can play with.", ru: "Университет Брауна: вероятность и статистика в анимациях, с которыми можно играть." } },
  { name: "MIT OCW 18.06 — Linear Algebra, Gilbert Strang", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", kind: K.course, note: { en: "A full university course with lectures and problem sets, if you want it systematic.", ru: "Полный университетский курс с лекциями и задачами, если хочется системно." } },
  { name: "MIT OCW 18.05 — Introduction to Probability and Statistics", url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/", kind: K.course, note: { en: "Notes and problems on exactly the probability prerequisite.", ru: "Конспекты и задачи ровно по пререквизиту по вероятности." } },
  { name: "Khan Academy — Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability", kind: K.course, note: { en: "Step by step with exercises. Good for closing specific gaps from the self-check.", ru: "Пошагово и с упражнениями. Хорошо закрывает конкретные дыры из чек-листа." } },
  { name: "SQLBolt", url: "https://sqlbolt.com/", kind: K.drill, note: { en: "Interactive SQL lessons in the browser. Reaching the end of the joins section is week 6.", ru: "Интерактивные уроки SQL в браузере. Дойти до конца раздела с соединениями — это неделя 6." } },
  { name: "Mode — SQL Tutorial", url: "https://mode.com/sql-tutorial/", kind: K.drill, note: { en: "From basic SELECT to window functions, on real data.", ru: "От базового SELECT до оконных функций, на реальных данных." } },
  { name: "PostgreSQL Exercises", url: "https://pgexercises.com/", kind: K.drill, note: { en: "Checked exercises. Harder than SQLBolt and closer to exam level.", ru: "Задачи с проверкой. Сложнее SQLBolt, ближе к экзаменационному уровню." } },
  { name: "Python for Data Analysis, 3rd edition", url: "https://wesmckinney.com/book/", kind: K.book, note: { en: "The main book of the programming course, opened by the author for free.", ru: "Главная книга курса программирования, открыта автором бесплатно." } },
  { name: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", kind: K.book, note: { en: "Full text online. The gentlest route into PCA and k-means.", ru: "Полный текст онлайн. Самый мягкий путь к PCA и k-means." } },
  { name: "An Introduction to Statistical Learning", url: "https://www.statlearning.com/", kind: K.book, note: { en: "Free PDF and datasets. Python and R editions both exist.", ru: "Бесплатный PDF и наборы данных. Есть издания под Python и под R." } },
  { name: "R for Data Science, 2nd edition", url: "https://r4ds.hadley.nz/", kind: K.book, note: { en: "Free in full. The R half of the syllabus.", ru: "Целиком бесплатна. R-половина силлабуса." } },
  { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", kind: K.practice, note: { en: "Short hands-on modules: pandas, visualisation, SQL, feature engineering.", ru: "Короткие практические модули: pandas, визуализация, SQL, feature engineering." } },
];

export const DATASETS: { name: string; note: L10n }[] = [
  { name: "Palmer Penguins", note: { en: "Small and clean. Ideal for the first weeks: groups, means, boxplots, t-tests.", ru: "Маленький и чистый. Идеален для первых недель: группы, средние, боксплоты, t-тесты." } },
  { name: "Titanic", note: { en: "The classic cleaning exercise: missing ages, categories, encoding.", ru: "Классика для очистки: пропуски в возрасте, категории, кодирование." } },
  { name: "Chinook", note: { en: "A SQLite teaching database: a music store, eleven tables. The best set for joins and grouping.", ru: "Учебная база SQLite: магазин музыки, одиннадцать таблиц. Лучший набор для соединений и группировок." } },
  { name: "Northwind", note: { en: "The second classic teaching schema: orders, customers, suppliers.", ru: "Вторая классическая учебная схема: заказы, клиенты, поставщики." } },
  { name: "NYC Taxi Trips", note: { en: "A large set for practising performance and time series.", ru: "Крупный набор для практики с производительностью и временными рядами." } },
  { name: "UCI Adult / Wine Quality", note: { en: "A mix of numeric and categorical features — what regression needs.", ru: "Смесь числовых и категориальных признаков — то, что нужно для регрессии." } },
  { name: "World Bank Open Data", note: { en: "Panel data by country and year: dynamics, indices and trends for week 9.", ru: "Панельные данные по странам и годам: динамика, индексы, тренды для недели 9." } },
  { name: "Kazakhstan open data", note: { en: "Local data makes a project more interesting to defend.", ru: "Локальные данные делают проект интереснее для защиты." } },
];

export const METHOD: { title: L10n; text: L10n }[] = [
  {
    title: { en: "Hand it in the week it is set", ru: "Сдавать в неделю, когда задали" },
    text: { en: "The course policy is explicit: late submissions are not accepted. Maths has eight laboratory works worth 60 % of each attestation. A missed week cannot be recovered by anything.", ru: "Правило курсов прямое: работы с опозданием не принимаются. У математики восемь лабораторных — это 60 % каждой аттестации. Пропущенная неделя не отыгрывается ничем." },
  },
  {
    title: { en: "Compute by hand before computing in code", ru: "Считать руками до того, как считать кодом" },
    text: { en: "Both final exams are written. There will be no pandas and no scipy docs on paper. Solve one example fully by hand every week.", ru: "Финальные экзамены обеих дисциплин письменные. На бумаге не будет ни pandas, ни справки scipy. Раз в неделю решайте один пример полностью вручную." },
  },
  {
    title: { en: "One topic, one notebook", ru: "Одна тема — один ноутбук" },
    text: { en: "The project is due in week five. If every topic already exists as a working notebook, the project assembles from parts instead of being written from nothing over a weekend.", ru: "Проект нужен к пятой неделе. Если каждая тема уже лежит работающим ноутбуком, проект собирается из готовых кусков, а не пишется с нуля за выходные." },
  },
  {
    title: { en: "Active recall over rereading", ru: "Активное вспоминание вместо перечитывания" },
    text: { en: "Close the notes and reconstruct the derivation or the query from memory. The self-check lists on the course pages exist for exactly this.", ru: "Закрыть конспект и восстановить вывод формулы или запрос по памяти. Чек-листы на страницах дисциплин сделаны ровно для этого." },
  },
  {
    title: { en: "English terms from day one", ru: "Английские термины с первого дня" },
    text: { en: "Programming is taught in English, maths in English and Russian. Exams, reading and assignments all use English terminology. The topic map lists the terms separately — learn them together with the concept.", ru: "Программирование читается на английском, математика — на английском и русском. Экзамен, литература и задания будут в английской терминологии. На карте тем термины вынесены отдельно — учите их вместе с понятием." },
  },
  {
    title: { en: "Test yourself on someone else's data", ru: "Проверять себя чужими данными" },
    text: { en: "Your own notebook always 'works'. Take a dataset with a different structure and run the same analysis — that is where the real gaps surface.", ru: "Свой ноутбук всегда «работает». Возьмите датасет с другой структурой и прогоните тот же анализ — там и вскроются реальные пробелы." },
  },
];

export const EXAM_PREP_NOTE: L10n = {
  en: "After 28 November there is a break until 5 December, and the winter trimester starts on 7 December. It is the only pause in the academic year longer than a weekend.",
  ru: "После 28 ноября — каникулы до 5 декабря, а 7 декабря начинается зимний триместр. Это единственная пауза в учебном году длиннее выходных.",
};
