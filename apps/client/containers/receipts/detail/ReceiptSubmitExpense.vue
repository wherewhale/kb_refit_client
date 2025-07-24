<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import { useValidation } from "~/hooks/useValidation";
import { useReceiptExpenseForm } from "~/hooks/form/useReceiptExpenseForm";
import { useReceiptSubmitStore } from "~/stores/receipts";
import { BUSINESS_NUMBER_REGEX } from "~/utils/regex";

import CeoForm from "~/containers/receipts/submit/CeoForm.vue";

const STEPS = [
  "사업자 정보 입력",
  "사업자 진위 여부 확인",
  "영수 처리 정보 확인",
  "영수 처리 완료",
];

const { currentStep, direction, nextStep, prevStep } = useFunnel(STEPS);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));
const transitionName = computed(() =>
  direction.value === "forward" ? "slide-left" : "slide-right"
);

const store = useReceiptSubmitStore();
const { validate, errors } = useValidation();
const {
  onChangeBusinessNumber,
  onChangeCeoName,
  onChangeOpenDate,
  onChangeDescription,
  onChangeCategory,
} = useReceiptExpenseForm(); // validate는 useForm 안에서 하지 않음

// step 구성 객체
const stepsMap: Record<
  string,
  {
    component: any;
    props: Record<string, any>;
    validateStep?: () => boolean;
  }
> = {
  "사업자 정보 입력": {
    component: CeoForm,
    props: {
      store,
      errors,
      onChangeBusinessNumber,
      onChangeCeoName,
      onChangeOpenDate,
    },
    validateStep: () =>
      [
        validate("businessNumber", store.businessNumber, [
          (v) =>
            BUSINESS_NUMBER_REGEX.test(v)
              ? { isValid: true }
              : {
                  isValid: false,
                  errorMessage: "사업자 번호는 10자리 숫자여야 합니다.",
                },
        ]),
        validate("ceoName", store.ceoName, [
          (v) =>
            v.length > 0
              ? { isValid: true }
              : { isValid: false, errorMessage: "대표자 이름은 필수입니다." },
        ]),
        validate("openDate", store.openDate, [
          (v) =>
            v instanceof Date && !isNaN(v.getTime())
              ? { isValid: true }
              : { isValid: false, errorMessage: "개업일자를 선택해주세요." },
        ]),
      ].every(Boolean),
  },

  // 이후 스텝은 필요 시 확장
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);

const onClickNext = () => {
  console.log(store);
  const isValid = currentStepConfig.value?.validateStep?.();
  if (isValid === false) return;

  nextStep();
};

const onClickPrev = () => prevStep();
</script>

<template>
  <main class="px-6 pt-10 pb-20">
    <FormContainer :steps="STEPS" :current-step="stepIndex">
      <transition :name="transitionName" mode="out-in">
        <component
          :is="currentStepConfig?.component"
          v-bind="currentStepConfig?.props"
        />
      </transition>
    </FormContainer>
    <KBUIButton
      v-if="stepIndex !== 1"
      size="large"
      variant="primary"
      class-name="w-full mt-10"
      :disabled="!currentStepConfig?.validateStep?.()"
      @click="onClickNext"
      >다음</KBUIButton
    >
  </main>
</template>
