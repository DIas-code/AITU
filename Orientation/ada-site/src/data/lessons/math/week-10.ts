import type { Lesson } from "../types";

export const lesson: Lesson = {
  course: "math",
  week: 10,
  minutes: 70,
  title: { en: "End-term exam, clustering and PCA", ru: "Итоговый экзамен, кластеризация и PCA" },
  summary: {
    en: "The exam covers weeks 6–9. The new material is unsupervised: k-means and hierarchical clustering, and principal components as a projection onto eigenvectors.",
    ru: "Экзамен закрывает недели 6–9. Новый материал — обучение без учителя: k-means и иерархическая кластеризация, а также главные компоненты как проекция на собственные векторы.",
  },
  goals: {
    en: [
      "Revise weeks 6–9 against a compact checklist before the end-term",
      "Run k-means responsibly: scale first, choose k, and know what the algorithm cannot do",
      "Explain PCA as an eigenvector decomposition of the covariance matrix",
      "Decide how many components to keep and interpret what they mean",
    ],
    ru: [
      "Повторить недели 6–9 по компактному чек-листу перед итоговым контролем",
      "Ответственно применять k-means: сначала масштабировать, выбрать k и знать, чего алгоритм не умеет",
      "Объяснять PCA как разложение ковариационной матрицы по собственным векторам",
      "Решать, сколько компонент оставить, и интерпретировать их смысл",
    ],
  },
  sections: [
    {
      heading: { en: "What the end-term covers", ru: "Что на итоговом контроле" },
      body: {
        en: [
          "The exam window is 9–14 November and it covers weeks 6 to 9. It is worth 40 points; the other 60 came from laboratory works 5–8. After it, the final written exam in the session on 16–28 November covers the whole course.",
          "The heaviest marks are on interpretation, as before. Be able to read a regression summary aloud: what each coefficient means, what its confidence interval says, why R² is not enough, and what the residual plot would have to look like for you to trust it.",
        ],
        ru: [
          "Окно экзамена — 9–14 ноября, он закрывает недели с шестой по девятую. Он стоит 40 баллов; остальные 60 набраны лабораторными 5–8. После него письменный финальный экзамен в сессию 16–28 ноября закрывает весь курс.",
          "Основные баллы, как и раньше, за интерпретацию. Умей прочитать сводку регрессии вслух: что означает каждый коэффициент, что говорит его доверительный интервал, почему R² недостаточно и как должен выглядеть график остатков, чтобы ей можно было доверять.",
        ],
      },
      table: {
        head: { en: ["Week", "Must be able to", "Typical question"], ru: ["Неделя", "Уметь", "Типичный вопрос"] },
        rows: [
          ["6", "r, Spearman, correlation matrix", "why r = 0 is not independence"],
          ["7", "OLS derivation, coefficients, R², residuals", "interpret a slope; diagnose a residual plot"],
          ["8", "partial effects, VIF, dummies, model choice", "why a coefficient changed sign"],
          ["9", "growth rates, decomposition, ACF", "additive or multiplicative; beat the naive"],
        ],
        rowsRu: [
          ["6", "r, Спирмен, корреляционная матрица", "почему r = 0 — не независимость"],
          ["7", "вывод МНК, коэффициенты, R², остатки", "интерпретировать наклон; разобрать график остатков"],
          ["8", "частные эффекты, VIF, фиктивные, выбор модели", "почему коэффициент сменил знак"],
          ["9", "темпы роста, разложение, ACF", "аддитивно или мультипликативно; побить наивный"],
        ],
      },
    },
    {
      heading: { en: "k-means: what it does and what it assumes", ru: "k-means: что делает и что предполагает" },
      body: {
        en: [
          "The algorithm is simple. Pick k centres, assign every point to its nearest centre, move each centre to the mean of the points assigned to it, repeat until nothing moves. It converges quickly and always converges — but to a local optimum that depends on the starting centres, which is why implementations run it several times and keep the best.",
          "Three assumptions are buried in that description. Distance is Euclidean, so features must be on comparable scales — clustering income in tenge alongside age in years means income dominates entirely and age is ignored. Clusters are assumed roughly spherical and similar in size, so k-means fails on elongated or nested shapes. And k must be chosen in advance, by you.",
          "Scaling is therefore not optional but part of the method. Standardise every feature to zero mean and unit variance before clustering, unless the original units are genuinely comparable.",
        ],
        ru: [
          "Алгоритм прост. Выбрать k центров, отнести каждую точку к ближайшему центру, сдвинуть каждый центр в среднее назначенных ему точек, повторять, пока ничего не двигается. Он сходится быстро и сходится всегда — но к локальному оптимуму, зависящему от начальных центров, поэтому реализации запускают его несколько раз и оставляют лучший результат.",
          "В этом описании спрятаны три предпосылки. Расстояние евклидово, поэтому признаки должны быть в сопоставимых масштабах: кластеризовать доход в тенге вместе с возрастом в годах значит полностью отдать доминирование доходу, а возраст проигнорировать. Кластеры предполагаются примерно шарообразными и сопоставимыми по размеру, поэтому на вытянутых или вложенных формах k-means не работает. И k выбираешь заранее ты сам.",
          "Поэтому масштабирование не опция, а часть метода. Стандартизуй каждый признак к нулевому среднему и единичной дисперсии до кластеризации, если только исходные единицы не сопоставимы по-настоящему.",
        ],
      },
      formula: {
        tex: "\\underset{C}{\\arg\\min}\\sum_{j=1}^{k}\\sum_{x\\in C_j}\\lVert x-\\mu_j\\rVert^2",
        note: {
          en: "The objective is the within-cluster sum of squares — the same quantity ANOVA called SS_within in week 5. k-means is minimising exactly that.",
          ru: "Целевая функция — внутрикластерная сумма квадратов, та же величина, которую ANOVA на пятой неделе называл SS_внутр. k-means минимизирует именно её.",
        },
      },
      code: {
        lang: "python",
        caption: { en: "Choosing k: elbow and silhouette", ru: "Выбор k: локоть и силуэт" },
        code: `from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X = StandardScaler().fit_transform(df[["income", "age", "sessions"]])   # обязательно

inertia, sil = [], []
for k in range(2, 11):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    inertia.append(km.inertia_)                       # SS_внутр
    sil.append(silhouette_score(X, km.labels_))

# локоть: где падение inertia замедляется
# силуэт: чем выше, тем лучше разделены кластеры; > 0.5 — хорошо
for k, i, s in zip(range(2, 11), inertia, sil):
    print(f"k={k}  inertia={i:8.1f}  silhouette={s:.3f}")`,
        out: {
          en: "Inertia always falls as k grows — at k = n it is zero. That is why it needs the elbow heuristic, and why silhouette, which can peak, is the better guide.",
          ru: "Inertia всегда падает с ростом k — при k = n она равна нулю. Поэтому ей нужна эвристика локтя, а силуэт, у которого есть максимум, — лучший ориентир.",
        },
      },
      pitfall: {
        en: "k-means always returns clusters, including on uniform random noise. A partition is not evidence that structure exists — check the silhouette and look at whether the clusters differ on variables you did not cluster on.",
        ru: "k-means всегда возвращает кластеры, в том числе на равномерном случайном шуме. Разбиение не является доказательством наличия структуры: смотри силуэт и проверяй, различаются ли кластеры по переменным, по которым ты не кластеризовал.",
      },
    },
    {
      heading: { en: "Hierarchical clustering", ru: "Иерархическая кластеризация" },
      body: {
        en: [
          "The agglomerative version starts with every point as its own cluster and repeatedly merges the two closest, producing a tree. You do not choose k in advance; you cut the tree afterwards at whatever height gives a sensible partition, which is its main advantage over k-means.",
          "The linkage rule defines the distance between clusters and changes the result substantially. Single linkage uses the nearest pair and can chain points into long straggling clusters. Complete linkage uses the farthest pair and produces compact ones. Ward's method merges whichever pair increases the within-cluster sum of squares least, which makes it the closest analogue of k-means and the usual default.",
          "The output is a dendrogram, and the height at which two branches join is the distance at which they merged. A long vertical gap before a merge means those groups were well separated — that is where cutting the tree is defensible.",
        ],
        ru: [
          "Агломеративный вариант начинает с того, что каждая точка — свой кластер, и многократно сливает две ближайшие, порождая дерево. k заранее выбирать не нужно: дерево разрезают после, на той высоте, которая даёт осмысленное разбиение, — в этом главное преимущество перед k-means.",
          "Правило связи определяет расстояние между кластерами и существенно меняет результат. Одиночная связь берёт ближайшую пару и способна нанизывать точки в длинные растянутые кластеры. Полная связь берёт дальнюю пару и даёт компактные. Метод Уорда сливает ту пару, которая меньше всего увеличивает внутрикластерную сумму квадратов, что делает его ближайшим аналогом k-means и обычным выбором по умолчанию.",
          "Результат — дендрограмма, и высота слияния двух ветвей есть расстояние, на котором они объединились. Длинный вертикальный промежуток перед слиянием означает, что эти группы были хорошо разделены, — там разрез дерева и обоснован.",
        ],
      },
    },
    {
      heading: { en: "PCA: eigenvectors of the covariance matrix", ru: "PCA: собственные векторы ковариационной матрицы" },
      body: {
        en: [
          "Principal component analysis finds a new set of axes for your data. The first principal component is the direction along which the data vary most; the second is the direction of greatest remaining variance orthogonal to the first, and so on. Projecting onto the first few axes keeps most of the variation in far fewer dimensions.",
          "The mechanism is exactly the linear algebra from the warm-up week. Standardise the data, form the covariance matrix, and compute its eigenvectors and eigenvalues. The eigenvectors are the principal component directions; each eigenvalue is the variance captured along its eigenvector. Sorting by eigenvalue orders the components by importance — that is the whole algorithm.",
          "Choosing how many to keep is usually done by cumulative explained variance: retain enough components to reach 80 or 90 per cent, or look for the elbow in the scree plot. For visualisation the answer is two, regardless of what the variance says.",
          "The components are linear combinations of the original variables, and reading the loadings tells you what each one means. A first component loading positively on income, education and job level is plausibly a socio-economic status axis. That interpretation is yours to make and defend — PCA supplies the arithmetic, not the meaning.",
        ],
        ru: [
          "Метод главных компонент находит для данных новый набор осей. Первая главная компонента — направление наибольшей изменчивости данных; вторая — направление наибольшей оставшейся дисперсии, ортогональное первому, и так далее. Проекция на первые несколько осей сохраняет бо́льшую часть вариации в куда меньшем числе измерений.",
          "Механизм — ровно та линейная алгебра из недели разминки. Стандартизуй данные, построй ковариационную матрицу, вычисли её собственные векторы и собственные значения. Собственные векторы задают направления главных компонент; каждое собственное значение — дисперсия, захваченная вдоль своего вектора. Сортировка по собственным значениям упорядочивает компоненты по важности — вот и весь алгоритм.",
          "Сколько компонент оставить, обычно решают по накопленной объяснённой дисперсии: сохранить столько, чтобы дойти до 80 или 90 процентов, либо искать локоть на графике каменистой осыпи. Для визуализации ответ — две, независимо от того, что говорит дисперсия.",
          "Компоненты являются линейными комбинациями исходных переменных, и чтение нагрузок говорит, что каждая означает. Первая компонента с положительными нагрузками на доход, образование и уровень должности — правдоподобно ось социально-экономического статуса. Эту интерпретацию делаешь и защищаешь ты: PCA поставляет арифметику, а не смысл.",
        ],
      },
      formula: {
        tex: "\\Sigma\\,\\mathbf{v}_i=\\lambda_i\\,\\mathbf{v}_i,\\qquad \\text{доля дисперсии}_i=\\frac{\\lambda_i}{\\sum_j \\lambda_j}",
        note: {
          en: "Σ is the covariance matrix of the standardised data, vᵢ the i-th eigenvector (the component direction) and λᵢ its eigenvalue (the variance along it).",
          ru: "Σ — ковариационная матрица стандартизованных данных, vᵢ — i-й собственный вектор (направление компоненты), λᵢ — его собственное значение (дисперсия вдоль него).",
        },
      },
      code: {
        lang: "python",
        caption: { en: "PCA with the loadings read out", ru: "PCA с чтением нагрузок" },
        code: `from sklearn.decomposition import PCA
import numpy as np, pandas as pd

cols = ["income", "education", "job_level", "age", "sessions"]
X = StandardScaler().fit_transform(df[cols])      # стандартизация обязательна

pca = PCA().fit(X)
var = pca.explained_variance_ratio_
print("по компонентам:", var.round(3))
print("накопленно:   ", var.cumsum().round(3))
print("компонент до 90%:", int(np.searchsorted(var.cumsum(), 0.90) + 1))

# что означает каждая компонента — читаем нагрузки
loadings = pd.DataFrame(pca.components_[:2].T, index=cols, columns=["PC1", "PC2"])
print(loadings.round(2))`,
        out: {
          en: "If PC1 loads +0.5 on income, +0.5 on education and +0.4 on job level, you can defend calling it a status axis. If the loadings are scattered with no pattern, do not name it.",
          ru: "Если PC1 нагружена +0,5 на доход, +0,5 на образование и +0,4 на должность, называть её осью статуса можно и защитимо. Если нагрузки разбросаны без узора — не называй никак.",
        },
      },
    },
  ],
  worked: {
    title: { en: "Worked example: why scaling decides the answer", ru: "Разбор: почему масштабирование решает исход" },
    intro: {
      en: "Cluster customers on two features: annual income in tenge, roughly 500 000 to 5 000 000, and number of visits, roughly 1 to 50. Run k-means with and without scaling and compare.",
      ru: "Кластеризуем клиентов по двум признакам: годовой доход в тенге, примерно от 500 000 до 5 000 000, и число визитов, примерно от 1 до 50. Запустим k-means со стандартизацией и без и сравним.",
    },
    steps: [
      {
        text: { en: "Look at the spread of each feature. The variances differ by roughly ten orders of magnitude.", ru: "Посмотрим на разброс каждого признака. Дисперсии различаются примерно на десять порядков." },
        code: { lang: "python", code: `print(df[["income", "visits"]].std())
# income  ~1_100_000
# visits  ~12` },
      },
      {
        text: { en: "Cluster on the raw values. Euclidean distance is dominated entirely by income.", ru: "Кластеризуем по сырым значениям. Евклидово расстояние целиком определяется доходом." },
        code: { lang: "python", code: `raw = KMeans(n_clusters=3, n_init=10, random_state=0).fit(df[["income", "visits"]])
print(df.groupby(raw.labels_)[["income", "visits"]].mean().round(0))
# кластеры различаются по доходу, по визитам почти нет` },
      },
      {
        text: { en: "See why: a 1 000 000 difference in income against a 40 difference in visits, both squared.", ru: "Понятно почему: разница в 1 000 000 по доходу против разницы в 40 по визитам, обе в квадрате." },
        formula: { tex: "(1\\,000\\,000)^2=10^{12}\\qquad\\text{против}\\qquad 40^2=1600" },
      },
      {
        text: { en: "Standardise and cluster again. Now both features contribute comparably.", ru: "Стандартизуем и кластеризуем заново. Теперь оба признака вносят сопоставимый вклад." },
        code: { lang: "python", code: `Xs = StandardScaler().fit_transform(df[["income", "visits"]])
sc = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Xs)
print(df.groupby(sc.labels_)[["income", "visits"]].mean().round(0))
# теперь видны сегменты: высокий доход/мало визитов, низкий доход/много визитов и т.д.` },
      },
      {
        text: { en: "Compare the partitions. They disagree substantially, and only the second answers the question that was asked.", ru: "Сравним разбиения. Они существенно расходятся, и только второе отвечает на поставленный вопрос." },
        code: { lang: "python", code: `from sklearn.metrics import adjusted_rand_score
print(adjusted_rand_score(raw.labels_, sc.labels_).round(3))   # заметно ниже 1
print("силуэт без масштаба:", silhouette_score(df[["income","visits"]], raw.labels_).round(3))
print("силуэт со масштабом:", silhouette_score(Xs, sc.labels_).round(3))` },
      },
    ],
    conclusion: {
      en: "Without scaling, k-means silently performed a one-dimensional split on income and the visits column contributed nothing. Both runs produce three clusters and neither raises an error; only inspecting the cluster means reveals which one answered the question. Standardisation is part of the method, not a preprocessing nicety.",
      ru: "Без стандартизации k-means незаметно выполнил одномерное разбиение по доходу, а столбец визитов не дал ничего. Оба запуска дают три кластера, и ни один не бросает ошибку; какой из них ответил на вопрос, показывает только осмотр средних по кластерам. Стандартизация — часть метода, а не приятная мелочь предобработки.",
    },
  },
  exercises: [
    {
      q: { en: "Why must you standardise before k-means and PCA?", ru: "Почему перед k-means и PCA нужно стандартизовать?" },
      a: { en: "Both methods are built on squared Euclidean distance and variance, so a feature with a larger numeric range dominates purely because of its units. Income in tenge alongside age in years means the clustering is effectively on income alone, and PCA's first component is simply the direction of the largest-variance raw column. Standardising to zero mean and unit variance puts every feature on equal footing; skip it only when the units are already genuinely comparable, such as several measurements in millimetres.", ru: "Оба метода построены на квадрате евклидова расстояния и на дисперсии, поэтому признак с бо́льшим числовым диапазоном доминирует просто из-за единиц измерения. Доход в тенге рядом с возрастом в годах означает, что кластеризация фактически идёт по одному доходу, а первая компонента PCA оказывается направлением столбца с наибольшей сырой дисперсией. Стандартизация к нулевому среднему и единичной дисперсии уравнивает признаки; пропускать её можно, только когда единицы уже действительно сопоставимы — например, несколько измерений в миллиметрах." },
    },
    {
      q: { en: "Inertia keeps falling as k grows. Why can you not just pick the k that minimises it?", ru: "Inertia продолжает падать с ростом k. Почему нельзя просто выбрать k, минимизирующее её?" },
      a: { en: "Because it is minimised at k = n, where every point is its own cluster and the within-cluster sum of squares is exactly zero. That partition is useless. The elbow heuristic looks for where the marginal gain flattens, and the silhouette score is more principled because it balances cohesion against separation and therefore has an interior maximum you can actually select.", ru: "Потому что она минимальна при k = n, когда каждая точка сама себе кластер и внутрикластерная сумма квадратов ровно ноль. Такое разбиение бесполезно. Эвристика локтя ищет, где предельный выигрыш выполаживается, а коэффициент силуэта принципиальнее, потому что балансирует связность против разделённости и потому имеет внутренний максимум, который можно реально выбрать." },
    },
    {
      q: { en: "Two runs of k-means on the same data give different clusters. Is something broken?", ru: "Два запуска k-means на тех же данных дают разные кластеры. Что-то сломалось?" },
      a: { en: "No — the algorithm converges to a local optimum that depends on the random initial centres. Set random_state for reproducibility and raise n_init so several starts are tried and the best kept; scikit-learn's k-means++ initialisation already reduces the problem. If results still vary a lot across restarts, that is itself a finding: the data probably have no strong cluster structure at that k.", ru: "Нет — алгоритм сходится к локальному оптимуму, зависящему от случайных начальных центров. Задай random_state для воспроизводимости и подними n_init, чтобы пробовалось несколько стартов и оставался лучший; инициализация k-means++ в scikit-learn уже смягчает проблему. Если результаты всё равно сильно пляшут между перезапусками, это само по себе находка: скорее всего, у данных нет выраженной кластерной структуры при таком k." },
    },
    {
      q: { en: "PC1 explains 85 % of the variance. Is that good?", ru: "PC1 объясняет 85 % дисперсии. Это хорошо?" },
      a: { en: "It means one direction carries most of the variation, so the data are close to one-dimensional and dimension reduction will work very well. Whether it is good depends on your purpose: excellent for compression and visualisation, but it also suggests your variables are largely redundant — they are all measuring roughly the same underlying thing. Read the loadings to find out what that thing is; that interpretation is usually the more interesting result.", ru: "Это значит, что одно направление несёт бо́льшую часть вариации, то есть данные близки к одномерным и снижение размерности сработает отлично. Хорошо ли это, зависит от цели: прекрасно для сжатия и визуализации, но заодно подсказывает, что твои переменные во многом избыточны — все они измеряют примерно одно и то же скрытое. Прочитай нагрузки, чтобы понять, что именно; эта интерпретация обычно и есть более интересный результат." },
    },
    {
      q: { en: "You cluster random uniform noise into 4 groups and get 4 clusters. What does that prove?", ru: "Ты кластеризуешь равномерный случайный шум на 4 группы и получаешь 4 кластера. Что это доказывает?" },
      a: { en: "Nothing. k-means partitions whatever it is given, structure or not — it is guaranteed to return k groups. The checks are the silhouette score, which will sit near zero on noise instead of above 0.5, and external validation: do the clusters differ on a variable you did not cluster on? If a partition has no interpretation and no external difference, it is an artefact of the algorithm rather than a finding.", ru: "Ничего. k-means разбивает всё, что ему дали, есть структура или нет, — он гарантированно вернёт k групп. Проверки — коэффициент силуэта, который на шуме будет около нуля, а не выше 0,5, и внешняя валидация: различаются ли кластеры по переменной, по которой ты не кластеризовал? Если у разбиения нет интерпретации и нет внешних различий, это артефакт алгоритма, а не находка." },
    },
    {
      q: { en: "Which method would you use for elongated, non-spherical clusters?", ru: "Какой метод возьмёшь для вытянутых, нешарообразных кластеров?" },
      a: { en: "Not k-means, which assumes roughly spherical clusters of similar size because it assigns by distance to a centre. Hierarchical clustering with single linkage can follow elongated shapes, and DBSCAN handles arbitrary shapes while also labelling outliers as noise rather than forcing them into a cluster. The general lesson is that the algorithm encodes an assumption about cluster shape, and choosing one means committing to that assumption.", ru: "Не k-means: он предполагает примерно шарообразные кластеры сопоставимого размера, потому что относит точки по расстоянию до центра. Иерархическая кластеризация с одиночной связью умеет следовать вытянутым формам, а DBSCAN работает с произвольными формами и вдобавок помечает выбросы как шум, а не запихивает их в кластер силой. Общий урок в том, что алгоритм кодирует предположение о форме кластеров, и выбор алгоритма есть принятие этого предположения." },
    },
  ],
  checklist: {
    en: [
      "I have revised weeks 6–9 against the table above",
      "I standardise before every distance-based or variance-based method",
      "I can explain PCA as eigenvectors of the covariance matrix, not as a black box",
      "I check the silhouette and never treat a partition as proof that clusters exist",
      "I have started the cheat sheet for the final written exam covering all ten weeks",
    ],
    ru: [
      "Повторил недели 6–9 по таблице выше",
      "Стандартизую перед любым методом, основанным на расстоянии или дисперсии",
      "Могу объяснить PCA как собственные векторы ковариационной матрицы, а не как чёрный ящик",
      "Проверяю силуэт и никогда не считаю разбиение доказательством существования кластеров",
      "Начал шпаргалку к письменному финальному экзамену по всем десяти неделям",
    ],
  },
};
