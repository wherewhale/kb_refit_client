<script setup lang="ts">
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type CommonReceipt from "~/components/receipt/CommonReceipt.vue";

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

const onDownloadPDF = async () => {
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
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  });

  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save(`${TEST_DATA.title}-${TEST_DATA.datetime}.pdf`);
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
        :created-at="new Date().toLocaleDateString()"
        :goods="[
          { name: '상품1', price: 10000, quantity: 2 },
          { name: '상품2', price: 15000, quantity: 1 },
        ]"
        :complete="{
          result: false,
          message: '회사 경비 처리 불가 항목으로 인한 경비 처리 불가 통보',
        }"
      />
      <div class="flex flex-col items-center mt-10 gap-2">
        <KBUIButton
          size="large"
          variant="outlined"
          class-name="w-full"
          @click="onDownloadPDF"
        >
          PDF로 저장하기
        </KBUIButton>
        <KBUIButton size="large" variant="primary" class-name="w-full">
          영수 처리하기
        </KBUIButton>
      </div>
    </ClientOnly>
  </main>
</template>
