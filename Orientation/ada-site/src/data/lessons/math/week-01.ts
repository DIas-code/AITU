import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 1,
  minutes: 60,
  title: { en: "Descriptive statistics and types of data", ru: "Описательная статистика и типы данных" },
  summary: {
    en: "How to describe a dataset before analysing it: measurement scales, centre, spread, and the plots that reveal what the numbers hide.",
    ru: "Как описать набор данных до всякого анализа: шкалы измерения, центр, разброс и графики, которые показывают то, что скрывают числа.",
  },
  goals: {
    en: [
      "Tell nominal, ordinal, interval and ratio data apart, and know which statistics each one allows",
      "Compute and interpret mean, median, mode, quartiles, variance and the coefficient of variation",
      "Explain why the sample variance divides by n − 1",
      "Read a histogram and a boxplot, and say what each of them cannot show you",
    ],
    ru: [
      "Различать номинальные, порядковые, интервальные и относительные данные и знать, какие статистики для каждого допустимы",
      "Считать и интерпретировать среднее, медиану, моду, квартили, дисперсию и коэффициент вариации",
      "Объяснять, почему выборочная дисперсия делится на n − 1",
      "Читать гистограмму и боксплот и говорить, чего каждый из них не показывает",
    ],
  },
  sections: [
    {
      heading: { en: "Measurement scales decide what you may compute", ru: "Шкала измерения решает, что вообще можно считать" },
      body: {
        en: [
          "Before any formula, ask what kind of variable you are holding. Statistics that are meaningful on one scale are nonsense on another, and this is the single most common source of an embarrassing result in a lab report.",
          "There are four scales. Nominal data are labels with no order: city, specialisation, browser. You may count frequencies and take the mode; an average city is meaningless. Ordinal data have an order but no defined distance: exam grades A to F, a satisfaction scale from 1 to 5. You may take the median and quartiles; the mean is defensible only if you are willing to assume the gaps are equal, which they usually are not. Interval data have equal distances but an arbitrary zero: temperature in Celsius, calendar years. Differences make sense, ratios do not — 20 °C is not twice as warm as 10 °C. Ratio data have equal distances and a true zero: height, income, counts, duration. Everything is allowed, including ratios and the coefficient of variation.",
          "In pandas the scale is not stored anywhere. A column of integers 1 to 5 could be a rating (ordinal) or a count of children (ratio), and the library will happily average both. Deciding the scale is your job, and it belongs at the top of every notebook.",
        ],
        ru: [
          "До всякой формулы спроси, какого типа переменная у тебя в руках. Статистики, осмысленные на одной шкале, на другой — бессмыслица, и это самый частый источник конфузного результата в отчёте по лабораторной.",
          "Шкал четыре. Номинальные данные — метки без порядка: город, специальность, браузер. Можно считать частоты и моду; средний город смысла не имеет. Порядковые имеют порядок, но не имеют определённого расстояния: оценки от A до F, шкала удовлетворённости от 1 до 5. Можно медиану и квартили; среднее оправдано, только если готов допустить, что промежутки равны, а они обычно не равны. Интервальные имеют равные расстояния, но произвольный ноль: температура по Цельсию, календарные годы. Разности осмысленны, отношения — нет: 20 °C не вдвое теплее 10 °C. Относительные имеют равные расстояния и настоящий ноль: рост, доход, количество, длительность. Разрешено всё, включая отношения и коэффициент вариации.",
          "В pandas шкала нигде не хранится. Столбец целых чисел от 1 до 5 может быть рейтингом (порядковая шкала) или числом детей (относительная), и библиотека с удовольствием усреднит оба. Определять шкалу — твоя работа, и её место в самом начале каждого ноутбука.",
        ],
      },
      table: {
        head: {
          en: ["Scale", "Example", "Centre", "Allowed"],
          ru: ["Шкала", "Пример", "Центр", "Что можно"],
        },
        rows: [
          ["Nominal", "city, browser", "mode", "counts, frequencies, χ²"],
          ["Ordinal", "grade A–F, rating 1–5", "median", "order, quartiles, rank correlation"],
          ["Interval", "°C, calendar year", "mean", "differences, but not ratios"],
          ["Ratio", "income, height, count", "mean", "everything, incl. CV and ratios"],
        ],
        rowsRu: [
          ["Номинальная", "город, браузер", "мода", "частоты, χ²"],
          ["Порядковая", "оценка A–F, рейтинг 1–5", "медиана", "порядок, квартили, ранговая корреляция"],
          ["Интервальная", "°C, календарный год", "среднее", "разности, но не отношения"],
          ["Относительная", "доход, рост, количество", "среднее", "всё, включая CV и отношения"],
        ],
      },
      pitfall: {
        en: "Averaging a satisfaction rating from 1 to 5 and reporting 3.7 implies the step from 1 to 2 equals the step from 4 to 5. Almost never true. Report the median and the distribution instead.",
        ru: "Усреднить рейтинг удовлетворённости от 1 до 5 и написать 3,7 — значит утверждать, что шаг от 1 к 2 равен шагу от 4 к 5. Почти никогда не так. Давайте медиану и распределение.",
      },
    },
    {
      heading: { en: "Centre: mean, median, mode", ru: "Центр: среднее, медиана, мода" },
      body: {
        en: [
          "The arithmetic mean is the balance point of the data: the value that makes the deviations sum to zero. It uses every observation, which is its strength and its weakness — one extreme value drags it.",
          "The median is the middle of the ordered sample. It ignores how far away the extremes are, only how many there are, which is what makes it robust. For income data the mean and the median can differ by a factor of two, and the gap between them is itself information: it tells you the distribution is skewed.",
          "The mode is the most frequent value. It is the only centre available for nominal data and is worth reporting whenever a distribution has two peaks — a bimodal shape usually means two populations mixed into one table.",
        ],
        ru: [
          "Среднее арифметическое — точка равновесия данных: значение, при котором сумма отклонений равна нулю. Оно использует каждое наблюдение, и в этом его сила и его слабость: одно экстремальное значение тянет его за собой.",
          "Медиана — середина упорядоченной выборки. Ей не важно, насколько далеко экстремумы, важно только сколько их, — отсюда её устойчивость. На данных о доходах среднее и медиана могут отличаться вдвое, и сам разрыв между ними — информация: он говорит, что распределение скошено.",
          "Мода — самое частое значение. Это единственный центр, доступный для номинальных данных, и её стоит указывать всегда, когда у распределения два пика: бимодальная форма обычно означает две популяции, смешанные в одной таблице.",
        ],
      },
      formula: {
        tex: "\\bar{x}=\\frac{1}{n}\\sum_{i=1}^{n}x_i",
        note: {
          en: "x̄ is the sample mean, n the number of observations, xᵢ the i-th value. The population mean is written μ.",
          ru: "x̄ — выборочное среднее, n — число наблюдений, xᵢ — i-е значение. Генеральное среднее обозначают μ.",
        },
      },
      key: {
        en: "Mean vs median is the fastest skew test you have. Mean > median means a right tail; mean < median a left tail; roughly equal means symmetry.",
        ru: "Сравнение среднего и медианы — самый быстрый тест на скошенность. Среднее больше медианы — правый хвост, меньше — левый, примерно равны — симметрия.",
      },
    },
    {
      heading: { en: "Spread, and why n − 1", ru: "Разброс и почему n − 1" },
      body: {
        en: [
          "A centre without a spread is useless: two datasets with the same mean can look nothing alike. The range is the crudest measure and depends entirely on two observations. Variance is the average squared deviation from the mean, and the standard deviation is its square root, which returns the result to the original units.",
          "The subtlety that gets tested: the sample variance divides by n − 1, not n. The reason is that deviations are measured from x̄, which was itself computed from the same data and sits as close to them as possible. That makes the sum of squares systematically too small. Dividing by n − 1 — Bessel's correction — compensates and gives an unbiased estimate of the population variance. The quantity n − 1 is the number of degrees of freedom: once x̄ is fixed, only n − 1 deviations can vary freely, because the last one is determined by the requirement that they sum to zero.",
          "The coefficient of variation, CV = s / x̄, expresses spread relative to level and has no units. It is what lets you say that a process with a mean of 5 and a standard deviation of 1 is far more variable than one with a mean of 500 and a standard deviation of 20. It requires a true zero, so it is defined for ratio data only.",
        ],
        ru: [
          "Центр без разброса бесполезен: два набора с одинаковым средним могут не иметь между собой ничего общего. Размах — самая грубая мера, зависящая целиком от двух наблюдений. Дисперсия — среднее квадратичное отклонение от среднего, а стандартное отклонение — её корень, который возвращает результат в исходные единицы.",
          "Тонкость, которую спрашивают: выборочная дисперсия делится на n − 1, а не на n. Причина в том, что отклонения считаются от x̄, которое само вычислено по этим же данным и лежит к ним максимально близко. Из-за этого сумма квадратов систематически занижена. Деление на n − 1 — поправка Бесселя — компенсирует смещение и даёт несмещённую оценку генеральной дисперсии. Величина n − 1 — это число степеней свободы: когда x̄ зафиксировано, свободно меняться могут только n − 1 отклонений, потому что последнее определено требованием, чтобы их сумма была нулём.",
          "Коэффициент вариации CV = s / x̄ выражает разброс относительно уровня и не имеет единиц измерения. Именно он позволяет сказать, что процесс со средним 5 и стандартным отклонением 1 куда изменчивее, чем процесс со средним 500 и отклонением 20. Он требует настоящего нуля, поэтому определён только для относительной шкалы.",
        ],
      },
      formula: {
        tex: "s^{2}=\\frac{1}{n-1}\\sum_{i=1}^{n}\\left(x_i-\\bar{x}\\right)^{2},\\qquad s=\\sqrt{s^{2}},\\qquad CV=\\frac{s}{\\bar{x}}",
        note: {
          en: "s² is the sample variance, s the sample standard deviation, CV the coefficient of variation. For the whole population the divisor is n and the symbols are σ² and σ.",
          ru: "s² — выборочная дисперсия, s — выборочное стандартное отклонение, CV — коэффициент вариации. Для всей генеральной совокупности делитель равен n, а обозначения — σ² и σ.",
        },
      },
      pitfall: {
        en: "NumPy's np.var() and np.std() divide by n by default. pandas' .var() and .std() divide by n − 1. The same data will give you two different answers depending on which library you reached for. Pass ddof=1 in NumPy when you mean the sample estimate.",
        ru: "np.var() и np.std() в NumPy по умолчанию делят на n. У pandas .var() и .std() делят на n − 1. Одни и те же данные дадут разные ответы в зависимости от того, за какой библиотекой ты потянулся. В NumPy передавай ddof=1, когда имеешь в виду выборочную оценку.",
      },
    },
    {
      heading: { en: "Quartiles, the boxplot and outliers", ru: "Квартили, боксплот и выбросы" },
      body: {
        en: [
          "Quartiles cut the ordered data into four equal parts. Q1 is the value below which a quarter of observations lie, Q2 is the median, Q3 leaves a quarter above. The interquartile range IQR = Q3 − Q1 is a robust measure of spread: it describes the middle half and is completely indifferent to what happens in the tails.",
          "A boxplot draws exactly this: a box from Q1 to Q3 with the median inside, whiskers extending to the furthest point within 1.5 × IQR of the box, and anything beyond drawn as a separate point. That 1.5 is a convention, not a law of nature, and a point outside the whiskers is a candidate for inspection, not a verdict of error.",
          "What a boxplot cannot show you is shape. A symmetric unimodal distribution and a sharply bimodal one can produce the same box. That is why the boxplot and the histogram are used together and never as substitutes: the histogram shows the shape, the box shows the summary.",
        ],
        ru: [
          "Квартили режут упорядоченные данные на четыре равные части. Q1 — значение, ниже которого лежит четверть наблюдений, Q2 — медиана, Q3 оставляет четверть выше себя. Межквартильный размах IQR = Q3 − Q1 — устойчивая мера разброса: он описывает среднюю половину и совершенно безразличен к тому, что творится в хвостах.",
          "Боксплот рисует ровно это: ящик от Q1 до Q3 с медианой внутри, усы до самой дальней точки в пределах 1,5 × IQR от ящика, а всё, что дальше, — отдельными точками. Эти 1,5 — соглашение, а не закон природы, и точка за усами — кандидат на проверку, а не приговор об ошибке.",
          "Чего боксплот показать не может — это форму. Симметричное одномодальное распределение и резко бимодальное могут дать одинаковый ящик. Поэтому боксплот и гистограмму используют вместе и никогда не подменяют одно другим: гистограмма показывает форму, ящик — сводку.",
        ],
      },
      formula: {
        tex: "\\text{IQR}=Q_3-Q_1,\\qquad \\text{выброс, если } x<Q_1-1{,}5\\,\\text{IQR}\\ \\text{ или }\\ x>Q_3+1{,}5\\,\\text{IQR}",
        note: {
          en: "The 1.5 × IQR rule is Tukey's convention. For a normal distribution it flags roughly 0.7 % of observations, so on 10 000 rows you should expect about 70 flagged points with nothing wrong at all.",
          ru: "Правило 1,5 × IQR — соглашение Тьюки. Для нормального распределения оно помечает около 0,7 % наблюдений, так что на 10 000 строк ожидай примерно 70 помеченных точек при полном отсутствии проблем.",
        },
      },
    },
    {
      heading: { en: "Doing it in Python", ru: "Как это делается на Python" },
      body: {
        en: [
          "Everything above is one call away. The point of the lab is not to compute the numbers but to say what they mean, so leave time for the interpretation paragraph.",
        ],
        ru: [
          "Всё вышеописанное вызывается одной строкой. Смысл лабораторной не в том, чтобы получить числа, а в том, чтобы сказать, что они означают, — оставляй время на абзац с интерпретацией.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "A minimal descriptive summary", ru: "Минимальная описательная сводка" },
        code: `import pandas as pd
import numpy as np

df = pd.read_csv("data.csv")

# сводка по всем числовым столбцам
print(df.describe())

x = df["income"]
print("mean   ", x.mean())
print("median ", x.median())
print("mode   ", x.mode().iloc[0])
print("std    ", x.std())          # делит на n-1
print("np.std ", np.std(x, ddof=1)) # то же самое явно
print("CV     ", x.std() / x.mean())

q1, q3 = x.quantile([0.25, 0.75])
iqr = q3 - q1
mask = (x < q1 - 1.5 * iqr) | (x > q3 + 1.5 * iqr)
print("выбросов:", mask.sum())`,
        out: {
          en: "describe() gives count, mean, std, min, the three quartiles and max in one table — start every lab with it.",
          ru: "describe() выдаёт количество, среднее, стандартное отклонение, минимум, три квартиля и максимум одной таблицей — начинай с неё каждую лабораторную.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: nine salaries", ru: "Разбор: девять зарплат" },
    intro: {
      en: "A department reports monthly salaries in thousands of tenge: 180, 200, 210, 220, 230, 240, 250, 260, 1400. The last one is the head of department. Watch what each statistic does with it.",
      ru: "Отдел сообщает зарплаты в тысячах тенге: 180, 200, 210, 220, 230, 240, 250, 260, 1400. Последняя — руководителя отдела. Смотри, что делает с ней каждая статистика.",
    },
    steps: [
      {
        text: {
          en: "Sum all nine values and divide by nine. The single large salary lifts the mean above eight of the nine observations.",
          ru: "Складываем девять значений и делим на девять. Одна большая зарплата поднимает среднее выше, чем у восьми из девяти сотрудников.",
        },
        formula: { tex: "\\bar{x}=\\frac{180+200+210+220+230+240+250+260+1400}{9}=\\frac{3190}{9}\\approx 354{,}4" },
      },
      {
        text: {
          en: "The median is the fifth value of the ordered nine. It does not care that the largest value is 1400 rather than 400.",
          ru: "Медиана — пятое значение из девяти упорядоченных. Ей всё равно, что максимум равен 1400, а не 400.",
        },
        formula: { tex: "\\text{Me}=x_{(5)}=230" },
      },
      {
        text: {
          en: "Mean well above median is the signature of a right tail. The gap of 124 is not noise — it is the outlier speaking.",
          ru: "Среднее много выше медианы — подпись правого хвоста. Разрыв в 124 — не шум, это говорит выброс.",
        },
      },
      {
        text: {
          en: "Quartiles on nine ordered points: Q1 is the median of the lower half, Q3 of the upper half. The IQR describes the middle staff and stays small.",
          ru: "Квартили на девяти упорядоченных точках: Q1 — медиана нижней половины, Q3 — верхней. IQR описывает основной состав и остаётся небольшим.",
        },
        formula: { tex: "Q_1=205,\\quad Q_3=255,\\quad \\text{IQR}=50" },
      },
      {
        text: {
          en: "Apply Tukey's rule. The upper fence sits at 330, so 1400 is flagged — correctly, and without the fence being dragged by the value it is testing.",
          ru: "Применяем правило Тьюки. Верхняя граница равна 330, значит 1400 помечается — верно, причём сама граница не сдвинута тем значением, которое проверяет.",
        },
        formula: { tex: "Q_3+1{,}5\\cdot\\text{IQR}=255+75=330 \\;<\\; 1400" },
      },
    ],
    conclusion: {
      en: "Report: median 230, IQR 50, one flagged high value at 1400 which is the department head and not an error. Reporting only the mean of 354.4 would describe a department that does not exist — nobody earns that.",
      ru: "Вывод в отчёт: медиана 230, IQR 50, одно помеченное высокое значение 1400 — это руководитель отдела, а не ошибка. Написать только среднее 354,4 значит описать отдел, которого нет: столько не получает никто.",
    },
  },
  exercises: [
    {
      q: { en: "A survey stores answers as 1 = strongly disagree … 5 = strongly agree. Your colleague reports a mean of 4.1. What is wrong, and what should be reported?", ru: "Опрос хранит ответы как 1 = совершенно не согласен … 5 = полностью согласен. Коллега пишет среднее 4,1. Что не так и что нужно указать вместо этого?" },
      hint: { en: "Which scale is this?", ru: "Какая это шкала?" },
      a: { en: "It is an ordinal scale: the distance between 1 and 2 is not known to equal the distance between 4 and 5, so the arithmetic mean has no defined meaning. Report the median, the quartiles and the full frequency distribution across the five categories. In practice means of Likert scales are reported constantly, but you should say explicitly that you are assuming equal intervals.", ru: "Это порядковая шкала: расстояние между 1 и 2 не обязано равняться расстоянию между 4 и 5, поэтому у среднего арифметического нет определённого смысла. Указывать нужно медиану, квартили и полное распределение частот по пяти категориям. На практике средние по шкале Лайкерта считают постоянно, но тогда нужно прямо оговорить допущение о равных интервалах." },
    },
    {
      q: { en: "Two datasets both have mean 50 and standard deviation 10. Can you conclude they have a similar shape?", ru: "Два набора данных имеют среднее 50 и стандартное отклонение 10. Можно ли заключить, что у них похожая форма?" },
      a: { en: "No. Mean and standard deviation fix only the first two moments. A symmetric bell, a uniform spread and a bimodal pair of clusters can all produce the same two numbers. Only a histogram, or additionally skewness and kurtosis, distinguishes them. This is the reason every lab asks for a plot and not just a table.", ru: "Нет. Среднее и стандартное отклонение фиксируют только первые два момента. Симметричный колокол, равномерный разброс и пара кластеров могут дать одни и те же два числа. Различит их только гистограмма или дополнительно коэффициенты асимметрии и эксцесса. Именно поэтому в каждой лабораторной требуют график, а не только таблицу." },
    },
    {
      q: { en: "You compute the standard deviation of the same column with np.std(x) and x.std() and get 12.9 and 13.1. Which is right?", ru: "Считаешь стандартное отклонение одного столбца через np.std(x) и x.std(), получаешь 12,9 и 13,1. Какое верно?" },
      a: { en: "Both are computing what they were asked to. np.std defaults to ddof=0 and divides by n, giving the population formula; pandas .std defaults to ddof=1 and divides by n − 1, the unbiased sample estimate. If your rows are a sample of a larger population — which they nearly always are — the pandas value, 13.1, is the one you want. Write np.std(x, ddof=1) to make the intent explicit.", ru: "Обе считают то, о чём их попросили. У np.std по умолчанию ddof=0 и деление на n — это формула для генеральной совокупности; у pandas .std по умолчанию ddof=1 и деление на n − 1 — несмещённая выборочная оценка. Если твои строки — выборка из большей совокупности, а так почти всегда, нужно значение pandas, то есть 13,1. Пиши np.std(x, ddof=1), чтобы намерение было явным." },
    },
    {
      q: { en: "Sample: 4, 4, 5, 6, 11. Compute the mean, the sample variance and the standard deviation by hand.", ru: "Выборка: 4, 4, 5, 6, 11. Посчитай вручную среднее, выборочную дисперсию и стандартное отклонение." },
      hint: { en: "Deviations first, then squares, then divide by n − 1 = 4.", ru: "Сначала отклонения, потом квадраты, потом деление на n − 1 = 4." },
      a: { en: "Mean = 30 / 5 = 6. Deviations: −2, −2, −1, 0, 5. Squares: 4, 4, 1, 0, 25, summing to 34. Sample variance = 34 / 4 = 8.5. Standard deviation = √8.5 ≈ 2.92. Note the deviations sum to zero — that is the check that the mean is right, and it is also the reason one degree of freedom is lost.", ru: "Среднее = 30 / 5 = 6. Отклонения: −2, −2, −1, 0, 5. Квадраты: 4, 4, 1, 0, 25, сумма 34. Выборочная дисперсия = 34 / 4 = 8,5. Стандартное отклонение = √8,5 ≈ 2,92. Заметь, что сумма отклонений равна нулю — это проверка правильности среднего и одновременно причина потери одной степени свободы." },
    },
    {
      q: { en: "Machine A produces parts with mean length 5 mm and s = 0.5 mm. Machine B: mean 500 mm, s = 20 mm. Which is less stable?", ru: "Станок A выпускает детали со средней длиной 5 мм и s = 0,5 мм. Станок B: среднее 500 мм, s = 20 мм. Какой менее стабилен?" },
      a: { en: "Compare coefficients of variation, since the levels differ by two orders of magnitude. A: 0.5 / 5 = 0.10, so 10 %. B: 20 / 500 = 0.04, so 4 %. Machine A is the less stable one, despite having the far smaller absolute deviation. This works because length is ratio data with a true zero.", ru: "Сравниваем коэффициенты вариации, поскольку уровни отличаются на два порядка. A: 0,5 / 5 = 0,10, то есть 10 %. B: 20 / 500 = 0,04, то есть 4 %. Менее стабилен станок A, несмотря на куда меньшее абсолютное отклонение. Приём работает потому, что длина — относительная шкала с настоящим нулём." },
    },
    {
      q: { en: "A boxplot of 10 000 rows flags 68 points as outliers. Should you remove them?", ru: "Боксплот по 10 000 строк помечает 68 точек как выбросы. Нужно ли их удалять?" },
      a: { en: "No, not on that basis. For normally distributed data the 1.5 × IQR rule flags about 0.7 % of observations by construction, and 68 out of 10 000 is 0.68 % — exactly what you should expect from clean data. Removal is justified by a reason outside the plot: an impossible value, a known instrument fault, a duplicate. Deleting points because a convention drew them outside a whisker is how you manufacture a result.", ru: "Нет, на этом основании — нет. Для нормально распределённых данных правило 1,5 × IQR по построению помечает около 0,7 % наблюдений, а 68 из 10 000 — это 0,68 %, ровно то, чего и следует ждать от чистых данных. Удаление оправдано причиной вне графика: невозможное значение, известный сбой прибора, дубль. Выкидывать точки потому, что соглашение нарисовало их за усом, — это способ изготовить нужный результат." },
    },
  ],
  checklist: {
    en: [
      "I can name the four measurement scales and give an example of each from my own dataset",
      "I can explain n − 1 through degrees of freedom, not as a rule to memorise",
      "I know which of np.std and pandas .std divides by what, and why it matters",
      "I can say what a boxplot hides and which plot fills that gap",
      "My lab report contains a sentence interpreting each number, not only the number",
    ],
    ru: [
      "Могу назвать четыре шкалы измерения и привести пример каждой из своего датасета",
      "Могу объяснить n − 1 через степени свободы, а не как правило для заучивания",
      "Знаю, что и на что делят np.std и pandas .std и почему это важно",
      "Могу сказать, что скрывает боксплот и какой график закрывает этот пробел",
      "В отчёте по лабораторной у каждого числа есть предложение с интерпретацией, а не только само число",
    ],
  },
};
