<script setup lang="ts">
import { badgeList } from '@/constant/badgeList';
</script>

<template>
  <KBUITypography weight="bold" size="h24" class="mt-4">현재 받고 있는 혜택</KBUITypography>

  <div class="mt-4 p-6 space-y-4 rounded-md">
    <div
      v-for="(item, index) in badgeList"
      :key="index"
      class="flex items-start gap-4"
    >
      <!-- 배지 박스 -->
      <div
        class="w-12 h-12 flex items-center justify-center bg-gray-3 font-bold text-sm rounded-sm shrink-0"
      >
        {{ item.badge }}
      </div>

      <!-- 텍스트 영역 -->
      <div>
        <p class="font-semibold text-base">{{ item.title }}</p>
        <p v-if="item.description" class="text-sm text-black">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>