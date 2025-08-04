<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";

const { t } = useI18n();

const props = defineProps<{
  store: ReturnType<typeof useReceiptSubmitStore>;
  errors: Record<string, string>;
  onChangeBusinessNumber: (e: Event) => void;
  onChangeCeoName: (e: Event) => void;
  onChangeOpenDate: (date: Date) => void;
}>();

const date = shallowRef(new CalendarDate(2025, 7, 23));
const isModalOpen = ref(false);

const onChangeDate = () => {
  props.onChangeOpenDate(date.value.toDate(getLocalTimeZone()));
  isModalOpen.value = false;
};
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.business_num") }}
    </KBUITypography>
    <KBUITextField
      :model-value="props.store.businessNumber"
      :placeholder="t('receipt_submit.placeholder.business_number')"
      :error="props.errors.businessNumber ? true : false"
      :error-message="props.errors.businessNumber"
      @input="props.onChangeBusinessNumber"
    />

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.representative_name") }}
    </KBUITypography>
    <KBUITextField
      :model-value="props.store.ceoName"
      :placeholder="t('receipt_submit.placeholder.representative_name')"
      :error="props.errors.ceoName ? true : false"
      :error-message="props.errors.ceoName"
      @input="props.onChangeCeoName"
    />

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.opening_date") }}
    </KBUITypography>
    <div
      class="px-4 py-2 border border-black rounded-sm bg-white flex items-center justify-between text-black"
    >
      <UModal v-model:open="isModalOpen">
        <button class="flex items-center gap-1">
          <UIcon name="heroicons:calendar-16-solid" class="mb-0.5" />
          <KBUITypography size="b14" weight="bold">
            {{
              props.store.openDate
                ? dayjs(props.store.openDate).format("YYYY-MM-DD")
                : "t('receipt_submit.placeholder.date')"
            }}
          </KBUITypography>
        </button>

        <template #title> 날짜 범위 선택 </template>
        <template #content>
          <aside class="p-6">
            <UCalendar
              v-model="date"
              color="warning"
              :max-value="today(getLocalTimeZone())"
            />
            <KBUIButton
              type="button"
              size="medium"
              variant="primary"
              class-name="mt-4 w-full"
              @click="onChangeDate"
            >
              {{ dayjs(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD") }}
              {{ t("common.button.select") }}
            </KBUIButton>
          </aside>
        </template>
      </UModal>
    </div>
  </form>
</template>
