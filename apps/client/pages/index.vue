<template>
  <div class="flex flex-col min-h-screen bg-kb-dark-gray text-white">
    <header class="p-6">로고 들어가야 하는 곳</header>
    <UTabs
      class="px-4"
      :items="items"
      :ui="{
        list: 'relative flex p-1 group bg-gray-200 dark:bg-gray-800 rounded-3xl', // 전체 탭 바
        indicator:
          'absolute transition-[translate,width] duration-200 bg-white rounded-2xl shadow-sm inset-y-1', // 활성 탭 배경
        trigger:
          'group relative inline-flex items-center min-w-0 data-[state=inactive]:text-gray-600 hover:data-[state=inactive]:not-disabled:text-gray-900 font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors justify-center data-[state=active]:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 grow', // 각 탭 버튼
        content: 'focus:outline-none w-full',
        label: 'truncate',
        // 기타 필요한 slots 설정 (app.config.ts에서 가져와서 필요에 따라 수정)
      }"
    >
      <template #point="{ item }">
        <main>
          포인트 탭
          <div
            class="w-full h-32 bg-kb-yellow-pos rounded-lg shadow-lg flex items-center justify-center"
          >
            <PointSummaryCard />
          </div>
        </main>
      </template>
      <template #receipt="{ item }">
        <main>구매 영수증 탭</main>
      </template>
      <template #hospital_receipt="{ item }">
        <main>병원 영수증 탭</main>
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
      <template #header>
        <div class="relative w-full h-full">
          <KBUITypography tag="h2" size="b16" weight="bold">
            테스트
          </KBUITypography>
          <UButton
            icon="i-heroicons-chevron-down"
            block
            size="lg"
            class="rounded-full !bg-gray-200 text-gray-700 hover:!bg-gray-300 w-10 h-10 absolute bottom-0 left-1/2 transform -translate-x-1/2"
            @click="isBottomSheetOpen = !isBottomSheetOpen"
          />
        </div>
      </template>
      <template #body>
        <div class="p-4 min-h-[500px]">지갑 들어가야 하는 곳</div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TabsItem } from "@nuxt/ui";

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
// PointSummaryCard는 임시로 div로 대체됨. 필요시 컴포넌트 생성.
</script>
