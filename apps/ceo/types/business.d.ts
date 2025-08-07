export interface CorporateCardTotalPrice {
    month: number;     // 이번 달 (월)
    thisMonth: number; // 이번 달 총 금액
    lastMonth: number; // 지난 달 총 금액
}

export interface CorporateCardListCursor {
    corporateCardList: CorporateCard[];
    cursorId: number;
}

export interface CorporateCard {
    receiptId: number;
    companyName: string;
    totalPrice: number;
    createdAt: Date;
    processState: string; // 영수 처리 상태
    corporate: boolean;   // 법인카드 여부
}

export interface ReceiptFilter {
  cursorId?: number;
  sort: "Newest" | "Oldest";
  period?: number;
  state?: "Whole" | "Process" | "UnProcess";
  /** 2025-07-01 형식 */
  startDate?: string;
  /** 2025-07-01 형식 */
  endDate?: string;
  size?: number;
}