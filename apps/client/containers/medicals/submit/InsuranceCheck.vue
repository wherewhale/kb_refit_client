<script setup lang="ts">
import LoadingDots from "~/components/common/LoadingDots.vue";

const props = defineProps<{
  onNext: () => void;
}>();

const step = ref(1);
const contents = computed(() => {
  switch (step.value) {
    case 1:
      return {
        loading1: "loading",
        description: "마이데이터 확인중...",
        loading2: "not-started",
        background: "bg-gray-3",
        icon: "ic:round-check",
      };
    default:
      return {
        loading1: "complete",
        description: "보험 정보 확인 완료!",
        loading2: "complete",
        background: "bg-kb-yellow-pos",
        icon: "ic:round-check",
      };
  }
});

const proceedStep = async () => {
  // TODO: API 연동해서 보험 정보 가져오기
  const result = true;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (result) {
    step.value = 2;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    props.onNext(); // 마지막 스텝 이후 실행
  }
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
