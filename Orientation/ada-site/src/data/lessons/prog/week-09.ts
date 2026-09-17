import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "prog",
  week: 9,
  minutes: 60,
  title: { en: "Visualisation and reporting", ru: "Визуализация и отчётность" },
  summary: {
    en: "Choosing the chart from the question, the encodings that people read accurately, the axis rules that decide honesty, and assembling a report someone will act on.",
    ru: "Как выбрать график по вопросу, какие кодировки люди читают точно, правила осей, решающие вопрос честности, и сборка отчёта, по которому кто-то примет решение.",
  },
  goals: {
    en: [
      "Pick a chart type from the question rather than from habit",
      "Rank visual encodings by how accurately people decode them",
      "Apply the axis rules and say when a truncated axis is dishonest",
      "Assemble a report with a narrative rather than a pile of plots",
    ],
    ru: [
      "Выбирать тип графика по вопросу, а не по привычке",
      "Ранжировать визуальные кодировки по точности, с которой их считывают люди",
      "Применять правила осей и говорить, когда обрезанная ось нечестна",
      "Собирать отчёт как повествование, а не как кучу графиков",
    ],
  },
  sections: [
    {
      heading: { en: "The question picks the chart", ru: "Вопрос выбирает график" },
      body: {
        en: [
          "Start from what you are asking, not from the chart menu. Comparing values across categories is a bar chart. Change over time is a line. Relationship between two numeric variables is a scatter. Distribution of one variable is a histogram, or a boxplot when you are comparing several distributions side by side. Composition — parts of a whole — is a stacked bar, and almost never a pie.",
          "The pie chart deserves its bad reputation. People compare angles poorly, so anything beyond three or four slices becomes unreadable, and comparing two pies is hopeless. A horizontal bar chart answers the same question and can be read exactly.",
          "One decision matters more than the chart type: how many things are on the plot. A line chart with fifteen series is a plate of spaghetti. Show the two or three that matter, grey out the rest as context, or split into small multiples — a grid of identical small charts, one per category, which people read remarkably well.",
        ],
        ru: [
          "Начинай с того, что спрашиваешь, а не с меню графиков. Сравнение значений по категориям — столбиковая диаграмма. Изменение во времени — линия. Связь двух числовых переменных — диаграмма рассеяния. Распределение одной переменной — гистограмма или боксплот, когда сравниваешь несколько распределений рядом. Состав, то есть части целого, — составной столбец и почти никогда не круговая диаграмма.",
          "Круговая диаграмма заслужила свою дурную славу. Люди плохо сравнивают углы, поэтому всё, что больше трёх-четырёх секторов, становится нечитаемым, а сравнить две круговые диаграммы безнадёжно. Горизонтальная столбиковая отвечает на тот же вопрос и читается точно.",
          "Одно решение важнее типа графика: сколько объектов на нём. Линейный график с пятнадцатью рядами — тарелка спагетти. Покажи две-три важные линии, остальные приглуши серым как контекст или разбей на малые кратные — сетку одинаковых маленьких графиков по одному на категорию, которую люди читают на удивление хорошо.",
        ],
      },
      table: {
        head: { en: ["Question", "Chart", "Avoid"], ru: ["Вопрос", "График", "Не надо"] },
        rows: [
          ["Which category is largest?", "horizontal bar, sorted", "pie with 8 slices"],
          ["How did it change over time?", "line", "bars for a long series"],
          ["Are x and y related?", "scatter", "two lines on one axis"],
          ["How is it distributed?", "histogram / boxplot", "mean alone in a table"],
          ["Parts of a whole?", "stacked bar", "pie, nested donuts"],
        ],
        rowsRu: [
          ["Какая категория крупнее?", "горизонтальные столбцы, отсортированные", "круговая на 8 секторов"],
          ["Как менялось со временем?", "линия", "столбцы для длинного ряда"],
          ["Связаны ли x и y?", "диаграмма рассеяния", "две линии на одной оси"],
          ["Как распределено?", "гистограмма / боксплот", "одно среднее в таблице"],
          ["Части целого?", "составной столбец", "круговая, вложенные бублики"],
        ],
      },
      key: {
        en: "If a chart needs a paragraph to explain how to read it, replace the chart.",
        ru: "Если графику нужен абзац с объяснением, как его читать, замени график.",
      },
    },
    {
      heading: { en: "Encodings, ranked by accuracy", ru: "Кодировки, упорядоченные по точности" },
      body: {
        en: [
          "Cleveland and McGill established experimentally how accurately people decode different visual encodings. Position along a common scale is the most accurate — which is why bar and line charts and scatter plots dominate. Then length, then angle and slope, then area, then colour intensity, with volume worst of all.",
          "The practical consequence is to put the variable you care about most on position, and to distrust anything that encodes an important quantity by area. Bubble charts are hard to read for exactly this reason: doubling a radius quadruples the area, so readers systematically misjudge the values.",
          "Colour is for categories or for a diverging scale, not for precise quantities. Keep categorical palettes to about seven colours before people stop tracking them, and use a sequential scale for magnitude, a diverging one only when there is a meaningful midpoint such as zero. Never use a rainbow scale for continuous data: it creates false boundaries where the hue changes fast and hides differences where it changes slowly.",
          "Roughly one man in twelve has some form of colour vision deficiency, so never let colour be the only channel carrying meaning. Vary shape, line style or direct labels as well, and check the figure in greyscale.",
        ],
        ru: [
          "Кливленд и Макгилл экспериментально установили, насколько точно люди считывают разные визуальные кодировки. Положение вдоль общей шкалы точнее всего — поэтому и доминируют столбиковые, линейные графики и диаграммы рассеяния. Затем длина, затем угол и наклон, затем площадь, затем интенсивность цвета, а хуже всего объём.",
          "Практическое следствие: помещай самую важную переменную на положение и не доверяй ничему, что кодирует важную величину площадью. Пузырьковые диаграммы трудно читать именно поэтому: удвоение радиуса учетверяет площадь, и читатели систематически ошибаются в оценке значений.",
          "Цвет нужен для категорий или для расходящейся шкалы, но не для точных величин. Держи категориальные палитры примерно в пределах семи цветов, дальше люди перестают их различать, а для величины используй последовательную шкалу; расходящуюся — только когда есть осмысленная середина, например ноль. Никогда не бери радужную шкалу для непрерывных данных: она создаёт ложные границы там, где оттенок меняется быстро, и прячет различия там, где он меняется медленно.",
          "Примерно у одного мужчины из двенадцати есть та или иная форма нарушения цветовосприятия, поэтому цвет никогда не должен быть единственным каналом, несущим смысл. Меняй заодно форму, тип линии или ставь подписи прямо на график и проверяй рисунок в оттенках серого.",
        ],
      },
    },
    {
      heading: { en: "Axes, and where honesty lives", ru: "Оси, и где живёт честность" },
      body: {
        en: [
          "For a bar chart the y axis must start at zero, without exception. The bar encodes quantity by length, so truncating the axis makes a 3 % difference look like a doubling. This is the most common way charts lie, and it is usually done without malice by a default setting.",
          "For a line chart, zero is not required. A line encodes change by slope, so a temperature series from 20 to 25 degrees is perfectly honest on an axis from 19 to 26 — forcing it to zero would flatten the signal into a meaningless straight line. The rule follows from the encoding, not from a superstition about zero.",
          "Two more rules. Label both axes with the quantity and its unit, because 'Revenue, million ₸' is information and 'value' is not. And sort the categories by the value being shown rather than alphabetically, unless the order carries meaning like months — sorting is free and makes the ranking instantly readable.",
        ],
        ru: [
          "Для столбиковой диаграммы ось y обязана начинаться с нуля, без исключений. Столбец кодирует величину длиной, поэтому обрезание оси превращает разницу в 3 % в видимость удвоения. Это самый частый способ, которым графики лгут, и обычно он получается без злого умысла, из настройки по умолчанию.",
          "Для линейного графика ноль не обязателен. Линия кодирует изменение наклоном, поэтому температурный ряд от 20 до 25 градусов совершенно честен на оси от 19 до 26 — принудительный ноль расплющил бы сигнал в бессмысленную прямую. Правило следует из кодировки, а не из суеверия про ноль.",
          "Ещё два правила. Подписывай обе оси величиной и единицей измерения: «Выручка, млн ₸» — это информация, а «значение» — нет. И сортируй категории по показываемому значению, а не по алфавиту, если только порядок не несёт смысла, как месяцы: сортировка бесплатна и делает ранжирование мгновенно читаемым.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "A chart that is ready for a report", ru: "График, готовый для отчёта" },
        code: `import matplotlib.pyplot as plt

d = (monthly.groupby("country")["revenue"].sum()
             .sort_values(ascending=True))          # сортировка — читаемость

fig, ax = plt.subplots(figsize=(7, 4.5))
bars = ax.barh(d.index, d.values / 1e6, color="#4C72B0")

# выделяем то, о чём говорит вывод
bars[-1].set_color("#C44E52")

ax.set_xlim(0, None)                                # столбцы -> ноль обязателен
ax.set_xlabel("Выручка, млн ₸")                     # величина и единица
ax.set_title("Казахстан даёт 38 % выручки", loc="left", fontsize=13)
ax.spines[["top", "right"]].set_visible(False)      # убрать лишние линии
ax.bar_label(bars, fmt="%.1f", padding=3, fontsize=9)
ax.grid(axis="x", alpha=.3)
ax.set_axisbelow(True)
fig.tight_layout()`,
        out: {
          en: "The title states the finding rather than naming the chart. 'Revenue by country' describes the axes; 'Kazakhstan gives 38 % of revenue' tells the reader what to take away.",
          ru: "Заголовок сообщает вывод, а не называет график. «Выручка по странам» описывает оси; «Казахстан даёт 38 % выручки» говорит читателю, что отсюда следует унести.",
        },
      },
      pitfall: {
        en: "matplotlib chooses axis limits automatically, and for bar charts that default is frequently wrong. Always set the lower limit to zero explicitly on a bar chart.",
        ru: "matplotlib выбирает границы осей автоматически, и для столбиковых диаграмм это умолчание часто неверно. На столбиковой диаграмме всегда задавай нижнюю границу нулём явно.",
      },
    },
    {
      heading: { en: "From plots to a report", ru: "От графиков к отчёту" },
      body: {
        en: [
          "A report is an argument, not a gallery. Every figure must earn its place by answering a question that was asked, and it must be followed by a sentence saying what it shows and what follows from it. If you cannot write that sentence, delete the figure.",
          "The structure that works: the question, the data and where it came from, what was wrong with it and what you did, the findings in order of importance, the limitations, and what you would do next. Put the main finding first — readers who stop after two paragraphs should still have the point.",
          "The limitations section is where credibility is won. Naming the sample's biases, the confounders you could not control and the range beyond which your conclusions do not extend reads as command of the material. Omitting it reads as not having thought about it.",
        ],
        ru: [
          "Отчёт — это аргумент, а не галерея. Каждый рисунок обязан заслужить своё место, отвечая на заданный вопрос, и за ним должно идти предложение о том, что он показывает и что из этого следует. Если такое предложение не пишется — удали рисунок.",
          "Работающая структура: вопрос, данные и их происхождение, что с ними было не так и что ты сделал, результаты в порядке важности, ограничения и что делать дальше. Главный вывод — первым: читатель, остановившийся после двух абзацев, всё равно должен унести суть.",
          "Раздел ограничений — там, где зарабатывается доверие. Назвать смещения выборки, конфаундеры, которые не удалось учесть, и диапазон, за который выводы не распространяются, читается как владение материалом. Пропустить его читается как то, что об этом не подумали.",
        ],
      },
    },
  ],
  worked: {
    title: { en: "Worked example: fixing a misleading chart", ru: "Разбор: как починить вводящий в заблуждение график" },
    intro: {
      en: "A colleague sends a bar chart of quarterly revenue: 100, 104, 103, 108 million. On their y axis from 98 to 110, the last bar looks five times the first. Fix it.",
      ru: "Коллега присылает столбиковую диаграмму квартальной выручки: 100, 104, 103, 108 миллионов. На его оси y от 98 до 110 последний столбец выглядит впятеро выше первого. Почини.",
    },
    steps: [
      {
        text: { en: "Diagnose. Bars encode quantity by length, so a truncated axis multiplies apparent differences by an arbitrary factor.", ru: "Диагноз. Столбцы кодируют величину длиной, поэтому обрезанная ось умножает видимые различия на произвольный коэффициент." },
        code: { lang: "python", code: `values = [100, 104, 103, 108]
print("реальный рост:", round((108/100 - 1) * 100, 1), "%")    # 8.0 %
# на оси 98..110 длина столбцов относится как 2 : 6 : 5 : 10 — искажение в 5 раз` },
      },
      {
        text: { en: "Option one: keep bars, restore the zero baseline. Honest, but the 8 % change is now barely visible.", ru: "Вариант первый: оставить столбцы, вернуть ноль. Честно, но изменение в 8 % теперь едва различимо." },
        code: { lang: "python", code: `fig, ax = plt.subplots(figsize=(6, 4))
ax.bar(["Q1","Q2","Q3","Q4"], values, color="#4C72B0")
ax.set_ylim(0, 120)
ax.set_ylabel("Выручка, млн ₸")` },
      },
      {
        text: { en: "Option two: if the small change is the point, switch the encoding. A line encodes by slope and does not require zero.", ru: "Вариант второй: если важно именно небольшое изменение, поменяй кодировку. Линия кодирует наклоном и нуля не требует." },
        code: {
          lang: "python",
          code: `fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(["Q1","Q2","Q3","Q4"], values, marker="o", color="#4C72B0")
ax.set_ylim(95, 112)                      # для линии это допустимо
ax.set_ylabel("Выручка, млн ₸")
ax.set_title("Выручка выросла на 8 % за год", loc="left")`,
        },
      },
      {
        text: { en: "Option three, usually the best: plot the thing you actually care about. If the question is growth, show growth.", ru: "Вариант третий, обычно лучший: рисуй то, что тебя на самом деле интересует. Если вопрос про рост — показывай рост." },
        code: {
          lang: "python",
          code: `import pandas as pd
s = pd.Series(values, index=["Q1","Q2","Q3","Q4"])
growth = (s.pct_change() * 100).round(1)

fig, ax = plt.subplots(figsize=(6, 4))
colors = ["#55A868" if v > 0 else "#C44E52" for v in growth.dropna()]
ax.bar(growth.dropna().index, growth.dropna(), color=colors)
ax.axhline(0, color="black", lw=1)        # ноль здесь осмысленная середина
ax.set_ylabel("Прирост к предыдущему кварталу, %")`,
        },
      },
      {
        text: { en: "Choose and justify. The third chart answers the question directly and needs no defensive explanation.", ru: "Выбираем и обосновываем. Третий график отвечает на вопрос прямо и не требует оправдательных пояснений." },
      },
    ],
    conclusion: {
      en: "The original was not a lie in its numbers — it was a lie in its encoding. The fix is not simply 'always start at zero': the real rule is that the encoding must match the quantity. Length needs a zero baseline; slope does not; and when the interesting quantity is change, plot change rather than levels.",
      ru: "Исходный график лгал не числами, а кодировкой. Лечение не сводится к «всегда начинай с нуля»: настоящее правило в том, что кодировка должна соответствовать величине. Длине нужна нулевая база; наклону — нет; а когда интересна именно динамика, рисуй динамику, а не уровни.",
    },
  },
  exercises: [
    {
      q: { en: "Why must a bar chart start at zero while a line chart need not?", ru: "Почему столбиковая диаграмма обязана начинаться с нуля, а линейная — нет?" },
      a: { en: "Because they encode differently. A bar carries quantity in its length, so length must be proportional to value, which is only true when the baseline is zero — cut the axis and a 3 % difference can look like a doubling. A line carries change in its slope, and slope is unaffected by where the axis starts, so a temperature series from 20 to 25 is honest on an axis from 19 to 26. The rule comes from the encoding, not from a taboo about zero.", ru: "Потому что они кодируют по-разному. Столбец несёт величину длиной, поэтому длина должна быть пропорциональна значению, а это верно только при нулевой базе: обрежь ось — и разница в 3 % будет выглядеть удвоением. Линия несёт изменение наклоном, а наклон не зависит от того, где начинается ось, поэтому температурный ряд от 20 до 25 честен на оси от 19 до 26. Правило идёт из кодировки, а не из табу на ноль." },
    },
    {
      q: { en: "You have 12 product categories to compare. Pie or bar?", ru: "Нужно сравнить 12 категорий товаров. Круговая или столбиковая?" },
      a: { en: "Horizontal bar, sorted by value. Twelve pie slices are unreadable: people decode angle far less accurately than length, and small slices become indistinguishable. A sorted horizontal bar chart gives an immediate ranking, fits long category names without rotating them, and lets the reader compare any two bars directly. If the parts-of-a-whole aspect matters, add the percentage as a label.", ru: "Горизонтальная столбиковая, отсортированная по значению. Двенадцать секторов нечитаемы: угол считывается людьми много хуже длины, а мелкие сектора становятся неразличимы. Отсортированная горизонтальная диаграмма даёт мгновенное ранжирование, вмещает длинные названия категорий без поворота и позволяет прямо сравнить любые два столбца. Если важен аспект «части целого», добавь процент подписью." },
    },
    {
      q: { en: "Your line chart has 15 series. What do you do?", ru: "На твоём линейном графике 15 рядов. Что делать?" },
      a: { en: "Do not try to colour them all — seven is about the limit before a legend stops working. Three options: highlight the two or three series the finding is about and draw the rest in light grey as context; split into small multiples, a grid of small identical charts one per series, which people read well; or aggregate the long tail into an 'other' series. Direct labels at the end of each highlighted line beat a legend, because the reader does not have to look back and forth.", ru: "Не пытайся раскрасить все — семь примерно предел, дальше легенда перестаёт работать. Три варианта: выделить два-три ряда, о которых вывод, а остальные нарисовать светло-серым как контекст; разбить на малые кратные — сетку одинаковых маленьких графиков по одному на ряд, которую люди читают хорошо; либо свернуть длинный хвост в ряд «прочие». Подписи прямо у конца каждой выделенной линии лучше легенды, потому что читателю не приходится бегать глазами туда-сюда." },
    },
    {
      q: { en: "Why is a rainbow colour scale a bad choice for continuous data?", ru: "Почему радужная цветовая шкала — плохой выбор для непрерывных данных?" },
      a: { en: "Because it is not perceptually uniform. Hue changes quickly in some parts of the range and slowly in others, so the eye sees sharp boundaries where the data are smooth and misses real differences elsewhere. It also loses all ordering in greyscale and is hostile to colour vision deficiency. Use a perceptually uniform sequential scale such as viridis for magnitude, and a diverging scale only when there is a meaningful midpoint.", ru: "Потому что она не равномерна перцептивно. Оттенок меняется быстро на одних участках диапазона и медленно на других, поэтому глаз видит резкие границы там, где данные гладкие, и не замечает настоящих различий в других местах. Она вдобавок теряет всякий порядок в оттенках серого и враждебна к нарушениям цветовосприятия. Для величины бери перцептивно равномерную последовательную шкалу вроде viridis, а расходящуюся — только при осмысленной середине." },
    },
    {
      q: { en: "What is wrong with the chart title 'Revenue by country'?", ru: "Что не так с заголовком графика «Выручка по странам»?" },
      a: { en: "It describes the axes, which the axis labels already do, and spends the most prominent line on the page saying nothing. Use the title for the finding: 'Kazakhstan gives 38 % of revenue' or 'Revenue fell in three of five markets'. That way a reader who looks only at the title still leaves with the point, and the chart becomes evidence for a claim rather than a decoration.", ru: "Он описывает оси, что уже делают подписи осей, и тратит самую заметную строку на странице, ничего не сообщая. Отдай заголовок выводу: «Казахстан даёт 38 % выручки» или «Выручка упала на трёх рынках из пяти». Тогда читатель, взглянувший только на заголовок, всё равно унесёт суть, а график станет доказательством утверждения, а не украшением." },
    },
  ],
  checklist: {
    en: [
      "Every chart in my project answers a question that was actually asked",
      "Bar charts start at zero; line charts do not have to and I can explain why",
      "Both axes are labelled with a quantity and a unit",
      "Colour is never the only channel carrying meaning, and I checked in greyscale",
      "Every figure is followed by a sentence of interpretation",
    ],
    ru: [
      "Каждый график в проекте отвечает на реально заданный вопрос",
      "Столбиковые начинаются с нуля; линейные не обязаны, и я могу объяснить почему",
      "Обе оси подписаны величиной и единицей измерения",
      "Цвет никогда не единственный канал смысла, и я проверил в оттенках серого",
      "За каждым рисунком идёт предложение с интерпретацией",
    ],
  },
};
