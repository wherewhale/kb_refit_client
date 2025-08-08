import type { LoginResquest, Token, UserResponse } from "~/types/auth";
import { apiClient } from "./apiClient";

export const postLogin = (data: LoginResquest) => {
  return apiClient.post<Token>("/auth/login", data);
};

export const getMyInfo = () => {
  return apiClient.get<UserResponse>("/auth/me");
};
