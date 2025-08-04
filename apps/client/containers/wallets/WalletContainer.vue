<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useFunnel } from "~/hooks/useFunnel";
import WalletHome from "~/containers/wallets/WalletHome.vue";
import WalletBrandStoreContainer from "~/containers/wallets/brandStore/WalletBrandStoreContainer.vue";
import WalletBadgeCollectionContainer from "~/containers/wallets/badgeCollection/WalletBadgeCollectionContainer.vue";
import SelectBadgeContainer from "~/containers/wallets/badgeCollection/SelectBadgeContainer.vue";

const isBottomSheetOpen = ref(false);
const badgeId = ref<number | null>(null);
const bounceClass = ref("h-14"); // 기본 높이: 56px (14 * 4px)

const PAGES = ["내 지갑", "브랜드 상점", "배지 도감", "배지 선택하기"];
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

const onBadgeSelect = (id: number | null) => {
  badgeId.value = id;
  onNext("배지 선택하기");
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
      onClickBadge: onBadgeSelect,
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
  "배지 선택하기": {
    component: SelectBadgeContainer,
    props: {
      badgeId: badgeId,
      onNext,
      onBack,
    },
  },
} as const;

const currentStepConfig = computed(() => stepsMap[currentStep.value]);

let intervalId: NodeJS.Timeout;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

onMounted(() => {
  intervalId = setInterval(async () => {
    bounceClass.value = "h-16"; // 64px
    await wait(200);
    bounceClass.value = "h-14";
    await wait(200);
    bounceClass.value = "h-15"; // 60px
    await wait(200);
    bounceClass.value = "h-14";
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-[#ffdd00] via-kb-yellow-neg to-kb-yellow-pos shadow-lg rounded-t-lg overflow-hidden transition-all duration-200 ease-in-out"
    :class="bounceClass"
  >
    <KBUIButton
      size="large"
      variant="ghost"
      class="w-full hover:text-white!"
      @click="isBottomSheetOpen = !isBottomSheetOpen"
    >
      지갑 꾸미기
      <UIcon name="ic:sharp-wallet" class="ml-2" :size="20" />
    </KBUIButton>
  </div>
  <USlideover
    side="bottom"
    title="Slideover with side"
    :open="isBottomSheetOpen"
    @update:open="isBottomSheetOpen = $event"
  >
    <template #content>
      <aside class="bg-white">
        <div class="relative w-full scrollbar-hide">
          <UButton
            icon="line-md:chevron-small-double-down"
            block
            size="lg"
            class="rounded-full bg-gradient-to-br from-[#ffdd00] via-kb-yellow-neg to-kb-yellow-pos text-black hover:!bg-kb-yellow-neg size-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
      </aside>
    </template>
  </USlideover>
</template>
