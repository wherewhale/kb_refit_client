<script setup lang="ts">
import LoadingDots from "~/components/common/LoadingDots.vue";

const props = defineProps<{
  onDone: () => void;
}>();

const step = ref(1);
const contents = computed(() => {
  if (step.value === 1) {
    return {
      loading1: "loading",
      description: "담당 세무서에 정보를 보내는 중...",
      loading2: "not-started",
      background: "bg-gray-3",
      icon: "ic:round-check",
    };
  }
  return {
    loading1: "complete",
    description: "회계 정보 송신 완료!",
    loading2: "complete",
    background: "bg-kb-yellow-pos",
    icon: "ic:round-check",
  };
});

const proceedStep = async () => {
  await new Promise((r) => setTimeout(r, 3000)); // 송신 중
  step.value = 2;                                 // 완료
  await new Promise((r) => setTimeout(r, 1500));  // 잠깐 보여주기
  props.onDone();                                 // 다음 스텝
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
      :class="['mt-6', step === 1 ? 'animate-pulse' : '']"
      >{{ contents.description }}</KBUITypography
    >
  </div>
</template>