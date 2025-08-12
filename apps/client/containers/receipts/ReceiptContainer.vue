<script setup lang="ts">
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  FILTER_LABEL_KEYS,
  RECEIPT_FILTER_KEYS,
} from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";
import {
  getMonthlyExpense,
  getReceiptList,
  getRejectedReceiptList,
} from "~/services/receipt";
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import {
  getIcon,
  getPeriodNumber,
  getReceiptPaymentType,
} from "~/utils/common";

import Card from "~/components/common/Card.vue";

const { t } = useI18n();

const selected = reactive({
  "common.filter.period": "common.filter.1month",
  "common.filter.type": "common.filter.entire",
  "common.filter.sort": "common.filter.latest",
  "common.filter.filter": "common.filter.entire",
});

const RECEIPT_FILTERS = computed<Record<string, string[]>>(() => {
  return Object.fromEntries(
    Object.entries(RECEIPT_FILTER_KEYS).map(([key, values]) => [
      FILTER_LABEL_KEYS[key],
      values.map((v) => v),
    ])
  );
});

const loadMoreRef = ref<HTMLElement | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const { data: summaryData } = useQuery({
  queryKey: ["receipt", "cardData"],
  queryFn: async () => (await getMonthlyExpense()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const { data: rejectedListData } = useQuery({
  queryKey: ["receipt", "rejectedList"],
  queryFn: async () => (await getRejectedReceiptList()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const {
  data: receiptList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
} = useInfiniteQuery({
  queryKey: ["receiptList", selected, startDate, endDate],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await getReceiptList({
      period: getPeriodNumber(selected["common.filter.period"]),
      type: getReceiptPaymentType(selected["common.filter.type"]),
      filter: getReceiptFilter(selected["common.filter.filter"]),
      sort: getSortOrder(selected["common.filter.sort"]),
      startDate: startDate.value ?? undefined,
      endDate: endDate.value ?? undefined,
      cursorId: pageParam === 0 ? undefined : pageParam,
    });
    return response.data;
  },
  getNextPageParam: (lastPage) => {
    return lastPage.nextCursorId ? lastPage.nextCursorId : undefined;
  },
  initialPageParam: 0,
  refetchOnWindowFocus: false,
  retry: false,
});

const onChangeDate = (start: string, end: string) => {
  startDate.value = start;
  endDate.value = end;
};

const getStateIcon = (state: string) => {
  switch (state) {
    case "accepted":
      return { word: "영수 처리 완료", icon: "material-symbols:work" };
    case "rejected":
      return {
        word: "영수 처리 불가",
        icon: "material-symbols-light:cancel-rounded",
      };
    case "inProgress":
      return { word: "영수 처리 중", icon: "mdi:message-processing" };
    default:
      return undefined;
  }
};

// 카드 데이터
const card_data = computed<CardProps>(() => ({
  title: t("receipt.card.title"),
  content: `${(summaryData.value?.thisMonthExpense ?? 0).toLocaleString()}원`,
  src: `${(summaryData.value?.lastMonthExpense ?? 0) > (summaryData.value?.thisMonthExpense ?? 0) ? "luna-1" : "luna-2"}`,
  className: "bg-blue-1",
  description:
    (summaryData.value?.lastMonthExpense ?? 0) <
    (summaryData.value?.thisMonthExpense ?? 0)
      ? "지난 달보다 더 쓰고 있어요!"
      : "지난 달보다 덜 쓰고 있어요!",
  boldText: `${Math.abs((summaryData.value?.thisMonthExpense ?? 0) - (summaryData.value?.lastMonthExpense ?? 0)).toLocaleString()}원`,
}));

let observer: IntersectionObserver | null = null;

const startObserver = () => {
  if (observer) observer.disconnect();
  if (!loadMoreRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        hasNextPage.value &&
        !isFetchingNextPage.value &&
        !isFetching.value
      ) {
        fetchNextPage();
      }
    },
    { threshold: 1.0 }
  );

  observer.observe(loadMoreRef.value);
};

onMounted(() => {
  startObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

// 요소가 바뀌거나 다시 렌더링 될 경우 재감지
watch(loadMoreRef, () => {
  startObserver();
});
</script>

<template>
  <main class="mt-10 pb-20">
    <Card
      :title="card_data.title"
      :content="card_data.content"
      :src="card_data.src"
      :class-name="card_data.className"
      :href="card_data.href"
      :description="card_data.description"
      :bold-text="card_data.boldText"
    />

    <div
      v-if="(rejectedListData?.rejectedList ?? []).length > 0"
      class="w-full rounded-lg bg-white p-6 mt-10 text-black"
    >
      <KBUITypography tag="h3" weight="bold"
        >법인 처리 불가 항목 (총
        {{ (rejectedListData?.rejectedList ?? []).length }}개)</KBUITypography
      >
      <HistoryBlock
        :items="
          (rejectedListData?.rejectedList ?? []).map((item) => ({
            id: item.receiptId,
            label: `${item.companyName}`,
            amount: item.totalPrice,
            href: `/receipt/${item.receiptId}`,
            icon: getIcon(`${item.companyName}`),
            createdAt: item.createdAt,
          }))
        "
      />
    </div>

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="RECEIPT_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
        @change-date="onChangeDate"
      />
      <HistoryBlock
        :items="
          receiptList?.pages.flatMap((page) =>
            page.receiptList.map((item) => ({
              id: item.receiptId,
              label: `${item.companyName}`,
              amount: item.totalPrice,
              href: `/receipt/${item.receiptId}`,
              icon: getIcon(`${item.companyName}`),
              createdAt: item.createdAt,
              completed: getStateIcon(item.processState),
            }))
          ) ?? []
        "
      />
      <div ref="loadMoreRef" class="h-6" />
    </div>
  </main>
</template>
