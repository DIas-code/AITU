# -*- coding: utf-8 -*-
"""
Справочник функций курса: что это, зачем и мини-пример.

Формат записи:
    "имя()": dict(
        sig  = "сигнатура вызова",
        what = "что это такое — одно предложение",
        why  = "зачем нужно / когда применять",
        ex   = "мини-пример кода; ожидаемый вывод пишем в комментарии через  # →",
    )

Команду, которой здесь нет, сайт всё равно покажет — но без описания и примера.
Дописывать можно свободно, build.py подхватит при следующем запуске.
"""

CMD = {}

# --------------------------------------------------------------------------- #
#  Встроенные функции Python
# --------------------------------------------------------------------------- #

CMD.update({
    "print()": dict(
        sig="print(*values, sep=' ', end='\\n')",
        what="Выводит значения в консоль.",
        why="Главный инструмент отладки: посмотреть, что реально лежит в переменной. "
            "sep меняет разделитель между значениями, end — чем закончить строку.",
        ex="""name, score = "Aida", 87
print(name, score)              # → Aida 87
print(name, score, sep=" | ")   # → Aida | 87
print("без переноса", end="")""",
    ),
    "type()": dict(
        sig="type(x)",
        what="Возвращает тип объекта.",
        why="Когда код падает с ошибкой вида «can only concatenate str», первым делом "
            "смотрят type(): часто число пришло строкой из файла или input().",
        ex="""print(type(5))        # → <class 'int'>
print(type("5"))      # → <class 'str'>
print(type([1, 2]))   # → <class 'list'>""",
    ),
    "open()": dict(
        sig="open(path, mode='r', encoding=None)",
        what="Открывает файл и возвращает файловый объект.",
        why="С этого начинается любая работа с файлом. Режим: 'r' — читать, 'w' — "
            "перезаписать с нуля, 'a' — дописать в конец, 'b' — двоичный (картинки, архивы). "
            "Для текста с кириллицей всегда указывай encoding='utf-8', иначе на Windows "
            "получишь кракозябры.",
        ex="""with open("log.txt", "w", encoding="utf-8") as f:
    f.write("старт\\n")

with open("log.txt", encoding="utf-8") as f:
    print(f.read())   # → старт

# with сам закроет файл, даже если внутри случится ошибка""",
    ),
    "len()": dict(
        sig="len(obj)",
        what="Длина объекта: сколько в нём элементов.",
        why="Работает со всем, у чего есть размер: строка (символы), список, словарь (ключи), "
            "множество. Классика — посчитать строки в файле или проверить, что список не пуст.",
        ex="""print(len("Python"))        # → 6
print(len([10, 20, 30]))    # → 3
print(len({"a": 1, "b": 2}))  # → 2""",
    ),
    "int()": dict(
        sig="int(x, base=10)",
        what="Преобразует значение в целое число.",
        why="Из файла и из input() всё приходит строками. Чтобы считать — сначала int(). "
            "Дробную часть обрезает, а не округляет.",
        ex="""print(int("42") + 1)   # → 43
print(int(7.9))        # → 7   (обрезает, не округляет!)
print(int("ff", 16))   # → 255""",
    ),
    "float()": dict(
        sig="float(x)",
        what="Преобразует значение в число с плавающей точкой.",
        why="Нужен для оценок, средних, цен — всего, где бывает дробная часть. "
            "Разделитель только точка: float('3,5') упадёт.",
        ex="""print(float("3.5") * 2)   # → 7.0
print(float(10) / 4)      # → 2.5""",
    ),
    "str()": dict(
        sig="str(x)",
        what="Преобразует значение в строку.",
        why="Нужен, когда число надо склеить с текстом или записать в файл — "
            "файл принимает только строки.",
        ex="""score = 87
print("Балл: " + str(score))   # → Балл: 87
# print("Балл: " + score) — TypeError""",
    ),
    "list()": dict(
        sig="list(iterable)",
        what="Создаёт список из любого итерируемого объекта.",
        why="Превращает в список то, что само списком не является: range, множество, "
            "ключи словаря, результат map/zip — их нельзя напечатать или взять по индексу без list().",
        ex="""print(list(range(4)))        # → [0, 1, 2, 3]
print(list("abc"))           # → ['a', 'b', 'c']
print(list({"x": 1, "y": 2}))  # → ['x', 'y']""",
    ),
    "dict()": dict(
        sig="dict(**kwargs) / dict(пары)",
        what="Создаёт словарь — набор пар «ключ: значение».",
        why="Словарь нужен, когда данные ищут по имени, а не по номеру: студент по ID, "
            "настройка по названию. Поиск по ключу мгновенный, в отличие от перебора списка.",
        ex="""student = dict(name="Aida", group="SE-2401")
print(student["name"])   # → Aida

# то же самое короче:
student = {"name": "Aida", "group": "SE-2401"}""",
    ),
    "set()": dict(
        sig="set(iterable)",
        what="Создаёт множество — набор уникальных элементов без порядка.",
        why="Главный приём: убрать дубликаты одной строкой. Плюс быстрые операции "
            "пересечения и разности и мгновенная проверка «есть ли элемент».",
        ex="""nums = [1, 2, 2, 3, 3, 3]
print(set(nums))        # → {1, 2, 3}
print(len(set(nums)))   # → 3  (сколько разных)
print(2 in set(nums))   # → True""",
    ),
    "tuple()": dict(
        sig="tuple(iterable)",
        what="Создаёт кортеж — список, который нельзя менять.",
        why="Берут там, где набор значений менять нельзя: координаты, размер массива, "
            "запись из базы. Кортеж можно положить ключом в словарь, список — нельзя.",
        ex="""point = (10, 20)
x, y = point
print(x + y)      # → 30
# point[0] = 5 — TypeError, кортеж неизменяемый""",
    ),
    "input()": dict(
        sig="input(prompt='')",
        what="Читает строку, введённую пользователем.",
        why="Всегда возвращает строку, даже если ввели число, — почти всегда оборачивают "
            "в int() или float().",
        ex="""age = int(input("Сколько тебе лет? "))
print(age + 1)   # если ввели 19 → 20""",
    ),
    "range()": dict(
        sig="range(stop) / range(start, stop, step)",
        what="Последовательность целых чисел.",
        why="Основа цикла, когда нужно повторить N раз или пройти по индексам. "
            "Правый край не входит: range(5) — это 0..4.",
        ex="""for i in range(3):
    print(i)      # → 0, 1, 2

print(list(range(2, 11, 3)))   # → [2, 5, 8]
print(list(range(5, 0, -1)))   # → [5, 4, 3, 2, 1]""",
    ),
    "enumerate()": dict(
        sig="enumerate(iterable, start=0)",
        what="Итерация сразу с индексом и значением.",
        why="Заменяет некрасивое for i in range(len(seq)). Параметр start удобен для "
            "нумерации с единицы в отчётах.",
        ex="""names = ["Aida", "Bek", "Dana"]
for i, name in enumerate(names, start=1):
    print(i, name)
# → 1 Aida
# → 2 Bek
# → 3 Dana""",
    ),
    "zip()": dict(
        sig="zip(a, b, ...)",
        what="Идёт по нескольким последовательностям одновременно.",
        why="Когда данные лежат в параллельных списках (имена отдельно, оценки отдельно). "
            "Останавливается по самому короткому из них.",
        ex="""names = ["Aida", "Bek"]
scores = [87, 74]
for name, score in zip(names, scores):
    print(name, score)
# → Aida 87
# → Bek 74

print(dict(zip(names, scores)))   # → {'Aida': 87, 'Bek': 74}""",
    ),
    "map()": dict(
        sig="map(func, iterable)",
        what="Применяет функцию к каждому элементу.",
        why="Типовой случай — превратить список строк из файла в числа одной строкой. "
            "Результат ленивый, для печати оборачивают в list().",
        ex="""raw = ["10", "20", "30"]
nums = list(map(int, raw))
print(nums)        # → [10, 20, 30]
print(sum(nums))   # → 60""",
    ),
    "filter()": dict(
        sig="filter(func, iterable)",
        what="Оставляет только элементы, для которых функция вернула True.",
        why="Отбор по условию без цикла с if. Часто заменяют списковым включением — "
            "[x for x in nums if x > 80] читается понятнее.",
        ex="""scores = [87, 45, 92, 60]
passed = list(filter(lambda s: s >= 60, scores))
print(passed)   # → [87, 92, 60]""",
    ),
    "sorted()": dict(
        sig="sorted(iterable, key=None, reverse=False)",
        what="Возвращает новый отсортированный список.",
        why="В отличие от .sort() не портит исходный список. key задаёт, по чему сортировать: "
            "по второму элементу пары, по длине строки, по оценке студента.",
        ex="""scores = [("Aida", 87), ("Bek", 74), ("Dana", 95)]
print(sorted(scores, key=lambda s: s[1], reverse=True))
# → [('Dana', 95), ('Aida', 87), ('Bek', 74)]""",
    ),
    "sum()": dict(
        sig="sum(iterable, start=0)",
        what="Сумма элементов последовательности.",
        why="Вместе с len() даёт средний балл в одну строку — самая частая операция в заданиях курса.",
        ex="""grades = [87, 74, 95]
print(sum(grades))                    # → 256
print(round(sum(grades) / len(grades), 2))   # → 85.33""",
    ),
    "min()": dict(
        sig="min(iterable, key=None)",
        what="Минимальный элемент.",
        why="С key находит не само маленькое значение, а объект с самым маленьким полем — "
            "например студента с худшей оценкой.",
        ex="""grades = [87, 74, 95]
print(min(grades))   # → 74

students = [("Aida", 87), ("Bek", 74)]
print(min(students, key=lambda s: s[1]))   # → ('Bek', 74)""",
    ),
    "max()": dict(
        sig="max(iterable, key=None)",
        what="Максимальный элемент.",
        why="Зеркальный min(): лучший результат, самый длинный текст, самый большой файл.",
        ex="""grades = [87, 74, 95]
print(max(grades))   # → 95

words = ["дом", "программа", "код"]
print(max(words, key=len))   # → программа""",
    ),
    "round()": dict(
        sig="round(number, ndigits=0)",
        what="Округляет число до заданного числа знаков.",
        why="Без него средний балл выводится как 85.33333333333333. Учти банковское "
            "округление: round(2.5) даёт 2, а не 3.",
        ex="""print(round(85.3333, 2))   # → 85.33
print(round(85.3333))      # → 85
print(round(2.5))          # → 2  (округление к чётному!)""",
    ),
    "abs()": dict(
        sig="abs(x)",
        what="Модуль числа — значение без знака.",
        why="Когда важна величина отклонения, а не его сторона: насколько балл отличается от среднего.",
        ex="""print(abs(-7))        # → 7
print(abs(85 - 92))   # → 7""",
    ),
    "id()": dict(
        sig="id(obj)",
        what="Адрес объекта в памяти.",
        why="Учебный инструмент: показывает, что два имени указывают на один и тот же список — "
            "поэтому изменение через одно имя видно через второе.",
        ex="""a = [1, 2]
b = a
print(id(a) == id(b))   # → True  (один объект!)
b.append(3)
print(a)                # → [1, 2, 3]""",
    ),
    "next()": dict(
        sig="next(iterator, default)",
        what="Берёт следующий элемент итератора.",
        why="Главный приём при чтении CSV: next(reader) съедает строку заголовков, "
            "чтобы она не попала в данные.",
        ex="""nums = iter([10, 20, 30])
print(next(nums))   # → 10
print(next(nums))   # → 20""",
    ),
    "chr()": dict(
        sig="chr(code)",
        what="Символ по его коду Unicode.",
        why="Нужен в задачах на шифры и генерацию алфавита: chr(ord('a') + i).",
        ex="""print(chr(65))    # → A
print(chr(1040))  # → А  (кириллическая)""",
    ),
    "ord()": dict(
        sig="ord(char)",
        what="Код Unicode для символа.",
        why="Обратная к chr(). Пара chr/ord — основа шифра Цезаря и подсчёта букв алфавита.",
        ex="""print(ord("A"))   # → 65
print(ord("a") - ord("A"))   # → 32  (разница регистров)""",
    ),
    "isinstance()": dict(
        sig="isinstance(obj, type)",
        what="Проверяет, того ли типа объект.",
        why="Правильный способ проверки типа вместо type(x) == int: понимает наследование. "
            "Полезно при разборе JSON, где значение может быть числом, строкой или списком.",
        ex="""print(isinstance(5, int))          # → True
print(isinstance("5", (int, float)))  # → False""",
    ),
})

# --------------------------------------------------------------------------- #
#  os — папки, пути, обход дерева
# --------------------------------------------------------------------------- #

CMD.update({
    "os.getcwd()": dict(
        sig="os.getcwd()",
        what="Текущая рабочая директория — папка, относительно которой Python ищет файлы.",
        why="Первое, что проверяют, когда open('data.csv') не находит существующий файл: "
            "программа запущена не из той папки.",
        ex="""import os
print(os.getcwd())   # → C:\\Users\\Dias\\Desktop\\Aitu""",
    ),
    "os.chdir()": dict(
        sig="os.chdir(path)",
        what="Меняет текущую рабочую директорию.",
        why="Позволяет дальше работать короткими относительными путями. В скриптах "
            "надёжнее не менять папку, а строить полные пути через os.path.join.",
        ex="""import os
os.chdir("project")
print(os.getcwd())   # → ...\\project""",
    ),
    "os.listdir()": dict(
        sig="os.listdir(path='.')",
        what="Список имён файлов и папок внутри директории.",
        why="Первый шаг почти любой пакетной обработки: получить все файлы и отобрать нужные "
            "по расширению. Возвращает только имена, без пути.",
        ex="""import os
for name in os.listdir("."):
    if name.endswith(".csv"):
        print(name)   # → students.csv""",
    ),
    "os.mkdir()": dict(
        sig="os.mkdir(path)",
        what="Создаёт одну папку.",
        why="Упадёт с FileNotFoundError, если родительской папки нет, и с FileExistsError, "
            "если папка уже есть. Для вложенных путей берут os.makedirs.",
        ex="""import os
if not os.path.exists("results"):
    os.mkdir("results")""",
    ),
    "os.makedirs()": dict(
        sig="os.makedirs(path, exist_ok=False)",
        what="Создаёт папку вместе со всеми промежуточными.",
        why="Рабочая лошадка Assignment 1: создаёт project/data и project/results за один вызов. "
            "exist_ok=True — не падать, если папка уже существует.",
        ex="""import os
os.makedirs("project/data", exist_ok=True)
os.makedirs("project/results", exist_ok=True)""",
    ),
    "os.rmdir()": dict(
        sig="os.rmdir(path)",
        what="Удаляет пустую папку.",
        why="Работает только с пустой папкой — это защита от случайного удаления данных. "
            "Чтобы снести папку с содержимым, берут shutil.rmtree.",
        ex="""import os
os.rmdir("temp")   # если внутри что-то есть → OSError""",
    ),
    "os.remove()": dict(
        sig="os.remove(path)",
        what="Удаляет файл.",
        why="Восстановить нельзя — файл не уходит в корзину. Перед удалением проверяют "
            "существование через os.path.exists.",
        ex="""import os
if os.path.exists("temp.txt"):
    os.remove("temp.txt")""",
    ),
    "os.rename()": dict(
        sig="os.rename(src, dst)",
        what="Переименовывает или перемещает файл.",
        why="Массовое переименование файлов по шаблону: добавить дату, привести расширения к "
            "нижнему регистру, разложить по папкам.",
        ex="""import os
os.rename("report.txt", "report_2026.txt")""",
    ),
    "os.walk()": dict(
        sig="os.walk(top)",
        what="Рекурсивно обходит дерево папок, отдавая на каждом шаге (путь, папки, файлы).",
        why="Нужен, когда файлы лежат во вложенных папках на неизвестную глубину — например "
            "при упаковке всего проекта в архив.",
        ex="""import os
for folder, subfolders, files in os.walk("project"):
    for name in files:
        print(os.path.join(folder, name))
# → project\\data\\students.csv
# → project\\results\\report.json""",
    ),
    "os.stat()": dict(
        sig="os.stat(path)",
        what="Метаданные файла: размер, время изменения, права.",
        why="Размер в st_size и время последней правки в st_mtime — то, что просят вывести "
            "в задании про проверку report.json.",
        ex="""import os, time
info = os.stat("students.csv")
print(info.st_size, "байт")
print(time.ctime(info.st_mtime))   # → Tue Sep 23 17:56:10 2026""",
    ),
    "os.path.join()": dict(
        sig="os.path.join(a, b, ...)",
        what="Собирает путь из частей правильным для системы разделителем.",
        why="Единственный корректный способ склеивать пути: на Windows поставит \\, на Linux /. "
            "Строка 'data' + '/' + name сломается при переносе проекта.",
        ex="""import os
path = os.path.join("project", "data", "students.csv")
print(path)   # → project\\data\\students.csv  (на Windows)""",
    ),
    "os.path.exists()": dict(
        sig="os.path.exists(path)",
        what="Существует ли файл или папка.",
        why="Проверка перед записью: «файл уже есть — спросить подтверждение на перезапись», "
            "ровно как требует Assignment 1.",
        ex="""import os
if os.path.exists("report.json"):
    answer = input("Файл есть. Перезаписать? (y/n): ")""",
    ),
    "os.path.isfile()": dict(
        sig="os.path.isfile(path)",
        what="Это именно файл?",
        why="При переборе os.listdir приходят вперемешку файлы и папки — isfile отсеивает папки, "
            "чтобы не пытаться их открыть.",
        ex="""import os
files = [f for f in os.listdir(".") if os.path.isfile(f)]
print(files)""",
    ),
    "os.path.isdir()": dict(
        sig="os.path.isdir(path)",
        what="Это именно папка?",
        why="Зеркальный isfile: нужен при рекурсивном обходе, чтобы решить, спускаться ли внутрь.",
        ex="""import os
print(os.path.isdir("project"))   # → True""",
    ),
    "os.path.getsize()": dict(
        sig="os.path.getsize(path)",
        what="Размер файла в байтах.",
        why="Короткая замена os.stat().st_size. Чтобы получить килобайты, делят на 1024.",
        ex="""import os
size = os.path.getsize("students.csv")
print(round(size / 1024, 1), "КБ")""",
    ),
    "os.path.basename()": dict(
        sig="os.path.basename(path)",
        what="Имя файла без пути.",
        why="Из полного пути вытащить только имя — для вывода в отчёт или как имя внутри архива.",
        ex="""import os
print(os.path.basename("project/data/students.csv"))   # → students.csv""",
    ),
    "os.path.dirname()": dict(
        sig="os.path.dirname(path)",
        what="Путь без имени файла.",
        why="Узнать папку, в которой лежит файл, чтобы создать её или положить рядом результат.",
        ex="""import os
print(os.path.dirname("project/data/students.csv"))   # → project/data""",
    ),
    "os.path.splitext()": dict(
        sig="os.path.splitext(path)",
        what="Делит имя на основу и расширение.",
        why="Отобрать только .csv или сменить расширение: report.csv → report.json.",
        ex="""import os
name, ext = os.path.splitext("report.csv")
print(name, ext)        # → report .csv
print(name + ".json")   # → report.json""",
    ),
    "os.path.relpath()": dict(
        sig="os.path.relpath(path, start)",
        what="Путь относительно указанной папки.",
        why="Нужен при упаковке в ZIP: иначе внутри архива сохранится весь путь "
            "от диска C:, а не аккуратная структура project/data/...",
        ex="""import os
full = "C:/work/project/data/students.csv"
print(os.path.relpath(full, "C:/work"))   # → project\\data\\students.csv""",
    ),
    "os.path.abspath()": dict(
        sig="os.path.abspath(path)",
        what="Полный путь от корня диска.",
        why="Помогает понять, где Python на самом деле ищет файл, когда относительный путь не работает.",
        ex="""import os
print(os.path.abspath("students.csv"))
# → C:\\Users\\Dias\\Desktop\\Aitu\\students.csv""",
    ),
})

# --------------------------------------------------------------------------- #
#  pathlib — современная работа с путями
# --------------------------------------------------------------------------- #

CMD.update({
    "Path()": dict(
        sig="from pathlib import Path; Path('папка', 'файл')",
        what="Объект пути: путь как полноценный объект, а не строка.",
        why="Современная замена os.path. Пути склеиваются оператором /, а методы "
            "существования, создания и чтения лежат прямо на объекте — код короче и читается лучше.",
        ex="""from pathlib import Path

data = Path("project") / "data"
file = data / "students.csv"

print(file)          # → project\\data\\students.csv
print(file.name)     # → students.csv
print(file.suffix)   # → .csv
print(file.parent)   # → project\\data""",
    ),
})

# --------------------------------------------------------------------------- #
#  csv
# --------------------------------------------------------------------------- #

CMD.update({
    "csv.reader()": dict(
        sig="csv.reader(fileobj, delimiter=',')",
        what="Читает CSV построчно: каждая строка приходит списком значений.",
        why="Базовое чтение таблицы, когда колонки берут по индексу. Заголовок обычно "
            "пропускают через next(). Файл открывают с newline='', иначе на Windows "
            "появятся лишние пустые строки.",
        ex="""import csv
with open("students.csv", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)        # ['id', 'name', 'grade']
    for row in reader:
        print(row[1], row[2])    # → Aida 87""",
    ),
    "csv.DictReader()": dict(
        sig="csv.DictReader(fileobj)",
        what="Читает CSV так, что каждая строка — словарь по именам колонок.",
        why="Удобнее csv.reader: обращение row['grade'] вместо row[2], и код не ломается, "
            "если колонки поменяются местами. Заголовок пропускать не надо.",
        ex="""import csv
with open("students.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"], int(row["grade"]) + 1)
# → Aida 88""",
    ),
    "csv.writer()": dict(
        sig="csv.writer(fileobj, delimiter=',')",
        what="Пишет в CSV строки-списки.",
        why="Экспорт результатов. Сам расставит кавычки, если внутри значения попадётся "
            "запятая или перенос строки — руками через write() так не получится.",
        ex="""import csv
rows = [["id", "name"], [1, "Aida"], [2, "Bek"]]
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    csv.writer(f).writerows(rows)""",
    ),
    "csv.DictWriter()": dict(
        sig="csv.DictWriter(fileobj, fieldnames=[...])",
        what="Пишет в CSV словари; порядок колонок задаётся списком fieldnames.",
        why="Естественная пара к DictReader: прочитал словарями, посчитал, записал словарями. "
            "Перед данными обязательно вызвать writeheader().",
        ex="""import csv
rows = [{"name": "Aida", "avg": 85.3}, {"name": "Bek", "avg": 74.0}]
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["name", "avg"])
    w.writeheader()
    w.writerows(rows)""",
    ),
})

# --------------------------------------------------------------------------- #
#  json
# --------------------------------------------------------------------------- #

CMD.update({
    "json.dump()": dict(
        sig="json.dump(obj, fileobj, ensure_ascii=False, indent=2)",
        what="Записывает объект Python в файл в формате JSON.",
        why="Способ сохранить вложенную структуру — словарь со списками внутри, — которую "
            "в CSV не уложишь. ensure_ascii=False оставляет кириллицу читаемой, "
            "indent делает файл с отступами.",
        ex="""import json
report = {"group": "SE-2401", "students": [{"name": "Aida", "avg": 85.3}]}
with open("report.json", "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)""",
    ),
    "json.load()": dict(
        sig="json.load(fileobj)",
        what="Читает JSON из файла и превращает в объекты Python.",
        why="Обратная к dump. Объект JSON становится словарём, массив — списком, "
            "дальше работаешь обычным Python-кодом.",
        ex="""import json
with open("report.json", encoding="utf-8") as f:
    data = json.load(f)
print(data["students"][0]["name"])   # → Aida""",
    ),
    "json.dumps()": dict(
        sig="json.dumps(obj, ensure_ascii=False, indent=2)",
        what="Превращает объект Python в JSON-строку (без записи в файл).",
        why="Когда JSON нужен не в файле, а в переменной: отправить по сети, положить в лог "
            "или просто красиво напечатать структуру при отладке.",
        ex="""import json
print(json.dumps({"name": "Aida"}, ensure_ascii=False))
# → {"name": "Aida"}""",
    ),
    "json.loads()": dict(
        sig="json.loads(string)",
        what="Разбирает JSON-строку в объект Python.",
        why="Пара к dumps: данные пришли строкой (из интернета, из поля в базе) — "
            "loads превращает их в словарь.",
        ex="""import json
data = json.loads('{"name": "Aida", "grade": 87}')
print(data["grade"] + 1)   # → 88""",
    ),
})

# --------------------------------------------------------------------------- #
#  openpyxl — Excel
# --------------------------------------------------------------------------- #

CMD.update({
    "openpyxl.Workbook()": dict(
        sig="openpyxl.Workbook()",
        what="Создаёт новую пустую книгу Excel.",
        why="Отправная точка, когда .xlsx нужно сформировать с нуля. Один лист уже есть — "
            "он доступен как wb.active.",
        ex="""import openpyxl
wb = openpyxl.Workbook()
sheet = wb.active
sheet.title = "Оценки"
sheet.append(["Имя", "Балл"])
sheet.append(["Aida", 87])
wb.save("report.xlsx")""",
    ),
    "openpyxl.load_workbook()": dict(
        sig="openpyxl.load_workbook(path, data_only=False)",
        what="Открывает существующий .xlsx.",
        why="Нужен, чтобы дочитать или дополнить готовый отчёт. data_only=True вернёт "
            "посчитанные значения формул вместо самих формул.",
        ex="""import openpyxl
wb = openpyxl.load_workbook("report.xlsx")
sheet = wb.active
print(sheet["A1"].value)   # → Имя
print(sheet.max_row)       # → 2""",
    ),
    "Font()": dict(
        sig="from openpyxl.styles import Font; Font(bold=True, size=12, color='FF0000')",
        what="Стиль шрифта ячейки.",
        why="Выделить шапку таблицы жирным или подсветить красным тех, кто не сдал — "
            "отчёт становится читаемым.",
        ex="""from openpyxl.styles import Font
sheet["A1"].font = Font(bold=True, size=12)""",
    ),
    "Alignment()": dict(
        sig="from openpyxl.styles import Alignment; Alignment(horizontal='center')",
        what="Выравнивание содержимого ячейки.",
        why="Числа по центру, длинный текст с переносом (wrap_text=True) — иначе таблица "
            "выглядит неопрятно.",
        ex="""from openpyxl.styles import Alignment
sheet["A1"].alignment = Alignment(horizontal="center", wrap_text=True)""",
    ),
    "get_column_letter()": dict(
        sig="from openpyxl.utils import get_column_letter; get_column_letter(n)",
        what="Превращает номер колонки в букву Excel.",
        why="В цикле колонки нумеруются числами, а ширина задаётся по букве: "
            "sheet.column_dimensions['C'].width. Функция и переводит одно в другое.",
        ex="""from openpyxl.utils import get_column_letter
print(get_column_letter(1))    # → A
print(get_column_letter(28))   # → AB""",
    ),
})

# --------------------------------------------------------------------------- #
#  pandas
# --------------------------------------------------------------------------- #

CMD.update({
    "pd.DataFrame()": dict(
        sig="pd.DataFrame(data, columns=None)",
        what="Создаёт таблицу (DataFrame) из словаря, списка или массива.",
        why="Основная структура pandas: колонки с именами плюс индекс строк. "
            "Позволяет считать по колонкам без единого цикла.",
        ex="""import pandas as pd
df = pd.DataFrame({"name": ["Aida", "Bek"], "grade": [87, 74]})
print(df)
#    name  grade
# 0  Aida     87
# 1   Bek     74
print(df["grade"].mean())   # → 80.5""",
    ),
    "pd.read_csv()": dict(
        sig="pd.read_csv(path, sep=',', encoding='utf-8')",
        what="Читает CSV сразу в таблицу.",
        why="Заменяет десяток строк с csv.reader: типы колонок определяются сами, "
            "дальше доступны mean(), sort_values(), группировки.",
        ex="""import pandas as pd
df = pd.read_csv("students.csv")
print(df.shape)              # → (25, 3)  строк, колонок
print(df["grade"].mean())""",
    ),
    "pd.read_excel()": dict(
        sig="pd.read_excel(path, sheet_name=0)",
        what="Читает лист Excel в таблицу.",
        why="То же, что read_csv, но для .xlsx. sheet_name выбирает лист по имени или номеру; "
            "под капотом работает openpyxl.",
        ex="""import pandas as pd
df = pd.read_excel("report.xlsx", sheet_name="Оценки")
print(df.head())""",
    ),
    "pd.ExcelWriter()": dict(
        sig="pd.ExcelWriter(path, engine='openpyxl')",
        what="Позволяет записать несколько таблиц на разные листы одного файла.",
        why="Без него каждый to_excel перезаписывает файл целиком. Через ExcelWriter "
            "сдавшие и не сдавшие попадают на отдельные листы одной книги.",
        ex="""import pandas as pd
with pd.ExcelWriter("result.xlsx") as writer:
    passed.to_excel(writer, sheet_name="Сдали", index=False)
    failed.to_excel(writer, sheet_name="Не сдали", index=False)""",
    ),
})


# --------------------------------------------------------------------------- #
#  numpy — массивы
# --------------------------------------------------------------------------- #

CMD.update({
    "np.array()": dict(
        sig="np.array(object, dtype=None)",
        what="Создаёт массив NumPy из списка.",
        why="Массив, в отличие от списка, считает поэлементно и без циклов: arr * 2 умножит "
            "все элементы сразу. На нём держатся все вычисления в ИИ — картинки, признаки, веса.",
        ex="""import numpy as np
arr = np.array([1, 2, 3])
print(arr * 2)        # → [2 4 6]
print(arr + arr)      # → [2 4 6]
print(arr.shape)      # → (3,)
print(arr.dtype)      # → int64

matrix = np.array([[1, 2], [3, 4]])
print(matrix.shape)   # → (2, 2)""",
    ),
    "np.zeros()": dict(
        sig="np.zeros(shape, dtype=float)",
        what="Массив заданной формы, заполненный нулями.",
        why="Заготовка под результат: создаёшь пустую матрицу нужного размера и заполняешь "
            "в цикле. Ещё это чёрное изображение, если считать нули яркостью пикселей.",
        ex="""import numpy as np
print(np.zeros(3))         # → [0. 0. 0.]
print(np.zeros((2, 3)))
# → [[0. 0. 0.]
#    [0. 0. 0.]]""",
    ),
    "np.ones()": dict(
        sig="np.ones(shape, dtype=float)",
        what="Массив из единиц.",
        why="Нужен как нейтральный элемент для умножения и как маска «взять всё». "
            "np.ones((h, w)) * 255 даёт белое изображение.",
        ex="""import numpy as np
print(np.ones((2, 2)))
# → [[1. 1.]
#    [1. 1.]]""",
    ),
    "np.zeros_like()": dict(
        sig="np.zeros_like(a)",
        what="Массив нулей такой же формы и типа, как образец.",
        why="Удобнее, чем np.zeros(a.shape, a.dtype): форму и тип не надо выписывать руками "
            "и они точно совпадут с исходным массивом.",
        ex="""import numpy as np
img = np.array([[10, 20], [30, 40]])
blank = np.zeros_like(img)
print(blank)
# → [[0 0]
#    [0 0]]""",
    ),
    "np.eye()": dict(
        sig="np.eye(n)",
        what="Единичная матрица: единицы по диагонали, нули вокруг.",
        why="Нейтральный элемент матричного умножения: A @ I == A. Используется как "
            "стартовое значение и в one-hot кодировании меток классов.",
        ex="""import numpy as np
print(np.eye(3))
# → [[1. 0. 0.]
#    [0. 1. 0.]
#    [0. 0. 1.]]""",
    ),
    "np.arange()": dict(
        sig="np.arange(start, stop, step)",
        what="Массив чисел с шагом — как range, но сразу массив и с дробным шагом.",
        why="Быстро сделать ось значений или индексы. В отличие от range, шаг может быть "
            "дробным: np.arange(0, 1, 0.25).",
        ex="""import numpy as np
print(np.arange(5))            # → [0 1 2 3 4]
print(np.arange(0, 1, 0.25))   # → [0.   0.25 0.5  0.75]""",
    ),
    "np.linspace()": dict(
        sig="np.linspace(start, stop, num)",
        what="Заданное количество равномерных точек между двумя числами.",
        why="Когда важно именно число точек, а не шаг: 50 значений от 0 до 1 для графика. "
            "В отличие от arange, правый край включён.",
        ex="""import numpy as np
print(np.linspace(0, 1, 5))   # → [0.   0.25 0.5  0.75 1.  ]""",
    ),
    "np.mean()": dict(
        sig="np.mean(a, axis=None)",
        what="Среднее значение.",
        why="Без axis считает по всему массиву, с axis=0 — по колонкам, axis=1 — по строкам. "
            "Так одной строкой получают средний балл каждого студента.",
        ex="""import numpy as np
grades = np.array([[80, 90], [60, 70]])
print(np.mean(grades))           # → 75.0
print(np.mean(grades, axis=1))   # → [85. 65.]  по студентам
print(np.mean(grades, axis=0))   # → [70. 80.]  по предметам""",
    ),
    "np.nanmean()": dict(
        sig="np.nanmean(a, axis=None)",
        what="Среднее, игнорирующее пропуски NaN.",
        why="В реальных данных бывают пробелы. Обычный mean от NaN вернёт NaN и испортит "
            "весь результат, nanmean честно посчитает по имеющимся значениям.",
        ex="""import numpy as np
data = np.array([80.0, np.nan, 100.0])
print(np.mean(data))      # → nan
print(np.nanmean(data))   # → 90.0""",
    ),
    "np.max()": dict(
        sig="np.max(a, axis=None)",
        what="Максимальное значение массива.",
        why="Нужен для нормализации: делят на максимум, чтобы уложить значения в диапазон 0..1.",
        ex="""import numpy as np
a = np.array([3, 17, 8])
print(np.max(a))          # → 17
print(a / np.max(a))      # → [0.176 1.    0.471]""",
    ),
    "np.argmax()": dict(
        sig="np.argmax(a, axis=None)",
        what="Индекс максимального элемента, а не сам элемент.",
        why="Так модель выбирает ответ: на выходе вероятности классов, argmax даёт номер "
            "самого вероятного.",
        ex="""import numpy as np
probs = np.array([0.1, 0.7, 0.2])
print(np.argmax(probs))   # → 1  (второй класс самый вероятный)""",
    ),
    "np.argsort()": dict(
        sig="np.argsort(a)",
        what="Индексы, которые отсортировали бы массив.",
        why="Нужен, чтобы по оценкам упорядочить имена: сортируешь один массив, а порядок "
            "применяешь к другому. Топ-3 — это argsort(...)[::-1][:3].",
        ex="""import numpy as np
scores = np.array([70, 95, 85])
order = np.argsort(scores)[::-1]
print(order)           # → [1 2 0]
print(scores[order])   # → [95 85 70]""",
    ),
    "np.where()": dict(
        sig="np.where(condition, x, y)",
        what="Выбор по условию поэлементно: где True — берём из x, где False — из y.",
        why="Заменяет цикл с if по всему массиву. С одним аргументом возвращает индексы "
            "элементов, удовлетворяющих условию.",
        ex="""import numpy as np
scores = np.array([45, 87, 60])
print(np.where(scores >= 60, "сдал", "не сдал"))
# → ['не сдал' 'сдал' 'сдал']
print(np.where(scores >= 60))   # → (array([1, 2]),)  индексы""",
    ),
    "np.nonzero()": dict(
        sig="np.nonzero(a)",
        what="Индексы ненулевых элементов.",
        why="Со сравнением даёт номера строк, подходящих под условие: где оценка выставлена, "
            "где пиксель не чёрный.",
        ex="""import numpy as np
a = np.array([0, 5, 0, 9])
print(np.nonzero(a))      # → (array([1, 3]),)
print(a[np.nonzero(a)])   # → [5 9]""",
    ),
    "np.clip()": dict(
        sig="np.clip(a, min, max)",
        what="Обрезает значения в заданный диапазон.",
        why="Обязателен при работе с изображениями: после осветления значения вылезают за 255, "
            "и без clip картинка испортится переполнением.",
        ex="""import numpy as np
img = np.array([100, 250, 300])
print(np.clip(img + 50, 0, 255))   # → [150 255 255]""",
    ),
    "np.round()": dict(
        sig="np.round(a, decimals=0)",
        what="Округляет весь массив поэлементно.",
        why="Привести средние баллы к двум знакам перед выводом — одной строкой вместо цикла.",
        ex="""import numpy as np
a = np.array([85.3333, 74.6666])
print(np.round(a, 2))   # → [85.33 74.67]""",
    ),
    "np.sqrt()": dict(
        sig="np.sqrt(a)",
        what="Квадратный корень поэлементно.",
        why="Часть формулы стандартного отклонения и евклидова расстояния — "
            "базовой метрики близости в машинном обучении.",
        ex="""import numpy as np
print(np.sqrt(np.array([4, 9, 16])))   # → [2. 3. 4.]""",
    ),
    "np.divide()": dict(
        sig="np.divide(a, b, out=None, where=None)",
        what="Поэлементное деление с защитой от деления на ноль.",
        why="Обычное a / b на нуле даёт предупреждение и NaN. Через where=(b != 0) и out "
            "делят только там, где знаменатель ненулевой, — приём для нормализации разреженных данных.",
        ex="""import numpy as np
a = np.array([10.0, 20.0])
b = np.array([2.0, 0.0])
res = np.divide(a, b, out=np.zeros_like(a), where=(b != 0))
print(res)   # → [5. 0.]  вместо inf""",
    ),
    "np.array_equal()": dict(
        sig="np.array_equal(a, b)",
        what="Сравнивает два массива целиком и возвращает один True/False.",
        why="Обычное a == b даёт массив булевых значений, который нельзя поставить в if. "
            "array_equal даёт один ответ — удобно для проверки, что сохранённое совпало с исходным.",
        ex="""import numpy as np
a = np.array([1, 2, 3])
print(a == a)                  # → [ True  True  True]
print(np.array_equal(a, a))    # → True""",
    ),
    "np.stack()": dict(
        sig="np.stack(arrays, axis=0)",
        what="Складывает несколько массивов в один, добавляя новую ось.",
        why="Так из отдельных картинок собирают батч для модели: 32 изображения 28×28 "
            "превращаются в массив (32, 28, 28).",
        ex="""import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
print(np.stack([a, b]))
# → [[1 2]
#    [3 4]]
print(np.stack([a, b]).shape)   # → (2, 2)""",
    ),
    "np.expand_dims()": dict(
        sig="np.expand_dims(a, axis)",
        what="Добавляет в массив новую ось размером 1.",
        why="Модели ждут вход с осью батча. Одну картинку (28, 28) превращают в (1, 28, 28), "
            "иначе предсказание не примет её на вход.",
        ex="""import numpy as np
img = np.zeros((28, 28))
print(img.shape)                          # → (28, 28)
print(np.expand_dims(img, axis=0).shape)  # → (1, 28, 28)""",
    ),
    "np.save()": dict(
        sig="np.save(path, arr)",
        what="Сохраняет массив в двоичный файл .npy.",
        why="Быстрее и точнее, чем CSV: сохраняются тип и форма, дробные значения не теряют "
            "точность, файл занимает меньше места.",
        ex="""import numpy as np
arr = np.arange(5)
np.save("data.npy", arr)   # создаст data.npy""",
    ),
    "np.load()": dict(
        sig="np.load(path)",
        what="Загружает массив из .npy.",
        why="Пара к save: массив возвращается ровно таким, каким был, — с той же формой и типом.",
        ex="""import numpy as np
arr = np.load("data.npy")
print(arr)   # → [0 1 2 3 4]""",
    ),
    "np.random.seed()": dict(
        sig="np.random.seed(n)",
        what="Фиксирует генератор случайных чисел.",
        why="После seed «случайные» числа одинаковы при каждом запуске. Без этого результат "
            "эксперимента невозможно повторить и сравнить.",
        ex="""import numpy as np
np.random.seed(42)
print(np.random.rand(2))   # всегда → [0.37454012 0.95071431]""",
    ),
    "np.random.rand()": dict(
        sig="np.random.rand(d0, d1, ...)",
        what="Массив случайных чисел от 0 до 1.",
        why="Быстро сгенерировать тестовые данные, когда настоящих ещё нет, "
            "или задать стартовые веса модели.",
        ex="""import numpy as np
np.random.seed(0)
print(np.random.rand(3))   # → [0.5488 0.7152 0.6028]""",
    ),
    "np.random.default_rng()": dict(
        sig="np.random.default_rng(seed=None)",
        what="Современный генератор случайных чисел NumPy.",
        why="Рекомендуемая замена np.random.seed: у каждого генератора своё состояние, "
            "поэтому разные части программы не мешают друг другу.",
        ex="""import numpy as np
rng = np.random.default_rng(42)
print(rng.integers(0, 10, size=5))   # → [0 7 6 4 4]""",
    ),
})

# --------------------------------------------------------------------------- #
#  matplotlib
# --------------------------------------------------------------------------- #

CMD.update({
    "plt.imshow()": dict(
        sig="plt.imshow(array, cmap=None)",
        what="Показывает изображение или двумерный массив как картинку.",
        why="Главный способ увидеть, что происходит с массивом: проверить результат фильтра, "
            "посмотреть на маску. Для одноканальных данных нужен cmap='gray'.",
        ex="""import matplotlib.pyplot as plt
import numpy as np
img = np.zeros((4, 4))
img[1:3, 1:3] = 1
plt.imshow(img, cmap="gray")
plt.show()""",
    ),
    "plt.imread()": dict(
        sig="plt.imread(path)",
        what="Читает файл изображения в массив NumPy.",
        why="Показывает главную мысль темы: картинка — это обычный массив чисел "
            "формы (высота, ширина, каналы), с которым работают как с любыми данными.",
        ex="""import matplotlib.pyplot as plt
img = plt.imread("photo.jpg")
print(img.shape)   # → (480, 640, 3)  высота, ширина, RGB""",
    ),
    "plt.show()": dict(
        sig="plt.show()",
        what="Отрисовывает подготовленный график.",
        why="До show команды только накапливают рисунок. В Jupyter часто срабатывает и без "
            "него, но в обычном скрипте без show окно не появится.",
        ex="""import matplotlib.pyplot as plt
plt.plot([1, 4, 9])
plt.show()""",
    ),
    "plt.figure()": dict(
        sig="plt.figure(figsize=(w, h))",
        what="Создаёт новое полотно заданного размера.",
        why="Размер по умолчанию мелкий. figsize задаёт размер в дюймах — нужен, чтобы "
            "картинка в отчёте была читаемой.",
        ex="""import matplotlib.pyplot as plt
plt.figure(figsize=(8, 4))
plt.plot([1, 4, 9])
plt.show()""",
    ),
    "plt.subplot()": dict(
        sig="plt.subplot(rows, cols, index)",
        what="Переключается на одну ячейку сетки графиков.",
        why="Показать оригинал и обработанную картинку рядом — так сразу видно, "
            "что сделал фильтр. Нумерация с единицы, слева направо.",
        ex="""import matplotlib.pyplot as plt
plt.subplot(1, 2, 1)
plt.imshow(img)
plt.title("Оригинал")

plt.subplot(1, 2, 2)
plt.imshow(img_gray, cmap="gray")
plt.title("Ч/б")
plt.show()""",
    ),
    "plt.subplots()": dict(
        sig="fig, axes = plt.subplots(rows, cols, figsize=(w, h))",
        what="Создаёт сразу всю сетку графиков и возвращает объекты осей.",
        why="Удобнее plt.subplot: оси лежат в массиве, по ним можно пройти циклом — "
            "так рисуют десяток изображений подряд.",
        ex="""import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 3, figsize=(9, 3))
for ax, img in zip(axes, images):
    ax.imshow(img)
    ax.axis("off")
plt.show()""",
    ),
    "plt.title()": dict(
        sig="plt.title(text)",
        what="Заголовок текущего графика.",
        why="Без подписи в сетке из нескольких картинок непонятно, где что. "
            "Часто в заголовок выводят параметр: plt.title(f'яркость +{k}').",
        ex="""import matplotlib.pyplot as plt
plt.imshow(img)
plt.title("Исходное изображение")
plt.show()""",
    ),
    "plt.axis()": dict(
        sig="plt.axis('off') / plt.axis([x0, x1, y0, y1])",
        what="Настройка осей графика.",
        why="Для картинок почти всегда пишут plt.axis('off') — номера пикселей по краям "
            "только мешают смотреть.",
        ex="""import matplotlib.pyplot as plt
plt.imshow(img)
plt.axis("off")
plt.show()""",
    ),
})

# --------------------------------------------------------------------------- #
#  Архивы
# --------------------------------------------------------------------------- #

CMD.update({
    "zipfile.ZipFile()": dict(
        sig="zipfile.ZipFile(path, mode='r', compression=zipfile.ZIP_DEFLATED)",
        what="Открывает или создаёт ZIP-архив.",
        why="Готовый бэкап проекта одним файлом. Режим 'w' создаёт новый архив, 'a' дописывает, "
            "'r' читает. Без compression файлы кладутся без сжатия.",
        ex="""import zipfile
with zipfile.ZipFile("backup.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    zf.write("students.csv")
    zf.write("report.json")

with zipfile.ZipFile("backup.zip") as zf:
    print(zf.namelist())   # → ['students.csv', 'report.json']""",
    ),
    "tarfile.open()": dict(
        sig="tarfile.open(path, mode='r') / mode='w:gz'",
        what="Открывает или создаёт архив .tar или .tar.gz.",
        why="Стандарт для Linux и для датасетов. Режим 'w:gz' создаёт сжатый архив, "
            "'w' — просто склейку файлов без сжатия.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz", "w:gz") as tar:
    tar.add("project")

with tarfile.open("backup.tar.gz") as tar:
    print(tar.getnames())""",
    ),
})

# --------------------------------------------------------------------------- #
#  itertools, collections, math, random, Pillow
# --------------------------------------------------------------------------- #

CMD.update({
    "it.permutations()": dict(
        sig="itertools.permutations(iterable, r=None)",
        what="Все перестановки элементов — порядок важен.",
        why="Перебор вариантов расстановки: сколько способов рассадить студентов, "
            "в каком порядке обойти города.",
        ex="""import itertools as it
print(list(it.permutations("ABC", 2)))
# → [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]""",
    ),
    "it.combinations()": dict(
        sig="itertools.combinations(iterable, r)",
        what="Все сочетания длины r — порядок не важен.",
        why="Когда AB и BA — одно и то же: выбрать пару студентов в команду, "
            "перебрать пары признаков.",
        ex="""import itertools as it
print(list(it.combinations("ABC", 2)))
# → [('A','B'), ('A','C'), ('B','C')]""",
    ),
    "it.combinations_with_replacement()": dict(
        sig="itertools.combinations_with_replacement(iterable, r)",
        what="Сочетания, в которых элемент можно брать повторно.",
        why="Задачи, где выбор не исчерпывает запас: какие суммы дают два броска кубика, "
            "сколько наборов из повторяющихся товаров.",
        ex="""import itertools as it
print(list(it.combinations_with_replacement("AB", 2)))
# → [('A','A'), ('A','B'), ('B','B')]""",
    ),
    "it.product()": dict(
        sig="itertools.product(a, b, repeat=1)",
        what="Декартово произведение — все пары «каждый с каждым».",
        why="Заменяет вложенные циклы. Перебор всех комбинаций параметров модели — "
            "ровно этот случай.",
        ex="""import itertools as it
print(list(it.product([1, 2], "AB")))
# → [(1,'A'), (1,'B'), (2,'A'), (2,'B')]""",
    ),
    "it.chain()": dict(
        sig="itertools.chain(a, b, ...)",
        what="Склеивает несколько последовательностей в одну.",
        why="Пройти по нескольким спискам одним циклом, не создавая их объединённую копию в памяти.",
        ex="""import itertools as it
print(list(it.chain([1, 2], [3], [4, 5])))   # → [1, 2, 3, 4, 5]""",
    ),
    "Counter()": dict(
        sig="from collections import Counter; Counter(iterable)",
        what="Счётчик: сразу считает, сколько раз встретился каждый элемент.",
        why="Заменяет ручной словарь с проверкой «если ключа нет — создать». "
            "Подсчёт голосов, частота слов в тексте, распределение оценок — всё одной строкой.",
        ex="""from collections import Counter
votes = ["Aida", "Bek", "Aida", "Aida", "Bek"]
c = Counter(votes)
print(c)                  # → Counter({'Aida': 3, 'Bek': 2})
print(c.most_common(1))   # → [('Aida', 3)]""",
    ),
    "math.sqrt()": dict(
        sig="math.sqrt(x)",
        what="Квадратный корень одного числа.",
        why="Для скалярных вычислений. Для массива берут np.sqrt — math.sqrt массив не примет.",
        ex="""import math
print(math.sqrt(16))   # → 4.0""",
    ),
    "random.randint()": dict(
        sig="random.randint(a, b)",
        what="Случайное целое от a до b включительно.",
        why="Сгенерировать тестовые данные, когда настоящих нет. В отличие от range, "
            "правая граница входит в диапазон.",
        ex="""import random
random.seed(1)
print(random.randint(1, 6))   # → случайное число от 1 до 6""",
    ),
    "Fraction()": dict(
        sig="from fractions import Fraction; Fraction(a, b)",
        what="Точная обыкновенная дробь вместо приблизительного float.",
        why="Показывает проблему float: 0.1 + 0.2 != 0.3. Дроби считаются точно "
            "и сами сокращаются.",
        ex="""from fractions import Fraction
print(0.1 + 0.2)                            # → 0.30000000000000004
print(Fraction(1, 10) + Fraction(2, 10))    # → 3/10""",
    ),
    "Decimal()": dict(
        sig="from decimal import Decimal; Decimal('1.10')",
        what="Десятичное число с контролируемой точностью.",
        why="Стандарт для денег: у float 1.10 + 2.20 даёт 3.3000000000000003, "
            "у Decimal — ровно 3.30. Создавать нужно из строки, не из float.",
        ex="""from decimal import Decimal
print(1.10 + 2.20)                          # → 3.3000000000000003
print(Decimal("1.10") + Decimal("2.20"))    # → 3.30""",
    ),
    "Image.open()": dict(
        sig="from PIL import Image; Image.open(path)",
        what="Открывает изображение библиотекой Pillow.",
        why="Pillow умеет то, чего нет у matplotlib: менять размер, поворачивать, "
            "конвертировать форматы. Дальше картинку превращают в массив через np.array(img).",
        ex="""from PIL import Image
import numpy as np

img = Image.open("photo.jpg")
print(img.size)                 # → (640, 480)
small = img.resize((64, 64))
print(np.array(small).shape)    # → (64, 64, 3)""",
    ),
})

# --------------------------------------------------------------------------- #
#  Методы объектов
# --------------------------------------------------------------------------- #

CMD.update({
    # файлы
    ".read()": dict(
        sig="file.read(size=-1)",
        what="Читает файл целиком в одну строку.",
        why="Годится для небольших файлов. Для огромных берут построчный цикл, "
            "иначе весь файл окажется в памяти.",
        ex="""with open("log.txt", encoding="utf-8") as f:
    text = f.read()
print(len(text), "символов")""",
    ),
    ".readline()": dict(
        sig="file.readline()",
        what="Читает одну строку из файла.",
        why="Когда нужна только первая строка — например заголовок CSV — "
            "и остальной файл читать незачем.",
        ex="""with open("students.csv", encoding="utf-8") as f:
    header = f.readline()
print(header.strip())   # → id,name,grade""",
    ),
    ".readlines()": dict(
        sig="file.readlines()",
        what="Читает все строки в список.",
        why="Удобно, когда нужен доступ по индексу или len(). Символы переноса остаются "
            "в конце каждой строки — их снимают через strip().",
        ex="""with open("log.txt", encoding="utf-8") as f:
    lines = f.readlines()
print(len(lines), "строк")
print(lines[0].strip())""",
    ),
    ".write()": dict(
        sig="file.write(text) / zipfile.write(path)",
        what="Записывает строку в файл; у ZipFile — добавляет файл в архив.",
        why="Перенос строки не ставится сам — его пишут явно через \\n. "
            "Число перед записью надо превратить в строку через str().",
        ex="""with open("out.txt", "w", encoding="utf-8") as f:
    f.write("первая строка\\n")
    f.write("вторая строка\\n")""",
    ),
    ".writelines()": dict(
        sig="file.writelines(list_of_str)",
        what="Записывает список строк подряд.",
        why="Быстрее цикла с write. Переносы строк не добавляются — их включают в сами строки.",
        ex="""lines = ["a\\n", "b\\n"]
with open("out.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)""",
    ),
    ".close()": dict(
        sig="file.close()",
        what="Закрывает файл.",
        why="Без закрытия данные могут остаться в буфере и не дойти до диска. "
            "При работе через with вызывается автоматически — это и есть главный аргумент за with.",
        ex="""f = open("out.txt", "w", encoding="utf-8")
f.write("данные")
f.close()   # с with эта строка не нужна""",
    ),
    ".seek()": dict(
        sig="file.seek(offset)",
        what="Перемещает позицию чтения внутри файла.",
        why="После read() курсор стоит в конце и повторное чтение вернёт пустоту. "
            "seek(0) отматывает в начало.",
        ex="""with open("log.txt", encoding="utf-8") as f:
    print(len(f.read()))   # → 42
    f.seek(0)
    print(len(f.read()))   # → 42 снова""",
    ),
    # строки
    ".strip()": dict(
        sig="s.strip(chars=None)",
        what="Убирает пробелы и переводы строк по краям.",
        why="Обязателен при чтении файла: иначе в конце каждой строки останется \\n "
            "и сравнение с образцом не сработает.",
        ex="""line = "  Aida\\n"
print(repr(line.strip()))     # → 'Aida'
print("1,2,".strip(","))      # → 1,2""",
    ),
    ".split()": dict(
        sig="s.split(sep=None, maxsplit=-1)",
        what="Разбивает строку на список по разделителю.",
        why="Ручной разбор CSV и текста на слова. Без аргумента режет по любым пробелам "
            "и сразу выкидывает пустые куски.",
        ex="""print("1,Aida,87".split(","))   # → ['1', 'Aida', '87']
print("раз  два три".split())   # → ['раз', 'два', 'три']""",
    ),
    ".join()": dict(
        sig="sep.join(list_of_str)",
        what="Склеивает список строк через разделитель.",
        why="Обратная к split. Вызывается у разделителя, а не у списка, — "
            "это сбивает с толку в начале. Элементы должны быть строками.",
        ex="""names = ["Aida", "Bek"]
print(", ".join(names))   # → Aida, Bek
print("-".join("abc"))    # → a-b-c""",
    ),
    ".replace()": dict(
        sig="s.replace(old, new, count=-1)",
        what="Заменяет все вхождения подстроки.",
        why="Основа задания про запрещённые слова. Строка не меняется на месте — "
            "результат надо присвоить обратно.",
        ex="""text = "плохое слово тут"
text = text.replace("плохое", "****")
print(text)   # → **** слово тут""",
    ),
    ".lower()": dict(
        sig="s.lower()",
        what="Приводит строку к нижнему регистру.",
        why="Стандартный приём для сравнения без учёта регистра: EXAM, Exam и exam "
            "становятся одинаковыми.",
        ex="""print("ExAm".lower())                      # → exam
print("Aida".lower() == "AIDA".lower())    # → True""",
    ),
    ".upper()": dict(
        sig="s.upper()",
        what="Приводит строку к верхнему регистру.",
        why="Для вывода заголовков и кодов групп в едином виде.",
        ex="""print("se-2401".upper())   # → SE-2401""",
    ),
    ".title()": dict(
        sig="s.title()",
        what="Делает первую букву каждого слова заглавной.",
        why="Приведение имён из файла к аккуратному виду: 'aida nurlan' → 'Aida Nurlan'.",
        ex="""print("aida nurlan".title())   # → Aida Nurlan""",
    ),
    ".splitlines()": dict(
        sig="s.splitlines()",
        what="Разбивает текст на строки.",
        why="Надёжнее split('\\n'): понимает и \\r\\n из файлов Windows, "
            "и не оставляет пустой элемент в конце.",
        ex="""text = "первая\\nвторая\\n"
print(text.splitlines())   # → ['первая', 'вторая']""",
    ),
    ".ljust()": dict(
        sig="s.ljust(width, fillchar=' ')",
        what="Дополняет строку справа до нужной ширины.",
        why="Ровные колонки в консольном отчёте без сторонних библиотек: "
            "имя занимает 15 знаков, дальше идёт оценка.",
        ex="""print("Aida".ljust(10) + "87")
print("Bekzat".ljust(10) + "74")
# → Aida      87
# → Bekzat    74""",
    ),
    ".rjust()": dict(
        sig="s.rjust(width, fillchar=' ')",
        what="Дополняет строку слева.",
        why="Числа выравнивают по правому краю — так столбец цифр читается как в таблице.",
        ex="""print(str(87).rjust(5))    # → '   87'
print(str(7).rjust(5, "0"))  # → 00007""",
    ),
    ".startswith()": dict(
        sig="s.startswith(prefix)",
        what="Начинается ли строка с подстроки.",
        why="Отбор строк лога по уровню, файлов по префиксу имени. Читается лучше, чем s[:5] == '...'.",
        ex="""print("ERROR: fail".startswith("ERROR"))   # → True""",
    ),
    ".endswith()": dict(
        sig="s.endswith(suffix)",
        what="Заканчивается ли строка подстрокой.",
        why="Главный способ отобрать файлы по расширению при обходе папки.",
        ex="""files = ["a.csv", "b.txt", "c.csv"]
print([f for f in files if f.endswith(".csv")])   # → ['a.csv', 'c.csv']""",
    ),
    # списки, множества, словари
    ".append()": dict(
        sig="list.append(x)",
        what="Добавляет один элемент в конец списка.",
        why="Основной способ накапливать результат в цикле: создают пустой список "
            "и дописывают в него. Возвращает None — присваивать результат нельзя.",
        ex="""result = []
for i in range(3):
    result.append(i * i)
print(result)   # → [0, 1, 4]""",
    ),
    ".extend()": dict(
        sig="list.extend(iterable)",
        what="Добавляет в список все элементы другой последовательности.",
        why="Отличие от append: append положит список целиком одним элементом, "
            "extend высыпет его содержимое.",
        ex="""a = [1, 2]
a.append([3, 4])
print(a)          # → [1, 2, [3, 4]]

b = [1, 2]
b.extend([3, 4])
print(b)          # → [1, 2, 3, 4]""",
    ),
    ".insert()": dict(
        sig="list.insert(index, x)",
        what="Вставляет элемент на указанную позицию.",
        why="Когда порядок важен: добавить строку заголовка в начало готового списка строк.",
        ex="""rows = ["Aida,87"]
rows.insert(0, "name,grade")
print(rows)   # → ['name,grade', 'Aida,87']""",
    ),
    ".pop()": dict(
        sig="list.pop(index=-1) / dict.pop(key, default)",
        what="Удаляет элемент и возвращает его значение.",
        why="У списка без аргумента снимает последний. У словаря удаляет по ключу — "
            "так убирают лишнее поле перед записью в JSON.",
        ex="""nums = [1, 2, 3]
print(nums.pop())    # → 3
print(nums)          # → [1, 2]

student = {"name": "Aida", "temp": 1}
student.pop("temp")
print(student)       # → {'name': 'Aida'}""",
    ),
    ".remove()": dict(
        sig="list.remove(x) / set.remove(x)",
        what="Удаляет элемент по значению.",
        why="Удаляет только первое вхождение. Если элемента нет — ошибка, "
            "поэтому для множеств чаще берут discard.",
        ex="""nums = [1, 2, 3, 2]
nums.remove(2)
print(nums)   # → [1, 3, 2]""",
    ),
    ".add()": dict(
        sig="set.add(x)",
        what="Добавляет элемент в множество.",
        why="Аналог append для множеств. Повтор просто игнорируется — "
            "на этом строят сбор уникальных значений.",
        ex="""s = {1, 2}
s.add(3)
s.add(2)      # уже есть — ничего не изменится
print(s)      # → {1, 2, 3}""",
    ),
    ".discard()": dict(
        sig="set.discard(x)",
        what="Удаляет элемент из множества, если он там есть.",
        why="В отличие от remove не падает, когда элемента нет, — "
            "не нужен предварительный if.",
        ex="""s = {1, 2}
s.discard(5)   # молча ничего не делает
print(s)       # → {1, 2}""",
    ),
    ".update()": dict(
        sig="set.update(iterable) / dict.update(other)",
        what="Добавляет сразу несколько элементов или пар ключ-значение.",
        why="Множественная версия add. У словаря обновляет существующие ключи "
            "и добавляет новые — так накладывают настройки поверх значений по умолчанию.",
        ex="""s = {1}
s.update([2, 3])
print(s)                # → {1, 2, 3}

cfg = {"lr": 0.01}
cfg.update({"lr": 0.1, "epochs": 5})
print(cfg)              # → {'lr': 0.1, 'epochs': 5}""",
    ),
    ".get()": dict(
        sig="dict.get(key, default=None)",
        what="Значение по ключу; если ключа нет — запасное значение вместо ошибки.",
        why="Спасает от KeyError при разборе JSON, где поле может отсутствовать.",
        ex="""student = {"name": "Aida"}
print(student.get("grade"))       # → None
print(student.get("grade", 0))    # → 0
# student["grade"] → KeyError""",
    ),
    ".items()": dict(
        sig="dict.items()",
        what="Пары (ключ, значение) для перебора словаря.",
        why="Стандартный способ пройти по словарю, получая сразу и ключ, и значение.",
        ex="""grades = {"Aida": 87, "Bek": 74}
for name, score in grades.items():
    print(name, score)
# → Aida 87
# → Bek 74""",
    ),
    ".keys()": dict(
        sig="dict.keys()",
        what="Все ключи словаря.",
        why="Нужен, когда важны только имена полей: сравнить структуру двух записей, "
            "отдать список колонок в DictWriter.",
        ex="""row = {"id": 1, "name": "Aida"}
print(list(row.keys()))   # → ['id', 'name']""",
    ),
    ".values()": dict(
        sig="dict.values()",
        what="Все значения словаря.",
        why="Посчитать сумму или среднее по всем значениям, не трогая ключи.",
        ex="""grades = {"math": 87, "physics": 74}
print(sum(grades.values()) / len(grades))   # → 80.5""",
    ),
    ".most_common()": dict(
        sig="Counter.most_common(n=None)",
        what="Самые частые элементы счётчика, по убыванию.",
        why="Готовый ответ на «кто победил» и «топ-5 слов» — сортировать вручную не нужно.",
        ex="""from collections import Counter
c = Counter("abracadabra")
print(c.most_common(2))   # → [('a', 5), ('b', 2)]""",
    ),
    ".union()": dict(
        sig="a.union(b)",
        what="Объединение множеств — всё, что есть хотя бы в одном.",
        why="Собрать общий список без дублей: студенты двух групп, теги двух статей. "
            "То же самое делает оператор |.",
        ex="""a, b = {1, 2}, {2, 3}
print(a.union(b))   # → {1, 2, 3}
print(a | b)        # → {1, 2, 3}""",
    ),
    ".intersection()": dict(
        sig="a.intersection(b)",
        what="Пересечение — только общие элементы.",
        why="Кто есть в обоих списках: сдал оба экзамена, присутствовал на обеих парах. "
            "Оператор — &.",
        ex="""a, b = {1, 2, 3}, {2, 3, 4}
print(a.intersection(b))   # → {2, 3}
print(a & b)               # → {2, 3}""",
    ),
    ".difference()": dict(
        sig="a.difference(b)",
        what="Разность — что есть в первом и нет во втором.",
        why="Кто не сдал: все студенты минус сдавшие. Порядок важен: a-b и b-a разные. "
            "Оператор — минус.",
        ex="""all_st = {"Aida", "Bek", "Dana"}
passed = {"Aida", "Dana"}
print(all_st.difference(passed))   # → {'Bek'}""",
    ),
    ".symmetric_difference()": dict(
        sig="a.symmetric_difference(b)",
        what="Элементы, которые есть ровно в одном из двух множеств.",
        why="Найти расхождения между двумя списками — что появилось и что пропало. Оператор — ^.",
        ex="""a, b = {1, 2, 3}, {3, 4}
print(a.symmetric_difference(b))   # → {1, 2, 4}""",
    ),
    # pathlib-методы
    ".mkdir()": dict(
        sig="Path.mkdir(parents=False, exist_ok=False)",
        what="Создаёт папку (метод объекта Path).",
        why="Замена os.makedirs в стиле pathlib: parents=True создаёт промежуточные папки, "
            "exist_ok=True не ругается на уже существующую.",
        ex="""from pathlib import Path
Path("project/data").mkdir(parents=True, exist_ok=True)""",
    ),
    ".exists()": dict(
        sig="Path.exists()",
        what="Существует ли файл или папка по этому пути.",
        why="Версия os.path.exists для Path — проверка перед чтением или перезаписью.",
        ex="""from pathlib import Path
report = Path("results/report.json")
if report.exists():
    print(report.stat().st_size, "байт")""",
    ),
    ".resolve()": dict(
        sig="Path.resolve()",
        what="Превращает путь в полный абсолютный.",
        why="Разворачивает '..' и относительные куски — помогает понять, куда на самом деле "
            "указывает путь.",
        ex="""from pathlib import Path
print(Path("data/../data/file.csv").resolve())
# → C:/Users/Dias/.../data/file.csv""",
    ),
    ".iterdir()": dict(
        sig="Path.iterdir()",
        what="Перебирает содержимое папки.",
        why="Аналог os.listdir, но отдаёт готовые объекты Path — сразу можно спросить "
            ".name, .suffix, .stat().",
        ex="""from pathlib import Path
for p in Path(".").iterdir():
    if p.suffix == ".csv":
        print(p.name)""",
    ),
    ".glob()": dict(
        sig="Path.glob(pattern)",
        what="Поиск файлов по маске.",
        why="Короче ручной фильтрации по расширению. Маска '**/*.csv' ищет ещё и во вложенных папках.",
        ex="""from pathlib import Path
print(list(Path(".").glob("*.csv")))
print(list(Path(".").glob("**/*.json")))   # и во вложенных""",
    ),
    ".unlink()": dict(
        sig="Path.unlink(missing_ok=False)",
        what="Удаляет файл (метод Path).",
        why="Версия os.remove для pathlib. missing_ok=True — не падать, если файла уже нет.",
        ex="""from pathlib import Path
Path("temp.txt").unlink(missing_ok=True)""",
    ),
    # csv/excel методы
    ".writerow()": dict(
        sig="writer.writerow(row)",
        what="Записывает в CSV одну строку.",
        why="Построчная запись в цикле, когда строки рождаются по ходу вычислений.",
        ex="""import csv
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["name", "grade"])
    w.writerow(["Aida", 87])""",
    ),
    ".writerows()": dict(
        sig="writer.writerows(rows)",
        what="Записывает сразу несколько строк.",
        why="Быстрее цикла с writerow, когда все данные уже собраны в список.",
        ex="""import csv
rows = [["Aida", 87], ["Bek", 74]]
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    csv.writer(f).writerows(rows)""",
    ),
    ".writeheader()": dict(
        sig="DictWriter.writeheader()",
        what="Пишет строку заголовков из fieldnames.",
        why="Без неё в файле окажутся одни данные без названий колонок, и DictReader "
            "потом прочитает его неправильно.",
        ex="""import csv
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["name", "grade"])
    w.writeheader()
    w.writerow({"name": "Aida", "grade": 87})""",
    ),
    ".save()": dict(
        sig="workbook.save(path)",
        what="Сохраняет книгу Excel на диск.",
        why="До вызова save все правки живут только в памяти. Файл должен быть закрыт "
            "в Excel, иначе будет PermissionError.",
        ex="""import openpyxl
wb = openpyxl.Workbook()
wb.active.append(["Имя", "Балл"])
wb.save("report.xlsx")""",
    ),
    ".create_sheet()": dict(
        sig="workbook.create_sheet(title)",
        what="Добавляет в книгу новый лист.",
        why="Разложить данные по смыслу: «Сдали» и «Не сдали» на отдельных вкладках.",
        ex="""import openpyxl
wb = openpyxl.Workbook()
summary = wb.create_sheet("Итоги")
summary.append(["Средний балл", 85.3])
wb.save("report.xlsx")""",
    ),
    ".iter_rows()": dict(
        sig="sheet.iter_rows(min_row=1, values_only=False)",
        what="Перебирает строки листа Excel.",
        why="values_only=True отдаёт сразу значения вместо объектов ячеек — "
            "с ними работать проще. min_row=2 пропускает заголовок.",
        ex="""import openpyxl
wb = openpyxl.load_workbook("report.xlsx")
for row in wb.active.iter_rows(min_row=2, values_only=True):
    print(row)   # → ('Aida', 87)""",
    ),
    ".cell()": dict(
        sig="sheet.cell(row=1, column=1, value=None)",
        what="Обращение к ячейке по номерам строки и колонки.",
        why="Нужен, когда координаты вычисляются в цикле: буквенный адрес 'A1' так не соберёшь. "
            "Нумерация с единицы, а не с нуля.",
        ex="""import openpyxl
wb = openpyxl.Workbook()
sheet = wb.active
for i in range(1, 4):
    sheet.cell(row=i, column=1, value=i * 10)
print(sheet.cell(row=2, column=1).value)   # → 20""",
    ),
    # pandas-методы
    ".head()": dict(
        sig="df.head(n=5)",
        what="Первые n строк таблицы.",
        why="Первое, что делают после чтения файла: убедиться, что колонки распознаны "
            "и данные встали правильно.",
        ex="""import pandas as pd
df = pd.read_csv("students.csv")
print(df.head(3))""",
    ),
    ".tail()": dict(
        sig="df.tail(n=5)",
        what="Последние n строк таблицы.",
        why="Проверить конец файла: часто там мусорная строка или пустые значения.",
        ex="""print(df.tail(2))""",
    ),
    ".info()": dict(
        sig="df.info()",
        what="Сводка по таблице: колонки, типы, количество непустых значений.",
        why="Показывает пропуски и колонки, которые ошибочно стали строками (object) "
            "вместо чисел.",
        ex="""import pandas as pd
df = pd.read_csv("students.csv")
df.info()
# → RangeIndex: 25 entries, 0 to 24
# → grade    25 non-null    int64""",
    ),
    ".describe()": dict(
        sig="df.describe()",
        what="Статистика по числовым колонкам: count, mean, std, min, квартили, max.",
        why="Одной строкой даёт всю сводку по оценкам и сразу показывает выбросы — "
            "например максимум 150 при шкале до 100.",
        ex="""print(df.describe())
#        grade
# count  25.00
# mean   78.32
# min    45.00
# max    98.00""",
    ),
    ".to_excel()": dict(
        sig="df.to_excel(path, sheet_name='Sheet1', index=False)",
        what="Сохраняет таблицу в .xlsx.",
        why="index=False почти всегда обязателен, иначе в файл попадёт лишняя колонка "
            "с номерами строк.",
        ex="""import pandas as pd
df.to_excel("result.xlsx", index=False)""",
    ),
    ".to_csv()": dict(
        sig="df.to_csv(path, index=False, encoding='utf-8')",
        what="Сохраняет таблицу в .csv.",
        why="Универсальный формат обмена. Для кириллицы в Excel иногда нужен "
            "encoding='utf-8-sig', иначе будут кракозябры.",
        ex="""df.to_csv("result.csv", index=False, encoding="utf-8")""",
    ),
    ".apply()": dict(
        sig="df.apply(func) / df['col'].apply(func)",
        what="Применяет функцию к каждому значению колонки или к каждой строке.",
        why="Когда нужного действия нет среди готовых методов pandas: своя формула "
            "перевода балла в буквенную оценку.",
        ex="""df["letter"] = df["grade"].apply(
    lambda g: "A" if g >= 90 else "B" if g >= 75 else "C"
)""",
    ),
    # numpy-методы
    ".reshape()": dict(
        sig="arr.reshape(shape)",
        what="Меняет форму массива, не трогая сами данные.",
        why="Картинку 28×28 разворачивают в вектор из 784 чисел для подачи в модель. "
            "Число элементов должно совпадать; -1 означает «посчитай сам».",
        ex="""import numpy as np
a = np.arange(6)
print(a.reshape(2, 3))
# → [[0 1 2]
#    [3 4 5]]
print(a.reshape(3, -1).shape)   # → (3, 2)""",
    ),
    ".flatten()": dict(
        sig="arr.flatten()",
        what="Разворачивает массив любой формы в одномерный.",
        why="То же, что reshape(-1), но всегда возвращает копию — исходный массив "
            "точно не пострадает.",
        ex="""import numpy as np
a = np.array([[1, 2], [3, 4]])
print(a.flatten())   # → [1 2 3 4]""",
    ),
    ".astype()": dict(
        sig="arr.astype(dtype)",
        what="Приводит массив к другому типу.",
        why="Обязателен в работе с картинками: считают во float, а для показа и сохранения "
            "возвращают в uint8. Из float в int дробная часть обрезается.",
        ex="""import numpy as np
a = np.array([1.7, 2.9])
print(a.astype(int))     # → [1 2]  (обрезает)
print(a.astype("uint8"))  # → [1 2]""",
    ),
    ".sum()": dict(
        sig="arr.sum(axis=None)",
        what="Сумма элементов массива.",
        why="С axis суммирует по нужному направлению: по строкам или по колонкам. "
            "На булевом массиве считает, сколько True, — так узнают, сколько значений подошло под условие.",
        ex="""import numpy as np
a = np.array([[1, 2], [3, 4]])
print(a.sum())            # → 10
print(a.sum(axis=0))      # → [4 6]  по колонкам
print((a > 2).sum())      # → 2  сколько элементов больше 2""",
    ),
    ".mean()": dict(
        sig="arr.mean(axis=None) / df['col'].mean()",
        what="Среднее значение.",
        why="Метод-версия np.mean: пишется короче в цепочках вычислений. "
            "У pandas считает по колонке, пропуская NaN.",
        ex="""import numpy as np
a = np.array([[80, 90], [60, 70]])
print(a.mean())          # → 75.0
print(a.mean(axis=1))    # → [85. 65.]""",
    ),
    ".std()": dict(
        sig="arr.std(axis=None)",
        what="Стандартное отклонение — насколько значения разбросаны вокруг среднего.",
        why="Две группы могут иметь одинаковый средний балл, но разную ровность. "
            "Вместе со средним используется для нормализации данных.",
        ex="""import numpy as np
a = np.array([80, 85, 90])
print(a.mean())          # → 85.0
print(round(a.std(), 2))  # → 4.08""",
    ),
    ".max()": dict(
        sig="arr.max(axis=None)",
        what="Максимум массива.",
        why="Метод-форма np.max, удобная в цепочке: img.max() сразу показывает, "
            "в каком диапазоне лежат значения — 0..1 или 0..255.",
        ex="""import numpy as np
img = np.array([0.1, 0.9])
print(img.max())   # → 0.9""",
    ),
    ".min()": dict(
        sig="arr.min(axis=None)",
        what="Минимум массива.",
        why="Пара к max для нормализации по формуле (x - min) / (max - min).",
        ex="""import numpy as np
a = np.array([3.0, 7.0, 5.0])
print((a - a.min()) / (a.max() - a.min()))   # → [0.  1.  0.5]""",
    ),
    ".argmax()": dict(
        sig="arr.argmax(axis=None)",
        what="Индекс максимального элемента.",
        why="Метод-версия np.argmax: получить номер лучшего результата, а потом "
            "взять по нему имя из другого массива.",
        ex="""import numpy as np
scores = np.array([70, 95, 85])
names = np.array(["Aida", "Bek", "Dana"])
print(names[scores.argmax()])   # → Bek""",
    ),
    ".copy()": dict(
        sig="arr.copy() / list.copy()",
        what="Создаёт независимую копию.",
        why="Присваивание b = a копию не делает — оба имени указывают на один объект, "
            "и правка через b испортит a. Особенно важно при обработке изображений.",
        ex="""import numpy as np
a = np.array([1, 2, 3])
b = a
b[0] = 99
print(a)          # → [99  2  3]  испортили оригинал!

c = a.copy()
c[0] = 0
print(a)          # → [99  2  3]  оригинал цел""",
    ),
    ".integers()": dict(
        sig="rng.integers(low, high, size=None)",
        what="Случайные целые числа из современного генератора NumPy.",
        why="Замена устаревшего np.random.randint. Правая граница не входит, "
            "size задаёт форму результата.",
        ex="""import numpy as np
rng = np.random.default_rng(42)
print(rng.integers(0, 100, size=5))   # → [ 8 77 65 43 43]""",
    ),
    # архивные методы
    ".namelist()": dict(
        sig="ZipFile.namelist()",
        what="Список имён файлов внутри ZIP-архива.",
        why="Посмотреть содержимое, не распаковывая: проверить, что бэкап собрался "
            "и нужные файлы на месте.",
        ex="""import zipfile
with zipfile.ZipFile("backup.zip") as zf:
    print(zf.namelist())   # → ['students.csv', 'report.json']""",
    ),
    ".infolist()": dict(
        sig="ZipFile.infolist()",
        what="Подробности о файлах в архиве: исходный и сжатый размер, дата.",
        why="Позволяет посчитать степень сжатия и показать, сколько места сэкономил архив.",
        ex="""import zipfile
with zipfile.ZipFile("backup.zip") as zf:
    for info in zf.infolist():
        print(info.filename, info.file_size, "→", info.compress_size)""",
    ),
    ".extract()": dict(
        sig="archive.extract(member, path='.')",
        what="Извлекает из архива один файл.",
        why="Когда из большого архива нужен лишь один файл — распаковывать всё незачем.",
        ex="""import zipfile
with zipfile.ZipFile("backup.zip") as zf:
    zf.extract("students.csv", "restored")""",
    ),
    ".extractall()": dict(
        sig="archive.extractall(path='.')",
        what="Извлекает всё содержимое архива в папку.",
        why="Полное восстановление бэкапа. Папку создаст сама, если её нет.",
        ex="""import zipfile
with zipfile.ZipFile("backup.zip") as zf:
    zf.extractall("restored_project")""",
    ),
    ".getnames()": dict(
        sig="TarFile.getnames()",
        what="Список имён внутри tar-архива.",
        why="То же, что namelist у ZIP, — быстрый просмотр содержимого без распаковки.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz") as tar:
    print(tar.getnames())""",
    ),
    ".getmembers()": dict(
        sig="TarFile.getmembers()",
        what="Объекты-описания всех элементов tar-архива.",
        why="У каждого элемента есть size, mtime и проверки isfile/isdir — "
            "так отличают файлы от папок внутри архива.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz") as tar:
    for m in tar.getmembers():
        print(m.name, m.size, "файл" if m.isfile() else "папка")""",
    ),
    ".getmember()": dict(
        sig="TarFile.getmember(name)",
        what="Описание одного элемента tar-архива по имени.",
        why="Проверить размер или дату конкретного файла, не перебирая весь архив.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz") as tar:
    info = tar.getmember("project/data/students.csv")
    print(info.size)""",
    ),
    ".isfile()": dict(
        sig="member.isfile()",
        what="Является ли элемент архива файлом.",
        why="В tar хранятся и папки. Перед чтением содержимого проверяют, что это файл.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz") as tar:
    files = [m.name for m in tar.getmembers() if m.isfile()]
print(files)""",
    ),
    ".isdir()": dict(
        sig="member.isdir()",
        what="Является ли элемент архива папкой.",
        why="Зеркальный isfile — нужен, чтобы посчитать структуру архива отдельно от файлов.",
        ex="""import tarfile
with tarfile.open("backup.tar.gz") as tar:
    dirs = [m.name for m in tar.getmembers() if m.isdir()]
print(dirs)""",
    ),
    ".resize()": dict(
        sig="img.resize((width, height))",
        what="Меняет размер изображения (Pillow).",
        why="Модели принимают картинки одного размера, поэтому весь датасет приводят "
            "к общему разрешению. Размер задают парой (ширина, высота).",
        ex="""from PIL import Image
img = Image.open("photo.jpg")
small = img.resize((64, 64))
print(small.size)   # → (64, 64)""",
    ),
    ".set_title()": dict(
        sig="ax.set_title(text)",
        what="Заголовок отдельного графика в сетке subplots.",
        why="У осей из plt.subplots нет plt.title — подпись ставят методом самой оси.",
        ex="""import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2)
axes[0].set_title("Оригинал")
axes[1].set_title("Обработано")
plt.show()""",
    ),
    ".imshow()": dict(
        sig="ax.imshow(array, cmap=None)",
        what="Показывает изображение в конкретной ячейке сетки.",
        why="Версия plt.imshow для осей из subplots — так рисуют несколько картинок "
            "в одном полотне.",
        ex="""import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2)
axes[0].imshow(img)
axes[1].imshow(img_gray, cmap="gray")
plt.show()""",
    ),
})
