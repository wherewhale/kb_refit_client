<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/card.vue";
import type { CardProps } from "~/interfaces/common/card.interface";

// 필터 선택 상태
const selected = reactive({
  기간: "1개월",
  카테고리: "전체",
  정렬: "최신순",
});

// 옵션 목록
const FILTERS = {
  기간: ["1개월", "3개월", "6개월", "직접 입력"],
  카테고리: ["전체", "적립포인트", "할인금액"],
  정렬: ["최신순", "과거순"],
};

const card_data: CardProps = {
  title: "최근 3년 간 병원비",
  content: `${(21234200).toLocaleString()}원`,
  src: "ramu",
  className: "bg-red-1",
  description: "보험 청구 가능한 병원비가\n현재 replace 남아 있어요!",
  boldText: "7건",
};

// api 호출 결과 테스트 데이터
const test_data = [
  {
    id: 1,
    title: "포인트 적립 이벤트",
    category: "적립포인트",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "할인 쿠폰 제공",
    category: "할인금액",
    date: "2023-10-05",
  },
];
</script>

<template>
  <main class="mt-10">
    <Card
      :title="card_data.title"
      :content="card_data.content"
      :src="card_data.src"
      :class-name="card_data.className"
      :href="card_data.href"
      :description="card_data.description"
      :bold-text="card_data.boldText"
    />

    <FilterPanel
      :filters="FILTERS"
      :selected="selected"
      @update:selected="(value) => Object.assign(selected, value)"
    />
    <div v-for="item in test_data" :key="item.id" class="mb-6">
      <h2 class="text-lg font-bold">{{ item.title }}</h2>
      <span class="text-xs text-gray-400">{{ item.date }}</span>
    </div>
  </main>
</template>
