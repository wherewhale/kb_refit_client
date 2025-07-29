<script setup lang="ts">
import ReceiptTransfer from "~/containers/receipts/detail/ReceiptTransfer.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader
      title="가상 계좌 이체하기"
      :back-link="`/receipt/${receiptId}`"
    />
    <ClientOnly>
      <ReceiptTransfer />
    </ClientOnly>
  </div>
</template>
