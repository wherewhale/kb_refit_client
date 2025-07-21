<script setup lang="ts">
const badgeList = [
  {
    badge: '배지1',
    title: '술고래',
    description: '숙취해소제 10원 페이백',
  },
  {
    badge: '배지2',
    title: '호박?수박?',
    description: '올리브영 100원 페이백',
  },
  {
    badge: '배지3',
    title: '코끼리',
    description: '샐러드 주문 시 100원 페이백',
  },
  {
    badge: '배지4',
    title: '집좀가',
    description: '야놀자 100원 페이백',
  },
];
</script>

<template>
  <div class="mt-4 p-6 bg-gray-100 space-y-4 rounded-md">
    <div
      v-for="(item, index) in badgeList"
      :key="index"
      class="flex items-start gap-4"
    >
      <!-- 배지 박스 -->
      <div
        class="w-12 h-12 flex items-center justify-center bg-gray-300 font-bold text-sm rounded-sm shrink-0"
      >
        {{ item.badge }}
      </div>

      <!-- 텍스트 영역 -->
      <div>
        <p class="font-semibold text-base">{{ item.title }}</p>
        <p v-if="item.description" class="text-sm text-gray-700">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>