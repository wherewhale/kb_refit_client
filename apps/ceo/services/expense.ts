import type {
    PendingDetail,
} from "@/types/expense";
import { apiClient } from "./apiClient";

export const getPendingReceipt = async() => {
    return apiClient.get<PendingDetail>("/ceo/pending")
};