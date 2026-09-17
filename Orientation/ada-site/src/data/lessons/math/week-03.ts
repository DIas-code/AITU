import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 3,
  minutes: 65,
  title: { en: "Sampling and estimation", ru: "Выборка и оценивание" },
  summary: {
    en: "Why a sample can speak for a population: sampling distributions, the standard error, the central limit theorem and confidence intervals.",
    ru: "Почему выборка может говорить за генеральную совокупность: выборочные распределения, стандартная ошибка, центральная предельная теорема и доверительные интервалы.",
  },
  goals: {
    en: [
      "Separate three distributions that get confused: the population, the sample, and the sampling distribution of a statistic",
      "Compute a standard error and explain why it shrinks as √n and not as n",
      "State the central limit theorem precisely, including its conditions",
      "Build and correctly interpret a 95 % confidence interval",
    ],
    ru: [
      "Разделять три распределения, которые постоянно путают: генеральное, выборочное и выборочное распределение статистики",
      "Считать стандартную ошибку и объяснять, почему она убывает как √n, а не как n",
      "Точно формулировать центральную предельную теорему вместе с её условиями",
      "Строить доверительный интервал 95 % и верно его интерпретировать",
    ],
  },
  sections: [
    {
      heading: { en: "Three distributions, not one", ru: "Три распределения, а не одно" },
      body: {
        en: [
          "Almost every confusion in this week comes from collapsing three different things into the word 'distribution'.",
          "The population distribution is how the variable is spread across everyone. It has parameters μ and σ, which are fixed numbers you do not know. The sample distribution is how your n observations are spread; it has statistics x̄ and s, which you can compute and which change every time you draw a new sample. The sampling distribution is the distribution of the statistic itself across all possible samples of size n — that is, if you drew a thousand samples and computed a thousand x̄ values, how would those thousand numbers be spread?",
          "The third one is the whole point of inferential statistics. You never see it directly, but it is the thing that lets you say how far your single x̄ is likely to be from μ.",
        ],
        ru: [
          "Почти вся путаница этой недели возникает из-за того, что три разные вещи схлопываются в одно слово «распределение».",
          "Генеральное распределение — как признак распределён по всей совокупности. У него параметры μ и σ, это фиксированные числа, которых ты не знаешь. Выборочное распределение — как распределены твои n наблюдений; у него статистики x̄ и s, их можно вычислить, и они меняются при каждой новой выборке. Выборочное распределение статистики — распределение самой статистики по всем возможным выборкам объёма n: если бы ты вытянул тысячу выборок и посчитал тысячу значений x̄, как были бы разбросаны эти тысяча чисел?",
          "Третье и есть весь смысл статистического вывода. Ты никогда не видишь его напрямую, но именно оно позволяет сказать, насколько далеко твоё единственное x̄ может отстоять от μ.",
        ],
      },
      key: {
        en: "s describes the spread of your data. The standard error describes the spread of your estimate. They are different quantities with different sizes, and reporting one where the other is meant is a guaranteed lost mark.",
        ru: "s описывает разброс твоих данных. Стандартная ошибка описывает разброс твоей оценки. Это разные величины разного масштаба, и указать одну вместо другой — гарантированно потерянный балл.",
      },
    },
    {
      heading: { en: "The standard error and the √n law", ru: "Стандартная ошибка и закон √n" },
      body: {
        en: [
          "The standard error of the mean is the standard deviation of the sampling distribution of x̄. Since the sample mean averages away individual noise, it varies less than individual observations do — by a factor of exactly √n.",
          "The √n is worth pausing on, because it governs how much data is worth collecting. To halve your uncertainty you need four times the data; to reduce it tenfold you need a hundred times the data. This is why moving from 100 to 400 respondents is a meaningful improvement and moving from 10 000 to 10 400 is not.",
          "In practice σ is unknown, so s is substituted. That substitution introduces extra uncertainty, and the correction is to use Student's t distribution instead of the normal — with heavier tails that get closer to the normal as n grows. Past roughly n = 30 the difference stops mattering for practical purposes, which is where the folklore rule of thirty comes from.",
        ],
        ru: [
          "Стандартная ошибка среднего — стандартное отклонение выборочного распределения x̄. Поскольку выборочное среднее усредняет индивидуальный шум, оно колеблется меньше, чем отдельные наблюдения, — ровно в √n раз.",
          "На √n стоит остановиться, потому что именно он определяет, сколько данных имеет смысл собирать. Чтобы вдвое уменьшить неопределённость, нужно вчетверо больше данных; чтобы уменьшить её в десять раз — в сто раз больше. Поэтому переход со 100 на 400 респондентов — заметное улучшение, а с 10 000 на 10 400 — нет.",
          "На практике σ неизвестна, поэтому подставляют s. Такая подстановка вносит дополнительную неопределённость, и поправка состоит в переходе от нормального распределения к распределению Стьюдента — с более тяжёлыми хвостами, которые приближаются к нормальным по мере роста n. Примерно после n = 30 разница перестаёт иметь практическое значение — отсюда и фольклорное правило тридцати.",
        ],
      },
      formula: {
        tex: "SE(\\bar{x})=\\frac{\\sigma}{\\sqrt{n}}\\;\\approx\\;\\frac{s}{\\sqrt{n}}",
        note: {
          en: "σ is the population standard deviation, s the sample one, n the sample size. Note that the population size does not appear at all — a sample of 1 000 is equally informative about a city and about a country.",
          ru: "σ — генеральное стандартное отклонение, s — выборочное, n — объём выборки. Обрати внимание: размер генеральной совокупности не входит вовсе — выборка из 1 000 одинаково информативна и про город, и про страну.",
        },
      },
    },
    {
      heading: { en: "The central limit theorem", ru: "Центральная предельная теорема" },
      body: {
        en: [
          "The theorem says that as n grows, the sampling distribution of the mean approaches a normal distribution centred on μ with standard deviation σ/√n — regardless of the shape of the population, provided its variance is finite.",
          "Read that carefully, because it is routinely misquoted. It does not say that your data become normal; skewed data stay skewed no matter how many rows you collect. It says that the average of your data behaves normally. The distinction matters: a t-test on heavily skewed data with n = 500 is fine, because the test is about the mean; a claim that the underlying variable is normal is still false.",
          "The condition of finite variance is not decorative. Distributions with infinite variance, such as the Cauchy, break the theorem outright: the average of a thousand Cauchy draws is no better behaved than a single one.",
        ],
        ru: [
          "Теорема утверждает, что с ростом n выборочное распределение среднего стремится к нормальному с центром μ и стандартным отклонением σ/√n — независимо от формы генерального распределения, при условии конечной дисперсии.",
          "Прочитай внимательно, потому что её постоянно перевирают. Она не говорит, что твои данные становятся нормальными: скошенные данные останутся скошенными, сколько строк ни собирай. Она говорит, что нормально ведёт себя среднее твоих данных. Различие существенно: t-тест на сильно скошенных данных при n = 500 вполне уместен, потому что тест про среднее; а утверждение, что сама переменная нормальна, по-прежнему ложно.",
          "Условие конечной дисперсии не декоративное. Распределения с бесконечной дисперсией, например Коши, ломают теорему полностью: среднее тысячи наблюдений Коши ведёт себя не лучше одного.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Watching the CLT happen", ru: "Как увидеть ЦПТ своими глазами" },
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)

# заведомо ненормальная генеральная совокупность: экспоненциальная
population = rng.exponential(scale=2, size=200_000)

# тысяча выборок по 30, считаем среднее каждой
means = [rng.choice(population, size=30).mean() for _ in range(1000)]

fig, ax = plt.subplots(1, 2, figsize=(10, 3.5))
ax[0].hist(population, bins=60); ax[0].set_title("генеральная: скошена")
ax[1].hist(means, bins=40);      ax[1].set_title("средние по 30: почти нормальны")
plt.tight_layout()

print("σ/√n теоретически:", population.std(ddof=1) / np.sqrt(30))
print("разброс средних:  ", np.std(means, ddof=1))`,
        out: {
          en: "The left plot stays skewed, the right becomes a bell, and the two printed numbers agree to two decimals. That agreement is the theorem.",
          ru: "Левый график остаётся скошенным, правый становится колоколом, а два напечатанных числа совпадают до двух знаков. Это совпадение и есть теорема.",
        },
      },
    },
    {
      heading: { en: "Confidence intervals and what they actually claim", ru: "Доверительные интервалы и что они на самом деле утверждают" },
      body: {
        en: [
          "A confidence interval takes the point estimate and attaches to it a margin of error: the estimate plus and minus a critical value times the standard error. For 95 % confidence with large n the critical value is 1.96, the familiar 'about two standard errors'.",
          "The interpretation is where marks are lost. A 95 % interval does not mean there is a 95 % probability that μ lies inside your particular interval. μ is a fixed number; it is either in there or it is not, and there is no probability about it. The 95 % refers to the procedure: if you repeated the whole study many times, 95 % of the intervals you construct would contain μ. Your one interval is a single draw from that process.",
          "Three things widen an interval: more confidence demanded, a larger s, and a smaller n. Notice you cannot have both a narrow interval and high confidence on a small sample — the arithmetic forbids it, and that is a legitimate finding to report rather than a failure to hide.",
        ],
        ru: [
          "Доверительный интервал берёт точечную оценку и добавляет к ней предел погрешности: оценка плюс-минус критическое значение, умноженное на стандартную ошибку. Для 95 % при большом n критическое значение равно 1,96 — те самые «примерно две стандартные ошибки».",
          "Баллы теряют на интерпретации. Интервал 95 % не означает, что с вероятностью 95 % μ лежит внутри твоего конкретного интервала. μ — фиксированное число; оно либо там, либо нет, и никакой вероятности тут нет. Эти 95 % относятся к процедуре: если повторить всё исследование много раз, 95 % построенных интервалов накроют μ. Твой единственный интервал — один розыгрыш из этого процесса.",
          "Интервал расширяют три вещи: требование большей уверенности, большая s и меньшая n. Заметь, что нельзя одновременно иметь узкий интервал и высокую уверенность на малой выборке — арифметика запрещает, и это законный результат для отчёта, а не провал, который надо прятать.",
        ],
      },
      formula: {
        tex: "\\bar{x}\\;\\pm\\;t_{\\alpha/2,\\,n-1}\\cdot\\frac{s}{\\sqrt{n}}\\qquad\\text{(при большом }n:\\;\\bar{x}\\pm 1{,}96\\cdot\\tfrac{s}{\\sqrt{n}})",
        note: {
          en: "t depends on the degrees of freedom n − 1, exactly the same n − 1 that appeared in the variance in week 1, and for the same reason.",
          ru: "t зависит от числа степеней свободы n − 1 — ровно того же n − 1, что появилось в дисперсии на первой неделе, и по той же причине.",
        },
      },
      pitfall: {
        en: "'95 % of the data lies in this interval' is a different and much wider interval — that is a prediction interval, not a confidence interval. The confidence interval is about where the mean sits, and on large samples it is very narrow.",
        ru: "«95 % данных лежит в этом интервале» — совсем другой и куда более широкий интервал: это интервал предсказания, а не доверительный. Доверительный интервал — про то, где находится среднее, и на больших выборках он очень узкий.",
      },
    },
  ],
  worked: {
    title: { en: "Worked example: average session length", ru: "Разбор: средняя длительность сессии" },
    intro: {
      en: "You sample 64 user sessions. The sample mean is 12.4 minutes with sample standard deviation 4.8 minutes. Estimate the true average session length with 95 % confidence.",
      ru: "Ты берёшь выборку из 64 пользовательских сессий. Выборочное среднее 12,4 минуты, выборочное стандартное отклонение 4,8 минуты. Оцени истинную среднюю длительность сессии с доверием 95 %.",
    },
    steps: [
      {
        text: {
          en: "Identify what you have and what you want. n = 64, x̄ = 12.4, s = 4.8. The target is μ, the mean over all sessions, which you will never observe.",
          ru: "Определим, что есть и что нужно. n = 64, x̄ = 12,4, s = 4,8. Цель — μ, среднее по всем сессиям, которое ты никогда не наблюдаешь.",
        },
      },
      {
        text: {
          en: "Compute the standard error. Note how much smaller it is than s: the data spread over about 4.8 minutes, but the estimate of the mean is pinned to within 0.6.",
          ru: "Считаем стандартную ошибку. Заметь, насколько она меньше s: данные разбросаны примерно на 4,8 минуты, а оценка среднего зафиксирована с точностью до 0,6.",
        },
        formula: { tex: "SE=\\frac{s}{\\sqrt{n}}=\\frac{4{,}8}{\\sqrt{64}}=\\frac{4{,}8}{8}=0{,}6" },
      },
      {
        text: {
          en: "Choose the critical value. With 63 degrees of freedom t is 2.00 to two decimals, essentially the normal 1.96 — the sample is large enough that the distinction is cosmetic.",
          ru: "Выбираем критическое значение. При 63 степенях свободы t равно 2,00 с точностью до двух знаков, то есть практически нормальное 1,96: выборка достаточно велика, чтобы разница была косметической.",
        },
      },
      {
        text: {
          en: "Assemble the interval.",
          ru: "Собираем интервал.",
        },
        formula: { tex: "12{,}4 \\pm 2{,}00\\cdot 0{,}6 = 12{,}4 \\pm 1{,}2 \\;\\Rightarrow\\; [11{,}2;\\;13{,}6]" },
      },
      {
        text: {
          en: "Ask what it would take to halve the margin to ±0.6. Since SE falls as √n, you would need four times the data — 256 sessions, not 128.",
          ru: "Спросим, что нужно, чтобы вдвое сузить погрешность до ±0,6. Поскольку SE убывает как √n, потребуется вчетверо больше данных — 256 сессий, а не 128.",
        },
      },
    ],
    conclusion: {
      en: "Report: the average session length is 12.4 minutes, 95 % CI [11.2; 13.6]. Correct wording: 'the procedure that produced this interval captures the true mean in 95 % of repetitions'. Wrong wording: 'there is a 95 % chance the true mean is between 11.2 and 13.6'.",
      ru: "В отчёт: средняя длительность сессии 12,4 минуты, 95 % ДИ [11,2; 13,6]. Верная формулировка: «процедура, породившая этот интервал, накрывает истинное среднее в 95 % повторений». Неверная: «с вероятностью 95 % истинное среднее лежит между 11,2 и 13,6».",
    },
  },
  exercises: [
    {
      q: { en: "Sample of 100: mean 50, s = 20. Someone reports 'the standard error is 20'. What is wrong?", ru: "Выборка из 100: среднее 50, s = 20. Кто-то пишет «стандартная ошибка равна 20». Что не так?" },
      a: { en: "They reported the sample standard deviation instead of the standard error. SE = s/√n = 20/10 = 2. The confusion changes the confidence interval from ±4 to ±40, which is a twentyfold overstatement of uncertainty. s describes how spread the observations are; SE describes how precisely the mean is pinned down.", ru: "Указано выборочное стандартное отклонение вместо стандартной ошибки. SE = s/√n = 20/10 = 2. Путаница меняет доверительный интервал с ±4 на ±40 — это двадцатикратное преувеличение неопределённости. s описывает разброс наблюдений, SE — насколько точно определено среднее." },
    },
    {
      q: { en: "Your survey of 400 gives a margin of error of ±3 points. Your supervisor wants ±1. How many people do you need?", ru: "Опрос 400 человек даёт погрешность ±3 пункта. Руководитель хочет ±1. Сколько человек нужно?" },
      hint: { en: "The margin scales as 1/√n.", ru: "Погрешность масштабируется как 1/√n." },
      a: { en: "Reducing the margin by a factor of three needs nine times the sample: 400 × 9 = 3 600 people. This is the practical bite of the √n law and the reason polls cluster around a thousand respondents — going further gets expensive fast for very little gain.", ru: "Уменьшение погрешности втрое требует девятикратной выборки: 400 × 9 = 3 600 человек. Это практическое следствие закона √n и причина, по которой опросы группируются около тысячи респондентов: дальше дорожает быстро, а выигрыш мал." },
    },
    {
      q: { en: "Data on income are strongly right-skewed. Can you still use a t-test on 500 observations?", ru: "Данные о доходах сильно скошены вправо. Можно ли применять t-тест на 500 наблюдениях?" },
      a: { en: "Yes. The t-test is a statement about the sample mean, and by the central limit theorem the distribution of the mean is close to normal at n = 500 even though the income data are not. The test does not require the data to be normal; it requires the sampling distribution of the statistic to be. On n = 8 the answer would be different.", ru: "Да. t-тест — утверждение о выборочном среднем, а по центральной предельной теореме распределение среднего при n = 500 близко к нормальному, хотя сами доходы не нормальны. Тест не требует нормальности данных, он требует нормальности выборочного распределения статистики. При n = 8 ответ был бы другим." },
    },
    {
      q: { en: "A 95 % CI for a treatment effect is [−0.4; 2.9]. What can you say?", ru: "95 % ДИ для эффекта воздействия равен [−0,4; 2,9]. Что можно сказать?" },
      a: { en: "The interval includes zero, so an effect of exactly nothing is among the values compatible with your data — you cannot claim a significant effect at the 5 % level. But that is not the same as showing there is no effect: the interval also includes 2.9, a substantial one. The honest report is that the study is too imprecise to distinguish 'no effect' from 'a large effect', which usually means it was underpowered.", ru: "Интервал включает ноль, значит нулевой эффект входит в число значений, совместимых с данными, — заявить о значимом эффекте на уровне 5 % нельзя. Но это не то же самое, что доказать отсутствие эффекта: интервал включает и 2,9, то есть существенный эффект. Честный вывод — исследование слишком неточно, чтобы отличить «эффекта нет» от «эффект большой», а это обычно означает нехватку мощности." },
    },
    {
      q: { en: "Would a 99 % interval on the same data be narrower or wider than the 95 % one?", ru: "Будет ли интервал 99 % на тех же данных уже или шире, чем 95 %?" },
      a: { en: "Wider. More confidence means the procedure must succeed more often, which it can only do by casting a bigger net. The critical value rises from about 1.96 to about 2.58, widening the interval by roughly 32 %. There is no free precision: confidence and width trade off against each other at fixed n.", ru: "Шире. Больше уверенности значит, что процедура должна срабатывать чаще, а добиться этого она может только более широким захватом. Критическое значение растёт примерно с 1,96 до 2,58, расширяя интервал примерно на 32 %. Бесплатной точности нет: при фиксированном n уверенность и ширина обмениваются друг на друга." },
    },
  ],
  checklist: {
    en: [
      "I can name the three distributions and say which one the standard error belongs to",
      "I can explain why quadrupling the sample only halves the margin of error",
      "I can state the CLT without saying 'the data become normal'",
      "I can give the correct interpretation of a 95 % confidence interval in one sentence",
      "I can compute SE and a CI by hand from x̄, s and n",
    ],
    ru: [
      "Могу назвать три распределения и сказать, к какому из них относится стандартная ошибка",
      "Могу объяснить, почему увеличение выборки вчетверо сужает погрешность лишь вдвое",
      "Могу сформулировать ЦПТ, не говоря «данные становятся нормальными»",
      "Могу дать верную интерпретацию 95 % доверительного интервала одним предложением",
      "Могу вручную посчитать SE и ДИ по x̄, s и n",
    ],
  },
};
