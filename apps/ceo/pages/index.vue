<script setup lang="ts">
// This is a simple Vue component for testing purposes

import { ref } from 'vue';

const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <div
    class="max-w-sm mx-auto mt-10 flex flex-col items-center justify-center gap-4"
  >
    <div>사장님 전용 페이지 테스트</div>
    <div class="text-2xl font-bold">카운트: {{ count }}</div>
    <UButton
      variant="solid"
      class="px-8 py-3 text-lg cursor-pointer active:bg-blue-600 active:text-white w-full"
      @click="increment"
    >
      <span class="w-full">카운트 증가</span>
    </UButton>
    <div class="w-full h-20 bg-kb-yellow-neg">
      <span class="text-kb-gold-1">노란색 배경</span>
    </div>
    <UIcon name="fluent-color:alert-20" class="text-4xl text-blue-500" />
    <KBUITypography tag="h1" weight="bold" size="h36" color="purple-1"
      >테스트</KBUITypography
    >
  </div>
</template>
