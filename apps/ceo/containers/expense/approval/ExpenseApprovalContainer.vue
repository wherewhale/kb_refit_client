<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import ExpenseApprovalInfo from "~/components/expense/approval/ExpenseApprovalInfo.vue";
import ConfirmLoading from "~/components/expense/ConfirmLoading.vue";
import RejectReason from "~/components/expense/approval/RejectReason.vue";
import StepDone from "~/components/expense/StepDone.vue";

// 스텝 정의
const STEPS = [
  "경비 처리 신청 정보",
  "세무 처리 진행",
  "반려 사유 작성",
  "경비 처리 완료",
];

const route = useRoute();
const router = useRouter();
const receiptId = route.params.receiptId as string;

const { currentStep, prevStep, setStep } = useFunnel([...STEPS]);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));
// TODO: transition 로직 추가

// 공용 핸들러
const goList = () => router.push("/?tab=expense");

// 승인/반려 버튼 동작
const onApprove = () => setStep("세무 처리 진행", "forward");
const onReject  = () => setStep("반려 사유 작성", "forward");

// 세무처리 완료, 반려사유 제출 → 완료 스텝
const onAccountingDone = () => setStep("경비 처리 완료", "forward");
const onRejectSubmit   = () => setStep("경비 처리 완료", "forward");
const onRejectPrev = () => setStep("경비 처리 신청 정보", "backward");

// 스텝 맵 (동적 컴포넌트 + props)
type StepKey = (typeof STEPS)[number];
const stepsMap: Record<
  StepKey,
  { component: Component; props?: Record<string, unknown> }
> = {
  "경비 처리 신청 정보": {
    component: ExpenseApprovalInfo,
    props: {
      receiptId,
      onApprove,   // 내부에서 승인 버튼 클릭 시 호출
      onReject,    // 내부에서 반려 버튼 클릭 시 호출
    },
  },
  "세무 처리 진행": {
    component: ConfirmLoading,
    props: {
      receiptId,
      onPrev: prevStep,
      onDone: onAccountingDone,
    },
  },
  "반려 사유 작성": {
    component: RejectReason,
    props: {
      receiptId,
      onPrev: onRejectPrev,
      onSubmit: onRejectSubmit,
    },
  },
  "경비 처리 완료": {
    component: StepDone,
    props: {
      receiptId,
      onComplete: goList,
    },
  },
};

const currentStepConfig = computed(() => stepsMap[currentStep.value]);
</script>

<template>
  <main class="px-6 pt-10 pb-20">
    <FormContainer :steps="[...STEPS]" :current-step="stepIndex">
        <component
          :is="currentStepConfig?.component"
          v-bind="currentStepConfig?.props"
          :key="currentStep"
        />
    </FormContainer>
  </main>
</template>