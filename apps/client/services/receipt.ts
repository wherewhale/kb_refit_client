import type {
  MonthlyExpense,
  ReceiptDetail,
  ReceiptListRequest,
  ReceiptListResponse,
  RejectedReceiptList,
} from "~/types/receipt";
import { apiClient } from "./apiClient";

export const getMonthlyExpense = async () => {
  return apiClient.get<MonthlyExpense>("/receipt/monthlyExpense");
};

export const getRejectedReceiptList = async () => {
  return apiClient.get<RejectedReceiptList>("/receipt/rejectedList");
};

export const getReceiptList = async (data: ReceiptListRequest) => {
  return apiClient.get<ReceiptListResponse>("/receipt/list", { params: data });
};

export const getReceiptDetail = async (receiptId: string) => {
  return apiClient.get<ReceiptDetail>(`/receipt/detail?receiptId=${receiptId}`);
};
