import type {
    PendingDetail,
    ReceiptProcessDetail,
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