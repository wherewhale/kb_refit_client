<script setup lang="ts">
import PointsCarousel from "./carousel.vue";

const TIME_OPTIONS = ["1개월", "3개월", "6개월", "직접 입력"];
const CATEGORY_OPTIONS = ["전체", "적립포인트", "할인금액"];
const SORT_OPTIONS = ["최신순", "과거순"];

const isOpen = ref(false);
const toggleFilter = () => {
  isOpen.value = !isOpen.value;
};
const time = ref("1개월");
const category = ref("전체");
const sort = ref("최신순");
</script>
<template>
  <main class="mt-10">
    <component :is="PointsCarousel" />
    <div class="mt-10 w-full rounded-lg bg-white p-6">
      <button class="ml-auto block cursor-pointer" @click="toggleFilter">
        <KBUITypography size="b12" weight="bold" class="flex items-center gap-2"
          >{{ time !== "직접 입력" ? "최근" : "" }} {{ time }} ·
          {{ category }} · {{ sort }}
          <UIcon
            name="i-heroicons-chevron-down"
            :class="[
              'text-black transition-transform duration-200',
              isOpen ? 'rotate-180' : '',
            ]"
          />
        </KBUITypography>
      </button>
      <transition name="slide-fade">
        <div
          v-if="isOpen"
          class="mt-4 px-6 py-2 bg-gray-4 transition-[height] duration-200"
        >
          <div class="flex items-center gap-4">
            <KBUITypography size="b14" weight="bold">기간</KBUITypography>
            <div class="flex items-center gap-2">
              <KBUITypography
                v-for="option in TIME_OPTIONS"
                :key="option"
                size="b14"
                :weight="time === option ? 'bold' : 'regular'"
                :color="time === option ? 'blue-2' : 'gray-2'"
                class="cursor-pointer"
                @click="time = option"
                >· {{ option }}</KBUITypography
              >
            </div>
          </div>

          <div class="mt-4 flex items-center gap-4">
            <KBUITypography size="b14" weight="bold">카테고리</KBUITypography>
            <div class="flex items-center gap-2">
              <KBUITypography
                v-for="option in CATEGORY_OPTIONS"
                :key="option"
                size="b14"
                :weight="category === option ? 'bold' : 'regular'"
                :color="category === option ? 'blue-2' : 'gray-2'"
                class="cursor-pointer"
                @click="category = option"
                >· {{ option }}</KBUITypography
              >
            </div>

            <div class="mt-4 flex items-center gap-4">
              <KBUITypography size="b14" weight="bold">정렬</KBUITypography>
              <div class="flex items-center gap-2">
                <KBUITypography
                  v-for="option in SORT_OPTIONS"
                  :key="option"
                  size="b14"
                  :weight="sort === option ? 'bold' : 'regular'"
                  :color="sort === option ? 'blue-2' : 'gray-2'"
                  class="cursor-pointer"
                  @click="sort = option"
                  >· {{ option }}</KBUITypography
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>
