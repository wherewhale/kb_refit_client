<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabsItem } from "@nuxt/ui";
import ExpenseContainer from "~/containers/expense/ExpenseContainer.vue";
import BusinessContainer from "~/containers/business/BusinessContainer.vue";
import CommonFooter from "~/components/common/layouts/CommonFooter.vue";

const route = useRoute();
const router = useRouter();

const items = computed<TabsItem[]>(() => [
  { label: "경비 처리 영수증", value: "expense" },
  { label: "사업자 영수증", value: "business" },
]);

const active = ref(route.query.tab?.toString() || "expense");

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
      <ExpenseContainer v-if="active === 'expense'" />
      <BusinessContainer v-else-if="active === 'business'" />
    </div>
    <CommonFooter />
  </div>
</template>
