import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 3,
  minutes: 65,
  title: { en: "pandas I: Series, DataFrame, loading data", ru: "pandas I: Series, DataFrame, загрузка данных" },
  summary: {
    en: "The index is what makes pandas different from a spreadsheet. Loading, selecting, filtering, and the first look at a dataset you have never seen.",
    ru: "Индекс — то, чем pandas отличается от таблицы в Excel. Загрузка, выбор, фильтрация и первый взгляд на датасет, который видишь впервые.",
  },
  goals: {
    en: [
      "Load a CSV correctly on the first attempt, including types, dates and missing-value markers",
      "Select rows and columns with .loc and .iloc without guessing which is which",
      "Filter with boolean masks and combine conditions safely",
      "Run a first-contact inspection that tells you what you are actually holding",
    ],
    ru: [
      "Загружать CSV правильно с первого раза — с типами, датами и маркерами пропусков",
      "Выбирать строки и столбцы через .loc и .iloc, не гадая, что из них что",
      "Фильтровать булевыми масками и безопасно комбинировать условия",
      "Проводить первичный осмотр, который говорит, что у тебя на самом деле в руках",
    ],
  },
  sections: [
    {
      heading: { en: "Series, DataFrame and the index", ru: "Series, DataFrame и индекс" },
      body: {
        en: [
          "A Series is a one-dimensional array with labels — values plus an index. A DataFrame is a set of Series sharing one index, which is why a column extracted from a DataFrame is a Series and keeps the row labels with it.",
          "The index is the feature, not decoration. It aligns data automatically: adding two Series matches them by label, not by position, and any label missing on one side produces NaN rather than a silently wrong sum. That behaviour saves you from a whole class of off-by-one errors that plain arrays would happily commit.",
          "It also means the default RangeIndex 0, 1, 2 is a real index, not row numbers. After filtering, the surviving rows keep their original labels, so the index may read 3, 7, 11. If you then need positional access, either use .iloc or call reset_index(drop=True) deliberately.",
        ],
        ru: [
          "Series — одномерный массив с метками: значения плюс индекс. DataFrame — набор Series с общим индексом, поэтому столбец, извлечённый из DataFrame, является Series и уносит метки строк с собой.",
          "Индекс — это функциональность, а не украшение. Он автоматически выравнивает данные: сложение двух Series сопоставляет их по меткам, а не по позициям, и любая метка, отсутствующая с одной стороны, даёт NaN вместо тихо неверной суммы. Это поведение спасает от целого класса ошибок на единицу, которые обычные массивы совершили бы с удовольствием.",
          "Отсюда же следует, что RangeIndex 0, 1, 2 по умолчанию — настоящий индекс, а не номера строк. После фильтрации уцелевшие строки сохраняют исходные метки, поэтому индекс может выглядеть как 3, 7, 11. Если после этого нужен доступ по позиции, используй .iloc или осознанно вызови reset_index(drop=True).",
        ],
      },
      key: {
        en: "pandas aligns on labels. Almost every surprising NaN in an arithmetic result is an index that did not match.",
        ru: "pandas выравнивает по меткам. Почти любой неожиданный NaN в результате арифметики — это несовпавший индекс.",
      },
    },
    {
      heading: { en: "Loading a file properly", ru: "Как загрузить файл по-человечески" },
      body: {
        en: [
          "read_csv with default arguments works often enough to be dangerous. Dates arrive as strings, identifier columns with leading zeros lose them by being parsed as integers, and the string 'N/A' becomes a value rather than a missing marker.",
          "Spend thirty seconds on the arguments and the next hour is cleaner. Declare dtype for identifiers, pass parse_dates for dates, list your file's missing markers in na_values, and set the separator and decimal mark explicitly for European exports where the comma is the decimal point.",
          "For a large file, read the first thousand rows with nrows to inspect it, decide on the arguments, and only then load the whole thing. Loading ten million rows to discover the delimiter is wrong is a slow way to learn.",
        ],
        ru: [
          "read_csv с аргументами по умолчанию работает достаточно часто, чтобы это было опасно. Даты приезжают строками, столбцы идентификаторов с ведущими нулями теряют их, будучи разобранными как целые, а строка «N/A» становится значением, а не маркером пропуска.",
          "Потрать тридцать секунд на аргументы — и следующий час будет чище. Объяви dtype для идентификаторов, передай parse_dates для дат, перечисли маркеры пропусков своего файла в na_values и явно задай разделитель и десятичный знак для европейских выгрузок, где запятая — десятичная точка.",
          "Для большого файла прочитай первую тысячу строк через nrows, осмотри их, определись с аргументами и только потом грузи целиком. Загружать десять миллионов строк, чтобы выяснить, что разделитель не тот, — медленный способ учиться.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "A read_csv you will not regret", ru: "read_csv, о котором не пожалеешь" },
        code: `import pandas as pd

peek = pd.read_csv("sessions.csv", nrows=1000)   # сначала посмотреть
print(peek.dtypes)

df = pd.read_csv(
    "sessions.csv",
    sep=",",                       # ; в европейских выгрузках
    decimal=".",                   # , в европейских выгрузках
    dtype={"user_id": "string",    # иначе ведущие нули пропадут
           "zip": "string"},
    parse_dates=["started_at"],    # иначе останутся строками
    na_values=["", "NA", "N/A", "-", "нет данных"],
    encoding="utf-8",
)

print(df.shape, df.index.dtype)`,
        out: {
          en: "df.shape first, always. If the row count is not what you expected, stop and find out why before analysing anything.",
          ru: "Сначала всегда df.shape. Если число строк не то, которого ждал, остановись и выясни причину до всякого анализа.",
        },
      },
      pitfall: {
        en: "A user_id read as int64 turns 00123 into 123, and the join against another table then silently matches nothing. Identifiers are strings, even when they look like numbers.",
        ru: "user_id, прочитанный как int64, превращает 00123 в 123, и соединение с другой таблицей тихо не находит совпадений. Идентификаторы — строки, даже когда выглядят числами.",
      },
    },
    {
      heading: { en: ".loc, .iloc and chained assignment", ru: ".loc, .iloc и цепочечное присваивание" },
      body: {
        en: [
          ".loc addresses by label, .iloc by integer position. On a default index they look identical, which is exactly why people stop distinguishing them and then get burned after a filter or a sort. One more asymmetry: .loc includes the right endpoint of a slice, .iloc excludes it, matching Python's usual behaviour.",
          "Both take a row selector and a column selector: df.loc[rows, cols]. Passing a single argument means rows only, which is a common source of confusion when someone writes df.loc['column_name'] and gets a KeyError.",
          "The rule that actually costs marks is chained assignment. Writing df[df.x > 0]['y'] = 1 selects a subset, which may be a copy, and then assigns into that temporary — the original DataFrame is unchanged and pandas may or may not warn. The single correct form is df.loc[df.x > 0, 'y'] = 1, one operation with both selectors together.",
        ],
        ru: [
          ".loc адресует по меткам, .iloc — по целым позициям. На индексе по умолчанию они выглядят одинаково — именно поэтому их перестают различать, а потом обжигаются после фильтра или сортировки. Ещё одна асимметрия: .loc включает правый конец среза, .iloc исключает, как обычно в Python.",
          "Оба принимают селектор строк и селектор столбцов: df.loc[строки, столбцы]. Единственный аргумент означает только строки — частый источник недоумения, когда пишут df.loc['имя_столбца'] и получают KeyError.",
          "Правило, которое реально стоит баллов, — цепочечное присваивание. Запись df[df.x > 0]['y'] = 1 выбирает подмножество, которое может оказаться копией, и присваивает во временный объект: исходный DataFrame не меняется, а pandas может и не предупредить. Единственная верная форма — df.loc[df.x > 0, 'y'] = 1, одна операция с обоими селекторами сразу.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Selection, and the one form that assigns correctly", ru: "Выбор и единственная форма, которая присваивает верно" },
        code: `df.loc[0, "minutes"]              # по меткам: строка 0, столбец minutes
df.iloc[0, 2]                     # по позициям: 1-я строка, 3-й столбец

df.loc[0:3]                       # 4 строки: 0,1,2,3 — правый конец ВКЛЮЧЁН
df.iloc[0:3]                      # 3 строки: 0,1,2 — правый конец исключён

df.loc[:, ["user_id", "minutes"]] # все строки, два столбца
df.iloc[:5, :2]                   # первые 5 строк, первые 2 столбца

# НЕВЕРНО: присваивание может уйти во временную копию
df[df.minutes > 30]["is_long"] = True

# ВЕРНО: один вызов .loc с обоими селекторами
df.loc[df.minutes > 30, "is_long"] = True`,
      },
    },
    {
      heading: { en: "Boolean masks", ru: "Булевы маски" },
      body: {
        en: [
          "A comparison on a Series returns a Series of booleans of the same length, and passing that mask back into the frame keeps the True rows. This is the same idea as NumPy boolean indexing from last week, now carrying labels.",
          "Combining conditions needs the element-wise operators & | ~, not the Python keywords and or not, because the keywords try to reduce a whole Series to a single truth value and raise ValueError. Each condition also needs its own parentheses, since & binds more tightly than the comparison operators.",
          "For readability, isin() replaces a chain of equality tests, between() replaces a two-sided comparison, and str.contains() handles substring matching. Named intermediate masks beat a single unreadable expression: is_long = df.minutes > 30 then df[is_long & is_mobile] documents itself.",
        ],
        ru: [
          "Сравнение по Series возвращает Series булевых значений той же длины, и передача этой маски обратно во фрейм оставляет строки со значением True. Это та же идея, что булева индексация NumPy на прошлой неделе, только теперь с метками.",
          "Для комбинации условий нужны поэлементные операторы & | ~, а не ключевые слова and or not: ключевые слова пытаются свести целую Series к одному булеву значению и бросают ValueError. Каждому условию нужны ещё и свои скобки, потому что & связывает сильнее операторов сравнения.",
          "Для читаемости isin() заменяет цепочку сравнений на равенство, between() — двустороннее сравнение, str.contains() — поиск подстроки. Именованные промежуточные маски лучше одного нечитаемого выражения: is_long = df.minutes > 30, а затем df[is_long & is_mobile] документирует себя сам.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Masks that read like sentences", ru: "Маски, читающиеся как предложения" },
        code: `is_long   = df["minutes"] > 30
is_mobile = df["device"] == "mobile"

df[is_long & is_mobile]           # и то и другое
df[is_long | is_mobile]           # хотя бы одно
df[~is_long]                      # отрицание

# скобки обязательны: & сильнее, чем >
df[(df.minutes > 30) & (df.device == "mobile")]

df[df.device.isin(["mobile", "tablet"])]      # вместо == | ==
df[df.minutes.between(10, 30)]                 # включительно с обеих сторон
df[df.user_id.str.startswith("u1")]            # строковые операции через .str

print("доля длинных сессий:", is_long.mean().round(3))   # True=1 -> среднее = доля`,
        out: {
          en: "mask.mean() on a boolean Series gives the proportion of True. It is the fastest way to size a subgroup.",
          ru: "mask.mean() на булевой Series даёт долю True. Самый быстрый способ оценить размер подгруппы.",
        },
      },
      pitfall: {
        en: "df[df.a > 0 and df.b > 0] raises 'The truth value of a Series is ambiguous'. Use & and wrap each comparison in parentheses.",
        ru: "df[df.a > 0 and df.b > 0] бросает «The truth value of a Series is ambiguous». Используй & и оборачивай каждое сравнение в скобки.",
      },
    },
    {
      heading: { en: "First contact with an unknown dataset", ru: "Первый контакт с незнакомым датасетом" },
      body: {
        en: [
          "Before any analysis, run the same six checks every time. They take a minute and they catch the problems that would otherwise surface at the worst moment — usually right before a deadline.",
          "Shape, so you know the size and can compare it against what the source claimed. dtypes, because a numeric column stored as object means there is dirt in it. Missing counts per column, since a column that is 90 % empty is not usable. describe(), for impossible values like a negative age or a maximum a thousand times the median. Duplicate rows, which inflate every subsequent count. And value_counts() on each categorical column, which is where you find 'Mobile', 'mobile' and 'MOBILE' living as three separate categories.",
        ],
        ru: [
          "До всякого анализа каждый раз выполняй одни и те же шесть проверок. Они занимают минуту и ловят проблемы, которые иначе всплывут в худший момент — обычно прямо перед дедлайном.",
          "Форма — чтобы знать размер и сверить с тем, что заявлял источник. dtypes — потому что числовой столбец, хранящийся как object, означает грязь внутри. Количество пропусков по столбцам, поскольку столбец, пустой на 90 %, непригоден. describe() — ради невозможных значений вроде отрицательного возраста или максимума в тысячу раз выше медианы. Дубликаты строк, раздувающие любой последующий подсчёт. И value_counts() по каждому категориальному столбцу — там и находятся «Mobile», «mobile» и «MOBILE», живущие тремя разными категориями.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "The six checks, as a function you reuse", ru: "Шесть проверок как функция, которую переиспользуешь" },
        code: `def first_look(df, cat_cols=()):
    print("форма:", df.shape)
    print("\\nтипы:\\n", df.dtypes)
    print("\\nпропуски:\\n", df.isna().sum().loc[lambda s: s > 0])
    print("\\nдоля пропусков:\\n", (df.isna().mean() * 100).round(1))
    print("\\nчисловые:\\n", df.describe().T[["min", "50%", "max"]])
    print("\\nполных дублей:", df.duplicated().sum())
    for c in cat_cols:
        print(f"\\n{c}:\\n", df[c].value_counts(dropna=False).head(10))

first_look(df, cat_cols=["device", "country"])`,
        out: {
          en: "Put this in the second cell of every notebook. Reading its output is what week 5 will call data cleaning.",
          ru: "Помести это во вторую ячейку каждого ноутбука. Чтение её вывода — это то, что на пятой неделе назовут очисткой данных.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: five questions to a dataset", ru: "Разбор: пять вопросов к датасету" },
    intro: {
      en: "This is the week-3 assignment shape: load a public dataset and answer five substantive questions. Here is the pattern on session data with columns user_id, started_at, minutes, device, country.",
      ru: "Такова форма задания третьей недели: загрузить публичный датасет и ответить на пять содержательных вопросов. Вот образец на данных о сессиях со столбцами user_id, started_at, minutes, device, country.",
    },
    steps: [
      {
        text: { en: "Load with explicit arguments and inspect before believing anything.", ru: "Загружаем с явными аргументами и осматриваем, прежде чем чему-то верить." },
        code: {
          lang: "python",
          code: `df = pd.read_csv("sessions.csv",
                 dtype={"user_id": "string"},
                 parse_dates=["started_at"],
                 na_values=["", "NA", "-"])
first_look(df, cat_cols=["device", "country"])`,
        },
      },
      {
        text: { en: "Question 1: how many unique users, and how many sessions each on average?", ru: "Вопрос 1: сколько уникальных пользователей и сколько в среднем сессий на каждого?" },
        code: { lang: "python", code: `n_users = df["user_id"].nunique()
print(n_users, round(len(df) / n_users, 2))` },
      },
      {
        text: { en: "Question 2: is the session length distribution skewed? Compare mean and median — the week-1 trick from the maths course.", ru: "Вопрос 2: скошено ли распределение длительности? Сравним среднее и медиану — приём первой недели из курса математики." },
        code: { lang: "python", code: `m, md = df["minutes"].mean(), df["minutes"].median()
print(round(m, 1), round(md, 1), "правый хвост" if m > md else "симметрично")` },
      },
      {
        text: { en: "Question 3: what share of sessions are long, and does it differ by device?", ru: "Вопрос 3: какая доля сессий длинные и различается ли она по устройствам?" },
        code: {
          lang: "python",
          code: `is_long = df["minutes"] > 30
print("всего:", is_long.mean().round(3))
for d in df["device"].dropna().unique():
    print(d, is_long[df["device"] == d].mean().round(3))`,
        },
      },
      {
        text: { en: "Question 4: which day has the most sessions? Dates parsed at load time make this one line.", ru: "Вопрос 4: в какой день больше всего сессий? Разобранные при загрузке даты делают это одной строкой." },
        code: { lang: "python", code: `df["date"] = df["started_at"].dt.date
print(df["date"].value_counts().head(3))` },
      },
      {
        text: { en: "Question 5: are there users with a single very long session? Note .loc with both selectors — never chained brackets.", ru: "Вопрос 5: есть ли пользователи с единственной очень длинной сессией? Обрати внимание на .loc с обоими селекторами — никаких цепочек скобок." },
        code: {
          lang: "python",
          code: `suspects = df.loc[df["minutes"] > 240, ["user_id", "started_at", "minutes"]]
print(suspects.sort_values("minutes", ascending=False).head())`,
        },
      },
    ],
    conclusion: {
      en: "Five questions, each answered in one or two lines, each with a sentence of interpretation next to it. That last part is what separates a passing notebook from a good one — the code is the easy half.",
      ru: "Пять вопросов, каждый закрыт одной-двумя строками, и у каждого рядом предложение с интерпретацией. Именно последнее отличает проходной ноутбук от хорошего: код — это лёгкая половина.",
    },
  },
  exercises: [
    {
      q: { en: "df.loc[0:3] returns 4 rows but df.iloc[0:3] returns 3. Why?", ru: "df.loc[0:3] возвращает 4 строки, а df.iloc[0:3] — 3. Почему?" },
      a: { en: "Because .loc slices by label and includes both endpoints, while .iloc slices by position and follows the usual Python convention of excluding the stop. The label-inclusive behaviour exists because with a non-numeric index — dates, names — excluding the endpoint would be meaningless: you cannot ask for 'everything up to but not including' a label you named explicitly.", ru: "Потому что .loc режет по меткам и включает оба конца, а .iloc режет по позициям и следует обычному соглашению Python об исключении stop. Включающее поведение .loc существует потому, что при нечисловом индексе — датах, именах — исключение конца было бы бессмысленным: нельзя попросить «всё до, но не включая» метку, которую ты явно назвал." },
    },
    {
      q: { en: "After df2 = df[df.x > 0], why might df2.iloc[0] and df2.loc[0] differ or fail?", ru: "После df2 = df[df.x > 0] почему df2.iloc[0] и df2.loc[0] могут различаться или упасть?" },
      a: { en: "Filtering keeps the original labels, so df2's index might be 3, 7, 11. .iloc[0] takes the first surviving row, which has label 3. .loc[0] asks for the row labelled 0, which was filtered out, so it raises a KeyError. If you want clean 0..n−1 labels after filtering, call reset_index(drop=True) explicitly.", ru: "Фильтрация сохраняет исходные метки, поэтому индекс df2 может быть 3, 7, 11. .iloc[0] берёт первую уцелевшую строку — с меткой 3. .loc[0] просит строку с меткой 0, которую отфильтровали, и получает KeyError. Если после фильтрации нужны чистые метки 0..n−1, вызови reset_index(drop=True) явно." },
    },
    {
      q: { en: "Why does df[df.a > 0 and df.b > 0] fail, and what is the fix?", ru: "Почему df[df.a > 0 and df.b > 0] падает и как это исправить?" },
      a: { en: "The keyword and calls bool() on its operands, and a Series of many booleans has no single truth value, so pandas raises 'The truth value of a Series is ambiguous'. Use the element-wise operator: df[(df.a > 0) & (df.b > 0)]. The parentheses are required because & has higher precedence than >, so without them Python would try to evaluate 0 & df.b first.", ru: "Ключевое слово and вызывает bool() на своих операндах, а у Series из многих булевых значений нет единого значения истинности, поэтому pandas бросает «The truth value of a Series is ambiguous». Используй поэлементный оператор: df[(df.a > 0) & (df.b > 0)]. Скобки обязательны, потому что & приоритетнее >, и без них Python сначала попытается вычислить 0 & df.b." },
    },
    {
      q: { en: "A column of numbers has dtype object. What does that tell you and how do you investigate?", ru: "Столбец чисел имеет dtype object. О чём это говорит и как разбираться?" },
      a: { en: "That at least one value is not a number — a stray string, a thousands separator, a comma decimal mark, or a placeholder like '-' that was not in na_values. Investigate with pd.to_numeric(df.col, errors='coerce') and then look at the rows where the result is NaN but the original is not: df[df.col.notna() & pd.to_numeric(df.col, errors='coerce').isna()]. That prints exactly the offending values.", ru: "О том, что хотя бы одно значение не число: затесавшаяся строка, разделитель тысяч, запятая как десятичный знак или заглушка вроде «-», не попавшая в na_values. Разбираться так: pd.to_numeric(df.col, errors='coerce'), затем посмотреть строки, где результат NaN, а оригинал — нет: df[df.col.notna() & pd.to_numeric(df.col, errors='coerce').isna()]. Это распечатает ровно проблемные значения." },
    },
    {
      q: { en: "You need the proportion of rows where device is mobile. Write it in one expression.", ru: "Нужна доля строк, где device равен mobile. Запиши одним выражением." },
      a: { en: "(df.device == 'mobile').mean(). The comparison gives a boolean Series, and the mean of booleans is the proportion of True because True counts as 1. Note that NaN in device is neither equal nor unequal — it compares False — so this is the share of all rows, not the share among rows with a known device. For the latter, filter to notna() first.", ru: "(df.device == 'mobile').mean(). Сравнение даёт булеву Series, а среднее булевых — доля True, потому что True считается за 1. Учти, что NaN в device не равен и не не равен — сравнение даёт False, — поэтому это доля от всех строк, а не от строк с известным устройством. Для второго сначала отфильтруй по notna()." },
    },
    {
      q: { en: "Why must user_id be read as a string?", ru: "Почему user_id надо читать как строку?" },
      a: { en: "Identifiers are labels that happen to be written with digits; arithmetic on them is meaningless. Reading them as integers strips leading zeros, so 00123 becomes 123 and no longer matches the same identifier in another table, producing a join that silently returns nothing. Integer overflow on long identifiers and scientific-notation conversion are the other two ways this goes wrong.", ru: "Идентификаторы — метки, которые просто записаны цифрами; арифметика над ними бессмысленна. Чтение их как целых срезает ведущие нули, поэтому 00123 становится 123 и перестаёт совпадать с тем же идентификатором в другой таблице, а соединение тихо возвращает пустоту. Переполнение на длинных идентификаторах и перевод в научную нотацию — два других способа получить ту же беду." },
    },
  ],
  checklist: {
    en: [
      "Every read_csv in my notebook passes dtype, parse_dates and na_values explicitly",
      "I can say when .loc and .iloc give different answers and why",
      "I never write chained assignment; every conditional write goes through .loc",
      "My first-look function runs on every dataset before I analyse it",
      "I can express 'the share of rows satisfying a condition' in one expression",
    ],
    ru: [
      "В каждом read_csv моего ноутбука явно переданы dtype, parse_dates и na_values",
      "Могу сказать, когда .loc и .iloc дают разные ответы и почему",
      "Никогда не пишу цепочечное присваивание; любая условная запись идёт через .loc",
      "Функция первичного осмотра запускается на каждом датасете до анализа",
      "Могу выразить «доля строк, удовлетворяющих условию» одним выражением",
    ],
  },
};
