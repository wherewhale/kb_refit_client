<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from "vue";
import { useFunnel } from "~/hooks/useFunnel";
import { useValidation } from "~/hooks/useValidation";
import { useReceiptExpenseForm } from "~/hooks/form/useReceiptExpenseForm";
import { useReceiptSubmitStore } from "~/stores/receipts";
import { BUSINESS_NUMBER_REGEX } from "~/utils/regex";

import JobInfoCheck from "~/containers/receipts/submit/JobInfoCheck.vue";
import SelectCompany from "../submit/SelectCompany.vue";
import CeoForm from "~/containers/receipts/submit/CeoForm.vue";
import BusinessInfoCheck from "~/containers/receipts/submit/BusinessInfoCheck.vue";
import ReceiptProcessingInfo from "~/containers/receipts/submit/ReceiptProcessingInfo.vue";
import SubmitComplete from "~/containers/receipts/submit/SubmitComplete.vue";

const { t } = useI18n();

const STEPS = [
  "고용 정보 확인하기",
  "사업장 선택하기",
  "receipt_submit.step.ceoInfo",
  "receipt_submit.step.verifyBusiness",
  "receipt_submit.step.processingInfo",
  "receipt_submit.step.process_completed",
];

const route = useRoute();
const router = useRouter();
const receiptId = route.params.receiptId as string;
const { currentStep, direction, nextStep, prevStep, setStep } =
  useFunnel(STEPS);
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
  onChangeFilename,
  onChangeDescription,
  onChangeCategory,
} = useReceiptExpenseForm(); // validate는 useForm 안에서 하지 않음

const onClickNext = () => {
  const isValid = currentStepConfig.value?.validateStep?.();
  if (isValid === false) return;

  nextStep();
};

const onClickPrev = () => {
  prevStep();
};

const onSelectCompany = (companyId: string) => {
  store.onChangeCompanyId(companyId);
  setStep("receipt_submit.step.processingInfo");
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
  "고용 정보 확인하기": {
    component: JobInfoCheck,
    props: { onNext: onClickNext },
    validateStep: () => true,
  },
  "사업장 선택하기": {
    component: SelectCompany,
    props: { onNext: onClickNext, onSelectCompany: onSelectCompany },
    validateStep: () => true, // 이 단계는 검증이 필요 없으므로 항상 true 반환
  },
  "receipt_submit.step.ceoInfo": {
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
                  errorMessage: t("receipt_submit.description.business_num"),
                },
        ]),
        validate("ceoName", store.ceoName, [
          (v) =>
            v.length > 0
              ? { isValid: true }
              : {
                  isValid: false,
                  errorMessage: t("receipt_submit.description.required_name"),
                },
        ]),
        validate("openDate", store.openDate, [
          (v) =>
            v instanceof Date && !isNaN(v.getTime())
              ? { isValid: true }
              : {
                  isValid: false,
                  errorMessage: t("receipt_submit.description.select_date"),
                },
        ]),
      ].every(Boolean),
  },
  "receipt_submit.step.verifyBusiness": {
    component: BusinessInfoCheck,
    props: { onNext: onClickNext, onPrev: onClickPrev },
    validateStep: () => true, // 이 단계는 검증이 필요 없으므로 항상 true 반환
  },
  "receipt_submit.step.processingInfo": {
    component: ReceiptProcessingInfo,
    props: {
      onChangeDescription,
      onChangeCategory,
      onChangeFilename,
      store,
    },
    validateStep: () =>
      [
        validate("category", store.category, [
          (v) =>
            v.length > 0
              ? { isValid: true }
              : {
                  isValid: false,
                  errorMessage: t("receipt_detail.error.select_item"),
                },
        ]),
        validate("description", store.description, [
          (v) =>
            v.length <= 80 && v.length > 0
              ? { isValid: true }
              : {
                  isValid: false,
                  errorMessage: t("receipt_detail.error.select_item"),
                },
        ]),
      ].every(Boolean),
  },
  "receipt_submit.step.process_completed": {
    component: SubmitComplete,
    props: {},
    validateStep: () => true, // 완료 단계는 검증이 필요 없으므로 always true 반환
  },
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);

onMounted(() => {
  store.reset(); // 컴포넌트가 마운트될 때 스토어 초기화
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
      v-if="[2, 4].includes(stepIndex)"
      size="large"
      variant="primary"
      class-name="w-full mt-10"
      :disabled="!currentStepConfig?.validateStep?.()"
      @click="onClickNext"
      >{{
        stepIndex === 2 ? t("common.button.send") : t("common.button.next")
      }}</KBUIButton
    >
    <KBUIButton
      v-if="stepIndex === 5"
      size="large"
      variant="primary"
      class="w-full mt-10"
      @click="onClickComplete"
      >{{ t("common.button.complete") }}</KBUIButton
    >
    <KBUIButton
      v-if="stepIndex === 4"
      size="large"
      variant="secondary"
      class-name="w-full mt-2"
      @click="onClickPrev"
      >{{ t("common.button.before") }}</KBUIButton
    >
  </main>
</template>
