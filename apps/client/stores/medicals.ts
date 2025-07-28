import { defineStore } from "pinia";
import type { InsuranceClaimForm } from "~/interfaces/medical/form.interface";

export const useInsuranceClaimStore = defineStore("claimInsurance", {
  state: (): InsuranceClaimForm => ({
    receiptId: "",
    insuranceId: "",
    visitedDate: new Date(),
    description: "",
  }),

  actions: {
    // 각 스텝에 따라 넘길 state change 함수 설정
    onChangeReceiptId(receiptId: string) {
      this.receiptId = receiptId;
    },
    onSelectInsurance(insuranceId: string) {
      this.insuranceId = insuranceId;
    },
    onChangeVisitedDate(date: Date) {
      this.visitedDate = date;
    },
    onChangeDescription(description: string) {
      this.description = description;
    },
    reset() {
      this.receiptId = "";
      this.visitedDate = new Date();
      this.description = "";
    },
  },
});
