// 경비 처리가 필요한 내용
export interface ReceiptListCursor {
  receiptList: Receipt[];
  cursorId: number;
}

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

export interface ReceiptProcessApplicant {
  userId: number; // 신청자 id
  name: string;   // 신청자
  documentType: string; // 경비 처리 항목
  documentDetail: string; // 세부 내용
  imageFileName: string; // 증빙 이미지 파일명
}

// 영수증 내역
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

// 상품 상세 내역
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
  rejectedReason?: string;
}

// 이메일 전송
export interface EmailSend {
  email: string;
}

// 응답 전체 타입
export interface CompletedReceiptsResponse {
  cursorId: number;
  receiptList: Receipt[];
}

export interface CompletedReceiptListRequest {
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