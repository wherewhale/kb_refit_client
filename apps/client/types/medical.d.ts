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

export interface MedicalReceiptDetail {
  hospitalName: string;
  companyId: number;
  ceoName: string;
  address: string;
  supplyPrice: number;
  surtax: number;
  transactionType: string;
  createdAt: Date;
  processState: string;
}

export interface MedicalInsurance {
  insuranceId: number;
  insuranceName: string;
  joinedDate: Date;
}

export interface MedicalInsuranceClaimRequest {
  receiptId: number;
  sickedDate: string;
  visitedReason: string;
  insuranceId: number;
}

export interface MedicalCheck {
  hospitalName: string;
  createdAt: Date;
}

export interface MedicalFileResponse {
  medicalImageFileName: string;
}
