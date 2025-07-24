<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";

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
      사업자번호
    </KBUITypography>
    <KBUITextField
      :model-value="props.store.businessNumber"
      placeholder="사업자번호를 입력하세요."
      :error="props.errors.businessNumber ? true : false"
      :error-message="props.errors.businessNumber"
      @input="props.onChangeBusinessNumber"
    />

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      대표자 이름
    </KBUITypography>
    <KBUITextField
      :model-value="props.store.ceoName"
      placeholder="대표자 이름을 입력하세요."
      :error="props.errors.ceoName ? true : false"
      :error-message="props.errors.ceoName"
      @input="props.onChangeCeoName"
    />

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      개업일자
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
                : "선택된 날짜가 없습니다."
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
              :year-controls="false"
            />
            <KBUIButton
              type="button"
              size="medium"
              variant="primary"
              class-name="mt-4 w-full"
              @click="onChangeDate"
            >
              {{ dayjs(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD") }}
              선택
            </KBUIButton>
          </aside>
        </template>
      </UModal>
    </div>
  </form>
</template>
