export interface CompanyDetail {
  companyId: number;
  companyName: string;
  ceoName: string;
  address: string;
}

export interface CompanyList {
  list: companyDetail[];
}

export interface Merchandise {
  merchandiseId: number;
  merchandiseName: string;
  merchandisePrice: number;
}

export interface MerchandiseList {
  companyId: number;
  merchandiseList: Merchandise[];
}

export interface ReceiptRequest {
  amount: number;
  merchandiseId: number;
}

export interface ReceiptContentRequest {
  cardId: string;
  contentsList: ReceiptRequest[];
}
