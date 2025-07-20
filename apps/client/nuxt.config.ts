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
  pwa: {
    manifest: {
      name: "KB Refit Client",
      short_name: "KB Refit",
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
      start_url: "/auth/login",
    },
    workbox: {
      navigateFallback: "/auth/login",
      navigateFallbackDenylist: [
        // API 요청은 제외
        /^\/api/,
        // 정적 자산 제외
        /\.(?:png|jpg|jpeg|svg|css|js|woff2?|ttf|map)$/,
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URI || "http://localhost:3000/api",
      isDev: process.env.APP_MODE === "development",
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@vite-pwa/nuxt",
  ],
});
