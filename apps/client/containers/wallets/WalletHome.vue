<script setup lang="ts">
import { badgeList } from "~/common/constant/badgeList";
import MyWallet from "~/components/wallet/MyWallet.vue";
import MyBenefit from "~/components/wallet/MyBenefit.vue";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();
</script>
<template>
  <div>
    <MyWallet :badge-list="badgeList" theme="Hermes" />
    <div class="mt-4 flex justify-center items-start gap-8">
      <div class="flex flex-col items-center">
        <KBUIButton
          variant="outlined"
          size="small"
          @click="props.onNext('브랜드 상점')"
        >
          <UIcon name="mdi:plus" class="w-4 h-4" />
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
          <UIcon name="mdi:plus" class="w-4 h-4" />
        </KBUIButton>
        <KBUITypography size="b12">배지 도감</KBUITypography>
      </div>
    </div>
    <MyBenefit />
  </div>
</template>
