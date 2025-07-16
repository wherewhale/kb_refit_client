// apps/client/tailwind.config.ts
// eslint-disable-next-line @typescript-eslint/no-require-imports
const importedConfig = require("../../packages/config/tailwind.config");

/** @type {import('tailwindcss').Config} */
export default {
  ...importedConfig, // packages/config의 모든 설정(content 포함)을 가져옴
  content: [
    ...(importedConfig.content || []), // importedConfig의 content 경로들을 먼저 포함

    // 그리고 apps/client 앱에만 특화된 경로들을 추가합니다.
    // 이 경로는 apps/client 디렉토리 기준입니다.
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/@nuxt/ui/dist/runtime/**/*.{vue,js,ts}", // Nuxt UI 컴포넌트 경로 포함
  ],
  // theme나 plugins를 확장할 필요가 있다면 여기에 추가
  extend: {
    colors: {
      "kb-yellow-pos": "var(--color-kb-yellow-pos)",
      "kb-yellow-neg": "var(--color-kb-yellow-neg)",
      // ... 다른 색상 변수들도 여기에 추가
    },
  },
};
