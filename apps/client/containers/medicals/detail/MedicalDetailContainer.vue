<script setup lang="ts">
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/receipt/CommonReceipt.vue";

// TODO: 영수증 정보 불러오기 API 연동

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
        title="손박사 이비인후과"
        business-number="123-45-67890"
        ceo="홍길동"
        address="서울특별시 강남구 역삼동 123-45"
        :created-at="new Date()"
        :total-price="11000"
        :complete="{
          result: true,
        }"
      />
      <div class="flex flex-col items-center mt-10 gap-2">
        <KBUIButton
          size="large"
          variant="outlined"
          class-name="w-full"
          @click="onDownloadImage"
        >
          이미지로 저장하기
        </KBUIButton>
        <KBUIButton size="large" variant="outlined" class-name="w-full">
          진료비 세부산정내역 다운로드 (PDF)
        </KBUIButton>
        <NuxtLink class="w-full block" :href="`/medical/${receiptId}/submit`">
          <KBUIButton size="large" variant="primary" class-name="w-full">
            실손보험금 청구하기
          </KBUIButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>
