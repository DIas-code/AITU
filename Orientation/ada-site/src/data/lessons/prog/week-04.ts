import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 4,
  minutes: 70,
  title: { en: "pandas II: aggregation and joins", ru: "pandas II: агрегация и соединения" },
  summary: {
    en: "split-apply-combine with groupby, the four join types, and reshaping between wide and long form. This is where a table starts answering questions.",
    ru: "split-apply-combine через groupby, четыре типа соединений и перестройка между широкой и длинной формой. Здесь таблица начинает отвечать на вопросы.",
  },
  goals: {
    en: [
      "Aggregate with groupby and name several statistics in one call",
      "Choose the right join type and check the row count afterwards",
      "Diagnose row multiplication caused by a non-unique join key",
      "Move between wide and long form with pivot_table and melt",
    ],
    ru: [
      "Агрегировать через groupby и называть несколько статистик одним вызовом",
      "Выбирать верный тип соединения и проверять число строк после него",
      "Диагностировать размножение строк из-за неуникального ключа соединения",
      "Переходить между широкой и длинной формой через pivot_table и melt",
    ],
  },
  sections: [
    {
      heading: { en: "split-apply-combine", ru: "split-apply-combine" },
      body: {
        en: [
          "groupby is one idea in three steps: split the rows into groups by a key, apply a function within each group, combine the results into a new frame. Once you see it that way, the API stops looking arbitrary.",
          "The result's index is the grouping key, which is why chaining .reset_index() is so common — it turns that index back into an ordinary column. Grouping by several keys produces a MultiIndex, and the same reset flattens it.",
          "agg is where the expressiveness is. Passing a dictionary applies different functions to different columns; passing named keyword arguments produces clean output column names in one pass, which is far better than aggregating twice and merging.",
        ],
        ru: [
          "groupby — одна идея в три шага: разбить строки на группы по ключу, применить функцию внутри каждой группы, собрать результаты в новый фрейм. Как только увидишь это так, API перестанет казаться произвольным.",
          "Индексом результата становится ключ группировки — поэтому так часто дописывают .reset_index(): он превращает этот индекс обратно в обычный столбец. Группировка по нескольким ключам даёт MultiIndex, и тот же reset его распрямляет.",
          "Выразительность живёт в agg. Передача словаря применяет разные функции к разным столбцам; передача именованных аргументов даёт чистые имена выходных столбцов за один проход, что намного лучше, чем агрегировать дважды и потом склеивать.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "From one statistic to a report table", ru: "От одной статистики к таблице отчёта" },
        code: `# самый простой случай
df.groupby("device")["minutes"].mean()

# несколько статистик с понятными именами — предпочтительная форма
report = (df.groupby("device")
            .agg(sessions=("minutes", "size"),
                 total=("minutes", "sum"),
                 avg=("minutes", "mean"),
                 median=("minutes", "median"),
                 users=("user_id", "nunique"))
            .reset_index()
            .sort_values("total", ascending=False))
print(report)

# группировка по двум ключам -> MultiIndex
by2 = df.groupby(["country", "device"])["minutes"].mean().reset_index()

# transform возвращает результат длиной с исходный фрейм
df["dev_avg"] = df.groupby("device")["minutes"].transform("mean")
df["vs_avg"] = df["minutes"] - df["dev_avg"]`,
        out: {
          en: "agg collapses to one row per group; transform broadcasts the group value back to every original row. Choosing the wrong one is the most common groupby error.",
          ru: "agg схлопывает до одной строки на группу; transform возвращает групповое значение каждой исходной строке. Выбрать не то — самая частая ошибка с groupby.",
        },
      },
      key: {
        en: "agg answers 'what is true of each group'. transform answers 'how does this row compare to its group'. Both are needed, and they are not interchangeable.",
        ru: "agg отвечает на вопрос «что верно про каждую группу». transform — «как эта строка соотносится со своей группой». Нужны оба, и они не взаимозаменяемы.",
      },
      pitfall: {
        en: "groupby drops rows where the key is NaN by default. If some devices are missing, those sessions vanish from the report and the totals no longer add up. Pass dropna=False when the missing group is itself informative.",
        ru: "groupby по умолчанию выбрасывает строки, где ключ равен NaN. Если у части сессий устройство неизвестно, они исчезают из отчёта и итоги перестают сходиться. Передавай dropna=False, когда пропущенная группа сама по себе информативна.",
      },
    },
    {
      heading: { en: "Joins: four types and one check", ru: "Соединения: четыре типа и одна проверка" },
      body: {
        en: [
          "merge combines two frames on a key, exactly like a SQL JOIN, and the how argument picks the type. inner keeps only matched rows. left keeps every row of the left frame, filling unmatched right-hand columns with NaN. right is the mirror. outer keeps everything from both sides.",
          "left is the default choice in analysis, because it preserves your fact table while enriching it with attributes. inner is right when unmatched rows are meaningless. outer is mostly for reconciliation — finding out what exists on one side and not the other.",
          "The one non-negotiable habit is checking the row count before and after. If it grew, your key is not unique on one side and rows were multiplied. If it shrank on an inner join, matching failed — usually a dtype mismatch where one side is a string and the other an integer, or trailing whitespace.",
          "Pass indicator=True and pandas adds a _merge column marking each row as left_only, right_only or both. That column, run through value_counts(), is a two-second audit of what actually happened.",
        ],
        ru: [
          "merge соединяет два фрейма по ключу, ровно как JOIN в SQL, а тип задаётся аргументом how. inner оставляет только совпавшие строки. left оставляет все строки левого фрейма, заполняя несовпавшие правые столбцы значениями NaN. right — зеркально. outer оставляет всё с обеих сторон.",
          "В анализе выбор по умолчанию — left, потому что он сохраняет твою таблицу фактов, обогащая её атрибутами. inner уместен, когда несовпавшие строки бессмысленны. outer нужен в основном для сверки — выяснить, что есть с одной стороны и отсутствует с другой.",
          "Единственная привычка, которой нельзя пренебрегать, — проверять число строк до и после. Выросло — значит ключ неуникален с одной из сторон и строки размножились. Уменьшилось при inner — значит совпадение не состоялось, обычно из-за несовпадения dtype, когда с одной стороны строка, а с другой целое, или из-за хвостовых пробелов.",
          "Передай indicator=True, и pandas добавит столбец _merge, помечающий каждую строку как left_only, right_only или both. Этот столбец через value_counts() — двухсекундный аудит того, что на самом деле произошло.",
        ],
      },
      table: {
        head: { en: ["how", "Keeps", "Use when"], ru: ["how", "Что оставляет", "Когда"] },
        rows: [
          ["inner", "matched rows only", "unmatched rows are meaningless"],
          ["left", "all left rows", "enriching a fact table — the default"],
          ["right", "all right rows", "rare; usually swap the frames instead"],
          ["outer", "everything from both", "reconciling two sources"],
        ],
        rowsRu: [
          ["inner", "только совпавшие строки", "несовпавшие строки бессмысленны"],
          ["left", "все строки левого фрейма", "обогащение таблицы фактов — по умолчанию"],
          ["right", "все строки правого фрейма", "редко; проще поменять фреймы местами"],
          ["outer", "всё с обеих сторон", "сверка двух источников"],
        ],
      },
      code: {
        lang: "python",
        caption: { en: "A join with its audit attached", ru: "Соединение вместе с аудитом" },
        code: `print("до:", len(sessions))

merged = sessions.merge(users,
                        on="user_id",
                        how="left",
                        indicator=True,
                        validate="many_to_one")   # упадёт, если ключ не уникален справа

print("после:", len(merged))
print(merged["_merge"].value_counts())

# не нашли пользователя — почему?
print(merged.loc[merged._merge == "left_only", "user_id"].head())

# частая причина: типы не совпали
print(sessions.user_id.dtype, users.user_id.dtype)`,
        out: {
          en: "validate='many_to_one' turns a silent row explosion into an immediate exception. Use it on every merge where you believe the right key is unique.",
          ru: "validate='many_to_one' превращает тихое размножение строк в немедленное исключение. Ставь его на каждое соединение, где считаешь правый ключ уникальным.",
        },
      },
    },
    {
      heading: { en: "Why rows multiply", ru: "Почему строки размножаются" },
      body: {
        en: [
          "If the key appears twice on the right, every matching left row is duplicated to pair with both. Ten thousand rows joined against a lookup table with three duplicate keys can come back as thirty thousand, and every sum you compute afterwards is inflated.",
          "The cause is almost always that the right table is not what you assumed — a dimension table with historical versions of each record, or an export that was appended to twice. Check with users.user_id.duplicated().sum() before merging, and either deduplicate or aggregate the right side down to one row per key first.",
        ],
        ru: [
          "Если ключ встречается справа дважды, каждая совпавшая левая строка дублируется, чтобы соединиться с обеими. Десять тысяч строк, соединённых со справочником с тремя дублирующимися ключами, могут вернуться тридцатью тысячами, и любая сумма после этого завышена.",
          "Причина почти всегда в том, что правая таблица не такая, как ты предполагал: справочник с историческими версиями каждой записи или выгрузка, которую дважды дописали. Проверяй через users.user_id.duplicated().sum() до соединения и либо дедуплицируй, либо предварительно сверни правую сторону агрегацией до одной строки на ключ.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Diagnose and fix before merging", ru: "Диагностика и лечение до соединения" },
        code: `dupes = users["user_id"].duplicated().sum()
print("дублей ключа справа:", dupes)

if dupes:
    # вариант 1: оставить последнюю версию записи
    users_1 = users.sort_values("updated_at").drop_duplicates("user_id", keep="last")
    # вариант 2: свернуть агрегацией
    users_1 = users.groupby("user_id", as_index=False).agg(plan=("plan", "last"))

merged = sessions.merge(users_1, on="user_id", how="left", validate="many_to_one")
assert len(merged) == len(sessions), "строки размножились"`,
        out: {
          en: "The assert is worth writing every time. A join that silently changes the row count is the single most expensive bug in a data project.",
          ru: "Этот assert стоит писать каждый раз. Соединение, тихо меняющее число строк, — самый дорогой баг в дата-проекте.",
        },
      },
    },
    {
      heading: { en: "Wide and long: pivot_table and melt", ru: "Широкая и длинная форма: pivot_table и melt" },
      body: {
        en: [
          "Long form has one row per observation with a column naming the variable — tidy, and what every plotting and modelling library wants. Wide form spreads one variable across columns — compact, and what a human wants to read in a report.",
          "pivot_table goes long to wide: you name the index, the columns and the values, plus the aggregation function to use when several rows land in the same cell. That aggfunc argument is the difference between pivot_table and plain pivot — pivot raises on duplicates, pivot_table aggregates them, which is why it is the safer default.",
          "melt goes wide to long, collapsing a set of columns into a variable/value pair. The typical use is a report exported with a column per month that you need back in tidy form before you can plot it.",
        ],
        ru: [
          "Длинная форма — по строке на наблюдение, с отдельным столбцом, называющим переменную: аккуратно, и именно этого хотят все библиотеки построения графиков и моделирования. Широкая форма разносит одну переменную по столбцам: компактно, и именно это удобно читать человеку в отчёте.",
          "pivot_table переводит из длинной формы в широкую: ты называешь индекс, столбцы и значения плюс функцию агрегации на случай, когда в одну ячейку попадает несколько строк. Аргумент aggfunc и есть разница между pivot_table и обычным pivot: pivot падает на дублях, а pivot_table их агрегирует, поэтому он безопаснее по умолчанию.",
          "melt переводит из широкой в длинную, схлопывая набор столбцов в пару «переменная — значение». Типичный случай — отчёт, выгруженный со столбцом на каждый месяц, который нужно вернуть в аккуратную форму, прежде чем строить график.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Both directions", ru: "В обе стороны" },
        code: `# длинная -> широкая: страны по строкам, устройства по столбцам
wide = df.pivot_table(index="country",
                      columns="device",
                      values="minutes",
                      aggfunc="mean",
                      fill_value=0,
                      margins=True)      # добавит строку и столбец All
print(wide.round(1))

# широкая -> длинная: вернуть аккуратную форму для графика
long = wide.reset_index().melt(id_vars="country",
                               var_name="device",
                               value_name="avg_minutes")
print(long.head())`,
        out: {
          en: "margins=True adds row and column totals — exactly what a report table needs and one argument instead of five lines.",
          ru: "margins=True добавляет итоговые строку и столбец — ровно то, что нужно таблице в отчёте, и это один аргумент вместо пяти строк.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a report from two tables", ru: "Разбор: отчёт из двух таблиц" },
    intro: {
      en: "sessions has user_id, minutes, device. users has user_id, country, plan. Build a table of average session length by country and plan, with the number of users, and audit every step.",
      ru: "В sessions есть user_id, minutes, device. В users — user_id, country, plan. Построй таблицу средней длительности сессии по странам и тарифам с числом пользователей и проверь каждый шаг.",
    },
    steps: [
      {
        text: { en: "Check the right-hand key before merging. This is the step people skip and then debug for an hour.", ru: "Проверяем правый ключ до соединения. Именно этот шаг пропускают, а потом час отлаживают." },
        code: {
          lang: "python",
          code: `print(len(sessions), len(users))
print("дублей user_id в users:", users.user_id.duplicated().sum())
print("типы:", sessions.user_id.dtype, users.user_id.dtype)`,
        },
      },
      {
        text: { en: "Left join with validation and an indicator, then confirm the row count did not move.", ru: "Левое соединение с валидацией и индикатором, затем убеждаемся, что число строк не изменилось." },
        code: {
          lang: "python",
          code: `m = sessions.merge(users, on="user_id", how="left",
                   validate="many_to_one", indicator=True)
assert len(m) == len(sessions)
print(m._merge.value_counts())`,
        },
      },
      {
        text: { en: "Deal with the unmatched rows explicitly rather than letting NaN spread quietly through the aggregation.", ru: "Разбираемся с несовпавшими строками явно, а не даём NaN тихо расползтись по агрегации." },
        code: {
          lang: "python",
          code: `orphans = m._merge.eq("left_only").sum()
print("сессий без пользователя:", orphans, f"({orphans/len(m):.1%})")
m["country"] = m["country"].fillna("неизвестно")
m["plan"] = m["plan"].fillna("неизвестно")`,
        },
      },
      {
        text: { en: "Aggregate with named outputs so the columns arrive ready for the report.", ru: "Агрегируем с именованными выходами, чтобы столбцы сразу были готовы для отчёта." },
        code: {
          lang: "python",
          code: `agg = (m.groupby(["country", "plan"], dropna=False)
         .agg(sessions=("minutes", "size"),
              users=("user_id", "nunique"),
              avg_min=("minutes", "mean"),
              med_min=("minutes", "median"))
         .reset_index())`,
        },
      },
      {
        text: { en: "Pivot to the shape a human reads, and keep the long form for plotting.", ru: "Разворачиваем в форму, удобную человеку, а длинную оставляем для графиков." },
        code: {
          lang: "python",
          code: `table = agg.pivot_table(index="country", columns="plan",
                        values="avg_min", aggfunc="first", margins=True)
print(table.round(1))

# проверка: сумма сессий по группам совпадает с исходным числом строк
assert agg["sessions"].sum() == len(m)`,
        },
      },
    ],
    conclusion: {
      en: "Three asserts and one indicator column turn an unverifiable pipeline into one you can defend. When the marker asks 'how do you know the join did not duplicate rows', the answer is a line of code, not a hope.",
      ru: "Три assert и один столбец-индикатор превращают непроверяемый конвейер в тот, который можно защитить. Когда проверяющий спросит «откуда ты знаешь, что соединение не размножило строки», ответом будет строка кода, а не надежда.",
    },
  },
  exercises: [
    {
      q: { en: "You merge 10 000 sessions with a user table and get 10 240 rows. What happened and how do you find it?", ru: "Соединяешь 10 000 сессий с таблицей пользователей и получаешь 10 240 строк. Что произошло и как это найти?" },
      a: { en: "The right-hand key is not unique: some user_ids appear more than once in the user table, so those sessions were paired with each duplicate. Find them with users[users.user_id.duplicated(keep=False)].sort_values('user_id'). Fix by deduplicating — often keeping the latest record — or by aggregating the right side to one row per key. Adding validate='many_to_one' to the merge would have raised immediately instead of letting it through.", ru: "Правый ключ неуникален: некоторые user_id встречаются в таблице пользователей больше одного раза, и эти сессии соединились с каждым дублем. Найти их можно так: users[users.user_id.duplicated(keep=False)].sort_values('user_id'). Лечится дедупликацией — часто с сохранением последней записи — или агрегацией правой стороны до одной строки на ключ. Аргумент validate='many_to_one' в merge упал бы сразу, вместо того чтобы пропустить это дальше." },
    },
    {
      q: { en: "An inner join returns 0 rows although both tables clearly contain the same identifiers. Why?", ru: "Внутреннее соединение возвращает 0 строк, хотя обе таблицы явно содержат одинаковые идентификаторы. Почему?" },
      a: { en: "Almost certainly a type or format mismatch: one side is int64 and the other is a string, or one has leading zeros the other lost, or there is trailing whitespace. Compare dtypes first, then normalise both sides with .astype('string').str.strip(). A quick check is set(a.key).intersection(b.key) — if it is empty while the printed values look identical, the difference is invisible characters or type.", ru: "Почти наверняка несовпадение типа или формата: с одной стороны int64, с другой строка; или с одной стороны сохранились ведущие нули, а с другой потерялись; или есть хвостовые пробелы. Сначала сравни dtypes, затем нормализуй обе стороны через .astype('string').str.strip(). Быстрая проверка — set(a.key).intersection(b.key): если пусто, а напечатанные значения выглядят одинаково, разница в невидимых символах или типе." },
    },
    {
      q: { en: "You need each row to carry its group's mean alongside its own value. agg or transform?", ru: "Нужно, чтобы каждая строка несла среднее своей группы рядом со своим значением. agg или transform?" },
      a: { en: "transform. It returns a result the same length as the input, aligned to the original index, so it assigns straight into a new column: df['grp_mean'] = df.groupby('g')['x'].transform('mean'). agg would collapse to one row per group and then need a merge back, which is more code and one more chance to duplicate rows.", ru: "transform. Он возвращает результат той же длины, что и вход, выровненный по исходному индексу, поэтому присваивается прямо в новый столбец: df['grp_mean'] = df.groupby('g')['x'].transform('mean'). agg схлопнул бы до одной строки на группу, и потребовалось бы соединение обратно — это больше кода и ещё один шанс размножить строки." },
    },
    {
      q: { en: "Your groupby report's session counts sum to less than len(df). What is the likely cause?", ru: "Суммы сессий в отчёте по groupby дают меньше, чем len(df). Вероятная причина?" },
      a: { en: "Rows where the grouping key is NaN were dropped, which groupby does by default. Pass dropna=False to keep them as their own group. This matters because a missing category is often the most interesting one — it usually points at a data collection problem you would otherwise never see.", ru: "Отброшены строки, где ключ группировки равен NaN, — groupby делает это по умолчанию. Передай dropna=False, чтобы сохранить их отдельной группой. Это важно, потому что пропущенная категория часто самая интересная: обычно она указывает на проблему сбора данных, которую иначе не заметишь." },
    },
    {
      q: { en: "What is the difference between pivot and pivot_table, and which should you default to?", ru: "В чём разница между pivot и pivot_table и какой брать по умолчанию?" },
      a: { en: "pivot merely reshapes and raises a ValueError if more than one row would land in the same cell. pivot_table takes an aggfunc and combines them, defaulting to the mean. Default to pivot_table: on real data duplicates are the norm, and being forced to state the aggregation explicitly makes the result honest about what it is showing.", ru: "pivot только перестраивает форму и бросает ValueError, если в одну ячейку попадает больше одной строки. pivot_table принимает aggfunc и объединяет их, по умолчанию средним. По умолчанию бери pivot_table: на реальных данных дубли — норма, а необходимость явно назвать агрегацию делает результат честным относительно того, что он показывает." },
    },
    {
      q: { en: "Write a groupby producing, per country: number of sessions, number of unique users, and median minutes — with those exact column names.", ru: "Напиши groupby, дающий по каждой стране: число сессий, число уникальных пользователей и медиану минут — именно с такими именами столбцов." },
      a: { en: "df.groupby('country').agg(sessions=('minutes','size'), users=('user_id','nunique'), med=('minutes','median')).reset_index(). The named-aggregation form gives clean single-level column names in one pass; the older dictionary form produces a MultiIndex on the columns that you then have to flatten by hand.", ru: "df.groupby('country').agg(sessions=('minutes','size'), users=('user_id','nunique'), med=('minutes','median')).reset_index(). Форма именованной агрегации даёт чистые одноуровневые имена столбцов за один проход; старая словарная форма порождает MultiIndex по столбцам, который потом приходится распрямлять руками." },
    },
  ],
  checklist: {
    en: [
      "Every merge in my notebook is followed by a row-count assert",
      "I use validate= on merges where I believe a key is unique",
      "I can explain when to use agg and when to use transform",
      "I check for NaN keys before trusting a groupby total",
      "My mid-term project draft loads, cleans, joins and aggregates end to end",
    ],
    ru: [
      "За каждым merge в ноутбуке следует assert на число строк",
      "Ставлю validate= на соединениях, где считаю ключ уникальным",
      "Могу объяснить, когда нужен agg, а когда transform",
      "Проверяю NaN в ключах, прежде чем доверять итогам groupby",
      "Черновик промежуточного проекта сквозной: загрузка, очистка, соединение, агрегация",
    ],
  },
};
