<script setup lang="ts">
import { reactive } from "vue";
import { BUSINESS_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "~/components/common/HistoryBlock.vue";
import FilterPanel from "~/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";

// 선택된 필터 상태
const selected = reactive({
  기간: "1개월",
  종류: "전체",
  정렬: "최신순",
});

// 카드 데이터 정의
const card_data: CardProps = {
  title: "7월 사용 금액",
  content: `${(21234200).toLocaleString()}원`,
  src: "luna-1",
  className: "bg-blue-1",
  description: "저번 달보다 {replace}\n덜쓰고 있어요!",
  boldText: "323,000원",
};

// 아이콘 매핑 함수
const getIcon = (label: string): { background: string; emoji: string } => {
  if (label.includes("브네")) {
    return { background: "bg-yellow-1", emoji: "🍖" };
  } else if (label.includes("스타벅스")) {
    return { background: "bg-green-1", emoji: "☕️" };
  } else {
    return { background: "bg-gray-1", emoji: "💲" };
  }
};

// 영수 처리 완료 or 진행 중 리스트 (가공 후 전달됨)
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
    <!-- 상단 카드 -->
    <Card
      :title="card_data.title"
      :content="card_data.content"
      :src="card_data.src"
      :class-name="card_data.className"
      :href="card_data.href"
      :description="card_data.description"
      :bold-text="card_data.boldText"
    />

    <!-- 사용 금액 영역 -->
    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="BUSINESS_FILTER_KEYS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/business/${item.id}`,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
          }))
        "
      />
    </div>
  </main>
</template>