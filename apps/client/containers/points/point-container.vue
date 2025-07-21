<script setup lang="ts">
import PointsCarousel from "~/components/points/carousel.vue";
import { reactive } from "vue";

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

// api 호출 결과 테스트 데이터
const test_data = [
  {
    id: 1,
    title: "포인트 적립 이벤트",
    description: "포인트를 적립할 수 있는 다양한 이벤트를 확인하세요.",
    category: "적립포인트",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "할인 쿠폰 제공",
    description: "특정 카테고리에서 사용할 수 있는 할인 쿠폰을 제공합니다.",
    category: "할인금액",
    date: "2023-10-05",
  },
];
</script>

<template>
  <main class="mt-10">
    <component :is="PointsCarousel" />

    <FilterPanel
      :filters="FILTERS"
      :selected="selected"
      @update:selected="(value) => Object.assign(selected, value)"
    />
    <div v-for="item in test_data" :key="item.id" class="mb-6">
      <h2 class="text-lg font-bold">{{ item.title }}</h2>
      <p class="text-sm text-gray-600">{{ item.description }}</p>
      <span class="text-xs text-gray-400">{{ item.date }}</span>
    </div>
  </main>
</template>
