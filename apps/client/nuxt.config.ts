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
      path: resolve(__dirname, "../../packages/ui/src"),
      pathPrefix: false,
      global: true,
      prefix: "KBUI",
    },
  ],
  build: {
    transpile: ["@repo/ui"],
  },
  typescript: {
    shim: false,
    typeCheck: true,
    strict: true,
  },
  vite: {
    resolve: {
      alias: {
        "@repo/ui": resolve(__dirname, "../../packages/ui"),
      },
    },
  },
  ui: {
    colorMode: false,
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxt/test-utils"],
});
