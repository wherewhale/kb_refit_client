<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getMonthlySummary, postEmailSend } from "~/services/expense";
import { isValidEmail } from "~/utils/regex";
import type { CalendarDate } from "@internationalized/date";
import { today, getLocalTimeZone } from "@internationalized/date";
import dayjs from "dayjs";

const props = defineProps<{
  open: boolean; // v-model:open
}>();

const { data } = useQuery<number>({
  queryKey: ["getMonthlySummary"],
  queryFn: async () => (await getMonthlySummary()).data,
  retry: false,
});

const emit = defineEmits<{
  (eventName: "update:open", newOpenValue: boolean): void;
  (eventName: "send", payload: { email: string }): void;
}>();

const isBottomSheetOpen = ref(props.open);
const isModalOpen = ref(false);
const email = ref("");
const error = ref("");
const toast = useToast();

const rangeValue = shallowRef({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

const getFormattedDate = (date: CalendarDate) => {
  console.log(
    "getFormattedDate",
    dayjs(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD")
  );
  return dayjs(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD");
};

const { mutate: sendEmail } = useMutation({
  mutationFn: postEmailSend,
  onSuccess: () => {
    toast.remove("sending");
    toast.add({
      title: "경비 처리 항목을 보냈습니다.",
      description: `${email.value} 로 처리 결과를 전송했어요.`,
      color: "success",
    });
  },
  onError: () => {
    toast.remove("sending");
    toast.add({
      title: "전송 실패",
      description: "네트워크 상태를 확인 후 다시 시도하세요.",
      color: "error",
    });
  },
});

const onSubmit = () => {
  error.value = "";
  if (!isValidEmail(email.value)) {
    error.value = "올바른 이메일을 입력하세요.";
    return;
  }
  if (!rangeValue.value.start || !rangeValue.value.end) {
    toast.add({
      title: "날짜 범위 선택",
      description: "시작일과 종료일을 선택해주세요.",
      color: "warning",
    });
    return;
  }
  isBottomSheetOpen.value = false;
  toast.add({
    id: "sending",
    title: "보내는 중...",
    description: "이메일 전송중...",
  });
  sendEmail({
    email: email.value,
    startDate: getFormattedDate(rangeValue.value.start),
    endDate: getFormattedDate(rangeValue.value.end),
  });
};

watch(
  () => props.open,
  (newOpenValue) => {
    isBottomSheetOpen.value = newOpenValue;
  }
);

watch(isBottomSheetOpen, (newOpenValue) => {
  emit("update:open", newOpenValue);
});
</script>

<template>
  <USlideover
    side="bottom"
    :open="isBottomSheetOpen"
    @update:open="isBottomSheetOpen = $event"
  >
    <template #content>
      <form
        class="p-4 pt-8 h-[600px] flex flex-col justify-between overflow-y-scroll max-w-sm mx-auto w-full"
      >
        <div>
          <KBUITypography size="b16" weight="bold">
            경비 처리 항목 보내기
          </KBUITypography>

          <KBUITypography size="b14" color="gray-2"
            >경비 처리 수</KBUITypography
          >
          <KBUITypography size="b16" weight="medium" class-name="mt-1">
            총 {{ data ?? 0 }}건
          </KBUITypography>

          <KBUITypography size="b14" color="gray-2" class-name="mt-6">
            처리 내용을 받을 이메일
          </KBUITypography>
          <input
            v-model="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            class="mt-2 w-full bg-transparent outline-none border-b border-gray-3 focus:border-green-1 pb-2"
          />
          <KBUITypography
            v-if="error"
            size="b14"
            class="mt-2 text-sm text-red-2"
            >{{ error }}</KBUITypography
          >

          <KBUITypography size="b14" color="gray-2" class-name="mt-6">
            날짜 범위 선택
          </KBUITypography>
          <UModal v-model:open="isModalOpen">
            <button
              class="flex items-center gap-1 border rounded-lg p-2 w-full justify-center mt-2"
            >
              <UIcon name="heroicons:calendar-16-solid" class="mb-0.5" />
              <KBUITypography size="b14" weight="bold">
                {{ rangeValue.start.toString() }} ~
                {{ rangeValue.end.toString() }}
              </KBUITypography>
            </button>

            <template #title> 날짜 범위 선택 </template>
            <template #content>
              <aside class="p-6">
                <UCalendar
                  v-model="rangeValue"
                  color="warning"
                  range
                  :year-controls="false"
                  :maximum-days="365"
                  :max-value="today(getLocalTimeZone())"
                />
                <KBUIButton
                  class="mt-4 w-full"
                  variant="primary"
                  size="large"
                  @click="() => (isModalOpen = false)"
                >
                  선택하기
                </KBUIButton>
              </aside>
            </template>
          </UModal>
        </div>

        <KBUIButton
          variant="primary"
          size="large"
          class="w-full block"
          :disabled="!isValidEmail(email)"
          type="submit"
          @click.prevent="onSubmit"
        >
          보내기
        </KBUIButton>
      </form>
    </template>
  </USlideover>
</template>
