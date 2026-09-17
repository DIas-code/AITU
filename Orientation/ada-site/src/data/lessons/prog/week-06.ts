import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 6,
  minutes: 70,
  title: { en: "SQL I: the relational model and queries", ru: "SQL I: реляционная модель и запросы" },
  summary: {
    en: "Tables, keys and relations; SELECT from clause to clause in the order the database actually runs them; joins, grouping and the NULL rules that catch everyone.",
    ru: "Таблицы, ключи и связи; SELECT по частям в том порядке, в котором база их действительно выполняет; соединения, группировка и правила NULL, на которых спотыкаются все.",
  },
  goals: {
    en: [
      "Explain the relational model in terms of keys and describe what a foreign key guarantees",
      "Write a SELECT with the clauses in the right order and know the order of execution",
      "Choose the right join and predict how many rows come back",
      "Handle NULL correctly in comparisons, aggregates and joins",
    ],
    ru: [
      "Объяснять реляционную модель через ключи и описывать, что гарантирует внешний ключ",
      "Писать SELECT с частями в правильном порядке и знать порядок выполнения",
      "Выбирать нужное соединение и предсказывать, сколько строк вернётся",
      "Правильно обращаться с NULL в сравнениях, агрегатах и соединениях",
    ],
  },
  sections: [
    {
      heading: { en: "The relational model in one page", ru: "Реляционная модель на одной странице" },
      body: {
        en: [
          "A relational database stores data as tables, where each row is a fact and each column an attribute. What makes it relational rather than a pile of spreadsheets is that rows in different tables refer to each other through keys.",
          "A primary key identifies a row uniquely within its table and can never be NULL. A foreign key is a column that points at another table's primary key, and the database enforces that the target exists — you cannot insert an order for a customer who is not in the customers table, and you cannot delete a customer who still has orders without saying what should happen to them. That enforcement is referential integrity, and it is the main reason a database beats a folder of CSV files.",
          "The relationships come in three shapes. One-to-many is the common one: one customer, many orders, with the foreign key living on the many side. One-to-one is rare and usually means two tables that could be merged. Many-to-many cannot be expressed directly and needs a junction table — students and courses become a third table of enrolments, each row pairing one student with one course.",
        ],
        ru: [
          "Реляционная база хранит данные таблицами, где строка — факт, а столбец — атрибут. Реляционной, а не кучей электронных таблиц, её делает то, что строки разных таблиц ссылаются друг на друга через ключи.",
          "Первичный ключ уникально определяет строку в своей таблице и никогда не может быть NULL. Внешний ключ — столбец, указывающий на первичный ключ другой таблицы, и база следит, чтобы цель существовала: нельзя вставить заказ клиента, которого нет в таблице клиентов, и нельзя удалить клиента, у которого остались заказы, не сказав, что с ними делать. Это соблюдение и есть ссылочная целостность, и она главная причина, по которой база выигрывает у папки с CSV.",
          "Связи бывают трёх видов. Один-ко-многим — самая частая: один клиент, много заказов, внешний ключ живёт на стороне «многих». Один-к-одному встречается редко и обычно означает две таблицы, которые стоило бы объединить. Многие-ко-многим напрямую не выражается и требует связующей таблицы: студенты и курсы превращаются в третью таблицу записей, где каждая строка соединяет одного студента с одним курсом.",
        ],
      },
      key: {
        en: "If you find yourself storing a comma-separated list in a cell, you have a many-to-many relationship and you need a junction table.",
        ru: "Если ты хранишь в ячейке список через запятую, у тебя связь многие-ко-многим и нужна связующая таблица.",
      },
    },
    {
      heading: { en: "SELECT: written order versus execution order", ru: "SELECT: порядок записи против порядка выполнения" },
      body: {
        en: [
          "You write SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT. The database executes them in a different order, and knowing that order explains almost every error message you will meet.",
          "Execution goes FROM, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY, then LIMIT. Two consequences follow immediately. WHERE runs before grouping, so it cannot see aggregate values — a condition on COUNT(*) has to go in HAVING. And SELECT runs after grouping but before ORDER BY, which is why an alias defined in SELECT can be used in ORDER BY but not in WHERE.",
          "That single rule — WHERE filters rows before aggregation, HAVING filters groups after — is asked on every database exam and is worth being able to state without hesitation.",
        ],
        ru: [
          "Пишешь ты SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT. База выполняет их в другом порядке, и знание этого порядка объясняет почти любое сообщение об ошибке, которое ты встретишь.",
          "Выполнение идёт так: FROM, затем WHERE, затем GROUP BY, затем HAVING, затем SELECT, затем ORDER BY, затем LIMIT. Отсюда сразу два следствия. WHERE работает до группировки, поэтому не видит агрегатов — условие на COUNT(*) обязано идти в HAVING. А SELECT выполняется после группировки, но до ORDER BY, поэтому псевдоним, заданный в SELECT, можно использовать в ORDER BY, но нельзя в WHERE.",
          "Это единственное правило — WHERE фильтрует строки до агрегации, HAVING фильтрует группы после — спрашивают на каждом экзамене по базам данных, и его стоит уметь произнести без запинки.",
        ],
      },
      code: {
        lang: "sql",
        caption: { en: "One query using every clause", ru: "Один запрос со всеми частями" },
        code: `SELECT   c.country,
         COUNT(*)              AS orders,
         COUNT(DISTINCT o.customer_id) AS customers,
         ROUND(AVG(o.total), 2) AS avg_total
FROM     orders   AS o
JOIN     customers AS c ON c.customer_id = o.customer_id
WHERE    o.created_at >= '2026-01-01'      -- фильтр строк, до группировки
GROUP BY c.country
HAVING   COUNT(*) >= 10                    -- фильтр групп, после агрегации
ORDER BY orders DESC
LIMIT    20;`,
        out: {
          en: "Moving HAVING COUNT(*) >= 10 into WHERE raises an error: at the moment WHERE runs, no groups exist yet and COUNT means nothing.",
          ru: "Перенос HAVING COUNT(*) >= 10 в WHERE даст ошибку: в момент выполнения WHERE групп ещё нет и COUNT ничего не означает.",
        },
      },
      pitfall: {
        en: "Every non-aggregated column in SELECT must appear in GROUP BY. PostgreSQL rejects a query that breaks this; MySQL historically allowed it and returned an arbitrary row from each group, which is worse than an error because it looks like it worked.",
        ru: "Каждый неагрегированный столбец в SELECT обязан быть в GROUP BY. PostgreSQL отвергает запрос, нарушающий это; MySQL исторически разрешал и возвращал произвольную строку из группы — а это хуже ошибки, потому что выглядит как рабочий результат.",
      },
    },
    {
      heading: { en: "Joins", ru: "Соединения" },
      body: {
        en: [
          "A join matches rows of two tables on a condition. INNER JOIN keeps only matched pairs. LEFT JOIN keeps every row of the left table and fills the right-hand columns with NULL where nothing matched. RIGHT JOIN is the mirror and is rarely used, since swapping the tables is clearer. FULL OUTER JOIN keeps everything from both sides.",
          "The row-count arithmetic is the part to internalise. If the join key is unique on the right, an inner join returns at most as many rows as the left table has. If the key repeats on the right, rows multiply — a left row matching three right rows produces three output rows. That is not a bug; it is what the join is defined to do, and it is why you check the count afterwards.",
          "The most common analytical use of LEFT JOIN is finding what is missing: join and then filter for NULL on the right-hand side. Customers with no orders, products never sold, sessions with no matching user — all of them are a LEFT JOIN followed by WHERE right_table.key IS NULL.",
        ],
        ru: [
          "Соединение сопоставляет строки двух таблиц по условию. INNER JOIN оставляет только совпавшие пары. LEFT JOIN оставляет каждую строку левой таблицы и заполняет правые столбцы значениями NULL там, где совпадения нет. RIGHT JOIN зеркален и применяется редко, поскольку поменять таблицы местами понятнее. FULL OUTER JOIN оставляет всё с обеих сторон.",
          "Усвоить нужно арифметику числа строк. Если ключ соединения уникален справа, внутреннее соединение вернёт не больше строк, чем есть в левой таблице. Если ключ справа повторяется, строки размножаются: левая строка, совпавшая с тремя правыми, даёт три строки результата. Это не баг, а определение соединения, и потому число строк проверяют после.",
          "Самое частое аналитическое применение LEFT JOIN — поиск отсутствующего: соединить и отфильтровать по NULL с правой стороны. Клиенты без заказов, товары, которые ни разу не продались, сессии без соответствующего пользователя — всё это LEFT JOIN с последующим WHERE правая_таблица.ключ IS NULL.",
        ],
      },
      code: {
        lang: "sql",
        caption: { en: "Finding what is not there", ru: "Как найти то, чего нет" },
        code: `-- клиенты, которые ни разу не заказывали
SELECT   c.customer_id, c.name
FROM     customers AS c
LEFT JOIN orders   AS o ON o.customer_id = c.customer_id
WHERE    o.order_id IS NULL;

-- сколько строк должно быть? проверяем ключ справа
SELECT customer_id, COUNT(*) AS n
FROM   orders
GROUP BY customer_id
HAVING COUNT(*) > 1
LIMIT 5;`,
        out: {
          en: "The IS NULL check must reference a column that is never NULL in the right table — usually its primary key — otherwise you filter genuine NULLs instead of missing matches.",
          ru: "Проверка IS NULL должна ссылаться на столбец, который в правой таблице никогда не NULL, — обычно на её первичный ключ, — иначе ты отфильтруешь настоящие NULL вместо отсутствующих совпадений.",
        },
      },
    },
    {
      heading: { en: "NULL: the three-valued logic", ru: "NULL: трёхзначная логика" },
      body: {
        en: [
          "NULL means unknown, not zero and not an empty string. Any comparison with an unknown value is itself unknown, so NULL = NULL is not true — it is NULL. This is why equality never finds missing values and IS NULL exists as separate syntax.",
          "SQL therefore has three truth values: true, false and unknown. WHERE keeps only rows where the condition is true, so a row whose condition evaluates to unknown is dropped just as if it were false. The practical consequence is that WHERE status != 'active' silently excludes rows where status is NULL, which is almost never what you meant.",
          "Aggregates ignore NULL. COUNT(*) counts rows, COUNT(column) counts non-NULL values in that column, and the difference between them is the number of missing values — the quickest missingness check in SQL. AVG divides by the count of non-NULL values, not by the row count, so an average over a column that is half empty is an average of the half that exists.",
        ],
        ru: [
          "NULL означает «неизвестно», а не ноль и не пустую строку. Любое сравнение с неизвестным значением само неизвестно, поэтому NULL = NULL не истина, а NULL. Поэтому равенство никогда не находит пропуски и существует отдельный синтаксис IS NULL.",
          "У SQL, таким образом, три значения истинности: истина, ложь и неизвестно. WHERE оставляет только строки, где условие истинно, поэтому строка с неизвестным результатом отбрасывается так же, как если бы условие было ложным. Практическое следствие: WHERE status != 'active' молча исключает строки, где status равен NULL, а это почти никогда не то, что имелось в виду.",
          "Агрегаты игнорируют NULL. COUNT(*) считает строки, COUNT(столбец) считает непустые значения в этом столбце, а разница между ними — число пропусков; это быстрейшая проверка пропусков в SQL. AVG делит на количество непустых значений, а не на число строк, поэтому среднее по наполовину пустому столбцу есть среднее той половины, что существует.",
        ],
      },
      code: {
        lang: "sql",
        caption: { en: "NULL behaviour you must know", ru: "Поведение NULL, которое надо знать" },
        code: `-- пропуски по столбцу одним запросом
SELECT COUNT(*)            AS rows_total,
       COUNT(phone)        AS phone_known,
       COUNT(*) - COUNT(phone) AS phone_missing
FROM   customers;

-- НЕВЕРНО: строки с NULL в status молча выпадут
SELECT * FROM customers WHERE status != 'active';

-- ВЕРНО: если NULL надо оставить, скажи это явно
SELECT * FROM customers
WHERE  status IS DISTINCT FROM 'active';        -- PostgreSQL
-- или
SELECT * FROM customers
WHERE  status != 'active' OR status IS NULL;

-- заменить NULL значением по умолчанию
SELECT customer_id, COALESCE(phone, 'не указан') AS phone FROM customers;`,
      },
      pitfall: {
        en: "NOT IN with a subquery that returns any NULL returns no rows at all, because the comparison becomes unknown for every candidate. Use NOT EXISTS instead, or filter NULLs out of the subquery.",
        ru: "NOT IN с подзапросом, возвращающим хоть один NULL, не вернёт ни одной строки, потому что сравнение становится неизвестным для каждого кандидата. Используй NOT EXISTS или отфильтруй NULL внутри подзапроса.",
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a report on the Chinook database", ru: "Разбор: отчёт по базе Chinook" },
    intro: {
      en: "Chinook is the standard teaching schema — a music store with customers, invoices, tracks and genres. Build a report of revenue by country, then find the customers who bought nothing.",
      ru: "Chinook — стандартная учебная схема: магазин музыки с клиентами, счетами, треками и жанрами. Построим отчёт о выручке по странам, а затем найдём клиентов, которые ничего не купили.",
    },
    steps: [
      {
        text: { en: "Look at the schema before writing anything. Knowing which side of a relation holds the foreign key determines the join direction.", ru: "Сначала посмотреть схему. Знание того, на какой стороне связи лежит внешний ключ, определяет направление соединения." },
        code: { lang: "sql", code: `SELECT name FROM sqlite_master WHERE type = 'table';
-- customers.CustomerId <- invoices.CustomerId  (один ко многим)` },
      },
      {
        text: { en: "Start with the simplest aggregate and check it is plausible before adding anything.", ru: "Начинаем с простейшего агрегата и убеждаемся в правдоподобии, прежде чем что-то добавлять." },
        code: { lang: "sql", code: `SELECT COUNT(*) AS invoices, ROUND(SUM(Total), 2) AS revenue
FROM   invoices;` },
      },
      {
        text: { en: "Join to customers and group by country. COUNT(DISTINCT) separates customers from invoices.", ru: "Соединяем с клиентами и группируем по странам. COUNT(DISTINCT) отделяет клиентов от счетов." },
        code: {
          lang: "sql",
          code: `SELECT   c.Country,
         COUNT(DISTINCT c.CustomerId) AS customers,
         COUNT(i.InvoiceId)           AS invoices,
         ROUND(SUM(i.Total), 2)       AS revenue,
         ROUND(AVG(i.Total), 2)       AS avg_invoice
FROM     customers AS c
JOIN     invoices  AS i ON i.CustomerId = c.CustomerId
GROUP BY c.Country
ORDER BY revenue DESC;`,
        },
      },
      {
        text: { en: "Keep only countries with a meaningful sample. The condition is on an aggregate, so it belongs in HAVING.", ru: "Оставляем только страны с осмысленной выборкой. Условие на агрегат, значит его место в HAVING." },
        code: { lang: "sql", code: `HAVING COUNT(DISTINCT c.CustomerId) >= 5` },
      },
      {
        text: { en: "Now the inverse question. An inner join can never answer it, because non-buyers have no invoice rows to match.", ru: "Теперь обратный вопрос. Внутреннее соединение на него ответить не может: у не покупавших нет строк счетов для совпадения." },
        code: {
          lang: "sql",
          code: `SELECT   c.CustomerId, c.FirstName, c.LastName, c.Country
FROM     customers AS c
LEFT JOIN invoices AS i ON i.CustomerId = c.CustomerId
WHERE    i.InvoiceId IS NULL;`,
        },
      },
      {
        text: { en: "Verify the arithmetic closes: buyers plus non-buyers must equal all customers.", ru: "Проверяем, что арифметика сходится: покупавшие плюс не покупавшие должны дать всех клиентов." },
        code: {
          lang: "sql",
          code: `SELECT (SELECT COUNT(*) FROM customers)                       AS total,
       (SELECT COUNT(DISTINCT CustomerId) FROM invoices)      AS buyers;`,
        },
      },
    ],
    conclusion: {
      en: "Two queries and one arithmetic check. The pattern generalises: an inner join answers 'what happened', a left join plus IS NULL answers 'what did not happen', and the two counts must add up to the whole. Any report that cannot pass that closing check has a join problem hiding in it.",
      ru: "Два запроса и одна арифметическая проверка. Приём обобщается: внутреннее соединение отвечает на вопрос «что произошло», левое соединение с IS NULL — на вопрос «чего не произошло», и два числа обязаны в сумме дать целое. Любой отчёт, не проходящий эту замыкающую проверку, прячет в себе проблему с соединением.",
    },
  },
  exercises: [
    {
      q: { en: "Why does WHERE COUNT(*) > 5 fail, and where does the condition belong?", ru: "Почему WHERE COUNT(*) > 5 не работает и где место этому условию?" },
      a: { en: "Because WHERE executes before GROUP BY, so at that moment no groups exist and COUNT has nothing to count. The condition belongs in HAVING, which runs after grouping and can see aggregates. The general rule: conditions on individual rows go in WHERE, conditions on aggregated groups go in HAVING. Putting a row-level condition in HAVING usually still works but is slower, because you aggregate rows you were going to discard.", ru: "Потому что WHERE выполняется до GROUP BY, и в этот момент групп ещё нет, а COUNT нечего считать. Условию место в HAVING, который выполняется после группировки и видит агрегаты. Общее правило: условия на отдельные строки идут в WHERE, условия на сгруппированные данные — в HAVING. Условие уровня строки в HAVING обычно тоже работает, но медленнее, потому что ты агрегируешь строки, которые собирался выбросить." },
    },
    {
      q: { en: "Write a query listing products that have never been ordered.", ru: "Напиши запрос, выводящий товары, которые ни разу не заказывали." },
      a: { en: "SELECT p.product_id, p.name FROM products p LEFT JOIN order_items oi ON oi.product_id = p.product_id WHERE oi.order_item_id IS NULL. The left join keeps every product, matched or not, and filtering on a right-hand column that is never NULL in real rows isolates the unmatched ones. The equivalent forms are NOT EXISTS with a correlated subquery, or NOT IN — but NOT IN is dangerous here if the subquery can return NULL.", ru: "SELECT p.product_id, p.name FROM products p LEFT JOIN order_items oi ON oi.product_id = p.product_id WHERE oi.order_item_id IS NULL. Левое соединение сохраняет все товары, совпавшие и нет, а фильтр по правому столбцу, который в настоящих строках никогда не NULL, выделяет несовпавшие. Равносильные формы — NOT EXISTS с коррелированным подзапросом или NOT IN, но NOT IN здесь опасен, если подзапрос может вернуть NULL." },
    },
    {
      q: { en: "A table has 1 000 rows; COUNT(*) returns 1 000 and COUNT(email) returns 940. What does that tell you?", ru: "В таблице 1 000 строк; COUNT(*) возвращает 1 000, а COUNT(email) — 940. О чём это говорит?" },
      a: { en: "Sixty rows have NULL in email, because COUNT on a column skips NULLs while COUNT(*) counts rows. The difference is the fastest missingness check available in SQL and works for any column. Note that an empty string is not NULL and would be counted by COUNT(email) — if your import turned blanks into empty strings, this check will report zero missing while the column is in fact unusable.", ru: "У шестидесяти строк в email стоит NULL, потому что COUNT по столбцу пропускает NULL, а COUNT(*) считает строки. Разница — быстрейшая проверка пропусков в SQL, работающая для любого столбца. Учти, что пустая строка не NULL и будет посчитана COUNT(email): если импорт превратил пустоты в пустые строки, проверка покажет ноль пропусков при фактически непригодном столбце." },
    },
    {
      q: { en: "Why does WHERE status != 'active' miss rows where status is NULL?", ru: "Почему WHERE status != 'active' пропускает строки, где status равен NULL?" },
      a: { en: "Because comparing an unknown value to anything yields unknown, not true, and WHERE keeps only rows where the condition is true. The row is therefore dropped even though it is genuinely not active. Write status != 'active' OR status IS NULL, or in PostgreSQL status IS DISTINCT FROM 'active', which treats NULL as a comparable value.", ru: "Потому что сравнение неизвестного значения с чем угодно даёт «неизвестно», а не «истину», а WHERE оставляет только строки с истинным условием. Строка отбрасывается, хотя она действительно не active. Пиши status != 'active' OR status IS NULL либо в PostgreSQL status IS DISTINCT FROM 'active', который трактует NULL как сравнимое значение." },
    },
    {
      q: { en: "An inner join of a 5 000-row table with a lookup table returns 6 200 rows. Explain.", ru: "Внутреннее соединение таблицы на 5 000 строк со справочником возвращает 6 200 строк. Объясни." },
      a: { en: "The join key is not unique in the lookup table, so some left rows matched several right rows and were duplicated once per match. Find the offenders with SELECT key, COUNT(*) FROM lookup GROUP BY key HAVING COUNT(*) > 1. Either deduplicate the lookup, or aggregate it down to one row per key before joining. Every sum computed on the 6 200-row result is currently overstated.", ru: "Ключ соединения неуникален в справочнике, поэтому часть левых строк совпала с несколькими правыми и продублировалась по разу на совпадение. Найди виновных через SELECT key, COUNT(*) FROM lookup GROUP BY key HAVING COUNT(*) > 1. Либо дедуплицируй справочник, либо сверни его до одной строки на ключ перед соединением. Любая сумма, посчитанная по результату из 6 200 строк, сейчас завышена." },
    },
    {
      q: { en: "How would you model 'a student takes many courses and a course has many students'?", ru: "Как смоделировать «студент проходит много курсов, а курс проходят много студентов»?" },
      a: { en: "With a junction table. students holds student_id as its primary key, courses holds course_id, and a third table enrollments holds a pair (student_id, course_id) per row, with both columns as foreign keys and the pair as the composite primary key. Many-to-many cannot be represented with a foreign key on either side, because a column holds one value; the junction table turns it into two one-to-many relations, and it also gives you somewhere to store enrolment date or grade.", ru: "Связующей таблицей. В students первичный ключ student_id, в courses — course_id, а третья таблица enrollments хранит по строке на пару (student_id, course_id), где оба столбца — внешние ключи, а пара — составной первичный ключ. Многие-ко-многим нельзя выразить внешним ключом ни с одной стороны, потому что столбец хранит одно значение; связующая таблица превращает связь в две «один ко многим» и заодно даёт куда положить дату записи или оценку." },
    },
  ],
  checklist: {
    en: [
      "I can recite the execution order of SELECT clauses",
      "I know why a condition on COUNT goes in HAVING and not WHERE",
      "I can write the left-join-plus-IS-NULL pattern from memory",
      "I use IS NULL rather than = NULL, and I know what NOT IN does with NULLs",
      "I have solved at least thirty queries on a sample database this week",
    ],
    ru: [
      "Могу по памяти назвать порядок выполнения частей SELECT",
      "Знаю, почему условие на COUNT идёт в HAVING, а не в WHERE",
      "Могу по памяти написать приём «левое соединение плюс IS NULL»",
      "Использую IS NULL, а не = NULL, и знаю, что делает NOT IN с NULL",
      "Решил на этой неделе не меньше тридцати запросов на учебной базе",
    ],
  },
};
