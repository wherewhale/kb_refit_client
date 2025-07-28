<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import { useValidation } from "~/hooks/useValidation";
import { useReceiptSubmitStore } from "~/stores/receipts";

import InsuranceCheck from "~/containers/medicals/submit/InsuranceCheck.vue";
import BusinessInfoCheck from "~/containers/receipts/submit/BusinessInfoCheck.vue";
import SubmitComplete from "~/containers/medicals/submit/SubmitComplete.vue";
import SelectInsurance from "~/containers/medicals/submit/SelectInsurance.vue";
import { useInsuranceClaimForm } from "~/hooks/form/useInsuranceClaimForm";

const STEPS = [
  "가입된 보험 확인하기",
  "보험 선택하기",
  "진료 정보 확인하기",
  "보험금 청구 완료",
];

const route = useRoute();
const router = useRouter();
const receiptId = route.params.receiptId as string;
const { currentStep, direction, nextStep, prevStep } = useFunnel(STEPS);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));
const transitionName = computed(() =>
  direction.value === "forward" ? "slide-left" : "slide-right"
);

const store = useReceiptSubmitStore();
const { validate, errors } = useValidation();
const {
  onChangeReceiptId,
  onSelectInsurance,
  onChangeStartDate,
  onChangeDescription,
} = useInsuranceClaimForm();

const onClickNext = () => {
  const isValid = currentStepConfig.value?.validateStep?.();
  if (isValid === false) return;

  nextStep();
};

const onClickPrev = () => {
  prevStep();
};

const onClickComplete = () => {
  store.reset(); // 폼 초기화
  router.push(`/receipt/${receiptId}`); // 영수증 목록으로 이동
};

// step 구성 객체
const stepsMap: Record<
  string,
  {
    component: any;
    props: Record<string, any>;
    validateStep?: () => boolean;
  }
> = {
  "가입된 보험 확인하기": {
    component: InsuranceCheck,
    props: { onNext: onClickNext },
    validateStep: () => true,
  },
  "보험 선택하기": {
    component: SelectInsurance,
    props: {
      onNext: onClickNext,
      onSelectInsurance: onSelectInsurance,
    },
    validateStep: () => true,
  },
  "진료 정보 확인하기": {
    component: BusinessInfoCheck,
    props: { onNext: onClickNext, onPrev: onClickPrev },
    validateStep: () => true, // 이 단계는 검증이 필요 없으므로 항상 true 반환
  },

  "보험금 청구 완료": {
    component: SubmitComplete,
    props: {},
    validateStep: () => true, // 완료 단계는 검증이 필요 없으므로 always true 반환
  },
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);

onMounted(() => {
  store.reset(); // 컴포넌트가 마운트될 때 스토어 초기화
  onChangeReceiptId(receiptId);
});
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
      v-if="[0, 2].includes(stepIndex)"
      size="large"
      variant="primary"
      class-name="w-full mt-10"
      :disabled="!currentStepConfig?.validateStep?.()"
      @click="onClickNext"
      >{{ stepIndex === 2 ? "보내기" : "다음" }}</KBUIButton
    >
    <KBUIButton
      v-if="stepIndex === 3"
      size="large"
      variant="primary"
      class="w-full mt-10"
      @click="onClickComplete"
      >완료</KBUIButton
    >
    <KBUIButton
      v-if="stepIndex === 2"
      size="large"
      variant="secondary"
      class-name="w-full mt-2"
      @click="onClickPrev"
      >이전</KBUIButton
    >
  </main>
</template>
