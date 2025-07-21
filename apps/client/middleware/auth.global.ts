// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return; // localStorage는 서버에서 접근 불가

  const config = useRuntimeConfig();

  const token = localStorage.getItem(config.public.accessToken);
  const isAuthenticated = !!token;

  // 예: 로그인하지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 이동
  const publicPages = ["/auth/login"];
  const isPublic = publicPages.includes(to.path);

  if (!isAuthenticated && !isPublic) {
    return navigateTo("/auth/login");
  }

  if (isAuthenticated && to.path === "/auth/login") {
    // 이미 로그인한 사용자가 로그인 페이지 접근 시 홈으로
    return navigateTo("/");
  }
});
