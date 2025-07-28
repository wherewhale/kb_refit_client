import { useInsuranceClaimStore } from "~/stores/medicals";

export const useInsuranceClaimForm = () => {
  const store = useInsuranceClaimStore();

  const onChangeReceiptId = (receiptId: string) => {
    store.onChangeReceiptId(receiptId);
  };

  const onSelectInsurance = (insuranceId: string) => {
    store.onSelectInsurance(insuranceId);
  };

  const onChangeVisitedDate = (date: Date) => {
    store.onChangeVisitedDate(date);
  };

  const onChangeDescription = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    store.onChangeDescription(value);
  };

  return {
    onChangeReceiptId,
    onSelectInsurance,
    onChangeVisitedDate,
    onChangeDescription,
  };
};
