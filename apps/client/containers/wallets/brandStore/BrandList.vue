<script setup lang="ts">
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import type { WalletTheme } from "~/interfaces/wallet/theme";

// TODO: API 대체
const BRAND_TEST_DATA: {
  file: WalletTheme;
  name: string;
  price: number;
  isOwned: boolean;
}[] = [
  {
    file: "SaintLaurant",
    name: "Saint Laurent",
    price: 1000,
    isOwned: false,
  },
  {
    file: "Chanel",
    name: "Chanel",
    price: 1200,
    isOwned: false,
  },
  {
    file: "Gucci",
    name: "Gucci",
    price: 1100,
    isOwned: false,
  },
  {
    file: "Miumiu",
    name: "Miumiu",
    price: 900,
    isOwned: false,
  },
  {
    file: "Prada",
    name: "Prada",
    price: 1300,
    isOwned: false,
  },
  {
    file: "Hermes",
    name: "Hermes",
    price: 1500,
    isOwned: false,
  },
  {
    file: "Dior",
    name: "Dior",
    price: 1400,
    isOwned: false,
  },
  {
    file: "Coach",
    name: "Coach",
    price: 800,
    isOwned: false,
  },
  {
    file: "Balenciaga",
    name: "Balenciaga",
    price: 1600,
    isOwned: false,
  },
  {
    file: "Cartier",
    name: "Cartier",
    price: 1700,
    isOwned: false,
  },
  {
    file: "Louisvuitton",
    name: "Louis Vuitton",
    price: 1800,
    isOwned: false,
  },
  {
    file: "Nike",
    name: "Nike",
    price: 700,
    isOwned: false,
  },
  {
    file: "Adidas",
    name: "Adidas",
    price: 600,
    isOwned: false,
  },
  {
    file: "Celine",
    name: "Celine",
    price: 1900,
    isOwned: false,
  },
  {
    file: "Burberry",
    name: "Burberry",
    price: 2000,
    isOwned: false,
  },
  {
    file: "Fendi",
    name: "Fendi",
    price: 2100,
    isOwned: false,
  },
] as const;

const toast = useToast();

const userPoints = ref(2750); // TODO: API 대체
const isChecked = ref(false);
const selectedBrand = ref<(typeof BRAND_TEST_DATA)[number] | null>(null);

const isModalOpen = computed({
  get: () => selectedBrand.value !== null,
  set: (val: boolean) => {
    if (!val) selectedBrand.value = null;
  },
});

const filteredBrands = computed(() =>
  isChecked.value
    ? BRAND_TEST_DATA.filter((brand) => brand.isOwned)
    : BRAND_TEST_DATA
);

const onBrandPurchase = (brand: (typeof BRAND_TEST_DATA)[number]) => {
  // TODO: 구매 API 호출
  if (userPoints.value >= brand.price) {
    userPoints.value -= brand.price;
    brand.isOwned = true;
    toast.add({
      title: "구매 완료",
      description: `${brand.name} 배지를 구매하였습니다.`,
      color: "success",
    });
  } else {
    toast.add({
      title: "포인트 부족",
      description: `보유 포인트가 부족합니다. 현재 보유 포인트: ${userPoints.value}P`,
      color: "error",
    });
  }
};

const onBrandSelect = (brand: (typeof BRAND_TEST_DATA)[number]) => {
  // TODO: 장착 API 호출
  isModalOpen.value = false;
  toast.add({
    title: "배지 장착 완료",
    description: `${brand.name} 배지를 장착하였습니다.`,
    color: "success",
  });
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mt-5">
      <div class="flex items-center gap-2">
        <Coin size="lg" />
        <KBUITypography size="b14" weight="medium">스타 포인트</KBUITypography>
      </div>
      <KBUITypography size="b14" weight="bold"
        >{{ userPoints.toLocaleString() }}P</KBUITypography
      >
    </div>
    <UCheckbox
      v-model="isChecked"
      label="보유중인 브랜드만 보기"
      color="warning"
      class="cursor-pointer mt-4"
    />

    <ul
      v-if="filteredBrands.length > 0"
      class="grid grid-cols-3 justify-between gap-y-4 mt-4"
    >
      <li
        v-for="brand in filteredBrands"
        :key="brand.file"
        @click="selectedBrand = brand"
      >
        <div
          class="relative flex justify-center items-center size-24 cursor-pointer mx-auto"
        >
          <div
            v-if="brand.isOwned"
            class="absolute top-0 left-0 right-0 bottom-0 bg-black-60 flex items-center justify-center z-30"
          >
            <KBUITypography weight="bold" color="white">보유중</KBUITypography>
          </div>
          <component :is="BRAND_COMPONENTS[brand.file]" />
          <figure
            class="size-20 relative flex items-center justify-center z-20"
          >
            <NuxtImg
              :src="`assets/images/brands/${brand.file.toLocaleLowerCase()}.png`"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="flex items-center justify-center gap-1 mt-1">
          <Coin size="sm" />
          <KBUITypography size="b12" weight="medium"
            >{{ brand.price.toLocaleString() }}P</KBUITypography
          >
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
        보유중인 브랜드가 없어요!
      </KBUITypography>
    </div>
    <UModal v-model:open="isModalOpen">
      <template #title>브랜드 상세 정보</template>
      <template #content>
        <aside v-if="selectedBrand" class="p-6">
          <KBUITypography size="b20" weight="bold" class="text-center">
            {{ selectedBrand.name }} 배지를 <br />
            {{
              selectedBrand.isOwned ? "장착하시겠습니까?" : "구매하시겠습니까?"
            }}
          </KBUITypography>
          <div class="grid grid-cols-2 gap-2 mt-10">
            <KBUIButton
              type="button"
              size="medium"
              variant="secondary"
              class="w-full"
              @click="selectedBrand = null"
            >
              닫기
            </KBUIButton>

            <KBUIButton
              v-if="!selectedBrand.isOwned"
              type="button"
              size="medium"
              variant="primary"
              class="w-full"
              :disabled="selectedBrand.price > userPoints"
              @click="onBrandPurchase(selectedBrand)"
            >
              {{
                selectedBrand.price > userPoints ? "포인트 부족" : "구매하기"
              }}
            </KBUIButton>
            <KBUIButton
              v-else
              type="button"
              size="medium"
              variant="primary"
              class="w-full"
              @click="onBrandSelect(selectedBrand)"
            >
              장착하기
            </KBUIButton>
          </div>
        </aside>
      </template>
    </UModal>
  </div>
</template>
