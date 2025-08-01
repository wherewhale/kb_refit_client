import type {
  RewardListRequest,
  RewardListResponse,
  RewardSummaryResponse,
} from "~/types/reward";
import { apiClient } from "./apiClient";

export const getPointSummary = async () => {
  return apiClient.get<RewardSummaryResponse>("/reward/summary");
};

export const getRewardList = async (data: RewardListRequest) => {
  return apiClient.get<RewardListResponse>("/reward/list", {
    params: data,
  });
};
