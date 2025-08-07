// apps/nuxt-app/vitest.config.ts
import { defineVitestConfig } from "@nuxt/test-utils/config"; // ★★★ 이 임포트가 중요! ★★★

export default defineVitestConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "nuxt",
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
  },
});
