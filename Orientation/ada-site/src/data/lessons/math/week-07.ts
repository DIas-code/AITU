import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 7,
  minutes: 70,
  title: { en: "Linear regression", ru: "Линейная регрессия" },
  summary: {
    en: "Least squares from first principles, what the coefficients mean, what R² does and does not say, and the four assumptions you check on the residuals.",
    ru: "Метод наименьших квадратов с нуля, что означают коэффициенты, что говорит и чего не говорит R², и четыре предпосылки, которые проверяются по остаткам.",
  },
  goals: {
    en: [
      "Derive the least-squares slope and intercept by setting the gradient to zero",
      "Interpret a coefficient in the units of the problem, with the ceteris paribus clause",
      "Explain what R² measures and why a high value is not a licence to trust the model",
      "Check the four assumptions on a residual plot and name what each violation costs",
    ],
    ru: [
      "Выводить коэффициент наклона и свободный член МНК, приравнивая градиент к нулю",
      "Интерпретировать коэффициент в единицах задачи, с оговоркой «при прочих равных»",
      "Объяснять, что измеряет R² и почему высокое значение не даёт права доверять модели",
      "Проверять четыре предпосылки по графику остатков и называть цену нарушения каждой",
    ],
  },
  sections: [
    {
      heading: { en: "Where the formula comes from", ru: "Откуда берётся формула" },
      body: {
        en: [
          "The model says y is a straight line in x plus noise: y = β₀ + β₁x + ε. Fitting it means choosing the two coefficients, and the criterion is least squares — make the sum of squared vertical distances from the points to the line as small as possible.",
          "Squared rather than absolute distances for two reasons. Squares are differentiable everywhere, so the minimum can be found by calculus rather than search; and squaring punishes large misses disproportionately, which is often what you want. The cost is sensitivity to outliers, which is the same trade-off the mean makes against the median.",
          "The derivation is exactly the calculus from the warm-up week. Write the sum of squares as a function of β₀ and β₁, take the two partial derivatives, set both to zero, solve the resulting pair of linear equations. The slope comes out as the covariance of x and y divided by the variance of x — so the regression coefficient is a rescaled correlation.",
        ],
        ru: [
          "Модель говорит, что y есть прямая по x плюс шум: y = β₀ + β₁x + ε. Подогнать её значит выбрать два коэффициента, а критерий — наименьшие квадраты: сделать сумму квадратов вертикальных расстояний от точек до прямой как можно меньше.",
          "Квадраты, а не модули расстояний, по двум причинам. Квадраты дифференцируемы всюду, поэтому минимум ищется анализом, а не перебором; и возведение в квадрат непропорционально наказывает большие промахи, а это часто именно то, что нужно. Плата — чувствительность к выбросам, тот же компромисс, который среднее заключает против медианы.",
          "Вывод — ровно тот матанализ из недели разминки. Записываешь сумму квадратов как функцию β₀ и β₁, берёшь две частные производные, приравниваешь обе к нулю, решаешь получившуюся пару линейных уравнений. Наклон выходит как ковариация x и y, делённая на дисперсию x, — то есть коэффициент регрессии есть перемасштабированная корреляция.",
        ],
      },
      formula: {
        tex: "\\hat{\\beta_1}=\\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sum (x_i-\\bar{x})^2}=\\frac{\\operatorname{cov}(x,y)}{s_x^2}=r\\,\\frac{s_y}{s_x},\\qquad \\hat{\\beta_0}=\\bar{y}-\\hat{\\beta_1}\\bar{x}",
        note: {
          en: "The intercept formula shows the fitted line always passes through the point (x̄, ȳ). That is a useful check on any hand computation.",
          ru: "Формула свободного члена показывает, что подогнанная прямая всегда проходит через точку (x̄, ȳ). Это полезная проверка любого ручного счёта.",
        },
      },
      key: {
        en: "β₁ = r · sᵧ/sₓ ties this week to last week: regression and correlation are the same information, expressed in units instead of as a pure number.",
        ru: "β₁ = r · sᵧ/sₓ связывает эту неделю с прошлой: регрессия и корреляция — одна и та же информация, выраженная в единицах измерения вместо чистого числа.",
      },
    },
    {
      heading: { en: "Reading the coefficients", ru: "Как читать коэффициенты" },
      body: {
        en: [
          "The slope β₁ is the expected change in y for a one-unit increase in x. Always say it in the units of the problem: 'each additional hour of study is associated with 3.4 more points', not 'the coefficient is 3.4'. In multiple regression the phrase 'holding the other predictors constant' becomes essential, because that is precisely what the coefficient means there.",
          "The intercept β₀ is the predicted y when x is zero. Sometimes that is meaningful, sometimes it is nonsense — the predicted weight of a person of height zero. When zero is outside the observed range, the intercept is a mathematical necessity for positioning the line, not a quantity to interpret.",
          "Each coefficient comes with a standard error, from which the software builds a t statistic and a p-value testing whether the true coefficient is zero. Report the confidence interval rather than the p-value alone: 'the slope is 3.4 points per hour, 95 % CI [2.1; 4.7]' tells the reader both the size and the precision in one line.",
          "The word 'associated' is doing deliberate work in all of this. Regression on observational data measures association; the causal reading requires the argument from last week, not the arithmetic from this one.",
        ],
        ru: [
          "Наклон β₁ — ожидаемое изменение y при росте x на единицу. Всегда проговаривай его в единицах задачи: «каждый дополнительный час подготовки связан с приростом на 3,4 балла», а не «коэффициент равен 3,4». В множественной регрессии оборот «при прочих равных» становится обязательным, потому что именно это коэффициент там и означает.",
          "Свободный член β₀ — предсказанное y при нулевом x. Иногда это осмысленно, иногда бессмыслица: предсказанный вес человека нулевого роста. Когда ноль лежит вне наблюдаемого диапазона, свободный член — математическая необходимость для позиционирования прямой, а не величина для интерпретации.",
          "У каждого коэффициента есть стандартная ошибка, из которой программа строит статистику t и p-значение, проверяющее гипотезу о равенстве истинного коэффициента нулю. Указывай доверительный интервал, а не одно p-значение: «наклон 3,4 балла на час, 95 % ДИ [2,1; 4,7]» сообщает читателю и величину, и точность одной строкой.",
          "Слово «связан» во всём этом работает намеренно. Регрессия на наблюдательных данных измеряет связь; причинное прочтение требует рассуждения с прошлой недели, а не арифметики с этой.",
        ],
      },
    },
    {
      heading: { en: "R² and its limits", ru: "R² и его пределы" },
      body: {
        en: [
          "R² is the share of the variance in y that the model accounts for. It equals one minus the ratio of the residual sum of squares to the total sum of squares, and in simple regression with one predictor it is exactly r².",
          "Three limits matter. R² never decreases when you add a predictor, even a column of random numbers, so it cannot be used to compare models with different numbers of variables — that is what adjusted R² is for, and it is next week's material. R² says nothing about whether the model is correctly specified: Anscombe's quartet contains a perfect parabola fitted by a straight line with a respectable R². And a high R² does not mean good predictions on new data; it describes the fit to the data you already have.",
          "Conversely, a low R² is not automatically a failure. In social science or medicine, explaining 15 % of the variation in human behaviour can be a real and useful result. What counts as high depends entirely on the field, and comparing R² across different response variables is meaningless.",
        ],
        ru: [
          "R² — доля дисперсии y, которую объясняет модель. Он равен единице минус отношение остаточной суммы квадратов к общей, а в простой регрессии с одним предиктором это в точности r².",
          "Важны три ограничения. R² никогда не уменьшается при добавлении предиктора, даже столбца случайных чисел, поэтому его нельзя использовать для сравнения моделей с разным числом переменных — для этого есть скорректированный R², и это материал следующей недели. R² ничего не говорит о правильности спецификации: в квартете Энскомба есть идеальная парабола, подогнанная прямой с приличным R². И высокий R² не означает хороших прогнозов на новых данных; он описывает подгонку к тем данным, что уже есть.",
          "Обратно, низкий R² не является автоматически провалом. В социальных науках или медицине объяснение 15 % вариации человеческого поведения может быть настоящим и полезным результатом. Что считать высоким, целиком зависит от области, а сравнивать R² между разными зависимыми переменными бессмысленно.",
        ],
      },
      formula: {
        tex: "R^2=1-\\frac{SS_{\\text{res}}}{SS_{\\text{tot}}}=1-\\frac{\\sum (y_i-\\hat{y}_i)^2}{\\sum (y_i-\\bar{y})^2}",
        note: {
          en: "SS_res is what the model leaves unexplained; SS_tot is what a horizontal line at ȳ would leave. R² compares your model against that baseline.",
          ru: "SS_res — то, что модель оставила необъяснённым; SS_tot — то, что оставила бы горизонтальная прямая на уровне ȳ. R² сравнивает твою модель с этой базовой линией.",
        },
      },
    },
    {
      heading: { en: "Four assumptions, one plot", ru: "Четыре предпосылки, один график" },
      body: {
        en: [
          "Least squares always returns numbers. Whether those numbers mean anything depends on four assumptions, and almost all of them are checked on the residuals rather than on the data.",
          "Linearity: the relationship really is a straight line. Violated when the residual plot shows a curve, and the cost is a biased model — the coefficients answer the wrong question. Fix by transforming a variable or adding a squared term. Homoscedasticity: residual spread is constant across fitted values. Violated when the plot fans out, and the cost is wrong standard errors, so the confidence intervals and p-values are unreliable while the coefficients themselves stay unbiased. Independence: observations do not carry information about each other. Violated in time series and clustered data, and the cost is badly understated standard errors. Normality of residuals: needed for the small-sample inference; by the CLT it matters little once n is large.",
          "The single most useful diagnostic is residuals against fitted values. A shapeless horizontal cloud is what you want. A curve means non-linearity, a widening funnel means heteroscedasticity, and any visible pattern at all means the model has missed something systematic.",
        ],
        ru: [
          "МНК всегда возвращает числа. Означают ли эти числа что-нибудь, зависит от четырёх предпосылок, и почти все они проверяются по остаткам, а не по данным.",
          "Линейность: связь действительно прямая. Нарушается, когда на графике остатков видна кривая, и цена — смещённая модель: коэффициенты отвечают не на тот вопрос. Лечится преобразованием переменной или добавлением квадратичного члена. Гомоскедастичность: разброс остатков постоянен по всем предсказанным значениям. Нарушается, когда график расходится веером, и цена — неверные стандартные ошибки, поэтому доверительные интервалы и p-значения ненадёжны, хотя сами коэффициенты остаются несмещёнными. Независимость: наблюдения не несут информации друг о друге. Нарушается на временных рядах и кластеризованных данных, и цена — сильно заниженные стандартные ошибки. Нормальность остатков: нужна для вывода на малых выборках; по ЦПТ при большом n значит мало.",
          "Самая полезная диагностика — остатки против предсказанных значений. Нужно бесформенное горизонтальное облако. Кривая означает нелинейность, расширяющаяся воронка — гетероскедастичность, а любой видимый узор вообще означает, что модель упустила что-то систематическое.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Fit, then interrogate the residuals", ru: "Подогнать, потом допросить остатки" },
        code: `import statsmodels.api as sm
import matplotlib.pyplot as plt

X = sm.add_constant(df["hours"])      # без этого не будет свободного члена
model = sm.OLS(df["score"], X).fit()
print(model.summary())                # коэффициенты, SE, t, p, ДИ, R²

resid = model.resid
fitted = model.fittedvalues

fig, ax = plt.subplots(1, 3, figsize=(13, 3.5))
ax[0].scatter(fitted, resid, s=12); ax[0].axhline(0, color="red", lw=1)
ax[0].set_title("остатки vs предсказанные")     # облако без узора?
sm.qqplot(resid, line="s", ax=ax[1]); ax[1].set_title("Q-Q: нормальность")
ax[2].hist(resid, bins=25); ax[2].set_title("распределение остатков")

print("средний остаток:", resid.mean().round(12))   # всегда ~0 по построению`,
        out: {
          en: "The mean residual is always zero — it is forced by the fitting, so it is a check on your code, not on the model.",
          ru: "Средний остаток всегда ноль — это навязано подгонкой, поэтому проверка твоего кода, а не модели.",
        },
      },
      pitfall: {
        en: "statsmodels does not add an intercept for you. Forgetting sm.add_constant forces the line through the origin and can produce a wildly wrong slope with a suspiciously high R².",
        ru: "statsmodels не добавляет свободный член сам. Забытый sm.add_constant прогоняет прямую через начало координат и может дать дико неверный наклон при подозрительно высоком R².",
      },
    },
  ],
  worked: {
    title: { en: "Worked example: the same six students, now fitted", ru: "Разбор: те же шесть студентов, теперь с подгонкой" },
    intro: {
      en: "Hours x and score y: (2, 55), (3, 60), (5, 70), (7, 78), (8, 85), (11, 92). Last week we found r = 0.99. Now fit the line and say what it predicts.",
      ru: "Часы x и балл y: (2, 55), (3, 60), (5, 70), (7, 78), (8, 85), (11, 92). На прошлой неделе мы получили r = 0,99. Теперь подгоним прямую и скажем, что она предсказывает.",
    },
    steps: [
      {
        text: { en: "Reuse the sums from last week: x̄ = 6, ȳ = 73.33, Σ(x−x̄)(y−ȳ) = 237.9, Σ(x−x̄)² = 56.", ru: "Переиспользуем суммы с прошлой недели: x̄ = 6, ȳ = 73,33, Σ(x−x̄)(y−ȳ) = 237,9, Σ(x−x̄)² = 56." },
      },
      {
        text: { en: "The slope is the ratio of those two sums.", ru: "Наклон — отношение этих двух сумм." },
        formula: { tex: "\\hat{\\beta_1}=\\frac{237{,}9}{56}\\approx 4{,}248" },
      },
      {
        text: { en: "The intercept follows from the line passing through (x̄, ȳ).", ru: "Свободный член следует из того, что прямая проходит через (x̄, ȳ)." },
        formula: { tex: "\\hat{\\beta_0}=73{,}33-4{,}248\\cdot 6=73{,}33-25{,}49\\approx 47{,}84" },
      },
      {
        text: { en: "Write the fitted equation and check it against a data point: at x = 5 it predicts 69.1 against an observed 70, a residual of +0.9.", ru: "Записываем уравнение и сверяем с точкой данных: при x = 5 оно предсказывает 69,1 против наблюдённых 70, остаток +0,9." },
        formula: { tex: "\\hat{y}=47{,}84+4{,}248\\,x" },
      },
      {
        text: { en: "Interpret both coefficients in words, including which one is not interpretable.", ru: "Интерпретируем оба коэффициента словами, включая тот, который интерпретации не поддаётся." },
        formula: { tex: "R^2=r^2=0{,}990^2\\approx 0{,}980" },
      },
    ],
    conclusion: {
      en: "Each additional hour of study is associated with about 4.2 more points, and the model accounts for 98 % of the variation in this sample. The intercept of 47.8 is the predicted score for zero hours — inside the plausible range here, but still an extrapolation, since nobody in the data studied fewer than two hours. With n = 6 the standard errors are large and the residual plot has too few points to diagnose anything, so this is a demonstration of the arithmetic rather than a defensible model.",
      ru: "Каждый дополнительный час подготовки связан примерно с 4,2 балла, а модель объясняет 98 % вариации в этой выборке. Свободный член 47,8 — предсказанный балл при нуле часов; здесь он попадает в правдоподобный диапазон, но всё равно является экстраполяцией, поскольку никто в данных не занимался меньше двух часов. При n = 6 стандартные ошибки велики, а на графике остатков слишком мало точек, чтобы что-то диагностировать, — так что это демонстрация арифметики, а не защитимая модель.",
    },
  },
  exercises: [
    {
      q: { en: "A model gives β₁ = −2.3 for price on demand. Write the interpretation sentence.", ru: "Модель даёт β₁ = −2,3 для цены в уравнении спроса. Напиши предложение с интерпретацией." },
      a: { en: "Each additional unit of price is associated with 2.3 fewer units of demand, on average, within the observed price range. The three qualifiers all matter: 'associated' because this is not a causal claim, 'on average' because it is an expected change and not a promise for any single case, and 'within the observed range' because the linear relationship is only evidenced where you have data.", ru: "Каждая дополнительная единица цены связана в среднем с падением спроса на 2,3 единицы в пределах наблюдаемого диапазона цен. Все три оговорки важны: «связана» — потому что это не причинное утверждение, «в среднем» — потому что это ожидаемое изменение, а не обещание для отдельного случая, и «в пределах наблюдаемого диапазона» — потому что линейность подтверждена только там, где есть данные." },
    },
    {
      q: { en: "You add a column of random numbers as a predictor. What happens to R²?", ru: "Ты добавляешь столбец случайных чисел как предиктор. Что происходит с R²?" },
      a: { en: "It rises, or at worst stays the same — it can never fall. Least squares will always find some coefficient for the new column that fits the existing noise slightly better, and R² only measures fit to the data at hand. This is exactly why R² cannot compare models of different sizes; adjusted R², which penalises each added parameter, is the tool for that, and it will fall here.", ru: "Он растёт или в худшем случае остаётся прежним — упасть он не может. МНК всегда найдёт для нового столбца какой-то коэффициент, чуть лучше подгоняющий имеющийся шум, а R² измеряет только подгонку к наличным данным. Именно поэтому R² не годится для сравнения моделей разного размера; для этого есть скорректированный R², штрафующий за каждый добавленный параметр, и он здесь упадёт." },
    },
    {
      q: { en: "The residual plot shows a clear U shape. What is wrong and what do you do?", ru: "На графике остатков видна отчётливая U-образная форма. Что не так и что делать?" },
      a: { en: "The linearity assumption fails: the true relationship is curved and the straight line under-predicts at both ends and over-predicts in the middle, which is what draws the U. The model is misspecified, so its coefficients answer the wrong question. Fix by adding a quadratic term in x, or by transforming a variable — a log on y often straightens multiplicative growth. Refit and check that the U has become a shapeless cloud.", ru: "Нарушена предпосылка линейности: истинная связь изогнута, и прямая занижает предсказание на обоих концах и завышает в середине — это и рисует U. Модель специфицирована неверно, поэтому её коэффициенты отвечают не на тот вопрос. Лечится добавлением квадратичного члена по x либо преобразованием переменной — логарифм по y часто выпрямляет мультипликативный рост. Переподгони и убедись, что U превратилась в бесформенное облако." },
    },
    {
      q: { en: "Residuals fan out as fitted values grow. What breaks, and what stays valid?", ru: "Остатки расходятся веером с ростом предсказанных значений. Что ломается, а что остаётся верным?" },
      a: { en: "This is heteroscedasticity. The coefficient estimates remain unbiased — the line is still in the right place on average — but the standard errors are wrong, so every confidence interval, t statistic and p-value built from them is unreliable. Fixes: use robust standard errors, which statsmodels offers as fit(cov_type='HC3'), or transform y with a log, which often stabilises variance in positive right-skewed data.", ru: "Это гетероскедастичность. Оценки коэффициентов остаются несмещёнными — прямая в среднем на месте, — но стандартные ошибки неверны, поэтому любой построенный на них доверительный интервал, статистика t и p-значение ненадёжны. Лечение: робастные стандартные ошибки, которые statsmodels даёт через fit(cov_type='HC3'), либо логарифмирование y, часто стабилизирующее дисперсию у положительных скошенных вправо данных." },
    },
    {
      q: { en: "R² = 0.92 on a model fitted to 15 points with 6 predictors. Are you impressed?", ru: "R² = 0,92 у модели на 15 точках с 6 предикторами. Впечатляет?" },
      a: { en: "No. With six predictors and fifteen observations there are only eight residual degrees of freedom, and R² is guaranteed to look good because the model has enough freedom to trace the noise. Look at adjusted R², which penalises the parameter count, and better still check performance on held-out data. This is textbook overfitting: excellent description of the sample, no reason to expect it to generalise.", ru: "Нет. При шести предикторах и пятнадцати наблюдениях остаётся всего восемь остаточных степеней свободы, и R² гарантированно выглядит хорошо, потому что у модели достаточно свободы, чтобы обвести шум. Смотри скорректированный R², штрафующий за число параметров, а ещё лучше — проверь качество на отложенных данных. Это учебное переобучение: отличное описание выборки и никаких оснований ждать обобщения." },
    },
    {
      q: { en: "Why does the fitted line always pass through (x̄, ȳ)?", ru: "Почему подогнанная прямая всегда проходит через (x̄, ȳ)?" },
      a: { en: "It falls straight out of the intercept formula β₀ = ȳ − β₁x̄: substituting x = x̄ into ŷ = β₀ + β₁x gives exactly ȳ. Structurally it comes from the first-order condition that the residuals sum to zero, which is what setting the derivative with respect to β₀ to zero enforces. It is a useful arithmetic check: if your hand-computed line misses (x̄, ȳ), you have made a mistake.", ru: "Это прямо следует из формулы свободного члена β₀ = ȳ − β₁x̄: подстановка x = x̄ в ŷ = β₀ + β₁x даёт ровно ȳ. Структурно это идёт из условия первого порядка о равенстве нулю суммы остатков, которое и навязывает приравнивание производной по β₀ к нулю. Полезная арифметическая проверка: если посчитанная руками прямая промахивается мимо (x̄, ȳ), где-то ошибка." },
    },
  ],
  checklist: {
    en: [
      "I can derive the least-squares slope by setting the two partial derivatives to zero",
      "I state coefficients in the units of the problem, with 'associated with' not 'causes'",
      "I know why R² cannot compare models with different numbers of predictors",
      "I look at the residuals-versus-fitted plot before believing any regression output",
      "I can name what breaks under each of the four assumption violations",
    ],
    ru: [
      "Могу вывести коэффициент наклона МНК, приравняв две частные производные к нулю",
      "Формулирую коэффициенты в единицах задачи, со словом «связан», а не «вызывает»",
      "Знаю, почему R² не сравнивает модели с разным числом предикторов",
      "Смотрю на график остатков против предсказанных до того, как поверить выводу регрессии",
      "Могу назвать, что ломается при нарушении каждой из четырёх предпосылок",
    ],
  },
};
