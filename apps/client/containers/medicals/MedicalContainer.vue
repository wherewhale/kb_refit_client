<script setup lang="ts">
import { reactive } from "vue";
import Card from "~/components/common/Card.vue";
import {
  FILTER_LABEL_KEYS,
  MEDICAL_FILTER_KEYS,
} from "~/common/constant/filters";
import type { CardProps } from "~/interfaces/common/card.interface";
import { useQuery } from "@tanstack/vue-query";
import { getMedicalSummary } from "~/services/medical";

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

const { data: medicalSummaryData } = useQuery({
  queryKey: ["medicalSummary"],
  queryFn: async () => (await getMedicalSummary()).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
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
