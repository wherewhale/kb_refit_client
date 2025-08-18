import { apiClient } from "./apiClient";

export const postUserFcmToken = (token: string) => {
  apiClient.post("/auth/fcm-token", token, {
    headers: { "Content-Type": "text/plain" }, // 서버가 단순 문자열을 기대한다면 필수
  });
};
