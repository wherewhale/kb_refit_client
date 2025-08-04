<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import dayjs from "dayjs";
import LoadingDots from "~/components/common/LoadingDots.vue";
import { postCompanyCheck } from "~/services/company";

const { t } = useI18n();

const props = defineProps<{
  onNext: () => void;
  onPrev: () => void;
  store: ReturnType<typeof useReceiptSubmitStore>;
}>();

const step = ref(1);
const toast = useToast();
const contents = computed(() => {
  switch (step.value) {
    case 1:
      return {
        loading1: "loading",
        description: t("receipt_submit.label.confirm_public"),
        loading2: "not-started",
        background: "bg-gray-3",
        icon: "ic:round-check",
      };
    case 2:
      return {
        loading1: "complete",
        description: t("receipt_submit.label.auth_complete"),
        loading2: "complete",
        background: "bg-kb-yellow-pos",
        icon: "ic:round-check",
      };
    default:
      return {
        loading1: "complete",
        description: t("receipt_submit.label.auth_failed"),
        loading2: "complete",
        background: "bg-kb-yellow-pos",
        icon: "ic:round-close",
      };
  }
});

const { mutate } = useMutation({
  mutationFn: async () =>
    await postCompanyCheck({
      companyId: props.store.businessNumber,
      ceoName: props.store.ceoName,
      openedDate: dayjs(props.store.openDate).format("YYYYMMDD"),
    }),
  onSuccess: async () => {
    step.value = 2;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    props.onNext(); // 인증 성공 후 다음 단계로 이동
  },
  onError: () => {
    step.value = 3;
    toast.add({
      title: t("receipt_submit.label.auth_failed"),
      description: t("receipt_submit.label.verification_failed"),
      color: "error",
    });
    props.onPrev(); // 인증 실패 시 이전 단계로 이동
  },
});

const proceedStep = async () => {
  mutate();
};

onMounted(() => {
  proceedStep();
});
</script>

<template>
  <div class="mt-10 flex flex-col items-center">
    <div class="flex justify-between items-center w-full">
      <figure
        class="size-10 flex justify-center items-center bg-kb-gray relative rounded-full"
      >
        <NuxtImg
          src="assets/images/logos/symbol-logo.png"
          alt="kb_logo"
          width="30"
        />
      </figure>
      <LoadingDots :state="contents.loading1" />
      <figure class="size-15 relative flex justify-center items-center">
        <NuxtImg src="assets/images/logos/k-logo.png" alt="k_logo" />
      </figure>
      <LoadingDots :state="contents.loading2" />
      <div
        :class="[
          'size-10 flex justify-center items-center relative rounded-full',
          contents.background,
        ]"
      >
        <UIcon :name="contents.icon" size="24" />
      </div>
    </div>
    <KBUITypography
      size="b12"
      weight="medium"
      :class="['mt-6', step < 2 ? 'animate-pulse' : '']"
      >{{ contents.description }}</KBUITypography
    >
  </div>
</template>
