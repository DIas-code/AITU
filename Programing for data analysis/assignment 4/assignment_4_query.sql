-- Assignment 4, Задание 2. SQL-запросы к БД музея (схема museum_schema)


-- 1. Выведи произведения со страховой стоимостью от 30 млрд тенге и выше:
--    название, год создания, стоимость.
SELECT a."name", a.creation_year, a.insurance_value_kzt FROM museum_schema.art a 
WHERE a.insurance_value_kzt >= 30000000000;

-- 2. Выведи сотрудников с ролью Guide или Security: полное имя и роль.
SELECT full_name, ROLE FROM museum_schema.employee e
WHERE lower(e."role") IN ('guide', 'security');

-- 3. Выведи все произведения с названием их категории, от самого старого к самому новому.
SELECT
	a."name" AS art_name,
	c.category,
	a.creation_year
FROM
	museum_schema.art a
JOIN museum_schema.category c ON
	c.category_id = a.category_id
ORDER BY
	a.creation_year ASC;
-- 4. Выведи билеты дороже 2000 тенге: тема выставки, дата, цена билета.
--    Сначала самые дорогие.
SELECT
	e.theme,
	e.event_date,
	ev.ticket_price_kzt
FROM
	museum_schema.exhibition_visitor ev
JOIN museum_schema.exhibition e ON
	e.exhibition_id = ev.exhibition_id
WHERE
	ev.ticket_price_kzt > 2000
ORDER BY
	ev.ticket_price_kzt DESC;
-- 5. Выведи произведения категорий Painting и Modern Art вместе с их авторами.
SELECT a."name" AS art_name, c.category, a2.full_name AS artist_name FROM museum_schema.category c 
JOIN museum_schema.art a ON a.category_id = c.category_id 
JOIN museum_schema.art_artist aa ON a.art_id = aa.art_id
JOIN museum_schema.artist a2 ON aa.artist_id = a2.artist_id
WHERE lower(c.category) IN ('painting', 'modern art');


-- 6. Выведи сотрудников, которые работали на офлайн-выставках:
--    имя сотрудника, роль, тема и дата выставки.
SELECT e.full_name AS employee, e."role", e2.theme , e2.event_date , e2."type"  FROM museum_schema.employee e 
JOIN museum_schema.employee_exhibition ee ON e.employee_id = ee.employee_id
JOIN museum_schema.exhibition e2 ON ee.exhibition_id = e2.exhibition_id 
WHERE lower(e2."type") = 'offline';

-- 7. Для каждой выставки выведи тему, дату, число посетителей и выручку с билетов.
SELECT e.theme, e.event_date, count(ev.exhibition_visitor_id) AS cnt_visitors, 
sum(ev.ticket_price_kzt) AS revenue
FROM museum_schema.exhibition e 
LEFT JOIN museum_schema.exhibition_visitor ev ON e.exhibition_id = ev.exhibition_id 
GROUP BY e.exhibition_id;

-- 8. Выведи категории, произведения которых попадали на выставки больше одного раза:
--    сколько раз попадали и самая высокая страховая стоимость в категории.
SELECT c.category, count(ei.exhibition_inventory_id) AS cnt_exhibition, max(a.insurance_value_kzt) AS max_insurance_kzt
FROM museum_schema.category c
JOIN museum_schema.art a ON a.category_id = c.category_id
JOIN museum_schema.inventory i ON a.art_id = i.art_id
JOIN museum_schema.exhibition_inventory ei ON i.inventory_id = ei.inventory_id
GROUP BY c.category_id
HAVING count(ei.exhibition_inventory_id) > 1;

-- 9. Выведи художников, у которых в музее больше одного произведения: имя и количество работ.
SELECT a.full_name AS artist, count(i.inventory_id) AS cnt_art_museum  FROM museum_schema.artist a 
JOIN museum_schema.art_artist aa ON a.artist_id = aa.artist_id 
JOIN museum_schema.art a2 ON a2.art_id  = aa.art_id 
JOIN museum_schema.inventory i ON i.art_id = a2.art_id 
GROUP BY a.artist_id 
HAVING count(i.inventory_id) > 1;

-- 10. Выведи выставки, на которых работали минимум 2 сотрудника:
--     тема, дата, тип, число сотрудников.
SELECT e.theme , e."type" , e.event_date, count(ee.employee_id) AS emp_qty FROM museum_schema.exhibition e 
JOIN museum_schema.employee_exhibition ee ON e.exhibition_id = ee.exhibition_id 
GROUP BY e.exhibition_id
HAVING count(ee.employee_id ) >=2;
-- 11. Подними на 10% страховую стоимость произведений, которые хотя бы раз были
--     на офлайн-выставке.
SELECT DISTINCT a.art_id, a.insurance_value_kzt FROM museum_schema.art a JOIN museum_schema.inventory i ON i.art_id = a.art_id 
JOIN museum_schema.exhibition_inventory ei ON ei.inventory_id = i.inventory_id 
JOIN museum_schema.exhibition e ON e.exhibition_id = ei.exhibition_id 
WHERE lower(e."type") = 'offline';

UPDATE museum_schema.art a2 SET insurance_value_kzt = insurance_value_kzt * 1.1
WHERE EXISTS (SELECT 1 FROM museum_schema.art a JOIN museum_schema.inventory i ON i.art_id = a.art_id 
JOIN museum_schema.exhibition_inventory ei ON ei.inventory_id = i.inventory_id 
JOIN museum_schema.exhibition e ON e.exhibition_id = ei.exhibition_id 
WHERE lower(e."type") = 'offline' AND a2.art_id = a.art_id);

-- 12. Удали категории, в которых нет ни одного произведения.
SELECT
c.category, a."name" 
FROM
museum_schema.category c
LEFT JOIN museum_schema.art a ON
c.category_id = a.category_id 
WHERE a."name" IS NULL 
;

DELETE FROM museum_schema.category c
WHERE NOT  EXISTS(SELECT 1
FROM museum_schema.art a
WHERE a.category_id = c.category_id );
