<script setup lang="ts">
import { reactive } from "vue";
import PointsCarousel from "~/components/points/Carousel.vue";
import HistoryBlock from "~/components/common/HistoryBlock.vue";
import { POINT_FILTERS } from "~/common/constant/filters";

// 필터 선택 상태
const selected = reactive({
  기간: "1개월",
  카테고리: "전체",
  정렬: "최신순",
});

const getIcon = (label: string): { background: string; emoji: string } => {
  if (label.includes("스타포인트")) {
    return { background: "bg-green-1", emoji: "💰" };
  } else if (label.includes("배지")) {
    return { background: "bg-blue-1", emoji: "🏅" };
  } else if (label.includes("탄소중립")) {
    return { background: "bg-yellow-1", emoji: "🌱" };
  } else {
    return { background: "bg-gray-1", emoji: "⚪️" };
  }
};

// TODO: API 연동해서 사용
const rewardList = [
  {
    id: 21,
    label: "탄소 포인트 적립",
    amount: 150,
    createdAt: new Date("2025-07-14T12:30:00"),
  },
  {
    id: 22,
    label: "탄소중립 포인트 적립",
    amount: 200,
    createdAt: new Date("2025-07-14T14:35:00"),
  },
  {
    id: 23,
    label: "배지 리워드",
    amount: 100,
    createdAt: new Date("2025-07-14T18:50:00"),
  },
  {
    id: 24,
    label: "퀴즈 참여 스타포인트 적립",
    amount: 100,
    createdAt: new Date("2025-07-15T10:05:00"),
  },
  {
    id: 25,
    label: "탄소 포인트 적립",
    amount: 150,
    createdAt: new Date("2025-07-15T13:15:00"),
  },
  {
    id: 26,
    label: "탄소중립 포인트 적립",
    amount: 100,
    createdAt: new Date("2025-07-15T17:40:00"),
  },
  {
    id: 27,
    label: "배지 리워드",
    amount: 200,
    createdAt: new Date("2025-07-16T09:00:00"),
  },
  {
    id: 28,
    label: "퀴즈 참여 스타포인트 적립",
    amount: 120,
    createdAt: new Date("2025-07-16T11:30:00"),
  },
  {
    id: 29,
    label: "탄소 포인트 적립",
    amount: 130,
    createdAt: new Date("2025-07-16T15:10:00"),
  },
  {
    id: 30,
    label: "탄소중립 포인트 적립",
    amount: 110,
    createdAt: new Date("2025-07-16T17:25:00"),
  },
];
</script>

<template>
  <main class="mt-10 pb-20">
    <component :is="PointsCarousel" />

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="POINT_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          rewardList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
          }))
        "
      />
    </div>
  </main>
</template>
