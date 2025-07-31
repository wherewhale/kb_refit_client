import { useReceiptSubmitStore } from "~/stores/receipts";

export const useReceiptExpenseForm = () => {
  const store = useReceiptSubmitStore();

  const onChangeBusinessNumber = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    store.onChangeBusinessNumber(value);
  };

  const onChangeCeoName = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    store.onChangeCeoName(value);
  };

  const onChangeOpenDate = (date: Date) => {
    store.onChangeOpenDate(date);
  };

  const onChangeFilename = (filename: string) => {
    store.onChangeFilename(filename);
  };

  const onChangeDescription = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    store.onChangeDescription(value);
  };

  const onChangeCategory = (categoryValue: string) => {
    store.onChangeCategory(categoryValue);
  };

  return {
    onChangeBusinessNumber,
    onChangeCeoName,
    onChangeOpenDate,
    onChangeFilename,
    onChangeDescription,
    onChangeCategory,
  };
};
