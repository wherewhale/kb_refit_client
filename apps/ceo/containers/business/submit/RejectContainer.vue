<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import RejectReason from "~/components/expense/approval/RejectReason.vue";
import RejectDone from "~/components/business/RejectDone.vue";
import type { Component } from "vue";

const STEPS = [
  "반려 사유 작성",
  "법인카드 사용 반려 완료",
];

const route = useRoute();
const router = useRouter();
const receiptId = route.params.receiptId as string;

const { currentStep, setStep } = useFunnel([...STEPS]);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));

// 목록 이동
const goList = () => router.push("/?tab=business");

// 반려 완료 처리
const onRejectSubmit = () => setStep("법인카드 사용 반려 완료", "forward");

type StepKey = (typeof STEPS)[number];

const stepsMap: Record<
  StepKey,
  { component: Component; props?: Record<string, unknown> }
> = {
  "반려 사유 작성": {
    component: RejectReason,
    props: {
      receiptId,
      onSubmit: onRejectSubmit,
    },
  },
  "법인카드 사용 반려 완료": {
    component: RejectDone,
    props: {
      receiptId,
      onGoList: goList,
    },
  },
};

const currentStepConfig = computed(() => stepsMap[currentStep.value]);
</script>

<template>
  <main class="px-6 pt-10 pb-20">
    <FormContainer :steps="STEPS" :current-step="stepIndex">
      <component
        :is="currentStepConfig?.component"
        v-bind="currentStepConfig?.props"
        :key="currentStep"
      />
    </FormContainer>
  </main>
</template>