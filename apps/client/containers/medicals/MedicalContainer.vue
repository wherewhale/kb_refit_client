<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/Card.vue";
import {
  FILTER_LABEL_KEYS,
  MEDICAL_FILTER_KEYS,
} from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import { getMedicalReceiptList, getMedicalSummary } from "~/services/medical";

const { t } = useI18n();

// 필터 선택 상태
const selected = reactive({
  "common.filter.period": "common.filter.1month",
  "common.filter.type": "common.filter.entire",
  "common.filter.sort": "common.filter.latest",
  "common.filter.filter": "common.filter.entire",
});

const MEDICAL_FILTERS = computed<Record<string, string[]>>(() => {
  return Object.fromEntries(
    Object.entries(MEDICAL_FILTER_KEYS).map(([key, values]) => [
      FILTER_LABEL_KEYS[key],
      values.map((v) => v),
    ])
  );
});

const loadMoreRef = ref<HTMLElement | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const queryKey = computed(() => [
  "medicalList",
  selected["common.filter.period"],
  selected["common.filter.type"],
  selected["common.filter.sort"],
  selected["common.filter.filter"],
  startDate.value,
  endDate.value,
]);

const { data: medicalSummaryData } = useQuery({
  queryKey: ["medicalSummary"],
  queryFn: async () => (await getMedicalSummary()).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,
});

const {
  data: medicalReceiptList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
} = useInfiniteQuery({
  queryKey: queryKey,
  queryFn: async ({ pageParam = 0 }) => {
    const response = await getMedicalReceiptList({
      period: getPeriodNumber(selected["common.filter.period"]),
      type: getMedicalType(selected["common.filter.type"]),
      sort: getSortOrder(selected["common.filter.sort"]),
      filter: getMedicalFilter(selected["common.filter.filter"]),
      startDate: startDate.value ?? undefined,
      endDate: endDate.value ?? undefined,
      cursorId: pageParam === 0 ? undefined : pageParam,
      size: 20,
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

const card_data = computed<CardProps>(() => ({
  title: t("medical.card.title"),
  content: `${(medicalSummaryData.value?.recentTotalPrice ?? 0).toLocaleString()}원`,
  src: "ramu",
  className: "bg-red-1",
  description:
    (medicalSummaryData.value?.insuranceBillable ?? 0) > 0
      ? t("medical.card.description")
      : "현재 청구 가능한 영수증이 없어요!",
  boldText:
    (medicalSummaryData.value?.insuranceBillable ?? 0) > 0
      ? `${(medicalSummaryData.value?.insuranceBillable ?? 0).toLocaleString()}건`
      : undefined,
}));

const onChangeDate = (start: string, end: string) => {
  startDate.value = start;
  endDate.value = end;
};

const getStateObject = (state: string) => {
  switch (state) {
    case "accepted":
      return {
        word: "보험 청구 완료",
        icon: "material-symbols:local-hospital",
      };
    case "rejected":
      return { word: "보험 청구 거절", icon: "material-symbols:cancel" };
    case "inProgress":
      return {
        word: "보험 청구 진행 중",
        icon: "material-symbols:hourglass-empty",
      };
    default:
      return undefined;
  }
};

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

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="MEDICAL_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
        @change-date="onChangeDate"
      />
      <HistoryBlock
        :items="
          medicalReceiptList?.pages.flatMap((page) =>
            page.hospitalList.map((item) => ({
              id: item.receiptId,
              label: item.storeName,
              amount: item.totalPrice,
              createdAt: item.createdAt,
              completed: getStateObject(item.processState),
              icon: {
                background: 'bg-blue-1',
                emoji: '🏥',
              },
              href: `/medical/${item.receiptId}`,
            }))
          ) ?? []
        "
      />
    </div>
  </main>
</template>
