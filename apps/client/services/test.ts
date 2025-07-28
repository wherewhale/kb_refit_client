import { apiClient } from "./apiClient";

export const getTest = () => {
  return apiClient.get("/test");
};
