<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useFunnel } from "~/hooks/useFunnel";
import WalletHome from "~/containers/wallets/WalletHome.vue";
import WalletBrandStoreContainer from "~/containers/wallets/brandStore/WalletBrandStoreContainer.vue";
import WalletBadgeCollectionContainer from "~/containers/wallets/badgeCollection/WalletBadgeCollectionContainer.vue";

const isBottomSheetOpen = ref(false);

const PAGES = ["내 지갑", "브랜드 상점", "배지 도감"];
const direction = ref("forward");

const { currentStep, setStep } = useFunnel(PAGES);
const transitionName = computed(() =>
  direction.value === "forward" ? "slide-left" : "slide-right"
);

const onBack = (page: string) => {
  direction.value = "backward";
  setStep(page);
};

const onNext = (page: string) => {
  direction.value = "forward";
  setStep(page);
};

const stepsMap: Record<
  string,
  {
    component: any;
    props: Record<string, any>;
  }
> = {
  "내 지갑": {
    component: WalletHome,
    props: {
      onNext,
      onBack,
    },
  },
  "브랜드 상점": {
    component: WalletBrandStoreContainer,
    props: {
      onNext,
      onBack,
    },
  },
  "배지 도감": {
    component: WalletBadgeCollectionContainer,
    props: {
      onNext,
      onBack,
    },
  },
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg rounded-t-lg"
  >
    <div class="relative z-40">
      <UButton
        icon="i-heroicons-chevron-up"
        block
        size="lg"
        class="rounded-full !bg-gray-200 text-gray-700 hover:!bg-gray-300 w-10 h-10 absolute bottom-0 left-1/2 transform -translate-x-1/2"
        @click="isBottomSheetOpen = !isBottomSheetOpen"
      />
    </div>
  </div>
  <USlideover
    side="bottom"
    title="Slideover with side"
    :open="isBottomSheetOpen"
    @update:open="isBottomSheetOpen = $event"
  >
    <template #content>
      <div class="relative w-full scrollbar-hide">
        <UButton
          icon="i-heroicons-chevron-down"
          block
          size="lg"
          class="rounded-full !bg-gray-200 text-gray-700 hover:!bg-gray-300 w-10 h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          @click="isBottomSheetOpen = !isBottomSheetOpen"
        />
      </div>
      <div
        class="p-4 pt-8 h-[600px] overflow-y-scroll max-w-sm mx-auto w-full scrollbar-hide"
      >
        <transition :name="transitionName" mode="out-in">
          <component
            :is="currentStepConfig?.component"
            :key="currentStep"
            v-bind="currentStepConfig?.props"
          />
        </transition>
      </div>
    </template>
  </USlideover>
</template>
