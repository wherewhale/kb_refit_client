<script setup lang="ts">
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import Coin from "~/components/wallet/Coin.vue";
import { WALLET_THEMES } from "~/interfaces/wallet/theme";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const isChecked = ref(false);
</script>
<template>
  <section>
    <button
      class="flex items-center gap-1 text-black cursor-pointer hover:text-kb-yellow-pos"
      @click="props.onBack('내 지갑')"
    >
      <UIcon name="i-heroicons-chevron-left" size="16" />
      <KBUITypography size="b14" weight="medium">브랜드 상점</KBUITypography>
    </button>

    <div class="flex justify-between items-center mt-5">
      <div class="flex items-center gap-2">
        <Coin />
        <KBUITypography size="b14" weight="medium">스타 포인트</KBUITypography>
      </div>
      <!-- TODO: 포인트 연동 -->
      <KBUITypography size="b14" weight="bold"
        >{{ (2750).toLocaleString() }}P</KBUITypography
      >
    </div>
    <UCheckbox
      v-model="isChecked"
      label="보유중인 브랜드만 보기"
      color="warning"
      class="cursor-pointer mt-4"
    />

    <ul class="grid grid-cols-3 justify-between gap-y-4 mt-4">
      <li
        v-for="brand in WALLET_THEMES"
        :key="brand"
        class="relative flex justify-center items-center size-24 cursor-pointer"
      >
        <component :is="BRAND_COMPONENTS[brand]" @click="props.onNext(brand)" />
        <div class="size-20 relative flex items-center justify-center z-20">
          <NuxtImg :src="`assets/images/brands/${brand}.png`" loading="lazy" />
        </div>
      </li>
    </ul>
  </section>
</template>
