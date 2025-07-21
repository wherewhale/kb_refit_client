<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/Card.vue";
import { MEDICAL_FILTERS } from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";

// 필터 선택 상태
const selected = reactive({
  기간: "1개월",
  종류: "전체",
  정렬: "최신순",
  필터: "전체",
});

const card_data: CardProps = {
  title: "최근 3년 간 병원비",
  content: `${(21234200).toLocaleString()}원`,
  src: "ramu",
  className: "bg-red-1",
  description: "보험 청구 가능한 병원비가\n현재 replace 남아 있어요!",
  boldText: "7건",
};

// api 호출 결과 테스트 데이터
const paymentList = [
  {
    id: 21,
    label: "손박사 이비인후과",
    amount: -72500,
    createdAt: new Date("2025-07-14T12:30:00"),
    isCompleted: true,
  },
  {
    id: 22,
    label: "아따잘붙네 정형외과",
    amount: -32500,
    createdAt: new Date("2025-07-14T14:35:00"),
    isCompleted: true,
  },
  {
    id: 23,
    label: "아따잘붙네 정형외과",
    amount: 52500,
    createdAt: new Date("2025-07-14T18:50:00"),
  },
  {
    id: 24,
    label: "아따잘붙네 정형외과",
    amount: -32500,
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
        :filters="MEDICAL_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            createdAt: item.createdAt,
            completed: item.isCompleted
              ? {
                  word: '보험 청구 완료',
                  icon: 'material-symbols:local-hospital',
                }
              : undefined,
            icon: {
              background: 'bg-blue-1',
              emoji: '🏥',
            },
          }))
        "
      />
    </div>
  </main>
</template>
