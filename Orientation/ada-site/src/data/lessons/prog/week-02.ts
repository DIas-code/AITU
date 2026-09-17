import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 2,
  minutes: 65,
  title: { en: "NumPy: arrays and vectorisation", ru: "NumPy: массивы и векторизация" },
  summary: {
    en: "Why an ndarray is not a list, how broadcasting removes loops, and the view-versus-copy distinction that silently corrupts data.",
    ru: "Почему ndarray — не список, как broadcasting убирает циклы и чем представление отличается от копии, тихо портя данные.",
  },
  goals: {
    en: [
      "Explain why an ndarray is faster than a list and what it gives up in exchange",
      "Apply broadcasting rules to predict the shape of a result before running it",
      "Aggregate along a chosen axis and get the direction right",
      "Tell a view from a copy and know when slicing will bite you",
    ],
    ru: [
      "Объяснять, почему ndarray быстрее списка и чем за это платит",
      "Применять правила broadcasting и предсказывать форму результата до запуска",
      "Агрегировать вдоль нужной оси и не путать направление",
      "Отличать представление от копии и знать, когда срез укусит",
    ],
  },
  sections: [
    {
      heading: { en: "Why an array beats a list", ru: "Почему массив выигрывает у списка" },
      body: {
        en: [
          "A Python list is an array of pointers to objects scattered across memory, each one a full object with its own type tag and reference count. Adding two lists element by element means chasing pointers, checking types on every operation and allocating new objects for the results.",
          "An ndarray is a single contiguous block of memory holding raw values of one fixed dtype. The type is checked once, for the whole array, and the loop runs in compiled C over adjacent bytes that the CPU cache is happy to prefetch. That is where the ten-to-hundredfold speedups come from: not from a cleverer algorithm but from removing the interpreter from the inner loop.",
          "The price is homogeneity and a fixed size. Every element must share a dtype, and growing an array means allocating a new one. If you need to append repeatedly, build a Python list and convert once at the end.",
        ],
        ru: [
          "Список Python — это массив указателей на объекты, разбросанные по памяти, и каждый из них полноценный объект со своим тегом типа и счётчиком ссылок. Сложить два списка поэлементно значит бегать по указателям, проверять типы на каждой операции и выделять новые объекты под результаты.",
          "ndarray — один непрерывный кусок памяти с сырыми значениями одного фиксированного dtype. Тип проверяется один раз, на весь массив, а цикл идёт в скомпилированном C по соседним байтам, которые кеш процессора с удовольствием подгружает наперёд. Отсюда ускорения в десятки и сотни раз: не из-за более умного алгоритма, а из-за того, что интерпретатор убран из внутреннего цикла.",
          "Плата — однородность и фиксированный размер. Все элементы обязаны иметь один dtype, а рост массива означает выделение нового. Если нужно многократно добавлять, собирай список Python и конвертируй один раз в конце.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Measure it yourself", ru: "Замерь сам" },
        code: `import numpy as np, time

n = 1_000_000
lst = list(range(n))
arr = np.arange(n)

t = time.perf_counter()
squares_list = [x * x for x in lst]
print("list:", round(time.perf_counter() - t, 3), "s")

t = time.perf_counter()
squares_arr = arr * arr
print("numpy:", round(time.perf_counter() - t, 3), "s")

print(arr.dtype, arr.shape, arr.nbytes // 1024, "KB")`,
        out: {
          en: "Typically 60–120 ms for the list and 2–5 ms for the array. Reproduce this once — it is the argument for everything that follows.",
          ru: "Обычно 60–120 мс на список и 2–5 мс на массив. Воспроизведи это один раз — на этом аргументе стоит всё дальнейшее.",
        },
      },
      pitfall: {
        en: "np.array([1, 2, 'x']) does not fail. It silently upcasts everything to strings, and your arithmetic then breaks somewhere far away. Always check .dtype after constructing an array from mixed input.",
        ru: "np.array([1, 2, 'x']) не падает. Он молча приводит всё к строкам, и арифметика ломается где-то далеко. После построения массива из смешанного ввода всегда проверяй .dtype.",
      },
    },
    {
      heading: { en: "Broadcasting", ru: "Broadcasting" },
      body: {
        en: [
          "Broadcasting lets arrays of different shapes take part in one element-wise operation without you writing a loop or materialising a bigger array. The rules are mechanical: line the shapes up from the right; two dimensions are compatible if they are equal or if one of them is 1; a missing leading dimension is treated as 1.",
          "So a (1000, 3) array and a (3,) array combine fine — the second is stretched across all thousand rows. A (1000, 3) and a (1000,) do not, because aligned from the right you get 3 against 1000. The fix is to reshape the second to (1000, 1), which then stretches across the three columns instead.",
          "The stretching is conceptual. NumPy does not allocate the expanded array; it iterates with a stride of zero along the broadcast dimension, so the operation costs no extra memory. That is why centring a large matrix by subtracting a row of column means is essentially free.",
        ],
        ru: [
          "Broadcasting позволяет массивам разной формы участвовать в одной поэлементной операции без цикла и без создания большего массива. Правила механические: выравниваем формы справа; два измерения совместимы, если равны или если одно из них равно 1; отсутствующее ведущее измерение считается равным 1.",
          "Поэтому массив (1000, 3) и массив (3,) складываются прекрасно — второй растягивается по всем тысяче строк. А (1000, 3) и (1000,) — нет, потому что при выравнивании справа получается 3 против 1000. Лечится решейпом второго в (1000, 1), и тогда он растягивается уже по трём столбцам.",
          "Растяжение — понятийное. NumPy не выделяет расширенный массив, а идёт с нулевым шагом вдоль broadcast-измерения, поэтому операция не стоит дополнительной памяти. Именно поэтому центрирование большой матрицы вычитанием строки средних по столбцам практически бесплатно.",
        ],
      },
      formula: {
        tex: "(1000,\\,3)\\;\\text{и}\\;(3,)\\;\\to\\;(1000,\\,3)\\qquad (1000,\\,3)\\;\\text{и}\\;(1000,)\\;\\to\\;\\text{ошибка}",
        note: {
          en: "Align right, compare, stretch the 1s. Reshape (1000,) to (1000, 1) to make the second case work.",
          ru: "Выровнять справа, сравнить, растянуть единицы. Решейп (1000,) в (1000, 1) заставляет работать и второй случай.",
        },
      },
      code: {
        lang: "python",
        caption: { en: "Centring and scaling without a single loop", ru: "Центрирование и масштабирование без единого цикла" },
        code: `X = rng.normal(size=(1000, 3))

col_mean = X.mean(axis=0)      # форма (3,)
col_std  = X.std(axis=0, ddof=1)

Z = (X - col_mean) / col_std   # (1000,3) с (3,) — растягивается по строкам
print(Z.shape, Z.mean(axis=0).round(12), Z.std(axis=0, ddof=1).round(3))

row_sum = X.sum(axis=1)        # форма (1000,)
# X / row_sum -> ошибка: 3 против 1000
frac = X / row_sum[:, None]    # (1000,1) растягивается по столбцам
print(frac.shape, frac.sum(axis=1)[:3].round(6))`,
        out: {
          en: "row_sum[:, None] is the idiomatic reshape to a column. You will use it constantly.",
          ru: "row_sum[:, None] — идиоматический решейп в столбец. Использовать будешь постоянно.",
        },
      },
    },
    {
      heading: { en: "Axes: the thing everyone gets backwards", ru: "Оси: то, в чём все путаются" },
      body: {
        en: [
          "For a two-dimensional array axis=0 runs down the rows and axis=1 runs across the columns. The reliable way to read it is not 'row' or 'column' but this: axis=k is the axis that disappears from the shape.",
          "So on a (1000, 3) array, sum(axis=0) collapses the 1000 and leaves shape (3,) — one number per column, the column totals. sum(axis=1) collapses the 3 and leaves (1000,) — one number per row. Say the shape out loud before writing the call and you will stop guessing.",
          "keepdims=True suppresses the collapse, leaving a length-1 dimension in place: (1000, 1) instead of (1000,). That is exactly the shape broadcasting wants, so X - X.mean(axis=1, keepdims=True) centres each row without any manual reshaping.",
        ],
        ru: [
          "Для двумерного массива axis=0 идёт вниз по строкам, а axis=1 — поперёк по столбцам. Надёжный способ читать это — не «строка» или «столбец», а вот такой: axis=k — та ось, которая исчезает из формы.",
          "Поэтому на массиве (1000, 3) вызов sum(axis=0) схлопывает 1000 и оставляет форму (3,) — по числу на столбец, то есть суммы по столбцам. А sum(axis=1) схлопывает 3 и оставляет (1000,) — по числу на строку. Проговаривай форму вслух до написания вызова, и гадать перестанешь.",
          "Параметр keepdims=True подавляет схлопывание, оставляя измерение длины 1: (1000, 1) вместо (1000,). Это ровно та форма, которую хочет broadcasting, поэтому X - X.mean(axis=1, keepdims=True) центрирует каждую строку без ручного решейпа.",
        ],
      },
      key: {
        en: "axis=k means 'the k-th dimension disappears'. Check by predicting the output shape before you run the line.",
        ru: "axis=k означает «k-е измерение исчезает». Проверяй, предсказывая форму результата до запуска строки.",
      },
    },
    {
      heading: { en: "Views versus copies", ru: "Представления против копий" },
      body: {
        en: [
          "Slicing a list gives a new list. Slicing an ndarray gives a view: a new object that points into the original block of memory. Writing into the view writes into the original, and nothing warns you.",
          "This is deliberate and valuable — it is how NumPy avoids copying gigabytes when you take a window of an array — but it is a trap when you meant to work on a scratch copy. Use .copy() when you intend independence, and check .base, which is None for an owner and points at the parent for a view.",
          "Fancy indexing behaves differently: indexing with a list of positions or a boolean mask always returns a copy, because the selected elements are not evenly spaced in memory and no view could describe them. So arr[[0, 5, 9]] is safe to modify, while arr[0:10] is not.",
        ],
        ru: [
          "Срез списка даёт новый список. Срез ndarray даёт представление: новый объект, указывающий внутрь исходного блока памяти. Запись в представление пишет в оригинал, и никто об этом не предупредит.",
          "Это сделано намеренно и полезно — так NumPy не копирует гигабайты, когда берёшь окно массива, — но становится ловушкой, если ты рассчитывал на черновую копию. Применяй .copy(), когда нужна независимость, и проверяй .base: у владельца он None, у представления указывает на родителя.",
          "Продвинутая индексация ведёт себя иначе: индексация списком позиций или булевой маской всегда возвращает копию, потому что выбранные элементы лежат в памяти неравномерно и никакое представление их не опишет. Поэтому arr[[0, 5, 9]] менять безопасно, а arr[0:10] — нет.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "The distinction in four lines", ru: "Различие в четырёх строках" },
        code: `a = np.arange(10)

v = a[2:5]          # представление
v[0] = 999
print(a)            # [0 1 999 3 4 5 6 7 8 9] — оригинал изменён
print(v.base is a)  # True

a = np.arange(10)
c = a[2:5].copy()   # явная копия
c[0] = 999
print(a[2])         # 2 — цел
print(c.base)       # None

a = np.arange(10)
f = a[[2, 3, 4]]    # fancy indexing -> всегда копия
f[0] = 999
print(a[2])         # 2 — цел`,
      },
    },
  ],
  worked: {
    title: { en: "Worked example: standardising a matrix and finding outliers", ru: "Разбор: стандартизация матрицы и поиск выбросов" },
    intro: {
      en: "You have measurements of 500 objects on 4 features with different units. Bring them to a common scale and find the rows containing an extreme value — all without a Python loop.",
      ru: "Есть измерения 500 объектов по 4 признакам в разных единицах. Приведи их к общей шкале и найди строки с экстремальным значением — всё без единого цикла Python.",
    },
    steps: [
      {
        text: { en: "Generate data where the features deliberately differ in scale, so the need for standardising is visible.", ru: "Сгенерируем данные, где признаки нарочно различаются по масштабу, чтобы необходимость стандартизации была видна." },
        code: { lang: "python", code: `rng = np.random.default_rng(0)
X = rng.normal(loc=[0, 100, 5, -20], scale=[1, 15, 0.5, 4], size=(500, 4))
print(X.shape, X.mean(axis=0).round(2))   # (500, 4) [0.02 100.3 5.0 -20.1]` },
      },
      {
        text: { en: "Column statistics. axis=0 collapses the 500 rows, so the result has one number per feature.", ru: "Статистики по столбцам. axis=0 схлопывает 500 строк, поэтому в результате по числу на признак." },
        code: { lang: "python", code: `mu = X.mean(axis=0)             # (4,)
sd = X.std(axis=0, ddof=1)      # (4,)
print(mu.shape, sd.round(2))` },
      },
      {
        text: { en: "Standardise by broadcasting. (500, 4) against (4,) aligns on the right and stretches down the rows.", ru: "Стандартизуем через broadcasting. (500, 4) против (4,) выравнивается справа и растягивается по строкам." },
        code: { lang: "python", code: `Z = (X - mu) / sd
print(Z.mean(axis=0).round(10))        # ~0
print(Z.std(axis=0, ddof=1).round(6))  # ~1` },
      },
      {
        text: { en: "Flag extreme values with a boolean mask, then collapse across features with any() along axis=1.", ru: "Помечаем экстремальные значения булевой маской, затем схлопываем по признакам через any() вдоль axis=1." },
        code: { lang: "python", code: `mask = np.abs(Z) > 3           # (500, 4) булевых
rows = mask.any(axis=1)        # (500,) — есть ли выброс хоть в одном признаке
print("строк с выбросом:", rows.sum())
print("по признакам:", mask.sum(axis=0))` },
      },
      {
        text: { en: "Extract those rows. Boolean indexing returns a copy, so editing the result cannot damage X.", ru: "Извлекаем эти строки. Булева индексация возвращает копию, поэтому правка результата не повредит X." },
        code: { lang: "python", code: `suspects = X[rows]             # копия, не представление
print(suspects.shape, suspects.base is None)   # (k, 4) True` },
      },
    ],
    conclusion: {
      en: "Five vectorised lines replace a double loop over 2 000 cells. Two ideas did the work: broadcasting to align shapes, and axis to choose which dimension collapses. Both come back in pandas next week, where the same operations wear column names instead of positions.",
      ru: "Пять векторизованных строк заменяют двойной цикл по 2 000 ячеек. Работу сделали две идеи: broadcasting для согласования форм и axis для выбора схлопываемого измерения. Обе вернутся на следующей неделе в pandas, где те же операции носят имена столбцов вместо позиций.",
    },
  },
  exercises: [
    {
      q: { en: "A is (5, 3) and B is (3,). What is the shape of A + B? What if B is (5,)?", ru: "A имеет форму (5, 3), B — (3,). Какова форма A + B? А если B имеет форму (5,)?" },
      a: { en: "With B of shape (3,) the result is (5, 3): aligning from the right gives 3 against 3, and the missing leading dimension counts as 1 and stretches to 5. With B of shape (5,) it raises a ValueError, because aligning from the right gives 3 against 5, which are neither equal nor 1. Reshape it with B[:, None] to (5, 1) and it broadcasts across the columns.", ru: "При B формы (3,) результат (5, 3): выравнивание справа даёт 3 против 3, а отсутствующее ведущее измерение считается равным 1 и растягивается до 5. При B формы (5,) будет ValueError, потому что справа получается 3 против 5 — не равны и не единица. Решейп через B[:, None] в (5, 1) — и он растянется по столбцам." },
    },
    {
      q: { en: "X has shape (100, 5). What shapes do X.sum(axis=0) and X.sum(axis=1) have?", ru: "X имеет форму (100, 5). Какие формы у X.sum(axis=0) и X.sum(axis=1)?" },
      a: { en: "(5,) and (100,) respectively. axis=0 removes the first dimension, leaving one total per column; axis=1 removes the second, leaving one total per row. The rule to hold on to is that axis=k is the dimension that disappears — never memorise 'axis 0 is rows' as a phrase, because it stops working in three dimensions.", ru: "(5,) и (100,) соответственно. axis=0 убирает первое измерение, оставляя по сумме на столбец; axis=1 убирает второе, оставляя по сумме на строку. Держаться нужно правила «axis=k — исчезающее измерение», а не фразы «ось 0 — это строки»: в трёх измерениях она перестаёт работать." },
    },
    {
      q: { en: "b = a[1:4]; b[0] = 0. Has a changed? What if b = a[[1,2,3]]?", ru: "b = a[1:4]; b[0] = 0. Изменился ли a? А если b = a[[1,2,3]]?" },
      a: { en: "Yes in the first case: a slice of an ndarray is a view onto the same memory, so writing through b writes into a. No in the second: fancy indexing with a list of positions always returns a copy, because arbitrary positions cannot be described by a stride. Check with b.base — it is a for a view and None for a copy.", ru: "В первом случае да: срез ndarray — представление на ту же память, поэтому запись через b пишет в a. Во втором нет: продвинутая индексация списком позиций всегда возвращает копию, потому что произвольные позиции нельзя описать шагом. Проверяется через b.base — у представления это a, у копии None." },
    },
    {
      q: { en: "Centre each row of X (shape 200×8) so that every row has mean zero. Write the line.", ru: "Центрируй каждую строку X (форма 200×8) так, чтобы у каждой строки было нулевое среднее. Напиши строку." },
      hint: { en: "Which axis must disappear, and what shape does broadcasting need?", ru: "Какая ось должна исчезнуть и какая форма нужна для broadcasting?" },
      a: { en: "X - X.mean(axis=1, keepdims=True). The row mean needs axis=1 so the 8 collapses, leaving one number per row. Without keepdims that is shape (200,), which cannot broadcast against (200, 8) — aligned right it gives 8 against 200. keepdims=True yields (200, 1), which stretches across the columns exactly as needed. The alternative spelling is X.mean(axis=1)[:, None].", ru: "X - X.mean(axis=1, keepdims=True). Среднее по строке требует axis=1, чтобы схлопнулась восьмёрка и осталось по числу на строку. Без keepdims это форма (200,), которая не broadcast-ится с (200, 8): справа получается 8 против 200. keepdims=True даёт (200, 1), и она растягивается по столбцам ровно как надо. Альтернативная запись — X.mean(axis=1)[:, None]." },
    },
    {
      q: { en: "np.array([1, 2, 3.5]).dtype is float64. Why, and what would np.array([1, 2, 'a']).dtype be?", ru: "np.array([1, 2, 3.5]).dtype равен float64. Почему, и каким будет np.array([1, 2, 'a']).dtype?" },
      a: { en: "An ndarray has one dtype for all elements, so NumPy upcasts to the narrowest type that can hold everything: int and float together become float64. With a string present everything becomes a Unicode string dtype such as <U21, and arithmetic on the array then fails or behaves as string operations. This is why mixed columns must be cleaned before conversion, which is exactly week 5's material.", ru: "У ndarray один dtype на все элементы, поэтому NumPy приводит к самому узкому типу, вмещающему всё: int вместе с float дают float64. При наличии строки всё становится строковым dtype вроде <U21, и арифметика затем падает или ведёт себя как операции над строками. Поэтому смешанные столбцы нужно чистить до конвертации — это ровно материал пятой недели." },
    },
  ],
  checklist: {
    en: [
      "I have measured the list-versus-array speed difference on my own machine",
      "I can predict the result shape of a broadcast operation before running it",
      "I state the output shape out loud before choosing an axis argument",
      "I know which indexing forms return a view and which return a copy",
      "There is no Python loop over rows left in my notebook",
    ],
    ru: [
      "Замерил разницу в скорости между списком и массивом на своей машине",
      "Могу предсказать форму результата broadcast-операции до запуска",
      "Проговариваю форму результата до того, как выбрать аргумент axis",
      "Знаю, какие формы индексации возвращают представление, а какие копию",
      "В моём ноутбуке не осталось цикла Python по строкам",
    ],
  },
};
