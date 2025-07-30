<script setup lang="ts">
import MyWallet from "~/components/wallet/MyWallet.vue";
import type { Badge } from "~/interfaces/common/badge.interface";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const BADGE_TEST_DATA: Badge[] = [
  {
    badgeId: "1",
    title: "술고래",
    description: "숙취해소제 10원 페이백",
    image: "alcohol",
  },
  {
    badgeId: "2",
    title: "호박",
    description: "올리브영 100원 페이백",
    image: "beauty",
  },
  // {
  //   badgeId: "3",
  //   title: "코끼리",
  //   description: "샐러드 주문 시 100원 페이백",
  //   image: "salad",
  // },
  // {
  //   badgeId: "4",
  //   title: "집좀가",
  //   description: "야놀자 100원 페이백",
  //   image: "stay",
  // },
];
</script>
<template>
  <div>
    <MyWallet :badge-list="BADGE_TEST_DATA" theme="Hermes" />
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

    <div v-if="BADGE_TEST_DATA.length > 0" class="mt-4 flex flex-col gap-4">
      <div
        v-for="(item, index) in BADGE_TEST_DATA"
        :key="index"
        class="flex items-center gap-4"
      >
        <div class="size-12 flex items-center justify-center relative">
          <NuxtImg
            :src="`assets/images/badges/${item.image}.png`"
            width="48"
            height="48"
          />
        </div>

        <div>
          <KBUITypography weight="medium" size="b18">{{
            item.title
          }}</KBUITypography>
          <KBUITypography v-if="item.description" size="b14">{{
            item.description
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
