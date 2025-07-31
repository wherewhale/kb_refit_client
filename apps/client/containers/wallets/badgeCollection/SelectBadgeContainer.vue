<script setup lang="ts">
import type { Badge } from "~/interfaces/common/badge.interface";

const props = defineProps<{
  badgeIndex: Ref<number>;
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

// TODO: API 연동 (현재 장착하고 있는 요소들)
const SELECTED_BADGES_TEST_DATA: Badge[] = [
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
];

// TODO: 전체 API 목록 가져오기
const MY_BADGES_TEST_DATA: Badge[] = [
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
];

const filteredBadges = computed(() => {
  return SELECTED_BADGES_TEST_DATA.length > 0
    ? MY_BADGES_TEST_DATA.filter(
        (badge) =>
          !SELECTED_BADGES_TEST_DATA.some(
            (selected) => selected.badgeId === badge.badgeId
          )
      )
    : MY_BADGES_TEST_DATA;
});

const selectedBadge = ref<Badge | null>(null);

const isModalOpen = computed({
  get: () => selectedBadge.value !== null,
  set: (val: boolean) => {
    if (!val) selectedBadge.value = null;
  },
});

const onSelectBadge = (badgeId: string) => {
  // TODO: 배지 선택 API 호출
  props.onBack("내 지갑");
};
</script>
<template>
  <section>
    <button
      class="flex items-center gap-1 text-black cursor-pointer hover:text-kb-yellow-pos"
      @click="props.onBack('내 지갑')"
    >
      <UIcon name="i-heroicons-chevron-left" size="16" />
      <KBUITypography size="b14" weight="medium">배지 선택</KBUITypography>
    </button>

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
        장착할 수 있는 배지가 없어요!
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
          <KBUITypography size="b14" weight="medium" class="text-start">
            혜택 : {{ selectedBadge.description }}
          </KBUITypography>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <KBUIButton
              type="button"
              size="medium"
              variant="secondary"
              class="w-full"
              @click="selectedBadge = null"
            >
              닫기
            </KBUIButton>
            <KBUIButton
              type="button"
              size="medium"
              variant="primary"
              class="w-full"
              @click="onSelectBadge(selectedBadge.badgeId)"
            >
              선택하기
            </KBUIButton>
          </div>
        </aside>
      </template>
    </UModal>
  </section>
</template>
