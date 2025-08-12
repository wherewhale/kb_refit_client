import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devServer: {
    port: 3001, // 여기에 원하는 포트 번호를 지정
    host: "localhost", // '0.0.0.0'으로 설정하면 외부에서도 접근 가능
  },
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
  ui: {
    colorMode: false,
  },

  // vite alias는 그대로 유지합니다.
  vite: {
    resolve: {
      alias: {
        "@repo/ui": resolve(__dirname, "../../packages/ui"),
      },
    },
    optimizeDeps: { exclude: ["axios", "form-data"] },
    ssr: { noExternal: true },
  },
  pwa: {
    manifest: {
      name: "KB 리핏 사장님",
      short_name: "KB 리핏 사장님",
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
  plugins: ["~/plugins/vue-query.ts"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@vite-pwa/nuxt",
  ],
});
