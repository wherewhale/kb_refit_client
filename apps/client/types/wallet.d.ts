/** 배지 도감 조회 */
export interface BadgeListResponse {
  badgeList: SpecificBadgeDetail[];
}

/** 배지 상세 조회 */
export interface SpecificBadgeDetail {
  badgeBenefit: string;
  badgeCondition: string;
  badgeId: number;
  badgeImage: string;
  badgeTitle: string;
  owned: boolean;
}

/** 브랜드 정보 */
export interface WalletBrandDetail {
  walletId: number;
  totalStarPoint: number;
  brandName: string;
  brandImage: string;
  walletCost: number;
  owned: boolean;
  mounted: boolean;
}

/** 브랜드 목록 */
export interface WalletBrandList {
  userId: number;
  starPoint: number;
  walletBrandDtoList: WalletBrandDetail[];
}

export interface WornBadgeListAndBenefit {
  myBadgeList: SpecificBadgeDetail[];
  brandImage: string;
}

export interface UpdateWornBadgeRequest {
  previousBadgeId: number | null;
  updateBadgeId: number;
}

export interface RewardWalletResponse {
  userId: number;
  walletId: number;
  walletCost: number;
  totalStarPoint: number;
}

export interface BadgePresetDetail {
  personalBadgeId: number;
  badgeId: number;
  badgeImage: string;
  badgeTitle: string;
}

export interface BadgePreset {
  presetId: number;
  presetName: string;
  isApplied: boolean;
  badgePresetList: BadgePresetDetail[];
}
