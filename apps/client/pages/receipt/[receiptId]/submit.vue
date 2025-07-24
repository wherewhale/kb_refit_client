<script setup lang="ts">
import ReceiptSubmitExpense from "~/containers/receipts/detail/ReceiptSubmitExpense.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="영수 처리하기" :back-link="`/receipt/${receiptId}`" />
    <ClientOnly>
      <ReceiptSubmitExpense />
    </ClientOnly>
  </div>
</template>
