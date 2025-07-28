<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";

interface Props {
  store: ReturnType<typeof useInsuranceClaimStore>;
  onChangeDescription: (e: Event) => void;
  onChangeVisitedDate: (date: Date) => void;
}

const props = defineProps<Props>();

const date = shallowRef(
  new CalendarDate(dayjs().year(), dayjs().month() + 1, dayjs().date())
);
const isModalOpen = ref(false);

// TODO: receiptId로 병원 정보 및 방문 날짜 가져오는 API 연동
const SAMPLE_HOSPITAL_DATA = {
  name: "손박사 이비인후과",
  visitDate: new Date("2025-07-14"),
};

const onChangeDate = () => {
  props.onChangeVisitedDate(date.value.toDate(getLocalTimeZone()));
  isModalOpen.value = false;
};
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2"> 방문한 병원명 </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">
      {{ SAMPLE_HOSPITAL_DATA.name }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      방문 날짜
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">{{
      dayjs(SAMPLE_HOSPITAL_DATA.visitDate).format("YYYY.MM.DD")
    }}</KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      아프기 시작한 날짜
    </KBUITypography>

    <div
      class="px-4 py-2 border border-black rounded-sm bg-white flex items-center justify-between text-black"
    >
      <UModal v-model:open="isModalOpen">
        <button class="flex items-center gap-1">
          <UIcon name="heroicons:calendar-16-solid" class="mb-0.5" />
          <KBUITypography size="b14" weight="bold">
            {{
              props.store.visitedDate
                ? dayjs(props.store.visitedDate).format("YYYY-MM-DD")
                : "t('receipt_submit.placeholder.date')"
            }}
          </KBUITypography>
        </button>

        <template #title> 날짜 선택 </template>
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
            </KBUIButton>
          </aside>
        </template>
      </UModal>
    </div>

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      병원 방문 사유
    </KBUITypography>
    <UTextarea
      :model-value="props.store.description"
      class="mt-2 w-full resize-none"
      :rows="3"
      :max-length="80"
      :autoresize="true"
      color="warning"
      size="lg"
      :placeholder="'최대 80자까지 입력 가능합니다.'"
      @input="props.onChangeDescription"
    />
    <KBUIButton size="large" variant="outlined" class-name="mt-10 w-full">
      진료비 세부산정내역
    </KBUIButton>
  </form>
</template>
