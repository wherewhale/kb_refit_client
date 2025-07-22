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
        title="손박사 이비인후과"
        business-number="123-45-67890"
        ceo="홍길동"
        address="서울특별시 강남구 역삼동 123-45"
        :created-at="new Date().toLocaleDateString()"
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
          @click="onDownloadPDF"
        >
          PDF로 저장하기
        </KBUIButton>
        <KBUIButton size="large" variant="outlined" class-name="w-full">
          진료비 세부산정내역 다운로드 (PDF)
        </KBUIButton>
        <KBUIButton size="large" variant="primary" class-name="w-full">
          실손보험금 청구하기
        </KBUIButton>
      </div>
    </ClientOnly>
  </main>
</template>
