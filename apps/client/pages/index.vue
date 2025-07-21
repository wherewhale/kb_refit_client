<script setup lang="ts">
import { ref } from "vue";
import type { TabsItem } from "@nuxt/ui";
import Logo from "../components/common/logo.vue";
import PointsContainer from "../containers/points/point-container.vue";
import MyWallet from '~/components/wallet/mywallet.vue';
import AddBrandBadge from '~/components/wallet/addbrandbadge.vue';
import MyBenefit from '~/components/wallet/mybenefit.vue';
import { badgeList } from '~/constant/badgeList';

const items = ref<TabsItem[]>([
  {
    label: "포인트",
    slot: "point" as const,
  },
  {
    label: "구매영수증",
    slot: "receipt" as const,
  },
  {
    label: "병원영수증",
    slot: "hospital_receipt" as const,
  },
]);

// 하단 모달 열림/닫힘 상태
const isBottomSheetOpen = ref(false);
const runtimeConfig = useRuntimeConfig();

console.log(runtimeConfig.public.apiBaseUrl);
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <header class="px-6 py-4">
      <component :is="Logo" />
    </header>
    <UTabs
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
    >
      <template #point="{ item }: { item: TabsItem }">
        <component :is="PointsContainer" />
      </template>
      <template #receipt="{ item }: { item: TabsItem }">
        <main>
          {{ item.label }}
        </main>
      </template>
      <template #hospital_receipt="{ item }: { item: TabsItem }">
        <main>{{ item.label }}</main>
      </template>
    </UTabs>

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
        <div class="p-4 max-h-[500px] overflow-y-scroll max-w-sm mx-auto w-full scroll scrollbar-hide">
          <div class="h-[1024px]">
            <MyWallet :badge-list="badgeList"/>
            <AddBrandBadge />
            <MyBenefit/>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
