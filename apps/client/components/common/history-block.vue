<script setup lang="ts">
import { KBUITypography, USeparator } from "#components";
import dayjs from "dayjs";

interface Props {
  items: Array<{
    id: number;
    label: string;
    amount: number;
    icon: {
      background: string;
      emoji: string;
    };
    completed?: {
      word: string;
      icon: string;
    };
    href?: string;
    createdAt: Date;
  }>;
}

const props = defineProps<Props>();

const groupedItems = computed(() => {
  const groups: Record<string, Props["items"]> = {};

  for (const item of props.items) {
    const date = item.createdAt.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
  }

  // 최신 날짜부터 정렬 (선택사항)
  return Object.entries(groups)
    .sort((a, b) => b[0].localeCompare(a[0])) // 최신 날짜가 위에
    .map(([date, items]) => ({
      date,
      items,
    }));
});
</script>

<template>
  <ul class="w-full">
    <li v-for="group in groupedItems" :key="group.date">
      <USeparator class="my-2" />
      <KBUITypography size="b12" class="mb-1">{{
        dayjs(group.date).format("YY.MM.DD")
      }}</KBUITypography>

      <ul>
        <li
          v-for="item in group.items"
          :key="item.id"
          class="flex justify-between items-center py-1"
        >
          <div class="flex items-center gap-2">
            <div
              :class="[
                'w-10 h-10 rounded-lg flex justify-center items-center',
                item.icon.background,
              ]"
            >
              <KBUITypography size="h24">{{ item.icon.emoji }}</KBUITypography>
            </div>

            <div class="grid grid-rows-2">
              <KBUITypography size="b14" weight="bold">{{
                item.label
              }}</KBUITypography>
              <div v-if="item.completed" class="flex items-center gap-1">
                <UIcon
                  :name="item.completed.icon"
                  size="16"
                  class="text-gray-2"
                />
                <KBUITypography size="b12" color="gray-2">{{
                  item.completed.word
                }}</KBUITypography>
              </div>
            </div>
          </div>
          <div class="text-end flex flex-col items-end justify-between">
            <KBUITypography size="b12" weight="medium" color="gray-2">
              {{ dayjs(item.createdAt).format("HH:mm") }}
            </KBUITypography>
            <KBUITypography
              :color="item.amount > 0 ? 'red-2' : 'blue-2'"
              size="b14"
              weight="medium"
            >
              {{
                item.amount < 0
                  ? `-${Math.abs(item.amount)}원`
                  : item.amount > 0
                    ? `${item.amount}원`
                    : `+${Math.abs(item.amount)}P`
              }}
            </KBUITypography>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
