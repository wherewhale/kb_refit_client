<script setup lang="ts">
import type { Badge } from "~/interfaces/common/badge.interface";

// TODO: API 연동
const BADGE_TEST_DATA: Badge[] = [
  {
    badgeId: "1",
    title: "술고래",
    description: "숙취해소제 10원 페이백",
    image: "alcohol",
    isOwned: true,
  },
  {
    badgeId: "2",
    title: "호박",
    description: "올리브영 100원 페이백",
    image: "beauty",
    isOwned: true,
  },
  {
    badgeId: "3",
    title: "코끼리",
    description: "샐러드 주문 시 100원 페이백",
    image: "salad",
    isOwned: true,
  },
  {
    badgeId: "4",
    title: "집좀가",
    description: "야놀자 100원 페이백",
    image: "stay",
    isOwned: true,
  },
  {
    badgeId: "5",
    title: "종합병원",
    description: "병원 방문 시 100원 페이백",
    image: "hospital",
    isOwned: false,
  },
  {
    badgeId: "6",
    title: "BMW",
    description: "교통카드 사용 시 100원 페이백",
    image: "transfer",
    isOwned: false,
  },
  {
    badgeId: "7",
    title: "시네필",
    description: "영화 관람 시 100원 페이백",
    image: "cinema",
    isOwned: false,
  },
  {
    badgeId: "8",
    title: "책벌레",
    description: "도서 구매 시 100원 페이백",
    image: "stationery",
    isOwned: false,
  },
];

const isChecked = ref(false);
const filteredBadges = computed(() => {
  return isChecked.value
    ? BADGE_TEST_DATA.filter((badge) => badge.isOwned)
    : BADGE_TEST_DATA;
});
const selectedBadge = ref<Badge | null>(null);

const isModalOpen = computed({
  get: () => selectedBadge.value !== null,
  set: (val: boolean) => {
    if (!val) selectedBadge.value = null;
  },
});
</script>
<template>
  <div>
    <UCheckbox
      v-model="isChecked"
      label="보유중인 배지만 보기"
      color="warning"
      class="cursor-pointer mt-4"
    />

    <ul
      v-if="filteredBadges.length > 0"
      class="grid grid-cols-3 justify-between gap-y-4 mt-4"
    >
      <li
        v-for="badge in filteredBadges"
        :key="badge.badgeId"
        @click="selectedBadge = badge"
      >
        <div
          class="relative flex justify-center items-center size-24 cursor-pointer mx-auto"
        >
          <figure
            class="size-20 relative flex items-center justify-center z-20"
          >
            <NuxtImg
              :src="`assets/images/badges${badge.isOwned ? '' : '-gray'}/${badge.image}.png`"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="flex items-center justify-center gap-1 mt-1">
          <KBUITypography size="b12" weight="medium">{{
            badge.title
          }}</KBUITypography>
        </div>
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
        보유중인 배지가 없어요!
      </KBUITypography>
    </div>
    <UModal v-model:open="isModalOpen">
      <template #title>배지 상세 정보</template>
      <template #content>
        <aside v-if="selectedBadge" class="p-6">
          <KBUITypography size="b20" weight="bold" class="text-center">
            {{ selectedBadge.title }}
          </KBUITypography>
          <figure
            class="size-20 relative flex items-center justify-center mx-auto"
          >
            <NuxtImg
              :src="`assets/images/badges/${selectedBadge.image}.png`"
              loading="lazy"
              class="mx-auto mt-4"
            />
          </figure>
          <KBUITypography size="b14" weight="medium" class="text-start mt-2">
            획득 조건 : {{ selectedBadge.isOwned ? "획득 조건 모시기" : "???" }}
          </KBUITypography>
          <KBUITypography size="b14" weight="medium" class="text-start">
            혜택 : {{ selectedBadge.description }}
          </KBUITypography>
          <KBUIButton
            type="button"
            size="medium"
            variant="secondary"
            class="w-full mt-4"
            @click="selectedBadge = null"
          >
            닫기
          </KBUIButton>
        </aside>
      </template>
    </UModal>
  </div>
</template>
