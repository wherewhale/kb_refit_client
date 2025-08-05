import type {
    PendingDetail,
    ReceiptProcessDetail,
    ReceiptProcessingRequest,
    CompletedReceiptsResponse
} from "@/types/expense";
import { apiClient } from "./apiClient";

export const getPendingReceipt = async() => {
    return apiClient.get<PendingDetail>("/ceo/pending")
};

export const getReceiptProcessDetail = async (receiptId: number) => {
    return apiClient.get<ReceiptProcessDetail>("/ceo/receiptProcessDetail", {
        params: { receiptId },
    })
}

export const patchReceiptProcess = async ( receiptProcessId: number, status: "accepted" | "rejected", rejectedReason?: string) => {
  return apiClient.patch<ReceiptProcessingRequest>("/ceo/receiptProcessing", { receiptProcessId, progressState: status, rejectedReason });
};

export const getCompletedReceipt = async() => {
    return apiClient.get<CompletedReceiptsResponse>("/ceo/completed")
};