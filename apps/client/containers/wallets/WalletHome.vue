<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import MyWallet from "~/components/wallet/MyWallet.vue";
import type { WalletTheme } from "~/interfaces/wallet/theme";
import { getMyWalletDesign, postWalletPreset } from "~/services/wallet";

const props = defineProps<{
  onClickBadge: (badgeId: number | null) => void;
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const toast = useToast();
const isModalOpen = ref(false);
const presetName = ref("");

const { data } = useQuery({
  queryKey: ["getBadgeCollection"],
  queryFn: async () => {
    const res = await getMyWalletDesign();
    return res?.data;
  },
  refetchOnWindowFocus: false,
});

const { mutate: savePreset } = useMutation({
  mutationKey: ["postWalletPreset", presetName],
  mutationFn: async (name: string) => await postWalletPreset(name),
  onSuccess: () => {
    toast.add({
      title: "프리셋이 저장되었습니다.",
      color: "success",
      duration: 2000,
    });
    isModalOpen.value = false;
    presetName.value = "";
  },
});

const isValidated = computed(() => {
  return presetName.value.trim().length > 0 && presetName.value.length <= 8;
});

const onSavePreset = () => {
  savePreset(presetName.value);
};
</script>
<template>
  <div>
    <MyWallet
      :badge-list="data?.myBadgeList ?? []"
      :theme="(data?.brandImage as WalletTheme) ?? undefined"
      @click-badge="props.onClickBadge"
    />
    <div class="mt-4 flex justify-center items-start gap-8">
      <div class="flex flex-col items-center">
        <KBUIButton
          variant="outlined"
          size="small"
          @click="props.onNext('브랜드 상점')"
        >
          <UIcon name="ic:baseline-local-grocery-store" class="w-4 h-4" />
        </KBUIButton>
        <KBUITypography weight="regular" tag="p" size="b12"
          >브랜드 상점</KBUITypography
        >
      </div>

      <div class="flex flex-col items-center">
        <KBUIButton
          variant="outlined"
          size="small"
          @click="props.onNext('배지 도감')"
        >
          <UIcon name="ic:outline-menu-book" class="w-4 h-4" />
        </KBUIButton>
        <KBUITypography size="b12">배지 도감</KBUITypography>
      </div>

      <UModal v-model:open="isModalOpen">
        <div class="flex flex-col items-center">
          <KBUIButton variant="outlined" size="small">
            <UIcon name="ic:baseline-save-alt" class="w-4 h-4" />
          </KBUIButton>
          <KBUITypography weight="regular" tag="p" size="b12"
            >프리셋 저장</KBUITypography
          >
        </div>

        <template #title> 프리셋 저장 </template>
        <template #content>
          <aside class="p-6">
            <KBUITypography size="b14" color="gray-2">
              프리셋 이름을 입력해주세요.
            </KBUITypography>
            <KBUITextField
              v-model="presetName"
              :max-length="8"
              class-name="mt-2"
              placeholder="최대 8자의 프리셋 이름을 입력해주세요."
            />
            <KBUIButton
              type="button"
              size="medium"
              variant="primary"
              class-name="mt-4 w-full"
              :disabled="!isValidated"
              @click="onSavePreset"
            >
              저장하기
            </KBUIButton>
          </aside>
        </template>
      </UModal>

      <div class="flex flex-col items-center">
        <KBUIButton
          variant="outlined"
          size="small"
          @click="props.onNext('프리셋 설정')"
        >
          <UIcon name="ic:round-wifi-protected-setup" class="w-4 h-4" />
        </KBUIButton>
        <KBUITypography weight="regular" tag="p" size="b12"
          >프리셋 변경</KBUITypography
        >
      </div>
    </div>

    <KBUITypography weight="bold" size="h24" class="mt-4"
      >현재 받고 있는 혜택</KBUITypography
    >

    <div
      v-if="(data?.myBadgeList?.length ?? 0) > 0"
      class="mt-4 flex flex-col gap-4"
    >
      <div
        v-for="(item, index) in data?.myBadgeList"
        :key="index"
        class="flex items-center gap-4"
      >
        <figure class="size-12 flex items-center justify-center relative">
          <NuxtImg
            :src="`assets/images/badges/${item.badgeImage}.png`"
            width="48"
            height="48"
          />
        </figure>

        <div>
          <KBUITypography weight="medium" size="b18">{{
            item.badgeTitle
          }}</KBUITypography>
          <KBUITypography v-if="item.badgeBenefit" size="b14">{{
            item.badgeBenefit
          }}</KBUITypography>
        </div>
      </div>
    </div>
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
        아직 받고 있는 혜택이 없어요.
      </KBUITypography>
    </div>
  </div>
</template>
