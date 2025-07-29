<script setup lang="ts">
const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();
</script>
<template>
  <div>
    <button
      class="flex items-center gap-1 text-black cursor-pointer hover:text-kb-yellow-pos"
      @click="props.onBack('내 지갑')"
    >
      <UIcon name="i-heroicons-chevron-left" size="16" />
      <KBUITypography size="b14" weight="medium">배지 도감</KBUITypography>
    </button>

    <div>배지 도감 페이지</div>
  </div>
</template>
