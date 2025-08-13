<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import {
  deleteWalletPreset,
  getBadgePresetList,
  patchWalletPreset,
} from "~/services/wallet";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const toast = useToast();
const selectedPresetId = ref<number | null>(null);
const isModalOpen = ref(false);

const { data, refetch } = useQuery({
  queryKey: ["getBadgePresetList"],
  queryFn: async () => (await getBadgePresetList()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const { mutate: deletePreset } = useMutation({
  mutationKey: ["deleteBadgePreset"],
  mutationFn: async (presetId: number) => await deleteWalletPreset(presetId),
  onSuccess: () => {
    refetch();
    toast.add({
      title: "프리셋이 삭제되었습니다.",
      color: "success",
      duration: 2000,
    });
    isModalOpen.value = false;
  },
  onError: () => {
    toast.add({
      title: "프리셋 삭제에 실패했습니다.",
      color: "error",
      duration: 2000,
    });
  },
});

const { mutate: applyPreset } = useMutation({
  mutationKey: ["applyBadgePreset"],
  mutationFn: async (presetId: number) => await patchWalletPreset(presetId),
  onSuccess: () => {
    toast.add({
      title: "프리셋이 적용되었습니다.",
      color: "success",
      duration: 2000,
    });
    props.onBack("내 지갑");
  },
  onError: () => {
    toast.add({
      title: "프리셋 적용에 실패했습니다.",
      color: "error",
      duration: 2000,
    });
  },
});

const onClickDeletePreset = (presetId: number) => {
  selectedPresetId.value = presetId;
  isModalOpen.value = true;
};

const onApplyPreset = (presetId: number) => {
  applyPreset(presetId);
};

const onDeletePreset = () => {
  if (selectedPresetId.value !== null) {
    deletePreset(selectedPresetId.value);
  }
};
</script>
<template>
  <section>
    <button
      class="flex items-center gap-1 text-black cursor-pointer hover:text-kb-yellow-pos"
      @click="props.onBack('내 지갑')"
    >
      <UIcon name="i-heroicons-chevron-left" size="16" />
      <KBUITypography size="b14" weight="medium">프리셋 조회</KBUITypography>
    </button>
    <UModal v-model:open="isModalOpen">
      <template #title> 프리셋 삭제 확인 </template>
      <template #content>
        <aside class="p-6">
          <KBUITypography size="b20" weight="bold" class="text-center py-4">
            프리셋을 삭제할까요?
          </KBUITypography>
          <div class="mt-10 grid grid-cols-2 gap-4">
            <KBUIButton
              type="button"
              size="medium"
              variant="secondary"
              class-name="mt-4 w-full"
              @click="isModalOpen = false"
            >
              취소하기
            </KBUIButton>
            <KBUIButton
              type="button"
              size="medium"
              variant="primary"
              class-name="mt-4 w-full"
              @click="onDeletePreset()"
            >
              삭제하기
            </KBUIButton>
          </div>
        </aside>
      </template>
    </UModal>
    <!-- ic:baseline-delete-forever -->
    <ul v-if="(data ?? []).length > 0" class="mt-10">
      <li v-for="preset in data" :key="preset.presetId" class="mt-4">
        <div class="flex items-center justify-between">
          <KBUITypography size="b16" weight="bold">
            {{ preset.presetName }}
          </KBUITypography>
          <div class="flex items-center gap-2">
            <KBUIButton
              size="small"
              variant="primary"
              @click="onApplyPreset(preset.presetId)"
              >적용</KBUIButton
            >
            <KBUIButton
              size="small"
              variant="secondary"
              @click="onClickDeletePreset(preset.presetId)"
              >삭제</KBUIButton
            >
          </div>
        </div>

        <ul class="w-full grid grid-cols-4 mt-2 gap-4">
          <li
            v-for="value in preset.badgePresetList"
            :key="value.badgeId"
            class="flex justify-center items-center"
          >
            <div class="flex flex-col items-center">
              <figure
                class="size-20 relative flex items-center justify-center z-20"
              >
                <NuxtImg
                  :src="`assets/images/badges/${value.badgeImage}.png`"
                  loading="lazy"
                />
              </figure>
              <KBUITypography size="b14" weight="medium" color="gray-2">
                {{ value.badgeTitle }}
              </KBUITypography>
            </div>
          </li>
        </ul>
        <!-- 삭제 연동 -->
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
        아직 설정한 프리셋이 없어요!
      </KBUITypography>
    </div>
  </section>
</template>
