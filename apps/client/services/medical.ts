import type { MedicalReceiptRecent } from "~/types/medical";
import { apiClient } from "./apiClient";

export const getMedicalSummary = async () => {
  return await apiClient.get<MedicalReceiptRecent>("/medical/recent");
};
