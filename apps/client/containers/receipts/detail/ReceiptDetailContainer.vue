<script setup lang="ts">
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/receipt/CommonReceipt.vue";

const { t } = useI18n();

const receiptMessage = computed(() =>
  t("receipt_detail.complete.message")
);

// TODO: 영수증 정보 불러오기 API 연동

const TEST_DATA = {
  id: 1,
  title: "영수증 상세",
  datetime: "2025-07-14 12:00:00",
  amount: -32500,
  label: "브네",
};

const route = useRoute();
const receiptId = route.params.receiptId as string;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);

const onDownloadImage = async () => {
  const el = receiptRef.value?.printRef;

  if (!el) {
    console.warn("⚠️ ref가 null이거나 문서에 붙지 않았습니다.");
    return;
  }

  if (!document.body.contains(el)) {
    console.warn("⚠️ DOM이 아직 문서에 attach되지 않았습니다.");
    return;
  }

  const canvas = await html2canvas(el, { scale: 2 });

  // PNG 이미지로 저장
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "receipt.png";
  link.click();
};
</script>

<template>
  <main class="px-6 py-20">
    <ClientOnly>
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
        :complete="{
          result: false,
          message: receiptMessage,
        }"
      />
      <div class="flex flex-col items-center mt-10 gap-2">
        <KBUIButton
          size="large"
          variant="outlined"
          class-name="w-full"
          @click="onDownloadImage"
        >
          {{ t('receipt_detail.button.save_image') }}
        </KBUIButton>
        <NuxtLink :href="`/receipt/${receiptId}/submit`" class="w-full block">
          <KBUIButton size="large" variant="primary" class-name="w-full">
            {{ t('receipt_detail.button.processing_receipt') }}
          </KBUIButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>
