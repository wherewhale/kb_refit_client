<script setup lang="ts">
import { reactive } from "vue";
import { EXPENSE_FILTER_KEYS } from "@/common/constant/filters";
import Card from "~/components/common/Card.vue";
import HistoryBlock from "@/components/common/HistoryBlock.vue";
import FilterPanel from "@/components/common/FilterPanel.vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import { getPendingReceipt } from "~/services/expense";
import { useQuery } from "@tanstack/vue-query";
import type { PendingDetail } from "~/types/expense";

// 선택된 필터 상태
const selected = reactive({
  기간: "1개월",
  정렬: "최신순",
  필터: "전체",
});

const { data } = useQuery<PendingDetail>({
  queryKey: ["getPendingReceipt"],
  queryFn: async () => (await getPendingReceipt()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const isOpen = ref(false);
const totalCount = 327;  // 예: 총 건수
const toast = useToast();

const handleSend = ({ email }: { email: string }) => {
  // 1) 즉시 모달 닫기 (사용자 체감상 '보내기' 누르는 순간 닫힘)
  isOpen.value = false

  try {
    // TODO: 2) 실제 전송 (성공 시 토스트)

    toast.add({
      title: '경비 처리 항목을 보냈습니다.',
      description: `${email} 로 처리 결과를 전송했어요.`,
      color: 'success'
    })
  } catch {
    // 실패 토스트(모달은 이미 닫혀 있음)
    toast.add({
      title: '전송 실패',
      description: '네트워크 상태를 확인 후 다시 시도하세요.',
      color: 'error'
    })
  }
}

const openModal = () => { isOpen.value = true; };
// TODO: API 호출

// 처리 완료된 경비 목록
const paymentList = [
  {
    id: 21,
    label: "스타벅스",
    amount: -5900,
    createdAt: new Date("2025-07-14T12:30:00"),
    isCompleted: true,
  },
  {
    id: 22,
    label: "브네",
    amount: -32500,
    createdAt: new Date("2025-07-14T14:35:00"),
    isCompleted: true,
  },
  {
    id: 23,
    label: "브네",
    amount: -52500,
    createdAt: new Date("2025-07-14T18:50:00"),
    isCompleted: false,
  },
  {
    id: 24,
    label: "브네",
    amount: -52500,
    createdAt: new Date("2025-07-15T10:05:00"),
    isCompleted: false,
  },
];

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
const getIcon = (label: string): { background: string; emoji: string } => {
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
        {{ data?.countPendingReceipts || data?.pendingReceipts }}건</KBUITypography
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
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/expense/${item.id}/receive`,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
            completed: item.isCompleted === true
              ? { word: '경비 처리 승인', icon: 'ic:baseline-check' }
              : item.isCompleted === false
                ? { word: '경비 처리 반려', icon: 'ic:baseline-close' }
                : undefined,
          }))
        "
      />
    </div>
  </main>

  <SendExpenseResult
    v-model:open="isOpen"
    :count="totalCount"
    @send="handleSend"
  />
</template>