import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },
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
  pwa: {
    manifest: {
      name: "KB Refit",
      short_name: "KB 리핏",
      description: "전자 영수증은 KB Refit에서 현명하게 관리하세요.",
      theme_color: "#545045",
      icons: [
        {
          src: "/assets/images/logos/icon192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/assets/images/logos/icon512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // HTML 페이지만 precache
      navigateFallbackDenylist: [
        /^\/.*/, // 모든 경로 제외
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "ko", language: "ko-KR", file: "ko.json" },
    ],
    defaultLocale: "ko",
    strategy: "no_prefix"
  },
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URI || "http://localhost:3000/api",
      isDev: process.env.APP_MODE === "development",
      accessToken: process.env.ACCESS_TOKEN || "",
      refreshToken: process.env.REFRESH_TOKEN || "",
      googleSheetApiKey: process.env.GOOGLE_SHEET_API_KEY,
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@vite-pwa/nuxt",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],
});
