<script setup lang="ts">
import { reactive } from "vue";
import { EXPENSE_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "@/components/common/HistoryBlock.vue";
import FilterPanel from "@/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import { getCompletedReceipt, getPendingReceipt } from "~/services/expense";
import { useQuery } from "@tanstack/vue-query";
import { ProcessState } from "~/enum/role.enum";
import SendExpenseResult from "~/components/expense/SendExpenseResult.vue";

// 선택된 필터 상태
const selected = reactive({
  기간: "1개월",
  정렬: "최신순",
  필터: "전체",
});

const { data } = useQuery({
  queryKey: ["getPendingReceipt"],
  queryFn: async () => (await getPendingReceipt()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const isOpen = ref(false);

// 처리 완료된 경비 목록
const { data: completedData } = useQuery({
  queryKey: ["getCompletedReceipt"],
  queryFn: async () => (await getCompletedReceipt()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const openModal = () => { isOpen.value = true; };

// 카드 데이터 정의
const card_data = computed<CardProps>(() => ({
  title: "처리가 필요한 경비",
  content: `총 ${(data.value?.countPendingReceipts || data.value?.pendingReceipts)}건`,
  src: "bibi",
  className: "bg-yellow-1",
  description: data.value?.countCompletedReceiptsThisMonth
    ? "이번 달 총 {replace}의\n경비 처리를 리핏과 함께했어요!"
    : "이번 달에는 아직 리핏과\n경비 처리를 진행하지 않았어요!",
  boldText: data.value?.countCompletedReceiptsThisMonth
    ? `${data.value.countCompletedReceiptsThisMonth}건`
    : "",
}));

// 아이콘 매핑 함수
const getIcon = (label?: string): { background: string; emoji: string } => {
  if (!label) return { background: "bg-gray-1", emoji: "💲" };

  if (label.includes("브네")) {
    return { background: "bg-yellow-1", emoji: "🍖" };
  } else if (label.includes("스타벅스")) {
    return { background: "bg-green-1", emoji: "☕️" };
  } else {
    return { background: "bg-gray-1", emoji: "💲" };
  }
};
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

    <!-- 처리가 필요한 경비 영역 -->
    <div
      v-if="(data?.pendingReceipts ?? []).length > 0"
      class="w-full rounded-lg bg-white p-6 mt-10"
    >
      <KBUITypography tag="h3" weight="bold"
        >처리가 필요한 경비 총
        {{ data?.countPendingReceipts ?? 0 }}건</KBUITypography
      >
      <HistoryBlock
        :items="
          (data?.pendingReceipts ?? []).map((item) => ({
            id: item.receiptId,
            label: item.companyName,
            amount: item.totalPrice,
            href: `/expense/${item.receiptId}`,
            icon: getIcon(item.companyName),
            createdAt:
              item.createdAt && !isNaN(new Date(item.createdAt).getTime())
                ? new Date(item.createdAt)
                : new Date(0)
          }))
        "
      />
    </div>

    <!-- 처리 완료된 경비 영역 -->
    <div class="w-full rounded-lg bg-white p-6 mt-10">
      <div class="flex items-center justify-between mb-4">
        <KBUITypography tag="h3" weight="bold">
          처리 완료된 경비 목록
        </KBUITypography>
        <KBUIButton variant="primary" size="small" @click="openModal">
          결과 보내기
        </KBUIButton>
      </div>
      <FilterPanel
        :filters="EXPENSE_FILTER_KEYS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          completedData?.list?.map((item) => ({
            id: item.receiptId,
            label: item.companyName,
            amount: item.totalPrice,
            href: `/expense/${item.receiptId}/receive`,
            icon: getIcon(item.companyName),
            createdAt:              
              item.createdAt && !isNaN(new Date(item.createdAt).getTime())
                ? new Date(item.createdAt)
                : new Date(0),
            completed: item.processState === ProcessState.APPROVED
              ? { word: '경비 처리 승인', icon: 'ic:baseline-check' }
              : item.processState === ProcessState.REJECTED
                ? { word: '경비 처리 반려', icon: 'ic:baseline-close' }
                : undefined,
          })) || []
        "
      />

    </div>
  </main>

  <SendExpenseResult
    v-model:open="isOpen"
  />
</template>