<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/Card.vue";
import { RECEIPT_FILTERS } from "~/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";

// 필터 선택 상태
const selected = reactive({
  기간: "1개월",
  종류: "전체",
  정렬: "최신순",
  필터: "전체",
});

const card_data: CardProps = {
  title: "최근 한 달 사용 금액",
  content: `${(315240).toLocaleString()}원`,
  src: "luna-1",
  className: "bg-blue-1",
  description: "저번 달보다 replace\n덜쓰고 있어요!",
  boldText: "323,000원",
};

// TODO: 공통 Util 함수로 분리
const getIcon = (label: string): { background: string; emoji: string } => {
  if (label.includes("브네")) {
    return { background: "bg-yellow-1", emoji: "🍖" };
  } else if (label.includes("스타벅스")) {
    return { background: "bg-green-1", emoji: "☕️" };
  } else {
    return { background: "bg-gray-1", emoji: "💲" };
  }
};

// TODO: API 연동해서 사용
const paymentList = [
  {
    id: 21,
    label: "스타벅스",
    amount: -5900,
    createdAt: new Date("2025-07-14T12:30:00"),
    isCompleted: true,
  },
  {
    id: 22,
    label: "브네",
    amount: -32500,
    createdAt: new Date("2025-07-14T14:35:00"),
    isCompleted: true,
  },
  {
    id: 23,
    label: "브네",
    amount: 52500,
    createdAt: new Date("2025-07-14T18:50:00"),
    isCompleted: false,
  },
  {
    id: 24,
    label: "브네",
    amount: -52500,
    createdAt: new Date("2025-07-15T10:05:00"),
  },
];
</script>

<template>
  <main class="mt-10 pb-20">
    <Card
      :title="card_data.title"
      :content="card_data.content"
      :src="card_data.src"
      :class-name="card_data.className"
      :href="card_data.href"
      :description="card_data.description"
      :bold-text="card_data.boldText"
    />

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="RECEIPT_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
            completed: item.isCompleted
              ? { word: '영수 처리 완료', icon: 'material-symbols:work' }
              : undefined,
          }))
        "
      />
    </div>
  </main>
</template>
