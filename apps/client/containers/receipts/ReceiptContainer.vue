<script setup lang="ts">
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  FILTER_LABEL_KEYS,
  RECEIPT_FILTER_KEYS,
} from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";
import { getMonthlyReceiptTotal } from "~/services/receipt";
import { useQuery } from "@tanstack/vue-query";
import { getIcon } from "~/utils/common";

import Card from "~/components/common/Card.vue";

const { t } = useI18n();

// ① selected 상태
const selected = reactive({
  기간: "common.filter.1month",
  종류: "common.filter.entire",
  정렬: "common.filter.latest",
  필터: "common.filter.entire",
});

// ② RECEIPT_FILTER_KEYS + t()로 번역된 필터 생성
const RECEIPT_FILTERS = computed<Record<string, string[]>>(() => {
  return Object.fromEntries(
    Object.entries(RECEIPT_FILTER_KEYS).map(([key, values]) => [
      t(FILTER_LABEL_KEYS[key]),
      values.map((v) => t(v)),
    ])
  );
});

const { data } = useQuery({
  queryKey: ["receipt", "cardData"],
  queryFn: async () => (await getMonthlyReceiptTotal()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

// 카드 데이터
const card_data = computed<CardProps>(() => ({
  title: t("receipt.card.title"),
  content: `${(data.value?.total ?? 0).toLocaleString()}원`,
  src: `${(data.value?.lastMonth ?? 0) < 0 ? "luna-1" : "luna-2"}`,
  className: "bg-blue-1",
  // FIXME: 더 쓴거랑 덜 쓴거랑 다름
  description: t("receipt.card.description"),
  boldText: `${Math.abs(data.value?.lastMonth ?? 0).toLocaleString()}원`,
}));

// TODO: API 연동
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
    amount: 52500,
    createdAt: new Date("2025-07-14T18:50:00"),
    isCompleted: false,
  },
  {
    id: 24,
    label: "브네",
    amount: -52500,
    createdAt: new Date("2025-07-15T10:05:00"),
  },
];

// TODO: 거절된 법인카드 결제 내역
const REJECTED_PAYMENTS = [
  {
    id: 25,
    label: "브네",
    amount: -15000,
    createdAt: new Date("2025-07-15T11:20:00"),
  },
  {
    id: 26,
    label: "스타벅스",
    amount: -4500,
    createdAt: new Date("2025-07-13T13:45:00"),
  },
];
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
      v-if="REJECTED_PAYMENTS.length > 0"
      class="w-full rounded-lg bg-white p-6 mt-10 text-black"
    >
      <KBUITypography tag="h3" weight="bold"
        >법인 처리 불가 항목 (총
        {{ REJECTED_PAYMENTS.length }}개)</KBUITypography
      >
      <HistoryBlock
        :items="
          REJECTED_PAYMENTS.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/receipt/${item.id}`,
            icon: getIcon(item.label),
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
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            href: `/receipt/${item.id}`,
            icon: getIcon(item.label),
            createdAt: item.createdAt,
            completed: item.isCompleted
              ? { word: '영수 처리 완료', icon: 'material-symbols:work' }
              : undefined,
          }))
        "
      />
    </div>
  </main>
</template>
