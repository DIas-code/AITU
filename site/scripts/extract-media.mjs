/**
 * Вынимает картинки, вшитые в markdown-ячейки ноутбуков как base64,
 * в public/media/<курс>/<wNN>/<имя>.<ext>.
 *
 * В ноутбуках Colab картинка встречается в двух видах:
 *   ![подпись](data:image/png;base64,...)
 *   ![подпись](data:application/octet-stream;base64,...)   ← тип потерян, определяем по сигнатуре
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve, parse } from "node:path";
import { ROOT, readCourses, weekDirs, notebooks, weekTag } from "./lib.mjs";

const OUT = join(ROOT, "public/media");

/** Определяем формат по первым байтам — расширению из ноутбука доверять нельзя. */
function sniff(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf[0] === 0x47 && buf[1] === 0x49) return "gif";
  if (buf.subarray(0, 4).toString("latin1") === "RIFF") return "webp";
  return "bin";
}

/** Имя файла из подписи: кириллицу и пробелы в латиницу и дефисы. */
const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya",
};

function slugify(name) {
  const base = parse(name).name.toLowerCase();
  const latin = [...base].map((ch) => TRANSLIT[ch] ?? ch).join("");
  const clean = latin.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return clean || "fig";
}

const IMG_RE = /!\[([^\]]*)\]\(data:([a-z/+.-]+);base64,([A-Za-z0-9+/=\s]+)\)/g;

rmSync(OUT, { recursive: true, force: true });

let total = 0;
for (const course of readCourses()) {
  const courseDir = resolve(ROOT, course.sourceDir);
  for (const { week, dir } of weekDirs(courseDir)) {
    for (const nb of notebooks(dir)) {
      const doc = JSON.parse(readFileSync(join(dir, nb), "utf8"));
      const outDir = join(OUT, course.slug, weekTag(week));
      mkdirSync(outDir, { recursive: true });

      let n = 0;
      const used = new Set();
      for (const cell of doc.cells) {
        if (cell.cell_type !== "markdown") continue;
        const src = Array.isArray(cell.source) ? cell.source.join("") : String(cell.source ?? "");
        for (const m of src.matchAll(IMG_RE)) {
          n += 1;
          const buf = Buffer.from(m[3].replace(/\s+/g, ""), "base64");
          let name = slugify(m[1] || `fig-${n}`);
          if (/^(image|fig)$/.test(name) || used.has(name)) name = `${name}-${n}`;
          used.add(name);
          const file = `${name}.${sniff(buf)}`;
          writeFileSync(join(outDir, file), buf);
          total += 1;
          console.log(`  ${course.slug}/${weekTag(week)}/${file}  ${(buf.length / 1024) | 0} КБ  ← ${nb}`);
        }
      }
    }
  }
}

console.log(`Картинок извлечено: ${total}`);
