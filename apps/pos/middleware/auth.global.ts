import { parse } from "cookie"; // node 내장 cookie 파서
import { getAccessToken } from "~/utils/token";

export default defineNuxtRouteMiddleware((to) => {
  const reqHeaders = useRequestHeaders(); // Nuxt 3 제공: SSR에서 요청 헤더 접근

  let token: string | undefined;

  if (import.meta.server) {
    const cookieHeader = reqHeaders.cookie ?? "";
    const cookies = parse(cookieHeader);
    token = cookies["kb_refit_pos_access_token"];
    // 서버 사이드 렌더링(SSR)에서 쿠키에서 토큰 추출
  } else {
    token = getAccessToken() ?? undefined;
    // 클라이언트 사이드에서 토큰 추출
  }

  const isAuthenticated = !!token;

  const publicPages = ["/auth/login"];
  const isPublic = publicPages.includes(to.path);

  if (!isAuthenticated && !isPublic) {
    return navigateTo("/auth/login");
  }

  if (isAuthenticated && to.path === "/auth/login") {
    return navigateTo("/");
  }
});
