import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 2,
  minutes: 65,
  title: { en: "Probability and random variables", ru: "Вероятность и случайные величины" },
  summary: {
    en: "Conditional probability, Bayes' rule, expectation and variance, and the three distributions that cover most of what you will meet in the course.",
    ru: "Условная вероятность, формула Байеса, математическое ожидание и дисперсия и три распределения, которые покрывают почти всё, что встретится в курсе.",
  },
  goals: {
    en: [
      "Compute conditional probabilities and apply Bayes' rule to a diagnostic problem",
      "Distinguish independence from mutual exclusivity — they are opposites, not synonyms",
      "Derive expectation and variance for a discrete variable and know the shortcut formula",
      "Choose between the binomial, Poisson and normal distributions from the description of a process",
    ],
    ru: [
      "Считать условные вероятности и применять формулу Байеса к диагностической задаче",
      "Отличать независимость от несовместности — это противоположности, а не синонимы",
      "Выводить математическое ожидание и дисперсию дискретной величины и знать короткую формулу",
      "Выбирать между биномиальным, пуассоновским и нормальным распределением по описанию процесса",
    ],
  },
  sections: [
    {
      heading: { en: "Conditional probability and what independence really means", ru: "Условная вероятность и что на самом деле значит независимость" },
      body: {
        en: [
          "The conditional probability P(A | B) is the probability of A once you already know B happened. Mechanically it is the joint probability divided by the probability of the condition: you shrink the sample space down to B and ask what fraction of it is also A.",
          "Two events are independent when knowing one tells you nothing about the other, that is P(A | B) = P(A), which is equivalent to P(A ∩ B) = P(A)·P(B). Two events are mutually exclusive when they cannot both happen, P(A ∩ B) = 0. Students routinely confuse these, and they are close to opposites: if A and B are mutually exclusive and both have non-zero probability, then learning that B happened tells you A definitely did not — that is maximal dependence, not independence.",
        ],
        ru: [
          "Условная вероятность P(A | B) — вероятность A при уже известном B. Механически это совместная вероятность, делённая на вероятность условия: пространство исходов сжимается до B, и спрашивается, какая его доля является ещё и A.",
          "Два события независимы, когда знание об одном не говорит ничего о другом, то есть P(A | B) = P(A), что равносильно P(A ∩ B) = P(A)·P(B). Два события несовместны, когда не могут произойти одновременно: P(A ∩ B) = 0. Эти вещи регулярно путают, а они почти противоположны: если A и B несовместны и оба имеют ненулевую вероятность, то знание о наступлении B говорит, что A точно не произошло, — это максимальная зависимость, а не независимость.",
        ],
      },
      formula: {
        tex: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)},\\qquad P(B)>0",
        note: {
          en: "Rearranged, this is the multiplication rule: P(A ∩ B) = P(A | B)·P(B).",
          ru: "Переписанное иначе, это правило умножения: P(A ∩ B) = P(A | B)·P(B).",
        },
      },
      pitfall: {
        en: "P(A | B) and P(B | A) are different numbers. The probability that someone is a programmer given that they wear glasses is nothing like the probability they wear glasses given that they are a programmer. Swapping these two is the single most expensive mistake in applied statistics.",
        ru: "P(A | B) и P(B | A) — разные числа. Вероятность того, что человек программист, если он в очках, не имеет ничего общего с вероятностью того, что он в очках, если он программист. Перепутать эти два — самая дорогая ошибка в прикладной статистике.",
      },
    },
    {
      heading: { en: "Bayes' rule", ru: "Формула Байеса" },
      body: {
        en: [
          "Bayes' rule reverses the direction of conditioning. You know P(evidence | hypothesis) — the reliability of a test, say — and you want P(hypothesis | evidence), which is what actually matters to the patient.",
          "The denominator is the total probability of the evidence, summed over all the ways it could arise. That denominator is exactly where intuition fails: when a condition is rare, the false positives from the huge healthy group can outnumber the true positives from the tiny sick group, even with a very accurate test.",
        ],
        ru: [
          "Формула Байеса разворачивает направление условия. Известно P(свидетельство | гипотеза) — скажем, надёжность теста, — а нужно P(гипотеза | свидетельство), то есть то, что на самом деле важно пациенту.",
          "В знаменателе — полная вероятность свидетельства, просуммированная по всем способам его получить. Именно на знаменателе интуиция и ломается: когда состояние редкое, ложноположительные из огромной здоровой группы могут численно превзойти истинноположительные из крошечной больной — даже при очень точном тесте.",
        ],
      },
      formula: {
        tex: "P(H\\mid E)=\\frac{P(E\\mid H)\\,P(H)}{P(E)},\\qquad P(E)=P(E\\mid H)P(H)+P(E\\mid \\lnot H)P(\\lnot H)",
        note: {
          en: "P(H) is the prior — what you believed before the evidence. P(H | E) is the posterior — what you believe after.",
          ru: "P(H) — априорная вероятность, во что верили до свидетельства. P(H | E) — апостериорная, во что верите после.",
        },
      },
    },
    {
      heading: { en: "Expectation and variance", ru: "Математическое ожидание и дисперсия" },
      body: {
        en: [
          "The expectation E[X] is the long-run average of a random variable: each value weighted by its probability. It is the theoretical counterpart of the sample mean x̄ from week 1 — x̄ estimates E[X].",
          "The variance is the expected squared deviation from the expectation. The shortcut formula Var(X) = E[X²] − (E[X])² is almost always faster to compute by hand and is worth memorising, because it turns two passes over the data into one.",
          "Two properties do most of the work in later weeks. Expectation is linear without any conditions: E[aX + b] = aE[X] + b, and E[X + Y] = E[X] + E[Y] whether or not X and Y are independent. Variance is not linear: Var(aX + b) = a²Var(X), the constant b disappears because shifting data does not change its spread, and the coefficient is squared. Var(X + Y) = Var(X) + Var(Y) holds only when X and Y are independent.",
        ],
        ru: [
          "Математическое ожидание E[X] — среднее значение случайной величины в долгосрочной перспективе: каждое значение взвешено своей вероятностью. Это теоретический аналог выборочного среднего x̄ из первой недели: x̄ оценивает E[X].",
          "Дисперсия — ожидаемый квадрат отклонения от математического ожидания. Короткая формула Var(X) = E[X²] − (E[X])² почти всегда быстрее при счёте вручную и её стоит запомнить: она превращает два прохода по данным в один.",
          "Два свойства делают основную работу в последующих неделях. Ожидание линейно без всяких условий: E[aX + b] = aE[X] + b, и E[X + Y] = E[X] + E[Y] независимо от того, независимы X и Y или нет. Дисперсия не линейна: Var(aX + b) = a²Var(X) — константа b исчезает, потому что сдвиг данных не меняет разброса, а коэффициент возводится в квадрат. Равенство Var(X + Y) = Var(X) + Var(Y) верно только для независимых X и Y.",
        ],
      },
      formula: {
        tex: "E[X]=\\sum_i x_i\\,p_i,\\qquad \\operatorname{Var}(X)=E\\big[(X-E[X])^2\\big]=E[X^2]-\\big(E[X]\\big)^2",
      },
      key: {
        en: "Expectation always adds. Variance adds only under independence. Nearly every mistake with standard errors later in the course traces back to forgetting this asymmetry.",
        ru: "Ожидание складывается всегда. Дисперсия складывается только при независимости. Почти любая ошибка со стандартными ошибками дальше по курсу восходит к тому, что забыли эту асимметрию.",
      },
    },
    {
      heading: { en: "Three distributions and how to choose", ru: "Три распределения и как выбрать" },
      body: {
        en: [
          "The binomial counts successes in a fixed number n of independent trials with the same probability p. Number of defective parts in a batch of 100; number of users out of 500 who clicked. Its mean is np and its variance np(1 − p).",
          "The Poisson counts events in a fixed interval of time or space when they occur independently at a constant average rate λ. Support requests per hour, typos per page. Its mean and variance are both λ, which is a useful diagnostic: if your count data has variance much larger than its mean, it is over-dispersed and Poisson is the wrong model.",
          "The normal is continuous, symmetric, and defined by μ and σ. It arises whenever a quantity is the sum of many small independent effects — which is the central limit theorem, and the reason it appears everywhere in week 3 onwards. Roughly 68 % of its mass lies within one σ of μ, 95 % within two, 99.7 % within three.",
        ],
        ru: [
          "Биномиальное считает успехи в фиксированном числе n независимых испытаний с одинаковой вероятностью p. Число бракованных деталей в партии из 100; сколько из 500 пользователей кликнули. Среднее равно np, дисперсия np(1 − p).",
          "Пуассоновское считает события в фиксированном интервале времени или пространства, когда они происходят независимо с постоянной средней интенсивностью λ. Обращения в поддержку за час, опечатки на страницу. Среднее и дисперсия оба равны λ, и это полезный диагностический признак: если у твоих счётных данных дисперсия сильно больше среднего, налицо перерассеяние и Пуассон — неподходящая модель.",
          "Нормальное непрерывно, симметрично и задаётся μ и σ. Оно возникает всякий раз, когда величина есть сумма многих малых независимых воздействий, — это и есть центральная предельная теорема и причина, по которой оно появляется повсюду начиная с третьей недели. Примерно 68 % массы лежит в пределах одной σ от μ, 95 % — двух, 99,7 % — трёх.",
        ],
      },
      table: {
        head: {
          en: ["Distribution", "Counts what", "Mean", "Variance"],
          ru: ["Распределение", "Что считает", "Среднее", "Дисперсия"],
        },
        rows: [
          ["Binomial(n, p)", "successes in n fixed trials", "np", "np(1 − p)"],
          ["Poisson(λ)", "events per interval, rate λ", "λ", "λ"],
          ["Normal(μ, σ²)", "continuous, sum of many effects", "μ", "σ²"],
        ],
        rowsRu: [
          ["Биномиальное(n, p)", "успехи в n испытаниях", "np", "np(1 − p)"],
          ["Пуассона(λ)", "события за интервал, интенсивность λ", "λ", "λ"],
          ["Нормальное(μ, σ²)", "непрерывное, сумма многих воздействий", "μ", "σ²"],
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Distributions with scipy.stats", ru: "Распределения через scipy.stats" },
        code: `from scipy import stats

# биномиальное: ровно 3 бракованных из 20 при p = 0.1
print(stats.binom.pmf(3, n=20, p=0.1))      # 0.1901

# не более 3 бракованных
print(stats.binom.cdf(3, n=20, p=0.1))      # 0.8670

# Пуассон: 5 обращений за час при интенсивности 3
print(stats.poisson.pmf(5, mu=3))           # 0.1008

# нормальное: доля значений в пределах 2σ
print(stats.norm.cdf(2) - stats.norm.cdf(-2))  # 0.9545`,
        out: {
          en: "pmf is the probability of exactly k; cdf is the probability of k or fewer. Mixing them up is the classic exam slip.",
          ru: "pmf — вероятность ровно k; cdf — вероятность k или меньше. Перепутать их — классическая ошибка на экзамене.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a rare disease and an accurate test", ru: "Разбор: редкая болезнь и точный тест" },
    intro: {
      en: "A disease affects 1 % of the population. A test detects it in 99 % of sick people and gives a false positive in 5 % of healthy ones. Your test comes back positive. How worried should you be?",
      ru: "Болезнь встречается у 1 % населения. Тест обнаруживает её у 99 % больных и даёт ложноположительный результат у 5 % здоровых. Твой тест положительный. Насколько стоит волноваться?",
    },
    steps: [
      {
        text: {
          en: "Write down what is given. D is disease, + is a positive test. The prior P(D) = 0.01 is the base rate, and it is the number intuition ignores.",
          ru: "Выпишем данное. D — болезнь, + — положительный тест. Априорная вероятность P(D) = 0,01 — базовая частота, и именно её игнорирует интуиция.",
        },
        formula: { tex: "P(D)=0{,}01,\\quad P(+\\mid D)=0{,}99,\\quad P(+\\mid \\lnot D)=0{,}05" },
      },
      {
        text: {
          en: "Compute the total probability of a positive result. There are two routes to a positive: a sick person correctly flagged, or a healthy person wrongly flagged.",
          ru: "Считаем полную вероятность положительного результата. К нему ведут два пути: больного верно пометили или здорового пометили ошибочно.",
        },
        formula: { tex: "P(+)=0{,}99\\cdot 0{,}01+0{,}05\\cdot 0{,}99=0{,}0099+0{,}0495=0{,}0594" },
      },
      {
        text: {
          en: "Notice the two terms. The false positives, 0.0495, are five times larger than the true positives, 0.0099, purely because the healthy group is 99 times bigger.",
          ru: "Посмотри на два слагаемых. Ложноположительных 0,0495 — впятеро больше, чем истинноположительных 0,0099, исключительно потому, что здоровая группа в 99 раз больше.",
        },
      },
      {
        text: {
          en: "Apply Bayes' rule.",
          ru: "Применяем формулу Байеса.",
        },
        formula: { tex: "P(D\\mid +)=\\frac{0{,}99\\cdot 0{,}01}{0{,}0594}=\\frac{0{,}0099}{0{,}0594}\\approx 0{,}167" },
      },
      {
        text: {
          en: "Sanity-check with counts instead of fractions: out of 10 000 people, 100 are sick and 99 test positive; 9 900 are healthy and 495 test positive. Of 594 positives, 99 are genuinely sick, which is the same 16.7 %.",
          ru: "Проверим счётом вместо долей: на 10 000 человек 100 больны и 99 дадут плюс; 9 900 здоровы и 495 дадут плюс. Из 594 положительных по-настоящему больны 99 — те же 16,7 %.",
        },
      },
    ],
    conclusion: {
      en: "A positive result on a 99 %-sensitive test raises your probability from 1 % to about 17 %, not to 99 %. The test was informative — it multiplied the odds seventeenfold — but the base rate still dominates. This is why screening programmes always retest.",
      ru: "Положительный результат теста с чувствительностью 99 % поднимает вероятность с 1 % примерно до 17 %, а не до 99 %. Тест сработал — он увеличил шансы в семнадцать раз, — но базовая частота всё ещё доминирует. Поэтому в скрининговых программах всегда делают повторный тест.",
    },
  },
  exercises: [
    {
      q: { en: "Are the events 'the card is a king' and 'the card is a heart' independent, mutually exclusive, both or neither?", ru: "События «карта — король» и «карта — червы» независимы, несовместны, и то и другое или ни то ни другое?" },
      a: { en: "Independent, not mutually exclusive. P(king) = 4/52 = 1/13, P(heart) = 13/52 = 1/4, and P(king of hearts) = 1/52 = (1/13)(1/4), so the product rule holds. They are not mutually exclusive precisely because the king of hearts exists. Knowing the card is a heart leaves the chance of a king unchanged at 1/13.", ru: "Независимы, но не несовместны. P(король) = 4/52 = 1/13, P(червы) = 13/52 = 1/4, и P(король червей) = 1/52 = (1/13)(1/4) — правило произведения выполняется. Несовместными они не являются именно потому, что король червей существует. Знание, что карта червовая, оставляет шанс короля прежним — 1/13." },
    },
    {
      q: { en: "X takes values 0, 1, 2 with probabilities 0.5, 0.3, 0.2. Find E[X] and Var(X).", ru: "X принимает значения 0, 1, 2 с вероятностями 0,5; 0,3; 0,2. Найди E[X] и Var(X)." },
      hint: { en: "Use Var(X) = E[X²] − (E[X])².", ru: "Используй Var(X) = E[X²] − (E[X])²." },
      a: { en: "E[X] = 0(0.5) + 1(0.3) + 2(0.2) = 0.7. E[X²] = 0(0.5) + 1(0.3) + 4(0.2) = 1.1. Var(X) = 1.1 − 0.49 = 0.61, and the standard deviation is √0.61 ≈ 0.78. Note E[X²] ≠ (E[X])²: 1.1 against 0.49. That gap is exactly the variance.", ru: "E[X] = 0(0,5) + 1(0,3) + 2(0,2) = 0,7. E[X²] = 0(0,5) + 1(0,3) + 4(0,2) = 1,1. Var(X) = 1,1 − 0,49 = 0,61, стандартное отклонение √0,61 ≈ 0,78. Обрати внимание: E[X²] ≠ (E[X])², то есть 1,1 против 0,49. Этот разрыв и есть дисперсия." },
    },
    {
      q: { en: "A call centre gets 4 calls an hour on average. What is the probability of exactly 2 calls in the next hour, and which distribution did you use and why?", ru: "Колл-центр получает в среднем 4 звонка в час. Какова вероятность ровно 2 звонков в следующий час, и каким распределением ты воспользовался и почему?" },
      a: { en: "Poisson with λ = 4: events in a fixed interval, arriving independently at a constant average rate, with no fixed upper bound on how many could arrive. P(X = 2) = e⁻⁴·4²/2! = 0.0183·16/2 ≈ 0.147. Binomial would be wrong here because there is no fixed n — you are not running a set number of trials.", ru: "Пуассон с λ = 4: события в фиксированном интервале, приходящие независимо с постоянной средней интенсивностью, без верхней границы на их число. P(X = 2) = e⁻⁴·4²/2! = 0,0183·16/2 ≈ 0,147. Биномиальное здесь не подошло бы, потому что нет фиксированного n — ты не проводишь заданное число испытаний." },
    },
    {
      q: { en: "Var(X) = 9. What is Var(3X + 5)?", ru: "Var(X) = 9. Чему равна Var(3X + 5)?" },
      a: { en: "81. Var(aX + b) = a²Var(X) = 9·9 = 81. The +5 shifts every value equally and therefore changes nothing about the spread; the multiplier is squared because variance is measured in squared units. The standard deviation goes from 3 to 9, scaling linearly as expected.", ru: "81. Var(aX + b) = a²Var(X) = 9·9 = 81. Слагаемое +5 сдвигает все значения одинаково и потому не меняет разброс; множитель возводится в квадрат, потому что дисперсия измеряется в квадратных единицах. Стандартное отклонение растёт с 3 до 9, то есть линейно, как и ожидается." },
    },
    {
      q: { en: "Counts of daily errors have sample mean 5 and sample variance 38. Is Poisson a reasonable model?", ru: "У числа ошибок за день выборочное среднее 5, выборочная дисперсия 38. Разумна ли пуассоновская модель?" },
      a: { en: "No. Poisson requires mean = variance, and here the variance is more than seven times the mean. The data are over-dispersed, which usually means the rate is not constant — errors cluster, perhaps by day of week or by release. Reach for a negative binomial, or model the varying rate explicitly.", ru: "Нет. Пуассон требует равенства среднего и дисперсии, а здесь дисперсия больше среднего более чем в семь раз. Данные перерассеяны, и обычно это значит, что интенсивность непостоянна: ошибки группируются — возможно, по дням недели или по релизам. Стоит взять отрицательное биномиальное или моделировать переменную интенсивность явно." },
    },
  ],
  checklist: {
    en: [
      "I can state Bayes' rule from memory and explain what the denominator is doing",
      "I can give an example of two events that are mutually exclusive but dependent",
      "I know that expectation always adds and variance only adds under independence",
      "Given a described process I can pick between binomial, Poisson and normal and justify it",
      "I know the difference between pmf and cdf in scipy.stats",
    ],
    ru: [
      "Могу записать формулу Байеса по памяти и объяснить, что делает знаменатель",
      "Могу привести пример двух несовместных, но зависимых событий",
      "Знаю, что ожидание складывается всегда, а дисперсия — только при независимости",
      "По описанию процесса выбираю между биномиальным, Пуассоном и нормальным и обосновываю выбор",
      "Знаю разницу между pmf и cdf в scipy.stats",
    ],
  },
};
