<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import ExpenseApprovalInfo from "~/components/expense/approval/ExpenseApprovalInfo.vue";
import ConfirmLoading from "~/components/expense/ConfirmLoading.vue";
import RejectReason from "~/components/expense/approval/RejectReason.vue";
import StepDone from "~/components/expense/StepDone.vue";
import { useMutation } from "@tanstack/vue-query";
import { patchReceiptProcess } from "~/services/expense";

// 스텝 정의
const STEPS = [
  "경비 처리 신청 정보",
  "세무 처리 진행",
  "반려 사유 작성",
  "경비 처리 완료",
];

const route = useRoute();
const router = useRouter();
const receiptId = Number(route.params.receiptId);

const { mutate: mutateProcess } = useMutation({
  mutationFn: (status: "accepted" | "rejected") =>
    patchReceiptProcess(receiptId, status).then(res => res.data),
});

const { currentStep, prevStep, setStep } = useFunnel(STEPS);
const stepIndex = computed(() => STEPS.indexOf(currentStep.value));

const goList = () => router.push("/?tab=expense");

// 세무처리 완료, 반려사유 제출 → 완료 스텝
const onAccountingDone = () => setStep("경비 처리 완료", "forward");
const onRejectSubmit   = () => setStep("경비 처리 완료", "forward");
const onRejectPrev = () => setStep("경비 처리 신청 정보", "backward");
const onApprove = () => setStep("세무 처리 진행", "forward");
const onReject = () => setStep("반려 사유 작성", "forward");

type StepKey = (typeof STEPS)[number];
const stepsMap: Record<
  StepKey,
  { component: Component; props?: Record<string, unknown> }
> = {
  "경비 처리 신청 정보": {
    component: ExpenseApprovalInfo,
    props: {
      receiptId,
      onApprove,
      onReject,
    },
  },
  "세무 처리 진행": {
    component: ConfirmLoading,
    props: {
      receiptId,
      onPrev: prevStep,
      onDone: onAccountingDone,
      onApproved: () => mutateProcess("accepted"),
    },
  },
  "반려 사유 작성": {
    component: RejectReason,
    props: {
      receiptId,
      onPrev: onRejectPrev,
      onSubmit: onRejectSubmit,
      onMutate: mutateProcess,
    },
  },
  "경비 처리 완료": {
    component: StepDone,
    props: {
      receiptId,
      onComplete: goList
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