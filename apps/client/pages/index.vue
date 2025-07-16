<script setup lang="ts">
// This is a simple Vue component for testing purposes

import { ref } from "vue";

const count = ref(0);
const increment = () => {
  count.value++;
};

const items = ref(["Backlog", "Todo", "In Progress", "Done"]);
const value = ref("Backlog");
</script>

<template>
  <div
    class="max-w-sm mx-auto mt-10 flex flex-col items-center justify-center gap-4"
  >
    <div>클라이언트 전용 페이지 테스트</div>
    <div class="text-2xl font-bold">카운트: {{ count }}</div>
    <USelect v-model="value" :items="items" />
    <UButton variant="solid" @click="increment">
      <span class="w-full text-black">카운트 증가</span>
    </UButton>
    <UInput class="w-full bg-kb-yellow-neg" />

    <div class="w-full h-20 bg-kb-yellow-neg">
      <span class="text-kb-gold-1">노란색 배경</span>
    </div>
    <UIcon name="fluent-color:alert-20" class="text-4xl text-blue-500" />
    <KBUITypography tag="h1" weight="bold" size="h36" color="purple-1"
      >테스트</KBUITypography
    >
    <KBUITypography tag="h1" weight="medium" size="h24" color="red-1"
      >KB인증서</KBUITypography
    >
  </div>
</template>
