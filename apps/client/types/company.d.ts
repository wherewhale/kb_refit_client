export interface MyDataCompany {
  companyId: number;
  companyName: string;
  startDate: Date;
  endDate: Date | null;
}

export interface CompanyCheckRequest {
  companyId: string;
  ceoName: string;
  openedDate: string;
}

export interface CompanyCheckResponse {
  companyId: string;
  companyName: string;
  ceoName: string;
  openedDate: string;
  valid: boolean;
}

export interface CompanyInfo {
  companyName: string;
  address: string;
}
