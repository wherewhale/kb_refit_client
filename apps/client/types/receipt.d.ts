export interface MonthlyExpense {
  userId: number;
  thisMonthExpense: number;
  lastMonthExpense: number;
}

export interface ReceiptContent {
  merchandiseId: number;
  merchandiseName: string;
  merchandisePrice: number;
  amount: number;
}

export interface RejectedReceipt {
  receiptId: number;
  totalPrice: number;
  supplyPrice: number;
  surtax: number;
  transactionType: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: number;
  companyName: string;
  userId: number;
  cardId: number;
  processState: string;
  receiptProcessId: 5;
  contentList: ReceiptContent[];
}

export interface RejectedReceiptList {
  rejectedList: RejectedReceipt[];
}

export interface Receipt {
  receiptId: number;
  totalPrice: number;
  supplyPrice: number;
  surtax: number;
  transactionType: string;
  createdAt: Date;
  updatedAt: Date;
  contentList: ReceiptContent[] | null;
  companyId: number;
  companyName: string;
  userId: number;
  cardId: number;
  processState: string;
}

export interface ReceiptListResponse {
  userId: number;
  receiptList: Receipt[];
  nextCursorId: number | null;
}

export interface ReceiptListRequest {
  cursorId?: number;
  type: "ALL" | "APPROVED" | "CANCELED";
  filter: "ALL" | "PROCESSED" | "UNPROCESSED";
  sort: "LATEST" | "OLDEST";
  period?: number;
  startDate?: string;
  endDate?: string;
}

export interface ReceiptDetail {
  userId: number;
  receiptId: number;
  companyId: number;
  companyName: string;
  ceoName: string;
  address: string;
  receiptContents: ReceiptContent[];
  totalPrice: number;
  supplyPrice: number;
  surtax: number;
  transactionType: string;
  createdAt: Date;
  processState: string;
  cardNumber: string;
  isCorporate: number;
  rejectedReason: string;
}
