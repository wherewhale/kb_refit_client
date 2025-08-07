<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useImageDownload } from "~/hooks/useImageDownload";
import { getReceiptProcessDetail } from "~/services/expense";

const props = defineProps<{
  receiptId: string;
  onApprove: () => void;
  onReject: () => void;
}>();

const { data: ReceiptProcessApplicant } = useQuery({
  queryKey: ["getReceiptProcessDetail", props.receiptId],
  queryFn: async () => (await getReceiptProcessDetail(Number(props.receiptId))).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const receiptDetail = computed(() => ReceiptProcessApplicant.value?.receiptDetail);

const goods = computed(() =>
  receiptDetail.value?.receiptContents.map((item) => ({
    name: item.merchandiseName,
    price: item.merchandisePrice,
    quantity: item.amount,
  })) ?? []
);

const createdAt = computed(() =>
  receiptDetail.value?.createdAt
    ? new Date(receiptDetail.value.createdAt)
    : new Date()
);


const { downloadUrl, isLoading, loadImage } = useImageDownload();

watch(
  ReceiptProcessApplicant,
  (val) => {
    if (val?.receiptProcessApplicant && val.receiptProcessApplicant.imageFileName) {
      loadImage(val.receiptProcessApplicant.imageFileName);
    }
  }
);
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2"> 신청자 </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">
      {{ ReceiptProcessApplicant?.receiptProcessApplicant.name }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      경비 처리 항목
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2"
      >{{ReceiptProcessApplicant?.receiptProcessApplicant.documentType}}</KBUITypography
    >
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      세부 내용
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2"
      >{{ReceiptProcessApplicant?.receiptProcessApplicant.documentDetail}}</KBUITypography
    >
    <KBUITypography v-if="downloadUrl && !isLoading" size="b14" color="gray-2" class-name="mt-4">
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
        ref="receiptRef"
        :title="receiptDetail?.companyName ?? ''"
        :business-number="receiptDetail?.companyId?.toString() ?? ''"
        :ceo="receiptDetail?.ceoName ?? ''"
        :address="receiptDetail?.address ?? ''"
        :created-at="createdAt"
        :goods="goods"
        :total-price="receiptDetail?.totalPrice"
        :supply="receiptDetail?.supplyPrice"
        :tax="receiptDetail?.surtax"
        :transaction-type="receiptDetail?.transactionType ?? ''"
      />

    </div>
  </form>
  <div class="grid grid-cols-2 gap-2 mt-10">
    <UButton
      color="primary"
      class="rounded-lg px-8 py-4 text-white text-lg font-medium items-center justify-center"
      @click="props.onApprove"
      >승인하기</UButton>
    <UButton
      color="error"
      class="rounded-lg px-8 py-4 text-white text-lg font-medium items-center justify-center"
      @click="props.onReject"
    >반려하기</UButton>
  </div>
</template>