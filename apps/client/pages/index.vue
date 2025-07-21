<script setup lang="ts">
import { ref } from "vue";
import type { TabsItem } from "@nuxt/ui";
import MyWallet from "~/components/wallet/MyWallet.vue";
import AddBrandBadge from "~/components/wallet/AddBrandBadge.vue";
import MyBenefit from "~/components/wallet/MyBenefit.vue";
import { badgeList } from "~/constant/badgeList";
import PointsContainer from "~/containers/points/PointContainer.vue";
import ReceiptContainer from "~/containers/receipts/ReceiptContainer.vue";
import MedicalContainer from "~/containers/medicals/MedicalContainer.vue";

const route = useRoute();
const router = useRouter();

const items = ref<TabsItem[]>([
  { label: "포인트", value: "point" },
  { label: "구매영수증", value: "receipt" },
  { label: "병원영수증", value: "hospital_receipt" },
]);

const active = ref(route.query.tab?.toString() || "point");

watch(active, (tab) => {
  router.replace({ query: { tab } });
});

// 하단 모달 열림/닫힘 상태
const isBottomSheetOpen = ref(false);
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
          'absolute transition-[translate,width] duration-200 bg-white rounded-2xl shadow-sm inset-y-1', // 활성 탭 배경
        trigger:
          'group relative inline-flex items-center min-w-0 data-[state=inactive]:text-gray-2 hover:data-[state=inactive]:not-disabled:text-gray-2 font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors justify-center data-[state=active]:text-gray-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 grow', // 각 탭 버튼
        content: 'focus:outline-none w-full',
        label: 'truncate',
      }"
    />
    <div class="p-4">
      <PointsContainer v-if="active === 'point'" />
      <ReceiptContainer v-else-if="active === 'receipt'" />
      <MedicalContainer v-else-if="active === 'hospital_receipt'" />
    </div>

    <!-- TODO: 분리 필요 -->
    <div
      class="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg rounded-t-lg"
    >
      <div class="relative">
        <UButton
          icon="i-heroicons-chevron-up"
          block
          size="lg"
          class="rounded-full !bg-gray-200 text-gray-700 hover:!bg-gray-300 w-10 h-10 absolute bottom-0 left-1/2 transform -translate-x-1/2"
          @click="isBottomSheetOpen = !isBottomSheetOpen"
        />
      </div>
    </div>
    <USlideover
      side="bottom"
      title="Slideover with side"
      :open="isBottomSheetOpen"
      @update:open="isBottomSheetOpen = $event"
    >
      <template #content>
        <div class="relative w-full">
          <UButton
            icon="i-heroicons-chevron-down"
            block
            size="lg"
            class="rounded-full !bg-gray-200 text-gray-700 hover:!bg-gray-300 w-10 h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            @click="isBottomSheetOpen = !isBottomSheetOpen"
          />
        </div>
        <div
          class="p-4 max-h-[500px] overflow-y-scroll max-w-sm mx-auto w-full scrollbar-hide"
        >
          <div>
            <MyWallet :badge-list="badgeList" />
            <AddBrandBadge />
            <MyBenefit />
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
