import type { Week, WarmupDay } from "./types";

/**
 * Понедельный план / week-by-week plan.
 *
 * ВНИМАНИЕ: разбивка тем по неделям — реконструкция по содержанию курсов из хендбука.
 * Календарно-тематического плана в документах нет. Получишь силлабус — правь здесь.
 *
 * NOTE: the topic split is reconstructed from the handbook course content; the documents
 * contain no week-by-week plan. When you get the syllabus, edit this file.
 *
 * `reading` ссылается на книги из books.ts по id и номерам глав.
 */

export const WEEKS: Week[] = [
  {
    n: 1,
    topics: {
      math: {
        title: { en: "Descriptive statistics and types of data", ru: "Описательная статистика и типы данных" },
        detail: {
          en: "Measurement scales; absolute, relative and average values. Measures of spread: range, variance, standard deviation, coefficient of variation. Histogram, boxplot, scatter plot and what each of them hides.",
          ru: "Шкалы измерения; абсолютные, относительные и средние величины. Показатели вариации: размах, дисперсия, стандартное отклонение, коэффициент вариации. Гистограмма, боксплот, диаграмма рассеяния и что каждый из них скрывает.",
        },
        terms: ["descriptive statistics", "measures of central tendency", "variance", "standard deviation"],
        reading: [
          { book: "bruce", chapters: [1] },
          { book: "downey", chapters: [1, 2] },
        ],
      },
      prog: {
        title: { en: "Python for data: environment and basics", ru: "Python для данных: среда и основы" },
        detail: {
          en: "Jupyter and VS Code, data types, lists, dicts, sets, slicing, comprehensions, functions, modules, reading files.",
          ru: "Jupyter и VS Code, типы данных, списки, словари, множества, срезы, comprehensions, функции, модули, чтение файлов.",
        },
        terms: ["Jupyter", "list comprehension", "dict", "slicing"],
        reading: [
          { book: "mckinney", chapters: [2, 3] },
          { book: "vanderplas", chapters: [1] },
        ],
      },
    },
    todo: {
      en: "Get the environment working and hand in the first laboratory work on descriptive statistics on time — that sets the rhythm for the whole trimester.",
      ru: "Собрать рабочую среду и сдать первую лабораторную по описательной статистике в срок — это задаёт ритм на весь триместр.",
    },
  },
  {
    n: 2,
    topics: {
      math: {
        title: { en: "Probability and random variables", ru: "Вероятность и случайные величины" },
        detail: {
          en: "Conditional probability, Bayes' rule, expectation and variance. The key distributions: normal, binomial, Poisson.",
          ru: "Условная вероятность, формула Байеса, математическое ожидание и дисперсия. Ключевые распределения: нормальное, биномиальное, Пуассона.",
        },
        terms: ["conditional probability", "Bayes rule", "expected value", "probability distribution"],
        reading: [
          { book: "ross", chapters: [1, 2, 3] },
          { book: "downey", chapters: [2] },
        ],
      },
      prog: {
        title: { en: "NumPy: arrays and vectorisation", ru: "NumPy: массивы и векторизация" },
        detail: {
          en: "ndarray, dtype, shape and reshape, indexing, broadcasting, vector operations instead of loops, random numbers.",
          ru: "ndarray, dtype, форма и решейп, индексация, broadcasting, векторные операции вместо циклов, случайные числа.",
        },
        terms: ["ndarray", "broadcasting", "vectorization", "axis"],
        reading: [
          { book: "mckinney", chapters: [4] },
          { book: "vanderplas", chapters: [2] },
        ],
      },
    },
    todo: {
      en: "Rewrite three loops from week one in vectorised NumPy form and measure the difference in running time.",
      ru: "Переписать три цикла из первой недели в векторную форму на NumPy и замерить разницу во времени.",
    },
  },
  {
    n: 3,
    topics: {
      math: {
        title: { en: "Sampling and estimation", ru: "Выборка и оценивание" },
        detail: {
          en: "Population and sample, point and interval estimates, the central limit theorem, confidence intervals, standard error, the bootstrap.",
          ru: "Генеральная совокупность и выборка, точечные и интервальные оценки, центральная предельная теорема, доверительные интервалы, стандартная ошибка, бутстрап.",
        },
        terms: ["sampling", "point estimate", "confidence interval", "central limit theorem"],
        reading: [
          { book: "bruce", chapters: [2] },
          { book: "downey", chapters: [8] },
        ],
      },
      prog: {
        title: { en: "pandas I: Series, DataFrame, input and output", ru: "pandas I: Series, DataFrame, ввод-вывод" },
        detail: {
          en: "Creating and loading data (CSV, Excel, JSON), .loc and .iloc, filtering, sorting, new columns, describe and info.",
          ru: "Создание и загрузка данных (CSV, Excel, JSON), .loc и .iloc, фильтрация, сортировка, новые столбцы, describe и info.",
        },
        terms: ["DataFrame", "loc / iloc", "boolean mask", "read_csv"],
        reading: [
          { book: "mckinney", chapters: [5, 6] },
          { book: "vanderplas", chapters: [3] },
        ],
      },
    },
    todo: {
      en: "Take one public dataset and write a notebook that loads it and answers five substantive questions about it.",
      ru: "Взять один публичный датасет и написать ноутбук, который загружает его и отвечает на пять содержательных вопросов.",
    },
  },
  {
    n: 4,
    topics: {
      math: {
        title: { en: "Hypothesis testing", ru: "Проверка гипотез" },
        detail: {
          en: "Null and alternative hypotheses, significance level, p-value, type I and II errors, power. One- and two-sample t-tests, χ², permutation tests.",
          ru: "Нулевая и альтернативная гипотезы, уровень значимости, p-значение, ошибки первого и второго рода, мощность. t-тесты для одной и двух выборок, χ², перестановочные тесты.",
        },
        terms: ["null hypothesis", "p-value", "type I / type II error", "t-test"],
        reading: [
          { book: "bruce", chapters: [3] },
          { book: "downey", chapters: [9] },
        ],
      },
      prog: {
        title: { en: "pandas II: aggregation and joins", ru: "pandas II: агрегация и соединения" },
        detail: {
          en: "groupby and aggregation, merge and join, concat, pivot_table, reshaping with melt.",
          ru: "groupby и агрегирующие функции, merge и join, concat, сводные таблицы pivot_table, преобразование формы melt.",
        },
        terms: ["groupby", "merge", "pivot_table", "aggregation"],
        reading: [{ book: "mckinney", chapters: [8, 10] }],
      },
    },
    todo: {
      en: "Assemble a draft of the mid-term project: data loaded, cleaned, first aggregates and charts in place.",
      ru: "Собрать черновик промежуточного проекта: данные загружены, очищены, есть первые агрегаты и графики.",
    },
  },
  {
    n: 5,
    control: { en: "Mid-term control · 5–10 October", ru: "РК1 · 5–10 октября" },
    topics: {
      math: {
        title: { en: "Mid-term exam + analysis of variance", ru: "Рубежный экзамен + дисперсионный анализ" },
        detail: {
          en: "Exam on weeks 1–4. Then one-way ANOVA: comparing means across several groups, the F statistic, between- and within-group variance.",
          ru: "Экзамен по темам недель 1–4. Дальше однофакторный ANOVA: сравнение средних в нескольких группах, F-статистика, межгрупповая и внутригрупповая дисперсия.",
        },
        terms: ["ANOVA", "F-test", "between-group variance", "post-hoc"],
        reading: [{ book: "bruce", chapters: [3], section: { en: "the ANOVA section", ru: "раздел про ANOVA" } }],
      },
      prog: {
        title: { en: "Mid-term project submission + data cleaning", ru: "Сдача промежуточного проекта + очистка данных" },
        detail: {
          en: "The 100-point project. In parallel: missing values, duplicates, outliers, type coercion, categorical encoding, normalisation.",
          ru: "Проект на 100 баллов. Параллельно: пропуски, дубликаты, выбросы, приведение типов, кодирование категорий, нормализация.",
        },
        terms: ["missing values", "outliers", "imputation", "encoding"],
        reading: [{ book: "mckinney", chapters: [7] }],
      },
    },
    todo: {
      en: "Submit the project and sit the mid-term exam. Afterwards go through your mistakes rather than exhaling: half of the second attestation rests on the same foundations.",
      ru: "Сдать проект и рубежный экзамен. После них разобрать ошибки, а не выдохнуть: половина второй аттестации опирается на те же основы.",
    },
  },
  {
    n: 6,
    topics: {
      math: {
        title: { en: "Correlation and association", ru: "Корреляция и связь признаков" },
        detail: {
          en: "Covariance, Pearson's coefficient, Spearman's rank correlation, the correlation matrix. Why correlation is not causation and where Pearson goes blind.",
          ru: "Ковариация, коэффициент Пирсона, ранговый Спирмена, корреляционная матрица. Почему корреляция не равна причинности и где Пирсон слепнет.",
        },
        terms: ["covariance", "Pearson correlation", "Spearman", "correlation matrix"],
        reading: [
          { book: "bruce", chapters: [1], section: { en: "the correlation section", ru: "раздел про корреляцию" } },
          { book: "downey", chapters: [7] },
        ],
      },
      prog: {
        title: { en: "SQL I: the relational model and queries", ru: "SQL I: реляционная модель и запросы" },
        detail: {
          en: "Tables, keys, relations. SELECT, WHERE, ORDER BY, LIMIT, aggregates, GROUP BY and HAVING, INNER and LEFT JOIN, subqueries.",
          ru: "Таблицы, ключи, связи. SELECT, WHERE, ORDER BY, LIMIT, агрегаты, GROUP BY и HAVING, INNER и LEFT JOIN, подзапросы.",
        },
        terms: ["SELECT", "JOIN", "GROUP BY", "HAVING"],
        reading: [{ book: "widom", chapters: [2, 6] }],
      },
    },
    todo: {
      en: "Work through an SQL trainer to the end of the joins section and solve 30 queries against a sample database.",
      ru: "Пройти тренажёр по SQL до конца раздела с соединениями и решить 30 запросов на учебной базе.",
    },
  },
  {
    n: 7,
    topics: {
      math: {
        title: { en: "Linear regression", ru: "Линейная регрессия" },
        detail: {
          en: "Ordinary least squares, interpreting coefficients, R², residuals and the model assumptions: linearity, homoscedasticity, independence, normality of residuals.",
          ru: "Метод наименьших квадратов, интерпретация коэффициентов, R², остатки и предпосылки модели: линейность, гомоскедастичность, независимость, нормальность остатков.",
        },
        terms: ["ordinary least squares", "residuals", "R-squared", "homoscedasticity"],
        reading: [
          { book: "bruce", chapters: [4] },
          { book: "isl", chapters: [3] },
          { book: "downey", chapters: [10] },
        ],
      },
      prog: {
        title: { en: "SQL II: schema design and optimisation", ru: "SQL II: проектирование и оптимизация схем" },
        detail: {
          en: "Normal forms 1NF–3NF, primary and foreign keys, constraints, indexes, the query plan, denormalisation as a trade-off.",
          ru: "Нормальные формы 1NF–3NF, первичные и внешние ключи, ограничения, индексы, план выполнения запроса, денормализация как компромисс.",
        },
        terms: ["normalization", "primary / foreign key", "index", "query plan"],
        reading: [{ book: "widom", chapters: [3, 4, 7, 8] }],
      },
    },
    todo: {
      en: "Design a database schema for your dataset: an ER sketch, a DDL script, the data loaded, five analytical queries. 25 October is Republic Day and falls on a Sunday.",
      ru: "Спроектировать схему БД под свой датасет: ER-набросок, DDL-скрипт, загрузка данных, пять аналитических запросов. 25 октября — День Республики, выходной приходится на воскресенье.",
    },
  },
  {
    n: 8,
    topics: {
      math: {
        title: { en: "Multiple regression", ru: "Множественная регрессия" },
        detail: {
          en: "Several predictors, multicollinearity and VIF, categorical features and dummy variables, model selection, adjusted R².",
          ru: "Несколько предикторов, мультиколлинеарность и VIF, категориальные признаки и фиктивные переменные, отбор модели, скорректированный R².",
        },
        terms: ["multiple regression", "multicollinearity", "dummy variable", "model selection"],
        reading: [
          { book: "isl", chapters: [3, 6] },
          { book: "esl", chapters: [3] },
        ],
      },
      prog: {
        title: { en: "Python and databases: the bridge and ETL", ru: "Python и БД: связка и ETL" },
        detail: {
          en: "sqlite3 and SQLAlchemy, pandas.read_sql and to_sql, parameterised queries, building a reproducible ETL pipeline. The end-term project starts.",
          ru: "sqlite3 и SQLAlchemy, pandas.read_sql и to_sql, параметризованные запросы, сборка воспроизводимого ETL-конвейера. Старт итогового проекта.",
        },
        terms: ["SQLAlchemy", "read_sql", "ETL", "parameterized query"],
        reading: [
          { book: "mckinney", chapters: [6], section: { en: "Interacting with Databases", ru: "раздел про работу с базами данных" } },
        ],
      },
    },
    todo: {
      en: "Start the end-term project: an end-to-end path from raw data through a database to analysis. Submission is in week 9.",
      ru: "Начать итоговый проект: сквозной путь от сырых данных через базу к аналитике. Сдача — на девятой неделе.",
    },
  },
  {
    n: 9,
    topics: {
      math: {
        title: { en: "Time series and forecasting", ru: "Временные ряды и прогнозирование" },
        detail: {
          en: "Indicators of dynamics and indices, trend and seasonality, stationarity, autocorrelation, moving averages, simple forecasting models.",
          ru: "Показатели динамики и индексы, тренд и сезонность, стационарность, автокорреляция, скользящее среднее, простые модели прогноза.",
        },
        terms: ["time series", "trend", "seasonality", "autocorrelation"],
        reading: [
          { book: "downey", chapters: [12] },
          { book: "mckinney", chapters: [11] },
        ],
      },
      prog: {
        title: { en: "Visualisation and reporting", ru: "Визуализация и отчётность" },
        detail: {
          en: "matplotlib and seaborn, choosing the chart for the question, axes and labels, legibility. Assembling the result into a report. End-term project submission.",
          ru: "matplotlib и seaborn, выбор типа графика под задачу, оси и подписи, читаемость. Сборка результата в отчёт. Сдача итогового проекта.",
        },
        terms: ["matplotlib", "seaborn", "chart selection", "reporting"],
        reading: [
          { book: "mckinney", chapters: [9] },
          { book: "vanderplas", chapters: [4] },
        ],
      },
    },
    todo: {
      en: "Submit the 60-point end-term project. Every chart must answer a question rather than decorate the page.",
      ru: "Сдать итоговый проект на 60 баллов. Каждый график должен отвечать на вопрос, а не украшать страницу.",
    },
  },
  {
    n: 10,
    control: { en: "End-term control · 9–14 November", ru: "РК2 · 9–14 ноября" },
    topics: {
      math: {
        title: { en: "End-term exam + clustering and dimensionality reduction", ru: "Итоговый экзамен + кластеризация и снижение размерности" },
        detail: {
          en: "Exam on weeks 6–9. Then k-means, hierarchical clustering, distance metrics, and principal component analysis as a projection onto eigenvectors.",
          ru: "Экзамен по темам недель 6–9. Дальше k-means, иерархическая кластеризация, метрики расстояния и метод главных компонент как проекция на собственные векторы.",
        },
        terms: ["k-means", "hierarchical clustering", "PCA", "dimensionality reduction"],
        reading: [
          { book: "bruce", chapters: [7] },
          { book: "isl", chapters: [12] },
          { book: "esl", chapters: [14] },
        ],
      },
      prog: {
        title: { en: "End-term quiz + exploratory analysis", ru: "Итоговый тест + разведочный анализ" },
        detail: {
          en: "The 40-point quiz. End-to-end EDA: from raw data to conclusions, reproducibility, repository structure, README. The basics of R and the tidyverse.",
          ru: "Тест на 40 баллов. Сквозной EDA: от сырых данных к выводам, воспроизводимость, структура репозитория, README. Основы R и tidyverse.",
        },
        terms: ["exploratory data analysis", "reproducibility", "tidyverse", "R"],
        reading: [
          { book: "mckinney", chapters: [13] },
          { book: "wickham", chapters: [1, 3, 5] },
          { book: "vanderplas", chapters: [5] },
        ],
      },
    },
    todo: {
      en: "Close both attestations and write the exam cheat sheet straight away, while the material is still fresh.",
      ru: "Закрыть обе аттестации и сразу составить конспект-шпаргалку к экзамену, пока материал свежий.",
    },
  },
];

/** Неделя 0: семь дней до первой пары. */
export const WARMUP: WarmupDay[] = [
  {
    date: "2026-08-31",
    load: { en: "full day", ru: "полный день" },
    tracks: {
      math: {
        title: { en: "Linear algebra, part 1", ru: "Линейная алгебра, часть 1" },
        detail: {
          en: "Vectors, dot product, norm. Matrices: multiplication, transpose, the identity. A matrix as a linear map.",
          ru: "Векторы, скалярное произведение, норма. Матрицы: умножение, транспонирование, единичная матрица. Матрица как линейное отображение.",
        },
        source: {
          en: "Hartman, Fundamentals of Matrix Algebra, ch. 2 · 3Blue1Brown, Essence of Linear Algebra, 1–4",
          ru: "Hartman, Fundamentals of Matrix Algebra, гл. 2 · 3Blue1Brown, Essence of Linear Algebra, 1–4",
        },
      },
      prog: {
        title: { en: "Set up the environment", ru: "Собрать среду" },
        detail: {
          en: "Python 3.12, a package manager, JupyterLab, VS Code, git and a GitHub repository. First notebook, first commit.",
          ru: "Python 3.12, менеджер пакетов, JupyterLab, VS Code, git и репозиторий на GitHub. Первый ноутбук, первый коммит.",
        },
        source: { en: "The Toolkit page — the commands are there", ru: "Страница «Инструменты» — там готовые команды" },
      },
    },
    outcome: {
      en: "A working notebook in the repository that multiplies two matrices by hand and with NumPy, with matching results.",
      ru: "Работающий ноутбук в репозитории: умножение двух матриц вручную и через NumPy, результаты совпадают.",
    },
  },
  {
    date: "2026-09-01",
    load: { en: "evening, ~2 h", ru: "вечер, ~2 ч" },
    university: {
      en: "Induction week and course registration start today",
      ru: "Ознакомительная неделя и регистрация на дисциплины — начинается сегодня",
    },
    tracks: {
      math: {
        title: { en: "Linear algebra, part 2", ru: "Линейная алгебра, часть 2" },
        detail: {
          en: "Determinant, rank, inverse and when it exists. Eigenvectors and eigenvalues — why PCA will need them.",
          ru: "Определитель, ранг, обратная матрица и условие её существования. Собственные векторы и значения — зачем они в PCA.",
        },
        source: {
          en: "Hartman, ch. 3–4 · 3Blue1Brown, 5–7 and 13–14",
          ru: "Hartman, гл. 3–4 · 3Blue1Brown, 5–7 и 13–14",
        },
      },
      prog: {
        title: { en: "Python: types and structures", ru: "Python: типы и структуры" },
        detail: {
          en: "Numbers, strings, lists, tuples, dicts, sets. Mutability and references. Slicing. Comprehensions.",
          ru: "Числа, строки, списки, кортежи, словари, множества. Изменяемость и ссылки. Срезы. Comprehensions.",
        },
        source: { en: "McKinney, ch. 3", ru: "McKinney, гл. 3" },
      },
    },
    outcome: {
      en: "Register for your courses — that is a university deadline and it outranks any set of notes.",
      ru: "Зарегистрироваться на дисциплины — это дедлайн университета, он важнее любого конспекта.",
    },
  },
  {
    date: "2026-09-02",
    load: { en: "evening, ~2 h", ru: "вечер, ~2 ч" },
    university: { en: "Induction week", ru: "Ознакомительная неделя" },
    tracks: {
      math: {
        title: { en: "Derivatives and the gradient", ru: "Производные и градиент" },
        detail: {
          en: "The derivative, differentiation rules, the chain rule. Partial derivatives and the gradient. Zeroing the gradient as the condition for an extremum.",
          ru: "Производная, правила дифференцирования, цепное правило. Частные производные и градиент. Обнуление градиента как условие экстремума.",
        },
        source: {
          en: "Orland, Math for Programmers, ch. 8 · 3Blue1Brown, Essence of Calculus, 1–4",
          ru: "Orland, Math for Programmers, гл. 8 · 3Blue1Brown, Essence of Calculus, 1–4",
        },
      },
      prog: {
        title: { en: "Python: functions and files", ru: "Python: функции и файлы" },
        detail: {
          en: "Functions, default arguments, scope. Working with files, handling exceptions, modules and imports.",
          ru: "Функции, аргументы по умолчанию, области видимости. Работа с файлами, обработка исключений, модули и импорт.",
        },
        source: { en: "McKinney, ch. 3", ru: "McKinney, гл. 3" },
      },
    },
    outcome: {
      en: "Derive least squares for one variable: set the partial derivatives of the sum of squares to zero.",
      ru: "Вывести МНК для одной переменной: приравнять частные производные суммы квадратов к нулю.",
    },
  },
  {
    date: "2026-09-03",
    load: { en: "evening, ~2 h", ru: "вечер, ~2 ч" },
    university: { en: "Induction week", ru: "Ознакомительная неделя" },
    tracks: {
      math: {
        title: { en: "Random variables", ru: "Случайные величины" },
        detail: {
          en: "Discrete and continuous variables, density and distribution functions. Expectation, variance, standard deviation.",
          ru: "Дискретные и непрерывные величины, функция плотности и распределения. Математическое ожидание, дисперсия, стандартное отклонение.",
        },
        source: {
          en: "Ross, ch. 1–2 · Seeing Theory, Basic Probability and Probability Distributions",
          ru: "Ross, гл. 1–2 · Seeing Theory, разделы Basic Probability и Probability Distributions",
        },
      },
      prog: {
        title: { en: "NumPy from scratch", ru: "NumPy с нуля" },
        detail: {
          en: "Creating arrays, shape, indexing, slicing, aggregating along axes, broadcasting.",
          ru: "Создание массивов, форма, индексация, срезы, агрегаты по осям, broadcasting.",
        },
        source: { en: "McKinney, ch. 4", ru: "McKinney, гл. 4" },
      },
    },
    outcome: {
      en: "Simulate 10 000 coin tosses in NumPy and watch the sample frequency converge on 0.5.",
      ru: "Смоделировать 10 000 бросков монеты на NumPy и увидеть, как выборочная частота сходится к 0,5.",
    },
  },
  {
    date: "2026-09-04",
    load: { en: "evening, ~2 h", ru: "вечер, ~2 ч" },
    university: { en: "Induction week ends tomorrow", ru: "Ознакомительная неделя завершается завтра" },
    tracks: {
      math: {
        title: { en: "Distributions and the CLT", ru: "Распределения и ЦПТ" },
        detail: {
          en: "Normal, binomial, Poisson, Student's t. The central limit theorem and why it makes statistics possible at all.",
          ru: "Нормальное, биномиальное, Пуассона, t-распределение. Центральная предельная теорема и почему она вообще делает статистику возможной.",
        },
        source: { en: "Bruce & Bruce, ch. 2 · StatQuest on the normal distribution and the CLT", ru: "Bruce & Bruce, гл. 2 · StatQuest по нормальному распределению и ЦПТ" },
      },
      prog: {
        title: { en: "pandas: first contact", ru: "pandas: первое знакомство" },
        detail: {
          en: "Series and DataFrame, read_csv, head, info, describe, selecting columns, filtering by condition.",
          ru: "Series и DataFrame, read_csv, head, info, describe, выбор столбцов, фильтрация по условию.",
        },
        source: { en: "McKinney, ch. 5", ru: "McKinney, гл. 5" },
      },
    },
    outcome: {
      en: "Take any skewed distribution, average 30 draws a thousand times, and watch a normal histogram appear.",
      ru: "Взять любое несимметричное распределение, усреднять по 30 значений тысячу раз и получить нормальную гистограмму.",
    },
  },
  {
    date: "2026-09-05",
    load: { en: "full day", ru: "полный день" },
    tracks: {
      math: {
        title: { en: "Descriptive statistics in practice", ru: "Описательная статистика на практике" },
        detail: {
          en: "Mean, median, mode, quartiles, range, variance, coefficient of variation. Histogram, boxplot, scatter plot and what each of them hides.",
          ru: "Среднее, медиана, мода, квартили, размах, дисперсия, коэффициент вариации. Гистограмма, боксплот, диаграмма рассеяния и что каждый из них скрывает.",
        },
        source: { en: "Bruce & Bruce, ch. 1 — the chapter week 1 opens with", ru: "Bruce & Bruce, гл. 1 — с неё и начнётся первая неделя" },
      },
      prog: {
        title: { en: "SQL: first queries", ru: "SQL: первые запросы" },
        detail: {
          en: "The relational model. SELECT, WHERE, ORDER BY, LIMIT, aggregates, GROUP BY. Install DuckDB or SQLite and load a sample database.",
          ru: "Реляционная модель. SELECT, WHERE, ORDER BY, LIMIT, агрегаты, GROUP BY. Установить DuckDB или SQLite и загрузить учебную базу.",
        },
        source: { en: "Widom, ch. 2 · SQLBolt, lessons 1–12", ru: "Widom, гл. 2 · SQLBolt, уроки 1–12" },
      },
    },
    outcome: {
      en: "One dataset examined two ways: a pandas summary and the same numbers via SQL queries. The figures have to match.",
      ru: "Один датасет двумя способами: сводка через pandas и те же цифры через SQL. Числа должны сойтись.",
    },
  },
  {
    date: "2026-09-06",
    load: { en: "half a day", ru: "полдня" },
    tracks: {
      math: {
        title: { en: "Review and self-check", ru: "Повторение и самопроверка" },
        detail: {
          en: "Work through the self-check lists on both course pages. Write down everything that did not come to you within a minute — that is your gap list.",
          ru: "Пройти чек-листы самопроверки на страницах обеих дисциплин. Выписать всё, где ответ не пришёл за минуту, — это список пробелов.",
        },
        source: { en: "The Test yourself sections on both course pages", ru: "Разделы «Проверь себя» на страницах обеих дисциплин" },
      },
      prog: {
        title: { en: "Set up for the trimester", ru: "Заготовка на триместр" },
        detail: {
          en: "Repository layout: folders per week, a notebook template, README, .gitignore. A calendar with the deadlines.",
          ru: "Структура репозитория: папки по неделям, шаблон ноутбука, README, .gitignore. Календарь с дедлайнами.",
        },
        source: { en: "The Toolkit page — repository layout", ru: "Страница «Инструменты» — структура репозитория" },
      },
    },
    outcome: {
      en: "Repository ready, gaps written down, the week planned. Tomorrow is the first class.",
      ru: "Репозиторий готов, пробелы выписаны, неделя расписана. Завтра — первая пара.",
    },
  },
];
