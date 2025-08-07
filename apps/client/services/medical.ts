import type {
  MedicalCheck,
  MedicalInsurance,
  MedicalInsuranceClaimRequest,
  MedicalReceiptDetail,
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

export const getMedicalReceiptDetail = async (receiptId: number) => {
  return await apiClient.get<MedicalReceiptDetail>(
    `/medical/detail?receiptId=${receiptId}`
  );
};

export const getMyInsuranceList = async () => {
  return await apiClient.get<MedicalInsurance[]>("/medical/insurance");
};

export const patchInsuranceClaim = async (
  data: MedicalInsuranceClaimRequest
) => {
  return await apiClient.patch("/medical/insurance/claim", {
    receiptId: data.receiptId,
    sickedDate: data.sickedDate,
    visitedReason: data.visitedReason,
    insuranceId: data.insuranceId,
  });
};

export const getMedicalInfo = async (receiptId: number) => {
  return await apiClient.get<MedicalCheck>(
    `/medical/insurance/claim?receiptId=${receiptId}`
  );
};
