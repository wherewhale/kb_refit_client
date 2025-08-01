import type {
  BadgeListResponse,
  RewardWalletResponse,
  UpdateWornBadgeRequest,
  WalletBrandList,
  WornBadgeListAndBenefit,
} from "~/types/wallet";
import { apiClient } from "./apiClient";

export const getBadgeCollection = async () => {
  return apiClient.get<BadgeListResponse>("/wallet/badge");
};

export const getBrandCollection = async () => {
  return apiClient.get<WalletBrandList>("/wallet/brand");
};

export const getMyWalletDesign = async () => {
  return apiClient.get<WornBadgeListAndBenefit>("/wallet/badge/home");
};

export const patchMyWalletBadge = async (data: UpdateWornBadgeRequest) => {
  return apiClient.patch("/wallet/badge/equip", data);
};

export const postPurchaseBrand = async (walletId: number) => {
  return apiClient.post<RewardWalletResponse>("/reward/purchase", { walletId });
};

export const patchMyWalletBrand = async (walletId: number) => {
  return apiClient.patch(`/wallet/brand/detail/${walletId}`);
};
