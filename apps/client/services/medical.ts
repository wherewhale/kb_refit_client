import type {
  MedicalReceiptListRequest,
  MedicalReceiptListResponse,
  MedicalReceiptRecent,
} from "~/types/medical";
import { apiClient } from "./apiClient";

export const getMedicalSummary = async () => {
  return await apiClient.get<MedicalReceiptRecent>("/medical/recent");
};

export const getMedicalReceiptList = async (
  params: MedicalReceiptListRequest
) => {
  return await apiClient.get<MedicalReceiptListResponse>("/medical/list", {
    params: {
      cursorId: params.cursorId,
      period: params.period,
      startDate: params.startDate,
      endDate: params.endDate,
      type: params.type,
      filter: params.filter,
      sort: params.sort,
      size: params.size,
    },
  });
};
