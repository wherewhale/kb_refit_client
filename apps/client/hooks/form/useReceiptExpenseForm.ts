import { toRefs } from "vue";
import type { ValidateFn } from "~/interfaces/common/validation.interface";
import { useReceiptSubmitStore } from "~/stores/receipts";
import { BUSINESS_NUMBER_REGEX } from "~/utils/regex";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useReceiptExpenseForm = (validate: ValidateFn<any>) => {
  const store = useReceiptSubmitStore();
  const { businessNumber, ceoName, openDate, description } = toRefs(store);

  const onChangeBusinessNumber = (e: Event) => {
    const target = e.target as HTMLInputElement;
    store.onChangeBusinessNumber(target.value);
    validate(businessNumber.value, [
      (value) =>
        BUSINESS_NUMBER_REGEX.test(value)
          ? { isValid: true }
          : {
              isValid: false,
              errorMessage: "사업자 번호는 10자리 숫자여야 합니다.",
            },
    ]);
  };

  const onChangeCeoName = (e: Event) => {
    const target = e.target as HTMLInputElement;
    store.onChangeCeoName(target.value);
    validate(ceoName.value, [
      (value) =>
        value.length > 0
          ? { isValid: true }
          : { isValid: false, errorMessage: "대표자 이름은 필수 항목입니다." },
    ]);
  };

  const onChangeOpenDate = (date: Date) => {
    store.onChangeOpenDate(date);

    validate(date, [
      (value) =>
        value instanceof Date && !isNaN(value.getTime())
          ? { isValid: true }
          : { isValid: false, errorMessage: "유효한 날짜를 선택해 주세요." },
    ]);
  };

  const onChangeDescription = (e: Event) => {
    const target = e.target as HTMLInputElement;
    store.onChangeDescription(target.value);
    validate(description.value, [
      (value) =>
        value.length <= 80 && value.length > 0
          ? { isValid: true }
          : {
              isValid: false,
              errorMessage: `세부 내용은 1자 이상 80자 이하로 작성해 주세요.`,
            },
    ]);
  };

  const onChangeCategory = (categoryValue: string) => {
    store.onChangeCategory(categoryValue);
    validate(categoryValue, [
      (value) =>
        value.length > 0
          ? { isValid: true }
          : { isValid: false, errorMessage: "카테고리는 필수 항목입니다." },
    ]);
  };

  return {
    onChangeBusinessNumber,
    onChangeCeoName,
    onChangeOpenDate,
    onChangeDescription,
    onChangeCategory,
  };
};
