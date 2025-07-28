<script setup lang="ts">
import { UTextarea } from "#components";

const { t } = useI18n();

// TODO: 상호명, 사업장 주소 가져오는 API 연동
// TODO: 영수증 정보 가져오기

interface Props {
  store: ReturnType<typeof useReceiptSubmitStore>;
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

const onUpdateCategory = () => {
  console.log("Selected category:", value.value);
  props.onChangeCategory(value.value);
};
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2"> {{ t("receipt_submit.label.mutual") }} </KBUITypography>
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
      영수증 정보
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
