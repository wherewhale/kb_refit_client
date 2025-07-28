<script setup lang="ts">
import LoadingDots from "~/components/common/LoadingDots.vue";

const { t } = useI18n();

const props = defineProps<{
  onNext: () => void;
  onPrev: () => void;
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

const proceedStep = async () => {
  // TODO: API 연동해서 진위여부 판별
  const result = true;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (result) {
    step.value = 2;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    props.onNext(); // 마지막 스텝 이후 실행
  } else {
    step.value = 3;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.add({
      title: t("receipt_submit.label.auth_failed"),
      description: t("receipt_submit.label.verification_failed"),
      color: "error",
    });
    props.onPrev(); // 실패 시 이전 단계로 이동
  }
};

onMounted(() => {
  proceedStep();
});
</script>

<template>
  <div class="mt-10 flex flex-col items-center">
    <div class="flex justify-between items-center w-full">
      <div
        class="size-10 flex justify-center items-center bg-kb-gray relative rounded-full"
      >
        <NuxtImg
          src="assets/images/logos/symbol-logo.png"
          alt="kb_logo"
          width="30"
        />
      </div>
      <LoadingDots :state="contents.loading1" />
      <div class="size-15 relative flex justify-center items-center">
        <NuxtImg src="assets/images/logos/k-logo.png" alt="k_logo" />
      </div>
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
