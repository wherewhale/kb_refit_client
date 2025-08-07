export interface MedicalReceiptRecent {
  recentTotalPrice: number;
  insuranceBillable: number;
}

export interface MedicalReceiptListRequest {
  cursorId?: number;
  period?: number;
  startDate?: string;
  endDate?: string;
  type: "ALL" | "APPROVED" | "CANCELED";
  filter: "ALL" | "PROCESSED" | "UNPROCESSED";
  sort: "LATEST" | "OLDEST";
  size?: number;
}

export interface MedicalReceiptListResponse {
  hospitalList: MedicalReceipt[];
  nextCursorId: number | null;
}

export interface MedicalReceipt {
  createdAt: Date;
  storeName: string;
  processState: string;
  totalPrice: number;
  receiptId: number;
}
