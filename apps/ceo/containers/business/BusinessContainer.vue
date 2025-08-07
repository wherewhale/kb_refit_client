<script setup lang="ts">
import { reactive } from "vue";
import { BUSINESS_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "~/components/common/HistoryBlock.vue";
import FilterPanel from "~/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import { useQuery } from "@tanstack/vue-query";
import {  getCorporateCardListCursor, getCorporateCardTotalPrice } from "~/services/business";

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

const { data: cardList } = useQuery({
  queryKey: ["getCorporateCardListCursor"],
  queryFn: async () => (await getCorporateCardListCursor()).data,
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

// 영수 처리 완료 or 진행 중 리스트 (가공 후 전달됨)
// const paymentList = [
//   {
//     id: 21,
//     label: "스타벅스",
//     amount: -5900,
//     createdAt: new Date("2025-07-14T12:30:00"),
//     isCompleted: true,
//   },
//   {
//     id: 22,
//     label: "브네",
//     amount: -32500,
//     createdAt: new Date("2025-07-14T14:35:00"),
//     isCompleted: true,
//   },
//   {
//     id: 23,
//     label: "브네",
//     amount: 52500,
//     createdAt: new Date("2025-07-14T18:50:00"),
//     isCompleted: false,
//   },
//   {
//     id: 24,
//     label: "브네",
//     amount: -52500,
//     createdAt: new Date("2025-07-15T10:05:00"),
//   },
// ];
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
      />
      <HistoryBlock
        :items="(cardList?.corporateCardList ?? []).map((item) => ({
          id: item.receiptId,
          label: item.companyName,
          amount: item.totalPrice,
          href: `/business/${item.receiptId}`,
          icon: getIcon(item.companyName),
          createdAt: item.createdAt,
        }))"
      />
    </div>
  </main>
</template>