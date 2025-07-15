import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"), // packages/ui/index.ts 파일이 진입점
      name: "UiComponents",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"], // Vue를 외부 의존성으로 처리
      output: {
        globals: {
          vue: "Vue",
        },
        // 컴포넌트 파일 이름이 dist에 직접 생성되도록 설정
        entryFileNames: ({ name }) => {
          if (name === "index") {
            return "index.mjs"; // ESM 모듈
          }
          return `${name}.mjs`; // 그 외 파일 (컴포넌트)
        },
        chunkFileNames: `[name]-[hash].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    sourcemap: true,
    target: "esnext",
  },
});
