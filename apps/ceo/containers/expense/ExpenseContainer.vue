<script setup lang="ts">
import { reactive } from "vue";
import { EXPENSE_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "@/components/common/HistoryBlock.vue";
import FilterPanel from "@/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";

// 선택된 필터 상태
const selected = reactive({
  기간: "1개월",
  종류: "전체",
  정렬: "최신순",
  필터: "전체",
});

// 처리 완료된 경비 목록
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
    amount: -52500,
    createdAt: new Date("2025-07-14T18:50:00"),
    isCompleted: false,
  },
  {
    id: 24,
    label: "브네",
    amount: -52500,
    createdAt: new Date("2025-07-15T10:05:00"),
    isCompleted: false,
  },
];

// 처리가 필요한 경비 목록
const EXPENSE_PAYMENTS = [
  {
    id: 25,
    label: "브네",
    amount: -15000,
    createdAt: new Date("2025-07-15T11:20:00"),
    isRejected: true,
  },
  {
    id: 26,
    label: "스타벅스",
    amount: -4500,
    createdAt: new Date("2025-07-13T13:45:00"),
    isRejected: true,
  },
];

const PENDING_COUNT = EXPENSE_PAYMENTS.length;
const HAS_PENDING = PENDING_COUNT > 0;

const PROCESSED_THIS_MONTH = 219;

// 카드 데이터 정의
const card_data: CardProps = {
  title: "처리가 필요한 경비",
  content: `총 ${PENDING_COUNT.toLocaleString()}건`,
  src: "bibi",
  className: "bg-yellow-1",
  description: HAS_PENDING
    ? "이번 달 총 {replace}의\n경비 처리를 리핏과 함께했어요!"
    : "이번 달에는 아직 리핏과\n경비 처리를 진행하지 않았어요!",
  boldText: HAS_PENDING ? `${PROCESSED_THIS_MONTH}건` : "",
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

    <!-- 처리가 필요한 경비 영역 -->
    <div
      v-if="EXPENSE_PAYMENTS.length > 0"
      class="w-full rounded-lg bg-white p-6 mt-10 text-black"
    >
      <KBUITypography tag="h3" weight="bold"
        >처리가 필요한 경비 (총
        {{ EXPENSE_PAYMENTS.length }}건)</KBUITypography
      >
      <HistoryBlock
        :items="
          EXPENSE_PAYMENTS.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/expense/${item.id}`,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
          }))
        "
      />
    </div>

    <!-- 처리 완료된 경비 영역 -->
    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <div class="flex items-center justify-between mb-4">
        <KBUITypography tag="h3" weight="bold">
          처리 완료된 경비 목록
        </KBUITypography>
        <KBUIButton variant="primary" size="small">
          결과 보내기
        </KBUIButton>
      </div>
      <FilterPanel
        :filters="EXPENSE_FILTER_KEYS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/expense/${item.id}`,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
            completed: item.isCompleted === true
              ? { word: '경비 처리 승인', icon: 'ic:baseline-check' }
              : item.isCompleted === false
                ? { word: '경비 처리 반려', icon: 'ic:baseline-close' }
                : undefined,
          }))
        "
      />
    </div>
  </main>
</template>