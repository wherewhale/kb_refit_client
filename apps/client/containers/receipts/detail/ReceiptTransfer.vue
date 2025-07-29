<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";

import AccountInfo from "~/containers/receipts/transfer/AccountInfo.vue";
import SelectAccount from "~/containers/receipts/transfer/SelectAccount.vue";
import TransferInfoCheck from "~/containers/receipts/transfer/TransferInfoCheck.vue";
import TransferComplete from "~/containers/receipts/transfer/TransferComplete.vue";

const { t } = useI18n();

const STEPS = [
  "계좌 정보 확인하기",
  "내 계좌 선택하기",
  "이체 정보 확인하기",
  "가상 계좌 이체 완료",
];

const route = useRoute();
const router = useRouter();
const receiptId = route.params.receiptId as string;
const { currentStep, direction, nextStep, prevStep } = useFunnel(STEPS);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));
const transitionName = computed(() =>
  direction.value === "forward" ? "slide-left" : "slide-right"
);

const onClickNext = () => {
  const isValid = currentStepConfig.value?.validateStep?.();
  if (isValid === false) return;

  nextStep();
};

const onClickPrev = () => {
  prevStep();
};

const onClickComplete = () => {
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
  // FIXME: step 이름은 i18n 키로 변경
  "계좌 정보 확인하기": {
    component: AccountInfo,
    props: { onNext: onClickNext },
    validateStep: () => true,
  },
  "내 계좌 선택하기": {
    component: SelectAccount,
    props: { onNext: onClickNext },
  },
  "이체 정보 확인하기": {
    component: TransferInfoCheck,
    props: {},
    validateStep: () => true,
  },
  "가상 계좌 이체 완료": {
    component: TransferComplete,
    props: {},
  },
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);
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
      >{{ stepIndex === 2 ? t("common.button.send") : "이체하기" }}</KBUIButton
    >
    <KBUIButton
      v-if="stepIndex === 3"
      size="large"
      variant="primary"
      class="w-full mt-10"
      @click="onClickComplete"
      >{{ t("common.button.complete") }}</KBUIButton
    >
  </main>
</template>
