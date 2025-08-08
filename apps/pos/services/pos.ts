import type {
  CompanyList,
  MerchandiseList,
  ReceiptContentRequest,
} from "~/types/pos";
import { apiClient } from "./apiClient";

export const getCompanyList = async () => {
  return apiClient.get<CompanyList>("/pos/company");
};

export const getMerchandiseList = async (companyId: number) => {
  return apiClient.get<MerchandiseList>(`/pos/merchandise/${companyId}`);
};

export const postPurchaseReceipt = async (data: ReceiptContentRequest) => {
  return apiClient.post("/pos/create", data);
};
