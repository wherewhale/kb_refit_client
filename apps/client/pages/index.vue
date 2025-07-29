<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabsItem } from "@nuxt/ui";
import PointsContainer from "~/containers/points/PointContainer.vue";
import ReceiptContainer from "~/containers/receipts/ReceiptContainer.vue";
import MedicalContainer from "~/containers/medicals/MedicalContainer.vue";
import WalletContainer from "~/containers/wallets/WalletContainer.vue";

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const items = computed<TabsItem[]>(() => [
  { label: t("client.tab.point"), value: "point" },
  { label: t("client.tab.purchase_receipt"), value: "receipt" },
  { label: t("client.tab.hospital_receipt"), value: "hospital_receipt" },
]);

const active = ref(route.query.tab?.toString() || "point");

watch(active, (tab) => {
  router.replace({ query: { tab } });
});
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <CommonHeader />
    <UTabs
      v-model="active"
      class="px-4"
      :items="items"
      :ui="{
        list: 'relative flex p-1 group bg-gray-4 rounded-3xl', // 전체 탭 바
        indicator:
          'absolute transition-[translate,width] duration-200 text-black bg-white rounded-2xl shadow-sm inset-y-1', // 활성 탭 배경
        trigger:
          'group relative inline-flex items-center min-w-0 data-[state=inactive]:text-gray-2 hover:data-[state=inactive]:not-disabled:text-gray-2 font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors justify-center data-[state=active]:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 grow', // 각 탭 버튼
        content: 'focus:outline-none w-full',
        label: 'truncate',
      }"
    />
    <div class="p-4">
      <PointsContainer v-if="active === 'point'" />
      <ReceiptContainer v-else-if="active === 'receipt'" />
      <MedicalContainer v-else-if="active === 'hospital_receipt'" />
    </div>
    <WalletContainer />
  </div>
</template>
