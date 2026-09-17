import { defineConfig } from "astro/config";

// Статический сайт: на выходе — обычные HTML-страницы в dist/.
//
// Если будешь публиковать на GitHub Pages, раскомментируй и подставь свои значения:
//   site: "https://<логин>.github.io",
//   base: "/<имя-репозитория>",
export default defineConfig({
  output: "static",
  build: { format: "file" }, // /plan.html вместо /plan/index.html — удобно открывать локально
});
