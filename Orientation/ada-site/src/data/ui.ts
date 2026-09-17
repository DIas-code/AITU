import type { L10n } from "./types";

/** Строки интерфейса / interface strings. */
export const UI: Record<string, L10n> = {
  siteName: { en: "Runway", ru: "Разгон" },
  siteSub: { en: "Trimester 1 · ADA · AITU", ru: "1 триместр · ADA · AITU" },

  navHome: { en: "Overview", ru: "Обзор" },
  navPlan: { en: "11-week plan", ru: "План 11 недель" },
  navKit: { en: "Toolkit", ru: "Инструменты" },
  navBooks: { en: "Reading", ru: "Литература" },
  navLessons: { en: "Lessons", ru: "Уроки" },

  lessonsCrumb: { en: "20 lessons · 2 courses · 10 weeks", ru: "20 уроков · 2 дисциплины · 10 недель" },
  lessonsTitle: { en: "The lessons", ru: "Уроки" },
  lessonsLede: {
    en: "A full lesson for every week of both courses: theory with worked formulas, runnable code, a solved example, exercises with answers, and a checklist. Open any of them and read it like a class.",
    ru: "Полный урок на каждую неделю обеих дисциплин: теория с разобранными формулами, рабочий код, решённый пример, задачи с ответами и чек-лист. Открывай любой и читай как занятие.",
  },
  openLesson: { en: "Open the lesson", ru: "Открыть урок" },
  lessonNotYet: { en: "lesson not written yet", ru: "урок ещё не написан" },
  minTheory: { en: "min of theory", ru: "мин теории" },
  exercisesWord: { en: "exercises", ru: "задач" },
  sectionsWord: { en: "sections", ru: "разделов" },

  today: { en: "today", ru: "сегодня" },
  untilFirstClass: { en: "until the first class", ru: "до первой пары" },
  firstClassToday: { en: "first class is today", ru: "сегодня первая пара" },
  classesRunning: { en: "classes are running", ru: "занятия идут" },
  switchTheme: { en: "Switch theme", ru: "Сменить тему" },

  sideNote: {
    en: "Official figures come from the AITU module handbook and academic calendar. The preparation plan and the week-by-week topic map are a reconstruction, not a university document.",
    ru: "Официальные данные — из хендбука модулей и академического календаря AITU. План подготовки и понедельная разбивка тем — реконструкция, а не документ университета.",
  },
  footer: {
    en: "Built from three Astana IT University documents: curriculum 7M06103, the module handbook and the 2026–2027 academic calendar. Credits, hours, points and dates are taken from them verbatim. The week-by-week topic map, the warm-up plan and the material picks are a reconstruction: check them against your lecturers' syllabi in week one.",
    ru: "Собрано из трёх документов Astana IT University: учебного плана 7M06103, хендбука модулей и академического календаря 2026–2027. Кредиты, часы, баллы и даты взяты из них дословно. Разбивка тем по неделям, план разминки и подборка материалов — реконструкция: на первой неделе сверьтесь с силлабусами преподавателей.",
  },

  /* --- главная --- */
  homeCrumb: { en: "Astana IT University · Applied Data Analytics · MSc", ru: "Astana IT University · Applied Data Analytics · магистратура" },
  homeTitle: { en: "Runway into trimester one", ru: "Разгон в первый триместр" },
  homeLede: {
    en: "A preparation plan for the two core courses of the first trimester. It counts from today, runs over eleven weeks and is pinned to the real control points in the academic calendar. Every topic is tied to a chapter in the books the syllabi actually list.",
    ru: "План подготовки к двум профильным дисциплинам первого триместра. Считает от сегодняшней даты, разложен по одиннадцати неделям и привязан к реальным контрольным точкам академического календаря. Каждая тема опирается на главу книги из списка литературы силлабуса.",
  },
  weeksOfTeaching: { en: "weeks of classes", ru: "недель обучения" },
  creditsOn: { en: "credits across", ru: "кредитов на" },
  coursesWord: { en: "courses", ru: "дисциплины" },
  hoursTotal: { en: "hours in total", ru: "часов суммарно" },
  dayUntil: { en: "days until the first class", ru: "дней до первой пары" },
  classesStarted: { en: "classes have started", ru: "занятия начались" },

  secCourses: { en: "The two courses", ru: "Две дисциплины" },
  secCoursesSub: {
    en: "Both are major-cycle, university component, and both end in an exam. Together they are 10 of the 18 credits in trimester one.",
    ru: "Обе — профилирующие, вузовский компонент, обе заканчиваются экзаменом. Вместе это 10 из 18 кредитов первого триместра.",
  },
  ectsCredits: { en: "ECTS credits", ru: "кредита ECTS" },
  hoursAll: { en: "hours total", ru: "часов всего" },
  inClass: { en: "in class", ru: "в аудитории" },
  onYourOwn: { en: "on your own", ru: "самостоятельно" },

  secHours: { en: "What that is in hours", ru: "Сколько это в часах" },
  secHoursSub: {
    en: "Numbers from the curriculum. Worth doing this arithmetic before term, not in October.",
    ru: "Цифры из учебного плана. Полезно посчитать до начала, а не в октябре.",
  },
  thCourse: { en: "Course", ru: "Дисциплина" },
  thLectures: { en: "Lectures", ru: "Лекции" },
  thPractice: { en: "Practice", ru: "Практика" },
  thTotal: { en: "Total", ru: "Всего" },
  thSelfWeek: { en: "Self-study per week", ru: "Самостоятельно в неделю" },
  together: { en: "Together", ru: "Вместе" },
  hoursCallout: {
    en: "hours a week of self-study on top of classes, for these two courses alone. Add higher education pedagogy and the language course: the whole first trimester is 18 credits and 540 hours over roughly eleven weeks — about 49 hours a week. That is a full-time job, and it is better planned in advance.",
    ru: "часов в неделю самостоятельной работы сверх пар — только на эти две дисциплины. Плюс педагогика высшей школы и иностранный язык: весь первый триместр — 18 кредитов и 540 часов примерно за одиннадцать недель, около 49 часов в неделю. Это полная занятость, и планировать её лучше заранее.",
  },

  secHow: { en: "How the plan works", ru: "Как устроен план" },
  step1t: { en: "Week 0 — warm-up, 31 August to 6 September", ru: "Неделя 0 — разминка, 31 августа — 6 сентября" },
  step1d: {
    en: "Seven days before the first class. Set up the environment, refresh linear algebra, calculus and probability, and touch pandas and SQL for the first time. Induction week and course registration run 1–5 September in parallel.",
    ru: "Семь дней до первой пары. Собрать среду, освежить линейную алгебру, матанализ и вероятность, впервые потрогать pandas и SQL. С первого по пятое сентября параллельно идёт ознакомительная неделя и регистрация на дисциплины.",
  },
  step2t: { en: "Weeks 1–10 — alongside the course", ru: "Недели 1–10 — параллельно с курсом" },
  step2d: {
    en: "Each week carries a topic per course, the chapters to read, the English terms you will hear in the lecture, and one concrete thing to close before Sunday.",
    ru: "На каждую неделю: тема по каждой дисциплине, главы для чтения, английские термины, которые прозвучат на лекции, и одно конкретное действие до воскресенья.",
  },
  step3t: { en: "Control points", ru: "Контрольные точки" },
  step3d: {
    en: "Mid-term control in week 5, 5–10 October. End-term control in week 10, 9–14 November. Exams 16–28 November. Everything else is subordinate to those three dates.",
    ru: "РК1 на пятой неделе, 5–10 октября. РК2 на десятой, 9–14 ноября. Экзамены 16–28 ноября. Всё остальное подчинено этим трём датам.",
  },

  secTruth: { en: "What is official here and what is not", ru: "Что здесь официальное, а что нет" },
  official: { en: "From university documents", ru: "Из документов университета" },
  reconstructed: { en: "My reconstruction", ru: "Моя реконструкция" },
  truthWarn: {
    en: "Get the syllabi from your lecturers in week one. The order of topics and the exact dates of assignments are set by the lecturer and may differ from this reconstruction. The control points and the point totals will not differ — those are fixed by the documents.",
    ru: "На первой неделе возьмите силлабусы у преподавателей. Порядок тем и точные даты работ задаёт преподаватель, они могут отличаться от этой реконструкции. Контрольные точки и итоговые баллы не отличатся — они закреплены документами.",
  },

  /* --- дисциплина --- */
  courseCrumb: { en: "Course · trimester", ru: "Дисциплина · триместр" },
  secPassport: { en: "Course profile", ru: "Паспорт курса" },
  fLecturer: { en: "Lecturer", ru: "Преподаватель" },
  fLanguage: { en: "Language of instruction", ru: "Язык преподавания" },
  fCode: { en: "Code in the curriculum", ru: "Код в учебном плане" },
  fCycle: { en: "Cycle and component", ru: "Цикл и компонент" },
  fControl: { en: "Final control", ru: "Форма контроля" },
  fHoursUp: { en: "Hours per curriculum", ru: "Часы по учебному плану" },
  fHoursHb: { en: "Hours per handbook", ru: "Часы по хендбуку" },
  fMethod: { en: "Teaching method", ru: "Методика" },
  fPre: { en: "Prerequisites", ru: "Пререквизиты" },
  fPost: { en: "Post-requisites", ru: "Постреквизиты" },
  lec: { en: "lec", ru: "лек" },
  pr: { en: "practice", ru: "практ" },

  secGrade: { en: "How the grade is computed", ru: "Как считается оценка" },
  thPeriod: { en: "Period", ru: "Период" },
  thKind: { en: "Assessment", ru: "Вид работы" },
  thPoints: { en: "Points", ru: "Баллы" },
  thForm: { en: "Form", ru: "Форма" },
  thWhen: { en: "When", ru: "Когда" },
  leverTitle: { en: "Where the leverage is.", ru: "Где здесь рычаг." },

  secPrep: { en: "What to shore up before term", ru: "Что подтянуть до начала" },
  prepSub: {
    en: "Official prerequisites of the course, and which chapters close each gap.",
    ru: "Официальные пререквизиты курса и главы, которыми закрывается каждый пробел.",
  },
  secQa: { en: "Test yourself", ru: "Проверь себя" },
  qaSub: {
    en: "Answer out loud, then open the answer. Anything that did not come to you within a minute is your gap list for the warm-up week.",
    ru: "Отвечайте вслух, потом раскрывайте ответ. Всё, где ответ не пришёл за минуту, — список пробелов на неделю разминки.",
  },
  secMap: { en: "Ten-week topic map", ru: "Карта тем на 10 недель" },
  mapSub: {
    en: "Reconstructed from the course content in the handbook, with the reading pinned to each week. The order may differ — check the lecturer's syllabus.",
    ru: "Реконструкция по содержанию курса из хендбука, с привязкой чтения к каждой неделе. Порядок может отличаться — сверьтесь с силлабусом.",
  },
  secReading: { en: "Reading list", ru: "Литература" },
  readingSub: {
    en: "The syllabus list, with the chapters this plan actually sends you to. Several are free in full.",
    ru: "Список из силлабуса и главы, к которым реально отправляет этот план. Часть книг бесплатна целиком.",
  },
  otherCourse: { en: "The other course", ru: "Другая дисциплина" },
  readThis: { en: "Read", ru: "Читать" },
  freeFull: { en: "free in full", ru: "бесплатно целиком" },

  /* --- план --- */
  planCrumb: { en: "31 August — 28 November 2026", ru: "31 августа — 28 ноября 2026" },
  planTitle: { en: "The eleven-week plan", ru: "План на одиннадцать недель" },
  planLede: {
    en: "A warm-up week before the first class and ten teaching weeks. Each carries a topic per course, the chapters to read, and one thing to close before Sunday.",
    ru: "Неделя разминки до первой пары и десять учебных недель. На каждой — тема по каждой дисциплине, главы для чтения и одно действие до воскресенья.",
  },
  secWarmup: { en: "Week 0 · warm-up", ru: "Неделя 0 · разминка" },
  warmupSub: {
    en: "31 August to 6 September. Induction week and course registration run 1–5 September, so weekdays here are light and the load sits on Monday and the weekend.",
    ru: "31 августа — 6 сентября. С первого по пятое сентября идёт ознакомительная неделя и регистрация, поэтому будни лёгкие, а нагрузка вынесена на понедельник и выходные.",
  },
  secWeeks: { en: "Weeks 1–10 · classes", ru: "Недели 1–10 · обучение" },
  weeksSub: {
    en: "7 September to 14 November. The topic split is a reconstruction; the control points come from the academic calendar.",
    ru: "7 сентября — 14 ноября. Разбивка тем — реконструкция; контрольные точки — из академического календаря.",
  },
  secExams: { en: "Examination session", ru: "Экзаменационная сессия" },
  examsSub: {
    en: "Two written exams, each worth 40 % of the final grade in its course.",
    ru: "Два письменных экзамена, каждый весит 40 % итоговой оценки по своей дисциплине.",
  },
  examsNote: {
    en: "After 28 November there is a break until 5 December, and the winter trimester starts on 7 December. It is the only pause in the academic year longer than a weekend.",
    ru: "После 28 ноября — каникулы до 5 декабря, а 7 декабря начинается зимний триместр. Это единственная пауза в учебном году длиннее выходных.",
  },
  dayN: { en: "Day", ru: "День" },
  outcomeOfDay: { en: "outcome", ru: "итог дня" },
  closeThis: { en: "close this", ru: "закрыть" },
  weekAbbr: { en: "wk", ru: "нед." },

  /* --- инструменты --- */
  kitCrumb: { en: "Environment, resources, method", ru: "Среда, ресурсы, метод" },
  kitTitle: { en: "Toolkit and resources", ru: "Инструменты и ресурсы" },
  kitLede: {
    en: "What to install before the first class, where to learn from, and how to work so that week five does not catch you out.",
    ru: "Что поставить до первой пары, откуда учить и как работать, чтобы не проседать к пятой неделе.",
  },
  secSetup: { en: "Environment in half an hour", ru: "Среда за полчаса" },
  setupSub: {
    en: "PowerShell commands for Windows. Set up once, works all trimester.",
    ru: "Команды для PowerShell на Windows. Ставится один раз и работает весь триместр.",
  },
  secStack: { en: "Stack", ru: "Стек" },
  stackSub: {
    en: "Python and R are named in the syllabus directly; the rest is the standard toolkit for the topics it declares.",
    ru: "Python и R названы в силлабусе прямо; остальное — стандартный инструментарий под заявленные темы.",
  },
  secRepo: { en: "Repository layout", ru: "Структура репозитория" },
  repoSub: {
    en: "Projects are submitted as artefacts. Set this up on day one — later there will be no time to reorganise.",
    ru: "Проекты сдаются как артефакты. Заведите это в первый день — потом не до реорганизации.",
  },
  secFree: { en: "Free material", ru: "Бесплатные материалы" },
  freeSub: {
    en: "All open, no subscription needed. Links open in a new tab.",
    ru: "Всё открыто и не требует подписки. Ссылки открываются в новой вкладке.",
  },
  secDatasets: { en: "Datasets to practise on", ru: "Датасеты для тренировки" },
  datasetsSub: {
    en: "Open sets that fit the course topics and make decent project material.",
    ru: "Открытые наборы под темы курса, из которых выходят приличные проекты.",
  },
  secMethod: { en: "How to study", ru: "Как учиться" },
  methodSub: {
    en: "Six rules that follow from the way these two courses are actually graded.",
    ru: "Шесть правил, которые следуют из того, как устроено оценивание этих дисциплин.",
  },

  /* --- книги --- */
  booksCrumb: { en: "Syllabus reading", ru: "Литература силлабусов" },
  booksTitle: { en: "The books this plan runs on", ru: "Книги, на которых стоит план" },
  booksLede: {
    en: "Every weekly topic in this plan points at a chapter in one of these. Nothing here is invented reading — the lists come from the module handbook, and the chapter mapping is mine.",
    ru: "Каждая недельная тема в этом плане указывает на главу одной из этих книг. Списки взяты из хендбука модулей; привязка глав к неделям — моя.",
  },
  chaptersUsed: { en: "Chapters this plan uses", ru: "Главы, которые использует план" },
  usedInWeeks: { en: "weeks", ru: "недели" },
  editionNote: {
    en: "Chapter numbers follow the edition named above. If your copy is a different edition, find the chapter by its title.",
    ru: "Номера глав — по указанному изданию. Если у тебя другое издание, ищи главу по названию.",
  },
};

/** Списки пунктов / bullet lists. */
export const LISTS: Record<string, { en: string[]; ru: string[] }> = {
  officialList: {
    en: [
      "Credits, hours, codes and control form — curriculum 7M06103",
      "Lecturers, language, assessment scheme and points — module handbook",
      "Course content, prerequisites, reading lists — module handbook",
      "All dates, weeks and control points — academic calendar 2026–2027",
    ],
    ru: [
      "Кредиты, часы, коды, форма контроля — учебный план 7M06103",
      "Преподаватели, язык, схема оценивания и баллы — хендбук модулей",
      "Содержание курсов, пререквизиты, литература — хендбук модулей",
      "Все даты, недели и контрольные точки — академический календарь 2026–2027",
    ],
  },
  reconstructedList: {
    en: [
      "The week-by-week topic split, derived from course content rather than a lecturer's plan",
      "Which chapter to read in which week",
      "The warm-up plan and the weekly to-dos",
      "Self-check questions, tooling and repository layout",
    ],
    ru: [
      "Разбивка тем по неделям — выведена из содержания курса, а не из КТП",
      "Какую главу читать на какой неделе",
      "План разминки и еженедельные задания",
      "Чек-листы самопроверки, стек инструментов и структура репозитория",
    ],
  }
};
