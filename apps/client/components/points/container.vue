<script setup lang="ts">
import PointsCarousel from "./carousel.vue";
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
</script>

<template>
  <main class="mt-10">
    <component :is="PointsCarousel" />

    <FilterPanel
      :filters="FILTERS"
      :selected="selected"
      @update:selected="(value) => Object.assign(selected, value)"
    />
  </main>
</template>
