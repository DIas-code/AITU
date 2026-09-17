/**
 * Каталог литературы из силлабусов обеих дисциплин.
 * Catalogue of the reading lists from both course syllabi.
 *
 * Недели в plan.ts ссылаются сюда по id — так номера глав живут в одном месте.
 * Weeks in plan.ts reference these by id, so chapter numbers live in one place.
 *
 * ВНИМАНИЕ / NOTE: номера глав соответствуют изданию, указанному в поле `edition`.
 * Chapter numbers follow the edition named in `edition`. Check your own copy.
 */

export interface Chapter {
  /** Номер главы в указанном издании. */
  n: number;
  /** Название главы — по нему найдёшь главу даже в другом издании. */
  title: string;
}

export interface BookEntry {
  id: string;
  authors: string;
  title: string;
  edition: string;
  /** Для какой дисциплины книга в силлабусе: math | prog | both */
  course: "math" | "prog" | "both";
  /** "syllabus" — из списка литературы курса, "extra" — добавлено сверх него. */
  kind: "syllabus" | "extra";
  /** Официально бесплатный полный текст, если есть. */
  free?: string;
  chapters: Chapter[];
  note: { en: string; ru: string };
}

export const BOOKS: BookEntry[] = [
  {
    id: "bruce",
    authors: "Bruce P., Bruce A.",
    title: "Practical Statistics for Data Scientists",
    edition: "O’Reilly, 2017",
    course: "math",
    kind: "syllabus",
    chapters: [
      { n: 1, title: "Exploratory Data Analysis" },
      { n: 2, title: "Data and Sampling Distributions" },
      { n: 3, title: "Statistical Experiments and Significance Testing" },
      { n: 4, title: "Regression and Prediction" },
      { n: 5, title: "Classification" },
      { n: 6, title: "Statistical Machine Learning" },
      { n: 7, title: "Unsupervised Learning" },
    ],
    note: {
      en: "The spine of the maths course. Chapters 1–4 and 7 cover almost the whole trimester, in the same order the course moves.",
      ru: "Опорная книга курса математики. Главы 1–4 и 7 закрывают почти весь триместр, причём в том же порядке, в котором идёт курс.",
    },
  },
  {
    id: "downey",
    authors: "Downey A.",
    title: "Think Stats",
    edition: "O’Reilly, 2nd ed.",
    course: "math",
    kind: "extra",
    free: "https://allendowney.github.io/ThinkStats/",
    chapters: [
      { n: 1, title: "Exploratory Data Analysis" },
      { n: 2, title: "Distributions" },
      { n: 7, title: "Relationships Between Variables" },
      { n: 8, title: "Estimation" },
      { n: 9, title: "Hypothesis Testing" },
      { n: 10, title: "Linear Least Squares" },
      { n: 11, title: "Regression" },
      { n: 12, title: "Time Series Analysis" },
    ],
    note: {
      en: "Statistics done in Python. Not in the syllabus, but it turns every maths topic into runnable code — useful because the labs are graded as written reports.",
      ru: "Статистика через Python. В силлабусе её нет, но она превращает каждую тему курса в исполняемый код — полезно, потому что лабораторные сдаются письменными отчётами.",
    },
  },
  {
    id: "isl",
    authors: "James G., Witten D., Hastie T., Tibshirani R.",
    title: "An Introduction to Statistical Learning",
    edition: "Springer, 2nd ed.",
    course: "math",
    kind: "syllabus",
    free: "https://www.statlearning.com/",
    chapters: [
      { n: 2, title: "Statistical Learning" },
      { n: 3, title: "Linear Regression" },
      { n: 5, title: "Resampling Methods" },
      { n: 6, title: "Linear Model Selection and Regularization" },
      { n: 12, title: "Unsupervised Learning" },
    ],
    note: {
      en: "The bridge between the two courses: statistics explained with code. Free PDF, and there are separate Python and R editions.",
      ru: "Мост между двумя дисциплинами: статистика с кодом. PDF бесплатный, есть отдельные издания под Python и под R.",
    },
  },
  {
    id: "esl",
    authors: "Hastie T., Tibshirani R., Friedman J.",
    title: "The Elements of Statistical Learning",
    edition: "Springer, 2nd ed.",
    course: "math",
    kind: "syllabus",
    chapters: [
      { n: 3, title: "Linear Methods for Regression" },
      { n: 14, title: "Unsupervised Learning" },
    ],
    note: {
      en: "A reference, not a book to read cover to cover. Open it for one section when you need the formal version of something.",
      ru: "Справочник, а не книга для чтения подряд. Открывать точечно, когда нужна формальная версия того, что уже понял.",
    },
  },
  {
    id: "ross",
    authors: "Ross S. M.",
    title: "Introduction to Probability Models",
    edition: "Academic Press",
    course: "math",
    kind: "syllabus",
    chapters: [
      { n: 1, title: "Introduction to Probability Theory" },
      { n: 2, title: "Random Variables" },
      { n: 3, title: "Conditional Probability and Conditional Expectation" },
    ],
    note: {
      en: "For the probability prerequisite. Chapters 1–3 are exactly what the course assumes you already have.",
      ru: "Для пререквизита по теории вероятностей. Главы 1–3 — ровно то, что курс считает уже пройденным.",
    },
  },
  {
    id: "hartman",
    authors: "Hartman G.",
    title: "Fundamentals of Matrix Algebra",
    edition: "3rd ed., free",
    course: "math",
    kind: "syllabus",
    chapters: [
      { n: 1, title: "Systems of Linear Equations" },
      { n: 2, title: "Matrix Arithmetic" },
      { n: 3, title: "Operations on Matrices" },
      { n: 4, title: "Eigenvalues and Eigenvectors" },
    ],
    note: {
      en: "Short and free. Chapters 2–4 are the linear algebra you need for regression in matrix form and for PCA.",
      ru: "Короткий и бесплатный. Главы 2–4 — та линейная алгебра, что нужна для регрессии в матричной форме и для PCA.",
    },
  },
  {
    id: "orland",
    authors: "Orland P.",
    title: "Math for Programmers",
    edition: "Manning, 2020",
    course: "math",
    kind: "syllabus",
    chapters: [
      { n: 5, title: "Computing transformations with matrices" },
      { n: 7, title: "Solving systems of linear equations" },
      { n: 8, title: "Understanding rates of change" },
      { n: 12, title: "Optimizing a physical system" },
      { n: 14, title: "Fitting functions to data" },
    ],
    note: {
      en: "Linear algebra and calculus written for programmers, with code. A good bridge if formal textbooks do not click.",
      ru: "Линейная алгебра и матанализ языком программиста, с кодом. Хороший мост, если формальные учебники не заходят.",
    },
  },
  {
    id: "mckinney",
    authors: "McKinney W.",
    title: "Python for Data Analysis",
    edition: "O’Reilly, 3rd ed., 2022",
    course: "prog",
    kind: "syllabus",
    free: "https://wesmckinney.com/book/",
    chapters: [
      { n: 2, title: "Python Language Basics, IPython, and Jupyter Notebooks" },
      { n: 3, title: "Built-in Data Structures, Functions, and Files" },
      { n: 4, title: "NumPy Basics: Arrays and Vectorized Computation" },
      { n: 5, title: "Getting Started with pandas" },
      { n: 6, title: "Data Loading, Storage, and File Formats" },
      { n: 7, title: "Data Cleaning and Preparation" },
      { n: 8, title: "Data Wrangling: Join, Combine, and Reshape" },
      { n: 9, title: "Plotting and Visualization" },
      { n: 10, title: "Data Aggregation and Group Operations" },
      { n: 11, title: "Time Series" },
      { n: 13, title: "Data Analysis Examples" },
    ],
    note: {
      en: "Written by the author of pandas and free in full online. Chapters 2–10 map almost one-to-one onto the first nine weeks of the course.",
      ru: "Написана автором pandas и целиком бесплатна онлайн. Главы 2–10 ложатся почти один в один на первые девять недель курса.",
    },
  },
  {
    id: "vanderplas",
    authors: "VanderPlas J.",
    title: "Python Data Science Handbook",
    edition: "O’Reilly, 2016",
    course: "prog",
    kind: "syllabus",
    free: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    chapters: [
      { n: 1, title: "IPython: Beyond Normal Python" },
      { n: 2, title: "Introduction to NumPy" },
      { n: 3, title: "Data Manipulation with Pandas" },
      { n: 4, title: "Visualization with Matplotlib" },
      { n: 5, title: "Machine Learning" },
    ],
    note: {
      en: "A second angle on the same tools. Free in full. Chapter 5 is the gentlest route into PCA and k-means for week 10.",
      ru: "Второй взгляд на те же инструменты. Целиком бесплатна. Глава 5 — самый мягкий путь к PCA и k-means для десятой недели.",
    },
  },
  {
    id: "widom",
    authors: "Garcia-Molina H., Ullman J., Widom J.",
    title: "Database Systems: The Complete Book",
    edition: "Pearson, 2nd ed.",
    course: "prog",
    kind: "syllabus",
    chapters: [
      { n: 2, title: "The Relational Model of Data" },
      { n: 3, title: "Design Theory for Relational Databases" },
      { n: 4, title: "High-Level Database Models" },
      { n: 6, title: "The Database Language SQL" },
      { n: 7, title: "Constraints and Triggers" },
      { n: 8, title: "Views and Indexes" },
    ],
    note: {
      en: "The database half of the course. Chapter 6 for writing SQL, chapter 3 for normal forms, chapter 8 for indexes — that is weeks 6 to 8.",
      ru: "Половина курса, которая про базы данных. Глава 6 — писать SQL, глава 3 — нормальные формы, глава 8 — индексы: это недели с шестой по восьмую.",
    },
  },
  {
    id: "wickham",
    authors: "Wickham H., Çetinkaya-Rundel M., Grolemund G.",
    title: "R for Data Science",
    edition: "O’Reilly, 2nd ed.",
    course: "prog",
    kind: "syllabus",
    free: "https://r4ds.hadley.nz/",
    chapters: [
      { n: 1, title: "Data visualization" },
      { n: 3, title: "Data transformation" },
      { n: 5, title: "Data tidying" },
    ],
    note: {
      en: "The syllabus names R next to Python. Free in full. Worth a weekend in week 10, once pandas already makes sense.",
      ru: "Силлабус называет R наравне с Python. Целиком бесплатна. Стоит одних выходных на десятой неделе, когда pandas уже понятен.",
    },
  },
];

export const bookById = (id: string) => BOOKS.find((b) => b.id === id);
export const booksForCourse = (course: "math" | "prog") =>
  BOOKS.filter((b) => b.course === course || b.course === "both");

/** Ссылка «книга + главы» для недели. */
export interface ReadingRef {
  book: string;
  chapters: number[];
  /** Уточнение: конкретный раздел внутри главы. */
  section?: { en: string; ru: string };
}

/** Разворачивает ссылку в готовую к показу строку. */
export function renderReading(ref: ReadingRef, lang: "en" | "ru") {
  const b = bookById(ref.book);
  if (!b) return null;
  const chs = ref.chapters
    .map((n) => b.chapters.find((c) => c.n === n))
    .filter((c): c is Chapter => Boolean(c));
  return {
    authors: b.authors,
    title: b.title,
    edition: b.edition,
    free: b.free,
    chapters: chs,
    label: (lang === "en" ? "ch. " : "гл. ") + ref.chapters.join(", "),
    section: ref.section ? ref.section[lang] : undefined,
  };
}
