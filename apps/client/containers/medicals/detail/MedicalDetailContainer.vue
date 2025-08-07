<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/receipt/CommonReceipt.vue";
import { getMedicalReceiptDetail } from "~/services/medical";

// TODO: 영수증 정보 불러오기 API 연동

const route = useRoute();
const receiptId = route.params.receiptId as string;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);

const { data } = useQuery({
  queryKey: ["medicalReceiptDetail", receiptId],
  queryFn: async () => (await getMedicalReceiptDetail(Number(receiptId))).data,
  retry: false,
});

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
        :title="data?.hospitalName ?? '병원명'"
        :business-number="
          convertNumberBusinessNumberToString(data?.companyId ?? 0)
        "
        :ceo="data?.ceoName ?? '대표자명'"
        :address="data?.address ?? '병원 주소'"
        :created-at="data?.createdAt ?? new Date()"
        :total-price="(data?.supplyPrice ?? 0) + (data?.surtax ?? 0)"
        :supply-price="data?.supplyPrice ?? 0"
        :surtax="data?.surtax ?? 0"
        :complete="
          ['none', 'inProgress', null].includes(data?.processState ?? null)
            ? undefined
            : {
                result: data?.processState === 'accepted',
                message:
                  data?.processState === 'rejected'
                    ? '실손보험금 청구가 거절되었습니다.'
                    : undefined,
              }
        "
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
          <KBUIButton
            size="large"
            variant="primary"
            class-name="w-full"
            :disabled="
              ['accepted', 'inProgress'].includes(data?.processState ?? '')
            "
          >
            {{
              data?.processState === "accepted"
                ? "실손보험금 청구 완료"
                : data?.processState === "inProgress"
                  ? "실손보험금 청구 중"
                  : "실손보험금 심사 중"
            }}
          </KBUIButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>
