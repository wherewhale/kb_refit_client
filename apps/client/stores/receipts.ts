import { defineStore } from "pinia";
import type { ReceiptSubmissionForm } from "~/interfaces/receipt/form.interface";

export const useReceiptSubmitStore = defineStore("submitReceipt", {
  state: (): ReceiptSubmissionForm => ({
    businessNumber: "",
    ceoName: "",
    openDate: new Date(),
    category: "업무 추진",
    description: "",
  }),

  actions: {
    // 각 스텝에 따라 넘길 state change 함수 설정
    onChangeBusinessNumber(businessNumber: string) {
      this.businessNumber = businessNumber;
    },
    onChangeCeoName(ceoName: string) {
      this.ceoName = ceoName;
    },
    onChangeOpenDate(openDate: Date) {
      this.openDate = openDate;
    },
    onChangeCategory(category: string) {
      this.category = category;
    },
    onChangeDescription(description: string) {
      this.description = description;
    },
    reset() {
      this.businessNumber = "";
      this.ceoName = "";
      this.openDate = new Date();
      this.category = "업무 추진";
      this.description = "";
    },
  },
});
