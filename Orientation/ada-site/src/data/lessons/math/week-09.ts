import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 9,
  minutes: 65,
  title: { en: "Time series and forecasting", ru: "Временные ряды и прогнозирование" },
  summary: {
    en: "Why ordered data break the independence assumption, how to decompose a series into trend, seasonality and remainder, and what the simplest honest forecast looks like.",
    ru: "Почему упорядоченные данные ломают предпосылку независимости, как разложить ряд на тренд, сезонность и остаток и как выглядит простейший честный прогноз.",
  },
  goals: {
    en: [
      "Explain why ordinary regression standard errors are wrong on autocorrelated data",
      "Compute growth rates and index numbers and choose a sensible base",
      "Decompose a series into trend, seasonality and remainder, additively or multiplicatively",
      "Read an ACF plot and build a baseline forecast you can defend",
    ],
    ru: [
      "Объяснять, почему обычные стандартные ошибки регрессии неверны на автокоррелированных данных",
      "Считать темпы роста и индексы и осмысленно выбирать базу",
      "Раскладывать ряд на тренд, сезонность и остаток аддитивно или мультипликативно",
      "Читать график ACF и строить базовый прогноз, который можно защитить",
    ],
  },
  sections: [
    {
      heading: { en: "Order changes everything", ru: "Порядок меняет всё" },
      body: {
        en: [
          "Every method so far assumed observations are independent. In a time series they are not: today's value carries information about tomorrow's. Sales this month resemble sales last month, and that resemblance is the whole subject.",
          "The practical consequence is that standard errors computed as if the data were independent are too small, often badly so. You get confidence intervals that are far too narrow and p-values that declare significance where none exists. The coefficients themselves may be fine; the inference around them is not.",
          "The second consequence is that random splitting for validation is invalid. Shuffling a time series and holding out random rows lets the model see the future while predicting the past. Validation must respect the order: train on the first part, test on the later part, and if you cross-validate, expand the training window forward rather than sampling it.",
        ],
        ru: [
          "Все методы до сих пор предполагали независимость наблюдений. Во временном ряде они не независимы: сегодняшнее значение несёт информацию о завтрашнем. Продажи этого месяца похожи на продажи прошлого, и это сходство и есть весь предмет.",
          "Практическое следствие в том, что стандартные ошибки, посчитанные как для независимых данных, слишком малы, нередко сильно. Получаются чересчур узкие доверительные интервалы и p-значения, объявляющие значимость там, где её нет. Сами коэффициенты могут быть в порядке; вывод вокруг них — нет.",
          "Второе следствие: случайное разбиение для валидации недопустимо. Перемешать временной ряд и отложить случайные строки значит дать модели увидеть будущее при предсказании прошлого. Валидация обязана уважать порядок: обучение на ранней части, проверка на поздней, а при кросс-валидации окно обучения расширяется вперёд, а не выбирается случайно.",
        ],
      },
      key: {
        en: "Never shuffle a time series. Every split must keep the past before the future, or your validation error is fiction.",
        ru: "Никогда не перемешивай временной ряд. Любое разбиение должно оставлять прошлое до будущего, иначе ошибка валидации — вымысел.",
      },
    },
    {
      heading: { en: "Growth rates and index numbers", ru: "Темпы роста и индексы" },
      body: {
        en: [
          "The chain growth rate compares each period with the previous one; the base growth rate compares every period with one fixed reference period. Both are needed: the chain rate shows the local dynamics, the base rate shows the cumulative journey.",
          "An index number is the base comparison scaled to 100, which makes series with different units comparable on one chart. The choice of base period is a rhetorical act as much as a technical one — picking an unusually low base makes all subsequent growth look impressive. Say which base you chose and why.",
          "Two arithmetic traps recur. Percentage changes do not add: a 50 % fall followed by a 50 % rise leaves you at 75 % of where you started, not back at 100 %. And to average growth rates you need the geometric mean, not the arithmetic one, because growth compounds multiplicatively.",
        ],
        ru: [
          "Цепной темп роста сравнивает каждый период с предыдущим; базисный сравнивает каждый период с одним фиксированным. Нужны оба: цепной показывает локальную динамику, базисный — накопленный путь.",
          "Индекс — это базисное сравнение, отмасштабированное к 100, что делает ряды в разных единицах сопоставимыми на одном графике. Выбор базисного периода — акт не только технический, но и риторический: взять необычно низкую базу значит сделать весь последующий рост впечатляющим. Указывай, какую базу выбрал и почему.",
          "Повторяются две арифметические ловушки. Процентные изменения не складываются: падение на 50 % с последующим ростом на 50 % оставляет тебя на 75 % от начального уровня, а не возвращает к 100 %. И усреднять темпы роста нужно средним геометрическим, а не арифметическим, потому что рост складывается мультипликативно.",
        ],
      },
      formula: {
        tex: "T_{\\text{цепной}}=\\frac{y_t}{y_{t-1}},\\qquad I_t=\\frac{y_t}{y_0}\\cdot 100,\\qquad \\bar{T}=\\sqrt[n]{\\frac{y_n}{y_0}}",
        note: {
          en: "The average growth rate is the geometric mean, which reduces to the n-th root of the ratio of the last value to the first — every intermediate value cancels.",
          ru: "Средний темп роста — среднее геометрическое, которое сводится к корню n-й степени из отношения последнего значения к первому: все промежуточные сокращаются.",
        },
      },
      pitfall: {
        en: "Averaging the growth rates 1.5 and 0.5 arithmetically gives 1.0, suggesting no change. Geometrically it is √0.75 ≈ 0.87 — a 13 % average decline, which is what actually happened.",
        ru: "Арифметическое усреднение темпов 1,5 и 0,5 даёт 1,0 и подсказывает, что ничего не изменилось. Геометрически это √0,75 ≈ 0,87 — среднее падение на 13 %, что и произошло на деле.",
      },
    },
    {
      heading: { en: "Decomposition: trend, seasonality, remainder", ru: "Разложение: тренд, сезонность, остаток" },
      body: {
        en: [
          "A series is usually read as three parts. The trend is the long-run direction. Seasonality is a pattern that repeats on a fixed period — days of the week, months of the year. The remainder is what neither explains, and it is where you look for anomalies.",
          "The additive form y = T + S + R suits a series whose seasonal swing has roughly constant absolute size. The multiplicative form y = T · S · R suits one where the swing grows with the level, which is the common case for sales and traffic: December is not 500 units above average, it is 30 % above average. Taking logs converts the multiplicative case into the additive one, which is why log transforms are so frequent here.",
          "The trend is usually extracted with a moving average whose window equals the seasonal period — a 12-month window for monthly data — because averaging over a full cycle cancels the seasonality out. The seasonal component is then the average deviation for each position in the cycle, and the remainder is whatever is left.",
        ],
        ru: [
          "Ряд обычно читают как три части. Тренд — долгосрочное направление. Сезонность — узор, повторяющийся с фиксированным периодом: дни недели, месяцы года. Остаток — то, что не объясняет ни один из них, и именно там ищут аномалии.",
          "Аддитивная форма y = T + S + R подходит ряду, у которого сезонный размах примерно постоянен в абсолютных величинах. Мультипликативная y = T · S · R подходит там, где размах растёт вместе с уровнем, а это обычный случай для продаж и трафика: декабрь не на 500 единиц выше среднего, а на 30 % выше. Логарифмирование переводит мультипликативный случай в аддитивный — поэтому логарифмы здесь так часты.",
          "Тренд обычно извлекают скользящим средним с окном, равным сезонному периоду, — 12 месяцев для месячных данных, — потому что усреднение по полному циклу гасит сезонность. Сезонная компонента затем есть среднее отклонение для каждой позиции цикла, а остаток — всё, что осталось.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Decomposition in four lines", ru: "Разложение в четыре строки" },
        code: `import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

s = df.set_index("date")["sales"].asfreq("MS")   # регулярная частота обязательна

dec = seasonal_decompose(s, model="multiplicative", period=12)
dec.plot()

print("сезонные коэффициенты по месяцам:")
print(dec.seasonal.groupby(dec.seasonal.index.month).first().round(3))

# аномалии живут в остатке
r = dec.resid.dropna()
outliers = r[(r - r.mean()).abs() > 3 * r.std()]
print("аномальных месяцев:", len(outliers))
print(outliers)`,
        out: {
          en: "A seasonal coefficient of 1.31 for December means December runs 31 % above the trend. Anomalies show up in resid, not in the raw series.",
          ru: "Сезонный коэффициент 1,31 для декабря означает, что декабрь идёт на 31 % выше тренда. Аномалии проявляются в resid, а не в исходном ряде.",
        },
      },
    },
    {
      heading: { en: "Autocorrelation, stationarity and a baseline forecast", ru: "Автокорреляция, стационарность и базовый прогноз" },
      body: {
        en: [
          "Autocorrelation is the correlation of a series with itself shifted by k periods. The ACF plotted against k is the standard diagnostic: a slow linear decay indicates a trend, a spike at lag 12 on monthly data indicates annual seasonality, and values inside the confidence band mean no structure left at that lag.",
          "Most classical methods require stationarity — constant mean, constant variance, and an autocovariance depending only on the lag. Real series usually are not stationary, and the standard remedy is differencing: model the change from period to period rather than the level. One difference removes a linear trend; a seasonal difference of lag 12 removes annual seasonality.",
          "Before any sophisticated model, build the naive baselines and measure them. The naive forecast says tomorrow equals today. The seasonal naive says this December equals last December. A moving average smooths the last few periods. Any model you build must beat these on out-of-sample error, and a surprising number of complicated models do not.",
        ],
        ru: [
          "Автокорреляция — корреляция ряда с самим собой, сдвинутым на k периодов. График ACF по k — стандартная диагностика: медленное линейное убывание указывает на тренд, всплеск на лаге 12 у месячных данных — на годовую сезонность, а значения внутри доверительной полосы означают отсутствие структуры на этом лаге.",
          "Большинство классических методов требует стационарности: постоянного среднего, постоянной дисперсии и автоковариации, зависящей только от лага. Реальные ряды обычно нестационарны, и стандартное лекарство — взятие разностей: моделировать изменение от периода к периоду, а не уровень. Одна разность убирает линейный тренд; сезонная разность лага 12 убирает годовую сезонность.",
          "До всякой изощрённой модели построй наивные базовые прогнозы и измерь их. Наивный прогноз говорит, что завтра равно сегодня. Сезонный наивный — что этот декабрь равен прошлому декабрю. Скользящее среднее сглаживает несколько последних периодов. Любая построенная модель обязана побить их по ошибке вне выборки, и удивительно многие сложные модели этого не делают.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "ACF, differencing, and baselines that must be beaten", ru: "ACF, разности и базовые прогнозы, которые надо побить" },
        code: `from statsmodels.graphics.tsaplots import plot_acf
from statsmodels.tsa.stattools import adfuller
import numpy as np

plot_acf(s, lags=36)                     # всплеск на 12 -> годовая сезонность

print("ADF p =", round(adfuller(s.dropna())[1], 4))   # p > 0.05 -> нестационарен
print("ADF p после разности =", round(adfuller(s.diff().dropna())[1], 4))

# честное разбиение: прошлое -> обучение, будущее -> проверка
train, test = s[:-12], s[-12:]

naive        = np.repeat(train.iloc[-1], len(test))
seasonal_nv  = train[-12:].values                    # тот же месяц год назад
moving_avg   = np.repeat(train[-3:].mean(), len(test))

def mape(y, yhat):
    return float((np.abs((y - yhat) / y)).mean() * 100)

for name, f in [("наивный", naive), ("сезонный наивный", seasonal_nv), ("скольз. среднее", moving_avg)]:
    print(f"{name}: MAPE {mape(test.values, f):.1f}%")`,
        out: {
          en: "On seasonal data the seasonal naive forecast is often startlingly hard to beat. Report its error next to your model's — that comparison is what makes your result meaningful.",
          ru: "На сезонных данных сезонный наивный прогноз нередко поразительно трудно побить. Указывай его ошибку рядом с ошибкой своей модели — именно это сравнение делает результат осмысленным.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: quarterly sales", ru: "Разбор: квартальные продажи" },
    intro: {
      en: "Eight quarters of sales in thousands: 100, 120, 90, 150, 110, 132, 99, 165. Analyse the dynamics and forecast the next quarter.",
      ru: "Восемь кварталов продаж в тысячах: 100, 120, 90, 150, 110, 132, 99, 165. Разбери динамику и спрогнозируй следующий квартал.",
    },
    steps: [
      {
        text: { en: "Chain growth rates first. They swing wildly, which is the signature of seasonality rather than instability.", ru: "Сначала цепные темпы. Они дико скачут — это подпись сезонности, а не нестабильности." },
        formula: { tex: "\\frac{120}{100}=1{,}20,\\quad \\frac{90}{120}=0{,}75,\\quad \\frac{150}{90}=1{,}67,\\quad \\frac{110}{150}=0{,}73,\\ \\dots" },
      },
      {
        text: { en: "Compare the same quarter year over year. Every one grows by exactly 10 %, so the underlying trend is clean.", ru: "Сравним одноимённые кварталы год к году. Каждый растёт ровно на 10 %, значит базовый тренд чистый." },
        formula: { tex: "\\frac{110}{100}=1{,}10,\\quad \\frac{132}{120}=1{,}10,\\quad \\frac{99}{90}=1{,}10,\\quad \\frac{165}{150}=1{,}10" },
      },
      {
        text: { en: "Average growth over the whole span uses the geometric mean, not the arithmetic one.", ru: "Средний рост за весь отрезок считается средним геометрическим, а не арифметическим." },
        formula: { tex: "\\bar{T}=\\sqrt[7]{\\frac{165}{100}}=\\sqrt[7]{1{,}65}\\approx 1{,}0748\\;\\Rightarrow\\;\\text{7{,}5 \\% за квартал}" },
      },
      {
        text: { en: "Seasonal coefficients: divide each quarter by that year's average. Year 1 averages 115, year 2 averages 126.5.", ru: "Сезонные коэффициенты: делим каждый квартал на среднее своего года. Первый год в среднем 115, второй — 126,5." },
        formula: { tex: "S_{Q1}\\approx 0{,}87,\\quad S_{Q2}\\approx 1{,}04,\\quad S_{Q3}\\approx 0{,}78,\\quad S_{Q4}\\approx 1{,}30" },
      },
      {
        text: { en: "Forecast Q1 of year 3. The multiplicative model says trend times season: take Q1 of year 2 and apply the 10 % annual growth.", ru: "Прогноз на Q1 третьего года. Мультипликативная модель говорит: тренд умножить на сезон, то есть взять Q1 второго года и применить годовой рост 10 %." },
        formula: { tex: "\\hat{y}_{Q1,\\,3}=110\\cdot 1{,}10=121" },
      },
    ],
    conclusion: {
      en: "Forecast 121 thousand for Q1 of year 3. Two caveats belong with it. Eight points is far too few to establish a seasonal pattern with any confidence — four observations per quarter position would be a minimum. And the point forecast should carry an interval: with a residual spread of a few per cent, something like [113; 129] is honest, whereas a bare 121 implies a precision the data cannot support.",
      ru: "Прогноз — 121 тысяча на Q1 третьего года. К нему прилагаются две оговорки. Восемь точек слишком мало, чтобы установить сезонный узор хоть сколько-нибудь уверенно: минимумом были бы четыре наблюдения на каждую позицию квартала. И точечный прогноз должен нести интервал: при разбросе остатков в несколько процентов честно выглядит что-то вроде [113; 129], тогда как голое 121 подразумевает точность, которой данные не обеспечивают.",
    },
  },
  exercises: [
    {
      q: { en: "Why can you not use random train-test splitting on a time series?", ru: "Почему на временном ряде нельзя использовать случайное разбиение на обучение и тест?" },
      a: { en: "Because random rows put future observations into the training set while past observations sit in the test set, so the model predicts the past knowing the future. That is leakage, and it produces a validation error far better than anything achievable in reality. Split chronologically: train on the earlier portion, test on the later. For cross-validation use an expanding or rolling window that always moves forward.", ru: "Потому что случайные строки помещают будущие наблюдения в обучающую выборку, а прошлые оставляют в тестовой, и модель предсказывает прошлое, зная будущее. Это утечка, и она даёт ошибку валидации намного лучше достижимой в реальности. Разбивай хронологически: обучение на ранней части, проверка на поздней. Для кросс-валидации используй расширяющееся или скользящее окно, всегда движущееся вперёд." },
    },
    {
      q: { en: "A value falls 40 % then rises 40 %. Where does it end up?", ru: "Величина падает на 40 %, затем растёт на 40 %. Где она окажется?" },
      a: { en: "At 84 % of the original. 100 × 0.6 = 60, then 60 × 1.4 = 84. Percentage changes are multiplicative, so they do not cancel by adding to zero; the fall is applied to the original base and the rise to the smaller one. To return to 100 from 60 you need a rise of 66.7 %. This asymmetry is why growth rates are averaged geometrically.", ru: "На уровне 84 % от исходного. 100 × 0,6 = 60, затем 60 × 1,4 = 84. Процентные изменения мультипликативны, поэтому не сокращаются в ноль сложением: падение применяется к исходной базе, а рост — к уменьшенной. Чтобы вернуться к 100 с 60, нужен рост на 66,7 %. Эта асимметрия и есть причина, по которой темпы роста усредняют геометрически." },
    },
    {
      q: { en: "The seasonal swing in a sales series grows as sales grow. Additive or multiplicative decomposition?", ru: "Сезонный размах в ряде продаж растёт вместе с продажами. Аддитивное или мультипликативное разложение?" },
      a: { en: "Multiplicative, because the seasonal effect is proportional to the level rather than a fixed quantity — December is 30 % above trend, not 500 units above it. Equivalently, take logarithms and use an additive decomposition, since log(T · S · R) = log T + log S + log R. The log route is often preferred because it lets you keep using additive tools.", ru: "Мультипликативное, потому что сезонный эффект пропорционален уровню, а не является фиксированной величиной: декабрь на 30 % выше тренда, а не на 500 единиц. Равносильно можно взять логарифмы и применить аддитивное разложение, поскольку log(T · S · R) = log T + log S + log R. Логарифмический путь часто предпочтительнее, так как позволяет продолжать пользоваться аддитивными инструментами." },
    },
    {
      q: { en: "The ACF decays slowly and almost linearly over 20 lags. What does that indicate?", ru: "ACF убывает медленно и почти линейно на протяжении 20 лагов. О чём это говорит?" },
      a: { en: "A trend, and therefore non-stationarity. Each value stays close to the previous one, so correlations persist far out instead of dying quickly. Confirm with an ADF test — a p-value above 0.05 fails to reject the unit root. The standard remedy is first differencing; after it the ACF should drop off sharply, and the ADF p-value should fall well below 0.05.", ru: "О тренде и, следовательно, о нестационарности. Каждое значение держится близко к предыдущему, поэтому корреляции сохраняются далеко, а не гаснут быстро. Подтверди тестом ADF: p-значение выше 0,05 не отвергает единичный корень. Стандартное лекарство — взятие первой разности; после неё ACF должна резко упасть, а p-значение ADF — уйти заметно ниже 0,05." },
    },
    {
      q: { en: "Your model gives 12 % MAPE. Is that good?", ru: "Твоя модель даёт MAPE 12 %. Это хорошо?" },
      a: { en: "Unanswerable without a baseline. Compute the naive and seasonal naive forecasts on the same test window. If the seasonal naive gives 10 %, your model is worse than doing nothing and should not be used. If it gives 25 %, you have a real improvement. MAPE also misbehaves near zero values and penalises over- and under-prediction asymmetrically, so on series with small or zero values prefer MAE or RMSE.", ru: "Ответить нельзя без базового прогноза. Посчитай наивный и сезонный наивный на том же тестовом окне. Если сезонный наивный даёт 10 %, твоя модель хуже бездействия и применять её не следует. Если 25 % — у тебя настоящее улучшение. MAPE вдобавок плохо ведёт себя вблизи нулевых значений и асимметрично штрафует завышение и занижение, поэтому на рядах с малыми или нулевыми значениями предпочитай MAE или RMSE." },
    },
  ],
  checklist: {
    en: [
      "I never shuffle a time series, and my validation split respects chronology",
      "I use the geometric mean for average growth rates",
      "I can choose between additive and multiplicative decomposition from the shape of the swing",
      "I read the ACF before choosing a model and difference when it decays slowly",
      "Every forecast I report is accompanied by a naive baseline for comparison",
    ],
    ru: [
      "Никогда не перемешиваю временной ряд, и разбиение для валидации уважает хронологию",
      "Использую среднее геометрическое для средних темпов роста",
      "Могу выбрать между аддитивным и мультипликативным разложением по форме размаха",
      "Читаю ACF до выбора модели и беру разности, когда она убывает медленно",
      "Каждый мой прогноз сопровождается наивным базовым для сравнения",
    ],
  },
};
