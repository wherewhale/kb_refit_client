<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import {
  getBadgeCollection,
  getMyWalletDesign,
  updateMyWalletBadge,
} from "~/services/wallet";
import type {
  SpecificBadgeDetail,
  UpdateWornBadgeRequest,
} from "~/types/wallet";

const props = defineProps<{
  badgeId: Ref<number | null>;
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const toast = useToast();

const { data: myWalletData } = useQuery({
  queryKey: ["getMyWalletDesign"],
  queryFn: async () => {
    const res = await getMyWalletDesign();
    return res?.data;
  },
  refetchOnWindowFocus: false,
});

// TODO: 전체 API 목록 가져오기
const { data: badgeData } = useQuery({
  queryKey: ["getBadgeCollection"],
  queryFn: async () => {
    const res = await getBadgeCollection();
    return res?.data ?? [];
  },
  refetchOnWindowFocus: false,
});

const { mutate: patchBadgeEquipment } = useMutation({
  mutationKey: ["patchBadgeEquipment", props.badgeId, dayjs()],
  mutationFn: async (data: UpdateWornBadgeRequest) => {
    const response = await updateMyWalletBadge(data);
    return response.data;
  },
  onSuccess: () => {
    toast.add({
      title: "배지 장착 성공",
      description: "선택한 배지가 장착되었습니다.",
      color: "success",
      duration: 3000,
    });
    props.onBack("내 지갑");
  },
  onError: () => {
    toast.add({
      title: "배지 장착 실패",
      description: "배지 장착에 실패했습니다. 다시 시도해주세요.",
      color: "error",
      duration: 3000,
    });
  },
});

const filteredBadges = computed(() => {
  // 아직 데이터가 로드되지 않았다면 테스트 데이터 반환
  if (!badgeData.value?.badgeList || !myWalletData.value) {
    return [];
  }

  const wornBadgeIds = myWalletData.value.myBadgeList?.map((b) => b.badgeId);

  return badgeData.value.badgeList.filter(
    (badge) => badge.owned && !wornBadgeIds?.includes(badge.badgeId)
  );
});

const selectedBadge = ref<SpecificBadgeDetail | null>(null);

const isModalOpen = computed({
  get: () => selectedBadge.value !== null,
  set: (val: boolean) => {
    if (!val) selectedBadge.value = null;
  },
});

const onSelectBadge = (badgeId: number) => {
  patchBadgeEquipment({
    previousBadgeId: props.badgeId.value,
    updateBadgeId: badgeId,
  });
  selectedBadge.value = null;
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
        장착할 수 있는 배지가 없어요!
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
          <KBUITypography size="b14" weight="medium" class="text-start">
            혜택 : {{ selectedBadge.badgeBenefit }}
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
