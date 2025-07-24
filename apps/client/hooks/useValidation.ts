// ~/hooks/useValidation.ts
import { reactive, toRefs } from "vue";
import type { Validator } from "~/interfaces/common/validation.interface";

export function useValidation() {
  const errors = reactive<Record<string, string>>({});

  function validate<T>(key: string, value: T, validators: Validator<T>[]) {
    for (const v of validators) {
      const result = v(value);
      if (!result.isValid) {
        errors[key] = result.errorMessage || "유효하지 않은 값입니다.";
        return false;
      }
    }
    errors[key] = "";
    return true;
  }

  function resetErrors() {
    Object.keys(errors).forEach((key) => (errors[key] = ""));
  }

  return {
    ...toRefs(errors),
    errors,
    validate,
    resetErrors,
  };
}
