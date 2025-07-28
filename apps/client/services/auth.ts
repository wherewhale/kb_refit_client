import type { LoginResquest, Token } from "~/types/auth";
import { apiClient } from "./apiClient";

export const postLogin = (data: LoginResquest) => {
  return apiClient.post<Token>("/auth/login", data);
};
