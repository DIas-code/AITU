import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 7,
  minutes: 70,
  title: { en: "SQL II: schema design and optimisation", ru: "SQL II: проектирование и оптимизация схем" },
  summary: {
    en: "Normal forms as a cure for update anomalies, constraints that make bad data impossible, indexes and what they cost, and how to read a query plan.",
    ru: "Нормальные формы как лекарство от аномалий обновления, ограничения, делающие плохие данные невозможными, индексы и их цена, и как читать план выполнения.",
  },
  goals: {
    en: [
      "Name the three update anomalies and show how normalisation removes them",
      "Bring a table to 3NF and say which dependency each step eliminated",
      "Choose constraints so that invalid data cannot be inserted at all",
      "Read an EXPLAIN plan and tell a sequential scan from an index scan",
    ],
    ru: [
      "Называть три аномалии обновления и показывать, как нормализация их устраняет",
      "Приводить таблицу к 3НФ и говорить, какую зависимость устранил каждый шаг",
      "Подбирать ограничения так, чтобы некорректные данные нельзя было вставить вовсе",
      "Читать план EXPLAIN и отличать последовательное сканирование от индексного",
    ],
  },
  sections: [
    {
      heading: { en: "Why normalise: three anomalies", ru: "Зачем нормализовать: три аномалии" },
      body: {
        en: [
          "Normalisation is not an aesthetic exercise. It exists to remove three concrete failures that appear whenever the same fact is stored in more than one place.",
          "The update anomaly: a customer changes address, the address is repeated on 400 order rows, you update 399 of them, and the database now holds two contradictory truths. The insertion anomaly: you cannot record a new product until somebody orders it, because product details live only in the orders table. The deletion anomaly: deleting the last order for a product erases the product itself.",
          "All three have the same root — one fact stored many times. Normalisation splits tables so that every fact lives in exactly one place, and the relationships are carried by keys rather than by repetition.",
        ],
        ru: [
          "Нормализация — не эстетическое упражнение. Она существует, чтобы устранить три конкретных сбоя, возникающих всякий раз, когда один и тот же факт хранится более чем в одном месте.",
          "Аномалия обновления: клиент меняет адрес, адрес повторён в 400 строках заказов, ты обновляешь 399 из них, и база хранит две противоречащие истины. Аномалия вставки: невозможно записать новый товар, пока кто-нибудь его не закажет, потому что сведения о товарах живут только в таблице заказов. Аномалия удаления: удаление последнего заказа с товаром стирает и сам товар.",
          "У всех трёх один корень — один факт, хранимый многократно. Нормализация разделяет таблицы так, чтобы каждый факт жил ровно в одном месте, а связи несли ключи, а не повторение.",
        ],
      },
      key: {
        en: "One fact, one place. If updating something requires changing more than one row, the schema is wrong.",
        ru: "Один факт — одно место. Если обновление чего-либо требует изменить больше одной строки, схема неверна.",
      },
    },
    {
      heading: { en: "1NF, 2NF, 3NF", ru: "1НФ, 2НФ, 3НФ" },
      body: {
        en: [
          "First normal form: every cell holds one atomic value and there are no repeating groups. A column containing 'python, sql, git' violates it, and so do columns named phone1, phone2, phone3. The fix is a separate row per value, which usually means a new table.",
          "Second normal form: 1NF, plus every non-key column depends on the whole primary key rather than part of it. This only bites when the key is composite. In a table keyed by (order_id, product_id), the product name depends on product_id alone, so it does not belong there — it belongs in a products table.",
          "Third normal form: 2NF, plus no non-key column depends on another non-key column. If a table holds employee_id, department_id and department_name, then department_name depends on department_id, which is not the key. That is a transitive dependency, and it goes to a departments table.",
          "The informal summary, worth memorising for the exam: every non-key attribute depends on the key, the whole key, and nothing but the key.",
        ],
        ru: [
          "Первая нормальная форма: в каждой ячейке одно атомарное значение и нет повторяющихся групп. Столбец со значением «python, sql, git» её нарушает, как и столбцы с именами phone1, phone2, phone3. Лечится отдельной строкой на значение, что обычно означает новую таблицу.",
          "Вторая нормальная форма: 1НФ плюс каждый неключевой столбец зависит от всего первичного ключа, а не от его части. Это проявляется только при составном ключе. В таблице с ключом (order_id, product_id) название товара зависит только от product_id, поэтому ему там не место — его место в таблице товаров.",
          "Третья нормальная форма: 2НФ плюс ни один неключевой столбец не зависит от другого неключевого. Если таблица содержит employee_id, department_id и department_name, то department_name зависит от department_id, который ключом не является. Это транзитивная зависимость, и она уходит в таблицу отделов.",
          "Неформальная сводка, которую стоит запомнить к экзамену: каждый неключевой атрибут зависит от ключа, от всего ключа и ни от чего, кроме ключа.",
        ],
      },
      code: {
        lang: "sql",
        caption: { en: "One denormalised table becomes four", ru: "Одна ненормализованная таблица превращается в четыре" },
        code: `-- БЫЛО: всё в одной таблице, каждый факт повторяется
-- orders_flat(order_id, product_id, product_name, price,
--             customer_name, customer_city, qty)

-- СТАЛО: 3НФ
CREATE TABLE customers (
    customer_id  INTEGER PRIMARY KEY,
    name         TEXT NOT NULL,
    city_id      INTEGER REFERENCES cities(city_id)
);

CREATE TABLE products (
    product_id   INTEGER PRIMARY KEY,
    name         TEXT NOT NULL,
    price        NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
    order_id     INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(customer_id),
    created_at   TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE order_items (               -- связующая таблица многие-ко-многим
    order_id     INTEGER REFERENCES orders(order_id),
    product_id   INTEGER REFERENCES products(product_id),
    qty          INTEGER NOT NULL CHECK (qty > 0),
    PRIMARY KEY (order_id, product_id)
);`,
        out: {
          en: "Now a price change is one UPDATE on one row, and a product can exist before anyone orders it. Both anomalies are gone by construction.",
          ru: "Теперь изменение цены — один UPDATE одной строки, а товар может существовать до того, как его закажут. Обе аномалии устранены по построению.",
        },
      },
      pitfall: {
        en: "Normalisation is not always the goal. Analytical warehouses deliberately denormalise into star schemas, because a report that joins eight tables is slower and harder to write than one that joins two. Normalise the system that writes, denormalise the copy that reads.",
        ru: "Нормализация не всегда цель. Аналитические хранилища намеренно денормализуют в схемы «звезда», потому что отчёт, соединяющий восемь таблиц, медленнее и сложнее в написании, чем соединяющий две. Нормализуй систему, которая пишет; денормализуй копию, которая читает.",
      },
    },
    {
      heading: { en: "Constraints: making bad data impossible", ru: "Ограничения: как сделать плохие данные невозможными" },
      body: {
        en: [
          "Every constraint you declare is a class of bug that can never reach your data. NOT NULL forbids missing values where they make no sense. UNIQUE forbids duplicates — and it is what makes a join key trustworthy. CHECK enforces a rule on values, so a negative quantity or a price below zero is rejected at insertion. DEFAULT fills a value when none is supplied.",
          "FOREIGN KEY is the strongest of them. It guarantees that a referenced row exists, and its ON DELETE clause decides what happens when the parent goes: CASCADE deletes the children too, RESTRICT refuses the deletion, SET NULL orphans them deliberately. Choosing this consciously is part of design — the default of doing nothing tends to produce rows pointing at things that no longer exist.",
          "The argument for pushing these into the database rather than the application is simple: the application is not the only thing that writes. A migration script, a colleague's notebook or a manual fix at 2 a.m. all bypass your Python validation, and none of them bypass a CHECK constraint.",
        ],
        ru: [
          "Каждое объявленное ограничение — класс багов, который никогда не доберётся до твоих данных. NOT NULL запрещает пропуски там, где они бессмысленны. UNIQUE запрещает дубли — и именно он делает ключ соединения надёжным. CHECK навязывает правило значениям, поэтому отрицательное количество или цена ниже нуля отвергаются при вставке. DEFAULT подставляет значение, когда его не передали.",
          "FOREIGN KEY — сильнейшее из них. Он гарантирует существование строки, на которую ссылаются, а его предложение ON DELETE решает, что произойдёт при уходе родителя: CASCADE удаляет и потомков, RESTRICT запрещает удаление, SET NULL намеренно делает их сиротами. Осознанный выбор здесь — часть проектирования: поведение по умолчанию, когда не делается ничего, склонно порождать строки, указывающие на то, чего больше нет.",
          "Аргумент в пользу того, чтобы уносить это в базу, а не в приложение, прост: приложение не единственное, что пишет. Скрипт миграции, ноутбук коллеги или ручная правка в два часа ночи обходят твою валидацию на Python, и ни одна из них не обходит ограничение CHECK.",
        ],
      },
    },
    {
      heading: { en: "Indexes and query plans", ru: "Индексы и планы выполнения" },
      body: {
        en: [
          "Without an index, finding rows matching a condition means reading the whole table — a sequential scan. An index is a sorted structure, usually a B-tree, that lets the database jump straight to the matching rows, turning a linear scan into a logarithmic lookup.",
          "Indexes are not free. Every INSERT, UPDATE and DELETE must also update every index on the table, so write-heavy tables slow down as you add them, and each index occupies disk space. The rule is to index columns that appear in WHERE clauses, in JOIN conditions and in ORDER BY — and to index them because a measurement said so, not on suspicion.",
          "Primary keys are indexed automatically. Foreign keys usually are not, and an unindexed foreign key is the single most common cause of a slow join in a student project.",
          "EXPLAIN shows the plan the database chose. Read it inside out: the innermost operations run first. What you are looking for is Seq Scan on a large table where you expected an index, and a row estimate wildly different from reality — that usually means statistics are stale and ANALYZE will fix it.",
        ],
        ru: [
          "Без индекса поиск строк, удовлетворяющих условию, означает чтение всей таблицы — последовательное сканирование. Индекс — отсортированная структура, обычно B-дерево, позволяющая базе сразу прыгнуть к нужным строкам, превращая линейный просмотр в логарифмический поиск.",
          "Индексы не бесплатны. Каждая операция INSERT, UPDATE и DELETE обязана обновить все индексы таблицы, поэтому таблицы с интенсивной записью замедляются по мере их добавления, а каждый индекс занимает место на диске. Правило: индексировать столбцы, встречающиеся в WHERE, в условиях JOIN и в ORDER BY, — и индексировать потому, что так показал замер, а не по подозрению.",
          "Первичные ключи индексируются автоматически. Внешние обычно нет, и неиндексированный внешний ключ — самая частая причина медленного соединения в студенческом проекте.",
          "EXPLAIN показывает план, выбранный базой. Читать его нужно изнутри наружу: самые внутренние операции выполняются первыми. Искать надо Seq Scan по большой таблице там, где ты ждал индекс, и оценку числа строк, дико расходящуюся с реальностью, — обычно это означает устаревшую статистику, и её починит ANALYZE.",
        ],
      },
      code: {
        lang: "sql",
        caption: { en: "Measure, index, measure again", ru: "Замерить, проиндексировать, замерить снова" },
        code: `-- до индекса
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 4711;
-- Seq Scan on orders  (rows=1200000)  actual time=180 ms

CREATE INDEX idx_orders_customer ON orders(customer_id);

-- после
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 4711;
-- Index Scan using idx_orders_customer  actual time=0.4 ms

-- составной индекс: порядок столбцов важен
CREATE INDEX idx_orders_cust_date ON orders(customer_id, created_at);
-- он поможет запросу с WHERE customer_id = ...
-- и запросу с WHERE customer_id = ... AND created_at > ...
-- но НЕ запросу только с WHERE created_at > ...`,
        out: {
          en: "A composite index works left to right, like a phone book sorted by surname then first name: useless for finding everyone called Ivan.",
          ru: "Составной индекс работает слева направо, как телефонная книга, отсортированная по фамилии, а затем по имени: искать всех Иванов по ней бесполезно.",
        },
      },
      pitfall: {
        en: "Wrapping an indexed column in a function disables the index. WHERE DATE(created_at) = '2026-09-07' forces a scan; WHERE created_at >= '2026-09-07' AND created_at < '2026-09-08' uses the index and returns the same rows.",
        ru: "Обёртывание индексированного столбца в функцию отключает индекс. WHERE DATE(created_at) = '2026-09-07' вызывает сканирование; WHERE created_at >= '2026-09-07' AND created_at < '2026-09-08' использует индекс и возвращает те же строки.",
      },
    },
  ],
  worked: {
    title: { en: "Worked example: normalising a spreadsheet export", ru: "Разбор: нормализация выгрузки из таблицы" },
    intro: {
      en: "A colleague hands you one flat table: order_id, date, customer_name, customer_city, customer_phone, product_name, product_price, qty. Find the anomalies and design the schema.",
      ru: "Коллега отдаёт одну плоскую таблицу: order_id, date, customer_name, customer_city, customer_phone, product_name, product_price, qty. Найди аномалии и спроектируй схему.",
    },
    steps: [
      {
        text: { en: "Identify the real key. One row is a line item, so the key is the pair (order_id, product_name) — already a warning, since a name is a poor key.", ru: "Определим настоящий ключ. Строка — это позиция заказа, поэтому ключ — пара (order_id, product_name), и это уже предупреждение: имя плохо годится в ключи." },
      },
      {
        text: { en: "Find the partial dependencies, which is the 2NF violation. Each of these depends on part of the key only.", ru: "Найдём частичные зависимости — нарушение 2НФ. Каждая из них зависит только от части ключа." },
        code: {
          lang: "text",
          code: `product_price   зависит от product_name        -> часть ключа
date            зависит от order_id            -> часть ключа
customer_name   зависит от order_id            -> часть ключа
qty             зависит от (order_id, product) -> от всего ключа, остаётся`,
        },
      },
      {
        text: { en: "Find the transitive dependency, which is the 3NF violation: customer attributes depend on the customer, not on the order.", ru: "Найдём транзитивную зависимость — нарушение 3НФ: атрибуты клиента зависят от клиента, а не от заказа." },
        code: { lang: "text", code: `order_id -> customer_name -> customer_city, customer_phone` },
      },
      {
        text: { en: "Name the anomalies you have just removed, because the report has to state them.", ru: "Назовём устранённые аномалии — их нужно перечислить в отчёте." },
        code: {
          lang: "text",
          code: `обновление: смена телефона клиента = правка сотен строк
вставка:    нельзя завести товар до первого заказа
удаление:   удаление последнего заказа стирает клиента`,
        },
      },
      {
        text: { en: "Write the schema with constraints, so the anomalies cannot come back.", ru: "Запишем схему с ограничениями, чтобы аномалии не могли вернуться." },
        code: {
          lang: "sql",
          code: `CREATE TABLE cities   (city_id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE customers(customer_id SERIAL PRIMARY KEY,
                       name TEXT NOT NULL,
                       phone TEXT,
                       city_id INT NOT NULL REFERENCES cities(city_id));
CREATE TABLE products (product_id SERIAL PRIMARY KEY,
                       name TEXT NOT NULL UNIQUE,
                       price NUMERIC(10,2) NOT NULL CHECK (price >= 0));
CREATE TABLE orders   (order_id SERIAL PRIMARY KEY,
                       customer_id INT NOT NULL REFERENCES customers(customer_id),
                       created_at DATE NOT NULL);
CREATE TABLE order_items(order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
                       product_id INT REFERENCES products(product_id),
                       qty INT NOT NULL CHECK (qty > 0),
                       PRIMARY KEY (order_id, product_id));`,
        },
      },
      {
        text: { en: "Index the foreign keys, which are not indexed automatically, then verify a typical join uses them.", ru: "Проиндексируем внешние ключи, которые автоматически не индексируются, и проверим, что типичное соединение их использует." },
        code: {
          lang: "sql",
          code: `CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_items_product   ON order_items(product_id);

EXPLAIN ANALYZE
SELECT c.name, SUM(oi.qty * p.price) AS revenue
FROM   order_items oi
JOIN   orders o   ON o.order_id = oi.order_id
JOIN   customers c ON c.customer_id = o.customer_id
JOIN   products p ON p.product_id = oi.product_id
GROUP BY c.name;`,
        },
      },
    ],
    conclusion: {
      en: "One table became five, and the price of a product is now stored exactly once. Note what the schema also bought you: qty cannot be zero or negative, an order cannot reference a customer who does not exist, and deleting an order removes its line items rather than leaving them dangling. None of that is enforced by good intentions — it is enforced by the CREATE TABLE statement.",
      ru: "Одна таблица стала пятью, и цена товара теперь хранится ровно один раз. Заметь, что ещё дала схема: qty не может быть нулём или отрицательным, заказ не может ссылаться на несуществующего клиента, а удаление заказа убирает его позиции, а не оставляет их висеть. Ничто из этого не обеспечивается благими намерениями — это обеспечивает оператор CREATE TABLE.",
    },
  },
  exercises: [
    {
      q: { en: "A table stores skills as 'python, sql, git' in one column. Which normal form does this break and how do you fix it?", ru: "Таблица хранит навыки как «python, sql, git» в одном столбце. Какую нормальную форму это нарушает и как исправить?" },
      a: { en: "First normal form, which requires atomic values. You cannot index it, join on it, or ask how many people know SQL without string matching that will also match 'MySQL'. The fix is a skills table and a junction table employee_skills with one row per (employee_id, skill_id) pair. Adding phone1, phone2, phone3 columns is the same violation wearing a different disguise.", ru: "Первую нормальную форму, требующую атомарных значений. По такому столбцу нельзя построить индекс, нельзя соединить и нельзя спросить, сколько человек знают SQL, без поиска подстроки, который заодно найдёт «MySQL». Лечится таблицей навыков и связующей таблицей employee_skills со строкой на пару (employee_id, skill_id). Столбцы phone1, phone2, phone3 — то же нарушение в другом обличье." },
    },
    {
      q: { en: "Table (order_id, product_id, product_name, qty) with key (order_id, product_id). Which form is broken?", ru: "Таблица (order_id, product_id, product_name, qty) с ключом (order_id, product_id). Какая форма нарушена?" },
      a: { en: "Second normal form. product_name depends on product_id alone, which is only part of the composite key, so it is a partial dependency. The consequence is that a product name is repeated on every order line containing it, and renaming the product means updating all of them. Move name into a products table keyed by product_id, and the line item keeps only qty, which genuinely depends on the whole key.", ru: "Вторая нормальная форма. product_name зависит только от product_id, то есть от части составного ключа, — это частичная зависимость. Следствие: название товара повторяется в каждой строке заказа с ним, и переименование требует обновить их все. Перенеси название в таблицу products с ключом product_id, а в позиции заказа останется только qty, которое действительно зависит от всего ключа." },
    },
    {
      q: { en: "You add five indexes and inserts become noticeably slower. Why?", ru: "Ты добавил пять индексов, и вставки заметно замедлились. Почему?" },
      a: { en: "Because every insert now has to write six structures: the table itself plus five index trees, each of which may need to rebalance. Indexes trade write speed and disk space for read speed. On a write-heavy table keep only the indexes that a measured query actually uses — drop the ones EXPLAIN never chooses, and check pg_stat_user_indexes for indexes with zero scans.", ru: "Потому что каждая вставка теперь пишет шесть структур: саму таблицу и пять индексных деревьев, каждое из которых может потребовать перебалансировки. Индексы меняют скорость записи и место на диске на скорость чтения. На таблице с интенсивной записью держи только те индексы, которые реально использует замеренный запрос: выбрось те, что EXPLAIN никогда не выбирает, и проверь pg_stat_user_indexes на индексы с нулём сканирований." },
    },
    {
      q: { en: "You have an index on (customer_id, created_at). Does it help WHERE created_at > '2026-01-01'?", ru: "Есть индекс по (customer_id, created_at). Поможет ли он запросу WHERE created_at > '2026-01-01'?" },
      a: { en: "No. A composite index is sorted by the first column, then within equal values by the second — like a phone book by surname then first name. Searching on the second column alone means scanning the whole index, so the planner will usually prefer a sequential scan. You need a separate index on created_at, or to reorder the composite one if that access pattern is the common one.", ru: "Нет. Составной индекс отсортирован по первому столбцу, а внутри равных значений — по второму, как телефонная книга по фамилии, затем по имени. Поиск только по второму столбцу означает просмотр всего индекса, поэтому планировщик обычно предпочтёт последовательное сканирование. Нужен отдельный индекс по created_at либо перестановка составного, если такой шаблон доступа основной." },
    },
    {
      q: { en: "Why is WHERE YEAR(created_at) = 2026 slower than a range condition?", ru: "Почему WHERE YEAR(created_at) = 2026 медленнее условия с диапазоном?" },
      a: { en: "Because the index stores the raw column values, not the results of functions applied to them. Wrapping the column makes the index unusable and forces a full scan with the function evaluated on every row. Rewrite as created_at >= '2026-01-01' AND created_at < '2027-01-01', which is the same set of rows and can use the index directly. If you truly need the function, some databases let you build an expression index on it.", ru: "Потому что индекс хранит сырые значения столбца, а не результаты применённых к ним функций. Обёртка делает индекс непригодным и вынуждает полное сканирование с вычислением функции на каждой строке. Перепиши как created_at >= '2026-01-01' AND created_at < '2027-01-01' — это то же множество строк, и оно может использовать индекс напрямую. Если функция действительно нужна, некоторые базы позволяют построить индекс по выражению." },
    },
    {
      q: { en: "When is denormalisation the right choice?", ru: "Когда денормализация — правильный выбор?" },
      a: { en: "When reads dominate and joins have become the bottleneck — typically an analytical warehouse or a reporting copy, where a star schema with one wide fact table and a few dimensions beats a fully normalised schema requiring eight joins per query. The cost is that duplicated data can drift out of sync, so denormalise a derived copy that is rebuilt from the normalised source, never the system of record itself.", ru: "Когда чтения доминируют, а соединения стали узким местом, — обычно это аналитическое хранилище или отчётная копия, где схема «звезда» с одной широкой таблицей фактов и несколькими измерениями выигрывает у полностью нормализованной, требующей восьми соединений на запрос. Цена в том, что продублированные данные могут разойтись, поэтому денормализуй производную копию, перестраиваемую из нормализованного источника, но никогда не саму систему записи." },
    },
  ],
  checklist: {
    en: [
      "I can name the three update anomalies and give an example of each",
      "I can bring a flat table to 3NF and say which dependency each step removed",
      "My CREATE TABLE statements carry NOT NULL, CHECK, UNIQUE and REFERENCES",
      "I have indexed my foreign keys and confirmed with EXPLAIN that joins use them",
      "I have built a schema for my own dataset, loaded it, and written five analytical queries",
    ],
    ru: [
      "Могу назвать три аномалии обновления и привести пример каждой",
      "Могу привести плоскую таблицу к 3НФ и сказать, какую зависимость устранил каждый шаг",
      "В моих CREATE TABLE есть NOT NULL, CHECK, UNIQUE и REFERENCES",
      "Проиндексировал внешние ключи и убедился через EXPLAIN, что соединения их используют",
      "Построил схему под свой датасет, загрузил данные и написал пять аналитических запросов",
    ],
  },
};
