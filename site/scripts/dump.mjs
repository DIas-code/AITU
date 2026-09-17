// Служебный скрипт: выгружает ноутбук в читаемый текст (для авторской работы над лекциями).
// Картинки заменяются на [[IMG n: alt]], чтобы не тащить base64.
import { readFileSync } from "node:fs";

const file = process.argv[2];
const nb = JSON.parse(readFileSync(file, "utf8"));
const out = [];
let img = 0;

const text = (v) => (Array.isArray(v) ? v.join("") : String(v ?? ""));

nb.cells.forEach((cell, i) => {
  const src = text(cell.source);
  if (cell.cell_type === "markdown") {
    const clean = src.replace(/!\[([^\]]*)\]\(data:image\/([a-z]+);base64,[^)]*\)/g, (_m, alt, ext) => {
      img += 1;
      return `[[IMG ${img} | alt=${alt} | ${ext}]]`;
    });
    out.push(`\n@@@ ${i} MD\n${clean}`);
  } else {
    out.push(`\n@@@ ${i} CODE\n${src}`);
    for (const o of cell.outputs ?? []) {
      if (o.output_type === "stream") out.push(`--- OUT(${o.name})\n${text(o.text)}`);
      else if (o.output_type === "execute_result" || o.output_type === "display_data")
        out.push(`--- RESULT\n${text(o.data?.["text/plain"])}`);
      else if (o.output_type === "error")
        out.push(`--- ERROR\n${o.ename}: ${text(o.evalue)}\n${(o.traceback ?? []).join("\n").replace(/\[[0-9;]*m/g, "")}`);
    }
  }
});

process.stdout.write(out.join("\n"));
