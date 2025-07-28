import axios from "axios";

const API_URI = process.env.API_BASE_URL || "https://kb-refit.cloud/api/";

export const apiClient = axios.create({
  baseURL: API_URI,
  timeout: 5000,
});

export const checkBaseUrl = () => {
  if (!API_URI) {
    console.error("API_BASE_URL이 설정되지 않았습니다.");
    throw new Error("API_BASE_URL이 설정되지 않았습니다.");
  }
  console.log("API_BASE_URL:", API_URI);
};

apiClient.interceptors.request.use(
  // Authorization header 등의 요청에 공통헤더가 들어가는 경우 여기서 set
  (config) => {
    if (!isClient) return config;

    const accessToken = getAccessToken();

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  }
);

// response 확인을 통해 에러 코드에 따른 처리
apiClient.interceptors.response.use(
  (response) => {
    // 정상 응답일 경우 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답을 처리하는 로직
    if (error.response) {
      const { status, data } = error.response;

      console.error(
        `❌ [HTTP ${status}] 요청 실패:`,
        data?.message || "알 수 없는 오류"
      );

      switch (status) {
        case 400:
          console.error("잘못된 요청입니다.");
          break;
        case 401:
          console.error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
          break;
        case 403:
          console.error("접근 권한이 없습니다.");
          break;
        case 404:
          console.error("요청한 데이터를 찾을 수 없습니다.");
          break;
        case 500:
          console.error(
            "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
          break;
        default:
          console.error("예상치 못한 오류가 발생했습니다.");
      }
    } else {
      console.error("🚨 네트워크 오류:", error.message);
    }

    // 에러를 던져서 각 API 함수에서도 추가 처리가 가능하도록 함
    return Promise.reject(error);
  }
);
