<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type CommonReceipt from "~/components/expense/CommonReceipt.vue";
// import { useImageDownload } from "~/hooks/useImageDownload";
import { getReceiptProcessDetail } from "~/services/expense";
import type { ReceiptProcessDetail } from "~/types/expense";

// const route = useRoute();
// const receiptId = route.params.receiptId as string;
// // FIXME: 영수증 정보 API에서 받아온 데이터로 대체
// const isCompanyPayment = true;
// const isRejected = true;

// TODO: 영수증 정보 불러오기 API 연동
const route = useRoute();
const receiptId = Number(route.params.receiptId);

const { data } = useQuery<ReceiptProcessDetail>({
  queryKey: ["getReceiptProcessDetail", receiptId],
  queryFn: async () => (await getReceiptProcessDetail(receiptId)).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const STEPS = ["경비 처리 신청 정보"];
const stepIndex = 0;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);

// const { downloadUrl, isLoading, loadImage } = useImageDownload();

// watch(
//   ReceiptProcessDetail,
//   (val) => {
//     if (val?.ReceiptProcessDetail && val.receiptProcessApplicant.imageFileName) {
//       loadImage(val.receiptProcessApplicant.imageFileName);
//     }
//   },
//   { immediate: false } // 첫 실행 시 호출 안 함
// );
</script>

<template>
  <main class="px-6 py-20">
    <ClientOnly>
      <FormContainer :steps="STEPS" :current-step="stepIndex">
      <form>
        <KBUITypography size="b14" color="gray-2"> 신청자 </KBUITypography>
        <KBUITypography weight="medium" class-name="mt-2">
          김리핏
        </KBUITypography>
        <KBUITypography size="b14" color="gray-2" class-name="mt-4">
          경비 처리 항목
        </KBUITypography>
        <KBUITypography weight="medium" class-name="mt-2"
          >업무추진</KBUITypography
        >
        <!-- <KBUITypography v-if="downloadUrl && !isLoading" size="b14" color="gray-2" class-name="mt-4">
          관련 이미지
        </KBUITypography>
        <div class="mt-2">
          <img
            v-if="downloadUrl && !isLoading"
            :src="downloadUrl"
            alt="관련 이미지"
            class="w-full max-h-80 object-contain rounded-lg border"
          />
        </div> -->
        <KBUITypography size="b14" color="gray-2" class-name="mt-4">
          세부 사용 내역
        </KBUITypography>
        <div class="w-full rounded-lg border border-black shadow-lg mt-2">
          <CommonReceipt
            v-if="data"
            ref="receiptRef"
            :title="data?.receiptDetail.companyName ?? ''"
            :business-number="String(data?.receiptDetail.companyId)"
            :ceo="data?.receiptDetail.ceoName ?? ''"
            :address="data?.receiptDetail.address ?? ''"
            :created-at="new Date(data?.receiptDetail.createdAt ?? '')"
            :goods="data?.receiptDetail.receiptContents.map(item => ({
              name: item.merchandiseName,
              price: item.merchandisePrice,
              quantity: item.amount
            }))"
            :total="data?.receiptDetail.totalPrice"
            :supply="data?.receiptDetail.supplyPrice"
            :tax="data?.receiptDetail.surtax"
            :transaction-type="data?.receiptDetail.transactionType ?? ''"
            :complete="{ result: data?.receiptDetail.processState === 'accepted' }"
          />
        </div>
      </form>
      </FormContainer>
    </ClientOnly>
  </main>
</template>