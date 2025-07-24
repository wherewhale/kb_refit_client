import { ref } from "vue";
import type { ValidationRule } from "~/interfaces/common/validation.interface";

export const useValidation = <T>() => {
  const errorMessage = ref("");
  const isValidated = ref(false);
  const guideMessage = ref("");

  const validate = (value: T, rules: ValidationRule<T>[]) => {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        isValidated.value = false;
        errorMessage.value = result.errorMessage ?? "";
        return;
      } else {
        guideMessage.value = result.guideMessage ?? "";
      }
    }

    isValidated.value = true;
    errorMessage.value = "";
  };

  return {
    isValidated,
    errorMessage,
    guideMessage,
    validate,
  };
};
