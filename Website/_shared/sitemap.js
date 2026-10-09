/*
  КАРТА САЙТА — единственное место, где записано, что есть на сайте.
  Главная, страницы курсов, меню и кнопки «назад / дальше» берут всё отсюда.

  Добавил страницу  → допиши её в pages нужного курса.
  dir       — папка курса внутри Website/ (здесь лежат страницы сайта, пути href — от неё).
  materials — исходная папка курса в Aitu/ (pdf, pptx, ноутбуки; пути files, src, syllabus — от неё).
  syllabus  — файл в Aitu/Syllabi/ (силлабусы только локально: не в git и не онлайн).
  Задания — это напоминания о сроках. Сдано или нет, сайт не отслеживает.
  Срок: если в Moodle есть точная дата — due: 'YYYY-MM-DD', time: 'HH:MM', moodle: true.
        Без due срок считается по силлабусу: суббота недели w (ориентировочно).
*/
window.SITE = {
  term: {
    name: 'Осенний триместр 2026',
    week1: '2026-09-07',            // понедельник первой недели
    weeks: 10,
    events: [
      { from: '2026-10-05', to: '2026-10-10', title: 'Рубежный контроль 1 (midterm)' },
      { from: '2026-10-25', to: '2026-10-25', title: 'День Республики — выходной' },
      { from: '2026-11-09', to: '2026-11-14', title: 'Рубежный контроль 2 (endterm)' },
      { from: '2026-11-16', to: '2026-11-28', title: 'Экзаменационная сессия' },
      { from: '2026-11-30', to: '2026-12-05', title: 'Каникулы' }
    ]
  },

  courses: [
    /* ───────────────────────── МАТЕМАТИКА ───────────────────────── */
    {
      id: 'math',
      moodle: 'Mathematics for data science',            // как курс называется в календаре Moodle
      dir: 'Mathematics for Data Science/',          // страницы сайта (внутри Website/)
      materials: '../Math/',                     // исходные файлы курса (папка в Aitu/)
      title: 'Mathematics for Data Science',
      short: 'Математика',
      code: 'MDS 5 · 5 ECTS',
      color: '#2f5ea8',
      teacher: 'Dinara Akhmed-Zaki, PhD · akhmed-zaki.Dinara@astanait.edu.kz · C1.1.332',
      syllabus: 'Mathematics for Data Science.pdf',
      formula: 'Итог = 0,3 × Аттестация 1 + 0,3 × Аттестация 2 + 0,4 × Финал',
      rules: [
        'Меньше 25% за аттестацию 1 или 2 — курс не сдан автоматически.',
        'Посещаемость не менее 70%, иначе не допускают к экзамену.',
        'Финальный проект: отчёт и слайды загрузить в Moodle за 2–3 дня до экзамена.'
      ],
      weeks: [
        { w: 1, topic: 'Введение. Обзор статистических программ', files: ['week1/Lecture 1 Math for Data Science, ADA-M .pptx', 'week1/Practice 1 ADA-M.pdf'] },
        { w: 2, topic: 'F-критерий Фишера. Меры центральной тенденции и разброса', files: ['week2/Lecture 2_Math_Data_Science.pptx', 'week2/Lecture_additional.pptx'] },
        { w: 3, topic: 'Анализ номинальных данных. Хи-квадрат Пирсона, точный тест Фишера', files: ['week3/Lecture 3 ADA_M.pptx', 'week3/Practice 3 ADA_M.pdf'] },
        { w: 4, topic: 'Дисперсионный анализ. One-way ANOVA, множественные сравнения', files: ['week4/Lecture 4 ADA_M.pptx', 'week4/Practice 4.pdf'] },
        { w: 5, topic: 'Корреляционный анализ' },
        { w: 6, topic: 'Регрессионный анализ. Линейная регрессия с одним предиктором' },
        { w: 7, topic: 'Непараметрические методы' },
        { w: 8, topic: 'Ряды Фурье' },
        { w: 9, topic: 'Преобразование Лапласа' },
        { w: 10, topic: 'Уравнение теплопроводности' }
      ],
      pages: [
        { w: 1, href: 'week1/formulas.html', title: 'Формулы', bi: true },
        { w: 1, href: 'week1/lecture.html', title: 'Лекция', bi: true },
        { w: 1, href: 'practice/p1-1-example.html', title: 'Практика 1 · 1/4 Алгоритм и пример' },
        { w: 1, href: 'practice/p1-2-one-sample.html', title: 'Практика 1 · 2/4 Одна выборка' },
        { w: 1, href: 'practice/p1-3-independent.html', title: 'Практика 1 · 3/4 Независимые' },
        { w: 1, href: 'practice/p1-4-paired.html', title: 'Практика 1 · 4/4 Зависимые' },
        { w: 2, href: 'week2/formulas.html', title: 'Формулы', bi: true },
        { w: 2, href: 'week2/lecture.html', title: 'Лекция', bi: true },
        { w: 2, href: 'practice/a1-1-paired.html', title: 'Assignment 1 · 1/3 Зависимые' },
        { w: 2, href: 'practice/a1-2-independent.html', title: 'Assignment 1 · 2/3 Независимые' },
        { w: 2, href: 'practice/a1-3-fisher.html', title: 'Assignment 1 · 3/3 F Фишера' },
        { w: 3, href: 'week3/formulas.html', title: 'Формулы', bi: true },
        { w: 3, href: 'week3/lecture.html', title: 'Лекция', bi: true },
        { w: 3, href: 'practice/p3-1-chi.html', title: 'Практика 3 · 1/4 χ²: задачи 1–3' },
        { w: 3, href: 'practice/p3-2-chi.html', title: 'Практика 3 · 2/4 χ²: задачи 4–7' },
        { w: 3, href: 'practice/p3-3-chi.html', title: 'Практика 3 · 3/4 χ²: задачи 8, 16, 17' },
        { w: 3, href: 'practice/p3-4-chi.html', title: 'Практика 3 · 4/4 χ²: задачи 18–20' },
        { w: 4, href: 'practice/p4-1-anova.html', title: 'Практика 4 · 1/3 ANOVA: алгоритм' },
        { w: 4, href: 'practice/p4-2-anova.html', title: 'Практика 4 · 2/3 ANOVA: реклама' },
        { w: 4, href: 'practice/p4-3-anova.html', title: 'Практика 4 · 3/3 ANOVA: препараты' },
        { w: 4, href: 'practice/a2-1-anova.html', title: 'Assignment 2 · ANOVA' },
        { w: 0, href: 'practice/exam.html', title: 'Подготовка к экзамену' },
        { w: 0, href: 'reference/calculators.html', title: 'Калькуляторы', bi: true },
        { w: 0, href: 'reference/tables.html', title: 'Таблицы', bi: true }
      ],
      tasks: [
        { w: 2, title: 'Assignment 1', pts: '30', files: ['assignmnet1/Assignment_1_Math_Data_Science (1).pdf', 'assignmnet1/assignment1 math Yermekov Dias.pdf'] },
        { w: 4, title: 'Assignment 2', pts: '30' },
        { w: 5, title: 'Midterm Exam', pts: '40', exam: true },
        { w: 7, title: 'Assignment 3', pts: '30' },
        { w: 9, title: 'Assignment 4', pts: '30' },
        { w: 10, title: 'Endterm Exam', pts: '40', exam: true },
        { w: 11, title: 'Final Exam', pts: '100', exam: true }
      ]
    },

    /* ─────────────────────── ПРОГРАММИРОВАНИЕ ─────────────────────── */
    {
      id: 'prog',
      moodle: 'Programming for data analysis and databases',            // как курс называется в календаре Moodle
      dir: 'Programming for Data Analysis and Database/',
      materials: '../Programing for data analysis/',
      title: 'Programming for Data Analysis and Database',
      short: 'Программирование',
      code: '5 ECTS',
      color: '#2c7a57',
      teacher: 'Svitlana Biloshchytska, Dr. Tech. Sci. · bsv@astanait.edu.kz · C1.2.152',
      syllabus: 'Programming for Data Analysis and Database.docx',
      formula: 'Итог = 0,3 × MidTerm + 0,3 × EndTerm + 0,4 × Финальный проект',
      rules: [
        'MidTerm = 0,3·A1 + 0,3·A2 + 0,1·(Quiz 1 + Quiz 2 + Quiz 3 + Quiz 4).',
        'EndTerm = 0,3·A3 + 0,3·A4 + 0,1·(Quiz 5 + Quiz 6 + Quiz 7 + Quiz 8).',
        'Меньше 40% за аттестацию 1 или 2 — не выполнены минимальные требования.',
        'Финальный проект: отчёт и слайды загрузить в Moodle за 2–3 дня до экзамена.'
      ],
      note: 'В силлабусе расходятся недели: в подробном плане A1 стоит на 2-й неделе, A3 — на 6-й; в таблице оценок — на 3-й и 8-й. Здесь взята таблица оценок.',
      weeks: [
        { w: 1, topic: 'Инструменты Data Science и основы Python: Jupyter, Colab, Git, структуры данных' },
        { w: 2, topic: 'Файлы и папки: pathlib, os, CSV, JSON, архивы' },
        { w: 3, topic: 'NumPy: массивы, векторные операции, вычисления' },
        { w: 4, topic: 'Pandas: загрузка, обработка и анализ таблиц' },
        { w: 5, topic: 'Визуализация: Matplotlib, Seaborn, Plotly' },
        { w: 6, topic: 'Обработка текста: NLTK и spaCy' },
        { w: 7, topic: 'Представление текста: Bag-of-Words, TF-IDF, эмбеддинги' },
        { w: 8, topic: 'Реляционные базы и SQL: SQLite / PostgreSQL из Python' },
        { w: 9, topic: 'Продвинутый SQL: JOIN, агрегаты, подзапросы, оконные функции' },
        { w: 10, topic: 'Неделя проекта: Python + Pandas + визуализация + NLP + SQL' }
      ],
      pages: [
        { w: 1, href: 'week1/1-1-intro.html', title: '1.1 Введение в Python', src: 'week1/Lecture_1_2025.ipynb' },
        { w: 1, href: 'week1/1-2-numbers.html', title: '1.2 Числовые данные', src: 'week1/Lecture_1_2_Числовые_данные.ipynb' },
        { w: 1, href: 'week1/1-3-sets-dicts.html', title: '1.3 Множества и словари', src: 'week1/Lecture_1_3_Множества и словари.ipynb' },
        { w: 1, href: 'week1/practice.html', title: 'Практика', src: 'week1/practice.ipynb' },
        { w: 2, href: 'week2/2-1-directories.html', title: '2.1 Папки и файлы', src: 'week2/Lecture_2_1_Directories and Files.ipynb' },
        { w: 2, href: 'week2/2-3-csv.html', title: '2.3 CSV', src: 'week2/Lecture_2_3_Working with CSV Files.ipynb' },
        { w: 2, href: 'week2/2-4-json.html', title: '2.4 JSON', src: 'week2/Lecture_2_4_Working with JSON Files.ipynb' },
        { w: 2, href: 'week2/2-5-excel.html', title: '2.5 Excel', src: 'week2/Lecture_2_5_Working with Excel .ipynb' },
        { w: 2, href: 'week2/2-6-pandas-excel.html', title: '2.6 Pandas и Excel', src: 'week2/Lecture_2_6_Pandas and Excel .ipynb' },
        { w: 2, href: 'week2/2-7-archiving.html', title: '2.7 Архивы', src: 'week2/Lecture_2_7_Archiving Project Files.ipynb' },
        { w: 3, href: 'week3/3-1-numpy.html', title: '3.1 NumPy: основы', src: 'Week3/Lecture_3_1_NumPy Library.ipynb' },
        { w: 3, href: 'week3/3-2-numpy-images.html', title: '3.2 NumPy и картинки', src: 'Week3/Lecture_3_2_NumPy Arrays for Image Processing.ipynb' },
        { w: 3, href: 'week3/3-3-numpy-example.html', title: '3.3 NumPy: разбор примера', src: 'Week3/Lecture_3_3_Numpy_Example_2026.ipynb' }
      ],
      tasks: [
        { w: 3, title: 'Assignment 1 — файлы, CSV, JSON', pts: '30', due: '2026-09-25', time: '18:00', moodle: true, files: ['ass1/Assignment_1_Rus.pdf', 'ass1/assignment1.ipynb'] },
        { w: 4, title: 'Assignment 2 — NumPy и Pandas', pts: '30', due: '2026-10-04', time: '24:00', moodle: true, dueNote: 'потом защита', files: ['assignment2/Assignment 2 NumPy and Pandas.pdf', 'assignment2/assignment2.ipynb'] },
        { w: 5, title: 'Quiz 1–4', pts: '40', exam: true },
        { w: 8, title: 'Assignment 3', pts: '30' },
        { w: 10, title: 'Assignment 4 — SQL', pts: '30' },
        { w: 10, title: 'Quiz 5–8', pts: '40', exam: true },
        { w: 11, title: 'Финальный проект + защита', pts: '100', exam: true }
      ]
    },

    /* ──────────────────────────── ENGLISH ──────────────────────────── */
    {
      id: 'eng',
      moodle: 'Foreign language (professional) (C1)',            // как курс называется в календаре Moodle
      dir: 'Foreign Language (Professional) C1/',
      materials: '../Prof english/',
      title: 'Foreign Language (Professional) C1',
      short: 'English C1',
      code: 'FLP · 4 ECTS',
      color: '#7b4ba6',
      teacher: 'Кафедра: E. Gerfanova, A. Ayazbayeva, M. Abzhaparova, A. Ormanova, S. Zhalmagambetova · C1.1.267–268',
      syllabus: 'Foreign Language (Professional) C1.pdf',
      formula: 'Итог = (0,10·P + 0,05·WA + 0,15·MT) + (0,10·CS + 0,05·WA + 0,15·ET) + 0,40·Final',
      rules: [
        'Опоздание со сдачей: −5% за каждый день; позже 3 дней не принимают.',
        'Меньше 25% за midterm или endterm — курс не сдан автоматически.',
        'Меньше 50 баллов по аттестациям — нет допуска к финалу.',
        'Каждую неделю — SIS в Word, сдать до воскресенья.'
      ],
      recurring: 'SIS (Word) — каждое воскресенье',
      weeks: [
        { w: 1, topic: 'SDGs и компетенции будущих специалистов. Grammar: пассив', files: ['week1/Week 1_Practice 4_Vocabulary for students.pdf', 'week1/Week 1_Vocabulary.docx'] },
        { w: 2, topic: 'SDGs: мозговой штурм решений, прототипы. Grammar: косвенная речь', files: ['week2/Week 2 Practice 1-2_for students (1).pptx'] },
        { w: 3, topic: 'Assignment 1: презентация прототипа. Grammar: conditionals 1–2', files: ['assignment1/sdg7-slides.html', 'assignment1/SDG 7 — Smart Renewable Microgrid Canvas.pdf', 'assignment1/Assignment_1_Assessment_Rubric.docx'] },
        { w: 4, topic: 'Влияние ИИ на экономику и общество. Policy brief. Grammar: mixed conditionals', files: ['policy brief/Week 4 Practice 1-2_final for students.pptx', 'policy brief/OECD (2024) How is AI changing the way workers perform their jobs.pdf'] },
        { w: 5, topic: 'Повторение. Midterm: policy brief' },
        { w: 6, topic: 'Дезинформация в науке и технологиях. Grammar: герундий' },
        { w: 7, topic: 'Assignment 2: кейс «Exposing misinformation». Grammar: причастия' },
        { w: 8, topic: 'Переговоры: стратегии, тактики, ценности. Linking words, relative clauses' },
        { w: 9, topic: 'Endterm: переговорные сценарии. ИИ в командной работе. Модальные глаголы' },
        { w: 10, topic: 'Повторение. Финальный тест' }
      ],
      pages: [],
      extras: [
        { href: 'essay-assistant/index.html', title: 'Помощник для эссе' },
        { href: 'essay-assistant/sdg-competences-summary.html', title: 'Статья о компетенциях SDG — конспект' },
        { href: 'policy brief/class-answers.html', title: 'Policy brief — ответы к практике (неделя 4)' },
        { href: 'policy brief/brief-kit.html', title: 'Midterm: policy brief по Data Analytics — набор' },
        { href: 'policy brief/policy-brief.html', title: 'Midterm: сам policy brief (текст, 4 стр.)' },
        { href: 'policy brief/plan-na-troih.html', title: 'Midterm: план на троих + источники' },
        { href: 'policy brief/chast-a-frazy.html', title: 'Midterm: часть A — как начинать предложения' },
        { href: 'policy brief/chast-b-frazy.html', title: 'Midterm: часть B — как начинать предложения' },
        { href: 'policy brief/chast-c-frazy.html', title: 'Midterm: часть C — как начинать предложения' },
        { href: 'policy brief/defence.html', title: 'Midterm: защита policy brief' }
      ],
      tasks: [
        { w: 2, title: 'Writing: reflective response (communication skills & SDGs)', pts: '5%*' },
        { w: 3, title: 'Assignment 1 — презентация прототипа (SDG 7)', pts: '10%', due: '2026-09-23', time: '24:00', moodle: true },
        { w: 4, title: 'Writing: opinion essay — ИИ и общество', pts: '5%*' },
        { w: 5, title: 'Midterm — policy brief (в паре)', pts: '15%', exam: true },
        { w: 6, title: 'Writing: анализ дезинформации', pts: '5%*' },
        { w: 7, title: 'Assignment 2 — кейс «Exposing misinformation»', pts: '10%' },
        { w: 8, title: 'Writing: переговорные стратегии', pts: '5%*' },
        { w: 9, title: 'Endterm — negotiation scenarios', pts: '15%', exam: true },
        { w: 10, title: 'Final quiz (бумажный тест)', pts: '40%', exam: true }
      ],
      taskNote: '* 5% — на все writing одной аттестации вместе.'
    },

    /* ─────────────────────────── ПЕДАГОГИКА ─────────────────────────── */
    {
      id: 'ped',
      moodle: 'Higher Education Pedagogy',            // как курс называется в календаре Moodle
      dir: 'Pedagogy of Higher Education/',
      materials: '../pedagogy/',
      title: 'Pedagogy of Higher Education',
      short: 'Педагогика',
      code: '4 ECTS',
      color: '#a8651c',
      teacher: 'N. Ayubayeva · Zh. Tleshova · P. Shon — C1.1.263 / C1.1.267',
      syllabus: 'Pedagogy of Higher Education.pdf',
      formula: 'Итог = (0,33·RN + 0,33·IE + 0,34·CP) + (0,33·RN + 0,33·GE + 0,34·EP) + 0,4·Final',
      rules: [
        'Опоздавшие работы не принимаются вообще.',
        'Больше 3 пропусков без уважительной причины — курс не сдан.',
        '3 опоздания до 15 минут = 1 пропуск.',
        'Reflective note: до 200 слов, Word, Times New Roman 12, интервал 1,5. В Moodle срок — воскресенье 23:59 (в силлабусе — суббота 23:55).',
        'Меньше 25% за midterm или endterm — нет допуска к экзамену.'
      ],
      recurring: 'Reflective note — каждое воскресенье до 23:59 (по Moodle)',
      weeks: [
        { w: 1, topic: 'Введение в курс и в педагогику высшей школы', files: ['week1/photo_2026-09-15_19-16-45.jpg', 'week1/photo_2026-09-15_19-37-18.jpg', 'week1/practice-09-15_19-16-45.jpg'] },
        { w: 2, topic: 'Модуль 1: смена парадигм, философские основы, история высшего образования' },
        { w: 3, topic: 'Модуль 2: теории обучения и constructive alignment' },
        { w: 4, topic: 'Принципы педагогики и компетентностный подход' },
        { w: 5, topic: 'Модуль 3: этика в преподавании и исследованиях' },
        { w: 6, topic: 'Методы обучения, активности и дизайн оценивания' },
        { w: 7, topic: 'Модуль 4: активная и студентоцентрированная среда' },
        { w: 8, topic: 'Междисциплинарная, инклюзивная и адаптивная педагогика' },
        { w: 9, topic: 'Технологии и инновации в высшем образовании' },
        { w: 10, topic: 'Переосмысление высшего образования в Казахстане' }
      ],
      pages: [],
      tasks: [
        { w: 4, title: 'Individual Critical Analysis Essay — 500 слов, 3+ источника', pts: '10', due: '2026-10-04', time: '23:59', moodle: true },
        { w: 5, title: 'Creative Group Poster', pts: '10' },
        { w: 7, title: 'Group Critical Analysis Essay — 2000 слов', pts: '10', due: '2026-10-25', time: '23:59', moodle: true },
        { w: 10, title: 'Презентация эссе + peer feedback', pts: '10', due: '2026-11-13', time: '23:59', moodle: true },
        { w: 11, title: 'Финал: академический постер', pts: '40', exam: true }
      ],
      taskNote: 'Ещё по 10 баллов в каждой аттестации — посещение и еженедельные reflective notes.'
    }
  ],

  orientation: {
    dir: '../Orientation/',
    links: [
      { href: 'ada-site/dist/ru.html', title: 'Сайт-ориентир по программе ADA' },
      { href: 'ADA-навигатор.html', title: 'ADA-навигатор' },
      { href: 'ADA-разгон-1триместр.html', title: 'Разгон к 1 триместру' },
      { href: 'Академ календарь 2026-2027_1 курс_ADA_МАГ.pdf', title: 'Академический календарь' },
      { href: 'УП ADA.pdf', title: 'Учебный план' },
      { href: 'ADA_MS_Module Handbook_2025.pdf', title: 'Module Handbook' }
    ]
  }
};
