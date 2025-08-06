<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useImageDownload } from "~/hooks/useImageDownload";
import { getReceiptProcessDetail } from "~/services/expense";
import type { ReceiptProcessDetail } from "~/types/expense";

const route = useRoute();
const receiptId = Number(route.params.receiptId);

const { data } = useQuery<ReceiptProcessDetail>({
  queryKey: ["getReceiptProcessDetail", receiptId],
  queryFn: async () => (await getReceiptProcessDetail(receiptId)).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const receipt = computed(() => data.value?.receiptDetail);
const applicant = computed(() => data.value?.receiptProcessApplicant);

const { downloadUrl, isLoading, loadImage } = useImageDownload();

watch(
  data,
  (val) => {
    if (val?.receiptProcessApplicant?.imageFileName) {
      loadImage(val.receiptProcessApplicant.imageFileName);
    }
  }
);
</script>

<template>
  <main class="px-6 py-20">
    <ClientOnly>
      <FormContainer :steps="['경비 처리 신청 정보']" :current-step="0">
        <form>
          <KBUITypography size="b14" color="gray-2"> 신청자 </KBUITypography>
          <KBUITypography weight="medium" class-name="mt-2">
            {{ applicant?.name }}
          </KBUITypography>

          <KBUITypography size="b14" color="gray-2" class-name="mt-4">
            경비 처리 항목
          </KBUITypography>
          <KBUITypography weight="medium" class-name="mt-2">
            {{ applicant?.documentType }}
          </KBUITypography>

          <KBUITypography size="b14" color="gray-2" class-name="mt-4">
            세부 내용
          </KBUITypography>
          <KBUITypography weight="medium" class-name="mt-2">
            {{ applicant?.documentDetail }}
          </KBUITypography>

          <KBUITypography
            v-if="downloadUrl && !isLoading"
            size="b14"
            color="gray-2"
            class-name="mt-4"
          >
            관련 이미지
          </KBUITypography>
          <div class="mt-2">
            <img
              v-if="downloadUrl && !isLoading"
              :src="downloadUrl"
              alt="관련 이미지"
              class="w-full max-h-80 object-contain rounded-lg border"
            />
          </div>

          <KBUITypography size="b14" color="gray-2" class-name="mt-4">
            세부 사용 내역
          </KBUITypography>
          <div class="w-full rounded-lg border border-black shadow-lg mt-2">
            <CommonReceipt
              v-if="receipt"
              :title="receipt.companyName"
              :business-number="String(receipt.companyId)"
              :ceo="receipt.ceoName"
              :address="receipt.address"
              :created-at="new Date(receipt.createdAt)"
              :goods="receipt.receiptContents.map(item => ({
                name: item.merchandiseName,
                price: item.merchandisePrice,
                quantity: item.amount
              }))"
              :total="receipt.totalPrice"
              :supply="receipt.supplyPrice"
              :tax="receipt.surtax"
              :transaction-type="receipt.transactionType"
              :complete="{
                result: receipt.processState === 'accepted',
                message: receipt.rejectedReason
              }"
            />
          </div>
        </form>
      </FormContainer>
    </ClientOnly>
  </main>
</template>