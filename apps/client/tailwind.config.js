// nuxt-app/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // 이 content 배열이 가장 중요합니다!
  // Tailwind CSS가 스캔해야 할 모든 파일 경로를 여기에 명시적으로 나열합니다.
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/@nuxt/ui/dist/runtime/**/*.{vue,js,ts}", // Nuxt UI 컴포넌트 경로 포함
  ],
  theme: {
    extend: {}, // 커스텀 색상, 폰트 등을 추가할 때 사용합니다.
  },
  plugins: [], // Tailwind CSS 플러그인을 추가할 때 사용합니다.
};
