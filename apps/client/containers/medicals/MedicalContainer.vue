<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/Card.vue";
import { FILTER_LABEL_KEYS, MEDICAL_FILTER_KEYS } from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";

const { t } = useI18n();

// 필터 선택 상태
const selected = reactive({
  기간: "common.filter.1month",
  종류: "common.filter.entire",
  정렬: "common.filter.latest",
  필터: "common.filter.entire",
});

const MEDICAL_FILTERS = computed<Record<string, string[]>>(() => {
  return Object.fromEntries(
    Object.entries(MEDICAL_FILTER_KEYS).map(([key, values]) => [
      t(FILTER_LABEL_KEYS[key]),
      values.map((v) => t(v)),
    ])
  );
});

const card_data = computed<CardProps>(() => ({
  title: t("medical.card.title"),
  content: `${(21234200).toLocaleString()}원`,
  src: "ramu",
  className: "bg-red-1",
  description: t("medical.card.description"),
  boldText: "7건",
}));

// api 호출 결과 테스트 데이터
const paymentList = [
  {
    id: 21,
    label: "손박사 이비인후과",
    amount: -72500,
    createdAt: new Date("2025-07-14T12:30:00"),
    isCompleted: true,
  },
  {
    id: 22,
    label: "아따잘붙네 정형외과",
    amount: -32500,
    createdAt: new Date("2025-07-14T14:35:00"),
    isCompleted: true,
  },
  {
    id: 23,
    label: "아따잘붙네 정형외과",
    amount: 52500,
    createdAt: new Date("2025-07-14T18:50:00"),
  },
  {
    id: 24,
    label: "아따잘붙네 정형외과",
    amount: -32500,
    createdAt: new Date("2025-07-15T10:05:00"),
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

    <div class="w-full rounded-lg bg-white p-6 mt-10 text-black">
      <FilterPanel
        :filters="MEDICAL_FILTERS"
        :selected="selected"
        @update:selected="(value) => Object.assign(selected, value)"
      />
      <HistoryBlock
        :items="
          paymentList.map((item) => ({
            id: item.id,
            label: item.label,
            amount: item.amount,
            createdAt: item.createdAt,
            completed: item.isCompleted
              ? {
                  word: '보험 청구 완료',
                  icon: 'material-symbols:local-hospital',
                }
              : undefined,
            icon: {
              background: 'bg-blue-1',
              emoji: '🏥',
            },
            href: `/medical/${item.id}`,
          }))
        "
      />
    </div>
  </main>
</template>
