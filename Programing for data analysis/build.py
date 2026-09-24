# -*- coding: utf-8 -*-
"""
Генератор сайта курса «Programming for Data Analysis».

Запуск:  python build.py
Результат: папка site/ — открывать site/index.html

Что делает:
  * находит папки week1, week2, Week3, ... и все .ipynb внутри;
  * рендерит каждую лекцию в отдельную HTML-страницу (текст, код, вывод, картинки);
  * собирает страницу недели: список лекций + справочник команд этой недели;
  * собирает общий справочник команд по всему курсу (site/commands.html).

Добавилась новая неделя — просто запусти скрипт заново, ничего дописывать не нужно.
"""

import ast
import html
import io
import json
import os
import re
import shutil
import sys
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import quote

import nbformat
from nbconvert import HTMLExporter
from pygments import highlight as _highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import PythonLexer

try:
    from commands_data import CMD          # карточки: что это, зачем, пример
except Exception as _e:                     # noqa
    print("commands_data.py не загрузился:", _e)
    CMD = {}

_PY_LEXER = PythonLexer()
_EX_FMT = HtmlFormatter()

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "site"
LECT_DIR = OUT / "lectures"

COURSE = "Programming for Data Analysis"
SUBTITLE = "Конспект курса: лекции по неделям и справочник команд"

# --------------------------------------------------------------------------- #
#  Описания команд. Если команды здесь нет — она всё равно попадёт в справочник,
#  но без описания (лучше пусто, чем выдуманное). Дописывать сюда можно свободно.
# --------------------------------------------------------------------------- #

DESCR = {
    # ---- встроенные функции ----
    "print()": "Выводит значения в консоль.",
    "len()": "Длина объекта: число элементов списка, символов строки, ключей словаря.",
    "type()": "Возвращает тип объекта.",
    "int()": "Преобразует значение в целое число.",
    "float()": "Преобразует значение в число с плавающей точкой.",
    "str()": "Преобразует значение в строку.",
    "list()": "Создаёт список из любого итерируемого объекта.",
    "dict()": "Создаёт словарь.",
    "set()": "Создаёт множество — набор уникальных элементов.",
    "tuple()": "Создаёт кортеж — неизменяемую последовательность.",
    "open()": "Открывает файл и возвращает файловый объект. Режимы: 'r', 'w', 'a', 'rb', 'wb'.",
    "input()": "Читает строку, введённую пользователем.",
    "range()": "Последовательность целых чисел: range(start, stop, step).",
    "enumerate()": "Итерация с индексом: for i, x in enumerate(seq).",
    "zip()": "Параллельная итерация по нескольким последовательностям.",
    "map()": "Применяет функцию к каждому элементу последовательности.",
    "filter()": "Оставляет только элементы, для которых функция вернула True.",
    "sorted()": "Возвращает новый отсортированный список.",
    "sum()": "Сумма элементов последовательности.",
    "min()": "Минимальный элемент.",
    "max()": "Максимальный элемент.",
    "round()": "Округляет число до заданного числа знаков.",
    "abs()": "Модуль числа.",
    "id()": "Адрес объекта в памяти — показывает, один это объект или разные.",
    "next()": "Берёт следующий элемент итератора (например, пропустить заголовок CSV).",
    "chr()": "Символ по его коду Unicode.",
    "ord()": "Код Unicode для символа.",
    "isinstance()": "Проверяет, принадлежит ли объект указанному типу.",
    # ---- os ----
    "os.getcwd()": "Текущая рабочая директория.",
    "os.chdir()": "Меняет текущую рабочую директорию.",
    "os.listdir()": "Список имён файлов и папок в директории.",
    "os.mkdir()": "Создаёт одну папку. Упадёт, если родительской папки нет.",
    "os.makedirs()": "Создаёт папку вместе со всеми промежуточными. С exist_ok=True не ругается, если папка уже есть.",
    "os.rmdir()": "Удаляет пустую папку.",
    "os.remove()": "Удаляет файл.",
    "os.rename()": "Переименовывает файл или папку.",
    "os.walk()": "Рекурсивный обход дерева каталогов: возвращает (путь, папки, файлы).",
    "os.stat()": "Метаданные файла: размер, время изменения, права.",
    "os.path.join()": "Собирает путь из частей правильным для ОС разделителем.",
    "os.path.exists()": "Существует ли файл или папка.",
    "os.path.isfile()": "Это файл?",
    "os.path.isdir()": "Это папка?",
    "os.path.getsize()": "Размер файла в байтах.",
    "os.path.basename()": "Имя файла без пути.",
    "os.path.dirname()": "Путь без имени файла.",
    "os.path.splitext()": "Делит имя на основу и расширение.",
    "os.path.relpath()": "Путь относительно указанной папки — нужен при упаковке в архив.",
    "os.path.abspath()": "Абсолютный путь.",
    # ---- pathlib ----
    "Path()": "Объект пути (pathlib). Пути склеиваются оператором /: Path('data') / 'file.csv'.",
    ".mkdir()": "Создаёт папку. parents=True — вместе с родителями, exist_ok=True — молча, если уже есть.",
    ".resolve()": "Полный абсолютный путь.",
    ".iterdir()": "Перебор содержимого папки.",
    ".glob()": "Поиск файлов по маске, например '*.csv'.",
    ".unlink()": "Удаляет файл.",
    # ---- файлы ----
    ".read()": "Читает файл целиком в строку.",
    ".readline()": "Читает одну строку.",
    ".readlines()": "Читает все строки в список.",
    ".write()": "Записывает строку в файл (у ZipFile — добавляет файл в архив).",
    ".writelines()": "Записывает список строк.",
    ".close()": "Закрывает файл. При работе через with вызывается автоматически.",
    ".seek()": "Перемещает позицию чтения/записи в файле.",
    # ---- строки ----
    ".strip()": "Убирает пробелы и переводы строк по краям.",
    ".split()": "Разбивает строку на список по разделителю.",
    ".join()": "Склеивает список строк через разделитель: ', '.join(items).",
    ".replace()": "Заменяет подстроку.",
    ".lower()": "Нижний регистр.",
    ".upper()": "Верхний регистр.",
    ".title()": "Каждое слово с заглавной буквы.",
    ".splitlines()": "Разбивает текст на строки.",
    ".ljust()": "Дополняет строку пробелами справа до нужной ширины — ровные колонки в выводе.",
    ".rjust()": "Дополняет строку пробелами слева.",
    ".startswith()": "Начинается ли строка с подстроки.",
    ".endswith()": "Заканчивается ли строка подстрокой.",
    # ---- коллекции ----
    ".append()": "Добавляет элемент в конец списка.",
    ".extend()": "Добавляет в список все элементы другой последовательности.",
    ".insert()": "Вставляет элемент по индексу.",
    ".pop()": "Удаляет и возвращает элемент (у словаря — по ключу).",
    ".remove()": "Удаляет элемент по значению. Если его нет — ошибка.",
    ".discard()": "Удаляет элемент из множества. Если его нет — молча ничего не делает.",
    ".add()": "Добавляет элемент в множество.",
    ".update()": "Добавляет сразу несколько элементов (множество) или пар ключ-значение (словарь).",
    ".get()": "Значение по ключу словаря с запасным вариантом, если ключа нет.",
    ".items()": "Пары (ключ, значение) словаря.",
    ".keys()": "Ключи словаря.",
    ".values()": "Значения словаря.",
    ".union()": "Объединение множеств.",
    ".intersection()": "Пересечение множеств — общие элементы.",
    ".difference()": "Разность множеств — что есть в первом и нет во втором.",
    ".symmetric_difference()": "Элементы, которые есть только в одном из двух множеств.",
    ".most_common()": "Самые частые элементы Counter.",
    "Counter()": "Счётчик элементов: сразу считает, сколько раз встретилось каждое значение.",
    # ---- csv ----
    "csv.reader()": "Читает CSV построчно, каждая строка — список значений.",
    "csv.writer()": "Пишет строки-списки в CSV.",
    "csv.DictReader()": "Читает CSV, каждая строка — словарь по заголовкам колонок.",
    "csv.DictWriter()": "Пишет словари в CSV; колонки задаются через fieldnames.",
    ".writerow()": "Записывает одну строку.",
    ".writerows()": "Записывает сразу несколько строк.",
    ".writeheader()": "Пишет строку заголовков (DictWriter).",
    # ---- json ----
    "json.dump()": "Пишет объект Python в файл в формате JSON.",
    "json.dumps()": "Превращает объект Python в JSON-строку.",
    "json.load()": "Читает JSON из файла в объект Python.",
    "json.loads()": "Разбирает JSON-строку в объект Python.",
    # ---- openpyxl / excel ----
    "openpyxl.Workbook()": "Создаёт новую книгу Excel.",
    "openpyxl.load_workbook()": "Открывает существующий .xlsx.",
    ".create_sheet()": "Добавляет новый лист в книгу.",
    ".iter_rows()": "Перебирает строки листа.",
    ".cell()": "Обращение к ячейке по номеру строки и колонки.",
    ".save()": "Сохраняет книгу Excel в файл.",
    "Font()": "Стиль шрифта ячейки: жирный, размер, цвет.",
    "Alignment()": "Выравнивание содержимого ячейки.",
    "get_column_letter()": "Номер колонки → буква ('A', 'B', ...).",
    # ---- pandas ----
    "pd.DataFrame()": "Создаёт таблицу из словаря, списка или массива.",
    "pd.read_csv()": "Читает CSV в DataFrame.",
    "pd.read_excel()": "Читает лист Excel в DataFrame.",
    "pd.ExcelWriter()": "Позволяет записать несколько листов в один файл Excel.",
    ".to_excel()": "Сохраняет DataFrame в .xlsx.",
    ".to_csv()": "Сохраняет DataFrame в .csv.",
    ".head()": "Первые строки таблицы (по умолчанию 5).",
    ".tail()": "Последние строки таблицы.",
    ".info()": "Сводка: колонки, типы, пропуски, память.",
    ".describe()": "Статистика по числовым колонкам: среднее, min, max, квартили.",
    ".apply()": "Применяет функцию к строкам или колонкам таблицы.",
    # ---- numpy ----
    "np.array()": "Создаёт массив NumPy из списка.",
    "np.zeros()": "Массив из нулей заданной формы.",
    "np.ones()": "Массив из единиц.",
    "np.zeros_like()": "Массив нулей той же формы, что и образец.",
    "np.eye()": "Единичная матрица.",
    "np.arange()": "Массив чисел с шагом, аналог range.",
    "np.linspace()": "Заданное количество равномерных точек между двумя числами.",
    "np.mean()": "Среднее значение.",
    "np.nanmean()": "Среднее, игнорируя NaN (пропуски).",
    "np.sqrt()": "Квадратный корень поэлементно.",
    "np.round()": "Округление поэлементно.",
    "np.divide()": "Поэлементное деление, умеет безопасно обрабатывать деление на ноль.",
    "np.where()": "Выбор по условию: np.where(условие, если_да, если_нет).",
    "np.clip()": "Обрезает значения в диапазон [min, max].",
    "np.max()": "Максимум массива.",
    "np.argmax()": "Индекс максимального элемента.",
    "np.argsort()": "Индексы, которые отсортировали бы массив.",
    "np.nonzero()": "Индексы ненулевых элементов.",
    "np.stack()": "Складывает массивы в новый массив большей размерности.",
    "np.expand_dims()": "Добавляет новую ось в массив.",
    "np.array_equal()": "Поэлементно сравнивает два массива целиком.",
    "np.save()": "Сохраняет массив в файл .npy.",
    "np.load()": "Загружает массив из .npy.",
    "np.random.seed()": "Фиксирует генератор случайных чисел — результат воспроизводится.",
    "np.random.rand()": "Случайные числа от 0 до 1.",
    "np.random.default_rng()": "Современный генератор случайных чисел NumPy.",
    ".reshape()": "Меняет форму массива без изменения данных.",
    ".flatten()": "Разворачивает массив в одномерный.",
    ".astype()": "Приводит массив к другому типу (например, float → uint8).",
    ".std()": "Стандартное отклонение.",
    ".argmax()": "Индекс максимума.",
    # ---- архивы ----
    "zipfile.ZipFile()": "Открывает или создаёт ZIP-архив. Режимы 'r', 'w', 'a'.",
    "tarfile.open()": "Открывает или создаёт архив .tar / .tar.gz.",
    ".namelist()": "Список имён файлов внутри ZIP-архива.",
    ".infolist()": "Подробная информация о файлах в ZIP: размер, сжатие, дата.",
    ".extract()": "Извлекает один файл из архива.",
    ".extractall()": "Извлекает всё содержимое архива в папку.",
    ".getnames()": "Список имён внутри tar-архива.",
    ".getmembers()": "Объекты-описания файлов внутри tar-архива.",
    ".getmember()": "Описание одного файла внутри tar-архива.",
    ".isfile()": "Это файл (для элемента архива)?",
    ".isdir()": "Это папка (для элемента архива)?",
    # ---- прочее ----
    "math.sqrt()": "Квадратный корень.",
    "random.randint()": "Случайное целое в заданном диапазоне.",
    "it.permutations()": "Все перестановки элементов.",
    "it.combinations()": "Все сочетания заданной длины.",
    "it.combinations_with_replacement()": "Сочетания с повторениями.",
    "it.product()": "Декартово произведение последовательностей.",
    "it.chain()": "Склеивает несколько последовательностей в одну.",
    "Fraction()": "Точная дробь вместо приблизительного float.",
    "Decimal()": "Десятичное число с контролируемой точностью — для денег.",
    "plt.imshow()": "Показывает изображение или двумерный массив.",
    "plt.imread()": "Читает изображение в массив NumPy.",
    "plt.show()": "Отрисовывает график.",
    "plt.figure()": "Создаёт новое полотно для графика.",
    "plt.subplot()": "Один график в сетке из нескольких.",
    "plt.subplots()": "Создаёт сетку графиков сразу.",
    "plt.title()": "Заголовок графика.",
    "plt.axis()": "Настройка осей, например plt.axis('off') — спрятать оси.",
    "Image.open()": "Открывает изображение (Pillow).",
    ".resize()": "Меняет размер изображения.",
}

# алиасы модулей, вызовы которых считаем «командами модуля»
MODULES = {
    "os": "os", "sys": "sys", "json": "json", "csv": "csv", "re": "re",
    "math": "math", "random": "random", "shutil": "shutil", "glob": "glob",
    "zipfile": "zipfile", "tarfile": "tarfile", "pathlib": "pathlib",
    "np": "numpy", "numpy": "numpy", "pd": "pandas", "pandas": "pandas",
    "plt": "matplotlib", "matplotlib": "matplotlib", "openpyxl": "openpyxl",
    "it": "itertools", "itertools": "itertools", "collections": "collections",
    "datetime": "datetime", "time": "time", "statistics": "statistics",
    "Image": "Pillow", "PIL": "Pillow",
}

# классы-конструкторы → в какую группу справочника их класть
CONSTRUCTORS = {"Path": "pathlib", "Counter": "collections", "Fraction": "math",
                "Decimal": "math", "Font": "openpyxl", "Alignment": "openpyxl",
                "get_column_letter": "openpyxl", "Image": "Pillow"}

BUILTINS = {
    "print", "len", "type", "int", "float", "str", "list", "dict", "set", "tuple",
    "open", "input", "range", "enumerate", "zip", "map", "filter", "sorted", "sum",
    "min", "max", "round", "abs", "id", "next", "chr", "ord", "isinstance", "bool",
    "reversed", "any", "all", "format",
}

GROUPS = [
    ("builtin", "Встроенные функции Python"),
    ("os", "os — папки и пути"),
    ("pathlib", "pathlib — пути по-новому"),
    ("csv", "csv — таблицы"),
    ("json", "json — обмен данными"),
    ("openpyxl", "openpyxl — Excel"),
    ("pandas", "pandas — таблицы и анализ"),
    ("numpy", "numpy — массивы"),
    ("matplotlib", "matplotlib — графики и изображения"),
    ("zipfile", "zipfile — ZIP-архивы"),
    ("tarfile", "tarfile — TAR-архивы"),
    ("itertools", "itertools — комбинаторика"),
    ("collections", "collections — счётчики и структуры"),
    ("math", "math — математика"),
    ("random", "random — случайные числа"),
    ("Pillow", "Pillow — изображения"),
    ("method", "Методы объектов"),
    ("other", "Прочее"),
]
GROUP_TITLES = dict(GROUPS)
GROUP_ORDER = [g for g, _ in GROUPS]

TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh",
    "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
    "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "c",
    "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu",
    "я": "ya",
}


def slugify(text):
    text = text.lower()
    out = []
    for ch in text:
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isalnum():
            out.append(ch)
        else:
            out.append("-")
    s = re.sub(r"-+", "-", "".join(out)).strip("-")
    return s or "page"


def plural(n, forms):
    """plural(3, ('лекция','лекции','лекций')) -> 'лекции'"""
    n = abs(n) % 100
    if 11 <= n <= 14:
        return forms[2]
    n %= 10
    if n == 1:
        return forms[0]
    if 2 <= n <= 4:
        return forms[1]
    return forms[2]


def esc(x):
    return html.escape(str(x), quote=True)


def code_html(src):
    """Подсвеченный Python-код."""
    return _highlight(src, _PY_LEXER, _EX_FMT)


def human_size(n):
    for unit in ("Б", "КБ", "МБ", "ГБ"):
        if n < 1024 or unit == "ГБ":
            return ("%.0f %s" if unit == "Б" else "%.1f %s") % (n, unit)
        n /= 1024.0


# --------------------------------------------------------------------------- #
#  Разбор ноутбуков
# --------------------------------------------------------------------------- #

def clean_code(src):
    """Убирает строки с магиями (%…, !…) — их не понимает ast."""
    lines = [l for l in src.split("\n") if not l.lstrip().startswith(("%", "!", "?"))]
    return "\n".join(lines)


def dotted(node):
    """ast.Attribute → 'os.path.join' или None."""
    parts = [node.attr]
    cur = node.value
    while isinstance(cur, ast.Attribute):
        parts.append(cur.attr)
        cur = cur.value
    if isinstance(cur, ast.Name):
        parts.append(cur.id)
        return ".".join(reversed(parts))
    return None


def classify(name):
    """Возвращает (ключ_команды, группа)."""
    if name.startswith("."):
        return name, "method"
    base = name[:-2] if name.endswith("()") else name
    root = base.split(".")[0]
    if root in MODULES:
        return name, MODULES[root]
    if root in CONSTRUCTORS:
        return name, CONSTRUCTORS[root]
    if root in BUILTINS:
        return name, "builtin"
    return None, None


def extract_commands(nb):
    """Собирает {команда: количество} из кодовых ячеек ноутбука."""
    found = Counter()
    for cell in nb.cells:
        if cell.cell_type != "code":
            continue
        try:
            tree = ast.parse(clean_code(cell.source))
        except SyntaxError:
            continue
        for node in ast.walk(tree):
            if not isinstance(node, ast.Call):
                continue
            fn = node.func
            if isinstance(fn, ast.Name):
                key, grp = classify(fn.id + "()")
                if key:
                    found[key] += 1
            elif isinstance(fn, ast.Attribute):
                full = dotted(fn)
                if full:
                    key, grp = classify(full + "()")
                    if key:
                        found[key] += 1
                    else:
                        # переменная, а не модуль → нормализуем в метод
                        found["." + fn.attr + "()"] += 1
                else:
                    found["." + fn.attr + "()"] += 1
    return found


def extract_usage(nb, cmds):
    """Первая реальная строка кода из лекции для каждой команды —
    чтобы показать, как это было на занятии, а не только в учебном примере."""
    needles = {c: (c[:-1] if c.endswith("()") else c) for c in cmds}
    seen = {}
    for cell in nb.cells:
        if cell.cell_type != "code":
            continue
        for raw in cell.source.split("\n"):
            line = raw.strip()
            if not line or line.startswith("#") or len(line) > 150:
                continue
            for cmd, needle in needles.items():
                if cmd not in seen and needle in line:
                    seen[cmd] = line
    return seen


HEADING_RE = re.compile(r"<h([1-4])([^>]*)>(.*?)</h\1>", re.S | re.I)
ID_RE = re.compile(r'id="([^"]+)"')
TAG_RE = re.compile(r"<[^>]+>")


def headings_from_html(body):
    """Список (уровень, id, текст) из отрендеренного ноутбука."""
    res = []
    for m in HEADING_RE.finditer(body):
        level = int(m.group(1))
        attrs = m.group(2)
        inner = m.group(3)
        inner = re.sub(r'<a class="anchor-link".*?</a>', "", inner, flags=re.S)
        text = html.unescape(TAG_RE.sub("", inner)).strip()
        idm = ID_RE.search(attrs)
        if text and idm:
            res.append((level, idm.group(1), text))
    return res


def is_topic(t):
    """Похоже ли это на заголовок темы, а не на предложение из текста лекции."""
    t = t.strip()
    if not t or not t[0].isalnum():
        return False            # │ ├── data/  и прочая псевдографика
    if len(t) > 62 or t.count(" ") > 8:
        return False            # длинная фраза — это абзац, а не заголовок
    if t.endswith(":") or t.endswith("."):
        return False
    return True


def toc_headings(lec, limit=40):
    """Оглавление лекции. Если после фильтра почти ничего не осталось —
    значит в ноутбуке заголовки нормальные, берём всё подряд."""
    items = [h for h in lec["heads"] if h[0] <= 3 and is_topic(h[2])]
    if len(items) < 3:
        items = [h for h in lec["heads"] if h[0] <= 3]
    out, seen = [], set()
    for lv, hid, t in items:
        k = t.lower()
        if k in seen:
            continue
        seen.add(k)
        out.append((lv, hid, t))
    return out[:limit]


def good_topics(lec, limit=5):
    """Из заголовков ноутбука берём только те, что похожи на тему, а не на
    предложение из текста («The CSV file should contain:», «project/» и т.п.)."""
    out, seen = [], {lec["title"].lower()}
    for lv, _, t in lec["heads"]:
        if lv > 3:
            continue
        t = t.strip(" .")
        low = t.lower()
        if low in seen or len(t) < 4 or len(t) > 46 or not is_topic(t):
            continue
        seen.add(low)
        out.append(t)
        if len(out) >= limit:
            break
    return out


def notebook_title(nb, fallback):
    for cell in nb.cells:
        if cell.cell_type == "markdown":
            for line in cell.source.split("\n"):
                line = line.strip()
                if line.startswith("#"):
                    t = line.lstrip("#").strip()
                    t = re.sub(r"[*_`]", "", t)
                    if t:
                        return t
            break
    return fallback


def pretty_name(stem):
    s = stem.replace("_", " ").strip()
    s = re.sub(r"\s+", " ", s)
    return s


# --------------------------------------------------------------------------- #
#  Шаблоны страниц
# --------------------------------------------------------------------------- #

def page(title, body, active="", depth=0, extra_head=""):
    up = "../" * depth
    nav = []
    for href, label, key in NAV:
        cls = ' class="on"' if key == active else ""
        nav.append('<a href="%s%s"%s>%s</a>' % (up, href, cls, esc(label)))
    return """<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%(title)s</title>
<link rel="stylesheet" href="%(up)sassets/style.css">
%(extra)s
</head>
<body>
<header class="top">
  <a class="brand" href="%(up)sindex.html"><b>PDA</b><span>%(course)s</span></a>
  <nav>%(nav)s</nav>
</header>
<main>
%(body)s
</main>
<footer>
  Сгенерировано <code>build.py</code> из ноутбуков курса · AITU
</footer>
</body>
</html>
""" % {
        "title": esc(title),
        "up": up,
        "extra": extra_head,
        "course": esc(COURSE),
        "nav": "\n".join(nav),
        "body": body,
    }


def cmd_card(name, group, count, where, usage):
    """Карточка одной команды: сигнатура, что это, зачем, мини-пример."""
    rec = CMD.get(name, {})
    what = rec.get("what") or DESCR.get(name, "")
    why = rec.get("why", "")
    sig = rec.get("sig", "")
    ex = rec.get("ex", "")

    parts = ['<article class="cmd" data-cmd="%s">' % esc(
        (name + " " + what + " " + why + " " + group).lower())]
    parts.append('<header><code class="nm">%s</code>'
                 '<span class="tag">%s</span>'
                 '<span class="uses">%d %s в коде лекций</span></header>'
                 % (esc(name), esc(GROUP_TITLES.get(group, group).split(" —")[0]),
                    count, plural(count, ("раз", "раза", "раз"))))
    if sig:
        parts.append('<div class="sig"><code>%s</code></div>' % esc(sig))
    if what:
        parts.append('<p class="what"><b>Что это.</b> %s</p>' % esc(what))
    if why:
        parts.append('<p class="why"><b>Зачем.</b> %s</p>' % esc(why))
    if ex:
        parts.append('<div class="ex"><div class="exl">Пример</div>%s</div>' % code_html(ex))
    else:
        parts.append('<p class="noex">Примера пока нет — можно дописать в '
                     '<code>commands_data.py</code>.</p>')
    if usage:
        snippet, lec_title, lec_href = usage
        parts.append('<details class="inlec"><summary>Как это было в лекции</summary>'
                     '%s<a class="lecref" href="%s">%s →</a></details>'
                     % (code_html(snippet), esc(lec_href), esc(lec_title)))
    elif where:
        t, h = where[0]
        parts.append('<div class="inlec"><a class="lecref" href="%s">%s →</a></div>' % (h, esc(t)))
    parts.append("</article>")
    return "".join(parts)


def cmd_section(group, items):
    """items: [(name, count, where, usage)]"""
    cards = "".join(cmd_card(n, group, c, w, u) for n, c, w, u in items)
    return ('<h3 class="grp" id="g-%s">%s <span class="cnt">%d</span></h3>'
            '<div class="cmdgrid">%s</div>' % (group, esc(GROUP_TITLES.get(group, group)),
                                               len(items), cards))


def group_nav(groups):
    chips = "".join('<a href="#g-%s">%s <b>%d</b></a>'
                    % (g, esc(GROUP_TITLES.get(g, g).split(" —")[0]), n)
                    for g, n in groups)
    return '<nav class="gnav">%s</nav>' % chips


# --------------------------------------------------------------------------- #
#  Сборка
# --------------------------------------------------------------------------- #

def main():
    if OUT.exists():
        # ignore_errors — чтобы не падать, если папка site открыта в проводнике
        shutil.rmtree(OUT, ignore_errors=True)
    LECT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT / "assets").mkdir(exist_ok=True)

    exporter = HTMLExporter(template_name="basic")
    exporter.exclude_input_prompt = False

    # --- находим недели -----------------------------------------------------
    weeks = []
    for d in sorted(ROOT.iterdir()):
        m = re.match(r"(?i)^week\s*(\d+)$", d.name)
        if d.is_dir() and m:
            weeks.append((int(m.group(1)), d))
    weeks.sort()

    extra = [d for d in sorted(ROOT.iterdir())
             if d.is_dir() and re.match(r"(?i)^ass\w*\d*$", d.name)]

    global NAV
    NAV = [("index.html", "Главная", "index")]
    for num, _ in weeks:
        NAV.append(("week%d.html" % num, "Неделя %d" % num, "week%d" % num))
    if extra:
        NAV.append(("assignments.html", "Задания", "ass"))
    NAV.append(("commands.html", "Команды", "commands"))

    all_cmds = defaultdict(lambda: {"count": 0, "where": []})  # cmd -> инфо
    week_data = []

    def render_notebook(path, week_label, week_key):
        nb = nbformat.read(io.open(path, encoding="utf-8"), as_version=4)
        body, _ = exporter.from_notebook_node(nb)
        title = notebook_title(nb, pretty_name(path.stem))
        slug = slugify("%s-%s" % (week_key, path.stem))[:80]
        heads = headings_from_html(body)
        cmds = extract_commands(nb)
        usage = extract_usage(nb, cmds)
        n_code = sum(1 for c in nb.cells if c.cell_type == "code")
        n_md = sum(1 for c in nb.cells if c.cell_type == "markdown")
        return {
            "path": path, "nb": nb, "body": body, "title": title, "slug": slug,
            "heads": heads, "cmds": cmds, "usage": usage,
            "n_code": n_code, "n_md": n_md,
            "week_label": week_label, "week_key": week_key,
            "href": "lectures/%s.html" % slug,
        }

    # --- читаем все ноутбуки -----------------------------------------------
    for num, d in weeks:
        label = "Неделя %d" % num
        key = "week%d" % num
        lectures = []
        for f in sorted(d.glob("*.ipynb")):
            if ".ipynb_checkpoints" in str(f):
                continue
            sys.stdout.write("  lecture: %s\n" % f.name.encode("ascii", "replace").decode())
            lectures.append(render_notebook(f, label, key))
        files = [f for f in sorted(d.rglob("*"))
                 if f.is_file() and f.suffix.lower() not in (".ipynb",)
                 and ".ipynb_checkpoints" not in str(f)]
        week_data.append({"num": num, "dir": d, "label": label, "key": key,
                          "lectures": lectures, "files": files})

    ass_lectures = []
    for d in extra:
        for f in sorted(d.glob("*.ipynb")):
            if ".ipynb_checkpoints" in str(f):
                continue
            ass_lectures.append(render_notebook(f, "Задания", "ass"))

    # --- индекс команд ------------------------------------------------------
    for w in week_data:
        for lec in w["lectures"]:
            for cmd, n in lec["cmds"].items():
                rec = all_cmds[cmd]
                rec["count"] += n
                rec["where"].append((lec["title"], lec["href"], w["num"]))
                if cmd in lec["usage"] and "usage" not in rec:
                    rec["usage"] = (lec["usage"][cmd], lec["title"], lec["href"])

    # --- страницы лекций ----------------------------------------------------
    flat = [l for w in week_data for l in w["lectures"]] + ass_lectures
    for i, lec in enumerate(flat):
        toc = ""
        heads = toc_headings(lec)
        if heads:
            items = []
            for level, hid, text in heads:
                items.append('<a class="lv%d" href="#%s">%s</a>' % (level, esc(hid), esc(text)))
            toc = '<aside class="toc"><div class="toc-t">Содержание</div>%s</aside>' % "".join(items)

        rel = os.path.relpath(lec["path"], OUT).replace("\\", "/")
        prev_l = flat[i - 1] if i > 0 else None
        next_l = flat[i + 1] if i < len(flat) - 1 else None
        pager = []
        if prev_l:
            pager.append('<a class="pg prev" href="../%s">← %s</a>' % (prev_l["href"], esc(prev_l["title"])))
        if next_l:
            pager.append('<a class="pg next" href="../%s">%s →</a>' % (next_l["href"], esc(next_l["title"])))

        wk_href = "../week%s.html" % lec["week_key"].replace("week", "") if lec["week_key"] != "ass" else "../assignments.html"
        body = """
<div class="lechead">
  <a class="back" href="%(wk)s">← %(wlabel)s</a>
  <h1>%(title)s</h1>
  <div class="meta">%(nmd)d текстовых ячеек · %(ncode)d ячеек кода ·
    <a href="%(raw)s" download>скачать .ipynb</a></div>
</div>
<div class="leclayout">
  %(toc)s
  <article class="nbdoc">%(body)s</article>
</div>
<div class="pager">%(pager)s</div>
""" % {
            "wk": wk_href, "wlabel": esc(lec["week_label"]), "title": esc(lec["title"]),
            "nmd": lec["n_md"], "ncode": lec["n_code"],
            "raw": quote(rel), "toc": toc, "body": lec["body"],
            "pager": "".join(pager),
        }
        (LECT_DIR / (lec["slug"] + ".html")).write_text(
            page(lec["title"] + " · " + COURSE, body, active=lec["week_key"], depth=1),
            encoding="utf-8")

    # --- страницы недель ----------------------------------------------------
    for w in week_data:
        cards = []
        for lec in w["lectures"]:
            topics = good_topics(lec)
            chips = "".join('<span class="chip">%s</span>' % esc(t[:52]) for t in topics)
            cards.append("""
<a class="lec" href="%s">
  <h3>%s</h3>
  <div class="chips">%s</div>
  <div class="lecmeta">%d %s кода · %d %s</div>
</a>""" % (esc(lec["href"]), esc(lec["title"]), chips,
       lec["n_code"], plural(lec["n_code"], ("ячейка", "ячейки", "ячеек")),
       len(lec["cmds"]), plural(len(lec["cmds"]), ("команда", "команды", "команд"))))

        wcmds = Counter()
        where = defaultdict(list)
        usage = {}
        for lec in w["lectures"]:
            for cmd, n in lec["cmds"].items():
                wcmds[cmd] += n
                where[cmd].append((lec["title"], lec["href"]))
                if cmd in lec["usage"] and cmd not in usage:
                    usage[cmd] = (lec["usage"][cmd], lec["title"], lec["href"])

        grouped = defaultdict(list)
        for cmd, n in wcmds.items():
            _, grp = classify(cmd)
            grp = grp or ("method" if cmd.startswith(".") else "other")
            grouped[grp].append((cmd, n, where[cmd][:2], usage.get(cmd)))

        sections, navs = [], []
        for grp in GROUP_ORDER:
            if grp not in grouped:
                continue
            items = sorted(grouped[grp], key=lambda r: (-r[1], r[0]))
            navs.append((grp, len(items)))
            sections.append(cmd_section(grp, items))
        if navs:
            sections.insert(0, group_nav(navs))

        filerows = []
        for f in w["files"]:
            rel = os.path.relpath(f, OUT).replace("\\", "/")
            filerows.append('<li><a href="%s">%s</a><span>%s</span></li>'
                            % (quote(rel), esc(os.path.relpath(f, w["dir"]).replace("\\", "/")),
                               human_size(f.stat().st_size)))

        body = """
<h1 class="pt">Неделя %(num)d</h1>
<p class="lead">%(nlec)d %(lecw)s · %(ncmd)d %(cmdw)s в коде</p>

<section>
  <h2>Функции и команды недели</h2>
  <p class="lead">Что за функция, зачем она нужна и мини-пример. Список собран из кода лекций
  этой недели; внутри карточки можно раскрыть строку, как это было на занятии.</p>
  <input class="search" type="search" placeholder="Фильтр: np, open, csv, множество …">
  %(cmds)s
</section>

<section>
  <h2>Лекции недели</h2>
  <p class="lead">Полный текст занятий: теория, код и результаты выполнения.</p>
  <div class="lecgrid">%(cards)s</div>
</section>

%(files)s
""" % {
            "num": w["num"], "nlec": len(w["lectures"]), "ncmd": len(wcmds),
            "lecw": plural(len(w["lectures"]), ("лекция", "лекции", "лекций")),
            "cmdw": plural(len(wcmds), ("разная команда", "разные команды", "разных команд")),
            "cards": "".join(cards), "cmds": "".join(sections) or "<p>Команд не найдено.</p>",
            "files": ("<section><h2>Файлы недели</h2><ul class=\"files\">%s</ul></section>"
                      % "".join(filerows)) if filerows else "",
        }
        (OUT / ("week%d.html" % w["num"])).write_text(
            page("Неделя %d · %s" % (w["num"], COURSE), body, active=w["key"], depth=0,
                 extra_head='<script defer src="assets/app.js"></script>'),
            encoding="utf-8")

    # --- страница заданий ---------------------------------------------------
    if extra:
        cards = []
        for lec in ass_lectures:
            cards.append('<a class="lec" href="%s"><h3>%s</h3><div class="lecmeta">%d ячеек кода</div></a>'
                         % (esc(lec["href"]), esc(lec["title"]), lec["n_code"]))
        filerows = []
        for d in extra:
            for f in sorted(d.rglob("*")):
                if not f.is_file() or f.suffix == ".ipynb" or ".ipynb_checkpoints" in str(f):
                    continue
                rel = os.path.relpath(f, OUT).replace("\\", "/")
                filerows.append('<li><a href="%s">%s</a><span>%s</span></li>'
                                % (quote(rel), esc(os.path.relpath(f, ROOT).replace("\\", "/")),
                                   human_size(f.stat().st_size)))
        body = """
<h1 class="pt">Задания</h1>
<section><h2>Ноутбуки</h2><div class="lecgrid">%s</div></section>
<section><h2>Файлы</h2><ul class="files">%s</ul></section>
""" % ("".join(cards) or "<p>Пока пусто.</p>", "".join(filerows))
        (OUT / "assignments.html").write_text(
            page("Задания · " + COURSE, body, active="ass"), encoding="utf-8")

    # --- общий справочник команд -------------------------------------------
    grouped = defaultdict(list)
    for cmd, rec in all_cmds.items():
        _, grp = classify(cmd)
        grp = grp or ("method" if cmd.startswith(".") else "other")
        seen, links = set(), []
        for title, href, wnum in rec["where"]:
            if href in seen:
                continue
            seen.add(href)
            links.append(("Неделя %d · %s" % (wnum, title[:40]), href))
        grouped[grp].append((cmd, rec["count"], links[:2], rec.get("usage")))

    sections, navs = [], []
    for grp in GROUP_ORDER:
        if grp not in grouped:
            continue
        items = sorted(grouped[grp], key=lambda r: (-r[1], r[0]))
        navs.append((grp, len(items)))
        sections.append(cmd_section(grp, items))

    body = """
<h1 class="pt">Справочник функций</h1>
<p class="lead">%d команд из кода всех лекций курса. На каждую — сигнатура, что это такое,
зачем нужно и мини-пример, который можно скопировать и запустить.
Тексты и примеры лежат в <code>commands_data.py</code>, дописывать их можно свободно.</p>
<input class="search" type="search" placeholder="Поиск: np, open, множество, архив …" autofocus>
%s
%s
""" % (len(all_cmds), group_nav(navs), "".join(sections))
    (OUT / "commands.html").write_text(
        page("Команды · " + COURSE, body, active="commands", depth=0,
             extra_head='<script defer src="assets/app.js"></script>'),
        encoding="utf-8")

    # --- главная ------------------------------------------------------------
    wcards = []
    for w in week_data:
        topics = []
        for lec in w["lectures"]:
            topics.append(lec["title"])
        chips = "".join('<span class="chip">%s</span>' % esc(t[:46]) for t in topics[:6])
        wcards.append("""
<a class="wcard" href="week%d.html">
  <div class="wnum">%02d</div>
  <h3>Неделя %d</h3>
  <div class="chips">%s</div>
  <div class="lecmeta">%d %s</div>
</a>""" % (w["num"], w["num"], w["num"], chips, len(w["lectures"]),
           plural(len(w["lectures"]), ("лекция", "лекции", "лекций"))))

    syllabus = ""
    for f in ROOT.glob("*Syllabus*"):
        rel = os.path.relpath(f, OUT).replace("\\", "/")
        syllabus = '<p class="lead"><a href="%s">Силлабус курса (%s)</a></p>' % (quote(rel), esc(f.suffix[1:]))
        break

    total_lec = sum(len(w["lectures"]) for w in week_data)
    body = """
<section class="hero">
  <h1>%(course)s</h1>
  <p>%(sub)s</p>
  <div class="stats">
    <div><b>%(nw)d</b><span>%(nww)s</span></div>
    <div><b>%(nl)d</b><span>%(nlw)s</span></div>
    <div><b>%(nc)d</b><span>%(ncw)s</span></div>
  </div>
  %(syl)s
</section>

<section>
  <a class="bigref" href="commands.html">
    <div>
      <h3>Справочник функций</h3>
      <p>%(nc)d команд курса: что это, зачем и мини-пример, который можно запустить.</p>
    </div>
    <span>Открыть →</span>
  </a>
</section>

<section>
  <h2>Недели</h2>
  <div class="wgrid">%(weeks)s</div>
</section>

<section>
  <h2>Что где лежит</h2>
  <ul class="plain">
    <li><b>Страница недели</b> — список лекций и справочник команд этой недели.</li>
    <li><b>Страница лекции</b> — весь ноутбук: текст, код, результаты выполнения и картинки, плюс оглавление сбоку.</li>
    <li><b><a href="commands.html">Команды</a></b> — общий справочник по всему курсу с поиском.</li>
    <li>Исходные <code>.ipynb</code> лежат там же, где лежали; с каждой страницы лекции есть ссылка на скачивание.</li>
  </ul>
</section>
""" % {
        "course": esc(COURSE), "sub": esc(SUBTITLE), "nw": len(week_data),
        "nl": total_lec, "nc": len(all_cmds), "syl": syllabus,
        "nww": plural(len(week_data), ("неделя", "недели", "недель")),
        "nlw": plural(total_lec, ("лекция", "лекции", "лекций")),
        "ncw": plural(len(all_cmds), ("команда", "команды", "команд")),
        "weeks": "".join(wcards),
    }
    (OUT / "index.html").write_text(page(COURSE, body, active="index"), encoding="utf-8")

    # --- ассеты -------------------------------------------------------------
    (OUT / "assets" / "style.css").write_text(
        CSS + "\n\n/* ==== подсветка кода (pygments) ==== */\n"
        + HtmlFormatter(style="friendly").get_style_defs(".highlight"),
        encoding="utf-8")
    (OUT / "assets" / "app.js").write_text(APP_JS, encoding="utf-8")

    print("\nГотово: %s" % (OUT / "index.html"))
    print("Недель: %d · лекций: %d · команд: %d" % (len(week_data), total_lec, len(all_cmds)))


CSS = r"""
:root{
  --bg:#f6f5f2; --card:#fff; --ink:#1b2126; --mut:#6b7176; --line:#e3e0d9;
  --acc:#2f6f4f; --acc2:#e8f1eb; --warn:#a8641b; --code:#f4f3ef;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.6 "Segoe UI",Inter,system-ui,Arial,sans-serif}
a{color:var(--acc);text-decoration:none}
a:hover{text-decoration:underline}
code{font-family:"JetBrains Mono",Consolas,monospace;font-size:.92em;
  background:var(--code);padding:1px 5px;border-radius:5px}

/* ---- шапка ---- */
.top{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:22px;
  padding:12px 28px;background:#fffffff2;backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line);flex-wrap:wrap}
.brand{display:flex;align-items:baseline;gap:10px;font-weight:700;color:var(--ink)}
.brand b{background:var(--acc);color:#fff;padding:3px 9px;border-radius:8px;font-size:14px;letter-spacing:.05em}
.brand span{font-size:14px;color:var(--mut);font-weight:600}
.top nav{display:flex;gap:4px;flex-wrap:wrap}
.top nav a{padding:6px 12px;border-radius:9px;font-size:14.5px;color:var(--mut);font-weight:600}
.top nav a:hover{background:var(--acc2);color:var(--acc);text-decoration:none}
.top nav a.on{background:var(--acc);color:#fff}

main{max-width:1180px;margin:0 auto;padding:30px 24px 60px}
footer{border-top:1px solid var(--line);padding:22px 24px;color:var(--mut);font-size:13.5px;text-align:center}

h1.pt{font-size:40px;margin:8px 0 6px;letter-spacing:-.02em}
h2{font-size:23px;margin:34px 0 14px;letter-spacing:-.01em}
h3.grp{font-size:17px;margin:26px 0 10px;color:var(--acc);
  text-transform:uppercase;letter-spacing:.08em}
h3.grp .cnt{color:var(--mut);font-weight:600;font-size:13px}
.lead{color:var(--mut);margin:6px 0 16px;max-width:76ch}
section{margin-bottom:34px}
ul.plain{margin:0;padding-left:20px;color:#3f464a}
ul.plain li{margin:6px 0}

/* ---- главная ---- */
.hero{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:34px 34px 28px}
.hero h1{font-size:44px;margin:0;letter-spacing:-.03em}
.hero p{color:var(--mut);margin:10px 0 0;font-size:17px}
.stats{display:flex;gap:34px;margin-top:22px;flex-wrap:wrap}
.stats div{display:flex;flex-direction:column}
.stats b{font-size:32px;line-height:1;color:var(--acc)}
.stats span{font-size:13px;color:var(--mut);margin-top:4px}

.bigref{display:flex;align-items:center;justify-content:space-between;gap:20px;
  background:var(--acc);color:#fff;border-radius:16px;padding:22px 26px;flex-wrap:wrap}
.bigref:hover{text-decoration:none;background:#285f43}
.bigref h3{margin:0;font-size:22px}
.bigref p{margin:6px 0 0;font-size:14.5px;color:#d7e6dd;max-width:62ch}
.bigref span{font-weight:700;font-size:15px;white-space:nowrap}

.wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.wcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;
  display:block;color:inherit;transition:transform .15s,box-shadow .15s,border-color .15s}
.wcard:hover{transform:translateY(-2px);box-shadow:0 8px 24px #0000000f;border-color:#cfd8d2;text-decoration:none}
.wnum{font-size:13px;font-weight:800;color:var(--acc);letter-spacing:.14em}
.wcard h3{margin:4px 0 10px;font-size:22px}

.lecgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px}
.lec{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:17px 18px;
  color:inherit;display:block;transition:transform .15s,box-shadow .15s}
.lec:hover{transform:translateY(-2px);box-shadow:0 8px 24px #0000000f;text-decoration:none}
.lec h3{margin:0 0 9px;font-size:17.5px;line-height:1.3}
.chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}
.chip{background:var(--acc2);color:#2c5a45;font-size:12px;padding:3px 8px;border-radius:7px}
.lecmeta{font-size:12.5px;color:var(--mut)}

/* ---- таблица команд ---- */
.search{width:100%;max-width:520px;padding:11px 15px;border:1px solid var(--line);
  border-radius:11px;font:inherit;font-size:15px;background:var(--card);margin-bottom:8px}
.search:focus{outline:2px solid var(--acc2);border-color:var(--acc)}
.tablewrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:13px}
table.cmds{border-collapse:collapse;width:100%;font-size:14.5px}
table.cmds th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.07em;
  color:var(--mut);padding:11px 14px;border-bottom:1px solid var(--line);white-space:nowrap}
table.cmds td{padding:10px 14px;border-bottom:1px solid #f0eee9;vertical-align:top}
table.cmds tr:last-child td{border-bottom:0}
table.cmds td code{background:#eef3f0;color:#1f4f3a;font-weight:600;white-space:nowrap}
table.cmds .num{text-align:right;color:var(--mut);width:56px}
table.cmds .where{font-size:12.5px;white-space:nowrap}
table.cmds .where a{display:block;color:var(--mut)}
table.cmds .where a:hover{color:var(--acc)}
.none{color:#b9bdbf}
tr.hide{display:none}


/* ---- навигация по группам команд ---- */
.gnav{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 6px}
.gnav a{background:var(--card);border:1px solid var(--line);border-radius:9px;
  padding:6px 11px;font-size:13.5px;color:#4a5155}
.gnav a:hover{border-color:var(--acc);color:var(--acc);text-decoration:none}
.gnav a b{color:var(--mut);font-weight:600;font-size:12px;margin-left:3px}

/* ---- карточка команды ---- */
.cmdgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(430px,1fr));
  gap:16px;align-items:start}
.cmd{background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:16px 18px 14px;min-width:0}
.cmd header{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:9px}
.cmd .nm{font-size:16.5px;font-weight:700;background:#eef3f0;color:#1f4f3a;
  padding:3px 9px;border-radius:7px}
.cmd .tag{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  color:var(--acc);background:var(--acc2);padding:3px 7px;border-radius:6px}
.cmd .uses{font-size:12px;color:var(--mut);margin-left:auto}
.cmd .sig{margin:0 0 10px}
.cmd .sig code{display:block;background:#f7f6f2;border:1px dashed #ded9cf;color:#55504a;
  border-radius:8px;padding:7px 11px;font-size:13px;white-space:pre-wrap;word-break:break-word}
.cmd p{margin:0 0 8px;font-size:14.5px;line-height:1.5;color:#3f464a}
.cmd p b{color:var(--ink)}
.cmd .why b{color:var(--warn)}
.cmd .noex{color:var(--mut);font-size:13px}
.cmd .ex{margin-top:11px}
.cmd .exl{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--mut);margin-bottom:5px}
.cmd .ex .highlight{background:#f7f6f2;border:1px solid var(--line);border-radius:10px;
  padding:11px 13px;overflow-x:auto}
.cmd .ex .highlight pre{margin:0;font-family:"JetBrains Mono",Consolas,monospace;
  font-size:13px;line-height:1.55}
.cmd .inlec{margin-top:11px;border-top:1px dashed var(--line);padding-top:9px}
.cmd .inlec summary{font-size:12.5px;color:var(--mut);cursor:pointer;list-style:none}
.cmd .inlec summary::-webkit-details-marker{display:none}
.cmd .inlec summary::before{content:"▸ ";color:var(--acc)}
.cmd .inlec[open] summary::before{content:"▾ "}
.cmd .inlec .highlight{background:#fbfaf7;border-left:3px solid var(--acc2);
  border-radius:0 7px 7px 0;padding:8px 11px;margin:8px 0 6px;overflow-x:auto}
.cmd .inlec .highlight pre{margin:0;font-family:Consolas,monospace;font-size:12.5px}
.cmd .lecref{font-size:12.5px;color:var(--mut)}
.cmd .lecref:hover{color:var(--acc)}
.cmd.hide{display:none}
.cmdgrid[hidden],.grp[hidden],.gnav[hidden]{display:none!important}
.nores{color:var(--mut);padding:18px 2px}

@media (max-width:620px){
  .cmdgrid{grid-template-columns:1fr}
  .cmd .uses{margin-left:0;width:100%}
}

ul.files{list-style:none;margin:0;padding:0;background:var(--card);
  border:1px solid var(--line);border-radius:13px;overflow:hidden}
ul.files li{display:flex;justify-content:space-between;gap:16px;padding:9px 15px;
  border-bottom:1px solid #f0eee9;font-size:14.5px}
ul.files li:last-child{border-bottom:0}
ul.files span{color:var(--mut);font-size:13px;white-space:nowrap}

/* ---- страница лекции ---- */
.lechead{margin-bottom:18px}
.lechead .back{font-size:14px;color:var(--mut);font-weight:600}
.lechead h1{font-size:34px;margin:8px 0 6px;letter-spacing:-.02em}
.lechead .meta{font-size:13.5px;color:var(--mut)}
.leclayout{display:grid;grid-template-columns:238px minmax(0,1fr);gap:28px;align-items:start}
.toc{position:sticky;top:78px;max-height:calc(100vh - 100px);overflow:auto;
  background:var(--card);border:1px solid var(--line);border-radius:13px;padding:14px}
.toc-t{font-size:11.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--mut);
  font-weight:700;margin-bottom:8px}
.toc a{display:block;font-size:13.5px;color:#454c50;padding:3px 0;line-height:1.35}
.toc a:hover{color:var(--acc)}
.toc a.lv1{font-weight:700}
.toc a.lv2{padding-left:10px}
.toc a.lv3{padding-left:20px;font-size:13px;color:var(--mut)}
.pager{display:flex;justify-content:space-between;gap:14px;margin-top:34px;flex-wrap:wrap}
.pg{background:var(--card);border:1px solid var(--line);border-radius:11px;
  padding:11px 15px;font-size:14px;max-width:46%}
.pg:hover{border-color:var(--acc);text-decoration:none}

/* ---- ноутбук ---- */
.nbdoc{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:28px 30px;min-width:0}
.nbdoc .cell{display:flex;gap:12px;margin:0 0 6px}
.nbdoc .prompt{flex:none;width:64px;font-family:Consolas,monospace;font-size:11.5px;
  color:#b6bbbd;text-align:right;padding-top:11px;user-select:none}
.nbdoc .inner_cell{flex:1;min-width:0}
.nbdoc .input_area{background:var(--code);border:1px solid var(--line);border-radius:10px;
  padding:12px 14px;overflow-x:auto;margin:4px 0}
.nbdoc .input_area pre{margin:0;font-family:"JetBrains Mono",Consolas,monospace;
  font-size:13.5px;line-height:1.55}
.nbdoc .output_wrapper{margin:2px 0 10px}
.nbdoc .output_area{display:flex;gap:12px}
.nbdoc .output_subarea{flex:1;min-width:0;overflow-x:auto}
.nbdoc .output_subarea pre{margin:0;background:#fbfaf7;border-left:3px solid #dcd9d1;
  padding:9px 13px;border-radius:0 8px 8px 0;font-family:Consolas,monospace;
  font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word}
.nbdoc .output_area img{max-width:100%;height:auto;border-radius:8px}
.nbdoc .rendered_html{padding:2px 0}
.nbdoc .rendered_html h1{font-size:28px;margin:26px 0 10px;letter-spacing:-.02em}
.nbdoc .rendered_html h2{font-size:22px;margin:24px 0 9px}
.nbdoc .rendered_html h3{font-size:18px;margin:20px 0 8px}
.nbdoc .rendered_html h4{font-size:16px;margin:16px 0 6px}
.nbdoc .rendered_html p{margin:9px 0}
.nbdoc .rendered_html ul,.nbdoc .rendered_html ol{margin:9px 0;padding-left:24px}
.nbdoc .rendered_html li{margin:4px 0}
.nbdoc .rendered_html img{max-width:100%;height:auto;border-radius:10px;margin:10px 0}
.nbdoc .rendered_html table{border-collapse:collapse;margin:12px 0;font-size:14px;display:block;overflow-x:auto}
.nbdoc .rendered_html th,.nbdoc .rendered_html td{border:1px solid var(--line);padding:6px 11px;text-align:left}
.nbdoc .rendered_html blockquote{border-left:3px solid var(--acc);margin:12px 0;
  padding:4px 0 4px 15px;color:#4a5155}
.nbdoc .anchor-link{opacity:0;margin-left:7px;font-weight:400;color:var(--mut)}
.nbdoc h1:hover .anchor-link,.nbdoc h2:hover .anchor-link,.nbdoc h3:hover .anchor-link{opacity:1}
.nbdoc .highlight{background:transparent}

@media (max-width:900px){
  .leclayout{grid-template-columns:1fr}
  .toc{position:static;max-height:none}
  .nbdoc{padding:20px 16px}
  .nbdoc .prompt{display:none}
  main{padding:22px 14px 50px}
  h1.pt,.hero h1{font-size:30px}
}
"""

APP_JS = r"""
/* Поиск по карточкам команд: печатаешь — остаются подходящие,
   пустые группы скрываются целиком. */
(function () {
  var box = document.querySelector('.search');
  if (!box) return;

  var cards = [].slice.call(document.querySelectorAll('.cmd'));
  var grids = [].slice.call(document.querySelectorAll('.cmdgrid'));
  var nav = document.querySelector('.gnav');

  var empty = document.createElement('p');
  empty.className = 'nores';
  empty.textContent = 'Ничего не нашлось. Попробуй короче — например np или файл.';
  empty.hidden = true;
  (grids[0] || box).parentNode.insertBefore(empty, grids[0] || null);

  function run() {
    var q = box.value.trim().toLowerCase();
    var total = 0;

    cards.forEach(function (c) {
      var ok = !q || (c.dataset.cmd || '').indexOf(q) !== -1;
      c.classList.toggle('hide', !ok);
      if (ok) total++;
    });

    grids.forEach(function (g) {
      var shown = g.querySelectorAll('.cmd:not(.hide)').length;
      g.hidden = !shown;
      var head = g.previousElementSibling;
      if (head && head.classList.contains('grp')) head.hidden = !shown;
    });

    if (nav) nav.hidden = !!q;
    empty.hidden = total !== 0;
  }

  box.addEventListener('input', run);
  addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== box) { e.preventDefault(); box.focus(); }
    if (e.key === 'Escape' && document.activeElement === box) { box.value = ''; run(); box.blur(); }
  });
})();
"""


if __name__ == "__main__":
    main()
