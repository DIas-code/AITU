import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 1,
  minutes: 60,
  title: { en: "Python for data: environment and foundations", ru: "Python для данных: среда и основы" },
  summary: {
    en: "The tools you will submit work from, and the Python semantics that cause the most silent bugs in a data notebook.",
    ru: "Инструменты, из которых ты будешь сдавать работы, и та семантика Python, что порождает больше всего тихих багов в ноутбуке.",
  },
  goals: {
    en: [
      "Run a reproducible notebook from a virtual environment and commit it",
      "Choose correctly between list, tuple, dict and set for a given job",
      "Explain reference semantics and avoid the aliasing bug it causes",
      "Write comprehensions instead of accumulate-in-a-loop",
    ],
    ru: [
      "Запускать воспроизводимый ноутбук из виртуального окружения и коммитить его",
      "Осознанно выбирать между list, tuple, dict и set под конкретную задачу",
      "Объяснять ссылочную семантику и не попадаться на баг с алиасингом",
      "Писать comprehensions вместо накопления в цикле",
    ],
  },
  sections: [
    {
      heading: { en: "The environment is part of the grade", ru: "Среда — часть оценки" },
      body: {
        en: [
          "Both attestations in this course are project submissions, not tests. That means what you hand in is an artefact someone else has to open and run. A notebook that only works on your machine, in the order you happened to execute the cells, is not a submission — it is a draft.",
          "Three habits fix nearly all of it. Work inside a project virtual environment so the dependency list is explicit and reproducible. Before you hand anything in, use Restart Kernel and Run All: if it breaks, the reader would have hit the same wall. And commit as you go, so the repository shows the work rather than a single dump at the deadline.",
        ],
        ru: [
          "Обе аттестации этого курса — сдача проектов, а не тесты. Значит, ты сдаёшь артефакт, который кто-то другой должен открыть и запустить. Ноутбук, работающий только на твоей машине и только в том порядке, в каком ты случайно выполнял ячейки, — не сдача, а черновик.",
          "Три привычки закрывают почти всё. Работай в виртуальном окружении проекта, чтобы список зависимостей был явным и воспроизводимым. Перед сдачей делай Restart Kernel и Run All: если сломалось — читатель упёрся бы в ту же стену. И коммить по ходу дела, чтобы репозиторий показывал работу, а не единственный сброс в дедлайн.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "The first cell of every notebook", ru: "Первая ячейка каждого ноутбука" },
        code: `# что это, кто автор, откуда данные, когда собрано
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

pd.set_option("display.max_columns", 50)
rng = np.random.default_rng(42)     # фиксируем случайность -> воспроизводимость

DATA = "../data/sessions.csv"       # относительный путь, не C:\\Users\\...`,
        out: {
          en: "A fixed seed and relative paths are the two cheapest things you can do for reproducibility, and both are graded implicitly.",
          ru: "Фиксированный seed и относительные пути — самое дешёвое, что можно сделать для воспроизводимости, и оба оцениваются неявно.",
        },
      },
      pitfall: {
        en: "An absolute path like C:\\Users\\Dias\\Desktop\\data.csv guarantees the notebook fails for whoever grades it. Keep data in a data/ folder beside the notebook and reference it relatively.",
        ru: "Абсолютный путь вида C:\\Users\\Dias\\Desktop\\data.csv гарантирует, что у проверяющего ноутбук не запустится. Держи данные в папке data/ рядом с ноутбуком и ссылайся относительно.",
      },
    },
    {
      heading: { en: "Four containers and when each wins", ru: "Четыре контейнера и когда какой выигрывает" },
      body: {
        en: [
          "A list is an ordered, mutable sequence — the default choice. A tuple is the same but immutable, which makes it hashable and therefore usable as a dictionary key or a set member; it also signals to the reader that the contents are fixed, such as a coordinate pair or a database row.",
          "A dict maps keys to values with average O(1) lookup. A set is a dict without values: unordered, unique, and with O(1) membership testing. The performance gap is the part that matters at data scale: checking x in some_list scans the whole list, while x in some_set is a single hash lookup. On a hundred thousand membership checks that is the difference between a coffee break and instant.",
        ],
        ru: [
          "list — упорядоченная изменяемая последовательность, выбор по умолчанию. tuple — то же самое, но неизменяемый, поэтому хешируемый и пригодный как ключ словаря или элемент множества; вдобавок он сообщает читателю, что содержимое фиксировано — например, пара координат или строка из базы.",
          "dict отображает ключи в значения с поиском в среднем за O(1). set — это dict без значений: неупорядоченный, с уникальными элементами и проверкой принадлежности за O(1). Разрыв в производительности — то, что важно на масштабе данных: проверка x in some_list просматривает весь список, а x in some_set — одно обращение к хешу. На ста тысячах проверок это разница между перерывом на кофе и мгновенным ответом.",
        ],
      },
      table: {
        head: { en: ["Type", "Ordered", "Mutable", "Lookup", "Use for"], ru: ["Тип", "Порядок", "Изменяем", "Поиск", "Когда"] },
        rows: [
          ["list", "yes", "yes", "O(n)", "a sequence you will modify"],
          ["tuple", "yes", "no", "O(n)", "a fixed record; a dict key"],
          ["dict", "insertion", "yes", "O(1)", "lookup by key"],
          ["set", "no", "yes", "O(1)", "uniqueness, membership tests"],
        ],
        rowsRu: [
          ["list", "да", "да", "O(n)", "последовательность, которую будешь менять"],
          ["tuple", "да", "нет", "O(n)", "фиксированная запись; ключ словаря"],
          ["dict", "вставки", "да", "O(1)", "поиск по ключу"],
          ["set", "нет", "да", "O(1)", "уникальность, проверка принадлежности"],
        ],
      },
    },
    {
      heading: { en: "Reference semantics: the bug that does not raise an error", ru: "Ссылочная семантика: баг, который не бросает ошибку" },
      body: {
        en: [
          "Assignment in Python never copies an object. It binds another name to the same object. So b = a followed by b.append(3) changes what a sees, because a and b are two labels on one list. Nothing raises; the data are simply wrong.",
          "The fix for a flat list is a.copy(), list(a) or the slice a[:]. But those are shallow: they copy the outer container while the inner objects stay shared. For a list of lists — or a DataFrame column holding lists — you need copy.deepcopy.",
          "The same trap has a mutable-default form. A function written as def f(x, acc=[]) creates that list once, at definition time, and every call without acc shares and accumulates into it. The idiom is acc=None with acc = [] or acc inside the body.",
        ],
        ru: [
          "Присваивание в Python никогда не копирует объект. Оно привязывает к тому же объекту ещё одно имя. Поэтому b = a и затем b.append(3) меняют то, что видит a: a и b — две метки на одном списке. Ничего не падает, просто данные становятся неверными.",
          "Для плоского списка лечится через a.copy(), list(a) или срез a[:]. Но это поверхностные копии: копируется внешний контейнер, а вложенные объекты остаются общими. Для списка списков — или столбца DataFrame, хранящего списки, — нужен copy.deepcopy.",
          "У той же ловушки есть форма с изменяемым значением по умолчанию. Функция, записанная как def f(x, acc=[]), создаёт этот список один раз, в момент определения, и каждый вызов без acc пользуется им же и накапливает в него. Идиома — acc=None и внутри acc = [] if acc is None else acc.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Aliasing, shallow copy, deep copy", ru: "Алиасинг, поверхностная и глубокая копия" },
        code: `a = [1, 2]
b = a                # та же самая ссылка
b.append(3)
print(a)             # [1, 2, 3]  — a изменился

a = [1, 2]
b = a.copy()         # новый внешний список
b.append(3)
print(a)             # [1, 2]     — a цел

nested = [[1, 2], [3, 4]]
shallow = nested.copy()
shallow[0].append(99)
print(nested)        # [[1, 2, 99], [3, 4]] — внутренние списки общие!

import copy
deep = copy.deepcopy(nested)
deep[0].append(100)
print(nested)        # без изменений`,
        out: {
          en: "Three levels of the same idea. Reach for deepcopy only when you actually have nesting — it is slow on large structures.",
          ru: "Три уровня одной идеи. Тянись за deepcopy только когда вложенность действительно есть — на больших структурах он медленный.",
        },
      },
      key: {
        en: "If a function mutates its argument, it changes the caller's data. Either return a new object or document the mutation clearly. In pandas this is the same argument as inplace=True, which is why the modern advice is to avoid it.",
        ru: "Если функция мутирует свой аргумент, она меняет данные вызывающего. Либо возвращай новый объект, либо явно документируй мутацию. В pandas это тот же спор про inplace=True — поэтому современный совет его не использовать.",
      },
    },
    {
      heading: { en: "Comprehensions and slicing", ru: "Comprehensions и срезы" },
      body: {
        en: [
          "A comprehension builds a collection in one expression: [f(x) for x in xs if cond(x)]. It is shorter than a loop with append, measurably faster, and — the real reason — it is an expression, so it can be passed straight into a function or nested inside another structure. Dict and set comprehensions use the same shape with braces.",
          "Slicing takes [start:stop:step] with stop excluded. Negative indices count from the end, so xs[-1] is the last element and xs[::-1] reverses. Slices of a list produce a new list; slices of a NumPy array produce a view onto the same memory, which is a distinction that will matter from next week onwards.",
        ],
        ru: [
          "Comprehension строит коллекцию одним выражением: [f(x) for x in xs if cond(x)]. Он короче цикла с append, измеримо быстрее и — вот настоящая причина — является выражением, поэтому его можно передать прямо в функцию или вложить в другую структуру. Comprehension для dict и set имеют ту же форму с фигурными скобками.",
          "Срез записывается как [start:stop:step], причём stop не включается. Отрицательные индексы считаются с конца: xs[-1] — последний элемент, xs[::-1] переворачивает. Срез списка порождает новый список; срез массива NumPy порождает представление на ту же память, и это различие станет важным уже со следующей недели.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "The same task four ways", ru: "Одна задача четырьмя способами" },
        code: `words = ["alpha", "beta", "gamma", "delta", "epsilon"]

# цикл — многословно
lengths = []
for w in words:
    if len(w) > 4:
        lengths.append(len(w))

# comprehension — то же самое одной строкой
lengths = [len(w) for w in words if len(w) > 4]

# словарь: слово -> длина
by_len = {w: len(w) for w in words}

# множество первых букв, уникальность бесплатно
firsts = {w[0] for w in words}

print(words[1:3])    # ['beta', 'gamma']  — stop не включён
print(words[-2:])    # ['delta', 'epsilon']
print(words[::-1])   # в обратном порядке`,
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a small log, without pandas", ru: "Разбор: маленький лог, без pandas" },
    intro: {
      en: "Before pandas arrives in week 3, do it by hand once. You have a list of session records as tuples (user, minutes, device). Find the unique users, the average session length, and the users with any session over 30 minutes.",
      ru: "До того как на третьей неделе появится pandas, сделай это руками один раз. Есть список записей о сессиях в виде кортежей (пользователь, минуты, устройство). Найди уникальных пользователей, среднюю длительность и пользователей хотя бы с одной сессией дольше 30 минут.",
    },
    steps: [
      {
        text: { en: "The data. Tuples, because a record is fixed and should not be edited in place.", ru: "Данные. Кортежи — потому что запись фиксирована и менять её на месте не следует." },
        code: {
          lang: "python",
          code: `sessions = [
    ("u1", 12, "mobile"), ("u2", 45, "desktop"), ("u1", 33, "desktop"),
    ("u3",  8, "mobile"), ("u2", 21, "mobile"),  ("u1",  5, "mobile"),
]`,
        },
      },
      {
        text: { en: "Unique users: a set comprehension gives uniqueness for free and O(1) membership afterwards.", ru: "Уникальные пользователи: set-comprehension даёт уникальность бесплатно и O(1) проверку принадлежности дальше." },
        code: { lang: "python", code: `users = {user for user, _, _ in sessions}
print(users, len(users))      # {'u1', 'u2', 'u3'} 3` },
      },
      {
        text: { en: "Average length: extract the numbers, then divide. Guard against an empty list — on real data it will happen.", ru: "Средняя длительность: вытащить числа, потом поделить. Защитись от пустого списка — на реальных данных это случится." },
        code: { lang: "python", code: `mins = [m for _, m, _ in sessions]
avg = sum(mins) / len(mins) if mins else 0.0
print(round(avg, 1))          # 20.7` },
      },
      {
        text: { en: "Users with a long session: build the set directly from the filtered records rather than looping and appending.", ru: "Пользователи с длинной сессией: строим множество прямо из отфильтрованных записей, а не циклом с append." },
        code: { lang: "python", code: `long_users = {user for user, m, _ in sessions if m > 30}
print(long_users)             # {'u1', 'u2'}` },
      },
      {
        text: { en: "Total minutes per user: a dict is the right container because you are looking up by key. This is exactly what groupby will do for you in week 4.", ru: "Суммарные минуты по пользователям: правильный контейнер — dict, потому что доступ по ключу. Ровно это сделает за тебя groupby на четвёртой неделе." },
        code: {
          lang: "python",
          code: `totals = {}
for user, m, _ in sessions:
    totals[user] = totals.get(user, 0) + m
print(totals)                 # {'u1': 50, 'u2': 66, 'u3': 8}`,
        },
      },
    ],
    conclusion: {
      en: "Twelve lines of plain Python. In week 4 the last step becomes df.groupby('user')['minutes'].sum() — one line. Doing it manually once is what makes that one line legible rather than magic, and the written exam will ask about the plain-Python version.",
      ru: "Двенадцать строк чистого Python. На четвёртой неделе последний шаг превратится в df.groupby('user')['minutes'].sum() — одну строку. Именно то, что ты сделал это руками один раз, делает ту строку читаемой, а не магической, и письменный экзамен будет спрашивать как раз про версию на чистом Python.",
    },
  },
  exercises: [
    {
      q: { en: "Why can a tuple be a dictionary key but a list cannot?", ru: "Почему кортеж может быть ключом словаря, а список — нет?" },
      a: { en: "Dictionary keys must be hashable, and an object's hash must never change while it is in use as a key. A tuple is immutable, so its hash is stable. A list can be mutated after insertion, which would leave the dictionary unable to find its own entry, so Python forbids it outright by not implementing __hash__ on lists. Coordinate pairs and composite keys are the usual reason to want this.", ru: "Ключи словаря должны быть хешируемыми, а хеш объекта не должен меняться, пока он используется как ключ. Кортеж неизменяем, поэтому его хеш стабилен. Список можно изменить после вставки, и тогда словарь не найдёт собственную запись, — Python запрещает это прямо, не реализуя __hash__ у списков. Обычная причина этого хотеть — пары координат и составные ключи." },
    },
    {
      q: { en: "What does this print, and why? def add(x, acc=[]): acc.append(x); return acc — called as add(1), then add(2).", ru: "Что напечатает и почему? def add(x, acc=[]): acc.append(x); return acc — вызвано add(1), затем add(2)." },
      a: { en: "[1] then [1, 2]. The default list is created once, when the function is defined, not on each call, so every call without an explicit acc shares that same object and keeps accumulating into it. The fix is acc=None in the signature and acc = [] if acc is None else acc as the first line. This is one of the most frequently asked Python interview questions for exactly this reason.", ru: "Сначала [1], потом [1, 2]. Список по умолчанию создаётся один раз, в момент определения функции, а не при каждом вызове, поэтому все вызовы без явного acc пользуются одним объектом и накапливают в него. Лечится так: acc=None в сигнатуре и acc = [] if acc is None else acc первой строкой. Именно поэтому это один из самых частых вопросов на собеседованиях по Python." },
    },
    {
      q: { en: "You need to check membership 200 000 times against a collection of 50 000 strings. list or set?", ru: "Нужно 200 000 раз проверить принадлежность к коллекции из 50 000 строк. list или set?" },
      a: { en: "set. Membership in a list is O(n): each check scans up to 50 000 items, giving 10⁹ comparisons in the worst case. Membership in a set is O(1) hashing, so the whole job is about 200 000 operations. Building the set costs one pass over the data and repays itself immediately. The idiom is known = set(known_list) before the loop.", ru: "set. Принадлежность в списке — O(n): каждая проверка просматривает до 50 000 элементов, что даёт до 10⁹ сравнений в худшем случае. В множестве это O(1) хеширование, то есть вся работа — около 200 000 операций. Построение множества стоит один проход по данным и окупается сразу. Идиома: known = set(known_list) до цикла." },
    },
    {
      q: { en: "Rewrite as a comprehension: squares of the even numbers in nums.", ru: "Перепиши через comprehension: квадраты чётных чисел из nums." },
      a: { en: "[x**2 for x in nums if x % 2 == 0]. Read it right to left as a pipeline: take x from nums, keep it if it is even, emit x squared. When the condition and the transformation together grow past about one line, go back to a named function — comprehensions stop helping once they need to be decoded.", ru: "[x**2 for x in nums if x % 2 == 0]. Читается справа налево как конвейер: берём x из nums, оставляем, если чётный, выдаём x в квадрате. Когда условие вместе с преобразованием перерастают примерно одну строку, возвращайся к именованной функции — comprehension перестаёт помогать, как только его приходится расшифровывать." },
    },
    {
      q: { en: "nested = [[1,2],[3,4]]; copy = nested.copy(); copy[0].append(9). What is nested now?", ru: "nested = [[1,2],[3,4]]; copy = nested.copy(); copy[0].append(9). Чему теперь равен nested?" },
      a: { en: "[[1, 2, 9], [3, 4]]. .copy() is shallow: it made a new outer list, but both outer lists point at the same two inner lists. Appending through copy[0] mutates the shared inner object. Use copy.deepcopy(nested) when the structure is nested and you need real independence.", ru: "[[1, 2, 9], [3, 4]]. .copy() поверхностный: он создал новый внешний список, но оба внешних списка указывают на те же два внутренних. Добавление через copy[0] мутирует общий внутренний объект. Когда структура вложенная и нужна настоящая независимость, применяй copy.deepcopy(nested)." },
    },
    {
      q: { en: "Your notebook runs fine but fails for the grader with NameError. What is the most likely cause?", ru: "Твой ноутбук работает, но у проверяющего падает с NameError. Наиболее вероятная причина?" },
      a: { en: "Cells were executed out of order. A name defined in a cell you later edited or deleted still lives in your kernel's memory, so your session works while a clean run does not. Restart Kernel and Run All before every submission — it reproduces exactly what the grader will see, and it takes thirty seconds.", ru: "Ячейки выполнялись не по порядку. Имя, определённое в ячейке, которую ты потом изменил или удалил, всё ещё живёт в памяти твоего ядра, поэтому у тебя работает, а на чистом запуске — нет. Делай Restart Kernel и Run All перед каждой сдачей: это в точности воспроизводит то, что увидит проверяющий, и занимает тридцать секунд." },
    },
  ],
  checklist: {
    en: [
      "My project runs from a virtual environment and the dependencies are recorded in a file",
      "Restart Kernel and Run All completes my notebook top to bottom without errors",
      "I can justify list vs tuple vs dict vs set for each container in my code",
      "I can explain the aliasing bug and know when a shallow copy is not enough",
      "My repository has commits from several days, not one commit at the deadline",
    ],
    ru: [
      "Проект запускается из виртуального окружения, зависимости записаны в файл",
      "Restart Kernel и Run All проходят ноутбук сверху донизу без ошибок",
      "Могу обосновать выбор list / tuple / dict / set для каждого контейнера в своём коде",
      "Могу объяснить баг с алиасингом и знаю, когда поверхностной копии мало",
      "В репозитории коммиты за несколько дней, а не один коммит в дедлайн",
    ],
  },
};
