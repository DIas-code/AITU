# -*- coding: utf-8 -*-
"""
Сборка сайта Math for Data Science.

    python build_site.py

Делает страницы: index.html, weekN-formulas.html, weekN-lecture.html,
calculators.html, tables.html. Содержимое берётся из content.py,
калькуляторы — из assets/calc.js (перенесены из старой версии сайта).

Каждая страница двуязычная: тексты выводятся сразу на двух языках,
показывается один — переключателем RU / EN в шапке.
"""

import io
import math
import os
import re
import shutil
from pathlib import Path

from content import WEEKS, UI

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"

MATHJAX = (
    '<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],'
    'displayMath:[["\\\\[","\\\\]"]]},'
    'options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};</script>\n'
    '<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>'
)


def bi(key):
    """Двуязычный кусок: <span lang=ru>…</span><span lang=en>…</span>."""
    return '<span lang="ru">%s</span><span lang="en">%s</span>' % (
        UI[key + "_ru"], UI[key + "_en"])


SRC_WORDS = [("Лекция", "Lecture"), ("Практика", "Practice"),
             ("слайды", "slides"), ("слайд", "slide"), ("формула", "formula"),
             ("Учебник; сравнение с лекцией", "Textbook; compared with the lecture"),
             ("на слайде обозначено Q вместо O", "the slide writes Q instead of O"),
             ("формулой не выписана, восстановлена из таблицы",
              "not written out as a formula, reconstructed from the table"),
             ("там S² записана с 1/n", "there S² is written with 1/n"),
             ("с.", "p.")]


def src_en(src):
    """Подпись источника по-английски: имена файлов те же, слова переведены."""
    out = src
    for ru, en in SRC_WORDS:
        out = out.replace(ru, en)
    return out


def bi2(ru, en, tag="span", cls=""):
    c = ' class="%s"' % cls if cls else ""
    return '<%s lang="ru"%s>%s</%s><%s lang="en"%s>%s</%s>' % (
        tag, c, ru, tag, tag, c, en, tag)


# --------------------------------------------------------------------------- #
#  Критические значения χ² — считаются здесь, чтобы не перебивать 180 чисел
#  с картинки. Сверено с таблицей из Practice 3 (k=1, k=2, k=30 совпадают).
# --------------------------------------------------------------------------- #

def gammainc_p(a, x):
    """Регуляризованная нижняя неполная гамма P(a, x)."""
    if x < 0 or a <= 0:
        raise ValueError
    if x == 0:
        return 0.0
    if x < a + 1:                      # ряд
        ap, s, d = a, 1.0 / a, 1.0 / a
        for _ in range(500):
            ap += 1
            d *= x / ap
            s += d
            if abs(d) < abs(s) * 1e-15:
                break
        return s * math.exp(-x + a * math.log(x) - math.lgamma(a))
    # цепная дробь для Q(a, x)
    tiny = 1e-300
    b, c, d = x + 1 - a, 1 / tiny, 1 / (x + 1 - a)
    h = d
    for i in range(1, 500):
        an = -i * (i - a)
        b += 2
        d = an * d + b
        if abs(d) < tiny:
            d = tiny
        c = b + an / c
        if abs(c) < tiny:
            c = tiny
        d = 1 / d
        delta = d * c
        h *= delta
        if abs(delta - 1) < 1e-15:
            break
    q = math.exp(-x + a * math.log(x) - math.lgamma(a)) * h
    return 1 - q


def chi2_crit(alpha, k):
    """x, при котором P(X ≥ x) = alpha для χ² с k степенями свободы."""
    lo, hi = 0.0, 1000.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if 1 - gammainc_p(k / 2.0, mid / 2.0) > alpha:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


CHI_ALPHAS = [0.01, 0.025, 0.05, 0.95, 0.975, 0.99]


def chi2_table_html():
    head = "".join('<th class="num">%s</th>' % str(a).replace(".", ",") for a in CHI_ALPHAS)
    rows = []
    for k in range(1, 31):
        cells = []
        for a in CHI_ALPHAS:
            v = chi2_crit(a, k)
            txt = ("%.5f" % v).rstrip("0") if v < 0.01 else "%.2f" % v
            cells.append('<td class="num%s">%s</td>'
                         % (" hl" if a == 0.05 else "", txt.replace(".", ",")))
        rows.append("<tr><th>%d</th>%s</tr>" % (k, "".join(cells)))
    return ('<div class="tablewrap"><table class="crit">'
            '<thead><tr><th>k</th>%s</tr></thead><tbody>%s</tbody></table></div>'
            % (head, "".join(rows)))


# --------------------------------------------------------------------------- #
#  Каркас страницы
# --------------------------------------------------------------------------- #

def nav_html(active):
    parts = ['<a href="index.html"%s>%s</a>'
             % (' class="on"' if active == "index" else "", bi("home"))]
    for w in WEEKS:
        n = w["n"]
        f_on = ' class="on"' if active == "w%df" % n else ""
        l_on = ' class="on"' if active == "w%dl" % n else ""
        parts.append(
            '<span class="wgrp"><b>%s&nbsp;%d</b>'
            '<a href="week%d-formulas.html"%s>%s</a>'
            '<a href="week%d-lecture.html"%s>%s</a></span>'
            % (bi("week"), n, n, f_on, bi("formulas"), n, l_on, bi("lecture")))
    parts.append('<a href="calculators.html"%s>%s</a>'
                 % (' class="on"' if active == "calc" else "", bi("calc")))
    parts.append('<a href="tables.html"%s>%s</a>'
                 % (' class="on"' if active == "tbl" else "", bi("tables")))
    return "\n".join(parts)


def page(fname, title_ru, title_en, body, active, extra_js=""):
    html = """<!doctype html>
<html lang="ru" data-lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%(tru)s</title>
<link rel="stylesheet" href="assets/style.css">
%(mathjax)s
</head>
<body>
<header class="top">
  <a class="brand" href="index.html"><b>ADA-M</b>%(site)s</a>
  <nav>%(nav)s</nav>
  <button id="lang" type="button" title="Русский / English">EN</button>
</header>
<main>
%(body)s
</main>
<footer>%(foot)s</footer>
<script src="assets/app.js"></script>
%(extra)s
</body>
</html>
""" % {
        "tru": title_ru,
        "mathjax": MATHJAX,
        "site": bi2(UI["site_ru"], UI["site_en"]),
        "nav": nav_html(active),
        "body": body,
        "foot": bi2("Конспект курса AITU · собрано build_site.py",
                    "AITU course notes · generated by build_site.py"),
        "extra": extra_js,
    }
    (ROOT / fname).write_text(html, encoding="utf-8")


# --------------------------------------------------------------------------- #
#  Страницы
# --------------------------------------------------------------------------- #

def formula_card(f):
    rows = []
    for key in ("what", "where", "how", "ex"):
        rows.append(
            '<div class="r"><dt>%s</dt>%s</div>'
            % (bi(key), bi2(f[key + "_ru"], f[key + "_en"], tag="dd")))
    return """
<article class="f" id="%(id)s">
  <h3>%(name)s</h3>
  <div class="math">\\[ %(tex)s \\]</div>
  <dl>%(rows)s</dl>
  %(src)s
</article>""" % {
        "id": f["id"],
        "name": bi2(f["name_ru"], f["name_en"]),
        "tex": f["tex"],
        "rows": "".join(rows),
        "src": bi2('Источник: ' + f["src"], 'Source: ' + src_en(f["src"]),
                   tag="p", cls="src"),
    }


def build_week_formulas(w):
    n = w["n"]
    chips = "".join('<a href="#%s">%s</a>' % (f["id"], bi2(f["name_ru"], f["name_en"]))
                    for f in w["formulas"])
    cards = "".join(formula_card(f) for f in w["formulas"])
    body = """
<div class="phead">
  <div class="kicker">%(kick)s</div>
  <h1>%(title)s</h1>
  %(sub)s
  <p class="switch"><a href="week%(n)d-lecture.html">%(lec)s →</a></p>
</div>
<nav class="chips">%(chips)s</nav>
%(cards)s
""" % {
        "kick": "%s %d · %s" % (bi("week"), n, bi("formulas")),
        "title": bi2(w["title_ru"], w["title_en"], tag="span"),
        "sub": bi2(w["sub_ru"], w["sub_en"], tag="p", cls="sub"),
        "n": n,
        "lec": bi("lecture"),
        "chips": chips,
        "cards": cards,
    }
    page("week%d-formulas.html" % n,
         "Неделя %d — формулы" % n, "Week %d — formulas" % n, body, "w%df" % n)


def build_week_lecture(w):
    n = w["n"]
    blocks = []
    for b in w["lecture"]:
        lis_ru = "".join("<li>%s</li>" % x for x in b["items_ru"])
        lis_en = "".join("<li>%s</li>" % x for x in b["items_en"])
        blocks.append(
            '<article class="l"><h3>%s</h3>'
            '<ul lang="ru">%s</ul><ul lang="en">%s</ul>'
            '%s</article>'
            % (bi2(b["h_ru"], b["h_en"]), lis_ru, lis_en,
               bi2('Источник: ' + b["src"], 'Source: ' + src_en(b["src"]),
                   tag="p", cls="src")))
    body = """
<div class="phead">
  <div class="kicker">%(kick)s</div>
  <h1>%(title)s</h1>
  %(sub)s
  <p class="switch"><a href="week%(n)d-formulas.html">%(f)s →</a></p>
</div>
%(blocks)s
<p class="filesrc">%(src)s</p>
""" % {
        "kick": "%s %d · %s" % (bi("week"), n, bi("lecture")),
        "title": bi2(w["title_ru"], w["title_en"], tag="span"),
        "sub": bi2(w["sub_ru"], w["sub_en"], tag="p", cls="sub"),
        "n": n,
        "f": bi("formulas"),
        "blocks": "".join(blocks),
        "src": w["source"],
    }
    page("week%d-lecture.html" % n,
         "Неделя %d — лекция" % n, "Week %d — lecture" % n, body, "w%dl" % n)


def build_index():
    cards = []
    for w in WEEKS:
        n = w["n"]
        cards.append("""
<div class="wcard">
  <div class="wnum">%(kick)s %(n)d</div>
  <h2>%(title)s</h2>
  %(sub)s
  <div class="wlinks">
    <a class="primary" href="week%(n)d-formulas.html">%(f)s <i>%(cnt)d</i></a>
    <a href="week%(n)d-lecture.html">%(l)s</a>
  </div>
</div>""" % {
            "kick": bi("week"), "n": n,
            "title": bi2(w["title_ru"], w["title_en"], tag="span"),
            "sub": bi2(w["sub_ru"], w["sub_en"], tag="p", cls="sub"),
            "f": bi("formulas"), "l": bi("lecture"),
            "cnt": len(w["formulas"]),
        })
    total = sum(len(w["formulas"]) for w in WEEKS)
    body = """
<div class="hero">
  <h1>%(site)s</h1>
  %(lead)s
</div>
<div class="wgrid">%(cards)s</div>
<div class="tools">
  <a href="calculators.html">%(calc)s</a>
  <a href="tables.html">%(tbl)s</a>
</div>
""" % {
        "site": bi2(UI["site_ru"], UI["site_en"], tag="span"),
        "lead": bi2("%d формул по неделям: что это, где используется, как используется и пример."
                    % total,
                    "%d formulas by week: what it is, where it is used, how it is used, and an example."
                    % total, tag="p", cls="sub"),
        "cards": "".join(cards),
        "calc": bi("calc"), "tbl": bi("tables"),
    }
    page("index.html", UI["site_ru"], UI["site_en"], body, "index")


def build_calculators(calc_inner):
    body = ('<div class="phead"><h1>%s</h1>%s</div>%s'
            % (bi("calc"),
               bi2("Значения вводятся через пробел, запятую или с новой строки. "
                   "p-value считается точно, критические значения — по встроенным таблицам.",
                   "Enter values separated by spaces, commas or new lines. "
                   "p-values are exact; critical values come from built-in tables.",
                   tag="p", cls="sub"),
               calc_inner))
    page("calculators.html", "Калькуляторы", "Calculators", body, "calc",
         extra_js='<script src="assets/calc.js"></script>')


def build_tables(tbl_inner):
    body = ('<div class="phead"><h1>%s</h1>%s</div>%s'
            '<h2 id="chi2">%s</h2>%s%s'
            % (bi("tables"),
               bi2("Критические значения для t, F и χ². Колонка α = 0,05 подсвечена.",
                   "Critical values for t, F and χ². The α = 0.05 column is highlighted.",
                   tag="p", cls="sub"),
               tbl_inner,
               bi2("Критические значения χ² (Пирсона)", "Critical values of χ² (Pearson)"),
               chi2_table_html(),
               bi2('<p class="src">Пересчитано и сверено с таблицей из Practice 3 ADA_M.pdf. '
                   'В самой раздатке последняя колонка подписана 0,89 — по значениям это α = 0,99.</p>',
                   '<p class="src">Recomputed and checked against the table in Practice 3 ADA_M.pdf. '
                   'In the handout the last column is labelled 0.89 — by its values it is α = 0.99.</p>',
                   tag="div")))
    page("tables.html", "Таблицы критических значений", "Tables of critical values",
         body, "tbl", extra_js='<script src="assets/calc.js"></script>')


# --------------------------------------------------------------------------- #

def main():
    ASSETS.mkdir(exist_ok=True)

    src = ROOT / "_extracted"
    calc_inner = (src / "calc.html").read_text(encoding="utf-8")
    tbl_inner = (src / "tbl.html").read_text(encoding="utf-8")

    (ASSETS / "style.css").write_text(CSS, encoding="utf-8")
    (ASSETS / "app.js").write_text(APP_JS, encoding="utf-8")

    for w in WEEKS:
        build_week_formulas(w)
        build_week_lecture(w)
    build_index()
    build_calculators(calc_inner)
    build_tables(tbl_inner)

    n_pages = 2 * len(WEEKS) + 3
    print("Готово: %d страниц, %d формул"
          % (n_pages, sum(len(w["formulas"]) for w in WEEKS)))
    print("Открывать: %s" % (ROOT / "index.html"))


CSS = r"""
:root{
  --bg:#f7f6f3; --card:#fff; --ink:#1a1f24; --mut:#6d7378; --line:#e2ded6;
  --acc:#2f5ea8; --acc2:#e7eefa; --warm:#a8651c; --code:#f3f1ec;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:90px}
body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.6 "Segoe UI",Inter,system-ui,Arial,sans-serif}
a{color:var(--acc);text-decoration:none}
a:hover{text-decoration:underline}

/* язык */
html[data-lang="ru"] [lang="en"]{display:none!important}
html[data-lang="en"] [lang="ru"]{display:none!important}

/* шапка */
.top{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:16px;
  padding:10px 22px;background:#fffffff2;backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line);flex-wrap:wrap}
.brand{display:flex;align-items:baseline;gap:9px;color:var(--ink);font-weight:700;font-size:14px}
.brand b{background:var(--acc);color:#fff;padding:3px 8px;border-radius:7px;font-size:12.5px;letter-spacing:.04em}
.top nav{display:flex;gap:6px;align-items:center;flex-wrap:wrap;flex:1}
.top nav>a{padding:6px 11px;border-radius:8px;font-size:14px;color:var(--mut);font-weight:600}
.top nav>a:hover{background:var(--acc2);color:var(--acc);text-decoration:none}
.top nav>a.on{background:var(--acc);color:#fff}
.wgrp{display:inline-flex;align-items:center;gap:2px;border:1px solid var(--line);
  border-radius:9px;padding:2px 3px 2px 9px;background:#fff}
.wgrp b{font-size:12px;color:var(--mut);margin-right:5px;font-weight:700;white-space:nowrap}
.wgrp a{font-size:13px;padding:4px 8px;border-radius:6px;color:var(--mut);font-weight:600;white-space:nowrap}
.wgrp a:hover{background:var(--acc2);color:var(--acc);text-decoration:none}
.wgrp a.on{background:var(--acc);color:#fff}
#lang{border:1px solid var(--line);background:#fff;color:var(--ink);font:inherit;
  font-size:13px;font-weight:700;padding:6px 13px;border-radius:8px;cursor:pointer}
#lang:hover{border-color:var(--acc);color:var(--acc)}

main{max-width:1000px;margin:0 auto;padding:26px 20px 60px}
footer{border-top:1px solid var(--line);padding:20px;text-align:center;color:var(--mut);font-size:13px}

.phead{margin-bottom:22px}
.kicker{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acc)}
h1{font-size:34px;margin:7px 0 4px;letter-spacing:-.02em}
.sub{color:var(--mut);margin:4px 0 0;font-size:15.5px}
.switch{margin:12px 0 0;font-size:14px}

/* главная */
.hero{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:28px 30px;margin-bottom:22px}
.hero h1{margin:0;font-size:36px}
.wgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:15px}
.wcard{background:var(--card);border:1px solid var(--line);border-radius:15px;padding:20px}
.wnum{font-size:12px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--acc)}
.wcard h2{margin:5px 0 3px;font-size:20px;line-height:1.25}
.wlinks{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.wlinks a{border:1px solid var(--line);border-radius:9px;padding:7px 13px;font-size:14px;
  font-weight:600;color:var(--mut)}
.wlinks a:hover{border-color:var(--acc);color:var(--acc);text-decoration:none}
.wlinks a.primary{background:var(--acc);border-color:var(--acc);color:#fff}
.wlinks a.primary:hover{background:#264c88}
.wlinks i{font-style:normal;opacity:.7;font-size:12.5px;margin-left:4px}
.tools{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.tools a{background:var(--card);border:1px solid var(--line);border-radius:11px;
  padding:11px 18px;font-weight:600;color:var(--ink)}
.tools a:hover{border-color:var(--acc);color:var(--acc);text-decoration:none}

/* чипы-оглавление */
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}
.chips a{background:var(--card);border:1px solid var(--line);border-radius:8px;
  padding:5px 10px;font-size:13px;color:#4c5358}
.chips a:hover{border-color:var(--acc);color:var(--acc);text-decoration:none}

/* карточка формулы */
.f{background:var(--card);border:1px solid var(--line);border-radius:15px;
  padding:20px 22px;margin-bottom:15px}
.f h3{margin:0 0 12px;font-size:20px;letter-spacing:-.01em}
.math{background:var(--code);border:1px solid var(--line);border-radius:11px;
  padding:12px 15px;overflow-x:auto;margin-bottom:14px}
.f dl{margin:0}
.f .r{display:grid;grid-template-columns:150px 1fr;gap:12px;padding:7px 0;
  border-top:1px solid #f0ede7}
.f .r:first-child{border-top:0;padding-top:0}
.f dt{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--mut);padding-top:2px}
.f dd{margin:0;font-size:15px;line-height:1.5}
.f .r:last-child dd{background:#fbfaf6;border-left:3px solid var(--warm);
  border-radius:0 7px 7px 0;padding:7px 11px;font-size:14.5px}
.src{font-size:12.5px;color:#9aa0a4;margin:13px 0 0}
.filesrc{font-size:13px;color:var(--mut);margin-top:24px;border-top:1px solid var(--line);padding-top:12px}

/* лекция */
.l{background:var(--card);border:1px solid var(--line);border-radius:15px;
  padding:18px 22px;margin-bottom:13px}
.l h3{margin:0 0 9px;font-size:18px}
.l ul{margin:0;padding-left:20px}
.l li{margin:5px 0;font-size:15px;line-height:1.5}

/* таблицы и калькуляторы, перенесённые со старой версии */
h2{font-size:23px;margin:30px 0 12px}
.tablewrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:12px}
table.crit{border-collapse:collapse;width:100%;font-size:13.5px}
table.crit th,table.crit td{border:1px solid #eae6de;padding:5px 9px;text-align:center}
table.crit thead th{background:#f4f2ee;font-weight:700}
table.crit tbody th{background:#faf9f6}
table.crit .num{font-variant-numeric:tabular-nums}
table.crit .hl{background:#fff6e2}
.calc{background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:18px 20px;margin-bottom:14px}
.calc h3{margin:0 0 12px;font-size:18px}
.calc .row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:10px}
.calc label{display:block;font-size:12.5px;color:var(--mut);margin-bottom:4px;font-weight:600}
.calc textarea,.calc input{width:100%;border:1px solid var(--line);border-radius:9px;
  padding:8px 11px;font:inherit;font-size:14px;background:#fcfbf9}
.calc textarea{min-height:64px;resize:vertical;font-family:Consolas,monospace;font-size:13.5px}
.calc .btn{background:var(--acc);color:#fff;border:0;border-radius:9px;padding:9px 18px;
  font:inherit;font-weight:600;font-size:14px;cursor:pointer;margin-top:4px}
.calc .btn:hover{background:#264c88}
.calc .out{margin-top:12px}
.calc .out:empty{display:none}
.kv{display:flex;justify-content:space-between;gap:14px;padding:5px 0;
  border-bottom:1px solid #f1eee8;font-size:14px}
.kv:last-child{border-bottom:0}
.kv b{font-weight:600}
.ok,.no,.err{border-radius:9px;padding:9px 13px;margin-top:10px;font-size:14px}
.ok{background:#e8f3ec;border:1px solid #bcdcc7}
.no{background:#fdf1e6;border:1px solid #edd2b0}
.err{background:#fbe9e7;border:1px solid #efc4bf}
.page-sub{color:var(--mut)}
.no-print{}

@media (max-width:760px){
  h1{font-size:26px}
  .f .r{grid-template-columns:1fr;gap:3px}
  .f dt{padding-top:6px}
  main{padding:20px 14px 46px}
  .top{padding:9px 13px;gap:10px}
}
@media print{
  .top,footer,#lang,.chips,.switch{display:none}
  .f,.l{break-inside:avoid;border-color:#ccc}
}
"""

APP_JS = r"""
/* Переключатель языка: RU <-> EN. Выбор запоминается в браузере. */
(function () {
  var html = document.documentElement;
  var btn = document.getElementById('lang');

  function set(lang) {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    if (btn) btn.textContent = lang === 'ru' ? 'EN' : 'RU';
    try { localStorage.setItem('ada-m-lang', lang); } catch (e) {}
  }

  var saved = 'ru';
  try { saved = localStorage.getItem('ada-m-lang') || 'ru'; } catch (e) {}
  // ?lang=en в адресе — чтобы можно было дать ссылку сразу на английскую версию
  var q = /[?&]lang=(ru|en)/.exec(location.search);
  set(q ? q[1] : saved);

  if (btn) {
    btn.addEventListener('click', function () {
      set(html.getAttribute('data-lang') === 'ru' ? 'en' : 'ru');
    });
  }

  addEventListener('keydown', function (e) {
    if (e.key === 'l' && !/input|textarea/i.test(document.activeElement.tagName)) {
      set(html.getAttribute('data-lang') === 'ru' ? 'en' : 'ru');
    }
  });
})();
"""


if __name__ == "__main__":
    main()
