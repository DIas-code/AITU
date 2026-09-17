/**
 * Копирует исходники в public/source, чтобы на сайте работали кнопки «скачать»:
 *   public/source/<курс>/<wNN>/*.ipynb   — ноутбуки лекций из папок week1, week2, …
 *   public/source/<курс>/*.docx|pdf      — силлабус и прочие документы из корня курса
 * Имена файлов сохраняются как есть.
 */
import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import { ROOT, readCourses, weekDirs, notebooks, weekTag } from "./lib.mjs";

const OUT = join(ROOT, "public/source");
const DOCS = new Set([".docx", ".pdf", ".pptx", ".xlsx"]);

rmSync(OUT, { recursive: true, force: true });

let total = 0;
const copy = (from, to, label) => {
  copyFileSync(from, to);
  total += 1;
  console.log(`  ${label}  ${(statSync(from).size / 1024) | 0} КБ`);
};

for (const course of readCourses()) {
  const courseDir = resolve(ROOT, course.sourceDir);
  const courseOut = join(OUT, course.slug);
  mkdirSync(courseOut, { recursive: true });

  // документы в корне курса: силлабус и т.п.
  for (const name of readdirSync(courseDir)) {
    const full = join(courseDir, name);
    if (!statSync(full).isFile() || !DOCS.has(extname(name).toLowerCase())) continue;
    copy(full, join(courseOut, name), `${course.slug}/${name}`);
  }

  // ноутбуки по неделям
  for (const { week, dir } of weekDirs(courseDir)) {
    const outDir = join(courseOut, weekTag(week));
    mkdirSync(outDir, { recursive: true });
    for (const nb of notebooks(dir)) {
      copy(join(dir, nb), join(outDir, nb), `${course.slug}/${weekTag(week)}/${nb}`);
    }
  }
}

console.log(`Файлов скопировано: ${total}`);
