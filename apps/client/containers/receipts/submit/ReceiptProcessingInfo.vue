<script setup lang="ts">
import { UTextarea } from "#components";
import { useImageUpload } from "~/hooks/useImageUpload";
import { extractFilenameFromUrl } from "~/utils/files";

const { t } = useI18n();

// TODO: 상호명, 사업장 주소 가져오는 API 연동
// TODO: 영수증 정보 가져오기

interface Props {
  store: ReturnType<typeof useReceiptSubmitStore>;
  onChangeFilename: (filename: string) => void;
  onChangeDescription: (e: Event) => void;
  onChangeCategory: (category: string) => void;
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

const onUpdateCategory = () => {
  props.onChangeCategory(value.value);
};

watch(imageUrl, (fileurl) => {
  if (fileurl) {
    const filename = extractFilenameFromUrl(fileurl);
    console.log("Extracted filename:", filename);
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
      KB국민은행
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      {{ t("receipt_submit.label.business_address") }}
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2"
      >서울특별시 영등포구 국제금융로8길 26(여의도동)</KBUITypography
    >
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
        title="가게 이름"
        business-number="123-45-67890"
        ceo="홍길동"
        address="서울특별시 강남구 역삼동 123-45"
        :created-at="new Date()"
        :goods="[
          { name: '상품1', price: 10000, quantity: 2 },
          { name: '상품2', price: 15000, quantity: 1 },
        ]"
      />
    </div>
  </form>
</template>
