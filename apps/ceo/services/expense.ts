import type {
    PendingDetail,
    ReceiptProcessDetail,
    ReceiptProcessingRequest,
    CompletedReceiptsResponse,
    EmailSend,
} from "@/types/expense";
import { apiClient } from "./apiClient";

export const getPendingReceipt = async() => {
    return apiClient.get<PendingDetail>("/ceo/pending")
};

export const getReceiptProcessDetail = async (receiptId: number) => {
    return apiClient.get<ReceiptProcessDetail>("/ceo/receipt/detail", {
        params: { receiptId },
    })
}

export const patchReceiptProcess = async ( receiptId: number, status: "accepted" | "rejected", rejectedReason?: string) => {
  return apiClient.patch<ReceiptProcessingRequest>("/ceo/receiptProcessing", { receiptId, progressState: status, rejectedReason });
};

export const getCompletedReceipt = async() => {
    return apiClient.get<CompletedReceiptsResponse>("/ceo/completed")
};

export const postEmailSend = async( payload: EmailSend ) => {
    return apiClient.post<EmailSend>("/ceo/sendEmail" ,payload)
};

export const getMonthlySummary = async () => {
  return await apiClient.get<number>("/ceo/monthlySummary");
};

