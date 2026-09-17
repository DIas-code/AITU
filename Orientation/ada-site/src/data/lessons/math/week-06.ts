import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 6,
  minutes: 60,
  title: { en: "Correlation and association", ru: "Корреляция и связь признаков" },
  summary: {
    en: "Covariance, Pearson and Spearman, the correlation matrix — and the three traps: nonlinearity, outliers and the leap to causation.",
    ru: "Ковариация, Пирсон и Спирмен, корреляционная матрица — и три ловушки: нелинейность, выбросы и прыжок к причинности.",
  },
  goals: {
    en: [
      "Explain why covariance needed standardising and what Pearson's r therefore measures",
      "Choose between Pearson and Spearman from the shape of the data",
      "Read a correlation matrix and spot multicollinearity before it hits regression",
      "Say precisely why correlation does not establish causation, with the three mechanisms",
    ],
    ru: [
      "Объяснять, зачем ковариацию понадобилось нормировать и что поэтому измеряет r Пирсона",
      "Выбирать между Пирсоном и Спирменом по форме данных",
      "Читать корреляционную матрицу и замечать мультиколлинеарность до того, как она ударит по регрессии",
      "Точно формулировать, почему корреляция не устанавливает причинность, называя три механизма",
    ],
  },
  sections: [
    {
      heading: { en: "From covariance to correlation", ru: "От ковариации к корреляции" },
      body: {
        en: [
          "Covariance measures whether two variables deviate from their means in the same direction. When x is above its mean and y is above its mean, the product of deviations is positive; opposite directions give a negative product. Averaging those products gives the covariance.",
          "The problem is units. The covariance of height in centimetres and weight in kilograms comes out in centimetre-kilograms, and switching to metres changes the number by a factor of a hundred without changing the relationship at all. A measure whose value depends on your choice of units cannot be compared across pairs of variables.",
          "Pearson's r fixes this by dividing by both standard deviations. The units cancel, and the result is confined to the interval from −1 to 1 — a pure number that means the same thing whatever you measured. That is the whole content of the correlation coefficient: standardised covariance.",
        ],
        ru: [
          "Ковариация измеряет, отклоняются ли две переменные от своих средних в одну сторону. Когда x выше своего среднего и y выше своего, произведение отклонений положительно; противоположные направления дают отрицательное произведение. Усреднение этих произведений и есть ковариация.",
          "Проблема в единицах измерения. Ковариация роста в сантиметрах и веса в килограммах выходит в сантиметр-килограммах, а переход к метрам меняет число в сто раз, ничего не меняя в самой связи. Мера, значение которой зависит от выбора единиц, не годится для сравнения между парами переменных.",
          "r Пирсона это чинит делением на оба стандартных отклонения. Единицы сокращаются, а результат оказывается зажат в отрезке от −1 до 1 — чистое число, означающее одно и то же, что бы ты ни измерял. В этом и всё содержание коэффициента корреляции: нормированная ковариация.",
        ],
      },
      formula: {
        tex: "\\operatorname{cov}(x,y)=\\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar{x})(y_i-\\bar{y}),\\qquad r=\\frac{\\operatorname{cov}(x,y)}{s_x\\,s_y}",
        note: {
          en: "The same n − 1 as in the variance, for the same degrees-of-freedom reason. Note that r(x, x) = cov(x, x)/s²ₓ = 1, as it must be.",
          ru: "То же n − 1, что и в дисперсии, и по той же причине со степенями свободы. Заметь, что r(x, x) = cov(x, x)/s²ₓ = 1, как и должно быть.",
        },
      },
      key: {
        en: "r² is the share of variance in one variable linearly explained by the other. r = 0.7 sounds strong until you notice it accounts for only 49 % of the variation.",
        ru: "r² — доля дисперсии одной переменной, линейно объяснённая другой. r = 0,7 звучит внушительно, пока не заметишь, что это лишь 49 % вариации.",
      },
    },
    {
      heading: { en: "Pearson, Spearman and where each blinds you", ru: "Пирсон, Спирмен и где каждый слепнет" },
      body: {
        en: [
          "Pearson's r measures linear association only. A perfect parabola y = x² over a symmetric interval gives r ≈ 0 despite total dependence: the rising half and the falling half cancel exactly. So r = 0 means 'no linear relationship', never 'no relationship'.",
          "Pearson is also fragile to outliers, because it works with squared deviations. A single distant point can pull r from 0.1 to 0.8 or destroy a genuine association, and on small samples this happens often enough to be a real hazard.",
          "Spearman's ρ is Pearson's r computed on the ranks instead of the values. Replacing values by their order does two things: it makes the measure robust, since an extreme value becomes merely the largest rank, and it captures any monotone relationship rather than only a straight-line one. The price is that you lose information about the size of the gaps between values.",
          "The practical rule: draw the scatter plot first. Roughly linear with no wild points, use Pearson. Monotone but curved, or with outliers, or ordinal data, use Spearman. If the two disagree sharply, that disagreement is itself a finding worth investigating.",
        ],
        ru: [
          "r Пирсона измеряет только линейную связь. Идеальная парабола y = x² на симметричном отрезке даёт r ≈ 0 при полной зависимости: растущая и убывающая половины взаимно сокращаются. Поэтому r = 0 означает «линейной связи нет», но никогда — «связи нет».",
          "Пирсон вдобавок хрупок к выбросам, потому что работает с квадратами отклонений. Одна далёкая точка способна поднять r с 0,1 до 0,8 или уничтожить настоящую связь, и на малых выборках это случается достаточно часто, чтобы быть реальной опасностью.",
          "ρ Спирмена — это r Пирсона, посчитанный по рангам вместо значений. Замена значений их порядком делает две вещи: придаёт устойчивость, поскольку экстремальное значение становится просто наибольшим рангом, и улавливает любую монотонную связь, а не только прямолинейную. Плата — потеря информации о величине промежутков между значениями.",
          "Практическое правило: сначала построй диаграмму рассеяния. Примерно линейно и без диких точек — Пирсон. Монотонно, но с изгибом, либо есть выбросы, либо данные порядковые — Спирмен. Если два коэффициента резко расходятся, само это расхождение — находка, которую стоит изучить.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "When the two coefficients disagree", ru: "Когда два коэффициента расходятся" },
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
x = np.arange(1, 51)
y = np.exp(x / 10) + rng.normal(0, 0.5, 50)   # монотонно, но сильно изогнуто

r_p, p_p = stats.pearsonr(x, y)
r_s, p_s = stats.spearmanr(x, y)
print(f"Пирсон  {r_p:.3f}")     # ~0.83 — связь занижена изгибом
print(f"Спирмен {r_s:.3f}")     # ~1.00 — монотонность идеальна

# то же с одним выбросом
y2 = y.copy(); y2[0] = 200
print(f"Пирсон с выбросом  {stats.pearsonr(x, y2)[0]:.3f}")   # рушится
print(f"Спирмен с выбросом {stats.spearmanr(x, y2)[0]:.3f}")  # почти не дрогнул`,
        out: {
          en: "A gap this large between the two coefficients is a signal: either the relationship is curved or a few points are doing the work.",
          ru: "Такой разрыв между коэффициентами — сигнал: либо связь изогнута, либо всю работу делают несколько точек.",
        },
      },
      pitfall: {
        en: "Never report a correlation without looking at the scatter plot. Anscombe's quartet is four datasets with identical r = 0.816 and completely different shapes — one of them has no relationship at all except a single leverage point.",
        ru: "Никогда не сообщай корреляцию, не взглянув на диаграмму рассеяния. Квартет Энскомба — четыре набора с одинаковым r = 0,816 и совершенно разной формой; в одном из них связи нет вовсе, кроме единственной рычаговой точки.",
      },
    },
    {
      heading: { en: "The correlation matrix", ru: "Корреляционная матрица" },
      body: {
        en: [
          "With several numeric variables, the correlation matrix holds every pairwise r. It is symmetric with ones on the diagonal, so only the lower triangle carries information — displaying the whole square doubles the reading effort for no gain.",
          "Read it for two purposes. Down the column of your target variable, to see which predictors relate to what you want to explain. And across the predictors themselves, to find pairs correlated with each other — that is multicollinearity, and it is what makes regression coefficients unstable in week 8.",
          "The rule of thumb is that |r| above roughly 0.8 between two predictors is a warning. It does not hurt prediction, but it makes the individual coefficients meaningless: the model cannot tell which of the two twins deserves the credit, so it splits it arbitrarily and the split changes wildly with small changes in the data.",
        ],
        ru: [
          "При нескольких числовых переменных корреляционная матрица хранит все попарные r. Она симметрична и с единицами на диагонали, поэтому информацию несёт только нижний треугольник — показ всего квадрата удваивает усилие на чтение без всякой пользы.",
          "Читают её ради двух вещей. По столбцу целевой переменной — чтобы увидеть, какие предикторы связаны с тем, что ты хочешь объяснить. И между самими предикторами — чтобы найти пары, коррелирующие друг с другом: это мультиколлинеарность, и именно она сделает коэффициенты регрессии неустойчивыми на восьмой неделе.",
          "Практическое правило: |r| выше примерно 0,8 между двумя предикторами — предупреждение. Прогнозу это не вредит, но делает отдельные коэффициенты бессмысленными: модель не может понять, кому из близнецов приписать заслугу, поэтому делит её произвольно, и деление дико меняется от малых изменений в данных.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Reading a matrix without drowning in it", ru: "Как читать матрицу и не утонуть" },
        code: `import pandas as pd

corr = df.select_dtypes("number").corr(method="pearson")

# 1. что связано с целевой переменной
print(corr["target"].drop("target").sort_values(key=abs, ascending=False))

# 2. подозрительные пары среди предикторов
pairs = (corr.where(np.triu(np.ones(corr.shape), k=1).astype(bool))
             .stack()
             .sort_values(key=abs, ascending=False))
print(pairs[abs(pairs) > 0.8])

# 3. смотреть глазами
import seaborn as sns
mask = np.triu(np.ones_like(corr, dtype=bool))
sns.heatmap(corr, mask=mask, annot=True, fmt=".2f",
            cmap="RdBu_r", vmin=-1, vmax=1, center=0)`,
        out: {
          en: "A diverging colour scale centred on zero is the right choice here: it makes the sign visible at a glance and treats +0.6 and −0.6 as equally strong.",
          ru: "Расходящаяся цветовая шкала с центром в нуле здесь правильный выбор: она делает знак видимым сразу и трактует +0,6 и −0,6 как одинаково сильные.",
        },
      },
    },
    {
      heading: { en: "Correlation and causation: three mechanisms", ru: "Корреляция и причинность: три механизма" },
      body: {
        en: [
          "Saying 'correlation is not causation' is easy; naming why is what gets marks. There are three distinct reasons an association can appear without x causing y.",
          "A confounder: a third variable causes both. Ice cream sales correlate with drownings because heat drives both. Reverse causation: y causes x rather than the other way round — hospitals correlate with illness, but not because hospitals make people ill. Selection: the association exists only in your sample because of how it was assembled. If a university admits students who are either strong academically or strong athletically, then within the admitted group the two abilities appear negatively correlated even if they are unrelated in the population.",
          "Establishing causation needs either a randomised experiment, which breaks the link between the treatment and any confounder, or an identification strategy that argues why confounding is implausible. Statistics alone, on observational data, cannot do it — which is why the honest phrasing in a report is 'is associated with' rather than 'leads to'.",
        ],
        ru: [
          "Сказать «корреляция не причинность» легко; баллы даёт умение назвать почему. Есть три разных причины, по которым связь возникает без того, чтобы x вызывал y.",
          "Конфаундер: третья переменная вызывает обе. Продажи мороженого коррелируют с утоплениями, потому что и то и другое гонит жара. Обратная причинность: это y вызывает x, а не наоборот, — больницы коррелируют с болезнями, но не потому, что делают людей больными. Отбор: связь существует только в твоей выборке из-за того, как она собрана. Если университет принимает студентов либо сильных академически, либо сильных в спорте, то внутри принятых эти два качества выглядят отрицательно связанными, даже если в популяции они независимы.",
          "Установление причинности требует либо рандомизированного эксперимента, разрывающего связь между воздействием и любым конфаундером, либо стратегии идентификации, обосновывающей неправдоподобность конфаундинга. Одна статистика на наблюдательных данных этого не может — поэтому честная формулировка в отчёте «связано с», а не «приводит к».",
        ],
      },
    },
  ],
  worked: {
    title: { en: "Worked example: study hours and exam score", ru: "Разбор: часы подготовки и балл за экзамен" },
    intro: {
      en: "Six students report hours studied x and score y: (2, 55), (3, 60), (5, 70), (7, 78), (8, 85), (11, 92). Compute r by hand and interpret it responsibly.",
      ru: "Шесть студентов сообщают часы подготовки x и балл y: (2, 55), (3, 60), (5, 70), (7, 78), (8, 85), (11, 92). Посчитай r вручную и интерпретируй ответственно.",
    },
    steps: [
      {
        text: { en: "Means first. Everything else is deviations from these.", ru: "Сначала средние. Всё остальное — отклонения от них." },
        formula: { tex: "\\bar{x}=\\frac{2+3+5+7+8+11}{6}=6,\\qquad \\bar{y}=\\frac{55+60+70+78+85+92}{6}=73{,}33" },
      },
      {
        text: { en: "Deviations and their products. The x deviations are −4, −3, −1, 1, 2, 5; the y deviations are −18.33, −13.33, −3.33, 4.67, 11.67, 18.67.", ru: "Отклонения и их произведения. Отклонения x: −4, −3, −1, 1, 2, 5; отклонения y: −18,33; −13,33; −3,33; 4,67; 11,67; 18,67." },
        formula: { tex: "\\sum(x_i-\\bar{x})(y_i-\\bar{y})=73{,}3+40{,}0+3{,}3+4{,}7+23{,}3+93{,}3=237{,}9" },
      },
      {
        text: { en: "Sums of squares for each variable.", ru: "Суммы квадратов по каждой переменной." },
        formula: { tex: "\\sum(x_i-\\bar{x})^2=16+9+1+1+4+25=56,\\qquad \\sum(y_i-\\bar{y})^2\\approx 1030{,}7" },
      },
      {
        text: { en: "Assemble r. Note the n − 1 cancels between numerator and denominator, so you can work with raw sums.", ru: "Собираем r. Заметь, что n − 1 сокращается между числителем и знаменателем, поэтому можно работать с сырыми суммами." },
        formula: { tex: "r=\\frac{237{,}9}{\\sqrt{56\\cdot 1030{,}7}}=\\frac{237{,}9}{\\sqrt{57719}}=\\frac{237{,}9}{240{,}2}\\approx 0{,}990" },
      },
      {
        text: { en: "Interpret. r² = 0.98, so hours studied linearly account for 98 % of the variation in scores in this sample. Now state what that does not say.", ru: "Интерпретируем. r² = 0,98, значит часы подготовки линейно объясняют 98 % вариации баллов в этой выборке. Теперь скажем, чего это не означает." },
      },
    ],
    conclusion: {
      en: "Report: r = 0.99, r² = 0.98, n = 6. The association is very strong, but three cautions belong in the same paragraph. With n = 6 the confidence interval on r is wide. The relationship may be curved beyond this range — no one studies 40 hours and scores 300. And a confounder is entirely plausible: motivated students both study more and score higher for reasons the data cannot separate.",
      ru: "В отчёт: r = 0,99, r² = 0,98, n = 6. Связь очень сильная, но три оговорки принадлежат тому же абзацу. При n = 6 доверительный интервал для r широк. За пределами диапазона связь может изогнуться — никто не занимается 40 часов и не получает 300 баллов. И конфаундер вполне правдоподобен: мотивированные студенты и занимаются больше, и получают больше по причинам, которые данные разделить не могут.",
    },
  },
  exercises: [
    {
      q: { en: "r = 0 between x and y. Does that mean they are independent?", ru: "r = 0 между x и y. Значит ли это, что они независимы?" },
      a: { en: "No. Pearson's r captures only linear association. y = x² on a symmetric interval around zero has r ≈ 0 while y is completely determined by x. The implication runs one way only: independence implies zero correlation, but zero correlation does not imply independence. Check with a scatter plot or with Spearman, and if the relationship is non-monotone, neither coefficient will find it.", ru: "Нет. r Пирсона улавливает только линейную связь. У y = x² на симметричном отрезке вокруг нуля r ≈ 0, хотя y полностью определяется x. Импликация работает в одну сторону: независимость влечёт нулевую корреляцию, но нулевая корреляция независимости не влечёт. Проверяй диаграммой рассеяния или Спирменом, а если связь немонотонна, её не найдёт ни один из коэффициентов." },
    },
    {
      q: { en: "Pearson gives 0.45, Spearman gives 0.92 on the same pair. What is going on?", ru: "Пирсон даёт 0,45, Спирмен — 0,92 на той же паре. Что происходит?" },
      a: { en: "The relationship is strongly monotone but not linear — most likely curved, exponential or logarithmic. Spearman only cares that y rises whenever x rises, so it reports near-perfect association; Pearson tries to fit a straight line through a curve and is punished for it. Either use Spearman, or transform the variable — a log transform often straightens exponential growth and restores Pearson.", ru: "Связь сильно монотонна, но не линейна — скорее всего изогнута, экспоненциальна или логарифмична. Спирмену важно лишь то, что y растёт всякий раз, когда растёт x, поэтому он сообщает почти идеальную связь; Пирсон пытается провести прямую через кривую и за это наказан. Либо бери Спирмена, либо преобразуй переменную — логарифм часто выпрямляет экспоненциальный рост и возвращает Пирсона." },
    },
    {
      q: { en: "Two predictors correlate at 0.93. Why is that a problem, and for what exactly?", ru: "Два предиктора коррелируют на уровне 0,93. Почему это проблема и для чего именно?" },
      a: { en: "It is multicollinearity, and it damages the interpretation of coefficients rather than the quality of prediction. When two predictors move together, the regression cannot attribute the effect between them, so the individual coefficients get large standard errors, can flip sign, and change dramatically with small data changes. If you only need forecasts, this is tolerable. If you need to say which variable matters, drop one, combine them, or use a regularised model.", ru: "Это мультиколлинеарность, и она вредит интерпретации коэффициентов, а не качеству прогноза. Когда два предиктора движутся вместе, регрессия не может распределить эффект между ними, поэтому у отдельных коэффициентов большие стандартные ошибки, они могут менять знак и резко меняться от малых изменений данных. Если нужны только прогнозы, это терпимо. Если нужно сказать, какая переменная важна, — убери одну, объедини их или возьми регуляризованную модель." },
    },
    {
      q: { en: "A study finds a 0.6 correlation between coffee consumption and heart disease. Give three non-causal explanations.", ru: "Исследование находит корреляцию 0,6 между потреблением кофе и болезнями сердца. Приведи три непричинных объяснения." },
      a: { en: "Confounding: smokers drink more coffee and smoking causes heart disease, so the coffee association is inherited from tobacco. Reverse causation is weak here but conceivable via a third route — people with stressful jobs both drink more coffee and are at higher risk, with stress as the driver. Selection: if the sample came from a cardiology clinic, both variables are conditioned on being ill and the association within that group need not exist in the population. Only a randomised trial or a careful identification strategy could separate these.", ru: "Конфаундинг: курящие пьют больше кофе, а курение вызывает болезни сердца, поэтому связь с кофе унаследована от табака. Обратная причинность здесь слаба, но мыслима через третий путь: люди со стрессовой работой и пьют больше кофе, и находятся в группе риска, а движет всем стресс. Отбор: если выборка взята в кардиологической клинике, обе переменные обусловлены фактом болезни, и связь внутри этой группы не обязана существовать в популяции. Разделить это может только рандомизированное исследование или продуманная стратегия идентификации." },
    },
    {
      q: { en: "r = 0.5. What share of the variance is explained, and why does that number surprise people?", ru: "r = 0,5. Какая доля дисперсии объяснена и почему это число удивляет?" },
      a: { en: "r² = 0.25, so a quarter. People read 0.5 as 'half the relationship' because it sits halfway between 0 and 1, but the coefficient is not linear in explanatory power — it is the square that has that meaning. Three quarters of the variation is still unaccounted for. This is why reporting r² alongside r is good practice: it deflates overclaiming automatically.", ru: "r² = 0,25, то есть четверть. Число 0,5 читают как «половину связи», потому что оно ровно между 0 и 1, но коэффициент не линеен по объясняющей силе — этот смысл имеет его квадрат. Три четверти вариации остаются необъяснёнными. Поэтому хорошая практика — указывать r² рядом с r: она автоматически сдувает завышенные заявления." },
    },
  ],
  checklist: {
    en: [
      "I can derive r from the covariance and say why the standardisation was needed",
      "I plot the scatter before I quote a correlation, every time",
      "I can name a case where Pearson and Spearman disagree and explain which to trust",
      "I check the predictor block of the correlation matrix for pairs above 0.8",
      "I can name confounding, reverse causation and selection as three routes to a spurious association",
    ],
    ru: [
      "Могу вывести r из ковариации и сказать, зачем понадобилось нормирование",
      "Каждый раз строю диаграмму рассеяния до того, как назвать корреляцию",
      "Могу привести случай расхождения Пирсона и Спирмена и объяснить, кому верить",
      "Проверяю блок предикторов в корреляционной матрице на пары выше 0,8",
      "Могу назвать конфаундинг, обратную причинность и отбор как три пути к ложной связи",
    ],
  },
};
