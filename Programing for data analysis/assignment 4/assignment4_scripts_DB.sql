-- Создание базы данных.
-- CREATE DATABASE нельзя выполнить внутри DO-блока, поэтому выполняется отдельной командой
-- (один раз, затем подключиться к базе final_task и запускать остальной скрипт):
-- CREATE DATABASE final_task;

-- Если в базе уже есть старая версия схемы (без новых столбцов), сначала удалить её:
-- DROP SCHEMA IF EXISTS museum_schema CASCADE;

CREATE SCHEMA IF NOT EXISTS museum_schema;

--Creating tables
--3. Create a physical database with a separate database and schema and give it an appropriate domain-related name.
--Create relationships between tables using primary and foreign keys.


CREATE TABLE IF NOT EXISTS museum_schema.category (
    category_id SERIAL PRIMARY KEY,
    category VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS museum_schema.art (
    art_id SERIAL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    category_id INT NOT NULL REFERENCES museum_schema.category(category_id),
    creation_year INT NOT NULL,
    width_cm NUMERIC(6,1) NOT NULL,
    height_cm NUMERIC(6,1) NOT NULL,
    insurance_value_kzt NUMERIC(15,2) NOT NULL DEFAULT 0,
    description TEXT
);

CREATE TABLE IF NOT EXISTS museum_schema.artist (
    artist_id SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) GENERATED ALWAYS AS ("name" || ' ' || surname) STORED,
    date_of_birth DATE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS museum_schema.art_artist (
    art_artist_id SERIAL PRIMARY KEY,
    art_id INT NOT NULL REFERENCES museum_schema.art(art_id),
    artist_id INT NOT NULL REFERENCES museum_schema.artist(artist_id)
);

CREATE TABLE IF NOT EXISTS museum_schema.inventory (
    inventory_id SERIAL PRIMARY KEY,
    art_id INT NOT NULL UNIQUE REFERENCES museum_schema.art(art_id),
    inventory_number VARCHAR(20) NOT NULL UNIQUE,
    storage_location VARCHAR(50) NOT NULL,
    acquisition_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS museum_schema.exhibition (
    exhibition_id SERIAL PRIMARY KEY,
    theme VARCHAR(50) NOT NULL,
    "type" VARCHAR(15) NOT NULL,
    event_date DATE NOT NULL
);

-- дата берётся из exhibition, поэтому в таблице связей её нет (3НФ)
CREATE TABLE IF NOT EXISTS museum_schema.exhibition_inventory (
    exhibition_inventory_id SERIAL PRIMARY KEY,
    inventory_id INT NOT NULL REFERENCES museum_schema.inventory(inventory_id),
    exhibition_id INT NOT NULL REFERENCES museum_schema.exhibition(exhibition_id)
);

CREATE TABLE IF NOT EXISTS museum_schema.employee (
    employee_id SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) GENERATED ALWAYS AS ("name" || ' ' || surname) STORED,
    role VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    personal_id VARCHAR(12) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS museum_schema.employee_exhibition (
    employee_exhibition_id SERIAL PRIMARY KEY,
    exhibition_id INT NOT NULL REFERENCES museum_schema.exhibition(exhibition_id),
    employee_id INT NOT NULL REFERENCES museum_schema.employee(employee_id)
);

CREATE TABLE IF NOT EXISTS museum_schema.visitor (
    visitor_id SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) GENERATED ALWAYS AS ("name" || ' ' || surname) STORED,
    personal_id VARCHAR(12) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS museum_schema.exhibition_visitor (
    exhibition_visitor_id SERIAL PRIMARY KEY,
    exhibition_id INT NOT NULL REFERENCES museum_schema.exhibition(exhibition_id),
    visitor_id INT NOT NULL REFERENCES museum_schema.visitor(visitor_id),
    ticket_price_kzt NUMERIC(10,2) NOT NULL DEFAULT 0
);

-- Единицы измерения в метаданных
COMMENT ON COLUMN museum_schema.art.width_cm IS 'Width of the artwork, centimeters (cm)';
COMMENT ON COLUMN museum_schema.art.height_cm IS 'Height of the artwork, centimeters (cm)';
COMMENT ON COLUMN museum_schema.art.insurance_value_kzt IS 'Insurance value, Kazakhstani tenge (KZT)';
COMMENT ON COLUMN museum_schema.art.creation_year IS 'Year of creation (or discovery for artifacts), years AD';
COMMENT ON COLUMN museum_schema.exhibition_visitor.ticket_price_kzt IS 'Ticket price, Kazakhstani tenge (KZT)';
COMMENT ON COLUMN museum_schema.employee.personal_id IS 'Individual identification number (IIN), 12 digits';
COMMENT ON COLUMN museum_schema.visitor.personal_id IS 'Individual identification number (IIN), 12 digits';

--Use ALTER TABLE to add at least 5 check constraints across the tables to restrict certain values
-- Deleting constraints that created by Alter table, for rerunability

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_art_date') THEN
        ALTER TABLE museum_schema.art DROP CONSTRAINT check_art_date;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_exhibition_date') THEN
        ALTER TABLE museum_schema.exhibition DROP CONSTRAINT check_exhibition_date;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_exhibition_type') THEN
        ALTER TABLE museum_schema.exhibition DROP CONSTRAINT check_exhibition_type;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_employee_personal_id') THEN
        ALTER TABLE museum_schema.employee DROP CONSTRAINT check_employee_personal_id;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_visitor_personal_id') THEN
        ALTER TABLE museum_schema.visitor DROP CONSTRAINT check_visitor_personal_id;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_exhibition_event_type') THEN
        ALTER TABLE museum_schema.exhibition DROP CONSTRAINT unique_exhibition_event_type;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_exhibition_inventory') THEN
        ALTER TABLE museum_schema.exhibition_inventory DROP CONSTRAINT unique_exhibition_inventory;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_art_artist') THEN
        ALTER TABLE museum_schema.art_artist DROP CONSTRAINT unique_art_artist;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_exhibition_visitor') THEN
        ALTER TABLE museum_schema.exhibition_visitor DROP CONSTRAINT unique_exhibition_visitor;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_employee_exhibition') THEN
        ALTER TABLE museum_schema.employee_exhibition DROP CONSTRAINT unique_employee_exhibition;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_creation_year') THEN
        ALTER TABLE museum_schema.art DROP CONSTRAINT check_creation_year;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_art_size') THEN
        ALTER TABLE museum_schema.art DROP CONSTRAINT check_art_size;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_insurance_value') THEN
        ALTER TABLE museum_schema.art DROP CONSTRAINT check_insurance_value;
    END IF;

	IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_ticket_price') THEN
        ALTER TABLE museum_schema.exhibition_visitor DROP CONSTRAINT check_ticket_price;
    END IF;
END $$;

--Altering table with constarints

ALTER TABLE museum_schema.exhibition
ADD CONSTRAINT check_exhibition_date CHECK (event_date >= '2024-07-01');

ALTER TABLE museum_schema.art
ADD CONSTRAINT check_creation_year CHECK (creation_year >=1000 AND creation_year <=2026);

ALTER TABLE museum_schema.art
ADD CONSTRAINT check_art_size CHECK (width_cm > 0 AND height_cm > 0);

ALTER TABLE museum_schema.art
ADD CONSTRAINT check_insurance_value CHECK (insurance_value_kzt >= 0);

ALTER TABLE museum_schema.exhibition_visitor
ADD CONSTRAINT check_ticket_price CHECK (ticket_price_kzt >= 0);

ALTER TABLE museum_schema.exhibition
ALTER COLUMN event_date SET DEFAULT CURRENT_DATE;

ALTER TABLE museum_schema.art
ALTER COLUMN description SET DEFAULT 'No description';

ALTER TABLE museum_schema.artist
ALTER COLUMN description SET DEFAULT 'No description';

ALTER TABLE museum_schema.exhibition
ADD CONSTRAINT check_exhibition_type CHECK ("type" IN ('Online', 'Offline'));


ALTER TABLE museum_schema.employee
ADD CONSTRAINT check_employee_personal_id CHECK (personal_id ~ '^[0-9]{12}$');

ALTER TABLE museum_schema.visitor
ADD CONSTRAINT check_visitor_personal_id CHECK (personal_id ~ '^[0-9]{12}$');


ALTER TABLE museum_schema.exhibition
ADD CONSTRAINT unique_exhibition_event_type UNIQUE (event_date, "type");

ALTER TABLE museum_schema.exhibition_inventory
ADD CONSTRAINT unique_exhibition_inventory UNIQUE (exhibition_id, inventory_id);

ALTER TABLE museum_schema.art_artist
ADD CONSTRAINT unique_art_artist UNIQUE (art_id, artist_id);

ALTER TABLE museum_schema.employee_exhibition
ADD CONSTRAINT unique_employee_exhibition UNIQUE (exhibition_id, employee_id);

ALTER TABLE museum_schema.exhibition_visitor
ADD CONSTRAINT unique_exhibition_visitor UNIQUE (exhibition_id, visitor_id);


--4. Populate the tables with the sample data, at least 10 rows in each table
--Inserting object
--CATEGORY
WITH new_categories AS (
    SELECT 'Painting' AS category
    UNION ALL
    SELECT 'Artifacts'
    UNION ALL
    SELECT 'Antiques'
    UNION ALL
    SELECT 'Historical objects'
    UNION ALL
    SELECT 'Specimens'
    UNION ALL
    SELECT 'Modern Art'
    UNION ALL
    SELECT 'Sculpture'
    UNION ALL
    SELECT 'Photography'
    UNION ALL
    SELECT 'Manuscripts'
    UNION ALL
    SELECT 'Textiles'
), inserted_categories AS (
    INSERT INTO museum_schema.category (category)
    SELECT category
    FROM new_categories nc
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.category c
        WHERE c.category = nc.category
    )
    RETURNING category_id, category
) SELECT * FROM inserted_categories;

-- SELECT * FROM museum_schema.category c ;

-- ART
WITH new_art AS (
    SELECT 'Impression, Sunrise' AS "name",
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='painting') AS category_id,
    1872 AS creation_year, 63.0 AS width_cm, 48.0 AS height_cm, 50000000000.00 AS insurance_value_kzt,
    'Impression, Sunrise captures a quiet morning in the port of Le Havre.' AS description
    UNION ALL
    SELECT 'The Starry Night',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='painting'),
    1889, 92.1, 73.7, 50000000000.00, 'A famous painting by Vincent van Gogh'
    UNION ALL
    SELECT 'The Big Wave off Kanagawa',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='painting'),
    1831, 37.8, 25.7, 1500000000.00, 'A story of a never-ending process in life where once we have conquered our fear and get what we want, we will be met again with other vicious waves, other bigger problems, and difficulties.'
    UNION ALL
    SELECT 'Altyn Adam',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='artifacts'),
    1969, 60.0, 185.0, 20000000000.00, 'Founded in Kazakhstan'
    UNION ALL
    SELECT 'The Pinner Qing Dynasty Vase',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='antiques'),
    1700, 30.0, 40.0, 40000000000.00, 'Very Expensive, sold for 80 million dollars'
    UNION ALL
    SELECT 'Leonardo da Vinci’s Codex Leicester',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='manuscripts'),
    1510, 22.0, 29.0, 15000000000.00, 'Leonardo da Vinci’s Codex Leicester, a collection of scientific writings and sketches, is another highly valued antique.'
    UNION ALL
    SELECT 'Almond Blossoms',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='painting'),
    1890, 92.4, 73.5, 40000000000.00, 'In Van Gogh''s personal symbolism, these flowers represented hope, renewal, and the cycle of life.'
    UNION ALL
    SELECT 'Girl with a Pearl Earring',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='painting'),
    1665, 39.0, 44.5, 45000000000.00, 'Tronie of a girl with a large pearl earring by Johannes Vermeer.'
    UNION ALL
    SELECT 'The Persistence of Memory',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='modern art'),
    1931, 33.0, 24.0, 30000000000.00, 'Surrealist painting with melting clocks by Salvador Dali.'
    UNION ALL
    SELECT 'The Thinker',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='sculpture'),
    1904, 98.0, 186.0, 7000000000.00, 'Bronze sculpture by Auguste Rodin.'
    UNION ALL
    SELECT 'Composition VIII',
    (SELECT category_id FROM museum_schema.category WHERE lower(category)='modern art'),
    1923, 201.0, 140.0, 25000000000.00, 'Abstract painting by Wassily Kandinsky.'
), inserted_art AS (
    INSERT INTO museum_schema.art (name, category_id, creation_year, width_cm, height_cm, insurance_value_kzt, description)
    SELECT "name", category_id, creation_year, width_cm, height_cm, insurance_value_kzt, description
    FROM new_art na
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.art a
        WHERE a."name" = na."name"
    )
    RETURNING art_id, "name", category_id, description
)
SELECT * FROM inserted_art;

-- SELECT * FROM museum_schema.art a ;

--ARTISTS
WITH new_artists AS (
    SELECT 'Leonardo' AS "name", 'da Vinci' AS surname, '1452-04-15'::date AS date_of_birth, 'Italian polymath' AS description
    UNION ALL
    SELECT 'Dias', 'Yermekov', '2002-11-14'::date, 'Some biography, found in Internet The Pinner Qing Dynasty Vase without creator or founder'
    UNION ALL
    SELECT 'Vincent', 'van Gogh', '1853-03-30'::date, 'Dutch post-impressionist painter'
    UNION ALL
    SELECT 'Claude', 'Monet', '1840-11-14'::date, 'Claude Monet was a French painter and founder of impressionism painting'
    UNION ALL
    SELECT 'Hokusai', 'Katsushika', '1760-10-31'::date, 'Japanese ukiyo-e painter and printmaker'
    UNION ALL
    SELECT 'Kemal', 'Akishev', '1925-05-25'::date, 'The archaeologist'
    UNION ALL
    SELECT 'Johannes', 'Vermeer', '1632-10-31'::date, 'Dutch Baroque painter'
    UNION ALL
    SELECT 'Salvador', 'Dali', '1904-05-11'::date, 'Spanish surrealist artist'
    UNION ALL
    SELECT 'Auguste', 'Rodin', '1840-11-12'::date, 'French sculptor'
    UNION ALL
    SELECT 'Wassily', 'Kandinsky', '1866-12-16'::date, 'Russian painter, pioneer of abstract art'
), inserted_artists AS (
    INSERT INTO museum_schema.artist ("name", surname, date_of_birth, description)
    SELECT "name", surname, date_of_birth, description
    FROM new_artists na
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.artist a
        WHERE a."name" = na."name" AND a.surname = na.surname
    )
    RETURNING "name", surname, date_of_birth, description
)
SELECT * FROM inserted_artists;

-- SELECT * FROM museum_schema.artist a ;

--ART_ARTIST
WITH new_art_artist AS (
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='impression, sunrise') AS art_id,
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='claude monet') AS artist_id
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='the starry night'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='vincent van gogh')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='almond blossoms'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='vincent van gogh')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='the big wave off kanagawa'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='hokusai katsushika')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")=lower('Leonardo da Vinci’s Codex Leicester')),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='leonardo da vinci')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")=lower('The Pinner Qing Dynasty Vase')),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='dias yermekov')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='altyn adam'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='kemal akishev')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='girl with a pearl earring'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='johannes vermeer')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='the persistence of memory'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='salvador dali')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='the thinker'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='auguste rodin')
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name")='composition viii'),
    (SELECT artist_id FROM museum_schema.artist WHERE lower("full_name")='wassily kandinsky')
), inserted_art_artist AS (
    INSERT INTO museum_schema.art_artist (art_id, artist_id)
    SELECT art_id, artist_id
    FROM new_art_artist naa
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.art_artist aa
        WHERE aa.art_id = naa.art_id
          AND aa.artist_id = naa.artist_id
    )
    RETURNING art_artist_id, art_id, artist_id
)
SELECT * FROM inserted_art_artist;

-- SELECT * FROM museum_schema.art_artist aa ;

-- INVENTORY
WITH new_invetories AS (
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Starry Night')) AS art_id,
    'INV-0001' AS inventory_number, 'Hall A, wall 1' AS storage_location, '2024-07-10'::date AS acquisition_date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Impression, Sunrise')), 'INV-0002', 'Hall A, wall 2', '2024-07-10'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Big Wave off Kanagawa')), 'INV-0003', 'Hall B, showcase 1', '2024-07-15'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Altyn Adam')), 'INV-0004', 'Hall C, showcase 1', '2024-07-20'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Leonardo da Vinci’s Codex Leicester')), 'INV-0005', 'Storage room 1, safe 2', '2024-08-01'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Almond Blossoms')), 'INV-0006', 'Hall A, wall 3', '2024-08-05'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Pinner Qing Dynasty Vase')), 'INV-0007', 'Hall D, showcase 2', '2024-08-12'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Girl with a Pearl Earring')), 'INV-0008', 'Hall A, wall 4', '2024-09-01'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Persistence of Memory')), 'INV-0009', 'Hall E, wall 1', '2024-09-10'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Thinker')), 'INV-0010', 'Hall F, center', '2024-10-01'::date
    UNION ALL
    SELECT (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Composition VIII')), 'INV-0011', 'Hall E, wall 2', '2024-10-15'::date
), inserted_inventory AS (
    INSERT INTO museum_schema.inventory (art_id, inventory_number, storage_location, acquisition_date)
    SELECT art_id, inventory_number, storage_location, acquisition_date FROM new_invetories ni
    WHERE NOT EXISTS (SELECT 1 FROM museum_schema.inventory i
                      WHERE i.art_id = ni.art_id)
    RETURNING art_id, inventory_number
)
SELECT * FROM inserted_inventory;

-- SELECT * FROM museum_schema.inventory i ;

--Exhibition
WITH new_exhibitions AS (
    SELECT 'Paintings' AS theme, 'Offline' AS "type", '2024-12-01'::date AS event_date
    UNION ALL
    SELECT 'Artifacts', 'Online', '2024-09-01'::date
    UNION ALL
    SELECT 'Antiques', 'Offline', '2024-12-02'::date
    UNION ALL
    SELECT 'Artifacts', 'Online', '2024-11-30'::date
    UNION ALL
    SELECT 'Leonardo da Vinci', 'Online', '2024-12-02'::date
    UNION ALL
    SELECT 'Antiques', 'Offline', '2024-09-12'::date
    UNION ALL
    SELECT 'Modern Art', 'Offline', '2025-02-15'::date
    UNION ALL
    SELECT 'Sculpture', 'Offline', '2025-03-10'::date
    UNION ALL
    SELECT 'Dutch Masters', 'Online', '2025-04-05'::date
    UNION ALL
    SELECT 'Impressionism', 'Offline', '2025-05-20'::date
), inserted_exhibitions AS (
    INSERT INTO museum_schema.exhibition (theme, "type", event_date)
    SELECT theme, "type", event_date
    FROM new_exhibitions ne
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.exhibition e
        WHERE e."type" = ne."type" AND e.event_date = ne.event_date
    ) ORDER BY event_date ASC
    RETURNING exhibition_id, theme, "type", event_date
)
SELECT * FROM inserted_exhibitions;

-- SELECT * FROM museum_schema.exhibition e ;

--Exhibition inventory
WITH new_exhibition_inventory AS (
-- Artifacts 2024-11-30
    SELECT
    	(SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Online' AND event_date = '2024-11-30'::date) AS exhibition_id,
    	(SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Altyn Adam'))) AS inventory_id
-- Paintings 2024-12-01
     UNION ALL
     SELECT
         (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2024-12-01'::date),
         (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Starry Night')))
     UNION ALL
     SELECT
         (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2024-12-01'::date),
         (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Impression, Sunrise')))
     UNION ALL
     SELECT
         (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2024-12-01'::date),
         (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Big Wave off Kanagawa')))
     UNION ALL
     SELECT
         (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2024-12-01'::date),
         (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Almond Blossoms')))
--    --Leonardo da Vinci 2024-12-02
     UNION ALL
     SELECT
         (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Online' AND event_date = '2024-12-02'::date),
         (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id =
         (SELECT art_id FROM museum_schema.art_artist aa JOIN museum_schema.artist ast USING(artist_id) JOIN museum_schema.art using(art_id)
         WHERE lower(art."name") = lower('Leonardo da Vinci’s Codex Leicester')
         AND lower(ast.full_name) = lower('Leonardo da Vinci')))  --implemented only FOR this line
--     -- Antiques 2024-12-02
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2024-12-02'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Pinner Qing Dynasty Vase')))
--     -- Modern Art 2025-02-15
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2025-02-15'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Persistence of Memory')))
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2025-02-15'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Composition VIII')))
--     -- Sculpture 2025-03-10
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2025-03-10'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('The Thinker')))
--     -- Dutch Masters 2025-04-05
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Online' AND event_date = '2025-04-05'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Girl with a Pearl Earring')))
--     -- Impressionism 2025-05-20
     UNION ALL
     SELECT
        (SELECT exhibition_id FROM museum_schema.exhibition WHERE "type" = 'Offline' AND event_date = '2025-05-20'::date),
        (SELECT inventory_id FROM museum_schema.inventory
                WHERE art_id = (SELECT art_id FROM museum_schema.art WHERE lower("name") = lower('Impression, Sunrise')))
), inserted_exhibition_inventory AS (
    INSERT INTO museum_schema.exhibition_inventory (exhibition_id, inventory_id)
    SELECT exhibition_id, inventory_id
    FROM new_exhibition_inventory nei
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.exhibition_inventory ei
          WHERE ei.exhibition_id = nei.exhibition_id
          AND ei.inventory_id = nei.inventory_id
    )
    RETURNING inventory_id, exhibition_id
)
SELECT * FROM inserted_exhibition_inventory;

-- SELECT * FROM museum_schema.exhibition_inventory ei;

SELECT * FROM museum_schema.inventory JOIN museum_schema.art using(art_id);

--EMPLOYEE
WITH new_employees AS (
    SELECT 'John' AS "name", 'Doe' AS surname, 'Curator' AS role, '1980-03-15'::date AS date_of_birth, '123456789012' AS personal_id
    UNION ALL
    SELECT 'Jane', 'Smith', 'Security', '1990-07-22'::date, '234567890123'
    UNION ALL
    SELECT 'Sam', 'Brown', 'Guide', '1995-06-10'::date, '345678901234'
    UNION ALL
    SELECT 'Emily', 'Johnson', 'Manager', '1985-04-05'::date, '456789012345'
    UNION ALL
    SELECT 'Michael', 'Davis', 'Guide', '1992-02-18'::date, '567890123456'
    UNION ALL
    SELECT 'Sarah', 'Wilson', 'Designer', '1988-11-25'::date, '678901234567'
    UNION ALL
    SELECT 'Aigerim', 'Nurlanova', 'Restorer', '1987-09-03'::date, '870903450128'
    UNION ALL
    SELECT 'Daniyar', 'Seitkali', 'Guide', '1998-01-27'::date, '980127350914'
    UNION ALL
    SELECT 'Olga', 'Petrova', 'Cashier', '1993-12-08'::date, '931208450377'
    UNION ALL
    SELECT 'Arman', 'Tulegenov', 'Security', '1983-06-14'::date, '830614350662'
),
filtered_employees AS ( -- checking uniqueness OF person ids among tables
    SELECT *
    FROM new_employees ne
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.visitor v
        WHERE ne.personal_id = v.personal_id
    )
),
inserted_employees AS (
    INSERT INTO museum_schema.employee ("name", surname, role, date_of_birth, personal_id)
    SELECT "name", surname, role, date_of_birth, personal_id
    FROM filtered_employees fe
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.employee e
        WHERE e.personal_id = fe.personal_id
    )
    RETURNING "name", surname, ROLE, date_of_birth, personal_id
)
SELECT * FROM inserted_employees;

-- SELECT * FROM museum_schema.employee;

--EMPLOYEE EXHIBITION
WITH new_employee_exhibition AS (
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')) AS exhibition_id,
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '678901234567') AS employee_id
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Online')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '678901234567')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '456789012345')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '234567890123')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '567890123456')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Online')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '345678901234')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-02-15'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '123456789012')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-03-10'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '870903450128')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-04-05'::date AND lower("type") = lower('Online')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '980127350914')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-05-20'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '931208450377')
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-05-20'::date AND lower("type") = lower('Offline')),
    (SELECT employee_id FROM museum_schema.employee WHERE personal_id = '830614350662')
), inserted_employee_exhibition AS (
    INSERT INTO museum_schema.employee_exhibition (exhibition_id, employee_id)
    SELECT exhibition_id, employee_id
    FROM new_employee_exhibition
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.employee_exhibition ee
        WHERE ee.exhibition_id = new_employee_exhibition.exhibition_id
          AND ee.employee_id = new_employee_exhibition.employee_id
    ) ORDER BY exhibition_id
    RETURNING exhibition_id, employee_id
)
SELECT * FROM inserted_employee_exhibition;

-- SELECT * FROM museum_schema.employee_exhibition;

--VISITORS
WITH new_visitors AS (
    SELECT 'Alice' AS "name", 'Adams' AS surname, '789012345678' AS personal_id
    UNION ALL
    SELECT 'Bob', 'Baker', '890123456789'
    UNION ALL
    SELECT 'Charlie', 'Chaplin', '901234567890'
    UNION ALL
    SELECT 'David', 'Duncan', '234565890123'
    UNION ALL
    SELECT 'Eva', 'Edwards', '345678701234'
    UNION ALL
    SELECT 'Frank', 'Foster', '456789032345'
    UNION ALL
    SELECT 'Aliya', 'Kassymova', '010315650487'
    UNION ALL
    SELECT 'Nurlan', 'Abenov', '990722350219'
    UNION ALL
    SELECT 'Madina', 'Sarsenova', '000418650733'
    UNION ALL
    SELECT 'Timur', 'Bekov', '970909350548'
),
filtered_visitors AS (
    SELECT *
    FROM new_visitors nv
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.employee e
        WHERE e.personal_id = nv.personal_id
    )
),
inserted_visitors AS (
    INSERT INTO museum_schema.visitor ("name", surname, personal_id)
    SELECT "name", surname, personal_id
    FROM filtered_visitors fv
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.visitor v
        WHERE v.personal_id = fv.personal_id
    )
    RETURNING "name", surname, personal_id
)
SELECT * FROM inserted_visitors;

-- SELECT * FROM museum_schema.visitor;

--VISITOR EXHIBITION

WITH new_exhibition_visitor AS (
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-01'::date AND lower("type") = lower('Offline')) AS exhibition_id,
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '890123456789') AS visitor_id,
    3000.00 AS ticket_price_kzt
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Online')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '789012345678'), 1000.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '901234567890'), 3000.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '456789032345'), 1500.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '234565890123'), 3000.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2024-12-02'::date AND lower("type") = lower('Online')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '345678701234'), 1000.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-02-15'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '010315650487'), 3500.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-03-10'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '990722350219'), 2500.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-04-05'::date AND lower("type") = lower('Online')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '000418650733'), 0.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-05-20'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '970909350548'), 3500.00
    UNION ALL
    SELECT (SELECT exhibition_id FROM museum_schema.exhibition WHERE event_date = '2025-05-20'::date AND lower("type") = lower('Offline')),
    (SELECT visitor_id FROM museum_schema.visitor WHERE personal_id = '890123456789'), 1750.00
), inserted_exhibition_visitor AS (
    INSERT INTO museum_schema.exhibition_visitor (exhibition_id, visitor_id, ticket_price_kzt)
    SELECT exhibition_id, visitor_id, ticket_price_kzt
    FROM new_exhibition_visitor
    WHERE NOT EXISTS (
        SELECT 1
        FROM museum_schema.exhibition_visitor ev
        WHERE ev.exhibition_id = new_exhibition_visitor.exhibition_id
          AND ev.visitor_id = new_exhibition_visitor.visitor_id
    ) ORDER BY exhibition_id
    RETURNING exhibition_id, visitor_id, ticket_price_kzt
)
SELECT * FROM inserted_exhibition_visitor;

--5. Create the following functions.
--5.1 Create a function that updates data in one of your tables. This function should take the following input arguments:
CREATE OR REPLACE FUNCTION museum_schema.update_art_column(
    art_id INT,
    upd_column_name TEXT,
    new_value TEXT
)
RETURNS VOID AS $$
DECLARE affected_rows INT;
BEGIN
	--check for existing column_name
	IF NOT EXISTS (
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'museum_schema'
          AND table_name = 'art'
          AND column_name = upd_column_name
    ) THEN
        RAISE NOTICE 'Column "%" does not exist in table "art".', upd_column_name;
        RETURN;
    END IF;

	--Updating table
    EXECUTE format('UPDATE museum_schema.art SET %I = $1 WHERE art_id = $2', upd_column_name)
    USING new_value, art_id;

	-- Get the number of affected rows
    GET DIAGNOSTICS affected_rows = ROW_COUNT;

    -- Check if any row was affected
    IF affected_rows = 0 THEN
        RAISE NOTICE 'No row found with art_id = %', art_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

--DROP FUNCTION museum_schema.update_art_column(bigint,text,text);

SELECT museum_schema.update_art_column(
    (SELECT art_id FROM museum_schema.art a WHERE lower("name") = lower('Altyn Adam')),
    'description',
    'Founded in Kazakhstan, famous thing'
);
SELECT * FROM museum_schema.art a ;

--6. Create a view that presents analytics for the most recently added quarter in your database.
--Ensure that the result excludes irrelevant fields such as surrogate keys and duplicate entries.
--DROP VIEW IF EXISTS museum_schema.for_manual_analytics_recent_quarter;
--Through this view we can get analysis by each exhibitions and other.
DROP VIEW IF EXISTS museum_schema.analytics_recent_quarter;
CREATE VIEW museum_schema.analytics_recent_quarter AS
SELECT
    e.theme AS exhibition_theme,
    e."type" AS exhibition_type,
    e.event_date AS exhibition_date,
    EXTRACT(QUARTER FROM e.event_date) AS quarter,
    a."name" AS art_name,
    c.category AS category_name,
    ar.full_name AS artist_name,
    v.full_name AS visitor_name
FROM
    museum_schema.exhibition e
LEFT JOIN
    museum_schema.exhibition_inventory ei ON e.exhibition_id = ei.exhibition_id
LEFT JOIN
    museum_schema.inventory i ON ei.inventory_id = i.inventory_id
LEFT JOIN
    museum_schema.art a ON i.art_id = a.art_id
LEFT JOIN
    museum_schema.category c ON a.category_id = c.category_id
LEFT JOIN
    museum_schema.art_artist aa ON a.art_id = aa.art_id
LEFT JOIN
    museum_schema.artist ar ON aa.artist_id = ar.artist_id
LEFT JOIN
    museum_schema.exhibition_visitor ev ON e.exhibition_id = ev.exhibition_id
LEFT JOIN
    museum_schema.visitor v ON ev.visitor_id = v.visitor_id
WHERE
    EXTRACT(YEAR FROM e.event_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND
    EXTRACT(QUARTER FROM e.event_date) = EXTRACT(QUARTER FROM CURRENT_DATE);

-- Views that gets total counts of exhibitions and visitors in quarter
CREATE OR REPLACE VIEW museum_schema.total_results_of_quarter AS
SELECT
    COUNT(DISTINCT (e.event_date, e."type")) AS total_exhibitions,
    COUNT(v.full_name) AS total_vistors
FROM
    museum_schema.exhibition e
LEFT JOIN
    museum_schema.exhibition_visitor ev ON e.exhibition_id = ev.exhibition_id
LEFT JOIN
    museum_schema.visitor v ON ev.visitor_id = v.visitor_id
WHERE
    EXTRACT(YEAR FROM e.event_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND
    EXTRACT(QUARTER FROM e.event_date) = EXTRACT(QUARTER FROM CURRENT_DATE);

SELECT * FROM museum_schema.analytics_recent_quarter;
SELECT * FROM museum_schema.total_results_of_quarter;

--7. Create a read-only role for the manager. This role should have permission to perform SELECT queries on the database tables, and also be able to log in.
--Please ensure that you adhere to best practices for database security when defining this role

--Creating role
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'manager_read_only') THEN
        CREATE ROLE manager_read_only LOGIN PASSWORD 'secret_password';
    END IF;
END $$;

-- Grant CONNECT to the current database
DO $$
BEGIN
    EXECUTE format('GRANT CONNECT ON DATABASE %I TO manager_read_only', current_database());
END $$;

--Granting SELECT all tables
GRANT USAGE ON SCHEMA museum_schema TO manager_read_only;
GRANT SELECT ON ALL TABLES IN SCHEMA museum_schema TO manager_read_only;

SET ROLE manager_read_only;
SELECT current_user;

--Checking for select privilige

SELECT art_id, "name", category_id, creation_year, width_cm, height_cm, insurance_value_kzt, description FROM museum_schema.art;
SELECT art_artist_id, art_id, artist_id FROM museum_schema.art_artist;
SELECT artist_id, "name", surname, full_name, date_of_birth, description FROM museum_schema.artist;
--SELECT category_id, category FROM museum_schema.category;
--SELECT employee_id, "name", surname, full_name, "role", date_of_birth, personal_id FROM museum_schema.employee;
--SELECT employee_exhibition_id, exhibition_id, employee_id FROM museum_schema.employee_exhibition;
--SELECT exhibition_id, theme, "type", event_date FROM museum_schema.exhibition;
--SELECT exhibition_inventory_id, inventory_id, exhibition_id FROM museum_schema.exhibition_inventory;
--SELECT exhibition_visitor_id, exhibition_id, visitor_id, ticket_price_kzt FROM museum_schema.exhibition_visitor;
--SELECT inventory_id, art_id, inventory_number, storage_location, acquisition_date FROM museum_schema.inventory;
--SELECT visitor_id, "name", surname, full_name, personal_id FROM museum_schema.visitor;

RESET ROLE;

