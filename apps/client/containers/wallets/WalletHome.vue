<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import MyWallet from "~/components/wallet/MyWallet.vue";
import type { WalletTheme } from "~/interfaces/wallet/theme";
import { getMyWalletDesign } from "~/services/wallet";

const props = defineProps<{
  onClickBadge: (badgeId: number | null) => void;
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const { data } = useQuery({
  queryKey: ["getBadgeCollection"],
  queryFn: async () => {
    const res = await getMyWalletDesign();
    return res?.data;
  },
  refetchOnWindowFocus: false,
});
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
