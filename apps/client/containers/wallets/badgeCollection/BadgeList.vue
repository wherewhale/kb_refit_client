<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getBadgeCollection } from "~/services/wallet";
import type { SpecificBadgeDetail } from "~/types/wallet";

const { data, error, isPending } = useQuery({
  queryKey: ["getBadgeCollection"],
  queryFn: async () => {
    const res = await getBadgeCollection();
    return res?.data?.badgeList ?? [];
  },
  refetchOnWindowFocus: false,
});

const isChecked = ref(false);
const filteredBadges = computed(() => {
  return isChecked.value
    ? (data.value?.filter((badge) => badge.owned) ?? [])
    : (data.value ?? []);
});
const selectedBadge = ref<SpecificBadgeDetail | null>(null);

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
      v-if="!isPending && filteredBadges.length > 0"
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
              :src="`assets/images/badges${badge.owned ? '' : '-gray'}/${badge.badgeImage}.png`"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="flex items-center justify-center gap-1 mt-1">
          <KBUITypography size="b12" weight="medium">{{
            badge.badgeTitle
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
            {{ selectedBadge.badgeTitle }}
          </KBUITypography>
          <figure
            class="size-20 relative flex items-center justify-center mx-auto"
          >
            <NuxtImg
              :src="`assets/images/badges/${selectedBadge.badgeImage}.png`"
              loading="lazy"
              class="mx-auto mt-4"
            />
          </figure>
          <KBUITypography size="b14" weight="medium" class="text-start mt-2">
            획득 조건 :
            {{ selectedBadge.owned ? selectedBadge.badgeCondition : "???" }}
          </KBUITypography>
          <KBUITypography size="b14" weight="medium" class="text-start">
            혜택 : {{ selectedBadge.badgeBenefit }}
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
