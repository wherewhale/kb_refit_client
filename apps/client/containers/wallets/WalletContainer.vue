<script setup lang="ts">
import MyWallet from "~/components/wallet/MyWallet.vue";
import AddBrandBadge from "~/components/wallet/AddBrandBadge.vue";
import MyBenefit from "~/components/wallet/MyBenefit.vue";
import { badgeList } from "~/common/constant/badgeList";

const isBottomSheetOpen = ref(false);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg rounded-t-lg"
  >
    <div class="relative z-40">
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
        class="p-4 pt-8 max-h-[500px] overflow-y-scroll max-w-sm mx-auto w-full scrollbar-hide"
      >
        <MyWallet :badge-list="badgeList" theme="Hermes" />
        <AddBrandBadge />
        <MyBenefit />
      </div>
    </template>
  </USlideover>
</template>
