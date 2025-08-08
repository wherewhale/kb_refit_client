import { defineStore } from "pinia";
import type { StoreInfo } from "~/interfaces/store.interface";

export const useCompanyStore = defineStore("companyStore", {
  state: (): StoreInfo => ({
    companyId: 0,
    companyName: "",
    ceoName: "",
    address: "",
  }),

  actions: {
    // 각 스텝에 따라 넘길 state change 함수 설정
    onChangeCompany(data: StoreInfo) {
      this.companyId = data.companyId;
      this.companyName = data.companyName;
      this.ceoName = data.ceoName;
      this.address = data.address;
    },

    reset() {
      this.companyId = 0;
      this.ceoName = "";
      this.companyName = "";
      this.address = "";
    },
  },
});
