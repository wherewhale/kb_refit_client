<script setup lang="ts">
import { KBUITypography, USeparator } from "#components";
import dayjs from "dayjs";

export interface PaymentItem {
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
}

interface Props {
  items: PaymentItem[];
}

const props = defineProps<Props>();

const router = useRouter();

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

const onClickItem = (item: PaymentItem) => {
  if (item && item.href) {
    router.push(item.href);
  }
};
</script>

<template>
  <ul v-if="props.items.length > 0" class="w-full">
    <li v-for="group in groupedItems" :key="group.date">
      <USeparator class="my-2" />
      <KBUITypography size="b12" class="mb-1">{{
        dayjs(group.date).format("YY.MM.DD")
      }}</KBUITypography>

      <ul>
        <li
          v-for="item in group.items"
          :key="item.id"
          :class="[
            'flex justify-between items-center py-1',
            item.href ? 'cursor-pointer hover:animate-pulse' : '',
          ]"
          @click="onClickItem(item)"
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
                item.amount > 0
                  ? `${Math.abs(item.amount).toLocaleString()}원`
                  : `${Math.abs(item.amount).toLocaleString()}원`
              }}
            </KBUITypography>
          </div>
        </li>
      </ul>
    </li>
  </ul>
  <div
    v-else
    class="w-full mt-10 flex flex-col items-center justify-center pb-10"
  >
    <UIcon
      name="material-symbols:sd-card-alert-sharp"
      size="80"
      class="text-gray-3"
    />
    <KBUITypography size="b18" color="gray-2" class-name="mt-4 text-center">
      검색 조건에 맞는<br />이용 내역이 없어요!
    </KBUITypography>
  </div>
</template>
