<script setup lang="ts">
import ReceiptDetailContainer from "~/containers/receipts/detail/ReceiptDetailContainer.vue";
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="영수증 확인" back-link="/?tab=receipt" />
    <component :is="ReceiptDetailContainer" />
  </div>
</template>
