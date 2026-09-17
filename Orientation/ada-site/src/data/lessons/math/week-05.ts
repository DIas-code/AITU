import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 5,
  minutes: 60,
  title: { en: "Mid-term exam and analysis of variance", ru: "Рубежный экзамен и дисперсионный анализ" },
  summary: {
    en: "The exam covers weeks 1–4. The new material is ANOVA: comparing means across three or more groups by splitting the total variance in two.",
    ru: "Экзамен закрывает недели 1–4. Новый материал — дисперсионный анализ: сравнение средних в трёх и более группах через разложение общей дисперсии надвое.",
  },
  goals: {
    en: [
      "Revise weeks 1–4 against a compact checklist before the mid-term",
      "Explain why running many pairwise t-tests instead of ANOVA inflates the error rate",
      "Decompose total variation into between-group and within-group parts",
      "Read an ANOVA table and say what the F statistic and its p-value mean",
    ],
    ru: [
      "Повторить недели 1–4 по компактному чек-листу перед рубежным контролем",
      "Объяснять, почему серия попарных t-тестов вместо ANOVA раздувает вероятность ошибки",
      "Раскладывать общую вариацию на межгрупповую и внутригрупповую части",
      "Читать таблицу дисперсионного анализа и говорить, что означают F и его p-значение",
    ],
  },
  sections: [
    {
      heading: { en: "What the mid-term covers", ru: "Что на рубежном контроле" },
      body: {
        en: [
          "The exam window is 5–10 October and it covers weeks 1 to 4. It is worth 40 points, the other 60 of this attestation having come from laboratory works 1–4 that you have already handed in weekly.",
          "Written exam means no pandas. Practise the arithmetic by hand: a mean and a sample variance from a short list, a standard error, a confidence interval, a t statistic, and the interpretation sentence that goes with each. Interpretation questions carry more marks than computation, because computation is what a computer does.",
        ],
        ru: [
          "Окно экзамена — 5–10 октября, он закрывает недели с первой по четвёртую. Он стоит 40 баллов; остальные 60 этой аттестации набраны лабораторными 1–4, которые ты уже сдавал еженедельно.",
          "Письменный экзамен означает, что pandas не будет. Тренируй арифметику руками: среднее и выборочная дисперсия по короткому списку, стандартная ошибка, доверительный интервал, статистика t и предложение с интерпретацией к каждому. Вопросы на интерпретацию весят больше, чем на вычисление, потому что вычисления делает компьютер.",
        ],
      },
      table: {
        head: { en: ["Week", "Must be able to", "Typical question"], ru: ["Неделя", "Уметь", "Типичный вопрос"] },
        rows: [
          ["1", "mean, median, s², IQR, scales", "why n − 1; read a boxplot"],
          ["2", "Bayes, E[X], Var(X), 3 distributions", "diagnostic test; pick a distribution"],
          ["3", "SE, CLT, confidence interval", "interpret a CI correctly"],
          ["4", "H₀/H₁, p-value, errors, pick a test", "define a p-value; which test"],
        ],
        rowsRu: [
          ["1", "среднее, медиана, s², IQR, шкалы", "почему n − 1; чтение боксплота"],
          ["2", "Байес, E[X], Var(X), 3 распределения", "диагностический тест; выбор распределения"],
          ["3", "SE, ЦПТ, доверительный интервал", "верно интерпретировать ДИ"],
          ["4", "H₀/H₁, p-значение, ошибки, выбор теста", "определение p; какой тест"],
        ],
      },
    },
    {
      heading: { en: "Why not just run t-tests on every pair", ru: "Почему нельзя просто прогнать t-тесты по всем парам" },
      body: {
        en: [
          "With three groups there are three pairwise comparisons; with five groups there are ten. Each carries its own 5 % chance of a false positive, and the probability that at least one comparison fires by accident climbs quickly: for ten comparisons it is 1 − 0.95¹⁰ ≈ 40 %.",
          "ANOVA replaces the whole family with a single test of one global null hypothesis: all group means are equal. One test, one α, no inflation. Only if that test rejects do you go looking for which pairs differ, and then you use a post-hoc procedure such as Tukey's HSD, which builds the correction for multiplicity into itself.",
        ],
        ru: [
          "При трёх группах попарных сравнений три, при пяти — десять. У каждого свой 5 % шанс ложноположительного, и вероятность того, что хотя бы одно сработает случайно, растёт быстро: для десяти сравнений это 1 − 0,95¹⁰ ≈ 40 %.",
          "Дисперсионный анализ заменяет всё это семейство одним тестом одной глобальной нулевой гипотезы: все групповые средние равны. Один тест, одна α, никакого раздувания. Только если этот тест отверг гипотезу, идут искать, какие именно пары различаются, и тогда применяют post-hoc процедуру вроде HSD Тьюки, в которую поправка на множественность уже встроена.",
        ],
      },
      key: {
        en: "ANOVA answers 'is there any difference at all'. It never tells you which groups differ — that is the job of the post-hoc test that follows a rejection.",
        ru: "ANOVA отвечает на вопрос «есть ли различия вообще». Он никогда не говорит, какие именно группы различаются, — это работа post-hoc теста, который следует за отвержением.",
      },
    },
    {
      heading: { en: "Splitting the variance", ru: "Разложение дисперсии" },
      body: {
        en: [
          "The idea behind the name: total variation in the data can be split into two additive parts. Variation between the group means, which is what the grouping explains, and variation within the groups, which the grouping does not explain and which serves as the noise baseline.",
          "If the grouping matters, the between-group part is large relative to the within-group part. If the grouping is irrelevant, both parts estimate the same underlying noise and their ratio hovers around one. That ratio, adjusted for degrees of freedom, is the F statistic.",
          "Each sum of squares is turned into a mean square by dividing by its degrees of freedom: k − 1 between, where k is the number of groups, and N − k within, where N is the total number of observations. F is then MS_between / MS_within, and it is compared against the F distribution with those two degrees-of-freedom parameters.",
        ],
        ru: [
          "Идея, стоящая за названием: общую вариацию данных можно разложить на две складывающиеся части. Вариация между групповыми средними — то, что объясняет группировка, — и вариация внутри групп, которую группировка не объясняет и которая служит уровнем шума.",
          "Если группировка важна, межгрупповая часть велика относительно внутригрупповой. Если группировка не важна, обе части оценивают один и тот же шум, и их отношение колеблется около единицы. Это отношение, поправленное на степени свободы, и есть статистика F.",
          "Каждая сумма квадратов превращается в средний квадрат делением на свои степени свободы: k − 1 для межгрупповой, где k — число групп, и N − k для внутригрупповой, где N — общее число наблюдений. Тогда F = MS_меж / MS_внутр и сравнивается с распределением F с этими двумя параметрами степеней свободы.",
        ],
      },
      formula: {
        tex: "SS_{\\text{total}}=SS_{\\text{between}}+SS_{\\text{within}},\\qquad F=\\frac{SS_{\\text{between}}/(k-1)}{SS_{\\text{within}}/(N-k)}",
        note: {
          en: "k is the number of groups, N the total number of observations. Under H₀ the expected value of F is close to 1; large F is evidence against equal means.",
          ru: "k — число групп, N — общее число наблюдений. При верной H₀ ожидаемое значение F близко к 1; большое F — свидетельство против равенства средних.",
        },
      },
      pitfall: {
        en: "F is always positive and the test is one-sided in the upper tail only — you are asking whether the between-group variance is unusually large, never unusually small. Looking up a two-sided critical value here is a standard exam error.",
        ru: "F всегда положительна, и тест односторонний только по верхнему хвосту: спрашивается, необычно ли велика межгрупповая дисперсия, а не необычно ли мала. Искать здесь двустороннее критическое значение — типичная экзаменационная ошибка.",
      },
    },
    {
      heading: { en: "Assumptions and the ANOVA table", ru: "Предпосылки и таблица дисперсионного анализа" },
      body: {
        en: [
          "One-way ANOVA assumes the observations are independent, the residuals within each group are approximately normal, and the group variances are roughly equal — homogeneity of variance. The third is the one that fails most often; Levene's test checks it, and when it fails Welch's ANOVA is the drop-in replacement.",
          "The output is conventionally a table with one row per source of variation. Read it in this order: the F statistic, its p-value, and then η² = SS_between / SS_total, which is the share of total variation the grouping explains. That last number is the effect size, and a significant F with η² = 0.01 means you have detected something real and tiny.",
        ],
        ru: [
          "Однофакторный ANOVA предполагает независимость наблюдений, примерную нормальность остатков внутри каждой группы и примерное равенство групповых дисперсий — гомогенность дисперсий. Третья предпосылка нарушается чаще всего; проверяет её тест Левена, а при нарушении прямая замена — ANOVA Уэлча.",
          "Результат по традиции оформляется таблицей с одной строкой на источник вариации. Читать её нужно в таком порядке: статистика F, её p-значение, затем η² = SS_меж / SS_общ — доля общей вариации, объяснённая группировкой. Последнее число и есть величина эффекта, и значимое F при η² = 0,01 означает, что ты обнаружил нечто реальное и крошечное.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "One-way ANOVA and what follows it", ru: "Однофакторный ANOVA и что за ним следует" },
        code: `from scipy import stats
import pandas as pd

a = df.loc[df.group == "A", "score"]
b = df.loc[df.group == "B", "score"]
c = df.loc[df.group == "C", "score"]

# предпосылка о равенстве дисперсий
print(stats.levene(a, b, c))

# сам тест
f, p = stats.f_oneway(a, b, c)
print(f"F = {f:.2f}, p = {p:.4f}")

# величина эффекта: доля объяснённой вариации
grand = df["score"].mean()
ss_between = sum(len(g) * (g.mean() - grand) ** 2 for g in (a, b, c))
ss_total = ((df["score"] - grand) ** 2).sum()
print("eta^2 =", round(ss_between / ss_total, 3))

# если F значима — какие пары различаются
from statsmodels.stats.multicomp import pairwise_tukeyhsd
print(pairwise_tukeyhsd(df["score"], df["group"]))`,
        out: {
          en: "Levene first, then f_oneway, then η², then Tukey only if you rejected. Running Tukey without a significant F is putting the answer before the question.",
          ru: "Сначала Левен, потом f_oneway, потом η², и только при отвержении — Тьюки. Запускать Тьюки без значимой F значит ставить ответ впереди вопроса.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: three teaching methods", ru: "Разбор: три метода обучения" },
    intro: {
      en: "Three groups of 5 students each are taught by different methods and take the same test. A: 72, 75, 78, 74, 76. B: 80, 83, 79, 82, 81. C: 74, 71, 73, 75, 72. Do the methods differ?",
      ru: "Три группы по 5 студентов обучаются разными методами и пишут один и тот же тест. A: 72, 75, 78, 74, 76. B: 80, 83, 79, 82, 81. C: 74, 71, 73, 75, 72. Различаются ли методы?",
    },
    steps: [
      {
        text: {
          en: "Group means and the grand mean. N = 15, k = 3.",
          ru: "Групповые средние и общее среднее. N = 15, k = 3.",
        },
        formula: { tex: "\\bar{x}_A=75,\\quad \\bar{x}_B=81,\\quad \\bar{x}_C=73,\\quad \\bar{x}=\\frac{75+81+73}{3}=76{,}33" },
      },
      {
        text: {
          en: "Between-group sum of squares: each group's squared distance from the grand mean, weighted by its size.",
          ru: "Межгрупповая сумма квадратов: квадрат отклонения каждой группы от общего среднего, взвешенный её размером.",
        },
        formula: { tex: "SS_{b}=5\\big[(75-76{,}33)^2+(81-76{,}33)^2+(73-76{,}33)^2\\big]\\approx 5(1{,}77+21{,}81+11{,}09)=173{,}3" },
      },
      {
        text: {
          en: "Within-group sum of squares: deviations from each group's own mean. Group A gives 10, B gives 10, C gives 10.",
          ru: "Внутригрупповая сумма квадратов: отклонения от собственного среднего каждой группы. Группа A даёт 10, B — 10, C — 10.",
        },
        formula: { tex: "SS_{w}=10+10+10=30" },
      },
      {
        text: {
          en: "Mean squares and F. Degrees of freedom: k − 1 = 2 between, N − k = 12 within.",
          ru: "Средние квадраты и F. Степени свободы: k − 1 = 2 межгрупповых, N − k = 12 внутригрупповых.",
        },
        formula: { tex: "MS_b=\\frac{173{,}3}{2}=86{,}7,\\quad MS_w=\\frac{30}{12}=2{,}5,\\quad F=\\frac{86{,}7}{2{,}5}\\approx 34{,}7" },
      },
      {
        text: {
          en: "The critical value F(2, 12) at 5 % is 3.89. Our 34.7 is far beyond it, so we reject equality of means. Effect size: η² = 173.3 / 203.3 ≈ 0.85, meaning the method explains 85 % of the variation in scores.",
          ru: "Критическое значение F(2, 12) на уровне 5 % равно 3,89. Наши 34,7 намного больше, значит равенство средних отвергается. Величина эффекта: η² = 173,3 / 203,3 ≈ 0,85 — метод объясняет 85 % вариации баллов.",
        },
      },
    ],
    conclusion: {
      en: "Report: F(2, 12) = 34.7, p < 0.001, η² = 0.85. The methods differ, and the difference is large. Now — and only now — run Tukey's HSD to find that B stands apart from both A and C, while A and C are close to each other.",
      ru: "В отчёт: F(2, 12) = 34,7, p < 0,001, η² = 0,85. Методы различаются, и различие велико. Теперь — и только теперь — запускаем HSD Тьюки и обнаруживаем, что B отстоит и от A, и от C, а A и C близки друг к другу.",
    },
  },
  exercises: [
    {
      q: { en: "Why not run three t-tests on three groups instead of one ANOVA?", ru: "Почему не прогнать три t-теста на трёх группах вместо одного ANOVA?" },
      a: { en: "Three comparisons at α = 0.05 give a family-wise false positive rate of 1 − 0.95³ ≈ 14 %, nearly three times the nominal level. ANOVA tests one global hypothesis at one α and keeps the rate at 5 %. With five groups the ten pairwise tests would push the rate to about 40 %.", ru: "Три сравнения при α = 0,05 дают групповую вероятность ложноположительного 1 − 0,95³ ≈ 14 %, почти втрое выше номинальной. ANOVA проверяет одну глобальную гипотезу на одном α и держит уровень 5 %. При пяти группах десять попарных тестов подняли бы его примерно до 40 %." },
    },
    {
      q: { en: "F = 1.02, p = 0.38. What do you conclude, and what must you not do next?", ru: "F = 1,02, p = 0,38. Какой вывод и чего делать дальше нельзя?" },
      a: { en: "F near 1 means the between-group variance is no larger than the within-group noise, so there is no evidence the group means differ. You must not proceed to post-hoc pairwise tests: the global test did not reject, and hunting through pairs afterwards reintroduces exactly the multiplicity problem ANOVA was protecting you from.", ru: "F около 1 означает, что межгрупповая дисперсия не больше внутригруппового шума, значит свидетельств различия групповых средних нет. Нельзя переходить к post-hoc попарным тестам: глобальный тест не отверг гипотезу, а перебор пар после этого возвращает ровно ту проблему множественности, от которой ANOVA защищал." },
    },
    {
      q: { en: "Levene's test gives p = 0.002. What does that mean for your ANOVA?", ru: "Тест Левена даёт p = 0,002. Что это значит для твоего ANOVA?" },
      a: { en: "The assumption of equal group variances is violated. The ordinary F test can then be misleading, particularly when group sizes are unequal. Switch to Welch's ANOVA, which does not assume homogeneity, or transform the variable — a log transform often stabilises variance in right-skewed data.", ru: "Предпосылка о равенстве групповых дисперсий нарушена. Обычный F-тест тогда может вводить в заблуждение, особенно при неравных размерах групп. Переходи на ANOVA Уэлча, который гомогенности не требует, либо преобразуй переменную — логарифм часто стабилизирует дисперсию у скошенных вправо данных." },
    },
    {
      q: { en: "SS_between = 40, SS_within = 360, k = 4, N = 40. Compute F and η², and comment.", ru: "SS_меж = 40, SS_внутр = 360, k = 4, N = 40. Посчитай F и η² и прокомментируй." },
      a: { en: "MS_between = 40/3 ≈ 13.3, MS_within = 360/36 = 10, so F ≈ 1.33 — close to 1, and nowhere near the critical F(3, 36) ≈ 2.87. η² = 40/400 = 0.10, meaning the grouping accounts for a tenth of the variation. So even the point estimate of the effect is modest and the test does not reject: with this sample there is no case to make.", ru: "MS_меж = 40/3 ≈ 13,3, MS_внутр = 360/36 = 10, значит F ≈ 1,33 — близко к 1 и далеко от критического F(3, 36) ≈ 2,87. η² = 40/400 = 0,10: группировка объясняет десятую часть вариации. То есть даже точечная оценка эффекта скромна, а тест не отвергает гипотезу — на этой выборке утверждать нечего." },
    },
    {
      q: { en: "F is significant with p < 0.001 but η² = 0.008. How do you report this?", ru: "F значима при p < 0,001, но η² = 0,008. Как это подать в отчёте?" },
      a: { en: "As a real but negligible difference. The grouping explains under 1 % of the variation; the significance comes from a large sample, not a large effect. Report both numbers together and say plainly that the difference, while statistically detectable, is unlikely to matter for any practical decision. Reporting only p < 0.001 here would be misleading by omission.", ru: "Как реальное, но пренебрежимо малое различие. Группировка объясняет меньше 1 % вариации; значимость идёт от большой выборки, а не от большого эффекта. Указывай оба числа вместе и прямо пиши, что различие, будучи статистически обнаружимым, вряд ли важно для практического решения. Указать здесь только p < 0,001 значило бы ввести в заблуждение умолчанием." },
    },
  ],
  checklist: {
    en: [
      "I have revised weeks 1–4 against the table above and closed every gap",
      "I can compute a mean, s², SE, a CI and a t statistic on paper without a computer",
      "I can explain the multiple comparisons problem with the 1 − 0.95ᵏ arithmetic",
      "I can decompose SS_total into between and within and say what each represents",
      "I always report η² next to F, and I never run post-hoc tests after a non-significant F",
    ],
    ru: [
      "Повторил недели 1–4 по таблице выше и закрыл все пробелы",
      "Могу посчитать среднее, s², SE, ДИ и статистику t на бумаге без компьютера",
      "Могу объяснить проблему множественных сравнений через арифметику 1 − 0,95ᵏ",
      "Могу разложить SS_общ на межгрупповую и внутригрупповую и сказать, что каждая означает",
      "Всегда указываю η² рядом с F и никогда не запускаю post-hoc после незначимой F",
    ],
  },
};
