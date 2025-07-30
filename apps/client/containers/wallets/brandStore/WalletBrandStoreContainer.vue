<script setup lang="ts">
import BrandList from "./BrandList.vue";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();
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

    <BrandList />
  </section>
</template>
