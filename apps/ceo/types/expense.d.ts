export interface Receipt {
  receiptId: number;
  companyName: string;
  totalPrice: number;
  createdAt: Date; // 결제 일시
  processState: string; // 영수 처리 상태
}

export interface PendingDetail {
  userId: number;
  countPendingReceipts: number; // 대기 항목 개수
  countCompletedReceiptsThisMonth: number; // 이번 달 완료 항목 개수
  pendingReceipts: Receipt[]; // 영수증 내역?
}