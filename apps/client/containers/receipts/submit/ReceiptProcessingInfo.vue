<script setup lang="ts">
import { UTextarea } from "#components";
import { useQuery } from "@tanstack/vue-query";
import { useImageUpload } from "~/hooks/useImageUpload";
import { getCompanyInfo } from "~/services/company";
import { getReceiptDetail } from "~/services/receipt";
import { extractFilenameFromUrl } from "~/utils/files";

const { t } = useI18n();

// TODO: 상호명, 사업장 주소 가져오는 API 연동
// TODO: 영수증 정보 가져오기

interface Props {
  store: ReturnType<typeof useReceiptSubmitStore>;
  onChangeFilename: (filename: string) => void;
  onChangeDescription: (e: Event) => void;
  onChangeCategory: (category: string) => void;
  receiptId: string;
}

const props = defineProps<Props>();

const initCategory = props.store.category;
const items = computed(() => [
  t("receipt_submit.dropbox.traffic"),
  t("receipt_submit.dropbox.business_trip"),
  t("receipt_submit.dropbox.business_promotion"),
  t("receipt_submit.dropbox.education"),
  t("receipt_submit.dropbox.communication"),
  t("receipt_submit.dropbox.welfare"),
]);
const value = ref(initCategory);
const { imageUrl, onFileChange, isUploading, progress } = useImageUpload();
const isModalOpen = computed(() => isUploading.value);

const { data } = useQuery({
  queryKey: ["receipt", "companyInfo", props.store.businessNumber],
  queryFn: async () => (await getCompanyInfo(props.store.businessNumber)).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const { data: receiptData } = useQuery({
  queryKey: ["receiptDetail", props.receiptId],
  queryFn: async () => (await getReceiptDetail(props.receiptId)).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,
});

const onUpdateCategory = () => {
  props.onChangeCategory(value.value);
};

watch(imageUrl, (fileurl) => {
  if (fileurl) {
    const filename = extractFilenameFromUrl(fileurl);
    props.onChangeFilename(filename);
  }
});
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2">
      {{ t("receipt_submit.label.mutual") }}
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">
      {{ data?.companyName }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.business_address") }}
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">{{
      data?.address
    }}</KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.expense_items") }}
    </KBUITypography>
    <USelectMenu
      v-model="value"
      :items="items"
      class="w-48"
      @update:model-value="onUpdateCategory"
    />
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.write_details") }}
    </KBUITypography>
    <UTextarea
      :model-value="props.store.description"
      class="mt-2 w-full resize-none"
      :rows="3"
      :max-length="80"
      :autoresize="true"
      color="warning"
      size="lg"
      :placeholder="t('receipt_submit.placeholder.enter_80_char')"
      @input="props.onChangeDescription"
    />
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      관련 이미지 첨부
    </KBUITypography>
    <figure v-if="imageUrl" class="my-2 w-full">
      <NuxtImg :src="imageUrl" alt="Uploaded image" />
    </figure>
    <UModal v-model:open="isModalOpen">
      <KBUIButton
        size="large"
        variant="outlined"
        class="flex items-center gap-1 relative w-full mt-2"
      >
        <input
          type="file"
          accept="image/*"
          class="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
          @change="onFileChange"
        />
        <UIcon name="ic:outline-attach-file" />
        파일 업로드
      </KBUIButton>
      <template #title> 파일 업로드 상태 확인 </template>
      <template #content>
        <aside class="p-6">
          <UProgress v-model="progress" />
          <p class="text-sm text-gray-500 mt-2">{{ progress }}%</p>
        </aside>
      </template>
    </UModal>

    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      세부 사용 내용
    </KBUITypography>
    <div class="w-full rounded-lg border border-black shadow-lg mt-2">
      <CommonReceipt
        ref="receiptRef"
        :title="receiptData?.companyName ?? ''"
        :business-number="
          convertNumberBusinessNumberToString(receiptData?.companyId ?? 0)
        "
        :ceo="receiptData?.ceoName ?? ''"
        :address="receiptData?.address ?? ''"
        :created-at="receiptData?.createdAt ?? new Date()"
        :goods="
          receiptData?.receiptContents.map((item) => ({
            name: item.merchandiseName,
            price: item.merchandisePrice,
            quantity: item.amount,
          }))
        "
        :total-price="receiptData?.totalPrice ?? 0"
        :supply-price="receiptData?.supplyPrice ?? 0"
        :surtax="receiptData?.surtax ?? 0"
      />
    </div>
  </form>
</template>
