<script setup lang="ts">
import { reactive } from "vue";
import PointsCarousel from "~/components/points/Carousel.vue";
import HistoryBlock from "~/components/common/HistoryBlock.vue";
import {
  FILTER_LABEL_KEYS,
  POINT_FILTER_KEYS,
} from "~/common/constant/filters";
import {
  getIcon,
  getPeriodNumber,
  getSortOrder,
  getRewardType,
} from "~/utils/common";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { getRewardList } from "~/services/reward";

// 필터 선택 상태
const selected = reactive({
  "common.filter.period": "common.filter.1month",
  "common.filter.type": "common.filter.entire",
  "common.filter.sort": "common.filter.latest",
});

const POINT_FILTERS = computed<Record<string, string[]>>(() => {
  return Object.fromEntries(
    Object.entries(POINT_FILTER_KEYS).map(([key, values]) => [
      FILTER_LABEL_KEYS[key],
      values.map((v) => v),
    ])
  );
});

const loadMoreRef = ref<HTMLElement | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const {
  data: rewardList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
} = useInfiniteQuery({
  queryKey: ["rewardList", selected, startDate, endDate],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await getRewardList({
      period: getPeriodNumber(selected["common.filter.period"]),
      type: getRewardType(selected["common.filter.type"]),
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
    <component :is="PointsCarousel" />

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="POINT_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
        @change-date="onChangeDate"
      />
      <HistoryBlock
        :items="
          rewardList?.pages.flatMap((page) =>
            page.rewardList.map((reward) => ({
              id: reward.rewardId,
              label:
                reward.reward === 0 ? '배지 할인 적립' : '탄소중립 포인트 적립',
              amount: reward.reward === 0 ? reward.carbonPoint : reward.reward,
              icon: getIcon(
                reward.reward === 0 ? '배지 할인 적립' : '탄소중립 포인트 적립'
              ),
              createdAt: reward.createdAt,
            }))
          ) ?? []
        "
      />
      <div ref="loadMoreRef" class="h-6" />
    </div>
  </main>
</template>
