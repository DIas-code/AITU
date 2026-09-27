# AITU — учебный сайт магистратуры (ADA, 1 курс)

Один статический сайт на все курсы — **весь в папке `Website/`**, открывается файлом `Website/index.html`, без сервера. Описание для Диаса — `Website/README.md` (держать актуальным).
**Никакой автоматики:** нет сборщиков, генераторов и скриптов. Диас говорит «добавь X» — я руками правлю HTML и `Website/_shared/sitemap.js`.

## Где что

```
Website/index.html               главная: ближайшие сроки, курсы, календарь, сроки по неделям
Website/deadlines.html           дедлайны Moodle: по неделям / по предметам
Website/_shared/sitemap.js       ЕДИНСТВЕННАЯ карта сайта: курсы, недели, страницы, сроки
Website/_shared/site.css         общая оболочка (цвета, шапка, блоки урока .step/.why/.code)
Website/_shared/site.js          шапка, полоска недель, «назад/дальше», подсветка кода, RU/EN
Website/_shared/data.js          даты недель, «через N дней»
Website/_shared/course.js        страница курса целиком строится из sitemap.js
Website/<Курс>/course.html       страница курса (пустышка, всё рисует course.js)
Website/<Курс>/weekN/*.html      страницы уроков
```

**Сайт и материалы разделены.** У курса в sitemap два пути: `dir` — папка страниц внутри `Website/` (от неё `href` страниц), `materials` — исходная папка курса в `Aitu/` (`../Math/` и т.п.; от неё `files`, `src`, `syllabus`, `extras`). Материалы не копировать.

Курсы (id → страницы → материалы):
- `math` → `Website/Mathematics for Data Science/` → `Math/`. Страницы `weekN/formulas.html`, `weekN/lecture.html`, `reference/calculators.html`, `reference/tables.html`; свой CSS `math.css`, `reference/calc.js`. Двуязычные RU/EN (`<span lang="ru">`/`<span lang="en">`, в sitemap `bi: true`), формулы через MathJax.
- `prog` → `Website/Programming for Data Analysis and Database/` → `Programing for data analysis/` (там неделя 3 — папка `Week3`).
- `eng` → `Website/Foreign Language (Professional) C1/` → `Prof english/`. Пока только страница курса + ссылки на готовые HTML (`extras`).
- `ped` → `Website/Pedagogy of Higher Education/` → `pedagogy/`. Пока только страница курса.
- `Orientation/` — оставлен как есть, ссылки с главной (`orientation.dir: '../Orientation/'`).

Даты: неделя 1 = 07.09.2026, 10 недель, midterm 05–10.10, endterm 09–14.11, сессия 16–28.11 (из академ. календаря).

## Дедлайны из Moodle (`deadlines.html`)

Два режима: «По неделям» (пн–вс, стрелки между неделями) и «По предметам»; фильтр по курсу. Занятия `Attendance` выбрасываются.
- Разбор календаря — `Website/_shared/moodle.js`. Курс берётся из CATEGORIES («Курс | Преподаватель»), тип — из SUMMARY (`is due`, `opens`, `closes`). URL заданий в календаре AITU нет. Дедлайн ровно в 00:00 показывается как 24:00 предыдущего дня.
- Живые данные: если запущен `Dias Calendar` (`npm run dev`, порт 3000), страница берёт календарь с `localhost:3000/api/ics`. Ссылка с токеном — только в `Dias Calendar/.env.local` (в .gitignore).
- Иначе — снимок `Website/_shared/moodle-snapshot.js` (в .gitignore). «Обнови дедлайны» = скачать календарь по ссылке из `.env.local` и перезаписать снимок (`window.MOODLE_SNAPSHOT = {fetchedAt, ics}`).
- Курсы Moodle сопоставляются с sitemap по полю `moodle` у курса; незнакомые получают стабильный цвет по названию.

## Правила Диаса

- **Короткие страницы.** Один ноутбук / одна лекция = одна страница. Длинное — делить.
- **Programming:** из ноутбука только код, который реально использовался, и объяснение — что, зачем, как. Без вывода ячеек, без «всего, что там происходило». Результат — коротким комментарием в коде (`# → 25`), и только проверенный запуском.
- **Math:** карточка формулы = ровно 4 пункта (что это, где используется, как используется, пример) + источник (лекция, слайд). Два языка, не вперемешку. Числа в примерах проверять запуском.
- Разным предметам — разный дизайн содержимого; общая только оболочка (`_shared/site.css`).
- Ничего не удалять без явной команды Диаса.

## Как добавить

**Страницу урока:** скопировать соседнюю страницу того же курса (например `Website/Programming for Data Analysis and Database/week3/3-1-numpy.html`), поменять `data-page` на путь страницы внутри курса, заголовок и блоки `<section class="step">`. Код внутри `<pre><code class="language-python">` — экранировать `<`, `>`, `&`. Потом добавить строку в `pages` курса в `_shared/sitemap.js` (`w`, `href`, `title`, для Programming — `src` на ноутбук).

**Срок:** `tasks` курса в `sitemap.js`. Статусы «сдано / не сдано» **не ведём** — Диас так решил, календарь сдачу не видит; сроки — только напоминания («сегодня / завтра / через N дн.»). **Сроки — по точной дате.** Если задание есть в Moodle, брать дату оттуда: `due: 'YYYY-MM-DD', time: 'HH:MM', moodle: true` (Moodle важнее силлабуса). Без `due` срок ориентировочный — суббота недели `w` по силлабусу.

**Материалы недели:** `files` у нужной недели в `weeks` курса.

## Отложено

- **Переименовать папки** в полные названия курсов: `Math` → `Mathematics for Data Science`, `Programing for data analysis` → `Programming for Data Analysis and Database`, `Prof english` → `Foreign Language (Professional) C1`, `pedagogy` → `Pedagogy of Higher Education`. 27.09 не вышло: папки держали VS Code (Jupyter) и PowerPoint. После переименования поменять только `materials` в `sitemap.js`.
- **Кандидаты на удаление (ждут команды Диаса):** корневой `site/` (старый Astro), `Programing for data analysis/site/` + `build.py` + `commands_data.py` (старый генератор), в `Math/`: `build_site.py`, `content.py`, `index.html`, `week*-formulas.html`, `week*-lecture.html`, `calculators.html`, `tables.html`, `assets/`, `_old-index.html`, `_extracted/`.
  В `Math/_old-index.html` есть разделы, которых нет в новом сайте: шпаргалка, дерево выбора критерия, разборы Assignment 1 и Practice 1, список источников. Перед удалением спросить, нужны ли они.
- Напоминания о дедлайнах в почту / Telegram — Диас хочет, но позже.
- Справочник функций из старого PDA-сайта (`commands_data.py`, страница commands.html) в новый сайт не перенесён.
