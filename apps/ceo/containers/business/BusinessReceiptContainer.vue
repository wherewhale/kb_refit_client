<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/expense/CommonReceipt.vue";
import { getReceiptProcessDetail } from "~/services/expense";

const route = useRoute();
const receiptId = route.params.receiptId as string;

const { data: ReceiptProcessApplicant, isLoading } = useQuery({
  queryKey: ["getReceiptProcessDetail", receiptId],
  queryFn: async () => (await getReceiptProcessDetail(Number(receiptId))).data,
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
        :title="receiptDetail?.companyName ?? ''"
        :business-number="receiptDetail?.companyId?.toString() ?? ''"
        :ceo="receiptDetail?.ceoName ?? ''"
        :address="receiptDetail?.address ?? ''"
        :created-at="createdAt"
        :goods="goods"
        :total-price="receiptDetail?.totalPrice"
        :supply="receiptDetail?.supplyPrice"
        :tax="receiptDetail?.surtax"
        :transaction-type="receiptDetail?.transactionType ?? ''
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
        <NuxtLink
          v-if="!isLoading && receiptDetail?.processState !== 'rejected' && receiptDetail?.processState !== 'deposit'"
          :href="`/business/${receiptId}/reject`"
          class="w-full block"
        >
          <UButton
            color="error"
            size="lg"
            class="w-full rounded-lg py-4 text-lg items-center justify-center"
          >반려하기</UButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>