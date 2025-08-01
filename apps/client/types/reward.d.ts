export interface RewardSummaryResponse {
  totalCashback: number;
  category: string;
  totalCarbonPoint: number;
  totalStarPoint: number;
}

export interface Reward {
  rewardId: number;
  userId: number;
  carbonPoint: number;
  reward: number;
  createdAt: Date;
}

export interface RewardListRequest {
  cursorId?: number;
  type?: string;
  sort: string;
  period?: number;
  /** 2025-07-01 형식 */
  startDate?: string;
  /** 2025-07-01 형식 */
  endDate?: string;
}

export interface RewardListResponse {
  userId: number;
  rewardList: Reward[];
  nextCursorId: number | null;
}
