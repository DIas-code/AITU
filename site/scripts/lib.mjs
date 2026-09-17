// Общее для скриптов подготовки: где лежат курсы и как разложены их папки недель.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Курсы читаем из src/data/courses.ts простым разбором: скрипты запускаются
 * обычным node, без TypeScript, а формат файла предсказуемый.
 */
export function readCourses() {
  const src = readFileSync(join(ROOT, "src/data/courses.ts"), "utf8");
  const courses = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?sourceDir:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) courses.push({ slug: m[1], sourceDir: m[2] });
  return courses;
}

/** Папки недель внутри папки курса: week1, week2, … → [{ week, dir, name }] */
export function weekDirs(courseDir) {
  if (!existsSync(courseDir)) return [];
  return readdirSync(courseDir)
    .filter((name) => /^week\s*\d+$/i.test(name))
    .filter((name) => statSync(join(courseDir, name)).isDirectory())
    .map((name) => ({ week: Number(name.replace(/\D+/g, "")), dir: join(courseDir, name), name }))
    .sort((a, b) => a.week - b.week);
}

/** Ноутбуки внутри папки недели. */
export function notebooks(weekDir) {
  return readdirSync(weekDir)
    .filter((n) => n.toLowerCase().endsWith(".ipynb"))
    .sort();
}

/** w01, w02 … */
export const weekTag = (week) => `w${String(week).padStart(2, "0")}`;
