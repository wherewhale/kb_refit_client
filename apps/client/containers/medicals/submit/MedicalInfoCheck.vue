<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { useMedicalPdfDownload } from "~/hooks/useMedicalPdfDownload";
import { getMedicalFile, getMedicalInfo } from "~/services/medical";

interface Props {
  store: ReturnType<typeof useInsuranceClaimStore>;
  onChangeDescription: (e: Event) => void;
  onChangeVisitedDate: (date: Date) => void;
}

const props = defineProps<Props>();
const route = useRoute();
const receiptId = route.params.receiptId as string;
const toast = useToast();

const date = shallowRef(
  new CalendarDate(dayjs().year(), dayjs().month() + 1, dayjs().date())
);
const isModalOpen = ref(false);

const { data: medicalInfoData } = useQuery({
  queryKey: ["medicalInfo", props.store.receiptId],
  queryFn: async () =>
    (await getMedicalInfo(Number(props.store.receiptId))).data,
  enabled: !!props.store.receiptId,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,
});

const { downloadUrl, error, loadPdf } = useMedicalPdfDownload();

const { mutate: onDownloadMedicalFileApi } = useMutation({
  mutationKey: ["medicalFile", receiptId],
  mutationFn: async () => (await getMedicalFile(Number(receiptId))).data,
  onSuccess: async (fileName) => {
    // 파일 다운로드 로직 추가
    await loadPdf(fileName.medicalImageFileName);
    if (error.value) {
      toast.add({
        title: "파일 다운로드 실패",
        description: error.value,
        color: "error",
        duration: 2000,
      });
      return;
    }
    const link = document.createElement("a");
    link.href = downloadUrl.value ?? "";
    link.target = "_blank"; // 새 탭에서 열기
    link.rel = "noopener noreferrer"; // 보안상 권장
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  onError: (error) => {
    console.error("파일 다운로드 실패:", error.message);
  },
});

const onDownloadMedicalFile = () => {
  onDownloadMedicalFileApi();
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
      {{ medicalInfoData?.hospitalName ?? "병원명" }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      방문 날짜
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">{{
      dayjs(medicalInfoData?.createdAt).format("YYYY.MM.DD")
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
              선택하기
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
    <KBUIButton
      size="large"
      variant="outlined"
      class-name="mt-10 w-full"
      type="button"
      @click="onDownloadMedicalFile"
    >
      진료비 세부산정내역
    </KBUIButton>
  </form>
</template>
