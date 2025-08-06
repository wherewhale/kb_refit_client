export interface Receipt {
  receiptId: number;
  companyName: string;
  totalPrice: number;
  createdAt: string; // 결제 일시
  processState: string; // 영수 처리 상태
}

// 응답 전체 타입
export interface CompletedReceiptsResponse {
  nextCursorId: string;
  list: Receipt[];
}

export interface PendingDetail {
  userId: number;
  countPendingReceipts: number; // 대기 항목 개수
  countCompletedReceiptsThisMonth: number; // 이번 달 완료 항목 개수
  pendingReceipts: Receipt[]; // 영수증 내역?
}

export interface ReceiptProcessApplicant {
  userId: number; // 신청자 id
  name: string;   // 신청자
  documentType: string; // 경비 처리 항목
  documentDetail: string; // 세부 내용
  imageFileName: string; // 증빙 이미지 파일명
  receiptId: number;
  processState: string; // 영수 처리 상태
}

export interface ReceiptDetail {
  userId: number;
  receiptId: number;
  companyId: number;
  companyName: string;
  ceoName: string;
  address: string;
  totalPrice: number;
  supplyPrice: number;
  surtax: number;
  transactionType: string;
  createdAt: string;
  processState: string;
  cardNumber: string;
  isCorporate: number;
  rejectedReason: string;
  receiptContents: ReceiptContentDetail[];
}

export interface ReceiptContentDetail{
  merchandiseId: number;
  merchandiseName: string;
  merchandisePrice: number;
  amount: number;
}

export interface ReceiptProcessDetail {
  receiptDetail: ReceiptDetail;                 // 영수증 상세 정보
  receiptProcessApplicant: ReceiptProcessApplicant;        // 영수처리 신청자 상세 정보
}

// 영수 처리 승인/반려
export interface ReceiptProcessingRequest {
  receiptId: number;
  progressState: string;
  rejectedReason: string;
}
