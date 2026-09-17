import { defineConfig } from "astro/config";

// Статический сайт: на выходе — обычные HTML-файлы в dist/, которые можно открыть
// двойным кликом или выложить на любой хостинг.
//
// Для публикации на GitHub Pages раскомментируй и подставь свои значения:
//   site: "https://<логин>.github.io",
//   base: "/<имя-репозитория>",
export default defineConfig({
  output: "static",
  build: { format: "file" }, // /courses/prog.html вместо /courses/prog/index.html
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
});
