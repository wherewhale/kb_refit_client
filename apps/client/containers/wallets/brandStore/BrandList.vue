<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import { getBrandCollection } from "~/services/wallet";
import type { WalletBrandDetail } from "~/types/wallet";

const { data, error, isPending, refetch } = useQuery({
  queryKey: ["getBrandCollection"],
  queryFn: async () => {
    const res = await getBrandCollection();
    return res?.data ?? [];
  },
  refetchOnWindowFocus: false,
});

const toast = useToast();

const userPoints = ref(0); // TODO: API 대체
const isChecked = ref(false);
const selectedBrand = ref<WalletBrandDetail | null>(null);

const isModalOpen = computed({
  get: () => selectedBrand.value !== null,
  set: (val: boolean) => {
    if (!val) selectedBrand.value = null;
  },
});

const filteredBrands = computed(() =>
  isChecked.value
    ? (data.value?.walletBrandDtoList.filter((brand) => brand.owned) ?? [])
    : (data.value?.walletBrandDtoList ?? [])
);

const onBrandPurchase = (brand: WalletBrandDetail) => {
  // TODO: 구매 API 호출
  if (userPoints.value >= brand.walletCost) {
    userPoints.value -= brand.walletCost;
    brand.owned = true;
    toast.add({
      title: "구매 완료",
      description: `${brand.brandName} 배지를 구매하였습니다.`,
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

const onBrandSelect = (brand: WalletBrandDetail) => {
  // TODO: 장착 API 호출
  isModalOpen.value = false;
  toast.add({
    title: "배지 장착 완료",
    description: `${brand.brandName} 배지를 장착하였습니다.`,
    color: "success",
  });
};

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      userPoints.value = newData.starPoint;
    }
  },
  { immediate: true }
);
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
      v-if="!isPending && filteredBrands.length > 0"
      class="grid grid-cols-3 justify-between gap-y-4 mt-4"
    >
      <li
        v-for="brand in filteredBrands"
        :key="brand.walletId"
        @click="selectedBrand = brand"
      >
        <div
          class="relative flex justify-center items-center size-24 cursor-pointer mx-auto"
        >
          <div
            v-if="brand.owned"
            class="absolute top-0 left-0 right-0 bottom-0 bg-black-60 flex items-center justify-center z-30"
          >
            <KBUITypography weight="bold" color="white">보유중</KBUITypography>
          </div>
          <component
            :is="
              BRAND_COMPONENTS[
                brand.brandImage as keyof typeof BRAND_COMPONENTS
              ]
            "
          />
          <figure
            v-if="brand.brandImage"
            class="size-20 relative flex items-center justify-center z-20"
          >
            <NuxtImg
              :src="`assets/images/brands/${brand.brandImage?.toLocaleLowerCase()}.png`"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="flex items-center justify-center gap-1 mt-1">
          <Coin size="sm" />
          <KBUITypography size="b12" weight="medium"
            >{{ brand.walletCost.toLocaleString() }}P</KBUITypography
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
            {{ selectedBrand.brandName }} 배지를 <br />
            {{
              selectedBrand.owned ? "장착하시겠습니까?" : "구매하시겠습니까?"
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
              v-if="!selectedBrand.owned"
              type="button"
              size="medium"
              variant="primary"
              class="w-full"
              :disabled="selectedBrand.walletCost > userPoints"
              @click="onBrandPurchase(selectedBrand)"
            >
              {{
                selectedBrand.walletCost > userPoints
                  ? "포인트 부족"
                  : "구매하기"
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
