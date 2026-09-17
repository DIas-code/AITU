import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 4,
  minutes: 70,
  title: { en: "Hypothesis testing", ru: "Проверка гипотез" },
  summary: {
    en: "The logic of the null hypothesis, what a p-value is and is not, the two kinds of error, and which test to reach for.",
    ru: "Логика нулевой гипотезы, что такое p-значение и чем оно не является, два рода ошибок и какой тест выбирать.",
  },
  goals: {
    en: [
      "Formulate a null and an alternative hypothesis for a stated research question",
      "State what a p-value measures, in a sentence that would survive an examiner",
      "Distinguish type I and type II errors and explain the role of power",
      "Choose between a one-sample t-test, a two-sample t-test and a χ² test",
    ],
    ru: [
      "Формулировать нулевую и альтернативную гипотезы по заданному исследовательскому вопросу",
      "Формулировать, что измеряет p-значение, так, чтобы формулировка выдержала экзаменатора",
      "Различать ошибки первого и второго рода и объяснять роль мощности",
      "Выбирать между одновыборочным t-тестом, двухвыборочным t-тестом и критерием χ²",
    ],
  },
  sections: [
    {
      heading: { en: "The logic: assume nothing is happening", ru: "Логика: предположим, что ничего не происходит" },
      body: {
        en: [
          "Hypothesis testing is an argument by contradiction. You assume the boring thing — no difference, no effect, no association — and then ask how surprising your data would be if that assumption were true. If the data are surprising enough, you reject the assumption.",
          "The null hypothesis H₀ always states equality: the mean equals 100, the two groups have the same mean, the variables are independent. The alternative H₁ states what you actually suspect. The asymmetry is deliberate: H₀ is a precise statement you can compute probabilities under, while H₁ is usually vague ('there is some difference') and you could not compute anything from it.",
          "Two consequences follow that trip people up. First, you never prove H₀; failing to reject it means the data were not surprising enough, which could be because H₀ is true or because your sample was too small. Second, the alternative should be chosen before you look at the data, otherwise you are testing a hypothesis the data suggested to you, which is circular.",
        ],
        ru: [
          "Проверка гипотез — рассуждение от противного. Ты предполагаешь скучное: разницы нет, эффекта нет, связи нет, — и спрашиваешь, насколько удивительными были бы твои данные, будь это предположение верным. Если данные достаточно удивительны, предположение отвергается.",
          "Нулевая гипотеза H₀ всегда утверждает равенство: среднее равно 100, у двух групп одинаковое среднее, переменные независимы. Альтернативная H₁ утверждает то, что ты на самом деле подозреваешь. Асимметрия намеренная: H₀ — точное утверждение, при котором можно считать вероятности, а H₁ обычно расплывчата («какая-то разница есть»), и по ней ничего не посчитаешь.",
          "Отсюда два следствия, на которых спотыкаются. Первое: H₀ никогда не доказывают; неспособность её отвергнуть означает, что данные оказались недостаточно удивительными, а это может быть и потому, что H₀ верна, и потому, что выборка мала. Второе: альтернативу нужно выбирать до того, как посмотрел на данные, иначе ты проверяешь гипотезу, которую тебе подсказали эти же данные, — это круг.",
        ],
      },
      key: {
        en: "Rejecting H₀ is a positive finding. Failing to reject it is not a finding at all — it is the absence of one. 'No significant difference' never means 'the groups are the same'.",
        ru: "Отвергнуть H₀ — содержательный результат. Не отвергнуть — не результат вовсе, а его отсутствие. «Значимых различий нет» никогда не означает «группы одинаковы».",
      },
    },
    {
      heading: { en: "The p-value, stated precisely", ru: "p-значение, сформулированное точно" },
      body: {
        en: [
          "The p-value is the probability of observing a result at least as extreme as the one you got, computed under the assumption that H₀ is true. Every word in that sentence is load-bearing, and it is worth memorising verbatim because the exam asks for it.",
          "What it is not: it is not the probability that H₀ is true, it is not the probability that your result happened by chance, and it is not a measure of how large the effect is. The first two are inversions of the conditioning — the same P(A | B) versus P(B | A) trap as in week 2. The third matters practically: with 100 000 rows, a difference of 0.01 units can produce p < 0.001 while being completely irrelevant to any decision.",
          "The threshold α is a decision you make in advance about how much type I error you will tolerate. The conventional 0.05 has no mathematical standing whatsoever — it is a historical accident from Fisher, and reporting the actual p-value alongside a confidence interval and an effect size is far more informative than announcing a verdict.",
        ],
        ru: [
          "p-значение — вероятность получить результат, по меньшей мере столь же экстремальный, как наблюдаемый, вычисленная в предположении, что H₀ верна. В этом предложении несущее каждое слово, и его стоит выучить дословно, потому что именно его спрашивают на экзамене.",
          "Чем оно не является: это не вероятность того, что H₀ верна, не вероятность того, что результат получен случайно, и не мера величины эффекта. Первые два — переворот условия, та же ловушка P(A | B) против P(B | A), что на второй неделе. Третье важно практически: на 100 000 строк разница в 0,01 единицы может дать p < 0,001, будучи совершенно нерелевантной для любого решения.",
          "Порог α — принимаемое заранее решение о том, сколько ошибки первого рода ты готов терпеть. У привычных 0,05 нет никакого математического статуса: это исторический случай, идущий от Фишера, и указать фактическое p-значение вместе с доверительным интервалом и величиной эффекта куда информативнее, чем объявить вердикт.",
        ],
      },
      pitfall: {
        en: "p = 0.049 and p = 0.051 are practically identical pieces of evidence. Treating one as a discovery and the other as nothing is the mechanism behind most of the replication crisis.",
        ru: "p = 0,049 и p = 0,051 — практически одинаковые свидетельства. Считать одно открытием, а другое пустотой — механизм, стоящий за большей частью кризиса воспроизводимости.",
      },
    },
    {
      heading: { en: "Two errors, and power", ru: "Две ошибки и мощность" },
      body: {
        en: [
          "A type I error rejects a true H₀ — a false alarm. Its probability is α, which you set. A type II error fails to reject a false H₀ — a missed detection. Its probability is β, which you do not set directly; it follows from the sample size, the true effect size and α.",
          "Power is 1 − β, the probability of detecting an effect that is genuinely there. It rises with the sample size, with the true effect size, with a looser α and with a smaller σ. A study with 40 % power will miss a real effect more often than it finds it, and running one is close to a waste of resources — which is why power is calculated before data collection, not after.",
          "The trade-off is unavoidable: at fixed n, lowering α to reduce false alarms directly raises β and misses more real effects. The only way to improve both at once is more data.",
        ],
        ru: [
          "Ошибка первого рода отвергает верную H₀ — ложная тревога. Её вероятность α, и её задаёшь ты. Ошибка второго рода не отвергает ложную H₀ — пропуск. Её вероятность β, и её ты не задаёшь напрямую: она следует из объёма выборки, истинной величины эффекта и α.",
          "Мощность — это 1 − β, вероятность обнаружить эффект, который действительно есть. Она растёт с объёмом выборки, с истинной величиной эффекта, при более мягком α и при меньшей σ. Исследование с мощностью 40 % будет пропускать реальный эффект чаще, чем находить, и проводить его — почти пустая трата ресурсов. Поэтому мощность считают до сбора данных, а не после.",
          "Компромисс неизбежен: при фиксированном n снижение α ради уменьшения ложных тревог напрямую повышает β и увеличивает число пропусков. Улучшить оба показателя сразу можно только большим объёмом данных.",
        ],
      },
      table: {
        head: {
          en: ["", "H₀ is true", "H₀ is false"],
          ru: ["", "H₀ верна", "H₀ ложна"],
        },
        rows: [
          ["Rejected H₀", "Type I error, prob. α", "Correct — power, 1 − β"],
          ["Did not reject", "Correct, prob. 1 − α", "Type II error, prob. β"],
        ],
        rowsRu: [
          ["Отвергли H₀", "Ошибка I рода, вер. α", "Верно — мощность, 1 − β"],
          ["Не отвергли", "Верно, вер. 1 − α", "Ошибка II рода, вер. β"],
        ],
      },
    },
    {
      heading: { en: "Choosing the test", ru: "Выбор теста" },
      body: {
        en: [
          "Most of what you need in this course comes down to four situations. One numeric variable compared against a fixed reference value: one-sample t-test. One numeric variable compared between two independent groups: two-sample t-test. The same subjects measured twice, before and after: paired t-test, which is really a one-sample test on the differences. Two categorical variables checked for association: χ² test of independence.",
          "The t-tests assume the sampling distribution of the mean is approximately normal — which the CLT usually grants you — and the two-sample version assumes the groups are independent. If they are not, because the same people appear in both, using the independent test throws away the pairing and loses a great deal of power.",
          "The χ² test works on counts in a contingency table, never on percentages, and it needs the expected count in each cell to be at least about five. On small tables where that fails, Fisher's exact test is the standard replacement.",
        ],
        ru: [
          "Почти всё, что нужно в этом курсе, сводится к четырём ситуациям. Одна числовая переменная сравнивается с фиксированным эталонным значением — одновыборочный t-тест. Одна числовая переменная сравнивается между двумя независимыми группами — двухвыборочный t-тест. Одни и те же испытуемые измерены дважды, до и после, — парный t-тест, который на деле есть одновыборочный тест по разностям. Две категориальные переменные проверяются на связь — критерий χ² на независимость.",
          "t-тесты предполагают, что выборочное распределение среднего примерно нормально, — обычно это обеспечивает ЦПТ, — а двухвыборочный вариант предполагает независимость групп. Если они не независимы, потому что в обеих одни и те же люди, применение независимого теста выбрасывает парность и теряет много мощности.",
          "Критерий χ² работает по частотам в таблице сопряжённости, никогда по процентам, и требует, чтобы ожидаемая частота в каждой ячейке была примерно не меньше пяти. На маленьких таблицах, где это нарушается, стандартная замена — точный критерий Фишера.",
        ],
      },
      formula: {
        tex: "t=\\frac{\\bar{x}-\\mu_0}{s/\\sqrt{n}},\\qquad \\chi^2=\\sum_{i,j}\\frac{(O_{ij}-E_{ij})^2}{E_{ij}}",
        note: {
          en: "The t statistic is 'how many standard errors away from the null value is my estimate'. The χ² statistic is 'how far are the observed counts O from the counts E expected under independence'.",
          ru: "Статистика t — это «на сколько стандартных ошибок моя оценка отстоит от нулевого значения». Статистика χ² — «насколько наблюдаемые частоты O далеки от частот E, ожидаемых при независимости».",
        },
      },
      code: {
        lang: "python",
        caption: { en: "The four tests in scipy", ru: "Четыре теста в scipy" },
        code: `from scipy import stats

# 1. одна выборка против эталона 100
stats.ttest_1samp(x, popmean=100)

# 2. две независимые группы
# equal_var=False — поправка Уэлча, безопаснее по умолчанию
stats.ttest_ind(group_a, group_b, equal_var=False)

# 3. до и после на одних и тех же испытуемых
stats.ttest_rel(before, after)

# 4. связь двух категориальных признаков
table = pd.crosstab(df["group"], df["outcome"])   # частоты, не проценты
chi2, p, dof, expected = stats.chi2_contingency(table)
print((expected < 5).sum(), "ячеек с ожидаемой частотой < 5")`,
        out: {
          en: "Every one of these returns a statistic and a p-value. Always also report the effect size and the confidence interval — the p-value alone answers almost nothing a decision-maker asks.",
          ru: "Каждый из них возвращает статистику и p-значение. Всегда указывай ещё величину эффекта и доверительный интервал: одно p-значение почти не отвечает на вопросы, которые задаёт человек, принимающий решение.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: has the packing weight drifted?", ru: "Разбор: сместился ли вес фасовки?" },
    intro: {
      en: "A machine should fill packets to 500 g. You weigh 25 packets and get x̄ = 496 g with s = 8 g. Has the machine drifted, at α = 0.05?",
      ru: "Автомат должен фасовать пакеты по 500 г. Ты взвешиваешь 25 пакетов и получаешь x̄ = 496 г при s = 8 г. Сместился ли автомат при α = 0,05?",
    },
    steps: [
      {
        text: {
          en: "State the hypotheses before touching the numbers. The question is two-sided: drift in either direction is a problem.",
          ru: "Формулируем гипотезы до всяких вычислений. Вопрос двусторонний: смещение в любую сторону — проблема.",
        },
        formula: { tex: "H_0:\\ \\mu = 500 \\qquad H_1:\\ \\mu \\neq 500" },
      },
      {
        text: {
          en: "Compute the standard error, then the t statistic — how many standard errors the observed mean sits from 500.",
          ru: "Считаем стандартную ошибку, затем статистику t — на сколько стандартных ошибок наблюдаемое среднее отстоит от 500.",
        },
        formula: { tex: "SE=\\frac{8}{\\sqrt{25}}=1{,}6,\\qquad t=\\frac{496-500}{1{,}6}=-2{,}5" },
      },
      {
        text: {
          en: "Compare against the critical value for 24 degrees of freedom, two-sided at 5 %: t* ≈ 2.064. Our |t| = 2.5 exceeds it, so we reject H₀. The corresponding p-value is about 0.020.",
          ru: "Сравниваем с критическим значением при 24 степенях свободы, двусторонне на уровне 5 %: t* ≈ 2,064. Наше |t| = 2,5 его превышает, значит H₀ отвергаем. Соответствующее p-значение около 0,020.",
        },
      },
      {
        text: {
          en: "Now say something useful. A confidence interval gives the range of drifts compatible with the data, which is what the engineer actually needs.",
          ru: "Теперь скажем что-то полезное. Доверительный интервал даёт диапазон смещений, совместимых с данными, — именно это нужно инженеру.",
        },
        formula: { tex: "496 \\pm 2{,}064\\cdot 1{,}6 = 496 \\pm 3{,}3 \\;\\Rightarrow\\; [492{,}7;\\ 499{,}3]" },
      },
      {
        text: {
          en: "Check the interval against the verdict: it excludes 500, which is the same conclusion the test reached. That agreement is not a coincidence — a two-sided test at α rejects exactly when the 1 − α interval excludes the null value.",
          ru: "Сверим интервал с вердиктом: он не содержит 500 — тот же вывод, что и у теста. Совпадение не случайно: двусторонний тест на уровне α отвергает ровно тогда, когда интервал 1 − α не накрывает нулевое значение.",
        },
      },
    ],
    conclusion: {
      en: "Report: mean fill 496 g, 95 % CI [492.7; 499.3], t(24) = −2.5, p = 0.020. The machine is underfilling by an estimated 4 g, plausibly between 0.7 and 7.3 g. Whether that matters is an engineering decision, not a statistical one — and note the interval, not the p-value, is what informs it.",
      ru: "В отчёт: средняя фасовка 496 г, 95 % ДИ [492,7; 499,3], t(24) = −2,5, p = 0,020. Автомат недосыпает примерно 4 г, правдоподобно от 0,7 до 7,3 г. Важно это или нет — инженерное решение, а не статистическое, и заметь, что информацию для него даёт интервал, а не p-значение.",
    },
  },
  exercises: [
    {
      q: { en: "Write in one sentence what p = 0.03 means, and then write the two most common wrong versions.", ru: "Напиши одним предложением, что означает p = 0,03, а потом две самые частые неверные версии." },
      a: { en: "Correct: if the null hypothesis were true, there would be a 3 % chance of observing data at least as extreme as ours. Wrong version one: there is a 3 % probability the null hypothesis is true — this inverts the conditioning. Wrong version two: there is a 3 % chance the result is due to chance — under H₀ the result is entirely due to chance, with probability one.", ru: "Верно: если бы нулевая гипотеза была верна, вероятность увидеть данные хотя бы столь же экстремальные, как наши, составляла бы 3 %. Неверно первое: с вероятностью 3 % нулевая гипотеза верна — здесь перевёрнуто условие. Неверно второе: с вероятностью 3 % результат случаен — при верной H₀ результат случаен целиком, с вероятностью единица." },
    },
    {
      q: { en: "You run 20 independent tests on data where nothing is going on, at α = 0.05. How many significant results do you expect?", ru: "Ты проводишь 20 независимых тестов на данных, где ничего не происходит, при α = 0,05. Сколько значимых результатов ожидается?" },
      a: { en: "One. Each test has a 5 % chance of a false positive, so 20 × 0.05 = 1 on average, and the probability of at least one is 1 − 0.95²⁰ ≈ 64 %. This is the multiple comparisons problem: testing everything until something is significant guarantees a finding. Corrections such as Bonferroni, which divides α by the number of tests, exist precisely for this.", ru: "Один. У каждого теста 5 % шанс ложноположительного, значит в среднем 20 × 0,05 = 1, а вероятность хотя бы одного равна 1 − 0,95²⁰ ≈ 64 %. Это проблема множественных сравнений: проверяя всё подряд, пока что-нибудь не окажется значимым, ты гарантируешь себе находку. Поправки вроде Бонферрони, делящей α на число тестов, существуют именно для этого." },
    },
    {
      q: { en: "Two groups differ by 0.3 points, p < 0.001, n = 200 000. Is this an important result?", ru: "Две группы различаются на 0,3 пункта, p < 0,001, n = 200 000. Важен ли этот результат?" },
      a: { en: "Statistically detectable, practically probably not. With n that large the standard error is tiny, so almost any non-zero difference becomes significant. The right question is whether 0.3 points changes a decision — that is the effect size question, and the p-value is silent on it. Report the difference with its confidence interval and let the domain expert judge.", ru: "Статистически обнаружим, практически, вероятно, нет. При таком n стандартная ошибка крошечная, поэтому значимой становится почти любая ненулевая разница. Правильный вопрос — меняет ли 0,3 пункта решение; это вопрос о величине эффекта, и p-значение о нём молчит. Указывай разницу с доверительным интервалом и оставляй суждение предметному специалисту." },
    },
    {
      q: { en: "The same 30 students are tested before and after a course. Which test, and what goes wrong with the other one?", ru: "Одни и те же 30 студентов тестируются до и после курса. Какой тест и что не так с другим?" },
      a: { en: "A paired t-test, applied to the 30 individual differences. Using the independent two-sample test would treat the before and after groups as unrelated, ignoring that each student is their own control. That discards the pairing, inflates the estimated variability with between-student differences that cancel out in the pairs, and badly reduces power — you can easily miss a real effect.", ru: "Парный t-тест по 30 индивидуальным разностям. Применение независимого двухвыборочного теста трактовало бы группы «до» и «после» как несвязанные, игнорируя, что каждый студент — сам себе контроль. Это выбрасывает парность, раздувает оценку изменчивости различиями между студентами, которые в парах сокращаются, и сильно снижает мощность — реальный эффект легко пропустить." },
    },
    {
      q: { en: "A study reports 'no significant difference (p = 0.4)' with n = 12 per group. What is the correct reading?", ru: "Исследование сообщает «значимых различий нет (p = 0,4)» при n = 12 в группе. Как это правильно читать?" },
      a: { en: "That the study could not detect a difference, not that there is none. With 12 per group the power to detect anything but a huge effect is very low, so a null result carries almost no information. Ask for the confidence interval: if it runs from −5 to +8, the data are equally compatible with a large benefit and a large harm, and the honest conclusion is that the question remains open.", ru: "Что исследование не смогло обнаружить различие, а не что его нет. При 12 в группе мощность обнаружить что-либо, кроме огромного эффекта, очень мала, поэтому нулевой результат почти не несёт информации. Спрашивай доверительный интервал: если он идёт от −5 до +8, данные одинаково совместимы и с большой пользой, и с большим вредом, и честный вывод — вопрос остаётся открытым." },
    },
    {
      q: { en: "Your χ² test on a 2×2 table gives expected counts 3, 12, 4, 21. Is the test valid?", ru: "Твой критерий χ² на таблице 2×2 даёт ожидаемые частоты 3, 12, 4, 21. Валиден ли тест?" },
      a: { en: "Doubtful. Two cells have expected counts below 5, which violates the usual rule of thumb and makes the χ² approximation to the sampling distribution unreliable. On a 2×2 table the standard alternative is Fisher's exact test, which computes the probability directly and needs no approximation.", ru: "Сомнительно. В двух ячейках ожидаемые частоты меньше 5, что нарушает обычное практическое правило и делает χ²-приближение к выборочному распределению ненадёжным. Для таблицы 2×2 стандартная замена — точный критерий Фишера, который считает вероятность напрямую и в приближении не нуждается." },
    },
  ],
  checklist: {
    en: [
      "I can write the definition of a p-value from memory, with every qualifier in place",
      "I can explain why 'not significant' is not the same as 'no effect'",
      "I can fill in the 2×2 table of type I and type II errors without looking",
      "Given a scenario I pick the right test and can say what its assumptions are",
      "I report effect size and a confidence interval alongside every p-value",
    ],
    ru: [
      "Могу по памяти записать определение p-значения со всеми оговорками",
      "Могу объяснить, почему «незначимо» не то же самое, что «эффекта нет»",
      "Могу заполнить таблицу 2×2 ошибок первого и второго рода не подглядывая",
      "По описанию ситуации выбираю верный тест и называю его предпосылки",
      "Рядом с каждым p-значением указываю величину эффекта и доверительный интервал",
    ],
  },
};
