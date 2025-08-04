import type { ReceiptTotal } from "~/types/receipt";
import { apiClient } from "./apiClient";

export const getMonthlyReceiptTotal = async () => {
  return apiClient.get<ReceiptTotal>("/receipt/monthlyReport");
};
