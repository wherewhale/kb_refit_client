import { parse } from "cookie"; // node 내장 cookie 파서

export default defineNuxtRouteMiddleware((to) => {
  const reqHeaders = useRequestHeaders(); // Nuxt 3 제공: SSR에서 요청 헤더 접근

  let token: string | undefined;

  if (import.meta.server) {
    const cookieHeader = reqHeaders.cookie ?? "";
    const cookies = parse(cookieHeader);
    token = cookies["kb_refit_access_token"];
    if (process.env.NODE_ENV === "development") {
      console.log("🔎 [SSR] 쿠키에서 토큰:", token);
    }
  } else {
    token = getAccessToken() ?? undefined;
    if (process.env.NODE_ENV === "development") {
      console.log("🔎 [CSR] localStorage에서 토큰:", token);
    }
  }

  const isAuthenticated = !!token;

  const publicPages = ["/auth/login"];
  const isPublic = publicPages.includes(to.path);

  if (!isAuthenticated && !isPublic) {
    console.log("🚫 비인증 상태 → 로그인 페이지로 이동");
    return navigateTo("/auth/login");
  }

  if (isAuthenticated && to.path === "/auth/login") {
    if (process.env.NODE_ENV === "development") {
      console.log("✅ 인증 상태에서 로그인 페이지 접근 → 홈으로 이동");
    }
    return navigateTo("/");
  }
});
