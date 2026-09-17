import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 8,
  minutes: 70,
  title: { en: "Multiple regression", ru: "Множественная регрессия" },
  summary: {
    en: "Several predictors at once: what 'holding other variables constant' really means, multicollinearity and VIF, dummy variables, and how to choose between models.",
    ru: "Несколько предикторов сразу: что на самом деле значит «при прочих равных», мультиколлинеарность и VIF, фиктивные переменные и как выбирать между моделями.",
  },
  goals: {
    en: [
      "Interpret a partial coefficient correctly, including the ceteris paribus clause",
      "Detect multicollinearity with VIF and decide what to do about it",
      "Encode a categorical predictor with dummies and read the coefficients against the base level",
      "Compare models with adjusted R², AIC and out-of-sample error rather than R²",
    ],
    ru: [
      "Верно интерпретировать частный коэффициент, включая оговорку «при прочих равных»",
      "Обнаруживать мультиколлинеарность через VIF и решать, что с ней делать",
      "Кодировать категориальный предиктор фиктивными переменными и читать коэффициенты относительно базовой категории",
      "Сравнивать модели по скорректированному R², AIC и ошибке вне выборки, а не по R²",
    ],
  },
  sections: [
    {
      heading: { en: "What a partial coefficient means", ru: "Что означает частный коэффициент" },
      body: {
        en: [
          "In multiple regression each coefficient is a partial effect: the expected change in y for a one-unit increase in that predictor, with all the other predictors held fixed. The phrase 'holding the others constant' is not decoration — it changes the number.",
          "The mechanism is worth understanding, because it explains the surprises. β₁ in a multiple model is what you get by regressing out the other predictors from both y and x₁ and then relating the two sets of residuals. So it answers: of the variation in x₁ that the other predictors cannot explain, how much of the leftover variation in y does it account for?",
          "This is why a coefficient can change sign when a variable is added. Simple regression of salary on years of experience might give a strong positive slope; adding seniority level can shrink it to near zero, because most of what experience was capturing was really seniority. Neither number is wrong — they answer different questions, and the model specification is the question.",
        ],
        ru: [
          "В множественной регрессии каждый коэффициент — частный эффект: ожидаемое изменение y при росте этого предиктора на единицу, когда все остальные предикторы зафиксированы. Оборот «при прочих равных» не украшение — он меняет само число.",
          "Механизм стоит понимать, потому что он объясняет сюрпризы. β₁ в множественной модели — это то, что получится, если убрать из y и из x₁ влияние остальных предикторов, а затем связать между собой два набора остатков. То есть он отвечает на вопрос: из той вариации x₁, которую другие предикторы объяснить не могут, какую долю оставшейся вариации y она объясняет?",
          "Поэтому коэффициент может сменить знак при добавлении переменной. Простая регрессия зарплаты на стаж может дать сильный положительный наклон; добавление уровня должности способно сжать его почти до нуля, потому что бо́льшая часть того, что улавливал стаж, на самом деле была должностью. Ни одно из чисел не является неверным — они отвечают на разные вопросы, а спецификация модели и есть вопрос.",
        ],
      },
      formula: {
        tex: "y=\\beta_0+\\beta_1x_1+\\beta_2x_2+\\dots+\\beta_kx_k+\\varepsilon,\\qquad \\hat{\\boldsymbol{\\beta}}=(X^{\\mathsf{T}}X)^{-1}X^{\\mathsf{T}}y",
        note: {
          en: "The matrix form is where the linear algebra from the warm-up week pays off. Note (XᵀX)⁻¹ — if the columns of X are linearly dependent, this inverse does not exist, and that is multicollinearity in its extreme form.",
          ru: "В матричной форме окупается линейная алгебра из недели разминки. Обрати внимание на (XᵀX)⁻¹: если столбцы X линейно зависимы, обратной матрицы не существует, — это и есть мультиколлинеарность в предельной форме.",
        },
      },
      key: {
        en: "A coefficient is a property of the model, not of the world. Change the set of predictors and every coefficient changes meaning.",
        ru: "Коэффициент — свойство модели, а не мира. Меняешь набор предикторов — меняется смысл каждого коэффициента.",
      },
    },
    {
      heading: { en: "Multicollinearity and VIF", ru: "Мультиколлинеарность и VIF" },
      body: {
        en: [
          "When predictors are strongly correlated with each other, the model cannot separate their contributions. Mathematically XᵀX becomes close to singular, the inverse blows up, and the standard errors on the coefficients go with it.",
          "The symptoms are recognisable: large standard errors and insignificant t statistics for individual predictors while the overall F test is highly significant, coefficients with implausible signs, and estimates that swing wildly when a few rows are added or removed. Prediction quality is usually fine — it is the interpretation that dies.",
          "The variance inflation factor quantifies it per predictor. Regress each predictor on all the others and compute VIF = 1/(1 − R²ⱼ). A VIF of 1 means no collinearity; 5 is a common warning threshold and 10 a serious one. A VIF of 10 means the standard error on that coefficient is √10 ≈ 3.2 times larger than it would be if the predictor were independent of the rest.",
          "The remedies depend on your goal. If you need prediction only, do nothing — or use ridge regression, which deliberately trades a little bias for much lower variance. If you need interpretation, drop one of the pair, combine them into a single index, or collect data that breaks the correlation.",
        ],
        ru: [
          "Когда предикторы сильно коррелируют между собой, модель не может разделить их вклады. Математически XᵀX становится близка к вырожденной, обратная матрица взрывается, а вместе с ней и стандартные ошибки коэффициентов.",
          "Симптомы узнаваемы: большие стандартные ошибки и незначимые t у отдельных предикторов при высоко значимом общем F-тесте, коэффициенты с неправдоподобными знаками и оценки, дико скачущие при добавлении или удалении нескольких строк. Качество прогноза обычно в порядке — умирает именно интерпретация.",
          "Фактор инфляции дисперсии измеряет это по каждому предиктору. Регрессируешь каждый предиктор на все остальные и считаешь VIF = 1/(1 − R²ⱼ). VIF, равный 1, означает отсутствие коллинеарности; 5 — распространённый порог предупреждения, 10 — серьёзный. VIF, равный 10, означает, что стандартная ошибка этого коэффициента в √10 ≈ 3,2 раза больше, чем была бы при независимости предиктора от остальных.",
          "Лечение зависит от цели. Если нужен только прогноз — не делай ничего или возьми гребневую регрессию, которая намеренно меняет немного смещения на куда меньшую дисперсию. Если нужна интерпретация — убери одного из пары, объедини их в индекс или собери данные, разрывающие корреляцию.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "VIF for every predictor", ru: "VIF по каждому предиктору" },
        code: `import pandas as pd, statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

X = df[["experience", "seniority", "age", "hours"]]
X = sm.add_constant(X)

vif = pd.DataFrame({
    "feature": X.columns,
    "VIF": [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
})
print(vif.round(2))     # const игнорируем, смотрим остальные

# VIF > 10 -> посмотреть, с чем именно коррелирует
print(df[["experience", "seniority", "age", "hours"]].corr().round(2))`,
        out: {
          en: "age and experience usually sit around VIF 8–15 together, because they measure nearly the same thing. Keeping both makes each coefficient uninterpretable.",
          ru: "age и experience обычно вместе дают VIF 8–15, потому что измеряют почти одно и то же. Сохранение обоих делает каждый коэффициент неинтерпретируемым.",
        },
      },
      pitfall: {
        en: "A high VIF is not an error and does not need fixing by reflex. If the collinear variables are controls and you only care about a different coefficient, leave them alone — the inflation applies to their standard errors, not to the whole model.",
        ru: "Высокий VIF — не ошибка и не требует рефлекторного лечения. Если коллинеарные переменные — контроли, а тебя интересует другой коэффициент, оставь их в покое: инфляция касается их стандартных ошибок, а не всей модели.",
      },
    },
    {
      heading: { en: "Categorical predictors and dummies", ru: "Категориальные предикторы и фиктивные переменные" },
      body: {
        en: [
          "Regression takes numbers, so a categorical predictor has to be encoded. For k categories you create k − 1 binary columns, each marking membership of one category. The omitted category becomes the base level, and every coefficient is read as a difference from it.",
          "The k − 1 is not an arbitrary convention. Including all k dummies plus an intercept makes the columns linearly dependent — the dummies sum to a column of ones, which is the intercept — so XᵀX is exactly singular and cannot be inverted. That is the dummy variable trap, and it is the extreme case of multicollinearity from the previous section.",
          "Interpretation therefore always names the baseline: 'mobile users have on average 4.2 minutes shorter sessions than desktop users, holding the other variables constant', where desktop is the omitted level. Changing which level is omitted changes every dummy coefficient and the intercept, but changes no prediction — it is a reparameterisation, not a different model.",
        ],
        ru: [
          "Регрессия принимает числа, поэтому категориальный предиктор нужно закодировать. Для k категорий создают k − 1 бинарный столбец, каждый помечает принадлежность к одной категории. Пропущенная категория становится базовой, и каждый коэффициент читается как отличие от неё.",
          "Это k − 1 — не произвольное соглашение. Включение всех k фиктивных переменных вместе со свободным членом делает столбцы линейно зависимыми: сумма фиктивных даёт столбец единиц, а это и есть свободный член, — поэтому XᵀX ровно вырождена и необратима. Это ловушка фиктивных переменных, предельный случай мультиколлинеарности из предыдущего раздела.",
          "Поэтому интерпретация всегда называет базу: «у мобильных пользователей сессии в среднем на 4,2 минуты короче, чем у десктопных, при прочих равных», где десктоп — пропущенная категория. Смена пропущенной категории меняет все коэффициенты фиктивных переменных и свободный член, но не меняет ни одного прогноза: это перепараметризация, а не другая модель.",
        ],
      },
      code: {
        lang: "python",
        caption: { en: "Dummies done right", ru: "Фиктивные переменные без ловушки" },
        code: `# drop_first=True убирает базовую категорию и ловушку вместе с ней
dummies = pd.get_dummies(df["device"], prefix="dev", drop_first=True, dtype=int)
print(dummies.head())        # dev_mobile, dev_tablet — desktop стал базой

X = pd.concat([df[["hours", "age"]], dummies], axis=1)
X = sm.add_constant(X)
model = sm.OLS(df["minutes"], X).fit()
print(model.summary())

# читать так: коэффициент dev_mobile — разница с desktop, а не абсолютный уровень`,
      },
    },
    {
      heading: { en: "Choosing between models", ru: "Выбор между моделями" },
      body: {
        en: [
          "R² cannot choose, because it never falls when you add variables. Adjusted R² subtracts a penalty proportional to the number of parameters, so it can decrease and therefore can compare models of different sizes. AIC and BIC do the same thing with a stronger information-theoretic footing; lower is better, and BIC penalises complexity harder, so it tends to select smaller models.",
          "All three are still in-sample criteria. The honest test is out-of-sample error: split the data, fit on one part, measure error on the other, or use k-fold cross-validation to average over several splits. A model that wins on adjusted R² but loses on cross-validated error is overfitting, and the cross-validation is the one to believe.",
          "Automatic stepwise selection — adding and removing variables by p-value until nothing moves — is still common and is a known bad idea: it inflates R², biases coefficients away from zero, and produces p-values that no longer mean what they claim, because the same data chose the hypotheses. Prefer a specification driven by the subject matter, or a regularised method such as lasso if you genuinely need automatic selection.",
        ],
        ru: [
          "R² выбрать не может, потому что не падает при добавлении переменных. Скорректированный R² вычитает штраф, пропорциональный числу параметров, поэтому способен уменьшаться и, следовательно, сравнивать модели разного размера. AIC и BIC делают то же самое на более прочном теоретико-информационном основании; меньше — лучше, а BIC штрафует сложность сильнее, поэтому склонен выбирать модели поменьше.",
          "Все три остаются внутривыборочными критериями. Честная проверка — ошибка вне выборки: раздели данные, подгони на одной части, измерь ошибку на другой либо используй k-кратную кросс-валидацию, чтобы усреднить по нескольким разбиениям. Модель, выигрывающая по скорректированному R², но проигрывающая по кросс-валидационной ошибке, переобучена, и верить надо кросс-валидации.",
          "Автоматический пошаговый отбор — добавление и удаление переменных по p-значению, пока что-то меняется, — до сих пор распространён и является известно плохой идеей: он раздувает R², смещает коэффициенты от нуля и порождает p-значения, которые больше не означают заявленного, потому что гипотезы выбраны теми же данными. Предпочитай спецификацию, продиктованную предметной областью, или регуляризованный метод вроде лассо, если автоматический отбор действительно нужен.",
        ],
      },
      formula: {
        tex: "R^2_{\\text{adj}}=1-\\big(1-R^2\\big)\\frac{n-1}{n-k-1},\\qquad \\text{AIC}=2k-2\\ln \\hat{L}",
        note: {
          en: "n is the sample size and k the number of predictors. As k grows the correction factor grows, so adjusted R² falls unless the new variable earns its place.",
          ru: "n — объём выборки, k — число предикторов. С ростом k поправочный множитель растёт, поэтому скорректированный R² падает, если новая переменная не оправдала своё место.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: a coefficient that changes sign", ru: "Разбор: коэффициент, который меняет знак" },
    intro: {
      en: "You model salary on years of experience and get a strong positive slope. Adding seniority level nearly kills it. Work out what happened and what to report.",
      ru: "Ты моделируешь зарплату по стажу и получаешь сильный положительный наклон. Добавление уровня должности почти его убивает. Разберись, что случилось и что писать в отчёт.",
    },
    steps: [
      {
        text: { en: "The simple model. Experience alone looks like a powerful predictor.", ru: "Простая модель. Стаж сам по себе выглядит мощным предиктором." },
        code: { lang: "python", code: `m1 = sm.OLS(y, sm.add_constant(df[["experience"]])).fit()
print(m1.params["experience"].round(2), m1.rsquared.round(3))
# 8500 за год стажа, R² = 0.62` },
      },
      {
        text: { en: "Add seniority. The experience coefficient collapses and its p-value stops being significant.", ru: "Добавляем должность. Коэффициент стажа схлопывается, а его p-значение перестаёт быть значимым." },
        code: { lang: "python", code: `m2 = sm.OLS(y, sm.add_constant(df[["experience", "seniority"]])).fit()
print(m2.params.round(2))
# experience 900, seniority 41000, R² = 0.88` },
      },
      {
        text: { en: "Check whether this is multicollinearity or a real change of meaning. VIF answers it.", ru: "Проверим, мультиколлинеарность это или настоящая смена смысла. Отвечает VIF." },
        code: { lang: "python", code: `print(df[["experience", "seniority"]].corr().iloc[0, 1].round(2))   # 0.79
# VIF ≈ 1/(1-0.79²) ≈ 2.7 — заметно, но не катастрофа` },
      },
      {
        text: { en: "Interpret. With VIF under 5, the collapse is not an artefact — it is confounding being controlled for.", ru: "Интерпретируем. При VIF ниже 5 схлопывание не артефакт — это учтённый конфаундинг." },
        formula: { tex: "\\hat{\\beta}_{\\text{exp}}^{(1)}=8500 \\;\\longrightarrow\\; \\hat{\\beta}_{\\text{exp}}^{(2)}=900" },
      },
      {
        text: { en: "Compare the models properly, on the criterion that penalises size.", ru: "Сравним модели корректно, по критерию, штрафующему размер." },
        code: { lang: "python", code: `print(m1.rsquared_adj.round(3), m2.rsquared_adj.round(3))   # 0.618 vs 0.877
print(m1.aic.round(1), m2.aic.round(1))                     # ниже у m2` },
      },
    ],
    conclusion: {
      en: "The simple model's 8 500 per year was mostly seniority wearing experience's clothes: people with more years tend to hold higher positions, and the higher position is what pays. Controlling for it, an extra year at the same level is worth about 900. Both models are arithmetically correct; the second answers the question you probably meant. Report the second, mention the first, and say plainly that seniority is the mechanism.",
      ru: "Восемь с половиной тысяч за год в простой модели были в основном должностью, переодетой в стаж: люди с бо́льшим стажем занимают более высокие позиции, а платит именно позиция. При контроле за ней лишний год на той же должности стоит около 900. Обе модели арифметически верны; вторая отвечает на тот вопрос, который ты, вероятно, имел в виду. Сообщай вторую, упомяни первую и прямо скажи, что механизм — должность.",
    },
  },
  exercises: [
    {
      q: { en: "Adding a variable flips a coefficient from +2.1 to −0.8. Is the model broken?", ru: "Добавление переменной переворачивает коэффициент с +2,1 на −0,8. Модель сломана?" },
      a: { en: "Not necessarily — this is Simpson's paradox territory and it is usually informative. The two coefficients answer different questions: the first is the total association, the second is the association holding the new variable constant. Check VIF: if collinearity is mild, the change is real confounding being controlled for and the second number is what you want. If VIF is above 10, the estimate is unstable and neither sign should be trusted.", ru: "Не обязательно — это территория парадокса Симпсона, и обычно она информативна. Два коэффициента отвечают на разные вопросы: первый — общая связь, второй — связь при фиксированной новой переменной. Проверь VIF: если коллинеарность умеренная, изменение отражает реально учтённый конфаундинг и нужное число — второе. Если VIF выше 10, оценка неустойчива и доверять не стоит ни одному знаку." },
    },
    {
      q: { en: "Why do k categories need only k − 1 dummy columns?", ru: "Почему для k категорий нужно только k − 1 фиктивных столбцов?" },
      a: { en: "Because the k-th is redundant: if a row is not in any of the first k − 1 categories, it must be in the last one. Including all k alongside an intercept makes the dummy columns sum to the intercept's column of ones, so X has linearly dependent columns, XᵀX is singular and (XᵀX)⁻¹ does not exist. Software either errors or silently drops one. The omitted category becomes the baseline every other coefficient is measured against.", ru: "Потому что k-й избыточен: если строка не попала ни в одну из первых k − 1 категорий, она обязана быть в последней. Включение всех k вместе со свободным членом делает сумму фиктивных столбцов равной столбцу единиц свободного члена, поэтому у X линейно зависимые столбцы, XᵀX вырождена и (XᵀX)⁻¹ не существует. Программа либо падает, либо молча выбрасывает один. Пропущенная категория становится базой, относительно которой измеряются остальные коэффициенты." },
    },
    {
      q: { en: "R² rises from 0.71 to 0.72 when you add three variables. Adjusted R² falls. What do you conclude?", ru: "R² растёт с 0,71 до 0,72 при добавлении трёх переменных. Скорректированный R² падает. Какой вывод?" },
      a: { en: "The three variables are not earning their place. R² had to rise — it always does — but the gain of 0.01 is smaller than the penalty for three extra parameters, so adjusted R² falls. Drop them. Confirm with AIC, which should also rise, and ideally with cross-validated error, which is the criterion that actually measures whether the bigger model generalises better.", ru: "Три переменные не оправдывают своё место. R² обязан был вырасти — он всегда растёт, — но прирост в 0,01 меньше штрафа за три лишних параметра, поэтому скорректированный R² падает. Убирай их. Подтверди по AIC, который тоже должен вырасти, и в идеале по кросс-валидационной ошибке — критерию, который реально измеряет, лучше ли обобщает большая модель." },
    },
    {
      q: { en: "The F test is highly significant but no individual predictor has p < 0.05. Explain.", ru: "F-тест высоко значим, но ни один отдельный предиктор не имеет p < 0,05. Объясни." },
      a: { en: "This is the signature of multicollinearity. Jointly the predictors explain a great deal, which the F test detects. Individually, each one's unique contribution — the part not shared with the others — is small and swamped by an inflated standard error, so no single t statistic reaches significance. Compute VIF; expect values well above 10. The model can still predict well, but you cannot attribute the effect to any one variable.", ru: "Это подпись мультиколлинеарности. Совместно предикторы объясняют многое, и F-тест это улавливает. По отдельности же уникальный вклад каждого — та часть, что не разделена с остальными, — мал и тонет в раздутой стандартной ошибке, поэтому ни одна статистика t не дотягивает до значимости. Посчитай VIF; жди значений сильно выше 10. Модель по-прежнему может хорошо прогнозировать, но приписать эффект какой-то одной переменной нельзя." },
    },
    {
      q: { en: "Why is stepwise selection by p-value a bad idea?", ru: "Почему пошаговый отбор по p-значению — плохая идея?" },
      a: { en: "Because the same data both choose the hypotheses and test them. After dozens of comparisons the surviving p-values no longer have their nominal meaning — they are the smallest of many, selected precisely for being small — so significance is overstated. The procedure also biases coefficients away from zero, inflates R², and is unstable: a few different rows produce a different model. Use subject-matter reasoning for the specification, or lasso if selection must be automatic.", ru: "Потому что одни и те же данные и выбирают гипотезы, и проверяют их. После десятков сравнений уцелевшие p-значения теряют номинальный смысл — это наименьшие из многих, отобранные именно за малость, — поэтому значимость завышена. Процедура вдобавок смещает коэффициенты от нуля, раздувает R² и неустойчива: несколько других строк дают другую модель. Строй спецификацию из предметных соображений или бери лассо, если отбор обязан быть автоматическим." },
    },
  ],
  checklist: {
    en: [
      "I always say 'holding the other variables constant' when reading a partial coefficient",
      "I compute VIF before interpreting coefficients in any multi-predictor model",
      "I use drop_first when creating dummies and I name the baseline in the interpretation",
      "I compare models with adjusted R², AIC or cross-validation, never with plain R²",
      "I can explain why a coefficient changing sign is often information rather than a bug",
    ],
    ru: [
      "Всегда проговариваю «при прочих равных», читая частный коэффициент",
      "Считаю VIF до интерпретации коэффициентов в любой модели с несколькими предикторами",
      "Использую drop_first при создании фиктивных переменных и называю базу в интерпретации",
      "Сравниваю модели по скорректированному R², AIC или кросс-валидации, но не по обычному R²",
      "Могу объяснить, почему смена знака коэффициента чаще информация, а не баг",
    ],
  },
};
