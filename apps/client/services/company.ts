import type {
  CompanyCheckResponse,
  CompanyCheckRequest,
  MyDataCompany,
} from "~/types/company";
import { apiClient } from "./apiClient";

export const getMyDataCompany = async () => {
  return apiClient.get<MyDataCompany[]>("/receipt/process/select");
};

export const postCompanyCheck = async (data: CompanyCheckRequest) => {
  return apiClient.post<CompanyCheckResponse>(
    "/receipt/process/checkCompany",
    data,
  );
};
