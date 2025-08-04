<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/receipt/CommonReceipt.vue";
import { getReceiptDetail } from "~/services/receipt";

const { t } = useI18n();

const route = useRoute();
const receiptId = route.params.receiptId as string;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);

const { data } = useQuery({
  queryKey: ["receiptDetail", route.params.receiptId],
  queryFn: async () =>
    (await getReceiptDetail(route.params.receiptId as string)).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
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
        :title="data?.companyName ?? ''"
        business-number="123-45-67890"
        :ceo="'홍길동'"
        :address="data?.address ?? ''"
        :created-at="data?.createdAt ?? new Date()"
        :goods="
          data?.receiptContents.map((item) => {
            return {
              name: item.merchandiseName,
              price: item.merchandisePrice,
              quantity: item.amount,
            };
          })
        "
        :total-price="data?.totalPrice ?? 0"
        :supply-price="data?.supplyPrice ?? 0"
        :surtax="data?.surtax ?? 0"
        :complete="
          !['none', 'inProgress'].includes(data?.processState ?? '')
            ? {
                result: data?.processState === 'accepted',
                // TODO: Description 추가 필요
                message:
                  data?.processState === 'rejected'
                    ? '처리 불가 항목으로 인한 경비 처리 불가'
                    : undefined,
              }
            : undefined
        "
      />
      <div class="flex flex-col items-center mt-10 gap-2">
        <KBUIButton
          size="large"
          variant="outlined"
          class-name="w-full"
          @click="onDownloadImage"
        >
          {{ t("receipt_detail.button.save_image") }}
        </KBUIButton>
        <NuxtLink
          v-if="data?.isCorporate === 1 && data.processState === 'rejected'"
          :href="`/receipt/${receiptId}/transfer`"
          class="w-full block"
        >
          <KBUIButton size="large" variant="primary" class="w-full">
            가상 계좌 이체하기
          </KBUIButton>
        </NuxtLink>
        <NuxtLink
          v-else-if="data?.processState !== 'accepted'"
          :href="`/receipt/${receiptId}/submit`"
          class="w-full block"
        >
          <KBUIButton
            size="large"
            variant="primary"
            class="w-full"
            :disabled="data?.processState === 'inProgress'"
          >
            {{
              data?.processState === "inProgress"
                ? "영수 처리중"
                : t("receipt_detail.button.processing_receipt")
            }}
          </KBUIButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>
