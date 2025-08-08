<script setup lang="ts">
import { reactive } from "vue";
import { BUSINESS_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "~/components/common/HistoryBlock.vue";
import FilterPanel from "~/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import {  getCorporateCardListCursor, getCorporateCardTotalPrice } from "~/services/business";
import { ProcessState } from "~/enum/role.enum";

// 선택된 필터 상태
const selected = reactive({
  기간: "1개월",
  종류: "전체",
  정렬: "최신순",
});

const { data } = useQuery({
  queryKey: ["getCorporateCardTotalPrice"],
  queryFn: async () => (await getCorporateCardTotalPrice()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const isLess = data.value && data.value.thisMonth < data.value.lastMonth;
const diffAmount = data.value
  ? Math.abs(data.value.thisMonth - data.value.lastMonth)
  : 0;

// 카드 데이터 정의
const card_data = computed<CardProps>(() => ({
  title: `${data.value?.month}월 사용 금액`,
  content: `${data.value?.thisMonth.toLocaleString()}원`,
  src: isLess ? "luna-2" : "luna-1",
  className: "bg-blue-1",
  description: data.value
    ? "저번 달보다 {replace}\n덜 쓰고 있어요!"
    : "저번 달보다 {replace}\n더 쓰고 있어요!",
  boldText: `${diffAmount.toLocaleString()}원`,
}));

// 아이콘 매핑 함수
const getIcon = (label: string): { background: string; emoji: string } => {
  if (label.includes("브네")) {
    return { background: "bg-yellow-1", emoji: "🍖" };
  } else if (label.includes("스타벅스")) {
    return { background: "bg-green-1", emoji: "☕️" };
  } else {
    return { background: "bg-gray-1", emoji: "💲" };
  }
};

const loadMoreRef = ref<HTMLElement | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const {
  data: corporateCardList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
} = useInfiniteQuery({
  queryKey: ["corporateCardList", selected, startDate, endDate],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await getCorporateCardListCursor({
      period: getPeriodNumber(selected["기간"]),
      sort: getSortOrder(selected["정렬"]),
      state: getCompletedReceiptFilter(selected["종류"]),
      startDate: startDate.value ?? undefined,
      endDate: endDate.value ?? undefined,
      cursorId: pageParam === 0 ? undefined : pageParam,
      size: 20
    });
    return response.data;
  },
  getNextPageParam: (lastPage) => {
    return lastPage.cursorId ? lastPage.cursorId : undefined;
  },
  initialPageParam: 0,
  refetchOnWindowFocus: false,
  retry: false,
});

const onChangeDate = (start: string, end: string) => {
  startDate.value = start;
  endDate.value = end;
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
    <!-- 상단 카드 -->
    <Card
      :title="card_data.title"
      :content="card_data.content"
      :src="card_data.src"
      :class-name="card_data.className"
      :href="card_data.href"
      :description="card_data.description"
      :bold-text="card_data.boldText"
    />

    <!-- 사용 금액 영역 -->
    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="BUSINESS_FILTER_KEYS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
        @change-date="onChangeDate"
      />
      <HistoryBlock
        :items="
          corporateCardList?.pages.flatMap((page) =>
            (page.corporateCardList ?? []).map((receipt) => ({
              id: receipt.receiptId,
              label: receipt.companyName,
              amount: receipt.totalPrice,
              href: `/business/${receipt.receiptId}`,
              icon: getIcon(receipt.companyName),
              createdAt: receipt.createdAt,
              completed:
                receipt.processState === ProcessState.DEPOSIT
                  ? { word: '금액 반환 완료', icon: 'mdi:cash-refund' }
                  : receipt.processState === ProcessState.REJECTED
                    ? { word: '경비 처리 반려', icon: 'ic:baseline-close' }
                    : undefined,
            }))
          ) ?? []
        "
      />
      <div ref="loadMoreRef" class="h-6" />
    </div>
  </main>
</template>