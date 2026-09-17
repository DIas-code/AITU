import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 8,
  minutes: 65,
  title: { en: "Python and databases: ETL", ru: "Python и базы данных: ETL" },
  summary: {
    en: "Connecting pandas to SQL, why you never build a query with string formatting, and how to assemble a pipeline that can be re-run without fear.",
    ru: "Как связать pandas с SQL, почему запрос никогда не собирают форматированием строк и как построить конвейер, который можно перезапускать без страха.",
  },
  goals: {
    en: [
      "Read and write between pandas and a database with SQLAlchemy",
      "Use parameterised queries and explain what SQL injection is",
      "Decide what belongs in SQL and what belongs in pandas",
      "Build an idempotent pipeline with logging and validation at each step",
    ],
    ru: [
      "Читать и писать между pandas и базой через SQLAlchemy",
      "Использовать параметризованные запросы и объяснять, что такое SQL-инъекция",
      "Решать, что делать на стороне SQL, а что на стороне pandas",
      "Строить идемпотентный конвейер с логированием и проверками на каждом шаге",
    ],
  },
  sections: [
    {
      heading: { en: "The connection", ru: "Соединение" },
      body: {
        en: [
          "SQLAlchemy gives one interface over every database, so the same code works against SQLite in your notebook and PostgreSQL on a server with only the connection string changing. pandas reads through it with read_sql and writes with to_sql.",
          "Use a context manager for the connection so it is closed even when something raises. Never put a password in the notebook: read it from an environment variable, and make sure the notebook you submit does not contain credentials — that is a security issue and, in a graded project, an easy way to lose marks.",
          "For anything beyond a few hundred thousand rows, read in chunks. read_sql with chunksize returns an iterator of frames, which lets you aggregate a table larger than memory without loading it whole.",
        ],
        ru: [
          "SQLAlchemy даёт единый интерфейс ко всем базам, поэтому один и тот же код работает и с SQLite в твоём ноутбуке, и с PostgreSQL на сервере — меняется только строка подключения. pandas читает через него функцией read_sql и пишет функцией to_sql.",
          "Используй контекстный менеджер для соединения, чтобы оно закрывалось даже при исключении. Никогда не клади пароль в ноутбук: читай его из переменной окружения и проследи, чтобы сдаваемый ноутбук не содержал учётных данных — это вопрос безопасности и, в оцениваемом проекте, лёгкий способ потерять баллы.",
          "Для объёмов больше нескольких сотен тысяч строк читай порциями. read_sql с chunksize возвращает итератор фреймов, что позволяет агрегировать таблицу больше объёма памяти, не загружая её целиком.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Connect, read, write", ru: "Подключиться, прочитать, записать" },
        code: `import os
import pandas as pd
from sqlalchemy import create_engine, text

# SQLite — файл рядом с ноутбуком
engine = create_engine("sqlite:///data/shop.db")

# PostgreSQL — пароль из окружения, не из кода
# engine = create_engine(f"postgresql+psycopg://user:{os.environ['DB_PASS']}@host/db")

with engine.connect() as conn:
    df = pd.read_sql(text("SELECT * FROM orders WHERE created_at >= :d"),
                     conn, params={"d": "2026-01-01"}, parse_dates=["created_at"])

print(df.shape)

# запись результата обратно
df.to_sql("orders_clean", engine, if_exists="replace", index=False)

# большая таблица — по частям
total = 0
for chunk in pd.read_sql("SELECT * FROM big_table", engine, chunksize=100_000):
    total += chunk["amount"].sum()
print(total)`,
        out: {
          en: "if_exists takes 'fail', 'replace' or 'append'. 'replace' drops the table and loses its indexes and constraints — fine for a scratch result, wrong for a production table.",
          ru: "У if_exists три значения: 'fail', 'replace', 'append'. Значение 'replace' удаляет таблицу вместе с её индексами и ограничениями — годится для черновика, не годится для рабочей таблицы.",
        },
      },
    },
    {
      heading: { en: "Parameterised queries and injection", ru: "Параметризованные запросы и инъекция" },
      body: {
        en: [
          "Building a query by pasting a value into a string is the single most dangerous habit in this course. If the value comes from outside — a form, a file, a URL — it can close the quote and append its own SQL. That is injection, and it is how databases get dumped or dropped.",
          "A parameterised query sends the SQL text and the values separately. The database compiles the statement first and then binds the values, so a value can never be parsed as code no matter what it contains. It is not a matter of escaping quotes carefully; the value never reaches the parser at all.",
          "There is a second, everyday benefit. The database can cache the compiled plan and reuse it across calls with different values, so a parameterised query in a loop is also faster than a freshly built string each time.",
        ],
        ru: [
          "Сборка запроса вставкой значения в строку — самая опасная привычка в этом курсе. Если значение пришло извне — из формы, файла, URL, — оно может закрыть кавычку и дописать свой SQL. Это инъекция, и именно так базы выгружают или удаляют.",
          "Параметризованный запрос передаёт текст SQL и значения по отдельности. База сначала компилирует оператор и лишь потом подставляет значения, поэтому значение не может быть разобрано как код, что бы в нём ни было. Дело не в аккуратном экранировании кавычек: значение вообще не доходит до разборщика.",
          "Есть и вторая, будничная выгода. База может закешировать скомпилированный план и переиспользовать его при вызовах с разными значениями, поэтому параметризованный запрос в цикле ещё и быстрее заново собираемой строки.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "The wrong way and the right way", ru: "Неправильно и правильно" },
        code: `# НИКОГДА так не делай
name = "O'Brien"                     # апостроф уже ломает запрос
q = f"SELECT * FROM customers WHERE name = '{name}'"   # SyntaxError в SQL

name = "x'; DROP TABLE customers; --"                  # а это уже атака
q = f"SELECT * FROM customers WHERE name = '{name}'"

# ВСЕГДА так
with engine.connect() as conn:
    df = pd.read_sql(
        text("SELECT * FROM customers WHERE name = :n AND city = :c"),
        conn, params={"n": name, "c": "Astana"})

# список значений
ids = [1, 5, 9]
with engine.connect() as conn:
    df = pd.read_sql(text("SELECT * FROM orders WHERE customer_id IN :ids")
                     .bindparams(ids=tuple(ids)), conn)`,
        out: {
          en: "The apostrophe in O'Brien is handled automatically, which is the everyday reason to parameterise even when there is no attacker.",
          ru: "Апостроф в O'Brien обрабатывается автоматически — это будничная причина параметризовать даже когда никакого злоумышленника нет.",
        },
      },
      pitfall: {
        en: "Table and column names cannot be parameterised — parameters bind values, not identifiers. If a name must be dynamic, validate it against an allow-list of known columns rather than interpolating it.",
        ru: "Имена таблиц и столбцов параметризовать нельзя: параметры связывают значения, а не идентификаторы. Если имя должно быть динамическим, проверяй его по белому списку известных столбцов, а не подставляй интерполяцией.",
      },
    },
    {
      heading: { en: "What belongs in SQL, what belongs in pandas", ru: "Что делать в SQL, а что в pandas" },
      body: {
        en: [
          "The guiding principle is to move as little data as possible across the wire. Filtering, joining and aggregating are what a database is built for, and it does them on indexed data close to the disk. Pulling a million rows into Python to compute a mean of ten groups wastes memory, time and bandwidth.",
          "So push down: WHERE conditions, joins, GROUP BY, and any reduction that shrinks the result. Keep in pandas: anything iterative or exploratory, statistical work that SQL does not express well, plotting, machine learning, and transformations that are simply clearer in Python.",
          "The practical shape of most projects is a single SQL query that returns a few thousand aggregated rows, followed by analysis in pandas on that small frame. If your notebook starts with SELECT * FROM a large table, that is usually the first thing to fix.",
        ],
        ru: [
          "Ведущий принцип — перемещать по сети как можно меньше данных. Фильтрация, соединение и агрегация — то, ради чего база создана, и она делает это на индексированных данных рядом с диском. Вытянуть миллион строк в Python, чтобы посчитать среднее по десяти группам, значит потратить впустую память, время и канал.",
          "Поэтому спускай вниз: условия WHERE, соединения, GROUP BY и любое сокращение, уменьшающее результат. Оставляй в pandas: всё итеративное и исследовательское, статистику, которую SQL плохо выражает, графики, машинное обучение и преобразования, которые на Python просто понятнее.",
          "Практическая форма большинства проектов — один SQL-запрос, возвращающий несколько тысяч агрегированных строк, и затем анализ в pandas по этому небольшому фрейму. Если твой ноутбук начинается с SELECT * по большой таблице, обычно это первое, что надо починить.",
        ],
      },
      key: {
        en: "Aggregate in the database, analyse in pandas. The query should return the smallest table that answers the question.",
        ru: "Агрегируй в базе, анализируй в pandas. Запрос должен возвращать наименьшую таблицу, отвечающую на вопрос.",
      },
    },
    {
      heading: { en: "A pipeline you can re-run", ru: "Конвейер, который можно перезапускать" },
      body: {
        en: [
          "ETL is three steps: extract from the source, transform into the shape you need, load into the destination. What separates a pipeline from a script is that it can be run twice without doing damage — that property is called idempotence.",
          "A pipeline that appends rows on every run will silently double your data the second time. Make it idempotent by replacing a partition rather than appending, or by using an upsert keyed on a unique column, or at minimum by deleting the rows for the period you are about to reload before loading them.",
          "Two more things separate a pipeline from a script. Logging, so that when it fails at three in the morning you can tell which step and which row. And validation between steps, so that a broken extract fails loudly instead of quietly loading zero rows over yesterday's good data.",
        ],
        ru: [
          "ETL — это три шага: извлечь из источника, преобразовать в нужную форму, загрузить в приёмник. Конвейер отличается от скрипта тем, что его можно запустить дважды без ущерба; это свойство называется идемпотентностью.",
          "Конвейер, дописывающий строки при каждом запуске, во второй раз молча удвоит твои данные. Сделай его идемпотентным: заменяй раздел вместо дописывания, используй upsert по уникальному ключу или хотя бы удаляй строки за период, который собираешься перезагрузить, перед загрузкой.",
          "Ещё две вещи отличают конвейер от скрипта. Логирование, чтобы при падении в три часа ночи можно было понять, какой шаг и какая строка. И проверки между шагами, чтобы сломанное извлечение падало громко, а не тихо загружало ноль строк поверх вчерашних хороших данных.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Extract, transform, load — with guard rails", ru: "Извлечение, преобразование, загрузка — с перилами" },
        code: `import logging
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("etl")

def extract(engine, day):
    with engine.connect() as conn:
        df = pd.read_sql(text("""
            SELECT o.order_id, o.customer_id, o.created_at, oi.qty, p.price
            FROM   orders o
            JOIN   order_items oi ON oi.order_id = o.order_id
            JOIN   products    p  ON p.product_id = oi.product_id
            WHERE  o.created_at >= :d AND o.created_at < :d2
        """), conn, params={"d": day, "d2": day + pd.Timedelta(days=1)})
    log.info("extract: %s строк за %s", len(df), day.date())
    if df.empty:
        raise ValueError(f"пустое извлечение за {day.date()} — проверь источник")
    return df

def transform(df):
    before = len(df)
    df = df.dropna(subset=["customer_id", "price"])
    df["revenue"] = df["qty"] * df["price"]
    out = (df.groupby(["created_at", "customer_id"], as_index=False)
             .agg(orders=("order_id", "nunique"), revenue=("revenue", "sum")))
    log.info("transform: %s -> %s строк", before, len(out))
    assert out["revenue"].ge(0).all(), "отрицательная выручка"
    return out

def load(engine, df, day):
    with engine.begin() as conn:                 # транзакция: всё или ничего
        conn.execute(text("DELETE FROM daily_revenue WHERE day = :d"),
                     {"d": day.date()})          # идемпотентность
        df.to_sql("daily_revenue", conn, if_exists="append", index=False)
    log.info("load: записано %s строк", len(df))

day = pd.Timestamp("2026-09-07")
load(engine, transform(extract(engine, day)), day)`,
        out: {
          en: "engine.begin() opens a transaction: if the insert fails, the delete rolls back too, so you never end up with the old rows gone and the new ones missing.",
          ru: "engine.begin() открывает транзакцию: если вставка упадёт, удаление тоже откатится, и ты никогда не окажешься в состоянии, где старых строк уже нет, а новых ещё нет.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: the end-term project skeleton", ru: "Разбор: скелет итогового проекта" },
    intro: {
      en: "The end-term project is due next week and wants an end-to-end path: raw data, database, analysis. Here is the shape, with the checks that make it defensible.",
      ru: "Итоговый проект сдаётся на следующей неделе и требует сквозного пути: сырые данные, база, анализ. Вот его форма вместе с проверками, которые делают его защитимым.",
    },
    steps: [
      {
        text: { en: "Create the schema from a file, not from cells scattered through the notebook. It is then reproducible and reviewable.", ru: "Создаём схему из файла, а не из ячеек, разбросанных по ноутбуку. Тогда она воспроизводима и её можно вычитать." },
        code: {
          lang: "python",
          code: `from pathlib import Path
with engine.begin() as conn:
    for stmt in Path("sql/schema.sql").read_text(encoding="utf-8").split(";"):
        if stmt.strip():
            conn.execute(text(stmt))`,
        },
      },
      {
        text: { en: "Load the raw CSV into staging tables, cleaning types on the way in.", ru: "Загружаем сырые CSV в промежуточные таблицы, приводя типы по дороге." },
        code: {
          lang: "python",
          code: `raw = pd.read_csv("data/orders.csv", dtype={"customer_id": "string"},
                  parse_dates=["created_at"], na_values=["", "NA", "-"])
raw.to_sql("stg_orders", engine, if_exists="replace", index=False)
log.info("stg_orders: %s строк", len(raw))`,
        },
      },
      {
        text: { en: "Validate before promoting staging to the real tables. A failed assertion here is far cheaper than a wrong conclusion later.", ru: "Проверяем до перевода промежуточных данных в основные таблицы. Упавшая проверка здесь много дешевле неверного вывода потом." },
        code: {
          lang: "python",
          code: `with engine.connect() as conn:
    checks = pd.read_sql(text("""
        SELECT COUNT(*)                                   AS rows,
               COUNT(DISTINCT order_id)                   AS uniq_orders,
               SUM(CASE WHEN customer_id IS NULL THEN 1 ELSE 0 END) AS no_customer,
               SUM(CASE WHEN total < 0 THEN 1 ELSE 0 END) AS negative
        FROM   stg_orders
    """), conn)
print(checks)
assert checks.loc[0, "rows"] == checks.loc[0, "uniq_orders"], "дубли order_id"
assert checks.loc[0, "negative"] == 0, "отрицательные суммы"`,
        },
      },
      {
        text: { en: "Aggregate in SQL, returning a small frame. This is the query the report is built on.", ru: "Агрегируем в SQL, возвращая небольшой фрейм. Это и есть запрос, на котором строится отчёт." },
        code: {
          lang: "python",
          code: `with engine.connect() as conn:
    monthly = pd.read_sql(text("""
        SELECT   DATE_TRUNC('month', o.created_at) AS month,
                 c.country,
                 COUNT(DISTINCT o.order_id)  AS orders,
                 SUM(oi.qty * p.price)       AS revenue
        FROM     orders o
        JOIN     customers c  ON c.customer_id = o.customer_id
        JOIN     order_items oi ON oi.order_id = o.order_id
        JOIN     products p   ON p.product_id = oi.product_id
        WHERE    o.created_at >= :since
        GROUP BY 1, 2
    """), conn, params={"since": "2026-01-01"}, parse_dates=["month"])
print(monthly.shape)     # тысячи строк, не миллионы`,
        },
      },
      {
        text: { en: "Analyse in pandas on the small frame — this is where next week's charts come from.", ru: "Анализируем в pandas по небольшому фрейму — отсюда и возьмутся графики следующей недели." },
        code: {
          lang: "python",
          code: `pivot = monthly.pivot_table(index="month", columns="country",
                            values="revenue", aggfunc="sum", fill_value=0)
growth = pivot.pct_change().round(3)
print(growth.tail())`,
        },
      },
    ],
    conclusion: {
      en: "Schema in a file, staging tables, assertions before promotion, aggregation pushed into SQL, analysis in pandas. The whole thing runs top to bottom on a clean kernel and fails loudly rather than quietly. That structure is most of what the end-term project is marked on.",
      ru: "Схема в файле, промежуточные таблицы, проверки перед переводом в основные, агрегация спущена в SQL, анализ в pandas. Всё это проходит сверху донизу на чистом ядре и падает громко, а не тихо. Именно за такую структуру в основном и ставят оценку за итоговый проект.",
    },
  },
  exercises: [
    {
      q: { en: "Why is f\"SELECT * FROM t WHERE id = {user_input}\" dangerous even for an internal tool?", ru: "Почему f\"SELECT * FROM t WHERE id = {user_input}\" опасно даже во внутреннем инструменте?" },
      a: { en: "Because the value is parsed as part of the SQL text. A value like 1; DROP TABLE t executes a second statement, and a value containing an apostrophe breaks the query outright even with no malice involved. Parameterised queries send text and values separately, so the value is bound after compilation and can never become code. The everyday argument is as strong as the security one: names like O'Brien stop being a problem.", ru: "Потому что значение разбирается как часть текста SQL. Значение вроде 1; DROP TABLE t выполнит второй оператор, а значение с апострофом сломает запрос и вовсе без всякого злого умысла. Параметризованные запросы передают текст и значения раздельно, поэтому значение связывается после компиляции и кодом стать не может. Будничный аргумент здесь не слабее аргумента о безопасности: фамилии вроде O'Brien перестают быть проблемой." },
    },
    {
      q: { en: "Your pipeline appends to a table daily. You re-run yesterday's job. What happens and how do you prevent it?", ru: "Твой конвейер ежедневно дописывает в таблицу. Ты перезапускаешь вчерашнюю задачу. Что произойдёт и как это предотвратить?" },
      a: { en: "Yesterday's rows are inserted a second time, so every aggregate over that day is now doubled and nothing raises an error. Make the load idempotent: delete the rows for the target period inside the same transaction before inserting, or use an upsert keyed on a unique constraint. Wrapping delete and insert in one transaction means a failure leaves the old data intact rather than removing it and failing to replace it.", ru: "Вчерашние строки вставятся второй раз, поэтому любой агрегат за этот день удвоится, и никакой ошибки не возникнет. Сделай загрузку идемпотентной: удаляй строки за целевой период в той же транзакции перед вставкой либо используй upsert по уникальному ограничению. Обёртывание удаления и вставки в одну транзакцию означает, что при сбое старые данные останутся на месте, а не исчезнут без замены." },
    },
    {
      q: { en: "You need the average order value by country from 40 million rows. Where do you compute it?", ru: "Нужна средняя сумма заказа по странам из 40 миллионов строк. Где считать?" },
      a: { en: "In SQL. GROUP BY country returns perhaps two hundred rows, which pandas then handles instantly. Pulling 40 million rows into Python to compute two hundred numbers wastes memory and network for no benefit, and may not fit at all. The general rule is that any operation which shrinks the data belongs in the database; analysis on the shrunken result belongs in pandas.", ru: "В SQL. GROUP BY country вернёт, может быть, две сотни строк, и pandas обработает их мгновенно. Вытягивать 40 миллионов строк в Python ради двухсот чисел значит впустую тратить память и сеть без всякой пользы, а может и вовсе не поместиться. Общее правило: любая операция, уменьшающая данные, принадлежит базе; анализ уменьшенного результата принадлежит pandas." },
    },
    {
      q: { en: "df.to_sql('orders', engine, if_exists='replace') on a production table. What did you just destroy?", ru: "df.to_sql('orders', engine, if_exists='replace') по рабочей таблице. Что ты только что уничтожил?" },
      a: { en: "The table itself, along with its indexes, constraints, foreign keys and any rows not present in your frame. 'replace' drops and recreates from the DataFrame's inferred schema, so column types are guessed and every guarantee the schema encoded is gone. Use 'append' into a table you created with explicit DDL, and write to a staging table rather than the real one while developing.", ru: "Саму таблицу вместе с её индексами, ограничениями, внешними ключами и всеми строками, которых нет в твоём фрейме. Режим 'replace' удаляет и пересоздаёт таблицу по выведенной из DataFrame схеме, поэтому типы столбцов угадываются, а все гарантии, закодированные в схеме, исчезают. Используй 'append' в таблицу, созданную явным DDL, а во время разработки пиши в промежуточную таблицу, а не в настоящую." },
    },
    {
      q: { en: "Why wrap the delete and the insert in one transaction?", ru: "Зачем оборачивать удаление и вставку в одну транзакцию?" },
      a: { en: "So the pair is atomic. If the insert fails after the delete has run, a transaction rolls both back and the table keeps yesterday's data; without one, you are left with the old rows deleted and the new ones never written, which is worse than either state alone. Transactions give all-or-nothing semantics, and any multi-statement change to real data should be inside one.", ru: "Чтобы пара была атомарной. Если вставка упадёт после выполненного удаления, транзакция откатит обе операции и таблица сохранит вчерашние данные; без неё ты останешься со старыми строками удалёнными, а новыми ненаписанными, что хуже любого из двух состояний по отдельности. Транзакции дают семантику «всё или ничего», и любое многооператорное изменение реальных данных должно происходить внутри одной." },
    },
  ],
  checklist: {
    en: [
      "Every query in my notebook is parameterised; there is no f-string SQL anywhere",
      "No credentials appear in any file I am going to submit",
      "My aggregation happens in SQL and pandas receives a small frame",
      "My load step is idempotent and wrapped in a transaction",
      "The end-term project runs end to end from schema creation to final table",
    ],
    ru: [
      "Каждый запрос в ноутбуке параметризован; нигде нет SQL, собранного f-строкой",
      "Ни в одном сдаваемом файле нет учётных данных",
      "Агрегация происходит в SQL, а pandas получает небольшой фрейм",
      "Шаг загрузки идемпотентен и обёрнут в транзакцию",
      "Итоговый проект проходит сквозь от создания схемы до финальной таблицы",
    ],
  },
};
