<script setup lang="ts">
import BusinessReceiptContainer from "~/containers/business/BusinessReceiptContainer.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="영수증 확인" back-link="/?tab=business" />
    <BusinessReceiptContainer :receipt-id="receiptId" />
  </div>
</template>