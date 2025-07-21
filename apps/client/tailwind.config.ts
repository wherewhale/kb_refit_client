import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'

const config: Config = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/@nuxt/ui/dist/runtime/**/*.{vue,js,ts}",
  ],
  plugins: [scrollbarHide],
}

export default config