import type { BadgeListResponse, WalletBrandList } from "~/types/wallet";
import { apiClient } from "./apiClient";

export const getBadgeCollection = async () => {
  return apiClient.get<BadgeListResponse>("/wallet/badge");
};

export const getBrandCollection = async () => {
  return apiClient.get<WalletBrandList>("/wallet/brand");
};
