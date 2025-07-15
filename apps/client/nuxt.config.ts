import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      // 여전히 packages/ui의 src 폴더를 스캔하도록 유지합니다.
      path: resolve(__dirname, "../../packages/ui/src"),
      pathPrefix: false,
      global: true,
      prefix: "KBUI", // 예: <KBUINewComponent />
    },
  ],

  // ★★★ 이 부분을 추가하거나 수정합니다. ★★★
  build: {
    transpile: ["@repo/ui"], // @repo/ui 패키지를 트랜스파일합니다.
  },

  typescript: {
    shim: false,
    typeCheck: true,
    strict: true,
  },

  // vite alias는 그대로 유지합니다.
  vite: {
    resolve: {
      alias: {
        "@repo/ui": resolve(__dirname, "../../packages/ui"),
      },
    },
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxt/test-utils"],
});
