import type { Course } from "./types";

/**
 * Дисциплины / Courses.
 *
 * Чтобы добавить новую: скопируй объект, поменяй slug и поля.
 * Страница /<lang>/courses/<slug>.html и пункт меню появятся автоматически.
 *
 * Источники фактов / sources of fact:
 *   кредиты, часы, коды, форма контроля — «УП ADA.pdf» (учебный план 7M06103, 2025–2027)
 *   преподаватель, язык, баллы, содержание, литература — «ADA_MS_Module Handbook_2025.pdf»
 */

const FORMULA = {
  en: "0.3 × attestation 1 + 0.3 × attestation 2 + 0.4 × final exam = 100",
  ru: "0,3 × первая аттестация + 0,3 × вторая аттестация + 0,4 × финальный экзамен = 100",
};

const P = { en: "Attestation 1", ru: "1 аттестация" };
const P2 = { en: "Attestation 2", ru: "2 аттестация" };
const PE = { en: "Final exam", ru: "Экзамен" };

export const COURSES: Course[] = [
  {
    slug: "math",
    short: { en: "Mathematics", ru: "Математика" },
    title: { en: "Mathematics for Data Science", ru: "Математика для науки о данных" },
    officialEn: "Mathematics for data science",
    officialRu: "Математика для науки о данных",
    trimester: 1,
    code: "5",
    cycle: "ПД",
    component: "ВК",
    credits: 5,
    control: "exam",
    lecturer: "Prof. Svitlana Biloshchytska, Doctor of Technical Sciences",
    language: { en: "English, Russian", ru: "английский, русский" },
    hours: { total: 150, lec: 30, lab: 0, pr: 20, srop: 10, sro: 90 },
    hoursHandbook: { total: 150, lec: 30, pr: 20, isis: 30, sis: 70 },
    accent: "t-math",
    method: {
      en: "Problem-based learning: students work in groups on an open-ended problem, with group discussion and interactive-communicative learning.",
      ru: "Problem-based learning: работа в группах над открытой задачей, групповая дискуссия, интерактивно-коммуникативное обучение.",
    },
    prerequisites: {
      en: "Linear algebra, calculus I/II, probability theory and statistics (BSc level)",
      ru: "Линейная алгебра, матанализ I/II, теория вероятностей и статистика (бакалавриат)",
    },
    postrequisites: { en: "Data Analytics application project", ru: "Прикладной проект по аналитике данных" },
    about: {
      en: "Over ten weeks the course covers how research data is described, the main methods and principles of statistical analysis, and the interpretation and visualisation of results: analysis of variance, regression and cluster analysis, comparing groups, correlation coefficients, regression equations. The emphasis is on the mathematical ideas, intuition and logic behind the methods rather than on the formulas themselves.",
      ru: "За десять недель разбираются подходы к описанию данных исследования, основные методы и принципы статистического анализа, интерпретация и визуализация результатов: дисперсионный, регрессионный и кластерный анализ, сравнение групп, коэффициенты корреляции, уравнения регрессии. Упор — на математические идеи, интуицию и логику за методами, а не на сами формулы.",
    },
    assessment: [
      { period: P, kind: { en: "Laboratory works 1–4", ru: "Лабораторные работы 1–4" }, points: 60, form: { en: "Written reports", ru: "Письменные отчёты" }, when: { en: "weekly", ru: "еженедельно" } },
      { period: P, kind: { en: "Mid-term exam", ru: "Рубежный экзамен" }, points: 40, form: { en: "Written", ru: "Письменно" }, when: { en: "week 5", ru: "неделя 5" }, hot: true },
      { period: P2, kind: { en: "Laboratory works 5–8", ru: "Лабораторные работы 5–8" }, points: 60, form: { en: "Written reports", ru: "Письменные отчёты" }, when: { en: "weekly", ru: "еженедельно" } },
      { period: P2, kind: { en: "End-term exam", ru: "Итоговый экзамен" }, points: 40, form: { en: "Written", ru: "Письменно" }, when: { en: "week 10", ru: "неделя 10" }, hot: true },
      { period: PE, kind: { en: "Final exam", ru: "Финальный экзамен" }, points: 100, form: { en: "—", ru: "—" }, when: { en: "16–28 Nov", ru: "16–28 ноя" }, hot: true },
    ],
    formula: FORMULA,
    lever: {
      en: "60 of the 100 points in each attestation are eight laboratory works handed in weekly. They cannot be caught up the night before: late submissions are not accepted, so a missed week is points lost for good. That is the lever of this course.",
      ru: "60 из 100 баллов каждой аттестации — восемь лабораторных, которые сдаются еженедельно. Их нельзя нагнать в последнюю ночь: работы с опозданием не принимаются, поэтому пропущенная неделя — потерянные баллы навсегда. Это главный рычаг курса.",
    },
    prep: [
      {
        title: { en: "Linear algebra", ru: "Линейная алгебра" },
        why: {
          en: "Needed in weeks 7–8 and 10: regression in matrix form, multicollinearity, principal component analysis.",
          ru: "Нужна на неделях 7–8 и 10: регрессия в матричной форме, мультиколлинеарность, метод главных компонент.",
        },
        items: {
          en: ["Vectors, dot product, norm", "Matrix multiplication and transpose", "Determinant, rank, inverse", "Eigenvectors and eigenvalues", "A matrix as a linear map"],
          ru: ["Векторы, скалярное произведение, норма", "Умножение и транспонирование матриц", "Определитель, ранг, обратная матрица", "Собственные векторы и собственные значения", "Матрица как линейное отображение"],
        },
        reading: [
          { book: "hartman", chapters: [2, 3, 4] },
          { book: "orland", chapters: [5, 7] },
        ],
      },
      {
        title: { en: "Calculus", ru: "Математический анализ" },
        why: {
          en: "Needed to see where the formulas come from: least squares is derived by setting the gradient to zero.",
          ru: "Нужен, чтобы понимать, откуда берутся формулы: МНК выводится приравниванием градиента к нулю.",
        },
        items: {
          en: ["Derivatives and differentiation rules", "The chain rule", "Partial derivatives and the gradient", "Extrema of a function of several variables", "The integral as area and as probability"],
          ru: ["Производная и правила дифференцирования", "Цепное правило", "Частные производные и градиент", "Экстремум функции нескольких переменных", "Интеграл как площадь и как вероятность"],
        },
        reading: [{ book: "orland", chapters: [8, 12, 14] }],
      },
      {
        title: { en: "Probability", ru: "Теория вероятностей" },
        why: {
          en: "The foundation of weeks 2–5. Without it, hypothesis testing turns into memorising recipes.",
          ru: "Фундамент недель 2–5. Без него проверка гипотез превращается в заучивание рецептов.",
        },
        items: {
          en: ["Conditional probability and Bayes' rule", "Random variables, density and distribution functions", "Expected value and variance", "Normal, binomial, Poisson, t and χ²", "The central limit theorem"],
          ru: ["Условная вероятность и формула Байеса", "Случайные величины, плотность и функция распределения", "Математическое ожидание и дисперсия", "Нормальное, биномиальное, Пуассона, t и χ²", "Центральная предельная теорема"],
        },
        reading: [
          { book: "ross", chapters: [1, 2, 3] },
          { book: "bruce", chapters: [2] },
        ],
      },
    ],
    qa: [
      { group: { en: "Linear algebra", ru: "Линейная алгебра" }, q: { en: "What is the rank of a matrix and why is it critical for regression?", ru: "Что такое ранг матрицы и почему он критичен для регрессии?" }, a: { en: "The number of linearly independent rows or columns. If the columns of the feature matrix X are linearly dependent — rank below the number of features — then XᵀX is not invertible and the least-squares estimate is not unique. That is exactly what multicollinearity means in week 8.", ru: "Число линейно независимых строк или столбцов. Если столбцы матрицы признаков X линейно зависимы, то есть ранг меньше числа признаков, то XᵀX необратима и оценка МНК не единственна. Именно это стоит за мультиколлинеарностью на восьмой неделе." } },
      { group: { en: "Linear algebra", ru: "Линейная алгебра" }, q: { en: "What does (AB)ᵀ equal?", ru: "Чему равно (AB)ᵀ?" }, a: { en: "BᵀAᵀ — the order of the factors reverses. Writing AᵀBᵀ is a common exam slip.", ru: "BᵀAᵀ — порядок множителей переворачивается. Написать AᵀBᵀ — частая ошибка на экзамене." } },
      { group: { en: "Linear algebra", ru: "Линейная алгебра" }, q: { en: "Geometrically, what do the eigenvectors of a matrix do?", ru: "Что геометрически делают собственные векторы матрицы?" }, a: { en: "They mark the directions the matrix only stretches or squeezes by a factor λ without rotating. PCA rests on this: the principal components are eigenvectors of the covariance matrix, and the eigenvalues say how much variance each one explains.", ru: "Задают направления, которые матрица только растягивает или сжимает в λ раз, не поворачивая. На этом стоит PCA: главные компоненты — собственные векторы ковариационной матрицы, а собственные значения показывают, сколько дисперсии объясняет каждая." } },
      { group: { en: "Linear algebra", ru: "Линейная алгебра" }, q: { en: "When does a square matrix have no inverse?", ru: "Когда у квадратной матрицы нет обратной?" }, a: { en: "When its determinant is zero. That is the same statement as linearly dependent columns and as deficient rank — three ways of saying one thing.", ru: "Когда её определитель равен нулю. Это то же самое, что линейная зависимость столбцов и неполный ранг — три формулировки одного факта." } },
      { group: { en: "Calculus", ru: "Матанализ" }, q: { en: "What is a gradient and why does statistics need it?", ru: "Что такое градиент и зачем он в статистике?" }, a: { en: "The vector of partial derivatives; it points in the direction of steepest increase. Setting it to zero locates an extremum — that is how the least-squares formula is derived and how almost every model is fitted.", ru: "Вектор частных производных; указывает направление наибыстрейшего роста. Приравняв его к нулю, находят экстремум — так выводится формула МНК и так обучается почти любая модель." } },
      { group: { en: "Calculus", ru: "Матанализ" }, q: { en: "What is the derivative of f(g(x))?", ru: "Чему равна производная f(g(x))?" }, a: { en: "f′(g(x)) · g′(x) — the chain rule. Without it you cannot derive least squares or gradient descent.", ru: "f′(g(x)) · g′(x) — цепное правило. Без него не вывести ни МНК, ни градиентный спуск." } },
      { group: { en: "Calculus", ru: "Матанализ" }, q: { en: "Why does probability need integrals of a density?", ru: "Зачем в теории вероятностей интеграл от плотности?" }, a: { en: "The integral of the density over an interval is the probability of landing in it, and the integral over the whole line is one. For a continuous variable the probability of any exact value is zero — only intervals carry meaning.", ru: "Интеграл плотности по отрезку — вероятность попасть в него, а интеграл по всей оси равен единице. Для непрерывной величины вероятность конкретного значения равна нулю: смысл есть только у интервалов." } },
      { group: { en: "Probability and statistics", ru: "Вероятность и статистика" }, q: { en: "Why divide the sample variance by n−1 rather than n?", ru: "Почему выборочная дисперсия делится на n−1, а не на n?" }, a: { en: "Bessel's correction. Deviations are measured from the sample mean, which is itself fitted to the data, so dividing by n systematically understates the variance. Dividing by n−1 gives an unbiased estimate.", ru: "Поправка Бесселя. Отклонения считаются от выборочного среднего, которое само подстроено под данные, поэтому деление на n систематически занижает дисперсию. Деление на n−1 даёт несмещённую оценку." } },
      { group: { en: "Probability and statistics", ru: "Вероятность и статистика" }, q: { en: "What does the central limit theorem state?", ru: "Что утверждает центральная предельная теорема?" }, a: { en: "As the sample grows, the distribution of the sample mean approaches a normal one regardless of how the underlying variable is distributed, provided the variance is finite. Confidence intervals and z- and t-tests all come from this.", ru: "При росте выборки распределение выборочного среднего стремится к нормальному независимо от распределения исходной величины — при конечной дисперсии. Отсюда доверительные интервалы и z- и t-тесты." } },
      { group: { en: "Probability and statistics", ru: "Вероятность и статистика" }, q: { en: "What is a p-value, and what is it not?", ru: "Что такое p-значение и чем оно не является?" }, a: { en: "The probability of observing a result at least as extreme as the one you got, assuming the null hypothesis is true. It is not the probability that the null hypothesis is true, and not the probability that the result is due to chance. Examiners test that substitution particularly eagerly.", ru: "Вероятность получить наблюдаемый или более экстремальный результат при верной нулевой гипотезе. Это не вероятность того, что нулевая гипотеза верна, и не вероятность того, что результат случаен. Подмену этих смыслов проверяют особенно охотно." } },
      { group: { en: "Probability and statistics", ru: "Вероятность и статистика" }, q: { en: "What is the difference between type I and type II errors?", ru: "В чём разница между ошибками первого и второго рода?" }, a: { en: "A type I error rejects a true null — a false alarm, with probability α. A type II error fails to reject a false null — a miss, with probability β. Power equals 1 − β.", ru: "Ошибка первого рода — отвергли верную нулевую гипотезу, ложная тревога с вероятностью α. Ошибка второго рода — не отвергли ложную, пропуск с вероятностью β. Мощность равна 1 − β." } },
      { group: { en: "Probability and statistics", ru: "Вероятность и статистика" }, q: { en: "Does zero correlation mean independence?", ru: "Нулевая корреляция означает независимость?" }, a: { en: "No. Pearson's coefficient measures only linear association. For y = x² on a symmetric interval the correlation is about zero while the dependence is total. The converse does hold: independent variables are uncorrelated.", ru: "Нет. Коэффициент Пирсона измеряет только линейную связь. Для y = x² на симметричном отрезке корреляция около нуля при полной зависимости. Обратное верно: независимые величины некоррелированы." } },
    ],
    books: ["bruce", "isl", "esl", "ross", "hartman", "orland", "downey"],
    examPrep: {
      en: [
        "Redo all eight laboratory works from scratch, but on paper, without code",
        "Memorise the applicability conditions: when a t-test, when χ², when ANOVA",
        "Be able to derive least squares for one variable and explain every coefficient",
        "Drill interpretation separately: p-value, confidence interval, R²",
      ],
      ru: [
        "Прорешать все восемь лабораторных заново, но на бумаге и без кода",
        "Выучить условия применимости: когда t-тест, когда χ², когда ANOVA",
        "Уметь вывести МНК для одной переменной и объяснить каждый коэффициент",
        "Отдельно отработать интерпретацию: p-значение, доверительный интервал, R²",
      ],
    },
  },

  {
    slug: "prog",
    short: { en: "Programming", ru: "Программирование" },
    title: { en: "Programming for Data Analysis and Databases", ru: "Программирование для анализа данных и баз данных" },
    officialEn: "Programming for data analysis and databases",
    officialRu: "Программирование для анализа данных и баз данных",
    trimester: 1,
    code: "NONE",
    cycle: "ПД",
    component: "ВК",
    credits: 5,
    control: "exam",
    lecturer: "Turar Olzhas, PhD — Director, Computational & Data Science Department",
    language: { en: "English", ru: "английский" },
    hours: { total: 150, lec: 30, lab: 0, pr: 20, srop: 10, sro: 90 },
    hoursHandbook: { total: 150, lec: 30, pr: 20, isis: 30, sis: 70 },
    accent: "t-prog",
    method: {
      en: "Problem-based learning: students work in groups on an open-ended problem, with group discussion and interactive-communicative learning.",
      ru: "Problem-based learning: работа в группах над открытой задачей, групповая дискуссия, интерактивно-коммуникативное обучение.",
    },
    prerequisites: { en: "Probability and statistics (BSc level)", ru: "Теория вероятностей и статистика (бакалавриат)" },
    postrequisites: { en: "Business Analytics", ru: "Бизнес-аналитика" },
    about: {
      en: "The syllabus declares four blocks: an introduction to programming languages for data analysis and databases; data types and structures in Python and R; data cleaning and preprocessing; visualisation and reporting. The learning outcomes add designing and optimising database schemas in SQL, exploratory analysis, and a critical reading of applied machine learning.",
      ru: "Силлабус заявляет четыре блока: введение в языки программирования для анализа данных и баз данных; типы и структуры данных в Python и R; очистка и предобработка данных; визуализация и отчётность. К результатам обучения добавляются проектирование и оптимизация схем БД на SQL, разведочный анализ и критический разбор прикладного машинного обучения.",
    },
    assessment: [
      { period: P, kind: { en: "Mid-term project", ru: "Промежуточный проект" }, points: 100, form: { en: "Written project submission", ru: "Сдача письменного проекта" }, when: { en: "week 5", ru: "неделя 5" }, hot: true },
      { period: P2, kind: { en: "End-term project", ru: "Итоговый проект" }, points: 60, form: { en: "Written project submission", ru: "Сдача письменного проекта" }, when: { en: "weeks 8–9", ru: "недели 8–9" }, hot: true },
      { period: P2, kind: { en: "End-term quiz", ru: "Итоговый тест" }, points: 40, form: { en: "Written", ru: "Письменно" }, when: { en: "week 10", ru: "неделя 10" }, hot: true },
      { period: PE, kind: { en: "Final exam", ru: "Финальный экзамен" }, points: 100, form: { en: "Written", ru: "Письменно" }, when: { en: "16–28 Nov", ru: "16–28 ноя" }, hot: true },
    ],
    formula: FORMULA,
    lever: {
      en: "Both attestations are projects, not tests: the full 100 points of the first hang on a single submission in week 5. Start a repository on day one and take every topic to a working notebook, or there will be nothing to submit. At the same time the final exam is written, so SQL and theory have to hold up on paper, not just in a search box.",
      ru: "Обе аттестации — проекты, а не тесты: все 100 баллов первой висят на одной сдаче на пятой неделе. Заводи репозиторий с первого дня и доводи каждую тему до работающего ноутбука — иначе к пятой неделе нечего сдавать. При этом финальный экзамен письменный: SQL и теорию надо знать на бумаге, а не в поисковой строке.",
    },
    prep: [
      {
        title: { en: "Python", ru: "Python" },
        why: {
          en: "The course starts straight into data analysis and does not spend weeks on language basics. Bring the syntax with you.",
          ru: "Курс стартует сразу с анализа данных и не тратит недели на основы языка. Базовый синтаксис нужно принести с собой.",
        },
        items: {
          en: ["Types, lists, dicts, sets, tuples", "Mutability and reference semantics", "Slicing and comprehensions", "Functions, arguments, scope", "Reading files and handling exceptions", "Modules, virtual environments, pip"],
          ru: ["Типы, списки, словари, множества, кортежи", "Изменяемость и ссылочная семантика", "Срезы и comprehensions", "Функции, аргументы, области видимости", "Чтение файлов и обработка исключений", "Модули, виртуальные окружения, pip"],
        },
        reading: [
          { book: "mckinney", chapters: [2, 3] },
          { book: "vanderplas", chapters: [1] },
        ],
      },
      {
        title: { en: "Tooling", ru: "Инструменты" },
        why: {
          en: "Projects are submitted as artefacts. Anyone fighting git in week five is losing points for something other than knowledge.",
          ru: "Проекты сдаются как артефакты. Тот, кто на пятой неделе воюет с git, теряет баллы не за знания.",
        },
        items: {
          en: ["The command line: paths, navigation, running scripts", "git: commit, branch, push, resolving conflicts", "Jupyter: cells, execution order, restarting the kernel", "Markdown for READMEs and reports"],
          ru: ["Командная строка: пути, перемещение, запуск скриптов", "git: commit, branch, push, разрешение конфликтов", "Jupyter: ячейки, порядок выполнения, перезапуск ядра", "Markdown для README и отчётов"],
        },
      },
      {
        title: { en: "Statistics", ru: "Статистика" },
        why: {
          en: "The official prerequisite is probability and statistics. The exploratory analysis in week 10 stands on it.",
          ru: "Официальный пререквизит — теория вероятностей и статистика. Разведочный анализ на десятой неделе держится на ней.",
        },
        items: {
          en: ["Mean, median, quartiles, outliers", "Variance and standard deviation", "Correlation and its limits", "How to read a histogram and a boxplot"],
          ru: ["Среднее, медиана, квартили, выбросы", "Дисперсия и стандартное отклонение", "Корреляция и её ограничения", "Как читать гистограмму и боксплот"],
        },
        reading: [{ book: "bruce", chapters: [1] }],
      },
    ],
    qa: [
      { group: { en: "Python", ru: "Python" }, q: { en: "How does a list differ from a tuple?", ru: "Чем список отличается от кортежа?" }, a: { en: "A list is mutable, a tuple is not. That makes a tuple hashable, so it can be a dict key or a set member; a list cannot.", ru: "Список изменяемый, кортеж — нет. Поэтому кортеж хешируем и может быть ключом словаря или элементом множества, а список — нет." } },
      { group: { en: "Python", ru: "Python" }, q: { en: "What does a = [1, 2]; b = a; b.append(3); print(a) print?", ru: "Что напечатает a = [1, 2]; b = a; b.append(3); print(a)?" }, a: { en: "[1, 2, 3]. Assignment copies a reference, not the object: a and b are the same list. For a copy use a.copy(), list(a) or the slice a[:].", ru: "[1, 2, 3]. Присваивание копирует ссылку, а не объект: a и b — один список. Для копии нужно a.copy(), list(a) или срез a[:]." } },
      { group: { en: "Python", ru: "Python" }, q: { en: "What is a list comprehension and why is it better than a loop?", ru: "Что такое list comprehension и чем он лучше цикла?" }, a: { en: "The form [f(x) for x in xs if cond(x)]. Shorter, faster than a loop with append and — most usefully — an expression, so it can be passed to a function or nested.", ru: "Запись [f(x) for x in xs if cond(x)]. Короче, быстрее цикла с append и, главное, является выражением: его можно передать в функцию или вложить." } },
      { group: { en: "Python", ru: "Python" }, q: { en: "How does is differ from ==?", ru: "Чем is отличается от ==?" }, a: { en: "is compares object identity in memory, == compares values. Use is None for None; for almost everything else use ==.", ru: "is сравнивает идентичность объектов в памяти, == сравнивает значения. С None используют is None, для остального почти всегда ==." } },
      { group: { en: "pandas and NumPy", ru: "pandas и NumPy" }, q: { en: "What is the difference between .loc and .iloc?", ru: "В чём разница между .loc и .iloc?" }, a: { en: ".loc addresses by index and column labels, .iloc by integer positions. df.loc[0] and df.iloc[0] coincide only when the index happens to be 0, 1, 2 in order.", ru: ".loc обращается по меткам индекса и столбцов, .iloc — по целочисленным позициям. df.loc[0] и df.iloc[0] совпадут только если индекс — это 0, 1, 2 подряд." } },
      { group: { en: "pandas and NumPy", ru: "pandas и NumPy" }, q: { en: "What is broadcasting in NumPy?", ru: "Что такое broadcasting в NumPy?" }, a: { en: "The rule by which arrays of different shapes are reconciled in element-wise operations: missing dimensions are added and dimensions of length 1 are stretched. A 1000×3 array can be divided by an array of 3 numbers with no loop and no copying.", ru: "Правило, по которому массивы разной формы согласуются в поэлементных операциях: недостающие размерности достраиваются, размерности длины 1 растягиваются. Массив 1000×3 делится на массив из 3 чисел без цикла и без копирования." } },
      { group: { en: "pandas and NumPy", ru: "pandas и NumPy" }, q: { en: "How do you get the average price per category?", ru: "Как получить среднюю цену по каждой категории?" }, a: { en: 'df.groupby("category")["price"].mean(). This is split-apply-combine: split by key, apply a function, put the pieces back together.', ru: 'df.groupby("category")["price"].mean(). Это split-apply-combine: разбить по ключу, применить функцию, собрать обратно.' } },
      { group: { en: "pandas and NumPy", ru: "pandas и NumPy" }, q: { en: "How does merge differ from concat?", ru: "Чем merge отличается от concat?" }, a: { en: "merge joins tables on a key, like SQL JOIN. concat simply glues them along an axis — top to bottom or side by side — without matching rows by value.", ru: "merge соединяет таблицы по ключу, как JOIN в SQL. concat просто склеивает их вдоль оси — сверху вниз или слева направо, — не сопоставляя строки по значению." } },
      { group: { en: "SQL", ru: "SQL" }, q: { en: "What is the difference between INNER JOIN and LEFT JOIN?", ru: "В чём разница между INNER JOIN и LEFT JOIN?" }, a: { en: "INNER JOIN keeps only rows matched in both tables. LEFT JOIN keeps every row of the left table and fills missing right-hand fields with NULL. If a LEFT JOIN increases the row count, the right side has several matches per left row.", ru: "INNER JOIN оставляет только строки, совпавшие в обеих таблицах. LEFT JOIN сохраняет все строки левой, а недостающие поля правой заполняет NULL. Если после LEFT JOIN строк стало больше — справа несколько совпадений на одну левую строку." } },
      { group: { en: "SQL", ru: "SQL" }, q: { en: "How does WHERE differ from HAVING?", ru: "Чем WHERE отличается от HAVING?" }, a: { en: "WHERE filters individual rows before grouping; HAVING filters the formed groups after aggregation. A condition on COUNT or SUM can only go in HAVING.", ru: "WHERE фильтрует строки до группировки, HAVING — сформированные группы после агрегации. Условие на COUNT или SUM можно поставить только в HAVING." } },
      { group: { en: "SQL", ru: "SQL" }, q: { en: "What are a primary key and a foreign key?", ru: "Что такое первичный и внешний ключ?" }, a: { en: "A primary key uniquely identifies a row in its own table and cannot be NULL. A foreign key is a column referencing another table's primary key, which is what enforces referential integrity.", ru: "Первичный ключ уникально идентифицирует строку своей таблицы и не может быть NULL. Внешний ключ ссылается на первичный ключ другой таблицы и обеспечивает ссылочную целостность." } },
      { group: { en: "SQL", ru: "SQL" }, q: { en: "How does COUNT(*) differ from COUNT(column)?", ru: "Чем COUNT(*) отличается от COUNT(column)?" }, a: { en: "COUNT(*) counts every row in the group. COUNT(column) counts only rows where the column is not NULL. The difference between the two is a quick way to count missing values.", ru: "COUNT(*) считает все строки группы. COUNT(column) — только те, где значение не NULL. Разница между ними — быстрый способ узнать число пропусков." } },
    ],
    books: ["mckinney", "vanderplas", "widom", "wickham", "isl"],
    examPrep: {
      en: [
        "SQL by hand: JOIN, GROUP BY, HAVING, subqueries with no editor hints",
        "Normal forms 1NF–3NF with an example of violating each",
        "The differences between Python data structures and when each is right",
        "The stages of data cleaning and the standard method for each",
      ],
      ru: [
        "SQL от руки: JOIN, GROUP BY, HAVING, подзапросы без подсказок редактора",
        "Нормальные формы 1NF–3NF с примером нарушения каждой",
        "Разница между структурами данных Python и когда какая нужна",
        "Этапы очистки данных и типовой метод для каждого",
      ],
    },
  },
];

export const bySlug = (slug: string) => COURSES.find((c) => c.slug === slug);
export const inTrimester = (n: number) => COURSES.filter((c) => c.trimester === n);
