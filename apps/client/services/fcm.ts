import { apiClient } from "./apiClient";

export const postUserFcmToken = (token: string) => {
  apiClient.post("/auth/fcm-token", { token });
};
