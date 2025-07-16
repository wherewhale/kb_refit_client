// apps/nuxt-app/vitest.config.ts
import { defineVitestConfig } from "@nuxt/test-utils/config"; // ★★★ 이 임포트가 중요! ★★★

export default defineVitestConfig({
  test: {
    environment: "nuxt", // Nuxt 환경에서 테스트 실행
    globals: true, // describe, it, expect 등을 전역으로 사용
    css: true, // CSS 파일을 처리하도록 설정
  },
});
