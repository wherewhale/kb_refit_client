<script setup lang="ts">
import { useReceiptExpenseForm } from "~/hooks/form/useReceiptExpenseForm";
import { useFunnel } from "~/hooks/useFunnel";
import { useValidation } from "~/hooks/useValidation";
import { useReceiptSubmitStore } from "~/stores/receipts";
import CeoForm from "~/containers/receipts/submit/CeoForm.vue";

const STEPS = [
  "사업자 정보 입력",
  "사업자 진위 여부 확인",
  "영수 처리 정보 확인",
  "영수 처리 완료",
];

const { currentStep, direction, nextStep, prevStep, setStep } =
  useFunnel(STEPS);
const state = useReceiptSubmitStore();
const { isValidated, errorMessage, guideMessage, validate } = useValidation();
const {
  onChangeBusinessNumber,
  onChangeCeoName,
  onChangeOpenDate,
  onChangeCategory,
} = useReceiptExpenseForm(validate);

const transitionName = computed(() =>
  direction.value === "forward" ? "slide-left" : "slide-right"
);

const getStepComponent = (step: string) => {
  if (step === STEPS[0]) return CeoForm;
  else return null;
};

const getStepProps = (step: string) => {
  const index = STEPS.indexOf(step);

  if (step === STEPS[0]) {
    return {
      key: step,
      steps: STEPS,
      currentStep: index,
      openDate: state.openDate ?? null,
      onChangeBusinessNumber,
      onChangeCeoName,
      onChangeOpenDate,
    };
  }

  return {
    key: step,
    steps: STEPS,
    currentStep: index,
    openDate: state.openDate,
    onChangeBusinessNumber: () => {},
    onChangeCeoName: () => {},
    onChangeOpenDate: () => {},
  };
};

const onClickNext = () => {
  nextStep();
};

const onClickPrev = () => {
  prevStep();
};
</script>

<template>
  <main class="px-6 py-20">
    <FormContainer :steps="STEPS" :current-step="STEPS.indexOf(currentStep)">
      <div>
        <transition :name="transitionName" mode="out-in">
          <component
            :is="getStepComponent(currentStep)"
            v-bind="getStepProps(currentStep)"
          />
        </transition>
        <div class="flex justify-between mt-6">
          <KBUIButton
            v-if="STEPS.indexOf(currentStep) > 0"
            size="large"
            variant="secondary"
            @click="onClickPrev"
          >
            이전
          </KBUIButton>
          <KBUIButton
            v-if="STEPS.indexOf(currentStep) < STEPS.length - 1"
            size="large"
            variant="primary"
            @click="onClickNext"
          >
            다음
          </KBUIButton>
        </div>
      </div>
    </FormContainer>
  </main>
</template>
