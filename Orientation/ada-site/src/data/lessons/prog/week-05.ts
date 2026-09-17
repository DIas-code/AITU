import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 5,
  minutes: 65,
  title: { en: "Mid-term project and data cleaning", ru: "Промежуточный проект и очистка данных" },
  summary: {
    en: "The 100-point submission is due this week. Alongside it: missing values, duplicates, outliers, types and categories — the work that consumes most of any real project.",
    ru: "На этой неделе сдача на 100 баллов. Параллельно: пропуски, дубликаты, выбросы, типы и категории — работа, съедающая большую часть любого реального проекта.",
  },
  goals: {
    en: [
      "Classify missingness and choose a treatment you can defend",
      "Find duplicates that are not exact copies",
      "Decide whether an outlier is an error, a rare event or a different population",
      "Assemble a submission that a stranger can open and run",
    ],
    ru: [
      "Классифицировать пропуски и выбирать обработку, которую сможешь защитить",
      "Находить дубликаты, не являющиеся точными копиями",
      "Решать, что перед тобой: ошибка, редкое событие или другая популяция",
      "Собирать сдачу, которую посторонний человек сможет открыть и запустить",
    ],
  },
  sections: [
    {
      heading: { en: "What the mid-term project is graded on", ru: "За что оценивают промежуточный проект" },
      body: {
        en: [
          "This is the whole of the first attestation: 100 points on one submission, due in week 5. There is no laboratory cushion here as there is in the maths course, so the submission carries everything.",
          "What is actually being assessed is whether the work is reproducible, whether the data handling is defensible, and whether you drew conclusions rather than printing tables. A notebook that loads a file, prints twenty outputs and stops is a script, not a project. Each output needs a sentence saying what it means and what you decided because of it.",
          "Structure it as a narrative: the question, the data and its provenance, what was wrong with it and what you did about it, the analysis, the findings, and the limitations. The limitations section is worth writing honestly — naming what your data cannot answer reads as competence, not weakness.",
        ],
        ru: [
          "Это вся первая аттестация: 100 баллов за одну сдачу на пятой неделе. Подушки из лабораторных, как в курсе математики, здесь нет, поэтому сдача несёт на себе всё.",
          "Оценивают на деле воспроизводимость, обоснованность обращения с данными и то, сделал ли ты выводы, а не напечатал таблицы. Ноутбук, который грузит файл, печатает двадцать выводов и заканчивается, — это скрипт, а не проект. Каждому выводу нужно предложение о том, что он означает и что ты из-за него решил.",
          "Строй как повествование: вопрос, данные и их происхождение, что с ними было не так и что ты с этим сделал, анализ, результаты и ограничения. Раздел про ограничения стоит писать честно: назвать то, на что твои данные ответить не могут, читается как компетентность, а не как слабость.",
        ],
      },
      key: {
        en: "Restart Kernel and Run All, then read the notebook top to bottom as if you had never seen it. Anything that needs explaining out loud needs a markdown cell.",
        ru: "Restart Kernel и Run All, потом прочитай ноутбук сверху донизу так, будто видишь впервые. Всё, что приходится пояснять вслух, требует markdown-ячейки.",
      },
    },
    {
      heading: { en: "Missing values: three kinds", ru: "Пропуски: три вида" },
      body: {
        en: [
          "Before filling anything, ask why the value is missing, because the mechanism decides what you are allowed to do.",
          "Missing completely at random means the gap has nothing to do with anything — a sensor dropped a packet. Dropping those rows loses precision but does not bias the result. Missing at random means the gap depends on other observed variables: older respondents skip the income question more often. You can model it, and imputation conditioned on the observed variables is legitimate. Missing not at random means the gap depends on the missing value itself: high earners refuse to state their income. No imputation fixes that, and the honest move is to say so.",
          "The practical consequence: filling with the column mean is the default move that is almost always wrong. It shrinks the variance, distorts correlations, and invents data where the interesting story is the absence. Median is more robust for skewed data; a separate 'unknown' category is often better for categorical columns; and an is_missing indicator column preserves the information that something was absent.",
        ],
        ru: [
          "Прежде чем что-то заполнять, спроси, почему значение отсутствует: механизм определяет, что вообще позволено делать.",
          "Пропуски совершенно случайны, когда отсутствие ни с чем не связано: датчик потерял пакет. Удаление таких строк снижает точность, но не смещает результат. Пропуски случайны при условии, когда отсутствие зависит от других наблюдаемых переменных: пожилые респонденты чаще пропускают вопрос о доходе. Это моделируется, и импутация с учётом наблюдаемых переменных законна. Пропуски неслучайны, когда отсутствие зависит от самого пропущенного значения: люди с высокими доходами отказываются их называть. Никакая импутация этого не чинит, и честный ход — так и написать.",
          "Практическое следствие: заполнение средним по столбцу — действие по умолчанию, которое почти всегда неверно. Оно сжимает дисперсию, искажает корреляции и выдумывает данные там, где интересна как раз пустота. Медиана устойчивее на скошенных данных; отдельная категория «неизвестно» часто лучше для категориальных столбцов; а столбец-индикатор is_missing сохраняет информацию о том, что чего-то не было.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Look before you fill", ru: "Сначала посмотреть, потом заполнять" },
        code: `# сколько и где
na = df.isna().mean().sort_values(ascending=False)
print((na[na > 0] * 100).round(1))

# связаны ли пропуски друг с другом? если да — это не случайность
print(df.isna().corr().round(2))

# зависит ли пропуск от другой переменной? признак MAR
df["income_missing"] = df["income"].isna()
print(df.groupby("income_missing")["age"].mean())

# осознанные варианты, а не машинальное .fillna(mean)
df["income_flag"] = df["income"].isna().astype(int)      # сохранить факт пропуска
df["income"] = df["income"].fillna(df["income"].median())  # медиана: скошенные данные
df["device"] = df["device"].fillna("неизвестно")           # категория, а не мода`,
        out: {
          en: "If the mean age differs sharply between rows with and without income, the missingness is informative and the indicator column earns its place.",
          ru: "Если средний возраст резко отличается между строками с доходом и без него, пропуск информативен и столбец-индикатор оправдан.",
        },
      },
      pitfall: {
        en: "Dropping every row with any missing value can silently delete half the dataset and bias the survivors. Check how much you are losing with df.dropna().shape before committing to it.",
        ru: "Удаление всех строк с любым пропуском может тихо стереть половину датасета и сместить выживших. Проверь потери через df.dropna().shape, прежде чем на это соглашаться.",
      },
    },
    {
      heading: { en: "Duplicates that do not look like duplicates", ru: "Дубликаты, которые не выглядят дубликатами" },
      body: {
        en: [
          "df.duplicated() finds exact copies across all columns, which is the easy case and rarely the real one. The expensive duplicates are partial: the same order exported twice with different timestamps, the same person entered as 'Ivanov I.' and 'Ivanov Ivan'.",
          "Define what identity means for your data and check duplication on that subset of columns. If a user should have one session per start time, then duplicated(subset=['user_id','started_at']) is the test. Deciding which copy to keep is a domain question — usually the most recent, sometimes the most complete.",
          "For categorical text, near-duplicates come from inconsistent entry rather than repeated rows. Normalising with strip and lower collapses 'Mobile', ' mobile' and 'MOBILE' into one category, and value_counts() before and after shows exactly how many categories you just merged.",
        ],
        ru: [
          "df.duplicated() находит точные копии по всем столбцам — это лёгкий случай и редко настоящий. Дорого обходятся частичные дубликаты: один и тот же заказ, выгруженный дважды с разными отметками времени, один и тот же человек, введённый как «Иванов И.» и «Иванов Иван».",
          "Определи, что означает тождество для твоих данных, и проверяй дублирование по этому подмножеству столбцов. Если у пользователя должна быть одна сессия на момент старта, то проверка — это duplicated(subset=['user_id','started_at']). Какую копию оставить — вопрос предметной области: обычно самую свежую, иногда самую полную.",
          "У категориального текста почти-дубликаты возникают из-за небрежного ввода, а не повторных строк. Нормализация через strip и lower схлопывает «Mobile», « mobile» и «MOBILE» в одну категорию, а value_counts() до и после показывает, сколько категорий ты только что объединил.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Three levels of duplication", ru: "Три уровня дублирования" },
        code: `print("полных дублей:", df.duplicated().sum())

key = ["user_id", "started_at"]
print("дублей по ключу:", df.duplicated(subset=key).sum())
print(df[df.duplicated(subset=key, keep=False)].sort_values(key).head(6))

df = df.sort_values("updated_at").drop_duplicates(subset=key, keep="last")

# почти-дубликаты в категориях
print(df["device"].value_counts())
df["device"] = df["device"].str.strip().str.lower()
print(df["device"].value_counts())     # категорий стало меньше`,
      },
    },
    {
      heading: { en: "Outliers: error, rare event or another population", ru: "Выбросы: ошибка, редкое событие или другая популяция" },
      body: {
        en: [
          "An extreme value is not automatically wrong. There are three possibilities and they call for three different actions. An error — a negative age, a session of a million minutes, a temperature of 999 as a sentinel — should be removed or corrected. A genuine rare event should be kept, because it may be the most informative row you have. A different population — the department head among the staff salaries — means your dataset silently contains two groups, and the right move is to split them, not delete one.",
          "Detection uses the tools from the maths course: the 1.5 × IQR rule, or |z| > 3 for roughly normal data. Both are conventions, and on 10 000 clean normal rows the IQR rule will flag about 70 points by construction. Detection is where the work starts, not where the decision is made.",
          "Whatever you do, record it. A cleaning log with the rule applied, the number of rows affected and the reason turns an arbitrary decision into a defensible one, and it is the difference between a project that survives a question and one that does not.",
        ],
        ru: [
          "Экстремальное значение не является автоматически неверным. Возможностей три, и они требуют трёх разных действий. Ошибка — отрицательный возраст, сессия в миллион минут, температура 999 как заглушка — должна быть удалена или исправлена. Настоящее редкое событие следует сохранить: возможно, это самая информативная строка. Другая популяция — руководитель среди зарплат сотрудников — означает, что датасет незаметно содержит две группы, и правильный ход в том, чтобы их разделить, а не удалить одну.",
          "Обнаружение использует инструменты из курса математики: правило 1,5 × IQR или |z| > 3 для примерно нормальных данных. Оба — соглашения, и на 10 000 чистых нормальных строк правило IQR по построению пометит около 70 точек. Обнаружение — там, где работа начинается, а не там, где принимается решение.",
          "Что бы ты ни сделал, зафиксируй это. Журнал очистки с применённым правилом, числом затронутых строк и причиной превращает произвольное решение в обоснованное, и это разница между проектом, который переживает вопрос, и тем, который не переживает.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Detect, classify, log", ru: "Обнаружить, классифицировать, записать" },
        code: `log = []

def drop_rows(df, mask, reason):
    n = int(mask.sum())
    log.append({"rule": reason, "rows": n, "pct": round(100 * n / len(df), 2)})
    return df.loc[~mask]

# 1. невозможные значения -> ошибка, удаляем
df = drop_rows(df, df["minutes"] <= 0, "minutes <= 0: невозможно")
df = drop_rows(df, df["age"] > 120, "age > 120: ошибка ввода")

# 2. статистические выбросы -> НЕ удаляем, помечаем
q1, q3 = df["minutes"].quantile([.25, .75])
iqr = q3 - q1
df["minutes_outlier"] = df["minutes"] > q3 + 1.5 * iqr
print("помечено:", df["minutes_outlier"].sum(), "— проверить вручную")

print(pd.DataFrame(log))     # журнал очистки идёт в отчёт`,
        out: {
          en: "Errors are dropped, statistical outliers are flagged. Conflating the two is how you delete your most interesting customers.",
          ru: "Ошибки удаляются, статистические выбросы помечаются. Смешать одно с другим — способ удалить своих самых интересных клиентов.",
        },
      },
    },
    {
      heading: { en: "Types and categories", ru: "Типы и категории" },
      body: {
        en: [
          "Cleaning finishes with types. A numeric column parked in object dtype cannot be aggregated; a date left as a string cannot be sorted chronologically or resampled; a low-cardinality text column stored as object wastes memory that the category dtype would reclaim.",
          "pd.to_numeric and pd.to_datetime with errors='coerce' turn unparseable values into NaN instead of raising, which lets you find and inspect exactly which values are the problem rather than fighting the whole column at once.",
          "For modelling later, categorical variables need encoding: one-hot for nominal categories with no order, and an explicit ordered mapping for ordinal ones. Encoding an ordinal scale as arbitrary integers 0, 1, 2 without stating the order assumption is the same mistake as averaging a Likert scale, which the maths course flagged in week 1.",
        ],
        ru: [
          "Очистка заканчивается типами. Числовой столбец, застрявший в dtype object, нельзя агрегировать; дата, оставленная строкой, не сортируется хронологически и не ресемплится; текстовый столбец малой мощности, хранимый как object, тратит память, которую вернул бы dtype category.",
          "pd.to_numeric и pd.to_datetime с errors='coerce' превращают неразбираемые значения в NaN вместо падения, и это позволяет найти и рассмотреть ровно те значения, которые мешают, а не бороться со всем столбцом сразу.",
          "Для последующего моделирования категориальные переменные требуют кодирования: one-hot для номинальных категорий без порядка и явное упорядоченное отображение для порядковых. Закодировать порядковую шкалу произвольными целыми 0, 1, 2, не оговорив допущение о порядке, — та же ошибка, что усреднение шкалы Лайкерта, отмеченная в курсе математики на первой неделе.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Finding what breaks a conversion", ru: "Как найти то, что ломает конвертацию" },
        code: `# что именно мешает столбцу стать числовым
num = pd.to_numeric(df["price"], errors="coerce")
bad = df.loc[df["price"].notna() & num.isna(), "price"]
print(bad.value_counts().head())      # '1 200', '12,5', 'н/д' — вот они

df["price"] = pd.to_numeric(
    df["price"].astype("string").str.replace(" ", "").str.replace(",", "."),
    errors="coerce")

df["started_at"] = pd.to_datetime(df["started_at"], errors="coerce")
df["device"] = df["device"].astype("category")     # экономия памяти

# порядковая шкала: порядок задаём явно
order = ["low", "medium", "high"]
df["level"] = pd.Categorical(df["level"], categories=order, ordered=True)
print(df["level"].cat.codes.head())`,
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a cleaning pipeline you can defend", ru: "Разбор: конвейер очистки, который можно защитить" },
    intro: {
      en: "Raw export, 12 480 rows. Build the cleaning section of the mid-term project so that every decision is visible and counted.",
      ru: "Сырая выгрузка, 12 480 строк. Собери раздел очистки промежуточного проекта так, чтобы каждое решение было видимым и посчитанным.",
    },
    steps: [
      {
        text: { en: "Record the starting state. Every later number is compared against this.", ru: "Зафиксируем исходное состояние. Все последующие числа сравниваются с ним." },
        code: { lang: "python", code: `n0 = len(raw)
print(n0, raw.isna().mean().mean().round(3))` },
      },
      {
        text: { en: "Types first: nothing else can be trusted until a numeric column is numeric.", ru: "Сначала типы: ничему нельзя верить, пока числовой столбец не стал числовым." },
        code: {
          lang: "python",
          code: `df = raw.copy()
df["minutes"] = pd.to_numeric(df["minutes"], errors="coerce")
df["started_at"] = pd.to_datetime(df["started_at"], errors="coerce")
df["device"] = df["device"].astype("string").str.strip().str.lower()`,
        },
      },
      {
        text: { en: "Errors — impossible values — are removed and logged with their reason.", ru: "Ошибки — невозможные значения — удаляются и записываются в журнал с причиной." },
        code: {
          lang: "python",
          code: `df = drop_rows(df, df["minutes"].le(0), "minutes <= 0")
df = drop_rows(df, df["minutes"].gt(24 * 60), "сессия > суток")
df = drop_rows(df, df["started_at"].isna(), "не удалось разобрать дату")`,
        },
      },
      {
        text: { en: "Duplicates by business key, keeping the latest version of each record.", ru: "Дубликаты по бизнес-ключу, оставляем последнюю версию каждой записи." },
        code: {
          lang: "python",
          code: `key = ["user_id", "started_at"]
d = df.duplicated(subset=key).sum()
log.append({"rule": "дубли по (user_id, started_at)", "rows": int(d),
            "pct": round(100 * d / len(df), 2)})
df = df.sort_values("updated_at").drop_duplicates(subset=key, keep="last")`,
        },
      },
      {
        text: { en: "Missing values: an indicator plus a defensible fill, never a bare mean.", ru: "Пропуски: индикатор плюс обоснованное заполнение, никакого голого среднего." },
        code: {
          lang: "python",
          code: `df["country_missing"] = df["country"].isna().astype(int)
df["country"] = df["country"].fillna("неизвестно")
print(df.groupby("country_missing")["minutes"].median())   # различаются?`,
        },
      },
      {
        text: { en: "Close the section with the balance sheet. This table goes into the report.", ru: "Закрываем раздел балансом. Эта таблица идёт в отчёт." },
        code: {
          lang: "python",
          code: `print(pd.DataFrame(log))
print(f"было {n0}, стало {len(df)}, потеряно {100*(1-len(df)/n0):.1f}%")
assert len(df) > 0.9 * n0, "потеряно больше 10% — надо объяснить"`,
        },
      },
    ],
    conclusion: {
      en: "Six steps, each counted, each with a reason. When someone asks why the row count dropped from 12 480 to 11 903, the answer is a table. That is the difference between cleaning and quietly deleting inconvenient data.",
      ru: "Шесть шагов, каждый посчитан, у каждого причина. Когда спросят, почему число строк упало с 12 480 до 11 903, ответом будет таблица. В этом и разница между очисткой и тихим удалением неудобных данных.",
    },
  },
  exercises: [
    {
      q: { en: "A column is 40 % missing. Your colleague fills it with the mean. Name two things that breaks.", ru: "Столбец пуст на 40 %. Коллега заполняет его средним. Назови две вещи, которые ломаются." },
      a: { en: "First, the variance collapses: 40 % of the values become identical, so the standard deviation falls sharply and any confidence interval or test built on it is overconfident. Second, correlations with other variables are diluted towards zero, because 40 % of the pairs now carry a constant. On top of that, at 40 % missing the real question is whether the column should be used at all, or whether the missingness itself is the variable worth modelling.", ru: "Во-первых, схлопывается дисперсия: 40 % значений становятся одинаковыми, стандартное отклонение резко падает, и любой доверительный интервал или тест на его основе оказывается самоуверенным. Во-вторых, корреляции с другими переменными разбавляются к нулю, потому что 40 % пар теперь несут константу. Вдобавок при 40 % пропусков настоящий вопрос в том, стоит ли вообще использовать этот столбец или моделировать надо сам факт пропуска." },
    },
    {
      q: { en: "df.duplicated().sum() returns 0, but you are sure orders were exported twice. What now?", ru: "df.duplicated().sum() возвращает 0, но ты уверен, что заказы выгрузились дважды. Что дальше?" },
      a: { en: "Exact duplication is being broken by a column that differs between the copies — an export timestamp, a surrogate row id, a load batch number. Check duplication on the business key instead: df.duplicated(subset=['order_id']).sum(). If that is non-zero, inspect a pair with df[df.duplicated('order_id', keep=False)].sort_values('order_id') to see which column actually differs.", ru: "Точное дублирование ломает столбец, который у копий различается: отметка времени выгрузки, суррогатный идентификатор строки, номер партии загрузки. Проверяй дублирование по бизнес-ключу: df.duplicated(subset=['order_id']).sum(). Если не ноль, посмотри пару через df[df.duplicated('order_id', keep=False)].sort_values('order_id') и увидишь, какой столбец на самом деле отличается." },
    },
    {
      q: { en: "The IQR rule flags 3 % of your rows. Do you delete them?", ru: "Правило IQR помечает 3 % твоих строк. Удалять?" },
      a: { en: "Not on that basis alone. Three per cent is above the roughly 0.7 % you would expect from clean normal data, which suggests either a heavy-tailed distribution or a second population mixed in — both interesting findings, not garbage. Look at the flagged rows: if they share a country, a device or a time window, you have found a subgroup. Delete only values that are impossible, and flag the rest.", ru: "Только на этом основании — нет. Три процента выше примерно 0,7 %, ожидаемых от чистых нормальных данных, а это указывает либо на тяжёлые хвосты, либо на подмешанную вторую популяцию — и то и другое интересные находки, а не мусор. Посмотри помеченные строки: если у них общая страна, устройство или временное окно, ты нашёл подгруппу. Удаляй только невозможные значения, остальное помечай." },
    },
    {
      q: { en: "pd.to_numeric raises on a column. How do you find the offending values without reading 50 000 rows?", ru: "pd.to_numeric падает на столбце. Как найти проблемные значения, не читая 50 000 строк?" },
      a: { en: "Convert with errors='coerce' into a temporary Series, then select the rows where the original is present but the converted value is NaN: bad = df.loc[df.col.notna() & pd.to_numeric(df.col, errors='coerce').isna(), 'col']. Running value_counts() on that shows the distinct offending forms — usually thousands separators, comma decimals or a placeholder string — and you fix a handful of patterns rather than inspecting rows.", ru: "Сконвертируй с errors='coerce' во временную Series, затем выбери строки, где оригинал есть, а сконвертированное значение NaN: bad = df.loc[df.col.notna() & pd.to_numeric(df.col, errors='coerce').isna(), 'col']. value_counts() по ней покажет различные проблемные формы — обычно разделители тысяч, запятые вместо точек или строка-заглушка, — и ты чинишь несколько шаблонов, а не разглядываешь строки." },
    },
    {
      q: { en: "Why is an is_missing indicator column often more valuable than the imputed value itself?", ru: "Почему столбец-индикатор is_missing часто ценнее самого импутированного значения?" },
      a: { en: "Because the fact of absence can carry signal that the fill destroys. If people who decline to state their income differ systematically from those who state it, the indicator captures that difference while the imputed number pretends it does not exist. Keeping both lets a model use the pattern of missingness as information, and it makes your handling transparent to whoever reads the notebook.", ru: "Потому что сам факт отсутствия может нести сигнал, который заполнение уничтожает. Если люди, отказавшиеся назвать доход, систематически отличаются от назвавших, индикатор фиксирует это различие, а импутированное число делает вид, что различия нет. Хранение обоих позволяет модели использовать структуру пропусков как информацию и делает твою обработку прозрачной для читателя ноутбука." },
    },
    {
      q: { en: "Your notebook works. Name three things to check before submitting.", ru: "Ноутбук работает. Назови три вещи, которые надо проверить перед сдачей." },
      a: { en: "One: Restart Kernel and Run All, so the grader's clean run matches yours. Two: all paths relative and data included or downloadable, so the notebook is not tied to your machine. Three: every output followed by a sentence of interpretation, and a markdown structure with the question, the cleaning log, the analysis, the findings and the limitations. A fourth worth adding is a fixed random seed wherever randomness is used.", ru: "Первое: Restart Kernel и Run All, чтобы чистый запуск у проверяющего совпал с твоим. Второе: все пути относительные, данные приложены или скачиваются, чтобы ноутбук не был привязан к твоей машине. Третье: у каждого вывода предложение с интерпретацией, а разметка markdown содержит вопрос, журнал очистки, анализ, результаты и ограничения. Четвёртым стоит добавить фиксированный seed везде, где используется случайность." },
    },
  ],
  checklist: {
    en: [
      "My mid-term project is submitted and it runs from a clean kernel",
      "Every row I removed is counted in a cleaning log with its reason",
      "I distinguished errors from statistical outliers and treated them differently",
      "I can name the missingness mechanism for each column I filled",
      "Every output in the notebook has a sentence of interpretation next to it",
    ],
    ru: [
      "Промежуточный проект сдан и запускается с чистого ядра",
      "Каждая удалённая строка посчитана в журнале очистки с причиной",
      "Отличил ошибки от статистических выбросов и обошёлся с ними по-разному",
      "Могу назвать механизм пропуска для каждого заполненного столбца",
      "У каждого вывода в ноутбуке рядом есть предложение с интерпретацией",
    ],
  },
};
