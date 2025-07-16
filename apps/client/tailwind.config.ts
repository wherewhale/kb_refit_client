// apps/client/tailwind.config.ts
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/@nuxt/ui/dist/runtime/**/*.{vue,js,ts}", // Nuxt UI 컴포넌트 경로 포함
  ],
};
